# 05 — Target Architecture

## Stack
- Vue 3.5.x · Composition API `<script setup>` · JS (no TS)
- Vite 8.x + `@tailwindcss/vite` → Tailwind v4 CSS-first
- `simple-icons` (FB path) + SVG propios · gh-pages deploy

## Rendering
- **SPA single-page** con nav por anclas (#). Sin Vue Router / Pinia / SSR.
- Deploy: GitHub Pages, base `/urbanikawsay/` (mode=deployment).

## Estructura
```
src/
├── assets/images/            (PNG migrados + favicon + logo)
├── components/
│   ├── layout/  AppHeader.vue AppFooter.vue
│   ├── sections/ HeroSection AboutSection TeamSection ProjectsSection
│   │            ValuesSection ContactSection
│   └── ui/      WhatsAppButton BaseModal ProjectModal ReserveLotModal
│                BaseButton BaseIcon
├── composables/  useWhatsApp useModal useScrollLock
├── constants/    site.js
├── data/         site.json projects.json
├── styles/       theme.css components.css animations.css
├── App.vue
├── main.css
└── main.js
```

## Estado de modales
Vive en App.vue (estado local refs). Sin Pinia.
- CTA header "Separa tu lote" → reserveOpen
- ProjectsSection botón → projectOpen + projectSlug

## Formularios
Nativos Vue con validación (regex DNI 8 dígitos, teléfono PE 9 dígitos, email).
Envío: `mailto:` (fallback). Provider externo pendiente (URB-033).
