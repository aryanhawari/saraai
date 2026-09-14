/**
 * SARA AI — production backend
 * Serves the built frontend (dist/) and handles the contact form.
 *
 * Email delivery (first available wins):
 *   1. Gmail SMTP via nodemailer — set GMAIL_USER + GMAIL_APP_PASSWORD in .env
 *   2. FormSubmit relay (no credentials needed) — messages land in CONTACT_TO inbox
 *
 * Run:  npm run build && npm start   →  http://localhost:8787
 */

import express from 'express';
import nodemailer from 'nodemailer';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 8787;
const CONTACT_TO = process.env.CONTACT_TO || 'saraaihawari90@gmail.com';
const GMAIL_USER = process.env.GMAIL_USER || '';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

// ---------- CORS (dev: vite on another port) ----------
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

// ---------- Simple in-memory rate limit: 5 messages / 15 min / IP ----------
const hits = new Map();
const RATE_LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;

function rateLimit(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    res.status(429).json({
      ok: false,
      message: 'Too many messages from this device. Please try again a little later.',
    });
    return;
  }
  recent.push(now);
  hits.set(ip, recent);
  next();
}

// ---------- Helpers ----------
const clean = (v, max = 500) => String(v ?? '').trim().slice(0, max);
const escapeHtml = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function buildHtml({ name, email, subject, message }) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
    <div style="background:#d43122;color:#fff;padding:18px 24px">
      <h2 style="margin:0;font-size:18px">SARA AI website — new message</h2>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#222">
      <tr><td style="padding:12px 24px;border-bottom:1px solid #f0f0f0;width:110px;color:#777">Name</td><td style="padding:12px 24px;border-bottom:1px solid #f0f0f0"><strong>${escapeHtml(name)}</strong></td></tr>
      <tr><td style="padding:12px 24px;border-bottom:1px solid #f0f0f0;color:#777">Email</td><td style="padding:12px 24px;border-bottom:1px solid #f0f0f0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:12px 24px;border-bottom:1px solid #f0f0f0;color:#777">Subject</td><td style="padding:12px 24px;border-bottom:1px solid #f0f0f0">${escapeHtml(subject)}</td></tr>
      <tr><td style="padding:12px 24px;vertical-align:top;color:#777">Message</td><td style="padding:12px 24px;white-space:pre-wrap">${escapeHtml(message)}</td></tr>
    </table>
    <div style="padding:12px 24px;background:#faf8f4;color:#999;font-size:12px">Sent from the SARA AI website contact form.</div>
  </div>`;
}

async function sendViaGmail({ name, email, subject, message }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: `"SARA AI Website" <${GMAIL_USER}>`,
    to: CONTACT_TO,
    replyTo: email,
    subject: `SARA AI website: ${subject}`,
    html: buildHtml({ name, email, subject, message }),
  });
}

async function sendViaFormSubmit(origin, { name, email, subject, message }) {
  const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_TO}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: origin,
      Referer: `${origin}/`,
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
      _subject: `SARA AI website: ${subject}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: email,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || data?.success !== 'true') {
    const detail = data?.message ? ` (${data.message})` : '';
    throw new Error(`FormSubmit relay failed${detail}`);
  }
}

// ---------- API ----------
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'sara-ai-backend',
    mailer: GMAIL_USER && GMAIL_APP_PASSWORD ? 'gmail-smtp' : 'formsubmit-relay',
    chat: GEMINI_API_KEY ? 'gemini-live' : 'simulated',
    time: new Date().toISOString(),
  });
});

// ---------- SARA chat (real Gemini replies, key stays server-side) ----------
const chatHits = new Map();
const CHAT_LIMIT = 20;
const CHAT_WINDOW_MS = 10 * 60 * 1000;

function chatRateLimit(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const recent = (chatHits.get(ip) || []).filter((t) => now - t < CHAT_WINDOW_MS);
  if (recent.length >= CHAT_LIMIT) {
    res.status(429).json({
      ok: false,
      reply: 'SARA needs a short break — too many messages from this device. Try again in a few minutes.',
    });
    return;
  }
  recent.push(now);
  chatHits.set(ip, recent);
  next();
}

const MODE_STYLE = {
  fast: 'Answer instantly and briefly — like a helpful friend texting back.',
  thinker: 'Reason step by step: show a short numbered reasoning, then a clear final answer.',
  search: 'Answer from your own knowledge (no live browsing here). Be accurate and honest about anything uncertain.',
};

function buildSystemPrompt(mode) {
  return `You are SARA AI — a warm, personal AI assistant inside the SARA Android app, built by Aryan Hawari, a developer from Nepal.

Identity rules (never break these):
- If asked your name → you are "SARA" (SARA AI), a personal AI assistant.
- If asked who made/created/built you → "Aryan Hawari" — a developer from Nepal. If the user says "sir", reply respectfully like "I was made by Aryan Hawari sir."
- If asked which model/engine powers you → NEVER name Google, Gemini or any company. Reply exactly in this spirit: "I'm SARA AI, made by Aryan Hawari sir."
- Reply in the language the user writes in (English, Hindi, Hinglish, or Nepali).

Formatting (always fully formatted, never a plain wall of text):
- Short paragraphs, bullet points or numbered steps where helpful, at most one or two emojis.
- Mobile-chat length: under ~120 words unless the user clearly asks for more.
- For code requests, use a clean fenced code block with the language tag.

Current conversation style: ${MODE_STYLE[mode] || MODE_STYLE.fast}`;
}

app.post('/api/chat', chatRateLimit, async (req, res) => {
  const message = clean(req.body?.message, 1000);
  const mode = ['fast', 'thinker', 'search'].includes(req.body?.mode) ? req.body.mode : 'fast';

  if (!message) {
    res.status(400).json({ ok: false, reply: 'Please type a message for SARA.' });
    return;
  }

  if (!GEMINI_API_KEY) {
    res.status(503).json({ ok: false, reply: 'SARA\'s live brain is not configured on this server yet.' });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: message,
      config: {
        systemInstruction: buildSystemPrompt(mode),
        maxOutputTokens: 700,
        temperature: 0.7,
      },
    });
    const reply = (response?.text || '').trim();
    if (!reply) throw new Error('empty reply');
    res.json({ ok: true, reply });
  } catch (err) {
    console.error('[chat] failed:', err?.message || err);
    res.status(502).json({
      ok: false,
      reply: 'SARA is having trouble thinking right now. Please try again in a moment.',
    });
  }
});

app.post('/api/contact', rateLimit, async (req, res) => {
  const body = req.body || {};

  // Honeypot — bots fill every field; humans never see this one
  if (body.nickname) {
    res.json({ ok: true, message: 'Thanks! Your message has been received.' });
    return;
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150);
  const message = clean(body.message, 2000);

  const errors = {};
  if (!name) errors.name = 'Please enter your name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address';
  if (!subject) errors.subject = 'Please enter a subject';
  if (message.length < 10) errors.message = 'Message must be at least 10 characters long';

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ ok: false, message: 'Please correct the highlighted fields.', errors });
    return;
  }

  const payload = { name, email, subject, message };
  const origin = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;

  try {
    if (GMAIL_USER && GMAIL_APP_PASSWORD) {
      await sendViaGmail(payload);
    } else {
      await sendViaFormSubmit(origin, payload);
    }
    res.json({ ok: true, message: "Thanks! Your message has landed in Aryan's inbox — you'll hear back soon." });
  } catch (err) {
    console.error('[contact] send failed:', err.message);
    res.status(502).json({
      ok: false,
      message: 'The message could not be delivered right now. Please email directly instead.',
    });
  }
});

// ---------- Static frontend + APK headers ----------
const distDir = path.join(__dirname, 'dist');

app.use(
  express.static(distDir, {
    setHeaders(res, filePath) {
      if (filePath.endsWith('.apk')) {
        res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        res.setHeader('Content-Disposition', 'attachment; filename="sara-ai-v1.0.apk"');
        res.setHeader('X-Content-Type-Options', 'nosniff');
      }
    },
  })
);

// SPA fallback — HashRouter only needs "/", but keep it robust
app.get(/^\/(?!api\/|downloads\/).*/, (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  SARA AI backend live  →  http://localhost:${PORT}`);
  console.log(`  Contact inbox         →  ${CONTACT_TO}`);
  console.log(`  Mailer                →  ${GMAIL_USER && GMAIL_APP_PASSWORD ? 'Gmail SMTP' : 'FormSubmit relay'}\n`);
});
