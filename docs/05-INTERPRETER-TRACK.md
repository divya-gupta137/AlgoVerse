# AlgoVerse — Interpreter Track (Optional Side-Quest)

> 13 sessions, 1–2 hours each, Day 10 (23 Aug) → Day 22 (4 Sept).
> **Yeh optional hai.** Main track (daily plan) hamesha pehle. Agar ek din bhi peeche ho, isko bina
> guilt ke skip kar do.

---

## 🇮🇳 Yeh cheez hai kya?

Abhi hamara Playground aise kaam karta hai: humne kuch programs pehle se rakhe hain, aur unke andar
"probes" lagaye hain jo batate hain ki kya ho raha hai. Program **sach mein chalta hai**, par probes
humne haath se lagaye hain.

**Interpreter ka matlab hai:** user apna khud ka JavaScript code type kare, aur hamara program us
code ko **padh ke, samajh ke, khud chalaye** — line by line — aur har step dikhaye.

Yani hum JavaScript mein ek chhota JavaScript engine bana rahe hain.

### Kyu banana chahiye

Ek fresher ke portfolio mein yeh **bahut hi durlabh (rare)** cheez hai. "Maine ek tokenizer, parser
aur interpreter likha hai" — yeh sentence recruiter ka dhyaan kheenchta hai. Aur viva mein isse behtar
kuch nahi, kyunki yahi to JavaScript ke andar ka mechanism hai.

### Kyu shayad nahi banana chahiye

Yeh poore project ka sabse mushkil hissa hai. Parser mein chhoti si galti bhi confusing errors deti
hai. Agar tum abhi JS mein beginner ho, to yeh **20–25 ghante** le sakta hai.

### Safe rasta

Isko **poori tarah alag** rakho. Interpreter ka koi code Playground ke existing hisse ko chhue nahi.
Jab tak Session 13 na aa jaye, tab tak yeh sirf ek alag test page pe chale. Isse agar interpreter
adhoora bhi rahe, to tumhara demo bilkul safe rahega.

---

## Kaam kaise hota hai — 3 kadam

Socho tum ek angrezi vakya padh rahe ho:

```
Code:        let x = 5 + 3;

Kadam 1  TOKENIZER   →  shabdon mein todo
         [let] [x] [=] [5] [+] [3] [;]

Kadam 2  PARSER      →  vyakaran (grammar) samjho, tree banao
                            (declare x)
                                 |
                               (+)
                              /   \
                            5      3

Kadam 3  EVALUATOR   →  tree pe chal ke kaam karo
         "+ ka matlab jodna" → 8 → "x ka matlab dabba" → x = 8
```

Bas. Har asli JavaScript engine (V8 bhi) yahi teen kaam karta hai — bas bahut zyada optimization ke
saath.

---

## Kya support karenge, kya nahi

### ✅ Support karenge
`let`, `const`, `var` · numbers, strings, booleans · arrays · `+ - * / %` · `< > <= >= == != === !==` ·
`&& || !` · `if` / `else` · `while` · `for` · function declarations · function calls · **recursion** ·
`return` · `console.log()` · `array.length` · `array.push()` · `array.pop()` · array indexing `a[0]`

### ❌ Support NAHI karenge (aur yeh bolna bilkul theek hai)
Objects `{}` (arrays kaafi hain) · classes · `this` · arrow functions · closures as values ·
`async` / `await` / Promises · `try` / `catch` · destructuring · spread · template literals ·
regex · DOM · `import` / `export`

**Viva mein bolna:** *"Maine jaan-boojh ke ek subset chuna, taaki poori tarah samajh ke bana sakoon.
Poora JavaScript spec hazaron pages ka hai."* Yeh ek strong answer hai, kamzori nahi.

---

# Session-by-session plan

---

### 🧪 Session 1 — Day 10 (23 Aug) · Tokenizer ki shuruaat
**Kya:** Ek string (code) leke usko tokens ki list mein todna.
**Aaj bas itna:** numbers (`123`), identifiers (`x`, `myVar`), aur single-character operators (`+ - * / = ; ( ) { }`).
**Kaise:** Ek pointer (index) string pe chalao. Har character dekho — digit hai to poora number padho,
letter hai to poora word padho, warna operator hai.
**Test:** `let x = 5;` → 5 tokens milne chahiye.
**🇮🇳 Intuition:** Yeh bilkul waise hai jaise ek vakya ko shabdon mein todna. Abhi matlab nahi samajh
rahe — bas tukde bana rahe hain.

---

### 🧪 Session 2 — Day 11 (24 Aug) · Tokenizer complete
**Kya add karna:** keywords (`let`, `const`, `if`, `else`, `while`, `for`, `function`, `return`,
`true`, `false`) · strings (`"hello"`) · do-character operators (`==`, `!=`, `<=`, `>=`, `&&`, `||`) ·
comments skip karna (`//`).
**Zaroori:** Har token ke saath uska **line number** bhi store karo — yeh baad mein "kaunsi line
highlight karni hai" ke liye chahiye hoga.
**Test:** 10-line ka program tokenize karke console mein print karo.
**🇮🇳 Intuition:** `==` ko `=` aur `=` mein todna galat hoga — isliye do character aage dekhna
(*lookahead*) padta hai.

---

### 🧪 Session 3 — Day 12 (25 Aug) · AST + expressions ki shuruaat
**Kya:** Ab tokens ko **tree** mein badalna. `2 + 3 * 4` ka tree aisa banna chahiye ki `*` neeche ho
(pehle chale) aur `+` upar.
**Technique — recursive descent:** Har precedence level ke liye ek function.
`parseExpression()` → `parseTerm()` (`+`, `-`) → `parseFactor()` (`*`, `/`) → `parsePrimary()` (number, brackets)
**Test:** `2 + 3 * 4` ka tree console mein print karo, dekho `*` neeche hai ya nahi.
**🇮🇳 Intuition:** BODMAS ko code mein likhna. Jo pehle chalna chahiye wo tree mein neeche jaata hai,
kyunki tree hamesha neeche se upar solve hota hai.

---

### 🧪 Session 4 — Day 13 (26 Aug) · Expressions complete
**Kya add karna:** comparison (`<`, `>`, `==`), logical (`&&`, `||`), unary minus (`-5`), `!`,
brackets `( )`, aur variable names.
**Test:** `(2 + 3) * 4 > 15 && true` ka sahi tree banna chahiye.
**🇮🇳 Intuition:** Har naye operator ka bas ek naya precedence level chahiye. Pattern same rehta hai —
isliye ab tez lagega.

---

### 🧪 Session 5 — Day 14 (27 Aug) · Statements
**Kya:** Expression aur statement ka farak. `5 + 3` ek expression hai (value deta hai).
`let x = 5;` ek statement hai (kaam karta hai).
**Banao:** `parseStatement()` — `let`/`const` declaration, expression statement, block `{ }`.
**Aur:** `parseProgram()` — statements ki list.
**Test:** 3-line program ka poora AST ban jaye.
**🇮🇳 Intuition:** Program = statements ki list. Bas.

---

### 🧪 Session 6 — Day 15 (28 Aug) · Evaluator + variables
**Kya:** Ab tree pe chal ke asli kaam karna. Ek `evaluate(node)` function jo node ka type dekh ke
alag-alag kaam kare.
**Environment:** Ek object jo variables rakhta hai — `{ x: 5, y: 10 }`. Isko "scope ka dabba" samjho.
**Test:** `let x = 5; let y = x * 2; y` chalao → `10` milna chahiye.
**🇮🇳 Intuition:** **Yeh session sabse zyada satisfying hai** — pehli baar tumhara code kuch "chalayega".
Ab tak sirf structure ban raha tha.

---

### 🧪 Session 7 — Day 16 (29 Aug) · if/else + nested scope
**Kya:** `if`/`else` chalana. Aur har block `{ }` ka apna naya Environment, jo apne parent se juda ho.
**Scope chain:** Variable dhoondhte waqt pehle apne dabbe mein dekho, na mile to parent ke dabbe mein,
phir uske parent mein... yahi **scope chain** hai.
**Test:** `let x = 1; if (x > 0) { let y = 2; x = x + y; } x` → `3`
**🇮🇳 Intuition:** Ab tumne wo cheez khud banayi jo JavaScript andar karta hai. Viva mein "scope chain
kya hai" ka jawab tumhare paas **code mein** hoga.

---

### 🧪 Session 8 — Day 17 (30 Aug) · Loops
**Kya:** `while` aur `for`.
**⚠️ Bahut zaroori:** Ek step counter rakho aur 1 lakh steps ke baad khud rok do. Warna user ka
`while(true)` browser hang kar dega — aur demo ke beech mein yeh hua to bura hoga.
**Test:** `let s = 0; for (let i = 0; i < 5; i = i + 1) { s = s + i; } s` → `10`
**🇮🇳 Intuition:** Loop matlab: condition check karo → body chalao → phir se. Bas recursion ya while
loop se implement kar do.

---

### 🧪 Session 9 — Day 18 (31 Aug) · Functions + call stack ⭐
**Kya:** Function declaration, function call, `return`.
**Kaise:** Call pe — naya Environment banao (parent = jahan function define hua tha), parameters ko
arguments se bind karo, body chalao, `return` pe value wapas do.
**Call stack:** Ek array rakho — call pe push, return pe pop. **Yeh seedha tumhare Day 11 wale call
stack panel se jud jayega.**
**Test:** `function add(a, b) { return a + b; } add(2, 3)` → `5`
**🇮🇳 Intuition:** **Yeh interpreter ka sabse important din hai.** Aaj ke baad wo sab possible ho
jayega jo interesting hai. Aur aaj tumhe sach mein samajh aayega ki call stack hota kya hai.

---

### 🧪 Session 10 — Day 19 (1 Sept) · Recursion + console.log
**Kya:** Recursion apne aap kaam karega agar Session 9 sahi hua — kyunki har call ka apna Environment hai.
**Add karo:** `console.log()` — ek built-in function jo output list mein line daal de.
**Aur:** recursion depth limit (jaise 1000) — stack overflow se bachne ke liye.
**Test:** `function fact(n) { if (n <= 1) { return 1; } return n * fact(n - 1); } console.log(fact(5))` → `120`
**🇮🇳 Intuition:** Agar aaj factorial chal gaya, to samjho tumne ek chhota JavaScript engine bana liya.
Yeh sach mein badi baat hai.

---

### 🧪 Session 11 — Day 20 (2 Sept) · Arrays
**Kya:** Array literals `[1, 2, 3]` · indexing `a[0]` · assignment `a[0] = 5` · `.length` ·
`.push()` · `.pop()`.
**Test:** Interpreter ke andar bubble sort chala do. **Agar yeh chal gaya to tum jeet gaye.**
**🇮🇳 Intuition:** Ab user apna khud ka sorting algorithm type karke chala sakta hai — aur wo poore
AlgoVerse engine mein dikhega.

---

### 🧪 Session 12 — Day 21 (3 Sept) · Step-by-step banao
**Kya:** Ab tak interpreter poora chal ke answer deta hai. Ab use har statement pe **frame nikalne
wala** banao — wahi frame format jo poore project mein use ho raha hai (`codeLine`, `vars`,
`callStack`, `stdout`).
**Kaise (aasan tarika):** Evaluator ke andar hi, har statement chalane se pehle, ek frame array mein
push kar do. Bilkul waise hi jaise Day 10 ke probes karte the.
**🇮🇳 Intuition:** Aaj interpreter tumhare **already bane hue player** se jud jayega — play, pause,
scrubber, sab free mein mil jayenge. Yeh Day 3 wale decision ka aakhri inaam hai.

---

### 🧪 Session 13 — Day 22 (4 Sept) · Playground se jodo
**Kya:**
1. Playground mein ek naya tab — **"Run your own code (Beta)"**
2. Textarea + Run button
3. Error handling — tokenizer/parser/evaluator ki har error ko pakdo aur line number ke saath
   friendly message dikhao ("Unexpected token '}' on line 7")
4. Ek chhota panel — "Supported: let, const, if, while, for, functions, arrays… Not supported: objects,
   classes, async…"
5. **"Beta" badge zaroor lagao** — expectations set karta hai aur professional lagta hai

**🇮🇳 Intuition:** Beta badge kamzori nahi hai. Bade products bhi lagate hain. Aur agar demo mein kuch
edge case toota, to wo "known limitation" hai, "bug" nahi.

---

## Agar peeche ho jao

| Kahan tak pahunche | Kya bolna |
|---|---|
| Session 1–2 | "Tokenizer ready hai, parser chal raha hai" — future scope |
| Session 3–5 | "Tokenizer aur parser ban gaye, AST generate ho raha hai" — dikhao! AST ka JSON print karna bhi impressive hai |
| Session 6–8 | "Expressions, variables, if-else aur loops chal rahe hain" — yeh already bahut hai |
| Session 9–11 | "Functions aur recursion chal rahe hain" — **yeh already ek real achievement hai**, demo mein zaroor dikhao |
| Session 12–13 | Poora feature — Playground mein integrate karke dikhao |

**Har stage pe ek working demo hai.** Isliye yeh side-quest kabhi "waste" nahi jayega — jahan bhi
ruke, wahan tak ka kaam dikhane layak hai.
