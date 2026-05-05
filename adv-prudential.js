// =============================================
// PRUDENTIAL — Fullscreen Skywalk + Stargazing + Mall
// =============================================

// =============================================
// 1. SKYWALK — 4 directional views, fullscreen
// =============================================
var SK={cvs:null,ctx:null,W:0,H:0,run:false,aid:null,t:0,dir:'N'};

var SKY_VIEWS={
    N:{label:'North — Cambridge & Charles River',sky:['#4090d0','#70b0e0','#a0d0f0'],
        hills:true,river:true,riverY:0.48,
        bldgs:[
            {x:.02,w:25,h:75,c:'#889'},{x:.06,w:18,h:110,c:'#788'},{x:.1,w:30,h:88,c:'#898'},
            {x:.15,w:14,h:140,c:'#688',lbl:'MIT'},{x:.2,w:28,h:70,c:'#899'},{x:.24,w:20,h:95,c:'#889'},
            {x:.3,w:35,h:65,c:'#998'},{x:.35,w:15,h:120,c:'#689'},{x:.4,w:25,h:82,c:'#899'},
            {x:.45,w:20,h:100,c:'#789'},{x:.5,w:30,h:75,c:'#898'},{x:.55,w:18,h:60,c:'#989'},
            {x:.6,w:22,h:105,c:'#689'},{x:.65,w:28,h:70,c:'#899'},{x:.7,w:15,h:130,c:'#688',lbl:'Hancock'},
            {x:.75,w:25,h:85,c:'#789'},{x:.8,w:20,h:60,c:'#998'},{x:.85,w:30,h:95,c:'#889'},
            {x:.9,w:22,h:72,c:'#899'},{x:.95,w:18,h:55,c:'#989'}
        ]},
    E:{label:'East — Harbor & Seaport',sky:['#5098c8','#80b8d8','#b0d8e8'],
        hills:false,river:false,harbor:true,
        bldgs:[
            {x:.02,w:28,h:95,c:'#8a8890'},{x:.08,w:18,h:130,c:'#7a7888',lbl:'Custom\nHouse'},
            {x:.13,w:35,h:75,c:'#9a9090'},{x:.18,w:22,h:105,c:'#8a8880'},{x:.24,w:15,h:60,c:'#a09898'},
            {x:.3,w:30,h:85,c:'#888890'},{x:.36,w:20,h:115,c:'#7a7880'},{x:.42,w:40,h:70,c:'#989890'},
            {x:.48,w:25,h:90,c:'#888'},{x:.55,w:18,h:55,c:'#a09898'},{x:.6,w:30,h:75,c:'#8a8890'},
            {x:.66,w:22,h:100,c:'#7a7888'},{x:.72,w:35,h:65,c:'#9a9890'},{x:.78,w:20,h:85,c:'#888890'},
            {x:.84,w:15,h:50,c:'#a09090'},{x:.9,w:28,h:70,c:'#8a8880'}
        ]},
    S:{label:'South — Fenway & Huntington',sky:['#4a8ac0','#78b0d8','#a8c8e8'],
        hills:true,river:false,
        bldgs:[
            {x:.02,w:22,h:70,c:'#889'},{x:.07,w:30,h:95,c:'#798'},
            {x:.13,w:18,h:60,c:'#989'},{x:.18,w:25,h:80,c:'#889'},
            {x:.24,w:35,h:110,c:'#688',lbl:'Pru\nTower'},{x:.3,w:20,h:65,c:'#899'},
            {x:.36,w:28,h:85,c:'#789'},{x:.42,w:15,h:50,c:'#999'},{x:.47,w:30,h:75,c:'#889'},
            {x:.53,w:22,h:95,c:'#799'},{x:.58,w:18,h:55,c:'#989'},{x:.64,w:25,h:70,c:'#889'},
            {x:.7,w:20,h:85,c:'#899'},{x:.76,w:30,h:60,c:'#989'},{x:.82,w:22,h:90,c:'#789'},
            {x:.88,w:15,h:50,c:'#a99'},{x:.93,w:28,h:70,c:'#889'}
        ],park:true},
    W:{label:'West — Back Bay & Brookline',sky:['#c09060','#d8a870','#e0c898'],
        hills:true,river:true,riverY:0.52,sunset:true,
        bldgs:[
            {x:.02,w:25,h:80,c:'#887870'},{x:.07,w:18,h:65,c:'#988878'},
            {x:.12,w:30,h:100,c:'#786860'},{x:.18,w:22,h:70,c:'#887870'},
            {x:.24,w:15,h:120,c:'#686060',lbl:'One\nDalton'},{x:.3,w:28,h:55,c:'#988878'},
            {x:.36,w:20,h:85,c:'#887870'},{x:.42,w:35,h:65,c:'#988870'},
            {x:.48,w:18,h:95,c:'#786868'},{x:.54,w:25,h:55,c:'#988878'},
            {x:.6,w:22,h:75,c:'#887870'},{x:.66,w:30,h:50,c:'#989078'},
            {x:.72,w:18,h:65,c:'#887870'},{x:.78,w:25,h:45,c:'#988878'},
            {x:.84,w:20,h:55,c:'#887860'},{x:.9,w:30,h:40,c:'#988878'}
        ]}
};

function initSkywalk(){
    SK.cvs=document.getElementById('skywalk-cvs');
    if(!SK.cvs)return;
    resizeSK();
    SK.ctx=SK.cvs.getContext('2d');
    SK.t=0;SK.dir='N';
    // Direction buttons
    var dd=document.getElementById('sky-dir');
    dd.innerHTML='';
    ['N','E','S','W'].forEach(function(d){
        var b=document.createElement('button');
        b.className='dir-btn'+(d==='N'?' active':'');
        b.innerText={N:'⬆ North',E:'➡ East',S:'⬇ South',W:'⬅ West'}[d];
        b.onclick=function(){SK.dir=d;dd.querySelectorAll('.dir-btn').forEach(function(bb){bb.classList.toggle('active',bb===b);});};
        dd.appendChild(b);
    });
    window.addEventListener('resize',resizeSK);
    if(!SK.run){SK.run=true;skLoop();}
}
function resizeSK(){
    if(!SK.cvs)return;
    var p=SK.cvs.parentElement;
    SK.W=p.clientWidth||440;SK.H=p.clientHeight||500;
    SK.cvs.width=SK.W;SK.cvs.height=SK.H;
}
function stopSkywalk(){SK.run=false;if(SK.aid)cancelAnimationFrame(SK.aid);window.removeEventListener('resize',resizeSK);}
function skLoop(){if(!SK.run)return;SK.t++;skDraw();SK.aid=requestAnimationFrame(skLoop);}

function skDraw(){
    var c=SK.ctx,W=SK.W,H=SK.H,t=SK.t;
    if(!c)return;
    var v=SKY_VIEWS[SK.dir];

    // Sky
    var sky=c.createLinearGradient(0,0,0,H*0.48);
    sky.addColorStop(0,v.sky[0]);sky.addColorStop(0.5,v.sky[1]);sky.addColorStop(1,v.sky[2]);
    c.fillStyle=sky;c.fillRect(0,0,W,H*0.5);

    // Sun/sunset glow
    if(v.sunset){
        var sg=c.createRadialGradient(W*0.3,H*0.35,10,W*0.3,H*0.35,H*0.3);
        sg.addColorStop(0,'rgba(255,180,80,.3)');sg.addColorStop(1,'transparent');
        c.fillStyle=sg;c.beginPath();c.arc(W*0.3,H*0.35,H*0.3,0,Math.PI*2);c.fill();
        c.fillStyle='#f8c860';c.beginPath();c.arc(W*0.3,H*0.35,12,0,Math.PI*2);c.fill();
    }

    // Clouds
    c.fillStyle='rgba(255,255,255,'+(v.sunset?'.35':'.5')+')';
    for(var ci=0;ci<8;ci++){
        var cx=(ci*W/6+t*0.12)%(W+120)-60;
        var cy=H*0.06+ci*H*0.035;
        c.beginPath();c.ellipse(cx,cy,W*0.08,H*0.02,0,0,Math.PI*2);c.fill();
        c.beginPath();c.ellipse(cx+W*0.03,cy-H*0.008,W*0.05,H*0.016,0,0,Math.PI*2);c.fill();
    }

    // Mountains
    if(v.hills){
        c.fillStyle=v.sunset?'#8a7060':'#90a898';
        c.beginPath();c.moveTo(0,H*0.44);
        for(var hx=0;hx<=W;hx+=W/15)c.lineTo(hx,H*0.40+Math.sin(hx*0.008+SK.dir.charCodeAt(0))*H*0.03);
        c.lineTo(W,H*0.48);c.lineTo(0,H*0.48);c.fill();
    }

    // River/Harbor
    if(v.river){
        var ry=v.riverY||0.48;
        c.fillStyle=v.sunset?'#c08848':'#4a90b8';
        c.fillRect(0,H*ry,W,H*0.04);
        c.strokeStyle='rgba(255,255,255,.1)';c.lineWidth=0.5;
        for(var rr=0;rr<3;rr++){c.beginPath();for(var rx=0;rx<W;rx+=4){var yo=Math.sin(rx*0.05+t*0.04+rr)*1.5;if(rx===0)c.moveTo(rx,H*ry+rr*H*0.012+yo);else c.lineTo(rx,H*ry+rr*H*0.012+yo);}c.stroke();}
    }
    if(v.harbor){
        c.fillStyle='#4888a8';c.fillRect(0,H*0.46,W,H*0.06);
        // Boats
        c.fillStyle='#f0f0e0';
        for(var bi=0;bi<4;bi++){
            var bx=(bi*W/3+t*0.2)%(W+40)-20;
            c.beginPath();c.moveTo(bx,H*0.48);c.lineTo(bx+10,H*0.48);c.lineTo(bx+8,H*0.49);c.lineTo(bx+2,H*0.49);c.fill();
            c.fillRect(bx+5,H*0.46,1,H*0.02);
        }
    }

    // Parks
    if(v.park){
        c.fillStyle='#5a9848';
        c.beginPath();c.ellipse(W*0.2,H*0.52,W*0.08,H*0.015,0,0,Math.PI*2);c.fill();
        c.beginPath();c.ellipse(W*0.7,H*0.51,W*0.06,H*0.012,0,0,Math.PI*2);c.fill();
    }

    // Streets
    c.fillStyle='#c0b8a8';c.fillRect(0,H*0.53,W,H*0.04);

    // === BUILDINGS ===
    var baseY=H*0.56;
    v.bldgs.forEach(function(b){
        var bx=b.x*W,bw=b.w*(W/440),bh=b.h*(H/420);
        c.fillStyle='rgba(0,0,0,.06)';c.fillRect(bx+2,baseY-bh+2,bw,bh);
        var bg=c.createLinearGradient(bx,0,bx+bw,0);
        bg.addColorStop(0,b.c);bg.addColorStop(0.3,lc(b.c,12));bg.addColorStop(1,dc(b.c,8));
        c.fillStyle=bg;c.fillRect(bx,baseY-bh,bw,bh);
        c.fillStyle=dc(b.c,12);c.fillRect(bx,baseY-bh,bw,2);
        // Windows
        if(bh>H*0.08){
            for(var wy=baseY-bh+5;wy<baseY-3;wy+=4){
                for(var wx=bx+2;wx<bx+bw-2;wx+=4){
                    c.fillStyle=(wx*3+wy*7)%19<3?'rgba(255,240,180,.5)':'rgba(160,200,240,.3)';
                    c.fillRect(wx,wy,2,2.5);
                }
            }
        }
        if(b.lbl){c.fillStyle='rgba(255,255,255,.6)';c.font='600 '+(W*0.015)+'px sans-serif';c.textAlign='center';c.fillText(b.lbl.split('\n')[0],bx+bw/2,baseY-bh-3);c.textAlign='left';}
    });

    // Trees
    c.fillStyle='#4a8838';for(var ti=0;ti<20;ti++){c.beginPath();c.arc(ti*(W/19),H*0.545,W*0.006,0,Math.PI*2);c.fill();}
    // Cars
    for(var cri=0;cri<12;cri++){c.fillStyle=cri%3===0?'#c33':cri%3===1?'#36c':'#eee';c.fillRect((cri*W/10+t*(cri%2?.3:-.25))%W,H*0.535+cri%2*H*0.008,W*0.012,H*0.005);}

    // Far ground
    c.fillStyle='#b0b8a0';c.fillRect(0,baseY,W,H);

    // === GLASS PANELS ===
    for(var gi=0;gi<6;gi++){
        var gx=gi*(W/5.5)-W*0.01;
        c.fillStyle='rgba(180,210,230,.04)';c.fillRect(gx,0,W/6,H*0.84);
        c.fillStyle='rgba(150,160,170,.25)';c.fillRect(gx,0,1.5,H*0.84);
        c.fillStyle='rgba(255,255,255,.03)';c.fillRect(gx+W*0.015,0,W*0.025,H*0.84);
    }
    c.fillStyle='rgba(100,110,120,.3)';c.fillRect(0,0,W,2.5);
    c.fillStyle='rgba(140,150,160,.25)';c.fillRect(0,H*0.84-2,W,4);

    // === FLOOR ===
    var flr=c.createLinearGradient(0,H*0.84,0,H);
    flr.addColorStop(0,'#2a2838');flr.addColorStop(1,'#181828');
    c.fillStyle=flr;c.fillRect(0,H*0.84,W,H*0.16);
    c.strokeStyle='rgba(255,255,255,.02)';c.lineWidth=0.5;
    for(var fx=0;fx<W;fx+=W/15){c.beginPath();c.moveTo(fx,H*0.84);c.lineTo(fx,H);c.stroke();}
    c.fillStyle='rgba(100,160,200,.03)';c.fillRect(0,H*0.84,W,H*0.06);

    // Characters
    var cf=typeof crowFound!=='undefined'&&crowFound;
    c.font=(H*0.05)+'px sans-serif';c.textAlign='center';
    c.fillText('⚡',W*0.35,H*0.95);
    if(cf)c.fillText('🐦‍⬛',W*0.55,H*0.95);

    // Telescope
    c.fillStyle='#555';c.fillRect(W*0.78,H*0.88,2,H*0.06);c.fillRect(W*0.78-6,H*0.87,14,5);
    c.fillStyle='#444';c.beginPath();c.arc(W*0.78,H*0.865,4,0,Math.PI*2);c.fill();

    // Direction label
    c.fillStyle='rgba(255,255,255,.45)';c.font='700 '+(W*0.022)+'px Nunito';
    c.fillText('🔭 '+v.label,W/2,H*0.04);

    // Compass rose
    var ccx=W-35,ccy=H*0.84+25;
    c.fillStyle='rgba(255,255,255,.15)';c.beginPath();c.arc(ccx,ccy,18,0,Math.PI*2);c.fill();
    c.fillStyle='rgba(255,255,255,.5)';c.font='700 8px sans-serif';
    ['N','E','S','W'].forEach(function(d,i){
        var ang=i*Math.PI/2-Math.PI/2;
        var dx2=Math.cos(ang)*12,dy2=Math.sin(ang)*12;
        c.fillStyle=SK.dir===d?'#ffc860':'rgba(255,255,255,.4)';
        c.fillText(d,ccx+dx2-3,ccy+dy2+3);
    });
    c.textAlign='left';
}

function lc(h,n){var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return'rgb('+Math.min(255,r+n)+','+Math.min(255,g+n)+','+Math.min(255,b+n)+')';}
function dc(h,n){var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return'rgb('+Math.max(0,r-n)+','+Math.max(0,g-n)+','+Math.max(0,b-n)+')';}

// =============================================
// 2. STARGAZING — fullscreen, rich nebula, click-to-fall
// =============================================
var SG={cvs:null,ctx:null,W:0,H:0,run:false,aid:null,t:0,
    stars:[],fallers:[],nebulae:[],traced:[],tracing:null,selected:[]};

var CONSTELLATIONS=[
    {name:'The Snack',pts:[[.18,.12],[.25,.08],[.33,.1],[.3,.18],[.22,.17]],col:'#ffd740'},
    {name:'The Nap',pts:[[.45,.15],[.53,.1],[.62,.12],[.6,.2],[.5,.22]],col:'#ff69b4'},
    {name:'Crow Wing',pts:[[.74,.13],[.8,.08],[.9,.1],[.87,.19],[.78,.2],[.74,.13]],col:'#87ceeb'},
    {name:'Pika Bolt',pts:[[.14,.38],[.19,.33],[.24,.39],[.2,.46],[.15,.43]],col:'#ffa500'},
    {name:'The Scooter',pts:[[.58,.42],[.66,.38],[.73,.4],[.7,.48],[.62,.49]],col:'#98fb98'},
    {name:'Heart Cloud',pts:[[.34,.58],[.39,.53],[.46,.56],[.43,.62],[.37,.62]],col:'#ff69b4'},
];

function initStargaze(){
    SG.cvs=document.getElementById('star-cvs');
    if(!SG.cvs)return;
    resizeSG();
    SG.ctx=SG.cvs.getContext('2d');
    SG.t=0;SG.traced=[];SG.tracing=null;SG.selected=[];SG.fallers=[];

    SG.nebulae=[];
    for(var ni=0;ni<18;ni++){
        SG.nebulae.push({
            x:Math.random(),y:Math.random()*0.8,
            rx:.08+Math.random()*.15,ry:.06+Math.random()*.1,
            col:['rgba(60,40,160,.12)','rgba(30,70,180,.1)','rgba(120,40,140,.08)',
                 'rgba(40,90,200,.1)','rgba(160,50,160,.06)','rgba(20,110,200,.08)',
                 'rgba(80,30,160,.1)','rgba(100,80,220,.08)','rgba(60,50,180,.12)'][ni%9],
            rot:Math.random()*Math.PI
        });
    }
    SG.stars=[];
    for(var si=0;si<500;si++){
        SG.stars.push({
            x:Math.random(),y:Math.random()*0.82,
            r:0.3+Math.random()*2,
            twinkle:Math.random()*Math.PI*2,
            speed:0.012+Math.random()*0.04,
            bright:0.25+Math.random()*0.75,
            col:si%15===0?'#aac8ff':si%25===0?'#ffd8a8':si%40===0?'#ffaaaa':'#fff',
            falling:false
        });
    }
    CONSTELLATIONS.forEach(function(cn){
        cn.pts.forEach(function(pt){
            SG.stars.push({x:pt[0],y:pt[1],r:3,twinkle:0,speed:0.05,bright:1,col:'#fff',isCon:true,con:cn.name,falling:false});
        });
    });
    SG.cvs.onclick=function(e){
        var r=SG.cvs.getBoundingClientRect();
        var cx=(e.clientX-r.left)/r.width;
        var cy=(e.clientY-r.top)/r.height;
        var hitCon=false;
        SG.stars.forEach(function(s){
            if(!s.isCon||s.falling)return;
            if(Math.abs(s.x-cx)<.04&&Math.abs(s.y-cy)<.04){
                hitCon=true;
                var cn=CONSTELLATIONS.find(function(c2){return c2.name===s.con;});
                if(!cn)return;
                if(SG.tracing!==cn.name){SG.tracing=cn.name;SG.selected=[];}
                var idx=cn.pts.findIndex(function(p){return p[0]===s.x&&p[1]===s.y;});
                if(idx>=0&&SG.selected.indexOf(idx)<0){
                    SG.selected.push(idx);
                    if(SG.selected.length===cn.pts.length){
                        SG.traced.push(cn.name);SG.tracing=null;SG.selected=[];
                        var info=document.getElementById('star-info');
                        if(info)info.innerText='✨ "'+cn.name+'" traced! ('+SG.traced.length+'/'+CONSTELLATIONS.length+')';
                    }
                }
            }
        });
        if(!hitCon){
            var best=null,bestD=.05;
            SG.stars.forEach(function(s){if(s.isCon||s.falling)return;var d=Math.hypot(s.x-cx,s.y-cy);if(d<bestD){bestD=d;best=s;}});
            if(best){
                best.falling=true;best.bright=0;
                SG.fallers.push({x:best.x,y:best.y,vx:.003+Math.random()*.006,vy:.004+Math.random()*.005,r:best.r,col:best.col,trail:[],life:1});
            }
        }
    };
    window.addEventListener('resize',resizeSG);
    if(!SG.run){SG.run=true;sgLoop();}
}
function resizeSG(){if(!SG.cvs)return;var p=SG.cvs.parentElement;SG.W=p.clientWidth||440;SG.H=p.clientHeight||500;SG.cvs.width=SG.W;SG.cvs.height=SG.H;}
function stopStargaze(){SG.run=false;if(SG.aid)cancelAnimationFrame(SG.aid);window.removeEventListener('resize',resizeSG);}

function sgLoop(){
    if(!SG.run)return;SG.t++;
    if(Math.random()<.005)SG.fallers.push({x:Math.random()*.7,y:Math.random()*.1,vx:.005+Math.random()*.008,vy:.003+Math.random()*.004,r:1.5,col:'#fff',trail:[],life:1});
    SG.fallers=SG.fallers.filter(function(f){f.trail.push({x:f.x,y:f.y,a:f.life});if(f.trail.length>30)f.trail.shift();f.x+=f.vx;f.y+=f.vy;f.vy+=.0001;f.life-=.015;return f.life>0&&f.y<1;});
    sgDraw();SG.aid=requestAnimationFrame(sgLoop);
}

function sgDraw(){
    var c=SG.ctx,W=SG.W,H=SG.H,t=SG.t;if(!c)return;

    // Deep sky
    var sky=c.createLinearGradient(0,0,0,H*.85);
    sky.addColorStop(0,'#050520');sky.addColorStop(0.15,'#080830');sky.addColorStop(0.4,'#0c1045');sky.addColorStop(0.7,'#101850');sky.addColorStop(1,'#152058');
    c.fillStyle=sky;c.fillRect(0,0,W,H*.85);

    // Nebulae
    SG.nebulae.forEach(function(n){
        c.save();c.translate(n.x*W,n.y*H);c.rotate(n.rot);
        var ng=c.createRadialGradient(0,0,0,0,0,n.rx*W);
        ng.addColorStop(0,n.col);ng.addColorStop(1,'transparent');
        c.fillStyle=ng;c.beginPath();c.ellipse(0,0,n.rx*W,n.ry*H,0,0,Math.PI*2);c.fill();
        c.restore();
    });

    // Milky Way
    c.save();c.translate(W*.35,0);c.rotate(.35);
    var mw=c.createLinearGradient(-W*.1,0,W*.1,0);
    mw.addColorStop(0,'transparent');mw.addColorStop(.2,'rgba(80,60,180,.08)');
    mw.addColorStop(.4,'rgba(60,80,220,.14)');mw.addColorStop(.5,'rgba(120,60,200,.16)');
    mw.addColorStop(.6,'rgba(60,80,220,.14)');mw.addColorStop(.8,'rgba(80,60,180,.08)');
    mw.addColorStop(1,'transparent');
    c.fillStyle=mw;c.fillRect(-W*.12,-40,W*.24,H+80);
    c.fillStyle='rgba(255,255,255,.25)';
    for(var mi=0;mi<150;mi++){c.beginPath();c.arc((mi*17)%Math.round(W*.2)-W*.1,(mi*31)%H,.3+mi%3*.3,0,Math.PI*2);c.fill();}
    c.restore();

    // Stars
    SG.stars.forEach(function(s){
        if(s.bright<=0)return;
        var tw=(Math.sin(s.twinkle+t*s.speed)+1)/2;
        var alpha=s.bright*(.35+tw*.65);
        c.globalAlpha=alpha;
        var sx=s.x*W,sy=s.y*H;
        if(s.isCon){
            var traced=SG.traced.indexOf(s.con)>=0;
            c.fillStyle=traced?'#ffd740':'#fff';
            c.shadowColor=traced?'#ffd740':'#88aaff';c.shadowBlur=traced?12:8;
            c.beginPath();c.arc(sx,sy,s.r,0,Math.PI*2);c.fill();c.shadowBlur=0;
        } else {
            c.fillStyle=s.col;c.beginPath();c.arc(sx,sy,s.r,0,Math.PI*2);c.fill();
            if(s.r>1.5&&tw>.7){
                c.strokeStyle=s.col;c.lineWidth=.5;c.globalAlpha=alpha*.3;
                var sl=s.r*4;
                c.beginPath();c.moveTo(sx-sl,sy);c.lineTo(sx+sl,sy);c.stroke();
                c.beginPath();c.moveTo(sx,sy-sl);c.lineTo(sx,sy+sl);c.stroke();
            }
        }
    });
    c.globalAlpha=1;c.shadowBlur=0;

    // Traced constellations
    CONSTELLATIONS.forEach(function(cn){
        if(SG.traced.indexOf(cn.name)<0)return;
        c.strokeStyle=cn.col;c.lineWidth=1.5;c.globalAlpha=.55;c.setLineDash([3,3]);
        c.beginPath();cn.pts.forEach(function(pt,i){if(i===0)c.moveTo(pt[0]*W,pt[1]*H);else c.lineTo(pt[0]*W,pt[1]*H);});c.stroke();c.setLineDash([]);
        var mx2=cn.pts.reduce(function(s2,p){return s2+p[0];},0)/cn.pts.length*W;
        var my2=cn.pts.reduce(function(s2,p){return s2+p[1];},0)/cn.pts.length*H;
        c.fillStyle=cn.col;c.font='700 '+(W*.02)+'px Nunito';c.textAlign='center';c.globalAlpha=.7;
        c.fillText('"'+cn.name+'"',mx2,my2+H*.04);c.textAlign='left';
    });
    c.globalAlpha=1;
    // Tracing
    if(SG.tracing){var cn2=CONSTELLATIONS.find(function(cc){return cc.name===SG.tracing;});if(cn2&&SG.selected.length>1){c.strokeStyle=cn2.col;c.lineWidth=2;c.globalAlpha=.5;c.beginPath();SG.selected.forEach(function(idx,i){var pt=cn2.pts[idx];if(i===0)c.moveTo(pt[0]*W,pt[1]*H);else c.lineTo(pt[0]*W,pt[1]*H);});c.stroke();c.globalAlpha=1;}}

    // Falling stars
    SG.fallers.forEach(function(f){
        for(var fi=0;fi<f.trail.length;fi++){var tr=f.trail[fi];c.globalAlpha=tr.a*(fi/f.trail.length)*.6;c.fillStyle=f.col;c.beginPath();c.arc(tr.x*W,tr.y*H,Math.max(.3,f.r*(1-fi/f.trail.length)),0,Math.PI*2);c.fill();}
        c.globalAlpha=f.life;c.shadowColor='#fff';c.shadowBlur=10;c.fillStyle='#fff';c.beginPath();c.arc(f.x*W,f.y*H,f.r*1.3,0,Math.PI*2);c.fill();c.shadowBlur=0;
    });
    c.globalAlpha=1;

    // Moon
    var mx=W*.88,my=H*.1,mr=W*.035;
    var mg=c.createRadialGradient(mx-2,my-2,1,mx,my,mr*1.8);
    mg.addColorStop(0,'rgba(255,252,230,.12)');mg.addColorStop(1,'transparent');
    c.fillStyle=mg;c.beginPath();c.arc(mx,my,mr*1.8,0,Math.PI*2);c.fill();
    c.fillStyle='#f0ecd0';c.beginPath();c.arc(mx,my,mr,0,Math.PI*2);c.fill();
    c.fillStyle='rgba(180,175,150,.2)';c.beginPath();c.arc(mx-mr*.2,my-mr*.15,mr*.18,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(mx+mr*.3,my+mr*.1,mr*.13,0,Math.PI*2);c.fill();

    // Grass hill
    var grs=c.createLinearGradient(0,H*.82,0,H);
    grs.addColorStop(0,'#0a1828');grs.addColorStop(.3,'#0c1a22');grs.addColorStop(1,'#081018');
    c.fillStyle=grs;
    c.beginPath();c.moveTo(0,H*.87);c.quadraticCurveTo(W*.3,H*.82,W*.5,H*.86);c.quadraticCurveTo(W*.7,H*.83,W,H*.85);c.lineTo(W,H);c.lineTo(0,H);c.fill();
    // Grass
    c.strokeStyle='rgba(20,40,30,.5)';c.lineWidth=1;
    for(var gi=0;gi<80;gi++){var gx=gi*(W/79),gy=H*.86+Math.sin(gx*.03)*H*.012;var sw=Math.sin(t*.02+gi*.3)*W*.005;c.beginPath();c.moveTo(gx,gy);c.quadraticCurveTo(gx+sw,gy-H*.02,gx+sw*1.5,gy-H*.035);c.stroke();}

    // Chars
    var cf=typeof crowFound!=='undefined'&&crowFound;
    c.font=(H*.045)+'px sans-serif';c.textAlign='center';
    c.fillText('⚡',W*.55,H*.92);if(cf)c.fillText('🐦‍⬛',W*.65,H*.91);

    // Telescope
    c.fillStyle='#3a3a48';c.save();c.translate(W*.38,H*.88);c.rotate(-.55);
    c.fillRect(0,-2,W*.06,3);c.fillRect(W*.055,-3,W*.015,6);c.restore();
    c.strokeStyle='#333';c.lineWidth=1.5;
    c.beginPath();c.moveTo(W*.38,H*.88);c.lineTo(W*.36,H*.96);c.stroke();
    c.beginPath();c.moveTo(W*.38,H*.88);c.lineTo(W*.40,H*.96);c.stroke();
    c.beginPath();c.moveTo(W*.38,H*.88);c.lineTo(W*.38,H*.97);c.stroke();
    c.textAlign='left';
}

// =============================================
// 3. MALL (unchanged)
// =============================================
var mallShops=[
    {name:'Sephora',emoji:'💄',items:[{name:'Rose Perfume',emoji:'🌹',price:28},{name:'Lip Gloss Set',emoji:'💋',price:18},{name:'Skincare Kit',emoji:'🧴',price:35}]},
    {name:'Apple Store',emoji:'🍎',items:[{name:'AirPods',emoji:'🎧',price:129},{name:'iPhone Case',emoji:'📱',price:39},{name:'Watch Band',emoji:'⌚',price:49}]},
    {name:'Zara',emoji:'👗',items:[{name:'Denim Jacket',emoji:'🧥',price:69},{name:'Summer Dress',emoji:'👗',price:45},{name:'Sneakers',emoji:'👟',price:59}]},
    {name:'Barnes & Noble',emoji:'📚',items:[{name:'Bestseller Novel',emoji:'📖',price:16},{name:'Journal Set',emoji:'📓',price:12},{name:'Cozy Candle',emoji:'🕯️',price:22}]},
    {name:'Eataly',emoji:'🍝',items:[{name:'Truffle Pasta',emoji:'🍝',price:18},{name:'Gelato Cup',emoji:'🍨',price:7},{name:'Espresso',emoji:'☕',price:5}]},
];
var mallCart=[],mallView='shops',mallShopIdx=0;
function buildMall(){renderMall();}
function renderMall(){
    var p=document.getElementById('prumall-panel');if(!p)return;
    if(mallView==='shops'){var h='<div class="panel-title">🛍️ Shops at Prudential</div>';for(var si=0;si<mallShops.length;si++)h+='<button class="choice-btn" onclick="mallShopIdx='+si+';mallView=\'items\';renderMall()"><span class="ce">'+mallShops[si].emoji+'</span>'+mallShops[si].name+'</button>';if(mallCart.length>0){h+='<div style="margin-top:12px;border-top:2px dashed var(--lpink);padding-top:10px;"><div style="font-size:.7rem;font-weight:900;color:#8b005d;margin-bottom:6px;">🛍️ Bag ('+mallCart.length+')</div>';var tot=0;for(var i=0;i<mallCart.length;i++){tot+=mallCart[i].price;h+='<div style="display:flex;justify-content:space-between;font-size:.65rem;font-weight:700;padding:2px 0;color:#666;"><span>'+mallCart[i].emoji+' '+mallCart[i].name+'</span><span>$'+mallCart[i].price+' <span style="color:red;cursor:pointer;" onclick="mallCart.splice('+i+',1);renderMall()">✕</span></span></div>';}h+='<div style="font-size:.8rem;font-weight:900;color:#ff1493;margin-top:6px;">Total: $'+tot+'</div><button class="action-btn" onclick="mallCheckout()">Checkout 💳</button></div>';}p.innerHTML=h;
    } else if(mallView==='items'){var shop=mallShops[mallShopIdx];var h='<div class="panel-title">'+shop.emoji+' '+shop.name+'</div><button class="back-btn" onclick="mallView=\'shops\';renderMall()" style="margin-bottom:8px;">← Shops</button>';for(var ii=0;ii<shop.items.length;ii++){var it=shop.items[ii];h+='<div class="menu-item" style="text-align:left;cursor:pointer;" onclick="mallAddItem('+ii+')"><div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:1.2rem;">'+it.emoji+'</span> <strong>'+it.name+'</strong><span style="font-weight:900;color:#ff1493;">$'+it.price+'</span></div></div>';}p.innerHTML=h;
    } else {var cf=typeof crowFound!=='undefined'&&crowFound;var em='';for(var i=0;i<mallCart.length;i++)em+=mallCart[i].emoji+' ';p.innerHTML='<div style="text-align:center;padding:20px;"><div style="font-size:3rem;">🛍️✨</div><div class="panel-title">Shopping spree!</div><div style="font-size:2rem;margin:12px 0;">'+em+'</div><div style="font-size:.8rem;color:#888;font-weight:700;">'+(cf?'Pika & Crow ⚡🐦‍⬛':'Pika carries bags ⚡🛍️')+'</div><button class="action-btn" onclick="mallCart=[];mallView=\'shops\';renderMall()">Shop More</button><button class="action-btn sec" onclick="show(\'screen-prudential\')">Back</button></div>';}
}
function mallAddItem(idx){mallCart.push({name:mallShops[mallShopIdx].items[idx].name,emoji:mallShops[mallShopIdx].items[idx].emoji,price:mallShops[mallShopIdx].items[idx].price});mallView='shops';renderMall();}
function mallCheckout(){mallView='done';renderMall();}
buildMall();
