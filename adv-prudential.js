// =============================================
// PRUDENTIAL CENTER — Skywalk + Stargazing + Mall
// =============================================

// =============================================
// 1. SKYWALK — glass observation deck, dense cityscape
// =============================================
var SK = { cvs:null,ctx:null,W:440,H:420,run:false,aid:null,panX:0,dragging:false,lastX:0,t:0 };
var SKY_W = 1400;

function initSkywalk(){
    SK.cvs=document.getElementById('skywalk-cvs');
    if(!SK.cvs)return;
    SK.cvs.width=SK.W;SK.cvs.height=SK.H;
    SK.ctx=SK.cvs.getContext('2d');
    SK.panX=-200;SK.t=0;
    SK.cvs.onmousedown=function(e){SK.dragging=true;SK.lastX=e.clientX;};
    SK.cvs.onmousemove=function(e){if(!SK.dragging)return;SK.panX=Math.max(-(SKY_W-SK.W),Math.min(0,SK.panX+(e.clientX-SK.lastX)));SK.lastX=e.clientX;};
    SK.cvs.onmouseup=function(){SK.dragging=false;};
    SK.cvs.ontouchstart=function(e){e.preventDefault();SK.dragging=true;SK.lastX=e.touches[0].clientX;};
    SK.cvs.ontouchmove=function(e){e.preventDefault();if(!SK.dragging)return;SK.panX=Math.max(-(SKY_W-SK.W),Math.min(0,SK.panX+(e.touches[0].clientX-SK.lastX)));SK.lastX=e.touches[0].clientX;};
    SK.cvs.ontouchend=function(e){e.preventDefault();SK.dragging=false;};
    if(!SK.run){SK.run=true;skLoop();}
}
function stopSkywalk(){SK.run=false;if(SK.aid)cancelAnimationFrame(SK.aid);}
function skLoop(){if(!SK.run)return;SK.t++;skDraw();SK.aid=requestAnimationFrame(skLoop);}

function skDraw(){
    var c=SK.ctx,W=SK.W,H=SK.H,px=SK.panX,t=SK.t;
    c.fillStyle='#1a1a28';c.fillRect(0,0,W,H);

    c.save();
    c.beginPath();c.rect(0,0,W,H-65);c.clip();
    c.translate(px,0);

    // Sky
    var sky=c.createLinearGradient(0,0,0,180);
    sky.addColorStop(0,'#3a88cc');sky.addColorStop(0.4,'#68b0e0');sky.addColorStop(0.7,'#90c8e8');sky.addColorStop(1,'#c0ddf0');
    c.fillStyle=sky;c.fillRect(0,0,SKY_W,200);

    // Fluffy clouds
    for(var ci=0;ci<12;ci++){
        var cx=(ci*130+t*0.15)%(SKY_W+150)-75;
        var cy=20+ci*10+(ci%3)*8;
        var cw=40+ci*5;
        c.fillStyle='rgba(255,255,255,'+(0.5+ci%3*0.15)+')';
        c.beginPath();c.ellipse(cx,cy,cw,14+ci%2*4,0,0,Math.PI*2);c.fill();
        c.beginPath();c.ellipse(cx-cw*0.3,cy-4,cw*0.5,10,0,0,Math.PI*2);c.fill();
        c.beginPath();c.ellipse(cx+cw*0.35,cy-2,cw*0.4,11,0,0,Math.PI*2);c.fill();
    }

    // Distant mountains
    c.fillStyle='#8aaa98';
    c.beginPath();c.moveTo(0,195);
    for(var mx=0;mx<SKY_W;mx+=40)c.lineTo(mx,180+Math.sin(mx*0.005)*12+Math.sin(mx*0.013)*6);
    c.lineTo(SKY_W,200);c.lineTo(0,200);c.fill();

    // Charles River
    c.fillStyle='#4a90b8';
    c.beginPath();c.moveTo(250,195);c.quadraticCurveTo(450,185,650,192);
    c.quadraticCurveTo(850,188,1050,195);c.lineTo(1050,210);c.lineTo(250,210);c.fill();
    // River shimmer
    c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=0.5;
    for(var ry=196;ry<209;ry+=3){c.beginPath();for(var rx=260;rx<1040;rx+=4){var yo=Math.sin(rx*0.06+t*0.04+ry)*1;if(rx===260)c.moveTo(rx,ry+yo);else c.lineTo(rx,ry+yo);}c.stroke();}

    // Parks (green patches)
    c.fillStyle='#5a9848';
    c.beginPath();c.ellipse(500,218,50,12,0,0,Math.PI*2);c.fill();
    c.beginPath();c.ellipse(100,222,35,8,0,0,Math.PI*2);c.fill();
    c.beginPath();c.ellipse(900,220,40,10,0,0,Math.PI*2);c.fill();

    // Ground / streets
    c.fillStyle='#c8c0b0';c.fillRect(0,225,SKY_W,22);

    // === DENSE CITYSCAPE (60+ buildings) ===
    var bldgs=[
        // Tall landmarks
        {x:140,w:16,h:165,c:'#7888a0'},{x:200,w:22,h:140,c:'#8898a8'},{x:370,w:18,h:155,c:'#6878a0'},
        {x:550,w:14,h:170,c:'#7080a8'},{x:880,w:20,h:148,c:'#7a8898'},{x:1080,w:16,h:160,c:'#6a7890'},
        // Medium towers
        {x:30,w:28,h:90,c:'#909898'},{x:70,w:22,h:110,c:'#888890'},{x:110,w:18,h:75,c:'#a0a098'},
        {x:165,w:30,h:95,c:'#989090'},{x:235,w:25,h:105,c:'#888888'},{x:275,w:20,h:80,c:'#989898'},
        {x:310,w:32,h:115,c:'#808088'},{x:345,w:15,h:70,c:'#a09898'},{x:400,w:28,h:85,c:'#909090'},
        {x:435,w:20,h:95,c:'#8a8a90'},{x:470,w:35,h:75,c:'#989090'},{x:510,w:18,h:110,c:'#808898'},
        {x:580,w:30,h:88,c:'#909898'},{x:620,w:22,h:100,c:'#8a8a88'},{x:655,w:16,h:65,c:'#a09890'},
        {x:690,w:28,h:105,c:'#888890'},{x:730,w:35,h:78,c:'#989898'},{x:775,w:20,h:92,c:'#8a8a98'},
        {x:810,w:25,h:70,c:'#a0a098'},{x:845,w:18,h:85,c:'#909090'},{x:920,w:30,h:95,c:'#888898'},
        {x:960,w:22,h:75,c:'#989890'},{x:995,w:28,h:108,c:'#808090'},{x:1030,w:20,h:68,c:'#a09898'},
        {x:1120,w:30,h:90,c:'#909098'},{x:1160,w:22,h:110,c:'#8a8890'},{x:1200,w:28,h:78,c:'#989090'},
        {x:1240,w:18,h:95,c:'#888888'},{x:1280,w:25,h:65,c:'#a0a090'},{x:1320,w:20,h:85,c:'#909898'},
        // Short fill
        {x:50,w:15,h:50,c:'#a8a098'},{x:250,w:12,h:45,c:'#a09898'},{x:460,w:14,h:55,c:'#a8a8a0'},
        {x:640,w:12,h:40,c:'#a09890'},{x:780,w:16,h:48,c:'#a8a098'},{x:940,w:14,h:42,c:'#a09898'},
        {x:1050,w:15,h:50,c:'#a8a8a0'},{x:1180,w:12,h:38,c:'#a09890'},{x:1350,w:14,h:45,c:'#a8a098'},
    ];
    // Sort by height (taller behind)
    bldgs.sort(function(a,b){return a.h-b.h;});
    var baseY=238;
    bldgs.forEach(function(b){
        // Shadow
        c.fillStyle='rgba(0,0,0,.08)';c.fillRect(b.x+3,baseY-b.h+3,b.w,b.h);
        // Building body - gradient for 3D look
        var bg=c.createLinearGradient(b.x,0,b.x+b.w,0);
        bg.addColorStop(0,b.c);bg.addColorStop(0.3,lc(b.c,15));bg.addColorStop(0.7,lc(b.c,8));bg.addColorStop(1,dc(b.c,10));
        c.fillStyle=bg;c.fillRect(b.x,baseY-b.h,b.w,b.h);
        // Roof line
        c.fillStyle=dc(b.c,15);c.fillRect(b.x,baseY-b.h,b.w,2);
        // Windows grid
        if(b.h>50){
            for(var wy=baseY-b.h+6;wy<baseY-4;wy+=5){
                for(var wx=b.x+3;wx<b.x+b.w-3;wx+=5){
                    // Glass reflection blue
                    c.fillStyle=(wx+wy)%17<3?'rgba(255,240,180,.5)':'rgba(160,200,240,.35)';
                    c.fillRect(wx,wy,2.5,3);
                }
            }
        }
    });

    // Trees on streets
    c.fillStyle='#4a8838';
    for(var ti=0;ti<35;ti++){c.beginPath();c.arc(ti*42+15,232,4,0,Math.PI*2);c.fill();}

    // Tiny cars
    for(var cri=0;cri<20;cri++){
        c.fillStyle=cri%3===0?'#cc3030':cri%3===1?'#3060cc':'#f0f0e0';
        c.fillRect((cri*73+t*(cri%2?0.4:-0.3)+200)%SKY_W,229+cri%2*5,6,3);
    }

    // Far ground
    c.fillStyle='#b8c0a8';c.fillRect(0,242,SKY_W,H);

    c.restore();

    // === GLASS PANEL OVERLAY ===
    // Glass panels with subtle reflections
    for(var gi=0;gi<5;gi++){
        var gx=gi*(W/4.5)-5;
        // Glass panel
        c.fillStyle='rgba(180,210,230,.06)';
        c.fillRect(gx,0,W/5,H-65);
        // Vertical frame
        c.fillStyle='rgba(150,160,170,.35)';
        c.fillRect(gx,0,2,H-65);
        // Glass reflection streak
        c.fillStyle='rgba(255,255,255,.04)';
        c.fillRect(gx+8,0,15,H-65);
    }
    // Top frame
    c.fillStyle='rgba(100,110,120,.4)';c.fillRect(0,0,W,3);
    // Bottom glass rail
    c.fillStyle='rgba(140,150,160,.3)';c.fillRect(0,H-68,W,6);

    // === OBSERVATION DECK FLOOR ===
    // Dark polished floor
    var flr=c.createLinearGradient(0,H-62,0,H);
    flr.addColorStop(0,'#2a2838');flr.addColorStop(0.3,'#222030');flr.addColorStop(1,'#1a1828');
    c.fillStyle=flr;c.fillRect(0,H-62,W,62);
    // Floor tiles
    c.strokeStyle='rgba(255,255,255,.03)';c.lineWidth=0.5;
    for(var fx=0;fx<W;fx+=30){c.beginPath();c.moveTo(fx,H-62);c.lineTo(fx,H);c.stroke();}
    // Floor reflection of sky
    c.fillStyle='rgba(100,160,200,.04)';c.fillRect(0,H-62,W,30);

    // Characters
    var cf=typeof crowFound!=='undefined'&&crowFound;
    c.font='22px sans-serif';c.textAlign='center';
    c.fillText('⚡',W*0.35,H-18);
    if(cf)c.fillText('🐦‍⬛',W*0.55,H-18);

    // Binoculars/telescope stand
    c.fillStyle='#555';c.fillRect(W*0.78,H-50,3,20);c.fillRect(W*0.78-8,H-55,19,6);
    c.fillStyle='#444';c.beginPath();c.arc(W*0.78+1.5,H-58,5,0,Math.PI*2);c.fill();

    // Pan indicator
    c.fillStyle='rgba(255,255,255,.1)';c.fillRect(15,H-8,W-30,3);
    var pct=-SK.panX/(SKY_W-SK.W);
    c.fillStyle='rgba(255,200,100,.5)';c.fillRect(15+pct*(W-60),H-9,30,5);

    c.fillStyle='rgba(255,255,255,.4)';c.font='700 8px Nunito';
    c.fillText('🔭 52nd Floor — Drag to explore',W/2,12);
    c.textAlign='left';
}

function lc(h,n){var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return'rgb('+Math.min(255,r+n)+','+Math.min(255,g+n)+','+Math.min(255,b+n)+')';}
function dc(h,n){var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return'rgb('+Math.max(0,r-n)+','+Math.max(0,g-n)+','+Math.max(0,b-n)+')';}

// =============================================
// 2. STARGAZING — rich nebula sky, click star to make it fall
// =============================================
var SG={cvs:null,ctx:null,W:440,H:450,run:false,aid:null,t:0,
    stars:[],fallers:[],nebulae:[],consts:[],traced:[],tracing:null,selected:[]};

var CONSTELLATIONS=[
    {name:'The Snack',pts:[[80,60],[110,38],[145,52],[132,88],[98,82]],col:'#ffd740'},
    {name:'The Nap',pts:[[200,75],[235,48],[272,58],[262,98],[222,108]],col:'#ff69b4'},
    {name:'Crow Wing',pts:[[325,65],[358,38],[395,50],[385,92],[345,98],[325,65]],col:'#87ceeb'},
    {name:'Pika Bolt',pts:[[62,178],[82,155],[105,185],[88,218],[67,208]],col:'#ffa500'},
    {name:'The Scooter',pts:[[255,195],[292,178],[322,192],[312,228],[272,232]],col:'#98fb98'},
    {name:'Heart Cloud',pts:[[148,275],[172,255],[202,268],[192,298],[162,298]],col:'#ff69b4'},
];

function initStargaze(){
    SG.cvs=document.getElementById('star-cvs');
    if(!SG.cvs)return;
    SG.cvs.width=SG.W;SG.cvs.height=SG.H;
    SG.ctx=SG.cvs.getContext('2d');
    SG.t=0;SG.traced=[];SG.tracing=null;SG.selected=[];SG.fallers=[];

    // Nebula blobs
    SG.nebulae=[];
    for(var ni=0;ni<15;ni++){
        SG.nebulae.push({
            x:Math.random()*SG.W, y:Math.random()*(SG.H-100),
            rx:40+Math.random()*80, ry:30+Math.random()*60,
            col:['rgba(60,40,140,.12)','rgba(30,60,160,.1)','rgba(100,40,120,.08)',
                 'rgba(40,80,180,.1)','rgba(140,60,140,.06)','rgba(20,100,180,.08)',
                 'rgba(80,30,140,.1)','rgba(60,80,200,.08)'][ni%8],
            rot:Math.random()*Math.PI
        });
    }

    // Stars (400+)
    SG.stars=[];
    for(var si=0;si<400;si++){
        SG.stars.push({
            x:Math.random()*SG.W, y:Math.random()*(SG.H-90),
            r:0.3+Math.random()*1.8,
            twinkle:Math.random()*Math.PI*2,
            speed:0.015+Math.random()*0.04,
            bright:0.3+Math.random()*0.7,
            col:si%20===0?'#aac8ff':si%30===0?'#ffd8a8':si%50===0?'#ffaaaa':'#fff',
            falling:false
        });
    }
    // Add constellation stars (brighter)
    CONSTELLATIONS.forEach(function(cn){
        cn.pts.forEach(function(pt){
            SG.stars.push({x:pt[0],y:pt[1],r:2.8,twinkle:0,speed:0.05,bright:1,col:'#fff',isCon:true,con:cn.name,falling:false});
        });
    });

    // Click handler
    SG.cvs.onclick=function(e){
        var r=SG.cvs.getBoundingClientRect();
        var cx=(e.clientX-r.left)/r.width*SG.W;
        var cy=(e.clientY-r.top)/r.height*SG.H;
        // Check constellation stars first
        var hitCon=false;
        SG.stars.forEach(function(s){
            if(!s.isCon||s.falling)return;
            if(Math.hypot(s.x-cx,s.y-cy)<18){
                hitCon=true;
                var cn=CONSTELLATIONS.find(function(c2){return c2.name===s.con;});
                if(!cn)return;
                if(SG.tracing!==cn.name){SG.tracing=cn.name;SG.selected=[];}
                var idx=cn.pts.findIndex(function(p){return p[0]===s.x&&p[1]===s.y;});
                if(idx>=0&&SG.selected.indexOf(idx)<0){
                    SG.selected.push(idx);
                    if(SG.selected.length===cn.pts.length){
                        SG.traced.push(cn.name);SG.tracing=null;SG.selected=[];
                        var msg=document.getElementById('star-msg');
                        if(msg)msg.innerText='✨ "'+cn.name+'" traced! ('+SG.traced.length+'/'+CONSTELLATIONS.length+')';
                    }
                }
            }
        });
        // If didn't hit constellation star, make nearest regular star fall
        if(!hitCon){
            var best=null,bestD=30;
            SG.stars.forEach(function(s){
                if(s.isCon||s.falling)return;
                var d=Math.hypot(s.x-cx,s.y-cy);
                if(d<bestD){bestD=d;best=s;}
            });
            if(best){
                best.falling=true;
                SG.fallers.push({
                    x:best.x,y:best.y,
                    vx:1.5+Math.random()*3,vy:2+Math.random()*3,
                    r:best.r,col:best.col,trail:[],life:1
                });
                // Hide original
                best.bright=0;
            }
        }
    };
    if(!SG.run){SG.run=true;sgLoop();}
}
function stopStargaze(){SG.run=false;if(SG.aid)cancelAnimationFrame(SG.aid);}

function sgLoop(){
    if(!SG.run)return;
    SG.t++;
    // Random auto-shooters
    if(Math.random()<0.006){
        SG.fallers.push({x:Math.random()*SG.W*0.7,y:Math.random()*60,vx:3+Math.random()*4,vy:1.5+Math.random()*2,r:1.5,col:'#fff',trail:[],life:1});
    }
    // Update fallers
    SG.fallers=SG.fallers.filter(function(f){
        f.trail.push({x:f.x,y:f.y,a:f.life});
        if(f.trail.length>25)f.trail.shift();
        f.x+=f.vx;f.y+=f.vy;f.vy+=0.05;f.life-=0.018;
        return f.life>0&&f.y<SG.H;
    });
    sgDraw();
    SG.aid=requestAnimationFrame(sgLoop);
}

function sgDraw(){
    var c=SG.ctx,W=SG.W,H=SG.H,t=SG.t;

    // Deep night sky
    var sky=c.createLinearGradient(0,0,0,H-80);
    sky.addColorStop(0,'#050520');sky.addColorStop(0.2,'#0a0a35');sky.addColorStop(0.5,'#0c1040');sky.addColorStop(0.8,'#101848');sky.addColorStop(1,'#152050');
    c.fillStyle=sky;c.fillRect(0,0,W,H-80);

    // Nebula clouds
    SG.nebulae.forEach(function(n){
        c.save();c.translate(n.x,n.y);c.rotate(n.rot);
        var ng=c.createRadialGradient(0,0,0,0,0,n.rx);
        ng.addColorStop(0,n.col);ng.addColorStop(1,'transparent');
        c.fillStyle=ng;
        c.beginPath();c.ellipse(0,0,n.rx,n.ry,0,0,Math.PI*2);c.fill();
        c.restore();
    });

    // Milky Way band — rich blue-purple
    c.save();c.translate(W*0.35,0);c.rotate(0.35);
    var mw=c.createLinearGradient(-50,0,50,0);
    mw.addColorStop(0,'transparent');mw.addColorStop(0.2,'rgba(80,60,160,.08)');
    mw.addColorStop(0.35,'rgba(60,80,200,.12)');mw.addColorStop(0.5,'rgba(100,60,180,.15)');
    mw.addColorStop(0.65,'rgba(60,80,200,.12)');mw.addColorStop(0.8,'rgba(80,60,160,.08)');
    mw.addColorStop(1,'transparent');
    c.fillStyle=mw;c.fillRect(-60,-30,120,H+60);
    // Milky Way stars (extra dense in the band)
    c.fillStyle='rgba(255,255,255,.3)';
    for(var mi=0;mi<120;mi++){
        var mx2=(mi*17)%100-50,my2=(mi*31)%H;
        c.beginPath();c.arc(mx2,my2,0.3+mi%3*0.3,0,Math.PI*2);c.fill();
    }
    c.restore();

    // Stars
    SG.stars.forEach(function(s){
        if(s.bright<=0)return;
        var tw=(Math.sin(s.twinkle+t*s.speed)+1)/2;
        var alpha=s.bright*(0.4+tw*0.6);
        c.globalAlpha=alpha;
        if(s.isCon){
            var traced=SG.traced.indexOf(s.con)>=0;
            c.fillStyle=traced?'#ffd740':'#fff';
            c.shadowColor=traced?'#ffd740':'#88aaff';c.shadowBlur=traced?10:6;
            c.beginPath();c.arc(s.x,s.y,s.r,0,Math.PI*2);c.fill();
            c.shadowBlur=0;
        } else {
            c.fillStyle=s.col;
            c.beginPath();c.arc(s.x,s.y,s.r,0,Math.PI*2);c.fill();
            // Cross sparkle on bright stars
            if(s.r>1.4&&tw>0.7){
                c.strokeStyle=s.col;c.lineWidth=0.5;c.globalAlpha=alpha*0.4;
                var sl=s.r*3;
                c.beginPath();c.moveTo(s.x-sl,s.y);c.lineTo(s.x+sl,s.y);c.stroke();
                c.beginPath();c.moveTo(s.x,s.y-sl);c.lineTo(s.x,s.y+sl);c.stroke();
            }
        }
    });
    c.globalAlpha=1;c.shadowBlur=0;

    // Traced constellations
    CONSTELLATIONS.forEach(function(cn){
        if(SG.traced.indexOf(cn.name)<0)return;
        c.strokeStyle=cn.col;c.lineWidth=1.5;c.globalAlpha=0.55;c.setLineDash([3,3]);
        c.beginPath();cn.pts.forEach(function(pt,i){if(i===0)c.moveTo(pt[0],pt[1]);else c.lineTo(pt[0],pt[1]);});
        c.stroke();c.setLineDash([]);
        var mx2=cn.pts.reduce(function(s2,p){return s2+p[0];},0)/cn.pts.length;
        var my2=cn.pts.reduce(function(s2,p){return s2+p[1];},0)/cn.pts.length;
        c.fillStyle=cn.col;c.font='700 8px Nunito';c.textAlign='center';
        c.globalAlpha=0.7;c.fillText('"'+cn.name+'"',mx2,my2+18);
        c.textAlign='left';
    });
    c.globalAlpha=1;

    // Tracing in progress
    if(SG.tracing){
        var cn2=CONSTELLATIONS.find(function(cc){return cc.name===SG.tracing;});
        if(cn2&&SG.selected.length>1){
            c.strokeStyle=cn2.col;c.lineWidth=2;c.globalAlpha=0.5;
            c.beginPath();SG.selected.forEach(function(idx,i){var pt=cn2.pts[idx];if(i===0)c.moveTo(pt[0],pt[1]);else c.lineTo(pt[0],pt[1]);});
            c.stroke();c.globalAlpha=1;
        }
    }

    // Falling stars (user-clicked + auto)
    SG.fallers.forEach(function(f){
        // Trail
        for(var fi=0;fi<f.trail.length;fi++){
            var tr=f.trail[fi];
            var ta=tr.a*(fi/f.trail.length)*0.6;
            c.globalAlpha=ta;
            var tw2=f.r*(1-fi/f.trail.length);
            c.fillStyle=f.col;c.beginPath();c.arc(tr.x,tr.y,Math.max(0.3,tw2),0,Math.PI*2);c.fill();
        }
        // Head glow
        c.globalAlpha=f.life;
        c.shadowColor='#fff';c.shadowBlur=8;
        c.fillStyle='#fff';c.beginPath();c.arc(f.x,f.y,f.r*1.2,0,Math.PI*2);c.fill();
        c.shadowBlur=0;
    });
    c.globalAlpha=1;

    // Moon
    var moonX=385,moonY=55,moonR=18;
    var mg=c.createRadialGradient(moonX-2,moonY-2,1,moonX,moonY,moonR+12);
    mg.addColorStop(0,'rgba(255,252,230,.15)');mg.addColorStop(1,'transparent');
    c.fillStyle=mg;c.beginPath();c.arc(moonX,moonY,moonR+12,0,Math.PI*2);c.fill();
    c.fillStyle='#f0ecd0';c.beginPath();c.arc(moonX,moonY,moonR,0,Math.PI*2);c.fill();
    c.fillStyle='rgba(180,175,150,.2)';
    c.beginPath();c.arc(moonX-4,moonY-3,3.5,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(moonX+6,moonY+2,2.5,0,Math.PI*2);c.fill();

    // Grass hill foreground
    var grs=c.createLinearGradient(0,H-85,0,H);
    grs.addColorStop(0,'#0a1828');grs.addColorStop(0.3,'#0c1a20');grs.addColorStop(1,'#081018');
    c.fillStyle=grs;
    c.beginPath();c.moveTo(0,H-75);c.quadraticCurveTo(W*0.3,H-90,W*0.5,H-78);
    c.quadraticCurveTo(W*0.7,H-85,W,H-70);c.lineTo(W,H);c.lineTo(0,H);c.fill();
    // Grass blades
    c.strokeStyle='rgba(20,40,30,.6)';c.lineWidth=1;
    for(var gi=0;gi<60;gi++){
        var gx=gi*(W/59),gy=H-75+Math.sin(gx*0.03)*8;
        var sway=Math.sin(t*0.02+gi*0.3)*3;
        c.beginPath();c.moveTo(gx,gy);c.quadraticCurveTo(gx+sway,gy-12,gx+sway*1.5,gy-18);c.stroke();
    }

    // Characters sitting on hill
    var cf=typeof crowFound!=='undefined'&&crowFound;
    c.font='20px sans-serif';c.textAlign='center';
    c.fillText('⚡',W*0.55,H-45);
    if(cf)c.fillText('🐦‍⬛',W*0.65,H-48);

    // Telescope
    c.fillStyle='#3a3a48';
    c.save();c.translate(W*0.38,H-60);c.rotate(-0.55);
    c.fillRect(0,-2,28,4);c.fillRect(26,-4,8,8);c.restore();
    c.strokeStyle='#333';c.lineWidth=1.5;
    c.beginPath();c.moveTo(W*0.38,H-60);c.lineTo(W*0.36,H-40);c.stroke();
    c.beginPath();c.moveTo(W*0.38,H-60);c.lineTo(W*0.40,H-40);c.stroke();
    c.beginPath();c.moveTo(W*0.38,H-60);c.lineTo(W*0.38,H-38);c.stroke();

    // Info
    c.fillStyle='rgba(255,255,255,.4)';c.font='700 7.5px Nunito';
    c.fillText('🌌 Tap stars to make them fall • Tap glowing stars to trace constellations ('+SG.traced.length+'/'+CONSTELLATIONS.length+')',W/2,12);
    c.textAlign='left';
}

// =============================================
// 3. PRUDENTIAL MALL
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
    if(mallView==='shops'){
        var h='<div class="panel-title">🛍️ Shops at Prudential</div><div style="text-align:center;font-size:.7rem;font-weight:700;color:#888;margin-bottom:8px;">Level 2 — Shopping Mall</div>';
        for(var si=0;si<mallShops.length;si++){h+='<button class="choice-btn" onclick="mallShopIdx='+si+';mallView=\'items\';renderMall()"><span class="ce">'+mallShops[si].emoji+'</span>'+mallShops[si].name+'</button>';}
        if(mallCart.length>0){
            h+='<div style="margin-top:12px;border-top:2px dashed var(--lpink);padding-top:10px;"><div style="font-size:.7rem;font-weight:900;color:#8b005d;margin-bottom:6px;">🛍️ Bag ('+mallCart.length+')</div>';
            var tot=0;for(var i=0;i<mallCart.length;i++){tot+=mallCart[i].price;h+='<div style="display:flex;justify-content:space-between;font-size:.65rem;font-weight:700;padding:2px 0;color:#666;"><span>'+mallCart[i].emoji+' '+mallCart[i].name+'</span><span>$'+mallCart[i].price+' <span style="color:red;cursor:pointer;" onclick="mallCart.splice('+i+',1);renderMall()">✕</span></span></div>';}
            h+='<div style="font-size:.8rem;font-weight:900;color:#ff1493;margin-top:6px;">Total: $'+tot+'</div><button class="action-btn" onclick="mallCheckout()">Checkout 💳</button></div>';
        }
        p.innerHTML=h;
    } else if(mallView==='items'){
        var shop=mallShops[mallShopIdx];
        var h='<div class="panel-title">'+shop.emoji+' '+shop.name+'</div><button class="back-btn" onclick="mallView=\'shops\';renderMall()" style="margin-bottom:8px;">← All Shops</button>';
        for(var ii=0;ii<shop.items.length;ii++){var it=shop.items[ii];h+='<div class="menu-item" style="text-align:left;cursor:pointer;" onclick="mallAddItem('+ii+')"><div style="display:flex;justify-content:space-between;align-items:center;"><span><span style="font-size:1.3rem;">'+it.emoji+'</span> <strong>'+it.name+'</strong></span><span style="font-weight:900;color:#ff1493;">$'+it.price+'</span></div></div>';}
        p.innerHTML=h;
    } else if(mallView==='done'){
        var cf=typeof crowFound!=='undefined'&&crowFound;var em='';for(var i=0;i<mallCart.length;i++)em+=mallCart[i].emoji+' ';
        p.innerHTML='<div style="text-align:center;padding:20px;"><div style="font-size:3rem;">🛍️✨</div><div class="panel-title">Shopping spree!</div><div style="font-size:2rem;margin:12px 0;">'+em+'</div><div style="font-size:.8rem;color:#888;font-weight:700;">'+(cf?'Pika & Crow show off their haul ⚡🐦‍⬛':'Pika carries all the bags ⚡🛍️')+'</div><div style="display:flex;justify-content:center;gap:8px;margin-top:12px;"><button class="action-btn" onclick="mallCart=[];mallView=\'shops\';renderMall()">Shop More</button><button class="action-btn sec" onclick="show(\'screen-prudential\')">Back</button></div></div>';
    }
}
function mallAddItem(idx){mallCart.push({name:mallShops[mallShopIdx].items[idx].name,emoji:mallShops[mallShopIdx].items[idx].emoji,price:mallShops[mallShopIdx].items[idx].price});mallView='shops';renderMall();}
function mallCheckout(){mallView='done';renderMall();}
buildMall();
