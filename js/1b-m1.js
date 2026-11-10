/* Algebra 1B · Module 1 · Exponential Relationships */
(function(){
const nf=v=>{const r=Math.round(v*100)/100;return (r<0?MINUS:'')+Math.abs(r).toLocaleString('en-US',{maximumFractionDigits:2});};
const pw=(b,e)=>`${b}<sup>${e}</sup>`;
function expPath(G,f,step=0.05){let d='';for(let x=G.x0;x<=G.x1+1e-9;x+=step){const y=f(x);if(!isFinite(y))continue;const yy=Math.max(G.y0-5,Math.min(G.y1+5,y));d+=(d?' L':'M')+G.X(x)+' '+G.Y(yy);}return `<path clip-path="url(#${G.clip})" d="${d}" fill="none" stroke="#2563eb" stroke-width="3"/>`;}

/* ---- widgets ---- */
function mountPenny(el){
 let day=10;
 el.innerHTML=`<p style="margin:0">Choice A: get <b>$10 every day</b>. Choice B: get <b>1¢ on day 1</b>, and the amount <b>doubles</b> every day.</p><div class="ctrl"><label>Day <input type="range" min="1" max="30" value="10"></label><b id="pd"></b></div><div id="pg"></div><div class="readout" id="pr"></div>`;
 const draw=()=>{const lin=n=>10*n,ex=n=>0.01*(2**n-1);const ymax=Math.max(400,ex(day)*1.15,lin(day)*1.15);const W=560,H=240,X=n=>40+(n-1)/29*(W-60),Y=v=>H-30-v/ymax*(H-50);
  let s=`<line x1="40" y1="${H-30}" x2="${W-16}" y2="${H-30}" stroke="#374151"/><line x1="40" y1="14" x2="40" y2="${H-30}" stroke="#374151"/>`;
  for(let n=1;n<=day;n++){s+=`<circle cx="${X(n)}" cy="${Y(lin(n))}" r="4" fill="#ea580c"/><circle cx="${X(n)}" cy="${Y(Math.min(ex(n),ymax))}" r="4" fill="#2563eb"/>`;}
  [1,5,10,15,20,25,30].forEach(n=>s+=`<text x="${X(n)}" y="${H-12}" text-anchor="middle" class="tl">${n}</text>`);s+=`<text x="44" y="22" class="tl">$${nf(ymax)}</text><text x="${W/2}" y="${H}" text-anchor="middle" class="tl">day</text>`;
  $('#pg',el).innerHTML=`<svg viewBox="0 0 ${W} ${H+6}" class="fig" style="max-width:${W}px">${s}</svg>`;$('#pd',el).textContent=day;
  const a=lin(day),b=ex(day);$('#pr',el).innerHTML=`Totals after day ${day}:<br><b style="color:#ea580c">A (linear, +$10 a day):</b> $${nf(a)} — the same step every day.<br><b style="color:#2563eb">B (exponential, ×2):</b> $${nf(b)} — today alone pays 0.01 · 2<sup>${day-1}</sup> = $${nf(0.01*2**(day-1))}. The steps keep getting bigger.<br>${b>a?'<span class="good">Exponential has passed linear — and it will never look back.</span>':'Linear is ahead… for now. Keep sliding.'}`;};
 $('input',el).addEventListener('input',e=>{day=+e.target.value;draw();});draw();
}
function mountAB(el){
 let a=3,b=2;
 el.innerHTML=`<div class="ctrl"><label>a (start) <input type="range" id="ea" min="1" max="6" value="3"></label><label>b (multiplier) <select id="eb" style="font:inherit;padding:4px">${[1.5,2,3,4].map(v=>`<option ${v===2?'selected':''}>${v}</option>`).join('')}</select></label></div><div class="eqline math" id="eeq"></div><div id="eg"></div><div id="et" style="overflow-x:auto"></div><div class="readout" id="er"></div>`;
 const draw=()=>{const G=grid({x0:-3,x1:4,y0:0,y1:60,u:56,uy:5,lab:1,laby:10,gsy:5});let s=expPath(G,x=>a*b**x)+`<line x1="${G.X(G.x0)}" y1="${G.Y(0)}" x2="${G.X(G.x1)}" y2="${G.Y(0)}" stroke="#b91c1c" stroke-width="2" stroke-dasharray="6 4"/>`+gdot(G,0,a,'#ea580c',8,`(0, ${a})`);
  [1,2,3].forEach(x=>{if(a*b**x<=60)s+=gdot(G,x,a*b**x,'#1f2937',5);});
  $('#eg',el).innerHTML=G.svg(s);$('#eeq',el).innerHTML=`${mx('y')} = <span class="k">${a}</span>(<b style="color:#7c3aed">${b}</b>)<sup>${mx('x')}</sup>`;
  const xs=[0,1,2,3,4];$('#et',el).innerHTML=tableHTML([['x',xs],['y',xs.map(x=>nf(a*b**x))],['',['',...xs.slice(1).map(()=>`<b style="color:#7c3aed">×${b}</b>`)]]]);
  $('#er',el).innerHTML=`<b class="k">a = ${a}</b> is the y-intercept (0, ${a}) — where it starts. <b style="color:#7c3aed">b = ${b}</b> is the constant ratio — each step in x <b>multiplies</b> y by ${b}.<br>The red dashed line y = 0 is a <b>horizontal asymptote</b>: going left, the graph gets closer and closer to it but never touches.`;};
 $('#ea',el).addEventListener('input',e=>{a=+e.target.value;draw();});$('#eb',el).addEventListener('change',e=>{b=+e.target.value;draw();});draw();
}
function mountShapes(el){
 const C=[{t:'a > 0, b > 1',a:1,b:2,d:'<b>Growth</b>: rises left to right. y-intercept (0, 1). Range y > 0.'},{t:'a > 0, 0 < b < 1',a:1,b:0.5,d:'<b>Decay</b>: falls left to right toward y = 0. Range y > 0.'},{t:'a < 0, b > 1',a:-1,b:2,d:'Reflected over the x-axis: falls faster and faster. Range y < 0.'},{t:'a < 0, 0 < b < 1',a:-1,b:0.5,d:'Reflected decay: rises toward y = 0 from below. Range y < 0.'}];let k=0;
 el.innerHTML=`<div class="row">${C.map((c,i)=>`<button data-k="${i}">${c.t}</button>`).join('')}</div><div class="eqline math" id="seq"></div><div id="sg"></div><div class="readout" id="sr"></div>`;
 const draw=()=>{const c=C[k],G=grid({x0:-4,x1:4,y0:-10,y1:10,u:44,uy:17,lab:1,laby:2,gsy:2});
  $('#sg',el).innerHTML=G.svg(expPath(G,x=>c.a*c.b**x)+`<line x1="${G.X(-4)}" y1="${G.Y(0)}" x2="${G.X(4)}" y2="${G.Y(0)}" stroke="#b91c1c" stroke-width="2" stroke-dasharray="6 4"/>`+gdot(G,0,c.a,'#ea580c',7,`(0, ${fmtNeg(c.a)})`));
  $('#seq',el).innerHTML=`${mx('y')} = ${c.a<0?MINUS:''}(${c.b})<sup>${mx('x')}</sup>`;$('#sr',el).innerHTML=c.d+' Asymptote: y = 0. Domain: all real numbers.';$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;draw();}});draw();
}
function mountGrowth(el){
 const PR=[{t:'👕 T-shirt sales +5%/yr',a:372000,r:5,g:1,u:'$'},{t:'🚗 Car value −15%/yr',a:28000,r:15,g:0,u:'$'},{t:'🦠 Bacteria +40%/hr',a:500,r:40,g:1,u:''}];let k=0,t=8;
 el.innerHTML=`<div class="row">${PR.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div class="ctrl"><label>time t <input type="range" min="0" max="15" value="8"></label><b id="gt"></b></div><div class="eqline math" id="geq"></div><div id="gg"></div><div class="readout" id="gr"></div>`;
 const draw=()=>{const p=PR[k],f=1+(p.g?1:-1)*p.r/100,vals=[...Array(16)].map((_,i)=>p.a*f**i),mxv=Math.max(...vals);const W=560,H=220;let s='';
  vals.forEach((v,i)=>{const h=v/mxv*160,x=34+i*33;s+=`<rect x="${x}" y="${190-h}" width="26" height="${h}" fill="${i===t?'#f59e0b':i<t?'#93c5fd':'#e5e7eb'}" stroke="${i===t?'#b45309':'#2563eb'}" stroke-width="${i===t?2.5:1}"/><text x="${x+13}" y="206" text-anchor="middle" class="tl">${i}</text>`;});
  s+=`<line x1="30" y1="190" x2="${W-6}" y2="190" stroke="#374151"/>`;
  $('#gg',el).innerHTML=`<svg viewBox="0 0 ${W} ${H}" class="fig" style="max-width:${W}px">${s}</svg>`;$('#gt',el).textContent=t;
  $('#geq',el).innerHTML=`${mx('y')} = ${nf(p.a)}(1 ${p.g?'+':MINUS} ${p.r/100})<sup>${mx('t')}</sup> = ${nf(p.a)}(${+f.toFixed(2)})<sup>${mx('t')}</sup>`;
  $('#gr',el).innerHTML=`Start <b>a = ${p.u}${nf(p.a)}</b>, rate <b>r = ${p.r}% = ${p.r/100}</b> per ${k===2?'hour':'year'} → multiply by <b>${+f.toFixed(2)}</b> each time (${p.g?'growth: 1 + r':'decay: 1 − r'}).<br>At t = ${t}: ${p.u}${nf(p.a)}(${+f.toFixed(2)})<sup>${t}</sup> ≈ <b>${p.u}${nf(vals[t])}</b>`;$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;draw();}});$('input',el).addEventListener('input',e=>{t=+e.target.value;draw();});draw();
}
function mountBounce(el){
 let r=0.5,h0=16;
 el.innerHTML=`<div class="ctrl"><label>Each bounce reaches <select id="br" style="font:inherit;padding:4px"><option value="0.5" selected>1/2</option><option value="0.75">3/4</option><option value="0.25">1/4</option></select> of the last height</label></div><div id="bg"></div><div class="readout" id="brr"></div>`;
 const draw=()=>{const hs=[...Array(6)].map((_,i)=>h0*r**i);const W=600,H=230,Y=h=>200-h/h0*170;let s=`<line x1="10" y1="200" x2="${W-10}" y2="200" stroke="#374151" stroke-width="2"/>`;let d=`M30 ${Y(h0)}`;
  hs.forEach((h,i)=>{const x0=30+i*95,x1=x0+95;if(i>0)d+=` Q${x0-47.5} ${Y(hs[i-1])-0+ (Y(hs[i])-Y(hs[i-1]))*0} ${x0} 200`;});
  let path=`M30 ${Y(h0)}`;for(let i=0;i<6;i++){const x=30+i*95;const peak=hs[i];path+=` Q${x+20} ${Y(peak)-0} ${x+47} 200`;if(i<5)path+=` Q${x+71} ${Y(hs[i+1])*2-200} ${x+95} ${Y(hs[i+1])}`;}
  s+=`<path d="${path}" fill="none" stroke="#9ca3af" stroke-width="2" stroke-dasharray="5 4"/>`;
  hs.forEach((h,i)=>{const x=30+i*95;s+=`<line x1="${x}" y1="200" x2="${x}" y2="${Y(h)}" stroke="#2563eb" stroke-width="3"/><circle cx="${x}" cy="${Y(h)-8}" r="8" fill="#ea580c"/><text x="${x+12}" y="${Y(h)}" font-size="14" font-weight="800">${nf(h)} ft</text><text x="${x}" y="218" text-anchor="middle" class="tl">n = ${i+1}</text>`;if(i<5)s+=`<text x="${x+47}" y="${Math.min(Y(h),190)-20}" text-anchor="middle" font-size="13" font-weight="800" fill="#7c3aed">×${r===0.5?'1/2':r===0.75?'3/4':'1/4'}</text>`;});
  $('#bg',el).innerHTML=`<svg viewBox="0 0 ${W} ${H}" class="fig" style="max-width:${W}px">${s}</svg>`;
  $('#brr',el).innerHTML=`Heights: <b>${hs.map(nf).join(', ')}, …</b> Each term = the previous term × <b>${r}</b>. That multiplier is the <b>common ratio r</b>.<br>Recursive rule: <span class="math">${mx('f(n) = f(n − 1)')} · ${r}</span>, with f(1) = 16.`;};
 $('#br',el).addEventListener('change',e=>{r=+e.target.value;draw();});draw();
}
function mountGeo(el){
 const PR=[{t:'📄 Folding paper',a:0.1,r:2,u:'mm thick'},{t:'📱 Shared video',a:3,r:4,u:'new viewers'},{t:'🏀 Bouncing ball',a:16,r:0.5,u:'ft high'}];let k=0,big=10;
 el.innerHTML=`<div class="row">${PR.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div id="gb"></div><div class="eqline math" id="geq2"></div><div class="readout" id="gbr"></div>`;
 const draw=()=>{const p=PR[k],ts=[1,2,3,4,5,6].map(n=>p.a*p.r**(n-1)),mxv=Math.max(...ts);const H=200;let s='';
  ts.forEach((t,i)=>{const h=t/mxv*150,x=30+i*80;s+=`<rect x="${x}" y="${175-h}" width="50" height="${Math.max(h,1)}" rx="4" fill="#ddd6fe" stroke="#7c3aed" stroke-width="2"/><text x="${x+25}" y="${169-h}" text-anchor="middle" font-size="14" font-weight="800">${nf(t)}</text><text x="${x+25}" y="194" text-anchor="middle" class="tl">n = ${i+1}</text>`;if(i<5)s+=`<text x="${x+65}" y="160" text-anchor="middle" font-size="13" font-weight="800" fill="#15803d">×${p.r}</text>`;});
  $('#gb',el).innerHTML=`<svg viewBox="0 0 520 ${H}" class="fig" style="max-width:520px">${s}<line x1="20" y1="175" x2="510" y2="175" stroke="#6b7280"/></svg>`;
  $('#geq2',el).innerHTML=`${mx('f(n)')} = ${p.a} · ${p.r}<sup>(${mx('n')} − 1)</sup>`;
  $('#gbr',el).innerHTML=`First term <b>f(1) = ${p.a}</b>, common ratio <b>r = ${p.r}</b>. To reach term n you multiply by r only <b>(n − 1)</b> times.<br>Jump ahead: f(${big}) = ${p.a} · ${p.r}<sup>${big-1}</sup> = <b>${nf(p.a*p.r**(big-1))}</b> ${p.u}.`+(k===0?' Fold 42 times and the paper would reach past the Moon!':'');$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;draw();}});draw();
}

/* ---- lessons ---- */
L['1B-1-1']={
 goal:'I can write and evaluate exponential growth functions y = a·bˣ and describe their key features.',
 life:{title:'A penny that doubles',html:'Would you rather get <b>$10 a day</b> for a month, or <b>1 cent</b> on day 1 that <b>doubles</b> every day? Adding the same amount is <b>linear</b>. Multiplying by the same amount is <b>exponential</b> — slow at first, then explosive.<br>By day 30 the penny plan has paid more than <b>$10 million</b>; the $10 plan has paid $300.'},
 see:[{title:'Adding vs. multiplying',hint:'Slide the day. Watch when the blue (exponential) dots pass the orange (linear) dots.',mount:mountPenny},{title:'What a and b do in y = a·bˣ',hint:'Change a and b. Look at the ×b row in the table.',mount:mountAB}],
 vocab:[['Exponential function','y = a·bˣ with a ≠ 0, b > 0, b ≠ 1.'],['a','The initial value / y-intercept (0, a).'],['b (constant ratio)','The number y is multiplied by each time x goes up 1. Growth when b > 1.'],['Asymptote','A line the graph gets closer to but never crosses. For y = a·bˣ it is y = 0.']],
 examples:[
  {title:'Example 1 — Evaluate',prob:'For <span class="math">'+mx('f(x) = 3(2)')+'<sup>'+mx('x')+'</sup></span>, find f(4).',raw:true,lines:[['f(4) = 3(2)<sup>4</sup>','Substitute x = 4.'],['= 3(16)','Exponent first: 2⁴ = 16.'],['= 48','Then multiply.']]},
  {title:'Example 2 — Write from a table',prob:tableHTML([['x',[0,1,2,3]],['y',[5,15,45,135]]]),raw:true,lines:[['a = 5','At x = 0, y = 5 → the y-intercept.'],['b = 15 ÷ 5 = 3','Divide a term by the one before it (45 ÷ 15 = 3 too).'],['y = 5(3)<sup>x</sup>','The exponential function.']]}],
 mistake:{bad:'3(2)⁴ = 6⁴ = 1,296',good:'3(2)⁴ = 3(16) = 48',why:'Order of operations: the exponent belongs only to the base 2. Do the exponent <b>before</b> multiplying by 3.'},
 practice(){
  const a=rand(1,6),b=pick([2,3,4,5]);
  if(Math.random()<.5){const x=rand(1,4);return {q:`For <span class="math">${mx('f(x)')} = ${a}(${b})<sup>${mx('x')}</sup></span>, find f(${x}).`,fields:[{label:`f(${x}) =`,answer:a*b**x}],raw:true,hint:'Do the exponent first, then multiply by a.',sol:[[`${a}(${b})<sup>${x}</sup>`,'Substitute.'],[`${a}(${b**x})`,`${b}<sup>${x}</sup> = ${b**x}`],[`${a*b**x}`,'Multiply.']]};}
  return {q:`Write y = a·bˣ for this table: ${tableHTML([['x',[0,1,2,3]],['y',[0,1,2,3].map(x=>a*b**x)]])}`,fields:[{label:'a =',answer:a},{label:'b =',answer:b}],raw:true,hint:'a is the y-value at x = 0. b = any y-value ÷ the one before it.',sol:[[`a = ${a}`,'Value at x = 0.'],[`b = ${a*b} ÷ ${a} = ${b}`,'Constant ratio.'],[`y = ${a}(${b})<sup>x</sup>`,'The function.']]};},
 check:[
  {q:'In y = 5(3)ˣ, what is the y-intercept?',o:['(0, 3)','(0, 5)','(0, 15)','(0, 1)'],a:1,why:'At x = 0, 3⁰ = 1, so y = 5.'},
  {q:'Which table is exponential?',o:['2, 4, 6, 8','2, 4, 8, 16','2, 5, 8, 11','16, 12, 8, 4'],a:1,why:'Each term is multiplied by 2 (constant ratio).'},
  {q:'f(x) = 3(2)ˣ. What is f(3)?',o:['18','24','216','48'],a:1,why:'2³ = 8, and 3 × 8 = 24.'}]
};

L['1B-1-2']={
 goal:'I can graph exponential functions and describe how a and b change the graph.',
 life:{title:'Growing vs. shrinking',html:'Followers on a new account can <b>grow</b> exponentially (b > 1). The medicine in your bloodstream <b>decays</b> exponentially (0 < b < 1): each hour, a fraction of it is left.<br>Just by looking at <b>a</b> (positive or negative) and <b>b</b> (bigger or smaller than 1) you can sketch the graph.'},
 see:[{title:'Four shapes of y = a·bˣ',hint:'Click each case. Notice the y-intercept and the asymptote.',mount:mountShapes}],
 vocab:[['Growth (b > 1)','Graph rises from left to right.'],['Decay (0 < b < 1)','Graph falls toward y = 0 from left to right.'],['a < 0','The graph is flipped (reflected) across the x-axis.'],['Domain / range','Domain: all real numbers. Range: y > 0 if a > 0, y < 0 if a < 0.']],
 examples:[
  {title:'Example — Graph y = 2(0.5)ˣ',prob:'Make a table, then describe the graph.',raw:true,lines:[[tableHTML([['x',[-2,-1,0,1,2]],['y',[8,4,2,1,0.5]]]),'Each step right multiplies y by 0.5.'],['y-intercept (0, 2)','a = 2.'],['decay, asymptote y = 0','0 < b < 1, a > 0 → falls toward the x-axis. Range y > 0.']]},
  {title:'Example — Classify',prob:'Is y = −3(4)ˣ growth or decay? Where is its range?',raw:true,lines:[['b = 4 > 1','The size grows quickly.'],['a = −3 < 0','Flipped below the x-axis: the graph falls.'],['range y < 0','All outputs are negative.']]}],
 mistake:{bad:'y = 3(0.5)ˣ is growth because 3 > 1',good:'It is decay — look at b = 0.5',why:'Growth or decay depends on <b>b</b>, not a.'},
 practice(){
  const a=pick([2,3,5,-2,-1]),b=pick([2,3,0.5,0.25,1.5,0.8]);const ty=Math.random()<.5;
  if(ty)return {type:'mc',q:`Does <span class="math">${mx('y')} = ${a<0?MINUS+Math.abs(a):a}(${b})<sup>${mx('x')}</sup></span> show exponential growth or decay (in size)?`,opts:['Growth (b > 1)','Decay (0 < b < 1)'],a:b>1?0:1,why:`b = ${b} is ${b>1?'greater than 1':'between 0 and 1'}.`};
  return {type:'mc',q:`What is the range of <span class="math">${mx('y')} = ${a<0?MINUS+Math.abs(a):a}(${b})<sup>${mx('x')}</sup></span>?`,opts:['y > 0','y < 0','all real numbers','y ≥ 0'],a:a>0?0:1,why:a>0?'a > 0, so every output is positive.':'a < 0 flips the graph below the x-axis, so every output is negative.'};},
 check:[
  {q:'Which function shows exponential decay?',o:['y = 2(3)ˣ','y = 5(1.04)ˣ','y = 4(0.6)ˣ','y = 0.5(2)ˣ'],a:2,why:'b = 0.6 is between 0 and 1.'},
  {q:'What is the horizontal asymptote of y = 7(2)ˣ?',o:['y = 7','y = 2','y = 0','x = 0'],a:2,why:'Basic exponential graphs approach y = 0.'},
  {q:'y = −2(3)ˣ: where is the graph?',o:['Above the x-axis','Below the x-axis','Crosses the x-axis at 2','On the y-axis only'],a:1,why:'a < 0 reflects it; range y < 0.'}]
};

L['1B-1-3']={
 goal:'I can write and use exponential models y = a(1 + r)ᵗ for growth and y = a(1 − r)ᵗ for decay.',
 life:{title:'Sales up, car value down',html:'A t-shirt company’s sales are <b>$372,000</b> and grow <b>5% per year</b>. A new car worth <b>$28,000</b> loses <b>15% per year</b>.<br>A percent change each year means you <b>multiply</b> by the same number each year: 1.05 for +5%, 0.85 for −15%.'},
 see:[{title:'Percent growth and decay',hint:'Pick a story and slide the time.',mount:mountGrowth}],
 vocab:[['Growth model','y = a(1 + r)ᵗ, where r is the percent rate as a decimal.'],['Decay model','y = a(1 − r)ᵗ.'],['Growth / decay factor','1 + r or 1 − r — the number you multiply by each period.'],['t','The number of time periods (years, hours…).']],
 examples:[
  {title:'Example 1 — Growth',prob:'Sales are $372,000 and increase 5% per year. Find the sales after 8 years.',raw:true,lines:[['a = 372,000, r = 0.05','Step 1: Identify a and r.'],['y = 372,000(1.05)<sup>t</sup>','Step 2: Write the model (1 + 0.05 = 1.05).'],['y = 372,000(1.05)<sup>8</sup>','Step 3: Substitute t = 8.'],['≈ $549,613.43','Sales after 8 years.']]},
  {title:'Example 2 — Decay',prob:'A $28,000 car loses 15% of its value each year. What is it worth after 3 years?',raw:true,lines:[['y = 28,000(1 − 0.15)<sup>t</sup>','Decay: subtract the rate from 1.'],['= 28,000(0.85)<sup>3</sup>','Substitute t = 3.'],['≈ $17,195.50','Value after 3 years.']]}],
 mistake:{bad:'5% growth → y = a(5)ᵗ or y = a(0.05)ᵗ',good:'y = a(1.05)ᵗ',why:'Change the percent to a decimal and <b>add it to 1</b> (growth) or <b>subtract it from 1</b> (decay).'},
 practice(){
  const g=Math.random()<.5,a=pick([1000,2500,5000,12000,20000,30000]),r=pick([2,3,4,5,8,10,12,15,20]),t=rand(2,6),f=1+(g?1:-1)*r/100,ans=Math.round(a*f**t*100)/100;
  if(Math.random()<.35)return {q:`A quantity ${g?'grows':'decreases'} by <b>${r}%</b> each year. What number do you multiply by each year?`,fields:[{label:'factor =',answer:+f.toFixed(2)}],raw:true,hint:g?'Growth: 1 + r.':'Decay: 1 − r.',sol:[[`1 ${g?'+':'−'} ${r/100} = ${+f.toFixed(2)}`,'Convert the percent to a decimal.']]};
  const st=g?pick([`A savings account has $${a.toLocaleString()} and earns ${r}% per year.`,`A town has ${a.toLocaleString()} people and grows ${r}% per year.`]):pick([`A phone worth $${a.toLocaleString()} loses ${r}% of its value each year.`,`A lake has ${a.toLocaleString()} fish and the population drops ${r}% per year.`]);
  return {q:`${st} Find the amount after <b>${t} years</b>. <span class="mute">(nearest hundredth)</span>`,fields:[{label:'≈',answer:ans,tol:Math.max(.02,ans*0.0005)}],raw:true,hint:`Use y = ${a}(${+f.toFixed(2)})<sup>${t}</sup>.`,sol:[[`y = ${a.toLocaleString()}(1 ${g?'+':'−'} ${r/100})<sup>t</sup>`,'Write the model.'],[`= ${a.toLocaleString()}(${+f.toFixed(2)})<sup>${t}</sup>`,'Substitute.'],[`≈ ${nf(ans)}`,'Compute with a calculator.']]};},
 check:[
  {q:'Which model shows 8% yearly growth from 500?',o:['y = 500(0.08)ᵗ','y = 500(1.08)ᵗ','y = 500(0.92)ᵗ','y = 500 + 8t'],a:1,why:'Growth factor = 1 + 0.08 = 1.08.'},
  {q:'A car loses 20% per year. The decay factor is…',o:['0.2','1.2','0.8','20'],a:2,why:'1 − 0.20 = 0.80.'},
  {q:'In y = 2,000(1.03)ᵗ, what is the yearly rate?',o:['3% growth','103% growth','3% decay','30% growth'],a:0,why:'1.03 = 1 + 0.03 → 3% growth.'}]
};

L['1B-1-4']={
 goal:'I can find the common ratio of a geometric sequence and use the recursive rule f(n) = f(n − 1)·r.',
 life:{title:'A bouncing ball',html:'Drop a ball from <b>16 ft</b>. Each bounce reaches <b>half</b> the height of the bounce before: 16, 8, 4, 2, 1, … You get each height by <b>multiplying the previous one by ½</b>.<br>That’s a <b>geometric sequence</b>: multiply by the same number every time (arithmetic sequences <b>add</b> the same number).'},
 see:[{title:'Multiply the previous term by r',hint:'Change how high each bounce goes.',mount:mountBounce}],
 vocab:[['Geometric sequence','Each term is the previous term times the same number.'],['Common ratio (r)','r = any term ÷ the term before it.'],['Recursive rule','f(n) = f(n − 1)·r for n ≥ 2, with f(1) given.'],['Arithmetic vs. geometric','Arithmetic: + d each time. Geometric: × r each time.']],
 examples:[
  {title:'Example A',prob:'Find r for 4, −12, 36, −108, … and the next three terms.',raw:true,lines:[['r = −12 ÷ 4 = −3','Divide a term by the one before it.'],['f(5) = −108 · (−3) = 324','Recursive rule.'],['f(6) = 324 · (−3) = −972',''],['f(7) = −972 · (−3) = 2,916','A negative r makes the signs alternate.']]},
  {title:'Example B',prob:'Find the 5th term of 3, 9, 27, 81, …',raw:true,lines:[['r = 9 ÷ 3 = 3','Common ratio.'],['f(5) = f(4) · 3 = 81 · 3','Recursive rule with n = 5.'],['= 243','The 5th term.']]}],
 mistake:{bad:'3, 9, 27 → r = 6 (9 − 3)',good:'r = 9 ÷ 3 = 3',why:'Geometric sequences use <b>division</b> to find r, not subtraction.'},
 practice(){
  const a=pick([1,2,3,4,5,-2,64,81]),r=pick([2,3,-2,4,0.5,-3]);const ok=v=>Number.isInteger(v*4);let seq=[0,1,2,3].map(i=>a*r**i);if(!seq.every(ok))return this.practice();
  if(Math.random()<.4){const ar=Math.random()<.5;const s2=ar?[0,1,2,3].map(i=>a+r*3*i):seq;return {type:'mc',q:`Is <b>${s2.map(nf).join(', ')}, …</b> arithmetic or geometric?`,opts:['Arithmetic (+ d)','Geometric (× r)'],a:ar?0:1,why:ar?`Each term adds ${nf(r*3)}.`:`Each term is multiplied by ${nf(r)}.`};}
  return {q:`Geometric sequence: <b>${seq.map(nf).join(', ')}, …</b> Find the common ratio and the 5th term.`,fields:[{label:'r =',answer:r},{label:'f(5) =',answer:a*r**4}],raw:true,hint:'r = second term ÷ first term. Then f(5) = f(4) · r.',sol:[[`r = ${nf(seq[1])} ÷ ${nf(seq[0])} = ${nf(r)}`,'Common ratio.'],[`f(5) = ${nf(seq[3])} · ${nf(r)} = ${nf(a*r**4)}`,'Recursive rule.']]};},
 check:[
  {q:'What is the common ratio of 2, 8, 32, 128, …?',o:['6','4','2','0.25'],a:1,why:'8 ÷ 2 = 4.'},
  {q:'Which sequence is geometric?',o:['5, 10, 15, 20','5, 10, 20, 40','5, 8, 11, 14','5, 6, 8, 11'],a:1,why:'Each term is multiplied by 2.'},
  {q:'f(1) = 6 and f(n) = f(n − 1)·(1/2). What is f(3)?',o:['3','1.5','12','2'],a:1,why:'6 → 3 → 1.5.'}]
};

L['1B-1-5']={
 goal:'I can write the explicit rule f(n) = f(1)·rⁿ⁻¹ for a geometric sequence and use it to find any term.',
 life:{title:'Folding paper to the Moon',html:'A sheet of paper is about <b>0.1 mm</b> thick. Each fold <b>doubles</b> the thickness. After 10 folds it’s about 5 cm; after 42 folds it would reach past the Moon!<br>You don’t want to multiply by 2 forty-two times — the <b>explicit rule</b> jumps straight to any term.'},
 see:[{title:'Jump to any term',hint:'Pick a story. Each bar is the previous bar × r.',mount:mountGeo}],
 vocab:[['Explicit rule','f(n) = f(1)·r<sup>(n − 1)</sup>. Needs only the first term and r.'],['Why n − 1?','Term 1 has no multiplications yet; term n has (n − 1) of them.'],['Recursive vs. explicit','Recursive uses the previous term; explicit uses n directly.']],
 examples:[
  {title:'Example 1',prob:'Write the explicit rule for 3, 9, 27, 81, … and find the 7th term.',raw:true,lines:[['f(1) = 3, r = 3','First term and common ratio.'],['f(n) = 3 · 3<sup>(n − 1)</sup>','Explicit rule.'],['f(7) = 3 · 3<sup>6</sup> = 3 · 729','n − 1 = 6.'],['= 2,187','The 7th term.']]},
  {title:'Example 2 — Shrinking',prob:'Write a rule for 64, 16, 4, 1, … and find f(6).',raw:true,lines:[['r = 16 ÷ 64 = 1/4','Common ratio.'],['f(n) = 64 · (1/4)<sup>(n − 1)</sup>','Explicit rule.'],['f(6) = 64 · (1/4)<sup>5</sup> = 64/1,024','Substitute.'],['= 1/16 = 0.0625','The 6th term.']]}],
 mistake:{bad:'f(n) = 3 · 3ⁿ for 3, 9, 27',good:'f(n) = 3 · 3⁽ⁿ⁻¹⁾',why:'Check n = 1: 3 · 3¹ = 9, not 3. The exponent must be (n − 1).'},
 practice(){
  const a=pick([1,2,3,4,5,6,10]),r=pick([2,3,4,5,-2]),n=rand(5,8);
  if(Math.random()<.5){const ans=a*r**(n-1);return {q:`Geometric sequence: <b>${[0,1,2].map(i=>nf(a*r**i)).join(', ')}, …</b> Use the explicit rule to find term ${n}.`,fields:[{label:`f(${n}) =`,answer:ans}],raw:true,hint:`f(n) = ${a} · ${r}<sup>(n − 1)</sup>`,sol:[[`f(n) = ${a} · ${P(r)}<sup>(n − 1)</sup>`,'Explicit rule.'],[`f(${n}) = ${a} · ${P(r)}<sup>${n-1}</sup>`,'Substitute.'],[`= ${nf(ans)}`,'Compute.']]};}
  const m=mcFrom(`f(n) = ${a} · ${P(r)}<sup>(n − 1)</sup>`,[`f(n) = ${a} · ${P(r)}<sup>n</sup>`,a===r?`f(n) = ${a} · ${P(r+1)}<sup>(n − 1)</sup>`:`f(n) = ${P(r)} · ${a}<sup>(n − 1)</sup>`,`f(n) = ${a} + ${P(r)}(n − 1)`]);
  return {type:'mc',q:`Which explicit rule defines <b>${[0,1,2,3].map(i=>nf(a*r**i)).join(', ')}, …</b>?`,opts:m.opts,a:m.a,why:`f(1) = ${a}, r = ${r}, so f(n) = ${a} · ${P(r)}^(n − 1). Check n = 1: ${a} ✓`};},
 check:[
  {q:'Explicit rule for 2, 10, 50, 250, …?',o:['f(n) = 2 · 5ⁿ','f(n) = 2 · 5⁽ⁿ⁻¹⁾','f(n) = 5 · 2⁽ⁿ⁻¹⁾','f(n) = 2 + 8(n − 1)'],a:1,why:'f(1) = 2, r = 5.'},
  {q:'f(n) = 4 · 3⁽ⁿ⁻¹⁾. What is f(4)?',o:['108','324','36','48'],a:0,why:'4 · 3³ = 4 · 27 = 108.'},
  {q:'To write an explicit rule for a geometric sequence, you need…',o:['f(1) and d','f(1) and r','only r','the last term'],a:1,why:'f(n) = f(1)·r⁽ⁿ⁻¹⁾.'}]
};
})();
