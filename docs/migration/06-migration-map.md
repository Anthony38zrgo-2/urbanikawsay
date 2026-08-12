# 06 — Migration Map (Legacy → Vue)

| Legacy | Clase | Vue |
|---|---|---|
| Slider Revolution hero 4 slides | REBUILD | HeroSection (slider CSS) |
| "CONSTRUYE EL FUTURO…" + CTA | PRESERVE-ADAPT | HeroSection contenido |
| Cuadros artwork | PRESERVE | Hero/Features imágenes |
| "DESCUBRE LO QUE TENEMOS…" + CF7 | REBUILD | ContactSection (form Vue) |
| Header sticky + nav + CTA | REBUILD | AppHeader + ReserveLotModal |
| Footer | REBUILD | AppFooter |
| Flexy Breadcrumb | DROP | — |
| /proyecto/ (Las Palmeras) | PRESERVE-ADAPT | ProjectsSection |
| 3 productos WooCommerce | REBUILD (DROP ecom) | ProjectsSection → ProjectModal |
| /acerca-de-nosotros/ | PRESERVE-ADAPT | AboutSection + TeamSection + ValuesSection |
| /contactenos/ | PRESERVE-ADAPT | ContactSection |
| /separa-tu-lote/ | REBUILD | ReserveLotModal |
| WhatsApp for WP (nta) | REPLACE | WhatsAppButton |
| Ninja Forms popups + Magnific | DROP | BaseModal (Vue) |
| Contact Form 7 | REPLACE | forms Vue + mailto |
| EAEL / Essential Blocks | DROP | componentes Vue |
| FontAwesome | REPLACE | SVG propios + simple-icons |
| 5 Google Fonts | REPLACE | Inter + Poppins |
| jQuery / Swiper / SmartMenus / Sticky | REPLACE/DROP | CSS + Vue |
| WooCommerce cart/checkout | DROP | — |
| WP emoji/hooks/i18n/dashicons | DROP | — |
| Slider Revolution rs6 | DROP | HeroSection CSS |

## Visual intent
REDESIGN con jerarquía legacy preservada (REFRESH mayoritario). Paleta nueva
(`paleta-moderna.css`) tiene precedencia.
