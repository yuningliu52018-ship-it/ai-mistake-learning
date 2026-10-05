const test=require('node:test'), assert=require('node:assert/strict'), fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),base=require('../voiced-comics-data.js'),variants=require('../comic-language-variants.js');
const release=require('./release-expectations.json'),baselineAssets=require('./fixtures/baseline75-assets.json');
const {ComicPlayer,resolveComic}=require('../voiced-comic.js');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const oldIds=new Set(base.slice(0,75).map(c=>c.id)),added=base.slice(75);
test('all original 75 Japanese/English records and 299 original assets remain byte-for-byte unchanged',()=>{
 assert.equal(hash(JSON.stringify(base.slice(0,75))),'ae689d173d3c62590bf2ebe068ba1ba8886498915cbb5c7cef6d50cad6dd6677');
 assert.equal(hash(JSON.stringify(Object.fromEntries(Object.entries(variants).filter(([id])=>oldIds.has(id))))),'81a95fa7f0797a1cb11687b69209df338a36c8cd96ed95b2e722b2a14c2b8e91');
 for(const [name,sha] of Object.entries(baselineAssets)) assert.equal(hash(fs.readFileSync(path.join(root,'assets/japanese-comics',name))),sha,name);
});
test('only complete reviewed J4–J6 lessons are released, with explicit bilingual totals',()=>{
 assert.equal(base.length,release.total);assert.equal(Object.keys(variants).length,release.total);
 assert.equal(added.length,Object.values(release.addedLessons).reduce((a,b)=>a+b,0));
 for(const lesson of ['j4','j5','j6']) assert.equal(added.filter(c=>c.lesson===lesson).length,release.addedLessons[lesson]||0);
 const html=fs.readFileSync(path.join(root,'japanese-comics.html'),'utf8');
 assert.match(html,new RegExp('全部 <span>'+release.total+'</span>'));
 for(const [lesson,count] of Object.entries(release.addedLessons)){assert.equal((html.match(new RegExp('data-lesson="'+lesson+'"','g'))||[]).length,count);assert.match(html,new RegExp('data-filter="'+lesson+'"[^>]*>初級複習 '+lesson.toUpperCase()+' <span>'+count));}
});
test('public expansion contains no private Library/source paths, messages or notebook identifiers',()=>{
 const publicData=JSON.stringify([added,Object.fromEntries(Object.entries(variants).filter(([id])=>!oldIds.has(id)))]);
 assert.doesNotMatch(publicData,/libfile_|file_000|Sentinel_|sourceFile|sourceBlock|sourceInventory|oneNotePage|\/workspace\/|sharepoint\.com|1drv\.ms/);
});
for(const c of added)for(const lang of ['ja','en']){
 const cfg=resolveComic(c,lang);
 test(`${c.id} ${lang}: checked full image, thumbnail, panel geometry and all ordered cues`,()=>{
  assert.equal(cfg.panels.length,4);assert.ok(cfg.cues.some(q=>q.text),'not an entirely silent comic');
  assert.ok(cfg.caption&&cfg.grammar&&cfg.title&&cfg.provenance);
  for(const name of [cfg.image,cfg.image.replace(/\.webp$/,'-thumb.webp')]) assert.ok(fs.statSync(path.join(root,name)).size>1000,name);
  let prev=-1;
  cfg.panels.forEach((p,i)=>{assert.ok(p.first>prev);prev=p.first;assert.equal(cfg.cues[p.first].panel,i);const [x,y,w,h]=p.crop.split(' ').map(Number);assert.ok(x>=0&&y>=0&&w>0&&h>0&&x+w<=cfg.width&&y+h<=cfg.height);});
  cfg.cues.forEach(q=>{assert.ok(q.subtitle&&q.translation&&q.speaker&&q.sourceLabel);assert.equal(q.skipAudio,!q.text);assert.ok(q.text.length<200);if(lang==='en'){assert.equal(q.sourceKind,'adapted');assert.equal(q.sourceLabel,'英文情境改編');assert.doesNotMatch(q.text,/[\u3040-\u30ff\u3400-\u9fff]/);}else if(q.text){assert.doesNotMatch(q.text,/[\u3400-\u9fff]/,'Japanese spoken form must use checked kana');}});
 });
 test(`${c.id} ${lang}: every spoken cue requests only the matching Google voice`,()=>{
  for(let i=0;i<cfg.cues.length;i++){
   if(!cfg.cues[i].text)continue;let url=null;
   class Audio{constructor(){this.src='';}addEventListener(){}removeEventListener(){}removeAttribute(){this.src='';}pause(){}load(){}play(){url=this.src;return{catch(){}};}}
   const clock={setTimeout(){return 1},clearTimeout(){},setInterval(){return 1},clearInterval(){}};
   const player=new ComicPlayer({Audio,comic:cfg,clock});player.select(i);player.play({single:true});const u=new URL(url);assert.equal(u.origin,'https://translate.google.com');assert.equal(u.searchParams.get('tl'),lang);assert.equal(u.searchParams.get('q'),cfg.cues[i].text);player.stop();
  }
 });
}
