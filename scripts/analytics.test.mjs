import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../public/analytics.js', import.meta.url), 'utf8');
function browser(hostname, pathname = '/') {
  const tags = [];
  const window = { location: { hostname, pathname } };
  const document = {
    getElementById: id => tags.find(tag => tag.id === id),
    createElement: () => ({}),
    head: { appendChild: tag => tags.push(tag) },
  };
  return { tags, window, context: vm.createContext({ window, document }) };
}

test('production pages queue the supplied GA ID once and load asynchronously', () => {
  for (const hostname of ['pao-os.com', 'www.pao-os.com']) {
    for (const pathname of ['/', '/en/', '/zh/', '/privacy/', '/en/privacy/', '/zh/privacy/']) {
      const b = browser(hostname, pathname);
      vm.runInContext(source, b.context);
      vm.runInContext(source, b.context);
      assert.equal(b.tags.length, 1);
      assert.equal(b.tags[0].async, true);
      assert.equal(b.tags[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-5KZRZBXREL');
      assert.deepEqual(Array.from(b.window.dataLayer, args => Array.from(args).slice(0, 1)), [['js'], ['config']]);
      assert.equal(b.window.dataLayer[1][1], 'G-5KZRZBXREL');
    }
  }
});

test('previews, lookalike domains and editor never load GA or queue events', () => {
  for (const [host, route] of [['localhost', '/'], ['127.0.0.1', '/'], ['preview.example.com', '/'], ['pao-os.com.example.com', '/'], ['pao-os.com', '/editor/'], ['pao-os.com', '/editor']]) {
    const b = browser(host, route);
    vm.runInContext(source, b.context);
    assert.equal(b.tags.length, 0);
    assert.equal(b.window.dataLayer, undefined);
  }
});
