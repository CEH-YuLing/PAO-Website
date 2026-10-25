import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

await mkdir('public/brand', { recursive: true });
await mkdir('public/images', { recursive: true });
// Fit the complete logo inside square icons; preserve its geometry and the original PNG.
await sharp('public/brand/pao-primary.png').resize(64, 64, { fit: 'contain', background: '#030b1e' }).png().toFile('public/brand/favicon.png');
await sharp('public/brand/pao-primary.png').resize(180, 180, { fit: 'contain', background: '#030b1e' }).png().toFile('public/brand/apple-touch-icon.png');
await sharp('public/images/pao-chibi-source.png').resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toFile('public/images/pao-hologram.webp');
await sharp('public/images/pao-chibi-source.png').resize({ width: 580, withoutEnlargement: true }).webp({ quality: 85, effort: 6 }).toFile('public/images/pao-hologram-mobile.webp');
const logo = (await readFile('public/brand/pao-primary.png')).toString('base64');
const og = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="g"><stop stop-color="#0b3972"/><stop offset="1" stop-color="#030b1e"/></radialGradient></defs><rect width="1200" height="630" fill="url(#g)"/><path d="M0 520H1200M0 110H1200" stroke="#245181" stroke-opacity=".4"/><image href="data:image/png;base64,${logo}" x="80" y="155" width="240" height="100"/><text x="78" y="350" font-family="Arial,sans-serif" font-weight="700" font-size="76" fill="#f4f8ff">Your AI Chief of Staff.</text><text x="83" y="413" font-family="Arial,sans-serif" font-size="23" fill="#96b8df">BUSINESS OPERATING SYSTEMS FOR SME</text><text x="83" y="560" font-family="Arial,sans-serif" font-size="17" fill="#8badd4">pao-os.com</text><text x="1118" y="560" text-anchor="end" font-family="Arial,sans-serif" font-size="17" fill="#8badd4">Developed by IVN Media</text></svg>`;
await writeFile('public/images/og-pao.png', await sharp(Buffer.from(og)).png().toBuffer());
console.log('Generated favicon, touch icon, optimized mascot sizes and Open Graph image. Original logos untouched.');
await sharp('public/brand/pao-primary.png').resize({width:200}).webp({lossless:true}).toFile('public/brand/pao-primary-200.webp');
await sharp('public/brand/pao-secondary.png').resize({width:500}).webp({lossless:true}).toFile('public/brand/pao-secondary-500.webp');
