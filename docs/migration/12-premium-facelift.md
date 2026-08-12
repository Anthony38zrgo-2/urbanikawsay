# Urbanikawsay — Backlog Premium Facelift

Estado: `PLANNED`
Iteración: `PREMIUM-01`
Baseline técnico: commit `7560413` (post `AESTHETIC-01`, flat + aero aplicados).
SPA Vue 3 + Vite 8 + Tailwind v4. Rama: `main`.

## Objective

Facelift completo de la interfaz con dirección **premium y moderna** para el rubro
inmobiliario, trabajando **solo sobre estilos reutilizables** y conservando la
paleta de marca aprobada. Se convierte el CSS disperso en un sistema de estilos
coherente y reutilizable (design system ligero vía tokens + clases de componente).

- Elevar la percepción visual a premium/moderna mediante tipografía refinada,
  espaciado generoso, profundidad sutil, acento ámbar dosificado y jerarquía clara.
- Unificar todos los patrones (headers de sección, cards, badges, listas, forms,
  botones, media, tabs, hero, navegación) en clases reutilizables.
- Refactorizar todos los componentes `.vue` para consumir el sistema y eliminar
  CSS scoped duplicado.
- Preservar contenido, anclas, slugs, eventos de modal, formularios `mailto:`,
  SEO, assets y arquitectura Vue/Vite/Tailwind.

## Legacy Baseline

- La implementación actual ya tiene estructura Vue, tokens de color, componentes
  y modales flat + botones aero (iteración `AESTHETIC-01`).
- Los estilos de sección (títulos, lead, headings) están duplicados en cada
  componente con tamaños `clamp` propios.
- Cards, listas, forms, badges y tabs tienen estilos dispersos entre
  `components.css` y CSS scoped de cada componente.
- No existe un sistema de badges de estado ni cards inmobiliarias (precio/estado).
- Los forms (Contact, ReserveLot, WhatsApp) repiten estilos de field/input/error.
- No existe `media-frame` ni aspect-ratios centralizados.

## Visual Intent

`REDESIGN` premium/moderno para inmobiliaria. No se copia a Elementor; se busca
una composición sobria, lujosa y técnica, con jerarquía y legibilidad preservadas.

### Contrato Premium/Moderno
- **Tipografía refinada:** escala display mayor, tracking ajustado en titulares,
  `eyebrow` en mayúsculas con letter-spacing amplio, body con line-height generoso.
- **Espaciado premium:** mayor ritmo vertical de sección, padding generoso en
  cards, aire entre bloques.
- **Profundidad sutil:** hairline borders + sombra suave solo en property-cards y
  modales; nada de 3D pesado ni sombras decorativas en superficies planas.
- **Acento ámbar/oro** dosificado como realce premium (eyebrow, divisores, stats
  clave, CTA).
- **Imágenes consistentes:** aspect-ratio uniforme, marcos refinados, zoom sutil
  en hover de propiedad.
- **Micro-interacciones:** transiciones suaves y contenidas (transform/opacity),
  respetando `prefers-reduced-motion`.
- **Jerarquía clara:** patrón `eyebrow → title → lead` reutilizable.

## In Scope
- Tokens premium (tipografía, ritmo, sombras suaves, hairline, acento).
- Primitivas de layout, section headers, cards, badges/chips, listas, forms,
  botones, media frames, tabs, hero, navegación y footer.
- Refactor de todos los componentes `.vue` al sistema reutilizable.
- Responsive, a11y, build, performance y release check.

## Out Of Scope
- Cambiar copy, navegación, URLs, anclas, slugs, SEO o integración de formularios.
- Añadir Vue Router, Pinia, TypeScript, librería de iconos o design-system externo.
- Inventar URLs de redes sociales que actualmente son `#`.
- Rediseñar el logotipo ni editar las imágenes originales.
- Introducir un segundo sistema visual paralelo o cambiar la paleta de marca.

## Execution Graph
```text
PREM-001 baseline
   ↓
PREM-002 tokens premium → PREM-003 layout primitives
   ↓
PREM-004 section-header · PREM-005 cards · PREM-006 badges/chips
PREM-007 lists · PREM-008 forms · PREM-009 buttons/actions
PREM-010 media frames · PREM-011 tabs · PREM-012 hero · PREM-013 nav/footer
   ↓
PREM-014 refactor de todos los .vue al sistema reutilizable
   ↓ BARRIER
PREM-015 responsive → PREM-016 a11y → PREM-017 visual regression → PREM-018 build/perf/release
```
