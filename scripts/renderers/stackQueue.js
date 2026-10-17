/**
 * AlgoVerse — Stack & Queue Visualizer Renderer
 * Renders sleek 2D glassmorphic vertical cylinder for Stack (LIFO)
 * and horizontal conduit/ring buffer for Queue (FIFO).
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
    const maxCapacity = 8;

    if (mode === 'stack') {
      if (data.length === 0) {
        this.container.innerHTML = `
          <div class="empty-structure-card">
            <div class="empty-icon" style="display: flex; justify-content: center; margin-bottom: 0.5rem;">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="1.8">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3>Stack is Currently Empty</h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem; max-width: 360px; margin: 0 auto 1rem auto;">
              No elements in the LIFO stack. Use <b>Push</b> in the control bar to add elements or click <b>Random Fill</b>!
            </p>
            <div style="display: inline-flex; gap: 0.5rem;">
              <span class="badge" style="background: rgba(192, 132, 252, 0.15); color: #c084fc; border: 1px solid rgba(192, 132, 252, 0.3);">TOP: null</span>
              <span class="badge" style="background: rgba(255, 255, 255, 0.05); color: #94a3b8; border: 1px solid rgba(255, 255, 255, 0.1);">Capacity: 0 / ${maxCapacity}</span>
            </div>
          </div>
        `;
        return;
      }

      const topIdx = data.length - 1;

      this.container.innerHTML = `
        <div class="stack-visualizer-container">
          <!-- Stack HUD Bar -->
          <div class="stack-hud-bar" style="margin-bottom: 0.75rem; display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <span class="metric-chip">Height: <strong>${data.length}</strong> / ${maxCapacity}</span>
            <span class="metric-chip">TOP: <strong style="color: #c084fc;">${data[topIdx]}</strong> [${topIdx}]</span>
            <span class="metric-chip">Discipline: <strong>LIFO (Last-In First-Out)</strong></span>
          </div>

          <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: #c084fc; margin-bottom: 0.5rem; letter-spacing: 0.05em; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
            <span>&uarr; &darr; PUSH / POP OPENING (TOP)</span>
          </div>

          <!-- Vertical Stack Body: index 0 at bottom, topIdx at top -->
          <div class="stack-body">
            ${data.slice().reverse().map((val, revIdx) => {
              const realIdx = data.length - 1 - revIdx;
              const isTop = realIdx === topIdx;
              const isHighlight = highlights.includes(realIdx);
              let highlightClass = isHighlight ? (op === 'swap' ? 'stack-item-swap' : 'stack-item-active') : '';
              if (op === 'sorted') highlightClass = 'stack-item-sorted';

              const activePtrs = Object.entries(pointers)
                .filter(([_, idx]) => idx === realIdx)
                .map(([name]) => name);

              const badge = isTop 
                ? '<span class="stack-pointer-badge">TOP</span>' 
                : (activePtrs.length > 0 ? `<span class="stack-pointer-badge">${activePtrs.join(',')}</span>` : '');

              return `
                <div class="stack-item ${highlightClass} ${isTop ? 'stack-item-top' : ''}">
                  ${badge}
                  <span class="stack-val">${val}</span>
                  <span class="stack-idx-label">[${realIdx}]</span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="stack-base-label" style="margin-top: 0.6rem;">
            <span>&#9660; STACK BASE (SEALED BOTTOM)</span>
          </div>
        </div>
      `;

    } else if (mode === 'queue') {
      if (data.length === 0) {
        this.container.innerHTML = `
          <div class="empty-structure-card">
            <div class="empty-icon" style="display: flex; justify-content: center; margin-bottom: 0.5rem;">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="1.8">
                <path d="M17 18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9Z"/>
                <polyline points="9 9 9 5 21 5 21 15 17 15"/>
              </svg>
            </div>
            <h3>Queue is Currently Empty</h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem; max-width: 360px; margin: 0 auto 1rem auto;">
              No elements in the FIFO queue. Use <b>Enqueue</b> in the control bar to add elements or click <b>Random Fill</b>!
            </p>
            <div style="display: inline-flex; gap: 0.5rem;">
              <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3);">FRONT: null</span>
              <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3);">REAR: null</span>
            </div>
          </div>
        `;
        return;
      }

      const isCircular = frame.queueType === 'circular';

      this.container.innerHTML = `
        <div class="queue-visualizer-stage" style="width: 100%;">
          <!-- Queue HUD Bar -->
          <div class="queue-hud-bar" style="margin-bottom: 0.75rem; display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <span class="metric-chip">Length: <strong>${data.length}</strong> / ${maxCapacity}</span>
            <span class="metric-chip">FRONT: <strong style="color: #10b981;">${data[0]}</strong> [0]</span>
            <span class="metric-chip">REAR: <strong style="color: #38bdf8;">${data[data.length - 1]}</strong> [${data.length - 1}]</span>
            <span class="metric-chip">Mode: <strong>${isCircular ? 'Circular Ring Buffer' : 'Linear Conduit'}</strong></span>
          </div>

          <div class="queue-visualizer-container">
            <div class="queue-label-tag">&larr; DEQUEUE (FRONT)</div>
            
            <div class="queue-body">
              ${data.map((val, idx) => {
                const isFront = idx === 0;
                const isRear = idx === data.length - 1;
                const isHighlight = highlights.includes(idx);
                let highlightClass = isHighlight ? (op === 'swap' ? 'queue-item-swap' : 'queue-item-active') : '';
                if (op === 'sorted') highlightClass = 'queue-item-sorted';

                const badges = [];
                if (isFront) badges.push('FRONT');
                if (isRear) badges.push('REAR');

                const activePtrs = Object.entries(pointers)
                  .filter(([_, ptrIdx]) => ptrIdx === idx)
                  .map(([name]) => name);
                badges.push(...activePtrs);

                const badgeHtml = badges.length > 0 
                  ? `<span class="queue-pointer-badge">${badges.join(',')}</span>` 
                  : '';

                return `
                  <div class="queue-item ${highlightClass}">
                    ${badgeHtml}
                    <span class="queue-val">${val}</span>
                    <span class="queue-idx-label">[${idx}]</span>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="queue-label-tag">ENQUEUE (REAR) &rarr;</div>
          </div>
        </div>
      `;
    }
  }
}
