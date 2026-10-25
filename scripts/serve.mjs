import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createEditorService } from './editor-service.mjs';

const root = path.resolve('out');
const port = Number(process.env.PORT || 3177);
const editMode = process.argv.includes('--editor');
const editor = editMode ? await createEditorService({ projectRoot: fileURLToPath(new URL('..', import.meta.url)), schema: JSON.parse(await readFile(new URL('../lib/editor-schema.json', import.meta.url), 'utf8')), port }) : null;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon' };
const server = http.createServer(async (req, res) => {
  let requestPath;
  try { requestPath = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname); } catch { res.writeHead(400).end('Invalid path'); return; }
  if (editor && await editor.handle(req, res, requestPath)) return;
  if (requestPath.startsWith('/__editor/')) { res.writeHead(404, { 'Content-Type':'application/json', 'Cache-Control':'no-store' }).end(JSON.stringify({error:'Công cụ lưu chưa bật. Chạy npm run editor.'})); return; }
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, {Allow:'GET, HEAD'}).end(); return; }
  const servingRoot = editor?.getServingRoot() || root;
  const file = path.resolve(servingRoot, '.' + requestPath);
  if (file !== servingRoot && !file.startsWith(servingRoot + path.sep)) { res.writeHead(403).end(); return; }
  try {
    const info = await stat(file);
    const target = info.isDirectory() ? path.join(file, 'index.html') : file;
    const accept = req.headers['accept-encoding'] || '';
    let encoding;
    let data;
    for (const [token, suffix] of [['br','.br'],['gzip','.gz']]) {
      if (!accept.includes(token)) continue;
      try { data = await readFile(target + suffix); encoding = token; break; } catch { /* Normal static fallback. */ }
    }
    data ??= await readFile(target);
    const headers = { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': target.includes(path.sep + '_next' + path.sep + 'static' + path.sep) ? 'public, max-age=31536000, immutable' : 'no-cache', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Vary': 'Accept-Encoding' };
    if (encoding) headers['Content-Encoding'] = encoding;
    res.writeHead(200, headers);
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    try { res.end(await readFile(path.join(servingRoot, '404.html'))); } catch { res.end('Not found'); }
  }
});
server.listen(port, '127.0.0.1', () => console.log('PAO website ' + (editMode ? 'local editor: http://127.0.0.1:' + port + '/editor/' : 'static preview: http://127.0.0.1:' + port)));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {
  if (editor?.isBusy()) { console.log('Website build in progress; finish or recover it before stopping.'); return; }
  server.close(() => process.exit(0));
});
