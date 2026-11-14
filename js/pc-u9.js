/* Pre-Calculus · Unit 9 · Series and the Binomial Theorem */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,graphLab,chooser,curve,hline,vline,hole,ps,pmul,cs,circleFig}=A2;const C=PC,PI=Math.PI;const {stepper}=KA;const M=C.mat;
function mSeries(el){sliders(el,[{k:'a',l:'first term a',min:1,max:8,v:4},{k:'r',l:'ratio r',min:-1.2,max:1.2,step:.05,v:0.5},{k:'n',l:'terms n',min:1,max:30,v:8}],V=>{const W=520,H=200,terms=[],sums=[];let S=0;for(let k=0;k<V.n;k++){const t=V.a*V.r**k;terms.push(t);S+=t;sums.push(S);}
  const conv=Math.abs(V.r)<1,lim=conv?V.a/(1-V.r):null;const mx_=Math.max(1,...sums.map(Math.abs),lim?Math.abs(lim):0);const X=i=>30+i*(W-50)/Math.max(1,V.n),Y=v=>H/2-v/mx_*(H/2-14);
  let s=`<line x1="20" y1="${H/2}" x2="${W-10}" y2="${H/2}" stroke="#374151"/>`;if(conv)s+=`<line x1="20" y1="${Y(lim)}" x2="${W-10}" y2="${Y(lim)}" stroke="#059669" stroke-width="2" stroke-dasharray="6 4"/><text x="${W-12}" y="${Y(lim)-6}" text-anchor="end" font-size="12" font-weight="800" fill="#059669">S = ${nf(lim)}</text>`;
  sums.forEach((v,i)=>{s+=`<rect x="${X(i)}" y="${Math.min(Y(v),H/2)}" width="${Math.max(2,(W-50)/V.n*0.7)}" height="${Math.abs(Y(v)-H/2)}" fill="${v>=0?'#93c5fd':'#fda4af'}"/>`;});
  $('.sr-g',el).innerHTML=`<svg viewBox="0 0 ${W} ${H}" class="fig" style="max-width:${W}px">${s}</svg>`;
  $('.sr-r',el).innerHTML=`Bars = partial sums S₁ … S${V.n<10?'₀₁₂₃₄₅₆₇₈₉'[V.n]:'ₙ'}. S<sub>${V.n}</sub> = a(1 − rⁿ)/(1 − r) = <b>${V.r===1?nf(V.a*V.n):nf(sums[V.n-1])}</b>.<br>${conv?`|r| < 1: the partial sums settle down to <b>S = a/(1 − r) = ${nf(lim)}</b> — the infinite series <b>converges</b>.`:'|r| ≥ 1: the partial sums never settle — the infinite series <b>diverges</b>.'}`;},`<div class="sr-g"></div><div class="readout sr-r"></div>`).run();}
function mInduct(el){sliders(el,[{k:'n',l:'n',min:1,max:10,v:4}],V=>{let s='',W=40*V.n+40;for(let i=1;i<=V.n;i++)for(let j=0;j<i;j++)s+=`<rect x="${20+(i-1)*36}" y="${180-(j+1)*16}" width="32" height="14" rx="3" fill="${i===V.n?'#f59e0b':'#93c5fd'}"/>`;
  $('.in-r',el).innerHTML=`<svg viewBox="0 0 ${Math.max(W,200)} 190" class="fig" style="max-width:${Math.max(W,200)}px">${s}</svg><div class="eqline math" style="font-size:1.1em">1 + 2 + … + ${V.n} = ${V.n*(V.n+1)/2} = ${V.n}(${V.n+1})/2 ✓</div><p><b>Induction</b> is a domino chain: <b>(1) base case</b> — it works for n = 1. <b>(2) inductive step</b> — if it works for k, adding the next column (orange, k + 1 blocks) gives k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2, so it works for k + 1. Then every domino falls.</p>`;},`<div class="in-r"></div>`).run();}
function pascal(n){const R=[[1]];for(let i=1;i<=n;i++){const p=R[i-1];R.push(p.map((v,j)=>v+(p[j-1]||0)).concat(1));}return R;}
function mBinom(el){sliders(el,[{k:'n',l:'power n',min:1,max:8,v:4}],V=>{const R=pascal(8);const row=R[V.n];const terms=row.map((c,k)=>{const a=V.n-k,b=k;return `${c===1?'':c}${a?'a'+(a>1?A2.sup(a):''):''}${b?'b'+(b>1?A2.sup(b):''):''}`;});
  $('.bn-r',el).innerHTML=`<div style="text-align:center;font-family:monospace;line-height:1.7">${R.slice(0,9).map((r,i)=>`<div style="${i===V.n?'color:#e11d48;font-weight:800':'color:#64748b'}">${r.join('&nbsp;&nbsp;')}</div>`).join('')}</div><div class="eqline math" style="font-size:1.15em">(a + b)${A2.sup(V.n)} = ${terms.join(' + ')}</div><p class="mute">Row ${V.n} of Pascal's triangle gives the coefficients C(${V.n}, k). Powers of a count down from ${V.n}; powers of b count up from 0. Each entry is the sum of the two above it.</p>`;},`<div class="bn-r"></div>`).run();}
function C2(n,k){let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r);}
/* Gauss pairing: an arithmetic series and its reverse make a rectangle */
function mArith(el){sliders(el,[{k:'a',l:'first term a₁',min:1,max:6,v:2},{k:'d',l:'common difference d',min:0,max:3,v:2},{k:'n',l:'number of terms n',min:2,max:10,v:6}],V=>{const T=Array.from({length:V.n},(_,i)=>V.a+i*V.d),L=T[V.n-1],S=V.n*(V.a+L)/2;const u=Math.min(26,300/(V.a+L)),w=Math.min(40,380/V.n);
  let s='';T.forEach((t,i)=>{const x=20+i*w;s+=`<rect x="${x}" y="${20}" width="${w-4}" height="${t*u}" fill="#93c5fd" stroke="#2563eb"/><rect x="${x}" y="${20+t*u}" width="${w-4}" height="${(V.a+L-t)*u}" fill="#fde68a" stroke="#d97706"/><text x="${x+(w-4)/2}" y="${16}" text-anchor="middle" font-size="11" font-weight="800" fill="#2563eb">${t}</text>`;});
  $('.ar-g',el).innerHTML=`<svg viewBox="0 0 ${40+V.n*w} ${40+(V.a+L)*u}" class="fig" style="max-width:${Math.min(480,40+V.n*w)}px">${s}</svg>`;
  $('.ar-r',el).innerHTML=`Blue: ${T.join(' + ')}. Yellow: the same terms in reverse. Each column has height a₁ + aₙ = ${V.a} + ${L} = <b>${V.a+L}</b>.<br>Two copies make a ${V.n} × ${V.a+L} rectangle, so one copy is <b>Sₙ = n(a₁ + aₙ)/2 = ${V.n}(${V.a+L})/2 = ${nf(S)}</b>.<br>In sigma notation: Σ<sub>k=1</sub><sup>${V.n}</sup> (${V.a} + ${V.d}(k − 1)).`;},`<div class="ar-g"></div><div class="readout ar-r"></div>`).run();}

L['PC-9-1']={goal:'I can read and write sigma notation and find the sum of a finite arithmetic series.',
 life:{title:'Stadium seats',html:'A stadium section has 20 seats in the front row and 2 more in each row behind it, for 30 rows. How many seats in all? Adding 30 numbers by hand is slow — the <b>arithmetic series formula</b> does it in one line.'},
 see:[{title:'Pair it with its reverse',hint:'Change a₁, d, and n. Two copies always make a rectangle.',mount:mArith}],
 vocab:[['Series','The sum of the terms of a sequence.'],['Sigma notation','Σ_{k=1}^{n} aₖ: add aₖ for k = 1, 2, …, n.'],['Arithmetic series','Terms differ by a constant d.'],['Sum formula','Sₙ = n(a₁ + aₙ)/2 = n[2a₁ + (n − 1)d]/2.']],
 examples:[ex('Example 1','Evaluate Σ_{k=1}^{4} (3k − 1).',[['k = 1, 2, 3, 4 → 2, 5, 8, 11','List the terms.'],['2 + 5 + 8 + 11 = 26','Add.']]),
  ex('Example 2','Stadium: a₁ = 20, d = 2, n = 30.',[['a₃₀ = 20 + 29·2 = 78','Last term.'],['S = 30(20 + 78)/2 = 1470 seats','Formula.']])],
 mistake:{bad:'Σ_{k=1}^{10} 5 = 5',good:'= 50',why:'The sigma adds the term once for each k. A constant 5 is added 10 times.'},
 practice(){const a=rand(-10,20),d=nz(-5,6),n=rand(5,40);const L=a+(n-1)*d,S=n*(a+L)/2;if(Math.random()<0.5)
   return num(`Find the sum of the arithmetic series with a₁ = ${a}, d = ${d}, and n = ${n} terms.`,[['Sₙ =',S]],'Find the last term aₙ = a₁ + (n − 1)d, then Sₙ = n(a₁ + aₙ)/2.',[[`a${n} = ${a} + ${n-1}·${P(d)} = ${L}`,''],[`S = ${n}(${a} + ${P(L)})/2 = ${nf(S)}`,'']]);
  return num(`Evaluate Σ<sub>k=1</sub><sup>${n}</sup> (${A2.ps([d,a-d],'k')}).`,[['sum =',S]],'This is arithmetic: first term at k = 1, last at k = n.',[[`first = ${a}, last = ${L}`,''],[`${n}(${a} + ${P(L)})/2 = ${nf(S)}`,'']]);},
 check:[q('Σ_{k=1}^{3} k² =',['9','14','6','36'],1,'1 + 4 + 9.'),q('1 + 2 + … + 100 =',['5000','5050','10100','100'],1,''),q('In Σ_{k=2}^{6}, how many terms?',['4','5','6','7'],1,'')]};

L['PC-9-2']={goal:'I can use sigma notation and find sums of arithmetic and geometric series, including infinite ones.',
 life:{title:'Bouncing ball',html:'A ball dropped from 10 m bounces back to half its height each time. It bounces forever — yet travels a <b>finite</b> total distance, 30 m. An infinite geometric series can add up to a finite number.'},
 see:[{title:'Partial sums',hint:'Change a, r, and the number of terms. Does the sum settle?',mount:mSeries}],
 vocab:[['Σ notation','Σ_{k=1}^{n} aₖ means a₁ + a₂ + … + aₙ.'],['Arithmetic sum','Sₙ = n(a₁ + aₙ)/2.'],['Geometric sum','Sₙ = a(1 − rⁿ)/(1 − r).'],['Infinite geometric','S = a/(1 − r) when |r| < 1; otherwise diverges.']],
 examples:[ex('Example 1','Σ_{k=1}^{20} (3k + 2)',[['a₁ = 5, a₂₀ = 62','Arithmetic.'],['S = 20(5 + 62)/2 = 670','']]),ex('Example 2','8 − 4 + 2 − 1 + …',[['a = 8, r = −1/2','|r| < 1.'],['S = 8/(1 + 1/2) = 16/3','']])],
 mistake:{bad:'1 + 2 + 4 + 8 + … = 1/(1 − 2) = −1',good:'diverges',why:'The formula a/(1 − r) only works when <b>|r| < 1</b>.'},
 practice(){const a=pick([2,3,4,5,6,8,10,12]),rN=pick([1,1,2,1,3]),rD=pick([2,3,4,5]);const r=(Math.random()<.3?-1:1)*rN/rD;if(Math.abs(r)>=1)return this.practice();
  return num(`Find the sum of the infinite geometric series with first term ${a} and ratio ${frac(Math.round(r*rD),rD)}.`,[['S =',a/(1-r)]],'S = a/(1 − r).',[[`|r| = ${frac(Math.abs(Math.round(r*rD)),rD)} < 1 → converges`,''],[`S = ${a}/(1 − (${frac(Math.round(r*rD),rD)})) = ${nf(a/(1-r))}`,'']]);},
 check:[q('Σ_{k=1}^{4} k² =',['10','30','16','20'],1,'1 + 4 + 9 + 16.'),q('Does 5 + 5(1.1) + 5(1.1)² + … converge?',['yes, to 50','yes, to 55','no','yes, to 5'],2,'|r| = 1.1 ≥ 1.'),q('Sum of 1 + 1/3 + 1/9 + …?',['3/2','3','4/3','∞'],0,'1/(1 − 1/3).')]};
L['PC-9-3']={goal:'I can prove a statement for all positive integers using mathematical induction.',
 life:{title:'Dominoes',html:'If the first domino falls, and every domino knocks over the next one, then all of them fall — even infinitely many. That is the whole idea of <b>proof by induction</b>.'},
 see:[{title:'Why 1 + 2 + … + n = n(n + 1)/2',hint:'Increase n. The new column is the "next domino".',mount:mInduct}],
 vocab:[['Base case','Show the statement is true for n = 1.'],['Inductive hypothesis','Assume it is true for n = k.'],['Inductive step','Use that to prove it for n = k + 1.'],['Conclusion','True for every positive integer n.']],
 examples:[ex('Example','Prove 1 + 3 + 5 + … + (2n − 1) = n².',[['n = 1: 1 = 1² ✓','Base case.'],['assume 1 + 3 + … + (2k − 1) = k²','Hypothesis.'],['add 2(k + 1) − 1 = 2k + 1: k² + 2k + 1 = (k + 1)² ✓','Step.'],['true for all n ≥ 1','']])],
 mistake:{bad:'Check n = 1, 2, 3, 4 → it is proven',good:'examples are not a proof',why:'Patterns can fail later. Induction proves the <b>k → k + 1</b> link for every k.'},
 practice(){const n=rand(5,30);const T=pick([['1 + 2 + … + n','n(n + 1)/2',n*(n+1)/2],['1 + 3 + 5 + … + (2n − 1)','n²',n*n],['1² + 2² + … + n²','n(n + 1)(2n + 1)/6',n*(n+1)*(2*n+1)/6],['2 + 4 + … + 2n','n(n + 1)',n*(n+1)]]);
  return num(`Induction proves ${T[0]} = ${T[1]}. Use it to find the sum for n = ${n}.`,[['sum =',T[2]]],`Substitute n = ${n} into ${T[1]}.`,[[`${T[1].replace(/n/g,n)} = ${T[2]}`,'']]);},
 check:[q('The first part of an induction proof is…',['the inductive step','the base case','the conclusion','a counterexample'],1,''),q('In the inductive step you assume the statement for…',['n = 1','n = k','n = k + 1','all n'],1,''),q('Then you must prove it for…',['n = k − 1','n = k + 1','n = 2k','n = 0'],1,'')]};
L['PC-9-4']={goal:'I can expand (a + b)ⁿ with the Binomial Theorem and find a specific term.',
 life:{title:'Coin flips',html:'Flip 5 coins. The number of ways to get exactly 2 heads is C(5, 2) = 10 — the same number that appears in (a + b)⁵. Pascal\'s triangle connects algebra and counting.'},
 see:[{title:"Pascal's triangle",hint:'Change n. The highlighted row gives the coefficients.',mount:mBinom}],
 vocab:[['Binomial coefficient','C(n, k) = n!/(k!(n − k)!).'],['Binomial Theorem','(a + b)ⁿ = Σ C(n, k) aⁿ⁻ᵏ bᵏ.'],["Pascal's triangle",'Each entry = sum of the two above.'],['(k + 1)th term','C(n, k) aⁿ⁻ᵏ bᵏ.']],
 examples:[ex('Example','Find the x³ term of (2x − 1)⁵.',[['x³ → a = 2x to the 3rd, k = 2','b = −1 to the 2nd.'],['C(5, 2)(2x)³(−1)² = 10·8x³','' ],['80x³','']])],
 mistake:{bad:'(a + b)³ = a³ + b³',good:'a³ + 3a²b + 3ab² + b³',why:'Every way of picking a or b from each factor counts — that is where the middle terms come from.'},
 practice(){const n=rand(3,7),k=rand(1,n-1),c=nz(-3,3);const coef=C2(n,k)*c**k;
  return num(`Find the coefficient of x${A2.sup(n-k)} in (x ${c<0?'−':'+'} ${Math.abs(c)})${A2.sup(n)}.`,[['coefficient =',coef]],`The term is C(${n}, ${k})·x${A2.sup(n-k)}·(${c})${A2.sup(k)}.`,[[`C(${n}, ${k}) = ${C2(n,k)}`,''],[`${C2(n,k)}·(${c})${A2.sup(k)} = ${coef}`,'']]);},
 check:[q('C(6, 2) =',['12','15','30','6'],1,''),q('How many terms in (a + b)⁷?',['7','8','14','6'],1,''),q('Coefficients of (a + b)⁴?',['1 4 6 4 1','1 3 3 1','1 4 4 1','4 6 4'],0,'')]};

TOOLS['PC-9']={title:'Infinite series',hint:'Watch partial sums of a geometric series converge or diverge.',mount:mSeries};
})();
