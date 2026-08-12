# 12 — Baseline Premium Facelift (PREM-001)

Iteración: `PREMIUM-01` · commit baseline: `7560413` · visual intent: `REDESIGN` (premium/moderno)

## Estado funcional confirmado
- `npm run build` PASS en commit baseline `7560413`.
- SPA Vue 3 single-page por anclas; sin router/Pinia/TS.
- Modales (Project/Reserve), WhatsApp flotante, formularios con `mailto:`.
- Base estética flat + aero ya aplicada por `AESTHETIC-01`.

## Superficie de estilos actual
| Superficie | Archivo | Observación |
|---|---|---|
| Tokens | `src/styles/theme.css` | Paleta 60-30-10; flat/aero tokens |
| Primitivas | `src/styles/components.css` | `.card`, `.badge-*`, `.btn-aero-*` |
| Animaciones | `src/styles/animations.css` | fade/kenburns/hero, reduced-motion |
| Secciones | `HeroSection/About/Team/Values/Projects/Contact` | títulos/leads con `clamp` propios |
| UI | `BaseButton/BaseModal/ProjectModal/ReserveLotModal/WhatsAppButton` | forms y cards dispersos |
| Layout | `AppHeader/AppFooter` | nav/footer con estilos propios |

## Defectos y oportunidades para la iteración
| # | Superficie | Oportunidad | Prioridad |
|---|---|---|---|
| 1 | Secciones | Encabezados duplicados (eyebrow/title/lead) → patrón `.section-header` | Alta |
| 2 | Cards | No hay card inmobiliaria (precio/estado) ni card-stat | Alta |
| 3 | Badges | Solo `badge-success/accent`; falta sistema de estados de lote | Media |
| 4 | Forms | field/input/error duplicados en 3 superficies | Media |
| 5 | Media | Imágenes con alturas fijas; falta `media-frame` + aspect-ratios | Media |
| 6 | Tabs | Tabs embebidos en ValuesSection; falta `.tabs-pill` | Baja |
| 7 | Tipografía | Tamaños `clamp` arbitrarios por componente | Alta |
| 8 | Profundidad | Sombras solo en aero/modal; falta sombra suave para property-card | Media |

## Nota de capturas
Sin infraestructura de capturas baseline local. La validación visual se hará contra
el contrato `REDESIGN` premium/moderno (preservar contenido/jerarquía/acciones;
modernizar composición). No se exige paridad de píxeles con Elementor.

## Referencia de archivos a modificar
`theme.css`, `components.css`, `animations.css`, y todos los componentes:
`App.vue`, `AppHeader.vue`, `AppFooter.vue`, `HeroSection.vue`, `AboutSection.vue`,
`TeamSection.vue`, `ProjectsSection.vue`, `ValuesSection.vue`,
`ContactSection.vue`, `BaseButton.vue`, `BaseModal.vue`, `ProjectModal.vue`,
`ReserveLotModal.vue`, `WhatsAppButton.vue`.
