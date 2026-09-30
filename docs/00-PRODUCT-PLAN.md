# AlgoVerse — Product Plan (v3 — FINAL SCOPE)

> **Scope updated for October 8–9, 2026 Deadline.**
>
> **Project Timeline: 30 Sept 2026 – 8/9 Oct 2026 (9–10 Days Sprint)** · **Target Completion & Viva Demo: 8–9 October 2026**
>
> Subject: **JavaScript** · Solo developer · **HTML + CSS + Vanilla JS** · No React · No framework · No backend · No build step
>
> Theme: **Graphite & Amber**
>
> **Important:** UI should look polished and modern, but CSS must stay intentionally simple and straightforward. JavaScript logic and the visualization engine architecture are the main learning focus.

---

## 🇮🇳 Ek line mein: yeh project hai kya?

AlgoVerse ek **DSA learning + visualization platform** hai — jahan users theory padh sakte hain, code dekh sakte hain, apna input de sakte hain, aur algorithms/data-structure operations ko **step-by-step visualize** kar sakte hain.

The core idea is:

> **Learn → Understand → Visualize → Control the execution**

Everything is built using **HTML, CSS and Vanilla JavaScript**.

---

# 1. How we work together

**I never write code directly into the user's files. The user does.**

For every feature:

1. Explain the concept in English + Hinglish.
2. Give the complete code in chat.
3. Tell the exact file and exact place where it goes.
4. Explain the important code line-by-line.
5. User pastes it, runs it and reports what happens.
6. Keep the code understandable enough for the user to explain it in a viva.

**Goal = comprehension, not speed.**

The user is a beginner in JavaScript, so do not hide important logic behind unnecessarily complicated abstractions.

---

# 2. FINAL SCOPE DECISION

There is **one CA-1 milestone**.

### ✅ Everything below must be part of the CA-1 version

- Home page
- Navbar and navigation
- Simple polished design system
- Dark theme
- Data Structures section
- Array
- String
- Stack
- Queue
- Linked List
- Sorting algorithms
- Searching algorithms
- Universal visualizer page
- Reusable visualization engine
- User input
- Random input generation
- Theory
- Intuition
- Code
- Time/space complexity
- Interactive animations
- Play/Pause
- Step Forward
- Step Backward
- Speed control
- Timeline/scrubber
- Reset
- Highlights/pointers
- Stats
- Narration
- Learn/Catalog section
- Search/filter in catalog
- **Predefined/instrumented Playground V1**
- Responsive layout
- GitHub Pages deployment
- README
- Basic project documentation

### ❌ The following are deliberately AFTER CA-1 / future scope

- **Full arbitrary-code Playground** where the user can write/paste any JS code and have AlgoVerse execute and visualize it.
- Tree / BST
- Heap
- Hash Map
- Graph + BFS/DFS
- Backtracking
- Dynamic Programming
- Race Mode
- Complexity Lab
- Quiz + progress system
- Advanced PWA/offline functionality
- Advanced accessibility polish
- Advanced code-execution features such as breakpoints/watch expressions
- C++ / Python / Java execution

The full arbitrary-code Playground is a **later advanced feature**, not part of the initial Playground.

---

# 3. 🇮🇳 The ONE idea that makes the visualizer possible

This is the most important architecture decision.

> **The algorithm does not animate the DOM. The algorithm produces a list of steps/frames. A separate player plays those frames. A renderer displays them.**

### Wrong approach

```text
for (...) {
    compare
    change DOM
    await sleep()
}
```

Problems:

- Hard to go backward.
- Speed control becomes messy.
- Algorithm becomes coupled to the UI.
- Every algorithm needs different animation code.
- Testing becomes difficult.

### Our approach

```text
Algorithm / Operation
        ↓
Generate Frames
        ↓
Player
        ↓
Renderer
        ↓
UI
```

The algorithm runs immediately and records important states.

Example:

```text
frames = [
    frame0,
    frame1,
    frame2,
    ...
]
```

The player simply moves through these frames.

This automatically gives us:

| Feature | How it works |
|---|---|
| Next step | `index++` |
| Previous step | `index--` |
| Scrubber | Set index from slider |
| Speed | Change playback clock |
| Pause | Stop playback |
| Reset | Return to frame 0 |
| Race Mode later | Play two frame sequences together |
| Stats | Read recorded operation counts |

---

# 4. The Frame

A frame represents **one visual state of the algorithm/operation**.

Example structure:

```js
{
    op: "compare",
    data: [...],
    highlights: {...},
    pointers: {...},
    codeLine: 12,
    narration: "34 is bigger than 12, so we compare the next pair.",
    stats: {
        comparisons: 4,
        swaps: 1
    },
    callStack: [...]
}
```

Possible fields:

| Field | Meaning |
|---|---|
| `op` | What happened: compare, swap, push, pop, visit, call, return |
| `data` | Copy of the current data/state |
| `highlights` | Elements currently highlighted |
| `pointers` | `i`, `j`, `low`, `high`, etc. |
| `codeLine` | Current line shown/highlighted |
| `narration` | Short explanation of the current step |
| `stats` | Comparisons, swaps, reads, writes, etc. |
| `callStack` | Used when a visualization needs recursion/calls |

### Important rule

Always store a **copy** of mutable data inside a frame.

```js
structuredClone(data)
```

Otherwise multiple frames may accidentally point to the same array/object.

---

# 5. Architecture

The project follows a simple layered architecture:

```text
PAGES
   ↓
CONTROLS
   ↓
RENDERERS
   ↓
PLAYER
   ↓
PRODUCERS
   ↓
CORE
   ↓
CONTENT
```

### Core idea

```text
Producer
    ↓
Frames
    ↓
Player
    ↓
Renderer
```

### Golden rules

1. Algorithm/producer code must not directly manipulate the DOM.
2. Renderer is responsible for displaying a frame.
3. Player controls which frame is currently visible.
4. CSS colors should come from CSS variables/tokens.
5. Do not create a separate HTML page for every algorithm.
6. Keep the architecture understandable for a beginner.

---

# 6. Universal Visualizer Page

We will use **one reusable visualizer page** instead of:

```text
bubble-sort.html
merge-sort.html
quick-sort.html
...
```

Instead:

```text
visualizer.html?topic=sorting&algo=quick-sort
```

The page reads the selected topic/algorithm and loads:

- producer
- renderer
- theory
- complexity
- code
- controls

### Main benefit

Adding a new algorithm should require mostly:

```text
1 new producer
+ registry entry
+ content
```

and **not a new HTML page**.

This is an important viva point.

---

# 7. Data Structures — CA-1

## 7.1 Array

### Operations

- Insert
- Delete
- Update
- Search
- Traverse

### UI

- Enter custom array
- Generate random array
- Choose operation
- Visualize operation
- Show code
- Show complexity
- Show narration

---

## 7.2 String

### Operations / demonstrations

- Reverse
- Palindrome check
- Character frequency
- Basic substring/search demonstration

### UI

- Enter string
- Run operation
- Step through visualization
- Show code
- Show complexity
- Show narration

---

## 7.3 Stack

### Operations

- Push
- Pop
- Peek
- isEmpty

### Visualization

Show:

- Stack elements
- Top
- Operation being performed
- Step-by-step changes

---

## 7.4 Queue

### Operations

- Enqueue
- Dequeue
- Front
- isEmpty

### Visualization

Show:

- Queue elements
- Front
- Rear
- Operation being performed
- Step-by-step changes

---

## 7.5 Linked List

### Operations

- Insert at head
- Insert at tail
- Insert at index
- Delete
- Search
- Traverse
- Reverse

### Visualization

Show:

```text
HEAD → [10] → [20] → [30] → NULL
```

Pointers should be visually understandable.

---

# 8. Algorithms — CA-1

## Sorting

Implement:

1. Bubble Sort
2. Selection Sort
3. Insertion Sort
4. Merge Sort
5. Quick Sort

For every algorithm:

- Theory
- Simple intuition
- Code
- Time complexity
- Space complexity
- Custom input
- Random input
- Step-by-step animation
- Play/Pause
- Step Forward/Backward
- Speed control
- Timeline
- Highlights
- Pointers where relevant
- Operation statistics
- Narration

---

## Searching

Implement:

1. Linear Search
2. Binary Search

For every algorithm:

- Theory
- Intuition
- Code
- Time/space complexity
- Custom/random input
- Target input
- Visualization
- Pointer/highlight movement
- Step controls
- Narration
- Stats

---

# 9. Visualization Engine

This is the **technical core of AlgoVerse**.

### Reusable components

```text
Frame
Player
Producer
Renderer
Transport Controls
```

### Player controls

- Play
- Pause
- Step Forward
- Step Backward
- Speed: 0.5x / 1x / 2x / 4x
- Timeline/scrubber
- Reset

### Visual feedback

- Current element highlight
- Comparison highlight
- Swap highlight
- Sorted highlight
- Pointers
- Current step number
- Narration
- Stats

The same engine should be reused across:

- Sorting
- Searching
- Array
- Stack
- Queue
- Linked List
- String

---

# 10. Playground V1 — CA-1

This is **NOT** the full CodeVisualizer-style arbitrary-code playground.

### CA-1 Playground scope

The Playground will contain **predefined/instrumented JavaScript programs**.

Example programs:

- Factorial
- Fibonacci
- Bubble Sort
- Sum of Array
- Reverse String
- FizzBuzz

The programs will generate execution frames that allow us to show:

- Current code line
- Variables
- Call Stack where applicable
- Console output
- Timeline
- Current execution step
- Play
- Pause
- Step Forward
- Step Backward
- Speed control
- Reset

### Important

The user is **not** expected to paste arbitrary JavaScript code into Playground V1.

The predefined programs exist to demonstrate the execution-visualization architecture.

---

# 11. Full Playground — FUTURE SCOPE

Later, we can build the advanced version:

```text
User writes/pastes JavaScript
          ↓
Tokenizer / Parser / Interpreter
          ↓
Execution states
          ↓
Call Stack
Variables
Console
Current line
Timeline
          ↓
Visualization
```

Potential future features:

- Arbitrary JS input
- Breakpoints
- Watch expressions
- Scope inspection
- More complete call-stack visualization
- More complete memory/state visualization
- Advanced JavaScript semantics

This is a **future advanced feature** and must not delay the CA-1 version.

---

# 12. Learn / Catalog

The Learn section should contain:

- Search
- Filter
- Topic cards
- Theory
- Intuition
- Code
- Complexity
- Visualize button

Example:

```text
Sorting
 ├── Bubble Sort
 ├── Selection Sort
 ├── Insertion Sort
 ├── Merge Sort
 └── Quick Sort
```

The same structure applies to Data Structures and Searching.

---

# 13. Home Page

The home page should communicate:

> **AlgoVerse — Learn. Understand. Visualize.**

### Sections

1. Navbar
2. Hero
3. What is AlgoVerse?
4. Key features
5. Data Structures preview
6. Algorithms preview
7. Playground preview
8. How it works
9. CTA to Learn / Visualizer
10. Footer

### UI philosophy

**Simple CSS, polished UI.**

We want:

- Clean layout
- Modern dark theme
- Good spacing
- Cards
- Buttons
- Consistent typography
- Subtle hover effects
- Small transitions
- Smooth visualization movement

We do **NOT** want:

- Complicated animation systems
- FLIP animation engineering
- Complex custom easing systems
- Excessive page animations
- Huge CSS files
- Fancy effects that are difficult to understand

The visualizer animations themselves are important; decorative UI animation is not.

---

# 14. CSS Complexity Rule

The user is a beginner in JavaScript and wants to spend most learning time on JS.

Therefore:

> **JavaScript = main focus. HTML/CSS = simple and understandable.**

Use:

- CSS variables
- Flexbox
- Grid
- Simple transitions
- Simple transforms
- Reusable classes

Avoid unnecessary CSS complexity.

The UI should look professional without requiring the user to spend weeks learning advanced CSS animation techniques.

---

# 15. Suggested Folder Structure

Start simple and expand only when necessary.

```text
AlgoVerse/
│
├── index.html
├── learn.html
├── visualizer.html
├── playground.html
├── about.html
│
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   └── components/
│
├── scripts/
│   ├── core/
│   │   ├── frame.js
│   │   ├── player.js
│   │   ├── clone.js
│   │   ├── rng.js
│   │   └── dom.js
│   │
│   ├── registry/
│   │   └── catalog.js
│   │
│   ├── producers/
│   │   ├── sorting/
│   │   ├── searching/
│   │   └── structures/
│   │
│   ├── renderers/
│   │   ├── bars.js
│   │   ├── cells.js
│   │   ├── stack.js
│   │   ├── queue.js
│   │   └── linkedlist.js
│   │
│   ├── controls/
│   │   ├── transport.js
│   │   ├── inputPanel.js
│   │   ├── codePanel.js
│   │   ├── narration.js
│   │   └── statsPanel.js
│   │
│   ├── content/
│   │   ├── theory/
│   │   ├── complexity.js
│   │   └── snippets/
│   │
│   └── pages/
│       ├── home.js
│       ├── learn.js
│       ├── visualizer.js
│       └── playground.js
│
├── docs/
├── DECISIONS.md
├── CONCEPTS.md
├── ARCHITECTURE.md
└── README.md
```

Do not create every folder on Day 1. Build incrementally.

---

# 16. Technical Rules

### Rule 1

Do not use `setTimeout` / `await sleep()` inside algorithms to create animations.

Algorithms produce frames. The player handles timing.

### Rule 2

Producers must not manipulate the DOM.

### Rule 3

Use CSS variables/tokens for colors.

### Rule 4

Do not create one HTML page per algorithm.

### Rule 5

Commit frequently.

### Rule 6

Record important JavaScript concepts in `CONCEPTS.md`.

### Rule 7

Record important architecture decisions in `DECISIONS.md`.

### Rule 8

If the user does not understand a line, explain it before moving on.

### Rule 9

Build **one feature end-to-end first**, then expand.

Recommended first milestone:

```text
Bubble Sort
    ↓
Frame generation
    ↓
Player
    ↓
Bars renderer
    ↓
Play/Pause
    ↓
Step Forward/Backward
    ↓
Speed
    ↓
Timeline
```

Once this works, reuse the engine for the remaining algorithms.

### Rule 10

Before Final Submission / Viva (Oct 8–9):

- Feature freeze
- Fix bugs
- Deploy
- Test
- Prepare README
- Rehearse viva/demo

---

# 17. JavaScript Learning Through AlgoVerse

AlgoVerse should intentionally help the user learn JavaScript.

| JS concept | Where it appears |
|---|---|
| `let`, `const`, data types | Everywhere |
| Conditionals | Algorithm logic |
| Loops | Algorithms + rendering |
| Functions | Producers + renderers |
| Arrow functions | Callbacks |
| Scope | Player + frames |
| Arrays | Algorithms + frame history |
| `push`, `pop`, `shift`, `unshift` | Stack, Queue |
| `splice`, `slice` | Array operations |
| `map`, `filter`, `reduce` | Catalog/stats |
| Objects | Frame/config objects |
| Destructuring | Frame/config handling |
| DOM selectors | Renderers + controls |
| DOM manipulation | Visualizations |
| Events | Buttons/forms/controls |
| Forms + validation | Input panel |
| localStorage | Theme/settings later |
| ES6 syntax | General project |
| Error handling | Input parsing |
| JSON | Content/configuration |

Do not force advanced JavaScript concepts into the project unless they are actually useful.

---

# 18. What makes AlgoVerse valuable

The strongest technical/resume points are:

### 1. Reusable Visualization Engine

One frame format + one player + reusable renderers.

### 2. Interactive DSA Learning

Not just static animations — users can control execution.

### 3. User-controlled Input

Users can enter their own arrays/strings/targets and visualize the operation.

### 4. Educational Layer

Theory + intuition + code + complexity + visualization in one place.

### 5. Predefined Execution Playground

A small execution-visualization system demonstrates:

- variables
- current line
- call stack
- console
- timeline

### 6. Vanilla JavaScript Architecture

No framework or backend.

The project demonstrates actual understanding of:

- DOM
- events
- state
- arrays/objects
- modules
- animation timing
- reusable architecture

### 7. Documentation

README + architecture + decisions + concepts.

---

# 19. FUTURE ROADMAP

These are deliberately postponed so the core project can be completed first.

## Phase 2 — Advanced Data Structures

- Tree
- BST
- Heap
- Hash Map
- Graph

## Phase 3 — Advanced Algorithms

- BFS
- DFS
- Backtracking
- Dynamic Programming

## Phase 4 — Advanced Visual Features

- Race Mode
- Complexity Lab
- More advanced statistics
- Quiz + progress
- PWA/offline support

## Phase 5 — Advanced Playground

- User-written arbitrary JavaScript
- Tokenizer
- Parser
- Evaluator/interpreter
- Execution tracing
- Breakpoints
- Watch expressions
- Advanced scope/call-stack inspection

### Deliberately out of scope for now

- AVL / Red-Black trees
- Trie
- Segment Tree
- A*
- MST
- C++ / Python / Java execution
- Login/accounts
- Leaderboard
- Multiplayer/collaborative mode
- Full JavaScript semantics
- Async/promises inside the custom interpreter

---

# 20. FINAL PRODUCT VISION

The final core AlgoVerse experience should be:

```text
                    ALGOVERSE
                        │
        ┌───────────────┼────────────────┐
        ↓               ↓                ↓
      LEARN          VISUALIZE       PLAYGROUND
        │               │                │
 Theory + Code     Algorithms + DS   Predefined JS
 Complexity        Interactive       Execution Demo
        │               │                │
        └───────────────┼────────────────┘
                        ↓
                Interactive DSA Learning
```

### Core Target Scope (Oct 8–9)

```text
Home
+
Learn/Catalog
+
Array
+
String
+
Stack
+
Queue
+
Linked List
+
5 Sorting Algorithms
+
2 Searching Algorithms
+
Universal Visualizer
+
Reusable Frame/Player/Renderer Engine
+
User Input + Random Input
+
Theory + Intuition + Code + Complexity
+
Play/Pause/Step/Speed/Timeline
+
Stats + Narration
+
Predefined Playground V1
+
Responsive UI
+
Deployment
+
README
```

### Future scope

```text
Full arbitrary-code Playground
Tree/BST
Heap
Hash Map
Graph
BFS/DFS
Backtracking
DP
Race Mode
Complexity Lab
Quiz/Progress
PWA/Offline
Advanced interpreter features
```

---

# 21. Final development philosophy

**Depth first, then width.**

Do not build 20 half-working features.

Build one feature completely:

```text
Algorithm
→ Frames
→ Player
→ Renderer
→ Controls
→ Input
→ Theory
→ Complexity
→ Polished UI
```

Then reuse that architecture everywhere.

The goal is not merely to have a website that looks good.

The goal is:

> **The user should understand every important line of JavaScript in AlgoVerse and be able to explain the architecture confidently in a viva.**
