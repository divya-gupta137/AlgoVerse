/**
 * AlgoVerse — Recursion Call Stack & Tree DOM Renderer
 * Visualizes LIFO call frames stack tower and dynamic tree nodes.
 */

export class RecursionRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render(frame) {
    if (!this.container) return;

    const data = frame.data || {};
    const callStack = data.callStack || [];
    const treeNodes = data.treeNodes || [];
    const isFib = data.type === 'fibonacci';

    let html = `
      <div class="recursion-visualizer-grid">
        <!-- Call Stack Tower -->
        <div class="call-stack-card">
          <div class="card-header-badge">
            <span>🥞 Call Stack (RAM LIFO Memory)</span>
            <span class="depth-badge">Depth: ${callStack.length}</span>
          </div>

          <div class="stack-tower-container">
            ${callStack.length === 0 ? '<div class="empty-stack-msg">Call Stack is Empty (Execution Finished)</div>' : ''}
            
            ${callStack.slice().reverse().map((item, idx) => `
              <div class="call-frame-item ${idx === 0 ? 'top-frame' : ''}">
                <div class="frame-func">${item.funcName}</div>
                <div class="frame-meta">
                  <span>n = ${item.n}</span>
                  ${item.returnVal !== null ? `<span class="return-badge">Returns: ${item.returnVal}</span>` : '<span class="pending-badge">Executing...</span>'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
    `;

    if (isFib) {
      html += `
        <!-- Recursion Tree Grid -->
        <div class="recursion-tree-card">
          <div class="card-header-badge">
            <span>🌳 Recursion Call Tree Hierarchy</span>
            <span class="depth-badge">Nodes: ${treeNodes.length}</span>
          </div>

          <div class="tree-nodes-flex">
            ${treeNodes.map(node => `
              <div class="rec-tree-node ${node.status}">
                <div class="node-label">${node.label}</div>
                <div class="node-val">
                  ${node.returnVal !== null ? `Result: <strong>${node.returnVal}</strong>` : 'Call Pushed'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      html += `
        <!-- Linear Execution Trace Card -->
        <div class="recursion-trace-card">
          <div class="card-header-badge">
            <span>📜 Mathematical Unwinding Trace</span>
          </div>
          <div class="trace-body">
            <h3>Factorial Problem Unwinding</h3>
            <p style="font-size: 0.9rem; color: #94a3b8; margin-top: 0.5rem;">
              Each stack frame waits for its child recursive call to return a value before multiplying by <strong>n</strong>.
            </p>
            <div class="trace-visual-box">
              ${callStack.map(f => `<span class="trace-chip">${f.funcName}</span>`).join(' ➔ ')}
            </div>
          </div>
        </div>
      `;
    }

    html += `</div>`;
    this.container.innerHTML = html;
  }
}
