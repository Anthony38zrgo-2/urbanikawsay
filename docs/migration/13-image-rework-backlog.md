# Urbanikawsay - Image Rework Backlog

Estado: `IN_PROGRESS`
Iteracion: `MEDIA-01`
Rama: `main`
Baseline: `bd6303c`

## Objetivo

Separar el trabajo creativo de regeneracion de imagenes del pipeline tecnico de
optimizacion. Las piezas que necesitan una herramienta externa estan descritas
en `REGENERAR_IMAGENES_BACKLOG.md`. El pipeline local solo consume entregas
aprobadas y genera sus derivados web.

## Alcance

- Regenerar y retocar hero, mapa y portadas de proyectos mediante herramienta externa.
- Mantener el logo empresarial sin cambios visuales.
- Optimizar logo, favicons y assets aprobados a AVIF/WebP/PNG.
- Usar `ResponsiveImage.vue` y un manifest explicito.
- Eliminar imports eager globales que incorporan assets no usados.
- Preservar alt, copy, claims, slugs, SEO y datos de negocio.

## Dependencias

```text
REGENERAR_IMAGENES_BACKLOG.md
        ↓ entrega de masters aprobados
MEDIA-001 optimizer + manifest
        ↓
MEDIA-002 ResponsiveImage + imports explicitos
        ↓
MEDIA-003 ratios, metadata y loading
        ↓
MEDIA-004 visual/a11y/performance validation
```

## Items tecnicos

### MEDIA-001 - Pipeline reproducible de assets

- **Input:** `src/assets/images`, entregas aprobadas en `src/assets/images/regenerated/`.
- **Output:** `src/assets/generated/`, manifest JSON y modulo JS.
- **Implementado:** `scripts/optimize-images.mjs`, `npm run images:optimize`.
- **Reglas:** no upscale; AVIF primero, WebP segundo, PNG fallback; transparencia preservada.

### MEDIA-002 - Manifest e imagen responsive

- **Input:** manifest generado.
- **Output:** `src/assets/generated/image-assets.js`, `src/components/ui/ResponsiveImage.vue`.
- **Reglas:** `srcset`, `sizes`, `width`, `height`, `loading`, `fetchpriority`, `decoding`.

### MEDIA-003 - Migracion de consumidores

- **Consumers:** Hero, About, Projects, ProjectModal y AppHeader.
- **Reglas:** eliminar `import.meta.glob(.../*.png)` eager; mantener claves de `projects.json`.
- **Reglas visuales:** hero 16:10, mapa vertical sin crop, proyectos 4:3 sin recortar logos.

### MEDIA-004 - SEO y favicons

- **Input:** derivados optimizados y hero aprobado.
- **Output:** `index.html` con favicon y Open Graph compatibles.
- **Reglas:** Open Graph en PNG/JPEG; no depender solo de AVIF/WebP.

### MEDIA-005 - Validacion y presupuesto

- `npm run images:check` debe pasar.
- `npm run build` debe pasar.
- `npm run build:deployment` debe pasar.
- No deben emitirse assets huérfanos en `dist`.
- Visual intent: `REDESIGN`, no paridad pixel a pixel.
