/**
 * AlgoVerse — Multi-Type Linked List DOM Renderer
 * Supports:
 * - Singly Linked List: Split Data/Next cards with terminal Ø null
 * - Doubly Linked List: Prev tag top, node body, Next tag bottom, dual bidirectional arrows
 * - Circular Linked List: Tail loops back to Head with curved SVG dashed arc labeled 'circular'
 */

export class LinkedListRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render(frame) {
    if (!this.container) return;

    const nodes = frame.data || [];
    const listType = frame.listType || 'singly';
    const activePointers = Array.isArray(frame.pointers) 
      ? frame.pointers 
      : (frame.pointers && typeof frame.pointers === 'object' ? Object.values(frame.pointers) : []);

    if (nodes.length === 0) {
      const typeLabel = listType === 'doubly' ? 'Doubly' : (listType === 'circular' ? 'Circular' : 'Singly');
      this.container.innerHTML = `
        <div class="empty-state-card" style="padding: 2.5rem 1rem; text-align: center;">
          <div class="empty-icon" style="margin-bottom: 0.75rem; display: flex; justify-content: center; filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.4));">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <h3 style="color: var(--text-primary); font-size: 1.15rem; margin-bottom: 0.25rem;">${typeLabel} Linked List is Empty</h3>
          <p style="color: var(--text-secondary); font-size: 0.85rem; max-width: 400px; margin: 0 auto 1rem auto;">
            All node references have been unlinked. Use the controls above to prepend, append, or generate a fresh list!
          </p>
          <div style="display: inline-flex; gap: 0.5rem;">
            <span class="badge" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">HEAD: null</span>
            <span class="badge" style="background: rgba(148, 163, 184, 0.12); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3);">TAIL: null</span>
          </div>
        </div>
      `;
      return;
    }

    const separator = listType === 'doubly' ? ' ↔ ' : ' → ';
    const chainSummary = nodes.map(n => n.data).join(separator);
    const typeTitle = listType === 'doubly' ? 'Doubly Linked List' : (listType === 'circular' ? 'Circular Linked List' : 'Singly Linked List');

    let html = `
      <div class="ll-visualization-wrapper">
        <!-- 1. Visualization Header & Live Breadcrumb (Matching Reference UI) -->
        <div class="ll-header-strip">
          <div class="ll-header-title">Linked List Visualization</div>
          <div class="ll-header-sub">Current list: ${listType} (${nodes.length} nodes) - [${chainSummary}]</div>
          
          <div class="ll-type-meta-pill">
            <span class="meta-pill-title">${typeTitle}</span>
            <div class="meta-pill-stats">
              <span>Nodes: <strong>${nodes.length}</strong></span>
              <span>Head: <strong>${nodes[0]?.data ?? 'NULL'}</strong></span>
              <span>Tail: <strong>${nodes[nodes.length - 1]?.data ?? 'NULL'}</strong></span>
            </div>
          </div>
        </div>
    `;

    // 2. Visited Sequence Trail Ribbon (if active traversal/search)
    if (frame.visited && frame.visited.length > 0) {
      html += `
        <div class="ll-visited-ribbon">
          <span class="visited-label">Visited Output:</span>
          <div class="visited-chips-track">
            ${frame.visited.map((v, i) => `
              <span class="visited-chip">${v}</span>
              ${i < frame.visited.length - 1 || frame.isAtEnd ? `<span class="visited-arrow">${separator}</span>` : ''}
            `).join('')}
            ${frame.isAtEnd ? '<span class="visited-chip null-chip">null</span>' : ''}
          </div>
        </div>
      `;
    }

    // 3. The Interactive Node Chain
    html += `<div class="ll-visualization-chain ll-chain-${listType}">`;

    // For Circular Linked List, render the arched SVG loopback line on top
    if (listType === 'circular' && nodes.length > 1) {
      html += `
        <div class="ll-circular-overlay">
          <svg class="ll-circular-svg" viewBox="0 0 1000 70" preserveAspectRatio="none">
            <defs>
              <marker id="circ-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>
            <path d="M 880 55 C 650 5, 350 5, 80 55" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,4" fill="none" marker-end="url(#circ-arrow)" />
            <text x="500" y="24" fill="#f59e0b" font-size="12" font-family="monospace" font-weight="700" text-anchor="middle">circular</text>
          </svg>
        </div>
      `;
    }

    nodes.forEach((node, index) => {
      const isHead = index === 0;
      const isTail = index === nodes.length - 1;
      const isActive = activePointers.includes(index);
      const isFound = node.isFound;
      const isSearching = node.isSearching || node.isTraversing;
      const isDeleting = node.isDeleting;
      const isAllocating = node.isAllocating;
      const role = node.pointerRole;

      let cardClasses = `ll-node-card card-${listType}`;
      if (isFound) cardClasses += ' found';
      else if (isDeleting) cardClasses += ' deleting';
      else if (isAllocating) cardClasses += ' allocating';
      else if (isSearching || isActive) cardClasses += ' highlighted';

      // ==================== DOUBLY LINKED LIST NODE ====================
      if (listType === 'doubly') {
        html += `
          <div class="ll-doubly-column">
            <!-- Top Prev Tag -->
            <div class="ll-pointer-annotation prev-annotation">
              prev: <span class="addr-tag">${node.prevAddress ? node.prevAddress : 'NULL'}</span>
            </div>

            <!-- Central Node Card -->
            <div class="${cardClasses}" data-index="${index}">
              <div class="ll-doubly-card-body">
                <div class="ll-value">${node.data}</div>
                <div class="ll-addr-badge">${node.address}</div>
                <div class="ll-role-slot">
                  ${role ? `<span class="badge badge-role role-${role.toLowerCase()}">${role}</span>` : ''}
                  ${isHead && !role ? '<span class="badge badge-head">HEAD</span>' : ''}
                  ${isTail && !role ? '<span class="badge badge-tail">TAIL</span>' : ''}
                </div>
              </div>
            </div>

            <!-- Bottom Next Tag -->
            <div class="ll-pointer-annotation next-annotation">
              next: <span class="addr-tag">${node.nextAddress ? node.nextAddress : 'NULL'}</span>
            </div>
          </div>
        `;

        // Bidirectional Arrows between consecutive nodes
        if (!isTail) {
          html += `
            <div class="ll-doubly-connectors">
              <!-- Forward Next Arrow -->
              <div class="doubly-arrow-fwd">
                <span class="arrow-stem"></span>
                <span class="arrow-glyph">▶</span>
              </div>
              <!-- Backward Prev Arrow -->
              <div class="doubly-arrow-bwd">
                <span class="arrow-glyph">◀</span>
                <span class="arrow-stem"></span>
              </div>
            </div>
          `;
        }

      // ==================== CIRCULAR & SINGLY LINKED LIST NODES ====================
      } else {
        html += `
          <div class="ll-singly-column">
            ${listType === 'circular' ? `
              <div class="ll-pointer-annotation" style="opacity: 0; pointer-events: none; height: 18px;">placeholder</div>
            ` : ''}

            <div class="${cardClasses}" data-index="${index}">
              <!-- Top Tag Bar: Index, Role, RAM Address -->
              <div class="ll-node-header">
                <span class="ll-index-tag">#${index}</span>
                <span class="ll-addr-badge">${node.address}</span>
                ${role ? `<span class="badge badge-role role-${role.toLowerCase()}">${role}</span>` : ''}
                ${isHead && !role ? '<span class="badge badge-head">HEAD</span>' : ''}
                ${isTail && !role ? '<span class="badge badge-tail">TAIL</span>' : ''}
              </div>

              <!-- Body: Split Data and Next Pointer -->
              <div class="ll-node-body">
                <div class="ll-data-box">
                  <span class="ll-label">DATA</span>
                  <span class="ll-value">${node.data}</span>
                </div>
                <div class="ll-next-box">
                  <span class="ll-label">NEXT</span>
                  <span class="ll-ptr-val">${node.nextAddress ? node.nextAddress : '<span class="ptr-null">null</span>'}</span>
                </div>
              </div>
            </div>

            ${listType === 'circular' ? `
              <div class="ll-pointer-annotation next-annotation" style="margin-top: 6px;">
                next: <span class="addr-tag">${node.nextAddress ? node.nextAddress : 'NULL'}</span>
              </div>
            ` : ''}
          </div>
        `;

        // Connector Arrow between nodes
        if (!isTail) {
          html += `
            <div class="ll-pointer-arrow">
              <span class="ll-arrow-tag">next</span>
              <div class="arrow-graphic">
                <span class="arrow-line"></span>
                <span class="arrow-head">▶</span>
              </div>
            </div>
          `;
        } else if (listType === 'singly') {
          html += `
            <div class="ll-pointer-arrow null-pointer">
              <span class="ll-arrow-tag">next</span>
              <div class="arrow-graphic">
                <span class="arrow-line"></span>
                <span class="ll-null-badge">Ø null</span>
              </div>
            </div>
          `;
        }
      }
    });

    html += `</div></div>`;
    this.container.innerHTML = html;
  }
}
