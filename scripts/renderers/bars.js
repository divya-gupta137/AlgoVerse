/**
 * AlgoVerse — DOM Array Bar Renderer
 * Renders array frame data into dynamic vertical bars with optional Sub-array grouping and Color Legend.
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
        if (op === 'swap' || op === 'remove') {
          stateClass = 'highlight-swap'; // Red
        } else if (op === 'pivot' || op === 'insert') {
          stateClass = 'highlight-pivot'; // Blue
        } else {
          stateClass = 'highlight-compare'; // Yellow
        }
      }

      const activePointerNames = Object.entries(pointers)
        .filter(([_, ptrIdx]) => ptrIdx === idx)
        .map(([name]) => name);

      // Stack each pointer badge separately to prevent overlap
      const pointerTag = activePointerNames.length > 0
        ? activePointerNames.map((name, stackIdx) => {
            const topOffset = -22 - (stackIdx * 20); // 22px base + 20px per extra badge
            return `<span class="pointer-badge" style="top:${topOffset}px">${name}</span>`;
          }).join('')
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

    let innerHtml = '';

    // Divide & Conquer Rendering: If frame contains sub-array groupings
    if (subarrays && Array.isArray(subarrays) && subarrays.length > 0) {
      innerHtml = subarrays.map((range) => {
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
      // Standard Single-Container Rendering
      innerHtml = data.map((val, idx) => renderBar(val, idx)).join('');
    }

    // Append Legend Bar for Array Ops
    if (op === 'array-ops') {
      innerHtml += `
        <div class="array-legend-bar">
          <span class="legend-item"><span class="legend-dot dot-active"></span> Comparing (Scan)</span>
          <span class="legend-item"><span class="legend-dot dot-insert"></span> Inserting / Shift</span>
          <span class="legend-item"><span class="legend-dot dot-remove"></span> Removing (Pop)</span>
          <span class="legend-item"><span class="legend-dot dot-found"></span> Target Found</span>
        </div>
      `;
    }

    this.container.innerHTML = innerHtml;
  }
}
