# AlgoVerse — Project Soul (`SOUL.md`)

> **Project Identity:** AlgoVerse — Interactive DSA Learning, Visualization Platform & Predefined JavaScript Execution Playground.
> **Subject:** JavaScript (Vanilla JS, HTML, CSS — No React, No Frameworks, No Backend, No Build Step).
> **Developer:** Solo Beginner Developer (Guided Step-by-Step by Antigravity Tutor).
> **Target Completion:** 8–9 October 2026 (Viva Defense: 9 October 2026).

---

## 🏛️ Core Architecture

AlgoVerse follows a decoupled, frame-based visualization pipeline:

```text
Algorithm / Data Structure Operation
                ↓
    Frame[] (State Snapshots)
                ↓
              Player
                ↓
             Renderer
                ↓
                UI
```

### Key Architectural Pillars
1. **Frame-Based Execution**: Algorithms do NOT touch the DOM directly. They produce an array of snapshot frames (`Frame[]`), each containing `{ op, data, highlights, pointers, codeLine, narration, stats }`.
2. **State Isolation**: Every frame creates a deep snapshot using `structuredClone(data)` to prevent reference mutation bugs.
3. **Universal Visualizer**: One single `visualizer.html` page consumes URL search parameters (`?topic=sorting&algo=bubble-sort`) to render any algorithm dynamically.
4. **Lightweight & Beginner Friendly**: Simple CSS transitions and clean modular ES modules (`<script type="module">`).

---

## 📍 Current Project Progress

- [x] Scope definition & master product plan (`docs/00-PRODUCT-PLAN.md`)
- [x] Simplified lightweight motion guidelines (`docs/04-MOTION-AND-FEEL.md`)
- [x] Master Day-by-Day Implementation Plan & Syllabus Mapping (`IMPLEMENTATION.md`)
- [x] Operational Directives & Tutor Protocol established (`rules.md`)
- [x] `.gitignore` & MIT `LICENSE` configured
- [x] Git repository initialized & pushed to GitHub (`main` branch tracking `origin/main`)
- [🔄] **Day 1 (IN PROGRESS)**: Design Tokens (`tokens.css`), Base Reset (`base.css`), Layout (`layout.css`), Storage Wrapper (`storage.js`), Theme System (`theme.js`), and `index.html` skeleton.

---

## 🎯 Next Logical Step

**Day 1 Implementation (Manual Handoff)**:
- User creates `styles/tokens.css`, `styles/base.css`, `styles/layout.css`.
- User creates `scripts/core/storage.js` and `scripts/core/theme.js`.
- User creates `index.html`.
- User creates theory note `/theory_concepts/01_variables_storage_and_tokens.md`.
- User tests theme toggle and commits Day 1.

---

## 🔒 Important Constraints

- **No Frameworks**: Pure HTML5, CSS3, and Vanilla ES6 JavaScript.
- **Manual Handoff**: The AI tutor provides explanations and exact code snippets; the developer pastes, tests, and commits to maintain complete comprehension.
- **Viva Defense Focus**: Every line of code and architectural choice must be defendable in a viva evaluation.
