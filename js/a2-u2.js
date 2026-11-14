/* Algebra 2 · Unit 2 · Complex numbers */
(function(){const {cs,cmul,sliders,cplane,ex,q,mc,num,nz,graphLab,curve,TOOLS,nf}=A2;
const IP=['1','i','−1','−i'],IPV=[[1,0],[0,1],[-1,0],[0,-1]];
function mountPowers(el){sliders(el,[{k:'n',l:'n',min:0,max:12,v:1}],V=>{const n=V.n,r=n%4;
  $('.pw-g',el).innerHTML=cplane(IPV.map((p,i)=>Object.assign(p.slice(),{col:i===r?'#e11d48':'#cbd5e1',l:i===r?'i'+A2.sup(n)+' = '+IP[r]:''})),{R:2,u:70});
  $('.pw-r',el).innerHTML=`i${A2.sup(n)} = <b>${IP[r]}</b> &nbsp; (n ÷ 4 leaves remainder <b>${r}</b>)<br><span class="mute">Multiplying by i turns a point 90° counterclockwise. Four turns bring you back: i⁰ = 1, i¹ = i, i² = −1, i³ = −i, i⁴ = 1 …</span>`;},`<div class="pw-g"></div><div class="readout pw-r"></div>`).run();}
function mountPlot(el){sliders(el,[{k:'a',l:'real part a',min:-5,max:5,v:3},{k:'b',l:'imag. part b',min:-5,max:5,v:2}],V=>{const {a,b}=V;
  $('.cp-g',el).innerHTML=cplane([Object.assign([a,b],{col:'#7c3aed',l:cs(a,b)})],{vec:[{to:[a,0],col:'#059669',w:4},{from:[a,0],to:[a,b],col:'#2563eb',w:4}]});
  const kind=!b?'a <b>real number</b> (b = 0)':!a?'a <b>pure imaginary</b> number (a = 0)':'a complex number with both parts';
  $('.cp-r',el).innerHTML=`z = <b>${cs(a,b)}</b>: go <b style="color:#059669">${fmtNeg(a)}</b> along the real axis, then <b style="color:#2563eb">${fmtNeg(b)}</b> up the imaginary axis. It is ${kind}.<br><span class="mute">Distance from 0: |z| = √(a² + b²) = √${a*a+b*b} ≈ ${nf(Math.hypot(a,b))}</span>`;},`<div class="cp-g"></div><div class="readout cp-r"></div>`).run();}
function mountAdd(el){sliders(el,[{k:'op',l:'+ / −',min:0,max:1,v:0,f:v=>v?'subtract':'add'},{k:'a',l:'w: real',min:-4,max:4,v:1},{k:'b',l:'w: imag',min:-4,max:4,v:3}],V=>{const z=[2,1],w=[V.a,V.b],s=V.op?-1:1,r=[z[0]+s*w[0],z[1]+s*w[1]];
  $('.ad-g',el).innerHTML=cplane([Object.assign(z.slice(),{col:'#2563eb',l:'z'}),Object.assign(r,{col:'#e11d48',l:V.op?'z − w':'z + w'})],{R:7,u:24,vec:[{to:z,col:'#2563eb',w:3},{from:z,to:r,col:'#f59e0b',w:3},{to:[s*w[0],s*w[1]],col:'#f59e0b',w:2,dash:1}]});
  $('.ad-r',el).innerHTML=`(${cs(2,1)}) ${V.op?'−':'+'} (${cs(...w)}) = <b>${cs(...r)}</b><br><span class="mute">${V.op?'Subtracting w = adding −w (the orange arrow is flipped).':'Add real parts, add imaginary parts. On the plane: put arrow w (orange) at the tip of z.'}</span>`;},`<div class="ad-g"></div><div class="readout ad-r"></div>`).run();}
function mountMul(el){sliders(el,[{k:'c',l:'w: real',min:-3,max:3,v:0},{k:'d',l:'w: imag',min:-3,max:3,v:1}],V=>{const z=[2,1],w=[V.c,V.d],r=cmul(z,w);
  $('.mu-g',el).innerHTML=cplane([Object.assign(z.slice(),{col:'#2563eb',l:'z'}),Object.assign(w.slice(),{col:'#f59e0b',l:'w'}),Object.assign(r,{col:'#e11d48',l:'z·w'})],{R:8,u:22,vec:[{to:z,col:'#2563eb'},{to:r,col:'#e11d48'}]});
  $('.mu-r',el).innerHTML=`(2 + i)(${cs(...w)}) = 2·${P(w[0])} + 2·${P(w[1])}i + ${P(w[0])}i + ${P(w[1])}i² = <b>${cs(...r)}</b><br><span class="mute">FOIL, then replace <b>i² with −1</b>. ${w[0]===0&&w[1]===1?'Multiplying by i rotates z by 90°!':w[0]===0&&w[1]===-1?'Multiplying by −i rotates z by −90°.':'Multiplying stretches and turns the arrow.'}</span>`;},`<div class="mu-g"></div><div class="readout mu-r"></div>`).run();}
function mountQuad(el){graphLab(el,{g:{x0:-6,x1:6,y0:-4,y1:10,u:32,uy:22,lab:2,laby:2},params:[{k:'b',l:'b',min:-6,max:6,v:2},{k:'c',l:'c',min:-4,max:10,v:5}],
 curves:V=>[{f:x=>x*x+V.b*x+V.c}],eq:V=>'y = '+A2.ps([1,V.b,V.c]),
 extra:(G,V)=>{const D=V.b*V.b-4*V.c;if(D<0)return '';const r=[(-V.b-Math.sqrt(D))/2,(-V.b+Math.sqrt(D))/2];return r.map(x=>gdot(G,x,0,'#e11d48',7)).join('');},
 read:V=>{const D=V.b*V.b-4*V.c,h=-V.b/2;if(D>=0)return `Discriminant b² − 4ac = <b>${D}</b> ≥ 0 → the parabola crosses the x-axis: ${D?'two real':'one real'} solution${D?'s':''}: x = ${nf(h-Math.sqrt(D)/2)}${D?', '+nf(h+Math.sqrt(D)/2):''}.`;
  const im=Math.sqrt(-D)/2;return `Discriminant = <b>${D}</b> &lt; 0 → no x-intercepts, so <b>no real solutions</b>. The solutions are complex: x = ${nf(h)} ± ${nf(im)}i <span class="mute">(= (−b ± √(${D}))/2, and √(${D}) = ${nf(Math.sqrt(-D))}i)</span>. They are <b>conjugates</b>.`;}});}

L['A2-2-1']={goal:'I can define i = √−1, simplify square roots of negatives, and find powers of i.',
 life:{title:'A number nobody believed in',html:'For centuries, x² = −1 was called “impossible.” Then engineers discovered that using <b>i = √−1</b> makes alternating-current circuits, signal processing, and even video-game rotations much simpler. Today i is an everyday tool.'},
 see:[{title:'Powers of i go in a circle',hint:'Slide n. Watch iⁿ turn 90° each time.',mount:mountPowers}],
 vocab:[['Imaginary unit i','i = √−1, so i² = −1.'],['√−k','√−k = i√k for k > 0.'],['Cycle of i','i, −1, −i, 1 repeats every 4 powers.']],
 examples:[ex('Example 1','Simplify √−49 and √−12.',[['√−49 = √49 · √−1 = 7i','Split off √−1.'],['√−12 = i√12 = 2i√3','Simplify √12 = 2√3.']]),
  ex('Example 2','Find i²⁷.',[['27 ÷ 4 = 6 remainder 3','Only the remainder matters.'],['i²⁷ = i³ = −i','Use the cycle.']])],
 mistake:{bad:'√−4 · √−9 = √36 = 6',good:'2i · 3i = 6i² = −6',why:'√a·√b = √(ab) only works when a, b ≥ 0. Rewrite with i first.'},
 practice(){if(Math.random()<.5){const n=rand(5,60),r=n%4;return mc(`Simplify <b>i${A2.sup(n)}</b>.`,IP[r],IP.filter((_,i)=>i!==r),`${n} ÷ 4 leaves remainder ${r}, so i${A2.sup(n)} = i${A2.sup(r)} = ${IP[r]}.`);}
  const k=rand(2,12);return num(`Write <b>√−${k*k}</b> as bi. What is b?`,[['b =',k]],'√−k² = √k² · √−1.',[[`√−${k*k} = √${k*k} · i = ${k}i`,'Split off √−1.']]);},
 check:[q('i² = ?',['1','−1','i','−i'],1,'Definition.'),q('√−25 = ?',['−5','5i','−5i','25i'],1,'√25 · i.'),q('i¹⁰ = ?',['1','i','−1','−i'],2,'10 ÷ 4 remainder 2.')]};

L['A2-2-2']={goal:'I can identify the real and imaginary parts of a complex number a + bi.',
 life:{title:'Two directions at once',html:'A complex number is like an address with <b>two</b> pieces: how far east (real part) and how far north (imaginary part). Electrical engineers write a circuit’s impedance as <b>3 + 4i ohms</b> — 3 for resistance, 4 for reactance.'},
 see:[{title:'Real part and imaginary part',hint:'Move a and b. When is the number real? Pure imaginary?',mount:mountPlot}],
 vocab:[['Complex number','a + bi, where a and b are real.'],['Real part','a.'],['Imaginary part','b (the coefficient of i, not bi).'],['Pure imaginary','a = 0 and b ≠ 0.']],
 examples:[ex('Example 1','Name the parts of −3 + 8i and of 5i.',[['−3 + 8i: real −3, imaginary 8','a = −3, b = 8.'],['5i = 0 + 5i: real 0, imaginary 5','Pure imaginary.']]),
  ex('Example 2','Is 7 a complex number?',[['7 = 7 + 0i','Yes — every real number is complex with b = 0.']])],
 mistake:{bad:'Imaginary part of 4 − 9i is −9i',good:'−9',why:'The imaginary part is the <b>real number</b> b that multiplies i.'},
 practice(){const a=rand(-9,9),b=nz(-9,9);return num(`For <b>${cs(a,b)}</b>, give the real part and the imaginary part.`,[['real part =',a],['imaginary part =',b]],'Write it as a + bi.',[[`${cs(a,b)} = ${fmtNeg(a)} + (${fmtNeg(b)})i`,'Read a and b.']]);},
 check:[q('Real part of 6 − 2i?',['6','−2','−2i','4'],0,'a = 6.'),q('Which is pure imaginary?',['3','3 + i','−4i','0.5 − i'],2,'a = 0.'),q('Every real number is also…',['imaginary','complex','irrational','negative'],1,'b = 0.')]};

L['A2-2-3']={goal:'I can plot complex numbers on the complex plane.',
 life:{title:'Map of numbers',html:'Real numbers live on a line. Complex numbers need a whole <b>plane</b>: the horizontal axis is real, the vertical axis is imaginary. Plotting them turns arithmetic into geometry — sliding, turning, and stretching arrows.'},
 see:[{title:'Plot a + bi',hint:'Move the point. Read the coordinates.',mount:mountPlot}],
 vocab:[['Complex plane','Horizontal real axis, vertical imaginary axis.'],['a + bi ↔ (a, b)','Each complex number is one point.'],['Modulus |z|','Distance from 0: √(a² + b²).']],
 examples:[ex('Example 1','Plot −2 + 3i.',[['(−2, 3)','2 left on the real axis, 3 up on the imaginary axis.']]),
  ex('Example 2','Which complex number is at (0, −4)?',[['0 − 4i = −4i','Real part 0, imaginary part −4.']])],
 mistake:{bad:'Plot 4i at (4, 0)',good:'(0, 4)',why:'4i has real part 0, so it sits on the <b>imaginary</b> (vertical) axis.'},
 practice(){const a=rand(-6,6),b=nz(-6,6);if(Math.random()<.5)return num(`What point on the complex plane represents <b>${cs(a,b)}</b>?`,[['x (real) =',a],['y (imaginary) =',b]],'a + bi → (a, b).',[[`(${fmtNeg(a)}, ${fmtNeg(b)})`,'Real part across, imaginary part up.']]);
  return mc(`Which complex number is plotted at <b>(${fmtNeg(a)}, ${fmtNeg(b)})</b>?`,cs(a,b),[cs(b,a),cs(-a,b),cs(a,-b)],'(a, b) → a + bi.');},
 check:[q('3 − 5i is plotted at…',['(3, 5)','(3, −5)','(−5, 3)','(5, 3)'],1,'(a, b).'),q('The vertical axis is…',['real','imaginary','modulus','argument'],1,'Im axis.'),q('|3 + 4i| = ?',['7','5','1','25'],1,'√(9 + 16).')]};

L['A2-2-4']={goal:'I can add and subtract complex numbers.',
 life:{title:'Combining forces',html:'Two forces pull on a boat: one is 2 east and 1 north, the other 1 east and 3 north. Together they make 3 east and 4 north. Adding complex numbers works exactly like that — combine the <b>real</b> parts and the <b>imaginary</b> parts separately.'},
 see:[{title:'Arrows tip-to-tail',hint:'Change w, then switch to subtract.',mount:mountAdd}],
 vocab:[['Sum','(a + bi) + (c + di) = (a + c) + (b + d)i.'],['Difference','(a + bi) − (c + di) = (a − c) + (b − d)i.'],['Like terms','Real with real, imaginary with imaginary.']],
 examples:[ex('Example 1','(4 − 3i) + (−1 + 7i)',[['(4 − 1) + (−3 + 7)i','Group parts.'],['3 + 4i','Simplify.']]),
  ex('Example 2','(2 + 5i) − (6 − i)',[['2 + 5i − 6 + i','Distribute the minus.'],['−4 + 6i','Combine.']])],
 mistake:{bad:'(5 + 2i) − (3 − 4i) = 2 − 2i',good:'2 + 6i',why:'−(−4i) = +4i. Distribute the minus to both parts.'},
 practice(){const a=rand(-9,9),b=rand(-9,9),c=rand(-9,9),d=rand(-9,9),s=Math.random()<.5?1:-1;return num(`Simplify <b>(${cs(a,b)}) ${s>0?'+':'−'} (${cs(c,d)})</b> = x + yi.`,[['x =',a+s*c],['y =',b+s*d]],s>0?'Add real parts; add imaginary parts.':'Flip both signs of the second number, then add.',[[cs(a+s*c,b+s*d),'Combine like parts.']]);},
 check:[q('(1 + i) + (1 − i) = ?',['2','2i','0','2 + 2i'],0,'i − i = 0.'),q('(3 − 2i) − (3 + 2i) = ?',['0','−4i','4i','6'],1,'−2i − 2i.'),q('Adding complex numbers on the plane looks like…',['rotating','tip-to-tail arrows','reflecting','squaring'],1,'Vector addition.')]};

L['A2-2-5']={goal:'I can multiply complex numbers using i² = −1.',
 life:{title:'Rotation by multiplication',html:'Game engines rotate pictures by multiplying by complex numbers. Multiplying by <b>i</b> turns any point 90° counterclockwise. The rule that makes it work: <b>i² = −1</b>.'},
 see:[{title:'Multiply z = 2 + i by w',hint:'Try w = i, w = −1, and w = 1 + i.',mount:mountMul}],
 vocab:[['FOIL','First, Outer, Inner, Last — 4 products.'],['i² = −1','Replace i² with −1, then combine.'],['Conjugate','a + bi and a − bi; their product is a² + b² (real).']],
 examples:[ex('Example 1','(3 + 2i)(1 − 4i)',[['3 − 12i + 2i − 8i²','FOIL.'],['3 − 10i + 8','−8i² = +8.'],['11 − 10i','Combine.']]),
  ex('Example 2 — Conjugates','(5 + 3i)(5 − 3i)',[['25 − 9i²','Difference of squares.'],['25 + 9 = 34','A real number!']])],
 mistake:{bad:'(2i)(3i) = 6i²  → 6',good:'6i² = −6',why:'i² is −1, so 6i² = 6(−1) = −6.'},
 practice(){const a=rand(-5,5),b=nz(-5,5),c=rand(-5,5),d=nz(-5,5);const r=cmul([a,b],[c,d]);return num(`Multiply <b>(${cs(a,b)})(${cs(c,d)})</b> = x + yi.`,[['x =',r[0]],['y =',r[1]]],'FOIL, then use i² = −1.',[[`${fmtNeg(a*c)} + ${P(a*d)}i + ${P(b*c)}i + ${P(b*d)}i²`,'FOIL.'],[`${fmtNeg(a*c)} ${b*d<0?'+':'−'} ${Math.abs(b*d)} + ${P(a*d+b*c)}i`,'i² = −1.'],[cs(...r),'Combine.']]);},
 check:[q('i · i = ?',['2i','−1','1','i²+1'],1,'i² = −1.'),q('(1 + i)² = ?',['2','2i','1 + i²','0'],1,'1 + 2i + i² = 2i.'),q('(4 − i)(4 + i) = ?',['15','17','16 − i²','16'],1,'16 + 1.')]};

L['A2-2-6']={goal:'I can solve quadratic equations with complex solutions and connect them to the graph.',
 life:{title:'When the parabola misses',html:'A ball’s height parabola that never touches the ground means the equation “height = 0” has <b>no real solution</b>. Algebra still finds two answers — a pair of <b>complex conjugates</b>. The discriminant b² − 4ac tells you which case you are in before you solve.'},
 see:[{title:'Discriminant and the graph',hint:'Lift the parabola above the x-axis (increase c). Watch the solutions become complex.',mount:mountQuad}],
 vocab:[['Discriminant','b² − 4ac. Negative → two complex (non-real) solutions.'],['Complex conjugates','p + qi and p − qi; non-real roots of real quadratics come in pairs.'],['Quadratic formula','x = (−b ± √(b² − 4ac)) / 2a.']],
 examples:[ex('Example 1','Solve x² + 16 = 0.',[['x² = −16','Isolate x².'],['x = ±√−16 = ±4i','Square root of a negative.']]),
  ex('Example 2','Solve x² − 4x + 13 = 0.',[['D = 16 − 52 = −36','Negative → complex.'],['x = (4 ± √−36)/2 = (4 ± 6i)/2','Formula.'],['x = 2 ± 3i','Simplify.']])],
 mistake:{bad:'x² = −9 → no solution, stop',good:'x = ±3i',why:'There is no <b>real</b> solution, but there are two complex ones.'},
 practice(){const p=rand(-5,5),qq=rand(1,6);const b=-2*p,c=p*p+qq*qq;return num(`Solve <b>${A2.ps([1,b,c])} = 0</b>. The solutions are p ± qi with q > 0.`,[['p =',p],['q =',qq]],'Use the quadratic formula; the discriminant will be negative.',[[`D = ${b*b} − ${4*c} = ${b*b-4*c}`,'Discriminant.'],[`x = (${fmtNeg(-b)} ± √${b*b-4*c}) / 2`,'Formula.'],[`x = ${cs(p,qq)}, ${cs(p,-qq)}`,`√(${b*b-4*c}) = ${2*qq}i.`]]);},
 check:[q('Discriminant −20 means…',['2 real roots','1 real root','2 complex roots','no roots at all'],2,'Negative.'),q('Solutions of x² + 1 = 0?',['±1','±i','i only','none'],1,'x² = −1.'),q('If 3 + 2i is a root of a real quadratic, the other root is…',['3 − 2i','−3 + 2i','−3 − 2i','2 + 3i'],0,'Conjugate pair.')]};

TOOLS['A2-2']={title:'Complex multiplier',hint:'Multiply 2 + i by w. Set w = i to see a 90° turn.',mount:mountMul};
})();
