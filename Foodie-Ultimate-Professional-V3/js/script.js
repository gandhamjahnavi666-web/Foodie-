
const R=[
{id:1,n:"Spice Route",c:"South Indian • Biryani",r:4.7,t:"24–29 min",offer:"20% OFF",img:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80"},
{id:2,n:"Urban Tadka",c:"North Indian • Chinese",r:4.5,t:"28–34 min",offer:"15% OFF",img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"},
{id:3,n:"Coastal Bowl",c:"Andhra • Seafood",r:4.8,t:"20–26 min",offer:"10% OFF",img:"https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=80"},
{id:4,n:"Green Leaf",c:"Healthy • Salads",r:4.4,t:"22–28 min",offer:"FREE DELIVERY",img:"https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80"},
{id:5,n:"Burger Yard",c:"Burgers • Fast Food",r:4.6,t:"18–24 min",offer:"25% OFF",img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"},
{id:6,n:"Sweet & Sip",c:"Desserts • Beverages",r:4.3,t:"15–20 min",offer:"BUY 1 GET 1",img:"https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80"},
{id:7,n:"Dosa District",c:"South Indian • Tiffins",r:4.6,t:"16–22 min",offer:"₹75 OFF",img:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80"},
{id:8,n:"Pizza Planet",c:"Pizza • Italian",r:4.7,t:"25–31 min",offer:"30% OFF",img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80"},
{id:9,n:"Wok & Roll",c:"Asian • Noodles",r:4.5,t:"21–27 min",offer:"20% OFF",img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80"}
];
const M=[
[101,1,"Chicken Biryani",220,"Aromatic basmati rice, tender chicken and signature spices.","https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=500&q=80"],
[102,1,"Paneer Biryani",190,"Fragrant rice with soft paneer and Indian spices.","https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=500&q=80"],
[103,1,"Chicken 65",170,"Crispy spicy chicken bites.","https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"],
[104,1,"Butter Naan",45,"Soft tandoori naan finished with butter.","https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80"],
[201,2,"Paneer Butter Masala",180,"Creamy tomato gravy with soft paneer.","https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80"],
[202,2,"Veg Hakka Noodles",150,"Wok-tossed noodles with fresh vegetables.","https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80"],
[301,3,"Andhra Chicken Curry",210,"Traditional spicy Andhra-style chicken curry.","https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80"],
[302,3,"Prawn Fry",260,"Crispy prawns with coastal spices.","https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=500&q=80"],
[401,4,"Garden Salad Bowl",150,"Fresh greens, vegetables and house dressing.","https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80"],
[501,5,"Classic Cheese Burger",160,"Juicy patty, cheese, lettuce and house sauce.","https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"],
[502,5,"Loaded Fries",120,"Crispy fries with cheese and seasoning.","https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80"],
[601,6,"Gulab Jamun",90,"Soft warm milk dumplings in sugar syrup.","https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80"],
[701,7,"Masala Dosa",110,"Crispy dosa with potato masala and chutney.","https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80"],
[801,8,"Margherita Pizza",230,"Classic tomato, mozzarella and basil.","https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80"],
[901,9,"Veg Noodles",160,"Wok-tossed noodles with fresh vegetables.","https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80"]
].map(x=>({id:x[0],rid:x[1],name:x[2],price:x[3],desc:x[4],img:x[5]}));
const K={cart:"fd_cart",user:"fd_user",orders:"fd_orders"};
const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const cart=()=>get(K.cart,[]);
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
function saveCart(c){set(K.cart,c);count()}
function count(){document.querySelectorAll(".cartcount").forEach(e=>e.textContent=cart().reduce((a,x)=>a+x.qty,0))}
function toast(s){let e=document.getElementById("toast");if(!e){e=document.createElement("div");e.id="toast";e.className="toast";document.body.appendChild(e)}e.textContent=s;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2300)}
function add(id){let x=M.find(i=>i.id==id),c=cart(),f=c.find(i=>i.id==id);f?f.qty++:c.push({...x,qty:1});saveCart(c);toast(x.name+" added")}
function qty(id,d){let c=cart(),x=c.find(i=>i.id==id);if(x)x.qty+=d;saveCart(c.filter(i=>i.qty>0));renderCart();renderMini()}
function totals(){let sub=cart().reduce((a,x)=>a+x.price*x.qty,0),del=sub?sub>=499?0:40:0,disc=sub>=500?50:0,platform=sub?5:0,tax=Math.round((sub+platform)*.05);return{sub,del,disc,platform,tax,total:sub+del+platform+tax-disc}}
function sum(){let t=totals();return `<div class="sumrow"><span>Subtotal</span><b>${money(t.sub)}</b></div><div class="sumrow"><span>Delivery</span><b>${t.del?money(t.del):"FREE"}</b></div><div class="sumrow"><span>Platform fee</span><b>${money(t.platform)}</b></div><div class="sumrow"><span>Taxes</span><b>${money(t.tax)}</b></div><div class="sumrow"><span>Discount</span><b>−${money(t.disc)}</b></div><div class="sumrow total"><span>Total</span><b>${money(t.total)}</b></div>`}
function line(x){return `<div class="cartline"><div class="row"><div><b>${x.name}</b><div class="muted">${money(x.price)} each</div><div class="qty"><button onclick="qty(${x.id},-1)">−</button><span>${x.qty}</span><button onclick="qty(${x.id},1)">+</button></div></div><b>${money(x.price*x.qty)}</b></div></div>`}
function card(r){return `<article class="rest"><a href="restaurant-details.html?id=${r.id}"><div class="restimg" style="background-image:url('${r.img}')"><span class="badge">${r.offer}</span></div><div class="restbody"><h3>${r.n}</h3><div class="meta">${r.c}</div><div class="row" style="margin-top:13px"><span class="rating">★ ${r.r}</span><span class="meta">${r.t}</span></div></div></a></article>`}
function home(){let g=document.getElementById("restGrid");if(g)g.innerHTML=R.slice(0,6).map(card).join("");let c=document.getElementById("cats");if(c){let a=[["🍛","Biryani"],["🍕","Pizza"],["🍔","Burgers"],["🥘","South Indian"],["🥗","Healthy"],["🍜","Chinese"],["🍰","Desserts"],["🥤","Drinks"]];c.innerHTML=a.map(x=>`<a class="cat" href="restaurants.html?search=${x[1]}"><div class="emoji">${x[0]}</div><b>${x[1]}</b></a>`).join("")}}
function list(){let q=new URLSearchParams(location.search).get("search")||"",inp=document.getElementById("search");if(inp)inp.value=q;function run(){let s=(inp?.value||"").toLowerCase();let a=R.filter(x=>(x.n+" "+x.c).toLowerCase().includes(s));let sort=document.getElementById("sort")?.value;if(sort==="rating")a.sort((x,y)=>y.r-x.r);if(sort==="fast")a.sort((x,y)=>parseInt(x.t)-parseInt(y.t));document.getElementById("restGrid").innerHTML=a.map(card).join("")||`<div class="panel"><h2>No restaurants found</h2><p class="muted">Try another search.</p></div>`}inp?.addEventListener("input",run);document.getElementById("sort")?.addEventListener("change",run);run()}
function details(){let id=Number(new URLSearchParams(location.search).get("id")||1),r=R.find(x=>x.id===id)||R[0];document.getElementById("rname").textContent=r.n;document.getElementById("rmeta").textContent=`${r.c} • ${r.r}★ • ${r.t}`;document.getElementById("menu").innerHTML=M.filter(x=>x.rid===r.id).map(x=>`<div class="menuItem"><div><b>${x.name}</b><div class="price">${money(x.price)}</div><div class="desc">${x.desc}</div><button class="add" onclick="add(${x.id})">＋ Add</button></div><img src="${x.img}" alt="${x.name}"></div>`).join("");renderMini()}
function renderMini(){let e=document.getElementById("mini");if(!e)return;e.innerHTML=cart().length?`<h2>Your cart</h2>${cart().map(line).join("")}${sum()}<a class="btn primary" style="width:100%;margin-top:12px" href="cart.html">View cart</a>`:`<h2>Your cart</h2><p class="muted">Add something delicious.</p>`}
function renderCart(){let e=document.getElementById("items"),s=document.getElementById("summary");if(!e)return;if(!cart().length){e.innerHTML=`<div class="panel" style="text-align:center;padding:50px"><h2>Your cart is empty 🛒</h2><p class="muted">Explore restaurants and add your favourites.</p><a class="btn primary" href="restaurants.html">Browse food</a></div>`;s.innerHTML="";return}e.innerHTML=cart().map(line).join("");s.innerHTML=sum()+`<a class="btn primary" style="width:100%;margin-top:12px" href="checkout.html">Proceed to checkout</a>`}
function auth(){return get(K.user,null)}
function requireAuth(){if(!auth())location.href="login.html?next="+encodeURIComponent(location.pathname+location.search)}
function login(){let e=document.getElementById("email").value.trim(),p=document.getElementById("pass").value,m=document.getElementById("msg");if(!e.includes("@")||p.length<6){m.textContent="Enter a valid email and password (6+ characters).";return}set(K.user,{name:e.split("@")[0],email:e});toast("Welcome to Foodie!");setTimeout(()=>location.href=new URLSearchParams(location.search).get("next")||"index.html",500)}
function signup(){let n=document.getElementById("name").value.trim(),e=document.getElementById("email").value.trim(),p=document.getElementById("pass").value,m=document.getElementById("msg");if(n.length<2||!e.includes("@")||p.length<6){m.textContent="Please enter valid details. Password needs 6+ characters.";return}set(K.user,{name:n,email:e});toast("Account created!");setTimeout(()=>location.href="index.html",500)}
function logout(){localStorage.removeItem(K.user);location.href="index.html"}
function checkout(){requireAuth();if(!cart().length)return location.href="cart.html";let name=document.getElementById("dname").value.trim(),address=document.getElementById("address").value.trim(),phone=document.getElementById("phone").value.trim(),m=document.getElementById("msg");if(!name||address.length<8||phone.replace(/\D/g,"").length<10){m.textContent="Please enter valid delivery details.";return}let t=totals(),id="FD"+Math.floor(10000000+Math.random()*89999999),o={id,date:new Date().toLocaleString("en-IN"),items:cart(),total:t.total,status:"Preparing",address,name,phone};let os=get(K.orders,[]);os.unshift(o);set(K.orders,os);set("fd_last",o);localStorage.removeItem(K.cart);location.href="order-confirmation.html?id="+id}
function orders(){requireAuth();let e=document.getElementById("orders"),a=get(K.orders,[]);e.innerHTML=a.length?a.map(o=>`<div class="order"><div class="row"><div><b>Order #${o.id}</b><div class="muted">${o.date}</div></div><span class="status">● ${o.status}</span></div><p class="muted">${o.items.map(i=>i.qty+" × "+i.name).join(" • ")}</p><div class="row"><b>${money(o.total)}</b><div><a class="btn light" href="order-tracking.html?id=${o.id}">Track live</a> <button class="btn primary" onclick="reorder('${o.id}')">Reorder</button></div></div></div>`).join(""):`<div class="panel" style="text-align:center;padding:50px"><h2>No orders yet</h2><a class="btn primary" href="restaurants.html">Order now</a></div>`}
function reorder(id){let o=get(K.orders,[]).find(x=>x.id===id);if(o){set(K.cart,o.items);location.href="cart.html"}}
function confirmation(){let id=new URLSearchParams(location.search).get("id"),o=get(K.orders,[]).find(x=>x.id===id)||get("fd_last",null);if(!o)return;document.getElementById("oid").textContent=o.id;document.getElementById("ototal").textContent=money(o.total);document.getElementById("oaddress").textContent=o.address}
function profile(){requireAuth();let u=auth();document.getElementById("pname").textContent=u.name;document.getElementById("pemail").textContent=u.email;document.getElementById("avatar").textContent=u.name[0].toUpperCase()}
function tracking(){requireAuth();let id=new URLSearchParams(location.search).get("id"),o=get(K.orders,[]).find(x=>x.id===id)||get(K.orders,[])[0];if(!o)return;document.getElementById("tid").textContent=o.id;document.getElementById("ttotal").textContent=money(o.total);let pin=document.querySelector(".partnerPin"),progress=0;let start=Date.now();function move(){progress=Math.min(1,(Date.now()-start)/18000);pin.style.left=(68-progress*42)+"%";pin.style.top=(34+progress*24)+"%";document.getElementById("eta").textContent=Math.max(1,Math.ceil((1-progress)*18))+" min";if(progress<1)requestAnimationFrame(move)}move()}
function locate(){if(!navigator.geolocation)return toast("Location is not supported by this browser.");navigator.geolocation.getCurrentPosition(p=>{toast("Your location shared securely for this demo.");let pin=document.querySelector(".userPin");if(pin)pin.title=`Lat ${p.coords.latitude.toFixed(4)}, Lng ${p.coords.longitude.toFixed(4)}`},()=>toast("Location permission was not granted."))}
document.addEventListener("DOMContentLoaded",()=>{count();let p=location.pathname.split("/").pop();if(p==="index.html"||!p)home();if(p==="restaurants.html")list();if(p==="restaurant-details.html")details();if(p==="cart.html")renderCart();if(p==="checkout.html"){requireAuth();document.getElementById("summary").innerHTML=sum();let u=auth();if(u)document.getElementById("dname").value=u.name}if(p==="orders.html")orders();if(p==="order-confirmation.html")confirmation();if(p==="profile.html")profile();if(p==="order-tracking.html")tracking();document.querySelectorAll("[data-logout]").forEach(x=>x.onclick=logout)})

/* ================= FOODIE V2 SHOWCASE FEATURES ================= */
const V2 = {
  fav: "fd_favorites", points: "fd_points", prefs: "fd_prefs", group: "fd_group"
};
const getV2=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const setV2=(k,v)=>localStorage.setItem(k,JSON.stringify(v));

function toggleTheme(){
  const dark=document.body.classList.toggle("dark");
  localStorage.setItem("fd_theme",dark?"dark":"light");
  toast(dark?"Dark mode on 🌙":"Light mode on ☀️");
}
function loadTheme(){
  if(localStorage.getItem("fd_theme")==="dark") document.body.classList.add("dark");
}

function foodItemCard(x){
  const r=R.find(z=>z.id===x.rid);
  return `<article class="smartFood"><div class="smartFoodImg" style="background-image:url('${x.img}')"><span class="pill">${r?.t||"Fast"}</span></div>
  <div class="smartFoodBody"><b>${x.name}</b><small>${r?.n||"Foodie kitchen"} • ${money(x.price)}</small>
  <button class="btn primary miniBtn" onclick="add(${x.id})">＋ Add</button></div></article>`;
}

function recommendations(){
  const box=document.getElementById("recommendations"); if(!box)return;
  const orders=get(K.orders,[]);
  const orderedIds=orders.flatMap(o=>o.items||[]).map(i=>i.id);
  let picks;
  if(orderedIds.length){
    const freq={}; orderedIds.forEach(id=>freq[id]=(freq[id]||0)+1);
    picks=[...M].sort((a,b)=>(freq[b.id]||0)-(freq[a.id]||0)).slice(0,6);
  } else picks=[...M].sort((a,b)=>b.price-a.price).slice(0,6);
  box.innerHTML=picks.map(foodItemCard).join("");
}

function mood(type){
  const map={
    Hungry:["Biryani","Burger","Andhra","Pizza"],
    Spicy:["Biryani","Andhra","Chicken","Noodles"],
    Healthy:["Healthy","Salad"],
    Sweet:["Dessert","Sweet"],
    Quick:["18–24","15–20","16–22","20–26"],
    Chill:["Dessert","Beverages","Tiffins"]
  };
  const keys=map[type]||[];
  let items=M.filter(x=>{const r=R.find(z=>z.id===x.rid);const text=(x.name+" "+x.desc+" "+(r?.c||"")+" "+(r?.t||"")).toLowerCase();return keys.some(k=>text.includes(k.toLowerCase()))}).slice(0,6);
  if(!items.length)items=M.slice(0,6);
  const el=document.getElementById("moodResult");
  el.innerHTML=`<div class="smartResultHead"><b>${type} mode activated ✨</b><span>${items.length} matches</span></div><div class="smartFoodGrid">${items.map(foodItemCard).join("")}</div>`;
}

function surpriseMe(){
  const x=M[Math.floor(Math.random()*M.length)];
  const r=R.find(z=>z.id===x.rid);
  const el=document.getElementById("moodResult");
  if(el)el.innerHTML=`<div class="surprise"><div class="surpriseEmoji">🎉</div><div><small>FOODIE PICKED FOR YOU</small><h2>${x.name}</h2><p>${r.n} • ${money(x.price)} • ${r.t}</p><button class="btn primary" onclick="add(${x.id})">Add this surprise</button></div></div>`;
  window.scrollTo({top:document.getElementById("moodResult")?.getBoundingClientRect().top+scrollY-100||0,behavior:"smooth"});
}

function initCombo(){
  const main=document.getElementById("comboMain"),side=document.getElementById("comboSide"),drink=document.getElementById("comboDrink");
  if(!main)return;
  const options=(arr)=>arr.map(x=>`<option value="${x.id}">${x.name} — ${money(x.price)}</option>`).join("");
  main.innerHTML=options(M.filter(x=>/biryani|burger|pizza|curry|dosa|noodles/i.test(x.name)));
  side.innerHTML=options(M.filter(x=>/65|fries|naan|salad/i.test(x.name)));
  drink.innerHTML=options([{id:"drink",name:"Fresh Lime Soda",price:60},{id:"drink2",name:"Cold Coffee",price:90},{id:"drink3",name:"Masala Chaas",price:55}]);
  [main,side,drink].forEach(e=>e.addEventListener("change",previewCombo));
  previewCombo();
}
function comboData(){
  const main=M.find(x=>String(x.id)===document.getElementById("comboMain")?.value);
  const side=M.find(x=>String(x.id)===document.getElementById("comboSide")?.value);
  const drinks={drink:{id:"drink",name:"Fresh Lime Soda",price:60},drink2:{id:"drink2",name:"Cold Coffee",price:90},drink3:{id:"drink3",name:"Masala Chaas",price:55}};
  const drink=drinks[document.getElementById("comboDrink")?.value];
  return {main,side,drink};
}
function previewCombo(){
  const el=document.getElementById("comboResult");if(!el)return;
  const {main,side,drink}=comboData(); if(!main||!side||!drink)return;
  const original=main.price+side.price+drink.price, save=Math.min(80,Math.round(original*.12)), total=original-save;
  el.innerHTML=`<div><b>Custom combo</b><span>Original ${money(original)}</span><strong>${money(total)}</strong><small>Save ${money(save)}</small></div>`;
}
function addCombo(){
  const {main,side,drink}=comboData(); if(!main||!side||!drink)return;
  const original=main.price+side.price+drink.price, save=Math.min(80,Math.round(original*.12));
  const combo={id:"combo-"+Date.now(),name:`Custom Combo: ${main.name} + ${side.name} + ${drink.name}`,price:original-save,desc:"Foodie custom-built combo",img:main.img,qty:1,rid:main.rid};
  const c=cart();c.push(combo);saveCart(c);toast("Custom combo added 🍱");
}

function createGroup(){
  const code="FD-"+Math.random().toString(36).slice(2,7).toUpperCase();
  const group={code,created:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),members:1};
  setV2(V2.group,group);
  const el=document.getElementById("groupResult");
  if(el)el.innerHTML=`<div class="groupBox"><b>Room ${code}</b><small>Share this code with friends</small><button class="btn light" onclick="copyText('${code}')">Copy code</button><span>👤 1 member joined</span></div>`;
  toast("Group room created 👥");
}
function copyText(t){navigator.clipboard?.writeText(t);toast("Copied: "+t)}

function points(){
  let p=Number(getV2(V2.points,0));const el=document.getElementById("pointsValue"),fill=document.getElementById("pointsFill");
  if(el)el.textContent=p+" pts";if(fill)fill.style.width=Math.min(100,(p%1000)/10)+"%";
}
function claimDaily(){
  const today=new Date().toDateString(), last=localStorage.getItem("fd_daily");
  if(last===today)return toast("Daily bonus already claimed today ✨");
  const p=Number(getV2(V2.points,0))+20;setV2(V2.points,p);localStorage.setItem("fd_daily",today);points();toast("+20 Foodie points 🏆");
}

function startVoice(){
  const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!Speech)return toast("Voice search is not supported in this browser.");
  const rec=new Speech();rec.lang="en-IN";rec.interimResults=false;rec.maxAlternatives=1;
  rec.onstart=()=>toast("Listening… say a food name 🎤");
  rec.onresult=e=>{const text=e.results[0][0].transcript;const input=document.getElementById("mainSearch");if(input){input.value=text;document.getElementById("searchSuggest").innerHTML=`<div class="suggestion">Searching for “${text}”…</div>`;setTimeout(()=>location.href="restaurants.html?search="+encodeURIComponent(text),350)}};
  rec.onerror=()=>toast("Couldn't hear that. Try again.");
  rec.start();
}
function initSuggestions(){
  const input=document.getElementById("mainSearch"), box=document.getElementById("searchSuggest");if(!input||!box)return;
  input.addEventListener("input",()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){box.innerHTML="";return}
    const matches=[...R.map(r=>r.n),...M.map(m=>m.name)].filter(x=>x.toLowerCase().includes(q)).slice(0,5);
    box.innerHTML=matches.map(x=>`<button class="suggestion" onclick="document.getElementById('mainSearch').value='${x.replace(/'/g,"\\'")}'">${x}</button>`).join("");
  });
}

const oldCheckout=checkout;
function checkout(){
  requireAuth(); if(!cart().length)return location.href="cart.html";
  const name=document.getElementById("dname").value.trim(),address=document.getElementById("address").value.trim(),phone=document.getElementById("phone").value.trim(),m=document.getElementById("msg");
  if(!name||address.length<8||phone.replace(/\D/g,"").length<10){m.textContent="Please enter valid delivery details.";return}
  const t=totals(), id="FD"+Math.floor(10000000+Math.random()*89999999);
  const prefs=getV2(V2.prefs,{});
  const eco=document.getElementById("eco")?.checked||false;
  const tip=Number(document.getElementById("tip")?.value||0);
  const schedule=document.getElementById("schedule")?.value||"ASAP • 20–30 min";
  const finalTotal=t.total+tip;
  let o={id,date:new Date().toLocaleString("en-IN"),items:cart(),total:finalTotal,status:"Preparing",address,name,phone,eco,tip,schedule,payment:document.getElementById("payment")?.value||"Cash on Delivery"};
  let os=get(K.orders,[]);os.unshift(o);set(K.orders,os);set("fd_last",o);localStorage.removeItem(K.cart);
  setV2(V2.points,Number(getV2(V2.points,0))+(eco?15:5));
  location.href="order-confirmation.html?id="+id;
}
function initCheckoutExtras(){
  const sumEl=document.getElementById("summary");if(!sumEl)return;
  const panel=document.createElement("div");panel.className="checkoutExtras";
  panel.innerHTML=`<h3>✨ Make it yours</h3>
  <label class="toggleRow"><input type="checkbox" id="eco"> 🌱 Eco delivery <span>+15 reward pts</span></label>
  <div class="field"><label>Delivery time</label><select id="schedule" class="input"><option>ASAP • 20–30 min</option><option>Schedule • Today 7:00 PM</option><option>Schedule • Today 9:00 PM</option></select></div>
  <div class="field"><label>Payment demo</label><select id="payment" class="input"><option>Cash on Delivery</option><option>UPI • Demo</option><option>Card • Demo</option><option>Foodie Wallet • Demo</option></select></div>
  <div class="field"><label>Tip your delivery partner</label><select id="tip" class="input"><option value="0">No tip</option><option value="10">₹10</option><option value="20">₹20</option><option value="30">₹30</option></select></div>`;
  sumEl.parentNode.insertBefore(panel,sumEl);
}
function initV2(){
  loadTheme();recommendations();initCombo();points();initSuggestions();initCheckoutExtras();
}
const oldDOMContentLoaded=document.addEventListener;
document.addEventListener("DOMContentLoaded",()=>{initV2()});
