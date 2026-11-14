/* Algebra 2 · Unit 7 · Sequences, series & exponential models */
(function(){const {sliders,graphLab,ex,q,mc,num,nz,curve,TOOLS,nf,fr,sup}=A2;
function mountGeoSeries(el){sliders(el,[{k:'a',l:'first term a',min:1,max:20,v:3},{k:'r',l:'ratio r',min:-2,max:3,step:.5,v:2},{k:'n',l:'terms n',min:1,max:8,v:5}],V=>{const {a,r,n}=V;const t=Array.from({length:n},(_,i)=>a*r**i);const S=t.reduce((s,x)=>s+x,0);const mx_=Math.max(...t.map(Math.abs),1);
  let s='';t.forEach((v,i)=>{const h=Math.abs(v)/mx_*120;s+=`<rect x="${20+i*52}" y="${v>=0?140-h:140}" width="40" height="${Math.max(h,1)}" rx="4" fill="${v>=0?'#86efac':'#fca5a5'}" stroke="${v>=0?'#15803d':'#b91c1c'}"/><text x="${40+i*52}" y="${v>=0?134-h:156+h}" text-anchor="middle" font-size="11" font-weight="800">${nf(v)}</text>`;});
  $('.gs-g',el).innerHTML=`<svg viewBox="0 0 ${Math.max(440,30+n*52)} 290" class="fig" style="max-width:460px"><line x1="10" y1="140" x2="${30+n*52}" y2="140" class="ax"/>${s}</svg>`;
  $('.gs-r',el).innerHTML=`Terms: ${t.map(nf).join(', ')}<br>Sum S${A2.sup(n).replace(/./g,c=>c)} = <b>${nf(S)}</b>${r!==1?` &nbsp;=&nbsp; a(1 − rⁿ)/(1 − r) = ${a}(1 − ${P(r)}${sup(n)})/(1 − ${P(r)}) = <b>${nf(a*(1-r**n)/(1-r))}</b>`:' (r = 1: just n·a)'}<br><span class="mute">Each term is the one before times r. The formula adds all n terms in one step.</span>`;},`<div class="gs-g"></div><div class="readout gs-r"></div>`).run();}
const pct=b=>nf(Math.abs(b-1)*100)+'%';
function mountRate(el){graphLab(el,{g:{x0:0,x1:8,y0:0,y1:400,u:50,uy:0.75,lab:1,laby:50,gsy:50},params:[{k:'a',l:'start a',min:20,max:200,step:10,v:100},{k:'b',l:'factor b',min:0.5,max:1.5,step:0.05,v:1.2}],
 curves:V=>[{f:x=>V.a*V.b**x}],extra:(G,V)=>[0,1,2,3,4,5,6,7,8].map(t=>gdot(G,t,Math.min(V.a*V.b**t,399),'#e11d48',4)).join(''),eq:V=>`f(t) = ${V.a}(${nf(V.b)})<sup>t</sup>`,
 read:V=>{const v=[0,1,2,3].map(t=>V.a*V.b**t);return `t: 0, 1, 2, 3 → f: ${v.map(nf).join(', ')}<br>Each step multiplies by <b>${nf(V.b)}</b> → ${V.b>1?`grows <b>${pct(V.b)}</b>`:V.b<1?`decays <b>${pct(V.b)}</b>`:'stays the same'} per unit of time. The start value (t = 0) is <b>${V.a}</b>.<br><span class="mute">Growth rate r = b − 1. b = 1.2 → +20%; b = 0.85 → −15%.</span>`;}});}
function mountBuild(el){graphLab(el,{g:{x0:0,x1:12,y0:0,y1:900,u:36,uy:0.32,lab:2,laby:100,gsy:100},params:[{k:'m',l:'mode',min:0,max:1,v:0,f:v=>v?'half-life':'doubling'},{k:'p',l:'period (hours)',min:1,max:6,v:3}],
 curves:V=>[{f:x=>100*(V.m?0.5:2)**(x/V.p)}],extra:(G,V)=>{let s='';for(let k=1;k*V.p<=12;k++){const y=100*(V.m?0.5:2)**k;if(y<=900)s+=gdot(G,k*V.p,y,'#e11d48',6,k===1?`t = ${V.p}`:'');}return s;},
 eq:V=>`A(t) = 100 · ${V.m?'(1/2)':'2'}<sup>t/${V.p}</sup>`,read:V=>`Every <b>${V.p} hours</b> the amount ${V.m?'halves':'doubles'} (red dots). The exponent t/${V.p} counts how many ${V.p}-hour periods have passed.<br><span class="mute">Pattern: A(t) = A₀ · (factor)<sup>t / (time for one factor)</sup>.</span>`});}
function mountForms(el){sliders(el,[{k:'u',l:'time unit',min:0,max:2,v:0,f:v=>['per 5 years','per year','per month'][v]}],V=>{const B=0.8,per=[5,1,1/12][V.u],b=B**(per/5);
 const G=grid({x0:0,x1:20,y0:0,y1:1200,u:20,uy:0.22,lab:5,laby:200,gsy:200});
 $('.fo-g',el).innerHTML=G.svg(curve(G,t=>1200*B**(t/5)));
 const ex_=V.u===0?'t/5':V.u===1?'t':'12t';
 $('.fo-r',el).innerHTML=`<div class="eqline math">f(t) = 1200(${V.u===0?'0.8':nf(+b.toFixed(5))})<sup>${ex_}</sup></div>Factor ${['per 5 years','per year','per month'][V.u]}: <b>${b.toFixed(V.u===2?5:4)}</b> → decreases about <b>${((1-b)*100).toFixed(V.u===2?3:2)}%</b> ${['every 5 years','each year','each month'][V.u]}.<br><span class="mute">Same graph every time — only the way we read the rate changes. 0.8<sup>t/5</sup> = (0.8<sup>1/5</sup>)<sup>t</sup> = (0.8<sup>1/60</sup>)<sup>12t</sup>.</span>`;},`<div class="fo-g"></div><div class="readout fo-r"></div>`).run();}

L['A2-7-2']={goal:'I can find the sum of a finite geometric series with the formula.',
 life:{title:'Saving with a doubling rule',html:'Save $3 the first week, then double it every week: 3 + 6 + 12 + 24 + 48. Adding many terms by hand is slow. The formula <b>S = a(1 − rⁿ)/(1 − r)</b> — which comes from the factoring identity 1 − rⁿ = (1 − r)(1 + r + … + rⁿ⁻¹) — does it in one step.'},
 see:[{title:'Geometric series bars',hint:'Change a, r, n. Compare the sum with the formula.',mount:mountGeoSeries}],
 vocab:[['Geometric series','a + ar + ar² + … + arⁿ⁻¹.'],['Common ratio r','Each term ÷ the term before.'],['Sum formula','Sₙ = a(1 − rⁿ)/(1 − r), r ≠ 1.']],
 examples:[ex('Example 1','Sum 3 + 6 + 12 + 24 + 48',[['a = 3, r = 2, n = 5','Identify.'],['S = 3(1 − 2⁵)/(1 − 2) = 3(−31)/(−1)','Formula.'],['S = 93','Check: 3+6+12+24+48 = 93.']]),
  ex('Example 2','Sum 80 − 40 + 20 − 10 + 5 − 2.5',[['a = 80, r = −½, n = 6',''],['S = 80(1 − 1/64)/(1.5) = 52.5','Formula.']])],
 mistake:{bad:'n = the last exponent',good:'n = number of terms',why:'a + ar + … + ar⁵ has <b>6</b> terms (exponents 0 to 5).'},
 practice(){const a=rand(1,9),r=pick([2,3,-2,-3]),n=rand(3,7);const S=a*(1-r**n)/(1-r);const terms=Array.from({length:Math.min(n,4)},(_,i)=>fmtNeg(a*r**i)).join(' + ').replace(/\+ −/g,'− ');
  return num(`Find the sum of the first <b>${n}</b> terms of the geometric series <b>${terms} + …</b>`,[['S =',S]],'a(1 − rⁿ)/(1 − r).',[[`a = ${a}, r = ${r}, n = ${n}`,'Identify.'],[`S = ${a}(1 − ${P(r)}${sup(n)})/(1 − ${P(r)}) = ${S}`,'Formula.']]);},
 check:[q('r for 5, 15, 45, …',['10','3','5','1/3'],1,'15/5.'),q('How many terms: 2 + 2·3 + … + 2·3⁷?',['7','8','9','6'],1,'Exponents 0–7.'),q('Sum 1 + 2 + 4 + 8 + 16 = ?',['31','32','30','15'],0,'(1 − 2⁵)/(1 − 2).')]};

L['A2-7-3']={goal:'I can interpret the initial value and growth/decay rate in f(t) = a·bᵗ.',
 life:{title:'Followers that multiply',html:'A video channel has 100 followers and gains <b>20% more each week</b>: f(t) = 100(1.2)<sup>t</sup>. Unlike a linear model, the change is not the same amount each week — it is the same <b>percent</b>. That is what b tells you.'},
 see:[{title:'a and b in action',hint:'Change the start value and the factor. Try b < 1.',mount:mountRate}],
 vocab:[['Initial value a','f(0), the amount at the start.'],['Growth factor b','What you multiply by each time unit.'],['Rate r','b = 1 + r (growth) or b = 1 − r (decay).']],
 examples:[ex('Example 1','f(t) = 2500(0.92)<sup>t</sup>, t in years. Interpret.',[['a = 2500','Starts at 2500.'],['b = 0.92 = 1 − 0.08','Decreases 8% per year.']]),
  ex('Example 2','g(t) = 40(1.035)<sup>t</sup>',[['grows 3.5% per unit of t','b − 1 = 0.035.']])],
 mistake:{bad:'f(t) = 300(0.75)ᵗ decreases by 75% each year',good:'decreases by 25%',why:'b = 0.75 means 75% <b>remains</b>; 1 − 0.75 = 0.25 is lost.'},
 practice(){const g=Math.random()<.5,r=rand(2,40),a=rand(2,90)*10;const b=g?1+r/100:1-r/100;
  if(Math.random()<.5)return num(`f(t) = ${a}(${nf(b)})<sup>t</sup>. By what percent does f ${g?'grow':'decay'} each unit of time?`,[['percent =',r,0.01]],'Compare b with 1.',[[`b = ${nf(b)} = 1 ${g?'+':'−'} ${nf(r/100)}`,'Split off 1.'],[`${r}% ${g?'growth':'decay'}`,'']]);
  return mc(`A quantity starts at ${a} and ${g?'increases':'decreases'} by ${r}% each year. Which model fits?`,`f(t) = ${a}(${nf(b)})<sup>t</sup>`,[`f(t) = ${a}(${nf(r/100)})<sup>t</sup>`,`f(t) = ${a}(${nf(g?1-r/100:1+r/100)})<sup>t</sup>`,`f(t) = ${a} ${g?'+':'−'} ${r}t`],`b = 1 ${g?'+':'−'} ${nf(r/100)}.`);},
 check:[q('f(t) = 50(1.07)ᵗ. Initial value?',['1.07','50','57','7'],1,'a = 50.'),q('Same model: rate?',['7% growth','107% growth','0.07% growth','7% decay'],0,'1.07 − 1.'),q('Decay of 12% per year → b = ?',['0.12','1.12','0.88','−0.12'],2,'1 − 0.12.')]};

L['A2-7-4']={goal:'I can build exponential models from a rate, a doubling time, or a half-life.',
 life:{title:'Medicine in your body',html:'A medicine has a half-life of 6 hours: every 6 hours, half of it is gone. Starting with 400 mg, the amount is A(t) = 400(1/2)<sup>t/6</sup>. The <b>t/6</b> counts how many half-lives have passed.'},
 see:[{title:'Doubling time and half-life',hint:'Switch modes and change the period.',mount:mountBuild}],
 vocab:[['Doubling time','Time for the amount to double: A₀·2<sup>t/d</sup>.'],['Half-life','Time for the amount to halve: A₀·(1/2)<sup>t/h</sup>.'],['Percent rate','A₀(1 ± r)<sup>t</sup>.']],
 examples:[ex('Example 1','Bacteria: 50 cells, doubling every 20 min. Model with t in minutes.',[['B(t) = 50 · 2<sup>t/20</sup>','t/20 = number of doublings.'],['B(60) = 50 · 2³ = 400','After 1 hour.']]),
  ex('Example 2','A car worth $28,000 loses 15% per year.',[['V(t) = 28000(0.85)<sup>t</sup>','b = 1 − 0.15.']])],
 mistake:{bad:'Doubles every 3 years: A = A₀ · 2<sup>3t</sup>',good:'A₀ · 2<sup>t/3</sup>',why:'After 3 years you want exponent 1. t/3 = 1 when t = 3; 3t would be 9.'},
 practice(){const A=rand(1,9)*100,d=pick([2,3,4,5,6,8]),k=rand(1,4),half=Math.random()<.5;const v=half?A*0.5**k:A*2**k;
  return num(`${half?`A ${A} mg dose has a half-life of ${d} hours`:`A culture of ${A} cells doubles every ${d} hours`}. How much is there after <b>${d*k} hours</b>?`,[['amount =',v,0.01]],`${d*k} hours = ${k} ${half?'half-lives':'doubling times'}.`,[[`A(t) = ${A}·${half?'(1/2)':'2'}<sup>t/${d}</sup>`,'Model.'],[`A(${d*k}) = ${A}·${half?'(1/2)':'2'}${A2.sup(k)} = ${nf(v)}`,'Evaluate.']]);},
 check:[q('Half-life 5 years, 80 g. After 10 years?',['40 g','20 g','10 g','60 g'],1,'Two halvings.'),q('Doubles every 4 h: exponent is…',['4t','t/4','t + 4','2t'],1,'Number of periods.'),q('Model for 3% yearly decay from 900',['900(0.97)ᵗ','900(1.03)ᵗ','900(0.03)ᵗ','900 − 3t'],0,'1 − 0.03.')]};

L['A2-7-5']={goal:'I can rewrite exponential models to interpret rates over different time periods.',
 life:{title:'Compare apples to apples',html:'One bank advertises 20% growth every 5 years; another 3.5% per year. Which is better? Rewrite: 1.2<sup>t/5</sup> = (1.2<sup>1/5</sup>)<sup>t</sup> ≈ 1.0371<sup>t</sup> → about <b>3.71% per year</b>. Now they are comparable.'},
 see:[{title:'Change the time unit',hint:'Same decay model, three readings.',mount:mountForms}],
 vocab:[['Effective rate','The growth or decay per one unit of the time you care about.'],['b<sup>t/k</sup> = (b<sup>1/k</sup>)<sup>t</sup>','Per-unit factor is b<sup>1/k</sup>.'],['Per month','Exponent 12t when t is in years.']],
 examples:[ex('Example 1','P(t) = 600(1.44)<sup>t/2</sup> (t in years). Yearly rate?',[['(1.44<sup>1/2</sup>)<sup>t</sup> = 1.2<sup>t</sup>','√1.44 = 1.2.'],['20% per year','']]),
  ex('Example 2','f(t) = 300(1.05)<sup>t</sup> (years). Monthly factor?',[['1.05<sup>1/12</sup> ≈ 1.00407','12th root.'],['≈ 0.41% per month','Not 5/12 ≈ 0.417% exactly.']])],
 mistake:{bad:'5% per year = 5/12 % per month',good:'1.05<sup>1/12</sup> − 1 ≈ 0.407%',why:'Exponential rates compound — you take a <b>root</b>, not a division.'},
 practice(){const r=pick([[1.21,2,1.1],[1.44,2,1.2],[1.331,3,1.1],[0.64,2,0.8],[0.81,2,0.9],[1.69,2,1.3],[0.729,3,0.9]]);const [B,k,b]=r;
  return num(`f(t) = 500(${B})<sup>t/${k}</sup>, t in years. Rewrite as 500·cᵗ. What is c, and what is the yearly percent change (use − for decay)?`,[['c =',b,0.001],['percent =',+((b-1)*100).toFixed(4),0.01]],`c = ${B}<sup>1/${k}</sup>.`,[[`${B}<sup>t/${k}</sup> = (${B}<sup>1/${k}</sup>)<sup>t</sup> = ${b}<sup>t</sup>`,'Power of a power.'],[`${nf((b-1)*100)}% per year`,'b − 1.']]);},
 check:[q('2<sup>t/3</sup> per year factor?',['2/3','2<sup>1/3</sup> ≈ 1.26','6','8'],1,'Cube root.'),q('(0.81)<sup>t/2</sup> = ?',['0.9ᵗ','0.405ᵗ','0.81ᵗ','1.62ᵗ'],0,'√0.81.'),q('Which grows faster per year: 1.21<sup>t/2</sup> or 1.09<sup>t</sup>?',['1.21<sup>t/2</sup> (10%)','1.09ᵗ','same','cannot tell'],0,'√1.21 = 1.1.')]};

function mountSigma(el){sliders(el,[{k:'g',l:'type',min:0,max:1,v:0,f:v=>v?'geometric':'arithmetic'},{k:'a',l:'first term a₁',min:1,max:10,v:3},{k:'d',l:'d (or r)',min:-3,max:4,v:2},{k:'n',l:'n terms',min:2,max:8,v:5}],V=>{const t=Array.from({length:V.n},(_,i)=>V.g?V.a*V.d**i:V.a+V.d*i);const S=t.reduce((s,x)=>s+x,0);
 const chips=t.map((v,i)=>`<span style="display:inline-block;padding:6px 10px;margin:3px;border-radius:10px;border:2px solid #4f46e5;font-weight:800;color:#4f46e5">a<sub>${i+1}</sub>=${nf(v)}</span>`).join(' + ');
 const gen=V.g?`${V.a}·${P(V.d)}<sup>k−1</sup>`:`${V.a} + ${P(V.d)}(k − 1)`;
 $('.sg-r',el).innerHTML=`<div>${chips}</div><div class="eqline math">Σ<sub>k=1</sub><sup>${V.n}</sup> (${gen}) = <b>${nf(S)}</b></div>${V.g?`Geometric: multiply by r = ${V.d} each time. Sum formula a₁(1 − rⁿ)/(1 − r)${V.d===1?' (r = 1: just n·a₁)':` = ${nf(V.a*(1-V.d**V.n)/(1-V.d))}`}.`:`Arithmetic: add d = ${V.d} each time. Pair first + last: (${nf(t[0])} + ${nf(t[V.n-1])}) appears ${V.n}/2 times → S = n(a₁ + aₙ)/2 = ${V.n}(${nf(t[0]+t[V.n-1])})/2 = <b>${nf(S)}</b>.`}<br><span class="mute">Σ (sigma) means “add up.” k counts from the bottom number to the top number.</span>`;},`<div class="readout sg-r"></div>`).run();}

L['A2-7-1']={goal:'I can write arithmetic and geometric sequences, use sigma notation, and add an arithmetic series.',
 life:{title:'Stacking cans',html:'A store stacks cans 10 on the bottom row, 9 on the next, … up to 1. How many cans? 10 + 9 + … + 1. Pair the ends: 10 + 1 = 11, 9 + 2 = 11, … five pairs → <b>55 cans</b>. That pairing trick is the arithmetic series formula.'},
 see:[{title:'Sigma explorer',hint:'Switch between arithmetic and geometric. Change a₁, d or r, and n.',mount:mountSigma}],
 vocab:[['Arithmetic sequence','Add the same d each time: aₙ = a₁ + (n − 1)d.'],['Geometric sequence','Multiply by the same r: aₙ = a₁·rⁿ⁻¹.'],['Sigma notation','Σ<sub>k=1</sub><sup>n</sup> aₖ means a₁ + a₂ + … + aₙ.'],['Arithmetic series','Sₙ = n(a₁ + aₙ)/2.']],
 examples:[ex('Example 1','Evaluate Σ<sub>k=1</sub><sup>4</sup> (3k − 1).',[['k = 1, 2, 3, 4 → 2 + 5 + 8 + 11','Write out the terms.'],['= 26','Add.']]),
  ex('Example 2','Sum 5 + 9 + 13 + … + 41.',[['d = 4; 41 = 5 + 4(n − 1) → n = 10','Count the terms.'],['S = 10(5 + 41)/2 = 230','Formula.']])],
 mistake:{bad:'Σ<sub>k=1</sub><sup>5</sup> 2 = 2',good:'10',why:'The constant 2 is added <b>five</b> times.'},
 practice(){if(Math.random()<.5){const a=rand(-5,9),d=nz(-4,6),n=rand(5,20);const an=a+(n-1)*d;return num(`Find the sum of the arithmetic series with a₁ = ${a}, d = ${d}, and ${n} terms.`,[['S =',n*(a+an)/2]],'Find aₙ, then n(a₁ + aₙ)/2.',[[`a${A2.sup(n).replace(/./g,c=>c)} = ${a} + ${n-1}(${d}) = ${an}`,'Last term.'],[`S = ${n}(${a} + ${P(an)})/2 = ${n*(a+an)/2}`,'Formula.']]);}
  const m=nz(-4,5),b=rand(-6,6),n=rand(3,8);let S=0;for(let k=1;k<=n;k++)S+=m*k+b;return num(`Evaluate <b>Σ<sub>k=1</sub><sup>${n}</sup> (${m===1?'':m===-1?'−':m}k ${b<0?'−':'+'} ${Math.abs(b)})</b>.`,[['sum =',S]],'Write out the terms, or use n(first + last)/2.',[[`first ${m+b}, last ${m*n+b}`,'k = 1 and k = '+n+'.'],[`${n}(${m+b} + ${P(m*n+b)})/2 = ${S}`,'Arithmetic series.']]);},
 check:[q('Next term of 2, 6, 18, …',['24','54','30','36'],1,'r = 3.'),q('Σ<sub>k=1</sub><sup>3</sup> k² = ?',['6','14','9','12'],1,'1 + 4 + 9.'),q('Sum 1 + 2 + … + 100 = ?',['5000','5050','10100','4950'],1,'100·101/2.')]};

TOOLS['A2-7']={title:'Exponential model lab',hint:'Change the start value and the growth factor; read the percent rate.',mount:mountRate};
})();
