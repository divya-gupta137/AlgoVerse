# AlgoVerse — Daily Plan (Sprint: Sept 30 – Oct 8/9, 2026)

> **Timeline:** Wednesday 30 Sept 2026 → Thursday 8 Oct 2026 (Target Completion)
> **Viva / Buffer Day:** Friday 9 Oct 2026
> **Daily Time Budget:** 4–6 focused hours a day.

---

## 📌 Repository & GitHub Best Practices Checklist

Before writing code every day, ensure you follow these strict repository guidelines:

1. **Clean Folder Structure**:
   ```text
   AlgoVerse/
   ├── .gitignore
   ├── LICENSE
   ├── README.md
   ├── CONCEPTS.md
   ├── DECISIONS.md
   ├── index.html
   ├── learn.html
   ├── visualizer.html
   ├── playground.html
   ├── about.html
   ├── styles/
   │   ├── tokens.css
   │   ├── base.css
   │   ├── layout.css
   │   └── components.css
   └── scripts/
       ├── core/
       │   ├── frame.js
       │   ├── player.js
       │   ├── theme.js
       │   └── storage.js
       ├── producers/
       │   ├── sorting/
       │   ├── searching/
       │   └── structures/
       ├── renderers/
       │   ├── bars.js
       │   ├── stack.js
       │   ├── queue.js
       │   └── linkedlist.js
       ├── controls/
       │   ├── transport.js
       │   ├── inputPanel.js
       │   ├── codePanel.js
       │   └── narration.js
       └── pages/
           ├── home.js
           ├── learn.js
           ├── visualizer.js
           └── playground.js
   ```

2. **`.gitignore` file**:
   Ignore IDE files (`.vscode/`, `.vs/`), OS files (`.DS_Store`, `Thumbs.db`), `node_modules/`, scratch files, and logs.

3. **`README.md`**:
   Must include:
   - What AlgoVerse does (DSA Learning + Universal Step-by-Step Visualizer + Execution Engine).
   - Live Demo Link (GitHub Pages).
   - Prerequisites (Any modern web browser).
   - Step-by-step instructions on how to run locally (e.g. VS Code Live Server).
   - Architecture & JavaScript key points for Viva.

4. **Open-Source License**:
   Includes standard **MIT License** in `LICENSE`.

5. **Atomic Commit Strategy**:
   Commit daily with clear, descriptive commit messages explaining *what* changed and *why*:
   - Bad: `"fixed stuff"`, `"update"`, `"day 4"`
   - Good: `"feat: implement universal frame player and transport controls"`, `"docs: update setup steps in README.md"`

6. **Security & Privacy**:
   Double check that no hardcoded passwords, API keys, or personal private configs are committed.

---

# 🗓️ DAY 1 — Wednesday 30 Sept · Project Setup, Git & Look

### 🇮🇳 Today's Objective
Set up the repository skeleton, `.gitignore`, MIT License, CSS design tokens (`tokens.css`), base styling, and dark/light theme switching. No algorithm logic today—just clean foundation!

### 📋 Tasks
1. Initialize Git repository & create `.gitignore` (ignoring `.vscode/`, `.DS_Store`, etc.).
2. Create `LICENSE` file with MIT License text.
3. Build folder structure (`styles/`, `scripts/core/`, `scripts/producers/`, etc.).
4. Create `styles/tokens.css` with Graphite & Amber CSS variables (`--bg`, `--surface`, `--accent`, `--viz-compare`, `--viz-swap`, `--viz-sorted`).
5. Create `styles/base.css` (CSS reset, Google Fonts: Space Grotesk, Inter, JetBrains Mono).
6. Create `styles/layout.css` (navbar, container layout, footer).
7. Create `index.html` header, navigation bar, and footer.
8. Create `scripts/core/storage.js` (`localStorage` helper wrapper).
9. Create `scripts/core/theme.js` (Dark/Light mode toggle stored in `localStorage`).
10. Initialize `CONCEPTS.md` & `DECISIONS.md`.

### 🔀 Commit Command
```bash
git add .
git commit -m "chore: setup project structure, gitignore, MIT license, design tokens, and theme system"
git push -u origin main
```

---

# 🗓️ DAY 2 — Thursday 1 Oct · Home Landing Page & Catalog Section

### 🇮🇳 Today's Objective
Build the landing page (`index.html`) and the Learn/Catalog page (`learn.html`). Make AlgoVerse look modern, clean, and impressive right on first load!

### 📋 Tasks
1. Complete `index.html` hero section, quick intro, feature cards, and CTA buttons.
2. Build `learn.html` page structure with topic filter tabs (All, Sorting, Searching, Data Structures).
3. Create `scripts/pages/learn.js` to dynamically render topic cards and handle search/filter inputs.
4. Ensure theme toggle works smoothly across both pages.
5. Record JavaScript concepts used (`DOM selectors`, `Event Listeners`, `Array.filter`, `dataset` attributes) in `CONCEPTS.md`.

### 🔀 Commit Command
```bash
git add .
git commit -m "feat: add landing page hero, feature grid, and dynamic catalog filter system"
git push
```

---

# 🗓️ DAY 3 — Friday 2 Oct · Reusable Core Engine (Frame & Player)

### 🇮🇳 Today's Objective
Build the core technical engine of AlgoVerse: `Frame` generator schema and the `Player` clock controller. This is the single most important JS architecture component for viva defense!

### 📋 Tasks
1. Create `scripts/core/frame.js` (Frame definition, `structuredClone` helper for data snapshots).
2. Create `scripts/core/player.js` (State machine: `idle`, `playing`, `paused`, `completed`).
3. Add player timing methods: `play()`, `pause()`, `stepForward()`, `stepBackward()`, `seek(frameIndex)`, `setSpeed(multiplier)`.
4. Create `scripts/controls/transport.js` to bind transport UI buttons (Play, Pause, Step Next, Step Prev, Speed Dropdown, Scrubber Slider).
5. Verify player execution with mock frame sequence in browser console.

### 🔀 Commit Command
```bash
git add .
git commit -m "feat: implement reusable frame player engine and transport control binding"
git push
```

---

# 🗓️ DAY 4 — Saturday 3 Oct · Universal Visualizer Page & First Sorting Algorithms

### 🇮🇳 Today's Objective
Create the single `visualizer.html` page and the Bar Renderer, then implement producers for **Bubble Sort** and **Selection Sort**.

### 📋 Tasks
1. Create `visualizer.html` layout (Visualization viewport, control bar, input panel, code panel, narration panel).
2. Create `scripts/pages/visualizer.js` to read URL search params (`?topic=sorting&algo=bubble-sort`).
3. Create `scripts/renderers/bars.js` (DOM Bar generator, updating height and active color CSS classes per frame).
4. Create `scripts/producers/sorting/bubbleSort.js` (Generates array frames for comparisons and swaps).
5. Create `scripts/producers/sorting/selectionSort.js`.
6. Test Play/Pause, Step Forward/Backward, and Speed controls with live array bars!

### 🔀 Commit Command
```bash
git add .
git commit -m "feat: add universal visualizer page, DOM bars renderer, and bubble/selection sort producers"
git push
```

---

# 🗓️ DAY 5 — Sunday 4 Oct · Complete Sorting Suite & Input Control Panel

### 🇮🇳 Today's Objective
Finish remaining sorting algorithms (**Insertion Sort**, **Merge Sort**, **Quick Sort**) and build user input controls.

### 📋 Tasks
1. Create `scripts/producers/sorting/insertionSort.js`.
2. Create `scripts/producers/sorting/mergeSort.js`.
3. Create `scripts/producers/sorting/quickSort.js`.
4. Create `scripts/controls/inputPanel.js` (Allow user to type custom numbers e.g. `24, 12, 5, 40` or click "Generate Random").
5. Create `scripts/controls/statsPanel.js` to count and display total Comparisons & Swaps during execution.

### 🔀 Commit Command
```bash
git add .
git commit -m "feat: complete sorting algorithms suite (insertion, merge, quick sort) and custom input generator"
git push
```

---

# 🗓️ DAY 6 — Monday 5 Oct · Searching Algorithms, Code Line Highlight & Narration

### 🇮🇳 Today's Objective
Add searching algorithms (**Linear Search**, **Binary Search**), active code line highlighting, and step narration explanations.

### 📋 Tasks
1. Create `scripts/producers/searching/linearSearch.js`.
2. Create `scripts/producers/searching/binarySearch.js` (Highlighting `low`, `mid`, `high` pointers).
3. Create `scripts/controls/codePanel.js` (Displays clean JS algorithm code and highlights `codeLine` specified in current frame).
4. Create `scripts/controls/narration.js` (Displays readable explanation text for each step).
5. Verify code line sync during playback.

### 🔀 Commit Command
```bash
git add .
git commit -m "feat: add linear & binary search producers, synchronized code line highlight, and narration panel"
git push
```

---

# 🗓️ DAY 7 — Tuesday 6 Oct · Data Structures: Array, String, Stack & Queue

### 🇮🇳 Today's Objective
Extend the visualizer engine to support Data Structure operations: Array, String, Stack, and Queue.

### 📋 Tasks
1. Create Array operations producer & visualizer (Insert, Delete, Search, Traverse).
2. Create String operations producer & visualizer (Reverse, Palindrome check, Frequency count).
3. Create `scripts/renderers/stack.js` & Stack producer (Push, Pop, Peek visualizer).
4. Create `scripts/renderers/queue.js` & Queue producer (Enqueue, Dequeue visualizer).
5. Ensure DOM elements transition cleanly during push/pop/enqueue/dequeue operations.

### 🔀 Commit Command
```bash
git add .
git commit -m "feat: implement Array, String, Stack, and Queue visualizer renderers and producers"
git push
```

---

# 🗓️ DAY 8 — Wednesday 7 Oct · Linked List & Predefined Execution Playground V1

### 🇮🇳 Today's Objective
Implement Linked List visualization and build Playground V1 (Predefined JS code execution step visualizer).

### 📋 Tasks
1. Create `scripts/renderers/linkedlist.js` & Linked List producer (Head pointer, nodes `[data|next]`, insert, delete, reverse).
2. Create `playground.html` & `scripts/pages/playground.js`.
3. Add predefined instrumented JS programs: Factorial (recursion stack demo), Fibonacci, Bubble Sort execution, Sum of Array.
4. Render execution panels: Current Code Line, Variables State, Call Stack, Console Output, Timeline scrubber.

### 🔀 Commit Command
```bash
git add .
git commit -m "feat: add Linked List visualizer and predefined JavaScript execution Playground V1"
git push
```

---

# 🗓️ DAY 9 — Thursday 8 Oct · Polish, Responsive UI, Deployment & Comprehensive README

### 🇮🇳 Today's Objective
Complete project polish, verify responsive design, audit repository cleanliness, deploy to GitHub Pages, and write an outstanding `README.md`!

### 📋 Tasks
1. Audit responsive CSS on mobile & tablet viewport sizes.
2. Check `.gitignore` to verify no leftover temporary/IDE files are committed.
3. Write comprehensive `README.md` with features summary, local setup guide, live demo link, folder structure, and JS architecture notes.
4. Deploy to GitHub Pages (via repository settings or `gh-pages` branch).
5. Perform end-to-end testing of every algorithm and feature.
6. Tag official release `v1.0.0`.

### 🔀 Commit Command
```bash
git add .
git commit -m "docs: complete comprehensive README.md, responsive UI polish, and GitHub Pages deployment setup"
git tag -a v1.0.0 -m "AlgoVerse Version 1.0 Release"
git push origin main --tags
```

---

# 🗓️ DAY 10 — Friday 9 Oct · Viva Preparation & Demonstration Defense

### 🇮🇳 Today's Objective
Rehearse the project presentation and master all JavaScript concepts in `03-VIVA-JS-CONCEPTS.md`!

### 📋 Viva Defense Key Talking Points
1. **Frame-based Architecture**: Explain why algorithm code generates state frames first, decoupled from DOM rendering.
2. **DOM Manipulation & Performance**: Explain how CSS classes and standard `transform` properties ensure 60fps performance without layout thrashing.
3. **State Management**: Explain how `structuredClone()` prevents frame data mutation bugs.
4. **Vanilla JS Modules**: Explain modular script architecture using ES modules without npm build tools or frameworks.
