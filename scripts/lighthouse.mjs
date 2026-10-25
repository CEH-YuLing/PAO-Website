import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { writeFile, mkdir } from 'node:fs/promises';

const url = 'http://127.0.0.1:3177/';
await mkdir('evidence', { recursive: true });
const chrome = await launch({ chromePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', chromeFlags: ['--headless=new', '--disable-gpu', '--no-first-run'] });
try {
  for (const mode of ['mobile', 'desktop']) {
    const flags = { port: chrome.port, logLevel: 'error', output: ['json', 'html'], onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], ...(mode === 'desktop' ? { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 } } : {}) };
    const result = await lighthouse(url, flags);
    if (!result) throw new Error('Lighthouse returned no result');
    await writeFile(`evidence/lighthouse-${mode}.json`, result.report[0]);
    await writeFile(`evidence/lighthouse-${mode}.html`, result.report[1]);
    const summary = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round((value.score || 0) * 100)]));
    console.log(JSON.stringify({ mode, scores: summary, metrics: { lcp: result.lhr.audits['largest-contentful-paint'].displayValue, cls: result.lhr.audits['cumulative-layout-shift'].displayValue }, failures: Object.entries(result.lhr.audits).filter(([, a]) => a.score !== null && a.score < .9 && a.scoreDisplayMode !== 'informative').map(([id, a]) => ({ id, title: a.title, score: a.score })) }));
  }
} finally { await chrome.kill(); }
