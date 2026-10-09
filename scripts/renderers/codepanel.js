/**
 * AlgoVerse — Code Panel Syntax & Active Line Renderer
 * Renders algorithm code snippets and highlights the current active executing line (codeLine).
 */

export const ALGORITHM_CODE_SNIPPETS = {
  'bubble-sort': [
    'function bubbleSort(arr) {',
    '  for (let i = 0; i < arr.length; i++) {',
    '    for (let j = 0; j < arr.length - i - 1; j++) {',
    '      if (arr[j] > arr[j + 1]) {',
    '        swap(arr, j, j + 1);',
    '      }',
    '    }',
    '  }',
    '}'
  ],
  'selection-sort': [
    'function selectionSort(arr) {',
    '  for (let i = 0; i < arr.length; i++) {',
    '    let minIdx = i;',
    '    for (let j = i + 1; j < arr.length; j++) {',
    '      if (arr[j] < arr[minIdx]) minIdx = j;',
    '    }',
    '    if (minIdx !== i) swap(arr, i, minIdx);',
    '  }',
    '}'
  ],
  'insertion-sort': [
    'function insertionSort(arr) {',
    '  for (let i = 1; i < arr.length; i++) {',
    '    let key = arr[i]; let j = i - 1;',
    '    while (j >= 0 && arr[j] > key) {',
    '      arr[j + 1] = arr[j]; j--;',
    '    }',
    '    arr[j + 1] = key;',
    '  }',
    '}'
  ],
  'merge-sort': [
    'function mergeSort(arr, start, end) {',
    '  if (start >= end) return;',
    '  const mid = Math.floor((start + end) / 2);',
    '  mergeSort(arr, start, mid);',
    '  mergeSort(arr, mid + 1, end);',
    '  merge(arr, start, mid, end);',
    '}'
  ],
  'quick-sort': [
    'function quickSort(arr, low, high) {',
    '  if (low < high) {',
    '    const pi = partition(arr, low, high);',
    '    quickSort(arr, low, pi - 1);',
    '    quickSort(arr, pi + 1, high);',
    '  }',
    '}'
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
  ]
};

export class CodePanelRenderer {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentAlgo = null;
  }

  loadAlgorithmCode(algoId) {
    this.currentAlgo = algoId;
    const lines = ALGORITHM_CODE_SNIPPETS[algoId] || [];
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="code-panel-card">
        <div class="code-header">
          <span>💻 Executing Code Snippet</span>
          <span class="code-lang-tag">JavaScript</span>
        </div>
        <pre class="code-block"><code>${lines.map((line, idx) => `
          <div class="code-line" data-line="${idx + 1}">
            <span class="line-num">${idx + 1}</span>
            <span class="line-text">${this.escapeHtml(line)}</span>
          </div>
        `).join('')}</code></pre>
      </div>
    `;
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

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
