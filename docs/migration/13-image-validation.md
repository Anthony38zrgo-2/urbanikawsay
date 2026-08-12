# 13 - Validacion de Imagenes

Iteracion: `MEDIA-01`
Baseline: `bd6303c`
Visual intent: `REDESIGN`

## Resultado tecnico

| Validacion | Resultado |
|---|---|
| `npm run images:optimize` | PASS |
| `npm run images:check` | PASS con warnings de regeneracion |
| `npm run build` | PASS |
| `npm run build:deployment` | PASS |
| Assets huérfanos en `dist` | NO |
| Imports `import.meta.glob` globales | ELIMINADOS |

## Metricas actuales

- 15 fuentes procesadas por el pipeline.
- 11 assets activos en el manifest de runtime.
- 1722.3 KB en variantes WebP activas.
- 82 archivos de imagen emitidos incluyendo AVIF, WebP, JPEG y fallbacks PNG.
- 4.2 MB de archivos emitidos incluyendo fallbacks; los navegadores modernos
  reciben AVIF/WebP mediante `<picture>`.

## Warnings esperados

- El mapa actual sigue pendiente de regeneracion y conserva 790 px de ancho.
- Los masters hero entregados tienen 1586 px de ancho, suficiente para el layout
  actual, aunque ligeramente por debajo del objetivo recomendado de 1600 px.
- El pipeline ya consume los siete masters externos entregados.

## Resultado visual

`INCONCLUSIVE`.

La integracion responsive, los ratios y el pipeline estan implementados. La
comparacion visual final permanece `INCONCLUSIVE` hasta validar el mapa pendiente
y capturar los estados responsive con los nuevos masters.

## Accesibilidad

- Los textos `alt` existentes se conservan.
- Cada imagen responsive emite `width` y `height` para reducir layout shift.
- La primera slide conserva `loading=eager` y `fetchpriority=high`.
- Slides secundarias, mapa y proyectos usan carga diferida.
- El logo mantiene `alt` vacio dentro de un enlace con nombre accesible.
