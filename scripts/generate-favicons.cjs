const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Clean modern SVG favicon for AspectRatioKit
// Designed to look ultra-crisp at 16x16, 32x32, 64x64, 180x180 and high-DPI displays
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#141417" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#50e3c2" />
      <stop offset="100%" stop-color="#00dfd8" />
    </linearGradient>
  </defs>

  <!-- Background squircle -->
  <rect x="2" y="2" width="124" height="124" rx="28" fill="url(#bgGrad)" stroke="#27272a" stroke-width="4" />

  <!-- Subtle 16:9 ratio inner guide frame -->
  <rect x="16" y="28" width="96" height="54" rx="6" fill="none" stroke="#50e3c2" stroke-width="2" stroke-opacity="0.2" stroke-dasharray="4 3" />

  <!-- 16:9 Brand typography -->
  <g id="brand-text">
    <text x="64" y="80" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" font-size="46" font-weight="900" letter-spacing="-2">
      <tspan fill="url(#cyanGrad)">16</tspan><tspan fill="#71717a">:</tspan><tspan fill="#ffffff">9</tspan>
    </text>
  </g>
</svg>`;

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');

  // 1. Write public/favicon.svg
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon.trim());
  console.log('✓ Written public/favicon.svg');

  // 2. Generate PNGs at 16x16, 32x32, 48x48, 180x180
  const svgBuffer = Buffer.from(svgFavicon);

  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  console.log('✓ Generated PNG favicons and apple-touch-icon.png');

  // 3. Assemble proper multi-resolution favicon.ico containing 16x16, 32x32, and 48x48 PNG frames
  const images = [
    { size: 16, buffer: png16 },
    { size: 32, buffer: png32 },
    { size: 48, buffer: png48 },
  ];

  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(images.length, 4); // count of images

  let offset = 6 + (images.length * 16);
  const entries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.size === 256 ? 0 : img.size, 0); // width
    entry.writeUInt8(img.size === 256 ? 0 : img.size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size in bytes
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...entries,
    ...images.map(img => img.buffer)
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Assembled multi-resolution public/favicon.ico (' + icoBuffer.length + ' bytes)');
}

main().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
