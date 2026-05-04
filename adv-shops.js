// =============================================
// DUNKIN DATA
// =============================================
var DK_MENU = [
    {name:'Banana Choco Iced Coffee',emoji:'🍌🍫☕',base:4.99,special:true,sizes:{M:0,L:.80},flavors:['Classic Banana Choco','Extra Chocolate +$0.60','Extra Banana +$0.50'],milks:['Oat Milk +$0.70','Whole','Almond +$0.60','Cream +$0.30'],extras:['Whip Cream +$0.50','Choco Drizzle +$0.60','Extra Shot +$0.80','Banana Slices +$0.40']},
    {name:'Iced Coffee',emoji:'🧊☕',base:3.49,sizes:{S:-.50,M:0,L:.80,XL:1.30},flavors:['Vanilla +$0.60','Caramel +$0.60','Mocha +$0.80','Hazelnut +$0.60','French Vanilla +$0.60','Toasted Almond +$0.60'],milks:['Regular','Cream +$0.30','Oat Milk +$0.70','Almond +$0.60','Coconut +$0.60','Skim'],extras:['Extra Shot +$0.80','Whip Cream +$0.50','Sweet Cold Foam +$1.00','Turbo Shot +$1.20']},
    {name:'Latte',emoji:'☕✨',base:4.49,sizes:{S:-.50,M:0,L:.80},flavors:['Vanilla +$0.60','Caramel +$0.60','Mocha +$0.80','Pumpkin Spice +$0.80','Brown Sugar +$0.70'],milks:['Whole','Oat +$0.70','Almond +$0.60','Skim'],extras:['Extra Shot +$0.80','Whip +$0.50','Cinnamon +$0.00']},
    {name:'Matcha Latte',emoji:'🍵',base:4.99,sizes:{M:0,L:.80},flavors:['Original','Vanilla +$0.60','Blueberry +$0.70'],milks:['Oat +$0.70','Whole','Almond +$0.60'],extras:['Extra Matcha +$0.80','Whip +$0.50','Boba +$1.00']},
    {name:'Cold Brew',emoji:'🥶☕',base:4.29,sizes:{M:0,L:.80},flavors:['Vanilla Sweet Cream +$0.80','Caramel +$0.60','Mocha +$0.80'],milks:['None','Cream +$0.30','Oat +$0.70'],extras:['Extra Shot +$0.80','Sweet Foam +$1.00']},
    {name:'Refresher',emoji:'🍓💧',base:3.99,sizes:{S:-.50,M:0,L:.80},flavors:['Strawberry Dragonfruit','Peach Passion','Mango Pineapple'],milks:null,extras:['Green Tea Base +$0.00','Lemonade Base +$0.30','Coconut Milk +$0.70']},
    {name:'Bagel',emoji:'🥯',base:2.49,sizes:null,flavors:['Plain','Everything','Sesame','Cinnamon Raisin'],milks:null,extras:['Cream Cheese +$1.00','Butter +$0.50','Avocado +$1.50','Egg Cheese +$2.00','Bacon Egg Cheese +$2.80']},
    {name:'Donut',emoji:'🍩',base:1.69,sizes:null,flavors:null,milks:null,extras:['Glazed +$0.00','Boston Cream +$0.30','Choco Frosted +$0.20','Strawberry +$0.20','Jelly +$0.20']},
    {name:'Muffin',emoji:'🧁',base:2.29,sizes:null,flavors:null,milks:null,extras:['Blueberry +$0.00','Choco Chip +$0.30','Banana Nut +$0.30','Coffee Cake +$0.30']},
];

var cart = [], dkItem = null, dkSel = {};

function buildDK() {
    var p = document.getElementById('dk-panel');
    p.innerHTML = '<div class="panel-title">☕ Dunkin\' Menu</div><div class="menu-grid" id="dk-grid"></div><div id="dk-cust" style="display:none;"></div><div class="cart-box" id="dk-cart" style="display:none;"><div style="font-size:.65rem;font-weight:900;color:#8b005d;margin-bottom:4px;">🛒 Your Order</div><div id="dk-items"></div><div class="cart-total" id="dk-total"></div></div><div class="pay-opts" id="dk-pay" style="display:none;"><button class="pay-btn" onclick="dkPay(\'Card\')">💳 Card</button><button class="pay-btn" onclick="dkPay(\'Cash\')">💵 Cash</button><button class="pay-btn" onclick="dkPay(\'Apple Pay\')">📱 Pay</button></div>';
    var g = document.getElementById('dk-grid');
    for (var i = 0; i < DK_MENU.length; i++) {
        var m = DK_MENU[i];
        var badge = m.special ? '<span style="display:block;font-size:.5rem;color:#ff1493;font-weight:900;">⭐ Pika & Crow Fav!</span>' : '';
        var border = m.special ? 'border-color:#ffd700;background:#fffbf0;' : '';
        g.innerHTML += '<div class="menu-item" style="' + border + '" onclick="dkSelect(' + i + ')"><span class="ie">' + m.emoji + '</span>' + m.name + badge + '<br><span class="ip">from $' + m.base.toFixed(2) + '</span></div>';
    }
}

function dkSelect(i) {
    dkItem = DK_MENU[i];
    // Flavors are now MULTI-SELECT
    dkSel = { size: dkItem.sizes ? Object.keys(dkItem.sizes)[1] || Object.keys(dkItem.sizes)[0] : null, flavors: [], milk: null, extras: [] };
    renderDKCust();
}

function renderDKCust() {
    var c = document.getElementById('dk-cust');
    if (!dkItem) { c.style.display = 'none'; return; }
    c.style.display = 'block';
    var h = '<div class="cust-panel"><div style="font-size:1.2rem;text-align:center;">' + dkItem.emoji + '</div><div style="text-align:center;font-weight:900;font-size:.85rem;color:#8b005d;margin:4px 0;">' + dkItem.name + '</div>';
    if (dkItem.sizes) {
        h += '<div class="cust-label">Size</div><div class="cust-opts">';
        for (var s in dkItem.sizes) {
            var ex = dkItem.sizes[s];
            var lbl = s + (ex > 0 ? ' +$' + ex.toFixed(2) : ex < 0 ? ' -$' + Math.abs(ex).toFixed(2) : '');
            h += '<button class="opt ' + (dkSel.size === s ? 'sel' : '') + '" onclick="dkSel.size=\'' + s + '\';renderDKCust()">' + lbl + '</button>';
        }
        h += '</div>';
    }
    // FLAVORS — multi-select
    if (dkItem.flavors) {
        h += '<div class="cust-label">Flavors (pick any)</div><div class="cust-opts">';
        for (var fi = 0; fi < dkItem.flavors.length; fi++) {
            var f = dkItem.flavors[fi];
            var fsel = dkSel.flavors.indexOf(f) >= 0;
            h += '<button class="opt ' + (fsel ? 'sel' : '') + '" onclick="dkToggleFlavor(\'' + f.replace(/'/g, "\\'") + '\')">' + f + '</button>';
        }
        h += '</div>';
    }
    if (dkItem.milks) {
        h += '<div class="cust-label">Milk</div><div class="cust-opts">';
        for (var mi = 0; mi < dkItem.milks.length; mi++) {
            var m = dkItem.milks[mi];
            h += '<button class="opt ' + (dkSel.milk === m ? 'sel' : '') + '" onclick="dkSel.milk=dkSel.milk===\'' + m.replace(/'/g, "\\'") + '\'?null:\'' + m.replace(/'/g, "\\'") + '\';renderDKCust()">' + m + '</button>';
        }
        h += '</div>';
    }
    if (dkItem.extras) {
        h += '<div class="cust-label">Add-ons (pick any)</div><div class="cust-opts">';
        for (var ei = 0; ei < dkItem.extras.length; ei++) {
            var e = dkItem.extras[ei];
            var esel = dkSel.extras.indexOf(e) >= 0;
            h += '<button class="opt ' + (esel ? 'sel' : '') + '" onclick="dkToggleExtra(\'' + e.replace(/'/g, "\\'") + '\')">' + e + '</button>';
        }
        h += '</div>';
    }
    h += '<div style="text-align:center;font-weight:900;font-size:1.1rem;color:#ff1493;margin-top:8px;">$' + calcDKPrice().toFixed(2) + '</div>';
    h += '<button class="action-btn" onclick="dkAddCart()">Add to Order 🛒</button></div>';
    c.innerHTML = h;
}

function dkToggleFlavor(f) { var i = dkSel.flavors.indexOf(f); if (i >= 0) dkSel.flavors.splice(i, 1); else dkSel.flavors.push(f); renderDKCust(); }
function dkToggleExtra(e) { var i = dkSel.extras.indexOf(e); if (i >= 0) dkSel.extras.splice(i, 1); else dkSel.extras.push(e); renderDKCust(); }

function calcDKPrice() {
    var p = dkItem.base;
    if (dkSel.size && dkItem.sizes) p += dkItem.sizes[dkSel.size] || 0;
    var all = dkSel.flavors.concat(dkSel.extras);
    if (dkSel.milk) all.push(dkSel.milk);
    for (var i = 0; i < all.length; i++) { var m = all[i].match(/\+\$(\d+\.?\d*)/); if (m) p += parseFloat(m[1]); }
    return p;
}

function dkAddCart() {
    var d = dkItem.name;
    if (dkSel.size) d = dkSel.size + ' ' + d;
    for (var i = 0; i < dkSel.flavors.length; i++) d += ', ' + dkSel.flavors[i].split('+')[0].trim();
    if (dkSel.milk && dkSel.milk !== 'Regular' && dkSel.milk !== 'Whole' && dkSel.milk !== 'None') d += ', ' + dkSel.milk.split('+')[0].trim();
    for (var i = 0; i < dkSel.extras.length; i++) d += ', ' + dkSel.extras[i].split('+')[0].trim();
    cart.push({ desc: d, price: calcDKPrice() });
    dkItem = null; document.getElementById('dk-cust').style.display = 'none'; renderDKCart();
}

function renderDKCart() {
    if (!cart.length) { document.getElementById('dk-cart').style.display = 'none'; document.getElementById('dk-pay').style.display = 'none'; return; }
    document.getElementById('dk-cart').style.display = 'block'; document.getElementById('dk-pay').style.display = 'flex';
    var el = document.getElementById('dk-items'); el.innerHTML = ''; var tot = 0;
    for (var i = 0; i < cart.length; i++) {
        tot += cart[i].price;
        el.innerHTML += '<div class="cart-row"><span>' + cart[i].desc + '</span><span>$' + cart[i].price.toFixed(2) + ' <span style="color:red;cursor:pointer;" onclick="cart.splice(' + i + ',1);renderDKCart()">x</span></span></div>';
    }
    var tax = tot * .0625;
    document.getElementById('dk-total').innerText = 'Sub $' + tot.toFixed(2) + ' + Tax $' + tax.toFixed(2) + ' = $' + (tot + tax).toFixed(2);
}

function dkPay(method) {
    var tot = cart.reduce(function(s, c) { return s + c.price; }, 0), tax = tot * .0625;
    var cf = typeof crowFound !== 'undefined' && crowFound;
    document.getElementById('dk-panel').innerHTML = '<div style="text-align:center;padding:15px;"><div style="font-size:3rem;">✅</div><div class="panel-title">Order Placed!</div><p style="font-size:.8rem;color:#888;font-weight:700;">$' + (tot + tax).toFixed(2) + ' via ' + method + '</p><div style="font-size:2.5rem;margin:10px 0;">' + (cf ? '⚡☕🐦‍⬛' : '⚡☕') + '</div></div><button class="action-btn" onclick="cart=[];buildDK()">Order Again</button><button class="action-btn sec" onclick="goMap()">Map</button>';
    cart = [];
}

// =============================================
// PANERA DRINK BUILDER — with cup visual + timer
// =============================================
var pnDrink = { base: null, milk: null, sweets: [], sugar: 0, ice: null, extras: [] };
var pnCooldown = 0; // timestamp when next drink is allowed
var pnTimerInt = null;

var PN = {
    bases: ['☕ Dark Roast', '☕ Light Roast', '☕ Decaf', '🍵 Green Tea', '🍵 Black Tea', '🍵 Chai', '🧊 Cold Brew', '🍋 Lemonade', '🍋 Strawberry Lemonade', '🥤 Pepsi', '🍫 Hot Chocolate', '🧃 Agave Lemonade'],
    milks: ['None', 'Whole Milk', '2% Milk', 'Oat Milk', 'Almond Milk', 'Coconut Milk', 'Cream', 'Half & Half'],
    sweets: ['Honey', 'Agave', 'Vanilla Syrup', 'Caramel Syrup', 'Hazelnut Syrup', 'Chocolate Syrup', 'Cinnamon Dolce'],
    ice: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice'],
    extras: ['Whip Cream', 'Cinnamon Dust', 'Cocoa Powder', 'Extra Espresso', 'Cold Foam', 'Caramel Drizzle', 'Chocolate Drizzle']
};

function buildPanera() { renderPanera(); }

function renderPanera() {
    var p = document.getElementById('pn-panel');
    // Check cooldown
    var now = Date.now();
    var onCooldown = pnCooldown > now;
    var h = '<div class="panel-title">🥤 Build Your Drink — Sip Club</div>';

    if (onCooldown) {
        var left = Math.ceil((pnCooldown - now) / 1000);
        var mm = Math.floor(left / 60), ss = left % 60;
        h += '<div style="text-align:center;padding:20px;"><div style="font-size:3rem;">⏳</div><div style="font-weight:900;font-size:1rem;color:#ff1493;margin:8px 0;">Next drink in ' + mm + 'm ' + ss + 's</div><p style="font-size:.75rem;color:#888;font-weight:700;">Sip Club: 1 drink every 2 hours!</p></div>';
        p.innerHTML = h;
        if (!pnTimerInt) pnTimerInt = setInterval(renderPanera, 1000);
        return;
    }
    if (pnTimerInt) { clearInterval(pnTimerInt); pnTimerInt = null; }

    h += '<div class="builder-area">';
    // Base
    h += '<div class="builder-step"><div class="builder-label">1. Choose Base</div><div class="builder-opts">';
    for (var i = 0; i < PN.bases.length; i++) { var b = PN.bases[i]; h += '<button class="b-opt ' + (pnDrink.base === b ? 'sel' : '') + '" onclick="pnSet(\'base\',\'' + b + '\')">' + b + '</button>'; }
    h += '</div></div>';
    // Milk
    h += '<div class="builder-step"><div class="builder-label">2. Milk</div><div class="builder-opts">';
    for (var i = 0; i < PN.milks.length; i++) { var m = PN.milks[i]; h += '<button class="b-opt ' + (pnDrink.milk === m ? 'sel' : '') + '" onclick="pnSet(\'milk\',\'' + m + '\')">' + m + '</button>'; }
    h += '</div></div>';
    // Sugar counter
    h += '<div class="builder-step"><div class="builder-label">3. Sugar (' + pnDrink.sugar + ')</div><div class="builder-opts">';
    h += '<button class="b-opt" onclick="pnSugar(-1)" style="font-size:1rem;padding:2px 14px;">−</button>';
    h += '<span style="font-size:1rem;font-weight:900;padding:0 10px;">' + pnDrink.sugar + '</span>';
    h += '<button class="b-opt" onclick="pnSugar(1)" style="font-size:1rem;padding:2px 14px;">+</button>';
    h += '</div></div>';
    // Sweeteners (multi)
    h += '<div class="builder-step"><div class="builder-label">4. Syrups (pick any)</div><div class="builder-opts">';
    for (var i = 0; i < PN.sweets.length; i++) { var s = PN.sweets[i]; var sel = pnDrink.sweets.indexOf(s) >= 0; h += '<button class="b-opt ' + (sel ? 'sel' : '') + '" onclick="pnToggle(\'sweets\',\'' + s + '\')">' + s + '</button>'; }
    h += '</div></div>';
    // Ice
    h += '<div class="builder-step"><div class="builder-label">5. Ice Level</div><div class="builder-opts">';
    for (var i = 0; i < PN.ice.length; i++) { var ic = PN.ice[i]; h += '<button class="b-opt ' + (pnDrink.ice === ic ? 'sel' : '') + '" onclick="pnSet(\'ice\',\'' + ic + '\')">' + ic + '</button>'; }
    h += '</div></div>';
    // Extras (multi)
    h += '<div class="builder-step"><div class="builder-label">6. Extras (pick any)</div><div class="builder-opts">';
    for (var i = 0; i < PN.extras.length; i++) { var e = PN.extras[i]; var sel = pnDrink.extras.indexOf(e) >= 0; h += '<button class="b-opt ' + (sel ? 'sel' : '') + '" onclick="pnToggle(\'extras\',\'' + e + '\')">' + e + '</button>'; }
    h += '</div></div></div>';

    // CUP VISUAL
    var fill = 10; // base empty cup
    if (pnDrink.base) fill += 30;
    if (pnDrink.milk && pnDrink.milk !== 'None') fill += 15;
    if (pnDrink.sugar > 0) fill += Math.min(pnDrink.sugar * 3, 10);
    fill += pnDrink.sweets.length * 5;
    if (pnDrink.ice && pnDrink.ice !== 'No Ice') fill += 10;
    fill += pnDrink.extras.length * 3;
    fill = Math.min(fill, 95);
    // Color based on drink
    var cupCol = '#d4a574';
    if (pnDrink.base && pnDrink.base.indexOf('Tea') >= 0) cupCol = '#a8d08a';
    if (pnDrink.base && pnDrink.base.indexOf('Lemonade') >= 0) cupCol = '#f5e050';
    if (pnDrink.base && pnDrink.base.indexOf('Chocolate') >= 0) cupCol = '#6b3a20';
    if (pnDrink.base && pnDrink.base.indexOf('Pepsi') >= 0) cupCol = '#3a2010';

    h += '<div style="text-align:center;margin:10px 0;">';
    h += '<div style="display:inline-block;width:80px;height:110px;background:linear-gradient(180deg,#f8f4f0,#e8e0d8);border:3px solid #d0c0b0;border-radius:5px 5px 12px 12px;position:relative;overflow:hidden;">';
    h += '<div style="position:absolute;bottom:0;left:3px;right:3px;height:' + fill + '%;background:' + cupCol + ';border-radius:0 0 10px 10px;transition:height .4s;opacity:.8;"></div>';
    if (pnDrink.ice && pnDrink.ice !== 'No Ice') h += '<div style="position:absolute;top:15%;left:50%;transform:translateX(-50%);font-size:1.2rem;opacity:.5;">🧊</div>';
    if (pnDrink.extras.indexOf('Whip Cream') >= 0) h += '<div style="position:absolute;top:-2px;left:50%;transform:translateX(-50%);font-size:1.5rem;">☁️</div>';
    h += '</div>';
    h += '<div style="font-size:.7rem;font-weight:800;color:#888;margin-top:4px;">Your Cup</div>';
    h += '</div>';

    // Description
    var desc = pnDrink.base || 'Pick a base!';
    if (pnDrink.milk && pnDrink.milk !== 'None') desc += ' + ' + pnDrink.milk;
    if (pnDrink.sugar > 0) desc += ' + ' + pnDrink.sugar + ' sugar';
    if (pnDrink.sweets.length) desc += ' + ' + pnDrink.sweets.join(', ');
    if (pnDrink.ice) desc += ' + ' + pnDrink.ice;
    if (pnDrink.extras.length) desc += ' + ' + pnDrink.extras.join(', ');
    h += '<div class="drink-desc">' + desc + '</div>';
    h += '<button class="action-btn" onclick="pnMakeDrink()">Make My Drink! 🥤</button>';
    h += '<button class="action-btn sec" onclick="pnReset()">Start Over</button>';
    h += '<div class="msg-box" id="pn-msg">Unlimited Sip Club — 1 drink every 2 hrs!</div>';
    p.innerHTML = h;
}

function pnSet(key, val) { pnDrink[key] = pnDrink[key] === val ? null : val; renderPanera(); }
function pnToggle(arr, val) { var a = pnDrink[arr]; var i = a.indexOf(val); if (i >= 0) a.splice(i, 1); else a.push(val); renderPanera(); }
function pnSugar(d) { pnDrink.sugar = Math.max(0, Math.min(10, pnDrink.sugar + d)); renderPanera(); }
function pnReset() { pnDrink = { base: null, milk: null, sweets: [], sugar: 0, ice: null, extras: [] }; renderPanera(); }

function pnMakeDrink() {
    if (!pnDrink.base) { var m = document.getElementById('pn-msg'); if (m) m.innerText = 'Pick a base first!'; return; }
    // Start 2hr cooldown (use 2 minutes for testing — change to 7200000 for real 2hrs)
    pnCooldown = Date.now() + 7200000; // 2 hours in ms
    pnDrink = { base: null, milk: null, sweets: [], sugar: 0, ice: null, extras: [] };
    renderPanera();
}
