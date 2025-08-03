/**
 * Mask for phone numbers in the format: +XX (XXX) XXX XXXX
 * @type {import('@maskito/core').MaskitoMask}
 */
export const MASK_PHONE = [
  '+',
  /\d/,
  /\d/,
  ' ',
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
