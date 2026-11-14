/* Algebra 2 · Unit 8 · Logarithms */
(function(){const {sliders,graphLab,chooser,ex,q,mc,num,nz,curve,TOOLS,nf,sup,fr,hline,vline}=A2;
const lg=(b,x)=>Math.log(x)/Math.log(b);
const LOG=(b,x)=>`log<sub>${b}</sub>(${x})`;
function mountIntro(el){sliders(el,[{k:'b',l:'base b',min:2,max:10,v:2},{k:'y',l:'exponent y',min:-2,max:4,v:3}],V=>{const x=V.b**V.y;
  let s='';for(let k=-2;k<=4;k++){const on=k===V.y;s+=`<div style="display:flex;align-items:center;gap:10px;margin:3px 0;${on?'font-weight:800;color:#9333ea':''}"><span style="width:80px;text-align:right">${V.b}${sup(k)}</span><span style="flex:0 0 ${Math.max(4,Math.min(320,(k+3)*45))}px;height:12px;border-radius:6px;background:${on?'#9333ea':'#e9d5ff'}"></span><span>${nf(V.b**k)}</span></div>`;}
  $('.li-g',el).innerHTML=s;$('.li-r',el).innerHTML=`<div class="eqline math">${V.b}${sup(V.y)} = ${fr(...(V.y<0?[1,V.b**-V.y]:[x,1]))} &nbsp;⇔&nbsp; ${LOG(V.b,V.y<0?fr(1,V.b**-V.y):x)} = ${fmtNeg(V.y)}</div><span class="mute">A logarithm <b>answers the question</b>: “${V.b} to what power gives ${V.y<0?fr(1,V.b**-V.y):x}?” The answer is the exponent, ${fmtNeg(V.y)}.</span>`;},`<div class="li-g"></div><div class="readout li-r"></div>`).run();}
const NS=[1,2,4,12,52,365,8760,525600,1e9];
function mountE(el){sliders(el,[{k:'i',l:'compounds per year n',min:0,max:8,v:3,f:i=>['1 (yearly)','2','4 (quarterly)','12 (monthly)','52 (weekly)','365 (daily)','8,760 (hourly)','525,600 (minutely)','10⁹'][i]}],V=>{const n=NS[V.i],v=(1+1/n)**n;
  const w=(v-2)/(Math.E-2)*100;$('.e-r',el).innerHTML=`<div class="eqline math">(1 + 1/n)<sup>n</sup> = <b>${v.toFixed(6)}</b></div><div style="height:16px;border-radius:8px;background:#f1f5f9;position:relative;margin:8px 0"><i style="position:absolute;inset:0 auto 0 0;width:${w}%;background:#9333ea;border-radius:8px"></i><span style="position:absolute;right:-4px;top:-18px;font-weight:800;color:#e11d48">e</span></div>$1 at 100% interest for one year, compounded ${n.toLocaleString()} times → <b>$${v.toFixed(4)}</b>.<br><span class="mute">More compounding helps less and less. The limit is <b>e ≈ 2.71828</b> (continuous compounding). The log with base e is the <b>natural log</b>, ln.</span>`;},`<div class="readout e-r"></div>`).run();}
function mountSlide(el){sliders(el,[{k:'a',l:'a',min:1,max:10,v:2},{k:'b',l:'b',min:1,max:10,v:4}],V=>{const W=520,u=x=>20+Math.log10(x)*240;const ab=V.a*V.b;
  let s='';[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100].forEach(t=>{s+=`<line x1="${u(t)}" y1="40" x2="${u(t)}" y2="${t%10===0||t<10?52:47}" stroke="#374151"/>`+((t<=10||t%10===0)&&t!==70&&t!==90?`<text x="${u(t)}" y="66" text-anchor="middle" font-size="10">${t}</text>`:'');});
  s+=`<rect x="${u(1)}" y="16" width="${u(V.a)-u(1)}" height="14" fill="#c4b5fd" rx="3"/><rect x="${u(V.a)}" y="16" width="${u(ab)-u(V.a)}" height="14" fill="#f9a8d4" rx="3"/><line x1="${u(ab)}" y1="8" x2="${u(ab)}" y2="56" stroke="#e11d48" stroke-width="3"/><text x="${u(ab)}" y="88" text-anchor="middle" font-weight="800" fill="#e11d48">${ab}</text>`;
  $('.sl-g',el).innerHTML=`<svg viewBox="0 0 ${W} 96" class="fig" style="max-width:${W}px"><line x1="20" y1="40" x2="${u(100)}" y2="40" class="ax"/>${s}</svg>`;
  $('.sl-r',el).innerHTML=`On a <b>log scale</b>, lengths are logs. Purple length log(${V.a}) + pink length log(${V.b}) lands on <b>${ab}</b>:<div class="eqline math">log(${V.a}) + log(${V.b}) = log(${ab})</div><span class="mute">Adding logs = multiplying numbers. That is the product rule — and how slide rules did multiplication before calculators.</span>`;},`<div class="sl-g"></div><div class="readout sl-r"></div>`).run();}
function mountCOB(el){sliders(el,[{k:'b',l:'base b',min:2,max:9,v:3},{k:'x',l:'x',min:1,max:100,v:50}],V=>{const r=lg(V.b,V.x);
  $('.cb-r',el).innerHTML=`<div class="eqline math">${LOG(V.b,V.x)} = log(${V.x}) / log(${V.b}) = ${Math.log10(V.x).toFixed(4)} / ${Math.log10(V.b).toFixed(4)} ≈ <b>${r.toFixed(4)}</b></div>Check: ${V.b}<sup>${r.toFixed(4)}</sup> ≈ ${(V.b**r).toFixed(2)} ✓ &nbsp; Also ln(${V.x}) / ln(${V.b}) = ${(Math.log(V.x)/Math.log(V.b)).toFixed(4)} — same answer.<br><span class="mute">Any base works for the change: divide the log of the input by the log of the base.</span>`;},`<div class="readout cb-r"></div>`).run();}
function mountSolveG(el){graphLab(el,{g:{x0:-1,x1:4,y0:0,y1:60,u:80,uy:5,lab:1,laby:10,gsy:10},params:[{k:'b',l:'base b',min:2,max:6,v:5},{k:'c',l:'target c',min:2,max:58,v:40}],
 curves:V=>[{f:x=>V.b**x}],extra:(G,V)=>{const x=lg(V.b,V.c);return hline(G,V.c,'#f59e0b')+(x<=G.x1?vline(G,x,'#e11d48')+gdot(G,x,V.c,'#e11d48',7,'x ≈ '+x.toFixed(3)):'');},
 eq:V=>`${V.b}<sup>x</sup> = ${V.c}`,read:V=>`Take the log of both sides: x·log(${V.b}) = log(${V.c}) → x = log(${V.c}) / log(${V.b}) ≈ <b>${lg(V.b,V.c).toFixed(4)}</b>.<br><span class="mute">The graph shows the same answer: where y = ${V.b}<sup>x</sup> meets y = ${V.c}.</span>`});}
function mountModel(el){graphLab(el,{g:{x0:0,x1:30,y0:0,y1:1000,u:16,uy:0.3,lab:5,laby:200,gsy:200},params:[{k:'r',l:'growth rate %',min:1,max:12,v:5},{k:'T',l:'target',min:250,max:950,step:50,v:500}],
 curves:V=>[{f:t=>200*(1+V.r/100)**t}],extra:(G,V)=>{const t=Math.log(V.T/200)/Math.log(1+V.r/100);return hline(G,V.T,'#f59e0b')+(t<=30?gdot(G,t,V.T,'#e11d48',7,'t ≈ '+t.toFixed(2)):'');},
 eq:V=>`200(${nf(1+V.r/100)})<sup>t</sup> = ${V.T}`,read:V=>{const t=Math.log(V.T/200)/Math.log(1+V.r/100);return `Divide: (${nf(1+V.r/100)})<sup>t</sup> = ${nf(V.T/200)} → t = log(${nf(V.T/200)}) / log(${nf(1+V.r/100)}) ≈ <b>${t.toFixed(2)} years</b>.<br><span class="mute">Steps: isolate the power, take logs, divide.</span>`;}});}

L['A2-8-2']={goal:'I can rewrite between exponential and logarithmic form and evaluate simple logs.',
 life:{title:'Earthquakes and decibels',html:'A magnitude-7 earthquake shakes about <b>10 times</b> harder than a magnitude 6, and 100 times harder than a 5. The Richter scale is a <b>logarithm</b>: it records the exponent, not the huge number. Logs answer “what power?”'},
 see:[{title:'Exponent ladder',hint:'Choose the base and the exponent.',mount:mountIntro}],
 vocab:[['Logarithm','log_b(x) = y means bʸ = x.'],['Base b','b > 0 and b ≠ 1.'],['Common log','log x means log₁₀ x.']],
 examples:[ex('Example 1','Evaluate log₂(32).',[['2<sup>?</sup> = 32','Ask the question.'],['2⁵ = 32 → log₂(32) = 5','']]),
  ex('Example 2','Rewrite 10⁻³ = 0.001 in log form.',[['log(0.001) = −3','The exponent is the log.']])],
 mistake:{bad:'log₃(9) = 3',good:'2',why:'The log is the <b>exponent</b>: 3² = 9.'},
 practice(){const b=pick([2,3,4,5,10]),y=pick([-2,-1,0,2,3,4]),x=b**y;const X=y<0?fr(1,b**-y):String(x);if(Math.random()<.6)return num(`Evaluate <b>${LOG(b,X)}</b>.`,[['value =',y]],`${b} to what power is ${X}?`,[[`${b}${sup(y)} = ${X}`,'Exponent form.'],[`${LOG(b,X)} = ${y}`,'']]);
  if(y===0)return num(`Evaluate <b>${LOG(b,1)}</b>.`,[['value =',0]],'Any base to the 0 power is 1.',[[`${b}⁰ = 1`,'']]);return mc(`Which is the log form of <b>${b}${sup(y)} = ${X}</b>?`,`${LOG(b,X)} = ${fmtNeg(y)}`,[`${LOG(b,fmtNeg(y))} = ${X}`,`${LOG(X,b)} = ${fmtNeg(y)}`,`log<sub>${fmtNeg(y)}</sub>(${X}) = ${b}`],'The base stays the base; the log equals the exponent.');},
 check:[q('log₅(25) = ?',['5','2','10','1/2'],1,'5² = 25.'),q('log(1000) = ?',['3','100','10','4'],0,'10³.'),q('log₂(1/8) = ?',['3','−3','1/3','−1/3'],1,'2⁻³ = 1/8.')]};

L['A2-8-3']={goal:'I can explain where e comes from and evaluate natural logarithms.',
 life:{title:'The limit of compounding',html:'Put $1 in an account paying 100% a year. Compound once: $2. Monthly: $2.61. Daily: $2.7146. Every instant: <b>$2.71828… = e</b>. Continuous growth anywhere in nature — populations, cooling, radioactive decay — uses e.'},
 see:[{title:'Compound more and more often',hint:'Slide n up. Watch the value approach e.',mount:mountE}],
 vocab:[['e','≈ 2.71828, the limit of (1 + 1/n)ⁿ.'],['Natural log ln x','log base e: ln x = y ⇔ eʸ = x.'],['Continuous growth','A = Pe<sup>rt</sup>.']],
 examples:[ex('Example 1','Evaluate ln(e⁴) and e<sup>ln 7</sup>.',[['ln(e⁴) = 4','ln and e undo each other.'],['e<sup>ln 7</sup> = 7','']]),
  ex('Example 2','$500 at 4% compounded continuously for 10 years.',[['A = 500e<sup>0.04·10</sup> = 500e<sup>0.4</sup>',''],['≈ $745.91','Calculator.']])],
 mistake:{bad:'ln(e) = 0',good:'ln(e) = 1',why:'e¹ = e. It is ln(1) that equals 0.'},
 practice(){const k=rand(-3,6);if(Math.random()<.5)return num(`Evaluate <b>ln(e${sup(k)})</b>.`,[['value =',k]],'ln and e undo each other.',[[`ln(e${sup(k)}) = ${k}`,'Inverse functions.']]);
  const P_=rand(1,9)*100,r=rand(2,8),t=rand(2,10);const A=P_*Math.exp(r/100*t);return num(`$${P_} grows at ${r}% compounded continuously for ${t} years. Find A = Pe<sup>rt</sup> (nearest cent).`,[['A =',+A.toFixed(2),0.02]],'r as a decimal.',[[`A = ${P_}e<sup>${nf(r/100)}·${t}</sup> = ${P_}e<sup>${nf(r*t/100)}</sup>`,'Substitute.'],[`≈ $${A.toFixed(2)}`,'Calculator.']]);},
 check:[q('e ≈ ?',['3.14','2.718','1.618','2.5'],1,'Euler’s number.'),q('ln(1) = ?',['1','e','0','undefined'],2,'e⁰ = 1.'),q('ln x is log base…',['10','2','e','x'],2,'Natural log.')]};

L['A2-8-4']={goal:'I can use the product, quotient, and power properties of logarithms.',
 life:{title:'Slide rules',html:'Before calculators, engineers multiplied with <b>slide rules</b>: two rulers marked in logs. Sliding one along the other <b>adds lengths</b>, and adding logs <b>multiplies numbers</b>. The Apollo astronauts carried slide rules to the Moon.'},
 see:[{title:'Log scale: add lengths to multiply',hint:'Choose a and b. Read the product.',mount:mountSlide}],
 vocab:[['Product rule','log(MN) = log M + log N.'],['Quotient rule','log(M/N) = log M − log N.'],['Power rule','log(Mᵖ) = p·log M.']],
 examples:[ex('Example 1','Expand log₂(8x³/y)',[['log₂8 + log₂x³ − log₂y','Product and quotient.'],['3 + 3log₂x − log₂y','log₂8 = 3; power rule.']]),
  ex('Example 2','Condense 2ln x + ln 5 − ln y',[['ln x² + ln 5 − ln y','Power rule backwards.'],['ln(5x²/y)','']])],
 mistake:{bad:'log(x + y) = log x + log y',good:'no rule for log of a sum',why:'The product rule is about log(<b>xy</b>). log(x + y) cannot be split.'},
 practice(){const b=pick([2,3,10]),m=rand(1,3),n=rand(1,3),t=pick(['prod','quot','pow']);
  if(t==='prod')return num(`Given ${LOG(b,'M')} = ${m} and ${LOG(b,'N')} = ${n}, find <b>${LOG(b,'M·N')}</b>.`,[['value =',m+n]],'Product rule: add.',[[`${m} + ${n} = ${m+n}`,'']]);
  if(t==='quot')return num(`Given ${LOG(b,'M')} = ${m} and ${LOG(b,'N')} = ${n}, find <b>${LOG(b,'M/N')}</b>.`,[['value =',m-n]],'Quotient rule: subtract.',[[`${m} − ${n} = ${m-n}`,'']]);
  const p=rand(2,5);return num(`Given ${LOG(b,'M')} = ${m}, find <b>${LOG(b,'M'+sup(p))}</b>.`,[['value =',p*m]],'Power rule: multiply.',[[`${p} · ${m} = ${p*m}`,'']]);},
 check:[q('log 2 + log 5 = ?',['log 7','1','log 2.5','10'],1,'log 10 = 1.'),q('log₃(x⁴) = ?',['4log₃x','(log₃x)⁴','log₃4x','3⁴x'],0,'Power rule.'),q('ln a − ln b = ?',['ln(a − b)','ln(a/b)','ln a / ln b','ln(ab)'],1,'Quotient rule.')]};

L['A2-8-5']={goal:'I can use the change of base formula to evaluate any logarithm.',
 life:{title:'Calculators only know two bases',html:'Your calculator has <b>log</b> (base 10) and <b>ln</b> (base e). How do you find log₃(50)? The change-of-base formula converts any base into one your calculator knows: log₃50 = log 50 / log 3 ≈ 3.56.'},
 see:[{title:'Change the base',hint:'Pick b and x. Compare the ratio with the check.',mount:mountCOB}],
 vocab:[['Change of base','log_b x = log x / log b = ln x / ln b.'],['Check','b^(answer) should give x back.'],['Estimate','Find the powers of b just below and above x.']],
 examples:[ex('Example 1','Evaluate log₇(200).',[['log 200 / log 7 ≈ 2.3010 / 0.8451',''],['≈ 2.723','Check: 7² = 49 < 200 < 343 = 7³ ✓']]),
  ex('Example 2','Write log₄(x) using ln.',[['ln x / ln 4','']])],
 mistake:{bad:'log₅(30) = log 5 / log 30',good:'log 30 / log 5',why:'The <b>input goes on top</b>; the base goes on the bottom.'},
 practice(){const b=pick([2,3,4,5,6,7]),x=rand(10,500);const v=lg(b,x);return num(`Use change of base: <b>${LOG(b,x)}</b> ≈ ? (nearest hundredth)`,[['value ≈',+v.toFixed(2),0.011]],`log(${x}) / log(${b}).`,[[`log ${x} / log ${b} = ${Math.log10(x).toFixed(4)} / ${Math.log10(b).toFixed(4)}`,'Formula.'],[`≈ ${v.toFixed(2)}`,'Divide.']]);},
 check:[q('log₂(10) = ?',['log 2 / log 10','log 10 / log 2','10/2','ln 2'],1,'Input on top.'),q('log₂(10) is between…',['2 and 3','3 and 4','4 and 5','1 and 2'],1,'2³ = 8, 2⁴ = 16.'),q('ln 9 / ln 3 = ?',['3','2','ln 3','6'],1,'log₃9 = 2.')]};

L['A2-8-6']={goal:'I can solve exponential equations by taking logarithms.',
 life:{title:'No common base? Use logs',html:'5ˣ = 40 has no nice common base. Logs bring the exponent down: x·log 5 = log 40, so <b>x = log 40 / log 5 ≈ 2.29</b>. This one move solves almost every exponential equation.'},
 see:[{title:'Graph meets target',hint:'Change b and c. The intersection is the solution.',mount:mountSolveG}],
 vocab:[['Take log of both sides','Keeps the equation balanced.'],['Bring down the exponent','log(bˣ) = x·log b.'],['Isolate first','Get the power alone before taking logs.']],
 examples:[ex('Example 1','Solve 3·2ˣ = 45',[['2ˣ = 15','Divide by 3 first.'],['x = log 15 / log 2 ≈ 3.907','Logs.']]),
  ex('Example 2','Solve e<sup>2x</sup> = 9',[['2x = ln 9','ln both sides.'],['x = ln 9 / 2 ≈ 1.099','']])],
 mistake:{bad:'3·2ˣ = 45 → 6ˣ = 45',good:'2ˣ = 15',why:'3·2ˣ is not 6ˣ. The 3 is not part of the base — divide it away first.'},
 practice(){const a=rand(1,5),b=pick([2,3,5,1.5,4]),c=rand(2,9)*a*rand(2,6);const x=lg(b,c/a);return num(`Solve <b>${a===1?'':a+'·'}${b}<sup>x</sup> = ${c}</b> (nearest hundredth).`,[['x ≈',+x.toFixed(2),0.011]],a===1?'Take log of both sides.':`Divide by ${a} first.`,[[`${b}<sup>x</sup> = ${nf(c/a)}`,'Isolate.'],[`x = log ${nf(c/a)} / log ${b} ≈ ${x.toFixed(2)}`,'Logs.']]);},
 check:[q('Solve 10ˣ = 7',['log 7','7/10','ln 7','0.7'],0,'Definition of log.'),q('First step for 4·3ˣ = 20?',['take logs','divide by 4','multiply by 3','subtract 4'],1,'Isolate the power.'),q('Solve eˣ = 1',['1','e','0','undefined'],2,'e⁰ = 1.')]};

L['A2-8-7']={goal:'I can solve real-world exponential models for time.',
 life:{title:'How long until…?',html:'An investment of $200 grows 5% a year. When does it reach $500? Set 200(1.05)ᵗ = 500, isolate, and take logs: <b>t ≈ 18.8 years</b>. Doubling time, half-life, and “when will it reach…” questions all work this way.'},
 see:[{title:'When does it reach the target?',hint:'Change the rate and the target.',mount:mountModel}],
 vocab:[['Solve for t','Isolate the exponential, take logs, divide.'],['Doubling time','Solve a·bᵗ = 2a → t = log 2 / log b.'],['Interpret','Round in context (years, hours, …).']],
 examples:[ex('Example 1','Half-life of carbon-14 is 5730 yr. How old is a bone with 30% left?',[['0.3 = (1/2)<sup>t/5730</sup>','Model.'],['t = 5730 · log 0.3 / log 0.5','Logs.'],['≈ 9953 years','']]),
  ex('Example 2','Doubling time at 7% per year?',[['1.07ᵗ = 2 → t = log 2 / log 1.07','The start amount cancels.'],['≈ 10.2 years','(Rule of 70: 70/7 = 10.)']])],
 mistake:{bad:'200(1.05)ᵗ = 500 → 1.05ᵗ = 300',good:'1.05ᵗ = 2.5',why:'200 multiplies, so <b>divide</b> by 200 — don’t subtract.'},
 practice(){const P_=rand(1,9)*100,r=rand(2,12),k=pick([1.5,2,2.5,3,4]);const t=Math.log(k)/Math.log(1+r/100);return num(`$${P_} grows ${r}% per year. After how many years will it reach $${nf(P_*k)}? (nearest tenth)`,[['t ≈',+t.toFixed(1),0.051]],'Divide by the start value, then take logs.',[[`${nf(1+r/100)}<sup>t</sup> = ${k}`,'Isolate.'],[`t = log ${k} / log ${nf(1+r/100)} ≈ ${t.toFixed(1)}`,'Logs.']]);},
 check:[q('Doubling time with growth factor 1.1 per year ≈',['7.3 yr','10 yr','20 yr','2 yr'],0,'log 2 / log 1.1.'),q('In a·bᵗ = c, first divide by…',['b','a','c','t'],1,'Isolate bᵗ.'),q('Does the start amount affect doubling time?',['yes','no','only if large','only if decay'],1,'It cancels.')]};

const INV=[{n:'f(x) = 2x + 1',f:x=>2*x+1,g:x=>(x-1)/2,gn:'f⁻¹(x) = (x − 1)/2'},{n:'f(x) = x³',f:x=>x**3,g:x=>Math.sign(x)*Math.abs(x)**(1/3),gn:'f⁻¹(x) = ∛x'},{n:'f(x) = 2ˣ',f:x=>2**x,g:x=>x<=0?NaN:Math.log2(x),gn:'f⁻¹(x) = log₂x'},{n:'f(x) = x², x ≥ 0',f:x=>x<0?NaN:x*x,g:x=>x<0?NaN:Math.sqrt(x),gn:'f⁻¹(x) = √x'}];
function mountInv(el){let k=0;el.innerHTML=`<div class="row">${INV.map((x,i)=>`<button data-iv="${i}" class="${i?'':'sel'}">${x.n}</button>`).join('')}</div><div class="iv-b"></div>`;
 const sp=graphLab($('.iv-b',el),{g:{x0:-6,x1:6,y0:-6,y1:6,u:30,lab:1},params:[{k:'a',l:'a',min:-2,max:2.5,step:.25,v:1}],
  curves:()=>[{f:x=>x,col:'#9ca3af',w:2,dash:'6 5'},{f:INV[k].f},{f:INV[k].g,col:'#f59e0b'}],
  extra:(G,V)=>{const F=INV[k],y=F.f(V.a);if(!isFinite(y)||Math.abs(y)>6)return '';return A2.seg2(G,[V.a,y],[y,V.a],'#e11d48',2,'4 4')+gdot(G,V.a,y,'#2563eb',7,`(${nf(V.a)}, ${nf(y)})`)+gdot(G,y,V.a,'#f59e0b',7,`(${nf(y)}, ${nf(V.a)})`);},
  eq:()=>`<span style="color:#2563eb">${INV[k].n}</span> &nbsp; <span style="color:#f59e0b">${INV[k].gn}</span>`,
  read:V=>{const y=INV[k].f(V.a);return isFinite(y)?`f(${nf(V.a)}) = ${nf(y)}, so f⁻¹(${nf(y)}) = ${nf(V.a)}. The inverse <b>swaps inputs and outputs</b>: every point (a, b) becomes (b, a) — a reflection over the dashed line y = x.`:`a = ${nf(V.a)} is not in the domain of f here.`+(k===3?' <span class="mute">x² needs x ≥ 0 so that it passes the horizontal-line test and has an inverse.</span>':'');}});
 el.addEventListener('click',e=>{const b=e.target.closest('[data-iv]');if(!b)return;k=+b.dataset.iv;$$('[data-iv]',el).forEach(x=>x.classList.toggle('sel',x===b));sp.run();});}

L['A2-8-1']={goal:'I can find and graph the inverse of a function and check it with composition.',
 life:{title:'Undo button',html:'A thermometer app converts °C to °F with F = 1.8C + 32. Going back, °F to °C, is the <b>inverse</b> function: C = (F − 32)/1.8. Logarithms are exactly this idea — the undo button for exponential functions.'},
 see:[{title:'Function and inverse mirror each other',hint:'Pick a function and slide a. Watch (a, b) and (b, a).',mount:mountInv}],
 vocab:[['Inverse function f⁻¹','Undoes f: if f(a) = b then f⁻¹(b) = a.'],['Find it','Swap x and y, then solve for y.'],['Check','f(f⁻¹(x)) = x and f⁻¹(f(x)) = x.'],['One-to-one','Passes the horizontal-line test; needed for an inverse.']],
 examples:[ex('Example 1','Find the inverse of f(x) = (x + 4)/3.',[['x = (y + 4)/3','Swap x and y.'],['3x = y + 4 → y = 3x − 4','Solve for y.'],['f⁻¹(x) = 3x − 4','']]),
  ex('Example 2','Check: f(x) = x³ − 1, g(x) = ∛(x + 1).',[['f(g(x)) = (∛(x + 1))³ − 1 = x','Composition gives x.'],['g is the inverse of f ✓','']])],
 mistake:{bad:'f⁻¹(x) = 1/f(x)',good:'f⁻¹ undoes f',why:'The −1 is not an exponent here. 1/f(x) is the reciprocal, a different thing.'},
 practice(){const a=nz(-5,5),b=rand(-9,9);if(Math.random()<.5){const c=rand(-10,10);return num(`f(x) = ${a===1?'':a===-1?'−':a}x ${b<0?'−':'+'} ${Math.abs(b)}. Find f⁻¹(${c}).`,[[`f⁻¹(${c}) =`,(c-b)/a,0.011]],`Solve ${a}x ${b<0?'−':'+'} ${Math.abs(b)} = ${c}.`,[[`x = (${c} − ${P(b)})/${P(a)} = ${fr(c-b,a)}`,'Undo +b, then ÷a.']]);}
  const x=rand(-6,6);return num(`f(${x}) = ${a*x+b}. What is f⁻¹(${a*x+b})?`,[['value =',x]],'The inverse swaps input and output.',[[`f⁻¹(${a*x+b}) = ${x}`,'']]);},
 check:[q('Inverse of f(x) = x + 7?',['x − 7','7 − x','1/(x + 7)','−x − 7'],0,''),q('Graphs of f and f⁻¹ are reflections over…',['x-axis','y-axis','y = x','origin'],2,''),q('The inverse of 10ˣ is…',['x/10','log x','x¹⁰','√x'],1,'')]};

TOOLS['A2-8']={title:'Log scale (slide rule)',hint:'Adding log-lengths multiplies the numbers.',mount:mountSlide};
})();
