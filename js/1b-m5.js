/* Algebra 1B · Module 5 · Linear, Exponential, and Quadratic Functions */
(function(){
const r2=v=>+(+v).toFixed(2);
const nf=v=>{const r=Math.round(v*100)/100;return (r<0?MINUS:'')+Math.abs(r).toLocaleString('en-US',{maximumFractionDigits:2});};
function q2(a,b,c,v='x'){let s='';[[a,2],[b,1],[c,0]].forEach(([k,d])=>{if(!k)return;const vv=d===2?v+'²':d===1?v:'';const ab=Math.abs(k),co=(ab===1&&d>0)?'':ab;s+=s?(k<0?' − ':' + ')+co+vv:(k<0?MINUS:'')+co+vv;});return s||'0';}
const Q=(a,b,c)=>mx(q2(a,b,c));
function curve(G,f,col='#2563eb',w=3){let d='';for(let x=G.x0;x<=G.x1+1e-9;x+=0.05){const y=Math.max(G.y0-3,Math.min(G.y1+3,f(x)));d+=(d?' L':'M')+G.X(x)+' '+G.Y(y);}return `<path clip-path="url(#${G.clip})" d="${d}" fill="none" stroke="${col}" stroke-width="${w}"/>`;}
function diffs(ys){return ys.slice(1).map((y,i)=>+(y-ys[i]).toFixed(4));}
function ratios(ys){return ys.slice(1).map((y,i)=>ys[i]?+(y/ys[i]).toFixed(4):NaN);}
function analysis(xs,ys,show){const d1=diffs(ys),d2=diffs(d1),rt=ratios(ys);const same=a=>a.every(v=>Math.abs(v-a[0])<1e-9);
 const row=(lab,arr,ok,off)=>`<tr><th>${lab}</th>${'<td style="border:none"></td>'.repeat(off)}${arr.map(v=>`<td style="color:${ok?'#15803d':'#b91c1c'};font-weight:800">${isNaN(v)?'—':(v>=0&&lab!=='ratio'?'+':'')+(lab==='ratio'?'×':'')+nf(v)}</td>`).join('')}</tr>`;
 return {html:`<table class="t"><tr><th>x</th>${xs.map(x=>`<td>${x}</td>`).join('')}</tr><tr><th>y</th>${ys.map(y=>`<td>${nf(y)}</td>`).join('')}</tr>${show.includes(1)?row('1st diff',d1,same(d1),1):''}${show.includes(2)?row('2nd diff',d2,same(d2)&&d2[0]!==0,1):''}${show.includes('r')?row('ratio',rt,same(rt),1):''}</table>`,
  type:same(d1)?'linear':(same(d2)&&d2[0]!==0)?'quadratic':same(rt)?'exponential':'none',d1,d2,rt};}

/* ---- widgets ---- */
function mountJobs(el){
 let n=5;
 el.innerHTML=`<p style="margin:0">Both jobs start at <b>$40,000</b>. Job A: <b>+$2,000</b> raise every year (linear). Job B: <b>+4%</b> raise every year (exponential).</p><div class="ctrl"><label>Years <input type="range" min="0" max="30" value="5"></label><b id="jn"></b></div><div id="jg"></div><div class="readout" id="jr"></div>`;
 const draw=()=>{const A=t=>40000+2000*t,B=t=>40000*1.04**t,Ak=t=>A(t)/1000,Bk=t=>B(t)/1000;const G=grid({x0:0,x1:30,y0:30,y1:140,u:17,uy:4.2,lab:5,laby:20,gs:5,gsy:10,xl:'years',yl:'salary ($ thousands)'});
  let s=curve(G,Ak,'#ea580c')+curve(G,Bk,'#2563eb')+gdot(G,n,Ak(n),'#ea580c',7)+gdot(G,n,Bk(n),'#2563eb',7)+`<line x1="${G.X(n)}" y1="${G.Y(30)}" x2="${G.X(n)}" y2="${G.Y(140)}" stroke="#9ca3af" stroke-dasharray="5 4"/>`;
  $('#jg',el).innerHTML=G.svg(s);$('#jn',el).textContent=n;
  $('#jr',el).innerHTML=`After <b>${n}</b> years: <b style="color:#ea580c">Job A $${nf(A(n))}</b> &nbsp; <b style="color:#2563eb">Job B $${nf(B(n))}</b><br>`+(B(n)>A(n)?'<span class="good">Job B is ahead — and the gap keeps growing.</span> An exponential function always overtakes a linear one eventually.':'Job A is ahead for now. Linear adds the same amount; exponential multiplies, so its raises get bigger every year. Keep sliding (they cross around year 12).');};
 $('input',el).addEventListener('input',e=>{n=+e.target.value;draw();});draw();
}
function mountTables(el,sets,show){
 let k=0;
 el.innerHTML=`<div class="row">${sets.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div id="tt" style="overflow-x:auto"></div><div id="tg"></div><div class="readout" id="tr"></div>`;
 const draw=()=>{const p=sets[k],A=analysis(p.x,p.y,show);$('#tt',el).innerHTML=A.html;
  const ymin=Math.min(0,...p.y),ymax=Math.max(...p.y);const W=420,H=200,X=x=>40+(x-p.x[0])/(p.x[p.x.length-1]-p.x[0])*(W-60),Y=y=>H-26-(y-ymin)/(ymax-ymin||1)*(H-40);
  let s=`<line x1="40" y1="${Y(ymin)}" x2="${W-10}" y2="${Y(ymin)}" class="ax"/><line x1="40" y1="10" x2="40" y2="${H-26}" class="ax"/><polyline points="${p.x.map((x,i)=>X(x)+','+Y(p.y[i])).join(' ')}" fill="none" stroke="#2563eb" stroke-width="2.5"/>`+p.x.map((x,i)=>`<circle cx="${X(x)}" cy="${Y(p.y[i])}" r="5" fill="#2563eb"/><text x="${X(x)}" y="${H-8}" text-anchor="middle" class="tl">${x}</text>`).join('');
  $('#tg',el).innerHTML=`<svg viewBox="0 0 ${W} ${H}" class="fig" style="max-width:${W}px">${s}</svg>`;
  $('#tr',el).innerHTML=(p.d?p.d+'<br>':'')+({linear:'<b>Constant 1st differences → LINEAR.</b>',quadratic:'<b>1st differences change, but 2nd differences are constant (and not 0) → QUADRATIC.</b>',exponential:'<b>Constant ratio → EXPONENTIAL.</b>',none:'No constant differences or ratios → none of the three models.'})[A.type];$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;draw();}});draw();
}
function mountCompare(el){
 const PR=[{t:'🍐 Pear prices (linear)',f:{type:'table',x:[1,2,3,4],y:[1.35,2.70,4.05,5.40],name:'Booth 1'},g:{fn:x=>1.25*x,name:'Booth 2',G:{x0:0,x1:5,y0:0,y1:7,u:70,uy:30,lab:1,laby:1,xl:'pounds',yl:'cost ($)'}},msg:'Booth 1: (2.70 − 1.35) ÷ (2 − 1) = <b>$1.35 per lb</b>. Booth 2 (graph): (2.50 − 1.25) ÷ 1 = <b>$1.25 per lb</b>. Booth 1 charges <b>$0.10 more</b> per pound.'},
  {t:'🏀 Two throws (quadratic)',f:{type:'table',x:[0,1,2,3,4],y:[6,30,38,30,6],name:'Throw A'},g:{fn:x=>-5*(x-2.5)**2+40,name:'Throw B',G:{x0:0,x1:5,y0:0,y1:45,u:70,uy:5,lab:1,laby:5,gsy:5,xl:'time (s)',yl:'height (ft)'}},msg:'Throw A (table): highest value 38 ft at 2 s (the table is symmetric around x = 2). Throw B (graph): vertex at (2.5, 40). <b>Throw B goes higher and stays up longer.</b>'},
  {t:'💰 Two investments (exponential)',f:{type:'eq',eq:'f(t) = 500(1.06)<sup>t</sup>',name:'Account A'},g:{fn:x=>800*1.03**x,name:'Account B',G:{x0:0,x1:30,y0:0,y1:3000,u:15,uy:0.12,lab:5,laby:500,gs:5,gsy:500,xl:'years',yl:'$'}},msg:'A starts at <b>$500</b> and grows <b>6%</b> a year. B starts higher, at <b>$800</b> (the y-intercept), but grows only <b>3%</b>. Around year 16, A passes B — a bigger growth rate wins in the long run.'}];
 let k=0;
 el.innerHTML=`<div class="row">${PR.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;align-items:center"><div id="cf"></div><div id="cg"></div></div><div class="readout" id="cr"></div>`;
 const draw=()=>{const p=PR[k];$('#cf',el).innerHTML=`<div class="tag">${p.f.name}</div>`+(p.f.type==='table'?tableHTML([['x',p.f.x],['f(x)',p.f.y.map(v=>v.toFixed(p.f.y.some(z=>!Number.isInteger(z))?2:0))]]):`<div class="math big">${mx(p.f.eq.split('<')[0])}<sup>${mx('t')}</sup></div>`);
  const G=grid(p.g.G);let s=curve(G,p.g.fn,'#ea580c');if(k===2)s+=curve(G,x=>500*1.06**x,'#2563eb');$('#cg',el).innerHTML=`<div class="tag">${p.g.name}${k===2?' (orange) vs. A (blue)':''}</div>`+G.svg(s);
  $('#cr',el).innerHTML=p.msg;$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;draw();}});draw();
}
function mountNL(el){
 let b=4;
 el.innerHTML=`<div class="ctrl"><label>Move the line: y = −x + <b id="nb"></b> <input type="range" min="-2" max="8" step="0.25" value="4"></label></div><div style="text-align:center"><div class="sys">${mx('y = (x − 3)² + 1')}<br><span id="nle"></span></div></div><div id="ng"></div><div class="readout" id="nr"></div>`;
 const draw=()=>{const G=grid({x0:-1,x1:7,y0:-2,y1:10,u:44,uy:30,lab:1,laby:2,gsy:1});const f=x=>(x-3)**2+1,l=x=>-x+b;
  /* (x-3)^2+1 = -x+b -> x^2 -5x + (10-b) = 0 */const D=25-4*(10-b);const xs=D>0?[(5-Math.sqrt(D))/2,(5+Math.sqrt(D))/2]:D===0?[2.5]:[];
  let s=curve(G,f,'#2563eb')+gline(G,-1,b,'',`stroke="#ea580c" stroke-width="3"`)+xs.map(x=>gdot(G,x,l(x),'#15803d',8,`(${nf(x)}, ${nf(l(x))})`)).join('');
  $('#ng',el).innerHTML=G.svg(s);$('#nb',el).textContent=nf(b);$('#nle',el).innerHTML=mx(`y = −x + ${b}`);
  $('#nr',el).innerHTML=`Set them equal: (x − 3)² + 1 = −x + ${nf(b)} → x² − 5x + ${nf(10-b)} = 0. Discriminant = ${nf(D)}.<br>`+(xs.length===2?`<b>Two solutions</b> — the line crosses the parabola twice.`+(b===4?' At b = 4: x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → <b>(2, 2) and (3, 1)</b>.':''):xs.length===1?'<b>One solution</b> — the line just touches the parabola.':'<b>No solution</b> — the line misses the parabola.');};
 $('input',el).addEventListener('input',e=>{b=+e.target.value;draw();});draw();
}

/* ---- lessons ---- */
L['1B-5-1']={
 goal:'I can decide whether a linear or an exponential model fits a situation, using differences and ratios.',
 life:{title:'Two job offers',html:'Job A: $40,000 with a <b>$2,000 raise</b> every year. Job B: $40,000 with a <b>4% raise</b> every year. Job A looks better at first… but percent raises <b>multiply</b>.<br>Linear = add the same amount (constant differences). Exponential = multiply by the same amount (constant ratio).'},
 see:[{title:'Linear vs. exponential salaries',hint:'Slide the years. When does the blue curve pass the orange line?',mount:mountJobs},{title:'Differences or ratios?',hint:'Pick a table. Green = constant, red = not constant.',mount:el=>mountTables(el,[{t:'+3 each time',x:[0,1,2,3,4,5],y:[2,5,8,11,14,17]},{t:'×2 each time',x:[0,1,2,3,4,5],y:[2,4,8,16,32,64]},{t:'Neither',x:[0,1,2,3,4,5],y:[1,3,4,8,9,15]}],[1,'r'])}],
 vocab:[['Linear model','Equal differences over equal intervals: y = mx + b.'],['Exponential model','Equal ratios (factors) over equal intervals: y = a·bˣ.'],['First differences','Each output minus the previous one.'],['Ratio','Each output divided by the previous one.']],
 examples:[
  {title:'Example',prob:tableHTML([['x',[0,1,2,3,4,5]],['y',[2,4,8,16,32,64]]]),raw:true,lines:[['1st differences: 2, 4, 8, 16, 32','Not constant → not linear.'],['ratios: 4 ÷ 2 = 2, 8 ÷ 4 = 2, …','Constant ratio 2 → exponential.'],['y = 2(2)<sup>x</sup>','a = 2 (at x = 0), b = 2.']]}],
 mistake:{bad:'“It grows, so it’s exponential.”',good:'Check the ratios',why:'Linear functions grow too. Exponential means a <b>constant ratio</b>; linear means a <b>constant difference</b>.'},
 practice(){const t=rand(0,2),a=rand(2,6),xs=[0,1,2,3,4];let ys;
  if(t===0){const m=pick([3,4,5,-2,7]);ys=xs.map(x=>a+m*x);}else if(t===1){const b=pick([2,3,0.5]);ys=xs.map(x=>a*8*b**x);}else ys=xs.map(x=>a+x*x+(x%2));
  return {type:'mc',q:`Which model fits this table? ${tableHTML([['x',xs],['y',ys.map(nf)]])}`,opts:['Linear','Exponential','Neither'],a:t,why:['The first differences are constant.','The ratios are constant.','Neither the differences nor the ratios are constant.'][t]};},
 check:[
  {q:'A table has outputs 3, 6, 12, 24. Which model fits?',o:['Linear','Exponential','Quadratic','None'],a:1,why:'Constant ratio of 2.'},
  {q:'A table has outputs 5, 8, 11, 14. Which model fits?',o:['Linear','Exponential','Quadratic','None'],a:0,why:'Constant difference of 3.'},
  {q:'In the long run, which grows faster?',o:['y = 1000x','y = 1.1ˣ','They grow equally','It depends only on the y-intercept'],a:1,why:'An increasing exponential eventually passes any linear function.'}]
};

L['1B-5-2']={
 goal:'I can use second differences to recognize quadratic data and model it with a quadratic function.',
 life:{title:'A falling phone',html:'A phone dropped from a balcony falls 0, 16, 64, 144 feet after 0, 1, 2, 3 seconds. The distance grows faster and faster — but not by a constant ratio. The <b>first differences</b> (16, 48, 80) grow by the same amount, 32: constant <b>second differences</b> → <b>quadratic</b>: d = 16t².'},
 see:[{title:'Second differences',hint:'Pick a table and look at the 2nd-difference row.',mount:el=>mountTables(el,[{t:'f(x) = x²',x:[0,1,2,3,4,5],y:[0,1,4,9,16,25]},{t:'📱 Falling: 16t²',x:[0,1,2,3,4],y:[0,16,64,144,256],d:'Distance fallen (ft) after t seconds.'},{t:'⚽ Kick height',x:[0,1,2,3,4],y:[0,24,32,24,0],d:'Height (m) of a kicked ball.'},{t:'Linear (for contrast)',x:[0,1,2,3,4],y:[1,4,7,10,13]}],[1,2])}],
 vocab:[['Second differences','The differences of the first differences.'],['Quadratic data','Constant, non-zero second differences (for equally spaced x).'],['Leading coefficient','For x-steps of 1, a = (second difference) ÷ 2.']],
 examples:[
  {title:'Example — Identify and model',prob:tableHTML([['t',[0,1,2,3]],['d',[0,16,64,144]]]),raw:true,lines:[['1st: 16, 48, 80','Not constant → not linear.'],['2nd: 32, 32','Constant → quadratic.'],['a = 32 ÷ 2 = 16','With x-steps of 1, a = half the 2nd difference.'],['d = 16t²','Check: 16(3)² = 144 ✓']]}],
 mistake:{bad:'1st differences 16, 48, 80 → not a pattern → none',good:'Check 2nd differences: 32, 32 → quadratic',why:'Quadratic data needs <b>two</b> rounds of subtracting.'},
 practice(){const a=pick([1,2,3,-1,-2,4]),b=rand(-4,4),c=rand(-5,5),xs=[0,1,2,3,4],ys=xs.map(x=>a*x*x+b*x+c);
  if(Math.random()<.55)return {q:`Find the constant second difference and the leading coefficient a. ${tableHTML([['x',xs],['y',ys]])}`,fields:[{label:'2nd difference =',answer:2*a},{label:'a =',answer:a}],raw:true,hint:'Subtract twice. Then a = 2nd difference ÷ 2.',sol:[[`1st: ${diffs(ys).map(fmtNeg).join(', ')}`,'First differences.'],[`2nd: ${diffs(diffs(ys)).map(fmtNeg).join(', ')}`,'Second differences.'],[`a = ${2*a} ÷ 2 = ${a}`,'Leading coefficient.']]};
  const t=rand(0,2);const Y=t===0?xs.map(x=>3*x+c):t===1?ys:xs.map(x=>(c>0?c:2)*2**x);return {type:'mc',q:`Which model fits? ${tableHTML([['x',xs],['y',Y]])}`,opts:['Linear','Quadratic','Exponential'],a:t,why:['Constant 1st differences.','Constant 2nd differences.','Constant ratio of 2 — each output doubles.'][t]};},
 check:[
  {q:'Outputs 0, 1, 4, 9, 16. Second differences?',o:['1, 3, 5, 7','2, 2, 2','4','none'],a:1,why:'1st: 1, 3, 5, 7. 2nd: 2, 2, 2.'},
  {q:'Constant non-zero second differences mean the data is…',o:['linear','quadratic','exponential','random'],a:1,why:'That is the test for quadratic data.'},
  {q:'2nd difference = 6 (x-steps of 1). What is a?',o:['6','3','12','2'],a:1,why:'a = 6 ÷ 2 = 3.'}]
};

L['1B-5-3']={
 goal:'I can compare properties of two functions shown in different ways (table, graph, equation).',
 life:{title:'Comparing prices that look different',html:'One farm stand posts a <b>table</b> of prices; another shows a <b>graph</b>. A bank ad gives an <b>equation</b>. To compare fairly, find the <b>same feature</b> in each: the rate of change, the y-intercept (starting value), or the maximum.'},
 see:[{title:'Same question, different representations',hint:'Pick a pair. Find the matching feature in the table and in the graph.',mount:mountCompare}],
 vocab:[['Rate of change','Change in output ÷ change in input. Constant for linear functions.'],['Initial value','The y-intercept — the value when x = 0.'],['Maximum / minimum','The vertex of a parabola.'],['Representations','Table, graph, equation, and words can all describe the same function.']],
 examples:[
  {title:'Example — Rates of change',prob:'Booth 1 (table): 1 lb $1.35, 2 lb $2.70. Booth 2 (graph): passes (1, 1.25) and (2, 2.50).',raw:true,lines:[['(2.70 − 1.35) ÷ (2 − 1) = 1.35','Booth 1: $1.35 per lb.'],['(2.50 − 1.25) ÷ (2 − 1) = 1.25','Booth 2: $1.25 per lb.'],['1.35 − 1.25 = 0.10','Booth 1 costs $0.10 more per pound.']]},
  {title:'Example — Maximums',prob:'f(x) = −(x − 2)² + 7 and g has a table whose largest value is 9.',raw:true,lines:[['f max = 7 at x = 2','From vertex form.'],['g max = 9','From the table.'],['g has the greater maximum','Compare the same feature.']]}],
 mistake:{bad:'The graph is steeper on screen, so it has the bigger rate',good:'Compute the rates',why:'Graphs can use different scales. Calculate rise ÷ run with the actual numbers.'},
 practice(){const t=rand(0,1);
  if(t===0){const m1=pick([2,3,4,5,1.5]),m2=pick([2.5,3.5,4.5,6]),b1=rand(0,5),b2=rand(0,5);const xs=[0,1,2,3];
   return {type:'mc',q:`f is shown in the table; <span class="math">${mx(`g(x) = ${m2}x + ${b2}`)}</span>. Which has the greater rate of change? ${tableHTML([['x',xs],['f(x)',xs.map(x=>m1*x+b1)]])}`,opts:['f','g','They are equal'],a:m1>m2?0:m1<m2?1:2,why:`f’s rate = ${m1}; g’s rate = ${m2}.`};}
  const h1=rand(-3,3),k1=rand(1,9),k2=rand(1,9);const xs=[h1-2,h1-1,h1,h1+1,h1+2];return {type:'mc',q:`f(x) = −(x ${h1<0?'+':'−'} ${Math.abs(h1)})² + ${k1}. g is shown in the table. Which has the greater maximum? ${tableHTML([['x',xs.map(x=>x+1)],['g(x)',xs.map(x=>-((x-h1)**2)+k2)]])}`,opts:['f','g','They are equal'],a:k1>k2?0:k1<k2?1:2,why:`f’s maximum is ${k1} (vertex form). g’s largest table value is ${k2}.`};},
 check:[
  {q:'f(x) = 3x + 2 and g has the table x: 0, 1, 2 → 5, 7, 9. Which has the greater y-intercept?',o:['f','g','equal'],a:1,why:'f: 2. g: 5 (the value at x = 0).'},
  {q:'Account A: 500(1.06)ᵗ. Account B: 800(1.03)ᵗ. Which grows faster in the long run?',o:['A','B','Same'],a:0,why:'6% > 3%: the larger growth factor wins eventually.'},
  {q:'To compare two linear functions shown as a table and a graph, the best feature to compute for “which costs more per item” is…',o:['the rate of change','the x-intercept','the vertex','the ratio'],a:0,why:'Cost per item is the rate of change (slope).'}]
};

L['1B-5-4']={
 goal:'I can solve a system of a linear and a quadratic equation by graphing and algebraically.',
 life:{title:'Where does the ball hit the hill?',html:'A ball flies along a <b>parabola</b>; the hillside is a straight <b>line</b>. Where they meet is where the ball lands. A line and a parabola can meet <b>twice, once, or not at all</b>.'},
 see:[{title:'A line meets a parabola',hint:'Move the line up and down. Count the intersection points.',mount:mountNL}],
 vocab:[['Nonlinear system','A system where at least one equation is not linear (here, a quadratic and a line).'],['Solution','An ordered pair that makes both equations true — an intersection point.'],['Number of solutions','0, 1, or 2 for a line and a parabola.']],
 examples:[
  {title:'Example 1 — Check a point',prob:'Is (3, 1) a solution of '+'<div class="sys">'+mx('y = (x − 3)² + 1')+'<br>'+mx('y = −x + 4')+'</div>',raw:true,lines:[['1 = (3 − 3)² + 1 → 1 = 1 ✓','True in the first equation.'],['1 = −3 + 4 → 1 = 1 ✓','True in the second.'],['Yes','Both are true.']]},
  {title:'Example 2 — Solve algebraically',prob:'Solve the same system.',raw:true,lines:[[mx('(x − 3)² + 1 = −x + 4'),'Substitute: set the right sides equal.'],[mx('x² − 5x + 6 = 0'),'Expand and get 0 on one side.'],[mx('(x − 2)(x − 3) = 0 → x = 2 or 3'),'Factor.'],['(2, 2) and (3, 1)','Find y with y = −x + 4.']]}],
 mistake:{bad:'Stopping at x = 2 and x = 3',good:'Find y too: (2, 2) and (3, 1)',why:'Solutions of a system are <b>ordered pairs</b>.'},
 practice(){
  if(Math.random()<.4){const pts=[[3,1,true],[4,2,false],[2,2,true],[0,4,false]];const p=pick(pts);return {type:'mc',q:`Is (${p[0]}, ${p[1]}) a solution of <div class="sys">${mx('y = (x − 3)² + 1')}<br>${mx('y = −x + 4')}</div>`,opts:['Yes','No'],a:p[2]?0:1,why:`First: ${(p[0]-3)**2+1} ${(p[0]-3)**2+1===p[1]?'=':'≠'} ${p[1]}. Second: ${-p[0]+4} ${-p[0]+4===p[1]?'=':'≠'} ${p[1]}.`};}
  let r1=rand(-4,3),r2_=r1+rand(1,4);if(r1+r2_===0)r2_++;const m=pick([-2,-1,1,2,3]);/* y = x^2 + c and y = m x + b with roots r1,r2: x^2 - m x + (c-b) = (x-r1)(x-r2) => m = r1+r2 */const M=r1+r2_,c=rand(-4,3),b=c+r1*r2_;
  return {q:`Solve: <div class="sys">${mx(`y = x²${c?S(c):''}`)}<br>${mx(`y = ${T(M,'x')||'0'}${b?S(b):''}`)}</div>Give the x-values of the solutions.`,fields:[{label:'smaller x =',answer:r1},{label:'larger x =',answer:r2_}],hint:'Set the right sides equal, move everything to one side, and factor.',
   sol:[[`x²${c?S(c):''} = ${T(M,'x')}${b?S(b):''}`,'Set equal.'],[`${q2(1,-M,c-b)} = 0`,'Get 0 on one side.'],[`x = ${fmtNeg(r1)} or x = ${fmtNeg(r2_)}`,'Factor and solve.'],[`(${fmtNeg(r1)}, ${fmtNeg(r1*r1+c)}), (${fmtNeg(r2_)}, ${fmtNeg(r2_*r2_+c)})`,'The ordered pairs.']]};},
 check:[
  {q:'How many solutions can a line and a parabola have?',o:['Only 1','0, 1, or 2','Always 2','Infinitely many'],a:1,why:'The line can miss, touch, or cross twice.'},
  {q:'Solve y = x² and y = x + 2.',o:['(2, 4) and (−1, 1)','(4, 2) and (1, −1)','(2, 4) only','no solution'],a:0,why:'x² = x + 2 → (x − 2)(x + 1) = 0.'},
  {q:'Is (4, 2) a solution of y = (x − 3)² + 1 and y = −x + 4?',o:['Yes','No'],a:1,why:'−4 + 4 = 0 ≠ 2.'}]
};
})();
