import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const projects = [
  {
    output: 'src/assets/images/proyecto-las-palmeras.png',
    base: 'src/assets/images/regenerated/proyecto-extra-1.png',
    logo: 'src/assets/images/logo-las-palmeras.png',
    name: 'Las Palmeras',
    logoMaxHeight: 480,
    logoMaxWidth: 650,
  },
  {
    output: 'src/assets/images/proyecto-villa-flores.png',
    base: 'src/assets/images/regenerated/proyecto-villa-norte.png',
    logo: 'src/assets/images/logo-villa-hermosa.png',
    name: 'Villa Flores',
    logoMaxHeight: 420,
    logoMaxWidth: 700,
  },
  {
    output: 'src/assets/images/proyecto-villa-norte-3.png',
    base: 'src/assets/images/regenerated/proyecto-villa-norte.png',
    logo: 'src/assets/images/logo-villa-norte-3.png',
    name: 'Villa Norte III',
    logoMaxHeight: 400,
    logoMaxWidth: 750,
  },
  {
    output: 'src/assets/images/proyecto-el-milagro.png',
    base: 'src/assets/images/regenerated/proyecto-extra-1.png',
    logo: 'src/assets/images/logo-el-milagro.png',
    name: 'El Milagro',
    logoMaxHeight: 480,
    logoMaxWidth: 650,
  },
  {
    output: 'src/assets/images/proyecto-guaral-village.png',
    base: 'src/assets/images/regenerated/proyecto-huaral-village.png',
    logo: 'src/assets/images/logo-guaral-village.png',
    name: 'Guaral Village',
    logoMaxHeight: 380,
    logoMaxWidth: 750,
  },
  {
    output: 'src/assets/images/proyecto-villa-hermosa.png',
    base: 'src/assets/images/regenerated/proyecto-huaral-village.png',
    logo: 'src/assets/images/logo-villa-hermosa.png',
    name: 'Villa Hermosa',
    logoMaxHeight: 420,
    logoMaxWidth: 700,
  }
];

async function run() {
  for (const p of projects) {
    console.log(`Processing ${p.name}...`);
    const baseMeta = await sharp(p.base).metadata();
    const W = baseMeta.width;
    const H = baseMeta.height;

    // Load and resize logo
    const resizedLogo = await sharp(p.logo)
      .resize({
        width: p.logoMaxWidth,
        height: p.logoMaxHeight,
        fit: 'inside',
        withoutEnlargement: false,
      })
      .toBuffer({ resolveWithObject: true });

    const logoW = resizedLogo.info.width;
    const logoH = resizedLogo.info.height;

    // Create a frosted glass / white badge for contrast
    const padX = 48;
    const padY = 32;
    const badgeW = logoW + padX * 2;
    const badgeH = logoH + padY * 2;
    const radius = 28;

    const badgeSvg = Buffer.from(`
      <svg width="${badgeW}" height="${badgeH}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#092e1c" flood-opacity="0.25"/>
          </filter>
        </defs>
        <rect x="0" y="0" width="${badgeW}" height="${badgeH}" rx="${radius}" ry="${radius}"
              fill="#ffffff" fill-opacity="0.95" filter="url(#shadow)"/>
        <rect x="1" y="1" width="${badgeW - 2}" height="${badgeH - 2}" rx="${radius - 1}" ry="${radius - 1}"
              fill="none" stroke="#ffffff" stroke-width="2" stroke-opacity="0.8"/>
      </svg>
    `);

    // Center position
    const posX = Math.round((W - badgeW) / 2);
    const posY = Math.round((H - badgeH) / 2);

    const logoPosX = posX + padX;
    const logoPosY = posY + padY;

    await sharp(p.base)
      .composite([
        {
          input: badgeSvg,
          top: posY,
          left: posX,
        },
        {
          input: resizedLogo.data,
          top: logoPosY,
          left: logoPosX,
        },
      ])
      .png({ quality: 95 })
      .toFile(p.output);

    console.log(`Saved ${p.output}`);
  }
}

run().catch(console.error);
