// =============================================
// DIFFICULTY
// =============================================
var ttDiff = 'beginner', poolDiff = 'beginner';
var DIFF = {
    beginner: { ttSpd: 1.2, ttErr: 80, ttMiss: 0.25, ttBall: 5, pAcc: 0.3, pPwr: [2, 3.5] },
    medium:   { ttSpd: 3.8, ttErr: 18, ttMiss: 0.04, ttBall: 7, pAcc: 0.65, pPwr: [3, 6] },
    expert:   { ttSpd: 7.5, ttErr: 2,  ttMiss: 0,    ttBall: 9, pAcc: 0.93, pPwr: [5, 9] }
};

function setTTDiff(d) {
    ttDiff = d;
    document.querySelectorAll('#curry-tt .diff-btn').forEach(function(b) { b.classList.toggle('sel', b.dataset.d === d); });
    resetTTScore();
}
function setPoolDiff(d) {
    poolDiff = d;
    document.querySelectorAll('#curry-pool .diff-btn').forEach(function(b) { b.classList.toggle('sel', b.dataset.d === d); });
    initPool();
}

function showCurryGame(g) {
    document.getElementById('curry-tt').style.display = g === 'tt' ? 'block' : 'none';
    document.getElementById('curry-pool').style.display = g === 'pool' ? 'block' : 'none';
    // Small delay to let display:block take effect before canvas init
    setTimeout(function() {
        if (g === 'tt') initTT();
        if (g === 'pool') initPool();
    }, 100);
}

function stopGames() {
    T.run = false; if (T.aid) cancelAnimationFrame(T.aid);
    P.run = false; if (P.aid) cancelAnimationFrame(P.aid);
}

// =============================================
// TABLE TENNIS — faster, with racket visuals
// =============================================
var T = {
    cvs: null, ctx: null, W: 340, H: 500, run: false, aid: null,
    wait: true, srv: true, sc: { p: 0, b: 0 },
    ball: { x: 170, y: 400, vx: 0, vy: 0, r: 5, trail: [] },
    pl: { x: 170, y: 475, w: 52, h: 10, vx: 0, px: 170 },
    bt: { x: 170, y: 25, w: 52, h: 10, tgt: 170 },
    part: [], rally: 0
};

function initTT() {
    T.cvs = document.getElementById('tt-cvs');
    if (!T.cvs) return;
    T.ctx = T.cvs.getContext('2d');
    if (!T.ctx) return;
    T.cvs.width = T.W; T.cvs.height = T.H;
    // Input
    T.cvs.onmousemove = function(e) {
        var r = T.cvs.getBoundingClientRect();
        T.pl.x = (e.clientX - r.left) / r.width * T.W;
    };
    T.cvs.ontouchmove = function(e) {
        e.preventDefault();
        var r = T.cvs.getBoundingClientRect();
        T.pl.x = (e.touches[0].clientX - r.left) / r.width * T.W;
    };
    T.cvs.onclick = function() { if (T.wait) ttServe(); };
    ttResetRound(true);
    if (!T.run) { T.run = true; ttLoop(); }
}

function ttResetRound(ps) {
    T.ball = { x: ps ? T.pl.x : T.bt.x, y: ps ? 440 : 60, vx: 0, vy: 0, r: 5, trail: [] };
    T.wait = true; T.srv = ps; T.rally = 0; T.part = [];
    var el = document.getElementById('tt-msg');
    if (el) el.innerText = ps ? 'Tap to serve!' : 'Crow serves...';
    if (!ps) setTimeout(function() { if (T.wait) ttServe(); }, 600);
}

function ttServe() {
    if (!T.wait) return;
    T.wait = false;
    var spd = DIFF[ttDiff].ttBall;
    if (T.srv) { T.ball.vx = (Math.random() - .5) * 4; T.ball.vy = -spd; }
    else { T.ball.vx = (Math.random() - .5) * 4; T.ball.vy = spd; }
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
        if (T.srv) { T.ball.x = T.pl.x; T.ball.y = 440; }
        else { T.ball.x = T.bt.x; T.ball.y = 60; }
        return;
    }
    var b = T.ball;
    b.trail.push({ x: b.x, y: b.y, a: 1 });
    if (b.trail.length > 12) b.trail.shift();
    for (var ti = 0; ti < b.trail.length; ti++) b.trail[ti].a *= 0.82;
    b.x += b.vx; b.y += b.vy;
    if (b.x - b.r < 0) { b.x = b.r; b.vx *= -1; }
    if (b.x + b.r > T.W) { b.x = T.W - b.r; b.vx *= -1; }

    // Player paddle hit
    var p = T.pl;
    p.vx = p.x - p.px; p.px = p.x;
    p.x = Math.max(p.w / 2, Math.min(T.W - p.w / 2, p.x));
    if (b.vy > 0 && b.y + b.r >= p.y - p.h / 2 && b.y - b.r <= p.y + p.h / 2 &&
        b.x > p.x - p.w / 2 - b.r && b.x < p.x + p.w / 2 + b.r) {
        ttHit(b, p, -1);
    }

    // Bot AI
    var df = DIFF[ttDiff];
    var bt = T.bt;
    if (Math.random() < df.ttMiss) {
        bt.tgt = T.W / 2 + (Math.random() - 0.5) * 120;
    } else if (b.vy < 0) {
        var px = b.x, py = b.y, pvx = b.vx, pvy = b.vy;
        for (var si = 0; si < 80 && py > bt.y; si++) { px += pvx; py += pvy; if (px < 5 || px > T.W - 5) pvx *= -1; }
        bt.tgt = px + (Math.random() - .5) * df.ttErr;
    } else {
        bt.tgt = T.W / 2 + (Math.random() - .5) * 50;
    }
    var d = bt.tgt - bt.x;
    var ms = df.ttSpd + T.rally * 0.06;
    bt.x += Math.sign(d) * Math.min(Math.abs(d), ms);
    bt.x = Math.max(bt.w / 2, Math.min(T.W - bt.w / 2, bt.x));

    if (b.vy < 0 && b.y - b.r <= bt.y + bt.h / 2 && b.y + b.r >= bt.y - bt.h / 2 &&
        b.x > bt.x - bt.w / 2 - b.r && b.x < bt.x + bt.w / 2 + b.r) {
        ttHit(b, bt, 1);
    }

    if (b.y < -15) { T.sc.p++; updTTScore(); ttPoint('p'); }
    if (b.y > T.H + 15) { T.sc.b++; updTTScore(); ttPoint('b'); }
    T.part = T.part.filter(function(pt) { pt.x += pt.vx; pt.y += pt.vy; pt.life -= 0.03; return pt.life > 0; });
}

function ttHit(b, pad, dir) {
    T.rally++;
    var hp = (b.x - pad.x) / (pad.w / 2);
    var spd = Math.min(DIFF[ttDiff].ttBall + T.rally * 0.35, DIFF[ttDiff].ttBall + 5);
    b.vx = Math.sin(hp * 0.8) * spd + (pad.vx || 0) * 0.3;
    b.vy = Math.cos(Math.abs(hp) * 0.3) * spd * dir;
    b.y = dir < 0 ? pad.y - pad.h / 2 - b.r - 1 : pad.y + pad.h / 2 + b.r + 1;
    for (var i = 0; i < 6; i++) T.part.push({
        x: b.x, y: b.y, vx: (Math.random() - .5) * 5, vy: (Math.random() - .5) * 5,
        life: 1, c: dir < 0 ? '#ff69b4' : '#888', r: Math.random() * 2 + 1
    });
    try {
        var ac = new (window.AudioContext || window.webkitAudioContext)();
        var os = ac.createOscillator(), gn = ac.createGain();
        os.frequency.value = 800 + T.rally * 30; gn.gain.setValueAtTime(0.06, ac.currentTime);
        gn.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.06);
        os.connect(gn); gn.connect(ac.destination); os.start(); os.stop(ac.currentTime + 0.06);
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
    // Table
    c.fillStyle = '#1a6b3c'; c.fillRect(0, 0, T.W, T.H);
    c.strokeStyle = '#fff'; c.lineWidth = 2; c.strokeRect(6, 6, T.W - 12, T.H - 12);
    c.setLineDash([6, 5]); c.beginPath(); c.moveTo(T.W / 2, 6); c.lineTo(T.W / 2, T.H - 6); c.stroke(); c.setLineDash([]);
    c.lineWidth = 1; c.strokeStyle = 'rgba(255,255,255,.35)';
    c.beginPath(); c.moveTo(6, T.H * .25); c.lineTo(T.W - 6, T.H * .25); c.stroke();
    c.beginPath(); c.moveTo(6, T.H * .75); c.lineTo(T.W - 6, T.H * .75); c.stroke();
    // Net
    c.fillStyle = '#fff'; c.fillRect(0, T.H / 2 - 1.5, T.W, 3);
    c.fillStyle = 'rgba(0,0,0,.1)'; c.fillRect(0, T.H / 2 + 2, T.W, 3);
    // Trail
    for (var ti = 0; ti < T.ball.trail.length; ti++) {
        var t = T.ball.trail[ti];
        c.beginPath(); c.arc(t.x, t.y, T.ball.r * t.a, 0, Math.PI * 2);
        c.fillStyle = 'rgba(255,255,255,' + (t.a * 0.3) + ')'; c.fill();
    }
    // Ball shadow + ball
    c.beginPath(); c.arc(T.ball.x + 2, T.ball.y + 2, T.ball.r, 0, Math.PI * 2);
    c.fillStyle = 'rgba(0,0,0,.2)'; c.fill();
    c.beginPath(); c.arc(T.ball.x, T.ball.y, T.ball.r, 0, Math.PI * 2);
    c.fillStyle = '#fff'; c.fill();
    // Rackets (with handle!)
    drawRacket(c, T.pl, '#ff1493', '#c41070', true);
    drawRacket(c, T.bt, '#444', '#222', false);
    // Particles
    for (var pi = 0; pi < T.part.length; pi++) {
        var pt = T.part[pi];
        c.globalAlpha = pt.life; c.beginPath(); c.arc(pt.x, pt.y, pt.r * pt.life, 0, Math.PI * 2);
        c.fillStyle = pt.c; c.fill();
    }
    c.globalAlpha = 1;
    // Labels
    c.fillStyle = 'rgba(255,255,255,.35)'; c.font = '700 10px Nunito'; c.textAlign = 'center';
    c.fillText('Pika', T.W / 2, T.H - 6); c.fillText('Crow', T.W / 2, 14);
}

function drawRacket(c, pad, faceCol, rubberCol, isBottom) {
    var x = pad.x, y = pad.y, w = pad.w, h = pad.h;
    // Handle
    var hx = x, hy = isBottom ? y + h / 2 + 2 : y - h / 2 - 8;
    c.fillStyle = '#8B4513'; c.fillRect(hx - 3, hy, 6, 8);
    // Paddle face (rounded)
    c.fillStyle = 'rgba(0,0,0,.12)';
    c.beginPath(); c.ellipse(x + 1, y + 1, w / 2, h / 2 + 4, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = faceCol;
    c.beginPath(); c.ellipse(x, y, w / 2, h / 2 + 4, 0, 0, Math.PI * 2); c.fill();
    // Rubber texture
    c.fillStyle = rubberCol;
    c.beginPath(); c.ellipse(x, y, w / 2 - 3, h / 2 + 1, 0, 0, Math.PI * 2); c.fill();
    // Highlight
    c.fillStyle = 'rgba(255,255,255,.15)';
    c.beginPath(); c.ellipse(x - 4, y - 2, w / 4, h / 3, -0.3, 0, Math.PI * 2); c.fill();
}

// =============================================
// 8-BALL POOL — FIXED
// =============================================
var P = {
    cvs: null, ctx: null, W: 350, H: 550,
    run: false, aid: null, balls: [], pockets: [],
    turn: 'p', type: { p: null, b: null },
    dragging: false, aimX: 0, aimY: 0,
    cueBall: null, moving: false,
    pocketed: { p: [], b: [] },
    pocketedThisTurn: [],
    gameOver: false, scratch: false,
    RL: 24, PKR: 13, BR: 8
};

var BCOLS = [null, '#ffd700', '#0055cc', '#cc0000', '#6b006b', '#ff6600', '#006600', '#880000', '#111',
    '#ffd700', '#0055cc', '#cc0000', '#6b006b', '#ff6600', '#006600', '#880000'];

function initPool() {
    P.cvs = document.getElementById('pool-cvs');
    if (!P.cvs) return;
    // Force canvas dimensions
    P.cvs.width = P.W;
    P.cvs.height = P.H;
    P.cvs.style.width = '100%';
    P.cvs.style.maxWidth = P.W + 'px';
    P.ctx = P.cvs.getContext('2d');
    if (!P.ctx) return;

    P.pockets = [
        { x: P.RL, y: P.RL }, { x: P.W / 2, y: P.RL - 3 }, { x: P.W - P.RL, y: P.RL },
        { x: P.RL, y: P.H - P.RL }, { x: P.W / 2, y: P.H - P.RL + 3 }, { x: P.W - P.RL, y: P.H - P.RL }
    ];
    P.turn = 'p'; P.type = { p: null, b: null };
    P.pocketed = { p: [], b: [] }; P.gameOver = false;
    P.moving = false; P.scratch = false; P.dragging = false;

    // Rack balls
    P.balls = [];
    var cx = P.W / 2, r = P.BR;
    // Cue ball
    P.balls.push({ x: cx, y: P.H - 130, vx: 0, vy: 0, r: r, n: 0, sunk: false });
    P.cueBall = P.balls[0];
    // Triangle rack
    var order = [1, 9, 2, 10, 8, 11, 3, 4, 14, 6, 15, 13, 12, 5, 7];
    var idx = 0;
    for (var row = 0; row < 5; row++) {
        for (var col = 0; col <= row; col++) {
            var bx = cx + (col - row / 2) * (r * 2 + 2);
            var by = 170 + row * (r * 1.8);
            P.balls.push({ x: bx, y: by, vx: 0, vy: 0, r: r, n: order[idx], sunk: false });
            idx++;
        }
    }

    // Event listeners — use addEventListener for reliability
    P.cvs.removeEventListener('mousedown', poolMD);
    P.cvs.removeEventListener('mousemove', poolMM);
    P.cvs.removeEventListener('mouseup', poolMU);
    P.cvs.removeEventListener('touchstart', poolTS);
    P.cvs.removeEventListener('touchmove', poolTM);
    P.cvs.removeEventListener('touchend', poolTE);
    P.cvs.addEventListener('mousedown', poolMD);
    P.cvs.addEventListener('mousemove', poolMM);
    P.cvs.addEventListener('mouseup', poolMU);
    P.cvs.addEventListener('touchstart', poolTS, { passive: false });
    P.cvs.addEventListener('touchmove', poolTM, { passive: false });
    P.cvs.addEventListener('touchend', poolTE, { passive: false });

    // Stop old loop, start fresh
    P.run = false;
    if (P.aid) cancelAnimationFrame(P.aid);
    setTimeout(function() {
        P.run = true;
        poolLoop();
    }, 50);
    updPoolUI();
    poolDraw(); // immediate first frame
}

function pXY(e) {
    var r = P.cvs.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * P.W, y: (e.clientY - r.top) / r.height * P.H };
}

function poolMD(e) {
    if (P.moving || P.gameOver || P.turn !== 'p') return;
    var pos = pXY(e);
    var cb = P.cueBall;
    if (!cb || cb.sunk) return;
    if (Math.hypot(pos.x - cb.x, pos.y - cb.y) < 40) {
        P.dragging = true; P.aimX = pos.x; P.aimY = pos.y;
    }
}
function poolMM(e) { if (!P.dragging) return; var pos = pXY(e); P.aimX = pos.x; P.aimY = pos.y; }
function poolMU(e) { poolShoot(); }
function poolTS(e) { e.preventDefault(); poolMD(e.touches[0]); }
function poolTM(e) { e.preventDefault(); if (!P.dragging) return; var pos = pXY(e.touches[0]); P.aimX = pos.x; P.aimY = pos.y; }
function poolTE(e) { e.preventDefault(); poolShoot(); }

function poolShoot() {
    if (!P.dragging) return;
    P.dragging = false;
    var cb = P.cueBall;
    if (!cb) return;
    var dx = cb.x - P.aimX, dy = cb.y - P.aimY;
    var power = Math.min(Math.hypot(dx, dy) * 0.12, 14);
    if (power > 0.5) {
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
    poolUpdate();
    poolDraw();
    P.aid = requestAnimationFrame(poolLoop);
}

function poolUpdate() {
    if (!P.moving) return;
    var anyMoving = false;
    var rl = P.RL, br = P.BR;

    for (var bi = 0; bi < P.balls.length; bi++) {
        var b = P.balls[bi];
        if (b.sunk) continue;
        b.x += b.vx; b.y += b.vy;
        b.vx *= 0.987; b.vy *= 0.987;
        if (Math.abs(b.vx) < 0.03 && Math.abs(b.vy) < 0.03) { b.vx = 0; b.vy = 0; }
        else anyMoving = true;
        // Walls
        if (b.x - br < rl) { b.x = rl + br; b.vx = Math.abs(b.vx) * 0.75; }
        if (b.x + br > P.W - rl) { b.x = P.W - rl - br; b.vx = -Math.abs(b.vx) * 0.75; }
        if (b.y - br < rl) { b.y = rl + br; b.vy = Math.abs(b.vy) * 0.75; }
        if (b.y + br > P.H - rl) { b.y = P.H - rl - br; b.vy = -Math.abs(b.vy) * 0.75; }
    }

    // Ball-ball collisions
    for (var i = 0; i < P.balls.length; i++) {
        for (var j = i + 1; j < P.balls.length; j++) {
            var a = P.balls[i], bb = P.balls[j];
            if (a.sunk || bb.sunk) continue;
            var dx = bb.x - a.x, dy = bb.y - a.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var minD = a.r + bb.r;
            if (dist < minD && dist > 0.01) {
                var nx = dx / dist, ny = dy / dist;
                var overlap = (minD - dist) / 2;
                a.x -= nx * overlap; a.y -= ny * overlap;
                bb.x += nx * overlap; bb.y += ny * overlap;
                var dvn = (a.vx - bb.vx) * nx + (a.vy - bb.vy) * ny;
                if (dvn > 0) {
                    a.vx -= dvn * nx * 0.95; a.vy -= dvn * ny * 0.95;
                    bb.vx += dvn * nx * 0.95; bb.vy += dvn * ny * 0.95;
                }
            }
        }
    }

    // Pockets
    for (var pi = 0; pi < P.balls.length; pi++) {
        var ball = P.balls[pi];
        if (ball.sunk) continue;
        for (var ki = 0; ki < P.pockets.length; ki++) {
            var pk = P.pockets[ki];
            if (Math.hypot(ball.x - pk.x, ball.y - pk.y) < P.PKR) {
                ball.sunk = true; ball.vx = 0; ball.vy = 0;
                if (ball.n === 0) {
                    P.scratch = true;
                    (function(bref) {
                        setTimeout(function() { bref.sunk = false; bref.x = P.W / 2; bref.y = P.H - 130; }, 700);
                    })(ball);
                } else {
                    P.pocketedThisTurn.push(ball.n);
                    if (!P.type.p && ball.n !== 8) {
                        if (ball.n <= 7) { P.type[P.turn] = 'solid'; P.type[P.turn === 'p' ? 'b' : 'p'] = 'stripe'; }
                        else { P.type[P.turn] = 'stripe'; P.type[P.turn === 'p' ? 'b' : 'p'] = 'solid'; }
                    }
                    P.pocketed[P.turn].push(ball.n);
                    if (ball.n === 8) {
                        P.gameOver = true;
                        var got = P.pocketed[P.turn].filter(function(n) { return n !== 8; }).length;
                        var el = document.getElementById('pool-msg');
                        if (el) el.innerText = got >= 7 ? (P.turn === 'p' ? 'Pika Wins!' : 'Crow Wins!') : (P.turn === 'p' ? 'Too early! Crow Wins!' : 'Too early! Pika Wins!');
                    }
                }
                break;
            }
        }
    }

    // All stopped
    if (!anyMoving && P.moving) {
        P.moving = false;
        if (P.gameOver) return;
        var madeShot = P.pocketedThisTurn.some(function(n) {
            if (!P.type[P.turn]) return n > 0 && n !== 8;
            return P.type[P.turn] === 'solid' ? (n >= 1 && n <= 7) : (n >= 9 && n <= 15);
        });
        if (P.scratch || !madeShot) P.turn = P.turn === 'p' ? 'b' : 'p';
        updPoolUI();
        if (P.turn === 'b' && !P.gameOver) setTimeout(botPool, 900);
    }
}

function botPool() {
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
    // Find closest ball to a pocket
    var best = null, bestD = 9999;
    for (var ti = 0; ti < targets.length; ti++) {
        for (var ki = 0; ki < P.pockets.length; ki++) {
            var d = Math.hypot(targets[ti].x - P.pockets[ki].x, targets[ti].y - P.pockets[ki].y);
            if (d < bestD) { bestD = d; best = { ball: targets[ti], pocket: P.pockets[ki] }; }
        }
    }
    if (!best) return;
    var ang2pk = Math.atan2(best.pocket.y - best.ball.y, best.pocket.x - best.ball.x);
    var gx = best.ball.x - Math.cos(ang2pk) * P.BR * 2;
    var gy = best.ball.y - Math.sin(ang2pk) * P.BR * 2;
    var aimA = Math.atan2(gy - cb.y, gx - cb.x);
    aimA += (Math.random() - 0.5) * (1 - df.pAcc) * 1.2;
    var pwr = df.pPwr[0] + Math.random() * (df.pPwr[1] - df.pPwr[0]);
    cb.vx = Math.cos(aimA) * pwr; cb.vy = Math.sin(aimA) * pwr;
    P.moving = true; P.pocketedThisTurn = []; P.scratch = false;
}

function updPoolUI() {
    var pe = document.getElementById('pool-pinfo'), be = document.getElementById('pool-binfo'), te = document.getElementById('pool-turn');
    if (pe) pe.innerText = 'Pika ' + (P.type.p || '--') + ' (' + P.pocketed.p.filter(function(n) { return n !== 8; }).length + ')';
    if (be) be.innerText = '(' + P.pocketed.b.filter(function(n) { return n !== 8; }).length + ') ' + (P.type.b || '--') + ' Crow';
    if (te) te.innerText = P.turn === 'p' ? 'Your shot' : 'Crow...';
}

function poolDraw() {
    var c = P.ctx; if (!c) return;
    var W = P.W, H = P.H, rl = P.RL;
    // Table
    c.fillStyle = '#1a472a'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#5c3a1e'; c.fillRect(0, 0, W, rl); c.fillRect(0, H - rl, W, rl); c.fillRect(0, 0, rl, H); c.fillRect(W - rl, 0, rl, H);
    c.fillStyle = '#1f7a3a'; c.fillRect(rl, rl, W - rl * 2, H - rl * 2);
    // Head string
    c.strokeStyle = 'rgba(255,255,255,.1)'; c.setLineDash([4, 4]); c.lineWidth = 1;
    c.beginPath(); c.moveTo(rl, H - 130); c.lineTo(W - rl, H - 130); c.stroke(); c.setLineDash([]);
    // Pockets
    for (var pi = 0; pi < P.pockets.length; pi++) {
        var pk = P.pockets[pi];
        c.beginPath(); c.arc(pk.x, pk.y, P.PKR, 0, Math.PI * 2); c.fillStyle = '#0a0a0a'; c.fill();
    }
    // Rail diamonds
    c.fillStyle = '#c8964a';
    for (var di = 1; di < 6; di++) {
        var dx = rl + di * ((W - rl * 2) / 6);
        c.beginPath(); c.arc(dx, rl / 2, 1.5, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(dx, H - rl / 2, 1.5, 0, Math.PI * 2); c.fill();
    }
    // Balls
    for (var bi = 0; bi < P.balls.length; bi++) {
        var b = P.balls[bi];
        if (b.sunk) continue;
        // Shadow
        c.beginPath(); c.arc(b.x + 1.5, b.y + 1.5, b.r, 0, Math.PI * 2); c.fillStyle = 'rgba(0,0,0,.2)'; c.fill();
        c.beginPath(); c.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        if (b.n === 0) { c.fillStyle = '#f0f0f0'; c.fill(); }
        else {
            var col = BCOLS[b.n] || '#888';
            if (b.n > 8) {
                c.fillStyle = '#f8f8f0'; c.fill();
                c.save(); c.beginPath(); c.arc(b.x, b.y, b.r, 0, Math.PI * 2); c.clip();
                c.fillStyle = col; c.fillRect(b.x - b.r, b.y - b.r * 0.4, b.r * 2, b.r * 0.8);
                c.restore();
            } else {
                c.fillStyle = col; c.fill();
            }
            // Number
            c.beginPath(); c.arc(b.x, b.y, 3, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill();
            c.fillStyle = '#000'; c.font = 'bold 5px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
            c.fillText(b.n, b.x, b.y + 0.3);
        }
        // Highlight
        c.beginPath(); c.arc(b.x - 2, b.y - 2, b.r * 0.3, 0, Math.PI * 2); c.fillStyle = 'rgba(255,255,255,.3)'; c.fill();
    }
    // Aiming with TRAJECTORY PREDICTION
    if (P.dragging && P.cueBall && !P.cueBall.sunk) {
        var cb = P.cueBall;
        var adx = cb.x - P.aimX, ady = cb.y - P.aimY;
        var dragDist = Math.hypot(adx, ady);
        if (dragDist > 3) {
            var pwr = Math.min(dragDist, 120);
            // Shot direction (normalized)
            var sdx = adx / dragDist, sdy = ady / dragDist;

            // --- TRAJECTORY PREDICTION ---
            // Find first ball the cue ball will hit
            var hitBall = null, hitDist = 9999, hitPt = null;
            var rl2 = P.RL + P.BR;
            for (var ti = 0; ti < P.balls.length; ti++) {
                var tb = P.balls[ti];
                if (tb.sunk || tb.n === 0) continue;
                // Ray-circle intersection: ray from cb in direction (sdx,sdy), circle at tb with radius 2*BR
                var ocx = cb.x - tb.x, ocy = cb.y - tb.y;
                var R = P.BR * 2;
                var a2 = sdx * sdx + sdy * sdy;
                var b2 = 2 * (ocx * sdx + ocy * sdy);
                var c2 = ocx * ocx + ocy * ocy - R * R;
                var disc = b2 * b2 - 4 * a2 * c2;
                if (disc >= 0) {
                    var t = (-b2 - Math.sqrt(disc)) / (2 * a2);
                    if (t > 0 && t < hitDist) {
                        hitDist = t;
                        hitBall = tb;
                        hitPt = { x: cb.x + sdx * t, y: cb.y + sdy * t };
                    }
                }
            }
            // Check wall hit distance
            var wallDist = 9999;
            var wallPt = null, wallBounceX = sdx, wallBounceY = sdy;
            if (sdx > 0) { var tw = (W - rl2 - cb.x) / sdx; if (tw > 0 && tw < wallDist) { wallDist = tw; wallBounceX = -sdx; wallBounceY = sdy; } }
            if (sdx < 0) { var tw = (rl2 - cb.x) / sdx; if (tw > 0 && tw < wallDist) { wallDist = tw; wallBounceX = -sdx; wallBounceY = sdy; } }
            if (sdy > 0) { var tw = (H - rl2 - cb.y) / sdy; if (tw > 0 && tw < wallDist) { wallDist = tw; wallBounceX = sdx; wallBounceY = -sdy; } }
            if (sdy < 0) { var tw = (rl2 - cb.y) / sdy; if (tw > 0 && tw < wallDist) { wallDist = tw; wallBounceX = sdx; wallBounceY = -sdy; } }
            wallPt = { x: cb.x + sdx * wallDist, y: cb.y + sdy * wallDist };

            // Draw guide line to first hit
            c.setLineDash([3, 3]); c.lineWidth = 1;
            if (hitBall && hitDist < wallDist) {
                // Line to ball hit point
                c.strokeStyle = 'rgba(255,255,255,.5)';
                c.beginPath(); c.moveTo(cb.x, cb.y); c.lineTo(hitPt.x, hitPt.y); c.stroke();
                // Ghost ball circle at contact
                c.beginPath(); c.arc(hitPt.x, hitPt.y, P.BR, 0, Math.PI * 2);
                c.strokeStyle = 'rgba(255,255,255,.25)'; c.stroke();
                // Target ball deflection direction
                var deflX = hitBall.x - hitPt.x, deflY = hitBall.y - hitPt.y;
                var deflDist = Math.hypot(deflX, deflY);
                if (deflDist > 0) {
                    var dnx = deflX / deflDist, dny = deflY / deflDist;
                    c.strokeStyle = 'rgba(255,200,50,.5)';
                    c.beginPath(); c.moveTo(hitBall.x, hitBall.y);
                    c.lineTo(hitBall.x + dnx * 80, hitBall.y + dny * 80); c.stroke();
                }
            } else if (wallPt) {
                // Line to wall
                c.strokeStyle = 'rgba(255,255,255,.5)';
                c.beginPath(); c.moveTo(cb.x, cb.y); c.lineTo(wallPt.x, wallPt.y); c.stroke();
                // Bounce line
                c.strokeStyle = 'rgba(255,150,150,.3)';
                c.beginPath(); c.moveTo(wallPt.x, wallPt.y);
                c.lineTo(wallPt.x + wallBounceX * 60, wallPt.y + wallBounceY * 60); c.stroke();
            }
            c.setLineDash([]);

            // Cue stick — BEHIND ball, toward drag point
            var ndx = (P.aimX - cb.x) / dragDist;
            var ndy = (P.aimY - cb.y) / dragDist;
            var gap = P.BR + 4 + pwr * 0.3;
            var tipX = cb.x + ndx * gap;
            var tipY = cb.y + ndy * gap;
            var sang = Math.atan2(ndy, ndx);
            c.save();
            c.translate(tipX, tipY);
            c.rotate(sang);
            c.fillStyle = '#d4a050'; c.fillRect(0, -1.5, 100, 3);
            c.fillStyle = '#f0e0c0'; c.fillRect(-1, -2, 5, 4);
            c.restore();
            // Power bar
            c.fillStyle = 'rgba(255,' + Math.round(255 - pwr * 2) + ',0,.6)';
            c.fillRect(W - 12, H - 16 - pwr, 4, pwr);
            c.strokeStyle = '#fff'; c.lineWidth = 0.5; c.strokeRect(W - 12, H - 136, 4, 120);
        }
    }
}
