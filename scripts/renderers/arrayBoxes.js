/**
 * AlgoVerse — Contiguous Memory Array Box Renderer
 * Renders horizontal rounded cell cards with bracketed indices [0] and RAM memory offsets 0x1000 underneath.
 */

export class ArrayBoxRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  /**
   * Render array snapshot as horizontal memory cell cards
   * 
   * @param {Object} frame - Frame snapshot { data, highlights, pointers, op }
   */
  render(frame) {
    if (!this.container || !frame || !Array.isArray(frame.data)) return;

    const data = frame.data;
    const highlights = frame.highlights || [];
    const pointers = frame.pointers || {};
    const op = frame.op;

    if (data.length === 0) {
      this.container.innerHTML = `
        <div class="empty-array-card">
          <div style="display: flex; justify-content: center; margin-bottom: 0.5rem;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.8">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <h3 style="color: #9da5b4; font-size: 1.1rem; margin-bottom: 0.25rem;">Array is Empty</h3>
          <p style="color: #626a79; font-size: 0.85rem;">Use <strong>+ Push</strong> or <strong>Insert At</strong> above to add elements!</p>
        </div>
      `;
      return;
    }

    const cellsHtml = data.map((val, idx) => {
      let stateClass = '';

      if (highlights.includes(idx)) {
        if (op === 'access') {
          stateClass = 'cell-access';
        } else if (op === 'remove' || op === 'pop') {
          stateClass = 'cell-remove';
        } else if (op === 'insert' || op === 'push') {
          stateClass = 'cell-insert';
        } else if (op === 'found' || (frame.narration && frame.narration.includes('MATCH FOUND'))) {
          stateClass = 'cell-found';
        } else if (op === 'reverse') {
          stateClass = 'cell-reverse';
        } else {
          stateClass = 'cell-active';
        }
      }

      // Check pointer markers
      const pointerEntries = Object.entries(pointers).filter(([_, ptrIdx]) => ptrIdx === idx);
      const pointerTag = pointerEntries.length > 0 
        ? `<div class="cell-pointer-badge">${pointerEntries.map(([k]) => k).join(',')}</div>` 
        : '';

      const hexAddr = '0x' + (0x1000 + (idx * 4)).toString(16).toUpperCase();

      return `
        <div class="array-cell-wrapper">
          ${pointerTag}
          <div class="array-cell-card ${stateClass}">
            <span class="cell-val">${val}</span>
          </div>
          <div class="cell-meta">
            <span class="cell-index">[${idx}]</span>
            <span class="cell-addr">${hexAddr}</span>
          </div>
        </div>
      `;
    }).join('');

    this.container.innerHTML = `
      <div class="array-boxes-row">
        ${cellsHtml}
      </div>
    `;
  }
}
