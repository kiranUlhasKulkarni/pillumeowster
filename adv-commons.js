// =============================================
// BOSTON COMMON — 4 SUB-DESTINATIONS
// =============================================

// =============================================
// 1. CHERRY BLOSSOMS — canvas-drawn scene
// =============================================
var CH = { cvs: null, ctx: null, W: 420, H: 400, petals: [], t: 0, run: false, aid: null };

function initCherry() {
    var el = document.getElementById('cherry-scene');
    if (!el) return;
    el.innerHTML = '<canvas id="cherry-cvs" width="420" height="400" style="width:100%;max-width:420px;display:block;margin:0 auto;border-radius:10px;"></canvas>';
    CH.cvs = document.getElementById('cherry-cvs');
    CH.ctx = CH.cvs.getContext('2d');
    CH.t = 0;
    // Init petals
    CH.petals = [];
    for (var i = 0; i < 50; i++) {
        CH.petals.push(mkPetal(true));
    }
    if (!CH.run) { CH.run = true; cherryLoop(); }
}
function stopCherry() { CH.run = false; if (CH.aid) cancelAnimationFrame(CH.aid); }

function mkPetal(rand) {
    return {
        x: Math.random() * CH.W,
        y: rand ? Math.random() * CH.H : -10 - Math.random() * 30,
        vx: 0.3 + Math.random() * 0.8,
        vy: 0.5 + Math.random() * 1.2,
        rot: Math.random() * Math.PI * 2,
        rv: (Math.random() - 0.5) * 0.06,
        sz: 4 + Math.random() * 7,
        wobble: Math.random() * Math.PI * 2,
        col: ['#ffb7c5','#ffa0b4','#ff8da6','#ffc8d8','#ffcce0'][Math.floor(Math.random()*5)],
        opacity: 0.7 + Math.random() * 0.3
    };
}

function cherryLoop() {
    if (!CH.run) return;
    CH.t++;
    cherryDraw();
    CH.aid = requestAnimationFrame(cherryLoop);
}

function cherryDraw() {
    var c = CH.ctx, W = CH.W, H = CH.H, t = CH.t;

    // Sky gradient
    var sky = c.createLinearGradient(0, 0, 0, H * 0.45);
    sky.addColorStop(0, '#e8f0ff'); sky.addColorStop(0.6, '#f0e8f0'); sky.addColorStop(1, '#fce4ec');
    c.fillStyle = sky; c.fillRect(0, 0, W, H * 0.45);

    // Mountains
    c.fillStyle = '#c8b8d0';
    c.beginPath(); c.moveTo(0, H * 0.38); c.quadraticCurveTo(100, H * 0.25, 200, H * 0.35);
    c.quadraticCurveTo(300, H * 0.22, W, H * 0.32); c.lineTo(W, H * 0.45); c.lineTo(0, H * 0.45); c.fill();
    c.fillStyle = '#d8c8e0';
    c.beginPath(); c.moveTo(0, H * 0.4); c.quadraticCurveTo(150, H * 0.3, 300, H * 0.38);
    c.quadraticCurveTo(380, H * 0.32, W, H * 0.38); c.lineTo(W, H * 0.45); c.lineTo(0, H * 0.45); c.fill();

    // Ground — petal-covered pink ground
    var gnd = c.createLinearGradient(0, H * 0.45, 0, H);
    gnd.addColorStop(0, '#f8c8d8'); gnd.addColorStop(0.3, '#f0b8c8'); gnd.addColorStop(1, '#e8a0b0');
    c.fillStyle = gnd; c.fillRect(0, H * 0.44, W, H * 0.56);

    // Path (lighter center)
    c.fillStyle = 'rgba(255,220,230,.5)';
    c.beginPath(); c.moveTo(W * 0.35, H); c.quadraticCurveTo(W * 0.5, H * 0.5, W * 0.48, H * 0.44);
    c.quadraticCurveTo(W * 0.52, H * 0.44, W * 0.54, H * 0.5); c.quadraticCurveTo(W * 0.6, H, W * 0.65, H); c.fill();

    // Ground petal texture
    c.globalAlpha = 0.3;
    for (var gi = 0; gi < 60; gi++) {
        var gx = (gi * 37 + t * 0.1) % W, gy = H * 0.5 + (gi * 23) % (H * 0.48);
        c.fillStyle = ['#ffb0c0','#ffc0d0','#ff90a8','#ffd0e0'][gi % 4];
        c.beginPath(); c.ellipse(gx, gy, 3 + gi % 4, 2, gi * 0.5, 0, Math.PI * 2); c.fill();
    }
    c.globalAlpha = 1;

    // Background trees (smaller, distant)
    for (var bi = 0; bi < 7; bi++) {
        var bx = 40 + bi * 55, by = H * 0.42;
        drawCherryTree(c, bx, by, 0.35, t, bi);
    }

    // Foreground trees (large, framing)
    drawCherryTree(c, -10, H * 0.65, 1.2, t, 10);   // Left tree
    drawCherryTree(c, W + 10, H * 0.65, 1.1, t, 11); // Right tree
    drawCherryTree(c, W * 0.3, H * 0.52, 0.7, t, 12);
    drawCherryTree(c, W * 0.7, H * 0.50, 0.65, t, 13);

    // Gazebo/pavilion in center-back
    drawGazebo(c, W * 0.52, H * 0.38, t);

    // Falling petals
    CH.petals.forEach(function(p) {
        p.x += p.vx + Math.sin(p.wobble + t * 0.02) * 0.5;
        p.y += p.vy;
        p.rot += p.rv;
        p.wobble += 0.03;
        if (p.y > H + 10 || p.x > W + 20) {
            Object.assign(p, mkPetal(false));
            p.x = Math.random() * W;
        }
        c.save();
        c.translate(p.x, p.y);
        c.rotate(p.rot);
        c.globalAlpha = p.opacity;
        c.fillStyle = p.col;
        c.beginPath();
        c.moveTo(0, -p.sz / 2);
        c.quadraticCurveTo(p.sz / 2, -p.sz / 3, p.sz / 3, p.sz / 4);
        c.quadraticCurveTo(0, p.sz / 2, -p.sz / 3, p.sz / 4);
        c.quadraticCurveTo(-p.sz / 2, -p.sz / 3, 0, -p.sz / 2);
        c.fill();
        c.globalAlpha = 1;
        c.restore();
    });

    // Characters
    var cf = typeof crowFound !== 'undefined' && crowFound;
    c.font = '18px sans-serif'; c.textAlign = 'center';
    c.fillText('⚡', W * 0.46, H * 0.78);
    if (cf) c.fillText('🐦‍⬛', W * 0.54, H * 0.78);

    // Caption
    c.fillStyle = 'rgba(255,255,255,.85)'; c.font = '700 9px Nunito';
    c.fillText('🌸 Cherry Blossom Walk — Boston Common', W / 2, H - 8);
    c.textAlign = 'left';
}

function drawCherryTree(c, x, baseY, scale, t, seed) {
    var s = scale;
    c.save(); c.translate(x, baseY);
    // Trunk + branches
    c.strokeStyle = '#5a2838'; c.lineWidth = 6 * s; c.lineCap = 'round';
    // Main trunk
    c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-5 * s, -60 * s, -8 * s, -110 * s); c.stroke();
    // Branches
    var branches = [
        [0, -50 * s, -40 * s, -90 * s, -70 * s, -100 * s],
        [0, -60 * s, 30 * s, -95 * s, 60 * s, -85 * s],
        [-8 * s, -110 * s, -50 * s, -130 * s, -80 * s, -110 * s],
        [-8 * s, -110 * s, 20 * s, -140 * s, 50 * s, -120 * s],
        [-5 * s, -80 * s, -60 * s, -70 * s, -90 * s, -60 * s],
        [0, -70 * s, 50 * s, -60 * s, 80 * s, -55 * s],
    ];
    c.lineWidth = 3 * s;
    branches.forEach(function(b) {
        c.beginPath(); c.moveTo(b[0], b[1]); c.quadraticCurveTo(b[2], b[3], b[4], b[5]); c.stroke();
    });
    // Sub-branches
    c.lineWidth = 1.5 * s; c.strokeStyle = '#6a3848';
    branches.forEach(function(b, i) {
        var ex = b[4], ey = b[5];
        var ang = Math.atan2(ey - b[1], ex - b[0]);
        for (var si = 0; si < 3; si++) {
            var sa = ang + (si - 1) * 0.4;
            var sl = 15 * s + si * 5 * s;
            c.beginPath(); c.moveTo(ex, ey);
            c.lineTo(ex + Math.cos(sa) * sl, ey + Math.sin(sa) * sl); c.stroke();
        }
    });

    // Blossom clusters on branch tips
    branches.forEach(function(b, i) {
        var bx = b[4], by = b[5];
        var sway = Math.sin(t * 0.015 + seed + i) * 3 * s;
        for (var ci = 0; ci < 8; ci++) {
            var cx = bx + (Math.sin(ci * 1.2 + seed) * 20 - 10) * s + sway;
            var cy = by + (Math.cos(ci * 1.5 + seed) * 15 - 8) * s;
            var r = (6 + ci % 4) * s;
            var pink = ['#ffb7c5','#ffa0b4','#ff8da6','#ffc0d0','#ffe0e8'][ci % 5];
            c.fillStyle = pink; c.globalAlpha = 0.7;
            c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.fill();
        }
        // White highlight centers
        for (var wi = 0; wi < 3; wi++) {
            var wx = bx + (Math.sin(wi * 2 + seed) * 10) * s + sway;
            var wy = by + (Math.cos(wi * 2.5 + seed) * 8) * s;
            c.fillStyle = '#fff'; c.globalAlpha = 0.4;
            c.beginPath(); c.arc(wx, wy, 2 * s, 0, Math.PI * 2); c.fill();
        }
    });
    c.globalAlpha = 1;
    c.restore();
}

function drawGazebo(c, x, y, t) {
    c.save(); c.translate(x, y);
    // Pillars
    c.fillStyle = '#c02020';
    c.fillRect(-22, -5, 5, 30); c.fillRect(17, -5, 5, 30);
    c.fillRect(-10, -5, 4, 30); c.fillRect(6, -5, 4, 30);
    // Roof
    c.fillStyle = '#2080a0';
    c.beginPath(); c.moveTo(-35, -5); c.lineTo(0, -25); c.lineTo(35, -5); c.closePath(); c.fill();
    c.fillStyle = '#1870a0';
    c.beginPath(); c.moveTo(-30, -5); c.lineTo(0, -20); c.lineTo(30, -5); c.closePath(); c.fill();
    // Roof edge
    c.strokeStyle = '#c8a020'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(-35, -5); c.lineTo(0, -25); c.lineTo(35, -5); c.stroke();
    // Base
    c.fillStyle = '#d8c8b0'; c.fillRect(-28, 25, 56, 5);
    // Bench
    c.fillStyle = '#8a6040'; c.fillRect(-15, 18, 30, 4);
    c.restore();
}

// =============================================
// 2. TULIP GARDEN — canvas with perspective rows, pluckable, butterflies
// =============================================
var TU = { cvs: null, ctx: null, W: 420, H: 450, tulips: [], butterflies: [], mx: -999, my: -999, t: 0, run: false, aid: null };

function initTulips() {
    var el = document.getElementById('tulip-scene');
    if (!el) return;
    el.innerHTML = '<canvas id="tulip-cvs" width="420" height="450" style="width:100%;max-width:420px;display:block;margin:0 auto;border-radius:10px;cursor:crosshair;"></canvas>';
    TU.cvs = document.getElementById('tulip-cvs');
    TU.ctx = TU.cvs.getContext('2d');
    TU.t = 0;

    // Generate tulip rows in perspective
    var colors = ['#e03040','#ff69b4','#ffd740','#ff8c00','#9b59b6'];
    TU.tulips = [];
    for (var row = 0; row < 12; row++) {
        var depth = 0.3 + row * 0.06; // 0 = far, 1 = near
        var y = 160 + row * 24;
        var count = 12 + row * 2;
        var rowColor = colors[row % 5];
        for (var ti = 0; ti < count; ti++) {
            var x = 10 + ti * ((TU.W - 20) / count) + Math.random() * 8;
            TU.tulips.push({
                x: x, y: y, depth: depth, color: rowColor,
                h: 18 + depth * 20 + Math.random() * 8,
                w: 6 + depth * 6,
                phase: Math.random() * Math.PI * 2,
                plucked: false, regrowAt: 0
            });
        }
    }

    // Butterflies
    TU.butterflies = [];
    for (var bi = 0; bi < 8; bi++) {
        TU.butterflies.push({
            x: 50 + Math.random() * 320, y: 80 + Math.random() * 300,
            vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1,
            wingPhase: Math.random() * Math.PI * 2,
            col: ['#ff69b4','#ffd740','#87ceeb','#ffa500','#da70d6','#98fb98','#ff6347','#dda0dd'][bi],
            fleeing: false
        });
    }

    // Mouse tracking
    TU.cvs.onmousemove = function(e) {
        var r = TU.cvs.getBoundingClientRect();
        TU.mx = (e.clientX - r.left) / r.width * TU.W;
        TU.my = (e.clientY - r.top) / r.height * TU.H;
    };
    TU.cvs.ontouchmove = function(e) {
        e.preventDefault();
        var r = TU.cvs.getBoundingClientRect();
        TU.mx = (e.touches[0].clientX - r.left) / r.width * TU.W;
        TU.my = (e.touches[0].clientY - r.top) / r.height * TU.H;
    };
    TU.cvs.onmouseleave = function() { TU.mx = -999; TU.my = -999; };

    // Click to pluck
    TU.cvs.onclick = function(e) {
        var r = TU.cvs.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width * TU.W;
        var cy = (e.clientY - r.top) / r.height * TU.H;
        // Find nearest tulip
        var best = null, bestD = 25;
        TU.tulips.forEach(function(tp) {
            if (tp.plucked) return;
            var d = Math.hypot(tp.x - cx, (tp.y - tp.h / 2) - cy);
            if (d < bestD) { bestD = d; best = tp; }
        });
        if (best) {
            best.plucked = true;
            best.regrowAt = Date.now() + 5000;
        }
    };

    if (!TU.run) { TU.run = true; tulipLoop(); }
}
function stopTulips() { TU.run = false; if (TU.aid) cancelAnimationFrame(TU.aid); }

function tulipLoop() {
    if (!TU.run) return;
    TU.t++;
    // Regrow check
    var now = Date.now();
    TU.tulips.forEach(function(tp) { if (tp.plucked && now >= tp.regrowAt) tp.plucked = false; });
    tulipDraw();
    TU.aid = requestAnimationFrame(tulipLoop);
}

function tulipDraw() {
    var c = TU.ctx, W = TU.W, H = TU.H, t = TU.t;

    // Sky
    var sky = c.createLinearGradient(0, 0, 0, 160);
    sky.addColorStop(0, '#c8a8d8'); sky.addColorStop(0.5, '#e0c0d0'); sky.addColorStop(1, '#d0e8c0');
    c.fillStyle = sky; c.fillRect(0, 0, W, 160);

    // Clouds
    c.fillStyle = 'rgba(255,255,255,.4)';
    for (var ci = 0; ci < 4; ci++) {
        var cx = (ci * 130 + t * 0.15) % (W + 100) - 50;
        c.beginPath(); c.ellipse(cx, 30 + ci * 15, 50, 15, 0, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.ellipse(cx + 25, 25 + ci * 15, 30, 12, 0, 0, Math.PI * 2); c.fill();
    }

    // Hills
    c.fillStyle = '#6ab848';
    c.beginPath(); c.moveTo(0, 160); c.quadraticCurveTo(100, 120, 210, 145);
    c.quadraticCurveTo(320, 110, W, 140); c.lineTo(W, 160); c.fill();
    c.fillStyle = '#5aa838';
    c.beginPath(); c.moveTo(0, 155); c.quadraticCurveTo(150, 140, 300, 155);
    c.quadraticCurveTo(380, 145, W, 155); c.lineTo(W, 165); c.fill();

    // Windmill
    drawWindmill(c, W * 0.52, 85, t);

    // Cypress trees along horizon
    c.fillStyle = '#2a5a28';
    [60, 130, 290, 350, 390].forEach(function(tx) {
        c.beginPath(); c.moveTo(tx, 160); c.lineTo(tx - 4, 160);
        c.quadraticCurveTo(tx - 5, 100, tx, 75 + Math.sin(tx) * 10);
        c.quadraticCurveTo(tx + 5, 100, tx + 4, 160); c.fill();
    });

    // Dirt ground
    c.fillStyle = '#8a7050'; c.fillRect(0, 158, W, H - 158);

    // Dirt rows (perspective lines)
    c.strokeStyle = '#6a5030'; c.lineWidth = 1;
    for (var ri = 0; ri < 8; ri++) {
        var rx = W * 0.1 + ri * (W * 0.8 / 7);
        c.beginPath(); c.moveTo(W / 2, 165); c.lineTo(rx, H); c.stroke();
    }

    // Tulips (sorted by row for depth)
    TU.tulips.sort(function(a, b) { return a.y - b.y; });
    TU.tulips.forEach(function(tp) {
        if (tp.plucked) {
            // Show stub
            c.fillStyle = '#5a8030';
            c.fillRect(tp.x - 1, tp.y - 4, 2, 8);
            return;
        }
        var sway = Math.sin(t * 0.02 + tp.phase) * 3;
        var h = tp.h, w = tp.w;
        // Stem
        c.strokeStyle = '#3a7020'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(tp.x, tp.y);
        c.quadraticCurveTo(tp.x + sway, tp.y - h * 0.5, tp.x + sway, tp.y - h);
        c.stroke();
        // Leaves
        c.fillStyle = '#4a9030';
        c.save(); c.translate(tp.x, tp.y - h * 0.3);
        c.rotate(-0.3 + sway * 0.02);
        c.beginPath(); c.ellipse(5, 0, 8, 3, 0.3, 0, Math.PI * 2); c.fill();
        c.restore();
        c.save(); c.translate(tp.x, tp.y - h * 0.5);
        c.rotate(0.3 + sway * 0.02);
        c.beginPath(); c.ellipse(-5, 0, 7, 2.5, -0.3, 0, Math.PI * 2); c.fill();
        c.restore();
        // Tulip head
        var hx = tp.x + sway, hy = tp.y - h;
        c.fillStyle = tp.color;
        // Outer petals
        c.beginPath();
        c.moveTo(hx - w / 2, hy);
        c.quadraticCurveTo(hx - w / 2 - 1, hy - w * 0.8, hx, hy - w * 1.1);
        c.quadraticCurveTo(hx + w / 2 + 1, hy - w * 0.8, hx + w / 2, hy);
        c.quadraticCurveTo(hx, hy + w * 0.2, hx - w / 2, hy);
        c.fill();
        // Darker inner
        c.fillStyle = darkenCol(tp.color);
        c.beginPath();
        c.moveTo(hx - w * 0.3, hy);
        c.quadraticCurveTo(hx, hy - w * 0.7, hx + w * 0.3, hy);
        c.quadraticCurveTo(hx, hy + w * 0.1, hx - w * 0.3, hy);
        c.fill();
        // Highlight
        c.fillStyle = 'rgba(255,255,255,.2)';
        c.beginPath(); c.ellipse(hx - w * 0.15, hy - w * 0.5, w * 0.15, w * 0.3, -0.2, 0, Math.PI * 2); c.fill();
    });

    // Butterflies
    TU.butterflies.forEach(function(bf) {
        bf.wingPhase += 0.15;
        // Flee from cursor
        var dx = bf.x - TU.mx, dy = bf.y - TU.my;
        var dist = Math.hypot(dx, dy);
        if (dist < 60 && TU.mx > 0) {
            bf.vx += (dx / dist) * 0.8;
            bf.vy += (dy / dist) * 0.6;
            bf.fleeing = true;
        } else {
            bf.fleeing = false;
            if (Math.random() < 0.02) { bf.vx += (Math.random() - 0.5) * 0.5; bf.vy += (Math.random() - 0.5) * 0.4; }
        }
        bf.vx *= 0.97; bf.vy *= 0.97;
        bf.x += bf.vx; bf.y += bf.vy;
        if (bf.x < 10) bf.vx += 0.3; if (bf.x > W - 10) bf.vx -= 0.3;
        if (bf.y < 30) bf.vy += 0.2; if (bf.y > H - 30) bf.vy -= 0.2;

        var wingSpread = Math.abs(Math.sin(bf.wingPhase)) * 8;
        c.save(); c.translate(bf.x, bf.y);
        var dir = bf.vx > 0 ? 1 : -1;
        c.scale(dir, 1);
        // Wings
        c.fillStyle = bf.col; c.globalAlpha = 0.8;
        c.beginPath(); c.ellipse(-wingSpread, -2, wingSpread + 2, 5, -0.3, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.ellipse(wingSpread, -2, wingSpread + 2, 5, 0.3, 0, Math.PI * 2); c.fill();
        // Wing detail
        c.fillStyle = 'rgba(255,255,255,.3)';
        c.beginPath(); c.ellipse(-wingSpread, -2, wingSpread * 0.5, 2.5, -0.3, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.ellipse(wingSpread, -2, wingSpread * 0.5, 2.5, 0.3, 0, Math.PI * 2); c.fill();
        // Body
        c.fillStyle = '#333'; c.globalAlpha = 1;
        c.fillRect(-1, -4, 2, 8);
        // Antennae
        c.strokeStyle = '#333'; c.lineWidth = 0.5;
        c.beginPath(); c.moveTo(0, -4); c.lineTo(-3, -8); c.stroke();
        c.beginPath(); c.moveTo(0, -4); c.lineTo(3, -8); c.stroke();
        c.restore();
    });

    // Caption
    c.fillStyle = 'rgba(255,255,255,.8)'; c.font = '700 8px Nunito'; c.textAlign = 'center';
    c.fillText('🌷 Tap a tulip to pluck it! • Move cursor near butterflies!', W / 2, H - 6);
    c.textAlign = 'left';
}

function drawWindmill(c, x, y, t) {
    c.save(); c.translate(x, y);
    // Tower
    c.fillStyle = '#8a7050';
    c.beginPath(); c.moveTo(-12, 0); c.lineTo(-8, -50); c.lineTo(8, -50); c.lineTo(12, 0); c.fill();
    c.fillStyle = '#6a5030';
    c.beginPath(); c.moveTo(-8, -50); c.quadraticCurveTo(0, -62, 8, -50); c.fill();
    // Window
    c.fillStyle = '#3a2818'; c.fillRect(-3, -38, 6, 8);
    // Blades (rotating)
    var ang = t * 0.012;
    c.strokeStyle = '#5a4020'; c.lineWidth = 2.5;
    for (var bi = 0; bi < 4; bi++) {
        var ba = ang + bi * Math.PI / 2;
        var bx = Math.cos(ba) * 35, by = Math.sin(ba) * 35;
        c.beginPath(); c.moveTo(0, -50); c.lineTo(bx, -50 + by); c.stroke();
        // Blade fill
        c.fillStyle = 'rgba(90,70,50,.4)';
        c.beginPath();
        c.moveTo(0, -50);
        c.lineTo(bx * 0.3 + Math.cos(ba + 0.2) * 6, -50 + by * 0.3 + Math.sin(ba + 0.2) * 6);
        c.lineTo(bx, -50 + by);
        c.lineTo(bx * 0.3 + Math.cos(ba - 0.15) * 4, -50 + by * 0.3 + Math.sin(ba - 0.15) * 4);
        c.fill();
    }
    // Hub
    c.fillStyle = '#5a4020'; c.beginPath(); c.arc(0, -50, 3, 0, Math.PI * 2); c.fill();
    c.restore();
}

function darkenCol(hex) {
    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return 'rgb(' + Math.max(0, r - 40) + ',' + Math.max(0, g - 40) + ',' + Math.max(0, b - 40) + ')';
}

// =============================================
// 3. POND & BRIDGE — canvas with animated ducks
// =============================================
var PD = { cvs: null, ctx: null, W: 400, H: 360, run: false, aid: null, ducks: [], ripples: [], t: 0 };

function initPond() {
    PD.cvs = document.getElementById('pond-cvs');
    if (!PD.cvs) return;
    PD.cvs.width = PD.W; PD.cvs.height = PD.H;
    PD.ctx = PD.cvs.getContext('2d');
    PD.t = 0; PD.ripples = [];
    PD.ducks = [];
    for (var di = 0; di < 6; di++) {
        PD.ducks.push({
            x: 60 + Math.random() * 280, y: 140 + Math.random() * 140,
            vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.3,
            dir: Math.random() > 0.5 ? 1 : -1, bob: Math.random() * Math.PI * 2, baby: di > 3
        });
    }
    PD.cvs.onclick = function(e) {
        var r = PD.cvs.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width * PD.W;
        var cy = (e.clientY - r.top) / r.height * PD.H;
        PD.ripples.push({ x: cx, y: cy, r: 5, life: 1 });
        PD.ducks.forEach(function(d) {
            var dx = d.x - cx, dy = d.y - cy, dist = Math.hypot(dx, dy);
            if (dist < 120 && dist > 0) { d.vx += (dx / dist) * 2.5; d.vy += (dy / dist) * 1.5; }
        });
    };
    if (!PD.run) { PD.run = true; pondLoop(); }
}
function stopPond() { PD.run = false; if (PD.aid) cancelAnimationFrame(PD.aid); }

function pondLoop() {
    if (!PD.run) return;
    PD.t++;
    PD.ducks.forEach(function(d) {
        d.bob += 0.04; d.x += d.vx; d.y += d.vy;
        d.vx *= 0.99; d.vy *= 0.99;
        if (Math.random() < 0.01) { d.vx += (Math.random() - 0.5) * 0.5; d.vy += (Math.random() - 0.5) * 0.3; }
        if (d.vx > 0.05) d.dir = 1; if (d.vx < -0.05) d.dir = -1;
        if (d.x < 30) { d.x = 30; d.vx = Math.abs(d.vx); }
        if (d.x > PD.W - 30) { d.x = PD.W - 30; d.vx = -Math.abs(d.vx); }
        if (d.y < 120) { d.y = 120; d.vy = Math.abs(d.vy); }
        if (d.y > PD.H - 30) { d.y = PD.H - 30; d.vy = -Math.abs(d.vy); }
        if (PD.t % 12 === 0 && (Math.abs(d.vx) > 0.1 || Math.abs(d.vy) > 0.1))
            PD.ripples.push({ x: d.x, y: d.y + 4, r: 2, life: 0.6 });
    });
    PD.ripples = PD.ripples.filter(function(r) { r.r += 0.4; r.life -= 0.015; return r.life > 0; });
    pondDraw();
    PD.aid = requestAnimationFrame(pondLoop);
}

function pondDraw() {
    var c = PD.ctx, W = PD.W, H = PD.H;
    var skyG = c.createLinearGradient(0, 0, 0, 110);
    skyG.addColorStop(0, '#88c8ff'); skyG.addColorStop(1, '#c0e0ff');
    c.fillStyle = skyG; c.fillRect(0, 0, W, 110);
    for (var ti = 0; ti < 8; ti++) {
        var tx = 15 + ti * 52;
        c.fillStyle = '#6a4828'; c.fillRect(tx, 75, 6, 30);
        c.fillStyle = '#4a9838';
        c.beginPath(); c.ellipse(tx + 3, 72, 18 + Math.sin(PD.t * 0.02 + ti) * 2, 16, 0, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#3a8828';
        c.beginPath(); c.ellipse(tx + 6, 68, 14, 12, 0.3, 0, Math.PI * 2); c.fill();
    }
    c.fillStyle = '#5aaa40';
    c.beginPath(); c.moveTo(0, 115); c.quadraticCurveTo(W / 2, 95, W, 115);
    c.lineTo(W, 125); c.quadraticCurveTo(W / 2, 140, 0, 125); c.fill();
    var waterG = c.createLinearGradient(0, 120, 0, H);
    waterG.addColorStop(0, '#4a98c8'); waterG.addColorStop(1, '#286888');
    c.fillStyle = waterG; c.fillRect(0, 118, W, H - 118);
    c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 1;
    for (var wy = 130; wy < H; wy += 18) {
        c.beginPath();
        for (var wx = 0; wx < W; wx += 4) {
            var yoff = Math.sin(wx * 0.04 + PD.t * 0.03 + wy * 0.1) * 2;
            if (wx === 0) c.moveTo(wx, wy + yoff); else c.lineTo(wx, wy + yoff);
        } c.stroke();
    }
    PD.ripples.forEach(function(rp) {
        c.beginPath(); c.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        c.strokeStyle = 'rgba(255,255,255,' + (rp.life * 0.4) + ')'; c.lineWidth = 1.5; c.stroke();
    });
    // Bridge
    c.fillStyle = '#8a6840';
    c.beginPath(); c.moveTo(0, 165); c.quadraticCurveTo(W * 0.25, 145, W * 0.5, 150);
    c.quadraticCurveTo(W * 0.75, 155, W, 170); c.lineTo(W, 178);
    c.quadraticCurveTo(W * 0.75, 163, W * 0.5, 158);
    c.quadraticCurveTo(W * 0.25, 153, 0, 173); c.fill();
    c.strokeStyle = '#6a4828'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(0, 163); c.quadraticCurveTo(W * 0.25, 143, W * 0.5, 148);
    c.quadraticCurveTo(W * 0.75, 153, W, 168); c.stroke();
    for (var rp = 0; rp < 10; rp++) {
        var rpx = rp * (W / 9), rpy = 163 + Math.sin((rpx / W) * Math.PI) * -18;
        c.fillStyle = '#6a4828'; c.fillRect(rpx, rpy, 3, 12);
    }
    // Ducks
    PD.ducks.forEach(function(d) {
        var bob = Math.sin(d.bob) * 2, sz = d.baby ? 0.6 : 1;
        c.save(); c.translate(d.x, d.y + bob); c.scale(d.dir * sz, sz);
        c.fillStyle = d.baby ? '#e8d860' : '#6a5020';
        c.beginPath(); c.ellipse(0, 0, 14, 9, 0, 0, Math.PI * 2); c.fill();
        c.fillStyle = d.baby ? '#d8c850' : '#8a7040';
        c.beginPath(); c.ellipse(-2, -2, 8, 6, 0.2, 0, Math.PI * 2); c.fill();
        c.fillStyle = d.baby ? '#e8d860' : '#1a6a30';
        c.beginPath(); c.arc(12, -6, d.baby ? 5 : 7, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#111'; c.beginPath(); c.arc(14, -7, 1.2, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#e89020';
        c.beginPath(); c.moveTo(17, -5); c.lineTo(22, -4); c.lineTo(17, -3); c.fill();
        if (!d.baby) { c.strokeStyle = '#fff'; c.lineWidth = 1.5; c.beginPath(); c.arc(10, -3, 4, 0.5, 2.5); c.stroke(); }
        c.restore();
        c.globalAlpha = 0.15; c.fillStyle = '#444';
        c.beginPath(); c.ellipse(d.x, d.y + 12 + bob, 12 * sz, 4, 0, 0, Math.PI * 2); c.fill();
        c.globalAlpha = 1;
    });
    c.fillStyle = 'rgba(0,0,0,.4)'; c.font = '700 9px Nunito'; c.textAlign = 'center';
    c.fillText('🦆 Tap to scatter ducks!', W / 2, H - 8); c.textAlign = 'left';
}

// =============================================
// 4. FOOD STALLS
// =============================================
var FS_MENU = [
    { cat: '🌭 Hot Dogs', items: [
        { name: 'Classic Dog', emoji: '🌭', price: 4.50, desc: 'All-beef frank, mustard, onions' },
        { name: 'Chili Cheese Dog', emoji: '🌭🧀', price: 6.00, desc: 'Loaded with chili and melted cheddar' },
        { name: 'Veggie Dog', emoji: '🥬🌭', price: 5.50, desc: 'Plant-based with all the fixings' },
    ]},
    { cat: '🍦 Ice Cream', items: [
        { name: 'Vanilla Cone', emoji: '🍦', price: 4.00, desc: 'Classic soft-serve vanilla' },
        { name: 'Chocolate Sundae', emoji: '🍫🍨', price: 6.50, desc: 'Hot fudge, whip, cherry on top' },
        { name: 'Strawberry Cup', emoji: '🍓🍨', price: 5.00, desc: 'Fresh strawberry with sprinkles' },
        { name: 'Cookie Dough Waffle', emoji: '🍪🧇', price: 7.00, desc: 'Waffle cone with cookie dough chunks' },
    ]},
    { cat: '🥨 Snacks', items: [
        { name: 'Soft Pretzel', emoji: '🥨', price: 3.50, desc: 'Warm salted pretzel with cheese dip' },
        { name: 'Popcorn', emoji: '🍿', price: 3.00, desc: 'Kettle corn, buttery and sweet' },
        { name: 'Cotton Candy', emoji: '🍬', price: 4.00, desc: 'Pink cloud of spun sugar' },
        { name: 'Churros', emoji: '🥖✨', price: 4.50, desc: 'Cinnamon sugar with chocolate sauce' },
    ]},
    { cat: '🥤 Drinks', items: [
        { name: 'Lemonade', emoji: '🍋', price: 3.50, desc: 'Fresh-squeezed with mint' },
        { name: 'Iced Tea', emoji: '🍵', price: 3.00, desc: 'Sweet peach iced tea' },
        { name: 'Hot Cocoa', emoji: '☕', price: 4.00, desc: 'Rich cocoa with marshmallows' },
        { name: 'Slushie', emoji: '🧊🍒', price: 4.50, desc: 'Cherry-blue raspberry swirl' },
    ]},
];
var fsCart = [], fsView = 'menu', fsCatIdx = 0, fsItemIdx = 0;

function buildFoodStalls() { renderFS(); }

function renderFS() {
    var p = document.getElementById('fs-panel');
    if (!p) return;
    if (fsView === 'menu') {
        var h = '<div class="panel-title">🌭 Boston Common Food Stalls</div>';
        h += '<div style="text-align:center;font-size:2.5rem;margin:8px 0;">🎪</div>';
        for (var ci = 0; ci < FS_MENU.length; ci++) {
            h += '<button class="choice-btn" onclick="fsCatIdx=' + ci + ';fsView=\'cat\';renderFS()"><span class="ce">' + FS_MENU[ci].cat.split(' ')[0] + '</span>' + FS_MENU[ci].cat + '</button>';
        }
        if (fsCart.length > 0) {
            h += '<div style="margin-top:12px;border-top:2px dashed var(--lpink);padding-top:10px;">';
            h += '<div style="font-size:.7rem;font-weight:900;color:#8b005d;margin-bottom:6px;">🛒 Your Tray (' + fsCart.length + ')</div>';
            var tot = 0;
            for (var i = 0; i < fsCart.length; i++) {
                tot += fsCart[i].price;
                h += '<div style="display:flex;justify-content:space-between;font-size:.65rem;font-weight:700;padding:2px 0;color:#666;"><span>' + fsCart[i].emoji + ' ' + fsCart[i].name + '</span><span>$' + fsCart[i].price.toFixed(2) + ' <span style="color:red;cursor:pointer;" onclick="fsCart.splice(' + i + ',1);renderFS()">✕</span></span></div>';
            }
            h += '<div style="font-size:.8rem;font-weight:900;color:#ff1493;margin-top:6px;">Total: $' + tot.toFixed(2) + '</div>';
            h += '<button class="action-btn" onclick="fsCheckout()">Pay & Enjoy! 💳</button></div>';
        }
        p.innerHTML = h;
    } else if (fsView === 'cat') {
        var cat = FS_MENU[fsCatIdx];
        var h = '<div class="panel-title">' + cat.cat + '</div><button class="back-btn" onclick="fsView=\'menu\';renderFS()" style="margin-bottom:8px;">← All Stalls</button>';
        for (var ii = 0; ii < cat.items.length; ii++) {
            var it = cat.items[ii];
            h += '<div class="menu-item" style="text-align:left;cursor:pointer;" onclick="fsItemIdx=' + ii + ';fsView=\'item\';renderFS()"><div style="display:flex;justify-content:space-between;align-items:center;"><span><span style="font-size:1.2rem;">' + it.emoji + '</span> <strong>' + it.name + '</strong></span><span style="font-weight:900;color:#ff1493;">$' + it.price.toFixed(2) + '</span></div><div style="font-size:.6rem;color:#888;font-weight:600;margin-top:2px;">' + it.desc + '</div></div>';
        }
        p.innerHTML = h;
    } else if (fsView === 'item') {
        var it = FS_MENU[fsCatIdx].items[fsItemIdx];
        p.innerHTML = '<button class="back-btn" onclick="fsView=\'cat\';renderFS()" style="margin-bottom:8px;">← ' + FS_MENU[fsCatIdx].cat + '</button><div style="text-align:center;padding:15px;"><div style="font-size:4rem;margin:10px 0;">' + it.emoji + '</div><div style="font-size:1.1rem;font-weight:900;color:#8b005d;">' + it.name + '</div><div style="font-size:.75rem;color:#888;font-weight:700;margin:4px 0;">' + it.desc + '</div><div style="font-size:1.4rem;font-weight:900;color:#ff1493;margin:10px 0;">$' + it.price.toFixed(2) + '</div><button class="action-btn" onclick="fsAddToCart()">Add to Tray 🛒</button></div>';
    } else if (fsView === 'receipt') {
        var cf = typeof crowFound !== 'undefined' && crowFound;
        var emojis = ''; for (var ri = 0; ri < fsCart.length; ri++) emojis += fsCart[ri].emoji + ' ';
        p.innerHTML = '<div style="text-align:center;padding:20px;"><div style="font-size:3rem;">🎉</div><div class="panel-title">Enjoy your food!</div><div style="font-size:2.5rem;margin:15px 0;">' + emojis + '</div><div style="font-size:.8rem;color:#888;font-weight:700;">' + (cf ? 'Pika & Crow share a bench 🌳⚡🐦‍⬛' : 'Pika finds a sunny bench 🌳⚡') + '</div><div style="display:flex;justify-content:center;gap:8px;margin-top:12px;"><button class="action-btn" onclick="fsCart=[];fsView=\'menu\';renderFS()">Order More 🍽️</button><button class="action-btn sec" onclick="show(\'screen-commons\')">Back 🌸</button></div></div>';
    }
}
function fsAddToCart() { var it = FS_MENU[fsCatIdx].items[fsItemIdx]; fsCart.push({ name: it.name, emoji: it.emoji, price: it.price }); fsView = 'menu'; renderFS(); }
function fsCheckout() { fsView = 'receipt'; renderFS(); }
buildFoodStalls();
