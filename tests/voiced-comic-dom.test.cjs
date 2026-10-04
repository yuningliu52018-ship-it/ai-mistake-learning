const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'voiced-comic.html'),'utf8'),code=fs.readFileSync(path.join(root,'voiced-comic.js'),'utf8'),comics=require('../voiced-comics-data.js');
function page(id,{imageError=false}={}){
 const all=[],loads=[],played=[],timers=new Map();let timerId=0;
 class El{
  constructor(tag='div'){this.tagName=tag;this.attrs={};this.dataset={};this.style={};this.listeners={};this.children=[];this.textContent='';this.hidden=false;this.disabled=false;all.push(this)}
  append(...nodes){this.children.push(...nodes)}
  setAttribute(k,v){this.attrs[k]=String(v)}removeAttribute(k){delete this.attrs[k]}getAttribute(k){return this.attrs[k]}
  addEventListener(k,f){(this.listeners[k]??=[]).push(f)}fire(k,e={}){e.target??=this;(this.listeners[k]||[]).forEach(f=>f(e))}focus(){}scrollIntoView(){}
  querySelector(s){if(s==='image')return image}
 }
 const ids=Object.fromEntries([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new El()]));const image=new El('image');
 const document={hidden:false,title:'',getElementById:id=>ids[id],createElement:tag=>new El(tag),createTextNode:text=>({textContent:text}),querySelectorAll:s=>s==='a'?['back-gallery','full-comic','full-image','previous-comic','next-comic'].map(k=>ids[k]):all.filter(e=>s==='[data-panel]'?e.dataset.panel!==undefined:e.dataset.cue!==undefined),listeners:{},addEventListener(k,f){this.listeners[k]=f}};
 const window={listeners:{},addEventListener(k,f){this.listeners[k]=f},Audio:class{constructor(){this.listeners={};this.src=''}addEventListener(k,f){this.listeners[k]=f}removeEventListener(k){delete this.listeners[k]}pause(){}removeAttribute(){this.src=''}load(){}play(){played.push(this.src);return Promise.resolve()}}};
 const location={search:id===undefined?'':`?comic=${id}`,href:''};
 const context={VOICED_COMICS:comics,document,window,location,navigator:{},Image:class{set src(url){this.url=url;loads.push(()=>imageError?this.onerror():this.onload())}},URLSearchParams,console,Date,setTimeout(f,ms){timers.set(++timerId,f);return timerId},clearTimeout(i){timers.delete(i)},setInterval(f,ms){timers.set(++timerId,f);return timerId},clearInterval(i){timers.delete(i)}};
 vm.runInNewContext(code,context);loads.forEach(f=>f());
 return {ids,image,document,window,all,played,location,timers};
}
for(const comic of comics)test(`${comic.id}: DOM renders all four mapped panels, exact script, links and no autoplay`,()=>{
 const p=page(comic.id),{ids}=p;assert.equal(ids['page-title'].textContent,comic.title);assert.equal(ids['comic-select'].children.length,29);assert.equal(ids['panel-nav'].children.length,4);assert.equal(ids['script-list'].children.length,comic.cues.filter(c=>c.text).length);assert.equal(p.image.attrs.href,comic.image);assert.equal(p.played.length,0);assert.equal(ids.play.disabled,false);assert.ok(ids['full-comic'].href.endsWith(`#comic=${comic.id}`));
 for(let i=0;i<4;i++){assert.equal(ids['panel-nav'].children[i].attrs['aria-label'],`第 ${i+1} 格：${comic.panels[i].title}`);ids['panel-nav'].children[i].fire('click');assert.equal(ids['panel-image'].attrs.viewBox,comic.panels[i].crop);assert.equal(ids.subtitle.textContent,comic.cues[comic.panels[i].first].subtitle)}
 ids.play.fire('click');assert.equal(p.played.length,1);assert.equal(ids.play.disabled,true);assert.equal(ids.pause.disabled,false);ids.pause.fire('click');assert.equal(ids['playback-status'].dataset.state,'paused');
 ids.play.fire('click');assert.equal(p.played.length,2);ids['next-comic'].fire('click');assert.equal(ids['playback-status'].dataset.state,'idle');assert.equal(p.timers.size,0);
 ids.play.fire('click');p.document.hidden=true;p.document.listeners.visibilitychange();assert.equal(ids['playback-status'].dataset.state,'paused');
 ids.play.fire('click');p.window.listeners.pagehide();assert.equal(p.timers.size,0);assert.equal(ids['playback-status'].dataset.state,'idle');
 ids['comic-select'].fire('change',{target:{value:comic.id}});assert.equal(p.location.href,`voiced-comic.html?comic=${comic.id}`);
});
test('old default URL still maps to first comic; missing IDs produce an honest not-found state',()=>{
 assert.equal(page().ids['page-title'].textContent,comics[0].title);
 const bad=page('does-not-exist');assert.equal(bad.ids.player.hidden,true);assert.equal(bad.played.length,0);assert.match(bad.ids['page-title'].textContent,/找不到/);
});
test('image errors disable playback and expose recovery text',()=>{
 const p=page(comics[4].id,{imageError:true});assert.equal(p.ids.play.disabled,true);assert.equal(p.ids['image-error'].hidden,false);assert.equal(p.ids['playback-status'].dataset.state,'error');assert.equal(p.played.length,0);
});

test('Stop remains available for paused or failed first spoken cue',()=>{
 const comic=comics.find(c=>c.cues[0].text);const p=page(comic.id);
 assert.equal(p.ids.stop.disabled,true);p.ids.play.fire('click');p.ids.pause.fire('click');assert.equal(p.ids.stop.disabled,false);p.ids.stop.fire('click');assert.equal(p.ids['playback-status'].dataset.state,'idle');assert.equal(p.ids.stop.disabled,true);
 assert.equal(page('bad').ids['full-image'].hidden,true);
});
