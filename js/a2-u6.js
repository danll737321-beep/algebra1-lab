/* Algebra 2 · Unit 6 · Rational exponents & radicals */
(function(){const {sliders,graphLab,chooser,ex,q,mc,num,nz,curve,stepper,TOOLS,nf,sup,fr}=A2;
const E=(m,n)=>`<sup>${n===1?fmtNeg(m):fr(m,n)}</sup>`;
const root=(n,x)=>n===2?`√${x}`:`${sup(n)}√${x}`;
const BASES={2:[4,9,16,25,36,49,64,81,100],3:[8,27,64,125,216,1000],4:[16,81,256,625],5:[32,243]};
function mountRat(el){let n=3;sliders(el,[{k:'n',l:'root n (denominator)',min:2,max:4,v:3},{k:'b',l:'base choice',min:0,max:3,v:0},{k:'m',l:'power m (numerator)',min:1,max:4,v:2}],V=>{const n=V.n,b=BASES[n][V.b],r=Math.round(b**(1/n)),val=r**V.m;
  $('.ra-r',el).innerHTML=`<div class="eqline math">${b}${E(V.m,n)} = (${root(n,b)})${sup(V.m)} = ${r}${sup(V.m)} = <b>${val}</b></div><div class="row" style="justify-content:center">${Array.from({length:V.m},()=>`<span style="padding:8px 14px;border:2px solid #c026d3;border-radius:10px;font-weight:800;color:#c026d3">${r}</span>`).join('<b style="align-self:center">×</b>')}</div><span class="mute">The <b>denominator</b> is the root (${n === 2 ? 'square' : n === 3 ? 'cube' : 'fourth'} root of ${b} is ${r}); the <b>numerator</b> is the power. Doing the root first keeps numbers small.</span>`;},`<div class="readout ra-r"></div>`).run();}
function mountProps(el){chooser(el,[
 {t:'Product: add',html:`<div class="eqline math">x<sup>1/2</sup> · x<sup>1/3</sup> = x<sup>1/2 + 1/3</sup> = x<sup>5/6</sup></div><div class="readout">Same base, multiply → <b>add</b> exponents. Use a common denominator: 3/6 + 2/6 = 5/6.</div>`},
 {t:'Quotient: subtract',html:`<div class="eqline math">x<sup>3/4</sup> ÷ x<sup>1/4</sup> = x<sup>3/4 − 1/4</sup> = x<sup>1/2</sup> = √x</div><div class="readout">Same base, divide → <b>subtract</b> exponents.</div>`},
 {t:'Power of a power: multiply',html:`<div class="eqline math">(x<sup>2/3</sup>)<sup>6</sup> = x<sup>(2/3)·6</sup> = x⁴</div><div class="readout">Raise a power to a power → <b>multiply</b> exponents.</div>`},
 {t:'Power of a product',html:`<div class="eqline math">(27x⁶)<sup>1/3</sup> = 27<sup>1/3</sup> · x<sup>6/3</sup> = 3x²</div><div class="readout">The exponent applies to <b>every</b> factor inside.</div>`},
 {t:'Negative exponent',html:`<div class="eqline math">x<sup>−1/2</sup> = 1 / x<sup>1/2</sup> = 1/√x</div><div class="readout">Negative means <b>reciprocal</b> — it never makes the number negative.</div>`}]);}
function mountEval(el){stepper(el,[{t:'8^(2/3)',steps:[{h:'<div class="eqline math">8<sup>2/3</sup></div>',n:'Denominator 3 → cube root; numerator 2 → square.'},{h:'<div class="eqline math">(∛8)² = 2²</div>',n:'∛8 = 2 because 2³ = 8.'},{h:'<div class="eqline math">= 4</div>',n:'Done.'}]},
 {t:'16^(−3/4)',steps:[{h:'<div class="eqline math">16<sup>−3/4</sup> = 1 / 16<sup>3/4</sup></div>',n:'Negative exponent → reciprocal.'},{h:'<div class="eqline math">1 / (⁴√16)³ = 1 / 2³</div>',n:'⁴√16 = 2.'},{h:'<div class="eqline math">= 1/8</div>',n:'Done.'}]},
 {t:'(1/25)^(−1/2)',steps:[{h:'<div class="eqline math">(1/25)<sup>−1/2</sup> = 25<sup>1/2</sup></div>',n:'Flip the fraction to make the exponent positive.'},{h:'<div class="eqline math">= √25 = 5</div>',n:'Done.'}]},
 {t:'√12 · √3',steps:[{h:'<div class="eqline math">√12 · √3 = √36</div>',n:'√a·√b = √(ab) when a, b ≥ 0.'},{h:'<div class="eqline math">= 6</div>',n:'Perfect square.'}]}]);}
function mountEquiv(el){graphLab(el,{g:{x0:-2,x1:3,y0:0,y1:20,u:80,uy:15,lab:1,laby:4},params:[{k:'c',l:'compare 2^(3x) with b^x: b =',min:2,max:10,v:6}],
 curves:V=>[{f:x=>2**(3*x),col:'#2563eb',w:6},{f:x=>V.c**x,col:'#f59e0b',w:3}],eq:V=>`y = 2<sup>3x</sup> &nbsp; vs. &nbsp; y = ${V.c}<sup>x</sup>`,
 read:V=>V.c===8?'<span class="good">The curves match exactly!</span> 2<sup>3x</sup> = (2³)<sup>x</sup> = 8<sup>x</sup>. Equivalent forms make the same graph.':`Not the same graph. Hint: 2<sup>3x</sup> = (2³)<sup>x</sup>. Which base is that?`});}
function mountSolve(el){chooser(el,[
 {t:'4ˣ = 32',html:`<div class="eqline math">(2²)<sup>x</sup> = 2⁵ → 2<sup>2x</sup> = 2⁵ → 2x = 5 → <b>x = 5/2</b></div><div class="readout">Rewrite both sides with the <b>same base</b> (2), then set the exponents equal.</div>`},
 {t:'9^(x+1) = 27',html:`<div class="eqline math">3<sup>2(x+1)</sup> = 3³ → 2x + 2 = 3 → <b>x = 1/2</b></div><div class="readout">Base 3 works for both 9 and 27.</div>`},
 {t:'(1/8)ˣ = 16',html:`<div class="eqline math">2<sup>−3x</sup> = 2⁴ → −3x = 4 → <b>x = −4/3</b></div><div class="readout">1/8 = 2<sup>−3</sup>.</div>`},
 {t:'x^(3/2) = 27',html:`<div class="eqline math">(x<sup>3/2</sup>)<sup>2/3</sup> = 27<sup>2/3</sup> → <b>x = 9</b></div><div class="readout">Variable in the base: raise both sides to the <b>reciprocal</b> exponent. Check: 9<sup>3/2</sup> = (√9)³ = 27 ✓.</div>`}]);}

L['A2-6-1']={goal:'I can rewrite between radical form and rational-exponent form.',
 life:{title:'Music and fractional powers',html:'On a piano, each key’s frequency is the one below times 2<sup>1/12</sup> — the 12th root of 2. Twelve steps multiply by (2<sup>1/12</sup>)¹² = 2, one octave. <b>Fractional exponents</b> are roots in disguise.'},
 see:[{title:'Root, then power',hint:'Change the root n, the base, and the power m.',mount:mountRat}],
 vocab:[['x^(1/n)','The nth root of x: ⁿ√x.'],['x^(m/n)','(ⁿ√x)ᵐ = ⁿ√(xᵐ).'],['Index','The small n in ⁿ√x (2 for square root).']],
 examples:[ex('Example 1','Write ⁵√(x³) with a rational exponent.',[['x<sup>3/5</sup>','Power over root.']]),
  ex('Example 2','Write y<sup>3/4</sup> in radical form.',[['⁴√(y³) or (⁴√y)³','Denominator = index.']])],
 mistake:{bad:'x<sup>2/3</sup> = ²√(x³)',good:'∛(x²)',why:'The <b>denominator</b> is the root; the numerator is the power. “Power over root.”'},
 practice(){const n=pick([2,3,4]),b=pick(BASES[n].slice(0,4)),m=rand(1,3);if(Math.random()<.5)return num(`Evaluate <b>${b}${E(m,n)}</b>.`,[['value =',Math.round(b**(1/n))**m]],`Take the ${n===2?'square':n===3?'cube':'fourth'} root first, then raise to the ${m}.`,[[`(${root(n,b)})${sup(m)} = ${Math.round(b**(1/n))}${sup(m)}`,'Root first.'],[`= ${Math.round(b**(1/n))**m}`,'Power.']]);
  const mm=rand(1,5),nn=rand(2,6);return mc(`Which is equal to <b>${nn===2?'√':sup(nn)+'√'}(x${sup(mm)})</b>?`,`x${E(mm,nn)}`,[`x${E(nn,mm)}`,`x${E(mm*nn,1)}`,`x${E(mm+nn,1)}`],'Power over root: m/n.');},
 check:[q('x<sup>1/2</sup> = ?',['x/2','√x','x²','1/x²'],1,'Square root.'),q('27<sup>2/3</sup> = ?',['9','18','3','6'],0,'(∛27)² = 9.'),q('∛(a⁵) = ?',['a<sup>3/5</sup>','a<sup>5/3</sup>','a¹⁵','a²'],1,'Power over root.')]};

L['A2-6-2']={goal:'I can use the properties of exponents with rational exponents.',
 life:{title:'Same rules, new numbers',html:'The rules you learned for whole-number exponents — add when multiplying, subtract when dividing, multiply for a power of a power — work exactly the same with <b>fractions</b>. That is why mathematicians defined x<sup>1/n</sup> as the nth root.'},
 see:[{title:'Exponent rules with fractions',hint:'Click through each rule.',mount:mountProps}],
 vocab:[['Product rule','xᵃxᵇ = xᵃ⁺ᵇ.'],['Quotient rule','xᵃ/xᵇ = xᵃ⁻ᵇ.'],['Power rule','(xᵃ)ᵇ = xᵃᵇ.'],['Negative exponent','x⁻ᵃ = 1/xᵃ.']],
 examples:[ex('Example 1','Simplify x<sup>2/3</sup> · x<sup>1/6</sup>',[['2/3 + 1/6 = 4/6 + 1/6 = 5/6','Common denominator.'],['x<sup>5/6</sup>','']]),
  ex('Example 2','Simplify (16x⁸)<sup>3/4</sup>',[['16<sup>3/4</sup> · x<sup>8·3/4</sup>','Each factor.'],['8x⁶','(⁴√16)³ = 8.']])],
 mistake:{bad:'x<sup>1/2</sup> · x<sup>1/3</sup> = x<sup>1/6</sup>',good:'x<sup>5/6</sup>',why:'Multiplying powers → <b>add</b> exponents (1/2 + 1/3), not multiply them.'},
 practice(){const t=pick(['add','sub','pow']);let a=rand(1,5),b=rand(2,6),c=rand(1,5),d=rand(2,6);
  if(t==='add'){const N=a*d+c*b,D=b*d,g=gcd(N,D);return num(`Simplify <b>x${E(a,b)} · x${E(c,d)}</b> = x<sup>p/q</sup> (lowest terms).`,[['p =',N/g],['q =',D/g]],'Add the exponents.',[[`${fr(a,b)} + ${fr(c,d)} = ${fr(N,D)}`,'Common denominator.']]);}
  if(t==='sub'){if(a*d===c*b)c++;const N=a*d-c*b,D=b*d,g=gcd(Math.abs(N)||1,D);return num(`Simplify <b>x${E(a,b)} ÷ x${E(c,d)}</b> = x<sup>p/q</sup> (lowest terms, q &gt; 0).`,[['p =',N/g],['q =',D/g]],'Subtract the exponents.',[[`${fr(a,b)} − ${fr(c,d)} = ${fr(N,D)}`,'Common denominator.']]);}
  const k=rand(2,6),N=a*k,g=gcd(N,b);return num(`Simplify <b>(x${E(a,b)})${sup(k)}</b> = x<sup>p/q</sup> (lowest terms).`,[['p =',N/g],['q =',b/g]],'Multiply the exponents.',[[`${fr(a,b)} · ${k} = ${fr(N,b)}`,'Power of a power.']]);},
 check:[q('x<sup>1/4</sup> · x<sup>3/4</sup> = ?',['x','x<sup>3/16</sup>','x<sup>1/2</sup>','x²'],0,'1/4 + 3/4 = 1.'),q('(x<sup>1/3</sup>)⁶ = ?',['x²','x<sup>1/18</sup>','x<sup>6/3</sup> = x³','x<sup>19/3</sup>'],0,'6/3 = 2.'),q('x<sup>−1/2</sup> = ?',['−√x','1/√x','√(−x)','−x/2'],1,'Reciprocal.')]};

L['A2-6-3']={goal:'I can evaluate expressions with rational exponents and simplify radicals.',
 life:{title:'Calculator-free powers',html:'Scientists estimate an animal’s metabolism as mass<sup>3/4</sup>. For a 16 kg dog: 16<sup>3/4</sup> = (⁴√16)³ = 2³ = 8 units. Knowing the root-then-power strategy lets you do this in your head.'},
 see:[{title:'Evaluate step by step',hint:'Choose an expression and step through it.',mount:mountEval}],
 vocab:[['Root first','For b^(m/n), find ⁿ√b, then raise to m.'],['Negative exponent','Take the reciprocal first.'],['Product of radicals','√a · √b = √(ab), a, b ≥ 0.']],
 examples:[ex('Example 1','Evaluate 32<sup>3/5</sup>',[['(⁵√32)³ = 2³','⁵√32 = 2.'],['= 8','']]),
  ex('Example 2','Evaluate 81<sup>−1/4</sup>',[['1 / 81<sup>1/4</sup> = 1/3','Reciprocal of ⁴√81 = 3.']])],
 mistake:{bad:'25<sup>−1/2</sup> = −5',good:'1/5',why:'A negative exponent makes a <b>reciprocal</b>, not a negative number.'},
 practice(){const n=pick([2,3,4,5]),b=pick(BASES[n].slice(0,3)),m=rand(1,3),neg=Math.random()<.4;const v=Math.round(b**(1/n))**m;
  return num(`Evaluate <b>${b}${E(neg?-m:m,n)}</b>${neg?' (fractions like 1/8 are OK)':''}.`,[['value =',neg?1/v:v,0.0011]],neg?'Negative exponent: reciprocal first.':'Root first, then power.',[[`${neg?'1 / ':''}(${root(n,b)})${sup(m)}`,'Rewrite.'],[neg?`1/${v}`:String(v),'Evaluate.']]);},
 check:[q('64<sup>1/3</sup> = ?',['4','8','21⅓','16'],0,'4³ = 64.'),q('9<sup>3/2</sup> = ?',['27','13.5','6','81'],0,'(√9)³.'),q('8<sup>−2/3</sup> = ?',['−4','1/4','4','−1/4'],1,'1/(∛8)².')]};

L['A2-6-4']={goal:'I can rewrite exponential expressions in equivalent forms to reveal useful information.',
 life:{title:'Yearly vs. monthly growth',html:'An account grows by 1.06<sup>t</sup> per year. What is the <b>monthly</b> growth factor? Rewrite: 1.06<sup>t</sup> = (1.06<sup>1/12</sup>)<sup>12t</sup> ≈ 1.00487<sup>12t</sup> — about 0.487% per month. Same function, more useful form.'},
 see:[{title:'Two forms, one graph',hint:'Find the base b that makes b^x the same as 2^(3x).',mount:mountEquiv}],
 vocab:[['Equivalent expressions','Same value for every input.'],['(aᵐ)ˣ = aᵐˣ','Move a factor between base and exponent.'],['Growth per period','Rewrite the exponent to match the time unit you want.']],
 examples:[ex('Example 1','Rewrite 9<sup>x</sup> with base 3.',[['(3²)<sup>x</sup> = 3<sup>2x</sup>','Power of a power.']]),
  ex('Example 2','A population is 500(1.21)<sup>t</sup>, t in decades. Growth per 5 years?',[['1.21<sup>t</sup> = (1.21<sup>1/2</sup>)<sup>2t</sup> = 1.1<sup>2t</sup>','√1.21 = 1.1.'],['10% per 5-year period','2t counts half-decades.']])],
 mistake:{bad:'2<sup>3x</sup> = 6<sup>x</sup>',good:'8<sup>x</sup>',why:'2<sup>3x</sup> = (2³)<sup>x</sup>. The 3 is an exponent on 2, not a factor of 2.'},
 practice(){const b=pick([2,3,5]),k=rand(2,3);if(Math.random()<.5)return num(`Write <b>${b}<sup>${k}x</sup></b> as c<sup>x</sup>.`,[['c =',b**k]],`(${b}${sup(k)})<sup>x</sup>.`,[[`${b}<sup>${k}x</sup> = (${b}${sup(k)})<sup>x</sup> = ${b**k}<sup>x</sup>`,'Power of a power.']]);
  return num(`Write <b>${b**k}<sup>x</sup></b> as ${b}<sup>nx</sup>.`,[['n =',k]],`${b**k} = ${b}${sup(k)}.`,[[`${b**k}<sup>x</sup> = (${b}${sup(k)})<sup>x</sup> = ${b}<sup>${k}x</sup>`,'Rewrite the base.']]);},
 check:[q('4<sup>x</sup> = 2<sup>?</sup>',['x + 2','2x','x/2','x²'],1,'(2²)ˣ.'),q('(1.1)<sup>2t</sup> = (?)<sup>t</sup>',['2.2','1.21','1.2','11'],1,'1.1² = 1.21.'),q('Which equals 27<sup>x</sup>?',['3<sup>9x</sup>','3<sup>3x</sup>','9<sup>3x</sup>','3<sup>x+3</sup>'],1,'27 = 3³.')]};

L['A2-6-5']={goal:'I can solve exponential equations by rewriting both sides with the same base.',
 life:{title:'When will it reach 32?',html:'A bacteria colony quadruples every hour: 4<sup>t</sup>. When does it reach 32 times its start size? Since 4 = 2² and 32 = 2⁵, the equation 2<sup>2t</sup> = 2⁵ gives t = 2.5 hours — no calculator needed.'},
 see:[{title:'Find a common base',hint:'Click each equation.',mount:mountSolve}],
 vocab:[['Common base','Rewrite both sides as powers of the same number.'],['Equal powers','If bᵐ = bⁿ (b > 0, b ≠ 1), then m = n.'],['Reciprocal exponent','To undo x^(m/n), raise to n/m.']],
 examples:[ex('Example 1','Solve 8<sup>x</sup> = 4<sup>x+1</sup>',[['2<sup>3x</sup> = 2<sup>2x+2</sup>','Base 2.'],['3x = 2x + 2 → x = 2','Set exponents equal.']]),
  ex('Example 2','Solve 25<sup>x</sup> = 1/5',[['5<sup>2x</sup> = 5<sup>−1</sup>','1/5 = 5⁻¹.'],['x = −1/2','']])],
 mistake:{bad:'4<sup>x</sup> = 32 → x = 32/4 = 8',good:'x = 5/2',why:'x is an exponent. Use a common base: 2<sup>2x</sup> = 2⁵.'},
 practice(){const b=pick([2,3]),p=rand(2,3),q_=rand(2,5);const B=b**p,R=b**q_;return num(`Solve <b>${B}<sup>x</sup> = ${R}</b>. Give x as a fraction or decimal.`,[['x =',q_/p,0.011]],`Write both as powers of ${b}.`,[[`${b}<sup>${p}x</sup> = ${b}${sup(q_)}`,'Common base.'],[`${p}x = ${q_} → x = ${fr(q_,p)}`,'Equal exponents.']]);},
 check:[q('Solve 3<sup>x</sup> = 81',['3','4','27','9'],1,'81 = 3⁴.'),q('Solve 2<sup>x</sup> = 1/8',['−3','3','1/3','−1/3'],0,'2⁻³.'),q('Solve x<sup>2/3</sup> = 4 (x > 0)',['8','6','2','16'],0,'4<sup>3/2</sup> = 8.')]};

TOOLS['A2-6']={title:'Root, then power',hint:'See b^(m/n) = (ⁿ√b)ᵐ with real numbers.',mount:mountRat};
})();
