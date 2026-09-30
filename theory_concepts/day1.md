📝 AlgoVerse Day 1 — Complete Markdown Notes
Below are your proper revision notes for everything we've covered so far.
1. Variables in JavaScript
Intuition
A variable is like a named box that stores some information.
Definition
A variable is a named storage location used to hold a value that can be accessed and, depending on how it is declared, reassigned.

const
Used when a variable should not be reassigned.
let
Used when a variable's value may change.
var
Older JavaScript variable declaration mechanism. It is function-scoped and has behavior that can lead to confusing bugs, so modern JavaScript generally prefers let and const.
2. Block Scope
Intuition
A block is like a restricted room. Variables declared inside the room belong to that room.
Definition
Block scope means that a variable is accessible only within the { } block where it was declared.

let and const are block-scoped.
Common blocks are created by:
- if
- for
- while
- standalone { }
3. localStorage
Intuition
localStorage is like a small storage cupboard inside the browser that allows a website to remember information even after the page is refreshed.
Definition
localStorage is a Web Storage API that provides persistent key-value storage in the user's browser.

It survives:
- Page refreshes
- Closing and reopening the browser
Common operations:
- setItem() → stores data
- getItem() → retrieves data
- removeItem() → removes data
- clear() → removes all stored data for that origin
4. Storage Keys
Intuition
A key is simply the label/name used to identify stored data.
Example concept:
KEY              VALUE
theme            dark
username         Divya
language         English

Definition
A storage key is the unique name used to identify a value stored in localStorage.

THEME_KEY is not a JavaScript keyword. It is simply a variable name chosen by the developer to represent the key used for storing the theme.
5. Why localStorage Uses Strings
Intuition
localStorage is designed as a simple key-value storage mechanism where values are stored as text.
Definition
The Web Storage API represents stored values as strings.

Therefore, when storing complex JavaScript data such as objects or arrays, we commonly convert them to JSON strings first.
Data conversion
JavaScript Object
       ↓
JSON.stringify()
       ↓
JSON String
       ↓
localStorage

When retrieving:
localStorage
       ↓
JSON String
       ↓
JSON.parse()
       ↓
JavaScript Object

6. JSON.stringify()
Definition
Converts a JavaScript value into a JSON string representation.

Used when we need to store objects or arrays in localStorage.
7. JSON.parse()
Definition
Converts a valid JSON string into its corresponding JavaScript value.

Used when retrieving JSON data from localStorage.
8. CSS Custom Properties
Intuition
Instead of writing the same color or spacing value throughout the CSS, we give it a reusable name.
Definition
CSS custom properties are reusable CSS values defined using names beginning with --.

They are commonly used for:
- Colors
- Spacing
- Font sizes
- Borders
- Theme values
9. Design Tokens
Definition
Design tokens are centralized values representing reusable design decisions such as colors, typography, spacing, and sizes.

For AlgoVerse, theme colors can be stored as CSS custom properties.
Why use them?
- Consistency
- Easy maintenance
- Easy theme switching
- Avoids repeating values throughout CSS
10. :root
Definition
:root represents the root element of the document and is commonly used to define global CSS custom properties.

For an HTML document, the root element is <html>.
11. data-* Attributes
Intuition
HTML lets developers attach their own custom pieces of information to elements using data-* attributes.
Definition
data-* attributes are custom HTML attributes used to store application-specific information on an element.

The * represents a developer-defined name.
Examples of concepts:
data-theme
data-user
data-algorithm

12. data-theme
Definition
data-theme is a custom data attribute that can be used to indicate which visual theme is currently active.

For AlgoVerse:
data-theme = dark

can indicate dark mode, while:
data-theme = light

can indicate light mode.
Why use it?
JavaScript can change the attribute, and CSS can use that attribute to determine which theme styles should apply.
13. document.documentElement
Definition
document.documentElement refers to the root <html> element of the current HTML document.

This allows JavaScript to modify attributes on the <html> element.
For AlgoVerse, this is useful for changing the active theme.
14. Theme System
The theme system connects JavaScript + localStorage + HTML + CSS.
Overall flow
User clicks theme button
          ↓
JavaScript changes theme
          ↓
Theme preference saved in localStorage
          ↓
data-theme updated on <html>
          ↓
CSS detects active theme
          ↓
CSS variables provide appropriate colors
          ↓
UI changes

Important distinction
Component	Responsibility
JavaScript	Controls the theme
localStorage	Remembers the user's preference
data-theme	Indicates the currently active theme
CSS custom properties	Define theme-specific design values


15. JavaScript Modules
Intuition
Instead of putting the entire application's JavaScript into one huge file, we divide it into smaller files based on responsibility.
Definition
A JavaScript module is a separate JavaScript file that can explicitly expose functionality to other files using export and consume functionality using import.

Example architecture:
js/
├── storage.js
├── theme.js
├── algorithms.js
├── visualizer.js
└── app.js

16. export
Definition
export makes a variable, function, class, or other supported declaration available to other modules.

Mental model:
export = "Make this available to other files."

17. import
Definition
import allows one JavaScript module to use functionality exported by another module.

Mental model:
import = "Bring that exported functionality into this file."

18. ES Modules / ESM
Definition
ES Modules (ESM) are the standardized JavaScript module system based on import and export.

ES stands for ECMAScript, the standardized specification for JavaScript.
ES modules help us create:
- Modular code
- Reusable code
- Maintainable code
- Better separation of responsibilities
19. <script type="module">
Definition
type="module" tells the browser to treat the referenced JavaScript file as an ES module.

This allows the file to participate in the import/export module system.
Mental model
<script>
      ↓
Regular JavaScript script

<script type="module">
      ↓
ES Module
      ↓
import / export available

🎤 Most Important Viva Questions From Day 1
Q1. Why use let instead of var?
let is block-scoped and is the modern way to declare variables whose values may change. var is function-scoped and is an older mechanism.
Q2. What does block-scoped mean?
It means a variable declared with let or const is accessible only within the { } block where it was declared.
Q3. What is localStorage?
It is browser-provided persistent key-value storage used to store data across page reloads and browser sessions.
Q4. Why does localStorage use strings?
Because the Web Storage API represents stored values as strings. Complex data is therefore commonly converted to JSON before storage.
Q5. What is THEME_KEY?
It is simply a developer-defined constant containing the key used to identify AlgoVerse's theme preference in localStorage.
Q6. What is data-theme?
It is a custom HTML data-* attribute used to indicate the currently active theme.
Q7. Why use data-theme?
It gives CSS a simple way to determine which theme styles should be applied while JavaScript controls the attribute.
Q8. What is a JavaScript module?
A JavaScript file that can explicitly share functionality with other JavaScript files using export and import.
Q9. What does type="module" do?
It tells the browser to treat the JavaScript file as an ES module, enabling the module system such as import and export.
Q10. What is the relationship between localStorage and data-theme?
localStorage remembers the user's theme preference, while data-theme indicates the currently active theme to the CSS.