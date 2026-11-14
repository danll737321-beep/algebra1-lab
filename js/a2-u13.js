/* Algebra 2 · Unit 13 · Modeling */
(function(){const {sliders,graphLab,chooser,ex,q,mc,num,nz,curve,TOOLS,nf,hline,vline,stepper,fr}=A2;
function mCombo(el){graphLab(el,{g:{x0:0,x1:100,y0:-500,y1:2500,u:4.4,uy:0.11,lab:20,laby:500,gs:10,gsy:250,xl:'items sold x',yl:'dollars'},params:[{k:'p',l:'price per item $',min:10,max:40,v:25},{k:'F',l:'fixed cost $',min:0,max:1000,step:50,v:600},{k:'v',l:'cost per item $',min:2,max:20,v:10}],
 curves:V=>[{f:x=>V.p*x,col:'#059669'},{f:x=>V.F+V.v*x,col:'#e11d48'},{f:x=>V.p*x-V.F-V.v*x,col:'#2563eb',w:4}],
 extra:(G,V)=>{const be=V.F/(V.p-V.v);return V.p>V.v&&be<=100?gdot(G,be,0,'#1f2937',7,'break-even x ≈ '+nf(be)):'';},
 eq:V=>`<span style="color:#059669">R(x) = ${V.p}x</span> &nbsp; <span style="color:#e11d48">C(x) = ${V.F} + ${V.v}x</span> &nbsp; <span style="color:#2563eb">P(x) = R(x) − C(x) = ${V.p-V.v}x − ${V.F}</span>`,
 read:V=>V.p>V.v?`Profit is the <b>difference</b> of two functions. Each item adds $${V.p-V.v} of profit; you need <b>${Math.ceil(V.F/(V.p-V.v))} items</b> to cover the $${V.F} fixed cost.`:'Price ≤ cost per item: profit never becomes positive.'});}
function mFeatures(el){const h=t=>-4.9*t*t+19.6*t+2;graphLab(el,{g:{x0:0,x1:5,y0:0,y1:25,u:80,uy:14,lab:1,laby:5,gsy:5,xl:'time (s)',yl:'height (m)'},params:[{k:'t',l:'time t (s)',min:0,max:4.1,step:.1,v:1}],
 curves:()=>[{f:x=>x>4.1?NaN:h(x)}],extra:(G,V)=>gdot(G,2,h(2),'#f59e0b',7,'max (2, 21.6)')+gdot(G,0,2,'#059669',6,'start')+gdot(G,V.t,h(V.t),'#e11d48',7),
 eq:()=>'h(t) = −4.9t² + 19.6t + 2',read:V=>`At t = ${nf(V.t)} s the ball is <b>${nf(h(V.t))} m</b> high and <b>${V.t<2?'rising':V.t>2?'falling':'at the top'}</b>.<br>Features: y-intercept 2 m (launch height) · maximum 21.6 m at t = 2 s · increasing on (0, 2), decreasing after · hits the ground (zero) near t ≈ 4.10 s. Domain in context: 0 ≤ t ≤ 4.10.`});}
function mSolveFor(el){stepper(el,[{t:'A = P(1 + r)ᵗ for r',steps:[{h:'<div class="eqline math">A = P(1 + r)<sup>t</sup></div>',n:'Goal: get r alone. Undo operations in reverse order.'},{h:'<div class="eqline math">A/P = (1 + r)<sup>t</sup></div>',n:'Divide by P.'},{h:'<div class="eqline math">(A/P)<sup>1/t</sup> = 1 + r</div>',n:'Raise both sides to 1/t (undo the power).'},{h:'<div class="eqline math">r = (A/P)<sup>1/t</sup> − 1</div>',n:'Subtract 1.'}]},
 {t:'V = πr²h for r',steps:[{h:'<div class="eqline math">V = πr²h</div>',n:'r is squared and multiplied by π and h.'},{h:'<div class="eqline math">V/(πh) = r²</div>',n:'Divide by πh.'},{h:'<div class="eqline math">r = √(V/(πh))</div>',n:'Square root (r > 0 for a length).'}]},
 {t:'1/f = 1/a + 1/b for b',steps:[{h:'<div class="eqline math">1/f − 1/a = 1/b</div>',n:'Isolate the term with b.'},{h:'<div class="eqline math">(a − f)/(af) = 1/b</div>',n:'Combine the fractions.'},{h:'<div class="eqline math">b = af/(a − f)</div>',n:'Take reciprocals.'}]},
 {t:'T = 2π√(L/g) for L',steps:[{h:'<div class="eqline math">T/(2π) = √(L/g)</div>',n:'Divide by 2π.'},{h:'<div class="eqline math">T²/(4π²) = L/g</div>',n:'Square both sides.'},{h:'<div class="eqline math">L = gT²/(4π²)</div>',n:'Multiply by g.'}]}]);}
function mFence(el){graphLab(el,{g:{x0:0,x1:50,y0:0,y1:700,u:9,uy:0.5,lab:10,laby:100,gs:5,gsy:100,xl:'width w (m)',yl:'area (m²)'},params:[{k:'L',l:'fence length (m)',min:40,max:100,step:4,v:80},{k:'w',l:'width w',min:1,max:49,v:12}],
 curves:V=>[{f:w=>w>V.L/2?NaN:w*(V.L/2-w)}],extra:(G,V)=>{const ww=Math.min(V.w,V.L/2);return gdot(G,ww,ww*(V.L/2-ww),'#e11d48',7)+gdot(G,V.L/4,(V.L/4)**2,'#f59e0b',6,'max');},
 eq:V=>`A(w) = w(${V.L/2} − w)`,read:V=>{const w=Math.min(V.w,V.L/2),l=V.L/2-w;return `Perimeter 2w + 2ℓ = ${V.L} → ℓ = ${V.L/2} − w. With w = ${w}: ℓ = ${l}, area = <b>${w*l} m²</b>.<br>Two variables (w and ℓ) tied by one constraint become one function of w. The best rectangle is a <b>square</b>: w = ${V.L/4}, area ${(V.L/4)**2} m².`;}});}
function mTrip(el){sliders(el,[{k:'d',l:'distance (mi)',min:50,max:600,step:10,v:300},{k:'m',l:'mpg',min:15,max:50,v:30},{k:'p',l:'gas $/gal',min:3,max:7,step:.1,v:4.5},{k:'n',l:'people sharing',min:1,max:5,v:2}],V=>{const g=V.d/V.m,C=g*V.p;
  $('.tr-r',el).innerHTML=`<div class="eqline math">cost per person = d·p / (m·n)</div>gallons = ${V.d}/${V.m} = ${nf(g)} · total = ${nf(g)} × $${nf(V.p)} = <b>$${C.toFixed(2)}</b> · per person = <b>$${(C/V.n).toFixed(2)}</b><br><span class="mute">Cost goes <b>up</b> with distance and price (they multiply on top) and <b>down</b> with mpg and riders (they divide on the bottom). Double the distance → double the cost; double the mpg → half the cost.</span>`;},`<div class="readout tr-r"></div>`).run();}

L['A2-13-1']={goal:'I can model situations by adding, subtracting, multiplying, or composing functions.',
 life:{title:'Running a bake sale',html:'Your <b>revenue</b> is price × cookies sold. Your <b>cost</b> is a fixed booth fee plus ingredients per cookie. <b>Profit = revenue − cost</b> — a new function built from two simpler ones.'},
 see:[{title:'Revenue, cost, profit',hint:'Change the price and costs. Find the break-even point.',mount:mCombo}],
 vocab:[['(f + g)(x)','f(x) + g(x); also −, ×, ÷.'],['Composition f(g(x))','Output of g becomes input of f.'],['Break-even','Where profit = 0 (revenue = cost).']],
 examples:[ex('Example 1','R(x) = 12x, C(x) = 200 + 4x. Write P(x) and find the break-even point.',[['P(x) = 12x − (200 + 4x) = 8x − 200','Subtract the whole cost.'],['8x − 200 = 0 → x = 25','25 items.']]),
  ex('Example 2','A shirt costs c dollars. Tax: T(c) = 1.08c; coupon: D(c) = c − 5. Coupon first, then tax?',[['T(D(c)) = 1.08(c − 5)','Composition, inside first.']])],
 mistake:{bad:'P(x) = 12x − 200 + 4x',good:'12x − 200 − 4x',why:'Subtract the <b>whole</b> cost function: use parentheses.'},
 practice(){const p=rand(8,30),F=rand(2,20)*50,v=rand(2,p-2);if(Math.random()<.5){const x=rand(10,200);return num(`R(x) = ${p}x and C(x) = ${F} + ${v}x. Find the profit P(${x}).`,[[`P(${x}) =`,(p-v)*x-F]],'P = R − C.',[[`P(x) = ${p-v}x − ${F}`,'Subtract.'],[`P(${x}) = ${(p-v)*x-F}`,'Evaluate.']]);}
  const a=rand(2,5),b=rand(-5,5),x=rand(-4,4);return num(`f(x) = ${a}x ${b<0?'−':'+'} ${Math.abs(b)} and g(x) = x². Find f(g(${x})) and g(f(${x})).`,[[`f(g(${x})) =`,a*x*x+b],[`g(f(${x})) =`,(a*x+b)**2]],'Work from the inside out.',[[`g(${x}) = ${x*x}, f(${x*x}) = ${a*x*x+b}`,'f(g(x)).'],[`f(${x}) = ${a*x+b}, g(${a*x+b}) = ${(a*x+b)**2}`,'g(f(x)).']]);},
 check:[q('R(x) = 10x, C(x) = 50 + 6x. Break-even x?',['5','12.5','50','8'],1,'4x = 50.'),q('f(x) = x + 1, g(x) = 2x. f(g(3)) = ?',['7','8','6','5'],0,'g(3) = 6, f(6) = 7.'),q('Profit function = ?',['R + C','R − C','R · C','C − R'],1,'')]};

L['A2-13-2']={goal:'I can interpret key features of a function (intercepts, max/min, intervals, domain) in context.',
 life:{title:'Reading a launch',html:'A ball’s height is h(t) = −4.9t² + 19.6t + 2. Each feature of the graph <b>means something</b>: the y-intercept is the launch height, the maximum is the peak, the zero is when it lands, and the domain stops when the ball hits the ground.'},
 see:[{title:'Features of a projectile',hint:'Slide the time. Is the ball rising or falling?',mount:mFeatures}],
 vocab:[['Intercepts','Where the graph meets the axes; often start values or end times.'],['Maximum / minimum','Highest / lowest output.'],['Increasing interval','Inputs where the output goes up.'],['Domain in context','Inputs that make sense in the situation.']],
 examples:[ex('Example 1','What does h(0) = 2 mean?',[['At time 0 the ball is 2 m high','Launch height.']]),
  ex('Example 2','A car’s value V(t) = 30000(0.85)ᵗ. Is t = −3 in the domain?',[['No: t counts years since purchase, so t ≥ 0','Context limits the domain.']])],
 mistake:{bad:'The maximum of h is at t = 21.6',good:'max height 21.6 m at t = 2 s',why:'Keep inputs and outputs straight: the max is an <b>output</b> value reached at an <b>input</b>.'},
 practice(){const v=pick([9.8,14.7,19.6,24.5,29.4]),h0=rand(0,10);const tp=v/9.8,hm=-4.9*tp*tp+v*tp+h0;return num(`h(t) = −4.9t² + ${v}t + ${h0} (meters, seconds). Find the time of the maximum and the maximum height.`,[['t =',tp,0.011],['max height =',+hm.toFixed(3),0.011]],'t = −b/(2a).',[[`t = −${v}/(2·−4.9) = ${nf(tp)}`,'Vertex.'],[`h(${nf(tp)}) = ${nf(hm)} m`,'Evaluate.']]);},
 check:[q('h(t) = −5t² + 20t. When does it land (t > 0)?',['2','4','5','20'],1,'−5t(t − 4).'),q('The y-intercept of a cost function usually means…',['the fixed cost','the max profit','break-even','the rate'],0,''),q('Population P(t) increasing on (0, 5) means…',['it grew during the first 5 years','it was 5','it shrank','5 people'],0,'')]};

L['A2-13-3']={goal:'I can rearrange formulas to solve for a chosen variable.',
 life:{title:'Using a formula backwards',html:'The interest formula A = P(1 + r)ᵗ gives the final amount. But if you know you turned $1000 into $1500 in 6 years, you want the <b>rate</b>. Solving the formula for r answers that question — and every similar one.'},
 see:[{title:'Solve for the variable',hint:'Pick a formula and step through it.',mount:mSolveFor}],
 vocab:[['Literal equation','An equation with several variables.'],['Undo in reverse','Peel off the operations applied last first.'],['Inverse operations','+ ↔ −, × ↔ ÷, power ↔ root, exp ↔ log.']],
 examples:[ex('Example 1','Solve P = 2ℓ + 2w for w.',[['P − 2ℓ = 2w',''],['w = (P − 2ℓ)/2','']]),
  ex('Example 2','Solve A = Pe<sup>rt</sup> for t.',[['A/P = e<sup>rt</sup>',''],['ln(A/P) = rt → t = ln(A/P)/r','']])],
 mistake:{bad:'V = πr²h → r = V/(πh)',good:'r = √(V/(πh))',why:'r was squared; after dividing you still have r², so take the square root.'},
 practice(){const P_=rand(1,9)*1000,r=pick([0.04,0.05,0.06,0.08,0.1]),t=rand(2,10);const A=P_*(1+r)**t;return num(`Solve A = P(1 + r)ᵗ for r, then use it: $${P_} grew to $${A.toFixed(2)} in ${t} years. Find r as a percent (nearest tenth).`,[['r % =',r*100,0.06]],'r = (A/P)^(1/t) − 1.',[[`r = (${A.toFixed(2)}/${P_})<sup>1/${t}</sup> − 1`,'Formula.'],[`≈ ${nf(r)} = ${nf(r*100)}%`,'Evaluate.']]);},
 check:[q('Solve d = rt for t',['t = d − r','t = d/r','t = r/d','t = dr'],1,''),q('Solve A = πr² for r',['A/π','√(A/π)','(A/π)²','√A/π²'],1,''),q('Solve y = mx + b for x',['(y − b)/m','y/m − b','(y + b)/m','m(y − b)'],0,'')]};

L['A2-13-4']={goal:'I can write and use an equation that relates two variables in a context, including constraints.',
 life:{title:'Best garden for your fence',html:'You have 80 m of fence. Width and length can trade off, but the <b>constraint</b> 2w + 2ℓ = 80 ties them together. Substituting turns two variables into one function: A(w) = w(40 − w). Now you can find the biggest garden.'},
 see:[{title:'Fixed perimeter, changing area',hint:'Change the fence length and the width.',mount:mFence}],
 vocab:[['Constraint','An equation the variables must satisfy.'],['Substitute','Use the constraint to write one variable in terms of the other.'],['Optimize','Find the input giving the max or min output.']],
 examples:[ex('Example 1','Two numbers sum to 20. Maximize their product.',[['y = 20 − x → P = x(20 − x)','Constraint.'],['vertex x = 10 → P = 100','Both numbers 10.']]),
  ex('Example 2','Tickets: adults $12, kids $8, total $480. Write the relationship.',[['12a + 8k = 480','Two-variable equation.'],['k = 60 − 1.5a','Solve for k.']])],
 mistake:{bad:'Perimeter 80 → ℓ = 80 − w',good:'ℓ = 40 − w',why:'Two widths and two lengths: 2w + 2ℓ = 80, so w + ℓ = 40.'},
 practice(){const L_=rand(10,40)*4;const w=rand(2,L_/2-2);return num(`A rectangle has perimeter ${L_} m. Write its area in terms of width w, then find the area when w = ${w} and the largest possible area.`,[[`A(${w}) =`,w*(L_/2-w)],['max area =',(L_/4)**2]],`ℓ = ${L_/2} − w; max at w = ${L_/4}.`,[[`A(w) = w(${L_/2} − w)`,'Constraint.'],[`A(${w}) = ${w*(L_/2-w)}; A(${L_/4}) = ${(L_/4)**2}`,'Evaluate.']]);},
 check:[q('Perimeter 60: ℓ in terms of w?',['60 − w','30 − w','60 − 2w','w − 30'],1,''),q('Rectangle with perimeter P and max area is a…',['long strip','square','triangle','circle'],1,''),q('3x + 2y = 12 solved for y?',['y = 6 − 1.5x','y = 12 − 3x','y = 4 − x','y = 1.5x − 6'],0,'')]};

L['A2-13-5']={goal:'I can use formulas with several variables and describe how changing one variable affects the result.',
 life:{title:'Road-trip budget',html:'Gas cost per person = distance × price ÷ (mpg × riders). Four variables, one formula. Knowing which variables are <b>multiplied</b> and which <b>divide</b> tells you instantly how a change — a better car, one more friend — moves the cost.'},
 see:[{title:'Road-trip calculator',hint:'Change each variable. Which ones raise the cost?',mount:mTrip}],
 vocab:[['Direct variation','y = kx: double x → double y.'],['Inverse variation','y = k/x: double x → half y.'],['Joint variation','y = kxz: varies with a product.']],
 examples:[ex('Example 1','Density ρ = m/V. Mass triples, volume doubles. New density?',[['(3m)/(2V) = 1.5 · m/V','×1.5.']]),
  ex('Example 2','Kinetic energy E = ½mv². Speed doubles. Energy?',[['½m(2v)² = 4 · ½mv²','4 times as much.']])],
 mistake:{bad:'v doubles → E = ½mv² doubles',good:'E quadruples',why:'v is <b>squared</b>: 2² = 4.'},
 practice(){const k=pick([2,3,4]),t=pick([['E = ½mv²','v',2],['A = πr²','r',2],['V = s³','s',3],['F = k/d²','d',-2],['I = P/(4πr²)','r',-2]]);const f=k**t[2];return num(`In <b>${t[0]}</b>, ${t[1]} is multiplied by ${k} (everything else fixed). The result is multiplied by?`,[['factor =',f,0.0011]],`${t[1]} appears with power ${t[2]}.`,[[`${k}${A2.sup(t[2])} = ${fr(...(t[2]<0?[1,k**-t[2]]:[f,1]))}`,'Raise the factor to that power.']]);},
 check:[q('y = 5x/z. x doubles, z doubles. y…',['doubles','halves','unchanged','×4'],2,''),q('Area of a circle when r triples?',['×3','×6','×9','×27'],2,''),q('Travel time = d/s. Speed doubles →',['time doubles','time halves','same','time ×4'],1,'')]};

TOOLS['A2-13']={title:'Revenue, cost, and profit',hint:'Change price and costs; find the break-even point.',mount:mCombo};
})();
