import { access, lstat, readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';

// Remove only the generated editor route. Source/local editor remains available.
const root = path.resolve('out');
await access(path.join(root, 'index.html'));
// Static exports cannot emit HTTP headers via next.config; preserve server rules.
if (!Buffer.from(await readFile(path.join(root, '.htaccess'))).equals(await readFile('public/.htaccess'))) {
  throw new Error('Hostinger security headers were not exported correctly');
}
const editor = path.resolve(root, 'editor');
if (path.dirname(editor) !== root) throw new Error('Invalid generated editor path');
try {
  const info = await lstat(editor);
  if (info.isSymbolicLink() || !info.isDirectory()) throw new Error('Unexpected generated editor target');
  await rm(editor, { recursive: true });
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
for (const entry of await readdir(root)) {
  if (/^editor\.(?:html|txt)(?:\.(?:br|gz))?$/.test(entry)) await rm(path.join(root, entry));
}
for (const route of ['en', 'zh', 'privacy', 'en/privacy', 'zh/privacy']) await access(path.join(root, route, 'index.html'));
console.log('Hostinger static output ready: out/ (local editor excluded).');
