const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#141414"/>
    </linearGradient>
    <radialGradient id="meshBlue" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#0070f3" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0070f3" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="meshViolet" cx="95%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#7928ca" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#7928ca" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="meshPink" cx="65%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#ff0080" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#ff0080" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00dfd8"/>
      <stop offset="50%" stop-color="#7928ca"/>
      <stop offset="100%" stop-color="#ff0080"/>
    </linearGradient>
  </defs>

  <!-- Canvas Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#meshBlue)"/>
  <rect width="1200" height="630" fill="url(#meshViolet)"/>
  <rect width="1200" height="630" fill="url(#meshPink)"/>

  <!-- Subtle Inner Border -->
  <rect x="28" y="28" width="1144" height="574" rx="20" fill="none" stroke="#262626" stroke-width="1.5"/>

  <!-- Header / Brand -->
  <g transform="translate(80, 80)">
    <rect width="44" height="44" rx="10" fill="#ffffff"/>
    <text x="22" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#000000" text-anchor="middle">AR</text>
    
    <text x="60" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="700" fill="#ffffff" letter-spacing="-0.5">AspectRatio<tspan fill="#888888" font-weight="400">Kit</tspan></text>
    
    <rect x="290" y="8" width="220" height="28" rx="14" fill="#1c1c1c" stroke="#333333" stroke-width="1"/>
    <circle cx="308" cy="22" r="4.5" fill="#10b981"/>
    <text x="322" y="26.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#d1d5db" letter-spacing="0.5">100% CLIENT-SIDE &amp; FREE</text>
  </g>

  <!-- Main Headline with Keyword -->
  <text x="80" y="230" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="62" font-weight="800" fill="#ffffff" letter-spacing="-1.5">Aspect Ratio Calculator</text>
  <text x="80" y="290" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="700" fill="url(#textGrad)" letter-spacing="-0.5">Precision Image, Screen &amp; Dimension Toolkit</text>

  <!-- SEO Descriptions -->
  <text x="80" y="350" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="400" fill="#a1a1aa">
    Instant ratio finder, 16:9 &amp; 16x9 calculator, proportional resizer &amp; crop framing solver.
  </text>
  <text x="80" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="400" fill="#71717a">
    Convert pixels and inches, check standard display resolutions, and calculate tire aspect ratios.
  </text>

  <!-- Feature Pills Strip -->
  <g transform="translate(80, 440)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="220" height="42" rx="21" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
    <text x="110" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">16:9 &amp; 16x9 Widescreen</text>

    <!-- Pill 2 -->
    <rect x="236" y="0" width="230" height="42" rx="21" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
    <text x="351" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">Image Aspect Ratio Finder</text>

    <!-- Pill 3 -->
    <rect x="482" y="0" width="220" height="42" rx="21" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
    <text x="592" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">Pixels &amp; Inches Solver</text>

    <!-- Pill 4 -->
    <rect x="718" y="0" width="220" height="42" rx="21" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
    <text x="828" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">Tire Aspect Ratio Guide</text>
  </g>

  <!-- Footer / URL Branding -->
  <g transform="translate(80, 545)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="#71717a">
      https://aspectratiokit.pages.dev • Zero uploads • Fast in-browser mathematical precision
    </text>
  </g>
</svg>`;

const outputPath = path.resolve(__dirname, '../public/og-image.png');

sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile(outputPath)
  .then((info) => {
    console.log('Successfully generated og-image.png:', info);
  })
  .catch((err) => {
    console.error('Error generating og-image.png:', err);
    process.exit(1);
  });
