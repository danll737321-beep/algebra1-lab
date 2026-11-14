/* Statistics & Probability · Unit 2 · Center and spread */
(function(){const {ex,q,mc,num,nz,TOOLS,nf,sliders}=A2;const S=ST;
const BASE=[6,7,7,8,8,8,9,9,10];
const marks=(d)=>(A,b)=>{const m=S.mean(d),md=S.median(d);return `<line x1="${A.X(m)}" y1="22" x2="${A.X(m)}" y2="${b}" stroke="#e11d48" stroke-width="3"/><text x="${A.X(m)}" y="14" text-anchor="middle" font-size="11" fill="#e11d48" font-weight="800">mean ${nf(m)}</text><line x1="${A.X(md)}" y1="38" x2="${A.X(md)}" y2="${b}" stroke="#059669" stroke-width="3" stroke-dasharray="5 4"/><text x="${A.X(md)}" y="32" text-anchor="middle" font-size="11" fill="#059669" font-weight="800">median ${nf(md)}</text>`;};
function mMeanMed(el){sliders(el,[{k:'v',l:'move the last value',min:0,max:40,v:10}],V=>{const d=[...BASE,V.v];
 $('.mm-g',el).innerHTML=S.dotPlot(d,0,40,{H:200,step:5,hl:(v,i)=>i===d.length-1?'#f59e0b':null,extra:marks(d)});
 $('.mm-r',el).innerHTML=`Data: ${d.join(', ')} → mean = ${S.sum(d)}/${d.length} = <b>${nf(S.mean(d))}</b>, median = <b>${nf(S.median(d))}</b>.<br><span class="mute">Drag the orange value far away: the mean chases it, the median barely moves. The median is <b>resistant</b> to outliers; the mean is not.</span>`;},`<div class="mm-g"></div><div class="readout mm-r"></div>`).run();}
function mIQR(el){sliders(el,[{k:'v',l:'last value',min:0,max:40,v:24}],V=>{const d=[...BASE,11,12,V.v];const f=S.five(d),iqr=f.q3-f.q1,lo=f.q1-1.5*iqr,hi=f.q3+1.5*iqr;
 $('.iq-g',el).innerHTML=S.dotPlot(d,0,40,{step:5,hl:(v,i)=>(v<lo||v>hi)?'#e11d48':null,extra:(A,b)=>`<line x1="${A.X(Math.max(0,lo))}" y1="10" x2="${A.X(Math.max(0,lo))}" y2="${b}" stroke="#94a3b8" stroke-dasharray="4 4"/><line x1="${A.X(Math.min(40,hi))}" y1="10" x2="${A.X(Math.min(40,hi))}" y2="${b}" stroke="#94a3b8" stroke-dasharray="4 4"/><text x="${A.X(Math.min(40,hi))+4}" y="20" font-size="11" fill="#64748b">fence ${nf(hi)}</text>`})+S.boxPlot(d,0,40,{step:5,fences:true,labels:false});
 $('.iq-r',el).innerHTML=`Q1 = ${nf(f.q1)}, Q3 = ${nf(f.q3)} → IQR = <b>${nf(iqr)}</b>. Fences: Q1 − 1.5·IQR = ${nf(lo)} and Q3 + 1.5·IQR = <b>${nf(hi)}</b>.<br>${V.v>hi||V.v<lo?`<span class="bad">${V.v} is beyond a fence → outlier (✱ on the box plot).</span>`:`<span class="good">${V.v} is inside the fences → not an outlier.</span>`} <span class="mute">The IQR is the spread of the middle 50%.</span>`;},`<div class="iq-g"></div><div class="readout iq-r"></div>`).run();}
function mSD(el){sliders(el,[{k:'s',l:'spread',min:0,max:3,step:.25,v:1}],V=>{const raw=[-4,-2,-1,0,0,1,2,4];const d=raw.map(x=>+(10+x*V.s).toFixed(2));const m=S.mean(d),sd=S.sdp(d);
 const A=S.axis(0,20,{base:220,step:2});let s=A.ticks+`<line x1="${A.X(m)}" y1="10" x2="${A.X(m)}" y2="220" stroke="#e11d48" stroke-width="2"/>`;d.forEach((v,i)=>{const y=20+i*24;s+=`<line x1="${A.X(m)}" y1="${y}" x2="${A.X(v)}" y2="${y}" stroke="#f59e0b" stroke-width="4"/><circle cx="${A.X(v)}" cy="${y}" r="6" fill="#2563eb"/><text x="${A.X(v)+(v>=m?10:-10)}" y="${y+4}" font-size="11" text-anchor="${v>=m?'start':'end'}">${nf(v-m)}</text>`;});
 $('.sd-g',el).innerHTML=S.svg(A.W,245,s);
 $('.sd-r',el).innerHTML=`Deviations (orange) from the mean ${nf(m)}: square them, average, take the square root.<div class="eqline math">σ = √(Σ(x − x̄)² / n) = √(${nf(S.sum(d.map(x=>(x-m)**2)))} / ${d.length}) = <b>${nf(sd)}</b></div><span class="mute">σ ≈ the typical distance from the mean. Same mean, more spread → bigger σ. (Sample standard deviation s divides by n − 1 instead: ${nf(S.sds(d)||0)}.)</span>`;},`<div class="sd-g"></div><div class="readout sd-r"></div>`).run();}
function mTrans(el){sliders(el,[{k:'a',l:'add c to every value',min:-10,max:10,v:0},{k:'k',l:'multiply every value by k',min:0.5,max:3,step:.5,v:1}],V=>{const d=[4,6,7,7,8,9,12];const t=d.map(x=>x*V.k+V.a);const f0=S.five(d),f1=S.five(t);
 const row=(n,a,b)=>`<tr><th>${n}</th><td>${nf(a)}</td><td><b>${nf(b)}</b></td></tr>`;
 $('.tr-g',el).innerHTML=`<table class="t" style="margin:8px auto"><tr><th></th><th>original</th><th>new (×${nf(V.k)}, +${nf(V.a)})</th></tr>${row('mean',S.mean(d),S.mean(t))}${row('median',f0.med,f1.med)}${row('IQR',f0.q3-f0.q1,f1.q3-f1.q1)}${row('σ',S.sdp(d),S.sdp(t))}${row('range',f0.max-f0.min,f1.max-f1.min)}</table>`;
 $('.tr-r',el).innerHTML=`<b>Adding</b> c shifts the center (mean, median) by c but leaves spread (IQR, σ, range) <b>unchanged</b>. <b>Multiplying</b> by k scales both center and spread by k.<br><span class="mute">Choosing: symmetric data with no outliers → mean & σ. Skewed data or outliers → median & IQR.</span>`;},`<div class="tr-g"></div><div class="readout tr-r"></div>`).run();}
const rd=(n,a,b)=>Array.from({length:n},()=>rand(a,b));

L['ST-2-1']={goal:'I can find the mean and median and explain which one an outlier affects.',
 life:{title:'The billionaire walks in',html:'Ten people in a café earn about $50,000 each. A billionaire walks in. The <b>mean</b> income jumps to about $90 million; the <b>median</b> stays near $50,000. Which number better describes a “typical” person there?'},
 see:[{title:'Mean vs. median',hint:'Drag the last value far to the right.',mount:mMeanMed}],
 vocab:[['Mean x̄','Sum of the values ÷ how many there are.'],['Median','Middle value of the ordered data.'],['Resistant','Not strongly affected by extreme values (the median is resistant).']],
 examples:[ex('Example','Data: 3, 5, 5, 6, 21',[['mean = 40/5 = 8','Sum ÷ count.'],['median = 5','Middle of the ordered list.'],['21 pulls the mean up; median is the better “typical” value','Outlier effect.']])],
 mistake:{bad:'Median of 9, 2, 7 is 2',good:'7',why:'Put the values in order first: 2, 7, 9.'},
 practice(){const d=rd(rand(5,9),1,40);return num(`Data: <b>${d.join(', ')}</b>. Find the mean and the median.`,[['mean =',+S.mean(d).toFixed(4),0.011],['median =',S.median(d),0.01]],'Mean: sum ÷ count. Median: order, then the middle.',[[`sum ${S.sum(d)} ÷ ${d.length} = ${nf(S.mean(d))}`,'Mean.'],[`ordered: ${S.sorted(d).join(', ')} → ${nf(S.median(d))}`,'Median.']]);},
 check:[q('Mean of 2, 4, 9?',['4','5','15','9'],1,''),q('Which is resistant to outliers?',['mean','median','range','sum'],1,''),q('Median of 1, 3, 8, 10?',['3','5.5','8','4'],1,'(3 + 8)/2.')]};

L['ST-2-2']={goal:'I can find the IQR and use the 1.5·IQR rule to identify outliers.',
 life:{title:'Is that score suspicious?',html:'Most players score 6–12 points a game, then one game shows 24. Real outlier or normal variation? The <b>1.5·IQR rule</b> gives a consistent cutoff instead of a guess.'},
 see:[{title:'Fences and outliers',hint:'Move the last value. When does it cross the fence?',mount:mIQR}],
 vocab:[['IQR','Q3 − Q1: spread of the middle 50%.'],['Range','Max − min (not resistant).'],['Outlier rule','Below Q1 − 1.5·IQR or above Q3 + 1.5·IQR.']],
 examples:[ex('Example','Q1 = 8, Q3 = 12. Is 20 an outlier?',[['IQR = 4; 1.5·IQR = 6','Step.'],['fences 2 and 18','Q1 − 6, Q3 + 6.'],['20 > 18 → outlier','']])],
 mistake:{bad:'Fence = Q3 + IQR',good:'Q3 + 1.5·IQR',why:'The rule uses one and a half times the IQR.'},
 practice(){const q1=rand(5,30),iqr=rand(2,12),q3=q1+iqr,hi=q3+1.5*iqr,lo=q1-1.5*iqr;const v=pick([Math.round(hi+rand(1,8)),Math.round(hi-rand(1,3)),Math.round(lo-rand(1,5))]);
  if(Math.random()<.5)return num(`Q1 = ${q1}, Q3 = ${q3}. Find the IQR and the upper fence Q3 + 1.5·IQR.`,[['IQR =',iqr],['upper fence =',hi,0.01]],'IQR = Q3 − Q1.',[[`IQR = ${iqr}`,''],[`${q3} + 1.5(${iqr}) = ${nf(hi)}`,'']]);
  return mc(`Q1 = ${q1}, Q3 = ${q3}. Is <b>${v}</b> an outlier?`,v>hi||v<lo?'yes':'no',['yes','no'],`Fences: ${nf(lo)} and ${nf(hi)}.`);},
 check:[q('IQR measures the spread of…',['all data','middle 50%','top 25%','the outliers'],1,''),q('Q1 = 10, Q3 = 16. Upper fence?',['22','25','19','26'],1,'16 + 9.'),q('Which is NOT resistant?',['median','IQR','range','Q1'],2,'')]};

L['ST-2-3']={goal:'I can explain and compute standard deviation as a typical distance from the mean.',
 life:{title:'Two coffee machines',html:'Two machines both pour 10 oz on average. One is always within 0.1 oz; the other swings between 8 and 12. Same mean, very different reliability. <b>Standard deviation</b> measures that difference.'},
 see:[{title:'Deviations from the mean',hint:'Change the spread. Watch σ grow and shrink.',mount:mSD}],
 vocab:[['Deviation','x − x̄: how far a value is from the mean.'],['Standard deviation σ','√(average squared deviation): typical distance from the mean.'],['Variance','σ², the average squared deviation.']],
 examples:[ex('Example','Data: 2, 4, 6',[['mean 4; deviations −2, 0, 2','Step 1.'],['squares 4, 0, 4 → average 8/3','Step 2.'],['σ = √(8/3) ≈ 1.63','Step 3.']])],
 mistake:{bad:'Average the deviations: (−2 + 0 + 2)/3 = 0',good:'square them first',why:'Deviations always add to 0. Squaring makes every distance count.'},
 practice(){const m=rand(4,12),k=pick([1,2,3]);const dev=pick([[-1,1],[-2,0,2],[-1,-1,1,1],[-3,-1,1,3],[-2,-2,2,2]]);const d=dev.map(x=>m+x*k);const s=S.sdp(d);return num(`Find the (population) standard deviation σ of <b>${d.join(', ')}</b> (nearest hundredth).`,[['σ ≈',+s.toFixed(2),0.011]],'Mean, deviations, square, average, square root.',[[`mean ${m}; deviations ${d.map(x=>fmtNeg(x-m)).join(', ')}`,'Step 1.'],[`σ = √(${nf(S.sum(d.map(x=>(x-m)**2)))}/${d.length}) ≈ ${s.toFixed(2)}`,'Steps 2–3.']]);},
 check:[q('σ = 0 means…',['data is all 0','all values are equal','no mean','an error'],1,''),q('Which set has the larger σ? A: 9, 10, 11  B: 1, 10, 19',['A','B','equal','cannot tell'],1,''),q('σ is measured in…',['squared units','the same units as the data','percent','no units'],1,'')]};

L['ST-2-4']={goal:'I can choose appropriate measures of center and spread and predict how transformations change them.',
 life:{title:'Converting temperatures',html:'Convert a week of temperatures from °C to °F with F = 1.8C + 32. The mean converts the same way — but the standard deviation only gets multiplied by 1.8. Adding 32 moves the data; it doesn’t spread it.'},
 see:[{title:'Transforming data',hint:'Add a constant, then multiply. Which measures change?',mount:mTrans}],
 vocab:[['Shift (add c)','Center + c; spread unchanged.'],['Scale (multiply k)','Center × k; spread × k.'],['Choosing measures','Symmetric → mean & σ; skewed/outliers → median & IQR.']],
 examples:[ex('Example','Mean 20 min, σ = 4 min. Convert to seconds.',[['× 60: mean 1200 s, σ = 240 s','Both scale.']]),
  ex('Example 2','Every score + 5 bonus points. Mean 70, IQR 12.',[['mean 75, IQR 12','Adding doesn’t change spread.']])],
 mistake:{bad:'Adding 5 to every value adds 5 to σ',good:'σ stays the same',why:'Every value moves together; the distances from the mean don’t change.'},
 practice(){const m=rand(10,60),s=rand(2,10),c=rand(-10,20),k=pick([1,2,3,0.5]);return num(`A data set has mean ${m} and σ = ${s}. Each value is multiplied by ${nf(k)}, then ${c<0?'decreased':'increased'} by ${Math.abs(c)}. New mean and new σ?`,[['mean =',m*k+c,0.01],['σ =',s*k,0.01]],'Multiply affects both; adding affects only the center.',[[`mean ${m}·${nf(k)} ${c<0?'−':'+'} ${Math.abs(c)} = ${nf(m*k+c)}`,'Center.'],[`σ ${s}·${nf(k)} = ${nf(s*k)}`,'Spread.']]);},
 check:[q('Best center for skewed data?',['mean','median','range','σ'],1,''),q('Each value ×2 → IQR…',['same','doubles','+2','halves'],1,''),q('Each value −3 → σ…',['−3','same','×3','0'],1,'')]};

TOOLS['ST-2']={title:'Mean vs. median',hint:'Drag one value far away and watch which center moves.',mount:mMeanMed};
})();
