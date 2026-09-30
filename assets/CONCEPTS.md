# CONCEPTS.md

Har naya JavaScript / CSS / browser concept jo project mein use hota hai, uski entry yahan aayegi —
**usi din jab wo use kiya**.

**Kyu maintain karna:** viva se ek raat pehle 40 tutorials padhne se bachoge. Yeh file exactly wahi
concepts rakhti hai jo tumne **khud use kiye hain**, aur har ek ke saath yeh likha hai ki wo project
mein **kahan** hai. Viva mein "kahan use kiya?" ka jawab isse turant milta hai.

**Format:**

```
### <Concept naam>
**Day:** <kis din use kiya>  |  **File:** <kahan hai>
**Kya hai:** <2 line simple English/Hinglish>
🇮🇳 **Intuition:** <ek line — asli zindagi wala example ho to aur acha>
**Viva line:** <ek sentence jo tum bol sakte ho>
```

---

# Day 1 — Setup & Theme

### CSS Custom Properties (CSS variables)
**Day:** 1 | **File:** `styles/tokens.css`
**Kya hai:** `--accent: #FFB020` likh ke, use kahin bhi `var(--accent)` se use kar sakte ho. Ek jagah
badlo, poore project mein badal jaata hai.
🇮🇳 **Intuition:** Jaise phone mein contact save karna. Number badla to sirf contact update karo, har
message mein number nahi badalna padta.
**Viva line:** "Maine saare colors tokens mein rakhe, isliye theme switch sirf ek variable block
badalne se ho jaata hai."

### localStorage
**Day:** 1 | **File:** `scripts/core/storage.js`
**Kya hai:** Browser mein data save karne ka tarika jo tab band karne ke baad bhi rehta hai. Sirf
**strings** store hoti hain, aur limit ~5MB hai.
🇮🇳 **Intuition:** Browser ki chhoti si diary. Refresh karne pe bhi likha hua mit'ta nahi.
**Viva line:** "Theme aur progress localStorage mein save karta hoon, aur object store karne ke liye
`JSON.stringify` use karta hoon kyunki localStorage sirf strings leta hai."

### JSON.stringify / JSON.parse
**Day:** 1 | **File:** `scripts/core/storage.js`
**Kya hai:** `stringify` = object → string. `parse` = string → object.
🇮🇳 **Intuition:** Object ko courier karne ke liye pack karna (`stringify`), aur pahunchne pe kholna
(`parse`).

### try / catch
**Day:** 1 | **File:** `scripts/core/storage.js`
**Kya hai:** Jo code fail ho sakta hai use `try` mein rakho; fail hone pe `catch` chalega aur program
crash nahi hoga.
🇮🇳 **Intuition:** Private/incognito mode mein localStorage band ho sakta hai — bina `try/catch` ke
poori site ruk jaati.

### ES Modules (`import` / `export`)
**Day:** 1 | **File:** har JS file
**Kya hai:** Ek file mein function likho, `export` karo; doosri file mein `import` karke use karo.
Har file ka apna scope hota hai.
🇮🇳 **Intuition:** ⚠️ Modules `file://` pe kaam nahi karte — **Live Server** se hi chalana.
**Viva line:** "Modules ki wajah se har file ka apna scope hai, global variables ki gadbad nahi hoti."

---

<!-- Day 2 se aage ke concepts yahan add karte jaana.
     Har din ke plan mein "🧠 Concepts" section hai — usme se copy karke, apne shabdon mein likhna.
     Apne shabdon mein likhna zaroori hai — copy-paste se viva mein kaam nahi chalega. -->
