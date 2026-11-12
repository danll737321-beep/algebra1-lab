/* Shared helpers for the Khan-unit Algebra 1 course (loaded before js/ka-u*.js) */
window.KA=(function(){
const r2=v=>+(+v).toFixed(2);
const nf=v=>{const r=Math.round(v*100)/100;return (r<0?MINUS:'')+Math.abs(r).toLocaleString('en-US',{maximumFractionDigits:2});};
function q2(a,b,c,v='x'){let s='';[[a,2],[b,1],[c,0]].forEach(([k,d])=>{if(!k)return;const vv=d===2?v+'²':d===1?v:'';const ab=Math.abs(k),co=(ab===1&&d>0)?'':ab;s+=s?(k<0?' − ':' + ')+co+vv:(k<0?MINUS:'')+co+vv;});return s||'0';}
const lin=(m,b,v='x')=>q2(0,m,b,v);
const eqAB=(a,b,c,x='x',y='y')=>`${a?T(a,x):''}${a&&b?(b<0?' '+MINUS+' ':' + ')+T(Math.abs(b),y):(b?T(b,y):'')} = ${fmtNeg(c)}`;
const sysH=(e1,e2)=>`<div class="sys">${mx(e1)}<br>${mx(e2)}</div>`;
function curve(G,f,col='#2563eb',w=3,dash=''){let d='',pen=false;for(let x=G.x0;x<=G.x1+1e-9;x+=0.04){const y=f(x);if(!isFinite(y)||y===null){pen=false;continue;}const yy=Math.max(G.y0-3,Math.min(G.y1+3,y));d+=(pen?' L':' M')+G.X(x).toFixed(1)+' '+G.Y(yy).toFixed(1);pen=true;}return `<path clip-path="url(#${G.clip})" d="${d}" fill="none" stroke="${col}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;}
function shade(G,m,b,above,fill){const a=G.x0-1,z=G.x1+1,t=above?G.y1+80:G.y0-80;return `<polygon clip-path="url(#${G.clip})" points="${G.X(a)},${G.Y(m*a+b)} ${G.X(z)},${G.Y(m*z+b)} ${G.X(z)},${G.Y(t)} ${G.X(a)},${G.Y(t)}" fill="${fill}"/>`;}
/* number line: lo..hi; marks: [{v,open,col,label}], rays: [{from,to,col}] (use ±Infinity) */
function numberLine(o){const {lo=-10,hi=10,W=580,marks=[],rays=[],step=1,labStep}=o;const ls=labStep||((hi-lo)>24?5:(hi-lo)>12?2:1);const X=v=>30+(Math.max(lo-0.6,Math.min(hi+0.6,v))-lo)/(hi-lo)*(W-60),H=80,Y=40;
 let s='';rays.forEach((r,i)=>{const yy=Y-(rays.length>1?(i?-7:7):0);s+=`<line x1="${X(r.from)}" y1="${yy}" x2="${X(r.to)}" y2="${yy}" stroke="${r.col||'#2563eb'}" stroke-width="7" stroke-linecap="round" opacity=".85"/>`;if(r.to===Infinity)s+=`<path d="M${X(hi+0.6)} ${yy-8} L${X(hi+0.6)+12} ${yy} L${X(hi+0.6)} ${yy+8}Z" fill="${r.col||'#2563eb'}"/>`;if(r.from===-Infinity)s+=`<path d="M${X(lo-0.6)} ${yy-8} L${X(lo-0.6)-12} ${yy} L${X(lo-0.6)} ${yy+8}Z" fill="${r.col||'#2563eb'}"/>`;});
 s+=`<line x1="14" y1="${Y}" x2="${W-14}" y2="${Y}" stroke="#374151" stroke-width="2"/>`;
 for(let v=Math.ceil(lo/step)*step;v<=hi+1e-9;v+=step){s+=`<line x1="${X(v)}" y1="${Y-6}" x2="${X(v)}" y2="${Y+6}" stroke="#374151"/>`;if(Math.abs(v/ls-Math.round(v/ls))<1e-9)s+=`<text x="${X(v)}" y="${Y+24}" text-anchor="middle" class="tl">${fmtNeg(r2(v))}</text>`;}
 marks.forEach(m=>{s+=`<circle cx="${X(m.v)}" cy="${Y}" r="8" fill="${m.open?'#fff':(m.col||'#2563eb')}" stroke="${m.col||'#2563eb'}" stroke-width="3"/>`;if(m.label)s+=`<text x="${X(m.v)}" y="${Y-16}" text-anchor="middle" font-size="13" font-weight="800" fill="${m.col||'#2563eb'}">${m.label}</text>`;});
 return `<svg viewBox="0 0 ${W} ${H}" class="fig" style="max-width:${W}px">${s}</svg>`;}
function stepper(el,sets){let k=0,st=0;
 el.innerHTML=`${sets.length>1?`<div class="row">${sets.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div>`:''}<div class="card" style="margin:10px 0;text-align:center" id="stc"></div><div class="note" id="stn"></div><div class="row"><button data-a="b">${t("◀ Back")}</button><button class="primary" data-a="n">${t("Next step ▶")}</button></div>`;
 const draw=()=>{const p=sets[k];$('#stc',el).innerHTML=p.steps[st].h;$('#stn',el).innerHTML=`<b>Step ${st}/${p.steps.length-1}:</b> `+p.steps[st].n;$('[data-a=b]',el).disabled=st===0;$('[data-a=n]',el).disabled=st===p.steps.length-1;$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.k!==undefined){k=+b.dataset.k;st=0;}if(b.dataset.a==='n')st++;if(b.dataset.a==='b')st--;draw();});draw();}
/* tiles: c = [x2, x, 1] */
const TC={2:['#bfdbfe','#2563eb','x²',46,46],1:['#bbf7d0','#15803d','x',16,46],0:['#fde68a','#b45309','',16,16]};
function tiles(c,W=560){let x=10,y=10,rowH=0,s='';[2,1,0].forEach(d=>{const n=c[2-d]||0,[f,st,l,w,h]=TC[d];for(let k=0;k<Math.abs(n);k++){if(x+w>W-10){x=10;y+=rowH+8;rowH=0;}const neg=n<0;s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${neg?'#fecaca':f}" stroke="${neg?'#b91c1c':st}" stroke-width="2"/>`+(l||neg?`<text x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle" font-size="${w>30?15:11}" font-weight="700" fill="${neg?'#b91c1c':st}" font-family="Georgia,serif">${neg?'−'+l:l}</text>`:'');x+=w+5;rowH=Math.max(rowH,h);}if(n)x+=12;});
 return `<svg viewBox="0 0 ${W} ${y+rowH+10}" class="fig" style="max-width:${W}px">${s}</svg>`;}
function seg(el,opts,onPick,k0=0){/* button row helper */let k=k0;el.innerHTML=`<div class="row">${opts.map((o,i)=>`<button data-k="${i}">${o}</button>`).join('')}</div>`;const upd=()=>$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;upd();onPick(k);}});upd();return ()=>k;}
const twoFields=(a,b,la='smaller:',lb='larger:')=>[{label:la,answer:Math.min(a,b)},{label:lb,answer:Math.max(a,b)}];
return {r2,nf,q2,lin,eqAB,sysH,curve,shade,numberLine,stepper,tiles,seg,twoFields};
})();
