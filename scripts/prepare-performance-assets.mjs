import sharp from 'sharp';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

// Regenerate delivery variants only. The approved social cover stays untouched.
for (const width of [384, 400, 512, 768, 1000]) {
  await sharp('public/images/pao-chibi-source.png')
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 76, effort: 6 })
    .toFile(`public/images/pao-hologram-v2-${width}.webp`);
  await sharp('public/images/pao-chibi-source.png').resize({ width, withoutEnlargement: true })
    .avif({ quality: 57, effort: 4 }).toFile(`public/images/pao-hologram-v2-${width}.avif`);
}
await sharp('public/brand/pao-primary.png').resize({ width: 200 })
  .webp({ quality: 84, effort: 6 }).toFile('public/brand/pao-primary-v2-200.webp');

const source = 'node_modules/@fontsource-variable/manrope';
await mkdir('public/fonts', { recursive: true });
const css = await readFile(`${source}/index.css`, 'utf8');
const fontNames = [...css.matchAll(/url\(\.\/files\/([^)]*)\)/g)].map(match => match[1]);
for (const name of fontNames) {
  await copyFile(`${source}/files/${name}`, `public/fonts/${name.replace('.woff2', '-5.3.0.woff2')}`);
}
await copyFile(`${source}/LICENSE`, 'public/fonts/Manrope-LICENSE.txt');
await writeFile('app/manrope.css', css.replace(/url\(\.\/files\/([^)]*)\)/g,
  (_, name) => `url(/fonts/${name.replace('.woff2', '-5.3.0.woff2')})`));
console.log('Responsive artwork and versioned local fonts ready.');
