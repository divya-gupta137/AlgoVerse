/**
 * AlgoVerse — Singly Linked List Pointer Node DOM Renderer
 * Renders nodes with memory addresses, data payloads, next pointer boxes, and SVG/CSS arrows.
 */

export class LinkedListRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render(frame) {
    if (!this.container) return;

    const nodes = frame.data || [];
    const activePointers = frame.pointers || [];

    if (nodes.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-icon">🔗</div>
          <h3>Linked List is Empty</h3>
          <p>Use the action controls above to insert nodes at Head or Tail!</p>
        </div>
      `;
      return;
    }

    let html = `<div class="ll-visualization-chain">`;

    nodes.forEach((node, index) => {
      const isHead = index === 0;
      const isTail = index === nodes.length - 1;
      const isActive = activePointers.includes(index);
      const isFound = node.isFound;
      const isSearching = node.isSearching;

      let cardClasses = 'll-node-card';
      if (isFound) cardClasses += ' found';
      else if (isSearching || isActive) cardClasses += ' highlighted';

      html += `
        <div class="${cardClasses}">
          <div class="ll-node-header">
            <span class="ll-addr-badge">RAM: ${node.address}</span>
            ${isHead ? '<span class="badge badge-head">HEAD</span>' : ''}
            ${isTail ? '<span class="badge badge-tail">TAIL</span>' : ''}
          </div>

          <div class="ll-node-body">
            <div class="ll-data-box">
              <span class="ll-label">DATA</span>
              <span class="ll-value">${node.data}</span>
            </div>
            <div class="ll-next-box">
              <span class="ll-label">NEXT</span>
              <span class="ll-ptr-val">${node.nextAddress || 'NULL'}</span>
            </div>
          </div>
        </div>
      `;

      // Pointer Arrow between nodes
      if (!isTail) {
        html += `
          <div class="ll-pointer-arrow">
            <span class="arrow-line"></span>
            <span class="arrow-head">▶</span>
          </div>
        `;
      } else {
        html += `
          <div class="ll-pointer-arrow null-pointer">
            <span class="arrow-line"></span>
            <span class="ll-null-badge">Ø NULL</span>
          </div>
        `;
      }
    });

    html += `</div>`;
    this.container.innerHTML = html;
  }
}
