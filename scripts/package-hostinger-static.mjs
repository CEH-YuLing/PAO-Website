import { cp, mkdir, readdir, readFile, writeFile, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const target = path.resolve(process.argv[2] || 'delivery/hostinger-static');
const output = path.resolve('out');
if (target === output || target.startsWith(output + path.sep)) throw new Error('Release target must be outside out/');
await mkdir(target, { recursive: true });
if ((await readdir(target)).length) throw new Error('Release target must be empty');
await cp(output, path.join(target, 'dist'), { recursive: true, dereference: false });
const files = {};
async function walk(dir, prefix = '') {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = prefix + entry.name;
    const file = path.join(dir, entry.name);
    if ((await lstat(file)).isSymbolicLink()) throw new Error('Release cannot contain symlinks');
    if (entry.isDirectory()) await walk(file, name + '/');
    else files[name] = createHash('sha256').update(await readFile(file)).digest('hex');
  }
}
await walk(path.join(target, 'dist'));
const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
await writeFile(path.join(target, 'release-manifest.json'), JSON.stringify({ sourceCommit, files }, null, 2) + '\n');
const pkg = { name: 'pao-website-static', version: '1.0.0', private: true, type: 'module', engines: { node: '>=20' }, scripts: { build: 'node verify-build.mjs' } };
await writeFile(path.join(target, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
await writeFile(path.join(target, 'package-lock.json'), JSON.stringify({ name: pkg.name, version: pkg.version, lockfileVersion: 3, requires: true, packages: { '': { name: pkg.name, version: pkg.version, engines: pkg.engines } } }, null, 2) + '\n');
await cp('scripts/verify-static-release.mjs', path.join(target, 'verify-build.mjs'));
await cp('LICENSE', path.join(target, 'LICENSE'));
await writeFile(path.join(target, '.gitignore'), 'node_modules/\n*.log\n');
await writeFile(path.join(target, '.gitattributes'), 'dist/** -text\n');
await writeFile(path.join(target, 'README.md'), `# PAO OS — Hostinger static release\n\nSource commit: ${sourceCommit}\n\nHostinger: select branch **hostinger-static**, framework **Other / static frontend**, Node.js **24.x**, build script **build**, output directory **dist**. No environment variables, Next.js compiler or server entry file are required.\n\nThis branch contains the precompiled website. Edit source on main, run npm run build:hostinger there, then package a new release with scripts/package-hostinger-static.mjs and publish the generated files to this branch. Do not edit generated dist files. The local editor is excluded.\n\nBuild checks the SHA-256 integrity of every static file. Third-party notices are included in dist/third-party-notices/.\n`);
console.log(JSON.stringify({ target, sourceCommit, fileCount: Object.keys(files).length }));
