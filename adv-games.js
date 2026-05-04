// =============================================
// DIFFICULTY SETTINGS — WIDE SPREAD
// =============================================
let ttDiff = 'beginner', poolDiff = 'beginner';
const DIFF = {
    beginner: { ttBot: 1.2, ttPredErr: 90, ttMissChance: 0.3, poolAcc: 0.3, poolPwr: [2, 3.5] },
    medium:   { ttBot: 3.5, ttPredErr: 20, ttMissChance: 0.05, poolAcc: 0.65, poolPwr: [3, 5.5] },
    expert:   { ttBot: 7.0, ttPredErr: 3,  ttMissChance: 0, poolAcc: 0.92, poolPwr: [4, 8] }
};

function setTTDiff(d) { ttDiff = d; document.querySelectorAll('#curry-tt .diff-btn').forEach(function(b){b.classList.toggle('sel', b.dataset.d === d);}); resetTTScore(); }
function setPoolDiff(d) { poolDiff = d; document.querySelectorAll('#curry-pool .diff-btn').forEach(function(b){b.classList.toggle('sel', b.dataset.d === d);}); initPool(); }

function showCurryGame(g) {
    document.getElementById('curry-tt').style.display = g === 'tt' ? 'block' : 'none';
    document.getElementById('curry-pool').style.display = g === 'pool' ? 'block' : 'none';
    // Delay init so canvas is visible and has dimensions
    if (g === 'tt') requestAnimationFrame(function(){ initTT(); });
    if (g === 'pool') requestAnimationFrame(function(){ setTimeout(initPool, 50); });
}
function stopGames() { T.run = false; cancelAnimationFrame(T.aid); P.run = false; cancelAnimationFrame(P.aid); }

// =============================================
// TABLE TENNIS
// =============================================
var T = {
    cvs: null, ctx: null, W: 340, H: 500, run: false, aid: null,
    wait: true, srv: true, sc: { p: 0, b: 0 },
    ball: { x: 170, y: 400, vx: 0, vy: 0, r: 5, trail: [] },
    pl: { x: 170, y: 478, w: 56, h: 8, vx: 0, px: 170 },
    bt: { x: 170, y: 22, w: 56, h: 8, tgt: 170 },
    part: [], rally: 0
};

function initTT() {
    T.cvs = document.getElementById('tt-cvs');
    if (!T.cvs) return;
    T.ctx = T.cvs.getContext('2d');
    T.cvs.onmousemove = function(e) { var r = T.cvs.getBoundingClientRect(); T.pl.x = (e.clientX - r.left) * (T.W / r.width); };
    T.cvs.ontouchmove = function(e) { e.preventDefault(); var r = T.cvs.getBoundingClientRect(); T.pl.x = (e.touches[0].clientX - r.left) * (T.W / r.width); };
    T.cvs.onclick = function() { if (T.wait) ttServe(); };
    ttResetRound(true);
    if (!T.run) { T.run = true; ttLoop(); }
}

function ttResetRound(ps) {
    T.ball = { x: ps ? T.pl.x : T.bt.x, y: ps ? 450 : 50, vx: 0, vy: 0, r: 5, trail: [] };
    T.wait = true; T.srv = ps; T.rally = 0; T.part = [];
    var el = document.getElementById('tt-msg');
    if (el) el.innerText = ps ? 'Tap to serve!' : 'Crow serves...';
    if (!ps) setTimeout(function() { if (T.wait) ttServe(); }, 700);
}

function ttServe() {
    if (!T.wait) return;
    T.wait = false;
    if (T.srv) { T.ball.vx = (Math.random() - .5) * 3; T.ball.vy = -4.5; }
    else { T.ball.vx = (Math.random() - .5) * 3; T.ball.vy = 4.5; }
    var el = document.getElementById('tt-msg');
    if (el) el.innerText = 'Rally!';
}

function resetTTScore() { T.sc = { p: 0, b: 0 }; updTTScore(); ttResetRound(true); }
function updTTScore() {
    var p = document.getElementById('tt-ps'), b = document.getElementById('tt-bs');
    if (p) p.innerText = T.sc.p; if (b) b.innerText = T.sc.b;
}

function ttLoop() {
    if (!T.run) return;
    ttUpdate(); ttDraw();
    T.aid = requestAnimationFrame(ttLoop);
}

function ttUpdate() {
    if (T.wait) {
        if (T.srv) { T.ball.x = T.pl.x; T.ball.y = 450; }
        else { T.ball.x = T.bt.x; T.ball.y = 50; }
        return;
    }
    var b = T.ball;
    b.trail.push({ x: b.x, y: b.y, a: 1 });
    if (b.trail.length > 10) b.trail.shift();
    b.trail.forEach(function(t) { t.a *= .82; });
    b.x += b.vx; b.y += b.vy;
    if (b.x - b.r < 0) { b.x = b.r; b.vx *= -1; }
    if (b.x + b.r > T.W) { b.x = T.W - b.r; b.vx *= -1; }

    // Player paddle
    var p = T.pl;
    p.vx = p.x - p.px; p.px = p.x;
    p.x = Math.max(p.w / 2, Math.min(T.W - p.w / 2, p.x));
    if (b.vy > 0 && b.y + b.r >= p.y - p.h / 2 && b.y - b.r <= p.y + p.h / 2 &&
        b.x >= p.x - p.w / 2 - b.r && b.x <= p.x + p.w / 2 + b.r) {
        ttHit(b, p, -1);
    }

    // Bot AI — DIFFICULTY-SCALED
    var df = DIFF[ttDiff];
    var bt = T.bt;

    // Beginner bot sometimes just drifts to center or wrong direction
    if (Math.random() < df.ttMissChance) {
        bt.tgt = T.W / 2 + (Math.random() - 0.5) * 100; // go random
    } else if (b.vy < 0) {
        // Predict where ball will land
        var px = b.x, py = b.y, pvx = b.vx, pvy = b.vy;
        for (var i = 0; i < 80 && py > bt.y; i++) {
            px += pvx; py += pvy;
            if (px < 5 || px > T.W - 5) pvx *= -1;
        }
        bt.tgt = px + (Math.random() - .5) * df.ttPredErr;
    } else {
        bt.tgt = T.W / 2 + (Math.random() - .5) * 60;
    }

    var d = bt.tgt - bt.x;
    var ms = df.ttBot + T.rally * 0.05;
    bt.x += Math.sign(d) * Math.min(Math.abs(d), ms);
    bt.x = Math.max(bt.w / 2, Math.min(T.W - bt.w / 2, bt.x));

    if (b.vy < 0 && b.y - b.r <= bt.y + bt.h / 2 && b.y + b.r >= bt.y - bt.h / 2 &&
        b.x >= bt.x - bt.w / 2 - b.r && b.x <= bt.x + bt.w / 2 + b.r) {
        ttHit(b, bt, 1);
    }

    if (b.y < -15) { T.sc.p++; updTTScore(); ttPoint('p'); }
    if (b.y > T.H + 15) { T.sc.b++; updTTScore(); ttPoint('b'); }
    T.part = T.part.filter(function(p) { p.x += p.vx; p.y += p.vy; p.life -= .03; return p.life > 0; });
}

function ttHit(b, pad, dir) {
    T.rally++;
    var hp = (b.x - pad.x) / (pad.w / 2);
    var spd = Math.min(4 + T.rally * .25, 10);
    b.vx = Math.sin(hp * .8) * spd + (pad.vx || 0) * .3;
    b.vy = Math.cos(Math.abs(hp) * .3) * spd * dir;
    b.y = dir < 0 ? pad.y - pad.h / 2 - b.r - 1 : pad.y + pad.h / 2 + b.r + 1;
    for (var i = 0; i < 6; i++) T.part.push({
        x: b.x, y: b.y, vx: (Math.random() - .5) * 4, vy: (Math.random() - .5) * 4,
        life: 1, c: dir < 0 ? '#ff69b4' : '#888', r: Math.random() * 2 + 1
    });
    try {
        var a = new (window.AudioContext || window.webkitAudioContext)();
        var o = a.createOscillator(), g = a.createGain();
        o.frequency.value = 800 + T.rally * 25;
        g.gain.setValueAtTime(.06, a.currentTime);
        g.gain.exponentialRampToValueAtTime(.001, a.currentTime + .06);
        o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + .06);
    } catch (e) {}
}

function ttPoint(w) {
    var pw = T.sc.p >= 11 && T.sc.p - T.sc.b >= 2;
    var bw = T.sc.b >= 11 && T.sc.b - T.sc.p >= 2;
    var el = document.getElementById('tt-msg');
    if (pw) { if (el) el.innerText = 'Pika Wins!'; T.wait = true; return; }
    if (bw) { if (el) el.innerText = 'Crow Wins!'; T.wait = true; return; }
    ttResetRound(w === 'p');
}

function ttDraw() {
    var c = T.ctx; if (!c) return;
    c.fillStyle = '#1a6b3c'; c.fillRect(0, 0, T.W, T.H);
    c.strokeStyle = '#fff'; c.lineWidth = 2; c.strokeRect(6, 6, T.W - 12, T.H - 12);
    c.setLineDash([6, 5]); c.beginPath(); c.moveTo(T.W / 2, 6); c.lineTo(T.W / 2, T.H - 6); c.stroke(); c.setLineDash([]);
    c.lineWidth = 1; c.strokeStyle = 'rgba(255,255,255,.4)';
    [T.H * .25, T.H * .75].forEach(function(y) { c.beginPath(); c.moveTo(6, y); c.lineTo(T.W - 6, y); c.stroke(); });
    c.fillStyle = '#fff'; c.fillRect(0, T.H / 2 - 1, T.W, 3);
    c.fillStyle = 'rgba(0,0,0,.1)'; c.fillRect(0, T.H / 2 + 2, T.W, 3);
    T.ball.trail.forEach(function(t) { c.beginPath(); c.arc(t.x, t.y, T.ball.r * t.a, 0, Math.PI * 2); c.fillStyle = 'rgba(255,255,255,' + (t.a * .3) + ')'; c.fill(); });
    c.beginPath(); c.arc(T.ball.x + 2, T.ball.y + 2, T.ball.r, 0, Math.PI * 2); c.fillStyle = 'rgba(0,0,0,.2)'; c.fill();
    c.beginPath(); c.arc(T.ball.x, T.ball.y, T.ball.r, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill();
    ttDrawPad(c, T.pl, '#ff1493'); ttDrawPad(c, T.bt, '#555');
    T.part.forEach(function(p) { c.globalAlpha = p.life; c.beginPath(); c.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2); c.fillStyle = p.c; c.fill(); c.globalAlpha = 1; });
    c.fillStyle = 'rgba(255,255,255,.4)'; c.font = '700 10px Nunito'; c.textAlign = 'center';
    c.fillText('Pika', T.W / 2, T.H - 8); c.fillText('Crow', T.W / 2, 16);
}

function ttDrawPad(c, p, col) {
    var x = p.x - p.w / 2, y = p.y - p.h / 2;
    c.fillStyle = 'rgba(0,0,0,.15)'; rrFill(c, x + 1, y + 1, p.w, p.h, 3);
    c.fillStyle = col; rrFill(c, x, y, p.w, p.h, 3);
    c.fillStyle = 'rgba(255,255,255,.2)'; rrFill(c, x + 2, y, p.w - 4, p.h / 2, 2);
}
function rrFill(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.fill();
}

// =============================================
// 8-BALL POOL
// =============================================
var P = {
    cvs: null, ctx: null, W: 360, H: 600,
    run: false, aid: null, balls: [], pockets: [],
    turn: 'p', type: { p: null, b: null },
    aiming: false, aimX: 0, aimY: 0, dragging: false,
    cueBall: null, moving: false,
    pocketed: { p: [], b: [] },
    pocketedThisTurn: [],
    gameOver: false, scratch: false,
    RAIL: 26, PKT_R: 13, BALL_R: 7
};

var BALL_COLORS = [null,'#ffd700','#0055cc','#cc0000','#6b006b','#ff6600','#006600','#880000','#111','#ffd700','#0055cc','#cc0000','#6b006b','#ff6600','#006600','#880000'];

function initPool() {
    P.cvs = document.getElementById('pool-cvs');
    if (!P.cvs) return;
    P.ctx = P.cvs.getContext('2d');
    if (!P.ctx) return;
    // Set canvas size
    P.cvs.width = P.W; P.cvs.height = P.H;

    P.pockets = [
        { x: P.RAIL, y: P.RAIL }, { x: P.W / 2, y: P.RAIL - 3 }, { x: P.W - P.RAIL, y: P.RAIL },
        { x: P.RAIL, y: P.H - P.RAIL }, { x: P.W / 2, y: P.H - P.RAIL + 3 }, { x: P.W - P.RAIL, y: P.H - P.RAIL }
    ];
    P.turn = 'p'; P.type = { p: null, b: null };
    P.pocketed = { p: [], b: [] }; P.gameOver = false;
    P.moving = false; P.scratch = false; P.aiming = false; P.dragging = false;
    rackBalls();
    setupPoolInput();
    if (!P.run) { P.run = true; poolLoop(); }
    updPoolUI();
    // Draw first frame immediately
    poolDraw();
}

function rackBalls() {
    P.balls = [];
    var r = P.BALL_R, cx = P.W / 2, rackY = 190;
    P.balls.push({ x: cx, y: P.H - 150, vx: 0, vy: 0, r: r, n: 0, sunk: false });
    P.cueBall = P.balls[0];
    var order = [1, 9, 2, 10, 8, 11, 3, 4, 14, 6, 15, 13, 12, 5, 7];
    var idx = 0;
    for (var row = 0; row < 5; row++) {
        for (var col = 0; col <= row; col++) {
            var bx = cx + (col - row / 2) * (r * 2 + 1);
            var by = rackY + row * (r * 1.73 + 1);
            P.balls.push({ x: bx, y: by, vx: 0, vy: 0, r: r, n: order[idx], sunk: false });
            idx++;
        }
    }
}

function setupPoolInput() {
    P.cvs.onmousedown = function(e) { poolStart(e); };
    P.cvs.onmousemove = function(e) { poolDrag(e); };
    P.cvs.onmouseup = function() { poolRelease(); };
    P.cvs.ontouchstart = function(e) { e.preventDefault(); poolStart(e.touches[0]); };
    P.cvs.ontouchmove = function(e) { e.preventDefault(); poolDrag(e.touches[0]); };
    P.cvs.ontouchend = function(e) { e.preventDefault(); poolRelease(); };
}

function getPoolXY(e) {
    var r = P.cvs.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (P.W / r.width), y: (e.clientY - r.top) * (P.H / r.height) };
}

function poolStart(e) {
    if (P.moving || P.gameOver || P.turn !== 'p') return;
    var pos = getPoolXY(e);
    var cb = P.cueBall;
    if (!cb || cb.sunk) return;
    if (Math.hypot(pos.x - cb.x, pos.y - cb.y) < 35) {
        P.aiming = true; P.dragging = true;
        P.aimX = pos.x; P.aimY = pos.y;
    }
}
function poolDrag(e) {
    if (!P.dragging) return;
    var pos = getPoolXY(e);
    P.aimX = pos.x; P.aimY = pos.y;
}
function poolRelease() {
    if (!P.dragging) return;
    P.dragging = false; P.aiming = false;
    var cb = P.cueBall;
    if (!cb) return;
    var dx = cb.x - P.aimX, dy = cb.y - P.aimY;
    var power = Math.min(Math.hypot(dx, dy) * 0.1, 12);
    if (power > 0.8) {
        var ang = Math.atan2(dy, dx);
        cb.vx = Math.cos(ang) * power;
        cb.vy = Math.sin(ang) * power;
        P.moving = true;
        P.pocketedThisTurn = [];
        P.scratch = false;
    }
}

function poolLoop() {
    if (!P.run) return;
    poolUpdate(); poolDraw();
    P.aid = requestAnimationFrame(poolLoop);
}

function poolUpdate() {
    if (!P.moving) return;
    var anyMoving = false;
    var rl = P.RAIL, br = P.BALL_R;

    P.balls.forEach(function(b) {
        if (b.sunk) return;
        b.x += b.vx; b.y += b.vy;
        b.vx *= 0.988; b.vy *= 0.988;
        if (Math.abs(b.vx) < 0.04 && Math.abs(b.vy) < 0.04) { b.vx = 0; b.vy = 0; }
        else anyMoving = true;
        if (b.x - br < rl) { b.x = rl + br; b.vx = Math.abs(b.vx) * 0.8; }
        if (b.x + br > P.W - rl) { b.x = P.W - rl - br; b.vx = -Math.abs(b.vx) * 0.8; }
        if (b.y - br < rl) { b.y = rl + br; b.vy = Math.abs(b.vy) * 0.8; }
        if (b.y + br > P.H - rl) { b.y = P.H - rl - br; b.vy = -Math.abs(b.vy) * 0.8; }
    });

    // Ball collisions
    for (var i = 0; i < P.balls.length; i++) {
        for (var j = i + 1; j < P.balls.length; j++) {
            var a = P.balls[i], b = P.balls[j];
            if (a.sunk || b.sunk) continue;
            var dx = b.x - a.x, dy = b.y - a.y;
            var dist = Math.hypot(dx, dy);
            var minD = a.r + b.r;
            if (dist < minD && dist > 0.01) {
                var nx = dx / dist, ny = dy / dist;
                var overlap = (minD - dist) / 2;
                a.x -= nx * overlap; a.y -= ny * overlap;
                b.x += nx * overlap; b.y += ny * overlap;
                var dvn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
                if (dvn > 0) {
                    a.vx -= dvn * nx * 0.95; a.vy -= dvn * ny * 0.95;
                    b.vx += dvn * nx * 0.95; b.vy += dvn * ny * 0.95;
                }
            }
        }
    }

    // Pockets
    P.balls.forEach(function(b) {
        if (b.sunk) return;
        for (var pi = 0; pi < P.pockets.length; pi++) {
            var pk = P.pockets[pi];
            if (Math.hypot(b.x - pk.x, b.y - pk.y) < P.PKT_R) {
                b.sunk = true; b.vx = 0; b.vy = 0;
                if (b.n === 0) {
                    P.scratch = true;
                    setTimeout(function() { b.sunk = false; b.x = P.W / 2; b.y = P.H - 150; }, 600);
                } else {
                    P.pocketedThisTurn.push(b.n);
                    if (!P.type.p && b.n !== 8) {
                        if (b.n <= 7) { P.type[P.turn] = 'solid'; P.type[P.turn === 'p' ? 'b' : 'p'] = 'stripe'; }
                        else { P.type[P.turn] = 'stripe'; P.type[P.turn === 'p' ? 'b' : 'p'] = 'solid'; }
                    }
                    P.pocketed[P.turn].push(b.n);
                    if (b.n === 8) {
                        P.gameOver = true;
                        var el = document.getElementById('pool-msg');
                        var got = P.pocketed[P.turn].filter(function(n) { return n !== 8; }).length;
                        if (el) el.innerText = got >= 7
                            ? (P.turn === 'p' ? 'Pika Wins!' : 'Crow Wins!')
                            : (P.turn === 'p' ? 'Early 8-ball! Crow Wins!' : 'Early 8-ball! Pika Wins!');
                    }
                }
                break;
            }
        }
    });

    if (!anyMoving && P.moving) {
        P.moving = false;
        if (P.gameOver) return;
        var madeShot = P.pocketedThisTurn.some(function(n) {
            if (!P.type[P.turn]) return n !== 0 && n !== 8;
            return P.type[P.turn] === 'solid' ? (n >= 1 && n <= 7) : (n >= 9 && n <= 15);
        });
        if (P.scratch || !madeShot) {
            P.turn = P.turn === 'p' ? 'b' : 'p';
        }
        updPoolUI();
        if (P.turn === 'b' && !P.gameOver) setTimeout(botPoolShot, 800);
    }
}

function botPoolShot() {
    if (P.gameOver || P.turn !== 'b' || P.moving) return;
    var df = DIFF[poolDiff];
    var cb = P.cueBall;
    if (!cb || cb.sunk) return;

    var targets = P.balls.filter(function(b) { return !b.sunk && b.n > 0 && b.n !== 8; });
    if (P.type.b) {
        var mine = targets.filter(function(b) { return P.type.b === 'solid' ? b.n <= 7 : b.n >= 9; });
        if (mine.length > 0) targets = mine;
        else targets = P.balls.filter(function(b) { return !b.sunk && b.n === 8; });
    }
    if (targets.length === 0) targets = P.balls.filter(function(b) { return !b.sunk && b.n > 0; });
    if (targets.length === 0) return;

    var bestBall = null, bestPocket = null, bestScore = Infinity;
    targets.forEach(function(b) {
        P.pockets.forEach(function(pk) {
            var d = Math.hypot(b.x - pk.x, b.y - pk.y);
            if (d < bestScore) { bestScore = d; bestBall = b; bestPocket = pk; }
        });
    });
    if (!bestBall) return;

    var bToPk = Math.atan2(bestPocket.y - bestBall.y, bestPocket.x - bestBall.x);
    var ghostX = bestBall.x - Math.cos(bToPk) * (P.BALL_R * 2);
    var ghostY = bestBall.y - Math.sin(bToPk) * (P.BALL_R * 2);
    var aimAng = Math.atan2(ghostY - cb.y, ghostX - cb.x);
    aimAng += (Math.random() - 0.5) * (1 - df.poolAcc) * 1.2;
    var power = df.poolPwr[0] + Math.random() * (df.poolPwr[1] - df.poolPwr[0]);
    cb.vx = Math.cos(aimAng) * power;
    cb.vy = Math.sin(aimAng) * power;
    P.moving = true;
    P.pocketedThisTurn = [];
    P.scratch = false;
}

function updPoolUI() {
    var pt = P.type.p || '--', bt = P.type.b || '--';
    var pe = document.getElementById('pool-pinfo'), be = document.getElementById('pool-binfo'), te = document.getElementById('pool-turn');
    if (pe) pe.innerText = 'Pika ' + pt + ' (' + P.pocketed.p.filter(function(n){return n!==8;}).length + ')';
    if (be) be.innerText = '(' + P.pocketed.b.filter(function(n){return n!==8;}).length + ') ' + bt + ' Crow';
    if (te) te.innerText = P.turn === 'p' ? 'Your shot' : 'Crow thinking...';
}

function poolDraw() {
    var c = P.ctx; if (!c) return;
    var W = P.W, H = P.H, rl = P.RAIL;

    c.fillStyle = '#1a472a'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#5c3a1e';
    c.fillRect(0, 0, W, rl); c.fillRect(0, H - rl, W, rl);
    c.fillRect(0, 0, rl, H); c.fillRect(W - rl, 0, rl, H);
    c.fillStyle = '#7a5030';
    c.fillRect(rl - 2, rl - 2, W - (rl - 2) * 2, 2);
    c.fillRect(rl - 2, H - rl, W - (rl - 2) * 2, 2);
    c.fillRect(rl - 2, rl, 2, H - rl * 2);
    c.fillRect(W - rl, rl, 2, H - rl * 2);
    c.fillStyle = '#1f7a3a'; c.fillRect(rl, rl, W - rl * 2, H - rl * 2);
    // Head string
    c.strokeStyle = 'rgba(255,255,255,.12)'; c.setLineDash([4, 4]); c.lineWidth = 1;
    c.beginPath(); c.moveTo(rl, H - 150); c.lineTo(W - rl, H - 150); c.stroke(); c.setLineDash([]);
    // Foot spot
    c.beginPath(); c.arc(W / 2, 190, 3, 0, Math.PI * 2); c.fillStyle = 'rgba(255,255,255,.2)'; c.fill();

    // Pockets
    P.pockets.forEach(function(pk) {
        c.beginPath(); c.arc(pk.x, pk.y, P.PKT_R, 0, Math.PI * 2);
        c.fillStyle = '#0a0a0a'; c.fill();
        c.beginPath(); c.arc(pk.x, pk.y, P.PKT_R - 2, 0, Math.PI * 2);
        c.fillStyle = '#1a1a1a'; c.fill();
    });

    // Rail diamonds
    c.fillStyle = '#c8964a';
    for (var i = 1; i < 6; i++) {
        var x = rl + i * ((W - rl * 2) / 6);
        c.beginPath(); c.arc(x, rl / 2, 2, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(x, H - rl / 2, 2, 0, Math.PI * 2); c.fill();
    }

    // Balls
    P.balls.forEach(function(b) {
        if (b.sunk) return;
        c.beginPath(); c.arc(b.x + 2, b.y + 2, b.r, 0, Math.PI * 2);
        c.fillStyle = 'rgba(0,0,0,.2)'; c.fill();
        c.beginPath(); c.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        if (b.n === 0) { c.fillStyle = '#f0f0f0'; c.fill(); }
        else {
            var col = BALL_COLORS[b.n] || '#888';
            if (b.n > 8) {
                c.fillStyle = '#f8f8f0'; c.fill();
                c.save(); c.beginPath(); c.arc(b.x, b.y, b.r, 0, Math.PI * 2); c.clip();
                c.fillStyle = col; c.fillRect(b.x - b.r, b.y - b.r * 0.45, b.r * 2, b.r * 0.9);
                c.restore();
            } else {
                var g = c.createRadialGradient(b.x - 2, b.y - 2, 1, b.x, b.y, b.r);
                g.addColorStop(0, lightenCol(col)); g.addColorStop(1, col);
                c.fillStyle = g; c.fill();
            }
            c.beginPath(); c.arc(b.x, b.y, 3, 0, Math.PI * 2);
            c.fillStyle = '#fff'; c.fill();
            c.fillStyle = '#000'; c.font = 'bold 5px Nunito';
            c.textAlign = 'center'; c.textBaseline = 'middle';
            c.fillText(b.n, b.x, b.y + 0.3);
        }
        c.beginPath(); c.arc(b.x - 2, b.y - 2, b.r * .3, 0, Math.PI * 2);
        c.fillStyle = 'rgba(255,255,255,.35)'; c.fill();
    });

    // Aiming line + cue stick
    if (P.dragging && P.cueBall && !P.cueBall.sunk) {
        var cb = P.cueBall;
        var dx = cb.x - P.aimX, dy = cb.y - P.aimY;
        var power = Math.min(Math.hypot(dx, dy), 120);
        c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 1;
        c.setLineDash([4, 3]);
        c.beginPath(); c.moveTo(cb.x, cb.y);
        c.lineTo(cb.x + dx * 3, cb.y + dy * 3); c.stroke();
        c.setLineDash([]);
        var ang = Math.atan2(-dy, -dx);
        var stickDist = P.BALL_R + 5 + power * 0.3;
        c.save();
        c.translate(cb.x - Math.cos(ang) * stickDist, cb.y - Math.sin(ang) * stickDist);
        c.rotate(ang + Math.PI);
        c.fillStyle = '#d4a050'; c.fillRect(0, -2, 100, 4);
        c.fillStyle = '#f0e0c0'; c.fillRect(0, -2, 6, 4);
        c.restore();
        // Power bar
        c.fillStyle = 'rgba(255,' + Math.round(255 - power * 2) + ',0,.7)';
        c.fillRect(W - 14, H - 18 - power, 5, power);
        c.strokeStyle = '#fff'; c.lineWidth = 1; c.strokeRect(W - 14, H - 138, 5, 120);
    }
}

function lightenCol(hex) {
    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return 'rgb(' + Math.min(255, r + 60) + ',' + Math.min(255, g + 60) + ',' + Math.min(255, b + 60) + ')';
}
