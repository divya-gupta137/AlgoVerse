# Viva Study Note 01: Variables, LocalStorage & Design Tokens

## 1. Why `const` over `let` and `var`?
- `const` prevents accidental re-assignment bugs and makes code predictable.
- `let` is block-scoped (`{}`), preventing variable leaking.
- `var` is function-scoped and susceptible to hoisting issues.

## 2. How does `localStorage` work in AlgoVerse?
- `localStorage` persists key-value string data across page reloads.
- Complex objects must be serialized using `JSON.stringify()` before saving and deserialized using `JSON.parse()` when reading.

## 3. How does Theme Switching work without React?
- We set CSS variables on `:root` in `tokens.css`.
- Light theme overrides are scoped under `[data-theme="light"]`.
- `ThemeManager` in JS simply updates `document.documentElement.setAttribute('data-theme', 'light')` and persists the selection in `localStorage`.
