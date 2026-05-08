// =============================================
// THANE MAP & DESTINATIONS
// =============================================

var THANE_LOCS = {
    viviana: { name: 'Viviana Mall', emoji: '🛍️', desc: 'The biggest mall in Thane! Shopping, movies & food court.' },
    grandcentral: { name: 'Grand Central Park', emoji: '🌳', desc: 'A beautiful lakeside park with joggers, fountains & sunsets.' },
    thewalk: { name: 'The Walk (Hiranandani)', emoji: '🚶', desc: 'A trendy promenade in Hiranandani Estate with cafes & shops.' },
    apollo: { name: 'Apollo / Crow\'s House', emoji: '🏡', desc: 'Hiranandani Estate — Crow\'s home in Thane! 🐦‍⬛' },
    lodha: { name: 'Lodha Amara / Pika\'s House', emoji: '🏠', desc: 'Pika\'s Thane home in the Lodha Amara township! ⚡' }
};

// Thane map PIN positions (on 600x480 canvas)
var THANE_PINS = {
    viviana:      { x: 120, y: 120 },
    grandcentral: { x: 450, y: 90 },
    thewalk:      { x: 380, y: 280 },
    apollo:       { x: 460, y: 350 },
    lodha:        { x: 100, y: 360 }
};

function drawThaneMap() {
    var mc = document.getElementById('thane-canvas');
    if (!mc) return;
    var c = mc.getContext('2d');
    var W = 600, H = 480;
    var dk = document.body.classList.contains('dark');

    // Background — warm Thane earth tones
    c.fillStyle = dk ? '#242f3e' : '#f2efe9';
    c.fillRect(0, 0, W, H);

    // Thane Creek (water body at the top-right)
    c.fillStyle = dk ? '#17263c' : '#88c4e8';
    c.beginPath();
    c.moveTo(W, 0); c.lineTo(W, 60);
    c.bezierCurveTo(500, 80, 420, 50, 380, 0);
    c.closePath(); c.fill();
    // Water texture
    c.strokeStyle = dk ? 'rgba(60,100,140,.2)' : 'rgba(130,190,220,.3)'; c.lineWidth = 0.5;
    for (var wy = 8; wy < 55; wy += 8) {
        c.beginPath();
        for (var wx = 400; wx < W; wx += 25) {
            c.moveTo(wx, wy + Math.sin(wx * 0.06) * 2);
            c.lineTo(wx + 12, wy + Math.sin((wx + 12) * 0.06) * 2);
        }
        c.stroke();
    }

    // Upvan Lake (near Grand Central Park)
    c.fillStyle = dk ? '#17263c' : '#80bcd8';
    c.beginPath(); c.ellipse(440, 110, 50, 25, -0.1, 0, Math.PI * 2); c.fill();
    c.fillStyle = dk ? '#152838' : '#90c8e0';
    c.beginPath(); c.ellipse(435, 108, 35, 16, 0.1, 0, Math.PI * 2); c.fill();

    // Parks / Green areas
    // Grand Central Park area
    c.fillStyle = dk ? '#1e3520' : '#b8dd8c';
    c.beginPath(); c.roundRect(400, 60, 110, 70, 12); c.fill();
    c.fillStyle = dk ? '#1a3018' : '#a8d07c';
    c.beginPath(); c.ellipse(455, 95, 35, 22, 0, 0, Math.PI * 2); c.fill();

    // Hiranandani Estate green patch
    c.fillStyle = dk ? '#1e3520' : '#c0dd9c';
    c.beginPath(); c.roundRect(350, 260, 140, 120, 10); c.fill();
    c.fillStyle = dk ? '#1a3018' : '#b0d080';
    c.beginPath(); c.ellipse(420, 320, 45, 30, 0, 0, Math.PI * 2); c.fill();

    // Lodha Amara green patch  
    c.fillStyle = dk ? '#1e3520' : '#c5e29c';
    c.beginPath(); c.roundRect(55, 330, 120, 90, 8); c.fill();

    // Road helpers
    function rd(x1,y1,x2,y2,w) {
        c.lineCap = 'round';
        c.strokeStyle = dk ? '#1a2030' : '#ddd8d0'; c.lineWidth = w + 2;
        c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke();
        c.strokeStyle = dk ? '#38414e' : '#fff'; c.lineWidth = w;
        c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke();
    }
    function crd(pts, w) {
        c.lineCap = 'round';
        c.strokeStyle = dk ? '#1a2030' : '#ddd8d0'; c.lineWidth = w + 2;
        c.beginPath(); c.moveTo(pts[0], pts[1]);
        if (pts.length === 6) c.quadraticCurveTo(pts[2], pts[3], pts[4], pts[5]);
        else if (pts.length === 8) c.bezierCurveTo(pts[2], pts[3], pts[4], pts[5], pts[6], pts[7]);
        c.stroke();
        c.strokeStyle = dk ? '#38414e' : '#fff'; c.lineWidth = w;
        c.beginPath(); c.moveTo(pts[0], pts[1]);
        if (pts.length === 6) c.quadraticCurveTo(pts[2], pts[3], pts[4], pts[5]);
        else if (pts.length === 8) c.bezierCurveTo(pts[2], pts[3], pts[4], pts[5], pts[6], pts[7]);
        c.stroke();
    }
    function lbl(t,x,y,a,s,cl) {
        c.save(); c.translate(x,y); if (a) c.rotate(a);
        c.font = '700 ' + (s||6.5) + 'px sans-serif';
        c.strokeStyle = dk ? 'rgba(36,47,62,.85)' : 'rgba(242,239,233,.85)'; c.lineWidth = 2.5; c.lineJoin = 'round';
        c.strokeText(t, 0, 0);
        c.fillStyle = cl || '#666'; c.fillText(t, 0, 0);
        c.restore();
    }

    // Minor streets grid
    var minors = [
        [50,140,200,140], [50,200,200,200], [50,260,200,260],
        [150,80,150,420], [230,80,230,420],
        [300,180,300,400], [350,160,350,420],
        [50,300,300,300], [200,350,350,350],
        [420,160,420,260], [480,140,480,400],
        [380,400,550,400], [100,420,500,420],
        [520,200,520,380], [400,200,550,200],
        [50,80,150,80], [180,100,300,100],
        [270,240,380,240], [440,400,440,H],
    ];
    for (var i = 0; i < minors.length; i++) {
        var m = minors[i];
        rd(m[0], m[1], m[2], m[3], 2);
    }

    // ============ MAJOR STREETS ============
    // Ghodbunder Road (major east-west highway)
    rd(0, 160, W, 160, 8);
    lbl('GHODBUNDER ROAD', 40, 154, 0, 8, '#555');

    // Eastern Express Highway
    rd(280, 0, 280, H, 8);
    lbl('EASTERN EXPRESS HWY', 260, 50, -Math.PI/2, 7, '#555');

    // LBS Marg
    crd([0, 280, 250, 300, 560, 310], 6);
    lbl('LBS MARG', 150, 290, 0.05, 6.5, '#666');

    // Pokhran Road
    rd(180, 160, 180, H, 5);
    lbl('POKHRAN RD', 162, 230, -Math.PI/2, 5.5, '#777');

    // Hiranandani Road
    crd([350, 240, 420, 300, 500, 380], 5);
    lbl('HIRANANDANI RD', 400, 310, 0.4, 5.5, '#666');

    // ============ BUILDINGS ============
    c.fillStyle = dk ? '#1c2a38' : '#e2ded6';
    var B = [
        [30,100,22,14], [80,170,26,16], [170,110,18,12], [220,180,20,14],
        [310,120,24,16], [340,90,18,20], [400,170,20,14], [460,200,22,16],
        [500,280,18,20], [80,310,16,14], [130,280,20,12], [200,310,14,16],
        [260,370,18,14], [320,310,16,12], [380,180,12,16], [440,260,14,12],
        [530,340,16,18], [160,370,14,12], [60,380,16,14], [560,160,12,16],
        [40,220,14,10], [310,210,12,14], [100,250,10,12], [250,150,16,10],
        [470,140,12,14], [540,100,14,10], [380,380,12,14], [200,400,10,12],
    ];
    for (var i = 0; i < B.length; i++) {
        c.fillRect(B[i][0], B[i][1], B[i][2], B[i][3]);
    }

    // Viviana Mall (larger building)
    c.fillStyle = dk ? '#2a3a4a' : '#d0ccc4';
    c.fillRect(95, 100, 50, 35);
    c.fillStyle = dk ? '#3a4a5a' : '#c0bcb4';
    c.fillRect(100, 105, 40, 25);

    // Railway line (dotted)
    c.setLineDash([4, 4]);
    c.strokeStyle = dk ? '#4a5a6a' : '#999'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(280, 0); c.lineTo(280, H); c.stroke();
    c.setLineDash([]);

    // Thane Station badge
    c.fillStyle = dk ? '#4a3a0a' : '#e87020';
    c.beginPath(); c.roundRect(260, 190, 40, 13, 3); c.fill();
    c.fillStyle = '#fff'; c.font = '700 7px sans-serif'; c.fillText('Thane Stn', 263, 200);

    // Area labels
    lbl('Upvan Lake', 415, 130, 0, 6, dk ? '#4a7838' : '#5a8830');
    lbl('Thane Creek', 500, 25, 0, 6, dk ? '#3a5a7a' : '#4a7aaa');
    lbl('Hiranandani Estate', 370, 350, 0, 6.5, dk ? '#4a7838' : '#5a8830');
    lbl('Lodha Amara', 70, 400, 0, 6, '#888');

    // ============ COMPASS ============
    c.fillStyle = dk ? '#667' : '#bbb'; c.font = '700 10px sans-serif'; c.textAlign = 'center';
    c.fillText('N', 30, 30);
    c.strokeStyle = '#bbb'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(30, 32); c.lineTo(30, 48); c.stroke();
    c.beginPath(); c.moveTo(27, 36); c.lineTo(30, 32); c.lineTo(33, 36); c.closePath(); c.fill();
    c.textAlign = 'left';

    // ============ SCALE BAR ============
    c.fillStyle = dk ? '#667' : '#999'; c.font = '600 5.5px sans-serif';
    c.fillText('1 km', 15, H - 12);
    c.strokeStyle = '#999'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(15, H - 7); c.lineTo(90, H - 7); c.stroke();
    c.beginPath(); c.moveTo(15, H - 10); c.lineTo(15, H - 4); c.stroke();
    c.beginPath(); c.moveTo(90, H - 10); c.lineTo(90, H - 4); c.stroke();
}

// =============================================
// THANE DESTINATIONS
// =============================================
function showThaneLocation(loc) {
    var info = THANE_LOCS[loc];
    if (!loc || !info) return;
    
    var p = document.getElementById('thane-loc-panel');
    var h = '';
    
    if (loc === 'viviana') {
        h = buildViviana();
    } else if (loc === 'grandcentral') {
        h = buildGrandCentral();
    } else if (loc === 'thewalk') {
        h = buildTheWalk();
    } else if (loc === 'apollo') {
        h = buildApolloHouse();
    } else if (loc === 'lodha') {
        h = buildLodhaHouse();
    }
    
    p.innerHTML = h;
    show('screen-thane-loc');
}

function buildViviana() {
    var h = '<div class="top-bar"><button class="back-btn" onclick="show(\'screen-thane\')">← Thane</button><span class="loc-name">🛍️ Viviana Mall</span></div>';
    h += '<div class="panel" style="margin-top:10px;">';
    h += '<div class="panel-title">🛍️ Viviana Mall — Thane\'s Pride!</div>';
    h += '<div style="text-align:center;font-size:2.5rem;margin:10px 0;">🏬🛒🍿🎬🍕🎮</div>';
    h += '<div style="font-size:.75rem;font-weight:700;color:#888;text-align:center;margin:8px 0;">Thane\'s biggest shopping destination! Movies, food court, and endless shopping.</div>';
    
    // Mall activities
    h += '<div class="choices">';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🎬</span>PVR Cinemas</div>';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🛒</span>Shopping</div>';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🍕</span>Food Court</div>';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🎮</span>Timezone Arcade</div>';
    h += '</div>';
    
    if (flightCrowFound || crowFound) {
        h += '<div class="msg-box" style="margin-top:10px;">⚡ & 🐦‍⬛ Shopping spree at Viviana! 💛🛍️</div>';
    } else {
        h += '<div class="msg-box" style="margin-top:10px;">⚡ Pika explores Viviana Mall~ 🛍️</div>';
    }
    h += '</div>';
    return h;
}

function buildGrandCentral() {
    var h = '<div class="top-bar"><button class="back-btn" onclick="show(\'screen-thane\')">← Thane</button><span class="loc-name">🌳 Grand Central Park</span></div>';
    h += '<div class="panel" style="margin-top:10px;">';
    h += '<div class="panel-title">🌳 Grand Central Park</div>';
    h += '<div style="text-align:center;font-size:2.5rem;margin:10px 0;">🌅🏞️🦆🌸🏃‍♂️🧘</div>';
    h += '<div style="font-size:.75rem;font-weight:700;color:#888;text-align:center;margin:8px 0;">Beautiful lakeside park with Upvan Lake. Perfect for evening walks and sunsets!</div>';
    
    h += '<div class="choices">';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🌅</span>Sunset View</div>';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🏃</span>Jogging Track</div>';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🦆</span>Upvan Lake</div>';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🧘</span>Yoga Lawn</div>';
    h += '</div>';
    
    if (flightCrowFound || crowFound) {
        h += '<div class="msg-box" style="margin-top:10px;">⚡ & 🐦‍⬛ Watching the sunset together~ 🌅💛</div>';
    } else {
        h += '<div class="msg-box" style="margin-top:10px;">⚡ Peaceful evening by the lake~ 🌅</div>';
    }
    h += '</div>';
    return h;
}

function buildTheWalk() {
    var h = '<div class="top-bar"><button class="back-btn" onclick="show(\'screen-thane\')">← Thane</button><span class="loc-name">🚶 The Walk</span></div>';
    h += '<div class="panel" style="margin-top:10px;">';
    h += '<div class="panel-title">🚶 The Walk — Hiranandani Estate</div>';
    h += '<div style="text-align:center;font-size:2.5rem;margin:10px 0;">🏪☕🍦🌃🧋🛍️</div>';
    h += '<div style="font-size:.75rem;font-weight:700;color:#888;text-align:center;margin:8px 0;">A trendy walking promenade lined with cafes, ice cream parlors & boutiques!</div>';
    
    h += '<div class="choices">';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">☕</span>Cafe Stop</div>';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🍦</span>Ice Cream</div>';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🧋</span>Boba Tea</div>';
    h += '<div class="choice-btn" style="pointer-events:none;"><span class="ce">🌃</span>Night Stroll</div>';
    h += '</div>';
    
    if (flightCrowFound || crowFound) {
        h += '<div class="msg-box" style="margin-top:10px;">⚡ & 🐦‍⬛ Date night at The Walk! 🌃💛</div>';
    } else {
        h += '<div class="msg-box" style="margin-top:10px;">⚡ Pika strolls The Walk solo~ 🌃</div>';
    }
    h += '</div>';
    return h;
}

function buildApolloHouse() {
    var h = '<div class="top-bar"><button class="back-btn" onclick="show(\'screen-thane\')">← Thane</button><span class="loc-name">🏡 Crow\'s Thane Home</span></div>';
    h += '<div class="panel" style="margin-top:10px;">';
    h += '<div class="panel-title">🏡 Hiranandani Estate — Apollo</div>';
    h += '<div style="text-align:center;margin:10px 0;">';
    h += '<img src="crow.png" style="width:80px;height:80px;border-radius:50%;border:4px solid #555;object-fit:cover;">';
    h += '</div>';
    h += '<div style="font-size:.75rem;font-weight:700;color:#888;text-align:center;margin:8px 0;">Crow\'s home in Thane! A cozy apartment in the Hiranandani Estate township.</div>';
    
    h += '<div style="text-align:center;font-size:2rem;margin:10px 0;">🏡 🛋️ 🎨 🎵 🕯️ 🌙</div>';
    
    if (flightCrowFound || crowFound) {
        h += '<div class="msg-box" style="margin-top:10px;">🐦‍⬛ Welcome to my place, Pika! Make yourself at home~ 💛</div>';
    } else {
        h += '<div class="msg-box" style="margin-top:10px;">⚡ Visiting Crow\'s place... she\'s not home right now 🥺</div>';
    }
    h += '</div>';
    return h;
}

function buildLodhaHouse() {
    var h = '<div class="top-bar"><button class="back-btn" onclick="show(\'screen-thane\')">← Thane</button><span class="loc-name">🏠 Pika\'s Thane Home</span></div>';
    h += '<div class="panel" style="margin-top:10px;">';
    h += '<div class="panel-title">🏠 Lodha Amara — Pika\'s Place</div>';
    h += '<div style="text-align:center;margin:10px 0;">';
    h += '<img src="pikachu.png" style="width:80px;height:80px;border-radius:50%;border:4px solid #9b59b6;object-fit:cover;">';
    h += '</div>';
    h += '<div style="font-size:.75rem;font-weight:700;color:#888;text-align:center;margin:8px 0;">Pika\'s home in Thane! A modern apartment in the Lodha Amara township.</div>';
    
    h += '<div style="text-align:center;font-size:2rem;margin:10px 0;">🏠 🖥️ 🎮 ⚡ 🛏️ 🍕</div>';
    
    if (flightCrowFound || crowFound) {
        h += '<div class="msg-box" style="margin-top:10px;">⚡ Home sweet home! Crow\'s here too~ 💛🐦‍⬛</div>';
    } else {
        h += '<div class="msg-box" style="margin-top:10px;">⚡ Back home in Lodha Amara~ 🏠</div>';
    }
    h += '</div>';
    return h;
}
