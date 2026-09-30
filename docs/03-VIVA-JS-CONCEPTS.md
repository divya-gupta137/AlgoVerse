# AlgoVerse — Viva Prep (JavaScript)

> Yeh file Day 1 pe padho, Day 9 pe dobara, aur Day 22 pe teesri baar.
> Tumhara evaluation **JavaScript** ka hai — site kitni sundar hai, us par nahi. Isliye project aisa
> banaya gaya hai ki har syllabus topic ka ek **asli, dikhane layak** ghar ho.

---

## 🇮🇳 Sabse pehle: ek rule

> **Jo line tum samajh nahi sakte, wo commit mat karo.**

Ek clever line jo tum explain nahi kar sakte, paanch simple lines se **zyada nuksaan** karti hai.
Agar main tumhe koi snippet doon aur usme kuch samajh na aaye — **rukо aur poocho.** Yeh time waste
nahi hai, yahi to marks hain.

---

## 1. Tumhara syllabus → project mein kahan hai

Yeh table yaad rakho. Viva mein jab bhi koi topic poocha jaaye, tumhe pata hona chahiye ki wo
project mein **kis file mein** hai.

| Unit | Topic | Project mein kahan | Kya bolna |
|---|---|---|---|
| 1–2 | `var`, `let`, `const`, data types | Har file | "Maine `const` default rakha; sirf jahan value badalni thi wahan `let`. `var` maine deliberately avoid kiya kyunki uska scope function-level hota hai, block-level nahi." |
| 3–4 | Operators, conditionals | Har sorting producer (`if (a[j] > a[j+1])`) | Comparison operators ka poora dhanda hi sorting hai |
| 5–6 | Loops (`for`, `while`, `for...of`, `for...in`) | Har algorithm; renderers ke loops | Bubble sort = nested `for`. Linked list traverse = `while`. Frames render = `for...of` |
| 7–8 | Functions, parameters, return | Producers aur renderers — sab functions | "Har producer ek function hai jo input leta hai aur frames ka array return karta hai" |
| 9–10 | Arrow functions, **scope**, arrays | `core/player.js`, callbacks, frames array | Arrow function `this` ko lexically leta hai — isliye event handlers mein safe hai |
| 11–12 | `push`, `pop`, `shift`, `unshift`, `splice`, `slice` | **Stack page** (push/pop) · **Queue page** (push/shift) · **Array page** (splice/slice) | "Maine in methods ko sirf use nahi kiya — inhe animate karke dikhaya hai" |
| 13–14 | `forEach`, `map`, `filter`, `reduce`, `sort` | Learn catalog filter/search · stats totals · legend | `filter` + `map` = search. `reduce` = total comparisons |
| 15–16 | Objects, nested objects, destructuring, **JSON** | **Frame object** · content files · localStorage | "Mera poora engine ek object shape pe chalta hai jise maine Frame kaha" |
| 17–18 | `querySelector`, `querySelectorAll`, `getElementById` | Har renderer aur control | `getElementById` fastest hai par `querySelector` flexible |
| 19–20 | DOM manipulation, create/remove, traversal | `renderers/bars.js` | `createElement`, `appendChild`, `classList.add`, `remove()` |
| 21 | Events, event object, `preventDefault()` | Transport buttons · keyboard shortcuts · graph node drag | `e.target`, `e.key`, `e.clientX`, event bubbling |
| 22 | **Forms, validation, error messages** | Input panel · quiz form | "Comma-separated numbers validate karta hoon, galat pe friendly message" |
| 23 | **localStorage, sessionStorage** | Theme · quiz progress · settings | 5MB limit, sirf strings store hoti hain isliye `JSON.stringify` |
| 24 | ES6: template literals, spread, rest, destructuring, default params | Frame building · config objects · DOM strings | |
| 25–26 | Callbacks, async, Promises, error handling | Player subscriptions · `try/catch` | |
| 27–28 | **`async`/`await`, Fetch API, JSON** | Day 21 — content JSON files se `fetch` karna | "Content JSON mein hai, `fetch` + `await` se load hota hai, `try/catch` se error handle" |
| 29–31 | Mini project: API + localStorage + forms | **AlgoVerse khud** | Teenon ek saath, 20 pages pe |

---

## 2. Syllabus se bahar ke concepts (bonus marks)

Yeh syllabus mein nahi hain, par project mein hain. Inhe bolna extra impress karta hai — **par sirf
tab jab tum sach mein samajh gaye ho.**

| Concept | Kahan | 🇮🇳 Ek line mein |
|---|---|---|
| **`requestAnimationFrame`** | `core/player.js` | Browser se poochta hai "agle frame pe mujhe bulao" — `setInterval` se smooth aur battery-friendly |
| **Closures** | `core/player.js`, DP memoization | Function apne bahar ke variables ko yaad rakhta hai, function khatam hone ke baad bhi |
| **Deep vs shallow copy** | `core/clone.js` | Shallow copy sirf upar ka level copy karta hai; andar wale objects same rehte hain |
| **Event loop** | Player loop | JS ek hi kaam ek waqt pe karta hai, isliye animation ko chhote tukdon mein todna padta hai |
| **`Map` vs Object** | Graph adjacency, hash map page | `Map` mein key kuch bhi ho sakti hai; object mein sirf string |
| **`Set`** | Graph visited nodes | Duplicates apne aap hat jaate hain |
| **Web Workers** | Complexity Lab (Day 20) | Background thread — UI freeze nahi hoti |
| **`<canvas>` 2D API** | Complexity Lab plot, graphs | Bahut saare elements ke liye DOM se tez |
| **FLIP animation** | Queue, list, array moves | Position change ko smooth banane ki technique |
| **Layout thrashing** | Renderers | Loop mein padho-likho-padho-likho karne se browser bar-bar measure karta hai — slow ho jaata hai |
| **Debounce** | Search box, resize | Har keystroke pe kaam mat karo, ruk ke ek baar karo |

---

## 3. 20 questions — practice bol ke karo, likh ke nahi

### Basics
1. `var`, `let`, `const` mein kya farak hai? TDZ kya hai?
2. Hoisting kya hai? Function declaration aur function expression dono hoist hote hain?
3. `==` aur `===` mein farak? Ek example do jahan `==` dhoka de.
4. Primitive aur reference types mein farak? *(Linked list ka example do — `a.next = b` mein copy
   nahi hoti, address jaata hai.)*
5. Closure kya hai? Apne project se ek dikhao.
6. Scope chain kya hai? *(Playground mein dikha do — literally screen pe hai.)*
7. Arrow function aur normal function mein `this` ka farak?
8. `null` aur `undefined` mein farak?

### Arrays & Objects (tumhare syllabus ka sabse bada hissa)
9. `slice` aur `splice` mein farak? *(Array page pe dikha do.)*
10. `map`, `filter`, `reduce` — teenon mein farak, aur kab kaunsa?
11. `push`/`pop` aur `shift`/`unshift` mein farak? Stack aur Queue se jodo.
12. JSON kya hai? `JSON.stringify` kyu zaroori hai localStorage ke liye?

### DOM & Events
13. `querySelector` aur `getElementById` mein farak?
14. Event bubbling kya hai? Event delegation kahan use kiya?
15. `preventDefault()` kya karta hai? Kahan use kiya?

### Async
16. Callback, Promise aur async/await — teenon ka farak?
17. `fetch` kya return karta hai? `.json()` bhi async kyu hai?

### Project-specific — ⭐ yeh sabse important hain
18. **"Play button dabane se lekar bar ka color badalne tak — poora raasta batao."**
    → Producer pehle hi chal chuka hai aur frames ka array bana chuka hai → Player ka
    `requestAnimationFrame` loop index badhata hai → us index ka frame nikalta hai → renderer ko
    deta hai → renderer sirf badle hue bars update karta hai → CSS transition animate karti hai.
    *(Isko itna practice karo ki bina soche nikal jaye. Yeh sabse acha question hai jo poocha ja
    sakta hai.)*
19. **"Tum peeche kaise jaa sakte ho? Zyadatar visualizers nahi jaa paate."**
    → Kyunki frames pehle se bane hue hain aur badalte nahi. Time bas ek array index hai.
20. **"React kyu nahi use kiya?"**
    → Animation aur canvas pe direct control chahiye tha, zero dependencies chahiye the, build step
    nahi chahiye tha, aur visualization ka poora state ek number (index) hai — virtual DOM se koi
    fayda nahi hota, sirf overhead badhta.
    *(Kabhi mat bolna "React kharab hai".)*

### Agar Playground poocha jaye
> **"Yeh sach mein chal raha hai ya recording hai?"**
> → "Sach mein chal raha hai. Program asli hai aur aapke diye input pe chalta hai. Bas maine probes
> haath se lagaye hain jo har step record karte hain. Automatic instrumentation — yani code padh ke
> khud probes lagana — wo mera next step hai, uspe kaam chal raha hai."

**Kabhi bhi zyada mat bolna.** Honest answer pass karta hai; pakda gaya exaggeration nahi.

---

## 4. Do experiments — inhe jaan-boojh ke todo

Yeh do cheezein karo. 10 minute lagenge aur yeh do concepts tumhe zindagi bhar yaad rahenge — aur
yeh dono viva ke sabse common questions hain.

**Experiment 1 — deep copy hata do.**
`core/clone.js` mein deep copy hata ke seedha array pass kar do. Ab chalao. Saare 187 frames bilkul
ek jaise dikhenge.
**Kyu:** kyunki sab frames **ek hi** array ko point kar rahe the, aur algorithm us array ko badalta
raha. Yeh **reference vs value** ka sabse strong example hai.

**Experiment 2 — `let` ko `var` bana do (loop ke andar, callback ke saath).**
Ek loop mein `setTimeout` ya event listener lagao aur `let i` ko `var i` kar do. Sab callbacks aakhri
value print karenge.
**Kyu:** `var` ka scope poora function hai, `let` ka scope har iteration alag hai.

---

## 5. Viva se 2 minute pehle — yeh 5 lines bolo

1. "AlgoVerse ek DSA learning platform hai — theory, code aur visualization ek jagah. Pure HTML,
   CSS aur vanilla JavaScript. Koi framework nahi, koi backend nahi, zero dependencies."
2. "Iska core idea yeh hai ki algorithm animate nahi karta. Algorithm turant chal ke steps ka ek
   array bana deta hai, aur player us array mein sirf index badalta hai."
3. "Isi wajah se main peeche jaa sakta hoon, kahin bhi scrub kar sakta hoon, speed badal sakta hoon,
   do algorithms ki race kara sakta hoon, aur operations count karke Big-O prove kar sakta hoon."
4. "Har renderer sirf teen cheezein karta hai — mount, render, destroy. Isliye koi bhi algorithm kisi
   bhi renderer ke saath chal sakta hai."
5. "Naya algorithm add karna ek file aur ek line ka kaam hai. Naya HTML zero, nayi CSS zero."

Yeh 5 lines + question 18 ka answer — bas itna aa gaya to tum ache marks laoge.
