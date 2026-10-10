/**
 * AlgoVerse — Context-Aware Dynamic Input & Operation Panel Controller
 * Renders user-driven action forms for Searching, Stack, Queue, Linked List, Recursion, Arrays & Strings.
 */

export class InputPanelController {
  constructor(onActionCallback) {
    this.onAction = onActionCallback;
    this.container = document.querySelector('.input-control-card');
    this.algo = 'bubble-sort';
  }

  setAlgorithm(algoId) {
    this.algo = algoId;
    this.renderDeck();
  }

  init() {
    this.renderDeck();
  }

  renderDeck() {
    if (!this.container) return;

    if (this.algo === 'recursion-ops') {
      this.container.innerHTML = `
        <div class="op-deck-container">
          <label style="font-size: 0.85rem; color: var(--text-secondary);">Interactive Recursion Call Stack & Tree Visualizer:</label>
          <div class="op-deck-row">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <label style="font-size: 0.85rem; color: var(--text-secondary);">Input N (1-6):</label>
              <input type="number" id="rec-n-input" class="custom-input" style="max-width: 90px;" min="1" max="6" value="4">
            </div>
            <button id="btn-rec-factorial" class="btn btn-primary" style="background: #8b5cf6; border: none;">🪆 Factorial (Linear Stack)</button>
            <button id="btn-rec-fibonacci" class="btn btn-primary" style="background: #ec4899; border: none;">🌳 Fibonacci (Binary Tree)</button>
            <button id="btn-rec-reset" class="btn btn-action">🔄 Reset</button>
          </div>
        </div>
      `;
      this.bindRecursionEvents();

    } else if (this.algo === 'linked-list') {
      this.container.innerHTML = `
        <div class="op-deck-container">
          <label style="font-size: 0.85rem; color: var(--text-secondary);">Interactive Singly Linked List Operations:</label>
          <div class="op-deck-row">
            <input type="number" id="ll-val-input" class="custom-input" style="max-width: 140px;" placeholder="Node value..." value="99">
            <button id="btn-ll-insert-head" class="btn btn-push">➕ Head</button>
            <button id="btn-ll-insert-tail" class="btn btn-push" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border-color: rgba(16, 185, 129, 0.3);">➕ Tail</button>
            <button id="btn-ll-delete-head" class="btn btn-pop">🗑️ Pop Head</button>
            <button id="btn-ll-search" class="btn btn-peek">🔍 Search</button>
            <button id="btn-ll-reset" class="btn btn-action">🔄 Reset</button>
          </div>
        </div>
      `;
      this.bindLinkedListEvents();

    } else if (this.algo === 'stack-ops') {
      this.container.innerHTML = `
        <div class="op-deck-container">
          <label style="font-size: 0.85rem; color: var(--text-secondary);">Interactive Stack (LIFO) Operations:</label>
          <div class="op-deck-row">
            <input type="number" id="stack-val-input" class="custom-input" style="max-width: 160px;" placeholder="Enter value..." value="75">
            <button id="btn-stack-push" class="btn btn-push">➕ Push</button>
            <button id="btn-stack-pop" class="btn btn-pop">⬆️ Pop</button>
            <button id="btn-stack-peek" class="btn btn-peek">👁️ Peek</button>
            <button id="btn-stack-reset" class="btn btn-action">🔄 Reset</button>
          </div>
        </div>
      `;
      this.bindStackEvents();

    } else if (this.algo === 'queue-ops') {
      this.container.innerHTML = `
        <div class="op-deck-container">
          <label style="font-size: 0.85rem; color: var(--text-secondary);">Interactive Queue (FIFO) Operations:</label>
          <div class="op-deck-row">
            <input type="number" id="queue-val-input" class="custom-input" style="max-width: 160px;" placeholder="Enter value..." value="50">
            <button id="btn-queue-enqueue" class="btn btn-push">➕ Enqueue</button>
            <button id="btn-queue-dequeue" class="btn btn-pop">⬅️ Dequeue</button>
            <button id="btn-queue-peek" class="btn btn-peek">👁️ Peek Front</button>
            <button id="btn-queue-reset" class="btn btn-action">🔄 Reset</button>
          </div>
        </div>
      `;
      this.bindQueueEvents();

    } else if (this.algo === 'linear-search' || this.algo === 'binary-search') {
      this.container.innerHTML = `
        <div class="op-deck-container">
          <div class="op-deck-row">
            <div style="flex: 1; min-width: 200px;">
              <label style="font-size: 0.85rem; color: var(--text-secondary); display: block; margin-bottom: 0.4rem;">Target Search Value:</label>
              <input type="number" id="search-target-input" class="custom-input" value="32" placeholder="e.g. 32">
            </div>
            <div style="flex: 2; min-width: 280px;">
              <label style="font-size: 0.85rem; color: var(--text-secondary); display: block; margin-bottom: 0.4rem;">Array Dataset (Comma separated):</label>
              <input type="text" id="custom-array-input" class="custom-input" value="12, 18, 23, 32, 45, 67, 85, 92" placeholder="e.g. 10, 20, 30">
            </div>
            <div style="display: flex; gap: 0.5rem; align-self: flex-end;">
              <button id="btn-search-exec" class="btn btn-primary" style="padding: 0.55rem 1rem; font-size: 0.85rem;">🔍 Search</button>
              <button id="btn-random-input" class="btn btn-secondary" style="padding: 0.55rem 1rem; font-size: 0.85rem;">🎲 Random</button>
            </div>
          </div>
        </div>
      `;
      this.bindSearchEvents();

    } else {
      this.container.innerHTML = `
        <div style="flex: 1;">
          <label for="custom-array-input" style="font-size: 0.85rem; color: var(--text-secondary); display: block; margin-bottom: 0.4rem;">
            Custom Array Input (Comma separated):
          </label>
          <div class="input-group">
            <input type="text" id="custom-array-input" class="custom-input" value="45, 18, 85, 32, 92, 23, 67, 12" placeholder="e.g. 25, 12, 40, 8">
            <button id="btn-apply-input" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Apply ⚡</button>
            <button id="btn-random-input" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">🎲 Random</button>
          </div>
        </div>
      `;
      this.bindDefaultEvents();
    }
  }

  bindRecursionEvents() {
    const nInput = document.getElementById('rec-n-input');
    document.getElementById('btn-rec-factorial')?.addEventListener('click', () => {
      this.triggerAction('factorial', nInput?.value);
    });
    document.getElementById('btn-rec-fibonacci')?.addEventListener('click', () => {
      this.triggerAction('fibonacci', nInput?.value);
    });
    document.getElementById('btn-rec-reset')?.addEventListener('click', () => {
      this.triggerAction('factorial', 4);
    });
  }

  bindLinkedListEvents() {
    const valInput = document.getElementById('ll-val-input');
    document.getElementById('btn-ll-insert-head')?.addEventListener('click', () => {
      this.triggerAction('insert-head', valInput?.value);
    });
    document.getElementById('btn-ll-insert-tail')?.addEventListener('click', () => {
      this.triggerAction('insert-tail', valInput?.value);
    });
    document.getElementById('btn-ll-delete-head')?.addEventListener('click', () => {
      this.triggerAction('delete-head');
    });
    document.getElementById('btn-ll-search')?.addEventListener('click', () => {
      this.triggerAction('search', null, valInput?.value);
    });
    document.getElementById('btn-ll-reset')?.addEventListener('click', () => {
      this.triggerAction('reset');
    });
  }

  bindStackEvents() {
    const valInput = document.getElementById('stack-val-input');
    document.getElementById('btn-stack-push')?.addEventListener('click', () => {
      this.triggerAction('push', valInput?.value);
    });
    document.getElementById('btn-stack-pop')?.addEventListener('click', () => {
      this.triggerAction('pop');
    });
    document.getElementById('btn-stack-peek')?.addEventListener('click', () => {
      this.triggerAction('peek');
    });
    document.getElementById('btn-stack-reset')?.addEventListener('click', () => {
      this.triggerAction('reset');
    });
  }

  bindQueueEvents() {
    const valInput = document.getElementById('queue-val-input');
    document.getElementById('btn-queue-enqueue')?.addEventListener('click', () => {
      this.triggerAction('enqueue', valInput?.value);
    });
    document.getElementById('btn-queue-dequeue')?.addEventListener('click', () => {
      this.triggerAction('dequeue');
    });
    document.getElementById('btn-queue-peek')?.addEventListener('click', () => {
      this.triggerAction('peek');
    });
    document.getElementById('btn-queue-reset')?.addEventListener('click', () => {
      this.triggerAction('reset');
    });
  }

  bindSearchEvents() {
    document.getElementById('btn-search-exec')?.addEventListener('click', () => {
      const targetVal = Number(document.getElementById('search-target-input')?.value) || 32;
      const rawArr = document.getElementById('custom-array-input')?.value || '';
      const parsedArray = rawArr.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
      this.triggerAction('search', null, targetVal, parsedArray);
    });

    document.getElementById('btn-random-input')?.addEventListener('click', () => {
      const randArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
      document.getElementById('custom-array-input').value = randArray.join(', ');
      const targetVal = Number(document.getElementById('search-target-input')?.value) || randArray[3];
      this.triggerAction('search', null, targetVal, randArray);
    });
  }

  bindDefaultEvents() {
    document.getElementById('btn-apply-input')?.addEventListener('click', () => {
      const raw = document.getElementById('custom-array-input')?.value || '';
      const parsed = raw.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
      if (parsed.length > 0) this.triggerAction('dataset', null, null, parsed);
    });

    document.getElementById('btn-random-input')?.addEventListener('click', () => {
      const randArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
      document.getElementById('custom-array-input').value = randArray.join(', ');
      this.triggerAction('dataset', null, null, randArray);
    });
  }

  triggerAction(actionType, value = null, target = null, dataset = null) {
    if (typeof this.onAction === 'function') {
      this.onAction({ actionType, value, target, dataset });
    }
  }
}
