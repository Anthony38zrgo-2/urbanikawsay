# 02 — Legacy Inventory (Urbanikawsay)

Fuente viva: https://urbanikawsay.com/ (ver `url-referencia.txt`)
Capturado por Builder (DeepSeek V4 Flash Low) en F0. read-only.

## Stack WordPress confirmado
- WordPress 6.8.3 · Hello Elementor theme 3.4.5
- Elementor 3.33.1 + Elementor Pro 3.33.1
- Slider Revolution 6.6.7 (hero 4 slides)
- WooCommerce 4.6.2 (catálogo de proyectos; sin checkout real) → DROP mechanics
- Contact Form 7 6.1.3 · Flexy Breadcrumb 1.2.1 · EAEL 6.5.0 · Essential Blocks
- Popup Addon for Ninja Forms (magnific) · WhatsApp for WordPress (nta)
- jQuery 3.7.1 · Swiper 8 · Magnific · Sticky · SmartMenus
- Fonts self-host: Roboto, Roboto Slab, Inter, Open Sans, Poppins

## Páginas públicas (sitemap + menú)
| URL | Contenido |
|---|---|
| / | Slider hero 4 slides; "CONSTRUYE EL FUTURO SEGURO QUE TE MERECES" + CTA "Conoce más aquí"; cuadros CUADRO-POR-SEPARADO 01/02, Group-71/72; "DESCUBRE LO QUE TENEMOS…" + Contact Form 7 (795); bloque "Crédito contado"; "Clientes que ya cuentan con su título de propiedad" |
| /proyecto/ | Las Palmeras, Huaral, 120m², 20 min Megapuerto; features (Paneles Solares, Tanque, Vías, Seguridad); form separación |
| /proyecto/villa-norte/ | Ficha proyecto |
| /proyecto/guaral-villge/ | Ficha proyecto (typo) |
| /proyecto/villa-rica/ | Ficha proyecto |
| /acerca-de-nosotros/ | ¿Quiénes somos?; 5 tarjetas equipo; trayectoria; Misión/Visión; valores; atributos |
| /contactenos/ | "¡Llama ya!"; datos + horario; form |
| /separa-tu-lote/ | Form separación (CTA header, no en menú) |

## Datos de negocio
- Razón social: "Constructora e inmobiliaria urbania j&j e.i.r.l"
- Tel: 917 789 123 (footer) · 926 353 563 (contacto)
- Email: contacto@urbanikawsay.com
- Direcciones: Jr. Manuel Rivero #200 con Jr. C. A. Salaverry, Los Olivos 15304 / Sta Cruz de Pachacutec 155, Lima
- Horario: Lun–Vie 9:00–17:00 · Sab 9:00–13:00
- Redes footer: Facebook, LinkedIn, YouTube — **href="#" (rotas)** → sin URLs reales
- Año copyright: 2025 · Idioma: es-ES

## Copy residual / correcciones
- Form /proyecto/: "Respira Inmobiliaria" → **Urbanikawsay Inmobiliaria** (corregido en site.json/projects.json)
- /nosotros y /contacto contienen shortcodes WPBakery sin renderizar → no migrar (rewrite limpio)

## SEO legacy
- Title: "Urbanikawsay Inmobiliaria" / "<Page> – Urbanikawsay Inmobiliaria"
- Meta description: AUSENTE · OpenGraph: AUSENTE · JSON-LD: AUSENTE
- Canonical: self · robots.txt: Disallow /wp-admin/ · sitemap: WP core index
