# 11 — Gate de Build, Performance y Release (AEST-014)

Estado: `PASS`

## Build
- `npm run build` → PASS. JS 114.28 kB (42.09 gzip); CSS 37.04 kB (7.29 gzip).
- Incremento CSS +2.35 kB vs baseline por el sistema de botones aero y tokens; dentro de presupuesto.
- Sin nuevas dependencias; sin assets duplicados.
- Hero: solo la primera imagen `eager`; resto `lazy` (reduce LCP inicial).

## SEO / artefactos
- `robots.txt`, `sitemap.xml`, `404.html` y meta/OG/JSON-LD presentes en `dist`.
- `base` de deployment `/urbanikawsay/` intacto.

## Smoke test
- `/` → 200 con `#app`.
- `/robots.txt` → 200.
- Rutas legacy manejadas por `404.html` (mecanismo existente).

## Presupuesto
- JS ≤ 150 kB gzip: OK (42.09).
- CSS ≤ 50 kB gzip: OK (7.29).

## Release candidate
Listo para revisión visual y deploy (`npm run build:deployment` + `npm run deploy`).
No se desplegó por falta de indicación explícita en esta iteración.
