// =============================================
// BOSTON COMMON — 4 SUB-DESTINATIONS
// =============================================

// =============================================
// 1. CHERRY BLOSSOMS — animated trees + falling petals
// =============================================
(function buildCherry() {
    var el = document.getElementById('cherry-scene');
    if (!el) return;
    el.innerHTML = '';
    el.style.cssText = 'position:relative;width:100%;height:420px;overflow:hidden;background:linear-gradient(180deg,#e8f0ff 0%,#d0e8ff 40%,#88c060 40%,#6aaa40 100%);border-radius:10px;';

    // Path
    var path = document.createElement('div');
    path.style.cssText = 'position:absolute;bottom:0;left:10%;width:80%;height:22%;background:linear-gradient(180deg,#d8c8a0,#c8b890);border-radius:60% 60% 0 0;opacity:.5;';
    el.appendChild(path);

    // Trees
    var treeData = [
        { x: 12, h: 180, canopy: 110, delay: 0 },
        { x: 35, h: 200, canopy: 130, delay: 0.5 },
        { x: 58, h: 170, canopy: 100, delay: 1 },
        { x: 80, h: 190, canopy: 120, delay: 0.3 },
        { x: 22, h: 140, canopy: 85, delay: 0.8 },
        { x: 68, h: 150, canopy: 90, delay: 1.2 },
    ];
    treeData.forEach(function(t) {
        // Trunk
        var trunk = document.createElement('div');
        trunk.style.cssText = 'position:absolute;bottom:18%;left:' + t.x + '%;width:12px;height:' + (t.h * 0.35) + 'px;background:linear-gradient(90deg,#5a3a20,#8a6040,#5a3a20);border-radius:3px;transform:translateX(-50%);z-index:2;';
        el.appendChild(trunk);
        // Canopy (multiple overlapping circles for fullness)
        for (var ci = 0; ci < 5; ci++) {
            var blob = document.createElement('div');
            var ox = (ci - 2) * t.canopy * 0.22;
            var oy = -ci * 8 + Math.random() * 15;
            var sz = t.canopy * (0.6 + Math.random() * 0.35);
            var pinkShade = ['#ffb7c5', '#ffa0b4', '#ff8da6', '#ffc0d0', '#ff90b8'][ci];
            blob.style.cssText = 'position:absolute;bottom:' + (18 + t.h * 0.28) + '%;left:calc(' + t.x + '% + ' + ox + 'px);width:' + sz + 'px;height:' + (sz * 0.75) + 'px;background:radial-gradient(ellipse,' + pinkShade + ',' + pinkShade + ' 60%,transparent);border-radius:50%;transform:translateX(-50%) translateY(' + oy + 'px);z-index:3;animation:canopySway ' + (3 + ci * 0.5) + 's ease-in-out ' + t.delay + 's infinite alternate;';
            el.appendChild(blob);
        }
    });

    // Falling petals (CSS animated)
    for (var pi = 0; pi < 35; pi++) {
        var petal = document.createElement('div');
        var sx = Math.random() * 100;
        var dur = 4 + Math.random() * 5;
        var del = Math.random() * 8;
        var sz = 6 + Math.random() * 8;
        var drift = -30 + Math.random() * 60;
        var pCol = ['#ffb7c5', '#ffa0b4', '#ff8da6', '#ffc0d0', '#fff0f5'][Math.floor(Math.random() * 5)];
        petal.style.cssText = 'position:absolute;top:-10px;left:' + sx + '%;width:' + sz + 'px;height:' + (sz * 0.7) + 'px;background:' + pCol + ';border-radius:50% 0 50% 50%;opacity:.8;z-index:10;animation:petalFall ' + dur + 's linear ' + del + 's infinite;--drift:' + drift + 'px;';
        el.appendChild(petal);
    }

    // Bench
    var bench = document.createElement('div');
    bench.style.cssText = 'position:absolute;bottom:16%;left:44%;width:45px;height:18px;background:linear-gradient(180deg,#8a6040,#6a4030);border-radius:3px 3px 0 0;z-index:5;box-shadow:0 2px 4px rgba(0,0,0,.15);';
    el.appendChild(bench);
    var benchLegs = document.createElement('div');
    benchLegs.style.cssText = 'position:absolute;bottom:12.5%;left:45%;width:4px;height:12px;background:#5a3020;z-index:5;box-shadow:36px 0 0 #5a3020;';
    el.appendChild(benchLegs);

    // Characters sitting on bench
    var chars = document.createElement('div');
    chars.style.cssText = 'position:absolute;bottom:22%;left:44%;font-size:1.4rem;z-index:6;';
    chars.innerHTML = (typeof crowFound !== 'undefined' && crowFound) ? '⚡🐦‍⬛' : '⚡';
    el.appendChild(chars);

    // Caption
    var cap = document.createElement('div');
    cap.style.cssText = 'position:absolute;bottom:4px;left:0;right:0;text-align:center;font-size:.7rem;font-weight:800;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.4);z-index:11;';
    cap.innerText = '🌸 Cherry Blossom Walk — Boston Common';
    el.appendChild(cap);

    // Inject keyframes if not already done
    if (!document.getElementById('cherry-keyframes')) {
        var style = document.createElement('style');
        style.id = 'cherry-keyframes';
        style.textContent = '@keyframes petalFall{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:.9;}50%{transform:translateY(220px) translateX(var(--drift)) rotate(180deg);opacity:.7;}100%{transform:translateY(450px) translateX(calc(var(--drift)*1.5)) rotate(360deg);opacity:0;}}@keyframes canopySway{0%{transform:translateX(-50%) rotate(-2deg);}100%{transform:translateX(-50%) rotate(2deg);}}';
        document.head.appendChild(style);
    }
})();

// =============================================
// 2. TULIP GARDEN — 5 colors, gentle sway
// =============================================
(function buildTulips() {
    var el = document.getElementById('tulip-scene');
    if (!el) return;
    el.innerHTML = '';
    el.style.cssText = 'position:relative;width:100%;height:420px;overflow:hidden;background:linear-gradient(180deg,#d0e8ff 0%,#b8e0ff 30%,#5aaa40 30%,#408830 100%);border-radius:10px;';

    // Garden path
    var gp = document.createElement('div');
    gp.style.cssText = 'position:absolute;bottom:0;left:20%;width:60%;height:15%;background:linear-gradient(180deg,#c8b88c,#b8a878);border-radius:50% 50% 0 0;opacity:.5;z-index:2;';
    el.appendChild(gp);

    // Garden bed rows
    var colors = ['#e03040', '#ff69b4', '#ffd740', '#ff8c00', '#9b59b6'];
    var colorNames = ['Red', 'Pink', 'Yellow', 'Orange', 'Purple'];

    for (var row = 0; row < 5; row++) {
        var baseY = 28 + row * 12;
        var count = 8 + Math.floor(Math.random() * 4);
        for (var ti = 0; ti < count; ti++) {
            var tx = 5 + ti * (90 / count) + Math.random() * 4;
            var col = colors[row];
            var h = 28 + Math.random() * 18;
            var tulipW = 10 + Math.random() * 5;
            var delay = Math.random() * 3;

            // Stem
            var stem = document.createElement('div');
            stem.style.cssText = 'position:absolute;bottom:' + baseY + '%;left:' + tx + '%;width:2px;height:' + h + 'px;background:linear-gradient(180deg,#3a8020,#2a6818);z-index:3;transform-origin:bottom center;animation:tulipSway ' + (2.5 + Math.random() * 2) + 's ease-in-out ' + delay + 's infinite alternate;';
            el.appendChild(stem);

            // Leaf
            if (Math.random() > 0.4) {
                var leaf = document.createElement('div');
                var leafSide = Math.random() > 0.5 ? 'left' : 'right';
                leaf.style.cssText = 'position:absolute;bottom:' + (baseY + 2) + '%;left:calc(' + tx + '% + ' + (leafSide === 'left' ? '-8px' : '3px') + ');width:8px;height:14px;background:#4a9030;border-radius:' + (leafSide === 'left' ? '50% 0 50% 50%' : '0 50% 50% 50%') + ';z-index:3;transform:rotate(' + (leafSide === 'left' ? '-20' : '20') + 'deg);animation:tulipSway ' + (2.5 + Math.random() * 2) + 's ease-in-out ' + delay + 's infinite alternate;';
                el.appendChild(leaf);
            }

            // Tulip head (cup shape via layered divs)
            var head = document.createElement('div');
            head.style.cssText = 'position:absolute;bottom:calc(' + baseY + '% + ' + h + 'px);left:calc(' + tx + '% - ' + (tulipW / 2 - 1) + 'px);width:' + tulipW + 'px;height:' + (tulipW * 0.8) + 'px;background:radial-gradient(ellipse at 50% 80%,' + col + ',' + darkenCol(col) + ');border-radius:40% 40% 5% 5%;z-index:4;animation:tulipSway ' + (2.5 + Math.random() * 2) + 's ease-in-out ' + delay + 's infinite alternate;box-shadow:inset 0 -3px 4px rgba(0,0,0,.15);';
            el.appendChild(head);
            // Inner petal highlight
            var inner = document.createElement('div');
            inner.style.cssText = 'position:absolute;bottom:calc(' + baseY + '% + ' + (h + tulipW * 0.15) + 'px);left:calc(' + tx + '% - ' + (tulipW * 0.2) + 'px);width:' + (tulipW * 0.5) + 'px;height:' + (tulipW * 0.4) + 'px;background:rgba(255,255,255,.25);border-radius:50%;z-index:5;animation:tulipSway ' + (2.5 + Math.random() * 2) + 's ease-in-out ' + delay + 's infinite alternate;';
            el.appendChild(inner);
        }
    }

    // Color legend
    var legend = document.createElement('div');
    legend.style.cssText = 'position:absolute;bottom:6px;left:0;right:0;text-align:center;z-index:10;';
    var legHTML = '';
    for (var ci = 0; ci < 5; ci++) {
        legHTML += '<span style="display:inline-block;width:10px;height:10px;background:' + colors[ci] + ';border-radius:30% 30% 5% 5%;margin:0 3px;vertical-align:middle;box-shadow:0 1px 2px rgba(0,0,0,.2);"></span>';
    }
    legHTML += '<span style="font-size:.6rem;font-weight:800;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.3);vertical-align:middle;margin-left:4px;">🌷 Five-Color Tulip Garden</span>';
    legend.innerHTML = legHTML;
    el.appendChild(legend);

    // Butterfly
    for (var bi = 0; bi < 3; bi++) {
        var bf = document.createElement('div');
        bf.style.cssText = 'position:absolute;top:' + (15 + bi * 20) + '%;left:' + (20 + bi * 25) + '%;font-size:1rem;z-index:12;animation:butterfly ' + (5 + bi * 2) + 's ease-in-out ' + bi + 's infinite alternate;';
        bf.innerText = '🦋';
        el.appendChild(bf);
    }

    if (!document.getElementById('tulip-keyframes')) {
        var style = document.createElement('style');
        style.id = 'tulip-keyframes';
        style.textContent = '@keyframes tulipSway{0%{transform:rotate(-3deg);}100%{transform:rotate(3deg);}}@keyframes butterfly{0%{transform:translate(0,0) scaleX(1);}25%{transform:translate(40px,-20px) scaleX(-1);}50%{transform:translate(80px,10px) scaleX(1);}75%{transform:translate(30px,-30px) scaleX(-1);}100%{transform:translate(-20px,5px) scaleX(1);}}';
        document.head.appendChild(style);
    }
})();

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
    PD.t = 0;
    PD.ripples = [];
    // Ducks
    PD.ducks = [];
    for (var di = 0; di < 6; di++) {
        PD.ducks.push({
            x: 60 + Math.random() * 280,
            y: 140 + Math.random() * 140,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.3,
            dir: Math.random() > 0.5 ? 1 : -1,
            bob: Math.random() * Math.PI * 2,
            baby: di > 3
        });
    }
    // Click to scatter
    PD.cvs.onclick = function(e) {
        var r = PD.cvs.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width * PD.W;
        var cy = (e.clientY - r.top) / r.height * PD.H;
        PD.ripples.push({ x: cx, y: cy, r: 5, maxR: 40, life: 1 });
        PD.ducks.forEach(function(d) {
            var dx = d.x - cx, dy = d.y - cy;
            var dist = Math.hypot(dx, dy);
            if (dist < 120 && dist > 0) {
                d.vx += (dx / dist) * 2.5;
                d.vy += (dy / dist) * 1.5;
            }
        });
    };
    if (!PD.run) { PD.run = true; pondLoop(); }
}

function stopPond() { PD.run = false; if (PD.aid) cancelAnimationFrame(PD.aid); }

function pondLoop() {
    if (!PD.run) return;
    PD.t++;
    pondUpdate();
    pondDraw();
    PD.aid = requestAnimationFrame(pondLoop);
}

function pondUpdate() {
    PD.ducks.forEach(function(d) {
        d.bob += 0.04;
        d.x += d.vx; d.y += d.vy;
        d.vx *= 0.99; d.vy *= 0.99;
        // Random wander
        if (Math.random() < 0.01) { d.vx += (Math.random() - 0.5) * 0.5; d.vy += (Math.random() - 0.5) * 0.3; }
        // Direction
        if (d.vx > 0.05) d.dir = 1;
        if (d.vx < -0.05) d.dir = -1;
        // Bounds (pond area)
        if (d.x < 30) { d.x = 30; d.vx = Math.abs(d.vx); }
        if (d.x > PD.W - 30) { d.x = PD.W - 30; d.vx = -Math.abs(d.vx); }
        if (d.y < 120) { d.y = 120; d.vy = Math.abs(d.vy); }
        if (d.y > PD.H - 30) { d.y = PD.H - 30; d.vy = -Math.abs(d.vy); }
        // Wake trail
        if (PD.t % 12 === 0 && (Math.abs(d.vx) > 0.1 || Math.abs(d.vy) > 0.1)) {
            PD.ripples.push({ x: d.x, y: d.y + 4, r: 2, maxR: 12, life: 0.6 });
        }
    });
    PD.ripples = PD.ripples.filter(function(r) {
        r.r += 0.4; r.life -= 0.015;
        return r.life > 0;
    });
}

function pondDraw() {
    var c = PD.ctx, W = PD.W, H = PD.H;
    // Sky
    var skyG = c.createLinearGradient(0, 0, 0, 110);
    skyG.addColorStop(0, '#88c8ff'); skyG.addColorStop(1, '#c0e0ff');
    c.fillStyle = skyG; c.fillRect(0, 0, W, 110);
    // Trees on bank
    for (var ti = 0; ti < 8; ti++) {
        var tx = 15 + ti * 52;
        // Trunk
        c.fillStyle = '#6a4828'; c.fillRect(tx, 75, 6, 30);
        // Canopy
        c.fillStyle = '#4a9838';
        c.beginPath(); c.ellipse(tx + 3, 72, 18 + Math.sin(PD.t * 0.02 + ti) * 2, 16, 0, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#3a8828';
        c.beginPath(); c.ellipse(tx + 6, 68, 14 + Math.sin(PD.t * 0.025 + ti) * 2, 12, 0.3, 0, Math.PI * 2); c.fill();
    }
    // Bank / grass
    c.fillStyle = '#5aaa40';
    c.beginPath(); c.moveTo(0, 115); c.quadraticCurveTo(W / 2, 95, W, 115);
    c.lineTo(W, 125); c.quadraticCurveTo(W / 2, 140, 0, 125); c.fill();
    // Water
    var waterG = c.createLinearGradient(0, 120, 0, H);
    waterG.addColorStop(0, '#4a98c8'); waterG.addColorStop(0.4, '#3888b8'); waterG.addColorStop(1, '#286888');
    c.fillStyle = waterG; c.fillRect(0, 118, W, H - 118);
    // Water ripple lines
    c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 1;
    for (var wy = 130; wy < H; wy += 18) {
        c.beginPath();
        for (var wx = 0; wx < W; wx += 4) {
            var yoff = Math.sin(wx * 0.04 + PD.t * 0.03 + wy * 0.1) * 2;
            if (wx === 0) c.moveTo(wx, wy + yoff);
            else c.lineTo(wx, wy + yoff);
        }
        c.stroke();
    }
    // Ripples
    PD.ripples.forEach(function(rp) {
        c.beginPath(); c.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        c.strokeStyle = 'rgba(255,255,255,' + (rp.life * 0.4) + ')'; c.lineWidth = 1.5; c.stroke();
    });
    // Bridge
    c.fillStyle = '#8a6840';
    c.beginPath();
    c.moveTo(0, 165); c.quadraticCurveTo(W * 0.25, 145, W * 0.5, 150);
    c.quadraticCurveTo(W * 0.75, 155, W, 170);
    c.lineTo(W, 178);
    c.quadraticCurveTo(W * 0.75, 163, W * 0.5, 158);
    c.quadraticCurveTo(W * 0.25, 153, 0, 173);
    c.fill();
    // Bridge railings
    c.strokeStyle = '#6a4828'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(0, 163); c.quadraticCurveTo(W * 0.25, 143, W * 0.5, 148);
    c.quadraticCurveTo(W * 0.75, 153, W, 168); c.stroke();
    // Railing posts
    for (var rp = 0; rp < 10; rp++) {
        var rpx = rp * (W / 9);
        var rpy = 163 + Math.sin((rpx / W) * Math.PI) * -18;
        c.fillStyle = '#6a4828'; c.fillRect(rpx, rpy, 3, 12);
    }
    // Bridge wood planks
    c.strokeStyle = 'rgba(0,0,0,.06)'; c.lineWidth = 0.5;
    for (var pl = 10; pl < W; pl += 12) {
        var ply = 168 + Math.sin((pl / W) * Math.PI) * -16;
        c.beginPath(); c.moveTo(pl, ply); c.lineTo(pl, ply + 10); c.stroke();
    }

    // Ducks
    PD.ducks.forEach(function(d) {
        var bob = Math.sin(d.bob) * 2;
        var sz = d.baby ? 0.6 : 1;
        c.save();
        c.translate(d.x, d.y + bob);
        c.scale(d.dir * sz, sz);
        // Body
        c.fillStyle = d.baby ? '#e8d860' : '#6a5020';
        c.beginPath(); c.ellipse(0, 0, 14, 9, 0, 0, Math.PI * 2); c.fill();
        // Wing
        c.fillStyle = d.baby ? '#d8c850' : '#8a7040';
        c.beginPath(); c.ellipse(-2, -2, 8, 6, 0.2, 0, Math.PI * 2); c.fill();
        // Head
        c.fillStyle = d.baby ? '#e8d860' : '#1a6a30';
        c.beginPath(); c.arc(12, -6, d.baby ? 5 : 7, 0, Math.PI * 2); c.fill();
        // Eye
        c.fillStyle = '#111'; c.beginPath(); c.arc(14, -7, 1.2, 0, Math.PI * 2); c.fill();
        // Beak
        c.fillStyle = '#e89020';
        c.beginPath(); c.moveTo(17, -5); c.lineTo(22, -4); c.lineTo(17, -3); c.fill();
        // White neck ring (adults only)
        if (!d.baby) {
            c.strokeStyle = '#fff'; c.lineWidth = 1.5;
            c.beginPath(); c.arc(10, -3, 4, 0.5, 2.5); c.stroke();
        }
        c.restore();
        // Reflection
        c.globalAlpha = 0.15;
        c.fillStyle = '#444';
        c.beginPath(); c.ellipse(d.x, d.y + 12 + bob, 12 * sz, 4, 0, 0, Math.PI * 2); c.fill();
        c.globalAlpha = 1;
    });

    // Caption
    c.fillStyle = 'rgba(0,0,0,.4)'; c.font = '700 9px Nunito';
    c.textAlign = 'center'; c.fillText('🦆 Tap the water to scatter the ducks!', W / 2, H - 8);
    c.textAlign = 'left';
}

// =============================================
// 4. FOOD STALLS — purchase simulation
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

var fsCart = [];
var fsView = 'menu'; // 'menu' | 'cat' | 'item' | 'receipt'
var fsCatIdx = 0, fsItemIdx = 0;

function buildFoodStalls() {
    renderFS();
}

function renderFS() {
    var p = document.getElementById('fs-panel');
    if (!p) return;
    if (fsView === 'menu') {
        var h = '<div class="panel-title">🌭 Boston Common Food Stalls</div>';
        h += '<div style="text-align:center;font-size:2.5rem;margin:8px 0;">🎪</div>';
        h += '<div style="text-align:center;font-size:.7rem;font-weight:700;color:#888;margin-bottom:10px;">Fresh food in the park!</div>';
        for (var ci = 0; ci < FS_MENU.length; ci++) {
            var cat = FS_MENU[ci];
            h += '<button class="choice-btn" onclick="fsCatIdx=' + ci + ';fsView=\'cat\';renderFS()"><span class="ce">' + cat.cat.split(' ')[0] + '</span>' + cat.cat + '</button>';
        }
        if (fsCart.length > 0) {
            h += '<div style="margin-top:12px;border-top:2px dashed var(--lpink);padding-top:10px;">';
            h += '<div style="font-size:.7rem;font-weight:900;color:#8b005d;margin-bottom:6px;">🛒 Your Tray (' + fsCart.length + ' items)</div>';
            var tot = 0;
            for (var i = 0; i < fsCart.length; i++) {
                tot += fsCart[i].price;
                h += '<div style="display:flex;justify-content:space-between;font-size:.65rem;font-weight:700;padding:2px 0;color:#666;">';
                h += '<span>' + fsCart[i].emoji + ' ' + fsCart[i].name + '</span>';
                h += '<span>$' + fsCart[i].price.toFixed(2) + ' <span style="color:red;cursor:pointer;" onclick="fsCart.splice(' + i + ',1);renderFS()">✕</span></span></div>';
            }
            h += '<div style="font-size:.8rem;font-weight:900;color:#ff1493;margin-top:6px;">Total: $' + tot.toFixed(2) + '</div>';
            h += '<button class="action-btn" onclick="fsCheckout()">Pay & Enjoy! 💳</button>';
            h += '</div>';
        }
        p.innerHTML = h;
    } else if (fsView === 'cat') {
        var cat = FS_MENU[fsCatIdx];
        var h = '<div class="panel-title">' + cat.cat + '</div>';
        h += '<button class="back-btn" onclick="fsView=\'menu\';renderFS()" style="margin-bottom:8px;">← All Stalls</button>';
        for (var ii = 0; ii < cat.items.length; ii++) {
            var it = cat.items[ii];
            h += '<div class="menu-item" style="text-align:left;cursor:pointer;" onclick="fsItemIdx=' + ii + ';fsView=\'item\';renderFS()">';
            h += '<div style="display:flex;justify-content:space-between;align-items:center;">';
            h += '<span><span style="font-size:1.2rem;">' + it.emoji + '</span> <strong>' + it.name + '</strong></span>';
            h += '<span style="font-weight:900;color:#ff1493;">$' + it.price.toFixed(2) + '</span></div>';
            h += '<div style="font-size:.6rem;color:#888;font-weight:600;margin-top:2px;">' + it.desc + '</div></div>';
        }
        p.innerHTML = h;
    } else if (fsView === 'item') {
        var it = FS_MENU[fsCatIdx].items[fsItemIdx];
        var h = '<button class="back-btn" onclick="fsView=\'cat\';renderFS()" style="margin-bottom:8px;">← ' + FS_MENU[fsCatIdx].cat + '</button>';
        h += '<div style="text-align:center;padding:15px;">';
        h += '<div style="font-size:4rem;margin:10px 0;">' + it.emoji + '</div>';
        h += '<div style="font-size:1.1rem;font-weight:900;color:#8b005d;">' + it.name + '</div>';
        h += '<div style="font-size:.75rem;color:#888;font-weight:700;margin:4px 0;">' + it.desc + '</div>';
        h += '<div style="font-size:1.4rem;font-weight:900;color:#ff1493;margin:10px 0;">$' + it.price.toFixed(2) + '</div>';
        h += '<div style="display:flex;gap:8px;justify-content:center;">';
        h += '<button class="action-btn" onclick="fsAddToCart()">Add to Tray 🛒</button>';
        h += '</div></div>';
        p.innerHTML = h;
    } else if (fsView === 'receipt') {
        var cf = typeof crowFound !== 'undefined' && crowFound;
        var h = '<div style="text-align:center;padding:20px;">';
        h += '<div style="font-size:3rem;margin:10px 0;">🎉</div>';
        h += '<div class="panel-title">Enjoy your food!</div>';
        h += '<div style="font-size:2.5rem;margin:15px 0;">';
        for (var ri = 0; ri < fsCart.length; ri++) h += fsCart[ri].emoji + ' ';
        h += '</div>';
        h += '<div style="font-size:.8rem;color:#888;font-weight:700;margin:8px 0;">' + (cf ? 'Pika & Crow share a bench in the park 🌳⚡🐦‍⬛' : 'Pika finds a sunny bench in the park 🌳⚡') + '</div>';
        h += '<div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:12px;">';
        h += '<button class="action-btn" onclick="fsCart=[];fsView=\'menu\';renderFS()">Order More 🍽️</button>';
        h += '<button class="action-btn sec" onclick="show(\'screen-commons\')">Back to Common 🌸</button>';
        h += '</div></div>';
        p.innerHTML = h;
    }
}

function fsAddToCart() {
    var it = FS_MENU[fsCatIdx].items[fsItemIdx];
    fsCart.push({ name: it.name, emoji: it.emoji, price: it.price });
    fsView = 'menu';
    renderFS();
}

function fsCheckout() {
    fsView = 'receipt';
    renderFS();
}

// Init food stalls on page load
buildFoodStalls();
