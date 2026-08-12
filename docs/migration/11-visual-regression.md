# 11 — Regresión Visual de la Iteración Estética (AEST-013)

Estado: `INCONCLUSIVE` (sin baseline de capturas; verificado contra contrato REDESIGN)

## Clasificación por superficie
| Superficie | Clase | Resultado |
|---|---|---|
| Header + menú | REDESIGN | PASS (contenido/rutas preservados; bug de menú corregido) |
| Hero | REDESIGN | PASS (copy + CTA preservados; overlay sólido; eager/lazy optimizado) |
| About | REDESIGN | PASS (contenido preservado; superficie flat) |
| Team | REDESIGN | PASS (avatar neutro; contenido preservado) |
| Projects/features | REDESIGN | PASS (3 proyectos + features preservados; card flat + botón aero interno) |
| Values | REDESIGN | PASS (tabs + valores + atributos preservados) |
| Contact/form | REDESIGN | PASS (datos + mailto preservados; inputs flat) |
| Modales | REDESIGN | PASS (fichas + separación funcional preservadas) |
| WhatsApp | REDESIGN | PASS (número/mensajes preservados) |
| Footer | REDESIGN | PASS (contacto/legal/redes preservados; iconos normalizados) |

## Diferencia intencional vs regresión
- Intencional: eliminación de gradientes/sombras decorativas en cards; botones aero; overlay sólido en hero; card de proyecto como `<article>` flat.
- No hay FAIL de contenido, jerarquía, rutas, acciones ni responsive.

## Nota
La validación visual real (capturas legacy vs candidato) requiere infraestructura
de screenshots no disponible en el entorno. Pendiente verificación manual al desplegar.
