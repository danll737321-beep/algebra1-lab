/* Algebra 1B · Module 4 · Quadratic Functions */
(function(){
const r2=v=>+(+v).toFixed(2);
function q2(a,b,c,v='x'){let s='';[[a,2],[b,1],[c,0]].forEach(([k,d])=>{if(!k)return;const vv=d===2?v+'²':d===1?v:'';const ab=Math.abs(k),co=(ab===1&&d>0)?'':ab;s+=s?(k<0?' − ':' + ')+co+vv:(k<0?MINUS:'')+co+vv;});return s||'0';}
const Q=(a,b,c)=>mx(q2(a,b,c));
const aStr=a=>a===1?'':a===-1?MINUS:fmtNeg(a);
const xh=h=>h===0?'x':`x ${h<0?'+':'−'} ${Math.abs(h)}`;
const vform=(a,h,k)=>mx(`${aStr(a)}${h===0?'x':'('+xh(h)+')'}²${k?S(k):''}`);
function parab(G,f,col='#2563eb',w=3,dash=''){let d='';for(let x=G.x0;x<=G.x1+1e-9;x+=0.05){const y=Math.max(G.y0-3,Math.min(G.y1+3,f(x)));d+=(d?' L':'M')+G.X(x)+' '+G.Y(y);}return `<path clip-path="url(#${G.clip})" d="${d}" fill="none" stroke="${col}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;}
const axisLine=(G,h)=>`<line x1="${G.X(h)}" y1="${G.Y(G.y0)}" x2="${G.X(h)}" y2="${G.Y(G.y1)}" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6 5"/>`;
const AV=[-3,-2,-1,-0.5,0.5,1,2,3];

/* ---- widgets ---- */
function mountAK(el){
 let ai=5,k=0;
 el.innerHTML=`<div class="ctrl"><label>a <input type="range" id="aa" min="0" max="${AV.length-1}" value="5"></label><b id="av"></b><label>k <input type="range" id="kk" min="-5" max="5" value="0"></label><b id="kv"></b></div><div class="eqline math" id="ake"></div><div id="akg"></div><div class="readout" id="akr"></div>`;
 const draw=()=>{const a=AV[ai],G=grid({u:32});let s=parab(G,x=>x*x,'#9ca3af',2,'6 5')+parab(G,x=>a*x*x+k)+gdot(G,0,k,'#ea580c',8,`vertex (0, ${fmtNeg(k)})`);
  $('#akg',el).innerHTML=G.svg(s);$('#av',el).textContent=a;$('#kv',el).textContent=fmtNeg(k);$('#ake',el).innerHTML=`${mx('g(x)')} = ${Q(a,0,k)}`;
  const A=Math.abs(a);$('#akr',el).innerHTML=`Gray dashed = parent f(x) = x².<br><b>a = ${a}</b>: ${a<0?'opens <b>down</b> (reflected), ':'opens <b>up</b>, '}${A>1?'<b>narrower</b> (vertical stretch)':A<1?'<b>wider</b> (vertical compression)':'same width as x²'}. <b>k = ${fmtNeg(k)}</b>: ${k>0?`shifted <b>up ${k}</b>`:k<0?`shifted <b>down ${-k}</b>`:'no vertical shift'}.<br>Vertex (0, ${fmtNeg(k)}) is a <b>${a>0?'minimum':'maximum'}</b>. Axis of symmetry: x = 0. Range: y ${a>0?'≥':'≤'} ${fmtNeg(k)}.`;};
 $('#aa',el).addEventListener('input',e=>{ai=+e.target.value;draw();});$('#kk',el).addEventListener('input',e=>{k=+e.target.value;draw();});draw();
}
function mountVF(el){
 let ai=5,h=3,k=-2;
 el.innerHTML=`<div class="ctrl"><label>a <input type="range" id="va" min="0" max="${AV.length-1}" value="5"></label><label>h <input type="range" id="vh" min="-5" max="5" value="3"></label><label>k <input type="range" id="vk" min="-5" max="5" value="-2"></label></div><div class="eqline math" id="vfe"></div><div id="vfg"></div><div class="readout" id="vfr"></div>`;
 const draw=()=>{const a=AV[ai],G=grid({u:32});let s=parab(G,x=>x*x,'#9ca3af',2,'6 5')+axisLine(G,h)+parab(G,x=>a*(x-h)**2+k)+gdot(G,h,k,'#ea580c',8,`(h, k) = (${fmtNeg(h)}, ${fmtNeg(k)})`)+gdot(G,1+h,a+k,'#15803d',6,`(${fmtNeg(1+h)}, ${fmtNeg(a+k)})`);
  $('#vfg',el).innerHTML=G.svg(s);$('#vfe',el).innerHTML=`${mx('g(x)')} = ${vform(a,h,k)}`;
  $('#vfr',el).innerHTML=`Vertex <b>(h, k) = (${fmtNeg(h)}, ${fmtNeg(k)})</b>: moved <b>${h>0?'right '+h:h<0?'left '+(-h):'0 sideways'}</b> and <b>${k>0?'up '+k:k<0?'down '+(-k):'0 up/down'}</b> from (0, 0). Axis of symmetry (purple): <b>x = ${fmtNeg(h)}</b>.<br>Reference point (1, 1) on x² moves to <b>(1 + h, a + k) = (${fmtNeg(1+h)}, ${fmtNeg(a+k)})</b> (green). Watch the sign: (x − 3) moves <b>right</b> 3.`;};
 [['va',v=>ai=v],['vh',v=>h=v],['vk',v=>k=v]].forEach(([id,f])=>$('#'+id,el).addEventListener('input',e=>{f(+e.target.value);draw();}));draw();
}
function mountStd(el){
 const PR=[{t:'⚽ Ball: h = −16t² + 64t + 4',a:-16,b:64,c:4,G:{x0:0,x1:5,y0:0,y1:80,u:80,uy:4,lab:1,laby:10,gsy:10,xl:'time (s)',yl:'height (ft)'},v:'t'},{t:'y = x² − 4x + 3',a:1,b:-4,c:3,G:{u:32}},{t:'y = −x² − 2x + 3',a:-1,b:-2,c:3,G:{u:32}}];let k=0;
 el.innerHTML=`<div class="row">${PR.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div id="sg"></div><div class="readout" id="sr"></div>`;
 const draw=()=>{const p=PR[k],G=grid(p.G),hx=-p.b/(2*p.a),hy=p.a*hx*hx+p.b*hx+p.c;
  $('#sg',el).innerHTML=G.svg(axisLine(G,hx)+parab(G,x=>p.a*x*x+p.b*x+p.c)+gdot(G,hx,hy,'#ea580c',8,`vertex (${fmtNeg(r2(hx))}, ${fmtNeg(r2(hy))})`)+gdot(G,0,p.c,'#15803d',7,`(0, ${p.c})`));
  $('#sr',el).innerHTML=`a = ${fmtNeg(p.a)}, b = ${fmtNeg(p.b)}, c = ${fmtNeg(p.c)}.<br><b>Axis of symmetry:</b> x = −b ÷ 2a = ${fmtNeg(-p.b)} ÷ ${fmtNeg(2*p.a)} = <b>${fmtNeg(r2(hx))}</b>.<br><b>Vertex:</b> plug it in → y = ${fmtNeg(r2(hy))} → <b>(${fmtNeg(r2(hx))}, ${fmtNeg(r2(hy))})</b>, a ${p.a<0?'maximum (a < 0, opens down)':'minimum (a > 0, opens up)'}.<br><b>y-intercept:</b> (0, c) = (0, ${p.c}).`+(p.v?`<br>Meaning: the ball reaches its highest point, <b>${fmtNeg(r2(hy))} ft</b>, after <b>${fmtNeg(r2(hx))} s</b>. It started at 4 ft (the y-intercept).`:'');
  $$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;draw();}});draw();
}
function mountFact(el){
 let ai=3,p=-1,q=5;const AA=[-2,-1,-0.5,0.5,1,2];
 el.innerHTML=`<div class="ctrl"><label>a <input type="range" id="fa" min="0" max="5" value="3"></label><label>p <input type="range" id="fp" min="-5" max="5" value="-1"></label><label>q <input type="range" id="fq" min="-5" max="5" value="5"></label></div><div class="eqline math" id="ffe"></div><div id="ffg"></div><div class="readout" id="ffr"></div>`;
 const draw=()=>{const a=AA[ai],G=grid({x0:-6,x1:6,y0:-10,y1:10,u:32,uy:16,lab:1,laby:2,gsy:2}),h=(p+q)/2,kv=a*(h-p)*(h-q),f=x=>a*(x-p)*(x-q);
  let s=axisLine(G,h)+parab(G,f)+gdot(G,p,0,'#b91c1c',8,`(${fmtNeg(p)}, 0)`)+(q!==p?gdot(G,q,0,'#b91c1c',8,`(${fmtNeg(q)}, 0)`):'')+gdot(G,h,kv,'#ea580c',8,`vertex (${fmtNeg(r2(h))}, ${fmtNeg(r2(kv))})`);
  $('#ffg',el).innerHTML=G.svg(s);const fp=p===0?'x':`(${xh(p)})`,fq=q===0?'x':`(${xh(q)})`;
  $('#ffe',el).innerHTML=`${mx('y')} = ${mx(aStr(a)+fp+fq)} = ${Q(a,r2(-a*(p+q)),r2(a*p*q))}`;
  $('#ffr',el).innerHTML=`<b>Zeros</b> (red): set each factor = 0 → x = ${fmtNeg(p)} and x = ${fmtNeg(q)}.<br><b>Axis of symmetry</b> is exactly halfway between the zeros: x = (${fmtNeg(p)} + ${P(q)}) ÷ 2 = <b>${fmtNeg(r2(h))}</b>.<br><b>Vertex</b>: y = ${fmtNeg(r2(kv))} at x = ${fmtNeg(r2(h))}. Multiply out the factors to get the standard form (shown above).`;};
 [['fa',v=>ai=v],['fp',v=>p=v],['fq',v=>q=v]].forEach(([id,f])=>$('#'+id,el).addEventListener('input',e=>{f(+e.target.value);draw();}));draw();
}

/* ---- lessons ---- */
L['1B-4-1']={
 goal:'I can describe how a and k change the graph of the parent function f(x) = x².',
 life:{title:'Fountains and satellite dishes',html:'Water from a fountain makes an upside-down U; a satellite dish is a right-side-up U. Both are <b>parabolas</b> — the parent function x² stretched, flipped, or moved.<br>A narrow jet of water is like a big |a|; a wide, shallow dish is like a small |a|.'},
 see:[{title:'Stretch, flip, and shift',hint:'Change a and k. Compare with the gray parent graph.',mount:mountAK}],
 vocab:[['Parent function','f(x) = x², the simplest quadratic. Vertex (0, 0).'],['Vertex','The turning point — the minimum (opens up) or maximum (opens down).'],['Axis of symmetry','The vertical line through the vertex that splits the parabola into mirror halves.'],['|a| > 1 / |a| < 1','Narrower (vertical stretch) / wider (compression). a < 0 flips it.'],['k','Moves the graph up (k > 0) or down (k < 0).']],
 examples:[
  {title:'Example 1 — Parent table',prob:tableHTML([['x',[-3,-2,-1,0,1,2,3]],['x²',[9,4,1,0,1,4,9]]]),raw:true,lines:[['vertex (0, 0)','The turning point (minimum).'],['axis x = 0','Values repeat on both sides — symmetric.'],['domain all reals, range y ≥ 0','A square is never negative.']]},
  {title:'Example 2 — Describe g(x) = −2x² + 3',prob:'Compare with f(x) = x².',raw:true,lines:[['a = −2','Negative → reflected (opens down); |a| = 2 > 1 → narrower.'],['k = 3','Shifted up 3: vertex (0, 3) is now a maximum.'],['range y ≤ 3','The highest point is 3.']]}],
 mistake:{bad:'a = 0.5 makes the parabola narrower',good:'It makes it WIDER',why:'Multiplying by 0.5 makes every y-value <b>smaller</b>, so the graph rises more slowly → wider.'},
 practice(){const a=pick([-3,-2,-1,-0.5,0.5,2,3,4]),k=rand(-6,6);
  if(Math.random()<.5)return {q:`Find the vertex of <span class="math">${mx('g(x)')} = ${Q(a,0,k)}</span>. Is it a maximum or minimum?`,fields:[{label:'vertex x =',answer:0},{label:'vertex y =',answer:k}],raw:true,hint:'For g(x) = ax² + k the vertex is (0, k).',sol:[[`(0, ${fmtNeg(k)})`,a>0?'a > 0 → minimum.':'a < 0 → maximum.']]};
  const A=Math.abs(a),w=A>1?'narrower':'wider',d=a<0?'opens down':'opens up',sh=k>0?`up ${k}`:k<0?`down ${-k}`:'not shifted';const correct=`${w}, ${d}, ${sh}`;
  const m=mcFrom(correct,[`${A>1?'wider':'narrower'}, ${d}, ${sh}`,`${w}, ${a<0?'opens up':'opens down'}, ${sh}`,`${w}, ${d}, ${k>0?`down ${k}`:k<0?`up ${-k}`:'up 1'}`]);
  return {type:'mc',q:`Compared with f(x) = x², the graph of <span class="math">${mx('g(x)')} = ${Q(a,0,k)}</span> is…`,opts:m.opts,a:m.a,why:`|a| = ${A} → ${w}; a ${a<0?'<':'>'} 0 → ${d}; k = ${k} → ${sh}.`};},
 check:[
  {q:'g(x) = 3x² compared with x² is…',o:['wider','narrower','shifted up 3','reflected'],a:1,why:'|a| = 3 > 1 → vertical stretch → narrower.'},
  {q:'What is the vertex of g(x) = −x² + 5?',o:['(5, 0)','(0, 5), a maximum','(0, 5), a minimum','(0, −5)'],a:1,why:'k = 5; a < 0 so it opens down → maximum.'},
  {q:'What is the axis of symmetry of f(x) = x²?',o:['y = 0','x = 0','x = 1','y = x'],a:1,why:'The vertical line through the vertex (0, 0).'}]
};

L['1B-4-2']={
 goal:'I can graph g(x) = a(x − h)² + k and describe its transformations from f(x) = x².',
 life:{title:'Moving a sticker',html:'Picture the U-shape as a sticker. <b>h</b> slides it left or right, <b>k</b> slides it up or down, and <b>a</b> stretches or flips it. Vertex form tells you exactly where the sticker’s corner — the vertex — ends up: <b>(h, k)</b>.<br>Game designers and engineers move curves this way all the time.'},
 see:[{title:'Vertex form g(x) = a(x − h)² + k',hint:'Move a, h, k. Watch the vertex (orange) and the reference point (green).',mount:mountVF}],
 vocab:[['Vertex form','g(x) = a(x − h)² + k. Vertex (h, k).'],['h','Horizontal shift: x − 3 → right 3; x + 3 → left 3.'],['k','Vertical shift.'],['Reference point','(1, 1) on x² moves to (1 + h, a + k).']],
 examples:[
  {title:'Example',prob:'Describe <span class="math">'+mx('g(x) = 2(x − 3)² + 4')+'</span>.',raw:true,lines:[['a = 2','Vertical stretch → narrower than x².'],['h = 3','Right 3.'],['k = 4','Up 4. Vertex (3, 4), axis x = 3.'],['(1, 1) → (4, 6)','(1 + 3, 2 + 4).']]},
  {title:'Example — Watch the sign',prob:'Find the vertex of <span class="math">'+mx('g(x) = −(x + 5)² − 1')+'</span>.',raw:true,lines:[['x + 5 = x − (−5)','So h = −5 (left 5).'],['vertex (−5, −1)','k = −1. a = −1 → opens down → maximum.']]}],
 mistake:{bad:'(x − 3)² → vertex at x = −3',good:'vertex at x = 3',why:'In vertex form, h has the <b>opposite</b> sign of what you see inside: x − 3 = 0 when x = 3.'},
 practice(){const a=pick([-2,-1,1,2,3,-0.5]),h=rand(-5,5),k=rand(-6,6);
  if(Math.random()<.6)return {q:`Find the vertex and axis of symmetry of <span class="math">${mx('g(x)')} = ${vform(a,h,k)}</span>.`,fields:[{label:'vertex x (h) =',answer:h},{label:'vertex y (k) =',answer:k}],raw:true,hint:'(x − h): the vertex x-value has the opposite sign of the number inside.',sol:[[`(h, k) = (${fmtNeg(h)}, ${fmtNeg(k)})`,`Axis of symmetry: x = ${fmtNeg(h)}.`]]};
  const m=mcFrom(vform(a,h,k),[vform(a,-h,k),vform(a,h,-k),vform(-a,h,k)].filter((v,i,ar)=>ar.indexOf(v)===i&&v!==vform(a,h,k)));
  return {type:'mc',q:`Which function has vertex <b>(${fmtNeg(h)}, ${fmtNeg(k)})</b> and opens <b>${a>0?'up':'down'}</b>${Math.abs(a)!==1?`, ${Math.abs(a)>1?'narrower':'wider'} than x²`:''}?`,opts:m.opts,a:m.a,why:`Vertex form a(x − h)² + k with h = ${h}, k = ${k}.`};},
 check:[
  {q:'Vertex of g(x) = 2(x − 3)² + 4?',o:['(−3, 4)','(3, 4)','(3, −4)','(2, 4)'],a:1,why:'(h, k) = (3, 4).'},
  {q:'g(x) = (x + 2)² compared with x² is shifted…',o:['right 2','left 2','up 2','down 2'],a:1,why:'x + 2 = x − (−2) → h = −2 → left 2.'},
  {q:'Where does the point (1, 1) of x² go for g(x) = 2(x − 3)² + 4?',o:['(4, 6)','(3, 4)','(4, 5)','(2, 6)'],a:0,why:'(1 + h, a + k) = (4, 6).'}]
};

L['1B-4-3']={
 goal:'I can identify a quadratic in standard form and use it to find the vertex, axis of symmetry, and y-intercept.',
 life:{title:'How high does the ball go?',html:'A ball is kicked: height <span class="math">'+mx('h = −16t² + 64t + 4')+'</span>. Two questions every coach asks: <b>how high</b> and <b>when</b>? That’s the vertex. The formula x = −b ÷ 2a finds it straight from standard form: after <b>2 seconds</b>, at <b>68 feet</b>.'},
 see:[{title:'From standard form to the vertex',hint:'Pick a function and follow the three key features.',mount:mountStd}],
 vocab:[['Standard form','f(x) = ax² + bx + c with a ≠ 0. If a = 0 it is not quadratic.'],['Axis of symmetry','x = −b ÷ 2a.'],['Vertex','x = −b ÷ 2a, then y = f(that x).'],['y-intercept','(0, c).']],
 examples:[
  {title:'Example 1 — Is it quadratic?',prob:'Which are quadratic: f(x) = 2x² − 8, f(x) = 12x + 4, f(x) = −6x² + x?',raw:true,lines:[['2x² − 8: a = 2, b = 0, c = −8','Quadratic (b and c can be 0).'],['12x + 4: a = 0','Not quadratic — no x² term.'],['−6x² + x: a = −6, b = 1, c = 0','Quadratic.']]},
  {title:'Example 2 — Vertex',prob:'Find the vertex of <span class="math">'+mx('y = x² − 4x + 3')+'</span>.',raw:true,lines:[['x = −(−4) ÷ 2(1) = 2','Axis of symmetry.'],['y = 2² − 4(2) + 3 = −1','Substitute x = 2.'],['vertex (2, −1), minimum','a > 0 → opens up.'],['y-intercept (0, 3)','c = 3.']]}],
 mistake:{bad:'x = b ÷ 2a = −4 ÷ 2 = −2',good:'x = −b ÷ 2a = 4 ÷ 2 = 2',why:'Don’t forget the <b>negative</b> in −b.'},
 practice(){let a,b,c,h;do{a=pick([1,-1,2,-2,3]);h=rand(-4,4);b=-2*a*h;c=rand(-8,8);}while(false);const k=a*h*h+b*h+c;
  if(Math.random()<.4)return {type:'mc',q:`Is <span class="math">${mx('f(x)')} = ${pick([Q(0,rand(2,9),rand(-5,5)),Q(a,b,c),Q(0,0,rand(2,19)),Q(rand(1,5),0,0)])}</span> a quadratic function?`.replace(/<span class="math">([^]*?)<\/span> a quadratic/,(m0,g)=>m0),opts:['Yes','No'],a:-1,_chk:1,why:'Quadratic means the x² term is present (a ≠ 0).'};
  return {q:`For <span class="math">${mx('y')} = ${Q(a,b,c)}</span>, find the axis of symmetry and the vertex.`,fields:[{label:'axis: x =',answer:h},{label:'vertex y =',answer:k}],raw:true,hint:'x = −b ÷ 2a; then substitute to find y.',sol:[[`x = ${fmtNeg(-b)} ÷ ${fmtNeg(2*a)} = ${fmtNeg(h)}`,'Axis of symmetry.'],[`y = ${fmtNeg(a)}(${fmtNeg(h)})² ${b<0?'−':'+'} ${Math.abs(b)}(${fmtNeg(h)}) ${c<0?'−':'+'} ${Math.abs(c)} = ${fmtNeg(k)}`,'Substitute.'],[`vertex (${fmtNeg(h)}, ${fmtNeg(k)})`,a>0?'Minimum.':'Maximum.']]};},
 check:[
  {q:'Which is NOT a quadratic function?',o:['f(x) = x² − 4x + 3','f(x) = 2x² − 8','f(x) = 12x + 4','f(x) = −6x² + x'],a:2,why:'There is no x² term (a = 0).'},
  {q:'Axis of symmetry of y = 2x² + 8x − 1?',o:['x = 2','x = −2','x = 4','x = −4'],a:1,why:'−8 ÷ (2 · 2) = −2.'},
  {q:'h = −16t² + 64t + 4. When is the ball highest?',o:['t = 4','t = 2','t = 68','t = 0'],a:1,why:'t = −64 ÷ (2 · −16) = 2 seconds.'}]
};
/* resolve the yes/no answer for the "is it quadratic" items */
const _p3=L['1B-4-3'].practice;L['1B-4-3'].practice=function(){const p=_p3.call(this);if(p._chk){const quad=/x<\/i>²/.test(p.q);p.a=quad?0:1;p.why=quad?'Yes — it has an x² term (a ≠ 0).':'No — there is no x² term, so a = 0.';}return p;};

L['1B-4-4']={
 goal:'I can use factored form to find the zeros, axis of symmetry, and vertex, and convert between factored and standard form.',
 life:{title:'A water jet',html:'A fountain jet leaves the nozzle at x = 0 and lands at x = 8 m. Its path: <span class="math">'+mx('y = −0.5x(x − 8)')+'</span>. Factored form shows the <b>start and landing</b> instantly (the zeros). The highest point is exactly <b>halfway</b> between them, at x = 4: y = −0.5(4)(−4) = <b>8 m</b>.'},
 see:[{title:'Zeros → axis → vertex',hint:'Move the zeros p and q and the value of a.',mount:mountFact}],
 vocab:[['Factored form','y = a(x − p)(x − q). Zeros: x = p and x = q.'],['x-intercepts','(p, 0) and (q, 0).'],['Axis of symmetry','x = (p + q) ÷ 2 — the midpoint of the zeros.'],['To standard form','Multiply the factors (FOIL), then multiply by a.']],
 examples:[
  {title:'Example A',prob:'Find the zeros of <span class="math">'+mx('y = 2(x − 1)(x − 3)')+'</span>.',raw:true,lines:[[mx('x − 1 = 0 → x = 1'),'First factor.'],[mx('x − 3 = 0 → x = 3'),'Second factor.'],['intercepts (1, 0) and (3, 0)','The a value (2) does not change the zeros.']]},
  {title:'Example B — Vertex and standard form',prob:'For <span class="math">'+mx('f(x) = 2(x + 4)(x + 2)')+'</span>, find the vertex and the standard form.',raw:true,lines:[['zeros −4 and −2','Set each factor to 0.'],['axis x = (−4 + −2) ÷ 2 = −3','Midpoint.'],['f(−3) = 2(1)(−1) = −2','Vertex (−3, −2).'],[Q(2,12,16),'2(x² + 6x + 8) = 2x² + 12x + 16.']]}],
 mistake:{bad:'y = 2(x + 4)(x + 2) → zeros 4 and 2',good:'zeros −4 and −2',why:'x + 4 = 0 when x = <b>−4</b>.'},
 practice(){const a=pick([1,2,-1,-2,3]);let p=rand(-6,6),q=rand(-6,6);if(p===q)q+=2;const fp=p===0?'x':`(${xh(p)})`,fq=q===0?'x':`(${xh(q)})`,e=mx(aStr(a)+fp+fq),h=(p+q)/2;
  const t=rand(0,2);
  if(t===0)return {q:`Find the zeros of <span class="math">${mx('y')} = ${e}</span>.`,fields:[{label:'smaller zero:',answer:Math.min(p,q)},{label:'larger zero:',answer:Math.max(p,q)}],raw:true,hint:'Set each factor equal to 0.',sol:[[`x = ${fmtNeg(p)} and x = ${fmtNeg(q)}`,'Each factor = 0.']]};
  if(t===1)return {q:`For <span class="math">${mx('y')} = ${e}</span>, find the axis of symmetry and the vertex’s y-value.`,fields:[{label:'axis: x =',answer:h},{label:'vertex y =',answer:a*(h-p)*(h-q)}],raw:true,hint:'Axis = midpoint of the zeros. Then substitute.',sol:[[`x = (${fmtNeg(p)} + ${P(q)}) ÷ 2 = ${fmtNeg(h)}`,'Midpoint.'],[`y = ${fmtNeg(a)}(${fmtNeg(h-p)})(${fmtNeg(h-q)}) = ${fmtNeg(a*(h-p)*(h-q))}`,'Substitute.']]};
  return {q:`Write <span class="math">${mx('y')} = ${e}</span> in standard form ax² + bx + c.`,fields:[{label:'a =',answer:a},{label:'b =',answer:-a*(p+q)},{label:'c =',answer:a*p*q}],raw:true,hint:'Multiply the two binomials first, then multiply every term by a.',sol:[[`${fp}${fq} = ${q2(1,-(p+q),p*q)}`,'FOIL.'],[Q(a,-a*(p+q),a*p*q),`Multiply by ${a}.`]]};},
 check:[
  {q:'Zeros of y = −2(x + 5)(x + 1)?',o:['5 and 1','−5 and −1','−2, 5, 1','5 and −1'],a:1,why:'x + 5 = 0 → −5; x + 1 = 0 → −1.'},
  {q:'Zeros at 2 and 8. Axis of symmetry?',o:['x = 4','x = 5','x = 6','x = 10'],a:1,why:'(2 + 8) ÷ 2 = 5.'},
  {q:'y = (x − 2)(x + 3) in standard form is…',o:['x² + x − 6','x² − x − 6','x² + 5x − 6','x² − 6'],a:0,why:'x² + 3x − 2x − 6 = x² + x − 6.'}]
};
})();
