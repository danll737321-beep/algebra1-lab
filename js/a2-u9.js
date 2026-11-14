/* Khan Algebra 2 · Unit 9 · Transformations of functions */
(function(){const {graphLab,chooser,ex,q,mc,num,nz,curve,TOOLS,nf,vline,hline}=A2;
const cbrt=x=>Math.sign(x)*Math.abs(x)**(1/3);
const PAR={sq:{n:'x²',f:x=>x*x},abs:{n:'|x|',f:Math.abs},sqrt:{n:'√x',f:x=>x<0?NaN:Math.sqrt(x)},cbrt:{n:'∛x',f:cbrt},cube:{n:'x³',f:x=>x**3},exp:{n:'2ˣ',f:x=>2**x},log:{n:'log₂x',f:x=>x<=0?NaN:Math.log2(x)}};
const inner=(b,h)=>{const xs=h?`x ${h<0?'+':'−'} ${Math.abs(h)}`:'x';return b===1?xs:b===-1?`−${h?'(':''}${xs}${h?')':''}`:`${nf(b)}${h?'(':''}${xs}${h?')':''}`;};
function fx(p,b,h){const n=PAR[p].n;const I=inner(b,h);if(p==='sq')return `(${I})²`;if(p==='cube')return `(${I})³`;if(p==='abs')return `|${I}|`;if(p==='sqrt')return `√(${I})`;if(p==='cbrt')return `∛(${I})`;if(p==='exp')return `2<sup>${I}</sup>`;return `log₂(${I})`;}
function eqStr(p,V){const a=V.a===undefined?1:V.a,b=V.b===undefined?1:V.b,h=V.h||0,k=V.k||0;return `g(x) = ${a===1?'':a===-1?'−':nf(a)}${fx(p,b,h)}${k?(k<0?' − ':' + ')+Math.abs(k):''}`;}
function lab(el,parents,params,readFn,g){let p=parents[0];const wrap=document.createElement('div');el.innerHTML=parents.length>1?`<div class="row">${parents.map(k=>`<button data-par="${k}">${PAR[k].n}</button>`).join('')}</div>`:'';el.appendChild(wrap);
 const sp=graphLab(wrap,{g:Object.assign({x0:-7,x1:7,y0:-7,y1:7,u:30,lab:1},g||{}),params,curves:V=>{const a=V.a===undefined?1:V.a,b=V.b===undefined?1:V.b,h=V.h||0,k=V.k||0;return [{f:PAR[p].f,col:'#9ca3af',w:2,dash:'6 5'},{f:x=>a*PAR[p].f(b*(x-h))+k}];},
  extra:(G,V)=>{let s='';if(p==='exp')s+=hline(G,V.k||0,'#e11d48');if(p==='log')s+=vline(G,V.h||0,'#e11d48');return s;},eq:V=>eqStr(p,V),read:V=>readFn(V,p)});
 el.addEventListener('click',e=>{const bt=e.target.closest('[data-par]');if(!bt)return;p=bt.dataset.par;$$('[data-par]',el).forEach(x=>x.classList.toggle('sel',x===bt));sp.run();});const f=$('[data-par]',el);if(f)f.classList.add('sel');}
const H={k:'h',l:'h (left/right)',min:-5,max:5,v:2},K={k:'k',l:'k (up/down)',min:-5,max:5,v:1},A={k:'a',l:'a (vertical)',min:-3,max:3,step:.5,v:2},B={k:'b',l:'b (horizontal)',min:-3,max:3,step:.5,v:1};
const shiftR=V=>`${V.h?`Shift <b>${Math.abs(V.h)} ${V.h>0?'right':'left'}</b> (x − h with h = ${fmtNeg(V.h)}). `:''}${V.k?`Shift <b>${Math.abs(V.k)} ${V.k>0?'up':'down'}</b>. `:''}${!V.h&&!V.k?'No shift. ':''}<br><span class="mute">Inside the function moves sideways — and opposite to the sign you see. Outside moves up/down, same sign.</span>`;
function mShift(el){lab(el,['sq','abs','sqrt','cube'],[H,K],shiftR);}
function mReflect(el){lab(el,['sqrt','exp','cube','abs'],[{k:'a',l:'outside sign',min:-1,max:1,step:2,v:-1,f:v=>v<0?'−f(x)':'f(x)'},{k:'b',l:'inside sign',min:-1,max:1,step:2,v:1,f:v=>v<0?'f(−x)':'f(x)'}],V=>`${V.a<0?'<b>−f(x)</b> flips over the <b>x-axis</b> (every y changes sign). ':''}${V.b<0?'<b>f(−x)</b> flips over the <b>y-axis</b> (every x changes sign). ':''}${V.a>0&&V.b>0?'No reflection. ':''}${V.a<0&&V.b<0?'Both flips = a 180° turn about the origin.':''}`);}
function mSym(el){const FN=[{t:'x² (even)',f:x=>x*x/2-2,e:'even'},{t:'x³ − 3x (odd)',f:x=>(x**3-3*x)/3,e:'odd'},{t:'x² + x (neither)',f:x=>(x*x+x)/2-2,e:'neither'},{t:'|x| − 3 (even)',f:x=>Math.abs(x)-3,e:'even'},{t:'∛x (odd)',f:x=>2*cbrt(x),e:'odd'}];
 chooser(el,FN.map(F=>({t:F.t,html:()=>{const G=grid({x0:-5,x1:5,y0:-6,y1:6,u:30,lab:1});return G.svg(curve(G,F.f,'#2563eb',4)+curve(G,x=>F.f(-x),'#f59e0b',2,'6 5')+curve(G,x=>-F.f(-x),'#e11d48',2,'2 4'))+`<div class="readout"><span style="color:#f59e0b;font-weight:800">orange</span> = f(−x) (mirror in y-axis), <span style="color:#e11d48;font-weight:800">red</span> = −f(−x) (turn 180°).<br>${F.e==='even'?'<b>Even</b>: orange lands exactly on blue → f(−x) = f(x). Symmetric about the y-axis.':F.e==='odd'?'<b>Odd</b>: red lands exactly on blue → f(−x) = −f(x). Symmetric about the origin.':'<b>Neither</b>: no copy lands on blue.'}</div>`;}})));}
function mScale(el){lab(el,['sq','abs','sqrt','exp'],[A,B],V=>`a = ${nf(V.a)}: ${Math.abs(V.a)>1?'<b>vertical stretch</b>':Math.abs(V.a)<1&&V.a?'<b>vertical shrink</b>':V.a?'no vertical scaling':'flattened to y = 0'} by ${nf(Math.abs(V.a))}${V.a<0?' + flip over x-axis':''}.<br>b = ${nf(V.b)}: ${!V.b?'b = 0 collapses the input':`<b>horizontal ${Math.abs(V.b)>1?'shrink':Math.abs(V.b)<1?'stretch':'— none'}</b> by factor 1/${nf(Math.abs(V.b))}${V.b<0?' + flip over y-axis':''}`}.<br><span class="mute">Inside scaling is backwards: f(2x) makes the graph twice as <b>narrow</b>.</span>`);}
function mAll(el){lab(el,['sq','abs','sqrt','cube','exp'],[A,H,K],V=>`Order: start with the parent → stretch/flip by a = ${nf(V.a)} → shift ${V.h>=0?'right':'left'} ${Math.abs(V.h)} → shift ${V.k>=0?'up':'down'} ${Math.abs(V.k)}.<br><span class="mute">Track one key point: the parent’s (0, ${0}) moves to (h, k) = (${fmtNeg(V.h)}, ${fmtNeg(V.k)}) for x², |x|, √x, x³.</span>`);}
function mRoots(el){lab(el,['sqrt','cbrt'],[A,H,K],(V,p)=>p==='sqrt'?`Starting point (h, k) = <b>(${fmtNeg(V.h)}, ${fmtNeg(V.k)})</b>. Domain x ≥ ${fmtNeg(V.h)} (can’t take √ of a negative). Range y ${V.a>=0?'≥':'≤'} ${fmtNeg(V.k)}.`:`Center (inflection) point <b>(${fmtNeg(V.h)}, ${fmtNeg(V.k)})</b>. Domain and range: all real numbers (cube roots of negatives exist).`);}
function mExp(el){lab(el,['exp'],[A,K,{k:'h',l:'h',min:-4,max:4,v:0}],V=>`Horizontal asymptote <b>y = ${fmtNeg(V.k)}</b> (red). y-intercept: ${nf(V.a*2**(-V.h)+V.k)}. ${V.a>0?'Above':'Below'} the asymptote; ${V.a>0?'rising':'falling'} as x increases.<br><span class="mute">k moves the asymptote; a stretches or flips; h slides sideways.</span>`,{y0:-8,y1:10,uy:22});}
function mLog(el){lab(el,['log'],[A,H,K],V=>`Vertical asymptote <b>x = ${fmtNeg(V.h)}</b> (red). Domain x &gt; ${fmtNeg(V.h)}. Passes through (${fmtNeg(V.h+1)}, ${fmtNeg(V.k)}) because log₂1 = 0.<br><span class="mute">Logs are the inverse of exponentials: the asymptote is vertical instead of horizontal.</span>`);}

const basic=(goal,life,see,vocab,exs,mistake,practice,check)=>({goal,life,see,vocab,examples:exs,mistake,practice,check});
const PSET=['sq','abs','sqrt','cube'];
function shiftPractice(){const p=pick(PSET),h=rand(-5,5),k=rand(-5,5);return num(`g(x) = ${fx(p,1,h)}${k?(k<0?' − ':' + ')+Math.abs(k):''}. The graph of f(x) = ${PAR[p].n} is shifted how far right (negative = left) and up (negative = down)?`,[['right by',h],['up by',k]],'Inside: opposite sign. Outside: same sign.',[[`h = ${h}, k = ${k}`,'Compare with f(x − h) + k.']]);}

L['A2-9-1']=basic('I can describe and graph vertical and horizontal shifts f(x − h) + k.',
 {title:'Moving a design',html:'A graphic designer drags a logo 2 right and 1 up. Its shape doesn’t change — only its position. Shifting a graph is the same: add k <b>outside</b> to move up, replace x with <b>x − h</b> to move right.'},
 [{title:'Shift lab',hint:'Pick a parent function. Move h and k.',mount:mShift}],
 [['Vertical shift','f(x) + k moves up k (down if k < 0).'],['Horizontal shift','f(x − h) moves right h; f(x + h) moves left.'],['Parent function','The simplest form, e.g. x², |x|, √x.']],
 [ex('Example 1','Describe g(x) = (x + 4)² − 3',[['x + 4 = x − (−4) → 4 left',''],['− 3 → 3 down',''],['vertex moves from (0, 0) to (−4, −3)','']]),ex('Example 2','Write g: |x| moved 5 right and 2 up',[['g(x) = |x − 5| + 2','']])],
 {bad:'f(x − 3) moves left 3',good:'right 3',why:'Input x − 3 reaches the old value 0 when x = 3 — everything happens 3 units <b>later</b> (to the right).'},shiftPractice,
 [q('g(x) = √(x − 2): shift?',['2 left','2 right','2 up','2 down'],1,'Inside, opposite.'),q('g(x) = x³ + 6: shift?',['6 up','6 down','6 left','6 right'],0,'Outside, same.'),q('|x| moved 1 left: g(x) = ?',['|x − 1|','|x + 1|','|x| − 1','|x| + 1'],1,'x − (−1).')]);

L['A2-9-2']=basic('I can reflect graphs over the x-axis and y-axis.',
 {title:'Mirror images',html:'Flip a photo upside down and every point’s height changes sign: that’s <b>−f(x)</b>. Flip it left-to-right and every x changes sign: that’s <b>f(−x)</b>. Two different mirrors.'},
 [{title:'Reflection lab',hint:'Toggle the outside and inside signs.',mount:mReflect}],
 [['−f(x)','Reflection over the x-axis.'],['f(−x)','Reflection over the y-axis.'],['Invariant points','Points on the mirror line don’t move.']],
 [ex('Example 1','f(x) = √x. Describe g(x) = −√x and h(x) = √(−x).',[['g: flip over x-axis → points down-right',''],['h: flip over y-axis → goes left, domain x ≤ 0','']]),ex('Example 2','f(x) = 2ˣ. Write the reflection over the y-axis.',[['g(x) = 2<sup>−x</sup> = (1/2)ˣ','Growth becomes decay.']])],
 {bad:'−x² is a reflection over the y-axis',good:'over the x-axis',why:'The minus is <b>outside</b> the square: −(x²). Every output changes sign.'},
 ()=>{const p=pick(['sqrt','exp','cube','log']),t=pick(['x','y']);return mc(`f(x) = ${PAR[p].n}. Which equation reflects f over the <b>${t}-axis</b>?`,t==='x'?`−${fx(p,1,0)}`:fx(p,-1,0),[`−${fx(p,1,0)}`,fx(p,-1,0),`${fx(p,1,0)} − 1`,`1/${fx(p,1,0)}`],t==='x'?'Over the x-axis: negate the output.':'Over the y-axis: negate the input.');},
 [q('Reflect y = |x − 2| over the y-axis',['y = |−x − 2|','y = −|x − 2|','y = |x + 2| − 2','y = |x − 2| − 1'],0,'Replace x with −x.'),q('(3, 5) reflected over the x-axis',['(−3, 5)','(3, −5)','(−3, −5)','(5, 3)'],1,'y changes sign.'),q('Which flip turns 2ˣ into decay?',['−2ˣ','2<sup>−x</sup>','2ˣ − 1','2·2ˣ'],1,'f(−x).')]);

L['A2-9-3']=basic('I can tell whether a function is even, odd, or neither, from its graph or formula.',
 {title:'Butterflies and pinwheels',html:'A butterfly is symmetric across a line: fold it and it matches — like an <b>even</b> function across the y-axis. A pinwheel matches itself after a half-turn — like an <b>odd</b> function about the origin.'},
 [{title:'Symmetry test',hint:'Pick a function. Which copy lands on it?',mount:mSym}],
 [['Even','f(−x) = f(x); symmetric about the y-axis.'],['Odd','f(−x) = −f(x); symmetric about the origin.'],['Neither','Neither rule holds.']],
 [ex('Example 1','Is f(x) = x⁴ − 3x² even, odd, or neither?',[['f(−x) = (−x)⁴ − 3(−x)² = x⁴ − 3x²','Substitute −x.'],['= f(x) → even','']]),ex('Example 2','f(x) = x³ + 1?',[['f(−x) = −x³ + 1','Not f(x), not −f(x) = −x³ − 1.'],['neither','']])],
 {bad:'Odd function means odd numbers in it',good:'f(−x) = −f(x)',why:'x³ + 1 has odd powers but is <b>neither</b>. Test with −x.'},
 ()=>{const T=[['x⁴ + 2x²','even'],['x³ − 5x','odd'],['x² + x','neither'],['|x| + 7','even'],['5x','odd'],['x⁵ + x³','odd'],['(x − 1)²','neither'],['3','even'],['x³ + 2','neither'],['x⁶ − x²','even']];const t=pick(T);return mc(`Is <b>f(x) = ${t[0]}</b> even, odd, or neither?`,t[1],['even','odd','neither','both'],'Compute f(−x) and compare.');},
 [q('Symmetric about the y-axis means…',['odd','even','neither','both'],1,'Even.'),q('f(x) = x³ is…',['even','odd','neither','both'],1,'(−x)³ = −x³.'),q('If f is odd and f(2) = 5, f(−2) = ?',['5','−5','2','0'],1,'f(−x) = −f(x).')]);

L['A2-9-4']=basic('I can describe vertical and horizontal stretches and compressions.',
 {title:'Zooming a picture',html:'Stretch a picture taller and every height is multiplied: that’s <b>a·f(x)</b>. Squeeze it narrower and every x is divided: that’s <b>f(bx)</b> with b > 1. Horizontal changes act backwards — a familiar theme.'},
 [{title:'Scaling lab',hint:'Change a and b. Compare with the dashed parent.',mount:mScale}],
 [['Vertical stretch','a·f(x) with |a| > 1.'],['Vertical shrink','a·f(x) with 0 < |a| < 1.'],['Horizontal scale','f(bx) scales x by 1/b.']],
 [ex('Example 1','Describe g(x) = 3|x|',[['every y is tripled → vertical stretch by 3','']]),ex('Example 2','Describe g(x) = √(4x)',[['horizontal shrink by 1/4','Inside, reciprocal.'],['= 2√x, also a vertical stretch by 2','For √ the two look the same!']])],
 {bad:'f(2x) is twice as wide',good:'half as wide',why:'The output that f gave at x = 4 now appears at x = 2. Everything happens <b>sooner</b>.'},
 ()=>{const a=pick([2,3,4,0.5,0.25]),inside=Math.random()<.5;return mc(`g(x) = ${inside?`f(${nf(a)}x)`:`${nf(a)}f(x)`}. Describe the transformation.`,inside?`horizontal ${a>1?'shrink':'stretch'} by factor ${nf(1/a)}`:`vertical ${a>1?'stretch':'shrink'} by factor ${nf(a)}`,[`horizontal ${a>1?'shrink':'stretch'} by factor ${nf(1/a)}`,`vertical ${a>1?'stretch':'shrink'} by factor ${nf(a)}`,`horizontal ${a>1?'stretch':'shrink'} by factor ${nf(a)}`,`vertical ${a>1?'shrink':'stretch'} by factor ${nf(1/a)}`],inside?'Inside → horizontal, reciprocal factor.':'Outside → vertical, same factor.');},
 [q('g(x) = ½x²',['vertical shrink','vertical stretch','horizontal shrink','shift'],0,'a = ½.'),q('Point (6, 2) on f. On f(3x) it moves to…',['(18, 2)','(2, 2)','(6, 6)','(2, 6)'],1,'x ÷ 3.'),q('g(x) = −2f(x)',['stretch by 2 + flip over x-axis','shrink + flip','shift down 2','flip over y-axis'],0,'')]);

L['A2-9-5']=basic('I can combine shifts, reflections, and stretches to graph or write a transformed function.',
 {title:'One formula, many moves',html:'g(x) = −2(x − 3)² + 4 packs four moves into one line: stretch by 2, flip, slide right 3, lift 4. Reading the moves in order lets you sketch g without a table.'},
 [{title:'Full transformation lab',hint:'Combine a, h, k on any parent.',mount:mAll}],
 [['g(x) = a·f(x − h) + k','Stretch/flip by a, shift right h, up k.'],['Key point','Track a simple point like the vertex.'],['Order','Scale/reflect before shifting.']],
 [ex('Example 1','Describe g(x) = −½|x + 2| − 1',[['shrink by ½ and flip over x-axis',''],['2 left, 1 down',''],['vertex (−2, −1), opens down','']]),ex('Example 2','Write: √x stretched by 3, moved 4 right and 2 down',[['g(x) = 3√(x − 4) − 2','']])],
 {bad:'g(x) = 2(x − 1)² + 3 has vertex (−1, 3)',good:'(1, 3)',why:'x − h with h = 1 → right 1. The sign inside flips.'},
 ()=>{const a=pick([2,-2,3,-1,0.5,-0.5]),h=rand(-5,5),k=rand(-5,5),p=pick(['sq','abs']);return num(`g(x) = ${eqStr(p,{a,h,k}).replace('g(x) = ','')}. What is the vertex (h, k), and does it open up (1) or down (−1)?`,[['h =',h],['k =',k],['up 1 / down −1:',a>0?1:-1]],'Compare with a·f(x − h) + k.',[[`(${h}, ${k}), a = ${nf(a)}`,a>0?'Opens up.':'Opens down.']]);},
 [q('Vertex of y = (x + 1)² − 5',['(1, −5)','(−1, −5)','(−1, 5)','(5, −1)'],1,''),q('y = −|x| + 2 has a…',['minimum at (0, 2)','maximum at (0, 2)','minimum at (2, 0)','no vertex'],1,'Flipped V.'),q('√x moved 3 left: ',['√(x − 3)','√(x + 3)','√x − 3','√x + 3'],1,'')]);

L['A2-9-6']=basic('I can graph square-root and cube-root functions and find their domain and range.',
 {title:'Stopping distance',html:'The speed a car was going can be estimated from its skid marks: speed ≈ 5.5√(length). Square-root graphs start at a point and grow ever more slowly. Cube-root graphs go both ways because cube roots of negatives exist.'},
 [{title:'Root function lab',hint:'Switch between √ and ∛. Watch the starting point and domain.',mount:mRoots}],
 [['√ function','Domain: inside ≥ 0. Starts at an endpoint.'],['∛ function','Domain: all reals. S-shaped, centered at (h, k).'],['a√(x − h) + k','Endpoint (h, k).']],
 [ex('Example 1','Domain and range of g(x) = √(x + 3) − 2',[['x + 3 ≥ 0 → x ≥ −3','Domain.'],['y ≥ −2','Range, starts at (−3, −2).']]),ex('Example 2','g(x) = −∛(x − 1)',[['center (1, 0), flipped','Decreasing S-curve.']])],
 {bad:'Domain of √(x − 4) is x ≥ −4',good:'x ≥ 4',why:'Solve x − 4 ≥ 0.'},
 ()=>{const h=rand(-6,6),k=rand(-6,6),a=pick([1,2,-1,3]);return num(`g(x) = ${a===1?'':a===-1?'−':a}√(x ${h<0?'+':'−'} ${Math.abs(h)}) ${k<0?'−':'+'} ${Math.abs(k)}. Domain is x ≥ ?, and the starting point’s y-value is?`,[['x ≥',h],['start y =',k]],'Set the inside ≥ 0.',[[`x ${h<0?'+':'−'} ${Math.abs(h)} ≥ 0 → x ≥ ${h}`,'Domain.'],[`starts at (${h}, ${k})`,'']]);},
 [q('Domain of ∛(x − 5)?',['x ≥ 5','x > 5','all reals','x ≥ 0'],2,'Cube roots of negatives exist.'),q('Range of −√x?',['y ≥ 0','y ≤ 0','all reals','y < 0'],1,'Flipped.'),q('Starting point of √(x + 1) + 4',['(1, 4)','(−1, 4)','(4, −1)','(−1, −4)'],1,'')]);

L['A2-9-7']=basic('I can graph exponential functions and identify the asymptote, intercept, and growth/decay.',
 {title:'Cooling coffee',html:'Coffee at 90°C in a 20°C room cools as T(t) = 70(0.9)ᵗ + 20. It approaches 20°C but never quite reaches it — a <b>horizontal asymptote</b> at y = 20. The +20 is a vertical shift of an exponential.'},
 [{title:'Exponential graph lab',hint:'Move k (asymptote), a, and h.',mount:mExp}],
 [['Horizontal asymptote','y = k for a·bˣ + k.'],['y-intercept','a·b⁰ + k = a + k (when h = 0).'],['Growth vs. decay','b > 1 grows; 0 < b < 1 decays.']],
 [ex('Example 1','Graph features of g(x) = 3·2ˣ − 4',[['asymptote y = −4',''],['y-intercept 3 − 4 = −1',''],['increasing (b = 2 > 1, a > 0)','']]),ex('Example 2','g(x) = −(½)ˣ + 1',[['asymptote y = 1','Graph is below it (a < 0).']])],
 {bad:'Asymptote of 2ˣ + 3 is y = 0',good:'y = 3',why:'The +3 lifts every point — including the line the graph approaches.'},
 ()=>{const a=pick([1,2,3,-1,-2]),k=rand(-5,5),b=pick([2,3,0.5]);return num(`g(x) = ${a===1?'':a===-1?'−':a+'·'}(${nf(b)})<sup>x</sup> ${k<0?'−':'+'} ${Math.abs(k)}. Find the horizontal asymptote y = ? and the y-intercept.`,[['asymptote y =',k],['y-intercept =',a+k]],'The asymptote is k; at x = 0 the power is 1.',[[`y = ${k}`,'Asymptote.'],[`g(0) = ${a} + ${P(k)} = ${a+k}`,'y-intercept.']]);},
 [q('Asymptote of 5(0.3)ˣ − 2?',['y = 5','y = −2','x = −2','y = 0'],1,'k.'),q('Which decays?',['4(1.2)ˣ','(0.7)ˣ','3ˣ','2(1.01)ˣ'],1,'0 < b < 1.'),q('y-intercept of 2ˣ + 6?',['6','7','8','2'],1,'1 + 6.')]);

L['A2-9-8']=basic('I can graph logarithmic functions and identify the vertical asymptote and domain.',
 {title:'Loudness',html:'Decibels are a log scale: dB = 10·log(I/I₀). A log graph rises quickly at first, then very slowly, and it never touches its <b>vertical asymptote</b>. It is the exponential graph reflected over y = x.'},
 [{title:'Log graph lab',hint:'Move h, k, and a. Watch the red asymptote.',mount:mLog}],
 [['Vertical asymptote','x = h for log_b(x − h) + k.'],['Domain','x > h (inside must be positive).'],['Inverse of bˣ','Reflection over y = x.']],
 [ex('Example 1','Graph features of g(x) = log₂(x + 3) − 1',[['asymptote x = −3','Inside = 0.'],['domain x > −3',''],['point (−2, −1)','log₂1 = 0.']]),ex('Example 2','g(x) = −log₃x',[['asymptote x = 0, decreasing','Flipped over x-axis.']])],
 {bad:'Domain of log(x − 2) is x ≥ 2',good:'x > 2',why:'log 0 is undefined — the input must be <b>strictly</b> positive.'},
 ()=>{const h=rand(-6,6),k=rand(-5,5);return num(`g(x) = log₂(x ${h<0?'+':'−'} ${Math.abs(h)}) ${k<0?'−':'+'} ${Math.abs(k)}. Vertical asymptote x = ?, and g(${h+2}) = ?`,[['asymptote x =',h],[`g(${h+2}) =`,1+k]],'Inside = 0 gives the asymptote. log₂2 = 1.',[[`x = ${h}`,'Asymptote.'],[`g(${h+2}) = log₂2 ${k<0?'−':'+'} ${Math.abs(k)} = ${1+k}`,'']]);},
 [q('Asymptote of log(x + 4)?',['x = 4','x = −4','y = −4','y = 4'],1,''),q('Domain of ln(x − 1)?',['x > 1','x ≥ 1','x > 0','all reals'],0,''),q('log₂x and 2ˣ are reflections over…',['x-axis','y-axis','y = x','origin'],2,'Inverses.')]);

TOOLS['A2-9']={title:'Transformation lab',hint:'Choose a parent function, then stretch, flip, and shift it.',mount:mAll};
})();
