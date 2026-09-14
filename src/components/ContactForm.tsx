import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Mail } from 'lucide-react';
import { CONTACT_FORM_ENDPOINT, CONTACT_EMAIL } from '../config';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * Delivery order:
 *   1. Own backend (POST /api/contact) — used when the Express server hosts the site
 *   2. FormSubmit relay — fallback so the form still works on static hosting
 */
async function deliverMessage(payload: Record<string, string>, signal: AbortSignal) {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });

    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data?.ok) return;
      throw new Error(data?.message || 'Delivery failed');
    }
    if (res.status !== 404 && res.status !== 405) {
      // The backend answered with a real error — surface it, its own
      // FormSubmit fallback has already been exhausted server-side.
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || `Server responded with ${res.status}`);
    }
    // 404/405 → no backend here (static hosting), fall through to the relay
  } catch (err) {
    // Only fall back when the backend is genuinely unreachable
    if (!(err instanceof TypeError)) throw err;
  }

  const res = await fetch(CONTACT_FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || data?.success !== 'true') {
    throw new Error(data?.message || 'The message could not be delivered right now.');
  }
}

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!form.name.trim()) {
      errs.name = 'Please enter your name';
    }

    if (!form.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!form.subject.trim()) {
      errs.subject = 'Please enter a subject';
    }

    if (!form.message.trim()) {
      errs.message = 'Please provide a message';
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setStatus('error');
      setStatusMessage('Please correct the highlighted fields before submitting.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setStatusMessage('');

    // Hard stop so the button never hangs on a bad network
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      await deliverMessage(
        {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          _subject: `SARA AI website: ${form.subject.trim()}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: form.email.trim(),
        },
        controller.signal
      );

      setStatus('success');
      setStatusMessage(
        `Thanks ${form.name.trim().split(' ')[0]}! Your message has landed in Aryan's inbox — you'll hear back soon.`
      );
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === 'AbortError';
      setStatus('error');
      setStatusMessage(
        aborted
          ? 'The request timed out. Please check your connection and try again, or email directly.'
          : (err as Error)?.message || 'The message could not be sent right now. Please email directly instead.'
      );
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (hasError?: string) =>
    `w-full rounded-xl bg-white/70 border px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-colors ${
      hasError
        ? 'border-rose-400 focus:border-rose-500'
        : 'border-neutral-200 focus:border-red-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,49,34,0.08)]'
    }`;

  return (
    <div className="relative rounded-3xl ultra-glass p-7 sm:p-10">
      <div className="mb-6 space-y-2">
        <div className="eyebrow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct inquiries</span>
        </div>
        <h3 className="font-heading font-bold text-2xl text-neutral-900">
          Send a message
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600">
          Have an AI project, an app idea, or a question about SARA? Write below — replies are personal.
        </p>
      </div>

      {/* Status Banners */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-50/90 backdrop-blur-md border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Message sent!</p>
              <p className="text-xs text-emerald-700 mt-0.5">{statusMessage}</p>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-2xl bg-rose-50/90 backdrop-blur-md border border-rose-200 text-rose-800 text-sm flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to send</p>
              <p className="text-xs text-rose-700 mt-0.5">{statusMessage}</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 underline underline-offset-2 hover:text-rose-800"
              >
                <Mail className="w-3.5 h-3.5" />
                Email {CONTACT_EMAIL} directly
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="block text-xs font-semibold text-neutral-700">
              Your Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Bipin Sharma"
              className={inputClasses(errors.name)}
            />
            {errors.name && <p className="text-[11px] text-rose-600 font-medium">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-700">
              Your Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. bipin@example.com"
              className={inputClasses(errors.email)}
            />
            {errors.email && <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>}
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label htmlFor="contact-subject" className="block text-xs font-semibold text-neutral-700">
            Subject <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="e.g. SARA AI Integration / Custom Chatbot Inquiry"
            className={inputClasses(errors.subject)}
          />
          {errors.subject && <p className="text-[11px] text-rose-600 font-medium">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-700">
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your idea, project requirements, or questions..."
            className={`${inputClasses(errors.message)} resize-none`}
          />
          {errors.message && <p className="text-[11px] text-rose-600 font-medium">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="contact-submit-btn"
          disabled={loading}
          className="w-full py-4 rounded-full font-heading font-bold text-sm text-white btn-primary flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 text-white animate-spin" />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-white" />
              <span>Send message</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-neutral-400 pt-1">
          Your details stay private and are only used to reply to you.
        </p>
      </form>
    </div>
  );
};
