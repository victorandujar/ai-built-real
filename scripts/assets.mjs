import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('public/fonts', { recursive: true });
await copyFile(
  'node_modules/@fontsource-variable/manrope/LICENSE',
  'public/fonts/Manrope-LICENSE.txt',
);
await copyFile(
  'node_modules/@fontsource/ibm-plex-mono/LICENSE',
  'public/fonts/IBM-Plex-Mono-LICENSE.txt',
);
await sharp('public/favicon.svg')
  .resize(192, 192)
  .png()
  .toFile('public/icon.png');
await sharp('public/favicon.svg')
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f5f5ed"/><text x="70" y="85" fill="#223b2d" font-size="22" font-family="Arial">AI-built → Real product.</text><path d="M70 120H1130" stroke="#d2d8c9"/><text x="65" y="255" font-size="96" font-family="Arial" fill="#223b2d" letter-spacing="-5">You built it with AI.</text><text x="65" y="365" font-size="96" font-family="Arial" fill="#68833d" letter-spacing="-5">Now make it real.</text><rect x="70" y="435" width="300" height="65" rx="4" fill="#d7f86e"/><text x="97" y="478" font-size="25" font-family="Arial" fill="#223b2d">Reality Check ↗</text><text x="70" y="574" fill="#576354" font-size="18" font-family="Arial">HUMAN JUDGEMENT. CLEAR PRIORITIES. YOUR NEXT MOVE.</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
