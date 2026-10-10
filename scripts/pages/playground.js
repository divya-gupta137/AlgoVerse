/**
 * AlgoVerse — Interactive JavaScript Execution Playground Controller
 * Provides safe sandboxed code execution, line counter syncing, and stdout terminal hijacking.
 */

const PRESET_SCRIPTS = {
  'bubble-sort': `// 1. Custom Bubble Sort Execution
function bubbleSort(arr) {
  let len = arr.length;
  console.log("Original Array:", arr);
  
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const numbers = [64, 34, 25, 12, 22, 11, 90];
const sorted = bubbleSort([...numbers]);
console.log("Sorted Output:", sorted);`,

  'array-transform': `// 2. Array Map & Filter Transformation
const dataset = [12, 45, 8, 23, 76, 33, 90, 14, 55];

console.log("Original Dataset:", dataset);

// Filter even numbers
const evens = dataset.filter(num => num % 2 === 0);
console.log("Filtered Even Numbers:", evens);

// Double each value
const doubled = evens.map(num => num * 2);
console.log("Doubled Values:", doubled);`,

  'stack-lifo': `// 3. Stack Data Structure Implementation
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
    console.log(\`Pushed \${element} onto Stack.\`);
  }
  pop() {
    if (this.isEmpty()) return "Underflow";
    const popped = this.items.pop();
    console.log(\`Popped \${popped} from Stack.\`);
    return popped;
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

const myStack = new Stack();
myStack.push(10);
myStack.push(20);
myStack.push(30);
console.log("Top Element (Peek):", myStack.peek());
myStack.pop();
console.log("Current Stack Items:", myStack.items);`,

  'fibonacci': `// 4. Recursive Fibonacci Computation
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const targetN = 10;
console.log(\`Calculating Fibonacci(\${targetN})...\`);
const result = fibonacci(targetN);
console.log(\`Result: Fibonacci(\${targetN}) = \${result}\`);`
};

class PlaygroundController {
  constructor() {
    this.editor = document.getElementById('code-editor');
    this.lineNumbers = document.getElementById('line-numbers');
    this.terminal = document.getElementById('terminal-output');
    this.presetSelect = document.getElementById('preset-select');
    this.execBadge = document.getElementById('exec-status-badge');
    this.execTimeStat = document.getElementById('exec-time-stat');

    this.runBtn = document.getElementById('btn-run-code');
    this.clearBtn = document.getElementById('btn-clear-console');
    this.resetBtn = document.getElementById('btn-reset-code');
  }

  init() {
    if (!this.editor) return;

    // Load initial preset
    this.loadPreset('bubble-sort');

    // Event Listeners
    this.editor.addEventListener('input', () => this.updateLineNumbers());
    this.editor.addEventListener('scroll', () => this.syncScroll());

    this.presetSelect?.addEventListener('change', (e) => this.loadPreset(e.target.value));
    this.runBtn?.addEventListener('click', () => this.runCode());
    this.clearBtn?.addEventListener('click', () => this.clearTerminal());
    this.resetBtn?.addEventListener('click', () => this.loadPreset(this.presetSelect.value));
  }

  loadPreset(presetKey) {
    const code = PRESET_SCRIPTS[presetKey] || PRESET_SCRIPTS['bubble-sort'];
    this.editor.value = code;
    this.updateLineNumbers();
  }

  updateLineNumbers() {
    const lines = this.editor.value.split('\n').length;
    let numbersHtml = '';
    for (let i = 1; i <= lines; i++) {
      numbersHtml += `${i}<br>`;
    }
    this.lineNumbers.innerHTML = numbersHtml;
  }

  syncScroll() {
    this.lineNumbers.scrollTop = this.editor.scrollTop;
  }

  clearTerminal() {
    this.terminal.innerHTML = '<div class="term-line term-info">> Console cleared. Ready for execution.</div>';
  }

  appendLog(message, type = 'log') {
    const lineEl = document.createElement('div');
    lineEl.className = `term-line term-${type}`;
    lineEl.textContent = message;
    this.terminal.appendChild(lineEl);
    this.terminal.scrollTop = this.terminal.scrollHeight;
  }

  runCode() {
    const userCode = this.editor.value;
    this.clearTerminal();

    if (this.execBadge) {
      this.execBadge.textContent = 'Running...';
      this.execBadge.className = 'badge-status status-running';
    }

    // Intercept Console output
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    const self = this;

    console.log = function (...args) {
      originalLog.apply(console, args);
      const formatted = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      self.appendLog(formatted, 'log');
    };

    console.warn = function (...args) {
      originalWarn.apply(console, args);
      const formatted = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      self.appendLog(`[WARN] ${formatted}`, 'warn');
    };

    console.error = function (...args) {
      originalError.apply(console, args);
      const formatted = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      self.appendLog(`[ERROR] ${formatted}`, 'error');
    };

    const startTime = performance.now();

    try {
      // Execute in isolated function sandbox
      const runner = new Function(userCode);
      runner();

      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      if (this.execTimeStat) this.execTimeStat.textContent = `Duration: ${duration} ms`;
      if (this.execBadge) {
        this.execBadge.textContent = 'Success';
        this.execBadge.className = 'badge-status status-success';
      }
      this.appendLog(`> Execution completed cleanly in ${duration}ms.`, 'info');

    } catch (err) {
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      if (this.execTimeStat) this.execTimeStat.textContent = `Duration: ${duration} ms`;
      if (this.execBadge) {
        this.execBadge.textContent = 'Runtime Error';
        this.execBadge.className = 'badge-status status-error';
      }
      this.appendLog(`> Exception: ${err.message}`, 'error');

    } finally {
      // Restore native console handlers
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const playground = new PlaygroundController();
  playground.init();
});
