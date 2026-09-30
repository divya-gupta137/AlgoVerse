# AlgoVerse — Day-by-Day Master Implementation Plan

> **Sprint Timeline:** Wednesday 30 Sept 2026 → Thursday 8 Oct 2026 (Target Completion)
> **Viva / Buffer Day:** Friday 9 Oct 2026
> **Learning Goal:** 100% Comprehension & Viva Defense Readiness for a Beginner in JavaScript.

---

## 🛠️ Step-by-Step Repository Initialization & Git Setup Guide

Follow these exact steps before writing project code to set up a clean, professional GitHub repository:

### Step 1: Create `.gitignore` File
In the project root folder `AlgoVerse/`, create `.gitignore` to prevent tracking temporary, OS, or IDE files:
```text
# IDE files
.vscode/
.vs/
.idea/

# OS files
.DS_Store
Thumbs.db

# Dependencies & Logs
node_modules/
*.log

# Scratch & Temporary files
scratch/
```

### Step 2: Add Open-Source License (`LICENSE`)
Create a file named `LICENSE` in the root folder with the MIT License text:
```text
MIT License

Copyright (c) 2026 AlgoVerse Developer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Step 3: Initialize Git Repository
Run the following terminal commands inside `AlgoVerse/`:
```bash
git init
git branch -M main
```

### Step 4: Create Clean Folder Hierarchy
Ensure your project contains these dedicated folders:
```text
AlgoVerse/
├── styles/
│   └── components/
├── scripts/
│   ├── core/
│   ├── producers/
│   │   ├── sorting/
│   │   ├── searching/
│   │   └── structures/
│   ├── renderers/
│   ├── controls/
│   ├── content/
│   └── pages/
├── docs/
├── theory_concepts/
└── assets/
```

### Step 5: Connect to GitHub & Push Initial Commit
Create a new repository on GitHub (e.g. `AlgoVerse`), then connect and push:
```bash
git add .
git commit -m "chore: setup project structure, gitignore, MIT license, and documentation skeleton"
git remote add origin https://github.com/YOUR_USERNAME/AlgoVerse.git
git push -u origin main
```

---

## 📚 JavaScript Syllabus & AlgoVerse Concept Mapping

This table connects your JavaScript syllabus directly to the files where these concepts are used in AlgoVerse:

| Syllabus Module | Key JS Topics | Where Used in AlgoVerse | Viva Explanation |
|---|---|---|---|
| **Topics 1–2** | Intro to JS, `var`, `let`, `const`, Primitives vs Reference Data Types | Used everywhere across scripts. Config constants use `const`; loop counters use `let`. | `const` prevents re-assignment. Reference types (arrays/objects) copy memory addresses, which is why we need `structuredClone()`. |
| **Topics 3–4** | Operators, Type Conversion, Conditionals (`if/else`, `switch`) | `inputPanel.js` (parsing user inputs), `player.js` (checking player states `PLAYING`/`PAUSED`). | `parseInt(str, 10)` handles string-to-number type conversion safely. |
| **Topics 5–6** | Loops (`for`, `while`, `for...of`), Practical Exercises | `bubbleSort.js`, `binarySearch.js`, `learn.js` (looping over catalog cards). | `for...of` cleanly iterates array values; `for` loops handle index-based comparisons. |
| **Topics 7–8** | Functions (Declarations, Expressions, Parameters, Return Values) | Producer functions returning `Frame[]`, renderer functions drawing DOM elements. | Pure functions take inputs and return frames without altering global state. |
| **Topics 9–10** | Arrow Functions, Scope (`block`, `function`, `global`), Array Basics | Event callbacks in `transport.js`, storing state array elements. | Block scope (`let`/`const` inside `{}`) prevents variable leak; Arrow functions inherit lexical `this`. |
| **Topics 11–12** | Array Methods (`push`, `pop`, `shift`, `unshift`, `splice`, `slice`) | Stack operations (`push`/`pop`), Queue operations (`push`/`shift`), Array insertion/deletion (`splice`). | Modifying array length dynamically; `slice()` creates shallow array copies. |
| **Topics 13–14** | Higher-Order Functions (`forEach`, `map`, `filter`, `reduce`) | `learn.js` (filtering catalog items by search term), `statsPanel.js` (summing operation counts). | `filter()` creates a new array matching conditions without mutating the original array. |
| **Topics 15–16** | Objects, Properties, Methods, Nested Objects, Destructuring, JSON | Frame representation (`{ op, data, highlights, narration }`), theory snippet parsing. | Objects key-value pairs structure complex visual state per frame; JSON handles stringified data. |
| **Topics 17–18** | DOM Intro, Element Selectors (`querySelector`, `querySelectorAll`, `getElementById`) | `bars.js` (selecting visualizer container), `transport.js` (grabbing transport buttons). | `querySelector` uses standard CSS selector strings to locate DOM nodes. |
| **Topics 19–20** | DOM Manipulation, Styling, Creating/Removing Elements (`createElement`, `appendChild`, `classList`) | Dynamic creation of Array Bars, Stack Nodes, Queue Cells, active line highlight (`classList.add('active')`). | Direct DOM node creation (`document.createElement`) and manipulation without heavyweight frameworks. |
| **Topic 21** | Event Handling (Mouse, Keyboard, Form Events), `preventDefault()` | Button clicks (Play/Pause), Slider input (`input` event), Keyboard shortcuts (Space bar to toggle play). | Event listeners attach async callbacks to user interactions; `preventDefault()` stops browser reloads. |
| **Topic 22** | Forms, Input Validation, Error Handling | `inputPanel.js` validating user comma-separated array numbers and showing error text. | Validating inputs before algorithm execution prevents `NaN` or runtime crashes. |
| **Topic 23** | Local Storage, Session Storage, Browser Data | `storage.js`, `theme.js` (persisting Dark/Light mode choice across browser refreshes). | `localStorage.setItem(key, value)` saves string data permanently in the user's browser. |
| **Topic 24** | ES6 Features (Template Literals, Spread `...`, Destructuring, Default Parameters) | Template literals for DOM HTML strings, spread operator for array clones (`[...arr]`). | Template literals (`` `Step ${index}` ``) enable readable dynamic string building. |
| **Topics 25–26** | Callbacks, Asynchronous JS, Promises, Error Handling (`try/catch`) | `player.js` timer clock ticks (`setInterval`), `try/catch` block for invalid input parsing. | `setInterval` delegates timing to browser Web APIs; `try/catch` catches unexpected execution errors gracefully. |
| **Topics 27–28** | Async/Await, Fetch API, REST/JSON Consumption | `snippets.js` / `theory.js` loading external snippet JSON files using `fetch()` and `async/await`. | `fetch()` returns a `Promise` resolved asynchronously with `await`. |
| **Topics 29–31** | Mini-Project Integration (Storage, Forms, DOM) | The entire integrated AlgoVerse platform! | Synthesizes modular architecture, clean DOM rendering, state management, and user interaction. |

---

## 🌟 Advanced / Extra Concepts for Viva Defense

If asked about advanced concepts used in AlgoVerse that go beyond the basic syllabus, defend them using these key points:

1. **`structuredClone(data)`**:
   - *What it is*: Modern browser native API for deep cloning objects and arrays.
   - *Why AlgoVerse uses it*: Every visual `Frame` recorded by an algorithm must keep an isolated snapshot of the array at that exact step. If we just stored `data: array`, all frames would point to the same mutated array reference! `structuredClone(array)` makes an independent copy.

2. **ES Modules (`import` / `export`)**:
   - *What it is*: Native browser module system (`<script type="module" src="...">`).
   - *Why AlgoVerse uses it*: Allows organizing code into clean, separate files without needing complex build tools like Webpack or Vite.

3. **`URLSearchParams` API**:
   - *What it is*: Native API to read URL query parameters (`new URLSearchParams(window.location.search)`).
   - *Why AlgoVerse uses it*: Enables **one single reusable `visualizer.html` page** (`visualizer.html?topic=sorting&algo=bubble-sort`) instead of creating 20 separate HTML files.

4. **State Machine Pattern**:
   - *What it is*: Explicit state variable tracking (`IDLE`, `PLAYING`, `PAUSED`, `COMPLETED`).
   - *Why AlgoVerse uses it*: Prevents timing bugs like clicking "Play" multiple times and spawning competing timer intervals.

---

# 📖 Day-by-Day Story & Implementation Journey

Each day begins with a short story setting the context, followed by the exact syllabus concepts, target files, code logic, and step-by-step handoff instructions.

---

## 🗓️ DAY 1 — Wednesday 30 Sept
### 📖 The Story: "The Blueprint & The Foundation"
> *"Every grand building needs a rock-solid foundation. Today, we step into the developer's studio. We won't write algorithm code yet. First, we create our repository structure, set up our `.gitignore` to keep our codebase clean, add an open-source MIT license, create our Graphite & Amber design system, and write a theme switcher that remembers whether the user prefers Dark or Light mode!"*

- **Syllabus Focus**: Topics 1–2 (Variables `let`/`const`, Data Types), Topic 23 (`localStorage`).
- **Concepts Taught**: CSS Custom Properties (`--bg`, `--accent`), `localStorage.getItem/setItem`, ES Modules `<script type="module">`.
- **Files Created / Configured**: `.gitignore`, `LICENSE`, `styles/tokens.css`, `styles/base.css`, `styles/layout.css`, `scripts/core/storage.js`, `scripts/core/theme.js`, `index.html` (Header/Footer skeleton).
- **Theory Note to Save**: `/theory_concepts/01_variables_storage_and_tokens.md`
- **Git Commit**: `chore: setup project structure, gitignore, MIT license, design tokens, and theme system`

---

## 🗓️ DAY 2 — Thursday 1 Oct
### 📖 The Story: "The Gateway — Home Page & Catalog"
> *"A platform needs an inviting entrance! Today we build the user-facing storefront: our Hero section introducing AlgoVerse, interactive feature cards, and our Learn/Catalog grid. When users type in the search bar or click topic tags, our JavaScript dynamically filters the algorithms and data structures on the fly."*

- **Syllabus Focus**: Topics 13–14 (Higher-Order Functions `filter`, `forEach`), Topics 17–18 & 19–20 (DOM Selection & Element Creation).
- **Concepts Taught**: `document.createElement()`, `element.appendChild()`, `Array.prototype.filter()`, Template Literals.
- **Files Created / Configured**: `index.html` (Hero & Feature grid), `learn.html`, `scripts/registry/catalog.js`, `scripts/pages/learn.js`.
- **Theory Note to Save**: `/theory_concepts/02_dom_selection_and_array_filtering.md`
- **Git Commit**: `feat: add landing page hero, feature cards, and dynamic learning catalog filter`

---

## 🗓️ DAY 3 — Friday 2 Oct
### 📖 The Story: "The Heartbeat — Frame Generator & Reusable Player Engine"
> *"Here lies the core engine of AlgoVerse! Instead of trying to directly animate DOM elements inside complex loops (which causes timing glitches and makes rewind impossible), we separate generation from playback. Algorithms produce an array of state snapshots ('Frames'). Our Player clock steps through these frames effortlessly. Today, we construct the Frame schema, the Player state machine, and transport buttons."*

- **Syllabus Focus**: Topics 15–16 (Objects & Properties), Topics 25–26 (`setInterval`, Callbacks, Error Handling).
- **Concepts Taught**: The Frame Architecture (`{ op, data, highlights, narration }`), `structuredClone()`, State Machine (`PLAYING`/`PAUSED`), `setInterval`/`clearInterval`.
- **Files Created / Configured**: `scripts/core/frame.js`, `scripts/core/player.js`, `scripts/controls/transport.js`.
- **Theory Note to Save**: `/theory_concepts/03_frame_visualization_and_player_engine.md`
- **Git Commit**: `feat: implement frame state generator, playback state machine, and transport controls`

---

## 🗓️ DAY 4 — Saturday 3 Oct
### 📖 The Story: "The First Canvas — Universal Visualizer & Sorting Bars"
> *"The heart begins to beat! Today we build our single, universal `visualizer.html` page that reads URL parameters (e.g. `?algo=bubble-sort`). We create our Bar Renderer that converts numeric data arrays into sleek vertical DOM bars. Then, we write our first algorithm state producers: Bubble Sort and Selection Sort!"*

- **Syllabus Focus**: Topics 5–6 (Loops `for`/`while`), Topics 19–20 (DOM Styling `element.style.height`), Advanced (`URLSearchParams`).
- **Concepts Taught**: `URLSearchParams`, Dynamic DOM Bar Rendering, Array Comparisons & Swaps frame recording.
- **Files Created / Configured**: `visualizer.html`, `scripts/pages/visualizer.js`, `scripts/renderers/bars.js`, `scripts/producers/sorting/bubbleSort.js`, `scripts/producers/sorting/selectionSort.js`.
- **Theory Note to Save**: `/theory_concepts/04_universal_visualizer_and_sorting_producers.md`
- **Git Commit**: `feat: add universal visualizer page, DOM bars renderer, and bubble/selection sort producers`

---

## 🗓️ DAY 5 — Sunday 4 Oct
### 📖 The Story: "The Master Sorter & Custom Control Deck"
> *"Now we supercharge our sorting suite! We implement Insertion Sort, Merge Sort, and Quick Sort. But more importantly, we give full control to the user. We build an Input Panel where users can type their own custom numbers or click 'Generate Random', complete with input validation and error messages!"*

- **Syllabus Focus**: Topic 22 (Forms, Input Handling, Validation), Topic 24 (Spread Operator `...`), Topics 25–26 (`try/catch`).
- **Concepts Taught**: Form input parsing, String splitting (`str.split(',')`), Input validation regex/range checks, `try/catch` error handling, Operation counter statistics.
- **Files Created / Configured**: `scripts/producers/sorting/insertionSort.js`, `scripts/producers/sorting/mergeSort.js`, `scripts/producers/sorting/quickSort.js`, `scripts/controls/inputPanel.js`, `scripts/controls/statsPanel.js`.
- **Theory Note to Save**: `/theory_concepts/05_form_validation_and_sorting_algorithms.md`
- **Git Commit**: `feat: complete sorting algorithms suite and custom array input generator with validation`

---

## 🗓️ DAY 6 — Monday 5 Oct
### 📖 The Story: "The Searchlight, Code Sync & Storyteller"
> *"An algorithm visualizer is only as good as its educational clarity. Today we add Searching algorithms (Linear Search & Binary Search). We also build the Code Panel (which highlights the exact JavaScript line executing at each step) and the Narration Panel (which explains in plain English what just happened!)"*

- **Syllabus Focus**: Topics 3–4 (Comparisons), Topics 17–18 & 19–20 (DOM `classList` toggling, Text updates).
- **Concepts Taught**: Binary Search pointer tracking (`low`, `mid`, `high`), Code Snippet highlighting (`classList.add('active-line')`), Dynamic narration binding per frame.
- **Files Created / Configured**: `scripts/producers/searching/linearSearch.js`, `scripts/producers/searching/binarySearch.js`, `scripts/controls/codePanel.js`, `scripts/controls/narration.js`.
- **Theory Note to Save**: `/theory_concepts/06_searching_algorithms_and_code_sync.md`
- **Git Commit**: `feat: add searching algorithms, synchronized code line highlight, and narration panel`

---

## 🗓️ DAY 7 — Tuesday 6 Oct
### 📖 The Story: "The Physical Structures — Array, String, Stack & Queue"
> *"Algorithms operate on data structures. Today we visualize fundamental Data Structures! We build custom renderers and producers for Array operations, String operations, Stack (LIFO: Push/Pop), and Queue (FIFO: Enqueue/Dequeue). Watch elements drop into stacks and slide through queues!"*

- **Syllabus Focus**: Topics 11–12 (Array Methods `push`, `pop`, `shift`, `unshift`, `splice`), Topics 19–20 (DOM Element Creation & Removal).
- **Concepts Taught**: LIFO (Last In First Out) vs FIFO (First In First Out) state logic, Array mutation methods vs non-mutating methods, Dynamic DOM list rendering.
- **Files Created / Configured**: `scripts/renderers/stack.js`, `scripts/renderers/queue.js`, `scripts/producers/structures/arrayOps.js`, `scripts/producers/structures/stringOps.js`, `scripts/producers/structures/stackOps.js`, `scripts/producers/structures/queueOps.js`.
- **Theory Note to Save**: `/theory_concepts/07_stack_queue_array_structures.md`
- **Git Commit**: `feat: add Array, String, Stack, and Queue visualizer renderers and producers`

---

## 🗓️ DAY 8 — Wednesday 7 Oct
### 📖 The Story: "Pointers & The Execution Playground"
> *"We tackle our final data structure: Linked Lists, rendering node boxes and arrow pointers (`HEAD → [10|next] → NULL`). Then we launch Playground V1! Users can pick predefined JS programs (Factorial, Fibonacci, Bubble Sort) and step through their execution, seeing variables, the call stack, and console logs live!"*

- **Syllabus Focus**: Topics 27–28 (`fetch()`, `async/await`, JSON handling), Topics 9–10 (Scope & Call Stack concepts).
- **Concepts Taught**: Linked List pointer references, Loading external code files using `fetch()`, Call Stack visualization array, Execution scope variable inspection.
- **Files Created / Configured**: `scripts/renderers/linkedlist.js`, `scripts/producers/structures/linkedListOps.js`, `playground.html`, `scripts/pages/playground.js`, `scripts/content/snippets/factorial.json`.
- **Theory Note to Save**: `/theory_concepts/08_linked_lists_and_execution_playground.md`
- **Git Commit**: `feat: add Linked List pointer visualizer and predefined JavaScript execution Playground V1`

---

## 🗓️ DAY 9 — Thursday 8 Oct
### 📖 The Story: "Grand Launch & Viva Readiness"
> *"Our creation is complete! Today we perform final polish: verifying mobile responsiveness, auditing `.gitignore` to ensure no clutter is present, writing an outstanding, comprehensive `README.md`, deploying to GitHub Pages, and tagging our official release!"*

- **Syllabus Focus**: Topics 29–31 (Integrated Mini-Project Deployment & Documentation).
- **Concepts Taught**: Project documentation standards, Repository clean auditing, Live deployment hosting (GitHub Pages), Release tagging (`git tag`).
- **Files Created / Configured**: `README.md`, responsive CSS adjustments in `layout.css`, deployment verification.
- **Theory Note to Save**: `/theory_concepts/09_project_deployment_and_viva_defense.md`
- **Git Commit**: `docs: complete comprehensive README.md, responsive UI polish, and GitHub Pages deployment setup`

---

## 🗓️ DAY 10 — Friday 9 Oct
### 📖 The Story: "The Viva Defense & Master Demonstration"
> *"Confidence comes from clarity. Today is our rehearsal day! We review `03-VIVA-JS-CONCEPTS.md`, `SOUL.md`, and `CHALLENGES.md`. You can now answer any question about DOM selection, frame architecture, `structuredClone`, event listeners, or array methods with authority!"*

---

## 📋 Core Operating Rules Reminder

1. **Manual Handoff**: Every day, I will explain the story, teach the required JS concepts, specify the exact file path and purpose, and provide complete code snippets for you to paste. I will **never** silently alter your project files or execute terminal commands without your direct instruction.
2. **SOUL & CHALLENGES Tracking**: `SOUL.md` will track architectural progress, and `CHALLENGES.md` will record bugs and trade-offs to help you ace your viva presentation!
