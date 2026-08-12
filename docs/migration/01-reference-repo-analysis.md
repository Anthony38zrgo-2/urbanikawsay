# 01 — Reference Repository Analysis (consultoria-coexistir)

Repositorio: https://github.com/Anthony38zrgo-2/consultoria-coexistir

## Stack confirmado
- Vue 3.5.x (Composition API, `<script setup>`) · JS (no TS)
- Vite 8.x + `@tailwindcss/vite` → **Tailwind v4 CSS-first** (sin tailwind.config.js)
- `simple-icons` (brand glyphs) · `gh-pages` deploy
- Sin Vue Router, sin Pinia, sin SSR → **SPA single-page con nav por anclas**

## Estructura src/
```
components/{layout,sections,ui} · composables · constants · data · models · styles · assets/images
```
- `App.vue`: orquestador que importa layout + sections en orden + UI globales
- `main.js`: createApp(App).mount('#app') + import main.css
- `styles/theme.css`: bloque `@theme` con --color-* tokens; `components.css`; `animations.css`
- `data/*.json` expuestos por `constants/company.js`
- `import.meta.glob` eager para imágenes
- `vite.config.js`: alias `@`→src; `base` condicional por mode (`deployment`→`/repo/`)

## Clasificación GLM
- ADOPT: estructura, App.vue orquestador, main.js, @theme tokens, datos JSON, import.meta.glob, alias @, base condicional, a11y (aria-*), WhatsApp flotante, SEO index.html
- ADAPT: paleta (→ sistema Urbanikawsay), tipografía (→ Inter+Poppins), secciones, projects.json (→ 3 proyectos)
- IGNORE: OrderModal + models/Order.js + copy psicología (no aplica a inmobiliaria)

## Nota simple-icons v16
LinkedIn **no está disponible** en simple-icons 16.28.0 (retirado de la marca).
Solución aplicada: Facebook vía simple-icons, YouTube vía path inline, LinkedIn path manual en AppFooter.
