/* Algebra 1B · Module 2 · Polynomial Operations */
(function(){
const SUP=['','','²','³','⁴','⁵'];
function polyStr(c,v='x'){const n=c.length-1;let s='';c.forEach((a,i)=>{const d=n-i;if(!a)return;const vv=d===0?'':d===1?v:v+SUP[d];const abs=Math.abs(a),coef=(abs===1&&d>0)?'':abs;s+=s?(a<0?' − ':' + ')+coef+vv:(a<0?MINUS:'')+coef+vv;});return s||'0';}
const PM=(c,v)=>mx(polyStr(c,v));
const COL={2:['#bfdbfe','#2563eb'],1:['#bbf7d0','#15803d'],0:['#fde68a','#b45309']},NEG=['#fecaca','#b91c1c'];
function tileSVG(c,o={}){/* c=[x2,x,1]; o.cross={2:n,1:n,0:n} number crossed per sign pair */
 const W=o.W||560;let x=10,y=10,rowH=0,s='';const put=(w,h,fill,st,lab,crossed)=>{if(x+w>W-10){x=10;y+=rowH+8;rowH=0;}s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${st}" stroke-width="2" ${crossed?'opacity=".35"':''}/>`;if(lab)s+=`<text x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle" font-size="${h>30?15:11}" font-weight="700" fill="${st}" font-family="Georgia,serif" ${crossed?'opacity=".45"':''}>${lab}</text>`;if(crossed)s+=`<line x1="${x}" y1="${y}" x2="${x+w}" y2="${y+h}" stroke="#b91c1c" stroke-width="2.5"/>`;x+=w+6;rowH=Math.max(rowH,h);};
 [[2,48,48,'x²'],[1,16,48,'x'],[0,16,16,'']].forEach(([d,w,h,l],i)=>{const n=c[2-d]||0;const pos=n>0,cr=(o.cross&&o.cross[d])||0;
  if(o.pairs&&o.pairs[d]){const [p,q]=o.pairs[d];for(let k=0;k<p;k++)put(w,h,COL[d][0],COL[d][1],l,k<Math.min(p,q));for(let k=0;k<q;k++)put(w,h,NEG[0],NEG[1],l?'−'+l:'−',k<Math.min(p,q));}
  else for(let k=0;k<Math.abs(n);k++)put(w,h,pos?COL[d][0]:NEG[0],pos?COL[d][1]:NEG[1],pos?l:(l?'−'+l:'−'),false);
  x+=10;});
 return {s,H:y+rowH+10,W};}
const tsvg=(c,o)=>{const t=tileSVG(c,o);return `<svg viewBox="0 0 ${t.W} ${t.H}" class="fig" style="max-width:${t.W}px">${t.s}</svg>`;};
const legend=`<div class="legend" style="font-size:14px"><span><b style="color:#2563eb">■</b> x² tile</span><span><b style="color:#15803d">▮</b> x tile</span><span><b style="color:#b45309">▪</b> 1 tile</span><span><b style="color:#b91c1c">■</b> red = negative</span></div>`;

/* ---- widgets ---- */
function mountLike(el){
 const P=[[2,'x²'],[3,'x'],[-1,'1'],[1,'x²'],[-1,'x'],[4,'1']];let grouped=false;
 el.innerHTML=`${legend}<div class="eqline math" id="leq"></div><div id="lt"></div><div class="row" style="justify-content:center"><button class="primary" data-g>Group like terms</button><button data-r>↺ Mix them up</button></div><div class="readout" id="lr"></div>`;
 const draw=()=>{const tot=[3,2,3];
  if(!grouped){let s='',x=10;const SZ={'x²':[48,48],'x':[16,48],'1':[16,16]};P.forEach(([n,t],i)=>{if(i){s+=`<text x="${x+8}" y="45" text-anchor="middle" font-size="22" font-weight="700">${n<0?MINUS:'+'}</text>`;x+=24;}const [w,h]=SZ[t];for(let k=0;k<Math.abs(n);k++){const pos=n>0||i===0&&n>0;const d=t==='x²'?2:t==='x'?1:0;s+=`<rect x="${x}" y="${58-h}" width="${w}" height="${h}" rx="3" fill="${COL[d][0]}" stroke="${COL[d][1]}" stroke-width="2"/>`+(t!=='1'?`<text x="${x+w/2}" y="${58-h/2+5}" text-anchor="middle" font-size="${w>30?15:11}" font-weight="700" fill="${COL[d][1]}" font-family="Georgia,serif">${t}</text>`:'');x+=w+5;}x+=4;});
   $('#lt',el).innerHTML=`<svg viewBox="0 0 ${x+6} 70" class="fig" style="max-width:${Math.min(560,(x+6)*1.2)}px">${s}</svg>`;$('#leq',el).innerHTML=mx('2x² + 3x − 1 + x² − x + 4');$('#lr',el).innerHTML='A messy polynomial. Which tiles have the <b>same shape</b>?';}
  else{$('#lt',el).innerHTML=tsvg([3,0,0],{pairs:{2:[3,0]}})+tsvg([0,3,0],{pairs:{1:[3,1]}})+tsvg([0,0,4],{pairs:{0:[4,1]}});$('#leq',el).innerHTML=mx('(2x² + x²) + (3x − x) + (−1 + 4)')+'<br>= '+PM(tot);
   $('#lr',el).innerHTML='<b>Like terms</b> have the same variable and exponent (same tile shape). Combine them by adding their coefficients. A red and a matching tile make a <b>zero pair</b> and cancel.<br>Result: <b>3x² + 2x + 3</b> — degree 2, three terms → a <b>trinomial</b>.';}};
 el.addEventListener('click',e=>{if(e.target.closest('[data-g]'))grouped=true;if(e.target.closest('[data-r]'))grouped=false;draw();});draw();
}
function mountAddTiles(el,sets){
 let k=0,st=0;
 el.innerHTML=`${legend}<div class="row">${sets.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div class="eqline math" id="aeq"></div><div id="at"></div><div class="row" style="justify-content:center"><button class="primary" data-n>Next ▶</button><button data-r>↺ Start over</button></div><div class="readout" id="ar"></div>`;
 const draw=()=>{const p=sets[k],A=p.A,B=p.sub&&st>=1?p.B.map(v=>-v):p.B,R=A.map((v,i)=>v+B[i]);let h='',msg='';
  $('#aeq',el).innerHTML=`(${PM(A)}) ${p.sub?MINUS:'+'} (${PM(p.B)})`;
  if(st===0){h=`<div class="tag">first</div>${tsvg(A)}<div class="tag">${p.sub?'second (to subtract)':'second'}</div>${tsvg(p.B)}`;msg=p.sub?'Subtracting is hard to do with tiles directly…':'Put both polynomials together.';}
  else if(p.sub&&st===1){h=`<div class="tag">first</div>${tsvg(A)}<div class="tag">opposite of the second</div>${tsvg(B)}`;msg='<b>Subtract = add the opposite.</b> Flip every tile in the second polynomial (change every sign).';}
  else{const pairs={};[2,1,0].forEach(d=>{const a=A[2-d],b=B[2-d];const pos=(a>0?a:0)+(b>0?b:0),neg=(a<0?-a:0)+(b<0?-b:0);pairs[d]=[pos,neg];});h=tsvg([0,0,0],{pairs});msg=`Group like tiles. Each red/matching pair is a <b>zero pair</b> (crossed out). What’s left: <b>${polyStr(R)}</b>`;}
  $('#at',el).innerHTML=h;$('#ar',el).innerHTML=msg;$('[data-n]',el).disabled=st>=(p.sub?2:1);$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.k!==undefined){k=+b.dataset.k;st=0;}if(b.dataset.n!==undefined)st++;if(b.dataset.r!==undefined)st=0;draw();});draw();
}
function boxTable(rows,cols,cells,hl){return `<table class="t" style="margin:8px auto;font-family:'Cambria Math','Times New Roman',serif;font-size:1.15em"><tr><th style="background:#fff"></th>${cols.map(c=>`<th style="background:#dcfce7">${c}</th>`).join('')}</tr>${rows.map((r,i)=>`<tr><th style="background:#dbeafe">${r}</th>${cols.map((c,j)=>`<td style="min-width:80px;${hl&&hl(i,j)?'background:#fef9c3;font-weight:700':''}">${cells[i][j]}</td>`).join('')}</tr>`).join('')}</table>`;}
function mountMono(el){
 const PR=[{t:'5x(2x² − 3x + 4)',m:[5,1],p:[[2,2],[-3,1],[4,0]]},{t:'−3x(x² + 2x − 6)',m:[-3,1],p:[[1,2],[2,1],[-6,0]]},{t:'🌱 Garden: 2x(x + 7)',m:[2,1],p:[[1,1],[7,0]],story:1}];let k=0,n=0;
 const term=(c,d)=>mx(polyStr(d===2?[c,0,0]:d===1?[c,0]:d===3?[c,0,0,0]:[c]));
 el.innerHTML=`<div class="row">${PR.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div id="mb"></div><div class="row" style="justify-content:center"><button class="primary" data-n>Fill next box ▶</button></div><div class="readout" id="mbr"></div>`;
 const draw=()=>{const p=PR[k],cells=[p.p.map(([c,d],j)=>j<n?term(p.m[0]*c,d+1):'?')];
  $('#mb',el).innerHTML=(p.story?'<p style="text-align:center;margin:0">A garden is <b>2x</b> ft wide and <b>(x + 7)</b> ft long. Area = width × length.</p>':'')+boxTable([term(p.m[0],1)],p.p.map(([c,d])=>term(c,d)),cells,(i,j)=>j===n-1);
  const done=n===p.p.length,res=p.p.map(([c,d])=>term(p.m[0]*c,d+1));
  $('#mbr',el).innerHTML=n===0?'The monomial goes on the side; each term of the polynomial goes on top. Each box = side × top.':(done?`Add the boxes: <b class="math">${res.join(' + ').replace(/\+ −/g,'− ').replace(/\+ <i class="v">/g,'+ <i class="v">')}</b>. `+(p.m[0]<0?'A negative monomial changes the sign of <b>every</b> term.':'This is the distributive property.')+(p.story?' The garden’s area is 2x² + 14x square feet.':''):`Box ${n}: ${term(p.m[0],1)} · ${term(...p.p[n-1])} = <b>${cells[0][n-1]}</b> (multiply coefficients, add exponents: x · x² = x³).`);
  $('[data-n]',el).disabled=done;$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.k!==undefined){k=+b.dataset.k;n=0;}if(b.dataset.n!==undefined)n++;draw();});draw();
}
function mountArea(el){
 let a=3,b=2;
 el.innerHTML=`<div class="ctrl"><label>a <input type="range" id="pa" min="-4" max="5" value="3"></label><label>b <input type="range" id="pb" min="-4" max="5" value="2"></label></div><div class="eqline math" id="peq"></div><div id="pg"></div><div class="readout" id="pr"></div>`;
 const draw=()=>{const U=26,X=110,L=30,T=30;const W=L+X+Math.abs(b)*U+40,H=T+X+Math.abs(a)*U+40;let s='';
  const R=(x,y,w,h,f,st,t)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="${st}" stroke-width="1.5"/>`+(t?`<text x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle" font-size="${w>40?16:11}" font-weight="700" fill="${st}" font-family="Georgia,serif">${t}</text>`:'');
  s+=R(L,T,X,X,'#bfdbfe','#2563eb','x²');
  for(let j=0;j<Math.abs(b);j++)s+=R(L+X+j*U,T,U,X,b>0?'#bbf7d0':'#fecaca',b>0?'#15803d':'#b91c1c',b>0?'x':'−x');
  for(let i=0;i<Math.abs(a);i++)s+=R(L,T+X+i*U,X,U,a>0?'#bbf7d0':'#fecaca',a>0?'#15803d':'#b91c1c',a>0?'x':'−x');
  for(let i=0;i<Math.abs(a);i++)for(let j=0;j<Math.abs(b);j++){const pos=a*b>0;s+=R(L+X+j*U,T+X+i*U,U,U,pos?'#fde68a':'#fecaca',pos?'#b45309':'#b91c1c',pos?'':'−');}
  s+=`<text x="${L+X/2}" y="${T-8}" text-anchor="middle" font-weight="800" fill="#2563eb">x</text>`+(b?`<text x="${L+X+Math.abs(b)*U/2}" y="${T-8}" text-anchor="middle" font-weight="800">${fmtNeg(b)}</text>`:'')+`<text x="${L-8}" y="${T+X/2}" text-anchor="end" font-weight="800" fill="#2563eb">x</text>`+(a?`<text x="${L-8}" y="${T+X+Math.abs(a)*U/2+5}" text-anchor="end" font-weight="800">${fmtNeg(a)}</text>`:'');
  $('#pg',el).innerHTML=`<svg viewBox="0 0 ${W} ${H}" class="fig" style="max-width:${Math.min(W*1.3,520)}px">${s}</svg>`;
  $('#peq',el).innerHTML=`(${PM([1,a])})(${PM([1,b])}) = ${PM([1,a+b,a*b])}`;
  $('#pr',el).innerHTML=`The rectangle is (x ${a<0?MINUS:'+'} ${Math.abs(a)}) tall and (x ${b<0?MINUS:'+'} ${Math.abs(b)}) wide. Its pieces: <b>1 x²</b> tile, <b>${fmtNeg(a)} + ${P(b)} = ${fmtNeg(a+b)}</b> x-tiles, and <b>${fmtNeg(a)} · ${P(b)} = ${fmtNeg(a*b)}</b> unit tiles.<br>Pattern: (x + a)(x + b) = x² + (a + b)x + ab.`;};
 $('#pa',el).addEventListener('input',e=>{a=+e.target.value;draw();});$('#pb',el).addEventListener('input',e=>{b=+e.target.value;draw();});draw();
}

/* ---- practice helpers ---- */
const r3=()=>[rand(-5,6),rand(-6,6),rand(-9,9)].map((v,i)=>i===0&&v===0?2:v);
const F3=(c)=>[{label:'x² coefficient:',answer:c[0]},{label:'x coefficient:',answer:c[1]},{label:'constant:',answer:c[2]}];

/* ---- lessons ---- */
L['1B-2-1']={
 goal:'I can identify the parts of a polynomial, combine like terms, and write it in standard form.',
 life:{title:'You can’t add quarters to dimes',html:'3 quarters + 2 dimes + 1 quarter = <b>4 quarters + 2 dimes</b>. You only combine coins of the <b>same kind</b>.<br>Polynomials work the same way: x² terms combine with x² terms, x terms with x terms, numbers with numbers. Algebra tiles make the “kinds” visible as <b>shapes</b>.'},
 see:[{title:'Like terms = same shape',hint:'Press “Group like terms” to sort the tiles.',mount:mountLike}],
 vocab:[['Monomial','A number, a variable, or their product (5, x, −3x²). One term.'],['Polynomial','A sum of monomials. Binomial = 2 terms, trinomial = 3 terms.'],['Like terms','Same variables with the same exponents (4x² and −x²). Coefficients can differ.'],['Degree','The highest exponent. Standard form: terms in order from highest to lowest degree.'],['Leading coefficient','The coefficient of the first term in standard form.']],
 examples:[
  {title:'Example 1 — Name the parts',prob:'For <span class="math">'+mx('−4x + 3x³ + 2 − 5x²')+'</span>: write it in standard form and give the degree.',raw:true,lines:[[PM([3,-5,-4,2]),'Order the terms by exponent, highest first.'],['degree 3','The highest exponent is 3 → cubic.'],['4 terms, leading coefficient 3','The constant 2 has no variable, so it isn’t a coefficient of a variable.']]},
  {title:'Example 2 — Combine like terms',prob:'Simplify <span class="math">'+mx('2x² + 3x − 1 + x² − x + 4')+'</span>.',raw:true,lines:[[mx('(2x² + x²) + (3x − x) + (−1 + 4)'),'Group like terms (keep each sign with its term).'],[PM([3,2,3]),'Add the coefficients.']]}],
 mistake:{bad:'3x² + 2x = 5x³',good:'3x² + 2x cannot be combined',why:'x² and x are <b>different kinds</b> of terms (different tile shapes). Only like terms combine, and adding never changes the exponent.'},
 practice(){
  if(Math.random()<.45){const deg=rand(1,4),nt=rand(1,3);const c=[...Array(deg+1)].map((_,i)=>i===0?pick([2,3,-4,5,1,-1]):0);let idx=[...Array(deg)].map((_,i)=>i+1);shuffle(idx).slice(0,nt-1).forEach(i=>c[i]=pick([-5,-2,3,4,7]));
   const terms=c.filter(Boolean).length,name=['','monomial','binomial','trinomial','polynomial (4 terms)'][terms];const m=mcFrom(`degree ${deg}, ${name}`,[`degree ${deg+1}, ${name}`,`degree ${deg}, ${['','binomial','trinomial','monomial','monomial'][terms]}`,`degree ${Math.max(0,deg-1)}, ${name}`].filter((v,i,a)=>a.indexOf(v)===i&&v!==`degree ${deg}, ${name}`));
   return {type:'mc',q:`Classify <span class="math">${PM(shuffle([0]).length?c:c)}</span> by degree and number of terms.`,opts:m.opts,a:m.a,why:`Highest exponent ${deg}; ${terms} term${terms>1?'s':''}.`};}
  const A=r3(),B=[rand(-4,4),rand(-5,5),rand(-8,8)];const R=A.map((v,i)=>v+B[i]);if(!R[0])return this.practice();
  return {q:`Simplify: <span class="math">${PM(A)}${B[0]||B[1]||B[2]?' '+(PM(B).startsWith(MINUS)?MINUS+' '+PM(B).slice(1):'+ '+PM(B)):''}</span><br><span class="mute">Write the answer as ax² + bx + c.</span>`,fields:F3(R),hint:'Group the x² terms, the x terms, and the constants. Keep each sign with its term.',sol:[[PM(R),'Add the coefficients of like terms.']]};},
 check:[
  {q:'Which pair are like terms?',o:['3x² and 3x','5xy and −2xy','4x and 4','x³ and 3x'],a:1,why:'Same variables with the same exponents.'},
  {q:'What is the degree of 7x² − 3x⁴ + x?',o:['2','4','7','3'],a:1,why:'The highest exponent is 4.'},
  {q:'Simplify 4x² − x + 2 − x² + 5x.',o:['3x² + 4x + 2','5x² + 4x + 2','3x² − 6x + 2','8x² + 2'],a:0,why:'4x² − x² = 3x², −x + 5x = 4x, constant 2.'}]
};

L['1B-2-2']={
 goal:'I can add polynomials using a horizontal or vertical format.',
 life:{title:'Combining two orders',html:'Two classes order supplies. Class A: 2 boxes of markers, 3 packs of paper, 4 erasers. Class B: 1 box of markers, −1 pack (they return one), −6 erasers (returns). Combined order? Add <b>item by item</b>.<br>Adding polynomials is exactly that: line up the like terms and add them.'},
 see:[{title:'Add with tiles',hint:'Press Next. Matching red and colored tiles cancel as zero pairs.',mount:el=>mountAddTiles(el,[{t:'(2x² + 3x + 4) + (x² − x − 6)',A:[2,3,4],B:[1,-1,-6]},{t:'(x² − 2x + 3) + (−x² + 4x + 1)',A:[1,-2,3],B:[-1,4,1]}])}],
 vocab:[['Horizontal format','Write the sum in a row, remove parentheses, group like terms.'],['Vertical format','Stack the polynomials so like terms line up in columns, then add down.'],['Zero pair','A term and its opposite (3x and −3x) add to 0.']],
 examples:[
  {title:'Example A — Horizontal',prob:'Add <span class="math">'+mx('(12x² + 3x + 6) + (−5x² + 9x − 10)')+'</span>.',raw:true,lines:[[mx('12x² + 3x + 6 − 5x² + 9x − 10'),'Remove the parentheses.'],[mx('(12x² − 5x²) + (3x + 9x) + (6 − 10)'),'Group like terms.'],[PM([7,12,-4]),'Combine. Standard form.']]},
  {title:'Example B — Vertical',prob:'Add <span class="math">'+mx('(15x³ − 2x² + 13x − 4) + (3x² − 2x + 5)')+'</span>.',raw:true,lines:[[`<table class="eqt"><tr><td>15${mx('x')}³</td><td>− 2${mx('x')}²</td><td>+ 13${mx('x')}</td><td>− 4</td></tr><tr><td>+ 0</td><td>+ 3${mx('x')}²</td><td>− 2${mx('x')}</td><td>+ 5</td></tr><tr class="sum"><td>15${mx('x')}³</td><td>+ ${mx('x')}²</td><td>+ 11${mx('x')}</td><td>+ 1</td></tr></table>`,'Line up like terms. Use 0 for a missing term. Add each column.']]}],
 mistake:{bad:'(3x² + 2x) + (x² + 5x) = 4x⁴ + 7x²',good:'4x² + 7x',why:'When you <b>add</b>, the exponents stay the same. Only the coefficients change.'},
 practice(){const A=r3(),B=r3(),R=A.map((v,i)=>v+B[i]);if(!R[0])return this.practice();
  return {q:`Add: <span class="math">(${PM(A)}) + (${PM(B)})</span>`,fields:F3(R),hint:'Add the x² coefficients, then the x coefficients, then the constants.',sol:[[`(${A[0]} + ${P(B[0])})x² + (${A[1]} + ${P(B[1])})x + (${A[2]} + ${P(B[2])})`,'Group like terms.',true],[PM(R),'Combine.',true]]};},
 check:[
  {q:'(12x² + 3x + 6) + (−5x² + 9x − 10) = ?',o:['7x² + 12x − 4','17x² + 12x + 16','7x² + 12x + 16','7x⁴ + 12x² − 4'],a:0,why:'12 − 5 = 7, 3 + 9 = 12, 6 − 10 = −4.'},
  {q:'In the vertical format, what do you write for a missing term?',o:['Nothing — skip the column','0 (or a space) to keep columns lined up','1','x'],a:1,why:'Placeholders keep like terms aligned.'},
  {q:'(x² − 2x + 3) + (−x² + 4x + 1) = ?',o:['2x + 4','2x² + 2x + 4','−2x + 4','x² + 2x + 4'],a:0,why:'x² − x² = 0 (zero pair), −2x + 4x = 2x, 3 + 1 = 4.'}]
};

L['1B-2-3']={
 goal:'I can subtract polynomials by adding the opposite.',
 life:{title:'Subtracting a whole bill',html:'Your phone bill is <b>$40 + $5 per GB</b>; your friend’s is <b>$25 + $8 per GB</b>. How much more is yours? (40 + 5g) − (25 + 8g). The minus sign applies to <b>everything</b> in the friend’s bill: −25 <b>and</b> −8g.<br>Result: 15 − 3g dollars.'},
 see:[{title:'Subtract = add the opposite',hint:'Press Next: first flip the second polynomial, then cancel zero pairs.',mount:el=>mountAddTiles(el,[{t:'(3x² + 2x + 5) − (x² + 4x − 2)',A:[3,2,5],B:[1,4,-2],sub:1},{t:'(2x² − x + 1) − (2x² + 3x − 4)',A:[2,-1,1],B:[2,3,-4],sub:1}])}],
 vocab:[['Opposite of a polynomial','Change the sign of every term: the opposite of x² + 4x − 2 is −x² − 4x + 2.'],['Subtracting','Add the opposite of the polynomial being subtracted.'],['Distribute the −','−(a + b − c) = −a − b + c.']],
 examples:[
  {title:'Example A',prob:'Subtract <span class="math">'+mx('(3x² + 2x + 5) − (x² + 4x − 2)')+'</span>.',raw:true,lines:[[mx('(3x² + 2x + 5) + (−x² − 4x + 2)'),'Add the opposite of the second polynomial.'],[mx('(3x² − x²) + (2x − 4x) + (5 + 2)'),'Group like terms.'],[PM([2,-2,7]),'Combine.']]},
  {title:'Example B — Vertical',prob:'Subtract <span class="math">'+mx('(5x³ + 2x − 7) − (2x³ − x² + 6x − 1)')+'</span>.',raw:true,lines:[[`<table class="eqt"><tr><td>5${mx('x')}³</td><td>+ 0</td><td>+ 2${mx('x')}</td><td>− 7</td></tr><tr><td>− 2${mx('x')}³</td><td>+ ${mx('x')}²</td><td>− 6${mx('x')}</td><td>+ 1</td></tr><tr class="sum"><td>3${mx('x')}³</td><td>+ ${mx('x')}²</td><td>− 4${mx('x')}</td><td>− 6</td></tr></table>`,'Bottom row = the opposite of the second polynomial. Add down.']]}],
 mistake:{bad:'(3x² + 2x + 5) − (x² + 4x − 2) = 2x² − 2x + 3',good:'2x² − 2x + 7',why:'Subtracting −2 is <b>adding</b> 2. Change the sign of <b>every</b> term being subtracted.'},
 practice(){const A=r3(),B=r3(),R=A.map((v,i)=>v-B[i]);if(!R[0])return this.practice();
  return {q:`Subtract: <span class="math">(${PM(A)}) − (${PM(B)})</span>`,fields:F3(R),hint:`Add the opposite: (${polyStr(A)}) + (${polyStr(B.map(v=>-v))}).`,sol:[[`(${PM(A)}) + (${PM(B.map(v=>-v))})`,'Change every sign in the second polynomial.',true],[PM(R),'Combine like terms.',true]]};},
 check:[
  {q:'What is the opposite of 4x² − 3x + 1?',o:['−4x² − 3x + 1','−4x² + 3x − 1','4x² + 3x − 1','−4x² + 3x + 1'],a:1,why:'Change the sign of every term.'},
  {q:'(5x + 3) − (2x − 4) = ?',o:['3x − 1','3x + 7','7x − 1','3x + 1'],a:1,why:'5x − 2x = 3x and 3 − (−4) = 7.'},
  {q:'(40 + 5g) − (25 + 8g) = ?',o:['15 + 13g','15 − 3g','65 + 13g','15 + 3g'],a:1,why:'40 − 25 = 15 and 5g − 8g = −3g.'}]
};

L['1B-2-4']={
 goal:'I can multiply a polynomial by a monomial using the distributive property.',
 life:{title:'The area of a garden',html:'A garden is <b>2x</b> feet wide and <b>(x + 7)</b> feet long. Its area is 2x(x + 7). Split the rectangle into two parts: 2x · x and 2x · 7. Add them: <b>2x² + 14x</b> square feet.<br>That’s the distributive property, drawn as an <b>area model</b>.'},
 see:[{title:'Box (area) model',hint:'Fill each box: side × top. Then add the boxes.',mount:mountMono}],
 vocab:[['Distributive property','a(b + c) = ab + ac — multiply the outside term by every inside term.'],['Product of powers','xᵃ · xᵇ = xᵃ⁺ᵇ: add the exponents (x · x² = x³).'],['Negative monomial','Changes the sign of every term it multiplies.']],
 examples:[
  {title:'Example A',prob:'Find <span class="math">'+mx('5x(2x² − 3x + 4)')+'</span>.',raw:true,lines:[[mx('5x(2x²) + 5x(−3x) + 5x(4)'),'Distribute 5x to every term.'],[PM([10,-15,20,0]),'Multiply coefficients, add exponents.']]},
  {title:'Example B — Two variables',prob:'Find <span class="math">'+mx('(5x²y + 3xy² + 7xy)(2xy)')+'</span>.',raw:true,lines:[[mx('5x²y(2xy) + 3xy²(2xy) + 7xy(2xy)'),'Distribute 2xy.'],[mx('10x³y² + 6x²y³ + 14x²y²'),'Add the exponents of x and of y separately.']]},
  {title:'Example C — Negative monomial',prob:'Find <span class="math">'+mx('−3x(x² + 2x − 6)')+'</span>.',raw:true,lines:[[PM([-3,-6,18,0]),'Every sign changes: −3x · (−6) = +18x.']]}],
 mistake:{bad:'5x(2x² − 3x + 4) = 10x² − 15x + 20',good:'10x³ − 15x² + 20x',why:'x · x² = x³ — <b>add</b> the exponents. And the 4 gets multiplied by 5x too.'},
 practice(){const k=pick([2,3,4,5,-2,-3]),A=[pick([1,2,3,-1]),rand(-6,6),rand(-9,9)];const R=[k*A[0],k*A[1],k*A[2],0];
  return {q:`Multiply: <span class="math">${mx(T(k,'x'))}(${PM(A)})</span>`,fields:[{label:'x³ coefficient:',answer:R[0]},{label:'x² coefficient:',answer:R[1]},{label:'x coefficient:',answer:R[2]}],hint:`Multiply ${T(k,'x')} by each term. x · x² = x³, x · x = x², x · 1 = x.`,sol:[[PM(R),'Distribute and simplify.',true]]};},
 check:[
  {q:'5x(2x² − 3x + 4) = ?',o:['10x³ − 15x² + 20x','10x² − 15x + 20','10x³ − 3x + 4','7x³ + 2x² + 9x'],a:0,why:'Multiply 5x by every term; add exponents.'},
  {q:'x³ · x⁴ = ?',o:['x¹²','x⁷','2x⁷','x'],a:1,why:'Add the exponents: 3 + 4 = 7.'},
  {q:'−2x(3x − 5) = ?',o:['−6x² − 10x','−6x² + 10x','6x² − 10x','−6x + 10'],a:1,why:'−2x · 3x = −6x², −2x · (−5) = +10x.'}]
};

L['1B-2-5']={
 goal:'I can multiply binomials and polynomials using an area model, a table, or the distributive property.',
 life:{title:'Making a square patio bigger',html:'A square patio is <b>x</b> ft by <b>x</b> ft. You add <b>3 ft</b> to one side and <b>2 ft</b> to the other. New area: <b>(x + 3)(x + 2)</b>.<br>Draw it: one big square (x²), some long strips (x), and small squares (1). Count them up: <b>x² + 5x + 6</b>.'},
 see:[{title:'(x + a)(x + b) as a rectangle of tiles',hint:'Move a and b. Negative values make red tiles.',mount:mountArea}],
 vocab:[['Binomial','A polynomial with two terms (x + 3).'],['Area / box method','Put one factor’s terms on the side and the other’s on top; multiply to fill each box; add like terms.'],['FOIL','First, Outer, Inner, Last — a way to remember all 4 products of two binomials.']],
 examples:[
  {title:'Example 1 — Box method',prob:'Multiply <span class="math">'+mx('(x + 5)(x − 3)')+'</span>.',raw:true,lines:[[boxTable([mx('x'),'+5'],[mx('x'),'−3'],[[mx('x²'),mx('−3x')],[mx('5x'),'−15']]),'Fill each box: side × top.'],[mx('x² − 3x + 5x − 15'),'Add all the boxes.'],[PM([1,2,-15]),'Combine the like terms −3x + 5x.']]},
  {title:'Example 2 — Distribute twice',prob:'Multiply <span class="math">'+mx('(2a − 6)(3a + 5)')+'</span>.',raw:true,lines:[[mx('2a(3a + 5) − 6(3a + 5)'),'Distribute each term of the first binomial.'],[mx('6a² + 10a − 18a − 30'),'Multiply.'],[mx('6a² − 8a − 30'),'Combine like terms.']]},
  {title:'Example 3 — Binomial × trinomial',prob:'Multiply <span class="math">'+mx('(x + 2)(x² − 3x + 4)')+'</span>.',raw:true,lines:[[mx('x³ − 3x² + 4x + 2x² − 6x + 8'),'Every term times every term (2 × 3 = 6 products).'],[PM([1,-1,-2,8]),'Combine like terms.']]}],
 mistake:{bad:'(x + 3)(x + 2) = x² + 6',good:'x² + 5x + 6',why:'You need <b>all four</b> products. The two strips (3x and 2x) are the middle term.'},
 practice(){const p=pick([1,1,2,3]),q=rand(-6,6)||4,r=pick([1,1,2]),s=rand(-6,6)||-3;const R=[p*r,p*s+q*r,q*s];
  return {q:`Multiply: <span class="math">(${PM([p,q])})(${PM([r,s])})</span>`,fields:F3(R),hint:'Use a box: side terms × top terms, then add the two middle boxes.',sol:[[boxTable([PM([p,0]),fmtNeg(q)],[PM([r,0]),fmtNeg(s)],[[PM([p*r,0,0]),PM([p*s,0])],[PM([q*r,0]),fmtNeg(q*s)]]),'Box method.',true],[PM(R),`Middle term: ${fmtNeg(p*s)}x + ${P(q*r)}x = ${fmtNeg(R[1])}x.`,true]]};},
 check:[
  {q:'(x + 3)(x + 2) = ?',o:['x² + 6','x² + 5x + 6','x² + 6x + 5','2x + 5'],a:1,why:'x² + 2x + 3x + 6.'},
  {q:'How many products do you get from (x + 2)(x² − 3x + 4) before combining?',o:['3','5','6','9'],a:2,why:'2 terms × 3 terms = 6 products.'},
  {q:'(x − 4)(x + 4) = ?',o:['x² − 16','x² + 16','x² − 8x − 16','x² − 8'],a:0,why:'The middle terms −4x and +4x cancel.'}]
};
})();
