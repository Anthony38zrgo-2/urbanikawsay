# 11 — Validación Responsive Post-Reajuste (S0-S7)

Estado: `PASS` — verificado con capturas Playwright + auditoría DOM (sin 900/992)

## Resumen del reajuste S0-S7 (14-responsive-reajuste-plan.md)
- **S0 Fundación:** `--space-inline` clamp(1rem,4vw,1.5rem), `--space-section` clamp(3.5rem,8vw,6.5rem), `--space-section-dense`, `--breakpoint-*` (480/640/768/1024/1280), `page-shell overflow-x:clip`, `anchor-offset` clamp, `scrollbar-gutter:stable`. `--text-display-3xl` reducido a clamp(2rem,6vw,3.5rem).
- **S1 Header+Hero:** `--header-h:4.75rem` unificado (fix 4.5→4.75), gap clamp, logo clamp(9rem,22vw,12rem), `aria-hidden` visibility, hero `min-height clamp(32rem,88svh,44rem)` mobile + 90vh ≥1024, `hero-content padding-block clamp(3rem,10svh,6rem)`, safe-area.
- **S2 About+Projects:** About grid 992→1024, carrusel `clamp(320px,90vw,440px)` + aspect 5/6 móvil / 4/5 ≥640, nav 2.75rem + hit-area dots. Projects `media-frame--contain→cover`, gap clamp, `card-property height:100%`.
- **S3 Values/Team/Testimonials:** Values grid 4-col solo en 1280 (2-col en 1024), `hover:none` pausa animación, Testimonials nav 2.75rem + dot hit-area.
- **S4 Contact (crítico):** Eliminados breakpoints 900/992 → solo 1024 (1.4fr 1fr) y 1280 (320px 1fr 380px). `display:contents` solo en 1280, inputs `min-height:42px` (fix 31px), mascota clamp, eliminado `white-space:nowrap`.
- **S5 Footer+Modales:** Footer 1→2@640→4@1024 (fix 4@768), gap clamp, BaseModal `min(40rem,92vw)` + `min(86dvh,85vh)`, commercial-box 4-col solo en 768, carousel btn 2.75rem.
- **S6 Flotantes:** WhatsApp panel `max-height min(68dvh,32rem)` + `bottom calc(5rem+safe-area)`, whatsapp btn + social `calc(... + safe-area)`, gap 0.75rem.

## Capturas S7-final (docs/migration/.screenshots/sprint-7-final/)
- 320x800.png (1.30 MB)
- 375x800.png (1.62 MB)
- 640x900.png (1.97 MB)
- 768x1024.png (2.44 MB)
- 1024x768.png (2.26 MB)
- 1280x900.png (3.32 MB) — *artefacto lazy: Bani/paisaje ausentes (captura sin scroll)*
- 1440x900.png (3.52 MB)
- Sprint-0 baseline en `sprint-0/`, S7 intermedio en `sprint-7/`

## Capturas S7-final-fixed (con scroll lazy-fix — 2026-08-19, `scripts/verify-responsive.mjs` parcheado)
**Estado: PASS completo — Bani y paisaje ahora visibles**
- 320x800.png (1.90 MB) — +31% vs anterior (imágenes cargadas)
- 375x800.png (2.32 MB)
- 640x900.png (2.87 MB)
- 768x1024.png (3.11 MB)
- 1024x768.png (3.38 MB)
- 1280x900.png (4.19 MB) — Bani 340×510 y paisaje 540×303 verificados `complete:true naturalWidth>0`
- 1440x900.png (4.58 MB)
- Fix: scroll progresivo 400px/80ms + `waitForFunction #contacto img complete` antes de `screenshot` (ver `scripts/verify-responsive.mjs:34-48`). Auditoría DOM post-fix: hasHScroll false mantenido, `scrollWidth 1265/1280` idéntico.

## Auditoría DOM (Playwright evaluate — 2026-08-19)
| Viewport | docW/winW | containerPad | hasHScroll | shellOverflow | spaceInline | Veredicto |
|---|---|---|---|---|---|---|
| 320x800 | 305/320 | 16px | false | clip | clamp(1rem,4vw,1.5rem) | PASS |
| 375x800 | 360/375 | 16px | false | clip | clamp | PASS |
| 640x900 | 625/640 | 24px | false | clip | clamp | PASS |
| 768x1024 | 753/768 | 24px | false | clip | clamp | PASS |
| 1024x768 | 1009/1024 | 24px | false | clip | clamp | PASS |
| 1280x900 | 1265/1280 | 24px | false | clip | clamp | PASS |
| 1440x900 | 1425/1440 | 24px | false | clip | clamp | PASS |

- Zero `900px` / `992px` media queries restantes en `src` — verificado con `Select-String` 0 resultados.
- Build `vite build` PASS (index-uB9C7tf-.css 64.76 kB).

## Validación visual manual (sobre capturas S7-final)
| Viewport | Header | Hero CTA | About | Projects | Values | Contact | Footer | Flotantes | Estado |
|---|---|---|---|---|---|---|---|---|---|
| 320 | hamburger 44px, top 4.75 | CTA visible sin scroll 88svh, título 2rem legible | carrusel 5/6 no tapa | 1 col cover sin bandas | 1 col | stacked, inputs 42px, mascota clamp | 1 col | safe-area ok | PASS |
| 375 | id | id | id + dots 44px hit | 1 col | 1 col | stacked 640 grid | 1 col | ok | PASS |
| 640 | hamburger | - | - | 2 col | 2 col | 640 grid 180+1fr | 2 col | ok | PASS |
| 768 | nav horizontal + CTA | 90vh | 768 prior 1col (ahora espera 1024) | 2 col | 2 col | 1.4fr 1fr (2col) | 2 col | ok | PASS |
| 1024 | 3col projects? No, 3col | - | 1.15fr 1fr side-by-side | 3 col | 2 col (no 4) legible | 1.4fr 1fr, pad 1.75rem | 4 col | ok | PASS |
| 1280 | - | - | - | 3 col | 4 col | 3col 320/1fr/380, mascota 320 | 4 col | ok | PASS |
| 1440 | centrado 72rem | - | - | 3 col gap clamp | 4 col | 3col | 4 col | ok | PASS |

## Riesgos residuales
- Contact `display:contents` en 1280 pierde landmark del aside — aceptado por 3-col, validado que foco sigue accesible.
- Hero 5 imágenes absolute con kenburns sigue costoso en low-end — mitigado con `hover:none` pausa y `prefers-reduced-motion`.

## Criterios de aceptación (14-plan §17)
- [x] grep 900/992 → 0
- [x] container clamp, sin h-scroll 320/1440
- [x] header top alineado, Esc cierra, gap clamp
- [x] hero CTA visible 375×667/390×844
- [x] contact estable 1024/1280, inputs ≥42px, mascota clamp
- [x] footer 2@640 4@1024
- [x] flotantes safe-area, gap 0.75rem, sin overlap 600h
- [x] build PASS
