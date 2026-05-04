// =============================================
// DUNKIN' DATA
// =============================================
const DK_MENU = [
    {name:'Banana Choco Iced Coffee',emoji:'🍌🍫☕',base:4.99,special:true,sizes:{M:0,L:.80},flavors:['Classic Banana Choco','Extra Chocolate +$0.60','Extra Banana +$0.50'],milks:['Oat Milk +$0.70','Whole','Almond +$0.60','Cream +$0.30'],extras:['Whip Cream +$0.50','Choco Drizzle +$0.60','Extra Shot +$0.80','Banana Slices +$0.40']},
    {name:'Iced Coffee',emoji:'🧊☕',base:3.49,sizes:{S:-.50,M:0,L:.80,XL:1.30},flavors:['None','Vanilla +$0.60','Caramel +$0.60','Mocha +$0.80','Hazelnut +$0.60','French Vanilla +$0.60','Toasted Almond +$0.60'],milks:['Regular','Cream +$0.30','Oat Milk +$0.70','Almond +$0.60','Coconut +$0.60','Skim'],extras:['Extra Shot +$0.80','Whip Cream +$0.50','Sweet Cold Foam +$1.00','Liquid Sugar +$0.00','Turbo Shot +$1.20']},
    {name:'Latte',emoji:'☕✨',base:4.49,sizes:{S:-.50,M:0,L:.80},flavors:['None','Vanilla +$0.60','Caramel +$0.60','Mocha +$0.80','Pumpkin Spice +$0.80','Brown Sugar +$0.70'],milks:['Whole','Oat +$0.70','Almond +$0.60','Skim'],extras:['Extra Shot +$0.80','Whip +$0.50','Cinnamon +$0.00']},
    {name:'Matcha Latte',emoji:'🍵',base:4.99,sizes:{M:0,L:.80},flavors:['Original','Vanilla +$0.60','Blueberry +$0.70'],milks:['Oat +$0.70','Whole','Almond +$0.60'],extras:['Extra Matcha +$0.80','Whip +$0.50','Boba +$1.00']},
    {name:'Cold Brew',emoji:'🥶☕',base:4.29,sizes:{M:0,L:.80},flavors:['Black','Vanilla Sweet Cream +$0.80','Caramel +$0.60','Mocha +$0.80'],milks:['None','Cream +$0.30','Oat +$0.70'],extras:['Extra Shot +$0.80','Sweet Foam +$1.00','Cinnamon +$0.00']},
    {name:'Hot Chocolate',emoji:'🍫☕',base:3.29,sizes:{S:-.30,M:0,L:.60},flavors:['Classic','Mint +$0.50','White Choco +$0.60'],milks:['Whole','Oat +$0.70'],extras:['Marshmallows +$0.40','Whip +$0.50','Extra Choco +$0.60']},
    {name:'Refresher',emoji:'🍓💧',base:3.99,sizes:{S:-.50,M:0,L:.80},flavors:['Strawberry Dragonfruit','Peach Passion','Mango Pineapple'],milks:null,extras:['Green Tea Base +$0.00','Lemonade Base +$0.30','Coconut Milk +$0.70']},
    {name:'Bagel',emoji:'🥯',base:2.49,sizes:null,flavors:['Plain','Everything','Sesame','Cinnamon Raisin'],milks:null,extras:['Cream Cheese +$1.00','Butter +$0.50','Avocado +$1.50','Egg & Cheese +$2.00','Bacon Egg Cheese +$2.80']},
    {name:'Croissant',emoji:'🥐',base:2.99,sizes:null,flavors:null,milks:null,extras:['Ham & Cheese +$1.50','Chocolate +$0.80','Almond +$0.80','Sausage Egg +$2.00','Plain +$0.00']},
    {name:'Donut',emoji:'🍩',base:1.69,sizes:null,flavors:null,milks:null,extras:['Glazed +$0.00','Boston Cream +$0.30','Choco Frosted +$0.20','Strawberry +$0.20','Jelly +$0.20','Blueberry +$0.20','Old Fashioned +$0.00','Cruller +$0.10']},
    {name:'Muffin',emoji:'🧁',base:2.29,sizes:null,flavors:null,milks:null,extras:['Blueberry +$0.00','Choco Chip +$0.30','Banana Nut +$0.30','Coffee Cake +$0.30','Corn +$0.20']},
];

let cart = [], dkItem = null, dkSel = {};

function buildDK() {
    const p = document.getElementById('dk-panel');
    p.innerHTML = `<div class="panel-title">☕ Dunkin' Menu</div>
        <div class="menu-grid" id="dk-grid"></div>
        <div id="dk-cust" style="display:none;"></div>
        <div class="cart-box" id="dk-cart" style="display:none;">
            <div style="font-size:.65rem;font-weight:900;color:#8b005d;margin-bottom:4px;">🛒 Your Order</div>
            <div id="dk-items"></div>
            <div class="cart-total" id="dk-total"></div>
        </div>
        <div class="pay-opts" id="dk-pay" style="display:none;">
            <button class="pay-btn" onclick="dkPay('💳 Card')">💳 Card</button>
            <button class="pay-btn" onclick="dkPay('💵 Cash')">💵 Cash</button>
            <button class="pay-btn" onclick="dkPay('📱 Apple Pay')">📱 Pay</button>
        </div>
        <div id="dk-receipt"></div>`;
    const g = document.getElementById('dk-grid');
    DK_MENU.forEach((m, i) => {
        const badge = m.special ? '<span style="display:block;font-size:.5rem;color:var(--dpink);font-weight:900;">⭐ Pika & Crow\'s Fav!</span>' : '';
        const border = m.special ? 'border-color:var(--gold);background:#fffbf0;' : '';
        g.innerHTML += `<div class="menu-item" style="${border}" onclick="dkSelect(${i})">
            <span class="ie">${m.emoji}</span>${m.name}${badge}<br><span class="ip">from $${m.base.toFixed(2)}</span></div>`;
    });
}

function dkSelect(i) {
    dkItem = DK_MENU[i];
    dkSel = { size: dkItem.sizes ? Object.keys(dkItem.sizes)[1] || Object.keys(dkItem.sizes)[0] : null, flavor: null, milk: null, extras: [] };
    renderDKCust();
}

function renderDKCust() {
    const c = document.getElementById('dk-cust');
    if (!dkItem) { c.style.display = 'none'; return; }
    c.style.display = 'block';
    let h = `<div class="cust-panel">
        <div style="font-size:1.2rem;text-align:center;">${dkItem.emoji}</div>
        <div style="text-align:center;font-weight:900;font-size:.85rem;color:#8b005d;margin:4px 0;">${dkItem.name}</div>`;
    if (dkItem.sizes) {
        h += `<div class="cust-label">Size</div><div class="cust-opts">`;
        for (const s in dkItem.sizes) {
            const ex = dkItem.sizes[s];
            const lbl = s + (ex > 0 ? ` +$${ex.toFixed(2)}` : ex < 0 ? ` −$${Math.abs(ex).toFixed(2)}` : '');
            h += `<button class="opt ${dkSel.size === s ? 'sel' : ''}" onclick="dkSel.size='${s}';renderDKCust()">${lbl}</button>`;
        }
        h += `</div>`;
    }
    if (dkItem.flavors) {
        h += `<div class="cust-label">Flavor</div><div class="cust-opts">`;
        dkItem.flavors.forEach(f => {
            h += `<button class="opt ${dkSel.flavor === f ? 'sel' : ''}" onclick="dkSel.flavor=dkSel.flavor==='${f}'?null:'${f}';renderDKCust()">${f}</button>`;
        });
        h += `</div>`;
    }
    if (dkItem.milks) {
        h += `<div class="cust-label">Milk</div><div class="cust-opts">`;
        dkItem.milks.forEach(m => {
            h += `<button class="opt ${dkSel.milk === m ? 'sel' : ''}" onclick="dkSel.milk=dkSel.milk==='${m}'?null:'${m}';renderDKCust()">${m}</button>`;
        });
        h += `</div>`;
    }
    if (dkItem.extras) {
        h += `<div class="cust-label">Add-ons</div><div class="cust-opts">`;
        dkItem.extras.forEach(e => {
            const sel = dkSel.extras.includes(e);
            h += `<button class="opt ${sel ? 'sel' : ''}" onclick="dkToggleExtra('${e}')">${e}</button>`;
        });
        h += `</div>`;
    }
    const price = calcDKPrice();
    h += `<div style="text-align:center;font-weight:900;font-size:1.1rem;color:var(--dpink);margin-top:8px;">$${price.toFixed(2)}</div>`;
    h += `<button class="action-btn" onclick="dkAddCart()">Add to Order 🛒</button></div>`;
    c.innerHTML = h;
}

function dkToggleExtra(e) { const i = dkSel.extras.indexOf(e); if (i >= 0) dkSel.extras.splice(i, 1); else dkSel.extras.push(e); renderDKCust(); }

function calcDKPrice() {
    let p = dkItem.base;
    if (dkSel.size && dkItem.sizes) p += dkItem.sizes[dkSel.size] || 0;
    [dkSel.flavor, dkSel.milk, ...dkSel.extras].forEach(s => { if (s) { const m = s.match(/\+\$(\d+\.?\d*)/); if (m) p += parseFloat(m[1]); } });
    return p;
}

function dkAddCart() {
    let d = dkItem.name;
    if (dkSel.size) d = dkSel.size + ' ' + d;
    if (dkSel.flavor && dkSel.flavor !== 'None') d += ', ' + dkSel.flavor.split('+')[0].trim();
    if (dkSel.milk && !['Regular', 'Whole', 'None'].includes(dkSel.milk.split('+')[0].trim())) d += ', ' + dkSel.milk.split('+')[0].trim();
    dkSel.extras.forEach(e => d += ', ' + e.split('+')[0].trim());
    cart.push({ desc: d, price: calcDKPrice() });
    dkItem = null;
    document.getElementById('dk-cust').style.display = 'none';
    renderDKCart();
}

function renderDKCart() {
    if (!cart.length) { document.getElementById('dk-cart').style.display = 'none'; document.getElementById('dk-pay').style.display = 'none'; return; }
    document.getElementById('dk-cart').style.display = 'block'; document.getElementById('dk-pay').style.display = 'flex';
    const el = document.getElementById('dk-items'); el.innerHTML = ''; let tot = 0;
    cart.forEach((c, i) => { tot += c.price; el.innerHTML += `<div class="cart-row"><span>${c.desc}</span><span>$${c.price.toFixed(2)} <span style="color:red;cursor:pointer;" onclick="cart.splice(${i},1);renderDKCart()">✕</span></span></div>`; });
    const tax = tot * .0625;
    document.getElementById('dk-total').innerText = `Subtotal $${tot.toFixed(2)} + Tax $${tax.toFixed(2)} = $${(tot + tax).toFixed(2)}`;
}

function dkPay(method) {
    const tot = cart.reduce((s, c) => s + c.price, 0), tax = tot * .0625;
    document.getElementById('dk-panel').innerHTML = `
        <div style="text-align:center;padding:15px;">
            <div style="font-size:3rem;">✅</div>
            <div class="panel-title">Order Placed!</div>
            <p style="font-size:.8rem;color:#888;font-weight:700;">$${(tot + tax).toFixed(2)} via ${method}</p>
            <div style="font-size:2.5rem;margin:10px 0;">${typeof crowFound !== 'undefined' && crowFound ? '⚡☕🐦‍⬛' : '⚡☕'}</div>
            <p style="font-size:.8rem;color:#888;">${typeof crowFound !== 'undefined' && crowFound ? 'Enjoying together! 💛' : 'Solo sip... 🤔'}</p>
        </div>
        <button class="action-btn" onclick="cart=[];buildDK()">Order Again</button>
        <button class="action-btn sec" onclick="goMap()">Map 🗺️</button>`;
    cart = [];
}

// =============================================
// PANERA DRINK BUILDER
// =============================================
let pnDrink = { base: null, milk: null, sweet: null, ice: null, extras: [] };

const PN = {
    bases: ['☕ Dark Roast', '☕ Light Roast', '☕ Decaf', '🍵 Green Tea', '🍵 Black Tea', '🍵 Chai', '🧊 Cold Brew', '🍋 Lemonade', '🍋 Strawberry Lemonade', '🥤 Pepsi', '🍫 Hot Chocolate', '🧃 Agave Lemonade'],
    milks: ['None', 'Whole Milk', '2% Milk', 'Oat Milk', 'Almond Milk', 'Coconut Milk', 'Cream', 'Half & Half'],
    sweet: ['None', '1 Sugar', '2 Sugars', '3 Sugars', 'Honey', 'Agave', 'Vanilla Syrup', 'Caramel Syrup', 'Hazelnut Syrup', 'Chocolate Syrup', 'Cinnamon Dolce'],
    ice: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice'],
    extras: ['Whip Cream', 'Cinnamon Dust', 'Cocoa Powder', 'Extra Espresso', 'Cold Foam', 'Caramel Drizzle', 'Chocolate Drizzle']
};

function buildPanera() { renderPanera(); }

function renderPanera() {
    const p = document.getElementById('pn-panel');
    let h = '<div class="panel-title">🥤 Build Your Drink — Sip Club</div><div class="builder-area">';

    // Base
    h += '<div class="builder-step"><div class="builder-label">1. Choose Base</div><div class="builder-opts">';
    PN.bases.forEach(b => { h += `<button class="b-opt ${pnDrink.base === b ? 'sel' : ''}" onclick="pnDrink.base=pnDrink.base==='${b}'?null:'${b}';renderPanera()">${b}</button>`; });
    h += '</div></div>';

    // Milk
    h += '<div class="builder-step"><div class="builder-label">2. Add Milk</div><div class="builder-opts">';
    PN.milks.forEach(m => { h += `<button class="b-opt ${pnDrink.milk === m ? 'sel' : ''}" onclick="pnDrink.milk=pnDrink.milk==='${m}'?null:'${m}';renderPanera()">${m}</button>`; });
    h += '</div></div>';

    // Sweetener
    h += '<div class="builder-step"><div class="builder-label">3. Sweetener</div><div class="builder-opts">';
    PN.sweet.forEach(s => { h += `<button class="b-opt ${pnDrink.sweet === s ? 'sel' : ''}" onclick="pnDrink.sweet=pnDrink.sweet==='${s}'?null:'${s}';renderPanera()">${s}</button>`; });
    h += '</div></div>';

    // Ice
    h += '<div class="builder-step"><div class="builder-label">4. Ice Level</div><div class="builder-opts">';
    PN.ice.forEach(i => { h += `<button class="b-opt ${pnDrink.ice === i ? 'sel' : ''}" onclick="pnDrink.ice=pnDrink.ice==='${i}'?null:'${i}';renderPanera()">${i}</button>`; });
    h += '</div></div>';

    // Extras
    h += '<div class="builder-step"><div class="builder-label">5. Extras (mix & match!)</div><div class="builder-opts">';
    PN.extras.forEach(e => { const sel = pnDrink.extras.includes(e); h += `<button class="b-opt ${sel ? 'sel' : ''}" onclick="pnToggle('${e}')">${e}</button>`; });
    h += '</div></div></div>';

    // Preview
    const emoji = pnDrink.base ? pnDrink.base.split(' ')[0] : '🥤';
    h += `<div class="drink-preview">${emoji}</div>`;
    let desc = pnDrink.base || 'Pick a base to start!';
    if (pnDrink.milk && pnDrink.milk !== 'None') desc += ' + ' + pnDrink.milk;
    if (pnDrink.sweet && pnDrink.sweet !== 'None') desc += ' + ' + pnDrink.sweet;
    if (pnDrink.ice) desc += ' + ' + pnDrink.ice;
    if (pnDrink.extras.length) desc += ' + ' + pnDrink.extras.join(', ');
    h += `<div class="drink-desc">${desc}</div>`;
    h += `<button class="action-btn" onclick="pnMakeDrink()">Make My Drink! 🥤</button>`;
    h += `<button class="action-btn sec" onclick="pnDrink={base:null,milk:null,sweet:null,ice:null,extras:[]};renderPanera()">Start Over 🔄</button>`;
    h += '<div class="msg-box" id="pn-msg">Unlimited refills — go wild! ✨</div>';
    p.innerHTML = h;
}

function pnToggle(e) { const i = pnDrink.extras.indexOf(e); if (i >= 0) pnDrink.extras.splice(i, 1); else pnDrink.extras.push(e); renderPanera(); }

function pnMakeDrink() {
    if (!pnDrink.base) { document.getElementById('pn-msg').innerText = 'Pick a base first!'; return; }
    const who = typeof crowFound !== 'undefined' && crowFound ? 'Pillu & Crow are' : 'Pillu is';
    document.getElementById('pn-msg').innerHTML = `${pnDrink.base.split(' ')[0]} ${who} sipping their custom creation! ${typeof crowFound !== 'undefined' && crowFound ? '💛' : ''}`;
}
