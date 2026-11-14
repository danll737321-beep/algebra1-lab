/* Calculus · shared helpers — loaded after ka-core.js, a2-core.js, pc-core.js */
window.CA=(function(){
const {nf,sliders,ps}=A2;
/* polynomial helpers: coefficients high → low */
const pe=(co,x)=>co.reduce((s,c)=>s*x+c,0);
const pd=co=>co.slice(0,-1).map((c,i)=>c*(co.length-1-i));
const r=(v,k=3)=>+(+v).toFixed(k);
const r3=v=>nf(r(v,3));
/* button row + sliders: items=[{t,...}], specs=[slider specs] (may be function of item), draw(V,item,k,el) */
function pickSlide(el,items,specs,draw,extra=''){let k=0;
 el.innerHTML=`<div class="row">${items.map((x,i)=>`<button data-pk="${i}">${x.t}</button>`).join('')}</div><div class="ps-s"></div>`;
 let sp;const build=()=>{const sp0=typeof specs==='function'?specs(items[k]):specs;const old=$('.ps-s',el),box=document.createElement('div');box.className='ps-s';old.replaceWith(box);sp=sliders(box,sp0,V=>draw(V,items[k],k,el),extra);sp.run();
  $$('[data-pk]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.pk===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-pk]');if(!b||!el.contains(b))return;k=+b.dataset.pk;build();});build();return ()=>sp;}
/* reveal-one-step-at-a-time card list */
function steps(el,sets){KA.stepper(el,sets);}
/* readable signed term for derivative answers */
const lim=(a,side='')=>`lim<sub>x→${a}${side}</sub>`;
const int=(a,b)=>`∫<sub>${a}</sub><sup>${b}</sup>`;
/* pretty fraction for decimals with small denominators */
function pf(v){for(const d of [1,2,3,4,5,6,8,9,10,12]){const n=Math.round(v*d);if(Math.abs(n/d-v)<1e-9)return frac(n,d);}return nf(r(v,4));}
/* little bar meter */
const bar=(v,max,col='#2563eb')=>`<span style="display:inline-block;width:160px;height:10px;background:#e2e8f0;border-radius:6px;vertical-align:middle"><i style="display:block;height:10px;border-radius:6px;width:${Math.max(0,Math.min(100,100*v/max))}%;background:${col}"></i></span>`;
return {pe,pd,r,r3,pickSlide,steps,lim,int,pf,bar,ps};
})();
