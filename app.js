const K="calendarV1";
const HOLIDAYS={
"2026-01-01":"元日","2026-01-12":"成人の日","2026-02-11":"建国記念の日","2026-02-23":"天皇誕生日",
"2026-03-20":"春分の日","2026-04-29":"昭和の日","2026-05-03":"憲法記念日","2026-05-04":"みどりの日",
"2026-05-05":"こどもの日","2026-05-06":"休日","2026-07-20":"海の日","2026-08-11":"山の日",
"2026-09-21":"敬老の日","2026-09-22":"休日","2026-09-23":"秋分の日","2026-10-12":"スポーツの日",
"2026-11-03":"文化の日","2026-11-23":"勤労感謝の日",
"2027-01-01":"元日","2027-01-11":"成人の日","2027-02-11":"建国記念の日","2027-02-23":"天皇誕生日",
"2027-03-21":"春分の日","2027-03-22":"休日","2027-04-29":"昭和の日","2027-05-03":"憲法記念日",
"2027-05-04":"みどりの日","2027-05-05":"こどもの日","2027-07-19":"海の日","2027-08-11":"山の日",
"2027-09-20":"敬老の日","2027-09-23":"秋分の日","2027-10-11":"スポーツの日","2027-11-03":"文化の日",
"2027-11-23":"勤労感謝の日"
};
let E=JSON.parse(localStorage.getItem(K)||"{}"),V=new Date(),S="",P="";V.setDate(1);const $=s=>document.querySelector(s),key=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`,col=t=>t==="holiday"?"blue":t==="private"?"red":"purple";function persist(){localStorage.setItem(K,JSON.stringify(E))}function render(){
 let y=V.getFullYear(),m=V.getMonth();
 $("#title").textContent=`${y}年${m+1}月`;
 let c=$("#cal");c.innerHTML="";
 let a=new Date(y,m,1),st=new Date(y,m,1-a.getDay());
 for(let i=0;i<42;i++){
  let d=new Date(st);d.setDate(st.getDate()+i);
  let k=key(d),hn=HOLIDAYS[k]||"";
  let x=document.createElement("div");
  x.className=`day ${d.getMonth()!=m?"out":""} ${d.getDay()==0?"sun":d.getDay()==6?"sat":""} ${hn?"holiday-date":""}`;
  x.innerHTML=`<div class="datehead"><span class="n">${d.getDate()}</span></div>`;
  (E[k]||[]).forEach(e=>{let z=document.createElement("div");z.className=`ev ${col(e.t)}`;z.textContent=e.x;x.appendChild(z)});
  x.onclick=()=>open(k,d);c.appendChild(x)
 }
}
function open(k,d){S=k;$("#date").textContent=`${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;$("#input").classList.add("hide");$("#back").classList.remove("hide");items()}function add(t,x){
 (E[S]??=[]).push({id:Date.now()+Math.random(),t,x});
 persist();
 render();
 items();
 $("#input").classList.add("hide");
 $("#back").classList.add("hide");
}function items(){let b=$("#items");b.innerHTML="";(E[S]||[]).forEach(e=>{let r=document.createElement("div");r.className="row";r.innerHTML=`<div class="ev ${col(e.t)}">${e.x}</div><button class="del">削除</button>`;r.querySelector("button").onclick=()=>{E[S]=E[S].filter(q=>q.id!==e.id);if(!E[S].length)delete E[S];persist();render();items()};b.appendChild(r)})}document.querySelectorAll(".quick button").forEach(b=>b.onclick=()=>{let t=b.dataset.t;if(t==="off")return add(t,"ー");if(t==="holiday")return add(t,"休み");P=t;$("#txt").value="";$("#txt").placeholder=t==="work"?"仕事（数字・漢字）":"私用の予定";$("#input").classList.remove("hide");$("#txt").focus()});$("#save").onclick=()=>{let x=$("#txt").value.trim();if(x){add(P,x);$("#input").classList.add("hide")}};$("#close").onclick=()=>$("#back").classList.add("hide");$("#prev").onclick=()=>{V.setMonth(V.getMonth()-1);render()};$("#next").onclick=()=>{V.setMonth(V.getMonth()+1);render()};

let swipeStartX=0,swipeStartY=0;
const cal=$("#cal");
cal.addEventListener("touchstart",e=>{
 const t=e.changedTouches[0];
 swipeStartX=t.clientX;
 swipeStartY=t.clientY;
},{passive:true});
cal.addEventListener("touchend",e=>{
 const t=e.changedTouches[0];
 const dx=t.clientX-swipeStartX;
 const dy=t.clientY-swipeStartY;
 if(Math.abs(dx)>=60 && Math.abs(dx)>Math.abs(dy)*1.3){
   V.setMonth(V.getMonth()+(dx<0?1:-1));
   render();
 }
},{passive:true});$("#today").onclick=()=>{V=new Date();V.setDate(1);render()};render();