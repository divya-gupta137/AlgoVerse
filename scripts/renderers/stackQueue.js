/**
 * AlgoVerse — Stack & Queue Renderer with Empty State Notices
 */

export class StackQueueRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render(frame, mode = 'stack') {
    if (!this.container || !frame || !Array.isArray(frame.data)) return;

    const data = frame.data;
    const highlights = frame.highlights || [];
    const pointers = frame.pointers || {};
    const op = frame.op;

    if (mode === 'stack') {
      if (data.length === 0) {
        this.container.innerHTML = `
          <div class="empty-structure-card">
            <div class="empty-icon">📭</div>
            <h3>Stack is Currently Empty</h3>
            <p>Use <b>➕ Push</b> to add elements or click <b>🎲 Add Random Stack</b> to populate data!</p>
          </div>
        `;
        return;
      }

      this.container.innerHTML = `
        <div class="stack-visualizer-container">
          <div class="stack-body">
            ${data.slice().reverse().map((val, revIdx) => {
              const realIdx = data.length - 1 - revIdx;
              const isHighlight = highlights.includes(realIdx);
              let highlightClass = isHighlight ? (op === 'swap' ? 'stack-item-swap' : 'stack-item-active') : '';
              if (op === 'sorted') highlightClass = 'stack-item-sorted';

              const activePtrs = Object.entries(pointers)
                .filter(([_, idx]) => idx === realIdx)
                .map(([name]) => name)
                .join(',');

              const badge = activePtrs ? `<span class="stack-pointer-badge">${activePtrs}</span>` : '';

              return `
                <div class="stack-item ${highlightClass}">
                  ${badge}
                  <span class="stack-val">${val}</span>
                  <span class="stack-idx-label">[${realIdx}]</span>
                </div>
              `;
            }).join('')}
          </div>
          <div class="stack-base-label">🔻 STACK BASE</div>
        </div>
      `;
    } else if (mode === 'queue') {
      if (data.length === 0) {
        this.container.innerHTML = `
          <div class="empty-structure-card">
            <div class="empty-icon">📭</div>
            <h3>Queue is Currently Empty</h3>
            <p>Use <b>➕ Enqueue</b> to add elements or click <b>🎲 Add Random Queue</b> to populate data!</p>
          </div>
        `;
        return;
      }

      this.container.innerHTML = `
        <div class="queue-visualizer-container">
          <div class="queue-label-tag">⬅️ DEQUEUE (FRONT)</div>
          <div class="queue-body">
            ${data.map((val, idx) => {
              const isHighlight = highlights.includes(idx);
              let highlightClass = isHighlight ? (op === 'swap' ? 'queue-item-swap' : 'queue-item-active') : '';
              if (op === 'sorted') highlightClass = 'queue-item-sorted';

              const activePtrs = Object.entries(pointers)
                .filter(([_, ptrIdx]) => ptrIdx === idx)
                .map(([name]) => name)
                .join(',');

              const badge = activePtrs ? `<span class="queue-pointer-badge">${activePtrs}</span>` : '';

              return `
                <div class="queue-item ${highlightClass}">
                  ${badge}
                  <span class="queue-val">${val}</span>
                  <span class="queue-idx-label">[${idx}]</span>
                </div>
              `;
            }).join('')}
          </div>
          <div class="queue-label-tag">ENQUEUE (REAR) ➡️</div>
        </div>
      `;
    }
  }
}
