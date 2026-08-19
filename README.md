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
Copia `.env.example` a `.env` si necesitas cambiar el handle de Messenger:
- `VITE_MESSENGER_PAGE` — handle de la Página de Facebook (por defecto tomado
  de `src/data/site.json` → `footer.messengerPage` = `UrbanikawsayInmobiliaria`).

### Formularios → Messenger directo (sin email)
Los formularios de contacto (`#contacto`) y "Separa tu lote" ya **no usan
`mailto:`**. Al enviar, se abre `https://m.me/<Página>?text=<mensaje>` con el
mensaje del visitante pre-redactado. Para que el mensaje llegue a la bandeja de
la Página (Meta Business Suite → Mensajes), el visitante pulsa **Enviar** en
Messenger. Incluye honeypot anti-spam y fallback (copiar mensaje / WhatsApp) si
el navegador bloquea la ventana emergente.

> Nota técnica: una web estática no puede inyectar mensajes en Messenger sin
> exponer un token secreto. El enlace `m.me` es el medio oficial y queda
> **un clic extra** en Messenger. Si se quisiera envío 100% automático haría
> falta un Worker con Facebook Graph API (`PAGE_ACCESS_TOKEN`), fuera de GitHub Pages.

No commitear `.env`.

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
