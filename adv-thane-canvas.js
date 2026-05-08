// =============================================
// NAMO PARK & WALK — Full-Screen Canvas Scenes
// Same quality as Boston Common (cherry / tulips / pond)
// =============================================

// =============================================
// 1. FLOWER GARDEN — Canvas with drawn flowers, butterflies
// =============================================
var FG={cvs:null,ctx:null,W:800,H:600,flowers:[],butterflies:[],mx:-1,my:-1,t:0,run:false,aid:null};

function initParkGarden(){
    FG.cvs=document.getElementById('park-garden-cvs'); if(!FG.cvs)return;
    FG.t=0; FG.mx=-1; FG.my=-1;
    var cols=['#e03060','#ff69b4','#ffd740','#ff6030','#da70d6','#e84080','#ffa040','#c060d0'];
    FG.flowers=[];
    for(var row=0;row<12;row++){
        var count=8+row*2;
        for(var fi=0;fi<count;fi++){
            FG.flowers.push({x:.03+fi*(.94/count)+Math.random()*.02,y:.38+row*.05,
                color:cols[(row+fi)%cols.length],h:.04+row*.003+Math.random()*.012,
                w:.013+row*.001,phase:Math.random()*Math.PI*2,type:fi%3});
        }
    }
    FG.butterflies=[];
    for(var bi=0;bi<12;bi++){
        FG.butterflies.push({x:.1+Math.random()*.8,y:.15+Math.random()*.6,
            vx:(Math.random()-.5)*.003,vy:(Math.random()-.5)*.002,
            wingPhase:Math.random()*Math.PI*2,
            col:['#ff69b4','#ffd740','#87ceeb','#ffa500','#da70d6','#98fb98','#ff6347','#dda0dd','#40e0d0','#f08080','#90ee90','#ffb6c1'][bi]});
    }
    FG.cvs.onmousemove=function(e){var r=FG.cvs.getBoundingClientRect();FG.mx=(e.clientX-r.left)/r.width;FG.my=(e.clientY-r.top)/r.height;};
    FG.cvs.ontouchmove=function(e){e.preventDefault();var r=FG.cvs.getBoundingClientRect();FG.mx=(e.touches[0].clientX-r.left)/r.width;FG.my=(e.touches[0].clientY-r.top)/r.height;};
    FG.cvs.onmouseleave=function(){FG.mx=-1;FG.my=-1;};
    FG.cvs.width=800;FG.cvs.height=600;FG.ctx=FG.cvs.getContext('2d');FG.W=800;FG.H=600;
    if(!FG.run){FG.run=true;fgLoop();}
}
function stopParkGarden(){FG.run=false;if(FG.aid)cancelAnimationFrame(FG.aid);}

function fgLoop(){if(!FG.run)return;FG.t++;fgDraw();FG.aid=requestAnimationFrame(fgLoop);}

function fgDraw(){
    var c=FG.ctx,W=FG.W,H=FG.H,t=FG.t; if(!c)return;
    // Sky — warm golden hour
    var sky=c.createLinearGradient(0,0,0,H*.38);
    sky.addColorStop(0,'#87ceeb');sky.addColorStop(.5,'#b8d8f0');sky.addColorStop(1,'#d8e8c8');
    c.fillStyle=sky;c.fillRect(0,0,W,H*.38);
    // Clouds
    c.fillStyle='rgba(255,255,255,.35)';
    for(var ci=0;ci<6;ci++){var cx=(ci*W*.2+t*.12)%(W+120)-60;
        c.beginPath();c.ellipse(cx,H*(.06+ci*.04),W*.08,H*.02,0,0,Math.PI*2);c.fill();
        c.beginPath();c.ellipse(cx+W*.03,H*(.05+ci*.04),W*.05,H*.015,0,0,Math.PI*2);c.fill();}
    // Hills
    c.fillStyle='#5aaa40';
    c.beginPath();c.moveTo(0,H*.36);c.quadraticCurveTo(W*.3,H*.28,W*.5,H*.33);
    c.quadraticCurveTo(W*.7,H*.27,W,H*.32);c.lineTo(W,H*.38);c.lineTo(0,H*.38);c.fill();
    c.fillStyle='#4a9830';
    c.beginPath();c.moveTo(0,H*.37);c.quadraticCurveTo(W*.4,H*.32,W*.6,H*.35);
    c.quadraticCurveTo(W*.8,H*.30,W,H*.35);c.lineTo(W,H*.38);c.lineTo(0,H*.38);c.fill();
    // Trees in background
    for(var ti=0;ti<8;ti++){var tx=W*(.05+ti*.12),tby=H*.35;
        c.fillStyle='#5a3820';c.fillRect(tx-3,tby-H*.07,6,H*.07);
        var sway=Math.sin(t*.01+ti)*2;
        c.fillStyle='#3a8828';c.beginPath();c.ellipse(tx+sway,tby-H*.09,W*.04,H*.04,0,0,Math.PI*2);c.fill();
        c.fillStyle='#2a7818';c.beginPath();c.ellipse(tx+sway+5,tby-H*.1,W*.025,H*.03,.3,0,Math.PI*2);c.fill();}
    // Gazebo / arch
    var gx=W*.78,gy=H*.33;
    c.fillStyle='#e8e0d0';c.fillRect(gx-20,gy,5,H*.05);c.fillRect(gx+15,gy,5,H*.05);
    c.fillStyle='#d08050';c.beginPath();c.moveTo(gx-28,gy);c.quadraticCurveTo(gx,gy-20,gx+28,gy);c.lineTo(gx+25,gy+3);c.quadraticCurveTo(gx,gy-16,gx-25,gy+3);c.fill();
    // Garden soil
    var gnd=c.createLinearGradient(0,H*.37,0,H);
    gnd.addColorStop(0,'#7a6040');gnd.addColorStop(.1,'#8a7050');gnd.addColorStop(1,'#6a5030');
    c.fillStyle=gnd;c.fillRect(0,H*.37,W,H*.63);
    // Row furrows
    c.strokeStyle='rgba(0,0,0,.08)';c.lineWidth=1;
    for(var ri=0;ri<14;ri++){var ry=H*(.39+ri*.045);c.beginPath();c.moveTo(0,ry);c.lineTo(W,ry);c.stroke();}
    // Gravel path down center
    c.fillStyle='rgba(200,180,150,.4)';
    c.beginPath();c.moveTo(W*.46,H*.37);c.lineTo(W*.42,H);c.lineTo(W*.58,H);c.lineTo(W*.54,H*.37);c.fill();
    // Draw flowers
    FG.flowers.forEach(function(f){
        var sway=Math.sin(t*.02+f.phase)*W*.005;
        var h=f.h*H,w=f.w*W,bx=f.x*W,by=f.y*H;
        // Stem
        c.strokeStyle='#3a7020';c.lineWidth=2;
        c.beginPath();c.moveTo(bx,by);c.quadraticCurveTo(bx+sway,by-h*.5,bx+sway,by-h);c.stroke();
        // Leaf
        c.fillStyle='#4a9030';
        c.save();c.translate(bx,by-h*.35);c.rotate(-.3+sway*.003);
        c.beginPath();c.ellipse(5,0,7,2.5,.3,0,Math.PI*2);c.fill();c.restore();
        var hx=bx+sway,hy=by-h;
        if(f.type===0){
            // Tulip shape
            c.fillStyle=f.color;
            c.beginPath();c.moveTo(hx-w/2,hy);
            c.quadraticCurveTo(hx-w/2-1,hy-w*.8,hx,hy-w*1.1);
            c.quadraticCurveTo(hx+w/2+1,hy-w*.8,hx+w/2,hy);
            c.quadraticCurveTo(hx,hy+w*.2,hx-w/2,hy);c.fill();
            // Inner
            c.fillStyle='rgba(0,0,0,.12)';
            c.beginPath();c.moveTo(hx-w*.25,hy);c.quadraticCurveTo(hx,hy-w*.6,hx+w*.25,hy);
            c.quadraticCurveTo(hx,hy+w*.08,hx-w*.25,hy);c.fill();
        } else if(f.type===1){
            // Round flower (dahlia)
            for(var pi=0;pi<6;pi++){
                var pa=pi*Math.PI/3+t*.005;
                c.fillStyle=f.color;c.globalAlpha=.8;
                c.beginPath();c.ellipse(hx+Math.cos(pa)*w*.4,hy+Math.sin(pa)*w*.4,w*.35,w*.2,pa,0,Math.PI*2);c.fill();
            }
            c.globalAlpha=1;c.fillStyle='#ffd700';c.beginPath();c.arc(hx,hy,w*.2,0,Math.PI*2);c.fill();
        } else {
            // Star flower
            c.fillStyle=f.color;
            for(var si=0;si<5;si++){
                var sa=si*Math.PI*2/5-Math.PI/2+Math.sin(t*.01+f.phase)*.1;
                c.beginPath();c.moveTo(hx,hy);
                c.lineTo(hx+Math.cos(sa)*w*.6,hy+Math.sin(sa)*w*.6);
                c.lineTo(hx+Math.cos(sa+.3)*w*.3,hy+Math.sin(sa+.3)*w*.3);c.fill();
            }
            c.fillStyle='#fff';c.beginPath();c.arc(hx,hy,w*.12,0,Math.PI*2);c.fill();
        }
        // Highlight
        c.fillStyle='rgba(255,255,255,.15)';
        c.beginPath();c.ellipse(hx-w*.12,hy-w*.4,w*.1,w*.2,-.2,0,Math.PI*2);c.fill();
    });
    // Butterflies
    FG.butterflies.forEach(function(bf){
        bf.wingPhase+=.15;
        var dx=bf.x-FG.mx,dy=bf.y-FG.my,dist=Math.hypot(dx,dy);
        if(dist<.12&&FG.mx>0){bf.vx+=dx/dist*.002;bf.vy+=dy/dist*.0015;}
        else if(Math.random()<.02){bf.vx+=(Math.random()-.5)*.001;bf.vy+=(Math.random()-.5)*.001;}
        bf.vx*=.97;bf.vy*=.97;bf.x+=bf.vx;bf.y+=bf.vy;
        if(bf.x<.02)bf.vx+=.001;if(bf.x>.98)bf.vx-=.001;
        if(bf.y<.05)bf.vy+=.001;if(bf.y>.92)bf.vy-=.001;
        var ws=Math.abs(Math.sin(bf.wingPhase))*W*.016;
        c.save();c.translate(bf.x*W,bf.y*H);c.scale(bf.vx>0?1:-1,1);
        c.fillStyle=bf.col;c.globalAlpha=.8;
        c.beginPath();c.ellipse(-ws,-2,ws+2,5,-.3,0,Math.PI*2);c.fill();
        c.beginPath();c.ellipse(ws,-2,ws+2,5,.3,0,Math.PI*2);c.fill();
        c.fillStyle='rgba(255,255,255,.3)';
        c.beginPath();c.ellipse(-ws,-2,ws*.5,2.5,-.3,0,Math.PI*2);c.fill();
        c.beginPath();c.ellipse(ws,-2,ws*.5,2.5,.3,0,Math.PI*2);c.fill();
        c.fillStyle='#333';c.globalAlpha=1;c.fillRect(-1,-4,2,8);
        c.strokeStyle='#333';c.lineWidth=.5;
        c.beginPath();c.moveTo(0,-4);c.lineTo(-3,-8);c.stroke();
        c.beginPath();c.moveTo(0,-4);c.lineTo(3,-8);c.stroke();
        c.restore();
    });
    // Characters
    var cf=typeof crowFound!=='undefined'&&crowFound||typeof flightCrowFound!=='undefined'&&flightCrowFound;
    if(pikaImg&&pikaImg.complete&&pikaImg.naturalWidth)c.drawImage(pikaImg,W*.43-18,H*.88-36,36,36);
    if(cf&&crowImg&&crowImg.complete&&crowImg.naturalWidth)c.drawImage(crowImg,W*.53-18,H*.88-36,36,36);
    // HUD
    c.fillStyle='rgba(255,255,255,.7)';c.font='700 '+W*.018+'px Nunito';c.textAlign='center';
    c.fillText('🌺 Move cursor near butterflies to watch them scatter!',W/2,H*.97);c.textAlign='left';
}

// =============================================
// 2. DUCK POND — tap to throw food, ducks swim to it
// =============================================
var PP={cvs:null,ctx:null,W:800,H:600,run:false,aid:null,ducks:[],ripples:[],food:[],t:0};

function initParkPond(){
    PP.cvs=document.getElementById('park-pond-cvs'); if(!PP.cvs)return;
    PP.t=0;PP.ripples=[];PP.food=[];
    PP.ducks=[];
    for(var di=0;di<8;di++)PP.ducks.push({x:.12+Math.random()*.76,y:.38+Math.random()*.35,
        vx:(Math.random()-.5)*.002,vy:(Math.random()-.5)*.001,dir:Math.random()>.5?1:-1,
        bob:Math.random()*Math.PI*2,baby:di>5,eating:0});
    PP.cvs.onclick=function(e){
        var r=PP.cvs.getBoundingClientRect(),cx=(e.clientX-r.left)/r.width,cy=(e.clientY-r.top)/r.height;
        if(cy<.28)return; // don't drop on sky
        PP.food.push({x:cx,y:cy,life:300,eaten:false});
        PP.ripples.push({x:cx,y:cy,r:.008,life:1});
        // Attract nearby ducks
        PP.ducks.forEach(function(d){
            var dx=cx-d.x,dy=cy-d.y,dist=Math.hypot(dx,dy);
            if(dist>0&&dist<.5){d.vx+=dx/dist*.004;d.vy+=dy/dist*.003;}
        });
    };
    PP.cvs.width=800;PP.cvs.height=600;PP.ctx=PP.cvs.getContext('2d');PP.W=800;PP.H=600;
    if(!PP.run){PP.run=true;ppLoop();}
}
function stopParkPond(){PP.run=false;if(PP.aid)cancelAnimationFrame(PP.aid);}

function ppLoop(){
    if(!PP.run)return;PP.t++;
    // Duck physics
    PP.ducks.forEach(function(d){
        d.bob+=.04;
        // Move toward nearest food
        var nearF=null,nearD=999;
        PP.food.forEach(function(f){if(f.eaten)return;var dist=Math.hypot(f.x-d.x,f.y-d.y);if(dist<nearD){nearD=dist;nearF=f;}});
        if(nearF&&nearD<.4){
            var dx=nearF.x-d.x,dy=nearF.y-d.y;
            d.vx+=dx/nearD*.001;d.vy+=dy/nearD*.0008;
            if(nearD<.03){nearF.eaten=true;d.eating=30;}
        } else if(Math.random()<.01){d.vx+=(Math.random()-.5)*.0015;d.vy+=(Math.random()-.5)*.001;}
        d.x+=d.vx;d.y+=d.vy;d.vx*=.99;d.vy*=.99;
        if(d.vx>.0003)d.dir=1;if(d.vx<-.0003)d.dir=-1;
        if(d.x<.05){d.x=.05;d.vx=Math.abs(d.vx);}if(d.x>.95){d.x=.95;d.vx=-Math.abs(d.vx);}
        if(d.y<.3){d.y=.3;d.vy=Math.abs(d.vy);}if(d.y>.88){d.y=.88;d.vy=-Math.abs(d.vy);}
        if(d.eating>0)d.eating--;
        if(PP.t%14===0&&(Math.abs(d.vx)>.0003||Math.abs(d.vy)>.0003))PP.ripples.push({x:d.x,y:d.y+.01,r:.005,life:.5});
    });
    PP.food=PP.food.filter(function(f){f.life--;return f.life>0&&!f.eaten;});
    PP.ripples=PP.ripples.filter(function(r){r.r+=.001;r.life-=.012;return r.life>0;});
    ppDraw();PP.aid=requestAnimationFrame(ppLoop);
}

function ppDraw(){
    var c=PP.ctx,W=PP.W,H=PP.H,t=PP.t;if(!c)return;
    // Sky — sunset hues
    var sky=c.createLinearGradient(0,0,0,H*.28);
    sky.addColorStop(0,'#ff9060');sky.addColorStop(.4,'#ffb880');sky.addColorStop(1,'#c8e0a0');
    c.fillStyle=sky;c.fillRect(0,0,W,H*.28);
    // Sun
    c.fillStyle='#ffe080';c.globalAlpha=.8;c.beginPath();c.arc(W*.8,H*.08,W*.04,0,Math.PI*2);c.fill();
    c.fillStyle='#fff8d0';c.globalAlpha=.4;c.beginPath();c.arc(W*.8,H*.08,W*.07,0,Math.PI*2);c.fill();
    c.globalAlpha=1;
    // Trees along bank
    for(var ti=0;ti<12;ti++){var tx=ti*(W/11),sway=Math.sin(t*.008+ti)*1.5;
        c.fillStyle='#5a3820';c.fillRect(tx+sway-2,H*.17,5,H*.08);
        c.fillStyle=ti%3===0?'#2a6a20':'#3a8830';c.beginPath();c.ellipse(tx+sway,H*.16,W*.035+Math.sin(t*.015+ti)*1.5,H*.04,0,0,Math.PI*2);c.fill();
        c.fillStyle='#1a5a18';c.beginPath();c.ellipse(tx+sway+6,H*.155,W*.022,H*.028,.3,0,Math.PI*2);c.fill();}
    // Bank
    c.fillStyle='#5aaa40';
    c.beginPath();c.moveTo(0,H*.265);c.quadraticCurveTo(W*.3,H*.24,W*.5,H*.26);
    c.quadraticCurveTo(W*.7,H*.24,W,H*.27);c.lineTo(W,H*.3);c.quadraticCurveTo(W/2,H*.33,0,H*.3);c.fill();
    // Grass tufts
    c.fillStyle='#4a9a30';
    for(var gi=0;gi<20;gi++){var gx=gi*(W/19);c.beginPath();c.moveTo(gx,H*.28);c.lineTo(gx+3,H*.25);c.lineTo(gx+6,H*.28);c.fill();}
    // Water
    var wg=c.createLinearGradient(0,H*.28,0,H);
    wg.addColorStop(0,'#4890b8');wg.addColorStop(.3,'#3878a0');wg.addColorStop(1,'#205870');
    c.fillStyle=wg;c.fillRect(0,H*.28,W,H*.72);
    // Water ripple lines
    c.strokeStyle='rgba(255,255,255,.06)';c.lineWidth=1;
    for(var wy=.32;wy<1;wy+=.04){c.beginPath();for(var wx=0;wx<W;wx+=3){var yo=Math.sin(wx*.04+t*.03+wy*H*.1)*H*.004;if(wx===0)c.moveTo(wx,wy*H+yo);else c.lineTo(wx,wy*H+yo);}c.stroke();}
    // Lily pads
    var lilies=[[.15,.5],[.35,.65],[.7,.55],[.55,.8],[.85,.7],[.25,.42]];
    lilies.forEach(function(l){
        c.fillStyle='#3a8a30';c.globalAlpha=.6;
        c.beginPath();c.ellipse(l[0]*W,l[1]*H,14,10,.1,0,Math.PI*2);c.fill();
        c.globalAlpha=1;
        // Flower on some
        if(l[0]>.3&&l[0]<.7){c.fillStyle='#ff88aa';c.beginPath();c.arc(l[0]*W+4,l[1]*H-3,4,0,Math.PI*2);c.fill();c.fillStyle='#ffcc00';c.beginPath();c.arc(l[0]*W+4,l[1]*H-3,1.5,0,Math.PI*2);c.fill();}
    });
    // Click ripples
    PP.ripples.forEach(function(rp){c.beginPath();c.arc(rp.x*W,rp.y*H,rp.r*W,0,Math.PI*2);
        c.strokeStyle='rgba(255,255,255,'+rp.life*.4+')';c.lineWidth=1.5;c.stroke();});
    // Food pieces
    PP.food.forEach(function(f){if(f.eaten)return;
        c.fillStyle='#d4a050';c.globalAlpha=Math.min(1,f.life/50);
        c.beginPath();c.arc(f.x*W,f.y*H,3,0,Math.PI*2);c.fill();
        c.fillStyle='#c09040';c.beginPath();c.arc(f.x*W+2,f.y*H+1,2,0,Math.PI*2);c.fill();
        c.globalAlpha=1;});
    // Ducks
    PP.ducks.forEach(function(d){
        var bob=Math.sin(d.bob)*H*.005,sz=d.baby?.6:1;
        var dx2=d.x*W,dy2=d.y*H+bob;
        c.save();c.translate(dx2,dy2);c.scale(d.dir*sz,sz);
        // Body
        c.fillStyle=d.baby?'#e8d860':'#6a5020';c.beginPath();c.ellipse(0,0,14,9,0,0,Math.PI*2);c.fill();
        // Wing
        c.fillStyle=d.baby?'#d8c850':'#8a7040';c.beginPath();c.ellipse(-2,-2,8,6,.2,0,Math.PI*2);c.fill();
        // Head
        c.fillStyle=d.baby?'#e8d860':'#1a6a30';c.beginPath();c.arc(12,-6,d.baby?5:7,0,Math.PI*2);c.fill();
        // Eye
        c.fillStyle='#111';c.beginPath();c.arc(14,-7,1.2,0,Math.PI*2);c.fill();
        c.fillStyle='#fff';c.beginPath();c.arc(14.3,-7.3,.4,0,Math.PI*2);c.fill();
        // Beak
        c.fillStyle='#e89020';c.beginPath();c.moveTo(17,-5);c.lineTo(22,-4);c.lineTo(17,-3);c.fill();
        // Neck ring (adult mallard)
        if(!d.baby){c.strokeStyle='#fff';c.lineWidth=1.5;c.beginPath();c.arc(10,-3,4,.5,2.5);c.stroke();}
        // Eating animation
        if(d.eating>0){c.fillStyle='#d4a050';c.beginPath();c.arc(20,-2,2,0,Math.PI*2);c.fill();}
        c.restore();
        // Shadow
        c.globalAlpha=.12;c.fillStyle='#222';c.beginPath();c.ellipse(dx2,dy2+12,12*sz,4,0,0,Math.PI*2);c.fill();c.globalAlpha=1;
    });
    // Characters on bank
    var cf=typeof crowFound!=='undefined'&&crowFound||typeof flightCrowFound!=='undefined'&&flightCrowFound;
    if(pikaImg&&pikaImg.complete&&pikaImg.naturalWidth)c.drawImage(pikaImg,W*.42-16,H*.22-32,32,32);
    if(cf&&crowImg&&crowImg.complete&&crowImg.naturalWidth)c.drawImage(crowImg,W*.52-16,H*.22-32,32,32);
    // HUD
    c.fillStyle='rgba(255,255,255,.6)';c.font='700 '+W*.018+'px Nunito';c.textAlign='center';
    c.fillText('🦆 Tap the water to throw bread! Ducks will swim to it!',W/2,H*.97);c.textAlign='left';
}

// =============================================
// 3. NIGHT STROLL — Hiranandani promenade at night
// =============================================
var NS={cvs:null,ctx:null,W:800,H:600,run:false,aid:null,t:0,stars:[],lanterns:[],walkers:[]};

function initWalkStroll(){
    NS.cvs=document.getElementById('walk-stroll-cvs');if(!NS.cvs)return;
    NS.t=0;
    NS.stars=[];for(var si=0;si<80;si++)NS.stars.push({x:Math.random(),y:Math.random()*.35,sz:.5+Math.random()*1.5,twinkle:Math.random()*Math.PI*2,bright:.5+Math.random()*.5});
    NS.lanterns=[];for(var li=0;li<10;li++)NS.lanterns.push({x:.08+li*.09,glow:Math.random()*Math.PI*2});
    NS.walkers=[];
    for(var wi=0;wi<6;wi++)NS.walkers.push({x:Math.random(),y:.72+Math.random()*.06,vx:(Math.random()-.5)*.001,sz:.6+Math.random()*.4,col:['#d0c0b0','#a0a0c0','#c0b0a0','#90a0b0','#b0a0c0','#a0b0a0'][wi]});
    NS.cvs.width=800;NS.cvs.height=600;NS.ctx=NS.cvs.getContext('2d');NS.W=800;NS.H=600;
    if(!NS.run){NS.run=true;nsLoop();}
}
function stopWalkStroll(){NS.run=false;if(NS.aid)cancelAnimationFrame(NS.aid);}

function nsLoop(){if(!NS.run)return;NS.t++;nsDraw();NS.aid=requestAnimationFrame(nsLoop);}

function nsDraw(){
    var c=NS.ctx,W=NS.W,H=NS.H,t=NS.t;if(!c)return;
    // Night sky gradient
    var sky=c.createLinearGradient(0,0,0,H*.4);
    sky.addColorStop(0,'#0a0a28');sky.addColorStop(.5,'#141440');sky.addColorStop(1,'#1a1a50');
    c.fillStyle=sky;c.fillRect(0,0,W,H*.4);
    // Moon
    c.fillStyle='#f0e8c0';c.globalAlpha=.9;c.beginPath();c.arc(W*.85,H*.1,W*.03,0,Math.PI*2);c.fill();
    c.fillStyle='#ffe8a0';c.globalAlpha=.15;c.beginPath();c.arc(W*.85,H*.1,W*.06,0,Math.PI*2);c.fill();
    c.globalAlpha=1;
    // Stars
    NS.stars.forEach(function(s){
        s.twinkle+=.03;
        c.fillStyle='#fff';c.globalAlpha=s.bright*(.5+Math.sin(s.twinkle)*.5);
        c.beginPath();c.arc(s.x*W,s.y*H,s.sz,0,Math.PI*2);c.fill();
    });
    c.globalAlpha=1;
    // Buildings silhouette
    var bldgs=[[0,.28,.08,.12],[.08,.25,.06,.15],[.14,.22,.07,.18],[.21,.26,.05,.14],[.26,.2,.08,.2],[.34,.24,.06,.16],[.4,.18,.07,.22],[.47,.23,.05,.17],[.52,.21,.06,.19],[.58,.26,.04,.14],[.62,.19,.08,.21],[.7,.24,.05,.16],[.75,.22,.06,.18],[.81,.27,.05,.13],[.86,.23,.07,.17],[.93,.25,.07,.15]];
    bldgs.forEach(function(b){
        c.fillStyle='#0a0a1a';c.fillRect(b[0]*W,b[1]*H,b[2]*W,b[3]*H);
        // Windows
        c.fillStyle='#ffd060';
        for(var wr=0;wr<3;wr++){for(var wc=0;wc<Math.floor(b[2]*W/8);wc++){
            if(Math.random()>.4){c.globalAlpha=.3+Math.random()*.5;c.fillRect(b[0]*W+4+wc*8,b[1]*H+4+wr*10,4,5);}}}
        c.globalAlpha=1;
    });
    // Promenade ground
    var gnd=c.createLinearGradient(0,H*.4,0,H);
    gnd.addColorStop(0,'#2a2a3a');gnd.addColorStop(.15,'#3a3a4a');gnd.addColorStop(1,'#1a1a28');
    c.fillStyle=gnd;c.fillRect(0,H*.4,W,H*.6);
    // Walkway tiles
    c.strokeStyle='rgba(255,255,255,.04)';c.lineWidth=1;
    for(var ty=.42;ty<1;ty+=.06){c.beginPath();c.moveTo(0,ty*H);c.lineTo(W,ty*H);c.stroke();}
    for(var tx=0;tx<W;tx+=40){c.beginPath();c.moveTo(tx,H*.4);c.lineTo(tx,H);c.stroke();}
    // Shop fronts
    var shops=[[.05,'☕','Starbucks','#00704a'],[.18,'🍦','Gelato','#e87080'],[.32,'📚','Books','#8b6914'],[.46,'👗','Fashion','#c850a0'],[.6,'🍕','Pizza','#e05030'],[.74,'💍','Jewels','#c8a020'],[.88,'🎵','Music','#5060c0']];
    shops.forEach(function(s){
        var sx=s[0]*W,sy=H*.42;
        // Shop body
        c.fillStyle=s[3];c.globalAlpha=.6;c.fillRect(sx,sy,W*.1,H*.12);c.globalAlpha=1;
        // Window glow
        c.fillStyle='rgba(255,220,150,.25)';c.fillRect(sx+4,sy+4,W*.1-8,H*.08);
        // Sign
        c.fillStyle='rgba(0,0,0,.5)';c.fillRect(sx,sy-12,W*.1,12);
        c.fillStyle='#fff';c.font='700 8px Nunito';c.fillText(s[2],sx+4,sy-3);
        // Awning
        c.fillStyle=s[3];c.globalAlpha=.8;
        c.beginPath();c.moveTo(sx-3,sy);c.lineTo(sx+W*.05,sy-8);c.lineTo(sx+W*.1+3,sy);c.fill();
        c.globalAlpha=1;
    });
    // Lanterns along the path
    NS.lanterns.forEach(function(l){
        l.glow+=.02;
        var lx=l.x*W,ly=H*.56;
        // Pole
        c.fillStyle='#333';c.fillRect(lx-1.5,ly,3,H*.12);
        // Lamp
        var brightness=.6+Math.sin(l.glow)*.15;
        c.fillStyle='#ffd060';c.globalAlpha=brightness;
        c.beginPath();c.arc(lx,ly,6,0,Math.PI*2);c.fill();
        // Glow circle
        var grad=c.createRadialGradient(lx,ly,2,lx,ly,W*.06);
        grad.addColorStop(0,'rgba(255,210,80,.2)');grad.addColorStop(1,'rgba(255,210,80,0)');
        c.fillStyle=grad;c.fillRect(lx-W*.06,ly-W*.06,W*.12,W*.12);
        c.globalAlpha=1;
        // Ground light pool
        c.fillStyle='rgba(255,210,80,.06)';c.beginPath();c.ellipse(lx,ly+H*.14,W*.04,H*.02,0,0,Math.PI*2);c.fill();
    });
    // Walking people silhouettes
    NS.walkers.forEach(function(w){
        w.x+=w.vx;if(w.x<-.05)w.x=1.05;if(w.x>1.05)w.x=-.05;
        if(Math.random()<.005)w.vx=(Math.random()-.5)*.0015;
        var wx=w.x*W,wy=w.y*H,sz=12*w.sz;
        c.fillStyle=w.col;c.globalAlpha=.5;
        // Head
        c.beginPath();c.arc(wx,wy-sz*1.8,sz*.3,0,Math.PI*2);c.fill();
        // Body
        c.fillRect(wx-sz*.25,wy-sz*1.5,sz*.5,sz*1.2);
        // Legs (animated)
        var legAng=Math.sin(t*.05+w.x*20)*.15;
        c.save();c.translate(wx-sz*.1,wy-sz*.3);c.rotate(legAng);c.fillRect(-sz*.1,0,sz*.2,sz*.8);c.restore();
        c.save();c.translate(wx+sz*.1,wy-sz*.3);c.rotate(-legAng);c.fillRect(-sz*.1,0,sz*.2,sz*.8);c.restore();
        c.globalAlpha=1;
    });
    // Pika & Crow
    var cf=typeof crowFound!=='undefined'&&crowFound||typeof flightCrowFound!=='undefined'&&flightCrowFound;
    if(pikaImg&&pikaImg.complete&&pikaImg.naturalWidth)c.drawImage(pikaImg,W*.44-20,H*.66-40,40,40);
    if(cf&&crowImg&&crowImg.complete&&crowImg.naturalWidth)c.drawImage(crowImg,W*.54-20,H*.66-40,40,40);
    // Heart if together
    if(cf){c.fillStyle='#ff69b4';c.globalAlpha=.5+Math.sin(t*.05)*.3;c.font='18px sans-serif';c.textAlign='center';c.fillText('💛',W*.49,H*.6);c.globalAlpha=1;c.textAlign='left';}
    // HUD
    c.fillStyle='rgba(255,255,255,.5)';c.font='700 '+W*.017+'px Nunito';c.textAlign='center';
    c.fillText('🌃 Evening stroll at The Walk, Hiranandani Estate',W/2,H*.97);c.textAlign='left';
}
