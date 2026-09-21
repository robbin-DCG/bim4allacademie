# BIM4ALL Academie website (v4)

Statische site, geen build. Zet deze map als root op GitHub Pages of Netlify.

- `index.html` stuurt door naar `Homepage v4.dc.html`.
- Pagina's: `*.dc.html`. Bestandsnamen met spaties zijn bewust; menu en interne links verwijzen ernaar.
- `assets/`: alle foto's en logo's, één keer.
- `support.js`, `b4a-motion.js`, `opleidingen-data.js`: runtime, animaties en data. React wordt geladen via unpkg.com.

Nog te koppelen door BIM4ALL: formulieren, KvK/btw in footer, Google-beoordeling, eigen domein.
