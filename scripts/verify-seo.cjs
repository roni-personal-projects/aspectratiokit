const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../dist/index.html');
if (!fs.existsSync(htmlPath)) {
  console.error('dist/index.html not found! Run build first.');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

console.log('=== SEO AUDIT VERIFICATION ===\n');

// 1. Meta Tags Checks
const checks = [
  { name: 'Title Tag', test: /<title>([^<]+)<\/title>/i },
  { name: 'Meta Description', test: /<meta\s+name="description"\s+content="([^"]+)"/i },
  { name: 'Meta Keywords', test: /<meta\s+name="keywords"\s+content="([^"]+)"/i },
  { name: 'Canonical Tag', test: /<link\s+rel="canonical"\s+href="([^"]+)"/i },
  { name: 'Robots Tag', test: /<meta\s+name="robots"\s+content="([^"]+)"/i },
  { name: 'OG Title', test: /<meta\s+property="og:title"\s+content="([^"]+)"/i },
  { name: 'OG Description', test: /<meta\s+property="og:description"\s+content="([^"]+)"/i },
  { name: 'OG Image', test: /<meta\s+property="og:image"\s+content="([^"]+)"/i },
  { name: 'OG Image Width', test: /<meta\s+property="og:image:width"\s+content="([^"]+)"/i },
  { name: 'OG Image Height', test: /<meta\s+property="og:image:height"\s+content="([^"]+)"/i },
  { name: 'OG URL', test: /<meta\s+property="og:url"\s+content="([^"]+)"/i },
  { name: 'OG Type', test: /<meta\s+property="og:type"\s+content="([^"]+)"/i },
  { name: 'OG Site Name', test: /<meta\s+property="og:site_name"\s+content="([^"]+)"/i },
  { name: 'Twitter Card', test: /<meta\s+name="twitter:card"\s+content="([^"]+)"/i },
  { name: 'Twitter Title', test: /<meta\s+name="twitter:title"\s+content="([^"]+)"/i },
  { name: 'Twitter Description', test: /<meta\s+name="twitter:description"\s+content="([^"]+)"/i },
  { name: 'Twitter Image', test: /<meta\s+name="twitter:image"\s+content="([^"]+)"/i },
  { name: 'Schema JSON-LD', test: /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i },
];

let allPassed = true;
for (const c of checks) {
  const match = html.match(c.test);
  if (match) {
    console.log(`[PASS] ${c.name}: ${match[1].slice(0, 80)}${match[1].length > 80 ? '...' : ''}`);
  } else {
    console.error(`[FAIL] ${c.name} NOT FOUND!`);
    allPassed = false;
  }
}

// 2. Keyword Occurrence Check
console.log('\n=== TARGET KEYWORDS CHECK ===\n');
const targetKeywords = [
  'aspect ratio calculator',
  '16:9 aspect ratio calculator',
  'tire aspect ratio calculator',
  'image aspect ratio calculator',
  '16x9 aspect ratio calculator',
  'aspect ratio calculator inches',
  'aspect ratio calculator for images',
  'aspect ratio calculator pixels',
];

for (const kw of targetKeywords) {
  const regex = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const matches = html.match(regex);
  const count = matches ? matches.length : 0;
  if (count > 0) {
    console.log(`[PASS] Keyword "${kw}" found: ${count} time(s)`);
  } else {
    console.error(`[FAIL] Keyword "${kw}" NOT found in HTML!`);
    allPassed = false;
  }
}

// 3. Word Count of the SEO Guide Section
console.log('\n=== SEO GUIDE WORD COUNT (Target: 800 - 1200 words) ===\n');

const occurrences = html.split('The Complete Aspect Ratio Calculator Guide');
if (occurrences.length > 1) {
  const beforeTitle = occurrences[0];
  const lastSectionIndex = beforeTitle.lastIndexOf('<section');
  const afterTitle = occurrences[1];
  const nextSectionIndex = afterTitle.indexOf('</section>');
  const fullGuideHtml = html.substring(
    lastSectionIndex,
    occurrences[0].length + 'The Complete Aspect Ratio Calculator Guide'.length + nextSectionIndex + '</section>'.length
  );

  let text = fullGuideHtml
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  console.log(`Extracted SEO guide visible word count: ${wordCount} words`);

  if (wordCount >= 800 && wordCount <= 1200) {
    console.log(`[PASS] Word count (${wordCount}) is strictly within the 800 - 1200 words requirement!`);
  } else if (wordCount < 800) {
    console.warn(`[WARN] Word count (${wordCount}) is UNDER 800 words by ${800 - wordCount} words.`);
    allPassed = false;
  } else {
    console.warn(`[WARN] Word count (${wordCount}) is OVER 1200 words by ${wordCount - 1200} words.`);
    allPassed = false;
  }
} else {
  console.error('[FAIL] Could not isolate guide section from HTML.');
  allPassed = false;
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\nALL SEO VALIDATIONS PASSED PERFECTLY!\n');
}
