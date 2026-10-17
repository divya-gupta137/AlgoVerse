/**
 * AlgoVerse — VS Code Style Syntax & Active Code Line Renderer
 */

export const ALGORITHM_CODE_SNIPPETS = {
  'bubble-sort': [
    'function bubbleSort(arr) {',
    '  for (let i = 0; i < arr.length - 1; i++) {',
    '    for (let j = 0; j < arr.length - i - 1; j++) {',
    '      if (arr[j] > arr[j + 1]) {',
    '        // Swap adjacent out-of-order pair',
    '        swap(arr, j, j + 1);',
    '      }',
    '    }',
    '  }',
    '}'
  ],
  'selection-sort': [
    'function selectionSort(arr) {',
    '  for (let i = 0; i < arr.length - 1; i++) {',
    '    let minIdx = i;',
    '    for (let j = i + 1; j < arr.length; j++) {',
    '      if (arr[j] < arr[minIdx]) {',
    '        // Record new minimum index',
    '        minIdx = j;',
    '      }',
    '    }',
    '    // Swap minimum element to front',
    '    if (minIdx !== i) {',
    '      swap(arr, i, minIdx);',
    '    }',
    '  }',
    '}'
  ],
  'insertion-sort': [
    'function insertionSort(arr) {',
    '  for (let i = 1; i < arr.length; i++) {',
    '    // Extract current element to insert into sorted prefix',
    '    let key = arr[i]; let j = i - 1;',
    '    // Shift elements greater than key rightward',
    '    while (j >= 0 && arr[j] > key) {',
    '      // Shift element rightward to create slot',
    '      arr[j + 1] = arr[j]; j--;',
    '    }',
    '    // Insert key at found location',
    '    // Final placement',
    '    arr[j + 1] = key;',
    '  }',
    '  return arr;',
    '}'
  ],
  'merge-sort': [
    'function mergeSort(arr, start, end) {',
    '  if (start >= end) return;',
    '  const mid = Math.floor((start + end) / 2);',
    '  mergeSort(arr, start, mid); // Divide left & right',
    '  mergeSort(arr, mid + 1, end);',
    '  merge(arr, start, mid, end);',
    '}',
    '',
    'function merge(arr, start, mid, end) {',
    '  // Merging sub-arrays into unified sorted range',
    '  let i = 0, j = 0, k = start;',
    '  while (i < left.length && j < right.length) {',
    '    if (left[i] <= right[j]) arr[k++] = left[i++];',
    '    else arr[k++] = right[j++];',
    '    // Placed smaller element into merged index',
    '  }',
    '  while (i < left.length) {',
    '    arr[k++] = left[i++]; // Copy remaining left',
    '  }',
    '  while (j < right.length) {',
    '    arr[k++] = right[j++]; // Copy remaining right',
    '  }',
    '}',
    '',
    '// Merge Sort Complete'
  ],
  'quick-sort': [
    'function partition(arr, low, high) {',
    '  // Pick rightmost element as pivot',
    '  let i = low - 1;',
    '  const pivot = arr[high]; // Pivot element selected',
    '  for (let j = low; j < high; j++) {',
    '    // Check if current element is smaller than pivot',
    '    if (arr[j] < pivot) {',
    '      i++;',
    '      // Swap into smaller elements partition',
    '      swap(arr, i, j);',
    '    }',
    '  }',
    '  // Place pivot into final sorted position',
    '  swap(arr, i + 1, high);',
    '  return i + 1;',
    '}',
    '',
    '// Quick Sort Complete'
  ],
  'linear-search': [
    'function linearSearch(arr, target) {',
    '  for (let i = 0; i < arr.length; i++) {',
    '    if (arr[i] === target) {',
    '      return i; // Target Found',
    '    }',
    '  }',
    '  return -1; // Target Not Found',
    '}'
  ],
  'binary-search': [
    'function binarySearch(arr, target) {',
    '  let low = 0, high = arr.length - 1;',
    '  while (low <= high) {',
    '    const mid = Math.floor((low + high) / 2);',
    '    if (arr[mid] === target) return mid;',
    '    else if (arr[mid] < target) low = mid + 1;',
    '    else high = mid - 1;',
    '  }',
    '  return -1;',
    '}'
  ],
  'stack-ops': [
    'class Stack {',
    '  push(val) { this.items.push(val); } // LIFO Push',
    '  peek() { return this.items[this.items.length - 1]; }',
    '  pop() { return this.items.pop(); } // LIFO Pop',
    '}'
  ],
  'queue-ops': [
    'class Queue {',
    '  enqueue(val) { this.items.push(val); } // FIFO Rear',
    '  dequeue() { return this.items.shift(); } // FIFO Front',
    '}'
  ],
  'linked-list': [
    'class Node { constructor(data) { this.data = data; this.next = null; } }',
    'function insertHead(head, val) {',
    '  let newNode = new Node(val);',
    '  newNode.next = head; return newNode; // O(1)',
    '}',
    'function insertTail(head, val) {',
    '  let newNode = new Node(val); if (!head) return newNode;',
    '  let curr = head; while (curr.next !== null) curr = curr.next;',
    '  curr.next = newNode; return head; // O(N)',
    '}',
    'function insertAtIndex(head, idx, val) {',
    '  if (idx === 0) return insertHead(head, val);',
    '  let curr = head; for (let i = 0; i < idx - 1 && curr; i++) curr = curr.next;',
    '  if (!curr) return head; let node = new Node(val);',
    '  node.next = curr.next; curr.next = node; return head;',
    '}',
    'function deleteHead(head) {',
    '  return head ? head.next : null; // O(1)',
    '}',
    'function deleteAtIndex(head, idx) {',
    '  if (!head || idx === 0) return deleteHead(head);',
    '  let curr = head; for (let i = 0; i < idx - 1 && curr.next; i++) curr = curr.next;',
    '  if (curr && curr.next) curr.next = curr.next.next; return head;',
    '}',
    'function search(head, target) {',
    '  let curr = head;',
    '  while (curr && curr.data !== target) curr = curr.next;',
    '  return curr; // Returns node or null - O(N)',
    '}',
    'function reverseList(head) {',
    '  let prev = null, curr = head;',
    '  while (curr !== null) {',
    '    let next = curr.next; curr.next = prev;',
    '    prev = curr; curr = next;',
    '  }',
    '  return prev; // New head pointer - O(N)',
    '}'
  ],
  'recursion-ops': [
    'function factorial(n) {',
    '  if (n <= 1) return 1; // Base Case',
    '  return n * factorial(n - 1); // Recursive Step',
    '}',
    'function fibonacci(n) {',
    '  if (n <= 1) return n; // Base Case',
    '  return fibonacci(n - 1) + fibonacci(n - 2); // Binary Tree',
    '}'
  ],
  'array-ops': [
    '// Array Contiguous Memory Operations',
    'arr.push(val); // Appends to end - O(1)',
    'arr.pop(); // Removes from end - O(1)',
    'for (let i = len; i > idx; i--) arr[i] = arr[i - 1]; // Shift Right - O(N)',
    'arr[idx] = val; // Insert at Index',
    'for (let i = idx; i < len - 1; i++) arr[i] = arr[i + 1]; // Shift Left - O(N)',
    'arr.length--; // Remove at Index',
    'for (let i = 0; i < len; i++) if (arr[i] === target) return i; // Search - O(N)'
  ]
};

export class CodePanelRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  loadAlgorithmCode(algoId) {
    const lines = ALGORITHM_CODE_SNIPPETS[algoId] || [];
    if (!this.container) return;

    const isCollapsible = algoId === 'array-ops' || algoId === 'linked-list';

    this.container.innerHTML = `
      <div class="code-panel-card ${isCollapsible ? 'collapsible-code-card' : ''}">
        <div class="code-header" id="code-panel-header" style="${isCollapsible ? 'cursor: pointer;' : ''}">
          <span style="display: flex; align-items: center; gap: 0.4rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#61afef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            VS Code Execution Sandbox
            ${isCollapsible ? '<span class="code-toggle-pill"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 3px;"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> View Trace ▾</span>' : ''}
          </span>
          <span class="code-lang-tag">Runtime Trace</span>
        </div>
        <div class="code-block" id="code-panel-body" style="${isCollapsible ? 'display: none;' : ''}">
          ${lines.map((line, idx) => `
            <div class="code-line" data-line="${idx + 1}">
              <span class="line-num">${idx + 1}</span>
              <span class="line-text">${this.colorizeSyntax(line)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    if (isCollapsible) {
      const headerEl = this.container.querySelector('#code-panel-header');
      const bodyEl = this.container.querySelector('#code-panel-body');
      const pillEl = this.container.querySelector('.code-toggle-pill');

      headerEl?.addEventListener('click', () => {
        const isHidden = bodyEl.style.display === 'none';
        bodyEl.style.display = isHidden ? 'block' : 'none';
        if (pillEl) {
          pillEl.innerHTML = isHidden 
            ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 3px;"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> Hide Trace ▴' 
            : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -1px; margin-right: 3px;"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> View Trace ▾';
        }
      });
    }
  }

  highlightLine(lineNumber) {
    if (!this.container) return;
    const allLines = this.container.querySelectorAll('.code-line');
    allLines.forEach(el => el.classList.remove('active-code-line'));

    if (lineNumber) {
      const activeEl = this.container.querySelector(`.code-line[data-line="${lineNumber}"]`);
      if (activeEl) {
        activeEl.classList.add('active-code-line');
      }
    }
  }

  colorizeSyntax(rawLine) {
    let escaped = rawLine
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Isolate comments to prevent keyword rules from matching HTML attributes like class="..."
    let commentToken = null;
    const commentMatch = escaped.match(/(\/\/.+$)/);
    if (commentMatch) {
      commentToken = commentMatch[1];
      escaped = escaped.slice(0, commentMatch.index) + '___COMMENT_TOKEN___';
    }

    // VS Code Syntax Colorizing Regex Rules
    let highlighted = escaped
      .replace(/\b(function|const|let|var|if|else|while|for|return|class|new|constructor)\b/g, '<span class="syn-kw">$1</span>')
      .replace(/\b(swap|bubbleSort|selectionSort|insertionSort|mergeSort|quickSort|linearSearch|binarySearch|push|pop|peek|enqueue|dequeue|shift|insertHead|insertTail|deleteHead|search|insertAtIndex|deleteAtIndex|deleteValue|traverse|reverseList)\b/g, '<span class="syn-fn">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="syn-num">$1</span>');

    if (commentToken) {
      highlighted = highlighted.replace('___COMMENT_TOKEN___', `<span class="syn-cm">${commentToken}</span>`);
    }

    return highlighted;
  }
}
