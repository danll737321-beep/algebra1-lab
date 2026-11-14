/* Pre-Calculus + Calculus · shared helpers — loaded after js/ka-core.js and js/a2-core.js */
window.PC=(function(){
const {nf,curve}=A2;const PI=Math.PI;
const fx=v=>nf(v);
/* numeric calculus */
const d1=(f,x,h=1e-4)=>(f(x+h)-f(x-h))/(2*h);
const d2=(f,x,h=1e-3)=>(f(x+h)-2*f(x)+f(x-h))/(h*h);
function simpson(f,a,b,n=400){if(a===b)return 0;const h=(b-a)/n;let s=f(a)+f(b);for(let i=1;i<n;i++)s+=f(a+i*h)*(i%2?4:2);return s*h/3;}
/* parametric path on grid G */
function pcurve(G,X,Y,t0,t1,col='#2563eb',w=3,dash='',n=400){let d='',pen=false;for(let i=0;i<=n;i++){const t=t0+(t1-t0)*i/n,x=X(t),y=Y(t);if(!isFinite(x)||!isFinite(y)||Math.abs(x)>1e4||Math.abs(y)>1e4){pen=false;continue;}d+=(pen?' L':' M')+G.X(x).toFixed(1)+' '+G.Y(y).toFixed(1);pen=true;}
 return `<path clip-path="url(#${G.clip})" d="${d}" fill="none" stroke="${col}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;}
const polar=(G,r,t0,t1,col,w,dash)=>pcurve(G,t=>r(t)*Math.cos(t),t=>r(t)*Math.sin(t),t0,t1,col,w,dash,600);
/* arrow from a to b in graph units */
let AID=0;
function arrow(G,a,b,col='#2563eb',w=3,label=''){const id='ah'+(++AID);const x1=G.X(a[0]),y1=G.Y(a[1]),x2=G.X(b[0]),y2=G.Y(b[1]);
 return `<defs><marker id="${id}" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${col}"/></marker></defs><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" marker-end="url(#${id})"/>`+(label?`<text x="${(x1+x2)/2+8}" y="${(y1+y2)/2-8}" font-size="14" font-weight="800" fill="${col}" paint-order="stroke" stroke="#fff" stroke-width="4">${label}</text>`:'');}
/* shade region between f (top) and g (bottom) for x in [a,b] */
function region(G,f,g,a,b,fill='rgba(37,99,235,.22)'){if(b<a)[a,b]=[b,a];const n=160;let d='';for(let i=0;i<=n;i++){const x=a+(b-a)*i/n;d+=(i?' L':'M')+G.X(x).toFixed(1)+' '+G.Y(Math.max(G.y0-2,Math.min(G.y1+2,f(x)))).toFixed(1);}
 for(let i=n;i>=0;i--){const x=a+(b-a)*i/n;d+=' L'+G.X(x).toFixed(1)+' '+G.Y(Math.max(G.y0-2,Math.min(G.y1+2,g(x)))).toFixed(1);}return `<path clip-path="url(#${G.clip})" d="${d} Z" fill="${fill}" stroke="none"/>`;}
/* signed area under f: positive blue, negative red */
function signedArea(G,f,a,b){return region(G,x=>Math.max(0,f(x)),()=>0,a,b,'rgba(37,99,235,.25)')+region(G,()=>0,x=>Math.min(0,f(x)),a,b,'rgba(225,29,72,.22)');}
/* Riemann rectangles: kind L/R/M/T */
function riemann(G,f,a,b,n,kind='L'){const dx=(b-a)/n;let s='',sum=0;for(let i=0;i<n;i++){const xl=a+i*dx,xr=xl+dx;
 if(kind==='T'){const yl=f(xl),yr=f(xr);sum+=(yl+yr)/2*dx;s+=`<polygon clip-path="url(#${G.clip})" points="${G.X(xl)},${G.Y(0)} ${G.X(xl)},${G.Y(yl)} ${G.X(xr)},${G.Y(yr)} ${G.X(xr)},${G.Y(0)}" fill="${(yl+yr)>=0?'rgba(245,158,11,.35)':'rgba(225,29,72,.3)'}" stroke="#b45309" stroke-width="1.5"/>`;continue;}
 const xs=kind==='L'?xl:kind==='R'?xr:(xl+xr)/2,y=f(xs);sum+=y*dx;const top=Math.max(0,y),bot=Math.min(0,y);
 s+=`<rect clip-path="url(#${G.clip})" x="${G.X(xl)}" y="${G.Y(top)}" width="${G.X(xr)-G.X(xl)}" height="${G.Y(bot)-G.Y(top)}" fill="${y>=0?'rgba(245,158,11,.35)':'rgba(225,29,72,.3)'}" stroke="#b45309" stroke-width="1.5"/>`;}
 return {svg:s,sum};}
/* slope field for dy/dx = F(x,y) */
function slopeField(G,F,step=1,len=0.35,col='#64748b'){let s='';for(let x=Math.ceil(G.x0/step)*step;x<=G.x1+1e-9;x+=step)for(let y=Math.ceil(G.y0/step)*step;y<=G.y1+1e-9;y+=step){let m=F(x,y);if(!isFinite(m))m=1e6;const a=Math.atan(m),dx=Math.cos(a)*len*step,dy=Math.sin(a)*len*step;
 s+=`<line x1="${G.X(x-dx)}" y1="${G.Y(y-dy)}" x2="${G.X(x+dx)}" y2="${G.Y(y+dy)}" stroke="${col}" stroke-width="2" stroke-linecap="round"/>`;}return s;}
/* integrate dy/dx=F from (x0,y0) by RK4 in both directions, return path */
function solCurve(G,F,x0,y0,col='#e11d48',w=3){const pts=[];const go=dir=>{let x=x0,y=y0;const h=0.02*dir,out=[];for(let i=0;i<1500;i++){const k1=F(x,y),k2=F(x+h/2,y+h*k1/2),k3=F(x+h/2,y+h*k2/2),k4=F(x+h,y+h*k3);y+=h*(k1+2*k2+2*k3+k4)/6;x+=h;if(!isFinite(y)||Math.abs(y)>1e3||x<G.x0-1||x>G.x1+1)break;out.push([x,y]);}return out;};
 const L=go(-1).reverse(),R=go(1);[...L,[x0,y0],...R].forEach(p=>pts.push(p));let d='';pts.forEach((p,i)=>d+=(i?' L':'M')+G.X(p[0]).toFixed(1)+' '+G.Y(Math.max(G.y0-3,Math.min(G.y1+3,p[1]))).toFixed(1));
 return `<path clip-path="url(#${G.clip})" d="${d}" fill="none" stroke="${col}" stroke-width="${w}"/>`;}
/* tangent line at a */
const tangent=(G,f,a,col='#e11d48',w=2.5)=>{const m=d1(f,a),b=f(a)-m*a;return curve(G,x=>m*x+b,col,w,'');};
/* matrix html */
const mat=(M,o={})=>`<span style="display:inline-flex;align-items:center;margin:0 4px;vertical-align:middle"><span style="font-size:${18+M.length*10}px;font-weight:200;line-height:1">[</span><table style="border-collapse:collapse;margin:0 2px">${M.map(r=>`<tr>${r.map(v=>`<td style="padding:2px 8px;text-align:center;font-weight:700">${typeof v==='number'?fmtNeg(v):v}</td>`).join('')}</tr>`).join('')}</table><span style="font-size:${18+M.length*10}px;font-weight:200;line-height:1">]</span></span>`;
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,v,k)=>s+v*B[k][j],0)));
const det2=M=>M[0][0]*M[1][1]-M[0][1]*M[1][0];
const det3=M=>M[0][0]*(M[1][1]*M[2][2]-M[1][2]*M[2][1])-M[0][1]*(M[1][0]*M[2][2]-M[1][2]*M[2][0])+M[0][2]*(M[1][0]*M[2][1]-M[1][1]*M[2][0]);
/* sign chart: points sorted, signs array (length pts+1) of '+','−' */
function signChart(pts,signs,o={}){const W=o.W||520,pad=40,n=pts.length,X=i=>pad+(i+1)*(W-2*pad)/(n+1);let s=`<line x1="10" y1="40" x2="${W-10}" y2="40" stroke="#374151" stroke-width="2"/>`;
 pts.forEach((p,i)=>{s+=`<line x1="${X(i)}" y1="30" x2="${X(i)}" y2="50" stroke="#374151" stroke-width="2"/><text x="${X(i)}" y="68" text-anchor="middle" font-size="13" font-weight="800">${p}</text>`;});
 signs.forEach((g,i)=>{const xa=i===0?10:X(i-1),xb=i===n?W-10:X(i);s+=`<text x="${(xa+xb)/2}" y="30" text-anchor="middle" font-size="20" font-weight="900" fill="${g==='+'?'#15803d':'#b91c1c'}">${g}</text>`;});
 return `<svg viewBox="0 0 ${W} 76" class="fig" style="max-width:${W}px">${s}</svg>`;}
/* π formatting for multiples of π/12 */
function piStr(v){const k=Math.round(v/(PI/12));if(Math.abs(v-k*PI/12)>1e-6)return nf(v);if(!k)return '0';const g=gcd(Math.abs(k),12),n=k/g,d=12/g;return `${n<0?'−':''}${Math.abs(n)===1?'':Math.abs(n)}π${d===1?'':'/'+d}`;}
/* ticks at multiples of π/2 on x axis */
function piAxis(G,step){step=step||((G.x1-G.x0)>9?PI:PI/2);let s='';for(let x=Math.ceil(G.x0/step)*step;x<=G.x1+1e-9;x+=step){if(Math.abs(x)<1e-9)continue;s+=`<line x1="${G.X(x)}" y1="${G.Y(0)-5}" x2="${G.X(x)}" y2="${G.Y(0)+5}" stroke="#374151" stroke-width="1.5"/><text x="${G.X(x)}" y="${G.Y(0)+30}" text-anchor="middle" class="tl" font-weight="700" fill="#be123c">${piStr(x)}</text>`;}return s;}
/* readable function-string helpers */
const sgn=(k,first)=>k<0?(first?MINUS:' − '):(first?'':' + ');
const term=(k,v,first)=>{if(!k)return '';const a=Math.abs(k);return sgn(k,first)+((a===1&&v)?'':nf(a))+v;};
const poly=co=>A2.ps(co);
/* polar grid */
function polarGrid(R=4,u=38){const G=grid({x0:-R,x1:R,y0:-R,y1:R,u,lab:100,laby:100});let s='';for(let r=1;r<=R;r++)s+=`<circle cx="${G.X(0)}" cy="${G.Y(0)}" r="${r*u}" fill="none" stroke="#e5e7eb" stroke-width="1.5"/>`;
 for(let k=0;k<12;k++){const a=k*PI/6;s+=`<line x1="${G.X(0)}" y1="${G.Y(0)}" x2="${G.X(R*Math.cos(a))}" y2="${G.Y(R*Math.sin(a))}" stroke="#e5e7eb" stroke-width="1.2"/>`;}
 for(let r=1;r<=R;r++)s+=`<text x="${G.X(r)+3}" y="${G.Y(0)+14}" class="tl">${r}</text>`;
 const svg=inner=>G.svg(s+inner);return Object.assign({},G,{svg});}
/* small dynamic table */
const table=(head,rows)=>`<table class="t" style="margin:8px auto"><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(v=>`<td>${typeof v==='number'?nf(v):v}</td>`).join('')}</tr>`).join('')}</table>`;
const deg=r=>r*180/PI,rad=d=>d*PI/180;
return {PI,fx,d1,d2,simpson,pcurve,polar,arrow,region,signedArea,riemann,slopeField,solCurve,tangent,mat,mmul,det2,det3,signChart,piStr,piAxis,term,poly,polarGrid,table,deg,rad};
})();
