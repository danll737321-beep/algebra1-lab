/* Algebra 1A · Module 5 · Linear and Statistical Models */
(function(){
const mean=a=>a.reduce((s,v)=>s+v,0)/a.length;
const median=a=>{const s=[...a].sort((p,q)=>p-q),n=s.length;return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;};
const sd=a=>{const m=mean(a);return Math.sqrt(mean(a.map(v=>(v-m)**2)));};
const r2=v=>+(+v).toFixed(2);
function dotPlot(data,o={}){const {lo=0,hi=20,W=560,marks=[],band=null,col='#2563eb',hl=[]}=o;const X=v=>30+(v-lo)/(hi-lo)*(W-60);const cnt={};let s='';
 if(band)s+=`<rect x="${X(band[0])}" y="14" width="${X(band[1])-X(band[0])}" height="${o.H?o.H-56:110}" fill="rgba(124,58,237,.12)"/>`;
 const H=o.H||170,base=H-42;s+=`<line x1="20" y1="${base}" x2="${W-20}" y2="${base}" stroke="#374151" stroke-width="2"/>`;
 const step=(hi-lo)>30?10:(hi-lo)>12?2:1;for(let v=lo;v<=hi;v+=step)s+=`<line x1="${X(v)}" y1="${base}" x2="${X(v)}" y2="${base+6}" stroke="#374151"/><text x="${X(v)}" y="${base+22}" text-anchor="middle" class="tl">${v}</text>`;
 data.forEach((v,i)=>{cnt[v]=(cnt[v]||0)+1;s+=`<circle cx="${X(v)}" cy="${base-12-(cnt[v]-1)*18}" r="7.5" fill="${hl.includes(i)?'#b91c1c':col}" stroke="#fff" stroke-width="1.5"/>`;});
 marks.forEach(([v,c,t,dy,an])=>s+=`<line x1="${X(v)}" y1="18" x2="${X(v)}" y2="${base}" stroke="${c}" stroke-width="2.5" stroke-dasharray="6 4"/><text x="${X(v)+(an==='end'?-5:an==='start'?5:0)}" y="${14+(dy||0)}" text-anchor="${an||'middle'}" font-size="13" font-weight="800" fill="${c}" paint-order="stroke" stroke="#fff" stroke-width="4">${t}</text>`);
 return {s,X,base,svg:extra=>`<svg viewBox="0 0 ${W} ${H}" class="fig" style="max-width:${W}px">${s}${extra||''}</svg>`};}

/* ---- widgets ---- */
function mountMeanBal(el){
 let last=8;const base=[3,6,0,2,5,1];
 el.innerHTML=`<div class="ctrl"><label>Change one student’s hours <input type="range" min="0" max="20" value="8"></label></div><div id="mbg"></div><div class="readout" id="mbr"></div>`;
 const draw=()=>{const d=[...base,last],m=mean(d),md=median(d);const P=dotPlot(d,{hi:20,hl:[6],marks:[[md,'#15803d','median '+r2(md),0]]});
  const fx=P.X(m),fy=P.base+30;const tri=`<path d="M${fx} ${P.base+4} L${fx-12} ${fy} L${fx+12} ${fy}Z" fill="#ea580c"/><text x="${fx}" y="${fy+0}" dy="-26" text-anchor="middle" font-size="0"></text>`;
  $('#mbg',el).innerHTML=dotPlot(d,{hi:20,hl:[6],H:200,marks:[[md,'#15803d','median '+r2(md),0,m>=md?'end':'start'],[m,'#ea580c','mean '+r2(m),0,m>=md?'start':'end']]}).svg(`<path d="M${fx} ${158+4} L${fx-12} ${186} L${fx+12} ${186}Z" fill="#ea580c"/>`);
  $('#mbr',el).innerHTML=`Hours of video games per day: <b>${[...d].sort((a,b)=>a-b).join(', ')}</b><br><b style="color:#ea580c">Mean = ${d.reduce((a,b)=>a+b,0)} ÷ 7 ≈ ${r2(m)}</b> — the balance point (the orange triangle). <b style="color:#15803d">Median = ${r2(md)}</b> — the middle value.<br>Drag the red student far to the right: the <b>mean</b> slides toward it, but the <b>median</b> barely moves.`;};
 $('input',el).addEventListener('input',e=>{last=+e.target.value;draw();});draw();
}
function mountSD(el){
 const SETS=[{t:'Artist A: 7, 8, 9, 8, 9, 7',d:[7,8,9,8,9,7]},{t:'Artist B: 6, 10, 5, 11, 12, 4',d:[6,10,5,11,12,4]}];let k=0;
 el.innerHTML=`<p style="margin:0">Songs liked by 6 students for two artists. Same mean — different spread.</p><div class="row">${SETS.map((s,i)=>`<button data-k="${i}">${s.t}</button>`).join('')}</div><div id="sdg"></div><div class="readout" id="sdr"></div>`;
 const draw=()=>{const d=SETS[k].d,m=mean(d),s=sd(d);const P=dotPlot(d,{lo:2,hi:14,band:[m-s,m+s],H:190,marks:[[m,'#ea580c','mean 8']]});
  let x='';const cnt={};d.forEach(v=>{cnt[v]=(cnt[v]||0)+1;const y=P.base-12-(cnt[v]-1)*18;x+=`<line x1="${P.X(m)}" y1="${y}" x2="${P.X(v)}" y2="${y}" stroke="#7c3aed" stroke-width="2"/>`;});
  $('#sdg',el).innerHTML=P.svg(x);$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));
  $('#sdr',el).innerHTML=`Purple lines = each value’s distance from the mean. Shaded band = mean ± 1 standard deviation.<br><b>Standard deviation ≈ ${r2(s)}</b> — ${s<1.5?'small: the data is clustered close to the mean.':'large: the data is spread out far from the mean.'}`;};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;draw();}});draw();
}
function mountOutlier(el){
 const base=[0,0,0,1,1,1,1,1,2,2,2,2,3,3];let on=true;
 el.innerHTML=`<div class="row"><button data-o="1">Plot A: with the teacher who spends 8 hours</button><button data-o="0">Plot B: without</button></div><div id="og"></div><div class="readout" id="or"></div>`;
 const draw=()=>{const d=on?[...base,8]:base,m=mean(d),md=median(d),s=sd(d);
  $('#og',el).innerHTML=dotPlot(d,{lo:0,hi:9,H:200,hl:on?[14]:[],marks:[[md,'#15803d','median '+r2(md),0,m>=md?'end':'start'],[m,'#ea580c','mean '+r2(m),0,m>=md?'start':'end']]}).svg();
  $$('[data-o]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.o===+on));
  $('#or',el).innerHTML=`Hours on social media per day (${d.length} teachers).<br><b style="color:#ea580c">Mean ≈ ${r2(m)}</b> · <b style="color:#15803d">Median = ${r2(md)}</b> · Range = ${Math.max(...d)-Math.min(...d)} · Standard deviation ≈ ${r2(s)}<br>`+(on?'The red dot (8) is an <b>outlier</b> — far from the rest. It pulls the mean up and stretches the range and standard deviation. The median stays put.':'Without the outlier, the mean and median are close together and the spread is small.');};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-o]');if(b){on=b.dataset.o==='1';draw();}});draw();
}
function mountHist(el){
 const d=[62,65,67,68,70,71,71,72,74,75,75,76,77,78,78,79,80,81,82,84,85,86,88,90,95];let w=10;
 el.innerHTML=`<p style="margin:0">Test scores for 25 students. A histogram groups the data into equal intervals (bins).</p><div class="row"><button data-w="5">Bins of 5</button><button data-w="10">Bins of 10</button></div><div id="hg"></div><div class="readout" id="hr"></div>`;
 const draw=()=>{const lo=60,hi=100,bins=[];for(let b=lo;b<hi;b+=w)bins.push([b,d.filter(v=>v>=b&&v<b+w).length]);const mxc=Math.max(...bins.map(b=>b[1]));const W=520,H=230,bw=(W-60)/bins.length;let s='';
  bins.forEach(([b,c],i)=>{const h=c/mxc*150;s+=`<rect x="${40+i*bw}" y="${190-h}" width="${bw}" height="${h}" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/><text x="${40+i*bw+bw/2}" y="${184-h}" text-anchor="middle" font-size="14" font-weight="800">${c}</text><text x="${40+i*bw}" y="${210}" text-anchor="middle" class="tl">${b}</text>`;});
  s+=`<text x="${40+bins.length*bw}" y="210" text-anchor="middle" class="tl">${hi}</text><line x1="36" y1="190" x2="${W-16}" y2="190" stroke="#374151" stroke-width="2"/><text x="${W/2}" y="228" text-anchor="middle" class="tl" font-weight="700">score</text>`;
  $('#hg',el).innerHTML=`<svg viewBox="0 0 ${W} ${H+6}" class="fig" style="max-width:${W}px">${s}</svg>`;$$('[data-w]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.w===w));
  $('#hr',el).innerHTML=`Each bar counts how many scores fall in that interval (for example ${bins[1][0]}–${bins[1][0]+w-1}: <b>${bins[1][1]}</b> students). The bars touch because the intervals are continuous.`;};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-w]');if(b){w=+b.dataset.w;draw();}});draw();
}
const NPCT={'-3':0.15,'-2':2.35,'-1':13.5,'0':34,'1':34,'2':13.5,'3':2.35};
function pctBetween(a,b){let t=0;for(let k=a;k<b;k++){t+=k<-3?0.15:k>=3?0.15:[2.35,13.5,34,34,13.5,2.35][k+3];}return +t.toFixed(2);}
function mountNormal(el){
 let a=-1,b=1;const MU=4000,SG=800;
 const opts=v=>[-4,-3,-2,-1,0,1,2,3,4].map(k=>`<option value="${k}" ${k===v?'selected':''}>${k===-4?'−∞ (far left)':k===4?'+∞ (far right)':(k>0?'+':k<0?'−':'')+Math.abs(k)+'σ = '+(MU+k*SG).toLocaleString()}</option>`).join('');
 el.innerHTML=`<div class="ctrl"><label>from <select id="na" style="font:inherit;padding:4px">${opts(a)}</select></label><label>to <select id="nb" style="font:inherit;padding:4px">${opts(b)}</select></label></div><div id="ng"></div><div class="readout" id="nr"></div>
 <div class="row"><button data-p="-1,1">within 1σ</button><button data-p="-2,2">within 2σ</button><button data-p="1,4">above +1σ</button><button data-p="-4,-2">below −2σ</button></div>`;
 const W=600,H=230,cx=300,sx=80,base=180,f=z=>Math.exp(-z*z/2);
 const draw=()=>{const lo=Math.min(a,b),hi=Math.max(a,b);let s='';
  const zA=Math.max(lo,-3.6),zB=Math.min(hi,3.6);let d=`M${cx+zA*sx} ${base}`;for(let z=zA;z<=zB+1e-9;z+=0.05)d+=` L${cx+z*sx} ${base-f(z)*140}`;d+=` L${cx+zB*sx} ${base}Z`;if(hi>lo)s+=`<path d="${d}" fill="rgba(37,99,235,.3)"/>`;
  let c='';for(let z=-3.6;z<=3.61;z+=0.05)c+=(c?' L':'M')+(cx+z*sx)+' '+(base-f(z)*140);s+=`<path d="${c}" fill="none" stroke="#1f2937" stroke-width="2.5"/><line x1="10" y1="${base}" x2="${W-10}" y2="${base}" stroke="#374151" stroke-width="2"/>`;
  [-3,-2,-1,0,1,2,3].forEach(k=>{s+=`<line x1="${cx+k*sx}" y1="${base}" x2="${cx+k*sx}" y2="${base-f(k)*140}" stroke="#9ca3af" stroke-dasharray="3 3"/><text x="${cx+k*sx}" y="${base+18}" text-anchor="middle" class="tl">${(MU+k*SG).toLocaleString()}</text><text x="${cx+k*sx}" y="${base+34}" text-anchor="middle" font-size="12" font-weight="700" fill="#7c3aed">${k===0?'μ':(k>0?'+':'−')+Math.abs(k)+'σ'}</text>`;});
  [-2.5,-1.5,-0.5,0.5,1.5,2.5].forEach((z,i)=>s+=`<text x="${cx+z*sx}" y="${base-14}" text-anchor="middle" font-size="13" font-weight="800" fill="#1e40af">${[2.35,13.5,34,34,13.5,2.35][i]}%</text>`);
  $('#ng',el).innerHTML=`<svg viewBox="0 0 ${W} ${H}" class="fig" style="max-width:${W}px">${s}</svg>`;
  const p=pctBetween(lo,hi);$('#na',el).value=a;$('#nb',el).value=b;
  $('#nr',el).innerHTML=`Unique words per artist: mean <b>μ = 4,000</b>, standard deviation <b>σ = 800</b>.<br>Shaded probability = <b>${p}%</b> of artists ${lo===-4?'':`use more than ${(MU+lo*SG).toLocaleString()}`}${lo>-4&&hi<4?' and ':''}${hi===4?'':`fewer than ${(MU+hi*SG).toLocaleString()}`} unique words.`;};
 $('#na',el).addEventListener('change',e=>{a=+e.target.value;draw();});$('#nb',el).addEventListener('change',e=>{b=+e.target.value;draw();});
 el.addEventListener('click',e=>{const p=e.target.closest('[data-p]')?.dataset.p;if(p){[a,b]=p.split(',').map(Number);draw();}});draw();
}
function linreg(xs,ys){const mx_=mean(xs),my=mean(ys);let sxy=0,sxx=0,syy=0;xs.forEach((x,i)=>{sxy+=(x-mx_)*(ys[i]-my);sxx+=(x-mx_)**2;syy+=(ys[i]-my)**2;});const m=sxy/sxx;return {m,b:my-m*mx_,r:sxy/Math.sqrt(sxx*syy)};}
const SCAT=[{t:'📚 Study time vs. test score',xl:'hours studied',yl:'score',x:[1,2,2,3,4,4,5,6,6,7,8],y:[55,60,58,66,70,74,73,80,84,86,92],G:{x0:0,x1:9,y0:40,y1:100,u:50,uy:4.5,lab:1,laby:10,gsy:10}},
 {t:'🎮 Gaming vs. sleep',xl:'hours gaming',yl:'hours of sleep',x:[0,1,1,2,3,3,4,5,5,6],y:[9,8.5,9,8,7.5,7,7,6,6.5,5.5],G:{x0:0,x1:7,y0:4,y1:10,u:60,uy:40,lab:1,laby:1,gsy:1}},
 {t:'👟 Shoe size vs. test score',xl:'shoe size',yl:'score',x:[6,7,7,8,8,9,9,10,10,11,12],y:[82,60,91,75,68,88,58,79,94,65,77],G:{x0:5,x1:13,y0:40,y1:100,u:50,uy:4.5,lab:1,laby:10,gsy:10}}];
function mountScatter(el){
 let k=0,show=false;
 el.innerHTML=`<div class="row">${SCAT.map((p,i)=>`<button data-k="${i}">${p.t}</button>`).join('')}<button data-t>Show / hide trend line</button></div><div id="scg"></div><div class="readout" id="scr"></div>`;
 const draw=()=>{const p=SCAT[k],G=grid({...p.G,xl:p.xl,yl:p.yl}),L2=linreg(p.x,p.y);let s=p.x.map((x,i)=>gdot(G,x,p.y[i],'#2563eb',7)).join('');if(show)s+=gline(G,L2.m,L2.b,'',`stroke="#ea580c" stroke-width="3"`);
  $('#scg',el).innerHTML=G.svg(s);$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));
  const r=L2.r,kind=Math.abs(r)<0.3?'no correlation':r>0?'positive correlation':'negative correlation',str=Math.abs(r)>0.8?'strong':Math.abs(r)>0.5?'moderate':'weak';
  $('#scr',el).innerHTML=`<b>${kind[0].toUpperCase()+kind.slice(1)}</b>${Math.abs(r)>=0.3?` (${str})`:''} — correlation coefficient <b>r ≈ ${r2(r)}</b>.<br>`+(r>0.3?'As one variable goes up, the other tends to go up.':r<-0.3?'As one variable goes up, the other tends to go down.':'There is no clear pattern — the variables seem unrelated.')+(show?` Trend line: <b>y ≈ ${r2(L2.m)}x ${L2.b<0?'−':'+'} ${r2(Math.abs(L2.b))}</b>.`:'')+'<br><span class="mute">Remember: correlation does not prove that one thing causes the other.</span>';};
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.k!==undefined)k=+b.dataset.k;if(b.dataset.t!==undefined)show=!show;draw();});draw();
}
const AGE=[2,3,3,4,4,4,5,5,5,6],HT=[30,33,34,37,35,38,40,42,43,42];
function mountResid(el){
 const LN=[{t:'Sarah: y = 3x + 25',m:3,b:25},{t:'Jon: y = 4x + 21',m:4,b:21}];let k=0;
 el.innerHTML=`<p style="margin:0">Heights of 10 children (inches) by age. Which line fits better?</p><div class="row">${LN.map((l,i)=>`<button data-k="${i}">${l.t}</button>`).join('')}</div><div id="rsg"></div><div id="rst" style="overflow-x:auto"></div><div class="readout" id="rsr"></div>`;
 const draw=()=>{const l=LN[k],G=grid({x0:1,x1:7,y0:25,y1:50,u:70,uy:12,lab:1,laby:5,gsy:5,xl:'age (years)',yl:'height (in)'});const pred=AGE.map(x=>l.m*x+l.b),res=HT.map((y,i)=>y-pred[i]),ss=res.reduce((s,v)=>s+v*v,0);
  let s=gline(G,l.m,l.b,'',`stroke="#ea580c" stroke-width="3"`);const off={};AGE.forEach((x,i)=>{const o=(off[x]=(off[x]||0)+1);const xx=x+(o-2)*0.08;s+=`<line x1="${G.X(xx)}" y1="${G.Y(HT[i])}" x2="${G.X(xx)}" y2="${G.Y(pred[i])}" stroke="${res[i]>=0?'#15803d':'#b91c1c'}" stroke-width="3"/>`+gdot(G,xx,HT[i],'#2563eb',6);});
  $('#rsg',el).innerHTML=G.svg(s);$$('[data-k]',el).forEach(b=>b.classList.toggle('sel',+b.dataset.k===k));
  $('#rst',el).innerHTML=tableHTML([['Age x',AGE],['Actual y',HT],['Predicted',pred],['Residual',res],['Squared',res.map(v=>v*v)]]);
  $('#rsr',el).innerHTML=`Green/red bars = <b>residuals</b> (actual − predicted). Sum of squared residuals = <b>${ss}</b>.<br>Sarah’s line: 21. Jon’s line: ${HT.reduce((s,y,i)=>s+(y-(4*AGE[i]+21))**2,0)}. <b>Smaller sum = better fit</b>, so ${ss===21?'Sarah’s line fits better.':'Sarah’s line still fits better.'}`;};
 el.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){k=+b.dataset.k;draw();}});draw();
}

/* ---- lessons ---- */
L['1A-5-1']={
 goal:'I can compare data sets using measures of center (mean, median) and spread (standard deviation).',
 life:{title:'“How long do you game each day?”',html:'Seven students report their hours of video games per day: 3, 6, 0, 2, 5, 1, 8. What’s a “typical” amount? The <b>mean</b> (average) and the <b>median</b> (middle) are two ways to answer.<br>And two classes can have the same average but be very different — that’s what <b>spread</b> measures.'},
 see:[{title:'Mean = balance point, median = middle',hint:'Move the red student’s value. Watch which measure follows it.',mount:mountMeanBal},{title:'Same mean, different spread',hint:'Switch between the two artists. Compare the purple distance lines.',mount:mountSD}],
 vocab:[['Mean','Add all values, divide by how many there are.'],['Median','The middle value after ordering. With two middle values, take their average.'],['Standard deviation','The typical distance of the data from the mean. Small = clustered, large = spread out.'],['Deviation','A value minus the mean (x − x̄).']],
 examples:[
  {title:'Example 1 — Median with an even count',prob:'Find the median of 8, 5, 15, 10, 14, 0, 6, 12.',raw:true,lines:[
   ['0, 5, 6, 8, 10, 12, 14, 15','Order the data.'],['8 and 10','There are 8 values, so two middle numbers.'],['(8 + 10) ÷ 2 = 9','The median is halfway between them: 9.']]},
  {title:'Example 2 — Standard deviation by hand',prob:'The Clippers held opponents to 77, 86, 84, 93, 90 points. Find the standard deviation.',raw:true,lines:[
   ['mean = 430 ÷ 5 = 86','Step 1: Find the mean.'],['−9, 0, −2, 7, 4','Step 2a: Deviations (value − 86).'],['81, 0, 4, 49, 16','Step 2b: Square each deviation.'],['150 ÷ 5 = 30','Step 3: Mean of the squared deviations.'],['√30 ≈ 5.48','Step 4: Square root → standard deviation ≈ 5.48 points.']]}],
 mistake:{bad:'Median of 3, 6, 0, 2, 5, 1, 8 is 2 (the middle of the list as written)',good:'Order first: 0, 1, 2, 3, 5, 6, 8 → median 3',why:'Always put the data <b>in order</b> before finding the middle.'},
 practice(){
  if(Math.random()<.6){const n=pick([5,6,7]),d=[...Array(n)].map(()=>rand(0,15));const m=mean(d),md=median(d);
   return {q:`Find the mean and median of: <b>${d.join(', ')}</b> <span class="mute">(round the mean to the nearest tenth)</span>`,fields:[{label:'Mean ≈',answer:Math.round(m*10)/10,tol:.051},{label:'Median =',answer:md}],raw:true,hint:'Mean: add and divide. Median: put the numbers in order and find the middle.',
    sol:[[`sum = ${d.reduce((a,b)=>a+b,0)}, n = ${n}`,'Add the values.'],[`mean = ${d.reduce((a,b)=>a+b,0)} ÷ ${n} ≈ ${r2(m)}`,'Divide.'],[[...d].sort((a,b)=>a-b).join(', '),'Order the data.'],[`median = ${md}`,n%2?'The middle value.':'Average of the two middle values.']]};}
  const m=rand(5,20),dv=pick([[-2,0,2],[-3,1,2],[-4,1,3],[-1,-1,2],[-2,-2,4],[-6,2,4]]),d=dv.map(v=>m+v),s=sd(d);
  return {q:`Find the standard deviation of <b>${d.join(', ')}</b>. <span class="mute">(nearest hundredth)</span>`,fields:[{label:'σ ≈',answer:Math.round(s*100)/100,tol:.011}],raw:true,hint:'Mean → deviations → square them → average → square root.',
   sol:[[`mean = ${m}`,'Step 1.'],[dv.map(fmtNeg).join(', '),'Deviations.'],[dv.map(v=>v*v).join(', '),'Squared.'],[`${dv.reduce((a,v)=>a+v*v,0)} ÷ 3 ≈ ${r2(dv.reduce((a,v)=>a+v*v,0)/3)}`,'Mean of squares.'],[`√ ≈ ${r2(s)}`,'Square root.']]};},
 check:[
  {q:'Find the median of 3, 2, 0, 4, 5, 4.',o:['3','3.5','4','3.33'],a:1,why:'Order: 0, 2, 3, 4, 4, 5. Middle two: 3 and 4 → 3.5.'},
  {q:'Two data sets have the same mean. Set A has standard deviation 0.8; set B has 3.1. Which is more spread out?',o:['A','B','Same','Cannot tell'],a:1,why:'A larger standard deviation means more spread.'},
  {q:'Mean of 3, 6, 0, 2, 5, 1, 8?',o:['3','3.57','25','5'],a:1,why:'25 ÷ 7 ≈ 3.57.'}]
};

L['1A-5-2']={
 goal:'I can display data in dot plots and histograms and explain how outliers affect center and spread.',
 life:{title:'One teacher who is always online',html:'Fourteen teachers spend 0–3 hours a day on social media. One spends <b>8 hours</b>. That single value — an <b>outlier</b> — can drag the average up and make the group look more online than it really is.<br>Pictures like dot plots make outliers jump out instantly.'},
 see:[{title:'The effect of an outlier',hint:'Switch between the two plots. Which measure moves?',mount:mountOutlier},{title:'Histograms group data',hint:'Try bins of 5 and bins of 10.',mount:mountHist}],
 vocab:[['Dot plot','One dot per value, stacked above a number line.'],['Histogram','Bars that count how many values fall in equal intervals. Bars touch.'],['Outlier','A value far from the rest of the data (high or low).'],['Resistant','The median is resistant to outliers; the mean is not.']],
 examples:[
  {title:'Example — Compare with and without the outlier',prob:'Plot A: 0,0,0,1,1,1,1,1,2,2,2,2,3,3,<b>8</b>. Plot B: same, without the 8.',raw:true,lines:[
   ['A: mean ≈ 1.8, median = 1','With the outlier.'],['B: mean ≈ 1.4, median = 1','Without the outlier.'],['mean changed, median did not','The outlier pulls the mean toward it. The median is resistant.'],['range 8 vs. 3','The spread grows a lot too.']]},
  {title:'Example — Reading a histogram',prob:'A bar from 70 to 80 has height 9.',raw:true,lines:[['9 values','9 scores are at least 70 and less than 80.'],['not individual values','A histogram shows how many, not exactly which values.']]}],
 mistake:{bad:'Use the mean to describe data with a big outlier',good:'Use the median',why:'The median gives a fairer “typical” value when there is an outlier.'},
 practice(){
  if(Math.random()<.5){const n=6,d=[...Array(n)].map(()=>rand(2,9)),o=rand(25,40),dd=[...d,o];const m1=mean(d),m2=mean(dd);
   return {q:`Data: <b>${shuffle(dd).join(', ')}</b>. Which value is the outlier, and what is the mean <b>without</b> it? <span class="mute">(nearest tenth)</span>`,fields:[{label:'Outlier =',answer:o},{label:'Mean without it ≈',answer:Math.round(m1*10)/10,tol:.051}],raw:true,hint:'The outlier is far from the others. Remove it, then add and divide.',
    sol:[[`outlier = ${o}`,'Much larger than the others.'],[`mean with it ≈ ${r2(m2)}`,'Pulled up by the outlier.'],[`mean without it ≈ ${r2(m1)}`,`${d.reduce((a,b)=>a+b,0)} ÷ ${n}.`]]};}
  return {type:'mc',q:'A data set gets one very large outlier added. What happens?',opts:['The mean increases a lot; the median changes a little or not at all','The median increases a lot; the mean stays the same','Both stay the same','The range gets smaller'],a:0,why:'The mean uses every value’s size; the median only cares about the middle position.'};},
 check:[
  {q:'Which measure of center is resistant to outliers?',o:['Mean','Median','Range','Standard deviation'],a:1,why:'The median depends only on the middle position.'},
  {q:'In a histogram, the bars…',o:['have gaps between them','touch, because the intervals are continuous','show each individual value','must all be the same height'],a:1,why:'Intervals like 60–70 and 70–80 are next to each other.'},
  {q:'Adding an outlier of 8 to 0, 1, 1, 2, 3 makes the range…',o:['3','5','8','2.5'],a:2,why:'Range = 8 − 0 = 8 (it was 3).'}]
};

L['1A-5-3']={
 goal:'I can use the normal distribution (68–95–99.7 rule) to estimate probabilities.',
 life:{title:'How “extraordinary” is a rapper’s vocabulary?',html:'Across many artists, the number of unique words used is <b>normally distributed</b>: most are near the mean of <b>4,000</b>, few are far away. The standard deviation is <b>800</b>.<br>An artist with 5,600 words is <b>+2σ</b> above the mean — only about <b>2.5%</b> of artists do better. Bell curves also describe heights, test scores, and baby weights.'},
 see:[{title:'Area under the bell curve = probability',hint:'Choose where to start and stop shading. Add the percents in each section.',mount:mountNormal}],
 vocab:[['Normal distribution','A symmetric, bell-shaped distribution centered at the mean.'],['μ and σ','μ (mu) = population mean, σ (sigma) = population standard deviation.'],['68–95–99.7 rule','About 68% of data is within 1σ of the mean, 95% within 2σ, 99.7% within 3σ.'],['Sections','34% | 13.5% | 2.35% | 0.15% on each side of the mean.']],
 examples:[
  {title:'Example 1',prob:'What percent of artists use between 3,200 and 4,800 unique words?',raw:true,lines:[['3,200 = μ − 1σ, 4,800 = μ + 1σ','Convert to standard deviations.'],['34% + 34%','Add the two middle sections.'],['= 68%','About 68% of artists.']]},
  {title:'Example 2',prob:'What percent use more than 5,600 words?',raw:true,lines:[['5,600 = μ + 2σ','(5,600 − 4,000) ÷ 800 = 2.'],['2.35% + 0.15%','Add the sections to the right of +2σ.'],['= 2.5%','Only about 2.5% — far above average.']]}],
 mistake:{bad:'Within 2σ = 13.5% + 13.5% = 27%',good:'Within 2σ = 13.5 + 34 + 34 + 13.5 = 95%',why:'“Within” includes <b>every</b> section between the two bounds.'},
 practice(){
  const mu=pick([60,70,100,500,4000]),sg={60:5,70:8,100:15,500:50,4000:800}[mu];const ty=pick(['within','above','below']);let a,b,txt;
  if(ty==='within'){const k=pick([1,2,3]);a=-k;b=k;txt=`between ${mu-k*sg} and ${mu+k*sg}`;}else if(ty==='above'){const k=pick([-1,0,1,2]);a=k;b=4;txt=`above ${mu+k*sg}`;}else{const k=pick([-2,-1,0,1]);a=-4;b=k;txt=`below ${mu+k*sg}`;}
  const p=pctBetween(a,b);
  return {q:`Data is normally distributed with mean <b>${mu}</b> and standard deviation <b>${sg}</b>. What percent of the data is <b>${txt}</b>?`,fields:[{label:'Percent ≈',answer:p,unit:'%',tol:.06}],raw:true,hint:'Convert each bound to a number of standard deviations from the mean, then add the sections: 34, 13.5, 2.35, 0.15.',
   sol:[[`bounds: ${a===-4?'−∞':(a>=0?'+':'')+a+'σ'} to ${b===4?'+∞':(b>=0?'+':'')+b+'σ'}`,'Convert to σ.'],[`≈ ${p}%`,'Add the sections between the bounds.']]};},
 check:[
  {q:'About what percent of normal data is within 1 standard deviation of the mean?',o:['34%','50%','68%','95%'],a:2,why:'34% + 34% = 68%.'},
  {q:'Mean 4,000, σ = 800. 2,400 words is how many standard deviations from the mean?',o:['−1','−2','+2','−3'],a:1,why:'(2,400 − 4,000) ÷ 800 = −2.'},
  {q:'What percent of normal data is above the mean?',o:['34%','50%','68%','100%'],a:1,why:'The curve is symmetric: half is above the mean.'}]
};

L['1A-5-4']={
 goal:'I can make a scatter plot, describe the correlation, and draw a trend line.',
 life:{title:'Does studying pay off?',html:'Plot each student as a point: (hours studied, test score). If the points rise from left to right, more studying tends to go with higher scores — a <b>positive correlation</b>.<br>But careful: two things moving together doesn’t prove one <b>causes</b> the other (ice cream sales and sunburns rise together — because of summer!).'},
 see:[{title:'Positive, negative, or none?',hint:'Pick a data set and turn on the trend line.',mount:mountScatter}],
 vocab:[['Bivariate data','Pairs of values for two variables (x, y).'],['Scatter plot','A graph of bivariate data as points.'],['Correlation','Positive: both go up together. Negative: one goes up while the other goes down. None: no pattern.'],['Correlation coefficient r','A number from −1 to 1. Near ±1 = strong; near 0 = weak or none.'],['Trend line','A line that follows the pattern of the points (line of fit).']],
 examples:[
  {title:'Example — Describe and predict',prob:'Study-time data rises from left to right, and the trend line is y ≈ 4.6x + 52.',raw:true,lines:[['positive correlation','The points go up from left to right.'],['r ≈ 0.99 → strong','Points are very close to a line.'],['y ≈ 4.6(5) + 52 = 75','Predict the score for 5 hours of study: about 75.']]},
  {title:'Example — Correlation vs. causation',prob:'Shoe size and test score have r ≈ 0.1.',raw:true,lines:[['no correlation','r is close to 0, no pattern.'],['Even strong r ≠ cause','A third factor can drive both variables.']]}],
 mistake:{bad:'r = −0.9 means a weak relationship',good:'r = −0.9 is a STRONG negative relationship',why:'The <b>sign</b> gives the direction; the <b>size</b> (closeness to 1) gives the strength.'},
 practice(){
  if(Math.random()<.5){const t=rand(0,2),m=[1.2,-1.1,0][t];const xs=[1,2,3,4,5,6,7,8],ys=xs.map(x=>t===2?rand(2,9):Math.max(0.5,Math.min(9.5,5+m*(x-4.5)+(Math.random()-.5)*1.6)));const G=grid({x0:0,x1:9,y0:0,y1:10,u:30,lab:1,laby:2});
   return {type:'mc',q:'Describe the correlation in this scatter plot.',fig:G.svg(xs.map((x,i)=>gdot(G,x,ys[i],'#2563eb',6)).join('')),opts:['Positive','Negative','No correlation'],a:t,why:['The points rise from left to right.','The points fall from left to right.','No clear pattern.'][t]};}
  const it=pick([['the outside temperature and hot chocolate sales','Negative'],['height and arm span','Positive'],['hours of practice and free-throw percentage','Positive'],['a car’s age and its value','Negative'],['your birth month and your height','No correlation'],['miles driven and gas left in the tank','Negative']]);
  return {type:'mc',q:`What type of correlation would you expect between <b>${it[0]}</b>?`,opts:['Positive','Negative','No correlation'],a:['Positive','Negative','No correlation'].indexOf(it[1]),why:it[1]==='Positive'?'Both tend to increase together.':it[1]==='Negative'?'As one increases, the other decreases.':'They are unrelated.'};},
 check:[
  {q:'Which r shows the strongest relationship?',o:['0.45','−0.92','0.10','−0.30'],a:1,why:'|−0.92| is closest to 1.'},
  {q:'As hours of gaming go up, hours of sleep go down. This is…',o:['positive correlation','negative correlation','no correlation','causation'],a:1,why:'One goes up while the other goes down.'},
  {q:'A strong correlation proves that x causes y.',o:['True','False'],a:1,why:'Correlation does not imply causation.'}]
};

L['1A-5-5']={
 goal:'I can find and plot residuals for a line of fit and use them to decide which line fits better.',
 life:{title:'Predicting a child’s height',html:'Sarah thinks height ≈ <span class="math">'+mx('y = 3x + 25')+'</span> (x = age). Jon thinks <span class="math">'+mx('y = 4x + 21')+'</span>. Who is closer?<br>Measure each prediction’s <b>miss</b> — the residual. Square the misses and add them. The line with the <b>smaller total</b> fits better.'},
 see:[{title:'Residuals are the misses',hint:'Switch between the two lines. Compare the bar lengths and the totals.',mount:mountResid}],
 vocab:[['Residual','Actual y − predicted y. Positive: point above the line. Negative: below.'],['Predicted value','What the line gives when you plug in x.'],['Sum of squared residuals','Square each residual and add. Closer to 0 = better fit.'],['Line of best fit','The line with the smallest sum of squared residuals.']],
 examples:[
  {title:'Example — One residual',prob:'Sarah’s line y = 3x + 25. A 5-year-old is 43 inches tall.',lines:[['y = 3(5) + 25 = 40','Predicted height.'],['43 − 40 = 3','Residual = actual − predicted = +3 (point is above the line).']]},
  {title:'Example — Compare the lines',prob:'Use the whole table.',raw:true,lines:[['Sarah: −1, −1, 0, 0, −2, 1, 0, 2, 3, −1','Residuals.'],['1 + 1 + 0 + 0 + 4 + 1 + 0 + 4 + 9 + 1 = 21','Sum of squared residuals.'],['Jon: sum = '+HT.reduce((s,y,i)=>s+(y-(4*AGE[i]+21))**2,0),'Do the same for Jon’s line y = 4x + 21.'],['Sarah’s line fits better','Smaller sum of squared residuals.']]}],
 mistake:{bad:'Residual = predicted − actual',good:'Residual = actual − predicted',why:'Then a point <b>above</b> the line has a <b>positive</b> residual.'},
 practice(){
  const m=pick([2,3,4,5]),b=rand(5,30),x=rand(1,9),r=pick([-4,-3,-2,-1,1,2,3,4]),y=m*x+b+r;
  if(Math.random()<.65)return {q:`The line of fit is <span class="math">${mx(`y = ${m}x + ${b}`)}</span>. A data point is <b>(${x}, ${y})</b>. What is its residual?`,fields:[{label:'Residual =',answer:r}],hint:'Residual = actual y − predicted y.',sol:[[`y = ${m}(${x}) + ${b} = ${m*x+b}`,'Predicted value.'],[`${y} − ${m*x+b} = ${fmtNeg(r)}`,'Actual − predicted.']]};
  const s1=rand(8,40),s2=s1+rand(3,30);const m2=mcFrom(`Line A (sum = ${s1})`,[`Line B (sum = ${s2})`]);return {type:'mc',q:`Line A has a sum of squared residuals of ${s1}. Line B has ${s2}. Which line fits the data better?`,opts:m2.opts,a:m2.a,why:'The smaller the sum of squared residuals, the better the fit.'};},
 check:[
  {q:'A point lies above the line of fit. Its residual is…',o:['positive','negative','zero','undefined'],a:0,why:'Actual > predicted → positive residual.'},
  {q:'y = 3x + 25. For the point (4, 35), the residual is…',o:['2','−2','37','0'],a:1,why:'Predicted 37; 35 − 37 = −2.'},
  {q:'Why do we square residuals before adding them?',o:['To make them bigger','So positive and negative misses don’t cancel out','Because the line is curved','To find the slope'],a:1,why:'Squared values are all positive.'}]
};
})();
