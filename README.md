# BIM4ALL Academie website (v4)

Statische site, geen build. Zet deze map als root op GitHub Pages of Netlify.

- `index.html` stuurt door naar `homepage.dc.html`.
- Pagina's: `*.dc.html`, bestandsnamen zonder spaties. Detailpagina's `opleiding-*`, `artikel-*`, `vacature-*` zijn gegenereerd uit de datascripts; bij wijzigingen in `v4/` de export opnieuw genereren.
- `assets/`: alle foto's en logo's, één keer.
- `support.js`, `b4a-motion.js`, `opleidingen-data.js`, `vacatures-data.js`: runtime, animaties en data. React wordt geladen via unpkg.com.

Nog te koppelen door BIM4ALL: formulieren, KvK/btw in footer, Google-beoordeling, eigen domein.


## Beveiliging en performance (21 sep 2026)
- Content-Security-Policy (meta) op elke pagina: alleen eigen bestanden, unpkg.com (React, met SRI-hash) en Google Fonts. Geen iframes, objecten of externe scripts.
- Referrer-Policy strict-origin-when-cross-origin; externe links rel="noopener".
- `_headers` (Netlify/Cloudflare Pages): nosniff, X-Frame-Options DENY, HSTS, Permissions-Policy, cache 1 jaar voor assets. GitHub Pages leest dit bestand niet; zet de site dan achter Cloudflare voor dezelfde headers.
- Foto's > 400 KB verkleind naar max 1600 px JPEG in `assets/opt/` (20 MB → ~10 MB).
- `robots.txt`, `sitemap.xml` (58 URL's, domein bim4all-academie.com zonder www) en `404.html`.
- Geen formulieren of servercode: geen injectie-aanvalsvlak. Formulieren later via extern platform, met CSP-uitbreiding voor dat domein.


## Netlify (21 sep 2026)
- Bestandsnamen zonder spaties; schone URL's via `_redirects` (/transformation → transformation.dc.html). `netlify.toml` schakelt asset-processing uit (dat breekt anders de runtime).
- Zet in Netlify onder Site settings → Build & deploy → Post processing ook "Pretty URLs" uit als die aan staat.

## Stand 23 sep 2026 (versie voor GitHub)
- 65 pagina's incl. 37 detailpagina's, elk met eigen title/description/canonical/og/JSON-LD; `llms.txt`; 42 × 301 van oude URL's in `_redirects` (ook `?o=/?a=/?id=` → nieuwe URL).
- Eindcheck: geen dode links, ontbrekende afbeeldingen of imports; sitemap en redirect-doelen kloppen; geen consolefouten.
- Uploaden: volledige repo-inhoud vervangen door deze map (oude bestanden met spaties in de naam verwijderen). `.nojekyll` blijft staan.
- Na livegang: alle pagina's laden (Over ons teamfoto's, Opleidingen data-script), GTM-ID toevoegen (CSP verruimen), Search Console + Bing Webmaster Tools, oude sitemap nalopen op ontbrekende 301's.

## Wijziging 23 sept (avond)
- Nieuw: `kring.dc.html` (BIM4ALL Kring, /kring). `voor-organisaties.dc.html` bevat alleen nog Digital Fit.
- Aangepast: nav, footer, homepage, ai, strategy, transformation, contact, events, over-ons, opleidingen-data.js, llms.txt, sitemap.xml, _redirects (/kring, /club → /kring).
- Hele repo-inhoud vervangen bij upload; eerst oude bestanden met spaties verwijderen.
