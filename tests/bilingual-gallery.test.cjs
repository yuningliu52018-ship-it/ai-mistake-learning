const fs=require('fs'),vm=require('vm'),assert=require('assert').strict;
const root=require('path').resolve(__dirname,'..');
const html=fs.readFileSync(root+'/japanese-comics.html','utf8');
class El {
 constructor(id=''){this.id=id;this.dataset={};this.hidden=false;this.isConnected=true;this.attrs={};this.listeners={};this.textContent='';const values=new Set();this.classList={add:x=>values.add(x),remove:x=>values.delete(x),toggle:x=>{if(values.has(x)){values.delete(x);return false;}values.add(x);return true;},contains:x=>values.has(x)};}
 addEventListener(name,fn){(this.listeners[name]??=[]).push(fn)}
 fire(name,e={}){e.currentTarget=this;e.target??=this;e.preventDefault??=()=>{};for(const f of this.listeners[name]||[])f(e);}
 setAttribute(k,v){this.attrs[k]=v}getAttribute(k){return this.attrs[k]}
 focus(){document.activeElement=this}scrollTo(x,y){this.scrollLeft=x;this.scrollTop=y}
 closest(selector){return selector==='[hidden]'&&this.card?.hidden?this.card:null;}
 showModal(){this.open=true}close(){this.open=false}
}
const ids=['comic-viewer','viewer-stage','viewer-image','viewer-zoom','viewer-close','viewer-prev','viewer-next','viewer-title','viewer-label','viewer-position','viewer-original','viewer-error','result-count','viewer-voice','viewer-language-switch','viewer-language-ja','viewer-language-en','viewer-language-note'];const elements=Object.fromEntries(ids.map(id=>[id,new El(id)]));elements['comic-viewer'].open=false;
const cards=[...html.matchAll(/<article class="comic-card" data-lesson="(.*?)" data-comic="(.*?)">([\s\S]*?)<\/article>/g)].map(([,lesson,comic,body])=>{const c=new El();c.dataset={lesson,comic};const a=new El();a.card=c;a.dataset.open=comic;a.href='https://example.test/assets/japanese-comics/'+comic+'.png';const h=new El();h.textContent=body.match(/<h2>(.*?)<\/h2>/)[1];const l=new El();l.textContent=body.match(/<p class="lesson-label">(.*?)<\/p>/)[1];const grammar=new El();grammar.textContent=body.match(/<p class="grammar"[^>]*>(.*?)<\/p>/)[1];const description=new El();description.textContent=body.match(/<p class="card-description">(.*?)<\/p>/)[1];const image=new El();image.alt=body.match(/alt="(.*?)"/)[1];c.querySelector=s=>({'h2':h,'.lesson-label':l,'.grammar':grammar,'.card-description':description,'img':image,'a':a,'[data-open]':a})[s];return c;});
const filters=['all','l1','l2','l3','l4','l5','supplement','j1','j2','j3'].map(f=>{const e=new El();e.dataset.filter=f;return e});
const document={body:new El(),activeElement:null,getElementById:id=>elements[id],querySelectorAll:s=>s==='[data-comic]'?cards:filters};
let entry=0;let historyEntries=[{url:'https://example.test/japanese-comics.html',state:null}];const queued=[];const location={get href(){return historyEntries[entry].url;}};const window=new El();
const history={go(n){queued.push(()=>{entry=Math.max(0,Math.min(historyEntries.length-1,entry+n));window.fire('popstate');window.fire('hashchange')})},get state(){return historyEntries[entry].state},pushState(state,x,url){historyEntries=historyEntries.slice(0,entry+1);historyEntries.push({state,url:String(url)});entry++},replaceState(state,x,url){historyEntries[entry]={state,url:String(url)}},back(){queued.push(()=>{if(entry>0){entry--;window.fire('popstate');window.fire('hashchange')}})},forward(){if(entry<historyEntries.length-1){entry++;window.fire('popstate');window.fire('hashchange')}}};
const flush=()=>{while(queued.length)queued.shift()()};vm.runInNewContext(fs.readFileSync(root+'/japanese-comics.js','utf8'),{COMIC_LANGUAGE_VARIANTS:require(root+"/comic-language-variants.js"),document,window,location,history,URL,Set,console,navigator:{}});
const open=id=>cards[id].querySelector('a').fire('click');const close=()=>{elements['viewer-close'].fire('click');flush()};
for(const [f,n] of [['all',75],['l1',5],['l2',4],['l3',6],['l4',7],['l5',6],['supplement',1],['j1',13],['j2',17],['j3',16],['all',75]]){filters.find(x=>x.dataset.filter===f).fire('click');assert.equal(cards.filter(c=>!c.hidden).length,n)}
console.log('PASS simulated filter counts and URL state');
for(let i=0;i<85;i++){open(i%75);assert(elements['comic-viewer'].open);assert.equal(elements['viewer-title'].textContent,cards[i%75].querySelector('h2').textContent);close();assert(!elements['comic-viewer'].open);assert.equal(document.activeElement,cards[i%75].querySelector('a'));assert(!document.body.classList.contains('viewer-open'))}
console.log('PASS 85 simulated open/close cycles and trigger focus intent');
open(2);elements['viewer-close'].fire('click');elements['viewer-close'].fire('click');assert.equal(queued.length,1);flush();assert(!elements['comic-viewer'].open);history.forward();assert(elements['comic-viewer'].open);assert.equal(elements['viewer-position'].textContent,'3 / 75');history.back();flush();assert(!elements['comic-viewer'].open);
console.log('PASS double-close guard and Back/Forward state');
open(0);assert(elements['viewer-prev'].disabled);for(let i=0;i<85;i++)elements['viewer-next'].fire('click');assert.equal(elements['viewer-position'].textContent,'75 / 75');assert(elements['viewer-next'].disabled);for(let i=0;i<85;i++)elements['viewer-prev'].fire('click');assert.equal(elements['viewer-position'].textContent,'1 / 75');close();
console.log('PASS navigation bounds without wrapping');
open(0);elements['viewer-zoom'].fire('click');assert(elements['viewer-stage'].classList.contains('zoomed'));elements['comic-viewer'].fire('keydown',{target:elements['viewer-stage'],key:'ArrowRight'});assert.equal(elements['viewer-position'].textContent,'1 / 75');elements['viewer-next'].fire('click');assert(!elements['viewer-stage'].classList.contains('zoomed'));close();
console.log('PASS zoom preserves arrow-scroll behavior and next resets zoom');
history.pushState(null,'','https://example.test/japanese-comics.html#comic=l2-04-mitai');window.fire('hashchange');assert(elements['comic-viewer'].open);const count=historyEntries.length;close();assert(!elements['comic-viewer'].open);assert.equal(historyEntries.length,count);assert(!location.href.includes('#'));
console.log('PASS direct hash closes with replaceState instead of leaving page');

open(0);elements['viewer-language-en'].fire('click');assert(location.href.includes('lang=en'));assert.equal(elements['viewer-language-en'].attrs['aria-pressed'],'true');assert.match(elements['viewer-image'].src,/-en.webp$/);assert.match(elements['viewer-voice'].href,/lang=en/);
history.back();flush();assert(!location.href.includes('lang=en'));assert.doesNotMatch(elements['viewer-image'].src,/-en.webp$/);history.forward();assert.match(elements['viewer-image'].src,/-en.webp$/);
elements['viewer-language-ja'].fire('click');elements['viewer-language-en'].fire('click');close();assert(!elements['comic-viewer'].open);assert(!location.href.includes('#comic='));
for(let i=0;i<15;i++){open(0);elements['viewer-language-en'].fire('click');close();assert(!elements['comic-viewer'].open)}
open(0);elements['viewer-language-en'].fire('click');elements['viewer-next'].fire('click');const nextHasEnglish=!!require('../comic-language-variants.js')[cards[1].dataset.comic]?.en;assert.equal(elements['viewer-language-switch'].hidden,!nextHasEnglish);assert.equal(location.href.includes('lang=en'),nextHasEnglish);assert.equal(elements['viewer-voice'].href.includes('lang=en'),nextHasEnglish);close();
history.pushState(null,'','https://example.test/japanese-comics.html?lesson=l1&lang=en#comic=l1-01-polite-request');window.fire('popstate');assert.match(elements['viewer-image'].src,/-en.webp$/);close();assert(!location.href.includes('lang=en'));assert(!location.href.includes('#comic='));
console.log('PASS bilingual reader deep links, Back/Forward, repeated switch/close, adjacent language support');

filters.find(x=>x.dataset.filter==='all').fire('click');
for (const [id, editions] of Object.entries(require('../comic-language-variants.js'))) {
 const n=cards.findIndex(c=>c.dataset.comic===id);open(n);elements['viewer-language-en'].fire('click');assert.equal(elements['viewer-title'].textContent,editions.en.title);assert.equal(elements['viewer-image'].src,editions.en.image);assert.ok(elements['viewer-image'].alt.includes(editions.en.grammar));assert.ok(elements['viewer-language-note'].textContent.includes(editions.en.caption));elements['viewer-language-ja'].fire('click');assert.equal(elements['viewer-title'].textContent,cards[n].querySelector('h2').textContent);assert.ok(elements['viewer-language-note'].textContent.includes(cards[n].querySelector('.grammar').textContent));close();
}
console.log('PASS every published English gallery variant, correct descriptions and return to Japanese');

filters.find(x=>x.dataset.filter==='all').fire('click');
open(cards.findIndex(c=>c.dataset.comic==='j3-01-plain-verb-forms'));assert.equal(elements['viewer-language-switch'].hidden,true);assert.ok(!elements['viewer-language-note'].textContent.includes('兩版'));assert.ok(!elements['viewer-voice'].href.includes('lang=en'));close();
open(cards.findIndex(c=>c.dataset.comic==='j2-17-person-ni'));elements['viewer-language-en'].fire('click');elements['viewer-next'].fire('click');assert.equal(elements['viewer-language-switch'].hidden,true);assert.ok(!location.href.includes('lang=en'));assert.match(elements['viewer-image'].src,/j3-01-plain-verb-forms.webp$/);close();
console.log('PASS J3 Japanese-only gallery and adjacent English to Japanese transition');
