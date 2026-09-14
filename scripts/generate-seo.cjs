/**
 * Generates public/sitemap.xml and public/robots.txt before the build.
 * The domain comes from SITE_URL (.env or hosting env vars) so the same
 * repo can be deployed under any domain.
 * Runs as part of `npm run build`.
 */
const fs = require('node:fs');
const path = require('node:path');

// pull SITE_URL out of .env without any dependency
function readSiteUrl() {
  const fromProcess = process.env.SITE_URL;
  if (fromProcess) return fromProcess.replace(/\/+$/, '');
  try {
    const env = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
    const line = env.split(/\r?\n/).find((l) => l.trim().startsWith('SITE_URL='));
    if (line) {
      const value = line.slice(line.indexOf('=') + 1).trim().replace(/^"|"$/g, '');
      if (value) return value.replace(/\/+$/, '');
    }
  } catch {
    // no .env — fall through to default
  }
  return 'https://saraai.vercel.app';
}

const SITE = readSiteUrl();
const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'robots.txt'), robots);
console.log(`[generate-seo] sitemap.xml + robots.txt written for ${SITE}`);
