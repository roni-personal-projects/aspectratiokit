/**
 * AspectRatioKit Math & Ratio Utilities
 * 100% Client-side pure calculations
 */

export interface AspectRatioResult {
  ratioW: number;
  ratioH: number;
  decimal: number;
  decimalString: string;
  formattedRatio: string;
  closestStandard?: StandardRatio;
  orientation: 'landscape' | 'portrait' | 'square';
  megapixels: string;
  totalPixels: number;
}

export interface StandardRatio {
  name: string;
  ratioW: number;
  ratioH: number;
  decimal: number;
  category: 'video' | 'social' | 'photo' | 'display' | 'cinema';
  description: string;
  popularResolutions: Array<{ label: string; width: number; height: number }>;
  tailwindClass?: string;
}

export const COMMON_RATIOS: StandardRatio[] = [
  {
    name: '16:9 Widescreen',
    ratioW: 16,
    ratioH: 9,
    decimal: 1.7777777777777777,
    category: 'video',
    description: 'The global standard for YouTube, HD/4K television, presentations, and computer monitors.',
    popularResolutions: [
      { label: '4K UHD', width: 3840, height: 2160 },
      { label: 'QHD 1440p', width: 2560, height: 1440 },
      { label: 'Full HD 1080p', width: 1920, height: 1080 },
      { label: 'HD 720p', width: 1280, height: 720 },
      { label: 'SD 360p', width: 640, height: 360 },
    ],
    tailwindClass: 'aspect-video',
  },
  {
    name: '9:16 Vertical Video',
    ratioW: 9,
    ratioH: 16,
    decimal: 0.5625,
    category: 'social',
    description: 'The portrait video standard for TikTok, Instagram Reels, YouTube Shorts, and Snapchat.',
    popularResolutions: [
      { label: 'Full HD Vertical', width: 1080, height: 1920 },
      { label: '2K Vertical', width: 1440, height: 2560 },
      { label: 'HD Vertical', width: 720, height: 1280 },
    ],
    tailwindClass: 'aspect-9/16',
  },
  {
    name: '1:1 Square',
    ratioW: 1,
    ratioH: 1,
    decimal: 1.0,
    category: 'social',
    description: 'Perfect square, ubiquitous for profile pictures, avatars, product thumbnails, and Instagram feed posts.',
    popularResolutions: [
      { label: 'Instagram Square', width: 1080, height: 1080 },
      { label: 'Profile Avatar', width: 500, height: 500 },
      { label: 'Favicon / App Icon', width: 512, height: 512 },
    ],
    tailwindClass: 'aspect-square',
  },
  {
    name: '4:3 Standard Display',
    ratioW: 4,
    ratioH: 3,
    decimal: 1.3333333333333333,
    category: 'display',
    description: 'Classic TV and monitor aspect ratio, vintage video footage, iPad displays, and micro four-thirds cameras.',
    popularResolutions: [
      { label: 'iPad Retina', width: 2048, height: 1536 },
      { label: 'Super XGA', width: 1600, height: 1200 },
      { label: 'Standard XGA', width: 1024, height: 768 },
      { label: 'VGA', width: 640, height: 480 },
    ],
    tailwindClass: 'aspect-4/3',
  },
  {
    name: '3:2 Classic Photo',
    ratioW: 3,
    ratioH: 2,
    decimal: 1.5,
    category: 'photo',
    description: 'The native sensor standard for 35mm film, modern DSLR and mirrorless photography cameras.',
    popularResolutions: [
      { label: 'High Res 24MP', width: 6000, height: 4000 },
      { label: 'Pro 45MP', width: 8256, height: 5504 },
      { label: 'Web Photo', width: 1200, height: 800 },
      { label: '4x6 Print (300dpi)', width: 1800, height: 1200 },
    ],
    tailwindClass: 'aspect-3/2',
  },
  {
    name: '21:9 Ultrawide',
    ratioW: 21,
    ratioH: 9,
    decimal: 2.3333333333333335,
    category: 'display',
    description: 'Cinematic ultrawide monitors for immersive gaming, multi-window productivity, and Cinemascope films.',
    popularResolutions: [
      { label: 'Ultrawide QHD', width: 3440, height: 1440 },
      { label: 'Ultrawide 5K2K', width: 5120, height: 2160 },
      { label: 'Ultrawide Full HD', width: 2560, height: 1080 },
    ],
    tailwindClass: 'aspect-21/9',
  },
  {
    name: '4:5 Portrait Feed',
    ratioW: 4,
    ratioH: 5,
    decimal: 0.8,
    category: 'social',
    description: 'Instagram maximum portrait post size, occupying maximum vertical real estate in mobile feeds.',
    popularResolutions: [
      { label: 'Instagram High Res', width: 1080, height: 1350 },
      { label: 'Web Portrait', width: 800, height: 1000 },
    ],
    tailwindClass: 'aspect-4/5',
  },
  {
    name: '1.91:1 Social Share',
    ratioW: 191,
    ratioH: 100,
    decimal: 1.91,
    category: 'social',
    description: 'Recommended OpenGraph link preview image ratio for Twitter (X), Facebook, and LinkedIn card summaries.',
    popularResolutions: [
      { label: 'Recommended OG', width: 1200, height: 630 },
      { label: 'HiDPI OG', width: 2400, height: 1260 },
    ],
    tailwindClass: 'aspect-[1.91/1]',
  },
  {
    name: '19.5:9 Modern Mobile',
    ratioW: 195,
    ratioH: 90,
    decimal: 2.1666666666666665,
    category: 'display',
    description: 'Modern flagship smartphone screens (iPhone 14/15/16, Samsung Galaxy S23/S24).',
    popularResolutions: [
      { label: 'iPhone Pro Max', width: 1290, height: 2796 },
      { label: 'iPhone Standard', width: 1179, height: 2556 },
    ],
  },
  {
    name: '1.43:1 IMAX Film',
    ratioW: 143,
    ratioH: 100,
    decimal: 1.43,
    category: 'cinema',
    description: 'Authentic 70mm 15-perf IMAX film format as used by Christopher Nolan (Oppenheimer, Interstellar, Dunkirk).',
    popularResolutions: [
      { label: 'IMAX 4K Frame', width: 4096, height: 2864 },
    ],
  },
  {
    name: '2.39:1 Anamorphic',
    ratioW: 239,
    ratioH: 100,
    decimal: 2.39,
    category: 'cinema',
    description: 'The classical widescreen cinematic anamorphic film format (Panavision / CinemaScope).',
    popularResolutions: [
      { label: 'Cinema 4K DCI', width: 4096, height: 1714 },
      { label: 'Cinema 2K', width: 2048, height: 858 },
    ],
  },
  {
    name: '1.618:1 Golden Ratio',
    ratioW: 1618,
    ratioH: 1000,
    decimal: 1.618,
    category: 'photo',
    description: 'The divine proportion (Phi ~1.618:1) found in nature, classical architecture, and harmonious layout design.',
    popularResolutions: [
      { label: 'Golden Canvas', width: 1618, height: 1000 },
      { label: 'Golden 1920', width: 1920, height: 1187 },
    ],
  }
];

/**
 * Calculate Greatest Common Divisor using Euclidean Algorithm
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

/**
 * Check if two decimal ratios are close enough to be considered a standard ratio
 */
export function findClosestStandard(decimal: number, tolerance = 0.025): StandardRatio | undefined {
  let closest: StandardRatio | undefined;
  let minDiff = Infinity;

  for (const item of COMMON_RATIOS) {
    const diff = Math.abs(item.decimal - decimal);
    if (diff < minDiff && diff <= tolerance) {
      minDiff = diff;
      closest = item;
    }
  }

  return closest;
}

/**
 * Analyze width & height to extract all aspect ratio metrics
 */
export function analyzeDimensions(width: number, height: number): AspectRatioResult {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));

  const divisor = gcd(w, h);
  let ratioW = Math.round(w / divisor);
  let ratioH = Math.round(h / divisor);

  const decimal = w / h;
  const decimalString = decimal >= 1 ? `${decimal.toFixed(2)}:1` : `1:${(1 / decimal).toFixed(2)}`;

  // Orientation
  let orientation: 'landscape' | 'portrait' | 'square' = 'landscape';
  if (w === h) orientation = 'square';
  else if (h > w) orientation = 'portrait';

  // Megapixels
  const totalPixels = w * h;
  const mp = (totalPixels / 1_000_000).toFixed(1);
  const megapixels = `${mp} MP`;

  // Find closest standard if simplified ratio is unreadably large (e.g. 1918x1080 -> 959:540)
  const closestStandard = findClosestStandard(decimal);

  return {
    ratioW,
    ratioH,
    decimal,
    decimalString,
    formattedRatio: `${ratioW}:${ratioH}`,
    closestStandard,
    orientation,
    megapixels,
    totalPixels,
  };
}

/**
 * Calculate missing dimension from known dimension and ratio
 */
export function calculateHeight(width: number, ratioW: number, ratioH: number): number {
  if (!ratioW || ratioW <= 0) return 0;
  return Math.round((width * ratioH) / ratioW);
}

export function calculateWidth(height: number, ratioW: number, ratioH: number): number {
  if (!ratioH || ratioH <= 0) return 0;
  return Math.round((height * ratioW) / ratioH);
}

/**
 * Calculate Proportional Resizing
 */
export interface ResizeResult {
  width: number;
  height: number;
  scalePercent: number;
  megapixels: string;
  changeFactor: number;
}

export function resizeByPercent(origW: number, origH: number, percent: number): ResizeResult {
  const factor = percent / 100;
  const width = Math.max(1, Math.round(origW * factor));
  const height = Math.max(1, Math.round(origH * factor));
  const megapixels = ((width * height) / 1_000_000).toFixed(1) + ' MP';

  return {
    width,
    height,
    scalePercent: percent,
    megapixels,
    changeFactor: factor,
  };
}

export function resizeToWidth(origW: number, origH: number, targetW: number): ResizeResult {
  const factor = targetW / origW;
  const width = Math.max(1, Math.round(targetW));
  const height = Math.max(1, Math.round(origH * factor));
  const scalePercent = Math.round(factor * 100);
  const megapixels = ((width * height) / 1_000_000).toFixed(1) + ' MP';

  return {
    width,
    height,
    scalePercent,
    megapixels,
    changeFactor: factor,
  };
}

export function resizeToHeight(origW: number, origH: number, targetH: number): ResizeResult {
  const factor = targetH / origH;
  const width = Math.max(1, Math.round(origW * factor));
  const height = Math.max(1, Math.round(targetH));
  const scalePercent = Math.round(factor * 100);
  const megapixels = ((width * height) / 1_000_000).toFixed(1) + ' MP';

  return {
    width,
    height,
    scalePercent,
    megapixels,
    changeFactor: factor,
  };
}

/**
 * Crop Calculation
 */
export interface CropResult {
  cropWidth: number;
  cropHeight: number;
  trimWidth: number; // total horizontal pixels trimmed
  trimHeight: number; // total vertical pixels trimmed
  trimLeft: number; // per side (centered)
  trimRight: number;
  trimTop: number;
  trimBottom: number;
  percentRetained: number;
  percentTrimmed: number;
  cropAxis: 'horizontal' | 'vertical' | 'none';
  padPillarbox: number; // If fitting without crop, letterbox or pillarbox pixels
  padLetterbox: number;
}

export function calculateCrop(
  sourceW: number,
  sourceH: number,
  targetRatioW: number,
  targetRatioH: number
): CropResult {
  const currentRatio = sourceW / sourceH;
  const targetRatio = targetRatioW / targetRatioH;

  let cropWidth = sourceW;
  let cropHeight = sourceH;
  let cropAxis: 'horizontal' | 'vertical' | 'none' = 'none';

  let padPillarbox = 0;
  let padLetterbox = 0;

  if (Math.abs(currentRatio - targetRatio) < 0.0001) {
    // Exact match
    return {
      cropWidth: sourceW,
      cropHeight: sourceH,
      trimWidth: 0,
      trimHeight: 0,
      trimLeft: 0,
      trimRight: 0,
      trimTop: 0,
      trimBottom: 0,
      percentRetained: 100,
      percentTrimmed: 0,
      cropAxis: 'none',
      padPillarbox: 0,
      padLetterbox: 0,
    };
  }

  if (currentRatio > targetRatio) {
    // Image is wider than target: trim left and right (horizontal crop)
    cropAxis = 'horizontal';
    cropHeight = sourceH;
    cropWidth = Math.round(sourceH * targetRatio);
    // If padded to fill width: letterbox needed
    padLetterbox = Math.round((sourceW / targetRatio - sourceH) / 2);
  } else {
    // Image is taller than target: trim top and bottom (vertical crop)
    cropAxis = 'vertical';
    cropWidth = sourceW;
    cropHeight = Math.round(sourceW / targetRatio);
    // If padded to fill height: pillarbox needed
    padPillarbox = Math.round((sourceH * targetRatio - sourceW) / 2);
  }

  const trimWidth = Math.max(0, sourceW - cropWidth);
  const trimHeight = Math.max(0, sourceH - cropHeight);
  const trimLeft = Math.round(trimWidth / 2);
  const trimRight = trimWidth - trimLeft;
  const trimTop = Math.round(trimHeight / 2);
  const trimBottom = trimHeight - trimTop;

  const retainedArea = cropWidth * cropHeight;
  const totalArea = sourceW * sourceH;
  const percentRetained = Math.min(100, Number(((retainedArea / totalArea) * 100).toFixed(1)));
  const percentTrimmed = Number((100 - percentRetained).toFixed(1));

  return {
    cropWidth,
    cropHeight,
    trimWidth,
    trimHeight,
    trimLeft,
    trimRight,
    trimTop,
    trimBottom,
    percentRetained,
    percentTrimmed,
    cropAxis,
    padPillarbox,
    padLetterbox,
  };
}
