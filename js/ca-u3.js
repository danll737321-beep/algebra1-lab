/* Calculus · Unit 3 · Differentiation: composite, implicit, and inverse functions */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser,curve,hline,vline,hole,ps}=A2;const C=PC,K=CA,PI=Math.PI;
const line=(G,m,x0,y0,col,w=2.5,dash='')=>curve(G,x=>y0+m*(x-x0),col,w,dash);

const CH=[{t:'sin(x²)',u:x=>x*x,du:x=>2*x,y:Math.sin,dy:Math.cos,un:'x²',yn:'sin u',dun:'2x',dyn:'cos u'},
 {t:'(3x + 1)⁴',u:x=>3*x+1,du:()=>3,y:u=>u**4,dy:u=>4*u**3,un:'3x + 1',yn:'u⁴',dun:'3',dyn:'4u³'},
 {t:'e^(−x²/2)',u:x=>-x*x/2,du:x=>-x,y:Math.exp,dy:Math.exp,un:'−x²/2',yn:'eᵘ',dun:'−x',dyn:'eᵘ'},
 {t:'ln(x² + 1)',u:x=>x*x+1,du:x=>2*x,y:Math.log,dy:u=>1/u,un:'x² + 1',yn:'ln u',dun:'2x',dyn:'1/u'}];
function mChain(el){K.pickSlide(el,CH,[{k:'x',l:'x',min:-1.5,max:1.5,step:.05,v:0.8}],(V,F)=>{const x=V.x,u=F.u(x),a=F.du(x),b=F.dy(u),h=x=>F.y(F.u(x));
  const gear=(cx,r,lab,val,col)=>`<circle cx="${cx}" cy="70" r="${r}" fill="${col}22" stroke="${col}" stroke-width="4" stroke-dasharray="8 5"/><text x="${cx}" y="66" text-anchor="middle" font-weight="900" font-size="18" fill="${col}">${lab}</text><text x="${cx}" y="88" text-anchor="middle" font-size="13" font-weight="700">${val}</text>`;
  $('.chn-g',el).innerHTML=`<svg viewBox="0 0 520 140" class="fig" style="max-width:520px">${gear(80,52,'x','turns 1','#2563eb')}${gear(255,52,'u','×'+K.r3(a),'#059669')}${gear(430,52,'y','×'+K.r3(b),'#e11d48')}<text x="165" y="135" text-anchor="middle" font-size="13">du/dx = ${F.dun}</text><text x="345" y="135" text-anchor="middle" font-size="13">dy/du = ${F.dyn}</text></svg>`;
  $('.chn-r',el).innerHTML=`y = ${F.yn}, u = ${F.un}. At x = ${nf(x)}: u = ${K.r3(u)}.<br>dy/dx = (dy/du)(du/dx) = ${K.r3(b)} × ${K.r3(a)} = <b>${K.r3(a*b)}</b> · numerical slope of ${F.t}: <b>${K.r3(C.d1(h,x))}</b> ✓<br><span class="mute">Rates multiply through the chain, like gears.</span>`;},`<div class="chn-g"></div><div class="readout chn-r"></div>`);}

function mImplicit(el){sliders(el,[{k:'t',l:'point angle (°)',min:5,max:355,step:5,v:40}],V=>{const t=V.t*PI/180,x=5*Math.cos(t),y=5*Math.sin(t);const G=grid({x0:-7,x1:7,y0:-7,y1:7,u:30,lab:2,laby:2});
  const m=-x/y;let s=`<circle cx="${G.X(0)}" cy="${G.Y(0)}" r="${5*G.u}" fill="none" stroke="#2563eb" stroke-width="3"/>`+(Math.abs(y)>0.05?line(G,m,x,y,'#e11d48'):vline(G,x,'#e11d48',''))+gdot(G,x,y,'#1f2937',7,`(${K.r3(x)}, ${K.r3(y)})`);
  $('.im-g',el).innerHTML=G.svg(s);$('.im-r',el).innerHTML=`x² + y² = 25. Differentiate both sides: 2x + 2y·(dy/dx) = 0, so <b>dy/dx = −x/y</b>.<br>At this point: −(${K.r3(x)})/(${K.r3(y)}) = <b>${Math.abs(y)>0.05?K.r3(m):'undefined (vertical tangent)'}</b>. One formula works on the top half <b>and</b> the bottom half.`;},`<div class="im-g"></div><div class="readout im-r"></div>`).run();}

function mInv(el){sliders(el,[{k:'a',l:'a (on f)',min:-1.2,max:1.4,step:.05,v:1}],V=>{const f=x=>x**3+x,fp=x=>3*x*x+1;const a=V.a,b=f(a),m=fp(a);const G=grid({x0:-4,x1:4,y0:-4,y1:4,u:44,lab:1,laby:1});
  const finv=y=>{let x=0;for(let i=0;i<40;i++)x-=(f(x)-y)/fp(x);return x;};
  let s=curve(G,x=>x,'#cbd5e1',1.5,'4 4')+curve(G,f,'#2563eb',3)+curve(G,finv,'#9333ea',3)+line(G,m,a,b,'#2563eb',2,'5 4')+line(G,1/m,b,a,'#9333ea',2,'5 4')+gdot(G,a,b,'#2563eb',7,`(${K.r3(a)}, ${K.r3(b)})`)+gdot(G,b,a,'#9333ea',7,`(${K.r3(b)}, ${K.r3(a)})`);
  $('.iv-g',el).innerHTML=G.svg(s);$('.iv-r',el).innerHTML=`f(x) = x³ + x (blue) and its inverse g (purple) are mirror images over y = x.<br>Slope of f at x = ${K.r3(a)}: f′ = <b>${K.r3(m)}</b> · slope of g at x = ${K.r3(b)}: <b>1/${K.r3(m)} = ${K.r3(1/m)}</b><br>g′(b) = 1 / f′(g(b)) — mirrored lines have reciprocal slopes.`;},`<div class="iv-g"></div><div class="readout iv-r"></div>`).run();}

const AT=[{t:'arcsin x',f:Math.asin,d:x=>1/Math.sqrt(1-x*x),dn:'1/√(1 − x²)',r:[-0.95,0.95],g:{x0:-1.5,x1:1.5,y0:-2,y1:4,u:120,uy:40}},{t:'arctan x',f:Math.atan,d:x=>1/(1+x*x),dn:'1/(1 + x²)',r:[-4,4],g:{x0:-5,x1:5,y0:-2,y1:2,u:44,uy:70}},{t:'arccos x',f:Math.acos,d:x=>-1/Math.sqrt(1-x*x),dn:'−1/√(1 − x²)',r:[-0.95,0.95],g:{x0:-1.5,x1:1.5,y0:-4,y1:4,u:120,uy:30}}];
function mArc(el){K.pickSlide(el,AT,F=>[{k:'x',l:'x',min:F.r[0],max:F.r[1],step:.05,v:0.5}],(V,F)=>{const G=grid(Object.assign({lab:1,laby:1},F.g));
  let s=curve(G,x=>x<-1&&F.t!=='arctan x'||x>1&&F.t!=='arctan x'?NaN:F.f(x),'#2563eb',3)+curve(G,x=>(x<=-1||x>=1)&&F.t!=='arctan x'?NaN:F.d(x),'#e11d48',2.5,'6 4')+line(G,F.d(V.x),V.x,F.f(V.x),'#94a3b8',2)+gdot(G,V.x,F.f(V.x),'#2563eb',7);
  $('.ar-g',el).innerHTML=G.svg(s);$('.ar-r',el).innerHTML=`d/dx[${F.t}] = <b>${F.dn}</b> (red dashed).<br>At x = ${nf(V.x)}: formula ${K.r3(F.d(V.x))}, numerical slope ${K.r3(C.d1(F.f,V.x))} ✓`;},`<div class="ar-g"></div><div class="readout ar-r"></div>`);}

const ST=[{f:'y = (x² + 1)⁵',r:'chain',why:'An outer power of an inner function.'},{f:'y = x³ cos x',r:'product',why:'Two separate functions multiplied.'},{f:'y = eˣ / (x + 1)',r:'quotient',why:'One function divided by another (or product with (x + 1)⁻¹).'},{f:'y = 7x⁴ − 2x + 9',r:'power + sum',why:'Just power rule term by term.'},{f:'x² + xy + y² = 7',r:'implicit',why:'y is not isolated.'},{f:'y = arctan(3x)',r:'chain',why:'arctan of an inner function.'},{f:'y = x² e^(5x)',r:'product + chain',why:'A product, and one factor needs the chain rule.'}];
function mStrat(el){let k=0;const rules=['power + sum','product','quotient','chain','product + chain','implicit'];
 const draw=(msg='')=>{el.innerHTML=`<div class="eqline math" style="font-size:1.5em">${ST[k].f}</div><p class="mute">Which rule(s) do you need first?</p><div class="row">${rules.map(r=>`<button data-r="${r}">${r}</button>`).join('')}</div><div class="readout">${msg||'&nbsp;'}</div><div class="row"><button data-nx="1">Next function ▶</button></div>`;};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.nx){k=(k+1)%ST.length;draw();return;}const r=b.dataset.r;if(!r)return;draw(r===ST[k].r?`✓ <b>${r}</b>. ${ST[k].why}`:`Not quite — look at the <b>outermost</b> operation. Try again.`);});draw();}

function mHigher(el){sliders(el,[{k:'t',l:'t (s)',min:0,max:6,step:.05,v:2}],V=>{const s=t=>t**3/3-3*t*t+8*t,v=t=>t*t-6*t+8,a=t=>2*t-6;const t=V.t;
  const mk=(f,lab,col,y0,y1)=>{const G=grid({x0:0,x1:6.2,y0,y1,u:70,uy:110/(y1-y0),lab:1,laby:Math.ceil((y1-y0)/4)});return `<div class="mute" style="text-align:center;font-weight:700;color:${col}">${lab}(${nf(t)}) = ${K.r3(f(t))}</div>`+G.svg(curve(G,f,col,3)+vline(G,t,'#94a3b8','4 4')+gdot(G,t,f(t),col,6));};
  $('.hd-g',el).innerHTML=mk(s,'s','#2563eb',-2,16)+mk(v,'v = s′','#059669',-2,10)+mk(a,'a = s″','#e11d48',-7,7);
  $('.hd-r',el).innerHTML=`s(t) = t³/3 − 3t² + 8t · v = t² − 6t + 8 · a = 2t − 6<br>${v(t)>0?'Moving right':v(t)<0?'Moving left':'Momentarily stopped'}; ${v(t)*a(t)>0?'<b>speeding up</b> (v and a same sign).':v(t)*a(t)<0?'<b>slowing down</b> (v and a opposite signs).':'speed not changing this instant.'}`;},`<div class="hd-g"></div><div class="readout hd-r"></div>`).run();}

/* ---------- lessons ---------- */
L['CA-3-1']={goal:'I can use the chain rule to differentiate composite functions, including nested compositions.',
 life:{title:'Gears and rates',html:'If a balloon’s radius grows with time, and its volume depends on its radius, then volume changes with time at a rate equal to (rate of V per r) × (rate of r per t). Rates in a chain <b>multiply</b>.'},
 see:[{title:'Chain-rule gears',hint:'Pick a composite. dy/dx is the product of the two gear ratios.',mount:mChain}],
 vocab:[['Chain rule','d/dx[f(g(x))] = f′(g(x))·g′(x).'],['Leibniz form','dy/dx = (dy/du)(du/dx).'],['Outside–inside','Differentiate the outside (leave the inside alone), then multiply by the derivative of the inside.'],['General forms','d/dx[uⁿ] = n uⁿ⁻¹ u′, d/dx[eᵘ] = eᵘ u′, d/dx[ln u] = u′/u, d/dx[sin u] = cos u · u′.']],
 examples:[ex('Example 1','y = (x² − 5)⁷',[['outside: 7(x² − 5)⁶',''],['inside: 2x',''],['y′ = 14x(x² − 5)⁶','']]),ex('Example 2','y = sin³(4x) = [sin(4x)]³',[['3 sin²(4x)','Outer power.'],['· cos(4x)','Middle.'],['· 4','Inner. y′ = 12 sin²(4x) cos(4x).']])],
 mistake:{bad:'d/dx[e^(3x)] = e^(3x)',good:'= 3e^(3x)',why:'Multiply by the derivative of the inside, 3x → 3.'},
 practice(){const T=pick(['vals','pow','exp']);
  if(T==='vals'){const x=rand(1,4),g=rand(-3,3),gp=rand(-4,4),fpg=rand(-5,5);return num(`g(${x}) = ${fmtNeg(g)}, g′(${x}) = ${fmtNeg(gp)}, f′(${fmtNeg(g)}) = ${fmtNeg(fpg)}. Let h(x) = f(g(x)). Find h′(${x}).`,[[`h′(${x}) =`,fpg*gp]],'h′(x) = f′(g(x))·g′(x).',[[`f′(g(${x}))·g′(${x}) = f′(${fmtNeg(g)})·(${fmtNeg(gp)}) = ${fmtNeg(fpg*gp)}`,'']]);}
  if(T==='pow'){const a=nz(-3,3),b=rand(-4,4),n=rand(2,4),x=rand(-1,2);const u=a*x+b,d=n*u**(n-1)*a;return num(`y = (${ps([a,b])})${A2.sup(n)}. Find y′ at x = ${fmtNeg(x)}.`,[["y′ =",d]],'Outside power, times the derivative of the inside.',[[`y′ = ${n}(${ps([a,b])})${A2.sup(n-1)}·${P(a)}`,''],[`at x = ${fmtNeg(x)}: ${n}·${P(u)}${A2.sup(n-1)}·${P(a)} = ${fmtNeg(d)}`,'']]);}
  const k=nz(-4,4);return num(`y = e^(${k}x) + ln(${Math.abs(k)}x² + 1). Find y′(0).`,[["y′(0) =",k]],'Chain rule on both terms.',[[`y′ = ${k}e^(${k}x) + ${2*Math.abs(k)}x/(${Math.abs(k)}x² + 1)`,''],[`y′(0) = ${k} + 0 = ${k}`,'']]);},
 check:[q('d/dx[f(g(x))] =',['f′(x)g′(x)','f′(g(x))g′(x)','f(g′(x))','f′(g′(x))'],1,''),q('d/dx[sin(5x)] =',['cos(5x)','5 cos(5x)','5 sin(5x)','−5 cos(5x)'],1,''),q('d/dx[ln(x² + 1)] =',['1/(x² + 1)','2x/(x² + 1)','2x ln x','1/(2x)'],1,'')]};

L['CA-3-2']={goal:'I can use implicit differentiation to find dy/dx and tangent lines for curves not written as y = f(x).',
 life:{title:'Curves that fail the vertical-line test',html:'A circular track, an elliptical orbit, the folium of Descartes — none is a single function y = f(x), yet each has a tangent at almost every point. Implicit differentiation finds those slopes directly.'},
 see:[{title:'Slope around a circle',hint:'Move the point around x² + y² = 25. One formula, −x/y, gives every slope.',mount:mImplicit}],
 vocab:[['Implicit differentiation','Differentiate both sides with respect to x, treating y as a function of x.'],['Key step','d/dx[y²] = 2y·(dy/dx) — every y-term gets a dy/dx by the chain rule.'],['Solve for dy/dx','Collect dy/dx terms on one side and factor.'],['Product terms','d/dx[xy] = y + x·(dy/dx).']],
 examples:[ex('Example','x² + xy + y² = 7. Find dy/dx at (1, 2).',[['2x + (y + x y′) + 2y y′ = 0','Differentiate; xy needs the product rule.'],['y′(x + 2y) = −2x − y',''],['y′ = −(2x + y)/(x + 2y) = −4/5 at (1, 2)','']])],
 mistake:{bad:'d/dx[y³] = 3y²',good:'= 3y²·(dy/dx)',why:'y depends on x, so the chain rule attaches dy/dx.'},
 practice(){if(Math.random()<0.5){const r=pick([[3,4],[4,3],[5,12],[6,8],[8,6]]),sx=pick([1,-1]),sy=pick([1,-1]);const x=r[0]*sx,y=r[1]*sy;
   return num(`x² + y² = ${x*x+y*y}. Find dy/dx at (${fmtNeg(x)}, ${fmtNeg(y)}). (fraction or decimal)`,[['dy/dx =',-x/y,0.011]],'2x + 2y y′ = 0, so y′ = −x/y.',[[`−(${fmtNeg(x)})/(${fmtNeg(y)}) = ${frac(-x,y)}`,'']]);}
  const a=rand(1,3),x=rand(1,2),y=rand(1,3);const c=x*x*a+x*y+y*y;const d=-(2*a*x+y)/(x+2*y);
  return num(`${a===1?'':a}x² + xy + y² = ${c}. Find dy/dx at (${x}, ${y}). (fraction or decimal)`,[['dy/dx =',d,0.011]],'Product rule on xy; solve for y′.',[[`${2*a}x + y + x y′ + 2y y′ = 0`,''],[`y′ = −(${2*a}x + y)/(x + 2y) = ${frac(-(2*a*x+y),x+2*y)}`,'']]);},
 check:[q('d/dx[y²] =',['2y','2y·dy/dx','y·dy/dx','2x'],1,''),q('For x² + y² = r², dy/dx =',['x/y','−x/y','−y/x','y/x'],1,''),q('d/dx[xy] =',['y′','x + y','y + x y′','x y′'],2,'')]};

L['CA-3-3']={goal:'I can find the derivative of an inverse function at a point using g′(b) = 1/f′(g(b)).',
 life:{title:'Running the film backward',html:'If f converts temperature to pressure, its inverse converts pressure back to temperature. If pressure rises 4 units per degree, then temperature rises 1/4 degree per unit of pressure — reciprocal rates.'},
 see:[{title:'Mirror slopes',hint:'Move the point on f. Compare the slopes at the two mirrored points.',mount:mInv}],
 vocab:[['Inverse derivative','If g = f⁻¹ and f(a) = b, then g′(b) = 1/f′(a).'],['Mirror points','(a, b) on f ↔ (b, a) on f⁻¹.'],['Requirement','f′(a) ≠ 0 (otherwise the inverse has a vertical tangent).'],['Recipe','Given b, find a with f(a) = b, then take 1/f′(a).']],
 examples:[ex('Example','f(x) = x³ + 2x + 1, g = f⁻¹. Find g′(4).',[['f(a) = 4 → a = 1','Try small integers: 1 + 2 + 1 = 4.'],['f′(x) = 3x² + 2, f′(1) = 5',''],['g′(4) = 1/5','']])],
 mistake:{bad:'g′(4) = 1/f′(4)',good:'g′(4) = 1/f′(g(4)) = 1/f′(1)',why:'Evaluate f′ at the matching x-value on f, not at 4.'},
 practice(){const a=rand(-2,2),p=rand(1,3),k=rand(1,4),c=rand(-5,5);const f=x=>p*x**3+k*x+c,fp=x=>3*p*x*x+k;const b=f(a);
  return num(`f(x) = ${ps([p,0,k,c])} and g = f⁻¹. Find g′(${fmtNeg(b)}). (fraction or decimal)`,[[`g′(${fmtNeg(b)}) =`,1/fp(a),0.011]],`First solve f(a) = ${fmtNeg(b)} (try small integers).`,[[`f(${fmtNeg(a)}) = ${fmtNeg(b)}, so g(${fmtNeg(b)}) = ${fmtNeg(a)}`,''],[`f′(x) = ${ps([3*p,0,k])}, f′(${fmtNeg(a)}) = ${fp(a)}`,''],[`g′(${fmtNeg(b)}) = 1/${fp(a)}`,'']]);},
 check:[q('If f(2) = 5 and f′(2) = 4, then (f⁻¹)′(5) =',['4','1/4','2','1/5'],1,''),q('The graphs of f and f⁻¹ are reflections over…',['the x-axis','y = x','the y-axis','y = −x'],1,''),q('If f′(a) = 0, the inverse at f(a) has…',['slope 0','a vertical tangent','slope 1','a hole'],1,'')]};

L['CA-3-4']={goal:'I can differentiate arcsin, arccos, and arctan, including with the chain rule.',
 life:{title:'Angle of view',html:'Watching a rocket rise, the angle of elevation is θ = arctan(h/d). How fast does your head tilt? That requires the derivative of arctan.'},
 see:[{title:'Inverse trig slopes',hint:'Pick a function and slide x. The red dashed curve is the derivative formula.',mount:mArc}],
 vocab:[['d/dx[arcsin x]','1/√(1 − x²)'],['d/dx[arccos x]','−1/√(1 − x²)'],['d/dx[arctan x]','1/(1 + x²)'],['With the chain rule','d/dx[arctan u] = u′/(1 + u²), d/dx[arcsin u] = u′/√(1 − u²).']],
 examples:[ex('Example','y = arctan(2x). Find y′(1).',[['y′ = 2/(1 + 4x²)','Chain rule: u = 2x, u′ = 2.'],['y′(1) = 2/5','']])],
 mistake:{bad:'d/dx[arcsin x] = 1/cos x',good:'= 1/√(1 − x²)',why:'arcsin x is the angle, not a reciprocal. Use the inverse-derivative idea: cos(arcsin x) = √(1 − x²).'},
 practice(){const k=rand(1,5),x=pick([0,1,2]);if(Math.random()<0.5)return num(`y = arctan(${k}x). Find y′(${x}). (fraction or decimal)`,[[`y′(${x}) =`,k/(1+k*k*x*x),0.011]],'d/dx arctan u = u′/(1 + u²).',[[`y′ = ${k}/(1 + ${k*k}x²)`,''],[`y′(${x}) = ${frac(k,1+k*k*x*x)}`,'']]);
  const T=pick([['arcsin x','1/√(1 − x²)'],['arccos x','−1/√(1 − x²)'],['arctan x','1/(1 + x²)'],['arcsin(x/2)','1/√(4 − x²)']]);return mc(`d/dx[${T[0]}] =`,T[1],['1/√(1 − x²)','−1/√(1 − x²)','1/(1 + x²)','1/√(4 − x²)'],'Recall the three formulas; use the chain rule for an inside function.');},
 check:[q('d/dx[arctan x] at x = 0 =',['0','1','π/4','undefined'],1,''),q('d/dx[arcsin x] =',['1/√(1 − x²)','1/(1 + x²)','−1/√(1 − x²)','√(1 − x²)'],0,''),q('arccos and arcsin derivatives differ by…',['a factor of 2','a minus sign','nothing','1/x'],1,'')]};

L['CA-3-5']={goal:'I can choose and combine the right differentiation rules for any function, and simplify the result.',
 life:{title:'Reading the recipe',html:'A chef reads a recipe from the outside in: “bake (the mixture of (flour and eggs))”. Differentiation works the same way: identify the <b>last</b> operation done to x, and that tells you the first rule to use.'},
 see:[{title:'Which rule first?',hint:'Identify the outermost operation, then choose.',mount:mStrat}],
 vocab:[['Outermost operation','The last step you would do if you evaluated the function at a number.'],['Product vs. chain','f(x)·g(x) → product; f(g(x)) → chain.'],['Rewrite first','Roots and fractions with constants are often easier as powers: 3/x⁴ = 3x⁻⁴.'],['Combining','Many functions need two rules, e.g. x² sin(3x): product, with chain inside.']],
 examples:[ex('Example','y = x² e^(−3x)',[['product first: (x²)′e^(−3x) + x²(e^(−3x))′',''],['= 2x e^(−3x) − 3x² e^(−3x)','Chain on e^(−3x).'],['= x e^(−3x)(2 − 3x)','Factor.']])],
 mistake:{bad:'d/dx[(2x + 1)/5] uses the quotient rule',good:'= (1/5)(2x + 1) → 2/5',why:'Dividing by a constant is a constant multiple. Save the quotient rule for a variable denominator.'},
 practice(){const T=pick(ST);return mc(`Which rule(s) are needed for ${T.f}?`,T.r,['power + sum','product','quotient','chain','product + chain','implicit'],'Look at the outermost operation.');},
 check:[q('y = sin(x²) needs…',['product','chain','quotient','none'],1,''),q('y = x sin x needs…',['product','chain','quotient','implicit'],0,''),q('y = 4/x³ is easiest as…',['quotient rule','4x⁻³ with the power rule','implicit','chain'],1,'')]};

L['CA-3-6']={goal:'I can compute second and higher derivatives and interpret the second derivative of position as acceleration.',
 life:{title:'Jerk',html:'Engineers designing elevators control not just acceleration (2nd derivative) but jerk (3rd derivative) so that riders feel smooth starts. Each derivative measures how the previous one changes.'},
 see:[{title:'Position, velocity, acceleration',hint:'Slide t. When are v and a the same sign?',mount:mHigher}],
 vocab:[['Second derivative','f″ = (f′)′; notation d²y/dx².'],['nth derivative','f⁽ⁿ⁾(x), dⁿy/dxⁿ.'],['Motion','v = s′, a = v′ = s″.'],['Speeding up','When v and a have the same sign; slowing down when they differ.']],
 examples:[ex('Example','y = x⁴ − 3x² + eˣ. Find y″.',[['y′ = 4x³ − 6x + eˣ',''],['y″ = 12x² − 6 + eˣ','']]),ex('Implicit','x² + y² = 25: y′ = −x/y. Then y″ = −(y − x y′)/y² = −25/y³.',[['substitute y′ = −x/y and x² + y² = 25','']])],
 mistake:{bad:'y″ = (y′)²',good:'y″ = d/dx[y′]',why:'Second derivative means differentiate again, not square.'},
 practice(){const a=nz(-3,3),b=rand(-4,4),c=rand(-5,5),d=rand(-9,9),x=rand(-2,2);if(Math.random()<0.6)return num(`f(x) = ${ps([a,b,c,d,rand(-9,9)])}. Find f″(${fmtNeg(x)}).`,[[`f″(${fmtNeg(x)}) =`,12*a*x*x+6*b*x+2*c]],'Differentiate twice.',[[`f′ = ${ps([4*a,3*b,2*c,d])}`,''],[`f″ = ${ps([12*a,6*b,2*c])}`,''],[`f″(${fmtNeg(x)}) = ${12*a*x*x+6*b*x+2*c}`,'']]);
  const k=rand(2,4),n=rand(2,5);return mc(`The ${n}th derivative of e^(${k}x) is…`,`${k**n}e^(${k}x)`,[`${k}e^(${k}x)`,`${n*k}e^(${k}x)`,`e^(${k}x)`],`Each derivative multiplies by ${k}.`);},
 check:[q('If s(t) is position, s″(t) is…',['velocity','acceleration','jerk','distance'],1,''),q('v = −3, a = 2: the object is…',['speeding up','slowing down','at rest','moving right'],1,''),q('d²/dx²[sin x] =',['cos x','−sin x','sin x','−cos x'],1,'')]};

TOOLS['CA-3']={title:'Chain-rule gears',hint:'Choose a composite function; the overall rate is the product of the gear ratios.',mount:mChain};
})();
