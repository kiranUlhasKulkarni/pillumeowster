// =============================================
// BOSTON COMMON — Cherry + Tulips + Pond + Food
// All canvases use fixed resolution for reliable rendering
// =============================================
function setupCvs(cvs, w, h) {
    cvs.width = w; cvs.height = h;
    var ctx = cvs.getContext('2d');
    return { ctx: ctx, W: w, H: h };
}

// =============================================
// 1. CHERRY BLOSSOMS
// =============================================
var CH = { cvs:null,ctx:null,W:800,H:600,petals:[],t:0,run:false,aid:null };

function initCherry() {
    CH.cvs = document.getElementById('cherry-cvs');
    if (!CH.cvs) return;
    CH.t = 0;
    CH.petals = [];
    for (var i = 0; i < 60; i++) CH.petals.push(mkPetal(true));
    var d = setupCvs(CH.cvs, 800, 600); CH.ctx = d.ctx; CH.W = d.W; CH.H = d.H;
    if (!CH.run) { CH.run = true; cherryLoop(); }
}
function stopCherry() { CH.run = false; if (CH.aid) cancelAnimationFrame(CH.aid); }

function mkPetal(rand) {
    return { x: Math.random(), y: rand ? Math.random() : -0.03 - Math.random() * 0.05,
        vx: 0.001 + Math.random() * 0.002, vy: 0.001 + Math.random() * 0.003,
        rot: Math.random() * Math.PI * 2, rv: (Math.random() - .5) * .06,
        sz: 4 + Math.random() * 7, wobble: Math.random() * Math.PI * 2,
        col: ['#ffb7c5','#ffa0b4','#ff8da6','#ffc8d8','#ffcce0'][Math.floor(Math.random()*5)],
        opacity: .7 + Math.random() * .3 };
}

function cherryLoop() { if (!CH.run) return; CH.t++; cherryDraw(); CH.aid = requestAnimationFrame(cherryLoop); }

function cherryDraw() {
    var c = CH.ctx, W = CH.W, H = CH.H, t = CH.t;
    if (!c) return;
    // Sky
    var sky = c.createLinearGradient(0, 0, 0, H * .45);
    sky.addColorStop(0, '#e8f0ff'); sky.addColorStop(.6, '#f0e8f0'); sky.addColorStop(1, '#fce4ec');
    c.fillStyle = sky; c.fillRect(0, 0, W, H * .45);
    // Mountains
    c.fillStyle = '#c8b8d0';
    c.beginPath(); c.moveTo(0, H * .38);
    for (var mx = 0; mx <= W; mx += W / 8) c.lineTo(mx, H * .32 + Math.sin(mx * .01) * H * .04);
    c.lineTo(W, H * .45); c.lineTo(0, H * .45); c.fill();
    c.fillStyle = '#d8c8e0';
    c.beginPath(); c.moveTo(0, H * .4);
    for (var mx = 0; mx <= W; mx += W / 6) c.lineTo(mx, H * .36 + Math.sin(mx * .015 + 1) * H * .03);
    c.lineTo(W, H * .45); c.lineTo(0, H * .45); c.fill();
    // Ground
    var gnd = c.createLinearGradient(0, H * .44, 0, H);
    gnd.addColorStop(0, '#f8c8d8'); gnd.addColorStop(.3, '#f0b8c8'); gnd.addColorStop(1, '#e8a0b0');
    c.fillStyle = gnd; c.fillRect(0, H * .44, W, H * .56);
    // Path
    c.fillStyle = 'rgba(255,220,230,.5)';
    c.beginPath(); c.moveTo(W * .35, H); c.quadraticCurveTo(W * .5, H * .5, W * .48, H * .44);
    c.quadraticCurveTo(W * .52, H * .44, W * .54, H * .5); c.quadraticCurveTo(W * .6, H, W * .65, H); c.fill();
    // Ground petals
    c.globalAlpha = .25;
    for (var gi = 0; gi < 80; gi++) {
        c.fillStyle = ['#ffb0c0','#ffc0d0','#ff90a8','#ffd0e0'][gi % 4];
        c.beginPath(); c.ellipse((gi * 37 + t * .1) % W, H * .5 + (gi * 23) % (H * .48), 3 + gi % 4, 2, gi * .5, 0, Math.PI * 2); c.fill();
    }
    c.globalAlpha = 1;
    // Background trees
    for (var bi = 0; bi < 7; bi++) drawCTree(c, W * (.06 + bi * .13), H * .42, .35, t, bi, W, H);
    // Foreground trees
    drawCTree(c, W * -.02, H * .65, 1.2, t, 10, W, H);
    drawCTree(c, W * 1.02, H * .65, 1.1, t, 11, W, H);
    drawCTree(c, W * .3, H * .52, .7, t, 12, W, H);
    drawCTree(c, W * .7, H * .50, .65, t, 13, W, H);
    // Gazebo
    var gx = W * .52, gy = H * .38;
    c.fillStyle = '#c02020'; c.fillRect(gx - 22, gy - 5, 5, 30); c.fillRect(gx + 17, gy - 5, 5, 30);
    c.fillRect(gx - 10, gy - 5, 4, 30); c.fillRect(gx + 6, gy - 5, 4, 30);
    c.fillStyle = '#2080a0'; c.beginPath(); c.moveTo(gx - 35, gy - 5); c.lineTo(gx, gy - 25); c.lineTo(gx + 35, gy - 5); c.fill();
    c.strokeStyle = '#c8a020'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(gx - 35, gy - 5); c.lineTo(gx, gy - 25); c.lineTo(gx + 35, gy - 5); c.stroke();
    c.fillStyle = '#d8c8b0'; c.fillRect(gx - 28, gy + 25, 56, 5);
    // Falling petals
    CH.petals.forEach(function(p) {
        p.x += p.vx + Math.sin(p.wobble + t * .02) * .001;
        p.y += p.vy; p.rot += p.rv; p.wobble += .03;
        if (p.y > 1.05 || p.x > 1.1) Object.assign(p, mkPetal(false));
        c.save(); c.translate(p.x * W, p.y * H); c.rotate(p.rot);
        c.globalAlpha = p.opacity; c.fillStyle = p.col;
        c.beginPath(); c.moveTo(0, -p.sz / 2);
        c.quadraticCurveTo(p.sz / 2, -p.sz / 3, p.sz / 3, p.sz / 4);
        c.quadraticCurveTo(0, p.sz / 2, -p.sz / 3, p.sz / 4);
        c.quadraticCurveTo(-p.sz / 2, -p.sz / 3, 0, -p.sz / 2);
        c.fill(); c.globalAlpha = 1; c.restore();
    });
    // Characters
    var cf = typeof crowFound !== 'undefined' && crowFound;
    c.font = (H * .045) + 'px sans-serif'; c.textAlign = 'center';
    c.fillText('⚡', W * .46, H * .78); if (cf) c.fillText('🐦‍⬛', W * .54, H * .78);
    c.fillStyle = 'rgba(255,255,255,.8)'; c.font = '700 ' + (W * .02) + 'px Nunito';
    c.fillText('🌸 Cherry Blossom Walk', W / 2, H * .97); c.textAlign = 'left';
}

function drawCTree(c, x, baseY, scale, t, seed, W, H) {
    var s = scale;
    c.save(); c.translate(x, baseY);
    c.strokeStyle = '#5a2838'; c.lineWidth = 6 * s; c.lineCap = 'round';
    c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-5 * s, -60 * s, -8 * s, -110 * s); c.stroke();
    var branches = [[0,-50*s,-40*s,-90*s,-70*s,-100*s],[0,-60*s,30*s,-95*s,60*s,-85*s],
        [-8*s,-110*s,-50*s,-130*s,-80*s,-110*s],[-8*s,-110*s,20*s,-140*s,50*s,-120*s],
        [-5*s,-80*s,-60*s,-70*s,-90*s,-60*s],[0,-70*s,50*s,-60*s,80*s,-55*s]];
    c.lineWidth = 3 * s;
    branches.forEach(function(b) { c.beginPath(); c.moveTo(b[0], b[1]); c.quadraticCurveTo(b[2], b[3], b[4], b[5]); c.stroke(); });
    c.lineWidth = 1.5 * s; c.strokeStyle = '#6a3848';
    branches.forEach(function(b) {
        var ex = b[4], ey = b[5], ang = Math.atan2(ey - b[1], ex - b[0]);
        for (var si = 0; si < 3; si++) { var sa = ang + (si - 1) * .4, sl = (15 + si * 5) * s;
            c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex + Math.cos(sa) * sl, ey + Math.sin(sa) * sl); c.stroke(); }
    });
    branches.forEach(function(b, i) {
        var bx = b[4], by = b[5], sway = Math.sin(t * .015 + seed + i) * 3 * s;
        for (var ci = 0; ci < 8; ci++) {
            var cx2 = bx + (Math.sin(ci * 1.2 + seed) * 20 - 10) * s + sway;
            var cy2 = by + (Math.cos(ci * 1.5 + seed) * 15 - 8) * s;
            c.fillStyle = ['#ffb7c5','#ffa0b4','#ff8da6','#ffc0d0','#ffe0e8'][ci % 5];
            c.globalAlpha = .7; c.beginPath(); c.arc(cx2, cy2, (6 + ci % 4) * s, 0, Math.PI * 2); c.fill();
        }
        for (var wi = 0; wi < 3; wi++) {
            c.fillStyle = '#fff'; c.globalAlpha = .4;
            c.beginPath(); c.arc(bx + Math.sin(wi * 2 + seed) * 10 * s + sway, by + Math.cos(wi * 2.5 + seed) * 8 * s, 2 * s, 0, Math.PI * 2); c.fill();
        }
    });
    c.globalAlpha = 1; c.restore();
}

// =============================================
// 2. TULIP GARDEN
// =============================================
var TU = { cvs:null,ctx:null,W:800,H:640,tulips:[],butterflies:[],mx:-1,my:-1,t:0,run:false,aid:null };

function initTulips() {
    TU.cvs = document.getElementById('tulip-cvs');
    if (!TU.cvs) return;
    TU.t = 0; TU.mx = -1; TU.my = -1;
    var colors = ['#e03040','#ff69b4','#ffd740','#ff8c00','#9b59b6'];
    TU.tulips = [];
    for (var row = 0; row < 14; row++) {
        var count = 10 + row * 2;
        for (var ti = 0; ti < count; ti++) {
            TU.tulips.push({
                x: .02 + ti * (.96 / count) + Math.random() * .02,
                y: .35 + row * .045, color: colors[row % 5],
                h: .04 + row * .003 + Math.random() * .015,
                w: .012 + row * .001, phase: Math.random() * Math.PI * 2,
                plucked: false, regrowAt: 0
            });
        }
    }
    TU.butterflies = [];
    for (var bi = 0; bi < 10; bi++) {
        TU.butterflies.push({ x: .1 + Math.random() * .8, y: .15 + Math.random() * .6,
            vx: (Math.random() - .5) * .003, vy: (Math.random() - .5) * .002,
            wingPhase: Math.random() * Math.PI * 2,
            col: ['#ff69b4','#ffd740','#87ceeb','#ffa500','#da70d6','#98fb98','#ff6347','#dda0dd','#f0e68c','#add8e6'][bi], fleeing: false });
    }
    TU.cvs.onmousemove = function(e) { var r = TU.cvs.getBoundingClientRect(); TU.mx = (e.clientX - r.left) / r.width; TU.my = (e.clientY - r.top) / r.height; };
    TU.cvs.ontouchmove = function(e) { e.preventDefault(); var r = TU.cvs.getBoundingClientRect(); TU.mx = (e.touches[0].clientX - r.left) / r.width; TU.my = (e.touches[0].clientY - r.top) / r.height; };
    TU.cvs.onmouseleave = function() { TU.mx = -1; TU.my = -1; };
    TU.cvs.onclick = function(e) {
        var r = TU.cvs.getBoundingClientRect(), cx = (e.clientX - r.left) / r.width, cy = (e.clientY - r.top) / r.height;
        var best = null, bestD = .04;
        TU.tulips.forEach(function(tp) { if (tp.plucked) return; var d = Math.hypot(tp.x - cx, (tp.y - tp.h / 2) - cy); if (d < bestD) { bestD = d; best = tp; } });
        if (best) { best.plucked = true; best.regrowAt = Date.now() + 5000; }
    };
    var d = setupCvs(TU.cvs, 800, 640); TU.ctx = d.ctx; TU.W = d.W; TU.H = d.H;
    if (!TU.run) { TU.run = true; tulipLoop(); }
}
function stopTulips() { TU.run = false; if (TU.aid) cancelAnimationFrame(TU.aid); }

function tulipLoop() {
    if (!TU.run) return; TU.t++;
    var now = Date.now(); TU.tulips.forEach(function(tp) { if (tp.plucked && now >= tp.regrowAt) tp.plucked = false; });
    tulipDraw(); TU.aid = requestAnimationFrame(tulipLoop);
}

function tulipDraw() {
    var c = TU.ctx, W = TU.W, H = TU.H, t = TU.t; if (!c) return;
    // Sky
    var sky = c.createLinearGradient(0, 0, 0, H * .35);
    sky.addColorStop(0, '#c8a8d8'); sky.addColorStop(.5, '#e0c0d0'); sky.addColorStop(1, '#d0e8c0');
    c.fillStyle = sky; c.fillRect(0, 0, W, H * .35);
    // Clouds
    c.fillStyle = 'rgba(255,255,255,.4)';
    for (var ci = 0; ci < 5; ci++) { var cx2 = (ci * W * .25 + t * .15) % (W + 100) - 50;
        c.beginPath(); c.ellipse(cx2, H * (.06 + ci * .04), W * .1, H * .025, 0, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.ellipse(cx2 + W * .04, H * (.05 + ci * .04), W * .06, H * .02, 0, 0, Math.PI * 2); c.fill(); }
    // Hills
    c.fillStyle = '#6ab848';
    c.beginPath(); c.moveTo(0, H * .35); c.quadraticCurveTo(W * .25, H * .26, W * .5, H * .32);
    c.quadraticCurveTo(W * .75, H * .24, W, H * .3); c.lineTo(W, H * .36); c.fill();
    // Windmill
    var wmx = W * .52, wmy = H * .17;
    c.fillStyle = '#8a7050'; c.beginPath(); c.moveTo(wmx - W * .025, wmy); c.lineTo(wmx - W * .015, wmy - H * .1);
    c.lineTo(wmx + W * .015, wmy - H * .1); c.lineTo(wmx + W * .025, wmy); c.fill();
    c.fillStyle = '#6a5030'; c.beginPath(); c.moveTo(wmx - W * .015, wmy - H * .1);
    c.quadraticCurveTo(wmx, wmy - H * .13, wmx + W * .015, wmy - H * .1); c.fill();
    c.fillStyle = '#3a2818'; c.fillRect(wmx - W * .006, wmy - H * .08, W * .012, H * .016);
    c.strokeStyle = '#5a4020'; c.lineWidth = 2.5;
    for (var bi = 0; bi < 4; bi++) {
        var ba = t * .012 + bi * Math.PI / 2, bl = W * .07;
        c.beginPath(); c.moveTo(wmx, wmy - H * .1); c.lineTo(wmx + Math.cos(ba) * bl, wmy - H * .1 + Math.sin(ba) * bl); c.stroke();
    }
    c.fillStyle = '#5a4020'; c.beginPath(); c.arc(wmx, wmy - H * .1, 3, 0, Math.PI * 2); c.fill();
    // Cypress
    c.fillStyle = '#2a5a28';
    [.14,.3,.66,.8,.9].forEach(function(tx) {
        c.beginPath(); c.moveTo(tx * W, H * .35); c.lineTo(tx * W - 4, H * .35);
        c.quadraticCurveTo(tx * W - 5, H * .22, tx * W, H * .15 + Math.sin(tx * 10) * H * .02);
        c.quadraticCurveTo(tx * W + 5, H * .22, tx * W + 4, H * .35); c.fill();
    });
    // Dirt
    c.fillStyle = '#8a7050'; c.fillRect(0, H * .34, W, H * .66);
    c.strokeStyle = '#6a5030'; c.lineWidth = 1;
    for (var ri = 0; ri < 8; ri++) { c.beginPath(); c.moveTo(W / 2, H * .36); c.lineTo(W * (.1 + ri * .8 / 7), H); c.stroke(); }
    // Tulips
    TU.tulips.forEach(function(tp) {
        if (tp.plucked) { c.fillStyle = '#5a8030'; c.fillRect(tp.x * W - 1, tp.y * H - 4, 2, 8); return; }
        var sway = Math.sin(t * .02 + tp.phase) * W * .006;
        var h = tp.h * H, w = tp.w * W, bx = tp.x * W, by = tp.y * H;
        c.strokeStyle = '#3a7020'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(bx, by); c.quadraticCurveTo(bx + sway, by - h * .5, bx + sway, by - h); c.stroke();
        c.fillStyle = '#4a9030';
        c.save(); c.translate(bx, by - h * .3); c.rotate(-.3 + sway * .003);
        c.beginPath(); c.ellipse(5, 0, 8, 3, .3, 0, Math.PI * 2); c.fill(); c.restore();
        var hx = bx + sway, hy = by - h;
        c.fillStyle = tp.color;
        c.beginPath(); c.moveTo(hx - w / 2, hy);
        c.quadraticCurveTo(hx - w / 2 - 1, hy - w * .8, hx, hy - w * 1.1);
        c.quadraticCurveTo(hx + w / 2 + 1, hy - w * .8, hx + w / 2, hy);
        c.quadraticCurveTo(hx, hy + w * .2, hx - w / 2, hy); c.fill();
        c.fillStyle = dkCol(tp.color);
        c.beginPath(); c.moveTo(hx - w * .3, hy); c.quadraticCurveTo(hx, hy - w * .7, hx + w * .3, hy);
        c.quadraticCurveTo(hx, hy + w * .1, hx - w * .3, hy); c.fill();
        c.fillStyle = 'rgba(255,255,255,.2)';
        c.beginPath(); c.ellipse(hx - w * .15, hy - w * .5, w * .15, w * .3, -.2, 0, Math.PI * 2); c.fill();
    });
    // Butterflies
    TU.butterflies.forEach(function(bf) {
        bf.wingPhase += .15;
        var dx = bf.x - TU.mx, dy = bf.y - TU.my, dist = Math.hypot(dx, dy);
        if (dist < .1 && TU.mx > 0) { bf.vx += dx / dist * .002; bf.vy += dy / dist * .0015; }
        else if (Math.random() < .02) { bf.vx += (Math.random() - .5) * .001; bf.vy += (Math.random() - .5) * .001; }
        bf.vx *= .97; bf.vy *= .97; bf.x += bf.vx; bf.y += bf.vy;
        if (bf.x < .02) bf.vx += .001; if (bf.x > .98) bf.vx -= .001;
        if (bf.y < .05) bf.vy += .001; if (bf.y > .9) bf.vy -= .001;
        var ws = Math.abs(Math.sin(bf.wingPhase)) * W * .018;
        c.save(); c.translate(bf.x * W, bf.y * H); c.scale(bf.vx > 0 ? 1 : -1, 1);
        c.fillStyle = bf.col; c.globalAlpha = .8;
        c.beginPath(); c.ellipse(-ws, -2, ws + 2, 5, -.3, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.ellipse(ws, -2, ws + 2, 5, .3, 0, Math.PI * 2); c.fill();
        c.fillStyle = 'rgba(255,255,255,.3)';
        c.beginPath(); c.ellipse(-ws, -2, ws * .5, 2.5, -.3, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.ellipse(ws, -2, ws * .5, 2.5, .3, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#333'; c.globalAlpha = 1; c.fillRect(-1, -4, 2, 8);
        c.strokeStyle = '#333'; c.lineWidth = .5;
        c.beginPath(); c.moveTo(0, -4); c.lineTo(-3, -8); c.stroke();
        c.beginPath(); c.moveTo(0, -4); c.lineTo(3, -8); c.stroke();
        c.restore();
    });
    c.fillStyle = 'rgba(255,255,255,.7)'; c.font = '700 ' + (W * .018) + 'px Nunito'; c.textAlign = 'center';
    c.fillText('🌷 Tap tulips to pluck! Hover near butterflies!', W / 2, H * .98); c.textAlign = 'left';
}

function dkCol(hex) { if(hex.length===4)hex='#'+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3]; var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return 'rgb(' + Math.max(0, r - 40) + ',' + Math.max(0, g - 40) + ',' + Math.max(0, b - 40) + ')'; }

// =============================================
// 3. POND — fullscreen with DPR
// =============================================
var PD = { cvs:null,ctx:null,W:800,H:600,run:false,aid:null,ducks:[],ripples:[],t:0 };

function initPond() {
    PD.cvs = document.getElementById('pond-cvs');
    if (!PD.cvs) return;
    PD.t = 0; PD.ripples = [];
    PD.ducks = [];
    for (var di = 0; di < 7; di++) PD.ducks.push({ x: .15 + Math.random() * .7, y: .35 + Math.random() * .35,
        vx: (Math.random() - .5) * .002, vy: (Math.random() - .5) * .001, dir: Math.random() > .5 ? 1 : -1, bob: Math.random() * Math.PI * 2, baby: di > 4 });
    PD.cvs.onclick = function(e) {
        var r = PD.cvs.getBoundingClientRect(), cx = (e.clientX - r.left) / r.width, cy = (e.clientY - r.top) / r.height;
        PD.ripples.push({ x: cx, y: cy, r: .01, life: 1 });
        PD.ducks.forEach(function(d) { var dx = d.x - cx, dy = d.y - cy, dist = Math.hypot(dx, dy);
            if (dist < .25 && dist > 0) { d.vx += dx / dist * .008; d.vy += dy / dist * .005; } });
    };
    var d = setupCvs(PD.cvs, 800, 600); PD.ctx = d.ctx; PD.W = d.W; PD.H = d.H;
    if (!PD.run) { PD.run = true; pondLoop(); }
}
function stopPond() { PD.run = false; if (PD.aid) cancelAnimationFrame(PD.aid); }

function pondLoop() {
    if (!PD.run) return; PD.t++;
    PD.ducks.forEach(function(d) { d.bob += .04; d.x += d.vx; d.y += d.vy; d.vx *= .99; d.vy *= .99;
        if (Math.random() < .01) { d.vx += (Math.random() - .5) * .0015; d.vy += (Math.random() - .5) * .001; }
        if (d.vx > .0003) d.dir = 1; if (d.vx < -.0003) d.dir = -1;
        if (d.x < .05) { d.x = .05; d.vx = Math.abs(d.vx); } if (d.x > .95) { d.x = .95; d.vx = -Math.abs(d.vx); }
        if (d.y < .28) { d.y = .28; d.vy = Math.abs(d.vy); } if (d.y > .9) { d.y = .9; d.vy = -Math.abs(d.vy); }
        if (PD.t % 12 === 0 && (Math.abs(d.vx) > .0003 || Math.abs(d.vy) > .0003)) PD.ripples.push({ x: d.x, y: d.y + .01, r: .005, life: .6 });
    });
    PD.ripples = PD.ripples.filter(function(r) { r.r += .001; r.life -= .015; return r.life > 0; });
    pondDraw(); PD.aid = requestAnimationFrame(pondLoop);
}

function pondDraw() {
    var c = PD.ctx, W = PD.W, H = PD.H, t = PD.t; if (!c) return;
    // Sky
    var skyG = c.createLinearGradient(0, 0, 0, H * .26);
    skyG.addColorStop(0, '#88c8ff'); skyG.addColorStop(1, '#c0e0ff');
    c.fillStyle = skyG; c.fillRect(0, 0, W, H * .26);
    // Trees
    for (var ti = 0; ti < 10; ti++) { var tx = ti * (W / 9);
        c.fillStyle = '#6a4828'; c.fillRect(tx, H * .17, W * .012, H * .07);
        c.fillStyle = '#4a9838'; c.beginPath(); c.ellipse(tx + W * .006, H * .16, W * .04 + Math.sin(t * .02 + ti) * 2, H * .035, 0, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#3a8828'; c.beginPath(); c.ellipse(tx + W * .012, H * .155, W * .03, H * .028, .3, 0, Math.PI * 2); c.fill(); }
    // Bank
    c.fillStyle = '#5aaa40';
    c.beginPath(); c.moveTo(0, H * .265); c.quadraticCurveTo(W / 2, H * .22, W, H * .265);
    c.lineTo(W, H * .3); c.quadraticCurveTo(W / 2, H * .33, 0, H * .3); c.fill();
    // Water
    var waterG = c.createLinearGradient(0, H * .28, 0, H);
    waterG.addColorStop(0, '#4a98c8'); waterG.addColorStop(1, '#286888');
    c.fillStyle = waterG; c.fillRect(0, H * .28, W, H * .72);
    c.strokeStyle = 'rgba(255,255,255,.07)'; c.lineWidth = 1;
    for (var wy = .3; wy < 1; wy += .04) {
        c.beginPath(); for (var wx = 0; wx < W; wx += 3) { var yo = Math.sin(wx * .04 + t * .03 + wy * H * .1) * H * .004;
            if (wx === 0) c.moveTo(wx, wy * H + yo); else c.lineTo(wx, wy * H + yo); } c.stroke(); }
    PD.ripples.forEach(function(rp) { c.beginPath(); c.arc(rp.x * W, rp.y * H, rp.r * W, 0, Math.PI * 2);
        c.strokeStyle = 'rgba(255,255,255,' + rp.life * .4 + ')'; c.lineWidth = 1.5; c.stroke(); });
    // Bridge
    c.fillStyle = '#8a6840';
    c.beginPath(); c.moveTo(0, H * .39); c.quadraticCurveTo(W * .25, H * .34, W * .5, H * .35);
    c.quadraticCurveTo(W * .75, H * .36, W, H * .4); c.lineTo(W, H * .42);
    c.quadraticCurveTo(W * .75, H * .38, W * .5, H * .37); c.quadraticCurveTo(W * .25, H * .36, 0, H * .41); c.fill();
    c.strokeStyle = '#6a4828'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(0, H * .38); c.quadraticCurveTo(W * .25, H * .33, W * .5, H * .34);
    c.quadraticCurveTo(W * .75, H * .35, W, H * .39); c.stroke();
    for (var rp = 0; rp < 12; rp++) { var rpx = rp * (W / 11); c.fillStyle = '#6a4828'; c.fillRect(rpx, H * .38 + Math.sin(rpx / W * Math.PI) * -H * .04, 3, H * .03); }
    // Ducks
    PD.ducks.forEach(function(d) {
        var bob = Math.sin(d.bob) * H * .005, sz = d.baby ? .6 : 1;
        var dx2 = d.x * W, dy2 = d.y * H + bob;
        c.save(); c.translate(dx2, dy2); c.scale(d.dir * sz, sz);
        c.fillStyle = d.baby ? '#e8d860' : '#6a5020'; c.beginPath(); c.ellipse(0, 0, 14, 9, 0, 0, Math.PI * 2); c.fill();
        c.fillStyle = d.baby ? '#d8c850' : '#8a7040'; c.beginPath(); c.ellipse(-2, -2, 8, 6, .2, 0, Math.PI * 2); c.fill();
        c.fillStyle = d.baby ? '#e8d860' : '#1a6a30'; c.beginPath(); c.arc(12, -6, d.baby ? 5 : 7, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#111'; c.beginPath(); c.arc(14, -7, 1.2, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#e89020'; c.beginPath(); c.moveTo(17, -5); c.lineTo(22, -4); c.lineTo(17, -3); c.fill();
        if (!d.baby) { c.strokeStyle = '#fff'; c.lineWidth = 1.5; c.beginPath(); c.arc(10, -3, 4, .5, 2.5); c.stroke(); }
        c.restore();
        c.globalAlpha = .15; c.fillStyle = '#444'; c.beginPath(); c.ellipse(dx2, dy2 + 12, 12 * sz, 4, 0, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1;
    });
    c.fillStyle = 'rgba(255,255,255,.5)'; c.font = '700 ' + (W * .02) + 'px Nunito'; c.textAlign = 'center';
    c.fillText('🦆 Tap to scatter ducks!', W / 2, H * .97); c.textAlign = 'left';
}

// =============================================
// 4. FOOD STALLS (unchanged, no canvas)
// =============================================
var FS_MENU=[{cat:'🌭 Hot Dogs',items:[{name:'Classic Dog',emoji:'🌭',price:4.50,desc:'All-beef frank, mustard, onions'},{name:'Chili Cheese Dog',emoji:'🌭🧀',price:6.00,desc:'Loaded with chili and cheddar'},{name:'Veggie Dog',emoji:'🥬🌭',price:5.50,desc:'Plant-based with fixings'}]},{cat:'🍦 Ice Cream',items:[{name:'Vanilla Cone',emoji:'🍦',price:4.00,desc:'Classic soft-serve'},{name:'Chocolate Sundae',emoji:'🍫🍨',price:6.50,desc:'Hot fudge, whip, cherry'},{name:'Strawberry Cup',emoji:'🍓🍨',price:5.00,desc:'Fresh strawberry + sprinkles'},{name:'Cookie Dough Waffle',emoji:'🍪🧇',price:7.00,desc:'Waffle cone + cookie dough'}]},{cat:'🥨 Snacks',items:[{name:'Soft Pretzel',emoji:'🥨',price:3.50,desc:'Warm salted + cheese dip'},{name:'Popcorn',emoji:'🍿',price:3.00,desc:'Kettle corn, buttery'},{name:'Cotton Candy',emoji:'🍬',price:4.00,desc:'Pink spun sugar'},{name:'Churros',emoji:'🥖✨',price:4.50,desc:'Cinnamon sugar + chocolate'}]},{cat:'🥤 Drinks',items:[{name:'Lemonade',emoji:'🍋',price:3.50,desc:'Fresh-squeezed + mint'},{name:'Iced Tea',emoji:'🍵',price:3.00,desc:'Sweet peach'},{name:'Hot Cocoa',emoji:'☕',price:4.00,desc:'Rich cocoa + marshmallows'},{name:'Slushie',emoji:'🧊🍒',price:4.50,desc:'Cherry-blue raspberry'}]}];
var fsCart=[],fsView='menu',fsCatIdx=0,fsItemIdx=0;
function buildFoodStalls(){renderFS();}
function renderFS(){var p=document.getElementById('fs-panel');if(!p)return;if(fsView==='menu'){var h='<div class="panel-title">🌭 Food Stalls</div><div style="text-align:center;font-size:2.5rem;margin:8px 0;">🎪</div>';for(var ci=0;ci<FS_MENU.length;ci++)h+='<button class="choice-btn" onclick="fsCatIdx='+ci+';fsView=\'cat\';renderFS()"><span class="ce">'+FS_MENU[ci].cat.split(' ')[0]+'</span>'+FS_MENU[ci].cat+'</button>';if(fsCart.length>0){h+='<div style="margin-top:12px;border-top:2px dashed var(--lpink);padding-top:10px;"><div style="font-size:.7rem;font-weight:900;color:#8b005d;margin-bottom:6px;">🛒 Tray ('+fsCart.length+')</div>';var tot=0;for(var i=0;i<fsCart.length;i++){tot+=fsCart[i].price;h+='<div style="display:flex;justify-content:space-between;font-size:.65rem;font-weight:700;padding:2px 0;color:#666;"><span>'+fsCart[i].emoji+' '+fsCart[i].name+'</span><span>$'+fsCart[i].price.toFixed(2)+' <span style="color:red;cursor:pointer;" onclick="fsCart.splice('+i+',1);renderFS()">✕</span></span></div>';}h+='<div style="font-size:.8rem;font-weight:900;color:#ff1493;margin-top:6px;">Total: $'+tot.toFixed(2)+'</div><button class="action-btn" onclick="fsCheckout()">Pay 💳</button></div>';}p.innerHTML=h;}else if(fsView==='cat'){var cat=FS_MENU[fsCatIdx];var h='<div class="panel-title">'+cat.cat+'</div><button class="back-btn" onclick="fsView=\'menu\';renderFS()" style="margin-bottom:8px;">← Stalls</button>';for(var ii=0;ii<cat.items.length;ii++){var it=cat.items[ii];h+='<div class="menu-item" style="text-align:left;cursor:pointer;" onclick="fsItemIdx='+ii+';fsView=\'item\';renderFS()"><div style="display:flex;justify-content:space-between;"><span><span style="font-size:1.2rem;">'+it.emoji+'</span> <strong>'+it.name+'</strong></span><span style="font-weight:900;color:#ff1493;">$'+it.price.toFixed(2)+'</span></div><div style="font-size:.6rem;color:#888;font-weight:600;">'+it.desc+'</div></div>';}p.innerHTML=h;}else if(fsView==='item'){var it=FS_MENU[fsCatIdx].items[fsItemIdx];p.innerHTML='<button class="back-btn" onclick="fsView=\'cat\';renderFS()" style="margin-bottom:8px;">← '+FS_MENU[fsCatIdx].cat+'</button><div style="text-align:center;padding:15px;"><div style="font-size:4rem;">'+it.emoji+'</div><div style="font-size:1.1rem;font-weight:900;color:#8b005d;">'+it.name+'</div><div style="font-size:.75rem;color:#888;font-weight:700;">'+it.desc+'</div><div style="font-size:1.4rem;font-weight:900;color:#ff1493;margin:10px 0;">$'+it.price.toFixed(2)+'</div><button class="action-btn" onclick="fsAddToCart()">Add to Tray 🛒</button></div>';}else{var cf=typeof crowFound!=='undefined'&&crowFound;var em='';for(var i=0;i<fsCart.length;i++)em+=fsCart[i].emoji+' ';p.innerHTML='<div style="text-align:center;padding:20px;"><div style="font-size:3rem;">🎉</div><div class="panel-title">Enjoy!</div><div style="font-size:2.5rem;margin:15px 0;">'+em+'</div><div style="font-size:.8rem;color:#888;font-weight:700;">'+(cf?'Pika & Crow share a bench ⚡🐦‍⬛':'Pika on a sunny bench ⚡')+'</div><button class="action-btn" onclick="fsCart=[];fsView=\'menu\';renderFS()">More 🍽️</button><button class="action-btn sec" onclick="show(\'screen-commons\')">Back 🌸</button></div>';}}
function fsAddToCart(){fsCart.push({name:FS_MENU[fsCatIdx].items[fsItemIdx].name,emoji:FS_MENU[fsCatIdx].items[fsItemIdx].emoji,price:FS_MENU[fsCatIdx].items[fsItemIdx].price});fsView='menu';renderFS();}
function fsCheckout(){fsView='receipt';renderFS();}
buildFoodStalls();
