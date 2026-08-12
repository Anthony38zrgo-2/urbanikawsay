# 11 — Baseline Visual y Auditoría (AEST-001)

Iteración: `AESTHETIC-01` · commit baseline: `5ba94c7` · visual intent: `REDESIGN`

## Estado funcional confirmado
- `npm run build` PASS en commit baseline.
- SPA Vue 3 single-page por anclas; sin router/Pinia/TS.
- Modales (Project/Reserve), WhatsApp flotante, formularios con `mailto:`.
- SEO: meta/OG/JSON-LD en `index.html`, robots/sitemap/404 en `dist`.

## Defectos y riesgos detectados (para corregir en la iteración)

| # | Superficie | Problema | Severidad |
|---|---|---|---|
| 1 | Header | `.side-nav.is-open` permanece `display:none` en móvil → el menú nunca se muestra | Alta |
| 2 | Card / card--feature | Sombra y gradientes usados como decoración (no flat) | Media |
| 3 | Projects | Tarjetas raíz son `<button>` gigantes → bloquean superficie flat + control aero interno | Media |
| 4 | Team avatar | Reutiliza el icono de WhatsApp, no representa a una persona | Baja |
| 5 | Hero | Todas las slides `loading="eager"` + `fetchpriority="high"`; overlay degradado | Media |
| 6 | WhatsApp | Botón `#25D366` fijo; verificar superposición con submit en móvil | Media |
| 7 | Social footer | URLs `#` (no resolubles); no inventar | Info |
| 8 | Contact | Header usa `background: var(--color-accent-gradient)` (aero en un control de botón OK) | Info |

## Nota de capturas
Sin infraestructura de capturas baseline en el entorno local. La validación visual
se hará contra el contrato `REDESIGN` (preservar contenido/jerarquía/acciones;
modernizar composición). No se exige paridad de píxeles con Elementor.

## Referencia de archivos a modificar
`theme.css`, `components.css`, `animations.css`, `App.vue`, `AppHeader.vue`,
`AppFooter.vue`, `HeroSection.vue`, `AboutSection.vue`, `TeamSection.vue`,
`ProjectsSection.vue`, `ValuesSection.vue`, `ContactSection.vue`,
`BaseButton.vue`, `BaseIcon.vue`, `BaseModal.vue`, `ProjectModal.vue`,
`ReserveLotModal.vue`, `WhatsAppButton.vue`.
