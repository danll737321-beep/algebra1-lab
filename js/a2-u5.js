/* Khan Algebra 2 · Unit 5 · Polynomial graphs */
(function(){const {ps,pmul,peval,sliders,graphLab,chooser,ex,q,mc,num,nz,curve,TOOLS,nf,sup}=A2;
const fact=(a,rs)=>(a===1?'':a===-1?'−':nf(a))+rs.map(r=>r===0?'x':`(x ${r<0?'+':'−'} ${Math.abs(r)})`).join('');
const factM=(a,rs,ms)=>(a===1?'':a===-1?'−':nf(a))+rs.map((r,i)=>(r===0?'x':`(x ${r<0?'+':'−'} ${Math.abs(r)})`)+(ms[i]>1?sup(ms[i]):'')).join('');
function mountZeros(el){graphLab(el,{g:{x0:-6,x1:6,y0:-10,y1:10,u:34,uy:16,lab:1,laby:2},params:[{k:'p',l:'zero r₁',min:-5,max:5,v:-3},{k:'m',l:'multiplicity of r₁',min:1,max:3,v:1},{k:'q',l:'zero r₂',min:-5,max:5,v:1},{k:'r',l:'zero r₃',min:-5,max:5,v:4},{k:'s',l:'a',min:-1,max:1,step:2,v:1}],
 curves:V=>[{f:x=>V.s*0.25*(x-V.p)**V.m*(x-V.q)*(x-V.r)}],eq:V=>'y = '+factM(V.s*0.25,[V.p,V.q,V.r],[V.m,1,1]),
 extra:(G,V)=>[V.p,V.q,V.r].map(z=>gdot(G,z,0,'#e11d48',7)).join(''),
 read:V=>`Zeros: x = <b>${[...new Set([V.p,V.q,V.r])].join(', ')}</b> — each factor (x − r) makes y = 0 at x = r.<br>${V.m===1?'Multiplicity 1: the graph <b>crosses</b> straight through.':V.m===2?'Multiplicity 2 at x = '+V.p+': the graph <b>touches and turns back</b> (bounces).':'Multiplicity 3 at x = '+V.p+': the graph <b>flattens</b> and then crosses.'} Degree = ${V.m+2}.`});}
function mountSign(el){graphLab(el,{g:{x0:-6,x1:6,y0:-10,y1:10,u:34,uy:16,lab:1,laby:2},params:[{k:'p',l:'r₁',min:-5,max:5,v:-4},{k:'q',l:'r₂',min:-5,max:5,v:0},{k:'r',l:'r₃',min:-5,max:5,v:3}],
 curves:V=>[{f:x=>0.2*(x-V.p)*(x-V.q)*(x-V.r)}],eq:V=>'y = '+fact(0.2,[V.p,V.q,V.r]),
 extra:(G,V)=>{let s='';for(let x=G.x0;x<G.x1;x+=0.1){const y=0.2*(x-V.p)*(x-V.q)*(x-V.r);if(Math.abs(y)<1e-9)continue;s+=`<rect x="${G.X(x)}" y="${y>0?G.Y(G.y1):G.Y(0)}" width="${G.u*0.1+0.5}" height="${G.uy*(y>0?G.y1:-G.y0)}" fill="${y>0?'rgba(34,197,94,.10)':'rgba(239,68,68,.10)'}"/>`;}return s+[V.p,V.q,V.r].map(z=>gdot(G,z,0,'#1f2937',6)).join('');},
 read:V=>{const z=[...new Set([V.p,V.q,V.r])].sort((a,b)=>a-b),pts=[-Infinity,...z,Infinity];const iv=[];for(let i=0;i<pts.length-1;i++){const m=pts[i]===-Infinity?pts[i+1]-1:pts[i+1]===Infinity?pts[i]+1:(pts[i]+pts[i+1])/2;const y=0.2*(m-V.p)*(m-V.q)*(m-V.r);iv.push(`<span class="${y>0?'good':'bad'}">(${pts[i]===-Infinity?'−∞':fmtNeg(pts[i])}, ${pts[i+1]===Infinity?'∞':fmtNeg(pts[i+1])}) ${y>0?'+':'−'}</span>`);}
  return `Sign chart: ${iv.join(' &nbsp; ')}<br><span class="mute">Green = graph above the x-axis (p(x) &gt; 0); red = below. The sign can only change at a zero, so test <b>one</b> x in each interval.</span>`;}});}
function mountEnd(el){graphLab(el,{g:{x0:-3,x1:3,y0:-8,y1:8,u:70,uy:17,lab:1,laby:2},params:[{k:'n',l:'degree n',min:1,max:6,v:3},{k:'s',l:'leading coef sign',min:-1,max:1,step:2,v:1,f:v=>v>0?'+':'−'}],
 curves:V=>[{f:x=>V.s*(x**V.n-1.8*x**(V.n-1)+(V.n>2?-1.5*x**(V.n-2):0)+0.8)}],eq:V=>`y = ${V.s<0?'−':''}x${sup(V.n>1?V.n:'')} + (lower-degree terms)`,
 extra:(G,V)=>{const up=V.s>0,ev=V.n%2===0;const L=ev?up:!up,R=up;const ar=(x,u)=>`<text x="${G.X(x)}" y="${G.Y(u?7:-7)}" text-anchor="middle" font-size="30" fill="#e11d48">${u?'↑':'↓'}</text>`;return ar(-2.7,L)+ar(2.7,R);},
 read:V=>{const ev=V.n%2===0,up=V.s>0;return `Degree ${V.n} (<b>${ev?'even':'odd'}</b>), leading coefficient <b>${up?'positive':'negative'}</b>:<br>as x → −∞, y → <b>${(ev?up:!up)?'+∞':'−∞'}</b>; &nbsp; as x → +∞, y → <b>${up?'+∞':'−∞'}</b>.<br><span class="mute">${ev?'Even degree: both ends point the same way (like x²).':'Odd degree: the ends point opposite ways (like x³).'} Far from 0 only the leading term matters.</span>`;}});}
const MATCH=[{e:'y = (x + 2)(x − 1)(x − 3)',f:x=>(x+2)*(x-1)*(x-3)/2,why:'Cubic, a > 0: falls left, rises right; zeros −2, 1, 3.'},{e:'y = −(x + 2)(x − 1)(x − 3)',f:x=>-(x+2)*(x-1)*(x-3)/2,why:'a < 0 flips it: rises left, falls right.'},{e:'y = (x + 2)²(x − 3)',f:x=>(x+2)**2*(x-3)/4,why:'Bounces at −2 (double zero), crosses at 3.'},{e:'y = x²(x − 1)(x + 3)',f:x=>x*x*(x-1)*(x+3)/3,why:'Even degree, a > 0: both ends up; bounces at 0.'}];
function mountMatch(el){let k=rand(0,3);const draw=()=>{const G=grid({x0:-5,x1:5,y0:-8,y1:8,u:34,uy:15,lab:1,laby:2});el.innerHTML=`<p style="margin:0">Which equation matches this graph?</p>${G.svg(curve(G,MATCH[k].f))}<div class="row">${MATCH.map((m,i)=>`<button class="opt" data-m="${i}" style="width:auto">${m.e}</button>`).join('')}</div><div class="readout mt-r">Look at the zeros, bounce vs. cross, and the end behavior.</div><div class="row"><button data-new="1">New graph ↻</button></div>`;};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.new){k=(k+rand(1,3))%4;draw();return;}const i=+b.dataset.m;$('.mt-r',el).innerHTML=i===k?`<span class="good">✓ Correct.</span> ${MATCH[k].why}`:`<span class="bad">✗ Not this one.</span> Check the zeros and the ends again.`;b.classList.add(i===k?'right':'wrong');});draw();}

L['A2-5-1']={goal:'I can find the zeros of a polynomial from its factored form and describe multiplicity.',
 life:{title:'Where the coaster touches the ground',html:'If a track’s height is h(x) = 0.25(x + 3)(x − 1)(x − 4), the track touches ground level where h = 0. A product is 0 only when <b>one of its factors</b> is 0 — so the zeros are x = −3, 1, 4. No guessing needed.'},
 see:[{title:'Zeros from factors',hint:'Move the zeros. Change the multiplicity of r₁.',mount:mountZeros}],
 vocab:[['Zero (root)','An x-value where p(x) = 0; an x-intercept.'],['Zero-product property','If ab = 0, then a = 0 or b = 0.'],['Multiplicity','How many times a factor repeats. Odd → crosses; even → bounces.']],
 examples:[ex('Example 1','Zeros of p(x) = 2x(x − 5)(x + 1)',[['2x = 0 → x = 0','First factor.'],['x − 5 = 0 → x = 5; x + 1 = 0 → x = −1','Other factors.'],['zeros: −1, 0, 5','']]),
  ex('Example 2','Describe p(x) = (x − 2)²(x + 4)',[['x = 2, multiplicity 2 → bounces','Even.'],['x = −4, multiplicity 1 → crosses','Odd.']])],
 mistake:{bad:'(x + 3) gives the zero x = 3',good:'x = −3',why:'Solve x + 3 = 0. The zero has the <b>opposite</b> sign of the number in the factor.'},
 practice(){const r=[nz(-6,6),nz(-6,6),rand(-6,6)];if(Math.random()<.5){const s=[...r].sort((a,b)=>a-b);return num(`Find the zeros of <b>p(x) = ${fact(pick([1,2,-1,3]),r)}</b> from least to greatest (repeat a zero if it appears twice).`,[['smallest =',s[0]],['middle =',s[1]],['largest =',s[2]]],'Set each factor equal to 0.',[[s.join(', '),'Opposite signs of the numbers in the factors.']]);}
  const z=nz(-5,5),m=rand(1,3);return mc(`p(x) = (x ${z<0?'+':'−'} ${Math.abs(z)})${sup(m>1?m:'')}(x − 7). At x = ${z} the graph…`,m%2?'crosses the x-axis':'touches and bounces off the x-axis',['crosses the x-axis','touches and bounces off the x-axis','does not touch the x-axis','has a vertical asymptote'],`Multiplicity ${m} is ${m%2?'odd → crosses':'even → bounces'}.`);},
 check:[q('Zeros of x(x + 2)(x − 7)?',['0, 2, −7','0, −2, 7','2, −7','−2, 7'],1,'Opposite signs.'),q('(x − 1)⁴ at x = 1…',['crosses','bounces','has no zero','is undefined'],1,'Even multiplicity.'),q('Degree of (x − 1)²(x + 3)?',['2','3','1','4'],1,'2 + 1.')]};

L['A2-5-2']={goal:'I can find where a polynomial is positive or negative using its zeros.',
 life:{title:'Profit or loss?',html:'A company’s profit model p(x) = 0.2(x + 4)x(x − 3) is <b>positive</b> on some intervals and <b>negative</b> on others. The zeros are the only places the sign can switch, so a quick test in each interval tells you where you make money.'},
 see:[{title:'Sign chart',hint:'Move the zeros. Green = positive, red = negative.',mount:mountSign}],
 vocab:[['Positive interval','Where p(x) > 0 (graph above the x-axis).'],['Negative interval','Where p(x) < 0 (graph below).'],['Test point','Any x inside an interval; its sign is the sign of the whole interval.']],
 examples:[ex('Example 1','Where is p(x) = (x + 2)(x − 3) negative?',[['zeros −2, 3 split the line into 3 intervals',''],['test x = 0: (2)(−3) = −6 < 0','Middle interval negative.'],['p(x) < 0 on (−2, 3)','']]),
  ex('Example 2','Sign of p(x) = −x(x − 4) for x > 4',[['test x = 5: −5(1) = −5','Negative.'],['p(x) < 0 on (4, ∞)','']])],
 mistake:{bad:'Signs always alternate +, −, +',good:'They alternate only across odd-multiplicity zeros',why:'At a double zero the graph bounces, so the sign <b>stays the same</b>.'},
 practice(){let r=[rand(-6,6),rand(-6,6),rand(-6,6)];while(new Set(r).size<3)r=[rand(-6,6),rand(-6,6),rand(-6,6)];const a=pick([1,-1,2,-2]);const s=[...r].sort((x,y)=>x-y);const i=rand(0,3);const tx=i===0?s[0]-1:i===3?s[2]+1:(s[i-1]+s[i])/2;const v=a*(tx-r[0])*(tx-r[1])*(tx-r[2]);
  const F=fmtNeg,lab=i===0?`x &lt; ${F(s[0])}`:i===3?`x &gt; ${F(s[2])}`:`${F(s[i-1])} &lt; x &lt; ${F(s[i])}`;return mc(`p(x) = ${fact(a,r)}. On the interval <b>${lab}</b>, p(x) is…`,v>0?'positive':'negative',['positive','negative','zero everywhere','cannot tell'],`Test x = ${nf(tx)}: p(${nf(tx)}) = ${nf(v)}.`);},
 check:[q('p(x) = (x − 1)(x − 5). Sign on (1, 5)?',['positive','negative','zero','changes'],1,'Test x = 3: (2)(−2).'),q('Where can a polynomial change sign?',['anywhere','only at its zeros','at its maximum','at x = 0'],1,'Continuous graph.'),q('p(x) = x²(x − 2). Sign on (−1, 0)?',['positive','negative','zero','undefined'],1,'x² > 0, x − 2 < 0.')]};

L['A2-5-3']={goal:'I can describe the end behavior of a polynomial from its degree and leading coefficient.',
 life:{title:'The long run',html:'Zoom far out on any polynomial graph and the wiggles disappear — only the <b>leading term</b> matters. Economists use this idea: for very large x, 0.01x³ beats 500x² eventually. End behavior tells you what happens “in the long run.”'},
 see:[{title:'Even vs. odd, positive vs. negative',hint:'Change the degree and the sign of the leading coefficient.',mount:mountEnd}],
 vocab:[['End behavior','What y does as x → ±∞.'],['Even degree','Both ends the same direction.'],['Odd degree','Ends in opposite directions.'],['Leading coefficient','Positive → right end up; negative → right end down.']],
 examples:[ex('Example 1','End behavior of p(x) = −3x⁴ + 10x³ − 2',[['even degree, negative leading coefficient',''],['x → ±∞: y → −∞','Both ends down.']]),
  ex('Example 2','End behavior of p(x) = 2x⁵ − 7x²',[['odd, positive',''],['x → −∞: y → −∞; x → ∞: y → ∞','Down left, up right.']])],
 mistake:{bad:'p(x) = 5 + 2x − x³ has positive leading coefficient 5',good:'leading coefficient −1',why:'The leading term is the one with the <b>highest power</b>: −x³.'},
 practice(){const n=rand(2,7),s=pick([1,-1]),k=s*rand(1,6);const co=[k,rand(-9,9),rand(-9,9)];const ev=n%2===0,up=k>0;const L=(ev?up:!up)?'up':'down',R=up?'up':'down';
  const arr=Array(n+1).fill(0);arr[0]=k;arr[2]=rand(-9,9);arr[n]=nz(-9,9);const opts=['up, up','down, down','down, up','up, down'];return mc(`p(x) = ${ps(arr)}. Left end, right end?`,`${L}, ${R}`,opts,`Degree ${n} (${ev?'even':'odd'}), leading coefficient ${k} (${up?'+':'−'}).`);},
 check:[q('y = x⁶ − 100x: ends?',['up, up','down, down','down, up','up, down'],0,'Even, positive.'),q('y = −x³ + x: as x → ∞, y → …',['∞','−∞','0','1'],1,'Odd, negative.'),q('Which graph has ends in opposite directions?',['x⁴','−2x²','x⁵ − x','−x⁸'],2,'Odd degree.')]};

L['A2-5-4']={goal:'I can sketch or match a polynomial graph using zeros, multiplicity, signs, and end behavior.',
 life:{title:'Reading the whole story',html:'Engineers sketch a polynomial before they graph it precisely: <b>end behavior</b> gives the frame, <b>zeros</b> give the x-intercepts, <b>multiplicity</b> says cross or bounce, and the <b>y-intercept</b> anchors the middle.'},
 see:[{title:'Match the graph',hint:'Pick the equation. Use zeros and ends.',mount:mountMatch}],
 vocab:[['y-intercept','p(0), the constant term.'],['Turning points','At most n − 1 for degree n.'],['Sketch checklist','Ends → zeros → cross/bounce → y-intercept.']],
 examples:[ex('Example','Sketch p(x) = −(x + 1)²(x − 2)',[['degree 3, a < 0 → up left, down right','Ends.'],['zeros −1 (bounce), 2 (cross)','Multiplicity.'],['p(0) = −(1)(−2) = 2','y-intercept (0, 2).']])],
 mistake:{bad:'A degree-4 graph can have 5 turning points',good:'at most 3',why:'Degree n → at most <b>n − 1</b> turning points.'},
 practice(){const r=[nz(-4,4),nz(-4,4),nz(-4,4)],a=pick([1,-1,2]);return num(`For <b>p(x) = ${fact(a,r)}</b>, find the y-intercept p(0) and the degree.`,[['p(0) =',a*(-r[0])*(-r[1])*(-r[2])],['degree =',3]],'Plug in x = 0. Count the x factors.',[[`p(0) = ${nf(a)}(${fmtNeg(-r[0])})(${fmtNeg(-r[1])})(${fmtNeg(-r[2])})`,'Substitute 0.'],[`= ${a*(-r[0])*(-r[1])*(-r[2])}`,'Multiply.']]);},
 check:[q('Max number of x-intercepts of a degree-5 polynomial?',['4','5','6','10'],1,'At most n.'),q('y-intercept of (x − 2)(x + 3)?',['−6','6','−1','1'],0,'(−2)(3).'),q('A cubic with a > 0 starts…',['up on the left','down on the left','flat','at 0'],1,'Odd, positive.')]};

TOOLS['A2-5']={title:'Zeros, multiplicity, and shape',hint:'Move the zeros and the multiplicity to reshape the graph.',mount:mountZeros};
})();
