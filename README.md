# 💛🐦‍⬛ Pillu & Crow's Hub

The ultimate custom web experience — **16 mini-games**, a **secret kitchen quest**, and a **full Boston + Mumbai adventure game** — all tailored for Pillu (⚡) and Crow (🐦‍⬛). Lightweight, mobile-friendly, zero frameworks.

---

## 🗂️ Project Structure

```
├── index.html            ← Game Hub (16 games + secret links)
├── secret_Quest.html     ← Kitchen baking quest → secret letter
├── adventure.html        ← Adventure shell (Boston + Flight + Thane)
├── adv.css               ← Adventure styles + dark mode
├── adv-core.js           ← Map, navigation, houses, rooms, Crow hide-and-seek
├── adv-games.js          ← Table Tennis + 8-Ball Pool (canvas)
├── adv-shops.js          ← Dunkin' + Panera Sip Club
├── adv-school.js         ← Classroom (7 subjects × 30 notes) + Snell timer
├── adv-commons.js        ← Boston Common (cherry blossoms, tulips, pond, food)
├── adv-prudential.js     ← Prudential Center (skywalk, stargazing, mall)
├── adv-flight.js         ← Flight system (5 airlines, boarding pass, cabin, meals, drinks)
├── adv-thane.js          ← Thane map + 5 destinations
├── pikachu.png           ← Pillu's character sprite
├── crow.png              ← Crow's character sprite
└── README.md
```

---

## 🎮 Game Hub — 16 Mini-Games

### 🧠 Strategy & Logic

| # | Game | Description |
|---|------|-------------|
| 1 | **Meow-sweeper 😻** | Minesweeper with three tiers (Beginner, Pikium, Meowster). Flag with 💖, undo moves, chase a purr-fect clear. |
| 2 | **Tic-Tac-Pika ❌** | Classic Tic-Tac-Toe with Pillu & Crow avatar pieces. Bot or pass-and-play. |
| 3 | **Connect Crows 🧶** | Drop-four strategy — line up 4 custom pieces. Bot or pass-and-play. |
| 4 | **O-pika-llo ☯️** | Reversi / Othello with greedy bot AI. |
| 5 | **Su-meow-ku 🧩** | Full 9×9 Sudoku with three difficulties, pencil marks, and lives. |

### 🔤 Word Games

| # | Game | Description |
|---|------|-------------|
| 6 | **Pika-dle 🔤** | Wordle clone — guess the 5-letter word in 6 tries with color feedback. |
| 7 | **Hang-meow 🪢** | Hangman with on-screen keyboard, animated gallows, and word definitions. |
| 8 | **Waff-meow 🧇** | Waffle-style letter swap puzzle — form intersecting words in 15 swaps. |

### 🧩 Puzzles & Memory

| # | Game | Description |
|---|------|-------------|
| 9 | **Pika-Pairs 🃏** | Flip-and-match memory cards with themed emojis. |
| 10 | **Pillu Says 🔴** | Simon Says with Web Audio tones (C4/E4/G4/C5). |
| 11 | **Slider Puzzle 🖼️** | Classic 8-tile slider. Reassemble the scrambled image. |

### ⚡ Action & Arcade

| # | Game | Description |
|---|------|-------------|
| 12 | **Catch a Snack 🔨** | Whack-a-mole — tap treats for points, dodge 🙀. 30-second timer. |
| 13 | **Pillu Run 🏃** | Endless runner — tap to jump, speed ramps up. Beat your high score. |

### 🎲 Quick Play

| # | Game | Description |
|---|------|-------------|
| 14 | **R. P. Heart ✌️** | Rock-Paper-Scissors reimagined: ⚡ zaps 🐦‍⬛, 🐦‍⬛ steals 💖, 💖 charms ⚡. |
| 15 | **Coin Toss 🪙** | Call Pillu or Crow — animated flip with character reveal. |
| 16 | **Guess Number 🔢** | Guess 1–100 using higher / lower hints. |

### 🔗 Hidden Hub Links

| Element | What it does |
|---------|-------------|
| **Flying 💌 envelope** | Bounces around the screen — click to open `secret_Quest.html` |
| **Zooming 🛴 scooter** | Periodically flies across — tap to launch `adventure.html` |

---

## 🍰 Secret Quest — Kitchen Baking Adventure

A state-machine puzzle inside Linda's kitchen. Crow ate Linda's cake — bake a new one before she gets home.

**Flow:** Click Linda → open cupboards/fridge → collect 8 ingredients → mix batter → bake (progress bar) → click window (Crow appears = CROW clue) → remove cake (CAKE clue) → click Crow again (eats cake = EATS clue)

**Password:** `CrowEatsLindasCake`

**Celebration unlock:** confetti rain, a secret letter from Crow, and a scuba-dance section with embedded YouTube audio.

---

## 🗺️ Boston Adventure Game

A full explorable world set in the Fenway – Huntington – Roxbury corridor.

### Canvas-Drawn Map

The map is rendered via HTML5 Canvas with **Google Maps–style realism**:

- **Charles River** with water ripple texture
- **The Fens** park with paths, pond, and tree layers
- **SW Corridor Park** green strip along the Orange Line
- **Major streets:** Boylston St, Huntington Ave, Mass Ave, Tremont St, Columbus Ave, Melnea Cass Blvd, Washington St
- **Minor streets:** Ruggles St, Parker St, Forsyth St, Gainsborough, Winthrop St, + 20 grid-fill roads
- **58 building blocks** at realistic density
- **Orange Line transit** with Ruggles station badge
- **Labels** with white halo rendering (like Google Maps)
- **Compass rose** and **scale bar** (0.25 mi)
- **Full dark mode** redraw with Google Maps dark palette (`#242f3e` land, `#38414e` roads, `#17263c` water)
- **Scooter tracks** your last visited location — moves on the map as you travel

### Eight Destinations

| Pin | Location | Address / Info |
|-----|----------|----------------|
| 🏠 | Pika's Place | 1171 Boylston St, 02115 |
| 🏡 | Crow's Encore | 20 Winthrop St, 02119 |
| 🎓 | Northeastern | Huntington Ave, 02115 |
| ☕ | Dunkin' | Tremont St |
| 🥤 | Panera | Huntington Ave |
| 🌸 | Boston Common | est. 1634 — Cherry Blossoms, Tulips, Pond, Food Stalls |
| 🏙️ | Prudential Center | 52-floor tower — Skywalk, Stargazing, Mall |
| ✈️ | BOS Airport | Fly to Mumbai! |

---

### 🏠 Pika's House (7 Rooms)

Bedroom (bay window), Bathroom, Pika's Spot (purple border), Closet ⭐ (Crow's fav hiding spot), Closet 2, Hall, Kitchen. Each room has an interactive interior with emoji scene (wall/floor layers) and 6–9 tappable items with unique reactions.

### 🏡 Crow's House (9 Rooms)

Porch (accessible only from R2), R1, R2/Crow's Room (dark border), B1, B2, Kitchen, Hallway, R3, R4. Independent bathrooms in both houses.

### 🐦‍⬛ Crow Hide-and-Seek

Crow hides in a random room across both houses. Search rooms to find them — a gold glow reveals the hiding spot. Finding Crow unlocks companion status (Crow sits next to Pika in the classroom and studies together in Snell).

---

### 🏓 Curry Center — Table Tennis

Canvas-based ping-pong with **racket visuals** (oval face + rubber texture + wooden handle).

| Difficulty | Bot Speed | Prediction Error | Miss Chance | Ball Speed |
|-----------|-----------|-----------------|-------------|------------|
| Beginner | 1.2 | 80 px | 25% | 5 |
| Medium | 3.8 | 18 px | 4% | 7 |
| Expert | 7.5 | 2 px | 0% | 9 |

Rally speed increases over time. Ball trail, hit particles, and audio pings on contact.

### 🎱 Curry Center — 8-Ball Pool

Canvas-based billiards with elastic collisions, 6 pockets, stripes/solids assignment, and bot opponent.

**Trajectory prediction system:**
- White dotted line shows cue ball path
- Up to **4 wall bounces** rendered with gold dots at each contact point
- **Ghost ball circle** at ball-contact point
- **Gold deflection line** shows where the target ball will go after impact
- Cue stick renders **behind the ball toward your drag point** with power bar

Bot accuracy scales with difficulty (30% → 65% → 93%).

---

### ☕ Dunkin' Order System

9 menu items including the special **Banana Choco Iced Coffee** (gold border, "Pika & Crow Fav!" badge).

- **Size**: single-select
- **Flavors**: multi-select (pick any combination)
- **Milk**: single-select
- **Extras/Add-ons**: multi-select
- Live price calculation with MA tax (6.25%)
- Cart with item removal
- Three payment methods: 💳 Card / 💵 Cash / 📱 Apple Pay

### 🥤 Panera Sip Club — Drink Builder

Build-from-scratch with 12 bases, 8 milks, 7 syrups, 4 ice levels, 7 extras.

- **Visual cup** fills as you add ingredients — height and color change dynamically (brown for coffee, green for tea, yellow for lemonade)
- **Ice cubes** 🧊 appear in the cup, **whip cream cloud** ☁️ on top
- **Sugar counter** with +/− buttons (0–10)
- Syrups and extras are multi-select
- **2-hour cooldown timer** after making a drink — live countdown "Next drink in Xm Xs"

---

### 🌸 Boston Common

America's oldest public park, est. 1634. Four interactive areas:

| Area | What's inside |
|------|--------------|
| 🌸 **Cherry Blossoms** | Full-screen canvas animation — falling petals, sakura trees, gradient sky. Tap to create wind bursts. |
| 🌷 **Tulip Garden** | Interactive canvas garden — tap to plant tulips in random colors. Bees flutter between flowers. |
| 🦆 **Pond & Bridge** | Canvas-drawn frog pond with ducks, lily pads, stone bridge. Tap to toss bread — ducks swim toward it. |
| 🌭 **Food Stalls** | Street food menu — hot dogs, pretzels, ice cream, lemonade. Order and enjoy with Crow if found! |

### 🏙️ Prudential Center

Boston's 52-floor tower. Three interactive areas:

| Area | What's inside |
|------|--------------|
| 🔭 **Skywalk Observatory** | 360° panoramic canvas view from the 50th floor. Switch between N/S/E/W. See landmarks labeled across the Boston skyline. |
| 🌌 **Rooftop Stargazing** | Full-screen night sky canvas — constellations appear as you look around. Tap stars for info. Shooting stars streak across randomly. |
| 🛍️ **Mall & Shops** | Shopping floors with stores, a food court, and Eataly. Browse and buy items. |

---

### 🏫 Classroom — 210 Study Notes

7 subjects × 30 notes each, displayed on a chalkboard inside an immersive classroom scene (ceiling lights, wooden desks, floor).

| Subject | Emoji | Topics |
|---------|-------|--------|
| NLP | 🗣️ | Transformers, BERT, GPT, attention, tokenization, RAG, LoRA |
| Scalable Systems | ⚙️ | Load balancing, sharding, caching, Kafka, microservices, CAP |
| Algorithms | 🧮 | Sorting, graph algorithms, DP, greedy, NP-completeness |
| Design Paradigms | 🏗️ | SOLID, patterns (Factory, Observer, Strategy, Decorator), Clean Architecture |
| Web Dev | 🌐 | React, REST, WebSocket, Next.js, TypeScript, Core Web Vitals |
| Mobile Dev | 📱 | React Native, Flutter, Swift, Kotlin, navigation, push notifications |
| DBMS | 🗄️ | SQL, normalization, indexing, ACID, NoSQL, replication, ER diagrams |

Pika sits at a desk; Crow appears next to Pika if found. Navigation: classroom → subject picker → NEU (two-step exit).

### 📚 Snell Library — Pomodoro Timer

25-minute study timer. Shows "Studying together! 💛📚" when Crow is found.

---

## ✈️ Flight System — Boston to Mumbai

Tap the **✈️ BOS Airport** pin on the Boston map to begin the flight adventure.

### 1. Airline Selection

Choose from 5 real airlines, each with unique colors, flight numbers, gates, and departure times:

| Airline | Flight | Gate | Departure |
|---------|--------|------|-----------|
| 🇦🇪 Etihad Airways | EY 102 | B14 | 10:30 PM |
| 🇹🇷 Turkish Airlines | TK 718 | C22 | 11:15 PM |
| 🇮🇳 IndiGo | 6E 1042 | A08 | 09:45 PM |
| 🇶🇦 Qatar Airways | QR 517 | D05 | 11:55 PM |
| 🇦🇪 Emirates | EK 228 | E31 | 01:20 AM |

**Crow hides on one of these flights** (never IndiGo). Pick the right airline to find your travel buddy!

### 2. Boarding Pass

A full boarding pass card with:
- Airline-colored header with ✈️ icon
- Passenger: **PIKA ⚡**
- Route: **BOSTON (BOS) → MUMBAI (BOM)**
- Date, class, gate, flight number, seat
- Animated barcode
- Tear-off stub on the right
- Pika's PNG sprite below

### 3. Crow Found / Solo Result

- **Found Crow?** → 💛 Dramatic confetti blast (80 animated pieces!), bouncing PNG sprites of Pika & Crow with a pulsing 💛 heart, "YAYYY!! 💛💛💛" celebration. Crow companion status activates.
- **Solo?** → 😢 Sad dramatic screen. "Crow isn't on this flight... 💔". Reveals which airline Crow was actually on.

### 4. Plane Interior

CSS-rendered airplane cabin inspired by the reference image:
- **Overhead bins** across the top
- **6 rows of 3-3 seats** in airline blue with white headrest accents
- **Aisle gap** down the center
- **Pika's seat** highlighted with `pikachu.png` sprite (gold border glow)
- **Crow's seat** next to Pika if found (or empty with faded opacity)
- **Carpet pattern** at the bottom

### 5. In-Flight Meal Menu

Three prepaid meal options, each served on a CSS-drawn tray:

| Meal | Contents |
|------|----------|
| 🍛 **Chicken Curry Meal** | Chicken curry, fresh salad, steamed rice, warm bread, butter, caramel pudding |
| 🥘 **Vegetarian Meal** | Vegetable curry, fresh salad, vegetable rice, warm bread, butter, cheesecake |
| 🍝 **White Sauce Pasta** | White sauce pasta, fresh salad, garlic bread, tiramisu |

Each meal is displayed in a tray layout with emoji items, cutlery (🍴🥄🔪), and an airline napkin. Different message if traveling with Crow or solo.

### 6. Drinks Menu

14 beverages in 4 categories with CSS-drawn drink visuals:

| Category | Drinks |
|----------|--------|
| 🧃 **Fresh Juices** | Apple, Pineapple, Kiwi |
| 🥤 **Soft Drinks** | Pepsi, Cola, Fanta |
| ☕ **Hot Beverages** | Coffee, Tea |
| 🍷 **Alcoholic** | Red Wine, White Wine, Grape Wine, Beer, Whiskey, Vodka |

Each drink has a unique CSS-drawn visual (juice cup with fill, soda with bubbles, wine glass, beer mug, hot cup with steam, etc.).

**Alcohol Easter Egg:** If Pika orders any alcoholic drink, a dramatic smirk reaction fires:
> 😏🍷👀 "Oooooh~ Red Wine?! 😏😏😏"
> "I don't drink alcohol" he says... 🤥
> Sure, Pika. Suuuure. 😏✨
> *Crow is side-eyeing you SO HARD rn* 👁️👄👁️

### 7. Landing in Mumbai

Animated plane landing → "Welcome to Mumbai! 🇮🇳" screen → Chhatrapati Shivaji Maharaj International Airport. Option to head to Thane or return to Boston.

---

## 🗺️ Thane Map — Mumbai Adventure

After landing in Mumbai, explore Thane with a second canvas-drawn map.

### Canvas-Drawn Thane Map

Same Google Maps–style rendering as Boston:

- **Thane Creek** with water ripples (top-right)
- **Upvan Lake** near Grand Central Park
- **Green zones** for Hiranandani Estate and Lodha Amara
- **Major roads:** Ghodbunder Road, Eastern Express Highway, LBS Marg, Pokhran Road, Hiranandani Road
- **Minor streets** grid across the city
- **Railway line** (dashed) along Eastern Express with **Thane Station** badge
- **28 building blocks** for urban density
- **Viviana Mall** as a larger landmark building
- **Compass rose** and **scale bar** (1 km)
- **Full dark mode** redraw
- **Scooter** on the map

### Five Thane Destinations

| Pin | Location | Description |
|-----|----------|-------------|
| 🛍️ | **Viviana Mall** | Thane's biggest mall — PVR Cinemas, shopping, food court, Timezone arcade |
| 🌳 | **Grand Central Park** | Lakeside park by Upvan Lake — sunset views, jogging track, yoga lawn |
| 🚶 | **The Walk (Hiranandani)** | Trendy promenade — cafes, ice cream, boba tea, night strolls |
| 🏡 | **Crow's House (Apollo)** | Hiranandani Estate — Crow's Thane home with `crow.png` portrait |
| 🏠 | **Pika's House (Lodha Amara)** | Lodha Amara township — Pika's Thane home with `pikachu.png` portrait |

Each destination shows an emoji scene, activity grid, and personalized messages depending on whether Crow is traveling with Pika. The houses display the actual PNG character sprites.

---

### 🌙 Dark Mode

Toggle via floating ☀️/🌙 button (top-right). Covers every component:

- All panels, buttons, menus, rooms, classroom, games
- **Boston map** canvas redraws in full Google Maps dark palette
- **Thane map** canvas redraws in matching dark palette
- Flight system (boarding pass, cabin, meals, drinks, result screens)
- Boston Common canvases and Prudential canvases
- Floating buttons restyle inline
- Persists across screen navigation within the session

### 🏠 Home Button

Floating 🏠 button (top-right) links back to `index.html` (the game hub).

---

## ✨ Hub Features

- **Single-file architecture** — `index.html` contains all 16 games with no dependencies
- **Fully responsive** — works on desktop, tablet, and mobile
- **Draggable dock navigation** — horizontal scroll on desktop, swipe on mobile
- **Hover labels** — dock icons show game names on mouseover
- **Custom character sprites** — `pikachu.png` and `crow.png` used everywhere (including boarding pass, plane seats, and house portraits)
- **Dark mode 🌙** — toggle between Baby Pink and Neon Fuchsia Cyber-Cat themes
- **Audio engine** — Pillu Says uses Web Audio API tones (triangle wave)
- **Victory effects** — confetti on wins, bubbles on ties, emoji bursts on losses
- **Screen-shake feedback** on wrong moves and game-overs
- **Custom cursors** — 🐾 default, ⚡ pointer for interactive elements
- **Splash screen** — animated entry with confetti burst
- **Dynamic header** — updates to match the active game
- **Undo support** — Meow-sweeper has full move-history undo
- **Bot opponents** — Tic-Tac-Pika, Connect Crows, O-pika-llo support bot or pass-and-play

---

## 🚀 Deployment (GitHub Pages)

1. Create a repository on GitHub (e.g., `pillu-crow-hub`)
2. Upload all files into the root of the `main` branch:
   - `index.html`, `secret_Quest.html`, `adventure.html`
   - `adv.css`
   - `adv-core.js`, `adv-games.js`, `adv-shops.js`, `adv-school.js`
   - `adv-commons.js`, `adv-prudential.js`, `adv-flight.js`, `adv-thane.js`
   - `pikachu.png`, `crow.png`
   - `README.md`
3. Go to **Settings → Pages**
4. Set Source to `main` branch, root folder
5. Wait 1–2 minutes, then visit your live link

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, animations, backdrop-filter, dark mode) |
| Logic | Vanilla JavaScript (ES6+, Web Audio API, Canvas 2D) |
| Graphics | HTML5 Canvas (Boston map, Thane map, table tennis, 8-ball pool, cherry blossoms, tulips, pond, skywalk, stargazing) |
| Font | [Nunito](https://fonts.google.com/specimen/Nunito) + [Baloo 2](https://fonts.google.com/specimen/Baloo+2) via Google Fonts |
| Hosting | GitHub Pages (static) |

---

## 📊 Project Stats

| Metric | Count |
|--------|-------|
| Mini-games | 16 |
| Adventure destinations (Boston) | 8 |
| Adventure destinations (Thane) | 5 |
| Airlines | 5 |
| Meal options | 3 |
| Drink options | 14 |
| Study notes | 210 (7 × 30) |
| Explorable rooms | 16 (7 + 9) |
| Canvas scenes | 9 (Boston map, Thane map, table tennis, pool, cherry blossoms, tulips, pond, skywalk, stargazing) |
| Total JS modules | 8 |
| Frameworks used | 0 |

---

Enjoy playing! ⚡💖🐦‍⬛
