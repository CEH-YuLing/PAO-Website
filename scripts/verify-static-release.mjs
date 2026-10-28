import { readFile, access, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
const root = path.resolve('dist');
const manifest = JSON.parse(await readFile('release-manifest.json', 'utf8'));
for (const [name, expected] of Object.entries(manifest.files)) {
  const file = path.resolve(root, name);
  assert.ok(file.startsWith(root + path.sep), 'Invalid release path');
  assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'), expected, `Release file changed: ${name}`);
}
const names = [];
async function walk(dir, prefix = '') {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error('Release symlink denied');
    if (entry.isDirectory()) await walk(path.join(dir, entry.name), prefix + entry.name + '/');
    else names.push(prefix + entry.name);
  }
}
await walk(root);
assert.deepEqual(names.sort(), Object.keys(manifest.files).sort(), 'Release contains unexpected files');
for (const route of ['', 'en/', 'zh/', 'privacy/', 'en/privacy/', 'zh/privacy/']) await access(path.join(root, route, 'index.html'));
await access(path.join(root, '404.html'));
const headerRules = await readFile(path.join(root, '.htaccess'), 'utf8');
for (const rule of [
  'Header always set Strict-Transport-Security "max-age=31536000"',
  'Header always set X-Frame-Options "SAMEORIGIN"',
  'Header always set X-Content-Type-Options "nosniff"',
  'Header always set Referrer-Policy "strict-origin-when-cross-origin"',
]) assert.ok(headerRules.includes(rule), `Missing Hostinger security rule: ${rule}`);
await assert.rejects(access(path.join(root, 'editor')));
console.log(`PAO static release verified: ${names.length} files; source ${manifest.sourceCommit}. No Next.js/SWC compilation needed.`);
