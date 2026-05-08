// =============================================
// FLIGHT ADVENTURE — Boston → Mumbai
// =============================================

var AIRLINES = [
    { id: 'etihad',   name: 'Etihad Airways',     emoji: '🇦🇪', color: '#c5a248', accent: '#1a1a2e', flight: 'EY 102', gate: 'B14', time: '10:30 PM', seat: '14A' },
    { id: 'turkish',  name: 'Turkish Airlines',    emoji: '🇹🇷', color: '#e31e24', accent: '#fff',    flight: 'TK 718', gate: 'C22', time: '11:15 PM', seat: '22F' },
    { id: 'indigo',   name: 'IndiGo',              emoji: '🇮🇳', color: '#3f0f8f', accent: '#fff',    flight: '6E 1042',gate: 'A08', time: '09:45 PM', seat: '8C'  },
    { id: 'qatar',    name: 'Qatar Airways',        emoji: '🇶🇦', color: '#5c0632', accent: '#c9a96e', flight: 'QR 517', gate: 'D05', time: '11:55 PM', seat: '18A' },
    { id: 'emirates', name: 'Emirates',             emoji: '🇦🇪', color: '#d71921', accent: '#fff',    flight: 'EK 228', gate: 'E31', time: '01:20 AM', seat: '26K' }
];

var flightCrowAirline = null; // which airline crow is hiding on (NOT indigo)
var chosenAirline = null;
var flightCrowFound = false;
var mealChosen = null;
var drinkChosen = null;

function initFlight() {
    // Pick random airline for crow (NOT indigo)
    var options = AIRLINES.filter(function(a) { return a.id !== 'indigo'; });
    flightCrowAirline = options[~~(Math.random() * options.length)];
    chosenAirline = null;
    flightCrowFound = false;
    mealChosen = null;
    drinkChosen = null;
    renderAirlineSelect();
}

function renderAirlineSelect() {
    var p = document.getElementById('flight-panel');
    var h = '<div class="panel-title">✈️ Choose Your Airline</div>';
    h += '<div style="text-align:center;font-size:.75rem;font-weight:700;color:#888;margin-bottom:12px;">Boston (BOS) → Mumbai (BOM) • Crow is hiding on ONE random flight! 🐦‍⬛✨<br><span style="font-size:.6rem;color:#aaa;">(Hint: She\'ll never take IndiGo!)</span></div>';
    h += '<div class="airline-grid">';
    for (var i = 0; i < AIRLINES.length; i++) {
        var a = AIRLINES[i];
        h += '<button class="airline-card" style="--ac:' + a.color + ';" onclick="pickAirline(\'' + a.id + '\')">';
        h += '<div class="airline-logo" style="background:' + a.color + ';color:' + a.accent + ';">' + a.emoji + '</div>';
        h += '<div class="airline-name">' + a.name + '</div>';
        h += '<div class="airline-flight">' + a.flight + ' • Gate ' + a.gate + '</div>';
        h += '<div class="airline-time">🕐 ' + a.time + '</div>';
        h += '</button>';
    }
    h += '</div>';
    p.innerHTML = h;
}

function pickAirline(id) {
    chosenAirline = AIRLINES.filter(function(a) { return a.id === id; })[0];
    flightCrowFound = (flightCrowAirline && flightCrowAirline.id === id);
    showBoardingPass();
}

function showBoardingPass() {
    var a = chosenAirline;
    var p = document.getElementById('flight-panel');
    var h = '<div class="boarding-pass">';
    h += '<div class="bp-header" style="background:' + a.color + ';color:' + a.accent + ';">';
    h += '<div class="bp-plane">✈️</div>';
    h += '<div class="bp-title">BOARDING PASS</div>';
    h += '<div class="bp-airline-name">' + a.name + '</div>';
    h += '</div>';
    h += '<div class="bp-body">';
    h += '<div class="bp-main">';
    h += '<div class="bp-row"><span class="bp-label">NAME:</span><span class="bp-value">PIKA ⚡</span></div>';
    h += '<div class="bp-row-2">';
    h += '<div><span class="bp-label">FROM:</span><span class="bp-value">BOSTON (BOS)</span></div>';
    h += '<div><span class="bp-label">TO:</span><span class="bp-value">MUMBAI (BOM)</span></div>';
    h += '</div>';
    h += '<div class="bp-row-2">';
    h += '<div><span class="bp-label">DATE:</span><span class="bp-value">08 MAY 2026</span></div>';
    h += '<div><span class="bp-label">CLASS:</span><span class="bp-value">ECONOMY</span></div>';
    h += '</div>';
    h += '<div class="bp-row-3">';
    h += '<div><span class="bp-label">GATE:</span><span class="bp-value">' + a.gate + '</span></div>';
    h += '<div><span class="bp-label">FLIGHT:</span><span class="bp-value">' + a.flight + '</span></div>';
    h += '<div><span class="bp-label">TIME:</span><span class="bp-value">' + a.time + '</span></div>';
    h += '<div><span class="bp-label">SEAT:</span><span class="bp-value">' + a.seat + '</span></div>';
    h += '</div>';
    // Barcode
    h += '<div class="bp-barcode">';
    for (var i = 0; i < 40; i++) h += '<div style="width:' + (2 + Math.random() * 3) + 'px;height:30px;background:#333;"></div>';
    h += '</div>';
    h += '</div>';
    // Stub (right side)
    h += '<div class="bp-stub" style="border-left-color:' + a.color + ';">';
    h += '<div class="bp-stub-title" style="color:' + a.color + ';">BOARDING PASS</div>';
    h += '<div class="bp-stub-row"><span>NAME:</span><span>PIKA ⚡</span></div>';
    h += '<div class="bp-stub-row"><span>BOS → BOM</span></div>';
    h += '<div class="bp-stub-row"><span>SEAT: ' + a.seat + '</span></div>';
    h += '<div class="bp-stub-row"><span>' + a.flight + '</span></div>';
    h += '</div>';
    h += '</div></div>';

    // Pika sprite on boarding pass
    h += '<div style="text-align:center;margin:12px 0;"><img src="pikachu.png" style="width:60px;height:60px;border-radius:50%;border:3px solid ' + a.color + ';object-fit:cover;"></div>';

    h += '<button class="action-btn" onclick="boardFlight()">Board Flight ✈️</button>';
    p.innerHTML = h;
}

function boardFlight() {
    // Show dramatic result — crow found or not
    var p = document.getElementById('flight-panel');
    
    if (flightCrowFound) {
        // CONFETTI BLAST + CUTESY THEME
        launchFlightConfetti();
        var h = '<div class="flight-result found-result">';
        h += '<div class="fr-confetti-text">🎉✨💛✨🎉</div>';
        h += '<div class="fr-title found-title">YAYYY!! 💛💛💛</div>';
        h += '<div class="fr-chars">';
        h += '<img src="pikachu.png" class="fr-sprite pika-bounce" alt="Pika">';
        h += '<div class="fr-heart">💛</div>';
        h += '<img src="crow.png" class="fr-sprite crow-bounce" alt="Crow">';
        h += '</div>';
        h += '<div class="fr-msg">You found Crow on the plane!! 🥹<br>Travel buddies forever! Flying to Mumbai together!</div>';
        h += '<div class="fr-sub">Enjoy the journey with your bestie~ ✈️💛</div>';
        h += '</div>';
        h += '<button class="action-btn" onclick="showPlaneInterior()" style="margin-top:10px;">Enter the Cabin 🛫</button>';
        p.innerHTML = h;
        // Update companion status
        crowFound = true;
        updComp();
    } else {
        // SAD DRAMATIC VIBE
        var h = '<div class="flight-result solo-result">';
        h += '<div class="fr-title solo-title">Oh no... 😢</div>';
        h += '<div class="fr-chars">';
        h += '<img src="pikachu.png" class="fr-sprite pika-sad" alt="Pika">';
        h += '<div class="fr-empty">🪹</div>';
        h += '</div>';
        h += '<div class="fr-msg solo-msg">Crow isn\'t on this flight... 💔<br>Traveling solo to Mumbai this time.</div>';
        h += '<div class="fr-sub solo-sub">Maybe next time you\'ll find each other~ 🥺</div>';
        h += '<div style="font-size:.65rem;color:#aaa;margin-top:8px;">Crow was hiding on ' + flightCrowAirline.name + ' ' + flightCrowAirline.emoji + '</div>';
        h += '</div>';
        h += '<button class="action-btn" onclick="showPlaneInterior()" style="margin-top:10px;">Enter the Cabin Solo 🛫</button>';
        p.innerHTML = h;
    }
}

function launchFlightConfetti() {
    var overlay = document.createElement('div');
    overlay.className = 'flight-confetti-overlay';
    overlay.id = 'flight-confetti';
    var colors = ['#ff69b4','#ffd700','#ff1493','#87ceeb','#ffa500','#98fb98','#dda0dd','#ff6347'];
    for (var i = 0; i < 80; i++) {
        var c = document.createElement('div');
        c.className = 'confetti-piece';
        c.style.left = Math.random() * 100 + '%';
        c.style.background = colors[~~(Math.random() * colors.length)];
        c.style.animationDelay = (Math.random() * 2) + 's';
        c.style.animationDuration = (2 + Math.random() * 3) + 's';
        var size = 5 + Math.random() * 8;
        c.style.width = size + 'px';
        c.style.height = size * (0.5 + Math.random()) + 'px';
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        overlay.appendChild(c);
    }
    document.body.appendChild(overlay);
    setTimeout(function() { var el = document.getElementById('flight-confetti'); if (el) el.remove(); }, 5000);
}

function showPlaneInterior() {
    var p = document.getElementById('flight-panel');
    var withCrow = flightCrowFound;
    
    var h = '<div class="plane-cabin">';
    // Overhead bins
    h += '<div class="cabin-overhead">'; 
    for (var i = 0; i < 6; i++) h += '<div class="overhead-bin"></div>';
    h += '</div>';
    // Rows of seats
    h += '<div class="cabin-aisle">';
    // Row 1 - empty
    h += '<div class="seat-row"><div class="seat taken"></div><div class="seat taken"></div><div class="seat taken"></div><div class="aisle-gap"></div><div class="seat taken"></div><div class="seat taken"></div><div class="seat taken"></div></div>';
    // Row 2 - empty
    h += '<div class="seat-row"><div class="seat taken"></div><div class="seat taken"></div><div class="seat taken"></div><div class="aisle-gap"></div><div class="seat taken"></div><div class="seat taken"></div><div class="seat taken"></div></div>';
    // Row 3 - Pika and maybe Crow
    h += '<div class="seat-row highlight-row">';
    h += '<div class="seat pika-seat"><img src="pikachu.png" class="seat-sprite"></div>';
    if (withCrow) {
        h += '<div class="seat crow-seat"><img src="crow.png" class="seat-sprite"></div>';
    } else {
        h += '<div class="seat empty-seat"></div>';
    }
    h += '<div class="seat taken"></div>';
    h += '<div class="aisle-gap"></div>';
    h += '<div class="seat taken"></div><div class="seat taken"></div><div class="seat taken"></div>';
    h += '</div>';
    // Row 4-6 empty
    for (var r = 0; r < 3; r++) {
        h += '<div class="seat-row"><div class="seat taken"></div><div class="seat taken"></div><div class="seat taken"></div><div class="aisle-gap"></div><div class="seat taken"></div><div class="seat taken"></div><div class="seat taken"></div></div>';
    }
    h += '</div>';
    // Cabin floor pattern
    h += '<div class="cabin-carpet"></div>';
    h += '</div>';

    if (withCrow) {
        h += '<div class="msg-box" style="margin:8px 0;">⚡💛🐦‍⬛ Pika & Crow are seated together!</div>';
    } else {
        h += '<div class="msg-box" style="margin:8px 0;">⚡ Pika is flying solo... window seat views though! 🌅</div>';
    }

    h += '<button class="action-btn" onclick="showMealMenu()">🍽️ Time for In-Flight Meal!</button>';
    p.innerHTML = h;
}

// =============================================
// MEAL MENU
// =============================================
var MEALS = [
    { 
        id: 'chicken', 
        name: 'Chicken Curry Meal',
        desc: 'Chicken curry with salad, rice, bread, butter & pudding',
        items: [
            { emoji: '🍛', name: 'Chicken Curry' },
            { emoji: '🥗', name: 'Fresh Salad' },
            { emoji: '🍚', name: 'Steamed Rice' },
            { emoji: '🍞', name: 'Warm Bread' },
            { emoji: '🧈', name: 'Butter' },
            { emoji: '🍮', name: 'Caramel Pudding' }
        ]
    },
    { 
        id: 'veg', 
        name: 'Vegetarian Meal',
        desc: 'Vegetable rice with salad, bread, butter & cheesecake',
        items: [
            { emoji: '🥘', name: 'Vegetable Curry' },
            { emoji: '🥗', name: 'Fresh Salad' },
            { emoji: '🍚', name: 'Vegetable Rice' },
            { emoji: '🍞', name: 'Warm Bread' },
            { emoji: '🧈', name: 'Butter' },
            { emoji: '🍰', name: 'Cheesecake' }
        ]
    },
    { 
        id: 'pasta', 
        name: 'White Sauce Pasta',
        desc: 'White sauce pasta with salad, garlic bread & tiramisu',
        items: [
            { emoji: '🍝', name: 'White Sauce Pasta' },
            { emoji: '🥗', name: 'Fresh Salad' },
            { emoji: '🥖', name: 'Garlic Bread' },
            { emoji: '🍰', name: 'Tiramisu' }
        ]
    }
];

var DRINKS = [
    { id: 'apple',     name: 'Apple Juice',     emoji: '🍎🧃', cat: 'juice' },
    { id: 'pineapple', name: 'Pineapple Juice', emoji: '🍍🧃', cat: 'juice' },
    { id: 'kiwi',      name: 'Kiwi Juice',      emoji: '🥝🧃', cat: 'juice' },
    { id: 'pepsi',     name: 'Pepsi',            emoji: '🥤',   cat: 'soda' },
    { id: 'cola',      name: 'Cola',             emoji: '🥤',   cat: 'soda' },
    { id: 'fanta',     name: 'Fanta',            emoji: '🍊🥤', cat: 'soda' },
    { id: 'coffee',    name: 'Coffee',           emoji: '☕',    cat: 'hot' },
    { id: 'tea',       name: 'Tea',              emoji: '🍵',   cat: 'hot' },
    { id: 'redwine',   name: 'Red Wine',         emoji: '🍷',   cat: 'alcohol' },
    { id: 'whitewine', name: 'White Wine',       emoji: '🥂',   cat: 'alcohol' },
    { id: 'grapewine', name: 'Grape Wine',       emoji: '🍇🍷', cat: 'alcohol' },
    { id: 'beer',      name: 'Beer',             emoji: '🍺',   cat: 'alcohol' },
    { id: 'whiskey',   name: 'Whiskey',          emoji: '🥃',   cat: 'alcohol' },
    { id: 'vodka',     name: 'Vodka',            emoji: '🍸',   cat: 'alcohol' }
];

function showMealMenu() {
    var p = document.getElementById('flight-panel');
    var h = '<div class="panel-title">🍽️ In-Flight Meal Service</div>';
    h += '<div style="text-align:center;font-size:.7rem;font-weight:700;color:#888;margin-bottom:10px;">All meals are prepaid with your ticket! Choose one:</div>';
    
    h += '<div class="meal-grid">';
    for (var i = 0; i < MEALS.length; i++) {
        var m = MEALS[i];
        h += '<button class="meal-card" onclick="chooseMeal(\'' + m.id + '\')">';
        h += '<div class="meal-emojis">';
        for (var j = 0; j < Math.min(m.items.length, 4); j++) h += '<span>' + m.items[j].emoji + '</span>';
        h += '</div>';
        h += '<div class="meal-name">' + m.name + '</div>';
        h += '<div class="meal-desc">' + m.desc + '</div>';
        h += '</button>';
    }
    h += '</div>';
    p.innerHTML = h;
}

function chooseMeal(id) {
    mealChosen = MEALS.filter(function(m) { return m.id === id; })[0];
    showMealServed();
}

function showMealServed() {
    var p = document.getElementById('flight-panel');
    var m = mealChosen;
    
    var h = '<div class="panel-title">🍽️ Your Meal is Served!</div>';
    // Food tray visual
    h += '<div class="food-tray">';
    h += '<div class="tray-grid">';
    for (var i = 0; i < m.items.length; i++) {
        h += '<div class="tray-item' + (i === 0 ? ' main-dish' : '') + '">';
        h += '<div class="tray-emoji">' + m.items[i].emoji + '</div>';
        h += '<div class="tray-name">' + m.items[i].name + '</div>';
        h += '</div>';
    }
    h += '</div>';
    // Cutlery
    h += '<div class="tray-cutlery">🍴 🥄 🔪</div>';
    // Napkin
    h += '<div class="tray-napkin">🧻 ' + chosenAirline.name + '</div>';
    h += '</div>';

    if (flightCrowFound) {
        h += '<div class="msg-box">⚡ Pika & 🐦‍⬛ Crow enjoying ' + m.name + ' together! 💛</div>';
    } else {
        h += '<div class="msg-box">⚡ Pika enjoys the ' + m.name + '~ 🍽️</div>';
    }

    h += '<button class="action-btn" onclick="showDrinkMenu()">🥤 Now for Drinks!</button>';
    p.innerHTML = h;
}

function showDrinkMenu() {
    var p = document.getElementById('flight-panel');
    var h = '<div class="panel-title">🥤 Drinks Menu</div>';
    h += '<div style="text-align:center;font-size:.7rem;font-weight:700;color:#888;margin-bottom:10px;">Choose your beverage! All complimentary ✈️</div>';
    
    // Categorized drinks
    var cats = [
        { name: '🧃 Fresh Juices', filter: 'juice' },
        { name: '🥤 Soft Drinks', filter: 'soda' },
        { name: '☕ Hot Beverages', filter: 'hot' },
        { name: '🍷 Alcoholic Beverages', filter: 'alcohol' }
    ];
    
    h += '<div class="drink-menu">';
    for (var ci = 0; ci < cats.length; ci++) {
        var cat = cats[ci];
        var drinks = DRINKS.filter(function(d) { return d.cat === cat.filter; });
        h += '<div class="drink-category">';
        h += '<div class="drink-cat-title">' + cat.name + '</div>';
        h += '<div class="drink-cat-grid">';
        for (var di = 0; di < drinks.length; di++) {
            var d = drinks[di];
            h += '<button class="drink-option" onclick="chooseDrink(\'' + d.id + '\')">';
            h += '<span class="drink-emoji">' + d.emoji + '</span>';
            h += '<span class="drink-label">' + d.name + '</span>';
            h += '</button>';
        }
        h += '</div></div>';
    }
    h += '</div>';
    p.innerHTML = h;
}

function chooseDrink(id) {
    drinkChosen = DRINKS.filter(function(d) { return d.id === id; })[0];
    showDrinkServed();
}

function showDrinkServed() {
    var p = document.getElementById('flight-panel');
    var d = drinkChosen;
    var isAlcohol = d.cat === 'alcohol';
    
    var h = '';
    
    if (isAlcohol) {
        // DRAMATIC SMIRK REACTION
        h += '<div class="drink-served alcohol-served">';
        h += '<div class="alcohol-reaction">';
        h += '<div style="font-size:3rem;">😏🍷👀</div>';
        h += '<div class="alcohol-title">Oooooh~ ' + d.name + '?! 😏😏😏</div>';
        h += '<div class="alcohol-msg">';
        h += 'Pika ordering ' + d.name + '?!<br>';
        h += '"I don\'t drink alcohol" he says... 🤥<br>';
        h += 'Sure, Pika. Suuuure. 😏✨<br>';
        h += '<span style="font-size:.65rem;">*sips judgmentally from across the aisle*</span>';
        h += '</div>';
        if (flightCrowFound) {
            h += '<div style="margin-top:8px;font-size:.75rem;font-weight:800;">🐦‍⬛ Crow is side-eyeing you SO HARD rn 👁️👄👁️</div>';
        }
        h += '</div>';
    } else {
        h += '<div class="drink-served normal-served">';
    }
    
    // Show specific drink visual
    h += '<div class="drink-visual">';
    h += '<div class="served-drink-icon">' + getDrinkVisual(d.id) + '</div>';
    h += '<div class="served-drink-name">' + d.name + '</div>';
    h += '</div>';
    
    if (!isAlcohol) {
        if (flightCrowFound) {
            h += '<div class="msg-box">⚡ & 🐦‍⬛ Cheers! Enjoying drinks together at 35,000 ft! 💛✈️</div>';
        } else {
            h += '<div class="msg-box">⚡ Pika sips ' + d.name + ' while watching clouds~ ☁️✈️</div>';
        }
    }
    
    h += '</div>';
    h += '<button class="action-btn" onclick="showLanding()">🛬 Prepare for Landing!</button>';
    h += '<button class="action-btn sec" onclick="showDrinkMenu()">Order Another Drink 🥤</button>';
    p.innerHTML = h;
}

function getDrinkVisual(id) {
    var visuals = {
        apple: '<div class="drink-cup juice-cup"><div class="juice-fill" style="background:linear-gradient(180deg,#c8e860,#90b830);"></div><div class="juice-label">🍎</div></div>',
        pineapple: '<div class="drink-cup juice-cup"><div class="juice-fill" style="background:linear-gradient(180deg,#f0d840,#d8b820);"></div><div class="juice-label">🍍</div></div>',
        kiwi: '<div class="drink-cup juice-cup"><div class="juice-fill" style="background:linear-gradient(180deg,#88c840,#609820);"></div><div class="juice-label">🥝</div></div>',
        pepsi: '<div class="drink-cup soda-cup"><div class="soda-fill pepsi-fill"></div><div class="soda-bubbles">∘°○</div></div>',
        cola: '<div class="drink-cup soda-cup"><div class="soda-fill cola-fill"></div><div class="soda-bubbles">∘°○</div></div>',
        fanta: '<div class="drink-cup soda-cup"><div class="soda-fill fanta-fill"></div><div class="soda-bubbles">∘°○</div></div>',
        coffee: '<div class="drink-cup hot-cup coffee-vis"><div class="hot-steam">～～</div><div class="hot-fill" style="background:#4a2810;"></div></div>',
        tea: '<div class="drink-cup hot-cup tea-vis"><div class="hot-steam">～～</div><div class="hot-fill" style="background:#c88030;"></div><div class="tea-tag">🏷️</div></div>',
        redwine: '<div class="drink-cup wine-glass"><div class="wine-fill" style="background:#8b0020;"></div></div>',
        whitewine: '<div class="drink-cup wine-glass"><div class="wine-fill" style="background:#e8d880;"></div></div>',
        grapewine: '<div class="drink-cup wine-glass"><div class="wine-fill" style="background:#6a0060;"></div></div>',
        beer: '<div class="drink-cup beer-mug"><div class="beer-fill"></div><div class="beer-foam">🍺</div></div>',
        whiskey: '<div class="drink-cup whiskey-glass"><div class="whiskey-fill"></div><div class="whiskey-ice">🧊</div></div>',
        vodka: '<div class="drink-cup vodka-glass"><div class="vodka-fill"></div><div class="vodka-olive">🫒</div></div>'
    };
    return visuals[id] || '<div style="font-size:3rem;">' + drinkChosen.emoji + '</div>';
}

function showLanding() {
    var p = document.getElementById('flight-panel');
    var h = '<div class="landing-screen">';
    h += '<div class="landing-plane">✈️</div>';
    h += '<div class="landing-city">🏙️ Mumbai</div>';
    h += '<div class="landing-title">Welcome to Mumbai! 🇮🇳</div>';
    h += '<div style="font-size:.8rem;font-weight:700;color:#888;margin:8px 0;">Chhatrapati Shivaji Maharaj International Airport</div>';
    
    if (flightCrowFound) {
        h += '<div class="landing-chars">';
        h += '<img src="pikachu.png" class="landing-sprite">';
        h += '<span style="font-size:2rem;">💛</span>';
        h += '<img src="crow.png" class="landing-sprite">';
        h += '</div>';
        h += '<div class="msg-box">Made it to Mumbai together! Time to explore Thane! 💛🐦‍⬛⚡</div>';
    } else {
        h += '<div class="landing-chars">';
        h += '<img src="pikachu.png" class="landing-sprite">';
        h += '</div>';
        h += '<div class="msg-box">Pika lands in Mumbai! Thane awaits! ⚡🇮🇳</div>';
    }
    
    h += '</div>';
    h += '<button class="action-btn" onclick="travelTo(\'thane\')">🛴 Head to Thane! 🏙️</button>';
    h += '<button class="action-btn sec" onclick="goMap()">← Back to Boston Map</button>';
    p.innerHTML = h;
}
