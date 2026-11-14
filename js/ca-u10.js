/* Calculus · Unit 10 · Infinite sequences and series (BC) */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders,chooser,curve,hline,vline,hole,ps}=A2;const C=PC,K=CA,PI=Math.PI;
const fact=n=>n<2?1:n*fact(n-1);
function dots(G,pts,col,r=4){return pts.map(p=>gdot(G,p[0],p[1],col,r)).join('');}

const PS=[{t:'1/2ⁿ',a:n=>1/2**n,S:'1',y:[-0.2,1.4]},{t:'1/n',a:n=>1/n,S:'∞ (diverges)',y:[-0.2,4.5]},{t:'(−1)ⁿ⁺¹/n',a:n=>(n%2?1:-1)/n,S:'ln 2 ≈ 0.693',y:[-1.2,1.4]},{t:'n/(n + 1)',a:n=>n/(n+1),S:'∞ (diverges)',y:[-0.2,20]}];
function mPartial(el){K.pickSlide(el,PS,[{k:'N',l:'N',min:1,max:30,step:1,v:10}],(V,F)=>{const G=grid({x0:0,x1:31,y0:F.y[0],y1:F.y[1],u:14,uy:200/(F.y[1]-F.y[0]),lab:5,laby:Math.max(0.5,Math.ceil((F.y[1]-F.y[0])/5))});
  const a=[],S=[];let s=0;for(let n=1;n<=V.N;n++){s+=F.a(n);a.push([n,F.a(n)]);S.push([n,s]);}
  $('.pp-g',el).innerHTML=G.svg(hline(G,0,'#94a3b8','')+dots(G,a,'#2563eb',4)+dots(G,S,'#e11d48',5));
  $('.pp-r',el).innerHTML=`<span style="color:#2563eb">● terms aₙ = ${F.t}</span> · <span style="color:#e11d48">● partial sums Sₙ</span><br>a<sub>${V.N}</sub> = ${K.r3(F.a(V.N))}, S<sub>${V.N}</sub> = <b>${K.r3(s)}</b>. As N → ∞, Sₙ → <b>${F.S}</b>.<br><span class="mute">A series converges when its partial sums approach a finite number.</span>`;},`<div class="pp-g"></div><div class="readout pp-r"></div>`);}

function mGeo(el){sliders(el,[{k:'r',l:'ratio r',min:-1.2,max:1.2,step:.05,v:0.5},{k:'N',l:'terms N',min:1,max:30,step:1,v:8}],V=>{const a=1,r=V.r;let s=0,S=[];for(let n=0;n<V.N;n++){s+=a*r**n;S.push([n+1,s]);}
  const conv=Math.abs(r)<1;const G=grid({x0:0,x1:31,y0:-3,y1:8,u:14,uy:20,lab:5,laby:2});let g=hline(G,0,'#94a3b8','')+(conv?hline(G,1/(1-r),'#059669','6 4'):'')+dots(G,S,'#e11d48',5);
  $('.gs-g',el).innerHTML=G.svg(g);$('.gs-r',el).innerHTML=`Σ<sub>n=0</sub><sup>∞</sup> rⁿ with r = ${nf(r)}. S<sub>${V.N}</sub> = <b>${K.r3(s)}</b>.<br>${conv?`|r| < 1: converges to a/(1 − r) = 1/(1 − ${P(r)}) = <b>${K.r3(1/(1-r))}</b>.`:'|r| ≥ 1: <b>diverges</b>.'}`;},`<div class="gs-g"></div><div class="readout gs-r"></div>`).run();}

const NT=[{t:'n/(n + 1)',a:n=>n/(n+1),L:'1',v:'Terms → 1 ≠ 0: the series <b>diverges</b>.'},{t:'(1 + 1/n)ⁿ',a:n=>(1+1/n)**n,L:'e',v:'Terms → e ≠ 0: <b>diverges</b>.'},{t:'cos(1/n)',a:n=>Math.cos(1/n),L:'1',v:'Terms → 1: <b>diverges</b>.'},{t:'1/n',a:n=>1/n,L:'0',v:'Terms → 0, so the test is <b>inconclusive</b>. (This series actually diverges — see the integral test.)'}];
function mNth(el){chooser(el,NT.map(F=>({t:'Σ '+F.t,html:()=>C.table(['n',...[1,10,100,1000,10000]],[['aₙ',...[1,10,100,1000,10000].map(n=>F.a(n).toFixed(5))]])+`<div class="readout">lim aₙ = <b>${F.L}</b>. ${F.v}<br><span class="mute">nth-term test: if lim aₙ ≠ 0, Σaₙ diverges. If lim aₙ = 0, the test says nothing.</span></div>`})));}

function mIntT(el){sliders(el,[{k:'p',l:'p',min:0.5,max:3,step:.1,v:2},{k:'N',l:'N',min:2,max:12,step:1,v:8}],V=>{const p=V.p,f=x=>x**-p;const G=grid({x0:0,x1:12.5,y0:0,y1:1.2,u:36,uy:200,lab:1,laby:1});let s='',S=0;
  for(let n=1;n<=V.N;n++){S+=f(n);s+=`<rect x="${G.X(n)}" y="${G.Y(f(n))}" width="${G.u}" height="${G.Y(0)-G.Y(f(n))}" fill="rgba(245,158,11,.35)" stroke="#b45309"/>`;}
  s+=curve(G,x=>x<0.7?NaN:f(x),'#2563eb',3);const I=Math.abs(p-1)<1e-9?'∞':p>1?K.r3(1/(p-1)):'∞';
  $('.it-g',el).innerHTML=G.svg(s);$('.it-r',el).innerHTML=`Bars: aₙ = 1/n<sup>${nf(p)}</sup>, each of width 1. Sum of the first ${V.N}: <b>${K.r3(S)}</b>.<br>∫₁^∞ 1/x<sup>${nf(p)}</sup> dx = <b>${I}</b>. The bars after the first sit under the curve, so the series and the integral converge or diverge <b>together</b>: p-series converges ⇔ p > 1.`;},`<div class="it-g"></div><div class="readout it-r"></div>`).run();}

const CM=[{t:'Σ 1/(n² + 1) vs Σ 1/n²',a:n=>1/(n*n+1),b:n=>1/(n*n),s:'0 < 1/(n² + 1) < 1/n², and Σ1/n² converges (p = 2), so Σ1/(n² + 1) <b>converges</b> (direct comparison).'},{t:'Σ 1/(n − 0.5) vs Σ 1/n',a:n=>1/(n-0.5),b:n=>1/n,s:'1/(n − 0.5) > 1/n, and Σ1/n diverges, so Σ1/(n − 0.5) <b>diverges</b>.'},{t:'Σ 1/(2ⁿ − 1) vs Σ 1/2ⁿ',a:n=>1/(2**n-1),b:n=>1/2**n,s:'The ratio aₙ/bₙ → 1 (finite, positive), so both converge (limit comparison).'}];
function mCmp(el){chooser(el,CM.map(F=>({t:F.t,html:()=>{const G=grid({x0:0,x1:11,y0:0,y1:1.1,u:40,uy:200,lab:1,laby:1});let s='';for(let n=1;n<=10;n++){s+=`<rect x="${G.X(n-0.35)}" y="${G.Y(Math.min(1.1,F.a(n)))}" width="12" height="${G.Y(0)-G.Y(Math.min(1.1,F.a(n)))}" fill="#93c5fd"/><rect x="${G.X(n)+2}" y="${G.Y(Math.min(1.1,F.b(n)))}" width="12" height="${G.Y(0)-G.Y(Math.min(1.1,F.b(n)))}" fill="#fca5a5"/>`;}
  return G.svg(s)+C.table(['n',1,10,100,1000],[['aₙ/bₙ',...[1,10,100,1000].map(n=>(F.a(n)/F.b(n)).toFixed(4))]])+`<div class="readout"><span style="color:#2563eb">blue</span>: the series in question · <span style="color:#e11d48">red</span>: the known series.<br>${F.s}</div>`;}})));}

function mAlt(el){sliders(el,[{k:'N',l:'N',min:1,max:30,step:1,v:6}],V=>{let s=0,S=[];for(let n=1;n<=V.N;n++){s+=(n%2?1:-1)/n;S.push([n,s]);}const L=Math.log(2),bnd=1/(V.N+1);
  const G=grid({x0:0,x1:31,y0:0.3,y1:1.1,u:14,uy:300,lab:5,laby:100});let g=hline(G,L,'#059669','6 4')+`<path d="${S.map((p,i)=>(i?'L':'M')+G.X(p[0])+' '+G.Y(p[1])).join(' ')}" fill="none" stroke="#fca5a5" stroke-width="1.5"/>`+dots(G,S,'#e11d48',4)+`<rect x="${G.X(V.N)-6}" y="${G.Y(s+bnd)}" width="12" height="${G.Y(s-bnd)-G.Y(s+bnd)}" fill="rgba(147,51,234,.15)" stroke="#9333ea"/>`;
  $('.al-g',el).innerHTML=G.svg(g);$('.al-r',el).innerHTML=`Σ (−1)ⁿ⁺¹/n = 1 − 1/2 + 1/3 − …: partial sums zigzag toward ln 2 ≈ 0.6931.<br>S<sub>${V.N}</sub> = <b>${K.r3(s)}</b> · actual error ${K.r3(Math.abs(L-s))} ≤ bound a<sub>${V.N+1}</sub> = 1/${V.N+1} = <b>${K.r3(bnd)}</b> (purple box).<br>Each partial sum ${V.N%2?'overshoots':'undershoots'} the limit.`;},`<div class="al-g"></div><div class="readout al-r"></div>`).run();}

const RT=[{t:'Σ 2ⁿ/n!',a:n=>2**n/fact(n),L:'0',v:'L = 0 < 1: converges absolutely.'},{t:'Σ n/3ⁿ',a:n=>n/3**n,L:'1/3',v:'L = 1/3 < 1: converges.'},{t:'Σ n!/5ⁿ',a:n=>fact(n)/5**n,L:'∞',v:'L = ∞ > 1: diverges.'},{t:'Σ 1/n²',a:n=>1/(n*n),L:'1',v:'L = 1: inconclusive (it converges, by the p-series test).'}];
function mRatio(el){chooser(el,RT.map(F=>({t:F.t,html:()=>C.table(['n',1,5,10,20,40],[['|aₙ₊₁/aₙ|',...[1,5,10,20,40].map(n=>(F.a(n+1)/F.a(n)).toFixed(4))]])+`<div class="readout">L = lim |aₙ₊₁/aₙ| = <b>${F.L}</b>. ${F.v}<br><span class="mute">Ratio test: L < 1 converges absolutely; L > 1 diverges; L = 1 inconclusive. Great for factorials and powers.</span></div>`})));}

function mAbs(el){sliders(el,[{k:'N',l:'N',min:10,max:2000,step:10,v:100}],V=>{let a=0,b=0,c=0,d=0;for(let n=1;n<=V.N;n++){a+=(n%2?1:-1)/n;b+=1/n;c+=(n%2?1:-1)/(n*n);d+=1/(n*n);}
  $('.ab-r',el).innerHTML=C.table(['series','S<sub>N</sub>','behavior'],[['Σ (−1)ⁿ⁺¹/n',a.toFixed(5),'converges'],['Σ 1/n  (absolute values)',b.toFixed(5),'diverges (grows like ln N)'],['Σ (−1)ⁿ⁺¹/n²',c.toFixed(5),'converges'],['Σ 1/n²  (absolute values)',d.toFixed(5),'converges → π²/6']])+`Σ(−1)ⁿ⁺¹/n is <b>conditionally convergent</b>: it converges, but Σ|aₙ| diverges.<br>Σ(−1)ⁿ⁺¹/n² is <b>absolutely convergent</b>: even Σ|aₙ| converges.`;},`<div class="readout ab-r"></div>`).run();}

const TY=[{t:'sin x',f:Math.sin,c:k=>k%2?((k-1)/2%2?-1:1)/fact(k):0,s:'x − x³/3! + x⁵/5! − …',g:{x0:-7,x1:7,y0:-3,y1:3}},{t:'cos x',f:Math.cos,c:k=>k%2?0:(k/2%2?-1:1)/fact(k),s:'1 − x²/2! + x⁴/4! − …',g:{x0:-7,x1:7,y0:-3,y1:3}},{t:'eˣ',f:Math.exp,c:k=>1/fact(k),s:'1 + x + x²/2! + x³/3! + …',g:{x0:-4,x1:3,y0:-2,y1:10}},{t:'ln(1 + x)',f:x=>x>-1?Math.log(1+x):NaN,c:k=>k?(k%2?1:-1)/k:0,s:'x − x²/2 + x³/3 − … (|x| ≤ 1, x ≠ −1)',g:{x0:-1.5,x1:2.5,y0:-3,y1:2}},{t:'1/(1 − x)',f:x=>1/(1-x),c:()=>1,s:'1 + x + x² + x³ + … (|x| < 1)',g:{x0:-2,x1:1.5,y0:-2,y1:8}}];
function mTaylor(el){K.pickSlide(el,TY,[{k:'n',l:'degree n',min:0,max:15,step:1,v:3},{k:'x',l:'evaluate at x',min:-1,max:1,step:.05,v:0.5}],(V,F)=>{const Pn=x=>{let s=0;for(let k=0;k<=V.n;k++)s+=F.c(k)*x**k;return s;};const G=grid(Object.assign({u:420/(F.g.x1-F.g.x0),uy:220/(F.g.y1-F.g.y0),lab:1,laby:1},F.g));
  let s=curve(G,x=>F.t==='1/(1 − x)'&&Math.abs(x-1)<0.03?NaN:F.f(x),'#2563eb',3.5)+curve(G,Pn,'#e11d48',2.5)+(isFinite(F.f(V.x))?gdot(G,V.x,F.f(V.x),'#2563eb',6):'')+gdot(G,V.x,Pn(V.x),'#e11d48',6);
  $('.ty-g',el).innerHTML=G.svg(s);$('.ty-r',el).innerHTML=`${F.t} = ${F.s}<br>Degree-${V.n} Maclaurin polynomial (red) at x = ${nf(V.x)}: <b>${Pn(V.x).toFixed(6)}</b> · actual: <b>${isFinite(F.f(V.x))?F.f(V.x).toFixed(6):'undefined (outside the domain)'}</b>${isFinite(F.f(V.x))?' · error '+Math.abs(Pn(V.x)-F.f(V.x)).toExponential(2):''}<br><span class="mute">Coefficients: cₖ = f⁽ᵏ⁾(0)/k!. Higher degree hugs the curve over a wider window.</span>`;},`<div class="ty-g"></div><div class="readout ty-r"></div>`);}

function mLag(el){sliders(el,[{k:'n',l:'degree n',min:1,max:8,step:1,v:3},{k:'x',l:'x',min:0.1,max:1,step:.05,v:0.5}],V=>{const n=V.n,x=V.x;let P=0;for(let k=0;k<=n;k++)P+=x**k/fact(k);const err=Math.exp(x)-P,bnd=Math.exp(x)*x**(n+1)/fact(n+1),bnd3=3*x**(n+1)/fact(n+1);
  $('.lg-r',el).innerHTML=`Approximate e<sup>${nf(x)}</sup> with P<sub>${n}</sub>(x) = 1 + x + … + xⁿ/n!: <b>${P.toFixed(8)}</b> (actual ${Math.exp(x).toFixed(8)}).<br>Actual error: <b>${err.toExponential(3)}</b><br>Lagrange bound: |Rₙ(x)| ≤ M·|x|ⁿ⁺¹/(n + 1)!, with M = max|f⁽ⁿ⁺¹⁾| on [0, x] = e<sup>${nf(x)}</sup> < 3 → bound <b>${bnd3.toExponential(3)}</b> ${err<=bnd3?'✓ (the true error is smaller)':''}`;},`<div class="readout lg-r"></div>`).run();}

function mRad(el){sliders(el,[{k:'x',l:'x',min:-4,max:4,step:.1,v:2},{k:'N',l:'terms N',min:5,max:200,step:5,v:40}],V=>{const x=V.x;let s=0,S=[];for(let n=1;n<=V.N;n++){s+=x**n/(n*3**n);S.push([n,s]);}
  const inside=x>-3&&x<3,edge=Math.abs(Math.abs(x)-3)<1e-9;const G=grid({x0:0,x1:V.N+1,y0:-3,y1:3,u:420/(V.N+1),uy:30,lab:Math.ceil(V.N/5),laby:1});
  $('.rd-g',el).innerHTML=`<svg viewBox="0 0 460 60" class="fig" style="max-width:460px"><line x1="20" y1="30" x2="440" y2="30" stroke="#374151" stroke-width="2"/><rect x="${230-3*45}" y="22" width="${6*45}" height="16" fill="rgba(5,150,105,.25)"/><circle cx="${230-3*45}" cy="30" r="6" fill="#059669"/><circle cx="${230+3*45}" cy="30" r="6" fill="#fff" stroke="#e11d48" stroke-width="3"/>${[-4,-3,0,3,4].map(v=>`<text x="${230+v*45}" y="56" text-anchor="middle" font-size="12">${fmtNeg(v)}</text>`).join('')}<circle cx="${230+x*45}" cy="30" r="5" fill="#1f2937"/></svg>`+G.svg(hline(G,0,'#94a3b8','')+dots(G,S.filter(p=>Math.abs(p[1])<3.5),'#e11d48',3));
  $('.rd-r',el).innerHTML=`Σ xⁿ/(n·3ⁿ). Ratio test: |x|/3 < 1 → <b>radius R = 3</b>.<br>Endpoints: x = −3 gives Σ(−1)ⁿ/n (converges); x = 3 gives Σ1/n (diverges). <b>Interval: [−3, 3)</b>.<br>At x = ${nf(x)}: S<sub>${V.N}</sub> = ${Math.abs(s)<1e6?K.r3(s):'huge'} → ${inside||Math.abs(x+3)<1e-9?'settles (converges)':'does not settle (diverges)'}.`;},`<div class="rd-g"></div><div class="readout rd-r"></div>`).run();}

const CMN=[{t:'e^(x²)',s:['eᵘ = 1 + u + u²/2! + u³/3! + …','Substitute u = x².','e^(x²) = 1 + x² + x⁴/2! + x⁶/3! + …']},{t:'x cos x',s:['cos x = 1 − x²/2! + x⁴/4! − …','Multiply every term by x.','x cos x = x − x³/2! + x⁵/4! − …']},{t:'1/(1 + x²)',s:['1/(1 − u) = 1 + u + u² + … (|u| < 1)','Substitute u = −x².','1/(1 + x²) = 1 − x² + x⁴ − x⁶ + … (|x| < 1)']},{t:'arctan x',s:['1/(1 + x²) = 1 − x² + x⁴ − …','Integrate term by term (arctan 0 = 0).','arctan x = x − x³/3 + x⁵/5 − … (|x| ≤ 1)']},{t:'d/dx[1/(1 − x)]',s:['1/(1 − x) = 1 + x + x² + x³ + …','Differentiate term by term.','1/(1 − x)² = 1 + 2x + 3x² + 4x³ + …']}];
function mCommon(el){chooser(el,CMN.map(F=>({t:F.t,html:()=>`<ol>${F.s.map((x,i)=>`<li class="${i===2?'math':''}" style="margin:6px 0">${i===2?'<b>'+x+'</b>':x}</li>`).join('')}</ol><div class="readout">Build new series from known ones by substituting, multiplying, differentiating, or integrating — no new derivatives needed. The radius of convergence stays the same (endpoints may change).</div>`})));}

/* ---------- lessons ---------- */
L['CA-10-1']={goal:'I can distinguish sequences from series, compute partial sums, and define convergence of a series.',
 life:{title:'Adding forever',html:'Walk halfway to a wall, then half the remaining distance, and so on. You take infinitely many steps but travel a finite distance: 1/2 + 1/4 + 1/8 + … = 1. When does an infinite sum make sense?'},
 see:[{title:'Terms and partial sums',hint:'Pick a series and increase N. Do the red partial sums level off?',mount:mPartial}],
 vocab:[['Sequence','A list a₁, a₂, a₃, …; it converges if lim aₙ exists.'],['Series','Σ aₙ = a₁ + a₂ + …'],['Partial sum','Sₙ = a₁ + … + aₙ.'],['Convergent series','lim Sₙ = S (finite); S is the sum.'],['Divergent','The partial sums do not approach a finite number.']],
 examples:[ex('Example','Σ 1/(n(n + 1)) = Σ [1/n − 1/(n + 1)]',[['Sₙ = 1 − 1/(n + 1)','Telescoping.'],['lim Sₙ = 1: converges to 1','']])],
 mistake:{bad:'aₙ → 0, so Σ aₙ converges',good:'terms → 0 is necessary, not sufficient',why:'Σ1/n has terms → 0 but diverges.'},
 practice(){if(Math.random()<0.5){const a=rand(1,5),d=rand(1,4),n=rand(3,6);let S=0;for(let k=0;k<n;k++)S+=a+k*d;return num(`aₙ = ${a} + ${d}(n − 1). Find the partial sum S<sub>${n}</sub>.`,[[`S${n} =`,S]],'Add the first terms.',[[`${Array.from({length:n},(_,k)=>a+k*d).join(' + ')} = ${S}`,'']]);}
  const T=pick([{s:'aₙ = (3n + 1)/(n + 2)',a:'converges to 3'},{s:'aₙ = (−1)ⁿ',a:'diverges'},{s:'aₙ = 5/2ⁿ',a:'converges to 0'},{s:'aₙ = ln n',a:'diverges'}]);return mc(`Does the sequence ${T.s} converge?`,T.a,['converges to 3','diverges','converges to 0','converges to 1'],'Find lim aₙ as n → ∞.');},
 check:[q('A series converges if…',['its terms → 0','its partial sums approach a finite limit','it has a pattern','n → ∞'],1,''),q('S₃ for 1 + 1/2 + 1/4 + … =',['1.75','2','1.5','1.875'],0,''),q('Σ 1/n…',['converges','diverges','= 1','= 0'],1,'')]};

L['CA-10-2']={goal:'I can determine whether a geometric series converges and find its sum.',
 life:{title:'A bouncing ball',html:'A ball dropped from 10 m rebounds to 60% of its height each bounce. The total distance it travels is a geometric series — finite, even though it bounces forever.'},
 see:[{title:'Geometric partial sums',hint:'Move r across −1 and 1.',mount:mGeo}],
 vocab:[['Geometric series','Σ_{n=0}^∞ a rⁿ = a + ar + ar² + …'],['Convergence','Converges ⇔ |r| < 1.'],['Sum','a/(1 − r) = first term/(1 − ratio).'],['Starting index','Use the actual first term as a.']],
 examples:[ex('Example','Σ_{n=1}^∞ 4(−1/3)ⁿ',[['first term a = 4(−1/3) = −4/3, r = −1/3',''],['sum = (−4/3)/(1 + 1/3) = −1','']])],
 mistake:{bad:'Σ_{n=1}^∞ (1/2)ⁿ = 1/(1 − 1/2) = 2',good:'= (1/2)/(1 − 1/2) = 1',why:'The first term (n = 1) is 1/2, not 1.'},
 practice(){const a=nz(-6,9),d=pick([2,3,4,5]),k=nz(-d+1,d-1);const r=k/d;return num(`Find Σ<sub>n=0</sub><sup>∞</sup> ${a}(${frac(k,d)})ⁿ. (fraction or decimal)`,[['sum =',a/(1-r),0.011]],'a/(1 − r).',[[`${a}/(1 − ${P(r)}) = ${K.pf(a/(1-r))}`,'']]);},
 check:[q('Σ rⁿ converges when…',['r < 1','|r| < 1','r > 0','always'],1,''),q('Σ_{n=0}^∞ (1/3)ⁿ =',['1/3','3/2','3','2/3'],1,''),q('Σ 2ⁿ…',['= 2','diverges','= −1','= 1/2'],1,'')]};

L['CA-10-3']={goal:'I can use the nth-term test for divergence and know when it is inconclusive.',
 life:{title:'The quick screen',html:'Before any careful test, a doctor takes your temperature. The nth-term test is that quick screen: if the terms do not shrink to 0, the sum cannot possibly settle.'},
 see:[{title:'Do the terms go to 0?',hint:'Pick a series and read the term table.',mount:mNth}],
 vocab:[['nth-term test','If lim aₙ ≠ 0 (or does not exist), Σaₙ diverges.'],['Inconclusive','If lim aₙ = 0, the series might converge or diverge.'],['Only proves divergence','It can never prove convergence.']],
 examples:[ex('Example','Σ (2n² + 1)/(5n² − n)',[['lim aₙ = 2/5 ≠ 0',''],['diverges by the nth-term test','']])],
 mistake:{bad:'lim 1/√n = 0, so Σ1/√n converges by the nth-term test',good:'the test is inconclusive',why:'Σ1/√n is a p-series with p = 1/2 and diverges.'},
 practice(){const a=rand(1,6),b=rand(1,6);const T=pick([{s:`Σ (${a}n + 1)/(${b}n + 3)`,a:'diverges by the nth-term test'},{s:`Σ ${a}/(n + ${b})`,a:'nth-term test is inconclusive'},{s:`Σ ${a}/n²`,a:'nth-term test is inconclusive'},{s:`Σ (−1)ⁿ`,a:'diverges by the nth-term test'},{s:`Σ n²/(${a}n² + ${b})`,a:'diverges by the nth-term test'}]);
  return mc(`What does the nth-term test say about ${T.s}?`,T.a,['diverges by the nth-term test','nth-term test is inconclusive','converges by the nth-term test'],'Find lim aₙ.');},
 check:[q('lim aₙ = 3. Σaₙ…',['converges to 3','diverges','is inconclusive','= 0'],1,''),q('lim aₙ = 0. Σaₙ…',['converges','diverges','needs another test','= 0'],2,''),q('The nth-term test can prove…',['convergence','divergence','both','neither'],1,'')]};

L['CA-10-4']={goal:'I can use the integral test and the p-series test.',
 life:{title:'Bars under a curve',html:'Stack rectangles of height 1/n² and width 1: they fit under the curve y = 1/x², whose area from 1 to ∞ is finite. So the stack has finite height too.'},
 see:[{title:'Series vs. integral',hint:'Change p. Compare the bars with the area under the curve.',mount:mIntT}],
 vocab:[['Integral test','If f is positive, continuous, decreasing for x ≥ 1 and f(n) = aₙ, then Σaₙ and ∫₁^∞ f(x)dx both converge or both diverge.'],['p-series','Σ 1/nᵖ converges ⇔ p > 1.'],['Harmonic series','Σ 1/n (p = 1) diverges.'],['Not the sum','The integral’s value is not the series’ sum.']],
 examples:[ex('Example','Σ 1/(n ln n), n ≥ 2',[['f(x) = 1/(x ln x) is positive and decreasing',''],['∫₂^∞ dx/(x ln x) = lim ln(ln b) − ln(ln 2) = ∞',''],['diverges','']])],
 mistake:{bad:'Σ1/n² = ∫₁^∞ 1/x² dx = 1',good:'the test gives convergence, not the sum',why:'Σ1/n² = π²/6 ≈ 1.645, not 1.'},
 practice(){const [p,pv]=pick([['1/2',0.5],['1',1],['3/2',1.5],['2',2],['3',3],['0.9',0.9],['1.1',1.1]]);return mc(`Σ 1/n^(${p}) …`,pv>1?'converges (p > 1)':'diverges (p ≤ 1)',['converges (p > 1)','diverges (p ≤ 1)'],'p-series test.');},
 check:[q('Σ1/n^1.01…',['converges','diverges','= 1','inconclusive'],0,''),q('Σ1/√n…',['converges','diverges','= 2','= 0'],1,''),q('The integral test needs f to be…',['increasing','positive and decreasing','negative','periodic'],1,'')]};

L['CA-10-5']={goal:'I can use the direct comparison and limit comparison tests.',
 life:{title:'Compare with a known budget',html:'If your spending each month is less than a friend’s, and your friend’s total over the year is finite, so is yours. Comparison tests do this with series whose behavior we already know.'},
 see:[{title:'Side-by-side terms',hint:'Pick a pair and compare their bars and ratios.',mount:mCmp}],
 vocab:[['Direct comparison','0 ≤ aₙ ≤ bₙ: Σbₙ converges ⇒ Σaₙ converges; Σaₙ diverges ⇒ Σbₙ diverges.'],['Limit comparison','aₙ, bₙ > 0 and lim aₙ/bₙ = c with 0 < c < ∞ ⇒ both converge or both diverge.'],['Choosing bₙ','Keep the dominant terms: (3n + 1)/(n³ − 2) behaves like 3/n².']],
 examples:[ex('Example','Σ (n + 1)/(n³ + 2)',[['compare with bₙ = 1/n²',''],['aₙ/bₙ = (n³ + n²)/(n³ + 2) → 1',''],['Σ1/n² converges, so the series converges (LCT)','']])],
 mistake:{bad:'1/(n² − 1) > 1/n² and Σ1/n² converges, so Σ1/(n² − 1) converges by direct comparison',good:'use limit comparison',why:'Being bigger than a convergent series proves nothing. The limit comparison test works: ratio → 1.'},
 practice(){const T=pick([{s:'Σ 1/(n³ + 5)',a:'converges'},{s:'Σ 1/(2n + 3)',a:'diverges'},{s:'Σ (n + 2)/(n² + 1)',a:'diverges'},{s:'Σ √n/(n² + 1)',a:'converges'},{s:'Σ 3ⁿ/(4ⁿ + 1)',a:'converges'},{s:'Σ 1/√(n + 1)',a:'diverges'}]);
  return mc(`Using a comparison test, ${T.s}…`,T.a,['converges','diverges'],'Keep only the dominant terms and compare to a p-series or geometric series.');},
 check:[q('Limit comparison needs lim aₙ/bₙ to be…',['0','∞','finite and positive','1 exactly'],2,''),q('(2n + 5)/(n³ − 1) behaves like…',['1/n','2/n²','2/n³','n'],1,''),q('aₙ ≤ bₙ and Σbₙ diverges. Then Σaₙ…',['converges','diverges','no conclusion','= 0'],2,'')]};

L['CA-10-6']={goal:'I can use the alternating series test and bound the error of a partial sum.',
 life:{title:'Zigzag to the answer',html:'Step forward 1, back 1/2, forward 1/3, back 1/4… You zigzag closer and closer to a point. Each step is smaller than the last, so you never overshoot by more than your next step.'},
 see:[{title:'Alternating partial sums',hint:'Increase N. The error always fits inside the purple box of size aₙ₊₁.',mount:mAlt}],
 vocab:[['Alternating series test','Σ(−1)ⁿbₙ converges if bₙ > 0, bₙ is decreasing, and lim bₙ = 0.'],['Error bound','|S − Sₙ| ≤ bₙ₊₁ (the first omitted term).'],['Over/under','The sign of the first omitted term tells whether Sₙ is below or above S.']],
 examples:[ex('Example','How many terms of Σ(−1)ⁿ⁺¹/n² for error < 0.01?',[['need 1/(n + 1)² < 0.01',''],['n + 1 > 10 → n = 10 terms','']])],
 mistake:{bad:'Σ(−1)ⁿ n/(n + 1) converges because it alternates',good:'it diverges: terms → ±1',why:'Alternating is not enough; bₙ must decrease to 0.'},
 practice(){const p=pick([1,2,3]),N=rand(3,9);return num(`Using S<sub>${N}</sub> to approximate Σ(−1)ⁿ⁺¹/n${p>1?A2.sup(p):''}, give the alternating series error bound. (decimal, 5 places)`,[['bound =',+(1/(N+1)**p).toFixed(5),0.00002]],'First omitted term.',[[`1/${N+1}${p>1?A2.sup(p):''} ≈ ${(1/(N+1)**p).toFixed(5)}`,'']]);},
 check:[q('Alternating series error ≤',['first term','first omitted term','last term used','0'],1,''),q('Σ(−1)ⁿ/ln n (n ≥ 2)…',['converges','diverges','inconclusive','= 0'],0,''),q('The AST requires bₙ to…',['increase','decrease to 0','be constant','alternate'],1,'')]};

L['CA-10-7']={goal:'I can use the ratio test, especially for series with factorials and exponentials.',
 life:{title:'How fast do terms shrink?',html:'If each term is eventually less than half the previous one, the series is beaten by a geometric series with r = 1/2. The ratio test measures that shrink factor.'},
 see:[{title:'Successive ratios',hint:'Pick a series. Read the ratios as n grows.',mount:mRatio}],
 vocab:[['Ratio test','L = lim |aₙ₊₁/aₙ|. L < 1: converges absolutely. L > 1 (or ∞): diverges. L = 1: inconclusive.'],['Factorials','(n + 1)!/n! = n + 1.'],['When to use','Factorials, kⁿ, and products — not p-series (L = 1).']],
 examples:[ex('Example','Σ 3ⁿ/n!',[['|aₙ₊₁/aₙ| = 3/(n + 1)',''],['L = 0 < 1: converges','']])],
 mistake:{bad:'the ratio test says Σ1/n² diverges since L = 1',good:'L = 1 means inconclusive',why:'Use the p-series test instead.'},
 practice(){const k=rand(2,6),T=pick(['fac','pow','npow']);if(T==='fac')return mc(`Ratio test on Σ ${k}ⁿ/n!: L = ?`,'0, converges',['0, converges',`${k}, diverges`,'1, inconclusive','∞, diverges'],`|aₙ₊₁/aₙ| = ${k}/(n + 1).`);
  if(T==='pow')return num(`Ratio test on Σ n/${k}ⁿ: find L. (fraction or decimal)`,[['L =',1/k,0.011]],`|aₙ₊₁/aₙ| = (n + 1)/(${k}n) → 1/${k}.`,[[`L = 1/${k} < 1: converges`,'']]);
  return mc(`Ratio test on Σ n!/${k}ⁿ:`,'L = ∞, diverges',['L = 0, converges',`L = 1/${k}, converges`,'L = 1, inconclusive','L = ∞, diverges'],`|aₙ₊₁/aₙ| = (n + 1)/${k} → ∞.`);},
 check:[q('L = 0.4 →',['diverges','converges absolutely','inconclusive','= 0.4'],1,''),q('(n + 1)!/n! =',['n','n + 1','1','(n + 1)n'],1,''),q('L = 1 →',['converges','diverges','inconclusive','= 1'],2,'')]};

L['CA-10-8']={goal:'I can classify a series as absolutely convergent, conditionally convergent, or divergent.',
 life:{title:'Cancellation helps — sometimes',html:'Σ(−1)ⁿ⁺¹/n converges only because positive and negative terms cancel. Strip the signs and it diverges. That fragile kind of convergence has a name: conditional.'},
 see:[{title:'With and without signs',hint:'Increase N. Compare each alternating series with its absolute-value version.',mount:mAbs}],
 vocab:[['Absolutely convergent','Σ|aₙ| converges (then Σaₙ converges too).'],['Conditionally convergent','Σaₙ converges but Σ|aₙ| diverges.'],['Procedure','Test Σ|aₙ| first; if it diverges, test Σaₙ (often with the AST).']],
 examples:[ex('Example','Σ(−1)ⁿ/√n',[['Σ1/√n diverges (p = 1/2)',''],['AST: 1/√n decreases to 0 → converges',''],['conditionally convergent','']])],
 mistake:{bad:'Σ|aₙ| diverges, so Σaₙ diverges',good:'Σaₙ may still converge conditionally',why:'Signs can create cancellation.'},
 practice(){const T=pick([{s:'Σ(−1)ⁿ/n',a:'conditionally convergent'},{s:'Σ(−1)ⁿ/n²',a:'absolutely convergent'},{s:'Σ(−1)ⁿ/√n',a:'conditionally convergent'},{s:'Σ(−1)ⁿ n/(n + 1)',a:'divergent'},{s:'Σ(−1)ⁿ/2ⁿ',a:'absolutely convergent'},{s:'Σ(−1)ⁿ/ln n (n ≥ 2)',a:'conditionally convergent'}]);
  return mc(`Classify ${T.s}.`,T.a,['absolutely convergent','conditionally convergent','divergent'],'Test Σ|aₙ| first.');},
 check:[q('Absolutely convergent means…',['Σaₙ converges','Σ|aₙ| converges','aₙ → 0','alternates'],1,''),q('Σ(−1)ⁿ/n is…',['absolutely convergent','conditionally convergent','divergent','geometric'],1,''),q('If Σ|aₙ| converges, then Σaₙ…',['diverges','converges','is inconclusive','= 0'],1,'')]};

L['CA-10-9']={goal:'I can build Taylor and Maclaurin polynomials and use them to approximate function values.',
 life:{title:'How calculators compute sin',html:'A calculator cannot “look up” sin(0.5). It adds a few terms of a polynomial: 0.5 − 0.5³/6 + 0.5⁵/120 ≈ 0.4794255. Polynomials only need + and ×, which chips do very fast.'},
 see:[{title:'Taylor polynomials',hint:'Pick a function and raise the degree.',mount:mTaylor}],
 vocab:[['Taylor polynomial at a','Pₙ(x) = Σ_{k=0}^{n} f⁽ᵏ⁾(a)/k! · (x − a)ᵏ.'],['Maclaurin','Taylor at a = 0.'],['Matching','Pₙ matches f and its first n derivatives at a.'],['Coefficient','The coefficient of (x − a)ᵏ is f⁽ᵏ⁾(a)/k!.']],
 examples:[ex('Example','Third-degree Taylor polynomial of ln x at a = 1.',[['f(1) = 0, f′(1) = 1, f″(1) = −1, f‴(1) = 2',''],['P₃ = (x − 1) − (x − 1)²/2 + (x − 1)³/3','2/3! = 1/3.']])],
 mistake:{bad:'coefficient of x³ = f‴(0)',good:'= f‴(0)/3!',why:'Divide by k! so the derivatives match.'},
 practice(){const k=rand(2,5),d=rand(-6,6);return num(`f(${0}) = ${rand(-3,3)}, and f⁽${k}⁾(0) = ${d}. Find the coefficient of x${A2.sup(k)} in the Maclaurin polynomial. (fraction or decimal)`,[['coefficient =',d/fact(k),0.0011]],'f⁽ᵏ⁾(0)/k!.',[[`${d}/${k}! = ${d}/${fact(k)} = ${frac(d,fact(k))}`,'']]);},
 check:[q('Maclaurin means centered at…',['1','0','a','π'],1,''),q('Coefficient of (x − a)ᵏ:',['f⁽ᵏ⁾(a)','f⁽ᵏ⁾(a)/k!','k!f(a)','f(a)/k'],1,''),q('P₂ for eˣ at 0:',['1 + x','1 + x + x²/2','x + x²','1 + x + x²'],1,'')]};

L['CA-10-10']={goal:'I can use the Lagrange error bound to bound the error of a Taylor polynomial.',
 life:{title:'A guaranteed tolerance',html:'An engineer needs sin(0.1) to within 10⁻⁶. How many terms are enough? The Lagrange bound gives a guarantee without knowing the exact answer.'},
 see:[{title:'Error vs. bound',hint:'Change n and x. The true error is always under the bound.',mount:mLag}],
 vocab:[['Lagrange error bound','|Rₙ(x)| ≤ M|x − a|ⁿ⁺¹/(n + 1)!, M ≥ |f⁽ⁿ⁺¹⁾| between a and x.'],['Finding M','For sin and cos, M = 1 works. For eˣ on [0, x], M = eˣ (≤ 3 if x ≤ 1).'],['Use','Choose n so the bound is below the tolerance.']],
 examples:[ex('Example','Bound the error of P₃ for sin x at x = 0.2.',[['M = 1 (all derivatives of sin are ≤ 1)',''],['|R₃| ≤ 0.2⁴/4! ≈ 6.7 × 10⁻⁵','']])],
 mistake:{bad:'use f⁽ⁿ⁾ for M',good:'use the (n + 1)th derivative',why:'The remainder after degree n is controlled by the next derivative.'},
 practice(){const x=pick([0.1,0.2,0.3,0.5]),n=rand(2,5);const b=x**(n+1)/fact(n+1);return num(`Use M = 1 to bound the error of the degree-${n} Maclaurin polynomial of cos x at x = ${x}. (scientific ok, e.g. 2.6e-5 → enter 0.000026)`,[['bound ≈',+b.toPrecision(3),b*0.02]],'M|x|ⁿ⁺¹/(n + 1)!.',[[`${x}${A2.sup(n+1)}/${n+1}! ≈ ${b.toExponential(2)}`,'']]);},
 check:[q('The Lagrange bound uses the derivative of order…',['n','n + 1','n − 1','0'],1,''),q('For sin x, M can be…',['0','1','x','e'],1,''),q('Increasing n generally makes the bound…',['larger','smaller','unchanged','negative'],1,'')]};

L['CA-10-11']={goal:'I can find the radius and interval of convergence of a power series, testing the endpoints.',
 life:{title:'Where does the formula work?',html:'1 + x + x² + … equals 1/(1 − x) — but only for |x| < 1. Outside that window the sum blows up. Every power series has a window like this: its interval of convergence.'},
 see:[{title:'Inside, edge, outside',hint:'Move x across −3 and 3. Watch the partial sums.',mount:mRad}],
 vocab:[['Power series','Σ cₙ(x − a)ⁿ.'],['Radius R','Converges for |x − a| < R, diverges for |x − a| > R.'],['Finding R','Ratio test on |cₙ₊₁(x − a)ⁿ⁺¹/(cₙ(x − a)ⁿ)| < 1.'],['Endpoints','Test x = a ± R separately (p-series, AST, …).']],
 examples:[ex('Example','Σ (x − 2)ⁿ/n',[['ratio: |x − 2|·n/(n + 1) → |x − 2| < 1',''],['x = 3: Σ1/n diverges; x = 1: Σ(−1)ⁿ/n converges',''],['interval [1, 3)','']])],
 mistake:{bad:'the interval is (1, 3) from the ratio test',good:'test both endpoints',why:'The ratio test gives L = 1 at the endpoints, so it says nothing there.'},
 practice(){const a=rand(-3,3),k=rand(2,5);return num(`Find the radius of convergence of Σ (x ${a<0?'+':'−'} ${Math.abs(a)})ⁿ/${k}ⁿ, and its center.`,[['R =',k],['center =',a]],'Ratio test: |x − a|/k < 1.',[[`|x − ${P(a)}| < ${k}: R = ${k}, centered at ${fmtNeg(a)}`,'']]);},
 check:[q('The ratio test gives R; endpoints must be…',['ignored','tested separately','always included','always excluded'],1,''),q('Σ xⁿ/n! has radius…',['0','1','∞','e'],2,''),q('Σ n! xⁿ has radius…',['0','1','∞','n'],0,'')]};

L['CA-10-12']={goal:'I can use the Maclaurin series for eˣ, sin x, cos x, 1/(1 − x), and ln(1 + x), and build new series by substitution, multiplication, differentiation, and integration.',
 life:{title:'A small library',html:'Five memorized series generate hundreds of others. To get e^(−x²) you do not compute derivatives — you substitute −x² into the series for eᵘ. This trick computes the normal-distribution areas used in statistics.'},
 see:[{title:'Make new series from old',hint:'Pick a target and follow the moves.',mount:mCommon},{title:'Compare with the function',hint:'Raise the degree and watch the polynomial hug the curve.',mount:mTaylor}],
 vocab:[['eˣ','Σ xⁿ/n! (all x).'],['sin x','Σ (−1)ⁿ x²ⁿ⁺¹/(2n + 1)! (all x).'],['cos x','Σ (−1)ⁿ x²ⁿ/(2n)! (all x).'],['1/(1 − x)','Σ xⁿ (|x| < 1).'],['ln(1 + x)','Σ (−1)ⁿ⁺¹xⁿ/n (−1 < x ≤ 1).']],
 examples:[ex('Example','Find lim_{x→0} (sin x − x)/x³ with series.',[['sin x − x = −x³/6 + x⁵/120 − …',''],['÷ x³ = −1/6 + x²/120 − … → −1/6','']])],
 mistake:{bad:'sin(2x) = 2x − x³/3! + …',good:'= 2x − (2x)³/3! + (2x)⁵/5! − …',why:'Substitute 2x for every x, including inside the powers.'},
 practice(){const T=pick([{f:'e^(2x)',c:3,v:8/6,h:'(2x)³/3! = 8x³/6'},{f:'cos(3x)',c:2,v:-9/2,h:'−(3x)²/2!'},{f:'x·eˣ',c:3,v:1/2,h:'x·(x²/2!)'},{f:'1/(1 − 2x)',c:3,v:8,h:'(2x)³'},{f:'sin(x²)',c:6,v:-1/6,h:'−(x²)³/3!'},{f:'ln(1 + x)',c:3,v:1/3,h:'+x³/3'}]);
  return num(`Find the coefficient of x${A2.sup(T.c)} in the Maclaurin series for ${T.f}. (fraction or decimal)`,[['coefficient =',T.v,0.0011]],'Start from a known series and substitute or multiply.',[[`term: ${T.h} → ${K.pf(T.v)}`,'']]);},
 check:[q('Maclaurin series of eˣ:',['Σxⁿ','Σxⁿ/n!','Σ(−1)ⁿxⁿ/n','Σx²ⁿ'],1,''),q('1/(1 + x) =',['Σxⁿ','Σ(−1)ⁿxⁿ','Σxⁿ/n','Σnxⁿ'],1,'Substitute −x.'),q('Integrating 1/(1 + x²) term by term gives the series for…',['ln(1 + x)','arctan x','arcsin x','eˣ'],1,'')]};

TOOLS['CA-10']={title:'Taylor polynomial approximations',hint:'Pick a function and raise the degree: the polynomial hugs the curve over a wider and wider window.',mount:mTaylor};
})();
