# AlgoVerse — Motion & Feel (Simplified & Clean)

> **Golden Rule:** JavaScript logic is the hero of AlgoVerse. CSS must stay lightweight, simple, and easy to understand.
> 
> You should spend your time understanding **JavaScript, state management, and algorithm frame logic**, NOT wrestling with complex CSS animation math.

---

## 🇮🇳 Ek Line Mein Guidelines

Hum chahte hain ki UI **clean, modern aur smooth** lage, par CSS code **chhota aur simple** rahe.

Iske liye hum sirf **standard CSS transitions** aur **2-3 CSS variables** use karenge. Koi complex cubic-bezier curves, zero FLIP JS calculations, aur koi complex multi-step CSS keyframes nahi!

---

## 1. Simple CSS Variables (in `tokens.css`)

Bas yeh 2 duration aur 1 easing variable kaafi hain poore project ke liye:

```css
:root {
  /* Simple Durations */
  --dur-fast: 150ms;   /* Hover, click, quick state changes */
  --dur-base: 250ms;   /* Element highlight, array bar changes, stack push/pop */

  /* Standard Easing */
  --ease-standard: ease; /* Simple, browser-native smooth movement */
}
```

---

## 2. Standard CSS Transitions (No Complex Keyframes)

Sabhi interactive UI elements (buttons, cards, visualizer bars) ke liye, simple `transition` property use karo:

```css
/* Clean Hover Effect */
.card, .btn {
  transition: transform var(--dur-fast) var(--ease-standard), 
              background-color var(--dur-fast) var(--ease-standard);
}

.btn:hover {
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0) scale(0.98);
}
```

---

## 3. Visualizer Animations (Keep JS & DOM Simple)

Visualizer mein elements (bars, stack items, queue cells, linked list nodes) ko animate karne ke liye:

1. **Array Bars / Highlighted Nodes:**
   Use simple inline CSS style updates or class toggling:
   ```css
   .bar {
     transition: height var(--dur-base) ease, background-color var(--dur-fast) ease;
   }
   
   .bar.active {
     background-color: var(--viz-compare);
     transform: scaleY(1.05);
   }
   ```

2. **Stack Push / Pop:**
   ```css
   .stack-item {
     transition: all var(--dur-base) ease;
   }
   /* When added, smooth fade-in and scale */
   ```

3. **Queue Enqueue / Dequeue & Linked List:**
   Standard CSS opacity + transform transitions are enough to show insertion and deletion clearly.

---

## 4. Basic Micro-Interactions (Simple & Effective)

| Element | CSS Effect | Why it works |
|---|---|---|
| **Buttons** | `transform: translateY(-2px)` on hover | Gives responsive tactile feel |
| **Active Code Line** | `background-color: var(--accent-subtle)` | Instantly highlights current line |
| **Number Counters / Stats** | Clean typography + `font-variant-numeric: tabular-nums` | Prevents layout jiggle |
| **Focus Ring** | `outline: 2px solid var(--accent)` | Clean accessibility without extra CSS |

---

## 5. Accessibility (Reduced Motion)

Bas yeh 4 lines add karo `base.css` ke end mein so that site accessible ho:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

---

## 6. Checklist: CSS Simple & JS Focused

- [x] CSS code is easy to read and under ~150 lines per CSS file.
- [x] Standard `transition: all 0.2s ease` used instead of complex bezier math.
- [x] No complex JavaScript FLIP libraries or complicated keyframe choreographies.
- [x] UI looks dark, sleek, Graphite & Amber, and smooth to use.
- [x] Time is saved for learning JavaScript arrays, closures, DOM manipulation, and algorithms!
