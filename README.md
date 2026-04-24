# 💛🐦‍⬛ Pillu & Crow's Game Hub

The ultimate custom web-game portal — a collection of **16 beautifully designed, interactive games** tailored for Pillu (⚡) and Crow (🐦‍⬛). Lightweight, mobile-friendly, and runs entirely in a single HTML file with zero frameworks or backend.

---

## 🎮 The Games

### 🧠 Strategy & Logic
| # | Game | Description |
|---|------|-------------|
| 1 | **Meow-sweeper 😻** | A cute Minesweeper with three difficulty tiers (Beginner, Pikium, Meowster). Flag hisses with 💖, undo moves, and chase a purr-fect clear. |
| 2 | **Tic-Tac-Pika ❌** | Classic Tic-Tac-Toe with custom Pillu & Crow avatar pieces. Bot or pass-and-play. |
| 3 | **Connect Crows 🧶** | Drop-four strategy game. Line up 4 custom pieces to win. Bot or pass-and-play. |
| 4 | **O-pika-llo ☯️** | Reversi / Othello — sandwich and flip your opponent's pieces. Greedy bot AI included. |
| 5 | **Su-meow-ku 🧩** | Full 9×9 Sudoku with three difficulty levels, a pencil-mark system, and a lives counter. |

### 🔤 Word Games
| # | Game | Description |
|---|------|-------------|
| 6 | **Pika-dle 🔤** | A custom Wordle clone — guess the 5-letter word in 6 tries with color-coded feedback. |
| 7 | **Hang-meow 🪢** | Classic Hangman with an on-screen keyboard, animated gallows, and word definitions on win. |
| 8 | **Waff-meow 🧇** | Waffle-style letter swap puzzle — rearrange letters to form intersecting words in 15 swaps. |

### 🧩 Puzzles & Memory
| # | Game | Description |
|---|------|-------------|
| 9 | **Pika-Pairs 🃏** | Flip-and-match memory card game with themed emojis. Track your move count. |
| 10 | **Pillu Says 🔴** | Simon Says with **audio tones** — watch the light-and-sound sequence, then repeat it back. |
| 11 | **Slider Puzzle 🖼️** | Classic 8-tile sliding puzzle. Reassemble the scrambled Pikachu image. |

### ⚡ Action & Arcade
| # | Game | Description |
|---|------|-------------|
| 12 | **Catch a Snack 🔨** | Whack-a-mole — tap treats (🍼🐟🧇) for points, dodge angry hisses (🙀). 30-second timer. |
| 13 | **Pillu Run 🏃** | Endless runner — tap to jump over obstacles. Speed increases over time. Beat your high score! |

### 🎲 Quick Play
| # | Game | Description |
|---|------|-------------|
| 14 | **R. P. Heart ✌️** | Rock-Paper-Scissors reimagined: ⚡ zaps 🐦‍⬛, 🐦‍⬛ steals 💖, 💖 charms ⚡. First to 3 wins. |
| 15 | **Coin Toss 🪙** | Call Pillu or Crow — animated flip with character reveal. |
| 16 | **Guess Number 🔢** | Guess the secret number (1–100) using higher / lower hints. |

---

## ✨ Features

- **Single-file architecture** — one `index.html`, no build tools, no dependencies.
- **Fully responsive** — works on desktop, tablet, and mobile with a scrollable floating dock navbar.
- **Draggable dock navigation** — click-and-drag horizontal scrolling on desktop; swipe on mobile.
- **Hover labels** — dock icons show game names on mouse hover.
- **Custom character sprites** — personalized `pikachu.png` and `crow.png` used across all games.
- **Dark mode 🌙** — toggle between soft Baby Pink and Neon Fuchsia Cyber-Cat themes.
- **Audio engine** — Pillu Says features Web Audio API tones (triangle wave, C4/E4/G4/C5) for each button.
- **Victory & loss effects** — confetti rain on wins, floating bubbles on ties, and explosive emoji bursts on losses.
- **Screen-shake feedback** — dramatic shake animation on wrong moves and game-overs.
- **Custom cursors** — 🐾 default cursor and ⚡ pointer cursor for interactive elements.
- **Splash screen** — animated entry screen with a celebratory confetti burst on hub entry.
- **Dynamic header** — title and info button update to match the active game.
- **Undo support** — Meow-sweeper includes full move-history undo.
- **Bot opponents** — Tic-Tac-Pika, Connect Crows, and O-pika-llo all support Bot or Pass-and-Play modes.

---

## 🚀 Deployment (GitHub Pages)

This project is pure HTML/CSS/JS — deploy it on GitHub Pages for free in under a minute:

1. Create a repository on GitHub (e.g., `pillu-crow-hub`).
2. Upload `index.html`, `pikachu.png`, and `crow.png` into the root of the `main` branch.
3. Go to **Settings → Pages**.
4. Set Source to `main` branch, root folder.
5. Wait 1–2 minutes, then visit your live link.

---

## 📁 Project Structure

```
├── index.html      ← The entire game hub (HTML + CSS + JS)
├── pikachu.png     ← Pillu's character sprite
├── crow.png        ← Crow's character sprite
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, animations, backdrop-filter, `perspective` 3D) |
| Logic | Vanilla JavaScript (ES6+, Web Audio API, async/await) |
| Font | [Nunito](https://fonts.google.com/specimen/Nunito) via Google Fonts |
| Hosting | GitHub Pages (static) |

---

Enjoy playing! ⚡💖🐦‍⬛
