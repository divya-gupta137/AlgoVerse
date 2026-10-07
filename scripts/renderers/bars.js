/**
 * AlgoVerse — DOM Array Bar Renderer
 * Renders array frame data into dynamic vertical bars with optional Sub-array grouping.
 */

export class BarRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  /**
   * Render a single frame snapshot into the DOM container.
   * 
   * @param {Object} frame - Frame snapshot { op, data, highlights, pointers, subarrays }
   */
  render(frame) {
    if (!this.container || !frame || !Array.isArray(frame.data)) return;

    const data = frame.data;
    const highlights = frame.highlights || [];
    const pointers = frame.pointers || {};
    const op = frame.op;
    const subarrays = frame.subarrays || null;

    const maxValue = Math.max(...data, 100); // Scale height relative to max value

    // Helper to render individual bar HTML string
    const renderBar = (val, idx) => {
      const heightPercent = Math.max(12, Math.round((val / maxValue) * 100));
      
      let stateClass = '';
      if (op === 'sorted') {
        stateClass = 'highlight-sorted';
      } else if (highlights.includes(idx)) {
        if (op === 'swap') {
          stateClass = 'highlight-swap';
        } else if (op === 'pivot') {
          stateClass = 'highlight-pivot';
        } else {
          stateClass = 'highlight-compare';
        }
      }

      const activePointers = Object.entries(pointers)
        .filter(([_, ptrIdx]) => ptrIdx === idx)
        .map(([name]) => name)
        .join(',');

      const pointerTag = activePointers 
        ? `<span class="pointer-badge">${activePointers}</span>` 
        : '';

      return `
        <div class="bar-wrapper">
          ${pointerTag}
          <div class="bar ${stateClass}" style="height: ${heightPercent}%;">
            <span class="bar-val">${val}</span>
          </div>
        </div>
      `;
    };

    // Divide & Conquer Rendering: If frame contains sub-array groupings
    if (subarrays && Array.isArray(subarrays) && subarrays.length > 0) {
      this.container.innerHTML = subarrays.map((range) => {
        const [start, end] = range;
        const groupBars = [];
        for (let i = start; i <= end; i++) {
          groupBars.push(renderBar(data[i], i));
        }

        const isActiveGroup = highlights.some(hIdx => hIdx >= start && hIdx <= end);
        const groupClass = isActiveGroup ? 'subarray-group active-group' : 'subarray-group';
        const groupLabel = start === end ? `[${start}]` : `[${start}..${end}]`;

        return `
          <div class="${groupClass}">
            <span class="group-label">${groupLabel}</span>
            <div class="group-bars">
              ${groupBars.join('')}
            </div>
          </div>
        `;
      }).join('');
    } else {
      // Standard Single-Container Rendering (Bubble, Selection, Insertion Sort)
      this.container.innerHTML = data.map((val, idx) => renderBar(val, idx)).join('');
    }
  }
}
