# 11 — Barrera Responsive Post-Iteración (AEST-011)

Estado: `PASS` (basado en inspección de estilos y build; sin infraestructura de capturas)

## Correcciones aplicadas en la iteración
- Menú móvil: `.side-nav.is-open` ahora `display: flex` en `max-width: 767px`; se oculta en desktop.
- Header CTA migrado a `btn-aero`.
- Hero: `min-height` responsive con `clamp(36rem, 82svh, 52rem)` en móvil para no saturar pantallas cortas.
- Hero: solo la primera imagen `eager`; el resto `lazy`.
- Proyectos: grid 1 col (base) → 3 col (≥768px); card `article` flat.
- WhatsApp: botón flotante aero con `--aero-secondary-bg`; panel con `--shadow-modal` y superficie flat.
- Modal: `--shadow-modal` funcional sobre backdrop flat.
- Inputs: fondo `--color-surface-flat`, borde flat, `focus-visible` ring ámbar.

## Resultado por viewport
| Viewport | Estado | Notas |
|---|---|---|
| 320×800 | PASS | Sin overflow horizontal; header CTA accesible vía toggle; hero legible |
| 360×800 | PASS | Hero `clamp` evita 90vh excesivo |
| 390×844 | PASS | Menú móvil operable |
| 480×900 | PASS | Grids y botones sin saltos |
| 768×1024 | PASS | Nav horizontal; grids 2/3 col correctos |
| 1024×768 | PASS | Layout desktop sin colisiones |
| 1440×900 | PASS | Contenedor centrado; ritmo vertical consistente |

## Nota metodológica
Sin capturas reales en el entorno local. La validación se hizo sobre estilos
computados y build PASS. Se recomienda verificación visual manual al desplegar.
