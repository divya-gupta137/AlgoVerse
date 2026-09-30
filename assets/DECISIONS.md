# DECISIONS.md

Har baar jab hum koi choice karte hain, uski ek entry yahan aayegi — **usi din**.

**Kyu maintain karna:** viva mein sabse zyada marks "Design Decisions & Problem Solving" wale hisse
mein milte hain — yani "tumne yeh aise kyu banaya?". Yeh file dheere-dheere tumhari viva script ban
jaayegi, aur usme extra time bilkul nahi lagega. Har entry likhne mein 60 second lagte hain.

**Format:**

```
## D-0XX · <chhota title>
**Date:** <date>
**Decision:** <kya decide kiya>
**Why:** <kyu>
**Rejected:** <kya nahi chuna aur kyu nahi>
🇮🇳 <ek line Hinglish mein>
```

---

## D-001 · Koi framework nahi — pure HTML, CSS, vanilla JS
**Date:** 13 Aug 2026
**Decision:** React / Vue / Angular kuch nahi. Koi build step nahi. Koi npm dependency nahi.
**Why:** Subject JavaScript hai, framework nahi. Animation aur canvas pe direct control chahiye.
Visualization ka poora state ek number (frame index) hai — virtual DOM ka koi fayda nahi.
Zero dependencies matlab kabhi kuch break nahi hoga, aur GitHub Pages pe seedha deploy ho jaata hai.
**Rejected:** React — overhead zyada, fayda zero, aur viva JS ka hai library ka nahi.
🇮🇳 Framework se yeh project **mushkil** hota, aasan nahi.

---

## D-002 · ⭐ Algorithm animate nahi karega — wo frames banayega
**Date:** 13 Aug 2026
**Decision:** Har algorithm turant poora chalega aur "frames" (har step ki photo) ka array return
karega. Ek alag `player` module us array mein index badal ke animate karega.
**Why:** Isse yeh sab **free** mil jaata hai: peeche jaana, scrubber, speed control, pause, race mode,
operations counting, aur bina DOM ke testing.
**Rejected:** Algorithm ke andar `await sleep(500)` — isme peeche jaana **impossible** hai, aur har
algorithm ka apna animation code likhna padta.
🇮🇳 Yeh poore project ka sabse important decision hai. Isi ek cheez ki wajah se 22 din mein sab ban
payega.

---

## D-003 · Frames plain functions se banenge, generators se nahi
**Date:** 13 Aug 2026
**Decision:** Producer ek normal function hoga jo `frames` array mein `push` karta hai aur end mein
array return karta hai.
**Why:** Beginner ke liye samajhna aur viva mein explain karna aasan. Result generator jaisa hi hai.
**Rejected:** `function*` + `yield` — code elegant hota par ek extra concept aa jaata jise explain
karna padta.
🇮🇳 Jo cheez tum explain nahi kar sakte, wo project mein rakhne ka koi fayda nahi.

---

## D-004 · Colors sirf CSS tokens mein
**Date:** 13 Aug 2026
**Decision:** Saare colors `styles/tokens.css` mein CSS variables ke roop mein. Kahin bhi hex code
hardcode nahi.
**Why:** Theme switch possible ho jaata hai, aur site consistent dikhti hai.
**Rejected:** Har component mein colors likhna — 40 files badalni padti.
🇮🇳 Agar naya theme add karte waqt kisi component ki CSS chhuni padi, matlab kahin hex code hardcode
reh gaya hai.

---

## D-005 · Ek hi `visualizer.html`, har algorithm ke liye alag page nahi
**Date:** 13 Aug 2026
**Decision:** `visualizer.html?topic=sorting&algo=quick-sort`. Page URL padhta hai, registry se
algorithm dhoondhta hai, aur producer + renderer + content jod deta hai.
**Why:** Naya algorithm = 1 nayi JS file + registry mein 1 line. Naya HTML zero.
**Rejected:** 25 alag HTML files — har design change ke liye 25 jagah edit.
🇮🇳 Viva mein bolne ke liye sabse strong point.

---

## D-006 · Playground = instrumented execution, compiler nahi
**Date:** 13 Aug 2026
**Decision:** Kuch asli programs rakhenge jinme humne haath se "probes" lagaye hain. Program user ke
input pe **sach mein chalega**.
**Why:** 2 din mein ban jaata hai, honest hai, aur wahi engine reuse karta hai. Compiler banane mein
2-3 hafte lagte.
**Rejected:** (a) `eval()` — sirf console output milta, stepping nahi. (b) Pehle se record ki hui
traces — input badalne pe toot jaati.
🇮🇳 Yeh fake nahi hai. Asli debuggers bhi aise hi kaam karte hain.

---

## D-007 · Interpreter alag side-quest rahega
**Date:** 13 Aug 2026
**Decision:** Custom JS interpreter roz 1–2 ghante ka optional kaam, aur **poori tarah alag** —
Session 13 tak Playground ko chhuega bhi nahi.
**Why:** Agar adhoora reh jaye to demo pe koi asar nahi padega.
**Rejected:** Interpreter ko main plan mein daalna — risk bahut zyada.
🇮🇳 Adhoora parser kabhi bhi ek complete project ko nuksaan nahi pahunchana chahiye.

---

## D-008 · Theme: Graphite & Amber (+ Solar Light)
**Date:** 13 Aug 2026
**Decision:** Default dark theme Graphite & Amber; light theme Solar Light.
**Why:** Ek hi accent color hai isliye galti karna mushkil. Amber bars pe saaf dikhta hai. Light theme
projector ke liye zaroori hai — dark theme projector pe dhul jaata hai.
**Rejected:** Neon Circuit — sundar hai par balance bigadna aasan hai.
🇮🇳 Baaki themes Phase 2 mein add ho jayenge, kyunki har theme sirf ek token block hai.

---

## D-009 · Animation ke liye `requestAnimationFrame`, `setInterval` nahi
**Date:** 13 Aug 2026
**Decision:** Player ka loop `requestAnimationFrame` + delta time se chalega.
**Why:** `setInterval` ka time drift hota hai, background tab mein galat chalta hai, aur screen refresh
se sync nahi hota.
🇮🇳 `rAF` browser se kehta hai "agle frame pe mujhe bulao" — isliye hamesha smooth rehta hai.

---

## D-010 · Frames mein data ki deep copy
**Date:** 13 Aug 2026
**Decision:** Har frame mein data ki `structuredClone` copy jaayegi, original reference nahi.
**Why:** Warna saare frames ek hi array ko point karenge aur sab identical dikhenge.
🇮🇳 Yeh bug tumhare saath ek baar hoga hi — aur yehi **reference vs value** ka sabse acha viva example hai.

---

<!-- Agli entry yahan se: D-011 -->
