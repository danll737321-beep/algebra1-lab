/* Pre-Calculus · Unit 7 · Rational functions (beyond Algebra II) */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,graphLab,chooser,curve,hline,vline,hole,ps,pmul,cs,circleFig}=A2;const C=PC,PI=Math.PI;const {stepper}=KA;const M=C.mat;
const RF=[{t:'(2x + 1)/(x − 2)',f:x=>(2*x+1)/(x-2),va:[2],note:'Degrees equal → horizontal asymptote y = 2/1 = 2.',ha:2},
 {t:'(x + 1)/(x² − 4)',f:x=>(x+1)/(x*x-4),va:[-2,2],note:'Bottom degree bigger → horizontal asymptote y = 0.',ha:0},
 {t:'(x² − 1)/(x − 1)',f:x=>Math.abs(x-1)<1e-9?NaN:(x*x-1)/(x-1),va:[],hole:[1,2],note:'Factor (x − 1) cancels → a <b>hole</b> at (1, 2), not an asymptote. The graph is the line y = x + 1 with a gap.'},
 {t:'(x² + 1)/(x − 1)',f:x=>(x*x+1)/(x-1),va:[1],slant:x=>x+1,note:'Top degree is one more → <b>slant asymptote</b>. Divide: (x² + 1) ÷ (x − 1) = x + 1 remainder 2, so y = x + 1.'}];
function mRational(el){chooser(el,RF.map(R=>({t:'y = '+R.t,html:()=>{const G=grid({x0:-6,x1:6,y0:-6,y1:6,u:30,lab:2,laby:2});let s='';R.va.forEach(v=>s+=vline(G,v));if(R.ha!==undefined)s+=hline(G,R.ha);if(R.slant)s+=curve(G,R.slant,'#e11d48',2,'6 5');
  s+=curve(G,x=>R.va.some(v=>Math.abs(x-v)<0.05)?NaN:R.f(x),'#2563eb',3);if(R.hole)s+=hole(G,R.hole[0],R.hole[1]);
  return G.svg(s)+`<div class="readout">Vertical asymptote${R.va.length===1?'':'s'}: <b>${R.va.length?R.va.map(v=>'x = '+fmtNeg(v)).join(', '):'none'}</b> (zeros of the denominator that do not cancel).<br>${R.note}</div>`;}})));}
function mSign(el){sliders(el,[{k:'x',l:'test x',min:-5,max:5,step:.25,v:0}],V=>{const f=x=>(x+3)*(x-1)/(x-4);const G=grid({x0:-6,x1:7,y0:-6,y1:6,u:30,uy:20,lab:1,laby:2});
  let s=C.region(G,x=>Math.max(0,f(x)),()=>0,-6,7,'rgba(21,128,61,.15)')+C.region(G,()=>0,x=>Math.min(0,f(x)),-6,7,'rgba(225,29,72,.15)')+vline(G,4)+curve(G,x=>Math.abs(x-4)<0.05?NaN:f(x),'#2563eb',3)+gdot(G,-3,0,'#111',6)+gdot(G,1,0,'#111',6);const v=f(V.x);if(isFinite(v)&&Math.abs(v)<6)s+=gdot(G,V.x,v,'#e11d48',7);
  $('.sg-g',el).innerHTML=G.svg(s)+C.signChart(['−3','1','4'],['−','+','−','+']);
  $('.sg-r',el).innerHTML=`f(${nf(V.x)}) = ${V.x===4?'not defined':nf(v)} → <b>${V.x===4?'—':v>0?'positive':v<0?'negative':'zero'}</b>. Critical numbers −3, 1 (zeros) and 4 (undefined) split the line into intervals; the sign is constant on each one.<br>So (x + 3)(x − 1)/(x − 4) ≥ 0 on <b>[−3, 1] ∪ (4, ∞)</b> — 4 is excluded because f is undefined there.`;},`<div class="sg-g"></div><div class="readout sg-r"></div>`).run();}
/* build a rational graph in steps */
const GR=[{n:'f(x) = (x − 2)/((x + 1)(x − 3))',f:x=>(x-2)/((x+1)*(x-3)),zx:[2],yi:2/3,va:[-1,3],ha:0,sl:null,holes:[],pts:[-1,2,3],sg:['−','+','−','+'],y:[-4,4]},
 {n:'f(x) = (2x² − 8)/(x² − 1)',f:x=>(2*x*x-8)/(x*x-1),zx:[-2,2],yi:8,va:[-1,1],ha:2,sl:null,holes:[],pts:[-2,-1,1,2],sg:['+','−','+','−','+'],y:[-6,10]},
 {n:'f(x) = (x² − x − 2)/(x − 1)',f:x=>(x*x-x-2)/(x-1),zx:[-1,2],yi:2,va:[1],ha:null,sl:[1,0],holes:[],pts:[-1,1,2],sg:['−','+','−','+'],y:[-6,6]},
 {n:'f(x) = (x² − 4)/(x² − x − 2)',f:x=>(x*x-4)/(x*x-x-2),zx:[-2],yi:2,va:[-1],ha:1,sl:null,holes:[[2,4/3]],pts:[-2,-1],sg:['+','−','+'],y:[-4,6]}];
function mGraphR(el){let k=0;const ST=['Zeros of the top → x-intercepts','y-intercept: f(0)','Vertical asymptotes and holes','Horizontal or slant asymptote','Sign chart','Sketch through it all'];
 el.innerHTML=`<div class="row">${GR.map((F,i)=>`<button data-k="${i}">${F.n}</button>`).join('')}</div><div class="gr-s"></div>`;
 const sp=sliders($('.gr-s',el),[{k:'s',l:'step',min:1,max:6,v:1}],V=>{const F=GR[k],G=grid({x0:-5,x1:5,y0:F.y[0],y1:F.y[1],u:36,uy:Math.min(36,300/(F.y[1]-F.y[0])),lab:1,laby:2});let s='',msg=[];
  if(V.s>=1){s+=F.zx.map(x=>gdot(G,x,0,'#059669',7)).join('');msg.push(`<b>1.</b> x-intercepts: x = ${F.zx.map(fmtNeg).join(', ')}`);}
  if(V.s>=2){s+=gdot(G,0,F.yi,'#9333ea',7);msg.push(`<b>2.</b> y-intercept: f(0) = ${nf(F.yi)}`);}
  if(V.s>=3){s+=F.va.map(x=>vline(G,x)).join('')+F.holes.map(h=>hole(G,h[0],h[1],'#e11d48')).join('');msg.push(`<b>3.</b> vertical asymptote${F.va.length>1?'s':''} x = ${F.va.map(fmtNeg).join(', ')}${F.holes.length?` · hole at (${F.holes.map(h=>nf(h[0])+', '+nf(h[1])).join('')}) — that factor cancels`:''}`);}
  if(V.s>=4){if(F.ha!==null){s+=hline(G,F.ha,'#f59e0b');msg.push(`<b>4.</b> horizontal asymptote y = ${F.ha} (compare degrees and leading coefficients)`);}else{s+=curve(G,x=>F.sl[0]*x+F.sl[1],'#f59e0b',2,'6 5');msg.push(`<b>4.</b> slant asymptote y = ${A2.ps(F.sl)} (top degree is one more; long division)`);}}
  if(V.s>=5)msg.push(`<b>5.</b> sign chart:</div>${C.signChart(F.pts.map(fmtNeg),F.sg,{W:440})}<div>`);
  if(V.s>=6){s=curve(G,x=>F.holes.some(h=>Math.abs(x-h[0])<0.02)?NaN:F.f(x),'#2563eb',3)+s;msg.push('<b>6.</b> sketch: the curve hugs the asymptotes, crosses only at intercepts, and matches the signs.');}
  $('.gr-g',el).innerHTML=G.svg(s);$('.gr-r',el).innerHTML=`<div>Step ${V.s}: <b>${ST[V.s-1]}</b></div><div>${msg.join('<br>')}</div>`;},`<div class="gr-g"></div><div class="readout gr-r"></div>`);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;k=+b.dataset.k;$$('[data-k]',el).forEach(x=>x.classList.toggle('sel',x===b));sp.run();});$('[data-k]',el).classList.add('sel');sp.run();}
/* average cost model */
function mAvg(el){sliders(el,[{k:'F',l:'fixed cost F ($)',min:500,max:5000,step:250,v:2000},{k:'v',l:'cost per item v ($)',min:1,max:20,v:8},{k:'x',l:'items made x',min:10,max:1000,step:10,v:200}],V=>{const A=x=>(V.F+V.v*x)/x;const G=grid({x0:0,x1:10,y0:0,y1:8,u:40,uy:32,lab:2,laby:2,xl:'items (hundreds)',yl:'avg cost ($10s)'});
  let s=curve(G,t=>t<=0.05?NaN:A(t*100)/10,'#2563eb',3)+hline(G,V.v/10,'#f59e0b')+gdot(G,V.x/100,Math.min(8,A(V.x)/10),'#e11d48',7);
  $('.av-g',el).innerHTML=G.svg(s);
  $('.av-r',el).innerHTML=`Average cost per item: <b>Ā(x) = (${V.F} + ${V.v}x)/x</b><br>At x = ${V.x}: Ā = ${nf(V.F+V.v*V.x)}/${V.x} = <b>$${nf(A(V.x))}</b><br>As x → ∞, Ā(x) → <b>$${V.v}</b> (orange asymptote): spreading the fixed cost over more items, but never below the per-item cost.<br><span class="mute">Vertical asymptote x = 0: making almost nothing makes each item enormously expensive.</span>`;},`<div class="av-g"></div><div class="readout av-r"></div>`).run();}
/* partial fractions: pieces add up to the original */
const PF=[{n:'(5x − 1)/((x − 1)(x + 1))',A:2,a:1,B:3,b:-1},{n:'(x + 7)/((x − 2)(x + 3))',A:9/5,a:2,B:-4/5,b:-3},{n:'4/((x − 1)(x + 3))',A:1,a:1,B:-1,b:-3},{n:'(3x)/((x + 2)(x − 4))',A:1,a:-2,B:2,b:4}];
function mPF(el){chooser(el,PF.map(P=>({t:P.n,html:()=>{const G=grid({x0:-6,x1:6,y0:-6,y1:6,u:30,lab:2,laby:2});const f1=x=>Math.abs(x-P.a)<0.04?NaN:P.A/(x-P.a),f2=x=>Math.abs(x-P.b)<0.04?NaN:P.B/(x-P.b);
  const s=curve(G,f1,'#059669',2,'6 4')+curve(G,f2,'#f59e0b',2,'6 4')+curve(G,x=>f1(x)+f2(x),'#2563eb',3.5)+vline(G,P.a,'#cbd5e1')+vline(G,P.b,'#cbd5e1');
  const tA=(x)=>`${x<0?'+ ':'− '}${Math.abs(x)}`;
  return G.svg(s)+`<div class="readout"><span class="math">${P.n} = <span style="color:#059669">${frac(Math.round(P.A*5),5)}/(x ${tA(P.a)})</span> + <span style="color:#f59e0b">${frac(Math.round(P.B*5),5)}/(x ${tA(P.b)})</span></span><br>The two simple dashed pieces add up to the blue original at every x. <b>Cover-up:</b> to get the first numerator, cover (x ${tA(P.a)}) in the original and plug in x = ${P.a}.<br><span class="mute">In calculus, the simple pieces are easy to integrate; the original is not.</span></div>`;}})));}

L['PC-7-1']={goal:'I can find vertical, horizontal, and slant asymptotes and holes of a rational function.',
 life:{title:'Average cost',html:'Printing shirts costs $200 to set up plus $5 each. Average cost per shirt is C(x) = (5x + 200)/x. As you print more, C(x) approaches <b>$5</b> — a horizontal asymptote — but never reaches it.'},
 see:[{title:'Asymptote gallery',hint:'Choose a function. Dashed red lines are asymptotes; an open circle is a hole.',mount:mRational}],
 vocab:[['Vertical asymptote','x = a where the reduced denominator is 0.'],['Hole','x = a where a common factor cancels.'],['Horizontal asymptote','Compare degrees: bottom bigger → y = 0; equal → ratio of leading coefficients.'],['Slant asymptote','Top degree one more than bottom → divide to get y = mx + b.']],
 examples:[ex('Example','f(x) = (3x² − 3)/(x² − x − 2)',[['= 3(x − 1)(x + 1)/((x − 2)(x + 1))','Factor.'],['hole at x = −1','(x + 1) cancels; y = 3(−2)/(−3) = 2 → hole (−1, 2).'],['VA x = 2','Remaining zero of the bottom.'],['HA y = 3/1 = 3','Equal degrees.']])],
 mistake:{bad:'Every zero of the denominator is a vertical asymptote',good:'Factors that cancel make holes',why:'<b>Factor and reduce first.</b> Only the factors left in the denominator create asymptotes.'},
 practice(){const a=nz(-5,5),b=rand(-6,6),c=pick([1,2,-1,3]),d=nz(-6,6);if(a*d===b*c)return this.practice();
  return num(`<span class="math">${mx(`f(x) = (${A2.ps([a,b])})/(${A2.ps([c,d])})`)}</span>. Find the vertical asymptote x = ? and horizontal asymptote y = ?`,[['x =',-d/c],['y =',a/c]],'Bottom = 0 gives the VA. Degrees are equal: HA = ratio of leading coefficients.',[[`${A2.ps([c,d])} = 0 → x = ${nf(-d/c)}`,'Vertical asymptote.'],[`y = ${a}/${c} = ${nf(a/c)}`,'Horizontal asymptote.']]);},
 check:[q('HA of (4x + 1)/(2x − 3)?',['y = 4','y = 2','y = 0','none'],1,''),q('HA of (x + 5)/(x² + 1)?',['y = 1','y = 0','y = 5','none'],1,''),q('(x² − 9)/(x − 3) has at x = 3 a…',['vertical asymptote','hole','zero','slant asymptote'],1,'')]};

L['PC-7-2']={goal:'I can sketch a complete rational graph from its intercepts, asymptotes, holes, and sign chart.',
 life:{title:'A checklist pilots trust',html:'Pilots never skip the pre-flight checklist. Graphing a rational function works the same way: six quick checks, in order, and the sketch almost draws itself.'},
 see:[{title:'Six-step sketch',hint:'Pick a function. Move the step slider from 1 to 6.',mount:mGraphR}],
 vocab:[['Step 1–2','Intercepts: zeros of the reduced numerator; f(0).'],['Step 3','Vertical asymptotes from zeros of the reduced denominator; holes from cancelled factors.'],['Step 4','End behavior: horizontal asymptote (degrees equal or bottom bigger) or slant asymptote (top one degree bigger).'],['Step 5','Sign chart: test one x in each interval between zeros and asymptotes.']],
 examples:[ex('Example','Sketch f(x) = (x + 2)/(x² − 9).',[['x-int −2; y-int −2/9','Steps 1–2.'],['VA x = −3, x = 3; no holes','Step 3.'],['HA y = 0 (bottom degree bigger)','Step 4.'],['signs: − + − + on (−∞, −3), (−3, −2), (−2, 3), (3, ∞)','Step 5.'],['sketch: three branches','Step 6.']])],
 mistake:{bad:'A graph can never cross a horizontal asymptote',good:'It can cross; it only approaches the asymptote at the far ends',why:'Horizontal asymptotes describe <b>end behavior</b>. Vertical asymptotes are the ones a graph never crosses.'},
 practice(){const a=nz(-4,4);let b;do b=nz(-4,4);while(b===a||b===-a);let c;do c=rand(-4,4);while(c===a||c===b);const T=pick(['va','zero','ha','yint']);const f=`(x ${c<0?'+':'−'} ${Math.abs(c)})/((x ${a<0?'+':'−'} ${Math.abs(a)})(x ${b<0?'+':'−'} ${Math.abs(b)}))`.replace('(x − 0)','x').replace('(x + 0)','x');
  if(T==='va')return mc(`Vertical asymptotes of f(x) = ${f}?`,`x = ${Math.min(a,b)}, x = ${Math.max(a,b)}`.replace(/-/g,'−'),[`x = ${c}`.replace('-','−'),`x = ${-Math.min(a,b)}, x = ${-Math.max(a,b)}`.replace(/-/g,'−'),'y = 0','none'],'Zeros of the denominator that do not cancel.');
  if(T==='zero')return mc(`x-intercept of f(x) = ${f}?`,`x = ${fmtNeg(c)}`,[`x = ${fmtNeg(a)}`,`x = ${fmtNeg(b)}`,`x = ${fmtNeg(-c||5)}`],'Zero of the numerator.');
  if(T==='ha')return mc(`End behavior of f(x) = ${f}?`,'horizontal asymptote y = 0',['horizontal asymptote y = 1','slant asymptote y = x','no asymptote'],'Bottom degree (2) is bigger than top degree (1).');
  return num(`Find the y-intercept of f(x) = ${f} (2 decimals).`,[['f(0) ≈',+(-c/(a*b)).toFixed(2),0.011]],'Substitute x = 0.',[[`f(0) = ${fmtNeg(-c)}/(${fmtNeg(-a)}·${P(-b)}) = ${nf(-c/(a*b))}`,'']]);},
 check:[q('f(x) = (x − 1)/(x − 1)(x + 2) has a hole at…',['x = −2','x = 1','x = 0','none'],1,''),q('Degree of top = degree of bottom + 1 means…',['HA y = 0','slant asymptote','no VA','a hole'],1,''),q('Signs alternate across a VA when the factor’s power is…',['odd','even','zero','any'],0,'')]};

L['PC-7-3']={goal:'I can solve polynomial and rational inequalities with a sign chart.',
 life:{title:'When is the business profitable?',html:'Profit P(x) = −(x − 10)(x − 90) is positive only for some production levels. Solving P(x) &gt; 0 means finding the <b>interval</b> where the graph is above the axis — not just one number.'},
 see:[{title:'Sign chart',hint:'Slide the test x. Green = positive, red = negative.',mount:mSign}],
 vocab:[['Critical numbers','Zeros of the numerator and denominator.'],['Sign chart','A number line showing the sign of f on each interval.'],['Test point','One x inside an interval to find its sign.'],['Interval notation','( ) excludes an endpoint, [ ] includes it.']],
 examples:[ex('Example','Solve x² − x − 6 < 0.',[['(x − 3)(x + 2) < 0','Factor.'],['critical numbers −2, 3','Split the line.'],['test 0: (−3)(2) = −6 < 0 ✓','Middle interval works.'],['−2 < x < 3, i.e. (−2, 3)','Strict: endpoints excluded.']])],
 mistake:{bad:'Multiply both sides of (x + 1)/(x − 2) > 0 by (x − 2)',good:'use a sign chart',why:'x − 2 can be negative, which would flip the inequality. A sign chart avoids that trap.'},
 practice(){const a=rand(-6,2),b=a+rand(2,7);const lt=Math.random()<.5;
  return num(`Solve (x ${a<0?'+':'−'} ${Math.abs(a)})(x ${b<0?'+':'−'} ${Math.abs(b)}) ${lt?'&lt;':'≤'} 0. The solution is an interval from p to q. Enter p and q.`,[['p =',a],['q =',b]],'An upward parabola is negative between its zeros.',[[`zeros ${fmtNeg(a)}, ${fmtNeg(b)}`,'Critical numbers.'],[`${lt?'(':'['}${fmtNeg(a)}, ${fmtNeg(b)}${lt?')':']'}`,'Negative between the zeros.']]);},
 check:[q('x(x − 4) > 0 is true for…',['0 < x < 4','x < 0 or x > 4','x > 4 only','all x'],1,''),q('In (x + 1)/(x − 2) ≥ 0, is x = 2 included?',['yes','no — undefined','only if ≥','sometimes'],1,''),q('A sign chart works because the sign can only change at…',['integers','critical numbers','the y-intercept','x = 0'],1,'')]};

L['PC-7-4']={goal:'I can build and interpret rational models such as average cost, and explain their asymptotes in context.',
 life:{title:'Starting a T-shirt business',html:'Your screen printer costs $2000. Each shirt costs $8 in materials. Make 10 shirts and each costs $208; make 1000 and each costs $10. The <b>average cost</b> is a rational function, and its asymptote is the best price you can ever reach.'},
 see:[{title:'Average cost curve',hint:'Change the fixed cost, the per-item cost, and the number made.',mount:mAvg}],
 vocab:[['Average cost','Ā(x) = total cost / number of items = (F + vx)/x.'],['Horizontal asymptote in context','The long-run value: here, the per-item cost v.'],['Vertical asymptote in context','Usually where the model breaks down (x = 0 items).'],['Mixture model','Concentration = amount of substance / total volume.']],
 examples:[ex('Example 1','Ā(x) = (1500 + 4x)/x. How many items make the average cost $7?',[['(1500 + 4x)/x = 7',''],['1500 + 4x = 7x','Multiply by x.'],['x = 500 items','']]),
  ex('Example 2','A 10 L tank holds 2 L of juice. You add pure juice at 1 L/min. Concentration after t min?',[['c(t) = (2 + t)/(10 + t)','Juice / total.'],['as t → ∞, c → 1','Approaches 100% juice.']])],
 mistake:{bad:'with enough items the average cost reaches $0',good:'it approaches the per-item cost v',why:'The fixed cost gets spread thin, but each item still needs its materials.'},
 practice(){const F=250*rand(2,20),v=rand(2,15),t=v+rand(1,10);const x=F/(t-v);if(Math.random()<0.5){const n=10*rand(5,80);
   return num(`Fixed cost $${F}, cost per item $${v}. Find the average cost per item when ${n} items are made (2 decimals).`,[['Ā = $',+((F+v*n)/n).toFixed(2),0.011]],'Ā(x) = (F + vx)/x.',[[`(${F} + ${v}·${n})/${n} = ${nf((F+v*n)/n)}`,'']]);}
  return num(`Ā(x) = (${F} + ${v}x)/x. How many items make the average cost $${t}? (2 decimals)`,[['x ≈',+x.toFixed(2),0.011]],'Set Ā(x) equal to the target and multiply by x.',[[`${F} + ${v}x = ${t}x`,''],[`${F} = ${t-v}x → x = ${nf(x)}`,'']]);},
 check:[q('Ā(x) = (900 + 3x)/x approaches… as x grows',['900','3','0','303'],1,''),q('In c(t) = (2 + t)/(10 + t), c(0) =',['0.2','1','0.1','2'],0,''),q('The VA of an average-cost model is usually…',['x = 0','y = 0','x = F','none'],0,'')]};

L['PC-7-5']={goal:'I can split a rational expression with distinct linear factors into partial fractions.',
 life:{title:'Undoing “add fractions”',html:'You know 2/(x − 1) + 3/(x + 1) = (5x − 1)/((x − 1)(x + 1)). <b>Partial fractions</b> run that in reverse — and in Calculus BC this is the key step for integrating rational functions.'},
 see:[{title:'Pieces add up to the whole',hint:'Pick an expression. The dashed simple pieces sum to the blue curve.',mount:mPF}],
 vocab:[['Partial fractions','(px + q)/((x − a)(x − b)) = A/(x − a) + B/(x − b).'],['Cover-up method','A = value of the rest of the fraction at x = a (cover the (x − a) factor).'],['Proper fraction','Top degree < bottom degree; if not, long-divide first.']],
 examples:[ex('Example','Decompose (x + 11)/((x − 3)(x + 1)).',[['(x + 11) = A(x + 1) + B(x − 3)','Multiply both sides by the denominator.'],['x = 3: 14 = 4A → A = 7/2','Pick x to kill B.'],['x = −1: 10 = −4B → B = −5/2','Pick x to kill A.'],['= (7/2)/(x − 3) − (5/2)/(x + 1)','Check by adding back.']])],
 mistake:{bad:'1/((x − 1)(x + 2)) = 1/(x − 1) + 1/(x + 2)',good:'(1/3)/(x − 1) − (1/3)/(x + 2)',why:'Add your answer back together. The numerators must be solved for, not guessed.'},
 practice(){const a=nz(-5,5);let b;do b=nz(-5,5);while(b===a);const A=nz(-5,5),B=nz(-5,5);const p=A+B,q=-(A*b+B*a);
  const fa=v=>`(x ${v<0?'+':'−'} ${Math.abs(v)})`;
  return num(`Write (${A2.ps([p,q])})/(${fa(a)}${fa(b)}) as A/${fa(a)} + B/${fa(b)}.`,[['A =',A],['B =',B]],`Multiply out: ${A2.ps([p,q])} = A${fa(b)} + B${fa(a)}. Then plug in x = ${a} and x = ${b}.`,[[`x = ${a}: ${p*a+q} = A(${a-b}) → A = ${A}`,''],[`x = ${b}: ${p*b+q} = B(${b-a}) → B = ${B}`,'']]);},
 check:[q('3/(x − 2) + 1/(x + 1) combined has denominator…',['(x − 2) + (x + 1)','(x − 2)(x + 1)','x² − 2','3'],1,''),q('For (x + 4)/((x − 1)(x + 2)), the cover-up value A at x = 1 is…',['5/3','5','1','−1'],0,'(1 + 4)/(1 + 2).'),q('Partial fractions is most useful in Calculus for…',['derivatives','integrals','limits at a point','graphing lines'],1,'')]};

TOOLS['PC-7']={title:'Rational-function gallery',hint:'Compare vertical, horizontal, and slant asymptotes and holes.',mount:mRational};
})();
