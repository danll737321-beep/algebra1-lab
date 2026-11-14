/* Statistics & Probability · shared helpers — loaded after js/ka-core.js and js/a2-core.js */
window.ST=(function(){
const {nf}=KA;
const sum=a=>a.reduce((s,x)=>s+x,0),mean=a=>sum(a)/a.length;
const sorted=a=>a.slice().sort((x,y)=>x-y);
function median(a){const s=sorted(a),n=s.length;return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;}
/* quartiles: median of lower/upper halves, excluding the median when n is odd */
function five(a){const s=sorted(a),n=s.length,h=Math.floor(n/2);const lo=s.slice(0,h),hi=s.slice(n%2?h+1:h);return {min:s[0],q1:lo.length?median(lo):s[0],med:median(s),q3:hi.length?median(hi):s[n-1],max:s[n-1]};}
const sdp=a=>{const m=mean(a);return Math.sqrt(mean(a.map(x=>(x-m)**2)));};
const sds=a=>{const m=mean(a);return Math.sqrt(sum(a.map(x=>(x-m)**2))/(a.length-1));};
function corr(xs,ys){const mx=mean(xs),my=mean(ys);let sxy=0,sxx=0,syy=0;xs.forEach((x,i)=>{sxy+=(x-mx)*(ys[i]-my);sxx+=(x-mx)**2;syy+=(ys[i]-my)**2;});return sxy/Math.sqrt(sxx*syy);}
function lsrl(xs,ys){const mx=mean(xs),my=mean(ys);let sxy=0,sxx=0;xs.forEach((x,i)=>{sxy+=(x-mx)*(ys[i]-my);sxx+=(x-mx)**2;});const b=sxy/sxx;return {b,a:my-b*mx};}
function erf(x){const t=1/(1+0.3275911*Math.abs(x));const y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);return x>=0?y:-y;}
const ncdf=(x,m=0,s=1)=>0.5*(1+erf((x-m)/(s*Math.SQRT2)));
const npdf=(x,m=0,s=1)=>Math.exp(-(((x-m)/s)**2)/2)/(s*Math.sqrt(2*Math.PI));
function invN(p){let lo=-8,hi=8;for(let i=0;i<80;i++){const m=(lo+hi)/2;if(ncdf(m)<p)lo=m;else hi=m;}return (lo+hi)/2;}
const fact=n=>n<=1?1:n*fact(n-1);
const nPr=(n,r)=>fact(n)/fact(n-r),nCr=(n,r)=>Math.round(fact(n)/(fact(r)*fact(n-r)));
/* seeded RNG */
function rng(seed){let s=seed>>>0||1;return ()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function gauss(r){let u=0,v=0;while(!u)u=r();while(!v)v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
/* horizontal number axis helper: returns {X,svg(inner,h)} */
function axis(x0,x1,o={}){const W=o.W||520,pad=28,X=x=>pad+(x-x0)/(x1-x0)*(W-2*pad);const step=o.step||niceStep(x1-x0);
 const base=o.base||0;let ticks='';for(let v=Math.ceil(x0/step)*step;v<=x1+1e-9;v+=step){ticks+=`<line x1="${X(v)}" y1="${base}" x2="${X(v)}" y2="${base+6}" stroke="#374151"/><text x="${X(v)}" y="${base+20}" text-anchor="middle" font-size="11">${nf(+v.toFixed(6))}</text>`;}
 return {X,W,ticks:`<line x1="${pad-6}" y1="${base}" x2="${W-pad+6}" y2="${base}" stroke="#374151" stroke-width="2"/>${ticks}`};}
function niceStep(r){const t=r/8,p=10**Math.floor(Math.log10(t)),m=t/p;return (m<1.5?1:m<3.5?2:m<7.5?5:10)*p;}
const svg=(W,H,inner,mw)=>`<svg viewBox="0 0 ${W} ${H}" class="fig" style="max-width:${mw||W}px">${inner}</svg>`;
/* dot plot */
function dotPlot(data,x0,x1,o={}){const H=o.H||150,base=H-28,A=axis(x0,x1,{W:o.W,base,step:o.step});const cnt={};let s='';
 data.forEach((v,i)=>{const k=+v.toFixed(6);cnt[k]=(cnt[k]||0)+1;const hl=o.hl&&o.hl(v,i);s+=`<circle cx="${A.X(v)}" cy="${base-8-(cnt[k]-1)*13}" r="6" fill="${hl||o.col||'#2563eb'}" data-i="${i}"/>`;});
 return svg(A.W,H,A.ticks+s+(o.extra?o.extra(A,base):''));}
/* histogram */
function histogram(data,x0,x1,bw,o={}){const H=o.H||190,base=H-28,A=axis(x0,x1,{W:o.W,base,step:o.step||bw});const bins=[];for(let b=x0;b<x1-1e-9;b+=bw)bins.push({a:b,b:b+bw,n:0});
 data.forEach(v=>{let i=Math.floor((v-x0)/bw+1e-9);if(i>=bins.length)i=bins.length-1;if(i>=0)bins[i].n++;});const mx=Math.max(1,...bins.map(b=>b.n)),sc=(base-20)/mx;let s='';
 bins.forEach(b=>{if(!b.n)return;s+=`<rect x="${A.X(b.a)}" y="${base-b.n*sc}" width="${A.X(b.b)-A.X(b.a)}" height="${b.n*sc}" fill="${o.col||'#bfdbfe'}" stroke="#2563eb" stroke-width="1.5"/>${o.nolab?'':`<text x="${(A.X(b.a)+A.X(b.b))/2}" y="${base-b.n*sc-4}" text-anchor="middle" font-size="11" font-weight="800">${b.n}</text>`}`;});
 return svg(A.W,H,A.ticks+s+(o.extra?o.extra(A,base):''));}
/* box plot (optionally with outliers by 1.5·IQR) */
function boxPlot(data,x0,x1,o={}){const H=o.H||110,base=H-28,A=axis(x0,x1,{W:o.W,base,step:o.step}),f=five(data),iqr=f.q3-f.q1,lf=f.q1-1.5*iqr,uf=f.q3+1.5*iqr;
 const out=o.fences?data.filter(v=>v<lf||v>uf):[];const inl=o.fences?data.filter(v=>v>=lf&&v<=uf):data;const wl=Math.min(...inl),wh=Math.max(...inl);const y=base-36,h=28;
 let s=`<line x1="${A.X(wl)}" y1="${y+h/2}" x2="${A.X(f.q1)}" y2="${y+h/2}" stroke="#1f2937" stroke-width="2"/><line x1="${A.X(f.q3)}" y1="${y+h/2}" x2="${A.X(wh)}" y2="${y+h/2}" stroke="#1f2937" stroke-width="2"/>
 <line x1="${A.X(wl)}" y1="${y+6}" x2="${A.X(wl)}" y2="${y+h-6}" stroke="#1f2937" stroke-width="2"/><line x1="${A.X(wh)}" y1="${y+6}" x2="${A.X(wh)}" y2="${y+h-6}" stroke="#1f2937" stroke-width="2"/>
 <rect x="${A.X(f.q1)}" y="${y}" width="${Math.max(1,A.X(f.q3)-A.X(f.q1))}" height="${h}" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="${A.X(f.med)}" y1="${y}" x2="${A.X(f.med)}" y2="${y+h}" stroke="#e11d48" stroke-width="3"/>`;
 out.forEach(v=>{s+=`<text x="${A.X(v)}" y="${y+h/2+5}" text-anchor="middle" font-weight="800" fill="#e11d48">✱</text>`;});
 if(o.labels!==false)[['Min',wl],['Q1',f.q1],['Med',f.med],['Q3',f.q3],['Max',wh]].forEach(([l,v],i)=>{s+=`<text x="${A.X(v)}" y="${y-6-(i%2)*12}" text-anchor="middle" font-size="10" font-weight="800" fill="#475569">${l}</text>`;});
 return svg(A.W,H,A.ticks+s);}
/* normal curve with shading [a,b] */
function normalFig(m,s,a,b,o={}){const W=o.W||520,H=o.H||200,x0=m-4*s,x1=m+4*s,base=H-30,A=axis(x0,x1,{W,base,step:o.step||s}),py=v=>base-npdf(v,m,s)*s*(base-20)/0.4;let p='',sh='';
 for(let x=x0;x<=x1;x+=(x1-x0)/300)p+=(p?'L':'M')+A.X(x).toFixed(1)+' '+py(x).toFixed(1);
 if(a!==null&&b!==null){const lo=Math.max(a,x0),hi=Math.min(b,x1);if(hi>lo){sh=`M${A.X(lo)} ${base}`;for(let x=lo;x<=hi;x+=(hi-lo)/120)sh+=` L${A.X(x).toFixed(1)} ${py(x).toFixed(1)}`;sh+=` L${A.X(hi)} ${py(hi)} L${A.X(hi)} ${base} Z`;}}
 return svg(W,H,A.ticks+(sh?`<path d="${sh}" fill="rgba(147,51,234,.25)" stroke="none"/>`:'')+`<path d="${p}" fill="none" stroke="#9333ea" stroke-width="3"/>`+(o.extra?o.extra(A,base,py):''));}
/* scatter plot on grid */
function scatter(G,xs,ys,col='#2563eb'){return xs.map((x,i)=>`<circle cx="${G.X(x)}" cy="${G.Y(ys[i])}" r="5" fill="${col}" stroke="#fff" stroke-width="1.5"/>`).join('');}
/* simple bar chart from [{l,v,c}] */
function bars(items,o={}){const W=o.W||520,H=o.H||200,base=H-30,n=items.length,bw=(W-40)/n,mx=o.max||Math.max(1e-9,...items.map(i=>Math.max(i.v,i.v2||0)));let s=`<line x1="20" y1="${base}" x2="${W-20}" y2="${base}" stroke="#374151" stroke-width="2"/>`;
 items.forEach((it,i)=>{const x=20+i*bw,h=it.v/mx*(base-24);s+=`<rect x="${x+bw*0.15}" y="${base-h}" width="${bw*0.7}" height="${h}" fill="${it.c||'#93c5fd'}" rx="3"/>`;if(it.v2!==undefined){const h2=it.v2/mx*(base-24);s+=`<line x1="${x+bw*0.08}" y1="${base-h2}" x2="${x+bw*0.92}" y2="${base-h2}" stroke="#e11d48" stroke-width="3"/>`;}
  s+=`<text x="${x+bw/2}" y="${base+16}" text-anchor="middle" font-size="11">${it.l}</text>`;if(o.vals)s+=`<text x="${x+bw/2}" y="${base-h-4}" text-anchor="middle" font-size="10" font-weight="800">${o.vals(it.v)}</text>`;});
 return svg(W,H,s);}
const pct=v=>nf(+(v*100).toFixed(2))+'%';
return {sum,mean,sorted,median,five,sdp,sds,corr,lsrl,erf,ncdf,npdf,invN,fact,nPr,nCr,rng,gauss,axis,svg,dotPlot,histogram,boxPlot,normalFig,scatter,bars,pct};
})();
