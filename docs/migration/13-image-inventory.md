# 13 - Inventario de Imagenes

Baseline: commit `bd6303c`.

## Assets activos

| Asset | Uso | Dimensiones actuales | Peso actual | Estado |
|---|---|---:|---:|---|
| `cuadro-01.png` | Hero + OG | 1586 x 992 | 1.84 MB | Regenerado |
| `cuadro-02.png` | Hero | 1586 x 992 | 2.19 MB | Regenerado |
| `group-71.png` | Hero | 1586 x 992 | 2.77 MB | Regenerado |
| `group-72.png` | Hero | 1586 x 992 | 2.47 MB | Regenerado |
| `mapa.png` | About | 790 x 1024 | 359 KB | Pendiente de redibujar |
| `proyecto-villa-norte.png` | Card + modal | 1448 x 1086 | 1.86 MB | Regenerado |
| `proyecto-huaral-village.png` | Card + modal | 1448 x 1086 | 2.06 MB | Regenerado |
| `proyecto-extra-1.png` | Card + modal | 1448 x 1086 | 2.17 MB | Regenerado |
| `logo.png` | Header | 2559 x 733 | 39 KB | Optimizar sin alterar |
| `favicon-32.png` | Favicon | 32 x 32 | 1 KB | Optimizar sin alterar |
| `favicon-192.png` | Favicon/apple | 192 x 192 | 9 KB | Optimizar sin alterar |

## Assets no publicados

Estos archivos son incorporados actualmente por el glob eager, pero no tienen
referencia directa en los datos ni componentes activos:

- `boto-el-milagro.png`
- `foto-wa-1.png`
- `foto-wa-2.png`
- `proyecto-extra-2.png`

Se conservan como fuente para trazabilidad, pero el manifest explicito no los
publicara hasta que exista una referencia de producto aprobada.

## Riesgos

- Los masters hero entregados tienen 1586 px de ancho, ligeramente por debajo del objetivo recomendado de 1600 px.
- El mapa sigue pendiente de regeneracion y conserva 790 px de ancho.
- El mapa vertical no debe entrar en un frame 4:3 con `object-fit: cover`.
- Las imagenes de proyectos no deben recortarse a 16:9 porque contienen marcas.
