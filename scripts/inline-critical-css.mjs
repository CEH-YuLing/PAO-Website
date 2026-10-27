import Beasties from 'beasties';
import {readdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';

const root=path.resolve('out');
const optimizer=new Beasties({
  path:root,publicPath:'/',remote:false,pruneSource:false,
  preload:'media',noscriptFallback:true,inlineFonts:true,preloadFonts:false,
  reduceInlineStyles:false,keyframes:'critical',logLevel:'warn',
  allowRules:[/^:root/,/^html/,/^body/,/^\*/,/^\.skip-link/,/^\.home-surface/,/^\.lower-page-background/,/^\.site-cursor/,
    /^\.(?:site-header|nav-|brand-|desktop-nav|mobile-nav|menu-toggle|site-language|hero|hologram|orbit|typing)/]
});
let count=0;
async function walk(dir){
  for(const item of await readdir(dir,{withFileTypes:true})){
    if(item.isSymbolicLink())throw new Error('Static output cannot contain symlinks');
    const file=path.join(dir,item.name);
    if(item.isDirectory()){if(item.name!=='editor')await walk(file);continue;}
    if(!item.name.endsWith('.html'))continue;
    const html=await readFile(file,'utf8');
    if(!html.includes('rel="stylesheet"'))continue;
    await writeFile(file,await optimizer.process(html));count++;
  }
}
await walk(root);
console.log(`Critical CSS prepared for ${count} public HTML documents; full stylesheets preserved.`);
