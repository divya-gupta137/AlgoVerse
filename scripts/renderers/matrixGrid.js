/**
 * AlgoVerse — 2D Matrix (Grid) Interactive Visualizer Renderer
 * Renders multidimensional grids with row/column index vectors, physical RAM formula indicators,
 * coordinate badges, and real-time state highlights.
 */

export class MatrixGridRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render(frame) {
    if (!this.container || !frame || !Array.isArray(frame.data)) return;

    const matrix = frame.data;
    const rows = matrix.length;
    const cols = matrix[0]?.length || 3;
    const activeCell = frame.activeCell;
    const activeRow = frame.activeRow;
    const activeCol = frame.activeCol;
    const swappingCells = frame.swappingCells || [];
    const foundCell = frame.foundCell;
    const traversalTrail = frame.traversalTrail || [];
    const op = frame.op;

    // Build column headers (Col 0, Col 1, Col 2...)
    const colHeadersHtml = Array.from({ length: cols }, (_, c) => {
      const isColActive = activeCol === c;
      return `<div class="matrix-header-col ${isColActive ? 'header-active' : ''}">Col [${c}]</div>`;
    }).join('');

    // Build grid rows with Row header + Cells
    const gridRowsHtml = matrix.map((row, r) => {
      const isRowActive = activeRow === r;
      const rowHeaderHtml = `<div class="matrix-header-row ${isRowActive ? 'header-active' : ''}">Row [${r}]</div>`;

      const cellsHtml = row.map((val, c) => {
        let cellClass = '';
        const linearIdx = (r * cols) + c;
        const hexAddr = '0x' + (0x1000 + (linearIdx * 4)).toString(16).toUpperCase();

        const isFound = foundCell && foundCell.r === r && foundCell.c === c;
        const isActive = activeCell && activeCell.r === r && activeCell.c === c;
        const isSwapping = swappingCells.some(cell => cell.r === r && cell.c === c);
        const isVisited = traversalTrail.some(cell => cell.r === r && cell.c === c);

        if (isFound) {
          cellClass = 'cell-found glow-green';
        } else if (isSwapping) {
          cellClass = 'cell-swapping glow-purple';
        } else if (isActive) {
          cellClass = op === 'update' ? 'cell-update glow-amber' : 'cell-access glow-amber';
        } else if (isVisited) {
          cellClass = 'cell-visited';
        } else if (isRowActive || activeCol === c) {
          cellClass = 'cell-projected';
        }

        return `
          <div class="matrix-cell-card ${cellClass}" data-row="${r}" data-col="${c}">
            <div class="cell-coords-tag">[${r}, ${c}]</div>
            <span class="matrix-cell-val">${val}</span>
            <div class="cell-ram-tag">${hexAddr}</div>
          </div>
        `;
      }).join('');

      return `
        <div class="matrix-grid-row">
          ${rowHeaderHtml}
          <div class="matrix-row-cells" style="--cols: ${cols};">
            ${cellsHtml}
          </div>
        </div>
      `;
    }).join('');

    // Active Formula Indicator
    let formulaHtml = `
      <div class="matrix-formula-banner">
        <span class="formula-label">Hardware Memory Model (Row-Major):</span>
        <code class="formula-code">Address = Base + (Row × ${cols} + Col) × 4 Bytes</code>
      </div>
    `;

    if (activeCell) {
      const r = activeCell.r;
      const c = activeCell.c;
      const linear = (r * cols) + c;
      const bytes = linear * 4;
      const hex = '0x' + (0x1000 + bytes).toString(16).toUpperCase();
      formulaHtml = `
        <div class="matrix-formula-banner active-formula">
          <span class="formula-label">Active Memory Calculation:</span>
          <code class="formula-code">0x1000 + (${r} × ${cols} + ${c}) × 4B = 0x1000 + ${bytes}B ➔ <strong style="color: #fbbf24;">${hex}</strong></code>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="matrix-visualizer-container">
        <!-- Top Column Vector Headers -->
        <div class="matrix-top-cols-row">
          <div class="matrix-corner-spacer">R \\ C</div>
          <div class="matrix-cols-container" style="--cols: ${cols};">
            ${colHeadersHtml}
          </div>
        </div>

        <!-- Matrix Rows & Cells -->
        <div class="matrix-body-grid">
          ${gridRowsHtml}
        </div>

        <!-- Dynamic Formula Callout -->
        ${formulaHtml}
      </div>
    `;
  }
}
