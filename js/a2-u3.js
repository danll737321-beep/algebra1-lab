/* Algebra 2 · Unit 3 · Polynomial factorization */
(function(){const {ps,mono,pmul,peval,sliders,chooser,areaTable,ex,q,mc,num,nz,stepper,graphLab,TOOLS,nf,sup}=A2;
function pf(n){const r=[];let d=2;n=Math.abs(n);while(n>1){while(n%d===0){r.push(d);n/=d;}d++;}return r;}
const chip=(t,on,col)=>`<span style="display:inline-block;padding:4px 9px;margin:3px;border-radius:8px;font-weight:800;border:2px solid ${on?col:'#cbd5e1'};background:${on?col+'22':'#f8fafc'};color:${on?col:'#64748b'}">${t}</span>`;

function mountMonoFactor(el){sliders(el,[{k:'c',l:'first factor coef',min:1,max:12,v:4},{k:'d',l:'first factor power',min:0,max:5,v:2}],V=>{const K=24,D=5;const ok=K%V.c===0&&V.d<=D;
  $('.mf-r',el).innerHTML=`<div class="eqline math">24x⁵ = (${mono(V.c,V.d)}) · (${ok?mono(K/V.c,D-V.d):'?'})</div>`+(ok?`<span class="good">✓ ${V.c} × ${K/V.c} = 24 and x${sup(V.d)} · x${sup(D-V.d)} = x⁵ (${V.d} + ${D-V.d} = 5).</span>`:`<span class="bad">✗ ${V.c} does not divide 24 evenly — no whole-number partner.</span>`)+`<br><span class="mute">To find the missing factor: <b>divide the coefficients</b> and <b>subtract the exponents</b>.</span>`;},`<div class="readout mf-r"></div>`).run();}
function mountGCF(el){sliders(el,[{k:'a',l:'first coef',min:2,max:60,v:18},{k:'p',l:'power',min:1,max:6,v:4},{k:'b',l:'second coef',min:2,max:60,v:24},{k:'r',l:'power',min:1,max:6,v:2}],V=>{
  const A=pf(V.a),B=pf(V.b),Bc=B.slice(),sh=[];A.forEach(x=>{const i=Bc.indexOf(x);if(i>=0){sh.push(x);Bc.splice(i,1);}});const g=sh.reduce((s,x)=>s*x,1),gp=Math.min(V.p,V.r);
  const used=B.slice();const row=(F,pw,mark)=>{const S=sh.slice();return F.map(x=>{const i=S.indexOf(x);if(i>=0){S.splice(i,1);return chip(x,true,'#059669');}return chip(x,false);}).join('')+' · '+Array.from({length:pw},(_,i)=>chip('x',i<gp,'#2563eb')).join('');};
  $('.gc-r',el).innerHTML=`<div><b>${mono(V.a,V.p)}</b> = ${row(A,V.p)}</div><div><b>${mono(V.b,V.r)}</b> = ${row(B,V.r)}</div><div class="eqline math">GCF = ${mono(g,gp)}</div><span class="mute">Highlighted = shared by both. Shared primes multiply to ${g}; the smaller power of x is x${sup(gp)}.</span>`;},`<div class="readout gc-r"></div>`).run();}
function mountTakeOut(el){stepper(el,[{t:'6x³ − 9x² + 15x',steps:[{h:'<div class="eqline math">6x³ − 9x² + 15x</div>',n:'Find the GCF of all three terms.'},{h:'<div class="eqline math">3x·2x² − 3x·3x + 3x·5</div>',n:'GCF of 6, 9, 15 is 3; smallest power of x is x¹ → GCF = 3x.'},{h:areaTable(['3x'],['2x²','−3x','5'],(i,j)=>['6x³','−9x²','15x'][j],(i,j)=>j),n:'Area model in reverse: the side is the GCF, the boxes are the original terms.'},{h:'<div class="eqline math">3x(2x² − 3x + 5)</div>',n:'Check by distributing back.'}]},
 {t:'4x⁵ + 8x³ − 2x²',steps:[{h:'<div class="eqline math">4x⁵ + 8x³ − 2x²</div>',n:'GCF of 4, 8, 2 is 2; smallest power is x².'},{h:'<div class="eqline math">2x²(2x³ + 4x − 1)</div>',n:'Divide each term by 2x². Don’t forget the −1 from −2x² ÷ 2x².'}]}]);}
function mountHigher(el){stepper(el,[{t:'Grouping: x³ + 3x² − 4x − 12',steps:[{h:'<div class="eqline math">(x³ + 3x²) + (−4x − 12)</div>',n:'Split into two pairs.'},{h:'<div class="eqline math">x²(x + 3) − 4(x + 3)</div>',n:'Factor a GCF out of each pair. The same binomial appears!'},{h:'<div class="eqline math">(x + 3)(x² − 4)</div>',n:'Factor out the common binomial.'},{h:'<div class="eqline math">(x + 3)(x − 2)(x + 2)</div>',n:'x² − 4 is a difference of squares.'}]},
 {t:'GCF first: 2x⁴ − 2x³ − 12x²',steps:[{h:'<div class="eqline math">2x²(x² − x − 6)</div>',n:'Take out the GCF 2x².'},{h:'<div class="eqline math">2x²(x − 3)(x + 2)</div>',n:'Factor the trinomial: −3 · 2 = −6, −3 + 2 = −1.'}]}]);}
function mountStructure(el){chooser(el,[
 {t:'Quadratic form',html:`<div class="eqline math">x⁴ − 13x² + 36</div><div class="readout">Let <b>u = x²</b>: u² − 13u + 36 = (u − 4)(u − 9) → (x² − 4)(x² − 9) → <b>(x − 2)(x + 2)(x − 3)(x + 3)</b>.<br><span class="mute">Look for an exponent that is double another one.</span></div>`},
 {t:'Difference of squares',html:`<div class="eqline math">x⁴ − 81</div><div class="readout">(x²)² − 9² = (x² − 9)(x² + 9) = <b>(x − 3)(x + 3)(x² + 9)</b>.<br><span class="mute">Keep going while a factor is still a difference of squares. x² + 9 does not factor over the reals.</span></div>`},
 {t:'Sum of cubes',html:`<div class="eqline math">x³ + 8</div><div class="readout">a³ + b³ = (a + b)(a² − ab + b²) with a = x, b = 2 → <b>(x + 2)(x² − 2x + 4)</b>.</div>`},
 {t:'Difference of cubes',html:`<div class="eqline math">27x³ − 1</div><div class="readout">a³ − b³ = (a − b)(a² + ab + b²) with a = 3x, b = 1 → <b>(3x − 1)(9x² + 3x + 1)</b>.<br><span class="mute">Memory trick SOAP: Same sign, Opposite sign, Always Positive.</span></div>`},
 {t:'Hidden square',html:`<div class="eqline math">4x² − 12xy + 9y²</div><div class="readout">(2x)² − 2(2x)(3y) + (3y)² = <b>(2x − 3y)²</b>. First and last terms are squares, and the middle is 2·(2x)(3y).</div>`}]);}
function mountIdentity(el){chooser(el,[
 {t:'a³ + b³',html:()=>'',after:b=>idBox(b,'(a + b)(a² − ab + b²)','a³ + b³',(a,c)=>(a+c)*(a*a-a*c+c*c),(a,c)=>a**3+c**3)},
 {t:'(a + b)²',html:()=>'',after:b=>idBox(b,'(a + b)²','a² + 2ab + b²',(a,c)=>(a+c)**2,(a,c)=>a*a+2*a*c+c*c)},
 {t:'Fake: (a + b)² = a² + b²',html:()=>'',after:b=>idBox(b,'(a + b)²','a² + b²',(a,c)=>(a+c)**2,(a,c)=>a*a+c*c)},
 {t:'(x² + y²)² = (x² − y²)² + (2xy)²',html:()=>'',after:b=>idBox(b,'(a² + b²)²','(a² − b²)² + (2ab)²',(a,c)=>(a*a+c*c)**2,(a,c)=>(a*a-c*c)**2+(2*a*c)**2)}]);
 function idBox(b,L,R,f,g){sliders(b,[{k:'a',l:'a',min:-6,max:6,v:2},{k:'b',l:'b',min:-6,max:6,v:3}],V=>{const l=f(V.a,V.b),r=g(V.a,V.b);$('.id-r',b).innerHTML=`<div class="eqline math">${L} ${l===r?'=':'≠'} ${R}</div>Left side = <b>${l}</b>, right side = <b>${r}</b> → ${l===r?'<span class="good">equal ✓</span>':'<span class="bad">NOT equal ✗ — one counterexample proves it is not an identity.</span>'}<br><span class="mute">An identity is true for <b>every</b> a and b. Testing values can disprove one; algebra (expanding) proves one.</span>`;},`<div class="readout id-r"></div>`).run();}}

L['A2-3-1']={goal:'I can write a monomial as a product of two monomial factors.',
 life:{title:'Rectangles with the same area',html:'A rectangle with area 24x⁵ could be 4x² by 6x³, or 8x by 3x⁴, or 24 by x⁵. Factoring a monomial means finding the <b>side lengths</b> that make the area — the first step toward factoring bigger polynomials.'},
 see:[{title:'Find the partner factor',hint:'Choose the first factor. Does a whole-number partner exist?',mount:mountMonoFactor}],
 vocab:[['Factor','One of the expressions multiplied to make a product.'],['Missing factor','Divide coefficients; subtract exponents.'],['Quotient rule','xᵃ ÷ xᵇ = xᵃ⁻ᵇ.']],
 examples:[ex('Example 1','30x⁴ = (5x) · (?)',[['30 ÷ 5 = 6','Divide coefficients.'],['x⁴ ÷ x = x³','Subtract exponents.'],['? = 6x³','Check: 5x · 6x³ = 30x⁴.']]),
  ex('Example 2','−12x³ = (−4x³)(?)',[['−12 ÷ −4 = 3; x³ ÷ x³ = x⁰ = 1','The partner is 3.']])],
 mistake:{bad:'20x⁶ = (4x²)(5x³)',good:'(4x²)(5x⁴)',why:'Exponents <b>add</b> when multiplying: 2 + 3 = 5 ≠ 6. Use 6 − 2 = 4.'},
 practice(){const c1=nz(-6,6),c2=rand(2,9),d1=rand(0,4),d2=rand(1,5);return num(`Complete: <b>${mono(c1*c2,d1+d2)} = (${mono(c1,d1)}) · (□ x<sup>n</sup>)</b>`,[['□ =',c2],['n =',d2]],'Divide the coefficients and subtract the exponents.',[[`${fmtNeg(c1*c2)} ÷ ${P(c1)} = ${c2}`,'Coefficient.'],[`${d1+d2} − ${d1} = ${d2}`,'Exponent.']]);},
 check:[q('18x⁵ = (3x²)(?)',['6x³','15x³','6x⁷','6x^2.5'],0,'18/3, 5 − 2.'),q('Which is a factor of 10x⁴?',['3x','5x²','10x⁵','4x'],1,'5x²·2x² = 10x⁴.'),q('x⁷ ÷ x³ = ?',['x⁴','x¹⁰','x^(7/3)','4x'],0,'7 − 3.')]};

L['A2-3-2']={goal:'I can find the greatest common factor (GCF) of monomials.',
 life:{title:'Equal party bags',html:'You have 18 cookies and 24 candies and want identical bags with nothing left over. The most bags you can make is the GCF, <b>6</b>. With variables we do the same thing, and also take the <b>smallest power</b> each term shares.'},
 see:[{title:'Shared prime factors',hint:'Change the monomials. Green and blue chips are shared.',mount:mountGCF}],
 vocab:[['GCF','The largest monomial that divides every term.'],['Prime factorization','Writing a number as a product of primes.'],['Smallest power','The GCF uses the lowest exponent of each shared variable.']],
 examples:[ex('Example 1','GCF of 18x⁴ and 24x²',[['18 = 2·3·3, 24 = 2·2·2·3','Prime factors.'],['shared: 2·3 = 6','Number part.'],['GCF = 6x²','Smaller power of x.']]),
  ex('Example 2','GCF of 10x³y, 15x²y², 25xy³',[['5','GCF of 10, 15, 25.'],['x¹ and y¹','Smallest powers.'],['GCF = 5xy','Combine.']])],
 mistake:{bad:'GCF of 12x³ and 8x⁵ is 4x⁵',good:'4x³',why:'x⁵ does not divide x³. Use the <b>smallest</b> exponent.'},
 practice(){const g=rand(2,8),a=rand(1,6),b=rand(1,6);let m,n;do{m=rand(2,9);n=rand(2,9);}while(gcd(m,n)!==1||m===n);const p=rand(1,6),r=rand(1,6);
  return num(`Find the GCF of <b>${mono(g*m,p)}</b> and <b>${mono(g*n,r)}</b>. Write it as cxⁿ.`,[['c =',g],['n =',Math.min(p,r)]],'GCF of the numbers, and the smaller power of x.',[[`GCF(${g*m}, ${g*n}) = ${g}`,'Numbers.'],[`x${sup(Math.min(p,r))}`,'Smaller power.']]);},
 check:[q('GCF of 9x² and 6x?',['3x','3x²','18x²','9x'],0,'GCF 3, power 1.'),q('GCF of 14x⁵ and 21x³?',['7x³','7x⁵','42x³','x³'],0,'GCF 7.'),q('The GCF uses…',['the largest exponent','the smallest exponent','the sum of exponents','no variables'],1,'Smallest.')]};

L['A2-3-3']={goal:'I can factor the GCF out of a polynomial.',
 life:{title:'Reverse distributing',html:'Distributing turns 3x(2x² − 3x + 5) into 6x³ − 9x² + 15x. Factoring the GCF runs that movie <b>backwards</b>. It is always the first move when factoring anything.'},
 see:[{title:'Pull out the GCF step by step',hint:'Step through each example.',mount:mountTakeOut}],
 vocab:[['Factor out','Write the polynomial as GCF × (what is left).'],['Check','Distribute back to get the original.'],['Factored completely','No factor (other than ±1) can be pulled out any more.']],
 examples:[ex('Example 1','Factor 8x⁴ − 12x³ + 4x²',[['GCF = 4x²','GCF of 8, 12, 4 and smallest power.'],['4x²(2x² − 3x + 1)','Divide each term by 4x².']]),
  ex('Example 2','Factor −5x³ + 10x',[['−5x(x² − 2)','When the leading term is negative, it is common to factor out a negative GCF.']])],
 mistake:{bad:'6x² + 3x = 3x(2x)',good:'3x(2x + 1)',why:'3x ÷ 3x = 1, not 0. Every term leaves something behind.'},
 practice(){const g=rand(2,6),d=rand(1,3);let P_;do P_=[rand(1,5),nz(-6,6),nz(-6,6)];while(P_.reduce((s,x)=>gcd(s,x))!==1);const full=A2.pmul([g,...Array(d).fill(0)],P_);
  return num(`Factor out the GCF: <b>${ps(full)}</b> = cxⁿ(ax² + bx + k), with nothing more to pull out of the parentheses.`,[['c =',g],['n =',d],['a =',P_[0]],['b =',P_[1]],['k =',P_[2]]],'GCF of the coefficients, and the smallest power of x.',[[`GCF = ${mono(g,d)}`,'Numbers and smallest power.'],[`${mono(g,d)}(${ps(P_)})`,'Divide every term by the GCF.']]);},
 check:[q('Factor 5x² + 10x',['5(x² + 2x)','5x(x + 2)','x(5x + 10)','5x(x + 10)'],1,'Completely: 5x.'),q('Factor 9x³ − 3x',['3x(3x² − 1)','3x(3x²)','3(3x³ − x)','x(9x² − 3)'],0,'GCF 3x.'),q('First step of any factoring problem?',['Quadratic formula','Look for a GCF','Graph it','Complete the square'],1,'Always GCF first.')]};

L['A2-3-4']={goal:'I can factor higher-degree polynomials using GCF, grouping, and trinomial patterns.',
 life:{title:'Breaking a big job into pieces',html:'A cubic like x³ + 3x² − 4x − 12 looks hard. Split it into <b>pairs</b>, factor each pair, and a shared piece appears. Factoring completely reveals every place the graph hits the x-axis.'},
 see:[{title:'Grouping and GCF-first',hint:'Step through both strategies.',mount:mountHigher}],
 vocab:[['Factor by grouping','Group terms in pairs, factor each, then factor out the common binomial.'],['Factor completely','Keep going until no factor can be broken down.'],['Zero ↔ factor','If (x − r) is a factor, then r is a zero.']],
 examples:[ex('Example 1','Factor x³ − 5x² + 2x − 10',[['x²(x − 5) + 2(x − 5)','Group and factor pairs.'],['(x − 5)(x² + 2)','Common binomial.']]),
  ex('Example 2','Factor 3x³ + 6x² − 24x',[['3x(x² + 2x − 8)','GCF first.'],['3x(x + 4)(x − 2)','Factor the trinomial.']])],
 mistake:{bad:'x³ + 2x² − x − 2 = x²(x + 2) − 1(x − 2)',good:'x²(x + 2) − 1(x + 2)',why:'Factoring −1 out of −x − 2 gives (x + <b>2</b>). The binomials must match.'},
 practice(){const a=nz(-6,6),b=pick([1,4,9,16,25]),sgn=Math.random()<.5;// (x+a)(x²−b) by grouping
  const co=pmul([1,a],[1,0,-b]),r=Math.sqrt(b);return num(`Factor completely: <b>${ps(co)}</b>. It equals (x + p)(x − r)(x + r) with r > 0. Find p and r.`,[['p =',a],['r =',r]],'Group: x²(x + p) − '+b+'(x + p).',[[`x²(x ${a<0?'−':'+'} ${Math.abs(a)}) − ${b}(x ${a<0?'−':'+'} ${Math.abs(a)})`,'Group.'],[`(x ${a<0?'−':'+'} ${Math.abs(a)})(x² − ${b})`,'Common binomial.'],[`(x ${a<0?'−':'+'} ${Math.abs(a)})(x − ${r})(x + ${r})`,'Difference of squares.']]);},
 check:[q('Factor x³ + x² + 4x + 4',['(x + 1)(x² + 4)','(x + 4)(x² + 1)','(x + 2)²(x + 1)','x(x² + x + 4)'],0,'x²(x+1) + 4(x+1).'),q('2x³ − 8x factored completely?',['2x(x² − 4)','2x(x − 2)(x + 2)','x(2x² − 8)','2(x³ − 4x)'],1,'Keep factoring x² − 4.'),q('If (x − 3) is a factor, the polynomial is 0 at x = …',['−3','3','0','1/3'],1,'Zero ↔ factor.')]};

L['A2-3-5']={goal:'I can spot structure (quadratic form, difference of squares, sum/difference of cubes) to factor.',
 life:{title:'Seeing the hidden pattern',html:'x⁴ − 13x² + 36 is a quadratic in disguise: replace x² with u and it becomes u² − 13u + 36. Recognizing <b>structure</b> lets you reuse patterns you already know on much bigger expressions.'},
 see:[{title:'Pattern gallery',hint:'Click each pattern.',mount:mountStructure}],
 vocab:[['Quadratic form','au² + bu + c where u is an expression such as x².'],['Sum of cubes','a³ + b³ = (a + b)(a² − ab + b²).'],['Difference of cubes','a³ − b³ = (a − b)(a² + ab + b²).']],
 examples:[ex('Example 1','Factor x⁴ − 16',[['(x²)² − 4² = (x² − 4)(x² + 4)','Difference of squares.'],['(x − 2)(x + 2)(x² + 4)','Again!']]),
  ex('Example 2','Factor 8x³ + 125',[['(2x)³ + 5³','a = 2x, b = 5.'],['(2x + 5)(4x² − 10x + 25)','Sum of cubes.']])],
 mistake:{bad:'x² + 9 = (x + 3)(x + 3)',good:'x² + 9 does not factor over the reals',why:'A <b>sum</b> of squares has no real factors: (x + 3)² = x² + 6x + 9.'},
 practice(){const t=pick(['qf','cube']);if(t==='qf'){let m,n;do{m=pick([1,4,9,16]);n=pick([1,4,9,16,25]);}while(m===n);const a=Math.min(m,n),b=Math.max(m,n);
   return num(`Factor <b>${ps([1,0,-(a+b),0,a*b])}</b> as (x² − m)(x² − n) with m &lt; n.`,[['m =',a],['n =',b]],'Let u = x². Factor u² − '+(a+b)+'u + '+(a*b)+'.',[[`u² − ${a+b}u + ${a*b} = (u − ${a})(u − ${b})`,'Quadratic in u.'],[`(x² − ${a})(x² − ${b})`,'Put x² back.']]);}
  const b=rand(1,6),s=Math.random()<.5?1:-1;return num(`Factor <b>x³ ${s>0?'+':'−'} ${b**3}</b> = (x ${s>0?'+':'−'} b)(x² + px + q).`,[['b =',b],['p =',-s*b],['q =',b*b]],s>0?'a³ + b³ = (a + b)(a² − ab + b²).':'a³ − b³ = (a − b)(a² + ab + b²).',[[`(x ${s>0?'+':'−'} ${b})(x² ${s>0?'−':'+'} ${b}x + ${b*b})`,'Cube pattern (SOAP).']]);},
 check:[q('Factor x³ − 27',['(x − 3)(x² + 3x + 9)','(x − 3)³','(x − 3)(x² − 3x + 9)','(x + 3)(x² − 3x + 9)'],0,'Difference of cubes.'),q('x⁶ − 1 is a difference of…',['squares and cubes','only cubes','fourth powers','nothing'],0,'(x³)² − 1 and (x²)³ − 1.'),q('In x⁴ + 5x² + 6, substitute u = …',['x','x²','x⁴','5x'],1,'u² + 5u + 6.')]};

L['A2-3-6']={goal:'I can prove polynomial identities and use them to factor and compute.',
 life:{title:'Pythagorean triples machine',html:'The identity (a² + b²)² = (a² − b²)² + (2ab)² generates right triangles with whole-number sides: a = 2, b = 1 gives 3, 4, 5; a = 3, b = 2 gives 5, 12, 13. An <b>identity</b> is true for every input — a reliable tool.'},
 see:[{title:'Test an identity',hint:'Pick an identity, then try different a and b. Can you break the fake one?',mount:mountIdentity}],
 vocab:[['Identity','An equation true for all values of the variables.'],['Prove','Expand/simplify one side until it matches the other.'],['Counterexample','One input that makes it false — enough to disprove.']],
 examples:[ex('Example 1 — Prove','Show (x + y)² − (x − y)² = 4xy',[['(x² + 2xy + y²) − (x² − 2xy + y²)','Expand both squares.'],['4xy','Everything else cancels. ✓']]),
  ex('Example 2 — Use it','Compute 101³ + 1 using a³ + b³',[['(101 + 1)(101² − 101 + 1)','Sum of cubes.'],['102 · 10101 = 1,030,302','Easier products.']])],
 mistake:{bad:'Checked x = 1 and x = 2, so it is an identity',good:'Prove it algebraically',why:'A few examples can’t prove “for all x.” But one counterexample <b>can</b> disprove.'},
 practice(){const a=rand(2,7),b=rand(1,a-1);return num(`Use (a² + b²)² = (a² − b²)² + (2ab)² with a = ${a}, b = ${b} to make a Pythagorean triple (legs, then hypotenuse).`,[['a² − b² =',a*a-b*b],['2ab =',2*a*b],['a² + b² =',a*a+b*b]],'Plug in a and b.',[[`${a*a-b*b}² + ${2*a*b}² = ${a*a+b*b}²`,`${(a*a-b*b)**2} + ${(2*a*b)**2} = ${(a*a+b*b)**2}.`]]);},
 check:[q('Which is an identity?',['(x + 1)² = x² + 1','(x − 1)(x + 1) = x² − 1','x² = 2x','x³ = x'],1,'True for all x.'),q('To disprove an identity you need…',['a proof','one counterexample','three examples','a graph only'],1,'One is enough.'),q('a³ − b³ = ?',['(a − b)³','(a − b)(a² + ab + b²)','(a − b)(a² − ab + b²)','(a + b)(a² − ab + b²)'],1,'Difference of cubes.')]};


TOOLS['A2-3']={title:'Pattern gallery for factoring',hint:'Click a pattern to see how its structure factors.',mount:mountStructure};
})();
