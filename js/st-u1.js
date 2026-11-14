/* Statistics & Probability · Unit 1 · Displaying one-variable data */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders}=A2;const S=ST;
const PRE={sym:{t:'Symmetric',d:[3,4,4,5,5,5,6,6,6,6,7,7,7,8,8,9]},right:{t:'Skewed right',d:[1,1,2,2,2,2,3,3,3,4,4,5,6,8,10,13]},left:{t:'Skewed left',d:[2,5,7,9,10,11,11,12,12,12,13,13,13,14,14,14]},bi:{t:'Bimodal',d:[2,2,3,3,3,4,4,10,10,11,11,11,12,12,13]},out:{t:'With an outlier',d:[5,6,6,7,7,7,8,8,8,9,9,10,19]}};
function shapeOf(d){const m=S.mean(d),md=S.median(d),s=S.sdp(d)||1;const k=(m-md)/s;return k>0.15?'skewed right (tail to the right; mean pulled above the median)':k<-0.15?'skewed left (tail to the left; mean pulled below the median)':'roughly symmetric (mean ≈ median)';}
/* data lab: click the number line to add a value, click a dot to remove it */
function dataLab(el,mode){let data=PRE.sym.d.slice(),bw=2;const ks=Object.keys(PRE);
 el.innerHTML=`<div class="row">${ks.map((k,i)=>`<button data-p="${k}" class="${i?'':'sel'}">${PRE[k].t}</button>`).join('')}<button data-clr="1">Clear</button></div>${mode==='hist'?'<div class="dl-s"></div>':''}<p class="mute" style="margin:4px 0">Click on the number line to add a data value; click a dot to remove it.</p><div class="dl-dot"></div><div class="dl-2"></div><div class="readout dl-r"></div>`;
 const draw=()=>{const d=data;$('.dl-dot',el).innerHTML=S.dotPlot(d,0,20,{step:2});
  if(!d.length){$('.dl-2',el).innerHTML='';$('.dl-r',el).innerHTML='No data yet — click the number line.';return;}
  const f=S.five(d);
  if(mode==='hist'){$('.dl-2',el).innerHTML=S.histogram(d,0,20,bw);$('.dl-r',el).innerHTML=`n = <b>${d.length}</b> values. Bin width <b>${bw}</b>: each bar counts the values in [a, a + ${bw}). <span class="mute">A dot plot shows every value; a histogram groups values into bins — better for large data sets, but you lose the exact values.</span>`;}
  if(mode==='box'){$('.dl-2',el).innerHTML=S.boxPlot(d,0,20,{step:2});$('.dl-r',el).innerHTML=`Five-number summary: min <b>${nf(f.min)}</b>, Q1 <b>${nf(f.q1)}</b>, median <b>${nf(f.med)}</b>, Q3 <b>${nf(f.q3)}</b>, max <b>${nf(f.max)}</b>.<br><span class="mute">Each section of the box plot (whisker, half-box, half-box, whisker) holds about 25% of the data.</span>`;}
  if(mode==='shape'){$('.dl-2',el).innerHTML=S.histogram(d,0,20,2,{extra:(A,b)=>`<line x1="${A.X(S.mean(d))}" y1="10" x2="${A.X(S.mean(d))}" y2="${b}" stroke="#e11d48" stroke-width="3"/><text x="${A.X(S.mean(d))+4}" y="14" font-size="11" fill="#e11d48" font-weight="800">mean</text><line x1="${A.X(S.median(d))}" y1="20" x2="${A.X(S.median(d))}" y2="${b}" stroke="#059669" stroke-width="3" stroke-dasharray="5 4"/><text x="${A.X(S.median(d))+4}" y="30" font-size="11" fill="#059669" font-weight="800">median</text>`});
   $('.dl-r',el).innerHTML=`Shape: <b>${shapeOf(d)}</b>. Mean ${nf(S.mean(d))}, median ${nf(S.median(d))}.<br><span class="mute">Describe a distribution with SOCS: <b>S</b>hape, <b>O</b>utliers, <b>C</b>enter, <b>S</b>pread.</span>`;}};
 if(mode==='hist')sliders($('.dl-s',el),[{k:'bw',l:'bin width',min:1,max:5,v:2}],V=>{bw=V.bw;draw();});
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(b){if(b.dataset.p){data=PRE[b.dataset.p].d.slice();$$('[data-p]',el).forEach(x=>x.classList.toggle('sel',x===b));}if(b.dataset.clr){data=[];$$('[data-p]',el).forEach(x=>x.classList.remove('sel'));}draw();return;}
  const c=e.target.closest('circle[data-i]');if(c&&$('.dl-dot',el).contains(c)){data.splice(+c.dataset.i,1);draw();return;}
  const sv=e.target.closest('.dl-dot svg');if(sv){const r=sv.getBoundingClientRect(),vb=sv.viewBox.baseVal,x=(e.clientX-r.left)/r.width*vb.width;const v=Math.round((x-28)/(vb.width-56)*20);if(v>=0&&v<=20){data.push(v);draw();}}});
 draw();}
const hist=el=>dataLab(el,'hist'),box=el=>dataLab(el,'box'),shp=el=>dataLab(el,'shape');
const randData=(n,a,b)=>Array.from({length:n},()=>rand(a,b));

L['ST-1-1']={goal:'I can make and read dot plots and histograms.',
 life:{title:'How long do classmates sleep?',html:'Ask 30 classmates how many hours they slept. A list of 30 numbers is hard to read. A <b>dot plot</b> puts one dot per answer on a number line; a <b>histogram</b> groups answers into bins. Both turn a messy list into a picture you can read at a glance.'},
 see:[{title:'Build your own data',hint:'Add or remove dots. Change the bin width of the histogram.',mount:hist}],
 vocab:[['Dot plot','One dot per data value above a number line.'],['Histogram','Bars that count how many values fall in each equal-width bin.'],['Frequency','How many values are in a category or bin.'],['Bin width','The size of each interval in a histogram.']],
 examples:[ex('Example 1','Ages: 12, 13, 13, 14, 14, 14, 15, 17. Make a histogram with bins 12–14, 14–16, 16–18.',[['[12, 14): 12, 13, 13 → 3','Left end included, right end not.'],['[14, 16): 14, 14, 14, 15 → 4',''],['[16, 18): 17 → 1','']]),
  ex('Example 2','A histogram has bars 2, 5, 8, 3. How many values?',[['2 + 5 + 8 + 3 = 18','Add the frequencies.']])],
 mistake:{bad:'Bars of a histogram can have gaps between categories like a bar chart',good:'bins touch; gaps mean a bin has 0 values',why:'Histograms show a <b>number line</b> of quantitative data; bar charts compare separate categories.'},
 practice(){const d=randData(rand(10,16),0,19);const a=pick([0,5,10]),b=a+5;const n=d.filter(v=>v>=a&&v<b).length;return num(`Data: <b>${S.sorted(d).join(', ')}</b>. How many values fall in the bin [${a}, ${b})?`,[['frequency =',n]],`Count values with ${a} ≤ x < ${b}.`,[[`${S.sorted(d).filter(v=>v>=a&&v<b).join(', ')||'none'}`,'Values in the bin.'],[`${n}`,'Count.']]);},
 check:[q('A histogram is best for…',['categorical data','quantitative data','a single number','names'],1,''),q('Bars 4, 6, 10 → total values?',['10','20','3','16'],1,''),q('A dot plot shows…',['only the mean','every data value','percentages only','categories'],1,'')]};

L['ST-1-2']={goal:'I can find the five-number summary and draw a box plot.',
 life:{title:'Comparing two classes fast',html:'Two classes took the same test. A <b>box plot</b> shrinks each class to five numbers — min, Q1, median, Q3, max — so you can compare them side by side in seconds.'},
 see:[{title:'Box plot builder',hint:'Change the data. Watch the five numbers move.',mount:box}],
 vocab:[['Five-number summary','Minimum, Q1, median, Q3, maximum.'],['Median','Middle value of the ordered data.'],['Q1 / Q3','Medians of the lower half / upper half.'],['Box plot','Box from Q1 to Q3 with a line at the median; whiskers to min and max.']],
 examples:[ex('Example','Data: 2, 4, 5, 7, 8, 9, 11, 12',[['median = (7 + 8)/2 = 7.5','Even count: average the middle two.'],['lower half 2, 4, 5, 7 → Q1 = 4.5','Median of the lower half.'],['upper half 8, 9, 11, 12 → Q3 = 10','Median of the upper half.'],['min 2, max 12','Five numbers: 2, 4.5, 7.5, 10, 12.']])],
 mistake:{bad:'Q1 is the 25th value',good:'Q1 is the median of the lower half',why:'Quartiles split the <b>ordered</b> data into four equal-count parts.'},
 practice(){const n=pick([7,8,9,10,11]),d=S.sorted(randData(n,1,30));const f=S.five(d);return num(`Data: <b>${d.join(', ')}</b>. Find Q1, the median, and Q3.`,[['Q1 =',f.q1,0.01],['median =',f.med,0.01],['Q3 =',f.q3,0.01]],n%2?'Odd count: leave the median out of both halves.':'Even count: split into two equal halves.',[[`median ${nf(f.med)}`,'Middle.'],[`Q1 ${nf(f.q1)}, Q3 ${nf(f.q3)}`,'Medians of the halves.']]);},
 check:[q('What % of data is between Q1 and Q3?',['25%','50%','75%','100%'],1,''),q('Median of 3, 8, 1, 9, 5?',['1','5','8','9'],1,'Order first: 1, 3, 5, 8, 9.'),q('The line inside the box marks…',['the mean','the median','Q1','the mode'],1,'')]};

L['ST-1-3']={goal:'I can describe a distribution by its shape, outliers, center, and spread.',
 life:{title:'Reading income data',html:'Household incomes are <b>skewed right</b>: most families earn moderate amounts, and a few earn a lot. That long right tail pulls the mean up — which is why news reports usually quote the <b>median</b> income.'},
 see:[{title:'Shape and center',hint:'Try each preset shape. Watch where the mean and median land.',mount:shp}],
 vocab:[['Symmetric','Left and right sides are mirror images.'],['Skewed right','Long tail to the right (toward larger values).'],['Skewed left','Long tail to the left.'],['Bimodal','Two clear peaks.']],
 examples:[ex('Example 1','Most scores 80–95, a few 30–50. Shape?',[['tail toward low values → skewed left','Name the skew by the tail.']]),
  ex('Example 2','Mean 42, median 35. Likely shape?',[['mean > median → skewed right','The tail pulls the mean.']])],
 mistake:{bad:'Skewed right means most values are on the right',good:'the tail is on the right',why:'Skew is named for the <b>tail</b>, not the peak. Skewed-right data piles up on the left.'},
 practice(){const k=pick(['sym','right','left','bi']);const ans={sym:'roughly symmetric',right:'skewed right',left:'skewed left',bi:'bimodal'}[k];return mc(`Data: <b>${PRE[k].d.join(', ')}</b>. Which best describes the shape?`,ans,['roughly symmetric','skewed right','skewed left','bimodal'],'Picture the dot plot. Where is the long tail? Are there two peaks?');},
 check:[q('Mean much bigger than median suggests…',['skewed left','skewed right','symmetric','no data'],1,''),q('A long tail toward small values is…',['skewed left','skewed right','bimodal','uniform'],0,''),q('SOCS stands for shape, outliers, center, and…',['size','spread','slope','sample'],1,'')]};

TOOLS['ST-1']={title:'Data lab',hint:'Click to add data. See the dot plot and box plot together.',mount:box};
})();
