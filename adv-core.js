// =============================================
// CORE STATE
// =============================================
let crowFound = false, crowLoc = '', crowRoom = '';

const LOCS = {
    pikaHouse: {
        name: "Pika's House", 
        rooms: ['bedroom','bathroom','pikaSpot','closet','closet2','hall','kitchen'],
        faves: ['closet','pikaSpot','kitchen','bedroom'],
        msgs: {
            bedroom: ["Checked under covers...", "Peeked at bay window..."],
            bathroom: ["Looked behind curtain...", "Checked the tub..."],
            pikaSpot: ["Searched Pika's bed...", "Checked behind monitor...", "Under Pika's desk..."],
            closet: ["Opened wardrobe...", "Rummaged through clothes...", "Crow's FAVORITE spot!"],
            closet2: ["Just boxes...", "Empty shelves..."],
            hall: ["Checked hallway...", "By the door..."],
            kitchen: ["Checked fridge...", "Under counter..."]
        }
    },
    crowHouse: {
        name: "Crow's House",
        rooms: ['porch','r1','r2','b1','kitchen','b2','hall','r3','r4'],
        faves: ['r2','kitchen','porch','hall','r3'],
        msgs: {
            porch: ["Checked porch swing...", "Behind the chair..."],
            r1: ["Searched Room 1...", "Under bed..."],
            r2: ["Crow's room! Checked everywhere...", "In Crow's closet...", "Under desk..."],
            b1: ["Bathroom 1..."], b2: ["Bathroom 2..."],
            kitchen: ["Opened cabinets...", "Behind fridge..."],
            hall: ["Hallway...", "Shoe rack..."],
            r3: ["Room 3...", "Behind the door..."], r4: ["Room 4..."]
        }
    }
};

const ROOMS = {
    'pikaHouse-bedroom': { title: 'Bedroom (Bay Window)', 
        rows: ['\u{1FA9F} \u{1F6CF}\uFE0F \u{1F9F8} \u{1F6CF}\uFE0F \u{1FA9F}', '\u{1FA9E} \u{1F4DA} \u{1F4A1} \u{1F392} \u{1FAB4}'],
        desc: 'Two beds flanking gorgeous bay windows. Morning sun streams through sheer curtains. A stuffed bear sits between the pillows.',
        items: [{e:'\u{1F6CF}\uFE0F',n:'Bed 1'},{e:'\u{1F6CF}\uFE0F',n:'Bed 2'},{e:'\u{1FA9F}',n:'Bay Window'},{e:'\u{1F9F8}',n:'Teddy Bear'},{e:'\u{1F4DA}',n:'Books'},{e:'\u{1F4A1}',n:'Lamp'},{e:'\u{1F392}',n:'Backpack'},{e:'\u{1FAB4}',n:'Plant'},{e:'\u{1FA9E}',n:'Mirror'}]},
    'pikaHouse-bathroom': { title: 'Bathroom', 
        rows: ['\u{1F6BF} \u{1F6C1} \u{1FA9E}', '\u{1F9F4} \u{1F9FC} \u{1F986}'],
        desc: 'Clean white tiles, warm lighting. A rubber duck guards the tub. Two toothbrushes in the holder.',
        items: [{e:'\u{1F6C1}',n:'Bathtub'},{e:'\u{1F6BF}',n:'Shower'},{e:'\u{1F986}',n:'Rubber Duck'},{e:'\u{1F9F4}',n:'Shampoo'},{e:'\u{1F9FC}',n:'Soap'},{e:'\u{1FAA5}',n:'Toothbrush'},{e:'\u{1FA9E}',n:'Mirror'}]},
    'pikaHouse-pikaSpot': { title: "Pika's Spot", 
        rows: ['\u{1F6CF}\uFE0F \u{1F3A7} \u{1F5A5}\uFE0F\u{1F5A5}\uFE0F \u2328\uFE0F', '\u{1F9F8} \u{1F49C} \u{1F579}\uFE0F \u{1F4A1}'],
        desc: "Pika's den. Bed on the left with a purple comforter, dual-monitor desk on the right with RGB keyboard glowing. Energy drinks stacked like a pyramid.",
        items: [{e:'\u{1F5A5}\uFE0F',n:'Dual Monitors'},{e:'\u2328\uFE0F',n:'Mech Keyboard'},{e:'\u{1F3A7}',n:'Headphones'},{e:'\u{1F6CF}\uFE0F',n:"Pika's Bed"},{e:'\u{1F49C}',n:'Purple LED'},{e:'\u{1F9C3}',n:'Energy Drinks'},{e:'\u{1F9F8}',n:'Plushies'},{e:'\u{1F579}\uFE0F',n:'Controller'},{e:'\u{1F4F1}',n:'Phone Charger'}]},
    'pikaHouse-closet': { title: "Closet (Crow's Spot)", 
        rows: ['\u{1F455} \u{1F456} \u{1F9E5} \u{1F45F}', '\u{1F4E6} \u{1F426}\u200D\u2B1B\u{1F49B} \u{1F36B}'],
        desc: "Pika's wardrobe closet. Hoodies hang neatly, sneakers below. There's a suspicious Crow-sized gap between the hoodies \u2014 her FAVORITE hiding spot.",
        items: [{e:'\u{1F455}',n:'Hoodie Stack'},{e:'\u{1F45F}',n:'Sneakers'},{e:'\u{1F9E5}',n:'Winter Coat'},{e:'\u{1F456}',n:'Jeans'},{e:'\u{1F426}\u200D\u2B1B',n:'Crow Gap'},{e:'\u{1F36B}',n:'Hidden Snacks'},{e:'\u{1F4E6}',n:'Storage Box'}]},
    'pikaHouse-kitchen': { title: 'Kitchen', 
        rows: ['\u{1F9CA} \u{1F373} \u{1F525} \u{1F355}', '\u2615 \u{1F35C} \u{1F9C8} \u{1F963}'],
        desc: 'Small but mighty. Coffee maker runs 24/7. Instant ramen is mission-critical. Pizza box from last night still on the counter.',
        items: [{e:'\u2615',n:'Coffee Maker'},{e:'\u{1F35C}',n:'Ramen Stash'},{e:'\u{1F9CA}',n:'Fridge'},{e:'\u{1F355}',n:'Pizza Box'},{e:'\u{1F525}',n:'Stove'},{e:'\u{1F373}',n:'Pan'},{e:'\u{1F9C8}',n:'Butter'},{e:'\u{1F963}',n:'Cereal'}]},
    'crowHouse-porch': { title: "Porch (via Crow's Room)", 
        rows: ['\u{1F319} \u2728 \u2728 \u2728 \u{1F319}', '\u{1FA91} \u{1F56F}\uFE0F \u{1FAB4} \u{1F9E3}'],
        desc: "A small private porch only through Crow's room. String lights cast warm glow. Comfy chair, blanket, plants, candles. Their evening hangout spot.",
        items: [{e:'\u2728',n:'String Lights'},{e:'\u{1FA91}',n:'Comfy Chair'},{e:'\u{1FAB4}',n:'Plants'},{e:'\u{1F56F}\uFE0F',n:'Candle'},{e:'\u{1F9E3}',n:'Blanket'},{e:'\u{1F390}',n:'Wind Chime'}]},
    'crowHouse-r2': { title: "Crow's Room", 
        rows: ['\u{1F6CF}\uFE0F \u{1F3A8} \u{1F5A5}\uFE0F \u{1F56F}\uFE0F', '\u{1F3B5} \u{1F4D4} \u{1F5BC}\uFE0F \u{1F319}'],
        desc: "Crow's space. Walls covered in art and fairy lights. Drawing tablet on desk next to vinyl player. Scented candles everywhere. Dark, cozy, creative chaos.",
        items: [{e:'\u{1F6CF}\uFE0F',n:"Crow's Bed"},{e:'\u{1F3A8}',n:'Drawing Tablet'},{e:'\u{1F3B5}',n:'Vinyl Player'},{e:'\u{1F56F}\uFE0F',n:'Candles'},{e:'\u{1F5BC}\uFE0F',n:'Art Wall'},{e:'\u{1F4D4}',n:'Sketchbook'},{e:'\u2728',n:'Fairy Lights'},{e:'\u{1F9F8}',n:'Crow Plushie'},{e:'\u{1F319}',n:'Moon Lamp'}]},
    'crowHouse-r1': { title: 'Room 1', 
        rows: ['\u{1F6CF}\uFE0F \u{1F4DA} \u{1F4A1}', '\u{1FAB4} \u{1F3B5} \u{1F9D8}'],
        desc: "Roommate's room. Tidy and minimal. Smells like lavender.",
        items: [{e:'\u{1F6CF}\uFE0F',n:'Bed'},{e:'\u{1F4DA}',n:'Bookshelf'},{e:'\u{1F4A1}',n:'Desk Lamp'},{e:'\u{1FAB4}',n:'Plant'},{e:'\u{1F9D8}',n:'Yoga Mat'}]},
    'crowHouse-kitchen': { title: 'Shared Kitchen', 
        rows: ['\u{1F9CA} \u{1F373} \u{1F525} \u2615', '\u{1F9C2} \u{1F35E} \u{1F958} \u{1F37D}\uFE0F'],
        desc: 'Always smells like someone is cooking. The shared spice rack is a warzone. Coffee machine has a sticky note: DO NOT TOUCH.',
        items: [{e:'\u2615',n:'Coffee Machine'},{e:'\u{1F9CA}',n:'Shared Fridge'},{e:'\u{1F525}',n:'Stove'},{e:'\u{1F9C2}',n:'Spice Rack'},{e:'\u{1F35E}',n:'Toaster'},{e:'\u{1F37D}\uFE0F',n:'Dish Pile'},{e:'\u{1F958}',n:'Pot'}]},
};

// =============================================
// INIT & CROW
// =============================================
function initCore() { hideCrow(); }

function hideCrow() {
    crowFound = false;
    const ls = ['pikaHouse','crowHouse','dunkin','panera','snell','curry','classroom'];
    crowLoc = ls[~~(Math.random() * ls.length)];
    crowRoom = LOCS[crowLoc] ? LOCS[crowLoc].faves[~~(Math.random() * LOCS[crowLoc].faves.length)] : '';
    document.querySelectorAll('.room-spot').forEach(r => r.classList.remove('searched','crow-here'));
    updComp(); updPins();
}

function updComp() {
    const s = crowFound ? '<span class="companion-found">\u{1F426}\u200D\u2B1B Together! \u{1F49B}</span>' : '<span class="companion-lost">\u{1F426}\u200D\u2B1B Hiding...</span>';
    document.querySelectorAll('[id$="-comp"]').forEach(e => e.innerHTML = s);
    const h = document.getElementById('map-hint');
    if (h) h.innerText = crowFound ? "Pick a place to go with Crow!" : "Find Crow! She's hiding somewhere";
}

function updPins() {
    document.querySelectorAll('.pin-icon').forEach(p => p.classList.remove('glow'));
    if (!crowFound) {
        const m = ['snell','curry','classroom'].includes(crowLoc) ? 'neu' : crowLoc;
        const p = document.getElementById('ic-' + m);
        if (p && Math.random() > 0.4) p.classList.add('glow');
    }
}

// =============================================
// NAVIGATION
// =============================================
function show(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); }
function goMap() { show('screen-map'); }

function travelTo(d) {
    const names = { pikaHouse:"Pika's House", crowHouse:"Crow's Encore", neu:"Northeastern", dunkin:"Dunkin'", panera:"Panera", snell:"Snell Library", curry:"Curry Center", classroom:"Classroom" };
    document.getElementById('travel-text').innerText = 'Scooting to ' + (names[d]||d) + '...';
    document.getElementById('travel-overlay').classList.add('active');
    setTimeout(() => {
        document.getElementById('travel-overlay').classList.remove('active');
        if (d === 'neu') { show('screen-neu'); }
        else { show('screen-'+d); if(d==='curry'){if(typeof initTT==='function')initTT();if(typeof initPool==='function')initPool();} checkCrowAt(d); }
    }, 1300);
}

function checkCrowAt(loc) { if (!crowFound && crowLoc===loc && !LOCS[loc]) { crowFound=true; updComp(); setTimeout(()=>showFound(loc),600); } }

function showFound(loc) {
    document.getElementById('found-loc').innerText = 'Found!';
    document.getElementById('found-choices').innerHTML = '<button class="choice-btn" onclick="travelTo(\'dunkin\')"><span class="ce">\u2615</span>Dunkin\'</button><button class="choice-btn" onclick="travelTo(\'panera\')"><span class="ce">\u{1F964}</span>Panera</button><button class="choice-btn" onclick="travelTo(\'snell\')"><span class="ce">\u{1F4DA}</span>Snell</button><button class="choice-btn" onclick="travelTo(\'curry\')"><span class="ce">\u{1F3D3}</span>Curry</button><button class="choice-btn" onclick="travelTo(\'classroom\')"><span class="ce">\u{1F3EB}</span>Class</button><button class="choice-btn" onclick="goMap()"><span class="ce">\u{1F5FA}\uFE0F</span>Explore</button>';
    show('screen-found');
}

// =============================================
// HOUSE SEARCH
// =============================================
function searchRoom(house, room) {
    if (crowFound) return;
    const loc = LOCS[house]; if (!loc || !loc.msgs[room]) return;
    const msg = loc.msgs[room][~~(Math.random() * loc.msgs[room].length)];
    const el = document.getElementById(house + '-msg');
    if (crowLoc === house && crowRoom === room) {
        crowFound = true; el.innerHTML = msg + ' <strong>FOUND CROW!</strong>'; updComp(); setTimeout(()=>showFound(house),1000);
    } else {
        el.innerText = msg + ' ' + ['Nope!','Not here...','Empty!','No crow!','Just dust...'][~~(Math.random()*5)];
    }
}

// =============================================
// ROOM INTERIOR
// =============================================
function openRoom(house, room) {
    const key = house + '-' + room;
    const data = ROOMS[key]; if (!data) return;
    document.getElementById('ri-title').innerHTML = data.title;
    const scene = document.getElementById('ri-scene');
    scene.innerHTML = '<div class="room-scene-wall"></div><div class="room-scene-floor"></div>' + data.rows.map(r => '<div class="room-emoji-row">' + r + '</div>').join('');
    document.getElementById('ri-desc').innerText = data.desc;
    const items = document.getElementById('ri-items');
    items.className = 'room-items-grid'; items.innerHTML = '';
    data.items.forEach(item => {
        const d = document.createElement('div');
        d.className = 'room-item';
        d.innerHTML = '<span class="ri-emoji">' + item.e + '</span>' + item.n;
        d.onclick = () => { if(!d.classList.contains('tapped')){d.classList.add('tapped');
            const r=['Nice find!','Ooh!','Classic!','Love it!','So cozy!','Cute!','Adorable!'];
            document.getElementById('ri-msg').innerText=item.e+' '+item.n+' \u2014 '+r[~~(Math.random()*r.length)];}};
        items.appendChild(d);
    });
    document.getElementById('ri-msg').innerText = 'Tap items to interact!';
    document.getElementById('room-interior').classList.add('active');
}

function closeRoom() { document.getElementById('room-interior').classList.remove('active'); }

// =============================================
// MAP SCOOTER TRACKING
// =============================================
var PIN_POS = {
    pikaHouse: { x: 55, y: 80 },
    crowHouse: { x: 495, y: 410 },
    neu: { x: 245, y: 120 },
    dunkin: { x: 125, y: 260 },
    panera: { x: 365, y: 220 },
    snell: { x: 245, y: 120 },
    curry: { x: 245, y: 120 },
    classroom: { x: 245, y: 120 }
};

function moveScooterTo(loc) {
    var scoot = document.getElementById('map-scoot');
    if (!scoot) return;
    var pos = PIN_POS[loc] || PIN_POS.pikaHouse;
    scoot.style.left = pos.x + 'px';
    scoot.style.top = pos.y + 'px';
}
