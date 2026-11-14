/* Khan Algebra 2 · Unit 7 · Exponential models */
(function(){const {sliders,graphLab,ex,q,mc,num,nz,curve,TOOLS,nf,fr}=A2;
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

L['A2-7-1']={goal:'I can interpret the initial value and growth/decay rate in f(t) = a·bᵗ.',
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

L['A2-7-2']={goal:'I can build exponential models from a rate, a doubling time, or a half-life.',
 life:{title:'Medicine in your body',html:'A medicine has a half-life of 6 hours: every 6 hours, half of it is gone. Starting with 400 mg, the amount is A(t) = 400(1/2)<sup>t/6</sup>. The <b>t/6</b> counts how many half-lives have passed.'},
 see:[{title:'Doubling time and half-life',hint:'Switch modes and change the period.',mount:mountBuild}],
 vocab:[['Doubling time','Time for the amount to double: A₀·2<sup>t/d</sup>.'],['Half-life','Time for the amount to halve: A₀·(1/2)<sup>t/h</sup>.'],['Percent rate','A₀(1 ± r)<sup>t</sup>.']],
 examples:[ex('Example 1','Bacteria: 50 cells, doubling every 20 min. Model with t in minutes.',[['B(t) = 50 · 2<sup>t/20</sup>','t/20 = number of doublings.'],['B(60) = 50 · 2³ = 400','After 1 hour.']]),
  ex('Example 2','A car worth $28,000 loses 15% per year.',[['V(t) = 28000(0.85)<sup>t</sup>','b = 1 − 0.15.']])],
 mistake:{bad:'Doubles every 3 years: A = A₀ · 2<sup>3t</sup>',good:'A₀ · 2<sup>t/3</sup>',why:'After 3 years you want exponent 1. t/3 = 1 when t = 3; 3t would be 9.'},
 practice(){const A=rand(1,9)*100,d=pick([2,3,4,5,6,8]),k=rand(1,4),half=Math.random()<.5;const v=half?A*0.5**k:A*2**k;
  return num(`${half?`A ${A} mg dose has a half-life of ${d} hours`:`A culture of ${A} cells doubles every ${d} hours`}. How much is there after <b>${d*k} hours</b>?`,[['amount =',v,0.01]],`${d*k} hours = ${k} ${half?'half-lives':'doubling times'}.`,[[`A(t) = ${A}·${half?'(1/2)':'2'}<sup>t/${d}</sup>`,'Model.'],[`A(${d*k}) = ${A}·${half?'(1/2)':'2'}${A2.sup(k)} = ${nf(v)}`,'Evaluate.']]);},
 check:[q('Half-life 5 years, 80 g. After 10 years?',['40 g','20 g','10 g','60 g'],1,'Two halvings.'),q('Doubles every 4 h: exponent is…',['4t','t/4','t + 4','2t'],1,'Number of periods.'),q('Model for 3% yearly decay from 900',['900(0.97)ᵗ','900(1.03)ᵗ','900(0.03)ᵗ','900 − 3t'],0,'1 − 0.03.')]};

L['A2-7-3']={goal:'I can rewrite exponential models to interpret rates over different time periods.',
 life:{title:'Compare apples to apples',html:'One bank advertises 20% growth every 5 years; another 3.5% per year. Which is better? Rewrite: 1.2<sup>t/5</sup> = (1.2<sup>1/5</sup>)<sup>t</sup> ≈ 1.0371<sup>t</sup> → about <b>3.71% per year</b>. Now they are comparable.'},
 see:[{title:'Change the time unit',hint:'Same decay model, three readings.',mount:mountForms}],
 vocab:[['Effective rate','The growth or decay per one unit of the time you care about.'],['b<sup>t/k</sup> = (b<sup>1/k</sup>)<sup>t</sup>','Per-unit factor is b<sup>1/k</sup>.'],['Per month','Exponent 12t when t is in years.']],
 examples:[ex('Example 1','P(t) = 600(1.44)<sup>t/2</sup> (t in years). Yearly rate?',[['(1.44<sup>1/2</sup>)<sup>t</sup> = 1.2<sup>t</sup>','√1.44 = 1.2.'],['20% per year','']]),
  ex('Example 2','f(t) = 300(1.05)<sup>t</sup> (years). Monthly factor?',[['1.05<sup>1/12</sup> ≈ 1.00407','12th root.'],['≈ 0.41% per month','Not 5/12 ≈ 0.417% exactly.']])],
 mistake:{bad:'5% per year = 5/12 % per month',good:'1.05<sup>1/12</sup> − 1 ≈ 0.407%',why:'Exponential rates compound — you take a <b>root</b>, not a division.'},
 practice(){const r=pick([[1.21,2,1.1],[1.44,2,1.2],[1.331,3,1.1],[0.64,2,0.8],[0.81,2,0.9],[1.69,2,1.3],[0.729,3,0.9]]);const [B,k,b]=r;
  return num(`f(t) = 500(${B})<sup>t/${k}</sup>, t in years. Rewrite as 500·cᵗ. What is c, and what is the yearly percent change (use − for decay)?`,[['c =',b,0.001],['percent =',+((b-1)*100).toFixed(4),0.01]],`c = ${B}<sup>1/${k}</sup>.`,[[`${B}<sup>t/${k}</sup> = (${B}<sup>1/${k}</sup>)<sup>t</sup> = ${b}<sup>t</sup>`,'Power of a power.'],[`${nf((b-1)*100)}% per year`,'b − 1.']]);},
 check:[q('2<sup>t/3</sup> per year factor?',['2/3','2<sup>1/3</sup> ≈ 1.26','6','8'],1,'Cube root.'),q('(0.81)<sup>t/2</sup> = ?',['0.9ᵗ','0.405ᵗ','0.81ᵗ','1.62ᵗ'],0,'√0.81.'),q('Which grows faster per year: 1.21<sup>t/2</sup> or 1.09<sup>t</sup>?',['1.21<sup>t/2</sup> (10%)','1.09ᵗ','same','cannot tell'],0,'√1.21 = 1.1.')]};

TOOLS['A2-7']={title:'Exponential model lab',hint:'Change the start value and the growth factor; read the percent rate.',mount:mountRate};
})();
