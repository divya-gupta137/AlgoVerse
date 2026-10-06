/**
 * AlgoVerse — DOM Array Bar Renderer
 * Renders array frame data into dynamic vertical bars.
 */

export class BarRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  /**
   * Render a single frame snapshot into the DOM container.
   * 
   * @param {Object} frame - Frame snapshot { op, data, highlights, pointers }
   */
  render(frame) {
    if (!this.container || !frame || !Array.isArray(frame.data)) return;

    const data = frame.data;
    const highlights = frame.highlights || [];
    const pointers = frame.pointers || {};
    const op = frame.op;

    const maxValue = Math.max(...data, 100); // Scale height relative to max value

    // Build bars HTML using Template Literals
    this.container.innerHTML = data.map((val, idx) => {
      const heightPercent = Math.max(12, Math.round((val / maxValue) * 100));
      
      // Determine CSS highlight class based on frame operation
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

      // Check for pointer labels at this index (e.g. i, j, min)
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
    }).join('');
  }
}
