(() => {
'use strict';
const rows = globalThis.J6_APPENDIX || [];
const buttons = [...document.querySelectorAll('[data-play]')];
let audio=null,activeButton=null,activeRow=null,timer=null,generation=0;
const clearTimer=()=>{if(timer!==null)clearTimeout(timer);timer=null;};
function stop(message='已停止。'){
 generation++;clearTimer();
 if(audio){audio.onplaying=audio.onended=audio.onerror=null;audio.pause();audio.removeAttribute('src');audio.load();audio=null;}
 if(activeButton)activeButton.setAttribute('aria-pressed','false');
 if(activeRow&&message)activeRow.querySelector('.row-status').textContent=message;
 activeButton=null;activeRow=null;
}
function play(button){
 const index=Number(button.dataset.play),language=button.dataset.language,row=rows[index];
 if(!Number.isInteger(index)||index<0||!row||(language!=='ja'&&language!=='en'))return;
 const text=language==='en'?row.spokenEN:row.spokenJP; if(!text)return;
 stop();
 const token=generation;activeButton=button;activeRow=button.closest('.study-row');const status=activeRow.querySelector('.row-status');status.classList.remove('error');status.textContent='正在載入 Google 語音…';button.setAttribute('aria-pressed','true');
 const live=()=>token===generation;
 const fail=()=>{if(!live())return;stop('');status.classList.add('error');status.textContent='Google 語音未能播放。請確認網路，再按朗讀重試；不會改用裝置聲音。';};
 try{
  audio=new Audio();audio.preload='none';audio.playbackRate=Number(document.getElementById('speed').value)||1;
  audio.onplaying=()=>{if(!live())return;clearTimer();status.textContent=language==='en'?'Google 英語朗讀中。':'Google 日語朗讀中。';timer=setTimeout(fail,45000);};
  audio.onended=()=>{if(live()){stop('');status.textContent='朗讀完畢。';}};
  audio.onerror=fail;
  audio.src=`https://translate.google.com/translate_tts?ie=UTF-8&tl=${language}&client=tw-ob&q=${encodeURIComponent(text)}`;
  timer=setTimeout(fail,12000);const p=audio.play();if(p&&typeof p.catch==='function')p.catch(fail);
 }catch(e){fail();}
}
buttons.forEach(b=>b.addEventListener('click',()=>play(b)));
document.getElementById('stop').addEventListener('click',()=>stop());
document.getElementById('speed').addEventListener('change',()=>{if(audio)audio.playbackRate=Number(document.getElementById('speed').value)||1;});
document.getElementById('expand').addEventListener('click',event=>{const open=event.currentTarget.getAttribute('aria-expanded')!=='true';event.currentTarget.setAttribute('aria-expanded',String(open));event.currentTarget.textContent=open?'收合全部':'展開全部';document.querySelectorAll('details').forEach(d=>{d.open=open;});if(!open)stop();});
document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(!d.open&&activeRow&&d.contains(activeRow))stop();}));
window.addEventListener('pagehide',()=>stop());
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop('已暫停，回來後請重新按朗讀。');});
})();
