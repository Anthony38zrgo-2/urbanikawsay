import { readFile } from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const manifestPath = path.join(projectRoot, 'src', 'assets', 'generated', 'manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))

const budgets = {
  hero: { webp: 300_000, avif: 240_000 },
  map: { webp: 220_000, avif: 180_000 },
  project: { webp: 100_000, avif: 80_000 },
  logo: { webp: 50_000, avif: 40_000 },
  photo: { webp: 150_000, avif: 120_000 },
  background: { webp: 250_000, avif: 200_000 },
  promo: { webp: 200_000, avif: 160_000 },
}

const active = Object.values(manifest).filter((entry) => entry.active)
const failures = []

for (const entry of active) {
  const roleBudget = budgets[entry.role]
  for (const format of ['webp', 'avif']) {
    const largest = entry.formats[format].at(-1)
    if (largest && largest.bytes > roleBudget[format]) {
      failures.push(`${entry.name} ${format} ${(largest.bytes / 1024).toFixed(1)} KB > ${(roleBudget[format] / 1024).toFixed(1)} KB`)
    }
  }
  if (entry.role === 'project' && entry.sourceWidth < 640) {
    console.warn(`WARNING ${entry.name}: source width ${entry.sourceWidth}px; regeneration backlog requires >=640px.`)
  }
  if (entry.role === 'hero' && entry.sourceWidth < 1600) {
    console.warn(`WARNING ${entry.name}: source width ${entry.sourceWidth}px; regeneration backlog recommends >=1600px.`)
  }
}

if (failures.length) {
  console.error('Image budget failures:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(`Image budget PASS for ${active.length} active assets.`)
}
