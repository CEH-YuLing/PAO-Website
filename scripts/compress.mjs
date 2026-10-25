import { readdir, readFile, writeFile } from 'node:fs/promises';
import { gzipSync, brotliCompressSync, constants } from 'node:zlib';
import path from 'node:path';
let count = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    if (!/\.(html|js|css|json|xml|txt)$/.test(entry.name)) continue;
    const data = await readFile(file);
    if (data.length < 800) continue;
    await writeFile(file + '.gz', gzipSync(data, { level: 9 }));
    await writeFile(file + '.br', brotliCompressSync(data, { params: { [constants.BROTLI_PARAM_QUALITY]: 9 } }));
    count++;
  }
}
await walk(path.resolve('out'));
console.log('Prepared gzip/Brotli for ' + count + ' static text assets.');
