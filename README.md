# Urbanikawsay Inmobiliaria — Modernización Vue 3

Sitio web de Urbanikawsay Inmobiliaria migrado desde WordPress (Elementor +
Hello theme + Slider Revolution + WooCommerce residual) a **Vue 3 + Vite 8 +
Tailwind CSS v4** como SPA de una sola página con navegación por anclas.

## Stack
- Vue 3.5 (Composition API, `<script setup>`) · JavaScript
- Vite 8 + `@tailwindcss/vite` → Tailwind v4 CSS-first (sin `tailwind.config.js`)
- `simple-icons` (path de Facebook) + iconografía SVG propia en `BaseIcon`
- Deploy: GitHub Pages (base `/urbanikawsay/`)

## Estructura
```
src/
├── assets/images/        PNG migrados + favicon + logo
├── assets/generated/     Derivados AVIF/WebP/PNG y manifest generado
├── components/
│   ├── layout/           AppHeader, AppFooter
│   ├── sections/         Hero, About, Team, Projects, Values, Contact
│   └── ui/               WhatsAppButton, BaseModal, ProjectModal,
│                         ReserveLotModal, BaseButton, BaseIcon
├── composables/          useWhatsApp, useModal, useScrollLock
├── constants/            site.js
├── data/                 site.json, projects.json
├── styles/               theme.css (tokens), components.css, animations.css
├── App.vue               orquestador
├── main.css
└── main.js
```

## Scripts
```bash
npm install          # instalar dependencias
npm run dev          # dev server (localhost:5173)
npm run build        # build de producción (base /)
npm run build:deployment  # build para GitHub Pages (base /urbanikawsay/)
npm run preview      # previsualizar build
npm run deploy       # publicar a gh-pages (tras build:deployment)
npm run images:optimize # generar derivados responsive con sharp
npm run images:check    # validar presupuesto de bytes y resolucion
```

## Variables de entorno (opcionales)
Copia `.env.example` a `.env` y define si se usa un proveedor de formularios:
- `VITE_FORMSPREE_ID` — ID de formulario Formspree
- `VITE_WEB3FORMS_KEY` — clave Web3Forms

> Por defecto los formularios usan `mailto:` como fallback. No commitear `.env`.

## Design tokens
Paleta de `diseño/paleta-moderna.css` (verde bosque 60% + verdes 30% + ámbar
10%) formalizada como tokens en `src/styles/theme.css`. Ver
`docs/migration/04-color-system.md` para contraste WCAG.

## SEO / 301
Las URLs legacy (`/proyecto/`, `/acerca-de-nosotros/`, `/contactenos/`,
`/separa-tu-lote/`, fichas `/proyecto/*`) se consolidan a la SPA vía
`public/404.html` (redirección JS, GitHub Pages no soporta 301 server-side).
Meta SEO completa + JSON-LD RealEstateAgent en `index.html`.

## Documentación
`docs/migration/` — inventario legacy, análisis de referencia, tokens, arquitectura,
mapa de migración, SEO, subagentes, plan y backlog.

El backlog creativo de regeneración está en `REGENERAR_IMAGENES_BACKLOG.md`.
Las entregas externas deben colocarse en `src/assets/images/regenerated/` y luego
procesarse con `npm run images:optimize`.
