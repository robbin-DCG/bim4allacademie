# BIM4ALL Academie website (v4)

Statische site, geen build. Zet deze map als root op GitHub Pages of Netlify.

- `index.html` stuurt door naar `Homepage v4.dc.html`.
- Pagina's: `*.dc.html`. Bestandsnamen met spaties zijn bewust; menu en interne links verwijzen ernaar.
- `assets/`: alle foto's en logo's, één keer.
- `support.js`, `b4a-motion.js`, `opleidingen-data.js`: runtime, animaties en data. React wordt geladen via unpkg.com.

Nog te koppelen door BIM4ALL: formulieren, KvK/btw in footer, Google-beoordeling, eigen domein.


## Beveiliging en performance (21 sep 2026)
- Content-Security-Policy (meta) op elke pagina: alleen eigen bestanden, unpkg.com (React, met SRI-hash) en Google Fonts. Geen iframes, objecten of externe scripts.
- Referrer-Policy strict-origin-when-cross-origin; externe links rel="noopener".
- `_headers` (Netlify/Cloudflare Pages): nosniff, X-Frame-Options DENY, HSTS, Permissions-Policy, cache 1 jaar voor assets. GitHub Pages leest dit bestand niet; zet de site dan achter Cloudflare voor dezelfde headers.
- Foto's > 400 KB verkleind naar max 1600 px JPEG in `assets/opt/` (20 MB → ~10 MB).
- `robots.txt`, `sitemap.xml` (domein aanpassen: nu www.bim4all-academie.nl) en `404.html`.
- Geen formulieren of servercode: geen injectie-aanvalsvlak. Formulieren later via extern platform, met CSP-uitbreiding voor dat domein.
