/* Khan Algebra 2 · Unit 10 · Equations */
(function(){const {graphLab,chooser,sliders,ex,q,mc,num,nz,curve,TOOLS,nf,vline,hline,hole,stepper,fr}=A2;
const cbrt=x=>Math.sign(x)*Math.abs(x)**(1/3);
/* find intersections of f and g numerically on [a,b] */
function roots(h,a,b,st=0.01){const r=[];let px=a,pv=h(a);for(let x=a+st;x<=b;x+=st){const v=h(x);if(isFinite(v)&&isFinite(pv)){if(v===0)r.push(x);else if(pv*v<0&&Math.abs(v-pv)<5){let lo=px,hi=x;for(let i=0;i<40;i++){const m=(lo+hi)/2;if(h(lo)*h(m)<=0)hi=m;else lo=m;}r.push((lo+hi)/2);}}px=x;pv=v;}return r.filter((x,i,A)=>!i||Math.abs(x-A[i-1])>0.02);}
function mRational(el){graphLab(el,{g:{x0:-6,x1:8,y0:-8,y1:8,u:28,lab:1,laby:2},params:[{k:'c',l:'numerator c in c/(x − 2)',min:1,max:8,v:3}],
 curves:V=>[{f:x=>Math.abs(x-2)<1e-6?NaN:V.c/(x-2),col:'#2563eb'},{f:x=>Math.abs(x)<1e-6?NaN:6/x,col:'#f59e0b'}],
 extra:(G,V)=>{let s=vline(G,2,'#2563eb','3 4')+vline(G,0,'#f59e0b','3 4');const h=x=>V.c/(x-2)-6/x;roots(h,-6,8).forEach(x=>{if(Math.abs(x-2)>0.05&&Math.abs(x)>0.05)s+=gdot(G,x,6/x,'#e11d48',7,'x = '+nf(x));});return s;},
 eq:V=>`${V.c}/(x − 2) = 6/x`,read:V=>{const ok=V.c!==6;const x=ok?12/(6-V.c):NaN;return `Cross-multiply: ${V.c}x = 6(x − 2) → ${V.c}x = 6x − 12 → ${ok?`x = <b>${nf(x)}</b>.`:'0 = −12: <b>no solution</b> (the curves are parallel shifts).'} ${ok&&(x===0||x===2)?'<span class="bad">But that makes a denominator 0 — reject it!</span>':''}<br><span class="mute">Excluded values: x ≠ 2 and x ≠ 0 (dashed lines). Check every answer against them.</span>`;}});}
function mSqrt(el){graphLab(el,{g:{x0:-4,x1:10,y0:-4,y1:8,u:28,lab:1,laby:2},params:[{k:'m',l:'right side: x − m, m =',min:-2,max:6,v:3}],
 curves:V=>[{f:x=>x<-3?NaN:Math.sqrt(x+3),col:'#2563eb'},{f:x=>x-V.m,col:'#f59e0b'},{f:x=>x<-3?NaN:-Math.sqrt(x+3),col:'#94a3b8',w:2,dash:'5 4'}],
 extra:(G,V)=>{const m=V.m,A=1,B=-(2*m+1),C=m*m-3,D=B*B-4*A*C;let s='';if(D>=0)[(-B-Math.sqrt(D))/2,(-B+Math.sqrt(D))/2].forEach(x=>{const ok=x-m>=-1e-9;s+=ok?gdot(G,x,x-m,'#059669',8,'✓ x = '+nf(x)):`<circle cx="${G.X(x)}" cy="${G.Y(x-m)}" r="8" fill="#fff" stroke="#e11d48" stroke-width="3"/><text x="${G.X(x)+10}" y="${G.Y(x-m)+18}" font-size="12" font-weight="800" fill="#e11d48">✗ x = ${nf(x)}</text>`;});return s;},
 eq:V=>`√(x + 3) = x ${V.m<0?'+':'−'} ${Math.abs(V.m)}`,read:V=>{const m=V.m,B=-(2*m+1),C=m*m-3,D=B*B-4*C;return `Square both sides: x + 3 = (x ${m<0?'+':'−'} ${Math.abs(m)})² → x² ${B<0?'−':'+'} ${Math.abs(B)}x ${C<0?'−':'+'} ${Math.abs(C)} = 0.<br>${D<0?'No real solutions.':`Candidates: x = ${nf((-B-Math.sqrt(D))/2)}, ${nf((-B+Math.sqrt(D))/2)}. Only the green one is on the blue curve. The red ✗ lies on the <b>dashed</b> curve −√(x + 3): squaring can’t tell √ and −√ apart.`}`;}});}
function mExtr(el){chooser(el,[{t:'√x = x − 2',html:()=>{const G=grid({x0:-1,x1:7,y0:-3,y1:5,u:40,lab:1});return G.svg(curve(G,x=>x<0?NaN:Math.sqrt(x))+curve(G,x=>x-2,'#f59e0b')+gdot(G,4,2,'#059669',8,'x = 4 ✓')+hole(G,1,-1,'#e11d48'))+`<div class="readout">Square: x = x² − 4x + 4 → x² − 5x + 4 = 0 → x = 1 or 4.<br>Check x = 1: √1 = 1 but 1 − 2 = −1 ✗ (<b>extraneous</b>). Check x = 4: √4 = 2 = 4 − 2 ✓.</div>`;}},
 {t:'x/(x − 1) = 1/(x − 1)',html:()=>{const G=grid({x0:-3,x1:5,y0:-5,y1:5,u:40,lab:1});return G.svg(curve(G,x=>Math.abs(x-1)<1e-6?NaN:x/(x-1))+curve(G,x=>Math.abs(x-1)<1e-6?NaN:1/(x-1),'#f59e0b')+vline(G,1))+`<div class="readout">Multiply by (x − 1): x = 1. But x = 1 makes the denominator 0 → <b>extraneous</b>. No solution — the curves never meet.</div>`;}},
 {t:'Why does squaring add solutions?',html:`<div class="readout">If a = b then a² = b². But a² = b² also when a = −b. Example: x = 3 has one solution; x² = 9 has two (3 and −3). Squaring <b>merges</b> the equation with its “negative twin,” so every answer must be checked in the original.</div>`}]);}
function mCube(el){graphLab(el,{g:{x0:-10,x1:30,y0:-4,y1:5,u:12,uy:36,lab:5,laby:1},params:[{k:'c',l:'∛(x − 2) = c, c =',min:-3,max:3,v:2}],
 curves:()=>[{f:x=>cbrt(x-2)}],extra:(G,V)=>hline(G,V.c,'#f59e0b')+(V.c**3+2<=30&&V.c**3+2>=-10?gdot(G,V.c**3+2,V.c,'#e11d48',7,'x = '+(V.c**3+2)):''),
 eq:V=>`∛(x − 2) = ${V.c}`,read:V=>`Cube both sides: x − 2 = ${V.c}³ = ${V.c**3} → x = <b>${V.c**3+2}</b>.<br><span class="mute">Cubing never creates extraneous solutions — a cube root can be negative, so every c gives exactly one answer.</span>`});}
function mSystem(el){graphLab(el,{g:{x0:-5,x1:5,y0:-3,y1:10,u:36,uy:24,lab:1,laby:2},params:[{k:'m',l:'line slope m',min:-4,max:4,v:1},{k:'b',l:'line intercept b',min:-3,max:6,v:2}],
 curves:V=>[{f:x=>x*x},{f:x=>V.m*x+V.b,col:'#f59e0b'}],extra:(G,V)=>{const D=V.m*V.m+4*V.b;if(D<0)return '';return [...new Set([(V.m-Math.sqrt(D))/2,(V.m+Math.sqrt(D))/2])].map(x=>gdot(G,x,x*x,'#e11d48',7,`(${nf(x)}, ${nf(x*x)})`)).join('');},
 eq:V=>`y = x² &nbsp; and &nbsp; y = ${A2.ps([V.m,V.b])}`,read:V=>{const D=V.m*V.m+4*V.b;return `Substitute: x² = ${A2.ps([V.m,V.b])} → x² ${V.m?(V.m>0?'−':'+')+' '+(Math.abs(V.m)===1?'':Math.abs(V.m))+'x':''} ${V.b>0?'−':'+'} ${Math.abs(V.b)} = 0. Discriminant ${D}: <b>${D>0?'2 solutions':D===0?'1 solution (the line is tangent)':'no real solutions'}</b>.`;}});}
const EQS=[{t:'2ˣ = x + 3',f:x=>2**x,g:x=>x+3},{t:'x³ − 2x = 1',f:x=>x**3-2*x,g:()=>1},{t:'√x = 4 − x',f:x=>x<0?NaN:Math.sqrt(x),g:x=>4-x},{t:'log₂x = x − 2',f:x=>x<=0?NaN:Math.log2(x),g:x=>x-2},{t:'|x − 1| = ½x + 1',f:x=>Math.abs(x-1),g:x=>x/2+1}];
function mGraph(el){chooser(el,EQS.map(E=>({t:E.t,html:()=>{const G=grid({x0:-4,x1:6,y0:-4,y1:8,u:34,uy:26,lab:1,laby:2});const r=roots(x=>E.f(x)-E.g(x),-4,6,0.005);return G.svg(curve(G,E.f)+curve(G,E.g,'#f59e0b')+r.map(x=>gdot(G,x,E.g(x),'#e11d48',7,'x ≈ '+x.toFixed(2))).join(''))+`<div class="readout">Graph y = left side (blue) and y = right side (orange). The x-coordinates of the crossings are the solutions: <b>${r.map(x=>'x ≈ '+x.toFixed(3)).join(', ')||'none'}</b>.<br><span class="mute">Works for equations no algebra rule can solve exactly.</span></div>`;}})));}

L['A2-10-1']={goal:'I can solve rational equations and reject values that make a denominator zero.',
 life:{title:'Working together',html:'Ana paints a room in 3 hours, Ben in 6. Together they paint 1/3 + 1/6 of the room per hour, so they finish in t hours where <b>t/3 + t/6 = 1</b> → t = 2. Rates with variables in the denominator lead to rational equations.'},
 see:[{title:'Two curves, one intersection',hint:'Change c. Watch for “no solution.”',mount:mRational}],
 vocab:[['Rational equation','An equation with a variable in a denominator.'],['LCD','Multiply both sides by the least common denominator to clear fractions.'],['Excluded value','Any x that makes a denominator 0 — never a solution.']],
 examples:[ex('Example 1','Solve 4/x + 1 = 3',[['4/x = 2','Isolate.'],['4 = 2x → x = 2','Multiply by x.'],['x ≠ 0 ✓','Check excluded values.']]),
  ex('Example 2','Solve x/(x − 3) = 3/(x − 3) + 2',[['x = 3 + 2(x − 3)','Multiply by x − 3.'],['x = 2x − 3 → x = 3','Solve.'],['x = 3 is excluded → no solution','Extraneous.']])],
 mistake:{bad:'Forget to check the denominator',good:'list excluded values first',why:'Multiplying by an expression that can be 0 can create fake solutions.'},
 practice(){let a,b,c;do{a=rand(1,9);b=rand(1,6);c=rand(-4,4);}while(a===b||c===0);// a/(x - c) = b/x → ax = b(x - c) → x = -bc/(a-b)
  const x=-b*c/(a-b);return num(`Solve <b>${a}/(x ${c<0?'+':'−'} ${Math.abs(c)}) = ${b}/x</b>.`,[['x =',x,0.011]],'Cross-multiply.',[[`${a}x = ${b}(x ${c<0?'+':'−'} ${Math.abs(c)})`,'Cross-multiply.'],[`${a-b}x = ${-b*c} → x = ${fr(-b*c,a-b)}`,'Solve.'],[`x ≠ ${c}, x ≠ 0 ✓`,'Check.']]);},
 check:[q('Excluded values of 1/(x + 5)?',['x = 5','x = −5','x = 0','none'],1,''),q('Solve 6/x = 3',['2','18','1/2','3'],0,''),q('A solution that fails the original equation is…',['imaginary','extraneous','irrational','excluded'],1,'')]};

L['A2-10-2']={goal:'I can solve square-root equations by isolating the radical and squaring.',
 life:{title:'Pendulum length',html:'A pendulum’s swing time is T = 2π√(L/9.8). To find the length that gives a 2-second swing you must <b>undo a square root</b>: isolate it and square both sides.'},
 see:[{title:'√(x + 3) = x − m',hint:'Change m. Green = real solution, red = extraneous.',mount:mSqrt}],
 vocab:[['Isolate the radical','Get √(…) alone on one side first.'],['Square both sides','Removes the square root.'],['Check','Substitute every answer into the original.']],
 examples:[ex('Example 1','Solve √(2x + 1) − 3 = 0',[['√(2x + 1) = 3','Isolate.'],['2x + 1 = 9 → x = 4','Square.'],['√9 − 3 = 0 ✓','Check.']]),
  ex('Example 2','Solve √(x + 3) = x − 3',[['x + 3 = x² − 6x + 9','Square.'],['x² − 7x + 6 = 0 → x = 1 or 6',''],['x = 1: √4 = 2 ≠ −2 ✗; x = 6: 3 = 3 ✓','Only x = 6.']])],
 mistake:{bad:'√x + 2 = 5 → x + 4 = 25',good:'√x = 3 → x = 9',why:'Isolate the radical <b>before</b> squaring; (√x + 2)² is not x + 4.'},
 practice(){const k=rand(1,8),a=rand(1,4),b=rand(-9,9);// √(a x + b) = k → x = (k² − b)/a
  const x=(k*k-b)/a;return num(`Solve <b>√(${a===1?'':a}x ${b<0?'−':'+'} ${Math.abs(b)}) = ${k}</b>.`,[['x =',x,0.011]],'Square both sides.',[[`${a===1?'':a}x ${b<0?'−':'+'} ${Math.abs(b)} = ${k*k}`,'Square.'],[`x = ${fr(k*k-b,a)}`,'Solve.']]);},
 check:[q('Solve √x = 7',['49','√7','14','7'],0,''),q('√x = −2 has…',['x = 4','x = −4','no solution','x = 2'],2,'√ is never negative.'),q('First step for √(x − 1) + 4 = 9?',['square','subtract 4','add 1','divide by 4'],1,'Isolate.')]};

L['A2-10-3']={goal:'I can explain why extraneous solutions appear and identify them.',
 life:{title:'A fake answer',html:'You solve an equation correctly, step by step, and still get a “solution” that doesn’t work. Not a mistake — some steps, like <b>squaring</b> or <b>multiplying by an expression that can be 0</b>, change the equation’s solution set. Checking catches the fakes.'},
 see:[{title:'Where fake solutions come from',hint:'Click each case.',mount:mExtr}],
 vocab:[['Extraneous solution','A result of the solving process that does not satisfy the original equation.'],['Non-reversible step','Squaring, or multiplying by a variable expression.'],['Check','Plug into the original — not a later step.']],
 examples:[ex('Example','Solve x = √(x + 2)',[['x² = x + 2 → x² − x − 2 = 0','Square.'],['x = 2 or x = −1',''],['x = −1: −1 ≠ √1 = 1 ✗','Extraneous.'],['x = 2 ✓','']])],
 mistake:{bad:'Check in the squared equation',good:'Check in the original',why:'The squared equation contains the fake solution — that’s where it came from.'},
 practice(){const s=rand(1,6),t=rand(1,6);// x = √(ax + b) with roots s and −t: x² − (s − t)x − st = 0 → a = s − t, b = st
  const a=s-t,b=s*t;return num(`Solve <b>x = √(${a?(a===1?'':a===-1?'−':a)+'x + ':''}${b})</b>. Squaring gives two candidates. Enter the valid solution and the extraneous one.`,[['valid x =',s],['extraneous x =',-t]],'Square, solve the quadratic, check signs (x must be ≥ 0).',[[`x² = ${a?A2.ps([a,0])+' + ':''}${b} → (x − ${s})(x + ${t}) = 0`,'Square and factor.'],[`x = ${s} ✓; x = ${-t} ✗ (√ can’t be negative)`,'Check.']]);},
 check:[q('Which step can create extraneous solutions?',['adding 3','squaring both sides','dividing by 2','subtracting x'],1,''),q('√x = x − 6 → x = 4 or 9. Which is extraneous?',['4','9','both','neither'],0,'√4 = 2 ≠ −2.'),q('Extraneous solutions must be checked in…',['the final step','the original equation','the graph only','the squared equation'],1,'')]};

L['A2-10-4']={goal:'I can solve cube-root equations by cubing both sides.',
 life:{title:'Size of a cube',html:'A cube-shaped tank holds V cubic feet; its side is ∛V. If you need side length 3 ft and the side formula is ∛(V − 2), cube both sides: V − 2 = 27 → V = 29. Cube roots can be negative, so no extraneous worries.'},
 see:[{title:'∛(x − 2) = c',hint:'Change c — even negative values work.',mount:mCube}],
 vocab:[['Cube root','∛a = b means b³ = a.'],['Cube both sides','(∛A)³ = A.'],['Negative OK','∛(−8) = −2.']],
 examples:[ex('Example 1','Solve ∛(2x − 1) = 3',[['2x − 1 = 27','Cube.'],['x = 14','']]),
  ex('Example 2','Solve ∛(x + 5) + 4 = 1',[['∛(x + 5) = −3','Isolate.'],['x + 5 = −27 → x = −32','Cube.']])],
 mistake:{bad:'∛(x) = −2 has no solution',good:'x = −8',why:'Unlike square roots, cube roots can be negative.'},
 practice(){const c=nz(-4,4),a=rand(1,3),b=rand(-9,9);const x=(c**3-b)/a;return num(`Solve <b>∛(${a===1?'':a}x ${b<0?'−':'+'} ${Math.abs(b)}) = ${c}</b>.`,[['x =',x,0.011]],'Cube both sides.',[[`${a===1?'':a}x ${b<0?'−':'+'} ${Math.abs(b)} = ${c**3}`,'Cube.'],[`x = ${fr(c**3-b,a)}`,'Solve.']]);},
 check:[q('Solve ∛x = 4',['12','64','16','2'],1,''),q('Solve ∛x = −1',['−1','1','no solution','−3'],0,''),q('Cubing both sides can create extraneous solutions?',['always','usually','no','only with negatives'],2,'Cubing is reversible.')]};

L['A2-10-5']={goal:'I can solve a system of a linear and a quadratic equation, and tell how many solutions it has.',
 life:{title:'Will the ball hit the ramp?',html:'A ball follows y = x², a ramp follows a straight line. Do they meet? A line can cross a parabola <b>twice</b>, touch it <b>once</b>, or <b>miss</b> it. Substitution turns the question into one quadratic equation.'},
 see:[{title:'Line meets parabola',hint:'Change the slope and intercept. Find a tangent line.',mount:mSystem}],
 vocab:[['Substitution','Replace y in one equation with the other expression.'],['Tangent','A line touching the parabola at exactly one point.'],['Discriminant','Decides 0, 1, or 2 solutions.']],
 examples:[ex('Example 1','Solve y = x² − 1, y = x + 1',[['x² − 1 = x + 1 → x² − x − 2 = 0','Substitute.'],['x = 2 or −1','Factor.'],['(2, 3) and (−1, 0)','Find y.']]),
  ex('Example 2','How many solutions: y = x², y = 2x − 1?',[['x² − 2x + 1 = 0 → (x − 1)² = 0','One solution: tangent at (1, 1).']])],
 mistake:{bad:'Found x = 2, done',good:'find y too: (2, 3)',why:'A solution to a system is an <b>ordered pair</b>.'},
 practice(){let r1,r2;do{r1=rand(-4,4);r2=rand(-4,4);}while(r1>=r2);// x² = mx + b with roots r1,r2: m = r1 + r2, b = −r1r2
  const m=r1+r2,b=-r1*r2;return num(`Solve the system <b>y = x²</b> and <b>y = ${A2.ps([m,b])}</b>. Enter both x-values (smaller first).`,[['x₁ =',r1],['x₂ =',r2]],'Set x² equal to the line, move everything to one side, factor.',[[`x² ${m?(m>0?'−':'+')+' '+A2.ps([Math.abs(m),0]):''} ${b>0?'−':'+'} ${Math.abs(b)} = 0`,'Substitute.'],[`(x − ${P(r1)})(x − ${P(r2)}) = 0`,'Factor.'],[`(${r1}, ${r1*r1}), (${r2}, ${r2*r2})`,'Points.']]);},
 check:[q('Max number of intersections of a line and a parabola?',['1','2','3','4'],1,''),q('Line and parabola touch once → discriminant is…',['positive','zero','negative','undefined'],1,''),q('y = x² and y = −1 have…',['2 solutions','1 solution','no solution','infinitely many'],2,'x² ≥ 0.')]};

L['A2-10-6']={goal:'I can solve f(x) = g(x) by graphing both sides and reading the intersections.',
 life:{title:'When algebra gets stuck',html:'2ˣ = x + 3 mixes an exponential and a line — no algebra rule isolates x. Graph <b>y = 2ˣ</b> and <b>y = x + 3</b>; where they cross, the two sides are equal. Graphing calculators and spreadsheets solve real models this way.'},
 see:[{title:'Graph both sides',hint:'Pick an equation. Read the x-coordinates of the crossings.',mount:mGraph}],
 vocab:[['f(x) = g(x)','True exactly where the graphs intersect.'],['Approximate solution','Read from a graph or table to the needed precision.'],['Number of solutions','Number of intersection points.']],
 examples:[ex('Example','Solve x³ − 2x = 1 graphically.',[['graph y = x³ − 2x and y = 1',''],['crossings near x ≈ −1, −0.618, 1.618','Three solutions.'],['check x = −1: −1 + 2 = 1 ✓','Exact!']])],
 mistake:{bad:'Read the y-value of the intersection as the solution',good:'read the x-value',why:'We solved for x; y is just the common value of both sides.'},
 practice(){const E=pick([{t:'2ˣ = 8',a:3},{t:'√x = 3',a:9},{t:'log₂x = 4',a:16},{t:'x³ = −27',a:-3},{t:'3ˣ = 1/9',a:-2}]);return num(`Graphs of y = left side and y = right side of <b>${E.t}</b> cross at one point. What is its x-coordinate?`,[['x =',E.a]],'Think: which x makes both sides equal?',[[`x = ${E.a}`,'Check by substitution.']]);},
 check:[q('Solutions of f(x) = g(x) are…',['y-intercepts','x-coordinates of intersections','zeros of f','the vertex'],1,''),q('Graphs never cross → the equation has…',['one solution','no real solution','infinitely many','two'],1,''),q('To solve eˣ = 5 − x graphically, graph…',['y = eˣ and y = 5 − x','y = eˣ only','y = 5 − x only','y = x'],0,'')]};

TOOLS['A2-10']={title:'Square-root equations and extraneous solutions',hint:'Change the line. Green = valid, red = extraneous.',mount:mSqrt};
})();
