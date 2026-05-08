// =============================================
// THANE MAP & DESTINATIONS — Full Interactive
// =============================================
var THANE_LOCS = {
    viviana: { name:'Viviana Mall', emoji:'🛍️' },
    grandcentral: { name:'NaMo Grand Central Park', emoji:'🌳' },
    thewalk: { name:'The Walk (Hiranandani)', emoji:'🚶' },
    apollo: { name:'Crow\'s House (Apollo)', emoji:'🏡' },
    lodha: { name:'Pika\'s House (Lodha Amara)', emoji:'🏠' }
};
var arcadeScore=0,arcadeTimer=null,walkIceCream={scoops:[],cone:'waffle'};
var _duckCount=0,_butterflyCount=0,_puriCount=0,_fitIdx=0;

// =============================================
// THANE CANVAS MAP
// =============================================
function drawThaneMap(){
    var mc=document.getElementById('thane-canvas'); if(!mc)return;
    var c=mc.getContext('2d'),W=600,H=480,dk=document.body.classList.contains('dark');
    c.fillStyle=dk?'#242f3e':'#f2efe9'; c.fillRect(0,0,W,H);
    // Creek
    c.fillStyle=dk?'#17263c':'#88c4e8';
    c.beginPath();c.moveTo(W,0);c.lineTo(W,60);c.bezierCurveTo(500,80,420,50,380,0);c.closePath();c.fill();
    c.strokeStyle=dk?'rgba(60,100,140,.2)':'rgba(130,190,220,.3)';c.lineWidth=.5;
    for(var wy=8;wy<55;wy+=8){c.beginPath();for(var wx=400;wx<W;wx+=25){c.moveTo(wx,wy+Math.sin(wx*.06)*2);c.lineTo(wx+12,wy+Math.sin((wx+12)*.06)*2);}c.stroke();}
    // Upvan Lake
    c.fillStyle=dk?'#17263c':'#80bcd8';c.beginPath();c.ellipse(440,110,50,25,-.1,0,Math.PI*2);c.fill();
    c.fillStyle=dk?'#152838':'#90c8e0';c.beginPath();c.ellipse(435,108,35,16,.1,0,Math.PI*2);c.fill();
    // Parks
    c.fillStyle=dk?'#1e3520':'#b8dd8c';c.beginPath();c.roundRect(400,60,110,70,12);c.fill();
    c.fillStyle=dk?'#1a3018':'#a8d07c';c.beginPath();c.ellipse(455,95,35,22,0,0,Math.PI*2);c.fill();
    c.fillStyle=dk?'#1e3520':'#c0dd9c';c.beginPath();c.roundRect(350,260,140,120,10);c.fill();
    c.fillStyle=dk?'#1a3018':'#b0d080';c.beginPath();c.ellipse(420,320,45,30,0,0,Math.PI*2);c.fill();
    c.fillStyle=dk?'#1e3520':'#c5e29c';c.beginPath();c.roundRect(55,330,120,90,8);c.fill();
    // Road helpers
    function rd(x1,y1,x2,y2,w){c.lineCap='round';c.strokeStyle=dk?'#1a2030':'#ddd8d0';c.lineWidth=w+2;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.strokeStyle=dk?'#38414e':'#fff';c.lineWidth=w;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();}
    function crd(pts,w){c.lineCap='round';c.strokeStyle=dk?'#1a2030':'#ddd8d0';c.lineWidth=w+2;c.beginPath();c.moveTo(pts[0],pts[1]);if(pts.length===6)c.quadraticCurveTo(pts[2],pts[3],pts[4],pts[5]);else if(pts.length===8)c.bezierCurveTo(pts[2],pts[3],pts[4],pts[5],pts[6],pts[7]);c.stroke();c.strokeStyle=dk?'#38414e':'#fff';c.lineWidth=w;c.beginPath();c.moveTo(pts[0],pts[1]);if(pts.length===6)c.quadraticCurveTo(pts[2],pts[3],pts[4],pts[5]);else if(pts.length===8)c.bezierCurveTo(pts[2],pts[3],pts[4],pts[5],pts[6],pts[7]);c.stroke();}
    function lbl(t,x,y,a,s,cl){c.save();c.translate(x,y);if(a)c.rotate(a);c.font='700 '+(s||6.5)+'px sans-serif';c.strokeStyle=dk?'rgba(36,47,62,.85)':'rgba(242,239,233,.85)';c.lineWidth=2.5;c.lineJoin='round';c.strokeText(t,0,0);c.fillStyle=cl||'#666';c.fillText(t,0,0);c.restore();}
    // Minor streets
    var M=[[50,140,200,140],[50,200,200,200],[50,260,200,260],[150,80,150,420],[230,80,230,420],[300,180,300,400],[350,160,350,420],[50,300,300,300],[200,350,350,350],[420,160,420,260],[480,140,480,400],[380,400,550,400],[100,420,500,420],[520,200,520,380],[400,200,550,200],[50,80,150,80],[180,100,300,100],[270,240,380,240],[440,400,440,H]];
    for(var i=0;i<M.length;i++)rd(M[i][0],M[i][1],M[i][2],M[i][3],2);
    // Major streets
    rd(0,160,W,160,8);lbl('GHODBUNDER ROAD',40,154,0,8,'#555');
    rd(280,0,280,H,8);lbl('EASTERN EXPRESS HWY',260,50,-Math.PI/2,7,'#555');
    crd([0,280,250,300,560,310],6);lbl('LBS MARG',150,290,.05,6.5,'#666');
    rd(180,160,180,H,5);lbl('POKHRAN RD',162,230,-Math.PI/2,5.5,'#777');
    crd([350,240,420,300,500,380],5);lbl('HIRANANDANI RD',400,310,.4,5.5,'#666');
    // Buildings
    c.fillStyle=dk?'#1c2a38':'#e2ded6';
    var B=[[30,100,22,14],[80,170,26,16],[170,110,18,12],[220,180,20,14],[310,120,24,16],[340,90,18,20],[400,170,20,14],[460,200,22,16],[500,280,18,20],[80,310,16,14],[130,280,20,12],[200,310,14,16],[260,370,18,14],[320,310,16,12],[380,180,12,16],[440,260,14,12],[530,340,16,18],[160,370,14,12],[60,380,16,14],[560,160,12,16],[40,220,14,10],[310,210,12,14],[100,250,10,12],[250,150,16,10],[470,140,12,14],[540,100,14,10],[380,380,12,14],[200,400,10,12]];
    for(var i=0;i<B.length;i++)c.fillRect(B[i][0],B[i][1],B[i][2],B[i][3]);
    // Viviana
    c.fillStyle=dk?'#2a3a4a':'#d0ccc4';c.fillRect(95,100,50,35);
    c.fillStyle=dk?'#3a4a5a':'#c0bcb4';c.fillRect(100,105,40,25);
    // Railway
    c.setLineDash([4,4]);c.strokeStyle=dk?'#4a5a6a':'#999';c.lineWidth=2;c.beginPath();c.moveTo(280,0);c.lineTo(280,H);c.stroke();c.setLineDash([]);
    // Station
    c.fillStyle=dk?'#4a3a0a':'#e87020';c.beginPath();c.roundRect(260,190,40,13,3);c.fill();c.fillStyle='#fff';c.font='700 7px sans-serif';c.fillText('Thane Stn',263,200);
    // Labels
    lbl('Upvan Lake',415,130,0,6,dk?'#4a7838':'#5a8830');
    lbl('Thane Creek',500,25,0,6,dk?'#3a5a7a':'#4a7aaa');
    lbl('Hiranandani Estate',370,350,0,6.5,dk?'#4a7838':'#5a8830');
    lbl('Lodha Amara',70,400,0,6,'#888');
    // Compass
    c.fillStyle=dk?'#667':'#bbb';c.font='700 10px sans-serif';c.textAlign='center';c.fillText('N',30,30);
    c.strokeStyle='#bbb';c.lineWidth=1.5;c.beginPath();c.moveTo(30,32);c.lineTo(30,48);c.stroke();
    c.beginPath();c.moveTo(27,36);c.lineTo(30,32);c.lineTo(33,36);c.closePath();c.fill();c.textAlign='left';
    // Scale
    c.fillStyle=dk?'#667':'#999';c.font='600 5.5px sans-serif';c.fillText('1 km',15,H-12);c.strokeStyle='#999';c.lineWidth=1;
    c.beginPath();c.moveTo(15,H-7);c.lineTo(90,H-7);c.stroke();c.beginPath();c.moveTo(15,H-10);c.lineTo(15,H-4);c.stroke();c.beginPath();c.moveTo(90,H-10);c.lineTo(90,H-4);c.stroke();
}

// =============================================
// ROUTER
// =============================================
function showThaneLocation(loc){
    if(!loc||!THANE_LOCS[loc])return;
    var p=document.getElementById('thane-loc-panel');
    if(arcadeTimer){clearInterval(arcadeTimer);arcadeTimer=null;}
    if(loc==='viviana')p.innerHTML=buildViviana();
    else if(loc==='grandcentral')p.innerHTML=buildPark();
    else if(loc==='thewalk')p.innerHTML=buildTheWalk();
    else if(loc==='apollo')p.innerHTML=buildApolloHouse();
    else if(loc==='lodha')p.innerHTML=buildLodhaHouse();
    show('screen-thane-loc');
}
function withCrow(){return flightCrowFound||(typeof crowFound!=='undefined'&&crowFound);}

// =============================================
// VIVIANA MALL — Hub
// =============================================
function buildViviana(){
    var h='<div class="top-bar"><button class="back-btn" onclick="show(\'screen-thane\')">← Thane</button><span class="loc-name">🛍️ Viviana Mall</span></div>';
    h+='<div class="panel" style="margin-top:10px"><div class="panel-title">🛍️ Viviana Mall — Thane\'s Pride!</div>';
    h+='<div style="text-align:center;font-size:2.5rem;margin:8px 0">🏬✨</div>';
    h+='<div style="font-size:.7rem;font-weight:700;color:#888;text-align:center;margin:6px 0">Movies, shopping, food & games!</div>';
    h+='<div class="choices">';
    h+='<button class="choice-btn" onclick="vivianaGo(\'cinema\')"><span class="ce">🎬</span>Cinepolis</button>';
    h+='<button class="choice-btn" onclick="vivianaGo(\'shopping\')"><span class="ce">🛍️</span>Shopping</button>';
    h+='<button class="choice-btn" onclick="vivianaGo(\'food\')"><span class="ce">🍕</span>Food Court</button>';
    h+='<button class="choice-btn" onclick="vivianaGo(\'arcade\')"><span class="ce">🕹️</span>Timezone</button>';
    h+='</div>';
    h+='<div class="msg-box" style="margin-top:8px">'+(withCrow()?'⚡ & 🐦‍⬛ Mall date! 💛🛍️':'⚡ Exploring Viviana~ 🛍️')+'</div></div>';
    return h;
}
function vivianaGo(s){
    var p=document.getElementById('thane-loc-panel');
    if(s==='cinema')p.innerHTML=buildCinema();
    else if(s==='shopping')p.innerHTML=buildShopping();
    else if(s==='food')p.innerHTML=buildFoodCourt();
    else if(s==='arcade')p.innerHTML=buildArcade();
}

// --- CINEPOLIS with YouTube embeds ---
function buildCinema(){
    var h='<div class="top-bar"><button class="back-btn" onclick="showThaneLocation(\'viviana\')">← Mall</button><span class="loc-name">🎬 Cinepolis</span></div>';
    h+='<div class="panel" style="margin-top:10px">';
    // CSS theatre visual
    h+='<div class="cinema-theatre"><div class="cinema-curtain-l"></div><div class="cinema-curtain-r"></div>';
    h+='<div class="cinema-screen-box"><div class="cinema-screen-glow">🎬 NOW SHOWING</div></div>';
    h+='<div class="cinema-stage"></div><div class="cinema-seats">';
    for(var r=0;r<2;r++){h+='<div class="cinema-seat-row">';for(var s=0;s<6;s++)h+='<div class="cinema-seat"></div>';h+='</div>';}
    h+='</div></div>';
    h+='<div class="panel-title" style="margin-top:10px">Pick a Movie! 🍿</div>';
    h+='<div class="choices">';
    h+='<button class="choice-btn" onclick="playMovie(\'spiderman\')" style="border-color:#e23636"><span class="ce">🕷️</span>Spider-Man</button>';
    h+='<button class="choice-btn" onclick="playMovie(\'zapatlela\')" style="border-color:#9b59b6"><span class="ce">🤡</span>Zapatlela</button>';
    h+='</div>';
    if(withCrow())h+='<div class="msg-box" style="margin-top:8px">⚡ & 🐦‍⬛ Movie night! 🍿💛</div>';
    h+='</div>';
    return h;
}
function playMovie(movie){
    var p=document.getElementById('thane-loc-panel');
    var h='<div class="top-bar"><button class="back-btn" onclick="vivianaGo(\'cinema\')">← Cinepolis</button><span class="loc-name">🎬 Now Playing</span></div>';
    h+='<div class="panel" style="margin-top:10px">';
    if(movie==='spiderman'){
        h+='<div class="panel-title">🕷️ Spider-Man</div>';
        h+='<div class="movie-player"><iframe width="100%" height="220" style="border-radius:12px;border:3px solid #e23636" src="https://www.youtube.com/embed/VSDLx9E968k?autoplay=1" title="Spider-Man" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>';
        h+='<div style="text-align:center;font-size:2rem;margin:8px 0">🕷️🕸️💥🦸‍♂️</div>';
        h+='<div style="font-size:.7rem;font-weight:700;color:#888;text-align:center">Your friendly neighborhood Spider-Man!</div>';
    } else {
        h+='<div class="panel-title">🤡 Zapatlela</div>';
        h+='<div class="movie-player"><iframe width="100%" height="220" style="border-radius:12px;border:3px solid #9b59b6" src="https://www.youtube.com/embed/Jjdhy6X-jWM?autoplay=1" title="Zapatlela" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>';
        h+='<div style="text-align:center;font-size:2rem;margin:8px 0">🤡🎭👻😱</div>';
        h+='<div style="font-size:.7rem;font-weight:700;color:#888;text-align:center">Marathi horror-comedy classic!</div>';
    }
    h+='<div style="margin-top:12px;text-align:center"><div style="font-size:.7rem;font-weight:900;color:#8b005d;margin-bottom:6px">🍿 Movie Snacks</div>';
    h+='<div style="font-size:2rem;letter-spacing:8px">🍿 🥤 🌭 🍫 🍦</div>';
    if(withCrow())h+='<div class="msg-box" style="margin-top:6px">⚡ & 🐦‍⬛ sharing popcorn! 🍿💛</div>';
    h+='</div></div>';
    p.innerHTML=h;
}

// --- Shopping ---
function buildShopping(){
    var S=[{e:'👟',n:'Nike',d:'Fresh kicks!'},{e:'👗',n:'Zara',d:'Latest fashion'},{e:'📱',n:'Apple Store',d:'Tech dreams'},{e:'📚',n:'Crossword',d:'Books & more'},{e:'🎮',n:'Game Zone',d:'Consoles!'},{e:'💄',n:'Sephora',d:'Beauty finds'},{e:'🧸',n:'Hamleys',d:'Toys & plushies!'},{e:'🕶️',n:'Lenskart',d:'Cool shades'}];
    var h='<div class="top-bar"><button class="back-btn" onclick="showThaneLocation(\'viviana\')">← Mall</button><span class="loc-name">🛍️ Shopping</span></div>';
    h+='<div class="panel" style="margin-top:10px"><div class="panel-title">🛍️ Viviana Stores</div><div class="shop-grid">';
    for(var i=0;i<S.length;i++){var s=S[i];h+='<div class="shop-card" onclick="shopVisit(this,\''+s.n+'\')"><div style="font-size:1.5rem">'+s.e+'</div><div style="font-weight:900;font-size:.7rem">'+s.n+'</div><div style="font-size:.55rem;color:#888">'+s.d+'</div></div>';}
    h+='</div><div class="msg-box" id="shop-msg">'+(withCrow()?'⚡ & 🐦‍⬛ window shopping~ 💛':'Tap a store! 🛍️')+'</div></div>';
    return h;
}
function shopVisit(el,name){
    var M={'Nike':'⚡ tries on Air Jordans... looking fly! 👟✨','Zara':'🐦‍⬛ Crow picks a gorgeous black dress! 👗','Apple Store':'⚡ staring at the new MacBook for 20 mins 📱😍','Crossword':'📚 Found a manga section! Score!','Game Zone':'🎮 PS5 controllers everywhere... tempting!','Sephora':'💄 Crow testing every lip gloss shade 💋','Hamleys':'🧸 Giant teddy bear spotted! Must. Resist.','Lenskart':'🕶️ Trying on every frame in the store lol'};
    el.style.borderColor='#ffd700';el.style.background='rgba(255,215,0,.1)';
    var m=document.getElementById('shop-msg');if(m)m.innerText=M[name]||'Nice store!';
}

// --- Food Court ---
function buildFoodCourt(){
    var F=[{e:'🍕',n:'Pizza Hut',i:'Pepperoni Pizza',p:'₹349'},{e:'🍔',n:'McDonalds',i:'McSpicy Paneer',p:'₹199'},{e:'🍜',n:'Chinese Wok',i:'Hakka Noodles',p:'₹249'},{e:'🌮',n:'Taco Bell',i:'Crunchy Taco',p:'₹149'},{e:'🍦',n:'Baskin Robbins',i:'Double Scoop',p:'₹199'},{e:'🧋',n:'Chaayos',i:'Cutting Chai',p:'₹99'},{e:'🍱',n:'Bento Box',i:'Sushi Platter',p:'₹499'},{e:'🥘',n:'Biryani Blues',i:'Hyderabadi Biryani',p:'₹299'}];
    var h='<div class="top-bar"><button class="back-btn" onclick="showThaneLocation(\'viviana\')">← Mall</button><span class="loc-name">🍕 Food Court</span></div>';
    h+='<div class="panel" style="margin-top:10px"><div class="panel-title">🍕 Viviana Food Court</div><div class="food-grid">';
    for(var i=0;i<F.length;i++){var f=F[i];h+='<button class="food-stall" onclick="orderFood(this,\''+f.n+'\',\''+f.i+'\')"><div style="font-size:1.5rem">'+f.e+'</div><div style="font-weight:900;font-size:.65rem">'+f.n+'</div><div style="font-size:.55rem;color:#888">'+f.i+'</div><div style="font-size:.6rem;font-weight:800;color:#ff1493">'+f.p+'</div></button>';}
    h+='</div><div class="msg-box" id="food-msg">'+(withCrow()?'⚡ & 🐦‍⬛ What are we eating? 🤤':'Pick something yummy! 🍽️')+'</div></div>';
    return h;
}
function orderFood(el,name,item){
    el.style.borderColor='#32cd32';el.style.background='rgba(50,205,50,.08)';
    el.innerHTML='<div style="font-size:1.5rem">✅</div><div style="font-weight:900;font-size:.65rem">'+name+'</div><div style="font-size:.55rem;color:#32cd32;font-weight:800">Ordered!</div>';
    el.onclick=null;
    var m=document.getElementById('food-msg');if(m)m.innerText=(withCrow()?'⚡ & 🐦‍⬛':' ⚡')+' ordered '+item+' from '+name+'! 😋🍽️';
}

// --- Timezone Arcade ---
function buildArcade(){
    var h='<div class="top-bar"><button class="back-btn" onclick="showThaneLocation(\'viviana\')">← Mall</button><span class="loc-name">🕹️ Timezone</span></div>';
    h+='<div class="panel" style="margin-top:10px"><div class="panel-title">🕹️ Timezone Arcade</div>';
    h+='<div style="text-align:center;font-size:.7rem;font-weight:700;color:#888;margin-bottom:8px">Tap the emojis before they vanish! 30 seconds!</div>';
    h+='<div class="arcade-score">Score: <span id="arcade-score-val">0</span></div>';
    h+='<div class="arcade-grid" id="arcade-grid">';for(var i=0;i<9;i++)h+='<div class="arcade-hole" id="arc-'+i+'"></div>';h+='</div>';
    h+='<div class="arcade-timer" id="arcade-timer">30s</div>';
    h+='<button class="action-btn" id="arcade-start-btn" onclick="startArcade()">Start Game! 🎮</button>';
    h+='<div class="msg-box" id="arcade-msg">'+(withCrow()?'⚡ & 🐦‍⬛ Arcade battle! 💛':'Beat the high score! 🏆')+'</div></div>';
    return h;
}
function startArcade(){
    arcadeScore=0;document.getElementById('arcade-score-val').innerText='0';
    var btn=document.getElementById('arcade-start-btn');if(btn)btn.style.display='none';
    var tl=30;document.getElementById('arcade-timer').innerText=tl+'s';
    var emojis=['🐻','🦊','🐸','🐱','🐰','🐥','🎯','⭐','💎'];
    function spawn(){for(var i=0;i<9;i++){var h=document.getElementById('arc-'+i);if(h)h.innerHTML='';}
        var ct=Math.random()>.6?2:1,used=[];
        for(var c=0;c<ct;c++){var idx;do{idx=~~(Math.random()*9)}while(used.indexOf(idx)>=0);used.push(idx);
            var hole=document.getElementById('arc-'+idx);if(hole)hole.innerHTML='<div class="arcade-mole" onclick="hitMole(this)">'+emojis[~~(Math.random()*emojis.length)]+'</div>';}}
    var si=setInterval(spawn,900);
    arcadeTimer=setInterval(function(){tl--;var el=document.getElementById('arcade-timer');if(el)el.innerText=tl+'s';
        if(tl<=0){clearInterval(arcadeTimer);arcadeTimer=null;clearInterval(si);
            for(var i=0;i<9;i++){var h=document.getElementById('arc-'+i);if(h)h.innerHTML='';}
            var msg=document.getElementById('arcade-msg');
            if(msg){if(arcadeScore>=20)msg.innerText='🏆 LEGENDARY! '+arcadeScore+' pts! 🎉';else if(arcadeScore>=12)msg.innerText='🔥 Great! '+arcadeScore+' pts! 💪';else msg.innerText='😅 '+arcadeScore+' pts! Try again?';}
            var btn=document.getElementById('arcade-start-btn');if(btn){btn.style.display='';btn.innerText='Play Again! 🔄';}}},1000);
    spawn();
}
function hitMole(el){arcadeScore++;var sv=document.getElementById('arcade-score-val');if(sv)sv.innerText=arcadeScore;el.innerText='💥';el.onclick=null;el.style.transform='scale(1.3)';setTimeout(function(){if(el.parentElement)el.parentElement.innerHTML='';},200);}

// =============================================
// NAMO GRAND CENTRAL PARK — Interactive
// =============================================
function buildPark(){
    var h='<div class="top-bar"><button class="back-btn" onclick="show(\'screen-thane\')">← Thane</button><span class="loc-name">🌳 NaMo Park</span></div>';
    h+='<div class="panel" style="margin-top:10px"><div class="panel-title">🌳 NaMo Grand Central Park</div>';
    h+='<div style="font-size:.65rem;font-weight:700;color:#888;text-align:center;margin-bottom:8px">By Upvan Lake — sunsets, joggers & serenity 🌅</div>';
    h+='<div class="choices">';
    h+='<button class="choice-btn" onclick="show(\'screen-park-pond\');initParkPond()"><span class="ce">🦆</span>Feed Ducks</button>';
    h+='<button class="choice-btn" onclick="show(\'screen-park-garden\');initParkGarden()"><span class="ce">🌺</span>Flower Garden</button>';
    h+='<button class="choice-btn" onclick="parkGo(\'fitness\')"><span class="ce">💪</span>Fitness Zone</button>';
    h+='<button class="choice-btn" onclick="parkGo(\'sunset\')"><span class="ce">🌅</span>Sunset Point</button>';
    h+='<button class="choice-btn" onclick="parkGo(\'boat\')"><span class="ce">🚣</span>Boat Ride</button>';
    h+='<button class="choice-btn" onclick="parkGo(\'kulfi\')"><span class="ce">🍦</span>Kulfi Vendor</button>';
    h+='</div>';
    h+='<div class="msg-box" style="margin-top:8px">'+(withCrow()?'⚡ & 🐦‍⬛ Evening park date! 🌅💛':'⚡ Peaceful evening~ 🌅')+'</div></div>';
    return h;
}
function parkGo(area){
    var p=document.getElementById('thane-loc-panel');
    var bk='<div class="top-bar"><button class="back-btn" onclick="showThaneLocation(\'grandcentral\')">← Park</button><span class="loc-name">🌳 NaMo Park</span></div>';
    var h=bk+'<div class="panel" style="margin-top:10px">';
    if(area==='lake'){
        _duckCount=0;
        h+='<div class="panel-title">🦆 Upvan Lake — Feed the Ducks!</div>';
        h+='<div class="park-lake-scene"><div class="lake-water"><div class="lake-ripple r1"></div><div class="lake-ripple r2"></div><div class="lake-ripple r3"></div></div>';
        h+='<div class="lake-ducks" id="lake-ducks">🦆 🦆 🦆</div><div class="lake-lilies">🪷 🌿 🪷</div></div>';
        h+='<button class="action-btn" onclick="feedDucks()">🍞 Throw Bread!</button>';
        h+='<div class="msg-box" id="duck-msg">Tap to feed the ducks! 🦆🍞</div>';
    } else if(area==='garden'){
        _butterflyCount=0;
        h+='<div class="panel-title">🌺 Flower Garden</div>';
        h+='<div class="park-garden"><div class="garden-row">🌸 🌺 🌻 🌷 🌹</div><div class="garden-row">🌼 💐 🪻 🌸 🌺</div><div class="garden-row">🌷 🌹 🌻 🌼 💐</div>';
        h+='<div class="garden-butterflies" id="garden-butterflies">🦋 🦋 🦋</div></div>';
        h+='<button class="action-btn" onclick="catchButterfly()">🦋 Chase Butterflies!</button>';
        h+='<div class="msg-box" id="garden-msg">'+(withCrow()?'⚡ & 🐦‍⬛ Smelling flowers~ 🌸💛':'⚡ Beautiful flowers! 🌺')+'</div>';
    } else if(area==='fitness'){
        _fitIdx=0;
        h+='<div class="panel-title">💪 Fitness Zone</div><div style="text-align:center;font-size:2.5rem;margin:8px 0">🏋️ 🤸 🧘 🏃</div>';
        h+='<div id="fitness-log" style="min-height:40px"></div>';
        h+='<button class="action-btn" onclick="doExercise()">🏋️ Do an Exercise!</button>';
        h+='<div class="msg-box" id="fitness-msg">'+(withCrow()?'⚡ & 🐦‍⬛ Workout partners! 💪💛':'Time to get fit! 💪')+'</div>';
    } else if(area==='sunset'){
        h+='<div class="panel-title">🌅 Sunset Point</div>';
        h+='<div class="park-sunset"><div class="sunset-sky"><div class="sunset-sun">☀️</div><div class="sunset-clouds">☁️ &nbsp;&nbsp;&nbsp; ☁️</div></div>';
        h+='<div class="sunset-water">🌊</div><div class="sunset-bench">';
        if(withCrow())h+='<img src="pikachu.png" style="width:35px;height:35px;border-radius:50%;object-fit:cover"> <span style="font-size:1.5rem">💛</span> <img src="crow.png" style="width:35px;height:35px;border-radius:50%;object-fit:cover">';
        else h+='<img src="pikachu.png" style="width:40px;height:40px;border-radius:50%;object-fit:cover">';
        h+='</div></div><div class="msg-box">'+(withCrow()?'⚡ & 🐦‍⬛ watching the sunset... 🌅💛':'⚡ Gorgeous Thane sunset~ 🌅')+'</div>';
    } else if(area==='boat'){
        h+='<div class="panel-title">🚣 Boat Ride on Upvan Lake</div>';
        h+='<div style="text-align:center"><div class="boat-scene"><div class="boat-water">🌊🌊🌊</div><div class="boat-emoji">🚣</div>';
        if(withCrow())h+='<div style="font-size:1.2rem;margin-top:4px"><img src="pikachu.png" style="width:28px;height:28px;border-radius:50%;object-fit:cover;vertical-align:middle"> 💛 <img src="crow.png" style="width:28px;height:28px;border-radius:50%;object-fit:cover;vertical-align:middle"></div>';
        h+='</div></div><div class="msg-box">'+(withCrow()?'⚡ & 🐦‍⬛ romantic boat ride! 🚣💛':'⚡ Peaceful boat ride~ 🚣')+'</div>';
    } else if(area==='kulfi'){
        h+='<div class="panel-title">🍦 Kulfi Vendor</div><div style="text-align:center;font-size:2.5rem;margin:8px 0">🍦🧊</div>';
        var K=['🥭 Mango','🌹 Rose','🥜 Pista','🍫 Chocolate','🫐 Blueberry','🍌 Malai'];
        h+='<div class="choices">';for(var i=0;i<K.length;i++)h+='<button class="choice-btn" onclick="pickKulfi(this,\''+K[i]+'\')"><span class="ce">'+K[i].split(' ')[0]+'</span>'+K[i].split(' ')[1]+'</button>';h+='</div>';
        h+='<div class="msg-box" id="kulfi-msg">Pick your kulfi! 🍦</div>';
    }
    h+='</div>';p.innerHTML=h;
}
function feedDucks(){_duckCount++;var d=document.getElementById('lake-ducks'),m=document.getElementById('duck-msg');var R=['🦆 Quack! They loved it!','🦆🦆 More ducks came!','🦆🦆🦆 Duck party!! 🎉','🐤 A baby duck appeared!','🦆 That duck did a happy dance!','🦢 A swan joined!'];if(d){var e='';for(var i=0;i<Math.min(_duckCount,6);i++)e+=' 🦆';if(_duckCount>=4)e+=' 🐤';if(_duckCount>=6)e+=' 🦢';d.innerText='🦆 🦆 🦆'+e;}if(m)m.innerText=R[Math.min(_duckCount-1,R.length-1)];}
function catchButterfly(){_butterflyCount++;var b=document.getElementById('garden-butterflies'),m=document.getElementById('garden-msg');var R=['🦋 Almost caught one!','🦋🦋 They\'re fast!','🦋 Got one! It tickles!','🦋🦋🦋 A whole swarm!','🦋 A blue morpho! Rare!','🐝 Oops, that\'s a bee! 😂'];if(b){var e='';for(var i=0;i<Math.min(_butterflyCount,5);i++)e+=' 🦋';b.innerText='🦋 🦋 🦋'+e;}if(m)m.innerText=R[Math.min(_butterflyCount-1,R.length-1)];}
function doExercise(){var E=['🏋️ Bench Press — 3 sets!','🤸 Stretching — Limber!','🧘 Yoga — Inner peace!','🏃 Sprint — 100m in 12s!','💪 Pull-ups — 15 reps!','🦵 Squats — Legs on fire!'];var l=document.getElementById('fitness-log'),m=document.getElementById('fitness-msg');var ex=E[_fitIdx%E.length];_fitIdx++;if(l)l.innerHTML='<div style="text-align:center;font-size:.8rem;font-weight:800;color:#32cd32;padding:8px;animation:fadeIn .4s">'+ex+'</div>';if(m)m.innerText='Keep going! 💪 ('+_fitIdx+' done)';}
function pickKulfi(el,f){var m=document.getElementById('kulfi-msg');if(m)m.innerText=(withCrow()?'⚡ & 🐦‍⬛':'⚡')+' enjoying '+f+' kulfi! 🍦😋';el.style.borderColor='#32cd32';el.style.background='rgba(50,205,50,.1)';}

// =============================================
// THE WALK — Interactive Promenade
// =============================================
function buildTheWalk(){
    var h='<div class="top-bar"><button class="back-btn" onclick="show(\'screen-thane\')">← Thane</button><span class="loc-name">🚶 The Walk</span></div>';
    h+='<div class="panel" style="margin-top:10px"><div class="panel-title">🚶 The Walk — Hiranandani</div>';
    h+='<div style="text-align:center;font-size:2rem;margin:6px 0">🏪🌃✨</div>';
    h+='<div style="font-size:.65rem;font-weight:700;color:#888;text-align:center;margin:6px 0">Cafes, desserts & nightlife~</div>';
    h+='<div class="choices">';
    h+='<button class="choice-btn" onclick="walkGo(\'cafe\')"><span class="ce">☕</span>Starbucks</button>';
    h+='<button class="choice-btn" onclick="walkGo(\'icecream\')"><span class="ce">🍦</span>Ice Cream Builder</button>';
    h+='<button class="choice-btn" onclick="walkGo(\'boba\')"><span class="ce">🧋</span>Boba Tea</button>';
    h+='<button class="choice-btn" onclick="show(\'screen-walk-stroll\');initWalkStroll()"><span class="ce">🌃</span>Night Stroll</button>';
    h+='<button class="choice-btn" onclick="walkGo(\'pani\')"><span class="ce">💧</span>Pani Puri</button>';
    h+='<button class="choice-btn" onclick="walkGo(\'photo\')"><span class="ce">📸</span>Photo Booth</button>';
    h+='</div>';
    h+='<div class="msg-box" style="margin-top:8px">'+(withCrow()?'⚡ & 🐦‍⬛ Evening at The Walk! 🌃💛':'⚡ Vibing at The Walk~ 🌃')+'</div></div>';
    return h;
}
function walkGo(area){
    var p=document.getElementById('thane-loc-panel');
    var bk='<div class="top-bar"><button class="back-btn" onclick="showThaneLocation(\'thewalk\')">← The Walk</button><span class="loc-name">🚶 The Walk</span></div>';
    var h=bk+'<div class="panel" style="margin-top:10px">';
    if(area==='cafe'){
        h+='<div class="panel-title">☕ Starbucks</div><div style="text-align:center;font-size:2rem;margin:6px 0">☕✨</div>';
        var D=['☕ Caramel Macchiato','🍵 Matcha Latte','🧊 Iced Americano','🍫 Hot Chocolate','🫐 Blueberry Frappe','🍓 Strawberry Creme'];
        h+='<div class="choices">';for(var i=0;i<D.length;i++)h+='<button class="choice-btn" onclick="cafeOrder(this,\''+D[i]+'\')"><span class="ce">'+D[i].split(' ')[0]+'</span>'+D[i].substring(2)+'</button>';h+='</div>';
        h+='<div class="msg-box" id="cafe-msg">Pick your drink! ☕</div>';
    } else if(area==='icecream'){
        walkIceCream={scoops:[],cone:'waffle'};
        h+='<div class="panel-title">🍦 Ice Cream Builder</div>';
        h+='<div style="font-size:.65rem;font-weight:700;color:#888;text-align:center;margin-bottom:8px">Build your dream cone! Up to 3 scoops!</div>';
        h+='<div style="font-size:.65rem;font-weight:900;color:#8b005d;margin-bottom:4px">Cone:</div>';
        h+='<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px"><button class="opt sel" onclick="pickCone(\'waffle\',this)">🧇 Waffle</button><button class="opt" onclick="pickCone(\'sugar\',this)">🍦 Sugar</button><button class="opt" onclick="pickCone(\'cup\',this)">🥤 Cup</button></div>';
        var FL=[{e:'🍫',n:'Chocolate',c:'#6B3A20'},{e:'🍓',n:'Strawberry',c:'#E8557A'},{e:'🫐',n:'Blueberry',c:'#4A60D0'},{e:'🍵',n:'Matcha',c:'#6AA84F'},{e:'🥭',n:'Mango',c:'#F5A623'},{e:'🍌',n:'Banana',c:'#F5E050'},{e:'🫒',n:'Pista',c:'#8FBC8F'},{e:'🤎',n:'Coffee',c:'#8B6914'}];
        h+='<div style="font-size:.65rem;font-weight:900;color:#8b005d;margin-bottom:4px">Flavors (pick up to 3):</div><div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px">';
        for(var i=0;i<FL.length;i++){var f=FL[i];h+='<button class="opt" onclick="addScoop(\''+f.n+'\',\''+f.c+'\',this)">'+f.e+' '+f.n+'</button>';}h+='</div>';
        h+='<div style="text-align:center;margin:10px 0"><div id="ic-visual" style="display:inline-block;min-height:100px"><div style="font-size:2.5rem">🍦</div></div>';
        h+='<div id="ic-desc" style="font-size:.7rem;font-weight:800;color:#888;margin-top:4px">Pick your scoops!</div></div>';
        h+='<div class="msg-box" id="ic-msg">'+(withCrow()?'⚡ & 🐦‍⬛ building ice cream! 🍦💛':'Create your cone! 🍦')+'</div>';
    } else if(area==='boba'){
        h+='<div class="panel-title">🧋 Boba Tea Shop</div><div style="text-align:center;font-size:2rem;margin:6px 0">🧋✨</div>';
        var B=[{e:'🧋',n:'Classic Milk Tea',c:'#c8a070'},{e:'🍑',n:'Peach Oolong',c:'#f5a070'},{e:'🥭',n:'Mango Tango',c:'#f5c030'},{e:'🍓',n:'Strawberry Matcha',c:'#e07080'},{e:'🍫',n:'Taro Milk Tea',c:'#9070b0'},{e:'🫐',n:'Blueberry Burst',c:'#5060c0'}];
        h+='<div class="choices">';for(var i=0;i<B.length;i++){var b=B[i];h+='<button class="choice-btn" onclick="orderBoba(this,\''+b.n+'\',\''+b.c+'\')"><span class="ce">'+b.e+'</span>'+b.n+'</button>';}h+='</div>';
        h+='<div id="boba-visual" style="text-align:center;margin:10px 0;min-height:60px"></div>';
        h+='<div class="msg-box" id="boba-msg">Pick your boba! 🧋</div>';
    } else if(area==='stroll'){
        h+='<div class="panel-title">🌃 Night Stroll</div>';
        h+='<div class="night-stroll"><div class="stroll-sky">🌙 ✨ ⭐ ✨ ⭐ ✨ 🌙</div><div class="stroll-lights">🏮 🏮 🏮 🏮 🏮</div><div class="stroll-path">';
        if(withCrow())h+='<div class="stroll-chars"><img src="pikachu.png" style="width:40px;height:40px;border-radius:50%;object-fit:cover"> <span style="font-size:1.2rem">💛</span> <img src="crow.png" style="width:40px;height:40px;border-radius:50%;object-fit:cover"></div>';
        else h+='<div class="stroll-chars"><img src="pikachu.png" style="width:45px;height:45px;border-radius:50%;object-fit:cover"></div>';
        h+='</div><div class="stroll-shops">🏪 🏪 🏪 🏪</div></div>';
        h+='<div class="msg-box">'+(withCrow()?'⚡ & 🐦‍⬛ Walking under the stars... 🌙💛✨':'⚡ Night vibes at The Walk~ 🌃✨')+'</div>';
    } else if(area==='pani'){
        _puriCount=0;
        h+='<div class="panel-title">💧 Pani Puri Stall!</div>';
        h+='<div style="text-align:center;font-size:2.5rem;margin:8px 0">💧🫓🌶️</div>';
        h+='<div style="font-size:.7rem;font-weight:700;color:#888;text-align:center;margin-bottom:8px">How many can you eat?</div>';
        h+='<div style="text-align:center;font-size:2rem" id="puri-count">0</div>';
        h+='<div style="text-align:center;font-size:.6rem;font-weight:800;color:#888">pani puris eaten</div>';
        h+='<button class="action-btn" onclick="eatPuri()">🫓 Eat Pani Puri!</button>';
        h+='<div class="msg-box" id="puri-msg">Tap to eat! How many can you handle? 🌶️</div>';
    } else if(area==='photo'){
        h+='<div class="panel-title">📸 Photo Booth</div>';
        h+='<div class="photo-booth"><div class="photo-frame">';
        if(withCrow())h+='<img src="pikachu.png" style="width:55px;height:55px;border-radius:50%;object-fit:cover;border:3px solid #ffd700"> <span style="font-size:1.5rem">💛</span> <img src="crow.png" style="width:55px;height:55px;border-radius:50%;object-fit:cover;border:3px solid #ffd700">';
        else h+='<img src="pikachu.png" style="width:70px;height:70px;border-radius:50%;object-fit:cover;border:3px solid #ffd700">';
        h+='</div><div class="photo-props" id="photo-props">✌️</div></div>';
        var P=['✌️','😎','🤪','🥳','😘','🤩','👑','🦄'];
        h+='<div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;margin:8px 0">';
        for(var i=0;i<P.length;i++)h+='<button class="opt" onclick="photoProp(\''+P[i]+'\')" style="font-size:1.2rem;padding:6px 10px">'+P[i]+'</button>';
        h+='</div><div class="msg-box">Strike a pose! 📸✨</div>';
    }
    h+='</div>';p.innerHTML=h;
}
function cafeOrder(el,d){el.style.borderColor='#32cd32';el.style.background='rgba(50,205,50,.1)';var m=document.getElementById('cafe-msg');if(m)m.innerText=(withCrow()?'⚡ & 🐦‍⬛':'⚡')+' sipping '+d.substring(2)+'! ☕✨';}
function pickCone(t,el){walkIceCream.cone=t;var bs=el.parentElement.querySelectorAll('.opt');bs.forEach(function(b){b.classList.remove('sel')});el.classList.add('sel');}
function addScoop(n,c,el){if(walkIceCream.scoops.length>=3)return;walkIceCream.scoops.push({name:n,color:c});el.classList.add('sel');
    var v=document.getElementById('ic-visual'),d=document.getElementById('ic-desc');
    if(v){var ce=walkIceCream.cone==='waffle'?'🧇':walkIceCream.cone==='sugar'?'🍦':'🥤';var html='<div style="display:flex;flex-direction:column;align-items:center">';
        for(var i=walkIceCream.scoops.length-1;i>=0;i--)html+='<div style="width:'+(40+i*4)+'px;height:30px;background:'+walkIceCream.scoops[i].color+';border-radius:50%;margin-bottom:-8px;border:2px solid rgba(0,0,0,.1)"></div>';
        html+='<div style="font-size:2rem;margin-top:-4px">'+ce+'</div></div>';v.innerHTML=html;}
    if(d)d.innerText=walkIceCream.scoops.map(function(s){return s.name}).join(' + ')+' on '+walkIceCream.cone;}
function orderBoba(el,n,c){el.style.borderColor='#32cd32';
    var v=document.getElementById('boba-visual');
    if(v)v.innerHTML='<div style="display:inline-block;width:50px;height:75px;background:linear-gradient(180deg,'+c+','+c+'aa);border:3px solid '+c+';border-radius:8px 8px 14px 14px;position:relative;overflow:hidden"><div style="position:absolute;bottom:0;left:5px;right:5px;font-size:.5rem;letter-spacing:1px;text-align:center">⚫⚫⚫</div><div style="position:absolute;top:-4px;left:50%;transform:translateX(-50%);font-size:1.2rem">🧋</div></div><div style="font-size:.7rem;font-weight:800;color:#888;margin-top:4px">'+n+'</div>';
    var m=document.getElementById('boba-msg');if(m)m.innerText=(withCrow()?'⚡ & 🐦‍⬛':'⚡')+' sipping '+n+'! 🧋✨';}
function eatPuri(){_puriCount++;var c=document.getElementById('puri-count'),m=document.getElementById('puri-msg');if(c)c.innerText=_puriCount;
    var R=['Mmm! Tangy! 😋','Spicy! 🌶️🔥','That one was perfect!','Water water! 💧😅','Another one! 🫓','Can\'t stop! 😂','The pani is so good!','Feeling full... 🤢','OK ONE MORE... 🫓','🏆 LEGEND STATUS!','You\'re a machine! 🤖','The vendor is impressed! 😳','FREE PURI for being a champion! 🎉'];
    if(m)m.innerText=R[Math.min(_puriCount-1,R.length-1)];if(_puriCount===10&&m)m.innerText='🏆 10 puris! Pani Puri Champion! '+(withCrow()?'🐦‍⬛ Crow is cheering! 💛':'');}
function photoProp(p){var el=document.getElementById('photo-props');if(el)el.innerText=p;}

// =============================================
// HOUSES
// =============================================
function buildApolloHouse(){
    var h='<div class="top-bar"><button class="back-btn" onclick="show(\'screen-thane\')">← Thane</button><span class="loc-name">🏡 Crow\'s Home</span></div>';
    h+='<div class="panel" style="margin-top:10px"><div class="panel-title">🏡 Hiranandani Estate — Apollo</div>';
    h+='<div style="text-align:center;margin:10px 0"><img src="crow.png" style="width:80px;height:80px;border-radius:50%;border:4px solid #555;object-fit:cover"></div>';
    h+='<div style="font-size:.75rem;font-weight:700;color:#888;text-align:center;margin:8px 0">Crow\'s cozy apartment in Hiranandani Estate 🐦‍⬛</div>';
    h+='<div style="text-align:center;font-size:2rem;margin:10px 0">🏡 🛋️ 🎨 🎵 🕯️ 🌙</div>';
    h+='<div class="msg-box">'+(withCrow()?'🐦‍⬛ Welcome to my place, Pika! Make yourself at home~ 💛':'⚡ Visiting Crow\'s place... she\'s not home right now 🥺')+'</div></div>';
    return h;
}
function buildLodhaHouse(){
    var h='<div class="top-bar"><button class="back-btn" onclick="show(\'screen-thane\')">← Thane</button><span class="loc-name">🏠 Pika\'s Home</span></div>';
    h+='<div class="panel" style="margin-top:10px"><div class="panel-title">🏠 Lodha Amara — Pika\'s Place</div>';
    h+='<div style="text-align:center;margin:10px 0"><img src="pikachu.png" style="width:80px;height:80px;border-radius:50%;border:4px solid #9b59b6;object-fit:cover"></div>';
    h+='<div style="font-size:.75rem;font-weight:700;color:#888;text-align:center;margin:8px 0">Pika\'s home in Lodha Amara township ⚡</div>';
    h+='<div style="text-align:center;font-size:2rem;margin:10px 0">🏠 🖥️ 🎮 ⚡ 🛏️ 🍕</div>';
    h+='<div class="msg-box">'+(withCrow()?'⚡ Home sweet home! Crow\'s here too~ 💛🐦‍⬛':'⚡ Back home in Lodha Amara~ 🏠')+'</div></div>';
    return h;
}
