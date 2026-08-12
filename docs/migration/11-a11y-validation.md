# 11 — Auditoría de Accesibilidad e Interacción (AEST-012)

Estado: `PASS` con observaciones

## Verificaciones aplicadas
- **Menú móvil**: `aria-expanded`, `aria-controls`, cierre con Escape, cierre al seleccionar ancla.
- **Botones aero**: `focus-visible` ring ámbar (`--color-focus-ring` #FF9A00); `disabled`; target ≥44px.
- **Tabs (Misión/Visión)**: `role=tab`, `aria-selected`, `aria-controls`, `tabindex` roving, `role=tabpanel`, `aria-labelledby`.
- **Modales**: `role=dialog`, `aria-modal=true`, `aria-labelledby`, Escape, focus trap, restauración de focus.
- **Formularios**: `label` asociado, `aria-invalid`, `aria-describedby`, `aria-live` en errores.
- **WhatsApp**: `aria-expanded`, `aria-controls`, `aria-label` dinámico.
- **Iconos**: SVG decorativos con `aria-hidden="true"`; redes con `aria-label`.
- **Reduced motion**: `prefers-reduced-motion` desactiva transiciones de botones y animaciones hero.

## Contraste
- Texto principal / superficie: AA/AAA (paleta pre-aprobada).
- Botón aero primary (texto on-accent `#092E1C` sobre gradiente ámbar): AA para texto grande/botones.
- Botón aero secondary (texto inverse sobre verde): AA.
- WhatsApp flotante (texto inverse sobre verde): AA.
- Focus ring `#FF9A00` sobre superficies claras y oscuras: visible.

## Observaciones
- El avatar del equipo usa un icono `person` neutro en lugar de WhatsApp.
- Sin capturas/axe automático disponible; validación por inspección y patrón.
