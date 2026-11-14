/* Khan Algebra 2 · Unit 1 · Polynomial arithmetic */
(function(){const {ps,mono,padd,pneg,pmul,peval,sliders,graphLab,chooser,areaTable,ex,q,mc,num,nz,stepper,TOOLS}=A2;
const NAME=n=>n===1?'monomial':n===2?'binomial':n===3?'trinomial':'polynomial with '+n+' terms';
const DEG=['constant','linear','quadratic','cubic','quartic'];

function mountBuild(el){graphLab(el,{g:{x0:-5,x1:5,y0:-8,y1:8,u:36,uy:18,lab:1,laby:2},
 params:[{k:'a',l:'x³',min:-2,max:2,v:1},{k:'b',l:'x²',min:-4,max:4,v:0},{k:'c',l:'x',min:-6,max:6,v:-3},{k:'d',l:'const',min:-6,max:6,v:1}],
 curves:V=>[{f:x=>peval([V.a,V.b,V.c,V.d],x)}],
 eq:V=>'p(x) = '+ps([V.a,V.b,V.c,V.d]),
 read:V=>{const co=[V.a,V.b,V.c,V.d],n=co.filter(Boolean).length,i=co.findIndex(Boolean),d=i<0?0:3-i;return n?`Terms: <b>${n}</b> → <b>${NAME(n)}</b>. Degree <b>${d}</b> (${DEG[d]}). Leading coefficient <b>${fmtNeg(co[i])}</b>. Constant term <b>${fmtNeg(V.d)}</b>.<br><span class="mute">The degree is the highest power with a nonzero coefficient — and it controls the overall shape.</span>`:'All coefficients are 0: the zero polynomial.';}});}

function mountAddSub(el){const P=[[2,-3,5],[1,4,-7]];
 sliders(el,[{k:'op',l:'operation (+ / −)',min:0,max:1,v:0,f:v=>v?'subtract':'add'},{k:'a',l:'2nd poly x² coef',min:-4,max:4,v:1},{k:'b',l:'x coef',min:-6,max:6,v:4},{k:'c',l:'const',min:-9,max:9,v:-7}],V=>{
  const p=P[0],r=[V.a,V.b,V.c],rr=V.op?pneg(r):r,sum=padd(p,rr);const col=(k,d)=>`<td>${k?ps([k,...Array(d).fill(0)]):'0'}</td>`;
  $('.as-t',el).innerHTML=`<table class="t" style="margin:8px auto;font-size:1.1em"><tr><th></th><th>x² terms</th><th>x terms</th><th>constants</th></tr><tr><th>p(x)</th>${col(p[0],2)}${col(p[1],1)}${col(p[2],0)}</tr><tr><th>${V.op?'− q(x)':'+ q(x)'}</th>${col(rr[0],2)}${col(rr[1],1)}${col(rr[2],0)}</tr><tr style="border-top:3px solid #374151"><th>result</th>${[0,1,2].map(i=>col(p[i]+rr[i],2-i)).join('')}</tr></table>`;
  $('.as-r',el).innerHTML=`(${ps(p)}) ${V.op?'−':'+'} (${ps(r)}) = <b>${ps(sum)}</b><br><span class="mute">${V.op?'Subtracting = adding the opposite: every sign in q(x) flips before you combine.':'Line up like terms in columns, then add each column.'}</span>`;},`<div class="as-t"></div><div class="readout as-r"></div>`).run();}

function mountMono(el){sliders(el,[{k:'k',l:'monomial coef',min:-4,max:4,v:3},{k:'d',l:'power of x',min:0,max:3,v:1}],V=>{const k=V.k||1,m=mono(k,V.d),P=[2,-5,1],terms=['2x²','−5x','1'];
  const prods=P.map((c,i)=>mono(k*c,V.d+2-i));
  $('.mo-t',el).innerHTML=areaTable([m],terms,(i,j)=>prods[j],(i,j)=>j);
  $('.mo-r',el).innerHTML=`${m}(2x² − 5x + 1) = <b>${ps(pmul([k,...Array(V.d).fill(0)],P))}</b><br><span class="mute">Distribute: multiply coefficients, <b>add exponents</b> (xᵃ · xᵇ = xᵃ⁺ᵇ). Each box is one product.</span>`;},`<div class="mo-t"></div><div class="readout mo-r"></div>`).run();}

function mountBinPoly(el){sliders(el,[{k:'a',l:'(x + a): a',min:-5,max:5,v:2},{k:'b',l:'(x² + bx + c): b',min:-5,max:5,v:-3},{k:'c',l:'c',min:-6,max:6,v:4}],V=>{
  const A=[1,V.a],B=[1,V.b,V.c],R=pmul(A,B);const rt=['x',fmtNeg(V.a)],ct=['x²',mono(V.b,1),fmtNeg(V.c)];const cell=(i,j)=>mono(A[i]*B[j],(1-i)+(2-j));
  $('.bp-t',el).innerHTML=areaTable(rt,ct,cell,(i,j)=>(1-i)+(2-j));
  $('.bp-r',el).innerHTML=`(${ps(A)})(${ps(B)}) = <b>${ps(R)}</b><br><span class="mute">2 terms × 3 terms = <b>6 boxes</b>. Boxes with the same color have the same power — combine them (they sit on diagonals).</span>`;},`<div class="bp-t"></div><div class="readout bp-r"></div>`).run();}

function mountSquare(el){sliders(el,[{k:'a',l:'a',min:1,max:6,v:4},{k:'b',l:'b',min:1,max:5,v:2},{k:'m',l:'model',min:0,max:1,v:0,f:v=>v?'(a+b)(a−b)':'(a+b)²'}],V=>{const {a,b}=V,u=26,W=(a+b)*u+60;let s='';
  if(!V.m){s=`<rect x="30" y="20" width="${a*u}" height="${a*u}" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/><rect x="${30+a*u}" y="20" width="${b*u}" height="${a*u}" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/><rect x="30" y="${20+a*u}" width="${a*u}" height="${b*u}" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/><rect x="${30+a*u}" y="${20+a*u}" width="${b*u}" height="${b*u}" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
  <text x="${30+a*u/2}" y="${25+a*u/2}" text-anchor="middle" font-weight="800">a² = ${a*a}</text><text x="${30+a*u+b*u/2}" y="${25+a*u/2}" text-anchor="middle" font-weight="800" font-size="12">ab=${a*b}</text><text x="${30+a*u/2}" y="${25+a*u+b*u/2}" text-anchor="middle" font-weight="800" font-size="12">ab = ${a*b}</text><text x="${30+a*u+b*u/2}" y="${25+a*u+b*u/2}" text-anchor="middle" font-weight="800" font-size="11">b²=${b*b}</text>`;
   $('.sq-r',el).innerHTML=`(a + b)² = a² + <b>2ab</b> + b² → ${a+b}² = ${a*a} + ${2*a*b} + ${b*b} = <b>${(a+b)**2}</b><br><span class="mute">The two green rectangles are the middle term. (a + b)² is NOT a² + b² — that would leave out the green.</span>`;}
  else{const B=Math.min(b,a);s=`<rect x="30" y="20" width="${(a+B)*u}" height="${(a-B)*u}" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/><text x="${30+(a+B)*u/2}" y="${25+(a-B)*u/2}" text-anchor="middle" font-weight="800">(a+b)(a−b) = ${(a+B)*(a-B)}</text><rect x="30" y="${40+(a-B)*u}" width="${a*u}" height="${a*u}" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2"/><rect x="${30+(a-B)*u}" y="${40+(a-B)*u+(a-B)*u}" width="${B*u}" height="${B*u}" fill="#fecaca" stroke="#b91c1c" stroke-width="2"/><text x="${30+a*u/2}" y="${55+(a-B)*u}" text-anchor="middle" font-weight="800" font-size="12">a² = ${a*a}</text><text x="${30+(a-B)*u+B*u/2}" y="${45+2*(a-B)*u+B*u/2}" text-anchor="middle" font-weight="800" font-size="11">−b²</text>`;
   $('.sq-r',el).innerHTML=`(a + b)(a − b) = a² − b² → ${a+B} × ${a-B} = ${a*a} − ${B*B} = <b>${(a+B)*(a-B)}</b><br><span class="mute">The middle terms +ab and −ab cancel, so only a² − b² is left: a big square with a small square cut out.</span>`;}
  $('.sq-g',el).innerHTML=`<svg viewBox="0 0 ${Math.max(W,(a+b)*u+60)} ${(a+b)*u*(V.m?1.6:1)+50}" class="fig" style="max-width:340px">${s}</svg>`;},`<div class="sq-g"></div><div class="readout sq-r"></div>`).run();}

L['A2-1-1']={goal:'I can name a polynomial by its degree and number of terms, and write it in standard form.',
 life:{title:'Rollercoaster profiles',html:'Ride designers describe the height of a track with formulas like <b>h(x) = 0.5x³ − 4x² + 6x + 20</b>. Each piece — a <b>term</b> — bends the track. The <b>highest power</b> tells you how many hills and valleys are possible.'},
 see:[{title:'Build a polynomial',hint:'Change each coefficient. Watch the name, degree, and graph update.',mount:mountBuild}],
 vocab:[['Polynomial','A sum of terms of the form axⁿ, where n is a whole number (0, 1, 2, …).'],['Degree','The highest exponent with a nonzero coefficient.'],['Leading coefficient','The coefficient of the highest-degree term.'],['Standard form','Terms written from highest power to lowest.']],
 examples:[ex('Example 1 — Name it','Write 7 − 2x² + 5x⁴ in standard form and name it.',[['5x⁴ − 2x² + 7','Order by power: 4, 2, 0.'],['3 terms → trinomial','Count the terms.'],['degree 4, leading coefficient 5','Highest power and its coefficient.']]),
  ex('Example 2 — Is it a polynomial?','Which are polynomials? 3x² − x, 4/x + 1, √x + 2, 0.5x³',[['3x² − x ✓, 0.5x³ ✓','Whole-number exponents.'],['4/x = 4x⁻¹ ✗','Negative exponent.'],['√x = x^(1/2) ✗','Fraction exponent.']])],
 mistake:{bad:'Degree of 3x² + 8x⁵ is 2',good:'Degree is 5',why:'The degree is the <b>highest</b> power, not the first one written. Put it in standard form first.'},
 practice(){const d=rand(2,5),k=nz(-9,9),c=nz(-9,9),e=rand(0,d-1),f=nz(-6,6);const terms=shuffle([[k,d],[c,e],...(e?[[f,0]]:[])]);const str=terms.map((t,i)=>{const s=mono(t[0],t[1]);return i?(t[0]<0?' − '+s.replace(MINUS,''):' + '+s):s;}).join('');
  if(Math.random()<.5)return num(`For <b>${str}</b>, find the degree and the leading coefficient.`,[['degree =',d],['leading coefficient =',k]],'Rewrite in standard form: highest power first.',[[ps([k,...Array(d).fill(0)])+' …','The term with the highest power.'],[`degree ${d}, leading coefficient ${fmtNeg(k)}`,'Read them off.']]);
  return mc(`How many terms does <b>${str}</b> have, and what is it called?`,`${terms.length} — ${NAME(terms.length)}`,[1,2,3,4].filter(n=>n!==terms.length).map(n=>`${n} — ${NAME(n)}`),'Count the pieces separated by + and −.');},
 check:[q('Degree of 4x³ − x⁶ + 2?',['3','4','6','2'],2,'Highest power is 6.'),q('Which is NOT a polynomial?',['x² + 1','5','3x⁻² + x','½x − 4'],2,'Negative exponents are not allowed.'),q('Leading coefficient of 2 − 3x + 5x²?',['2','−3','5','1'],2,'Standard form 5x² − 3x + 2.')]};

L['A2-1-2']={goal:'I can add and subtract polynomials by combining like terms.',
 life:{title:'Two stores, one total',html:'Store A’s profit is <b>2x² − 3x + 5</b> and store B’s is <b>x² + 4x − 7</b> (x = hundreds of items sold). The company total is their <b>sum</b>; the gap between them is their <b>difference</b>. You only combine terms that are the same kind — x² with x², x with x.'},
 see:[{title:'Line up like terms',hint:'Change the second polynomial and switch between adding and subtracting.',mount:mountAddSub}],
 vocab:[['Like terms','Terms with the same variable and the same exponent.'],['Combine','Add the coefficients; the exponent stays the same.'],['Subtracting a polynomial','Distribute the − to every term, then add.']],
 examples:[ex('Example 1 — Add','(3x² − 2x + 4) + (x² + 5x − 9)',[['(3x² + x²) + (−2x + 5x) + (4 − 9)','Group like terms.'],['4x² + 3x − 5','Add coefficients.']]),
  ex('Example 2 — Subtract','(5x³ − x + 2) − (2x³ + 3x² − 4x + 6)',[['5x³ − x + 2 − 2x³ − 3x² + 4x − 6','Flip every sign in the second polynomial.'],['3x³ − 3x² + 3x − 4','Combine like terms.']])],
 mistake:{bad:'(4x² + 3) − (x² − 5) = 3x² − 2',good:'3x² + 8',why:'The minus applies to <b>every</b> term: −(−5) = +5, so 3 + 5 = 8.'},
 practice(){const A=[nz(-6,6),rand(-9,9),rand(-9,9)],B=[nz(-6,6),rand(-9,9),rand(-9,9)];const sub=Math.random()<.5,R=sub?A.map((a,i)=>a-B[i]):A.map((a,i)=>a+B[i]);
  return num(`Simplify <b>(${ps(A)}) ${sub?'−':'+'} (${ps(B)})</b>. Enter the coefficients of the result <b>ax² + bx + c</b>.`,[['a =',R[0]],['b =',R[1]],['c =',R[2]]],sub?'Change every sign in the second polynomial, then combine.':'Add the x² coefficients, then the x coefficients, then the constants.',[[sub?`${ps(A)} + (${ps(pneg(B))})`:`${ps(A)} + ${ps(B)}`,sub?'Add the opposite.':'Group like terms.'],[ps(R),'Combine.']]);},
 check:[q('(2x² + 3x) + (x² − 7x) = ?',['3x² − 4x','3x² + 10x','2x⁴ − 4x²','x² − 4x'],0,'2 + 1 = 3; 3 − 7 = −4.'),q('(x² − 4) − (3x² − 9) = ?',['−2x² − 13','−2x² + 5','4x² − 13','2x² + 5'],1,'−4 − (−9) = 5.'),q('Which are like terms?',['3x² and 3x','5x³ and −2x³','4x and 4','x²y and xy²'],1,'Same variable, same power.')]};

L['A2-1-3']={goal:'I can multiply a monomial by a polynomial using the distributive property and exponent rules.',
 life:{title:'Scaling a garden plan',html:'A rectangular garden is <b>3x</b> meters wide and <b>(2x² − 5x + 1)</b> meters long. Its area is width × length. Multiply the width by <b>each</b> part of the length — that is the distributive property.'},
 see:[{title:'Area model for a monomial',hint:'Change the monomial. Each box is one product.',mount:mountMono}],
 vocab:[['Monomial','A single term like 3x² or −5.'],['Distributive property','a(b + c) = ab + ac — multiply every term.'],['Product rule','xᵃ · xᵇ = xᵃ⁺ᵇ: add the exponents.']],
 examples:[ex('Example 1','4x²(3x² − x + 6)',[['4x²·3x² + 4x²·(−x) + 4x²·6','Distribute to every term.'],['12x⁴ − 4x³ + 24x²','Multiply coefficients, add exponents.']]),
  ex('Example 2 — Negative monomial','−2x(x³ − 5x + 3)',[['−2x⁴ + 10x² − 6x','−2x · (−5x) = +10x².']])],
 mistake:{bad:'x² · x³ = x⁶',good:'x⁵',why:'When multiplying powers of the same base, <b>add</b> exponents: 2 + 3 = 5.'},
 practice(){const k=nz(-5,5),d=rand(1,3),P=[nz(-5,5),rand(-6,6),nz(-6,6)],R=pmul([k,...Array(d).fill(0)],P);
  const tgt=rand(0,2),pow=d+2-tgt;return num(`Multiply <b>${mono(k,d)}(${ps(P)})</b>. What is the coefficient of <b>x${A2.sup(pow)}</b>${pow===1?' (x¹)':''}?`,[[`coefficient of x${A2.sup(pow)} =`,k*P[tgt]]],`Only one product makes x${A2.sup(pow)}: ${mono(k,d)} times the x${A2.sup(2-tgt)} term.`,[[ps(R),'Distribute and add exponents.']]);},
 check:[q('3x(2x² + 5) = ?',['6x³ + 15x','6x² + 15','5x³ + 8x','6x³ + 5'],0,'3x·2x² = 6x³, 3x·5 = 15x.'),q('−x²(x − 4) = ?',['−x³ − 4x²','−x³ + 4x²','x³ − 4x²','−x² + 4'],1,'−x²·(−4) = +4x².'),q('x⁴ · x = ?',['x⁴','x⁵','x³','2x⁴'],1,'4 + 1 = 5.')]};

L['A2-1-4']={goal:'I can multiply a binomial by a polynomial and combine like terms.',
 life:{title:'Box volume',html:'A box has a base that is <b>(x + 2)</b> by <b>(x² − 3x + 4)</b> square units. To find the area of the base, every term of the first factor has to meet every term of the second. An area grid keeps track so you never miss a pair.'},
 see:[{title:'2 × 3 area grid',hint:'Change a, b, c. Same-colored boxes are like terms.',mount:mountBinPoly}],
 vocab:[['Binomial','A polynomial with two terms, like x + 2.'],['Each-to-each','Multiply every term of one factor by every term of the other.'],['Degree of a product','deg(p·q) = deg p + deg q.']],
 examples:[ex('Example 1','(x + 3)(x² − 2x + 5)',[['x³ − 2x² + 5x','x times each term.'],['+ 3x² − 6x + 15','3 times each term.'],['x³ + x² − x + 15','Combine like terms.']]),
  ex('Example 2','(2x − 1)(x² + 4)',[['2x³ + 8x − x² − 4','4 products.'],['2x³ − x² + 8x − 4','Standard form.']])],
 mistake:{bad:'(x + 2)(x² + 1) = x³ + 2',good:'x³ + 2x² + x + 2',why:'You need all <b>2 × 2 = 4</b> products: x·x², x·1, 2·x², 2·1.'},
 practice(){const a=nz(-5,5),B=[1,rand(-5,5),nz(-6,6)],R=pmul([1,a],B);const tgt=rand(1,2);
  return num(`Multiply <b>(${ps([1,a])})(${ps(B)})</b>. Enter the coefficients of <b>x³ + bx² + cx + d</b>.`,[['b =',R[1]],['c =',R[2]],['d =',R[3]]],'Build the 2 × 3 grid. Combine the boxes with x² and the boxes with x.',[[`x(${ps(B)}) + ${fmtNeg(a)}(${ps(B)})`,'Distribute each term of the binomial.'],[ps(R),'Combine like terms.']]);},
 check:[q('How many products before combining: (x − 1)(x² + x + 1)?',['3','5','6','9'],2,'2 × 3 = 6.'),q('(x − 1)(x² + x + 1) = ?',['x³ − 1','x³ + 1','x³ − x − 1','x³ + 2x² − 1'],0,'Middle terms cancel.'),q('Degree of (x² + 1)(x³ − 2)?',['3','5','6','2'],1,'2 + 3 = 5.')]};

L['A2-1-5']={goal:'I can use the patterns (a + b)², (a − b)², and (a + b)(a − b) to multiply quickly.',
 life:{title:'Quick mental math',html:'What is 51²? Think (50 + 1)² = 2500 + 100 + 1 = <b>2601</b>. And 49 × 51 = (50 − 1)(50 + 1) = 2500 − 1 = <b>2499</b>. Special-product patterns turn hard multiplication into easy steps.'},
 see:[{title:'See the patterns as areas',hint:'Change a and b. Switch between the two models.',mount:mountSquare}],
 vocab:[['Perfect square','(a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b².'],['Difference of squares','(a + b)(a − b) = a² − b².'],['Conjugates','a + b and a − b — same terms, opposite middle sign.']],
 examples:[ex('Example 1','(3x + 4)²',[['(3x)² + 2(3x)(4) + 4²','a = 3x, b = 4.'],['9x² + 24x + 16','Simplify.']]),
  ex('Example 2','(2x³ − 5)(2x³ + 5)',[['(2x³)² − 5²','Conjugates → difference of squares.'],['4x⁶ − 25','No middle term.']])],
 mistake:{bad:'(x + 5)² = x² + 25',good:'x² + 10x + 25',why:'Squaring a sum creates a middle term 2ab. Picture the two rectangles in the square.'},
 practice(){const a=rand(1,5),b=nz(-9,9),t=pick(['sq','dif']);
  if(t==='sq')return num(`Expand <b>(${a===1?'':a}x ${b<0?'−':'+'} ${Math.abs(b)})²</b> = Ax² + Bx + C.`,[['A =',a*a],['B =',2*a*b],['C =',b*b]],'Use (a + b)² = a² + 2ab + b².',[[`(${a===1?'':a}x)² + 2(${a===1?'':a}x)(${fmtNeg(b)}) + ${P(b)}²`,'Pattern.'],[ps([a*a,2*a*b,b*b]),'Simplify.']]);
  const d=rand(1,3);return num(`Expand <b>(${a===1?'':a}x${A2.sup(d>1?d:'')} + ${Math.abs(b)})(${a===1?'':a}x${A2.sup(d>1?d:'')} − ${Math.abs(b)})</b> = Ax${A2.sup(2*d)} + C.`,[['A =',a*a],['C =',-b*b]],'Conjugates: a² − b².',[[`(${a===1?'':a}x${A2.sup(d>1?d:'')})² − ${Math.abs(b)}²`,'Difference of squares.'],[`${a*a===1?'':a*a}x${A2.sup(2*d)} − ${b*b}`,'Simplify.']]);},
 check:[q('(x − 6)² = ?',['x² − 36','x² + 36','x² − 12x + 36','x² − 6x + 36'],2,'Middle term 2(x)(−6) = −12x.'),q('(x + 7)(x − 7) = ?',['x² − 49','x² + 49','x² − 14x − 49','x² − 7'],0,'Difference of squares.'),q('102 × 98 = ?',['9996','10004','9604','10196'],0,'(100+2)(100−2) = 10000 − 4.')]};

TOOLS['A2-1']={title:'Polynomial area grid',hint:'Multiply (x + a)(x² + bx + c). Same colors combine.',mount:mountBinPoly};
})();
