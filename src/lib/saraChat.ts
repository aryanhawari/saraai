/**
 * Talks to the SARA backend (/api/chat) which calls Gemini server-side —
 * the API key never reaches the browser.
 * Returns null when the backend is unavailable, so callers can fall back
 * to their offline demo behaviour.
 */
export async function askSara(message: string, mode: 'fast' | 'thinker' | 'search' = 'fast'): Promise<string | null> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ message, mode }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (data?.ok && typeof data.reply === 'string' && data.reply.trim()) {
      return data.reply.trim();
    }
    return null;
  } catch {
    return null;
  }
}
