import {state,go} from './state.js';
import {Hero,Dashboard,Incident,RootCause,Corrective} from './views.js';
import {mountIntro,unmountIntro} from './demo-intro/intro.js';
import {
  syncSelectionEntry,
  selectionReturnUrl,
  startPageFromQuery,
} from './selectionReturn.js';

const app=document.querySelector('#app');
const labels=['ダッシュボード','不具合詳細','原因調査','是正・承認'];
const icons=['▦','▣','⌁','✓'];

syncSelectionEntry();
const embedIntro=new URLSearchParams(location.search).get('embed')==='intro';
const boot=startPageFromQuery();
if(!embedIntro && boot==='dashboard') go(1);

function flash(msg){
  let el=document.querySelector('.qi-toast');
  if(!el){
    el=document.createElement('div');
    el.className='qi-toast';
    el.setAttribute('role','status');
    document.body.appendChild(el);
  }
  el.textContent=msg;
  el.classList.add('is-on');
  clearTimeout(flash._t);
  flash._t=setTimeout(()=>el.classList.remove('is-on'),2800);
}

function shell(content){
  const back=selectionReturnUrl();
  const returnLink=back
    ?`<a class="nav-return" href="${back}">← 紹介へ</a>`
    :'';
  return `<header class="topbar"><div class="topbar-left">${returnLink}<button class="logo" data-action="hero"><span class="logo-mark">QI</span><span><strong>Quality Incident Console</strong><small>品質対応コンソール</small></span></button></div><div class="top-meta"><span>東海精密工業</span><span class="demo-pill">架空データ</span></div></header><div class="shell"><aside class="sidebar"><nav>${labels.map((x,i)=>`<button class="side-item ${state.page===i+1?'active':''}" data-action="page:${i+1}"><span class="side-icon">${icons[i]}</span>${x}</button>`).join('')}</nav><div class="side-foot"><span class="sample-dot"></span><span>東海精密工業<small>架空データ</small></span></div></aside><main class="console-main">${content}</main></div>`;
}

function render(){
  unmountIntro();
  if(embedIntro){
    document.body.classList.add('qi-embed-intro');
    app.innerHTML='<div id="qi-intro-root" class="qi-intro-slot"></div>';
    const host=document.getElementById('qi-intro-root');
    if(host) mountIntro(host);
    return;
  }
  document.body.classList.remove('qi-embed-intro');
  app.innerHTML=state.page===0?`<div class="hero-shell">${Hero()}</div>`:shell([null,Dashboard,Incident,RootCause,Corrective][state.page]());
  if(state.page===0){
    const host=document.getElementById('qi-intro-root');
    if(host) mountIntro(host);
  }
}

app.addEventListener('click',e=>{
  const b=e.target.closest('[data-action]');
  if(!b||b.dataset.action==='none')return;
  if(e.target.closest('[data-qi]'))return;
  const a=b.dataset.action;
  if(a==='hero')go(0);
  else if(a==='dashboard')go(1);
  else if(a==='incident')go(2);
  else if(a==='root-cause')go(3);
  else if(a==='corrective')go(4);
  else if(a.startsWith('page:'))go(Number(a.slice(5)));
  else if(a==='ai')go(2);
  else if(a.startsWith('cause:')){
    state.selectedCause=a.slice(6);
  }
  else if(a==='restart')go(0);
  else if(a==='pdf'){
    document.body.classList.add('print-report');
    window.print();
    window.setTimeout(()=>document.body.classList.remove('print-report'),400);
    flash('印刷ダイアログを開きました（デモ内の帳票プレビュー）');
    return;
  }
  else if(a==='submit'){
    if(state.submitted){
      flash('すでに提出済みです（実送信は行いません）');
      return;
    }
    state.submitted=true;
    flash('品質責任者へ通知しました（デモ内。実送信なし）');
    render();
    return;
  }
  else if(a==='knowledge'){
    flash('ナレッジ登録済みです');
    return;
  }
  render();
});

render();
