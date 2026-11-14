/* Pre-Calculus · Unit 5 · Complex numbers */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,graphLab,chooser,curve,hline,vline,hole,ps,pmul,cs,circleFig}=A2;const C=PC,PI=Math.PI;const {stepper}=KA;const M=C.mat;
function mDeMoivre(el){sliders(el,[{k:'r',l:'modulus r',min:0.6,max:1.4,step:.1,v:1.1},{k:'t',l:'argument θ (°)',min:0,max:120,step:5,v:30},{k:'n',l:'power n',min:1,max:6,v:3}],V=>{const R=Math.max(3,V.r**V.n+0.3);const G=grid({x0:-Math.ceil(R),x1:Math.ceil(R),y0:-Math.ceil(R),y1:Math.ceil(R),u:Math.floor(150/Math.ceil(R)),lab:1,laby:1});const t=C.rad(V.t);let s='';
  for(let k=1;k<=V.n;k++){const m=V.r**k,a=k*t;s+=C.arrow(G,[0,0],[m*Math.cos(a),m*Math.sin(a)],k===V.n?'#e11d48':'#93c5fd',k===V.n?3.5:2,k===1?'z':k===V.n?'zⁿ':'');}
  const m=V.r**V.n,a=V.n*V.t;$('.dm-g',el).innerHTML=G.svg(s);
  $('.dm-r',el).innerHTML=`z = ${nf(V.r)}(cos ${V.t}° + i sin ${V.t}°) = ${cs(V.r*Math.cos(t),V.r*Math.sin(t))}<br>De Moivre: z${A2.sup(V.n)} = ${nf(V.r)}${A2.sup(V.n)}(cos ${a}° + i sin ${a}°) = <b>${nf(m)} cis ${a}°</b> = ${cs(m*Math.cos(C.rad(a)),m*Math.sin(C.rad(a)))}<br><span class="mute">Multiplying complex numbers <b>multiplies</b> the moduli and <b>adds</b> the angles — so each power turns by θ.</span>`;},`<div class="dm-g"></div><div class="readout dm-r"></div>`).run();}
const cdiv=(p,q)=>{const d=q[0]*q[0]+q[1]*q[1];return [(p[0]*q[0]+p[1]*q[1])/d,(p[1]*q[0]-p[0]*q[1])/d];};
const ang=(a,b)=>(C.deg(Math.atan2(b,a))+360)%360;
const cis=(r,t)=>`${nf(r)} cis ${nf(t)}°`;
const P2=v=>v<0?'('+fmtNeg(v)+')':String(v);
function mDist(el){sliders(el,[{k:'a',l:'z: real',min:-5,max:5,v:-3},{k:'b',l:'z: imag',min:-5,max:5,v:1},{k:'c',l:'w: real',min:-5,max:5,v:3},{k:'d',l:'w: imag',min:-5,max:5,v:4}],V=>{const mid=[(V.a+V.c)/2,(V.b+V.d)/2],D=Math.hypot(V.c-V.a,V.d-V.b);
  const z=[V.a,V.b],w=[V.c,V.d];z.col='#2563eb';z.l='z';w.col='#059669';w.l='w';const m=mid.slice();m.col='#e11d48';m.l='midpoint';
  $('.ds-g',el).innerHTML=A2.cplane([z,w,m],{R:6,u:26,vec:[{from:z,to:w,col:'#f59e0b',w:3},{from:z,to:[V.c,V.b],col:'#cbd5e1',dash:1},{from:[V.c,V.b],to:w,col:'#cbd5e1',dash:1}]});
  $('.ds-r',el).innerHTML=`z = ${cs(V.a,V.b)}, w = ${cs(V.c,V.d)}<br>Distance = |w − z| = |${cs(V.c-V.a,V.d-V.b)}| = √(${(V.c-V.a)**2} + ${(V.d-V.b)**2}) = <b>${nf(D)}</b><br>Midpoint = (z + w)/2 = <b>${cs(mid[0],mid[1])}</b> <span class="mute">— average the real parts and the imaginary parts, exactly like points (x, y).</span>`;},`<div class="ds-g"></div><div class="readout ds-r"></div>`).run();}
function mConj(el){sliders(el,[{k:'a',l:'real part a',min:-5,max:5,v:3},{k:'b',l:'imag part b',min:-5,max:5,v:2}],V=>{const z=[V.a,V.b],zb=[V.a,-V.b];z.col='#2563eb';z.l='z';zb.col='#e11d48';zb.l='z̄';const p=V.a*V.a+V.b*V.b;
  $('.cj-g',el).innerHTML=A2.cplane([z,zb],{R:6,u:26,vec:[{to:z,col:'#93c5fd'},{to:zb,col:'#fda4af'},{from:z,to:zb,col:'#cbd5e1',dash:1}]});
  $('.cj-r',el).innerHTML=`z = ${cs(V.a,V.b)} → conjugate z̄ = <b>${cs(V.a,-V.b)}</b> <span class="mute">(mirror across the real axis)</span><br>z + z̄ = ${fmtNeg(2*V.a)} (real) · z·z̄ = a² + b² = ${V.a*V.a} + ${V.b*V.b} = <b>${p}</b> (real, = |z|²)<br><span class="mute">That is why dividing works: multiply top and bottom by the conjugate, and the denominator becomes a real number.</span>`;},`<div class="cj-g"></div><div class="readout cj-r"></div>`).run();}
function mModArg(el){sliders(el,[{k:'a',l:'real part a',min:-5,max:5,step:.5,v:-2},{k:'b',l:'imag part b',min:-5,max:5,step:.5,v:3}],V=>{const r=Math.hypot(V.a,V.b),t=ang(V.a,V.b),ref=C.deg(Math.atan(Math.abs(V.b/(V.a||1e-9))));const z=[V.a,V.b];z.col='#e11d48';z.l='z';
  const Q=!r?'':V.a>0&&V.b>=0?'I':V.a<=0&&V.b>0?'II':V.a<0&&V.b<=0?'III':'IV';
  $('.ma-g',el).innerHTML=A2.cplane([z],{R:6,u:26,vec:[{to:z,col:'#2563eb',w:3},{from:[V.a,0],to:z,col:'#f59e0b',dash:1}]});
  $('.ma-r',el).innerHTML=r?`z = ${cs(V.a,V.b)}<br>Modulus |z| = √(${nf(V.a)}² + ${nf(V.b)}²) = <b>${nf(r)}</b> (length of the blue arrow)<br>Reference angle tan⁻¹|b/a| = ${nf(V.a?ref:90)}°; quadrant ${Q} → argument <b>θ = ${nf(t)}°</b> = ${C.piStr(C.rad(t))} rad`:'z = 0 has modulus 0 and no defined argument.';},`<div class="ma-g"></div><div class="readout ma-r"></div>`).run();}
function mMul(el){sliders(el,[{k:'r1',l:'|z|',min:0.5,max:2.5,step:.25,v:1.5},{k:'t1',l:'arg z (°)',min:0,max:180,step:15,v:30},{k:'r2',l:'|w|',min:0.5,max:2.5,step:.25,v:2},{k:'t2',l:'arg w (°)',min:0,max:180,step:15,v:60}],V=>{const R=Math.ceil(Math.max(V.r1*V.r2,V.r1,V.r2,2)+0.2);const G=grid({x0:-R,x1:R,y0:-R,y1:R,u:Math.floor(150/R),lab:1,laby:1});const pt=(r,t)=>[r*Math.cos(C.rad(t)),r*Math.sin(C.rad(t))];
  const r=V.r1*V.r2,t=V.t1+V.t2;let s=C.arrow(G,[0,0],pt(V.r1,V.t1),'#2563eb',3,'z')+C.arrow(G,[0,0],pt(V.r2,V.t2),'#059669',3,'w')+C.arrow(G,[0,0],pt(r,t),'#e11d48',3.5,'zw');
  $('.mu-g',el).innerHTML=G.svg(s);const p=pt(r,t);
  $('.mu-r',el).innerHTML=`z = ${cis(V.r1,V.t1)}, w = ${cis(V.r2,V.t2)}<br>zw = (${nf(V.r1)}·${nf(V.r2)}) cis (${V.t1}° + ${V.t2}°) = <b>${cis(r,t)}</b> ≈ ${cs(p[0],p[1])}<br>z/w = (${nf(V.r1)}/${nf(V.r2)}) cis (${V.t1}° − ${V.t2}°) = <b>${cis(V.r1/V.r2,V.t1-V.t2)}</b><br><span class="mute">Multiply the lengths, add the angles. Dividing: divide the lengths, subtract the angles.</span>`;},`<div class="mu-g"></div><div class="readout mu-r"></div>`).run();}
function mRoots(el){sliders(el,[{k:'R',l:'|w|',min:1,max:16,v:8},{k:'p',l:'arg w (°)',min:0,max:360,step:15,v:90},{k:'n',l:'n (which root)',min:2,max:8,v:3}],V=>{const m=V.R**(1/V.n);const G=grid({x0:-3,x1:3,y0:-3,y1:3,u:50,lab:1,laby:1});let s=`<circle cx="${G.X(0)}" cy="${G.Y(0)}" r="${m*50}" fill="none" stroke="#c4b5fd" stroke-width="2" stroke-dasharray="5 4"/>`;
  const pts=[];for(let k=0;k<V.n;k++){const a=C.rad((V.p+360*k)/V.n);pts.push([m*Math.cos(a),m*Math.sin(a)]);}
  s+=`<polygon points="${pts.map(p=>G.X(p[0])+','+G.Y(p[1])).join(' ')}" fill="rgba(147,51,234,.08)" stroke="#9333ea" stroke-width="2"/>`+pts.map((p,k)=>gdot(G,p[0],p[1],k?'#2563eb':'#e11d48',7,'z'+k)).join('');
  $('.rt-g',el).innerHTML=G.svg(s);
  $('.rt-r',el).innerHTML=`The ${V.n} roots of z${A2.sup(V.n)} = ${cis(V.R,V.p)}:<br>modulus ⁿ√${V.R} = <b>${nf(m)}</b> · angles (${V.p}° + 360°k)/${V.n} = <b>${Array.from({length:V.n},(_,k)=>nf((V.p+360*k)/V.n)+'°').join(', ')}</b><br><span class="mute">They sit on one circle, ${nf(360/V.n)}° apart — the corners of a regular ${V.n}-gon.</span>`;},`<div class="rt-g"></div><div class="readout rt-r"></div>`).run();}

L['PC-5-1']={goal:'I can find the distance and the midpoint between two complex numbers in the complex plane.',
 life:{title:'Map coordinates',html:'Engineers who design antennas and circuits plot complex numbers as points. How far apart two signals are is just a distance on that plane — the same Pythagorean idea you used for points (x, y).'},
 see:[{title:'Two points in the complex plane',hint:'Move z and w. Watch the distance and midpoint.',mount:mDist}],
 vocab:[['Complex plane','Horizontal axis = real part, vertical axis = imaginary part.'],['|z|','Distance from z to 0: √(a² + b²).'],['Distance','|w − z| = √((c − a)² + (d − b)²).'],['Midpoint','(z + w)/2.']],
 examples:[ex('Example 1','Distance between 2 + 3i and −1 − i?',[['w − z = −3 − 4i','Subtract.'],['|−3 − 4i| = √(9 + 16) = 5','Modulus.']]),
  ex('Example 2','Midpoint of 4 − 2i and −6 + 8i?',[['(4 + (−6))/2 = −1','Real parts.'],['(−2 + 8)/2 = 3','Imaginary parts.'],['−1 + 3i','']])],
 mistake:{bad:'distance between 3 + 4i and 0 is 3 + 4 = 7',good:'√(9 + 16) = 5',why:'The real and imaginary directions are perpendicular. Use the Pythagorean theorem, not addition.'},
 practice(){const a=rand(-7,7),b=rand(-7,7);let c,d;do{c=rand(-7,7);d=rand(-7,7);}while(c===a&&d===b);const D=Math.hypot(c-a,d-b);
  return num(`z = ${cs(a,b)}, w = ${cs(c,d)}. Find the distance |w − z| (2 decimals) and the midpoint.`,[['distance ≈',+D.toFixed(2),0.02],['midpoint real =',(a+c)/2],['midpoint imag =',(b+d)/2]],'Distance: subtract, then modulus. Midpoint: average each part.',[[`w − z = ${cs(c-a,d-b)}`,''],[`√(${(c-a)**2} + ${(d-b)**2}) ≈ ${D.toFixed(2)}`,''],[`midpoint = ${cs((a+c)/2,(b+d)/2)}`,'']]);},
 check:[q('|6 − 8i| =',['14','10','2','−2'],1,''),q('Midpoint of 2i and 4?',['2 + i','4 + 2i','1 + 2i','3i'],0,''),q('Distance between z and w equals…',['|z| + |w|','|w − z|','|w|·|z|','w − z'],1,'')]};

L['PC-5-2']={goal:'I can use complex conjugates to divide complex numbers and write the answer as a + bi.',
 life:{title:'Clearing the denominator',html:'Just as you rationalize 1/√2 by multiplying by √2/√2, you “realize” 1/(3 + 2i) by multiplying by its <b>conjugate</b> 3 − 2i. The trick works because z·z̄ is always a real number.'},
 see:[{title:'Conjugate mirror',hint:'Move z. Its conjugate is the mirror image across the real axis.',mount:mConj}],
 vocab:[['Conjugate','The conjugate of a + bi is a − bi.'],['z·z̄','(a + bi)(a − bi) = a² + b² = |z|², always real.'],['Dividing','z/w = (z·w̄)/(w·w̄): multiply top and bottom by w̄.']],
 examples:[ex('Example','Write (5 + i)/(2 − 3i) as a + bi.',[['× (2 + 3i)/(2 + 3i)','Multiply by the conjugate of the bottom.'],['top: (5 + i)(2 + 3i) = 10 + 15i + 2i + 3i² = 7 + 17i','i² = −1.'],['bottom: 4 + 9 = 13','a² + b².'],['= 7/13 + (17/13)i','']])],
 mistake:{bad:'(4 + 2i)/(1 + i) = 4/1 + 2i/i = 4 + 2',good:'multiply by (1 − i)/(1 − i): = 3 − i',why:'You cannot split a fraction across a sum in the denominator.'},
 practice(){const p=[rand(-6,6),rand(-6,6)],w=[nz(-4,4),nz(-4,4)];const r=cdiv(p,w),d=w[0]**2+w[1]**2;const top=[p[0]*w[0]+p[1]*w[1],p[1]*w[0]-p[0]*w[1]];
  return num(`Write (${cs(p[0],p[1])}) / (${cs(w[0],w[1])}) in the form a + bi (2 decimals).`,[['a ≈',+r[0].toFixed(2),0.011],['b ≈',+r[1].toFixed(2),0.011]],`Multiply top and bottom by ${cs(w[0],-w[1])}.`,[[`top: (${cs(p[0],p[1])})(${cs(w[0],-w[1])}) = ${cs(top[0],top[1])}`,''],[`bottom: ${w[0]**2} + ${w[1]**2} = ${d}`,''],[`= ${frac(top[0],d)} + (${frac(top[1],d)})i ≈ ${cs(+r[0].toFixed(2),+r[1].toFixed(2))}`,'']]);},
 check:[q('The conjugate of −2 + 7i is…',['2 − 7i','−2 − 7i','2 + 7i','7 − 2i'],1,''),q('(3 + 4i)(3 − 4i) =',['9 − 16i','25','−7','9 + 16'],1,''),q('1/i =',['i','−i','1','−1'],1,'Multiply by −i/−i.')]};

L['PC-5-3']={goal:'I can find the modulus and argument of a complex number, using the quadrant to get the angle right.',
 life:{title:'Distance and bearing',html:'A pilot describes a location by how far and in which direction. A complex number can be described the same way: its <b>modulus</b> (how far from 0) and its <b>argument</b> (which direction).'},
 see:[{title:'Length and angle',hint:'Move z into each quadrant. Watch how the argument is adjusted.',mount:mModArg}],
 vocab:[['Modulus |z|','r = √(a² + b²).'],['Argument arg z','The angle θ from the positive real axis to z.'],['Reference angle','tan⁻¹|b/a|, then adjust by quadrant.'],['Quadrant rules','II: 180° − ref · III: 180° + ref · IV: 360° − ref.']],
 examples:[ex('Example 1','Modulus and argument of −1 + √3 i.',[['r = √(1 + 3) = 2',''],['ref = tan⁻¹(√3) = 60°',''],['quadrant II → θ = 120°','']]),
  ex('Example 2','Argument of −4i.',[['on the negative imaginary axis',''],['θ = 270° (or −90°)','No tangent needed.']])],
 mistake:{bad:'arg(−3 − 3i) = tan⁻¹(1) = 45°',good:'225°',why:'−3 − 3i is in quadrant III. tan⁻¹ only knows the ratio, not the signs.'},
 practice(){let a,b;do{a=rand(-6,6);b=rand(-6,6);}while(!a&&!b);const r=Math.hypot(a,b),t=ang(a,b);
  return num(`Find the modulus (2 decimals) and the argument in degrees (0 ≤ θ < 360, 1 decimal) of ${cs(a,b)}.`,[['|z| ≈',+r.toFixed(2),0.02],['θ ≈',+t.toFixed(1),0.06]],'r = √(a² + b²). Find the reference angle, then use the quadrant.',[[`r = √(${a*a} + ${b*b}) ≈ ${r.toFixed(2)}`,''],[`θ ≈ ${t.toFixed(1)}°`,'Quadrant from the signs of a and b.']]);},
 check:[q('|−5| as a complex number =',['−5','5','25','0'],1,''),q('arg(2i) =',['0°','90°','180°','270°'],1,''),q('arg(−1 − i) =',['45°','135°','225°','315°'],2,'')]};

L['PC-5-4']={goal:'I can write a complex number in polar form r(cos θ + i sin θ) and multiply or divide complex numbers in polar form.',
 life:{title:'Rotate and stretch',html:'Multiplying by i turns every point 90°. Multiplying by 2 cis 30° turns 30° and doubles the distance. In polar form, multiplication is just <b>stretch and turn</b> — that is how graphics software rotates images.'},
 see:[{title:'Multiply = stretch + turn',hint:'Change both numbers. The red arrow is the product.',mount:mMul}],
 vocab:[['Polar form','z = r(cos θ + i sin θ) = r cis θ.'],['Back to a + bi','a = r cos θ, b = r sin θ.'],['Multiply','(r₁ cis θ₁)(r₂ cis θ₂) = r₁r₂ cis(θ₁ + θ₂).'],['Divide','(r₁ cis θ₁)/(r₂ cis θ₂) = (r₁/r₂) cis(θ₁ − θ₂).']],
 examples:[ex('Example 1','Write 4 cis 150° as a + bi.',[['a = 4 cos 150° = −2√3',''],['b = 4 sin 150° = 2',''],['−2√3 + 2i ≈ −3.46 + 2i','']]),
  ex('Example 2','(3 cis 40°)(2 cis 110°) and (3 cis 40°)/(2 cis 110°).',[['product: 6 cis 150°','Multiply r, add θ.'],['quotient: 1.5 cis(−70°) = 1.5 cis 290°','Divide r, subtract θ.']])],
 mistake:{bad:'(2 cis 30°)(3 cis 60°) = 6 cis 1800°',good:'6 cis 90°',why:'Angles <b>add</b> when you multiply. Only the moduli are multiplied.'},
 practice(){const r1=rand(1,6),r2=rand(1,6),t1=15*rand(0,23),t2=15*rand(0,23);const div=Math.random()<0.35;const r=div?r1/r2:r1*r2,t=(((div?t1-t2:t1+t2)%360)+360)%360;
  return num(`Compute (${r1} cis ${t1}°) ${div?'÷':'×'} (${r2} cis ${t2}°). Give r${div?' (2 decimals)':''} and θ with 0 ≤ θ < 360.`,[['r =',+r.toFixed(2),0.011],['θ =',t]],div?'Divide the moduli, subtract the angles.':'Multiply the moduli, add the angles.',[[`r = ${r1} ${div?'÷':'×'} ${r2} = ${nf(r)}`,''],[`θ = ${t1}° ${div?'−':'+'} ${t2}° → ${t}°`,'Adjust into 0°–360°.']]);},
 check:[q('2 cis 90° in a + bi form is…',['2','2i','−2','−2i'],1,''),q('(5 cis 20°)(2 cis 25°) =',['7 cis 45°','10 cis 45°','10 cis 500°','10 cis 5°'],1,''),q('Multiplying z by i…',['doubles it','rotates it 90°','reflects it','does nothing'],1,'i = 1 cis 90°.')]};

L['PC-5-5']={goal:'I can raise a complex number to a power with De Moivre’s theorem.',
 life:{title:'Spirals',html:'Keep multiplying by the same complex number and the points spiral: each step turns by the same angle and stretches by the same factor. De Moivre’s theorem jumps straight to the n-th step.'},
 see:[{title:'Powers of z',hint:'Change r, θ, and n. Each power turns by θ.',mount:mDeMoivre}],
 vocab:[["De Moivre's theorem",'(r cis θ)ⁿ = rⁿ cis(nθ).'],['Spiral','|r| > 1 spirals out, |r| < 1 spirals in, |r| = 1 stays on the unit circle.'],['Strategy','Convert to polar, apply the theorem, convert back.']],
 examples:[ex('Example 1','Compute (1 + i)⁸.',[['1 + i = √2 cis 45°','Polar form.'],['(√2)⁸ cis 360° = 16 cis 360°','De Moivre.'],['= 16','cis 360° = 1.']]),
  ex('Example 2','Compute (−√3 + i)⁶.',[['= 2 cis 150°',''],['2⁶ cis 900° = 64 cis 180°','900° − 720° = 180°.'],['= −64','']])],
 mistake:{bad:'(r cis θ)ⁿ = rⁿ cis θ',good:'rⁿ cis(nθ)',why:'Each multiplication adds θ again, so the angle is multiplied by n too.'},
 practice(){const T=pick([[1,1,45],[1,-1,315],[-1,1,135],[0,2,90],[2,0,0],[1,0,0]].concat([[Math.sqrt(3),1,30],[1,Math.sqrt(3),60],[-1,-1,225]]));const n=rand(2,8);const r=Math.hypot(T[0],T[1]),R=r**n,t=(T[2]*n)%360;
  const lab=Math.abs(T[0]-Math.sqrt(3))<1e-9?'√3 + i':Math.abs(T[1]-Math.sqrt(3))<1e-9?'1 + √3i':cs(T[0],T[1]);
  return num(`Use De Moivre’s theorem to compute (${lab})${A2.sup(n)}. Give the modulus and the angle θ (0 ≤ θ < 360).`,[['rⁿ =',+R.toFixed(2),0.02],['θ =',t]],'Write it in polar form first: find r and θ.',[[`${lab} = ${nf(r)} cis ${T[2]}°`,'Polar form.'],[`(${nf(r)})${A2.sup(n)} cis ${T[2]*n}° = ${nf(R)} cis ${t}°`,'Multiply the angle by n, reduce mod 360°.']]);},
 check:[q('(2 cis 30°)³ =',['6 cis 90°','8 cis 90°','8 cis 30°','2 cis 90°'],1,''),q('(cis 45°)⁴ =',['cis 45°','−1','4','i'],1,'cis 180° = −1.'),q('i¹⁰ =',['1','i','−1','−i'],2,'cis 900° = cis 180°.')]};

L['PC-5-6']={goal:'I can find all n complex n-th roots of a number and see them as a regular polygon.',
 life:{title:'Equal slices',html:'z³ = 8 has the obvious answer 2 — but over the complex numbers there are <b>three</b> answers, spaced evenly around a circle like slices of a pizza. Every n-th root problem has exactly n answers.'},
 see:[{title:'Roots make a polygon',hint:'Change w and n. All roots sit on one circle.',mount:mRoots}],
 vocab:[['n-th root','z with zⁿ = w.'],['Root formula','If w = R cis φ: z_k = ⁿ√R cis((φ + 360°k)/n), k = 0, 1, …, n − 1.'],['Equal spacing','Consecutive roots differ by 360°/n.'],['Roots of unity','The n solutions of zⁿ = 1.']],
 examples:[ex('Example','Solve z³ = 8i.',[['8i = 8 cis 90°','Polar form.'],['modulus ∛8 = 2','Same for every root.'],['angles 30°, 150°, 270°','(90° + 360°k)/3.'],['√3 + i, −√3 + i, −2i','Back to a + bi.']])],
 mistake:{bad:'the cube roots of 8 are just 2',good:'2, 2 cis 120°, 2 cis 240°',why:'An n-th degree equation has n complex solutions (Fundamental Theorem of Algebra). Keep adding 360°/n.'},
 practice(){const n=rand(2,6),m=rand(1,3),R=m**n,phi=pick([0,60,90,120,180,240,270]);const k=rand(0,n-1);const t=(phi+360*k)/n;
  return num(`Solve z${A2.sup(n)} = ${R} cis ${phi}°. Give the modulus of every root and the angle of root z<sub>${k}</sub> (k = ${k}).`,[['modulus =',m],['θ =',+t.toFixed(2),0.011]],'Modulus: n-th root of R. Angle: (φ + 360°k)/n.',[[`ⁿ√${R} = ${m}`,`n = ${n}.`],[`(${phi}° + 360°·${k})/${n} = ${nf(t)}°`,'']]);},
 check:[q('How many complex 5th roots does 32 have?',['1','2','5','32'],2,''),q('The 4th roots of 1 are…',['1 only','±1','±1, ±i','1, i'],2,''),q('Cube roots of w are spaced…',['90° apart','120° apart','60° apart','180° apart'],1,'')]};

TOOLS['PC-5']={title:'Powers of z',hint:'Each power stretches by r and turns by θ.',mount:mDeMoivre};
})();
