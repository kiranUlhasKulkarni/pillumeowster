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
    var _d=setupCvs(FG.cvs,800,600);FG.ctx=_d.ctx;FG.W=_d.W;FG.H=_d.H;
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
    var _d=setupCvs(PP.cvs,800,600);PP.ctx=_d.ctx;PP.W=_d.W;PP.H=_d.H;
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
    var _d=setupCvs(NS.cvs,800,600);NS.ctx=_d.ctx;NS.W=_d.W;NS.H=_d.H;
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

// =============================================
// 4. SUNSET POINT — Animated sunset over Upvan Lake
// =============================================
var SS={cvs:null,ctx:null,W:800,H:600,run:false,aid:null,t:0,birds:[],clouds:[]};

function initParkSunset(){
    SS.cvs=document.getElementById('park-sunset-cvs');if(!SS.cvs)return;
    SS.t=0;
    SS.birds=[];for(var bi=0;bi<8;bi++)SS.birds.push({x:Math.random(),y:.08+Math.random()*.18,vx:.001+Math.random()*.002,wing:Math.random()*Math.PI*2,sz:.6+Math.random()*.6});
    SS.clouds=[];for(var ci=0;ci<5;ci++)SS.clouds.push({x:Math.random(),y:.05+ci*.06,w:.08+Math.random()*.06,spd:.0001+Math.random()*.0002});
    var _d=setupCvs(SS.cvs,800,600);SS.ctx=_d.ctx;SS.W=_d.W;SS.H=_d.H;
    if(!SS.run){SS.run=true;ssLoop();}
}
function stopParkSunset(){SS.run=false;if(SS.aid)cancelAnimationFrame(SS.aid);}
function ssLoop(){if(!SS.run)return;SS.t++;ssDraw();SS.aid=requestAnimationFrame(ssLoop);}

function ssDraw(){
    var c=SS.ctx,W=SS.W,H=SS.H,t=SS.t;if(!c)return;
    // Animated sunset — sun slowly descends
    var sunProgress=Math.min(1,(t%1800)/1800); // cycles every ~30s
    var sunY=H*(.12+sunProgress*.25);
    // Sky gradient shifts with sun position
    var sky=c.createLinearGradient(0,0,0,H*.55);
    var r1=Math.floor(255-sunProgress*80),g1=Math.floor(140+sunProgress*40),b1=Math.floor(60+sunProgress*100);
    sky.addColorStop(0,'rgb('+Math.max(40,r1-100)+','+Math.max(20,g1-80)+','+(b1+80)+')');
    sky.addColorStop(.3,'rgb('+r1+','+g1+','+b1+')');
    sky.addColorStop(.6,'rgb(255,'+Math.floor(160-sunProgress*60)+','+Math.floor(80-sunProgress*30)+')');
    sky.addColorStop(1,'rgb(255,'+Math.floor(200-sunProgress*50)+','+Math.floor(120-sunProgress*30)+')');
    c.fillStyle=sky;c.fillRect(0,0,W,H*.55);
    // Sun with glow layers
    var sunX=W*.65;
    c.fillStyle='rgba(255,200,60,.08)';c.beginPath();c.arc(sunX,sunY,W*.12,0,Math.PI*2);c.fill();
    c.fillStyle='rgba(255,180,50,.12)';c.beginPath();c.arc(sunX,sunY,W*.08,0,Math.PI*2);c.fill();
    c.fillStyle='rgba(255,220,100,.3)';c.beginPath();c.arc(sunX,sunY,W*.05,0,Math.PI*2);c.fill();
    c.fillStyle='#ffe880';c.beginPath();c.arc(sunX,sunY,W*.032,0,Math.PI*2);c.fill();
    c.fillStyle='#fff8e0';c.beginPath();c.arc(sunX,sunY,W*.02,0,Math.PI*2);c.fill();
    // Sun reflection on water
    c.globalAlpha=.15;
    for(var ri=0;ri<12;ri++){
        var rw=W*(.01+ri*.008),ry=H*(.56+ri*.03)+Math.sin(t*.03+ri)*3;
        c.fillStyle='#ffe080';c.fillRect(sunX-rw/2,ry,rw,3);
    }
    c.globalAlpha=1;
    // Clouds
    SS.clouds.forEach(function(cl){
        cl.x+=cl.spd;if(cl.x>1.2)cl.x=-.2;
        c.fillStyle='rgba(255,180,120,.25)';
        c.beginPath();c.ellipse(cl.x*W,cl.y*H,cl.w*W,H*.018,0,0,Math.PI*2);c.fill();
        c.beginPath();c.ellipse(cl.x*W+W*.02,cl.y*H-H*.008,cl.w*W*.6,H*.012,0,0,Math.PI*2);c.fill();
    });
    // Distant hills
    c.fillStyle='rgba(80,50,100,.5)';
    c.beginPath();c.moveTo(0,H*.48);
    for(var hx=0;hx<=W;hx+=W/10)c.lineTo(hx,H*(.42+Math.sin(hx*.008+.5)*.04));
    c.lineTo(W,H*.55);c.lineTo(0,H*.55);c.fill();
    c.fillStyle='rgba(60,40,80,.6)';
    c.beginPath();c.moveTo(0,H*.5);
    for(var hx=0;hx<=W;hx+=W/8)c.lineTo(hx,H*(.46+Math.sin(hx*.01+2)*.03));
    c.lineTo(W,H*.55);c.lineTo(0,H*.55);c.fill();
    // Trees on hills
    for(var ti=0;ti<16;ti++){var tx=ti*(W/15),ty=H*(.46+Math.sin(tx*.009+1.5)*.03);
        c.fillStyle='rgba(30,60,30,.7)';c.beginPath();c.ellipse(tx,ty-H*.015,W*.015,H*.025,0,0,Math.PI*2);c.fill();}
    // Water
    var wg=c.createLinearGradient(0,H*.53,0,H);
    wg.addColorStop(0,'#4878a8');wg.addColorStop(.3,'#3868a0');wg.addColorStop(1,'#1a4060');
    c.fillStyle=wg;c.fillRect(0,H*.53,W,H*.47);
    // Animated water ripples
    c.strokeStyle='rgba(255,255,255,.05)';c.lineWidth=1;
    for(var wy=.56;wy<1;wy+=.03){c.beginPath();for(var wx=0;wx<W;wx+=3){var yo=Math.sin(wx*.03+t*.025+wy*20)*H*.003;if(wx===0)c.moveTo(wx,wy*H+yo);else c.lineTo(wx,wy*H+yo);}c.stroke();}
    // Shore/bank edge
    c.fillStyle='#5a8a40';
    c.beginPath();c.moveTo(0,H*.53);c.quadraticCurveTo(W*.5,H*.51,W,H*.53);c.lineTo(W,H*.55);c.quadraticCurveTo(W*.5,H*.56,0,H*.55);c.fill();
    // Park bench
    var bx=W*.35,by=H*.50;
    c.fillStyle='#5a3820';c.fillRect(bx-2,by-15,4,20);c.fillRect(bx+40,by-15,4,20);
    c.fillStyle='#8a6840';c.fillRect(bx-5,by-18,52,4);c.fillRect(bx-5,by-10,52,3);
    c.fillStyle='#7a5830';c.fillRect(bx-5,by+2,52,3);
    // Railing along bank
    c.strokeStyle='#666';c.lineWidth=1.5;
    c.beginPath();c.moveTo(0,H*.51);c.lineTo(W,H*.51);c.stroke();
    for(var rp=0;rp<W;rp+=30){c.beginPath();c.moveTo(rp,H*.51);c.lineTo(rp,H*.53);c.stroke();}
    // Birds flying
    SS.birds.forEach(function(b){
        b.x+=b.vx;b.wing+=.08;if(b.x>1.1)b.x=-.1;
        var bx2=b.x*W,by2=b.y*H+Math.sin(t*.02+b.x*10)*4;
        var ws=Math.sin(b.wing)*6*b.sz;
        c.strokeStyle='#222';c.lineWidth=1.5;
        c.beginPath();c.moveTo(bx2-8*b.sz,by2+ws);c.quadraticCurveTo(bx2,by2-2,bx2+8*b.sz,by2+ws);c.stroke();
    });
    // Characters on bench
    var cf=typeof crowFound!=='undefined'&&crowFound||typeof flightCrowFound!=='undefined'&&flightCrowFound;
    if(pikaImg&&pikaImg.complete&&pikaImg.naturalWidth)c.drawImage(pikaImg,bx+5,by-50,32,32);
    if(cf&&crowImg&&crowImg.complete&&crowImg.naturalWidth)c.drawImage(crowImg,bx+20,by-50,32,32);
    if(cf){c.fillStyle='#ff69b4';c.globalAlpha=.6+Math.sin(t*.04)*.3;c.font='14px sans-serif';c.textAlign='center';c.fillText('💛',bx+24,by-55);c.globalAlpha=1;c.textAlign='left';}
    // HUD
    c.fillStyle='rgba(255,255,255,.5)';c.font='700 '+W*.017+'px Nunito';c.textAlign='center';
    c.fillText('🌅 Sunset over Upvan Lake — NaMo Grand Central Park',W/2,H*.97);c.textAlign='left';
}

// =============================================
// 5. FITNESS ZONE — Outdoor gym canvas, tap to exercise
// =============================================
var FZ={cvs:null,ctx:null,W:800,H:600,run:false,aid:null,t:0,curExercise:null,exTimer:0,reps:0,particles:[]};
var FZ_EXERCISES=[
    {name:'Push-Ups',icon:'💪',frames:2},
    {name:'Pull-Ups',icon:'🏋️',frames:2},
    {name:'Squats',icon:'🦵',frames:2},
    {name:'Yoga',icon:'🧘',frames:2},
    {name:'Stretching',icon:'🤸',frames:2},
    {name:'Sprints',icon:'🏃',frames:2}
];

function initParkFitness(){
    FZ.cvs=document.getElementById('park-fitness-cvs');if(!FZ.cvs)return;
    FZ.t=0;FZ.curExercise=null;FZ.exTimer=0;FZ.reps=0;FZ.particles=[];
    FZ.cvs.onclick=function(){
        if(FZ.curExercise){
            FZ.reps++;FZ.exTimer=20;
            for(var pi=0;pi<8;pi++)FZ.particles.push({x:FZ.W*.5,y:FZ.H*.55,vx:(Math.random()-.5)*4,vy:-Math.random()*5-2,life:40,col:['#ffd700','#ff69b4','#32cd32','#87ceeb','#ffa500'][pi%5]});
        } else {
            FZ.curExercise=FZ_EXERCISES[~~(Math.random()*FZ_EXERCISES.length)];FZ.reps=0;FZ.exTimer=20;
        }
    };
    var _d=setupCvs(FZ.cvs,800,600);FZ.ctx=_d.ctx;FZ.W=_d.W;FZ.H=_d.H;
    if(!FZ.run){FZ.run=true;fzLoop();}
}
function stopParkFitness(){FZ.run=false;if(FZ.aid)cancelAnimationFrame(FZ.aid);}
function fzLoop(){if(!FZ.run)return;FZ.t++;if(FZ.exTimer>0)FZ.exTimer--;FZ.particles=FZ.particles.filter(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.15;p.life--;return p.life>0;});fzDraw();FZ.aid=requestAnimationFrame(fzLoop);}

function fzDraw(){
    var c=FZ.ctx,W=FZ.W,H=FZ.H,t=FZ.t;if(!c)return;
    // Morning sky
    var sky=c.createLinearGradient(0,0,0,H*.4);
    sky.addColorStop(0,'#87ceeb');sky.addColorStop(1,'#b8e0a0');
    c.fillStyle=sky;c.fillRect(0,0,W,H*.4);
    // Clouds
    c.fillStyle='rgba(255,255,255,.4)';
    for(var ci=0;ci<4;ci++){var cx=(ci*W*.3+t*.1)%(W+100)-50;
        c.beginPath();c.ellipse(cx,H*(.08+ci*.06),W*.07,H*.02,0,0,Math.PI*2);c.fill();}
    // Grass
    var gnd=c.createLinearGradient(0,H*.38,0,H);
    gnd.addColorStop(0,'#5aaa40');gnd.addColorStop(.3,'#4a9a30');gnd.addColorStop(1,'#3a7a20');
    c.fillStyle=gnd;c.fillRect(0,H*.38,W,H*.62);
    // Grass texture
    c.strokeStyle='rgba(60,120,30,.3)';c.lineWidth=1;
    for(var gi=0;gi<40;gi++){var gx=gi*(W/39),sway=Math.sin(t*.02+gi)*.5;
        c.beginPath();c.moveTo(gx,H*.4);c.lineTo(gx+sway,H*.37);c.stroke();}
    // Track / path (running path)
    c.fillStyle='rgba(180,140,100,.4)';
    c.beginPath();c.moveTo(0,H*.65);c.quadraticCurveTo(W*.5,H*.6,W,H*.65);c.lineTo(W,H*.68);c.quadraticCurveTo(W*.5,H*.63,0,H*.68);c.fill();
    // Trees
    for(var ti=0;ti<6;ti++){var tx=W*(.02+ti*.19),tby=H*.38;
        c.fillStyle='#5a3820';c.fillRect(tx-3,tby-H*.06,6,H*.06);
        c.fillStyle='#3a8828';c.beginPath();c.ellipse(tx,tby-H*.08,W*.03,H*.035,0,0,Math.PI*2);c.fill();}
    // Gym equipment — pull-up bar
    c.strokeStyle='#555';c.lineWidth=5;
    c.beginPath();c.moveTo(W*.15,H*.38);c.lineTo(W*.15,H*.52);c.stroke();
    c.beginPath();c.moveTo(W*.3,H*.38);c.lineTo(W*.3,H*.52);c.stroke();
    c.beginPath();c.moveTo(W*.15,H*.38);c.lineTo(W*.3,H*.38);c.stroke();
    // Bench press
    c.fillStyle='#666';c.fillRect(W*.55,H*.5,W*.12,H*.01);
    c.fillRect(W*.56,H*.5,W*.01,H*.06);c.fillRect(W*.66,H*.5,W*.01,H*.06);
    c.fillStyle='#888';c.fillRect(W*.54,H*.48,W*.02,H*.04);c.fillRect(W*.66,H*.48,W*.02,H*.04);
    // Yoga mat area
    c.fillStyle='rgba(200,100,150,.3)';c.fillRect(W*.75,H*.52,W*.15,H*.06);
    c.strokeStyle='rgba(200,100,150,.5)';c.lineWidth=2;c.strokeRect(W*.75,H*.52,W*.15,H*.06);
    // Pika exercising
    var cf=typeof crowFound!=='undefined'&&crowFound||typeof flightCrowFound!=='undefined'&&flightCrowFound;
    var bounce=FZ.exTimer>0?Math.sin(FZ.exTimer*.5)*8:0;
    if(pikaImg&&pikaImg.complete&&pikaImg.naturalWidth)c.drawImage(pikaImg,W*.42-20,H*.48-40+bounce,40,40);
    if(cf&&crowImg&&crowImg.complete&&crowImg.naturalWidth)c.drawImage(crowImg,W*.56-20,H*.48-40+bounce*.7,40,40);
    // Rep counter / exercise indicator
    if(FZ.curExercise){
        c.fillStyle='rgba(0,0,0,.5)';c.beginPath();c.roundRect(W*.3,H*.72,W*.4,H*.1,8);c.fill();
        c.fillStyle='#fff';c.font='700 '+W*.025+'px Nunito';c.textAlign='center';
        c.fillText(FZ.curExercise.icon+' '+FZ.curExercise.name+' × '+FZ.reps,W*.5,H*.78);
        c.font='700 '+W*.014+'px Nunito';c.fillStyle='rgba(255,255,255,.6)';
        c.fillText('Tap to do reps!',W*.5,H*.81);c.textAlign='left';
    } else {
        c.fillStyle='rgba(0,0,0,.4)';c.beginPath();c.roundRect(W*.25,H*.72,W*.5,H*.08,8);c.fill();
        c.fillStyle='#fff';c.font='700 '+W*.022+'px Nunito';c.textAlign='center';
        c.fillText('💪 Tap anywhere to start working out!',W*.5,H*.77);c.textAlign='left';
    }
    // Particles
    FZ.particles.forEach(function(p){
        c.fillStyle=p.col;c.globalAlpha=p.life/40;
        c.beginPath();c.arc(p.x,p.y,3,0,Math.PI*2);c.fill();
    });
    c.globalAlpha=1;
    // HUD
    c.fillStyle='rgba(255,255,255,.5)';c.font='700 '+W*.016+'px Nunito';c.textAlign='center';
    c.fillText('💪 Outdoor Fitness Zone — NaMo Grand Central Park',W/2,H*.97);c.textAlign='left';
}

// =============================================
// 6. BOAT RIDE — Paddle boat on Upvan Lake
// =============================================
var BR={cvs:null,ctx:null,W:800,H:600,run:false,aid:null,t:0,boatX:.5,boatY:.55,ripples:[],fish:[],dragonflies:[]};

function initParkBoat(){
    BR.cvs=document.getElementById('park-boat-cvs');if(!BR.cvs)return;
    BR.t=0;BR.boatX=.5;BR.boatY=.55;BR.ripples=[];
    BR.fish=[];for(var fi=0;fi<6;fi++)BR.fish.push({x:Math.random(),y:.4+Math.random()*.45,vx:(Math.random()-.5)*.003,phase:Math.random()*Math.PI*2,sz:.5+Math.random()*.5,col:['#e0a040','#c08030','#d09050','#b07020','#e8b060','#c09838'][fi]});
    BR.dragonflies=[];for(var di=0;di<5;di++)BR.dragonflies.push({x:Math.random(),y:.2+Math.random()*.3,vx:(Math.random()-.5)*.003,vy:(Math.random()-.5)*.002,wing:Math.random()*Math.PI*2});
    BR.cvs.onclick=function(e){
        var r=BR.cvs.getBoundingClientRect(),cx=(e.clientX-r.left)/r.width,cy=(e.clientY-r.top)/r.height;
        // Move boat toward click
        var dx=cx-BR.boatX,dy=cy-BR.boatY,dist=Math.hypot(dx,dy);
        if(dist>.01){BR.boatX+=dx*.15;BR.boatY+=dy*.15;}
        BR.boatX=Math.max(.08,Math.min(.92,BR.boatX));BR.boatY=Math.max(.38,Math.min(.85,BR.boatY));
        BR.ripples.push({x:BR.boatX,y:BR.boatY+.02,r:.01,life:1});
    };
    var _d=setupCvs(BR.cvs,800,600);BR.ctx=_d.ctx;BR.W=_d.W;BR.H=_d.H;
    if(!BR.run){BR.run=true;brLoop();}
}
function stopParkBoat(){BR.run=false;if(BR.aid)cancelAnimationFrame(BR.aid);}
function brLoop(){if(!BR.run)return;BR.t++;
    BR.fish.forEach(function(f){f.x+=f.vx;f.phase+=.03;if(f.x<.02||f.x>.98)f.vx*=-1;if(Math.random()<.01)f.vx+=(Math.random()-.5)*.001;});
    BR.dragonflies.forEach(function(d){d.x+=d.vx;d.y+=d.vy;d.wing+=.2;if(d.x<.02||d.x>.98)d.vx*=-1;if(d.y<.1||d.y>.5)d.vy*=-1;if(Math.random()<.02){d.vx+=(Math.random()-.5)*.002;d.vy+=(Math.random()-.5)*.001;}});
    BR.ripples=BR.ripples.filter(function(r){r.r+=.0008;r.life-=.01;return r.life>0;});
    if(BR.t%20===0)BR.ripples.push({x:BR.boatX,y:BR.boatY+.025,r:.005,life:.4});
    brDraw();BR.aid=requestAnimationFrame(brLoop);
}

function brDraw(){
    var c=BR.ctx,W=BR.W,H=BR.H,t=BR.t;if(!c)return;
    // Afternoon sky
    var sky=c.createLinearGradient(0,0,0,H*.32);
    sky.addColorStop(0,'#70b8e8');sky.addColorStop(1,'#a0d0a0');
    c.fillStyle=sky;c.fillRect(0,0,W,H*.32);
    // Clouds
    c.fillStyle='rgba(255,255,255,.4)';
    for(var ci=0;ci<5;ci++){var cx=(ci*W*.22+t*.08)%(W+100)-50;
        c.beginPath();c.ellipse(cx,H*(.06+ci*.04),W*.06,H*.016,0,0,Math.PI*2);c.fill();}
    // Hills
    c.fillStyle='#5a9a40';c.beginPath();c.moveTo(0,H*.3);
    for(var hx=0;hx<=W;hx+=W/8)c.lineTo(hx,H*(.24+Math.sin(hx*.008)*.04));
    c.lineTo(W,H*.33);c.lineTo(0,H*.33);c.fill();
    // Trees on hills
    for(var ti=0;ti<14;ti++){var tx=ti*(W/13),tby=H*(.24+Math.sin(tx*.008)*.04);
        c.fillStyle='#4a7828';c.beginPath();c.ellipse(tx,tby-H*.012,W*.02+Math.sin(t*.01+ti)*1,H*.022,0,0,Math.PI*2);c.fill();}
    // Bank
    c.fillStyle='#5aaa40';c.beginPath();c.moveTo(0,H*.31);c.quadraticCurveTo(W*.5,H*.28,W,H*.31);c.lineTo(W,H*.35);c.quadraticCurveTo(W*.5,H*.37,0,H*.35);c.fill();
    // Reeds on bank
    c.strokeStyle='#3a7020';c.lineWidth=1.5;
    for(var ri=0;ri<20;ri++){var rx=ri*(W/19),sway=Math.sin(t*.02+ri)*2;
        c.beginPath();c.moveTo(rx,H*.33);c.quadraticCurveTo(rx+sway,H*.28,rx+sway*1.5,H*.24);c.stroke();}
    // Water
    var wg=c.createLinearGradient(0,H*.33,0,H);
    wg.addColorStop(0,'#4898c0');wg.addColorStop(.5,'#3880a8');wg.addColorStop(1,'#206880');
    c.fillStyle=wg;c.fillRect(0,H*.33,W,H*.67);
    // Water ripple animation
    c.strokeStyle='rgba(255,255,255,.05)';c.lineWidth=1;
    for(var wy=.36;wy<1;wy+=.035){c.beginPath();for(var wx=0;wx<W;wx+=3){var yo=Math.sin(wx*.035+t*.02+wy*15)*H*.003;if(wx===0)c.moveTo(wx,wy*H+yo);else c.lineTo(wx,wy*H+yo);}c.stroke();}
    // Lily pads
    [[.1,.45],[.25,.7],[.6,.42],[.75,.65],[.9,.5],[.4,.82],[.15,.6],[.85,.78]].forEach(function(l){
        c.fillStyle='rgba(50,130,40,.5)';c.beginPath();c.ellipse(l[0]*W,l[1]*H,12,8,.2,0,Math.PI*2);c.fill();
        if(l[0]>.3&&l[0]<.8){c.fillStyle='rgba(255,130,170,.5)';c.beginPath();c.arc(l[0]*W+3,l[1]*H-2,3,0,Math.PI*2);c.fill();}
    });
    // Click ripples
    BR.ripples.forEach(function(rp){c.beginPath();c.arc(rp.x*W,rp.y*H,rp.r*W,0,Math.PI*2);c.strokeStyle='rgba(255,255,255,'+rp.life*.35+')';c.lineWidth=1.5;c.stroke();});
    // Fish (underwater shadows)
    BR.fish.forEach(function(f){
        var fx=f.x*W,fy=f.y*H+Math.sin(f.phase)*5;
        c.globalAlpha=.3;c.fillStyle=f.col;
        c.save();c.translate(fx,fy);c.scale(f.vx>0?1:-1,1);
        c.beginPath();c.moveTo(8*f.sz,0);c.quadraticCurveTo(0,-4*f.sz,-8*f.sz,0);c.quadraticCurveTo(0,4*f.sz,8*f.sz,0);c.fill();
        c.beginPath();c.moveTo(-8*f.sz,0);c.lineTo(-12*f.sz,-3*f.sz);c.lineTo(-12*f.sz,3*f.sz);c.fill();
        c.restore();c.globalAlpha=1;
    });
    // Dragonflies
    BR.dragonflies.forEach(function(d){
        var dx2=d.x*W,dy2=d.y*H;
        c.fillStyle='#4080c0';c.globalAlpha=.7;
        c.fillRect(dx2-5,dy2-1,10,2);
        var ws=Math.sin(d.wing)*5;
        c.fillStyle='rgba(150,200,255,.4)';
        c.beginPath();c.ellipse(dx2,dy2-ws,8,3,0,0,Math.PI*2);c.fill();
        c.beginPath();c.ellipse(dx2,dy2+ws,8,3,0,0,Math.PI*2);c.fill();
        c.globalAlpha=1;
    });
    // Paddle boat
    var bx=BR.boatX*W,by=BR.boatY*H,rock=Math.sin(t*.04)*3;
    c.save();c.translate(bx,by);c.rotate(rock*.01);
    // Hull
    c.fillStyle='#c04040';
    c.beginPath();c.moveTo(-25,8);c.quadraticCurveTo(-28,0,-20,-6);c.lineTo(20,-6);c.quadraticCurveTo(28,0,25,8);c.quadraticCurveTo(0,12,-25,8);c.fill();
    // Hull stripe
    c.fillStyle='#e06060';c.beginPath();c.moveTo(-22,6);c.quadraticCurveTo(0,10,22,6);c.quadraticCurveTo(0,8,-22,6);c.fill();
    // Hull edge
    c.strokeStyle='#802020';c.lineWidth=1.5;c.beginPath();c.moveTo(-25,8);c.quadraticCurveTo(-28,0,-20,-6);c.lineTo(20,-6);c.quadraticCurveTo(28,0,25,8);c.stroke();
    // Seats
    c.fillStyle='#d08040';c.fillRect(-12,-4,10,5);c.fillRect(4,-4,10,5);
    c.restore();
    // Characters in boat
    var cf=typeof crowFound!=='undefined'&&crowFound||typeof flightCrowFound!=='undefined'&&flightCrowFound;
    if(pikaImg&&pikaImg.complete&&pikaImg.naturalWidth)c.drawImage(pikaImg,bx-18,by-38+rock,28,28);
    if(cf&&crowImg&&crowImg.complete&&crowImg.naturalWidth)c.drawImage(crowImg,bx+2,by-38+rock,28,28);
    // Boat shadow on water
    c.globalAlpha=.08;c.fillStyle='#000';c.beginPath();c.ellipse(bx,by+18,28,6,0,0,Math.PI*2);c.fill();c.globalAlpha=1;
    // HUD
    c.fillStyle='rgba(255,255,255,.5)';c.font='700 '+W*.017+'px Nunito';c.textAlign='center';
    c.fillText('🚣 Tap anywhere to paddle! — Upvan Lake, NaMo Park',W/2,H*.97);c.textAlign='left';
}
