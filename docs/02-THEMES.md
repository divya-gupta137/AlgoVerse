# AlgoVerse — Theme

## ✅ LOCKED: Theme A — Graphite & Amber (+ Solar Light for the projector)

Yeh decide ho chuka hai. Day 1 pe **Theme A ke tokens** aur **Theme E (Solar Light)** dono banao.
Theme B, C, D neeche isliye rakhe hain kyunki:

1. Har theme sirf ~28 CSS variables ka block hai — Phase 2 mein 20 minute mein add ho jaayenge
2. Demo mein 4 themes ka switcher dikhana bahut acha lagta hai, aur mehnat almost zero hai
3. Woh khud proof hai ki token system sahi bana hai

🇮🇳 **Graphite & Amber kyu sabse acha choice hai:** yeh sabse "mehenga" dikhta hai (Linear/Vercel
jaisa), ek hi accent color hai isliye galti karna mushkil hai, aur amber sorting bars pe bahut saaf
dikhta hai. Neon theme sundar hai par usme balance bigadna aasan hai.

---

# All theme options (reference)

Target audience: coders. So the look should read *developer tool*, not *ed-tech startup*.
Reference feel: Linear, Vercel, Raycast, GitHub Dark, a good IDE — **sleek, dark, high-contrast,
low-chrome, one confident accent color**.

Everything here is plain CSS custom properties. No preprocessor, no framework, no build step.
Each theme is **one block of ~28 variables**. That is the whole point of the token system: after
Day 1, adding a fourth theme costs you 15 minutes and looks like a huge feature in the demo.

---

## 0. Rules that apply to every theme

**Never write a hex code outside the token file.** If a component has a literal color in it,
theming is already broken.

### Token layers
1. **Primitive** — raw palette (`--gray-900`, `--amber-400`). Rarely used directly.
2. **Semantic** — what it *means* (`--bg`, `--surface`, `--text`, `--accent`, `--border`). Components
   only ever use these.
3. **Visualizer semantic** — `--viz-idle`, `--viz-compare`, `--viz-swap`, `--viz-pivot`,
   `--viz-sorted`, `--viz-visited`, `--viz-path`, `--viz-error`.

That third layer is the one students forget, and then their bars are invisible in light mode.
**Define it per theme from day one.**

### Non-color tokens (identical across all themes)

| Group | Scale |
|---|---|
| Space | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px |
| Radius | 6 (inputs) · 10 (buttons) · 16 (cards) · 999 (pills) |
| Type scale | 12 · 14 · 16 · 18 · 24 · 32 · 48 · 64 px |
| Line height | 1.2 headings · 1.6 body |
| Motion | fast 120ms · base 200ms · slow 320ms · `cubic-bezier(.2,.8,.2,1)` |
| Container | 1200px max, 24px gutters |
| Border | 1px hairline — thin borders read as "premium", thick ones read as "bootstrap" |
| Elevation | shadow-1 subtle, shadow-2 for popovers. **In dark themes, elevate with lighter surfaces, not shadows.** |

### Typography (all themes)
- **Headings:** Space Grotesk *or* Sora — geometric, slightly technical, not overused
- **UI / body:** Inter — the safe, excellent default
- **Code / numbers / data:** JetBrains Mono — also use it for step counters, stats, and array indices;
  monospaced numbers stop the UI jittering as values change (`font-variant-numeric: tabular-nums`)

That mono-for-data touch is small and makes the whole product feel engineered.

### Accessibility floor
Body text ≥ 4.5:1 contrast, large text and UI borders ≥ 3:1. Never distinguish algorithm states by
color alone — pair color with a label, a pointer caret, or a border. Support
`prefers-reduced-motion` by cutting transitions to 0ms (the scrubber still works, so nothing is lost).

---

## Theme A — **Graphite & Amber** ⭐ recommended default

Near-black graphite, hairline borders, a single warm amber accent. Reads like Linear/Vercel.
The most *professional* of the set: expensive-looking, effortless to keep consistent, and the amber
pops beautifully against sorting bars. Hardest theme to make ugly.

| Token | Value |
|---|---|
| `--bg` | `#0B0C0E` |
| `--surface` | `#131519` |
| `--surface-2` | `#1A1D22` |
| `--border` | `#24282F` |
| `--border-strong` | `#333944` |
| `--text` | `#E8EAED` |
| `--text-muted` | `#9BA1AA` |
| `--accent` | `#FFB020` |
| `--accent-hover` | `#FFC24D` |
| `--accent-contrast` | `#0B0C0E` (text on amber) |
| `--accent-soft` | `#3A2A0F` (tinted fills) |
| `--success` | `#3FB950` · `--danger` `#F85149` · `--info` `#58A6FF` · `--warning` `#D29922` |
| `--viz-idle` | `#3A414B` |
| `--viz-compare` | `#58A6FF` |
| `--viz-swap` | `#F85149` |
| `--viz-pivot` | `#FFB020` |
| `--viz-sorted` | `#3FB950` |
| `--viz-visited` | `#A371F7` |
| `--viz-path` | `#F0883E` |

**Signature details:** 1px `--border` on every card, no shadows; amber only on the *active* element
(never two ambers on screen); a thin amber progress line under the transport bar.

---

## Theme B — **Midnight Terminal**

Phosphor-green on near-black. Unapologetically "hacker", but modern rather than retro — the trick is
to use mono type and green accents while keeping generous spacing and a normal sans for body copy.
Cheapest theme to make *cool*, easiest to make *tacky*. Keep the glow whisper-subtle.

| Token | Value |
|---|---|
| `--bg` | `#06090A` |
| `--surface` | `#0C1213` |
| `--surface-2` | `#111A1A` |
| `--border` | `#182422` |
| `--text` | `#D6E4DE` |
| `--text-muted` | `#7C918A` |
| `--accent` | `#34D399` |
| `--accent-hover` | `#5EEAD4` |
| `--accent-contrast` | `#04120C` |
| `--accent-soft` | `#0D2A20` |
| `--viz-idle` | `#26332F` · `--viz-compare` `#7DD3FC` · `--viz-swap` `#FB7185` · `--viz-pivot` `#FDE047` · `--viz-sorted` `#34D399` · `--viz-visited` `#C084FC` |

**Signature details:** a faint 1px dot-grid page background; a blinking block caret after the hero
headline; `text-shadow: 0 0 12px` on the accent **only** (never on body text); section headers
prefixed with `$` or `//`.

---

## Theme C — **Neon Circuit**

Deep indigo-black with a cyan→magenta gradient. The most *photogenic* theme — screenshots for your
README and LinkedIn post will look best in this one. Slightly higher risk of looking like a template
if you gradient everything.

| Token | Value |
|---|---|
| `--bg` | `#0A0713` |
| `--surface` | `#140F24` |
| `--surface-2` | `#1C1533` |
| `--border` | `#251C40` |
| `--text` | `#EDE9FE` |
| `--text-muted` | `#9C93C4` |
| `--accent` | `#22D3EE` (cyan — primary) |
| `--accent-2` | `#E879F9` (magenta — secondary only) |
| `--accent-gradient` | `linear-gradient(135deg, #22D3EE, #E879F9)` |
| `--accent-contrast` | `#0A0713` |
| `--viz-idle` | `#332A52` · `--viz-compare` `#22D3EE` · `--viz-swap` `#E879F9` · `--viz-pivot` `#FACC15` · `--viz-sorted` `#4ADE80` · `--viz-visited` `#818CF8` |

**Signature details:** gradient only on the hero headline and on card *borders* (a 1px gradient
border via `background-clip`), never on large fills; frosted glass panels
(`backdrop-filter: blur(12px)` over a translucent surface); a soft radial glow behind the hero.
**Rule:** magenta is never used for body text — accents and borders only.

---

## Theme D — **Nord Studio**

Cool arctic slate-blue, muted and calm (based on the Nord palette). The most *readable* and the most
"senior engineer" of the four — lower contrast, no flash. Best if you'll be staring at it for hours
or if your evaluator dislikes flashy UI.

| Token | Value |
|---|---|
| `--bg` | `#242933` |
| `--surface` | `#2E3440` |
| `--surface-2` | `#3B4252` |
| `--border` | `#4C566A` |
| `--text` | `#ECEFF4` |
| `--text-muted` | `#A8B1C2` |
| `--accent` | `#88C0D0` |
| `--accent-2` | `#81A1C1` |
| `--accent-contrast` | `#242933` |
| `--viz-idle` | `#4C566A` · `--viz-compare` `#88C0D0` · `--viz-swap` `#BF616A` · `--viz-pivot` `#EBCB8B` · `--viz-sorted` `#A3BE8C` · `--viz-visited` `#B48EAD` |

**Signature details:** soft 16px radii, generous whitespace, `--surface-2` for elevation instead of
shadows, muted-but-clearly-distinct visualizer colors.

---

## Theme E — **Solar Light** (the projector twin — build this, don't skip it)

Warm paper, ink text, one indigo accent. This is **not optional**: dark themes wash out on lecture
projectors, and you will be demoing on one. Pairs with any theme above.

| Token | Value |
|---|---|
| `--bg` | `#FBFAF7` |
| `--surface` | `#FFFFFF` |
| `--surface-2` | `#F3F1EC` |
| `--border` | `#E3DFD6` |
| `--text` | `#14171A` |
| `--text-muted` | `#5C6570` |
| `--accent` | `#4F46E5` (use `#B45309` amber instead if pairing with Theme A) |
| `--accent-contrast` | `#FFFFFF` |
| `--viz-idle` | `#CBD5E1` · `--viz-compare` `#2563EB` · `--viz-swap` `#DC2626` · `--viz-pivot` `#B45309` · `--viz-sorted` `#15803D` · `--viz-visited` `#7C3AED` |

Note the visualizer colors are **darker** here — the same blue that pops on black disappears on white.
This is exactly why the viz layer needs its own tokens.

---

## Plan

| When | What |
|---|---|
| **Day 1** | Theme A (Graphite & Amber) — default dark · Theme E (Solar Light) — projector twin |
| **Phase 2 (free time)** | Theme B (Midnight Terminal), Theme D (Nord Studio) — ~20 min each |
| **If you want extra flair** | Theme C (Neon Circuit) — best for README screenshots |

Sab tokens ke through hain, isliye theme add karna **kabhi** kisi component ko chhune ki zaroorat
nahi degi. Agar kisi naye theme ke liye component CSS badalni padi → matlab kahin ek hex code hardcode
reh gaya hai. Wahi bug hai, dhoondh ke theek kar do.

---

## Component styling cues (any theme)

| Element | Treatment |
|---|---|
| Cards | `--surface`, 1px `--border`, 16px radius, no shadow in dark; lift on hover with `--border-strong` + 1px translate |
| Buttons | Primary = accent fill + `--accent-contrast` text. Secondary = transparent + border. Ghost = text only |
| Focus ring | 2px accent outline + 2px offset — visible in **every** theme, never `outline: none` |
| Code panel | `--surface-2`, mono, dimmed line numbers, active line = `--accent-soft` background + a 2px accent left bar |
| Transport bar | Sticky bottom, translucent + blur, tabular-nums for the step counter |
| Bars/nodes | Color = state, transition `--motion-base`; label under bar in mono |
| Legend | Always visible next to the canvas: swatch + state name. Cheap, and it makes the viz self-explanatory to an examiner |
| Empty state | Icon + one line + a "Randomize" button — never a blank rectangle |
| Nav | Sticky, translucent + blur, 1px bottom border that appears only after scroll |

**Icons:** inline SVG only (no icon library — it would break "zero dependencies"). ~15 icons is plenty:
play, pause, step-fwd, step-back, reset, shuffle, sun, moon, code, book, chevrons, search, share, check, x.

**Fonts:** self-host the woff2 files in `assets/fonts/` rather than using a Google Fonts `<link>` —
it makes the site work offline (needed for the PWA) and removes a third-party request. Always declare
a system fallback stack so nothing breaks if a font fails.
