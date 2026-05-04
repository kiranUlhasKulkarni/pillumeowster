// =============================================
// CLASSROOM — 7 subjects × 30 notes
// =============================================
const SUBJECTS = {
'NLP': { emoji: '🗣️', notes: [
"Tokenization splits text into tokens — BPE (Byte Pair Encoding) is most popular for LLMs",
"Word2Vec: CBOW predicts word from context, Skip-gram predicts context from word",
"TF-IDF weighs terms by frequency in doc vs rarity across corpus — good baseline",
"Attention: model learns which tokens matter most → Q·K^T/√d → softmax → weighted V",
"Self-attention lets each token attend to all others in the sequence simultaneously",
"BERT: bidirectional transformer pretrained on Masked LM + Next Sentence Prediction",
"GPT: autoregressive left-to-right transformer — excels at text generation",
"Transformer = Multi-Head Attention + Feed-Forward + LayerNorm + Residual connections",
"Positional encoding injects position info (sinusoidal or learned) since no recurrence",
"Beam search: explore top-k candidates per step — better than greedy, less than exhaustive",
"Perplexity = exp(avg cross-entropy loss) — lower = model predicts next token better",
"NER (Named Entity Recognition): extracts Person, Org, Location, Date from text",
"POS tagging assigns part-of-speech labels (noun, verb, adj) to each token",
"Seq2Seq: encoder reads input → context vector → decoder generates output (translation)",
"Teacher forcing feeds ground truth as next decoder input during training — speeds convergence",
"BLEU measures n-gram precision between generated and reference text (translation metric)",
"ROUGE measures recall of n-gram overlap — standard metric for summarization",
"Constituency parsing builds phrase-structure tree (NP → Det + N, VP → V + NP)",
"Dependency parsing links each word to its syntactic head (nsubj, dobj, prep)",
"Sentiment analysis: classify text polarity — bag-of-words baseline → fine-tuned BERT SOTA",
"Word embeddings: dense vectors where similar words are close in vector space",
"GloVe learns embeddings from global word co-occurrence matrix factorization",
"Subword tokenization (BPE/WordPiece/Unigram) handles OOV and morphological variants",
"Fine-tuning: take pretrained model, add task head, train on labeled data with low LR",
"Prompt engineering: carefully craft input to steer model behavior without training",
"RAG: retrieve relevant documents first, then generate answer conditioned on them",
"Hallucination: model generates confident but factually wrong information",
"LoRA (Low-Rank Adaptation): inject small trainable matrices — efficient fine-tuning",
"Chain-of-Thought: show reasoning steps in prompt → model reasons step by step",
"Tokenizer vocab size tradeoff: bigger = fewer tokens per word, but larger embedding table"]},

'Scalable Systems': { emoji: '⚙️', notes: [
"Vertical scaling (bigger box) has limits — horizontal scaling (more boxes) is the way",
"Load balancer: Round Robin, Least Connections, IP Hash, Weighted — distributes traffic",
"CDN caches static assets at edge servers globally — reduces latency for users",
"Sharding: split DB by key range or hash — each shard holds subset of data",
"Read replicas: async copies of primary DB — offload read traffic, master handles writes",
"Cache: Redis/Memcached between app and DB — sub-ms reads, 10-100x faster than DB",
"Cache strategies: Cache-Aside, Write-Through, Write-Behind, Read-Through",
"Message queues (Kafka/RabbitMQ/SQS): async processing, decouples producer & consumer",
"Microservices: small focused services, own DB, communicate via REST/gRPC/events",
"Service mesh (Istio/Envoy): handles mTLS, retries, circuit breaking between services",
"CAP theorem: pick 2 of 3 — Consistency, Availability, Partition tolerance",
"BASE: Basically Available, Soft state, Eventually consistent — alternative to ACID",
"Rate limiting: Token Bucket or Sliding Window — protect services from abuse",
"Circuit breaker: open after N failures → return fallback → half-open to test recovery",
"API Gateway: single entry point — routing, auth, rate limiting, request transformation",
"Consistent hashing: minimize key redistribution when adding/removing nodes",
"Consensus: Raft (leader-based), Paxos — distributed agreement on values",
"Event sourcing: store all state changes as immutable events — replay to rebuild state",
"CQRS: separate read model (optimized for queries) from write model (optimized for commands)",
"B-tree index for range queries, Hash index for exact lookups, Composite for multi-column",
"Connection pooling (PgBouncer/HikariCP): reuse DB connections, avoid overhead",
"Auto-scaling: CPU/memory/custom metrics trigger adding/removing instances",
"Blue-green deployment: two identical envs, flip traffic for zero-downtime releases",
"Observability stack: Prometheus (metrics), ELK (logs), Jaeger/Zipkin (distributed traces)",
"gRPC: HTTP/2 + Protocol Buffers — faster than REST JSON for internal services",
"Data partitioning: by geography, time range, hash of key — parallel query execution",
"WAL (Write-Ahead Log): persist changes to log first, then apply to DB — crash recovery",
"Backpressure: consumer signals producer to slow down when queue is full",
"Idempotency keys: ensure same request processed multiple times = same result",
"Saga pattern: sequence of local transactions with compensating actions on failure"]},

'Algorithms': { emoji: '🧮', notes: [
"Complexity classes: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!)",
"Binary search: O(log n) — requires sorted array, halves search space each iteration",
"Merge sort: O(n log n) worst/avg/best — stable, but uses O(n) auxiliary space",
"Quick sort: O(n log n) avg, O(n²) worst — in-place, cache-friendly, use random pivot",
"BFS: queue-based, level-by-level — shortest path in unweighted graphs, O(V+E)",
"DFS: stack/recursion, depth-first — cycle detection, topological sort, connected components",
"Dijkstra: min-heap priority queue — O((V+E) log V) — no negative edges",
"Bellman-Ford: relax all edges V-1 times — handles negative weights, detects negative cycles",
"DP requirements: optimal substructure + overlapping subproblems — avoid recomputation",
"Memoization (top-down + recursion) vs Tabulation (bottom-up + iteration) — same complexity",
"LCS: DP[i][j] = LCS of first i of X and first j of Y — O(mn) time & space",
"0/1 Knapsack: DP[i][w] = max value using items 1..i with capacity w — O(nW)",
"Greedy algorithms: make locally optimal choice — works when greedy-choice property holds",
"Activity selection: sort by finish time, always pick earliest finishing compatible activity",
"Topological sort: DFS-based (reverse finish order) or Kahn's (in-degree BFS)",
"Kruskal MST: sort edges, use Union-Find to add lightest edge that doesn't create cycle",
"Prim MST: grow tree from vertex, always add lightest crossing edge — use min-heap",
"Union-Find with rank + path compression: nearly O(α(n)) amortized per operation",
"Floyd-Warshall: all-pairs shortest paths in O(n³) — DP on intermediate vertices",
"A* search: f(n) = g(n) + h(n) — optimal if heuristic h is admissible (never overestimates)",
"Red-Black Tree: self-balancing BST — O(log n) guaranteed — used in TreeMap/TreeSet",
"Hash table: O(1) average — chaining or open addressing — load factor < 0.75 typically",
"Min/Max heap: O(1) peek, O(log n) insert/extract — foundation of priority queues",
"Trie: prefix tree — O(m) lookup where m = key length — autocomplete, spell check",
"Sliding window: maintain window over array/string — max sum, longest substring without repeat",
"Two pointers: sorted array pair sum, container with most water — O(n) technique",
"Master theorem: T(n) = aT(n/b) + f(n) — compare f(n) with n^(log_b a) for complexity",
"Amortized analysis: aggregate cost over n operations / n — dynamic array append is O(1) amortized",
"NP-completeness: in NP + every NP problem poly-reduces to it — 3-SAT, Clique, Vertex Cover",
"Divide & Conquer: split into subproblems, solve recursively, combine — merge sort, Karatsuba"]},

'Design Paradigms': { emoji: '🏗️', notes: [
"SOLID: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, DIP",
"Single Responsibility: a class should have only one reason to change",
"Open-Closed: open for extension, closed for modification — use interfaces/abstract classes",
"Liskov Substitution: subtypes must be substitutable for their base types without breaking",
"Factory pattern: delegate object creation to factory method — decouple client from concrete class",
"Singleton: exactly one instance — use sparingly, makes testing harder (hidden global state)",
"Observer: subject maintains list of observers, notifies them on state change (pub/sub)",
"Strategy: define family of algorithms, encapsulate each, make interchangeable at runtime",
"Decorator: wrap an object to add behavior dynamically — like Python decorators, Java I/O streams",
"MVC: Model (data/logic) + View (UI) + Controller (input handling) — separation of concerns",
"MVVM: ViewModel exposes observable data — View binds reactively — popular in mobile/frontend",
"Dependency Injection: pass dependencies via constructor/setter — easier testing, loose coupling",
"OOP pillars: Encapsulation (data hiding), Abstraction, Inheritance, Polymorphism",
"Composition > Inheritance: prefer 'has-a' over 'is-a' — more flexible, avoids fragile base class",
"Functional programming: pure functions, immutability, higher-order functions, no side effects",
"Closures: function captures variables from enclosing scope — powerful for callbacks/decorators",
"Command pattern: encapsulate action as object — enables undo, queue, logging",
"Adapter: convert one interface to another — wrap incompatible class to match expected interface",
"Builder: construct complex objects step by step — fluent API (e.g., StringBuilder, query builders)",
"Proxy: placeholder controlling access — lazy loading, access control, logging",
"Template Method: define algorithm skeleton in base class, let subclasses override specific steps",
"State pattern: object delegates behavior to current state object — cleaner than if/else chains",
"Clean Architecture: dependencies point inward — Entities → Use Cases → Interface Adapters → UI",
"DRY (Don't Repeat Yourself): extract shared logic — but don't over-DRY, some duplication is OK",
"KISS: Keep It Simple — complexity is the enemy, simple code is easier to debug and maintain",
"YAGNI: You Aren't Gonna Need It — don't build features speculatively",
"Code smells: long method, god class, feature envy, shotgun surgery — refactor when spotted",
"Event-driven: components react to events — loose coupling, async, scalable",
"Repository pattern: abstract data access — service layer uses repo interface, not direct DB calls",
"CQRS + Event Sourcing together: events as source of truth, projections for read-optimized views"]},

'Web Dev': { emoji: '🌐', notes: [
"HTML5 semantic tags: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>",
"CSS Flexbox: 1D layout — justify-content (main axis), align-items (cross), flex-wrap, gap",
"CSS Grid: 2D layout — grid-template-columns/rows, grid-area, fr unit, auto-fit/auto-fill",
"CSS Variables: define with --name: value, use with var(--name) — cascades and scopes to selectors",
"JS event loop: call stack → microtasks (Promise) → macrotasks (setTimeout) → render → repeat",
"Promises: represent async result — .then/.catch/.finally — avoid callback hell",
"async/await: syntactic sugar on Promises — try/catch for error handling, cleaner flow",
"React: component-based — JSX compiles to createElement, props flow down, events bubble up",
"Virtual DOM: React diffs virtual tree, computes minimal patches, applies to real DOM efficiently",
"useState: local component state — setter triggers re-render — use functional update for prev state",
"useEffect: run side effects after render — return cleanup function — dependency array controls when",
"Redux: store → dispatch(action) → reducer(state, action) → new state → subscribers re-render",
"REST: GET=read, POST=create, PUT=replace, PATCH=partial update, DELETE=remove — stateless",
"HTTP status: 200 OK, 201 Created, 301 Redirect, 400 Bad Request, 401 Unauthorized, 404, 500",
"CORS: browser blocks cross-origin requests — server must send Access-Control-Allow-Origin header",
"JWT: base64(header).base64(payload).signature — stateless auth, include in Authorization header",
"WebSocket: persistent full-duplex connection — real-time chat, live data, multiplayer games",
"SSR: server renders HTML → faster FCP, better SEO — CSR: JS renders in browser → richer interactivity",
"Next.js: React meta-framework — SSR/SSG/ISR, API routes, file-based routing, middleware",
"TypeScript: static types for JS — interfaces, generics, union types, type guards, enums",
"Webpack bundles modules, Vite uses ESM + HMR for instant dev server — tree-shaking removes dead code",
"Service Workers: intercept fetch, enable offline caching, push notifications — PWA foundation",
"Accessibility: semantic HTML, ARIA labels, keyboard nav, focus management, color contrast",
"CSS animations: @keyframes + animation shorthand — transform/opacity are GPU-accelerated (smooth)",
"Responsive: media queries, fluid typography (clamp), container queries, mobile-first approach",
"localStorage: persistent, ~5MB, sync — sessionStorage: tab-scoped — both string key-value only",
"IndexedDB: async client-side DB — stores objects, indexes, cursors — good for offline-first apps",
"GraphQL: typed schema, client requests exactly the fields needed — avoids over/under-fetching",
"Hydration: attach JS handlers to server-rendered HTML — framework reconciles virtual DOM with real",
"Core Web Vitals: LCP (loading perf), INP (interactivity), CLS (visual stability) — SEO ranking factor"]},

'Mobile Dev': { emoji: '📱', notes: [
"Native iOS: Swift + SwiftUI/UIKit — best performance, full hardware access, Apple ecosystem",
"Native Android: Kotlin + Jetpack Compose/XML — Material Design, lifecycle-aware components",
"React Native: JS/TS → native bridge → real native components — large community, hot reload",
"Flutter: Dart → Skia rendering engine — pixel-perfect UI, single codebase, 60fps smooth",
"iOS lifecycle: Not Running → Inactive → Active → Background → Suspended — handle transitions",
"Android lifecycle: onCreate → onStart → onResume → onPause → onStop → onDestroy",
"Navigation patterns: Stack (push/pop screens), Tab Bar (bottom navigation), Drawer (side menu)",
"State management RN: useState (local), Context (moderate), Redux/Zustand/Recoil (global)",
"SwiftUI: declarative — @State (local), @Binding (child), @ObservedObject/@StateObject (VM)",
"Jetpack Compose: remember { mutableStateOf() } — recomposition on state change, not recreation",
"API calls: Alamofire/URLSession (iOS), Retrofit/OkHttp (Android), Axios/fetch (RN)",
"Push notifications: APNs (iOS) / FCM (Android) — permission request, token registration, handling",
"Local storage: UserDefaults/Keychain (iOS), SharedPrefs/DataStore (Android), AsyncStorage (RN)",
"SQLite/Room (Android) / Core Data (iOS) / WatermelonDB (RN) — structured offline databases",
"Safe Area: respect notch, status bar, home indicator — SafeAreaView in RN, safeAreaInset in SwiftUI",
"Deep linking: URL scheme (custom://), Universal Links (iOS), App Links (Android) — open specific screen",
"Code signing: iOS provisioning profiles + certificates, Android keystore signing — required for release",
"Beta testing: TestFlight (iOS), Google Play Internal Track (Android) — get feedback before launch",
"CI/CD: Fastlane automates build/sign/deploy, GitHub Actions for lint/test, EAS Build for Expo",
"Memory: ARC in Swift (automatic ref counting), GC in Kotlin/Dart — watch for retain cycles",
"Animations: Animated API / Reanimated (RN), Core Animation (iOS), Compose Animations (Android)",
"Accessibility: VoiceOver (iOS), TalkBack (Android) — semantic labels, focus order, dynamic type",
"Camera: ImagePicker → permission → capture/select → compress → upload — handle all states",
"Biometrics: Face ID / Touch ID (iOS), Fingerprint / Face (Android) — LocalAuthentication framework",
"WebView: embed web content — WKWebView (iOS), WebView (Android) — JS bridge for native ↔ web",
"App Store Optimization: keywords in title/subtitle, screenshots, ratings, A/B test listing",
"OTA updates: CodePush (RN), Expo Updates — push JS changes without full store review",
"Platform-specific: Platform.OS (RN), #if os(iOS) (Swift), RuntimePlatform (Flutter)",
"Performance: FlatList over ScrollView, useMemo/useCallback, avoid anonymous functions in render",
"Expo: managed RN workflow — quick start, limited native access, EAS for builds — good for MVPs"]},

'DBMS': { emoji: '🗄️', notes: [
"RDBMS: tables (relations) with rows (tuples) and columns (attributes) — SQL query language",
"SQL essentials: SELECT, FROM, WHERE, JOIN, GROUP BY, HAVING, ORDER BY, LIMIT, INSERT, UPDATE, DELETE",
"Primary key: uniquely identifies each row — can be single column or composite (multi-column)",
"Foreign key: references PK of another table — enforces referential integrity on insert/delete",
"1NF: every cell holds atomic (single) value, no repeating groups or arrays in a column",
"2NF: 1NF + no partial dependencies — non-key columns depend on ENTIRE composite PK, not part",
"3NF: 2NF + no transitive dependencies — non-key columns depend ONLY on PK, nothing else",
"BCNF: for every non-trivial FD X→Y, X must be a superkey — handles anomalies 3NF misses",
"INNER JOIN: only matching rows — LEFT JOIN: all left + matches — FULL OUTER: all rows from both",
"Index: B-tree (range scans, ORDER BY) vs Hash (exact equality) — speeds reads, slows writes",
"Composite index on (A, B, C): supports queries on A, (A,B), (A,B,C) — NOT B alone (leftmost prefix)",
"EXPLAIN ANALYZE: shows actual execution plan + timing — identify seq scans, missing indexes",
"ACID: Atomicity (all or nothing), Consistency (valid state), Isolation (no interference), Durability (persisted)",
"Isolation levels: Read Uncommitted → Read Committed → Repeatable Read → Serializable (strictest)",
"Deadlock: T1 waits for T2's lock, T2 waits for T1's — DB detects, aborts one transaction",
"Stored procedure: precompiled SQL block on server — reduces round trips, but harder to version",
"View: saved SELECT query — virtual table for simplification, security (expose subset of columns)",
"Trigger: auto-fires on INSERT/UPDATE/DELETE — useful but hidden side effects, use sparingly",
"NoSQL families: Document (MongoDB), Key-Value (Redis), Wide-Column (Cassandra), Graph (Neo4j)",
"MongoDB: JSON-like BSON documents, flexible schema, embedded docs vs references (denormalize vs normalize)",
"Redis: in-memory KV store — caching, sessions, leaderboards, pub/sub, sorted sets — sub-ms reads",
"CAP applied: MongoDB defaults CP, Cassandra AP, single-node PostgreSQL CA",
"Query optimization: use indexes, avoid SELECT *, push WHERE before JOIN, prefer EXISTS over IN",
"Connection pooling: reuse connections (PgBouncer, HikariCP) — creating new connections is expensive",
"Migrations: versioned schema changes (Flyway, Alembic, Knex) — up() applies, down() reverts",
"Partitioning: range (by date), hash (by ID), list (by category) — parallel scans, partition pruning",
"Replication: primary-replica for reads, multi-primary for writes — tradeoff consistency vs availability",
"Backup: full + incremental + WAL archiving — point-in-time recovery to any second",
"ER diagram: entities (rectangles), attributes (ovals), relationships (diamonds) → map to tables",
"SQL injection prevention: ALWAYS use parameterized queries / prepared statements — NEVER concatenate"]},
};

let curSubj = null, noteIdx = 0;

function buildSubjects() {
    const g = document.getElementById('subj-grid');
    if (!g) return;
    g.innerHTML = '';
    Object.keys(SUBJECTS).forEach(k => {
        const s = SUBJECTS[k];
        g.innerHTML += `<button class="subj-btn" id="sb-${k}" onclick="selectSubj('${k}')">${s.emoji} ${k}</button>`;
    });
}

function selectSubj(k) {
    curSubj = k; noteIdx = 0;
    // Hide picker, show classroom
    const picker = document.getElementById('subj-picker');
    const scene = document.getElementById('classroom-scene');
    if (picker) picker.style.display = 'none';
    if (scene) scene.style.display = 'block';
    // Subject label on board
    const label = document.getElementById('cl-subj-label');
    if (label) label.innerText = SUBJECTS[k].emoji + ' ' + k;
    // Crow seat
    const crowSeat = document.getElementById('crow-seat');
    const crowItems = document.getElementById('crow-items');
    if (crowSeat) crowSeat.innerText = (typeof crowFound !== 'undefined' && crowFound) ? '\u{1F426}\u200D\u2B1B' : '';
    if (crowItems) crowItems.innerText = (typeof crowFound !== 'undefined' && crowFound) ? '\u{1F4D3} \u270F\uFE0F \u{1F4F1}' : '';
    showNote();
}

function exitClassroom() {
    const picker = document.getElementById('subj-picker');
    const scene = document.getElementById('classroom-scene');
    if (picker) picker.style.display = 'block';
    if (scene) scene.style.display = 'none';
    if (!curSubj) show('screen-neu');
}

function showNote() {
    if (!curSubj) return;
    const notes = SUBJECTS[curSubj].notes;
    const board = document.getElementById('class-board');
    const counter = document.getElementById('note-counter');
    if (board) board.innerText = notes[noteIdx];
    if (counter) counter.innerText = `${noteIdx + 1} / ${notes.length}`;
}

function nextNote() { if (!curSubj) return; noteIdx = (noteIdx + 1) % SUBJECTS[curSubj].notes.length; showNote(); }
function prevNote() { if (!curSubj) return; noteIdx = (noteIdx - 1 + SUBJECTS[curSubj].notes.length) % SUBJECTS[curSubj].notes.length; showNote(); }

// =============================================
// SNELL STUDY TIMER
// =============================================
let studyInt = null, studySec = 1500, studying = false;

function toggleStudy() {
    const btn = document.getElementById('study-btn');
    if (studying) {
        clearInterval(studyInt); studying = false;
        if (btn) btn.innerText = 'Start Studying 📖';
        const msg = document.getElementById('snell-msg');
        if (msg) msg.innerText = 'Break time! 🎉';
    } else {
        studying = true; studySec = 1500;
        if (btn) btn.innerText = 'Take a Break ☕';
        const msg = document.getElementById('snell-msg');
        if (msg) msg.innerText = (typeof crowFound !== 'undefined' && crowFound) ? 'Studying together! 💛📚' : 'Grinding solo... 📚';
        studyInt = setInterval(() => {
            studySec--;
            if (studySec <= 0) { clearInterval(studyInt); studying = false; if (btn) btn.innerText = 'Again 📖'; if (msg) msg.innerText = 'Session complete! 🎉'; }
            const m = ~~(studySec / 60), s = studySec % 60;
            const timer = document.getElementById('study-timer');
            if (timer) timer.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }, 1000);
    }
}
