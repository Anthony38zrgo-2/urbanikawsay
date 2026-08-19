import { chromium } from 'playwright';

const BASE_URL = 'http://127.0.0.1:4173/';
const viewports = [
  { name: '320x800', w: 320, h: 800 },
  { name: '375x800', w: 375, h: 800 },
  { name: '640x900', w: 640, h: 900 },
  { name: '768x1024', w: 768, h: 1024 },
  { name: '1024x768', w: 1024, h: 768 },
  { name: '1280x900', w: 1280, h: 900 },
  { name: '1440x900', w: 1440, h: 900 },
];

const browser = await chromium.launch();
const ctx = await browser.newContext();
for (const vp of viewports) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: vp.w, height: vp.h });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const res = await page.evaluate(() => {
    const docW = document.documentElement.scrollWidth;
    const winW = window.innerWidth;
    const bodyOverflow = getComputedStyle(document.body).overflowX;
    const shellOverflow = getComputedStyle(document.querySelector('.page-shell')||document.body).overflowX;
    const hasHScroll = docW > winW + 1;
    // find any element wider than viewport
    const offenders = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width > window.innerWidth + 2 && r.width < 5000) {
        // ignore large fixed overlays
        if (!el.classList.contains('modal-overlay') && !el.classList.contains('hero-slider')) {
          offenders.push({ tag: el.tagName, cls: el.className?.toString().slice(0,60), w: Math.round(r.width), x: Math.round(r.x) });
        }
      }
    });
    const containerPad = getComputedStyle(document.querySelector('.container-page')||document.body).paddingLeft;
    const spaceInline = getComputedStyle(document.documentElement).getPropertyValue('--space-inline');
    const spaceSection = getComputedStyle(document.documentElement).getPropertyValue('--space-section');
    const anchor = getComputedStyle(document.querySelector('.anchor-offset')||document.body).scrollMarginTop;
    return { docW, winW, hasHScroll, bodyOverflow, shellOverflow, containerPad, spaceInline: spaceInline.trim(), spaceSection: spaceSection.trim(), anchor: anchor.trim(), offenders: offenders.slice(0,5) };
  });
  console.log(`\n=== ${vp.name} ===`);
  console.log(JSON.stringify(res, null, 2));
  console.log(res.hasHScroll ? '❌ H-SCROLL DETECTADO' : '✓ No h-scroll');
  await page.close();
}
await browser.close();
