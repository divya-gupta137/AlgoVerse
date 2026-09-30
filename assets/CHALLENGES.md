# AlgoVerse — Technical Challenges & Viva Q&A Journal (`CHALLENGES.md`)

> This document tracks major technical challenges, root causes, design trade-offs, and viva Q&A points encountered during the development of AlgoVerse.

---

## 1. Frame State Mutation vs. Independent Snapshots

### The Bug / Challenge
When recording algorithm steps in a loop, pushing `array` directly into frame objects (`frames.push({ data: array })`) resulted in every frame showing the final sorted array! Moving backward or seeking to earlier frames displayed incorrect states.

### Root Cause / Trade-off
In JavaScript, arrays and objects are **reference types**. Assigning `data: array` stores a memory reference to the same array object rather than a copy. As the algorithm mutates the array in later iterations, all previous frame objects mutate simultaneously.

### Solution
We use the modern native browser API `structuredClone(array)` (or shallow copy `[...array]` for flat arrays) when recording each frame:
```javascript
frames.push({
  op: "compare",
  data: structuredClone(array), // Creates an isolated memory copy
  highlights: [i, j],
  codeLine: 12
});
```

---

## 2. Decoupling Execution Timing from Algorithm Logic

### The Bug / Challenge
Using `setTimeout` or `await sleep(500)` directly inside sorting loops makes play/pause, step-forward, step-backward, speed adjustment, and scrubbing slider controls extremely messy and bug-prone.

### Root Cause / Trade-off
Embedding timing (`sleep`) inside algorithm loops couples execution speed to computation logic. The call stack remains trapped inside the async loop.

### Solution
We adopted the **Frame-Based Architecture**:
1. The algorithm function runs synchronously and instantly returns an array of `Frame` objects.
2. A separate `Player` class manages a timer clock (`setInterval`), keeping track of `currentFrameIndex`.
3. Transport controls simply change `currentFrameIndex` (`index++`, `index--`, `index = target`) and trigger the `Renderer` to display that frame.

---

## 3. Dynamic Page Routing without Frameworks or Duplicate HTML

### The Bug / Challenge
Creating a separate `.html` file for every single algorithm (`bubble-sort.html`, `merge-sort.html`, `binary-search.html`) would result in massive HTML duplication and poor maintainability across 15+ topics.

### Root Cause / Trade-off
Without server-side routing or single-page application (SPA) frameworks like React Router, standard websites often create duplicate pages.

### Solution
We built a **Universal Visualizer Page** (`visualizer.html`) using browser-native `URLSearchParams`:
```javascript
const urlParams = new URLSearchParams(window.location.search);
const topic = urlParams.get('topic'); // e.g. "sorting"
const algo = urlParams.get('algo');   // e.g. "bubble-sort"
```
`visualizer.js` reads these query parameters, dynamically imports the corresponding algorithm producer and renderer, and loads the theory/code snippet without reloading the layout framework!
