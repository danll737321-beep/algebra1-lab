/* Algebra 2 · Unit 10 · Rational functions */
(function(){const {sliders,graphLab,chooser,ex,q,mc,num,nz,curve,TOOLS,nf,hline,vline,hole,stepper,fr,ps}=A2;
const safe=(f,poles)=>x=>poles.some(p=>Math.abs(x-p)<0.02)?NaN:f(x);
function mRecip(el){graphLab(el,{g:{x0:-8,x1:8,y0:-8,y1:8,u:26,lab:2,laby:2},params:[{k:'a',l:'a',min:-4,max:4,step:.5,v:2},{k:'h',l:'h',min:-5,max:5,v:1},{k:'k',l:'k',min:-5,max:5,v:-1}],
 curves:V=>[{f:safe(x=>1/x,[0]),col:'#9ca3af',w:2,dash:'6 5'},{f:safe(x=>V.a/(x-V.h)+V.k,[V.h])}],extra:(G,V)=>vline(G,V.h)+hline(G,V.k),
 eq:V=>`f(x) = ${nf(V.a)}/(x ${V.h<0?'+':'−'} ${Math.abs(V.h)}) ${V.k<0?'−':'+'} ${Math.abs(V.k)}`,
 read:V=>`Vertical asymptote <b>x = ${fmtNeg(V.h)}</b> (the input that makes the denominator 0). Horizontal asymptote <b>y = ${fmtNeg(V.k)}</b>. ${V.a>0?'Branches in the upper-right and lower-left of the asymptote cross.':V.a<0?'a < 0: branches flip to upper-left and lower-right.':'a = 0 collapses to a line.'}<br><span class="mute">Same transformation rules as every other function: h right, k up, a stretches/flips.</span>`});}
function mAsym(el){chooser(el,[
 {t:'deg num < deg den',html:()=>panel(x=>(2*x+1)/(x*x-4),[-2,2],'f(x) = (2x + 1)/(x² − 4)','VA: x = −2, x = 2. HA: <b>y = 0</b> — the bottom grows faster, so f → 0.',0)},
 {t:'equal degrees',html:()=>panel(x=>(3*x-6)/(x+1),[-1],'f(x) = (3x − 6)/(x + 1)','VA: x = −1. HA: <b>y = 3/1 = 3</b> — ratio of leading coefficients.',3)},
 {t:'deg num > deg den',html:()=>panel(x=>(x*x+1)/(x-1),[1],'f(x) = (x² + 1)/(x − 1)','VA: x = 1. <b>No horizontal asymptote</b>: the top wins. (Long division gives a slant asymptote y = x + 1.)',null,x=>x+1)},
 {t:'denominator never 0',html:()=>panel(x=>4/(x*x+1),[],'f(x) = 4/(x² + 1)','x² + 1 is never 0 → <b>no vertical asymptote</b>. HA: y = 0.',0)}]);
 function panel(f,poles,eq,txt,ha,slant){const G=grid({x0:-6,x1:6,y0:-8,y1:8,u:30,uy:20,lab:1,laby:2});let s=poles.map(p=>vline(G,p)).join('')+(ha!==null&&ha!==undefined?hline(G,ha):'')+(slant?curve(G,slant,'#e11d48',2,'6 5'):'')+curve(G,safe(f,poles));return `<div class="eqline math">${eq}</div>${G.svg(s)}<div class="readout">${txt}</div>`;}}
function mHole(el){graphLab(el,{g:{x0:-7,x1:7,y0:-8,y1:8,u:28,uy:20,lab:1,laby:2},params:[{k:'a',l:'cancelled factor (x − a): a',min:-5,max:5,v:2},{k:'b',l:'other zero b',min:-5,max:5,v:-3}],
 curves:V=>[{f:safe(x=>(x-V.b),[V.a])}],extra:(G,V)=>hole(G,V.a,V.a-V.b),
 eq:V=>`f(x) = (x ${V.a<0?'+':'−'} ${Math.abs(V.a)})(x ${V.b<0?'+':'−'} ${Math.abs(V.b)}) / (x ${V.a<0?'+':'−'} ${Math.abs(V.a)})`,
 read:V=>`The factor (x − ${fmtNeg(V.a)}) cancels, so the graph is the line y = x ${V.b<0?'+':'−'} ${Math.abs(V.b)} — <b>except</b> at x = ${fmtNeg(V.a)}, where f is undefined. That gap is a <b>hole</b> at (${fmtNeg(V.a)}, ${fmtNeg(V.a-V.b)}).<br><span class="mute">Cancelled factor → hole. Factor left in the denominator → vertical asymptote.</span>`});}
function mMul(el){stepper(el,[{t:'Multiply',steps:[{h:'<div class="eqline math">(x² − 9)/(x + 1) · (x² + x)/(x − 3)</div>',n:'Factor everything first.'},{h:'<div class="eqline math">(x − 3)(x + 3)/(x + 1) · x(x + 1)/(x − 3)</div>',n:'Factored.'},{h:'<div class="eqline math">x(x + 3)</div>',n:'Cancel (x − 3) and (x + 1). Restrictions: x ≠ −1, 3.'}]},
 {t:'Divide',steps:[{h:'<div class="eqline math">(2x + 4)/(x² − 1) ÷ (x + 2)/(x − 1)</div>',n:'Dividing = multiplying by the reciprocal.'},{h:'<div class="eqline math">2(x + 2)/((x − 1)(x + 1)) · (x − 1)/(x + 2)</div>',n:'Flip the second fraction and factor.'},{h:'<div class="eqline math">2/(x + 1)</div>',n:'Cancel. Restrictions: x ≠ ±1, −2.'}]}]);}
function mAdd(el){stepper(el,[{t:'Like denominators',steps:[{h:'<div class="eqline math">(3x)/(x − 2) − 6/(x − 2)</div>',n:'Same denominator: combine numerators.'},{h:'<div class="eqline math">(3x − 6)/(x − 2) = 3(x − 2)/(x − 2) = 3</div>',n:'Simplify (x ≠ 2).'}]},
 {t:'Unlike denominators',steps:[{h:'<div class="eqline math">2/x + 3/(x + 1)</div>',n:'LCD = x(x + 1).'},{h:'<div class="eqline math">2(x + 1)/(x(x + 1)) + 3x/(x(x + 1))</div>',n:'Rewrite each fraction with the LCD.'},{h:'<div class="eqline math">(5x + 2)/(x(x + 1))</div>',n:'Add numerators: 2x + 2 + 3x.'}]},
 {t:'Subtract carefully',steps:[{h:'<div class="eqline math">x/(x − 1) − (x + 3)/(x² − 1)</div>',n:'LCD = (x − 1)(x + 1).'},{h:'<div class="eqline math">x(x + 1)/((x − 1)(x + 1)) − (x + 3)/((x − 1)(x + 1))</div>',n:'Rewrite.'},{h:'<div class="eqline math">(x² + x − x − 3)/((x − 1)(x + 1)) = (x² − 3)/(x² − 1)</div>',n:'Subtract the WHOLE numerator (x + 3).'}]}]);}

L['A2-10-1']={goal:'I can graph f(x) = a/(x − h) + k and identify its asymptotes.',
 life:{title:'Sharing a pizza',html:'A $24 pizza split among x friends costs 24/x each. More friends → smaller share, but it never reaches 0; one friend → $24; zero friends makes no sense. That curve is a <b>rational function</b>, and its “never reaches” lines are <b>asymptotes</b>.'},
 see:[{title:'Transform y = 1/x',hint:'Move a, h, k. The red lines are the asymptotes.',mount:mRecip}],
 vocab:[['Rational function','A ratio of polynomials p(x)/q(x).'],['Vertical asymptote','x-value where the denominator is 0 (and doesn’t cancel).'],['Horizontal asymptote','Value f approaches as x → ±∞.']],
 examples:[ex('Example 1','Asymptotes of f(x) = 3/(x + 2) − 4',[['VA: x = −2','x + 2 = 0.'],['HA: y = −4','The −4 shifts y = 0 down.']]),
  ex('Example 2','Domain of f(x) = 5/(x − 7)',[['all reals except 7','']])],
 mistake:{bad:'f(x) = 2/(x − 3) has VA x = −3',good:'x = 3',why:'Solve x − 3 = 0.'},
 practice(){const a=nz(-6,6),h=rand(-6,6),k=rand(-6,6);return num(`f(x) = ${a}/(x ${h<0?'+':'−'} ${Math.abs(h)}) ${k<0?'−':'+'} ${Math.abs(k)}. Vertical asymptote x = ?, horizontal asymptote y = ?`,[['x =',h],['y =',k]],'Denominator = 0; the added constant.',[[`x = ${h}, y = ${k}`,'']]);},
 check:[q('VA of 1/(x + 5)?',['x = 5','x = −5','y = 5','y = 0'],1,''),q('HA of 4/x + 2?',['y = 4','y = 2','x = 2','y = 0'],1,''),q('Does 1/x ever equal 0?',['yes at x = 0','yes as x → ∞','no','only for negative x'],2,'')]};

L['A2-10-2']={goal:'I can find vertical and horizontal asymptotes of p(x)/q(x) by comparing degrees.',
 life:{title:'Average cost',html:'Making x phone cases costs 500 + 3x dollars, so the average cost is (500 + 3x)/x. As x grows, the average approaches $3 — a horizontal asymptote set by the <b>ratio of leading terms</b>.'},
 see:[{title:'Three degree cases',hint:'Click each case. Compare degrees of top and bottom.',mount:mAsym}],
 vocab:[['VA','Zeros of the denominator that don’t cancel.'],['HA rule','deg top < deg bottom → y = 0; equal → ratio of leading coefficients; top bigger → none.'],['Slant asymptote','When deg top = deg bottom + 1.']],
 examples:[ex('Example 1','f(x) = (4x² − 1)/(2x² + x)',[['equal degrees → HA y = 4/2 = 2',''],['2x² + x = x(2x + 1) → VA x = 0, x = −½','']]),
  ex('Example 2','Average cost (500 + 3x)/x',[['HA y = 3','Approaches $3 per case.']])],
 mistake:{bad:'HA of (2x + 1)/(x² + 1) is y = 2',good:'y = 0',why:'Bottom degree is bigger, so the fraction shrinks to 0.'},
 practice(){const a=nz(-6,6),c=rand(1,5),r=nz(-5,5),b=rand(-9,9);if(a*r+b===0)return num('f(x) = 1/(x − 2). Vertical asymptote x = ?',[['x =',2]],'',[['x = 2','']]);return num(`f(x) = (${ps([a,b])}) / (${ps([c,-c*r])}). Vertical asymptote x = ?, horizontal asymptote y = ?`,[['VA x =',r],['HA y =',a/c,0.011]],'Denominator = 0; equal degrees → ratio of leading coefficients.',[[`${ps([c,-c*r])} = 0 → x = ${r}`,'VA.'],[`y = ${a}/${c} = ${fr(a,c)}`,'HA.']]);},
 check:[q('HA of (5x³ + 1)/(2x³)?',['y = 5','y = 5/2','y = 0','none'],1,''),q('HA of x²/(x + 1)?',['y = 1','y = 0','none','y = −1'],2,''),q('VAs of 1/((x − 1)(x + 4))?',['x = 1, −4','x = −1, 4','y = 0','x = 1 only'],0,'')]};

L['A2-10-3']={goal:'I can find holes (removable discontinuities) and tell them apart from vertical asymptotes.',
 life:{title:'A missing point',html:'f(x) = (x² − 4)/(x − 2) looks like it should blow up at x = 2, but the factor (x − 2) cancels: the graph is just the line y = x + 2 with <b>one point missing</b>. Spotting cancellation tells you hole vs. asymptote.'},
 see:[{title:'Make a hole',hint:'Move a (the cancelled factor) and b.',mount:mHole}],
 vocab:[['Hole','A single missing point where a factor cancels.'],['Find the hole’s y','Plug the x-value into the simplified function.'],['Asymptote vs. hole','Remaining denominator factor → VA; cancelled → hole.']],
 examples:[ex('Example 1','f(x) = (x² − 4)/(x − 2)',[['(x − 2)(x + 2)/(x − 2) = x + 2, x ≠ 2','Cancel.'],['hole at (2, 4)','Plug 2 into x + 2.']]),
  ex('Example 2','f(x) = (x + 1)/((x + 1)(x − 3))',[['hole at x = −1: y = 1/(−1 − 3) = −¼',''],['VA x = 3','Doesn’t cancel.']])],
 mistake:{bad:'Every zero of the denominator is a VA',good:'Cancelled zeros are holes',why:'If the same factor is on top, it cancels and leaves a hole instead.'},
 practice(){const a=rand(-6,6),b=rand(-6,6);if(a===b)return num('f(x) = (x − 1)(x + 2)/(x − 1). Hole at x = 1; y = ?',[['y =',3]],'Simplify first.',[['y = 1 + 2 = 3','']]);return num(`f(x) = (x ${a<0?'+':'−'} ${Math.abs(a)})(x ${b<0?'+':'−'} ${Math.abs(b)}) / (x ${a<0?'+':'−'} ${Math.abs(a)}). Find the hole (x, y).`,[['x =',a],['y =',a-b]],'Cancel, then plug x into what is left.',[[`f(x) = x ${b<0?'+':'−'} ${Math.abs(b)}, x ≠ ${a}`,'Cancel.'],[`(${a}, ${a-b})`,'Hole.']]);},
 check:[q('(x − 5)/(x − 5)(x + 1) has a hole at…',['x = 5','x = −1','x = 1','none'],0,''),q('…and a VA at…',['x = 5','x = −1','y = 0','none'],1,''),q('A hole means the graph…',['shoots to infinity','is missing one point','crosses the axis','is undefined everywhere'],1,'')]};

L['A2-10-4']={goal:'I can multiply and divide rational expressions and state restrictions.',
 life:{title:'Fractions with variables',html:'Multiplying (2/3)·(9/4) is easier after canceling: (2·9)/(3·4) → 3/2. Rational expressions work the same way — <b>factor first, then cancel</b> — with one extra job: remember which x-values were never allowed.'},
 see:[{title:'Factor, cancel, simplify',hint:'Step through multiplying and dividing.',mount:mMul}],
 vocab:[['Rational expression','A fraction of polynomials.'],['Cancel factors','Only common factors cancel, never terms.'],['Restrictions','Values making any original denominator (or divisor) 0.']],
 examples:[ex('Example','Simplify (x² + 5x + 6)/(x² − 9)',[['(x + 2)(x + 3)/((x − 3)(x + 3))','Factor.'],['(x + 2)/(x − 3), x ≠ ±3','Cancel.']])],
 mistake:{bad:'(x + 5)/5 = x',good:'cannot cancel',why:'5 is a <b>term</b> of the numerator, not a factor. Only factors cancel.'},
 practice(){const a=nz(-6,6);let b,c;do{b=nz(-6,6);}while(b===a);do{c=nz(-6,6);}while(c===a||c===b);return num(`Simplify <b>(x² ${-(a+b)<0?'−':'+'} ${Math.abs(a+b)}x ${a*b<0?'−':'+'} ${Math.abs(a*b)}) / (x² ${-(a+c)<0?'−':'+'} ${Math.abs(a+c)}x ${a*c<0?'−':'+'} ${Math.abs(a*c)})</b> to (x − p)/(x − q).`.replace(/\+ 0x |− 0x /g,''),[['p =',b],['q =',c]],'Factor both; one factor cancels.',[[`(x − ${P(a)})(x − ${P(b)}) / ((x − ${P(a)})(x − ${P(c)}))`,'Factor.'],[`(x − ${P(b)})/(x − ${P(c)})`,'Cancel.']]);},
 check:[q('(x² − 1)/(x − 1) = ?',['x','x + 1','x − 1','1'],1,'x ≠ 1.'),q('Dividing by a/b means multiplying by…',['a/b','b/a','−a/b','ab'],1,''),q('(x/3)·(6/x²) = ?',['2/x','2x','6/x³','x/2'],0,'')]};

L['A2-10-5']={goal:'I can add and subtract rational expressions using a common denominator.',
 life:{title:'Round trip speed',html:'Drive 60 miles at speed r, return at r + 10. Total time = 60/r + 60/(r + 10). Adding these needs a <b>common denominator</b> — exactly like 1/2 + 1/3, but with polynomials.'},
 see:[{title:'Find the LCD and combine',hint:'Step through each case.',mount:mAdd}],
 vocab:[['LCD','Least common denominator: product of all distinct factors.'],['Rewrite','Multiply top and bottom by the missing factors.'],['Subtract the whole numerator','Use parentheses.']],
 examples:[ex('Example','1/(x − 2) + 1/(x + 2)',[['LCD (x − 2)(x + 2)',''],['(x + 2 + x − 2)/((x − 2)(x + 2))',''],['2x/(x² − 4)','']])],
 mistake:{bad:'1/x + 1/y = 2/(x + y)',good:'(y + x)/(xy)',why:'Never add denominators. Find the LCD first.'},
 practice(){const a=rand(1,6),b=rand(1,6),p=nz(-5,5),qq=nz(-5,5);if(p===qq)return num('1/x + 1/x = k/x. k = ?',[['k =',2]],'',[['2/x','']]);// a/(x−p) + b/(x−q) = ((a+b)x − (aq + bp)) / ((x−p)(x−q))
  return num(`Add <b>${a}/(x ${p<0?'+':'−'} ${Math.abs(p)}) + ${b}/(x ${qq<0?'+':'−'} ${Math.abs(qq)})</b>. The result is (mx + n)/((x − ${P(p)})(x − ${P(qq)})).`,[['m =',a+b],['n =',-(a*qq+b*p)]],'Rewrite both with the LCD, add numerators.',[[`${a}(x − ${P(qq)}) + ${b}(x − ${P(p)})`,'Numerator.'],[`${a+b}x ${-(a*qq+b*p)<0?'−':'+'} ${Math.abs(a*qq+b*p)}`,'Combine.']]);},
 check:[q('LCD of 1/x and 1/(x + 3)?',['x + 3','x(x + 3)','3x','x² + 3'],1,''),q('2/x − 1/x = ?',['1/x','1/0','2','1'],0,''),q('1/2 + 1/x = ?',['2/(2 + x)','(x + 2)/(2x)','1/(2x)','(x + 2)/2'],1,'')]};

TOOLS['A2-10']={title:'Rational function lab',hint:'Transform y = 1/x and watch the asymptotes.',mount:mRecip};
})();
