import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE_URL = process.env.VERIFY_URL || 'http://127.0.0.1:4173/';
const OUT_DIR = process.env.OUT_DIR || 'docs/migration/.screenshots/sprint-0';

const viewports = [
  { name: '320x800', width: 320, height: 800 },
  { name: '375x800', width: 375, height: 800 },
  { name: '640x900', width: 640, height: 900 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '1280x900', width: 1280, height: 900 },
  { name: '1440x900', width: 1440, height: 900 },
];

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
let failed = 0;

for (const vp of viewports) {
  const page = await context.newPage();
  await page.setViewportSize({ width: vp.width, height: vp.height });
  console.log(`→ ${vp.name} → ${BASE_URL}`);
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
    // Scroll progresivo para disparar loading="lazy" (Contacto: mascota + paisaje)
    await page.evaluate(async () => {
      const step = 400;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 80));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 400));
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 300));
    });
    // Esperar a que las imágenes de contacto terminen de cargar (máx 5s, no bloqueante)
    await page.waitForFunction(() => {
      const imgs = [...document.querySelectorAll('#contacto img')];
      if (imgs.length < 2) return false;
      return imgs.every(i => i.complete && i.naturalWidth > 0);
    }, null, { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(400);
    const path = join(OUT_DIR, `${vp.name}.png`);
    await page.screenshot({ path, fullPage: true });
    console.log(`  ✓ saved ${path}`);
  } catch (e) {
    console.error(`  ✗ ${vp.name} failed:`, e.message);
    failed++;
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`Done. Screenshots in ${OUT_DIR}. Failed: ${failed}`);
process.exit(failed > 0 ? 1 : 0);
