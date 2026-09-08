import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('public/fonts', { recursive: true });
await copyFile(
  'node_modules/@fontsource-variable/archivo/LICENSE',
  'public/fonts/Archivo-LICENSE.txt',
);
await copyFile(
  'node_modules/@fontsource/ibm-plex-mono/LICENSE',
  'public/fonts/IBM-Plex-Mono-LICENSE.txt',
);
await copyFile(
  'node_modules/@fontsource/instrument-serif/LICENSE',
  'public/fonts/Instrument-Serif-LICENSE.txt',
);
await sharp('public/favicon.svg')
  .resize(192, 192)
  .png()
  .toFile('public/icon.png');
await sharp('public/favicon.svg')
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f0eee7"/><text x="65" y="80" fill="#25251f" font-family="Arial" font-size="24" font-weight="bold">real product.</text><path d="M65 116h1070" stroke="#d0cdc2"/><text x="60" y="255" fill="#25251f" font-family="Arial" font-size="108" letter-spacing="-6" font-weight="bold">Built with AI.</text><text x="60" y="365" fill="#25251f" font-family="Arial" font-size="108" letter-spacing="-6" font-weight="bold">Ready for</text><text x="60" y="485" fill="#c4472d" font-family="Georgia" font-style="italic" font-size="125" letter-spacing="-6">real life.</text><text x="65" y="572" fill="#68665c" font-family="Arial" font-size="17">A HUMAN REVIEW. A CLEAR NEXT MOVE. STILL YOUR PRODUCT.</text><g transform="translate(835 210) rotate(14)"><rect width="245" height="245" rx="35" fill="none" stroke="#9b3724" stroke-width="26"/><rect x="-18" y="-18" width="245" height="245" rx="35" fill="none" stroke="#c4472d" stroke-width="26"/></g></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
