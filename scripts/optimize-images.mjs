import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const sourceRoot = path.join(projectRoot, 'src', 'assets', 'images')
const regeneratedRoot = path.join(sourceRoot, 'regenerated')
const outputRoot = path.join(projectRoot, 'src', 'assets', 'generated')

const activeNames = new Set([
  'cuadro-01.png',
  'cuadro-02.png',
  'group-71.png',
  'group-72.png',
  'mapa.png',
  'proyecto-las-palmeras.png',
  'proyecto-villa-flores.png',
  'proyecto-villa-norte-3.png',
  'proyecto-el-milagro.png',
  'proyecto-guaral-village.png',
  'proyecto-villa-hermosa.png',
  'mascota-bani-v2.png',
  'detalle-contacto.png',
  'foto-el-milagro-1.png',
  'foto-el-milagro-2.png',
  'foto-el-milagro-3.png',
  'foto-el-milagro-4.png',
  'foto-las-palmeras-1.png',
  'foto-las-palmeras-2.png',
  'foto-las-palmeras-3.png',
  'foto-villa-flores-1.png',
  'foto-villa-flores-2.png',
  'foto-villa-flores-3.png',
  'foto-villa-hermosa-1.png',
  'foto-villa-hermosa-2.png',
  'foto-villa-norte-3-1.png',
  'foto-villa-norte-3-2.png',
  'foto-villa-norte-3-3.png',
  'foto-villa-norte-3-4.png',
  'logo-las-palmeras.png',
  'logo-villa-flores.png',
  'logo-villa-hermosa.png',
  'logo-villa-norte-3.png',
  'logo-el-milagro.png',
  'logo-guaral-village.png',
  'logo.png',
  'favicon-32.png',
  'favicon-192.png',
])

const roleFor = (name) => {
  if (name.startsWith('favicon-')) return 'favicon'
  if (name === 'logo.png' || name.startsWith('logo-')) return 'logo'
  if (name === 'mapa.png') return 'map'
  if (name.startsWith('proyecto-')) return 'project'
  if (name.startsWith('detalle-')) return 'background'
  if (name.startsWith('cuadro-') || name.startsWith('group-')) return 'hero'
  if (name.startsWith('foto-') || name.startsWith('mascota-')) return 'photo'
  return 'promo'
}

const widthsFor = (role, sourceWidth) => {
  const targets = {
    hero: [480, 768, 1024, 1280, 1600, 1920],
    map: [395, 640, 790, 1024, 1200],
    project: [320, 480, 640, 960, 1200],
    photo: [320, 480, 640],
    background: [480, 768, 1024, 1600],
    promo: [480, 768, 1024],
    logo: [512],
    favicon: [sourceWidth],
  }
  const valid = targets[role].filter((width) => width <= sourceWidth)
  return valid.length ? valid : [sourceWidth]
}

const baseName = (filename) => path.basename(filename, path.extname(filename))
const ensureDir = async (directory) => mkdir(directory, { recursive: true })
const toUrlPath = (filePath) => `./${path.relative(outputRoot, filePath).split(path.sep).join('/')}`

const sourceFor = async (filename) => {
  const regenerated = path.join(regeneratedRoot, filename)
  try {
    await stat(regenerated)
    return regenerated
  } catch {
    return path.join(sourceRoot, filename)
  }
}

const writeVariant = async ({ source, output, width, format, role }) => {
  let image = sharp(source).resize({ width, withoutEnlargement: true })
  if (format === 'avif') image = image.avif({ quality: role === 'project' ? 65 : 55, effort: 5 })
  if (format === 'webp') image = image.webp({ quality: role === 'project' ? 80 : 80, effort: 5, alphaQuality: 100 })
  if (format === 'png') image = image.png({ compressionLevel: 9, adaptiveFiltering: true })
  if (format === 'jpg') {
    image = image.flatten({ background: role === 'hero' ? '#0D4D2E' : '#FDFCF7' }).jpeg({ quality: 82, mozjpeg: true })
  }
  await image.toFile(output)
  return {
    src: toUrlPath(output),
    width,
    bytes: (await stat(output)).size,
  }
}

const sourceFiles = (await readdir(sourceRoot, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name))
  .map((entry) => entry.name)
  .sort()

await rm(outputRoot, { recursive: true, force: true })
await ensureDir(outputRoot)

const manifest = {}
const jsEntries = []

for (const filename of sourceFiles) {
  const source = await sourceFor(filename)
  const role = roleFor(filename)
  const metadata = await sharp(source).metadata()
  const sourceWidth = metadata.width
  const sourceHeight = metadata.height
  if (!sourceWidth || !sourceHeight) throw new Error(`No se pudo leer dimension: ${filename}`)

  if (!activeNames.has(filename)) {
    manifest[filename] = {
      name: filename,
      role,
      active: false,
      source: path.relative(projectRoot, source).split(path.sep).join('/'),
      sourceWidth,
      sourceHeight,
      formats: { avif: [], webp: [], png: [], jpg: [] },
    }
    continue
  }

  const widths = widthsFor(role, sourceWidth)
  const folder = path.join(outputRoot, baseName(filename))
  await ensureDir(folder)

  const fallbackFormat = role === 'favicon' || metadata.hasAlpha ? 'png' : 'jpg'
  const formats = { avif: [], webp: [], png: [], jpg: [] }
  if (role === 'favicon') {
    const output = path.join(outputRoot, filename)
    const variant = await writeVariant({ source, output, width: sourceWidth, format: 'png', role })
    formats.png.push({ ...variant, height: sourceHeight })
  } else {
    for (const width of widths) {
      const height = Math.round((sourceHeight / sourceWidth) * width)
      const avif = await writeVariant({
        source,
        output: path.join(folder, `${baseName(filename)}-${width}.avif`),
        width,
        format: 'avif',
        role,
      })
      const webp = await writeVariant({
        source,
        output: path.join(folder, `${baseName(filename)}-${width}.webp`),
        width,
        format: 'webp',
        role,
      })
      formats.avif.push({ ...avif, height })
      formats.webp.push({ ...webp, height })
    }

    const fallbackWidth = widths.at(-1)
    const fallbackHeight = Math.round((sourceHeight / sourceWidth) * fallbackWidth)
    const fallback = await writeVariant({
      source,
      output: path.join(folder, `${baseName(filename)}-${fallbackWidth}.${fallbackFormat}`),
      width: fallbackWidth,
      format: fallbackFormat,
      role,
    })
    formats[fallbackFormat].push({ ...fallback, height: fallbackHeight })

    if (filename === 'cuadro-01.png') {
      await sharp(source)
        .resize({ width: Math.min(1200, sourceWidth), withoutEnlargement: true })
        .flatten({ background: '#0D4D2E' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(outputRoot, 'og-image.jpg'))
    }
  }

  const entry = {
    name: filename,
    role,
    active: true,
    source: path.relative(projectRoot, source).split(path.sep).join('/'),
    sourceWidth,
    sourceHeight,
    width: formats[fallbackFormat].at(-1)?.width ?? sourceWidth,
    height: formats[fallbackFormat].at(-1)?.height ?? sourceHeight,
    formats,
    fallback: formats[fallbackFormat].at(-1),
  }
  manifest[filename] = entry

  const jsFormat = (format) => formats[format]
    .map((item) => `{ src: new URL(${JSON.stringify(item.src)}, import.meta.url).href, width: ${item.width}, height: ${item.height} }`)
    .join(', ')
  if (entry.active) {
    jsEntries.push(`${JSON.stringify(filename)}: { role: ${JSON.stringify(role)}, active: true, width: ${entry.width}, height: ${entry.height}, avif: [${jsFormat('avif')}], webp: [${jsFormat('webp')}], fallback: new URL(${JSON.stringify(entry.fallback.src)}, import.meta.url).href }`)
  }
}

await writeFile(path.join(outputRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
await writeFile(
  path.join(outputRoot, 'image-assets.js'),
  `// Generated by scripts/optimize-images.mjs. Do not edit manually.\nexport const imageAssets = {\n  ${jsEntries.join(',\n  ')}\n}\n`,
  'utf8',
)

const activeBytes = Object.values(manifest)
  .filter((entry) => entry.active)
  .reduce((sum, entry) => sum + entry.formats.webp.reduce((bytes, item) => bytes + item.bytes, 0), 0)

console.log(`Optimized ${sourceFiles.length} source images.`)
console.log(`Active WebP variants: ${(activeBytes / 1024).toFixed(1)} KB total.`)
console.log(`Creative replacements can be placed in ${path.relative(projectRoot, regeneratedRoot)} and processed again.`)
