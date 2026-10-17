# AlgoVerse — Interactive DSA Visualizer Studio

[![Tech Stack](https://img.shields.io/badge/Tech_Stack-Vanilla_HTML5_%7C_CSS3_%7C_JavaScript_(ES6+)-00d2ff.svg)](https://github.com/)
[![External Libraries](https://img.shields.io/badge/External_Libraries-Zero_(Pure_Vanilla)-success.svg)](https://github.com/)
[![Responsive](https://img.shields.io/badge/Design-Fully_Responsive_(Mobile_%7C_Tablet_%7C_Desktop)-purple.svg)](https://github.com/)
[![License](https://img.shields.io/badge/License-MIT-amber.svg)](https://github.com/)

> **AlgoVerse** is an interactive, browser-based Data Structures and Algorithms Visualizer Studio built with **100% Vanilla Web Technologies (HTML5, CSS3, JavaScript ES6+)**. Designed with a modern, high-contrast dark aesthetic, it features real-time step-by-step visual animation pipelines, side-by-side desktop studio ergonomics, and in-depth educational concept guides with Core Java implementations.

---

## Table of Contents
1. [Key Features](#key-features)
2. [Supported Data Structures & Algorithms](#supported-data-structures--algorithms)
3. [Studio Architecture (Side-by-Side Viewport)](#studio-architecture-side-by-side-viewport)
4. [Course Syllabus & Concept Alignment](#course-syllabus--concept-alignment)
5. [Tech Stack & Project Structure](#tech-stack--project-structure)
6. [Responsive Design Matrix](#responsive-design-matrix)
7. [Local Installation & Setup](#local-installation--setup)

---

## Key Features

- **Pure Vanilla Web Architecture**: Zero npm dependencies, zero frameworks (React/Vue/Angular), and zero external JS animation libraries. Powered entirely by browser-native DOM APIs, CSS keyframe animations, SVG vectors, and modern JavaScript modules.
- **Side-by-Side Desktop Studio Layout**: Controls and the visualizer canvas sit side-by-side on desktop displays (`>= 960px`), eliminating unnecessary vertical scrolling and optimizing learning ergonomics.
- **Frame Producer-Consumer Pipeline**: Algorithmic computation is completely decoupled from DOM rendering. Algorithms generate an array of immutable step snapshots (`frames[]`), which the player controller scrubs forward, backward, or auto-plays smoothly at configurable speeds (0.5x, 1.0x, 2.0x, 4.0x).
- **Synchronized VS Code Execution Sandbox**: Features live code highlighting synchronized with step execution for sorting algorithms, tracking pointer movements, comparisons, and swaps line by line.
- **Educational Concept Guides**: Every topic includes comprehensive theoretical foundations, real-world industry use cases, time & space complexity breakdowns ($O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$, $O(n^2)$, $O(2^n)$), and interview-ready Java 21 implementations.
- **Modern Visual Identity**: High-contrast dark theme with curated HSL color tokens, glassmorphic cards, neon accent highlights, and full support for dynamic light/dark theme switching.

---

## Supported Data Structures & Algorithms

### 1. Sorting Algorithms
- **Bubble Sort**: Adjacent element comparison and bubble-up bubbling passes with live pointer tracking.
- **Selection Sort**: Unsorted range scanning to locate minimum elements with in-place swap placement.
- **Insertion Sort**: Subarray sorted prefix maintenance with key extraction and element shifts.
- **Merge Sort**: Divide-and-Conquer visualization displaying recursive sub-array level partitions and synchronized merging passes.
- **Quick Sort**: Partitioning around pivot elements with left/right subarray grouping and final pivot positioning.
- *Features*: Custom comma-separated array input, Randomize generator, stacked pointer badges (`i`, `j`, `j+1`, `min`, `pivot`), time & space complexity chips, and synchronized line trace.

### 2. Searching Algorithms
- **Linear Search**: Sequential scan across any ordered or unordered dataset ($O(n)$ worst-case).
- **Binary Search**: Logarithmic search interval halving on sorted datasets ($O(\log n)$) with `low`, `mid`, and `high` pointer tracking.
- *Features*: Unified dual-mode tab switcher, custom array and search target inputs, auto-sort on randomize for binary search, and range highlight indicators.

### 3. Recursion Visualizer
- **Factorial (RAM Call Stack)**: Visualizes activation records, parameter frames, call depth, and stack unwinding.
- **Fibonacci (Recursion Tree)**: Visualizes binary branching recursion tree nodes, subproblem overlap, and return value accumulation.
- *Features*: Configurable input parameter $N$ ($1 \le N \le 6$), live $O(n)$ / $O(2^n)$ complexity chips, and execution status badges.

### 4. Hash Table
- **Visual Mechanics**: Polynomial rolling hash computation (`s[0]*31^(k-1) + ...`), modulo bucket distribution (`hash % 8`), and a live **Load Factor Meter** ($\lambda = n / m$).
- **Collision Resolution Modes**:
  - **Separate Chaining**: Linked bucket entries forming horizontal singly-linked node chains.
  - **Linear Probing**: Open addressing probing sequential index slots upon collision.
- *Operations*: Put (Key-Value), Get/Search, and Clear.

### 5. Stacks & Queues
- **Stack**: Glassmorphic vertical cylinder chamber with LIFO (Last-In, First-Out) physical gravity drop/pop animations, top pointer indicator, and overflow limits. Operations: `Push`, `Pop`, `Peek`, `Reverse`, and `Clear`.
- **Queue**: Horizontal conduit with dedicated Front (Exit) and Rear (Entry) indicators. Supports both **Linear Conduit** and **Circular Ring Buffer** (modulo pointer wraparound avoiding false overflow).

### 6. Linked Lists
- **Singly Linked List**: Unidirectional nodes with `data` and `next` pointer links ending at `null`.
- **Doubly Linked List**: Bidirectional nodes with `prev` and `next` pointer links.
- **Circular Linked List**: Closed ring buffer with an SVG loopback arc connecting tail back to head.
- *Operations*: Insert Head, Insert Tail, Insert at Index, Delete Head, Delete at Index, Search, and In-Place Reversal.

### 7. String Operations & Arrays
- **Strings**: UTF-16 character ribbon with 0-based indices, ASCII byte codes, Two-Pointer Reversal, Palindrome Verification, and Substring Search.
- **1D Arrays**: Contiguous RAM block representation with index-based access, insertion shifts, and deletion compaction.
- **2D Matrix Grid**: Logical 2D coordinate grid with Row-Major and Column-Major physical memory mapping visualizations.

---

## Studio Architecture (Side-by-Side Viewport)

AlgoVerse implements an ergonomic **Split-Workbench Layout** on desktop screens (`>= 960px`):

```
+-----------------------------------------------------------------------------------+
|  AlgoVerse Navigation Bar (Brand, Home, Learn, Visualizer, Theme Toggle)          |
+-----------------------------------------------------------------------------------+
|  [ INTERACTIVE WORKBENCH ]                                                        |
|                                                                                   |
|  +------------------------------+  +-------------------------------------------+  |
|  | LEFT: Operation Control Card |  | RIGHT: Visualizer Viewport Column         |  |
|  | - Mode Switcher Pills        |  | - Playback Transport Controls             |  |
|  | - Data Inputs & Configuration|  |   (Play, Pause, Prev, Next, Speed, Slider)|  |
|  | - Action Buttons             |  | - Step Narration Log                      |  |
|  | - Complexity Badges          |  | - Dynamic Visual Canvas                   |  |
|  | - Operation Color Legend     |  |   (Bars / Grid / Stack / Nodes / Ribbon)  |  |
|  +------------------------------+  +-------------------------------------------+  |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | ACTIVE CODE HIGH-LIGHTING SANDBOX (For Sorting Algorithms)                   |  |
|  +-----------------------------------------------------------------------------+  |
|  | EDUCATIONAL CONCEPT GUIDE & CORE JAVA IMPLEMENTATION                        |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## Tech Stack & Project Structure

```
AlgoVerse/
├── index.html                   # Landing Page & Feature Overview
├── learn.html                   # Algorithm Catalog & Theory Guide
├── visualizer.html              # Main Interactive Visualizer Studio
├── styles/
│   ├── tokens.css               # Design Tokens, Color Palette, Dark/Light Variables
│   ├── base.css                 # CSS Reset, Typography, Global Styles
│   ├── layout.css               # Navbar, Split-Workbench Grid, Footer
│   └── components.css           # Cards, Viewports, Buttons, Code Sandbox, Badges
├── scripts/
│   ├── core/                    # Engine Core (Player Controller, Frame Factory, Theme)
│   ├── producer/                # Algorithm Frame Producers
│   │   ├── sorting/             # Bubble, Selection, Insertion, Merge, Quick Sort
│   │   └── structures/          # Array, Matrix, Linked List, Stack, Queue, Hash, String
│   ├── renderers/               # Pure DOM Renderers
│   │   ├── bars.js              # Animated Bar Chart with Pointer Badges
│   │   ├── codepanel.js         # Line-by-Line Code Sandbox
│   │   ├── conceptGuide.js      # Structured Java Concept Guides
│   │   ├── hashTable.js         # Chaining & Probing Hash Visualizer
│   │   ├── recursion.js         # Call Stack & Recursion Tree Renderer
│   │   ├── stackQueue.js        # Stack Cylinder & Queue Conduit
│   │   └── stringRenderer.js    # Character Tile Ribbon
│   ├── controls/                # Input Panel Controller & Transport Controls
│   └── registry/                # Central Algorithm Catalog Metadata
```

---

## Local Installation & Setup

Because AlgoVerse is built entirely with standard ES6 Modules and native web technologies, no build tools or package managers are required.

### Quick Start:
1. Clone or download this repository:
   ```bash
   git clone https://github.com/<your-username>/AlgoVerse.git
   ```
2. Launch with any static web server:
   - **VS Code**: Right-click `index.html` and select **Open with Live Server**.
   - **Node.js**:
     ```bash
     npx serve .
     ```
   - **Python**:
     ```bash
     python -m http.server 5050
     ```
3. Open your browser to `http://localhost:5050` or the port displayed.

---

## License

This project is licensed under the MIT License.
