/**
 * AlgoVerse — Context-Aware Dynamic Input & Operation Panel Controller
 * Renders user-driven action forms for Array, Stack, Queue, Linked List, Hash Table, String, Recursion, Sorting & Searching.
 */

import { PresetStorageManager } from '../storage/presetStorage.js';

export class InputPanelController {
  constructor(onActionCallback) {
    this.onAction = onActionCallback;
    this.container = document.querySelector('.input-control-card');
    this.algo = 'bubble-sort';
    this.arraySubMode = '1d'; // '1d' | '2d'
    this.linkedListType = 'singly'; // 'singly' | 'doubly' | 'circular'
    this.hashMode = 'chaining'; // 'chaining' | 'probing'
    this.queueMode = 'linear'; // 'linear' | 'circular'
    this.presetStorage = new PresetStorageManager();
  }

  setAlgorithm(algoId) {
    this.algo = algoId;
    this.renderDeck();
  }

  init() {
    this.renderDeck();
  }

  renderDeck() {
    if (!this.container) return;

    if (this.algo === 'array-ops') {
      const is2D = this.arraySubMode === '2d';

      this.container.innerHTML = `
        <div class="ds-toolbar-card">
          <!-- Architecture Dimension Mode Switcher Bar -->
          <div class="array-mode-switcher-bar">
            <div class="mode-switch-left">
              <span class="mode-switch-title">Architecture Dimension:</span>
              <span class="mode-switch-desc">Switch between 1D contiguous RAM vector and 2D coordinate matrix</span>
            </div>
            <div class="mode-toggle-group">
              <button id="btn-mode-1d" class="mode-pill ${!is2D ? 'active' : ''}">1D Linear Array</button>
              <button id="btn-mode-2d" class="mode-pill ${is2D ? 'active' : ''}">2D Matrix (Grid)</button>
            </div>
          </div>

          ${!is2D ? `
          <!-- ==================== 1D ARRAY DECK ==================== -->
          <!-- 1. Streamlined Array Configuration Deck (Custom + Randomize) -->
          <div class="ds-selection-deck">
            <div class="selection-deck-header">
              <span class="selection-title">Array Configuration</span>
              <span class="selection-sub">Define custom values (comma-separated, max 10 elements) or generate random test data</span>
            </div>
            <div class="selection-controls-row">
              <div class="custom-input-group" style="width: 100%;">
                <div class="custom-input-bar">
                  <input type="text" id="arr-custom-input" class="ds-input-custom" placeholder="e.g. 10, 20, 30, 40, 50" value="10, 25, 7, 42, 18">
                  <button id="btn-arr-apply-custom" class="ds-btn ds-btn-apply">Apply Array</button>
                  <button id="btn-arr-gen-random" class="ds-btn ds-btn-random">Randomize</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Dynamic Live Metrics & Complexity Feedback Bar -->
          <div class="ds-metrics-bar">
            <div class="metrics-stat-chips">
              <span class="metric-chip">Length: <strong id="arr-meta-len">5</strong></span>
              <span class="metric-chip">Max Index: <strong id="arr-meta-max-idx">4</strong></span>
              <span class="metric-chip">Allocated: <strong id="arr-meta-bytes">20</strong> bytes (4B / int)</span>
            </div>
            
            <div class="op-complexity-badges">
              <div class="complexity-badge-card badge-time" id="card-time-complexity">
                <span class="badge-label">Time Complexity:</span>
                <strong id="val-time-complexity">O(1) - Ready</strong>
              </div>
              <div class="complexity-badge-card badge-space" id="card-space-complexity">
                <span class="badge-label">Space Complexity:</span>
                <strong id="val-space-complexity">O(1) - Constant</strong>
              </div>
            </div>
          </div>

          <!-- 3. Operation Color Legend Bar -->
          <div class="arr-color-legend-row">
            <span class="legend-chip"><span class="legend-dot dot-current"></span> Current / Access</span>
            <span class="legend-chip"><span class="legend-dot dot-found"></span> Found / Sorted</span>
            <span class="legend-chip"><span class="legend-dot dot-insert"></span> Inserting / Push</span>
            <span class="legend-chip"><span class="legend-dot dot-delete"></span> Deleting / Pop</span>
            <span class="legend-chip"><span class="legend-dot dot-indexed"></span> Indexed Target</span>
            <span class="legend-chip"><span class="legend-dot dot-move"></span> Moving / Shift</span>
          </div>

          <!-- 4. Grouped Operations Deck -->
          <div class="ds-grouped-deck">
            <!-- Group 1: End Operations (O(1)) -->
            <div class="op-cluster">
              <span class="cluster-tag">End Operations (O(1))</span>
              <div class="cluster-row">
                <input type="number" id="arr-push-val" class="ds-input-box" placeholder="Value" value="99">
                <button id="btn-arr-push" class="ds-btn ds-btn-push">+ Push</button>
                <button id="btn-arr-pop" class="ds-btn ds-btn-pop">− Pop</button>
              </div>
            </div>

            <!-- Group 2: Indexed Operations (O(N)) -->
            <div class="op-cluster">
              <span class="cluster-tag">Indexed Operations (O(N))</span>
              <div class="cluster-row">
                <input type="number" id="arr-idx-val" class="ds-input-box" placeholder="Value" value="45">
                <input type="number" id="arr-idx-num" class="ds-input-box" placeholder="Index" value="2">
                <button id="btn-arr-insert" class="ds-btn ds-btn-insert">+ Insert</button>
                <button id="btn-arr-remove" class="ds-btn ds-btn-remove">− Remove</button>
                <button id="btn-arr-access" class="ds-btn ds-btn-access">[i] Access</button>
              </div>
            </div>

            <!-- Group 3: Search & Utilities -->
            <div class="op-cluster">
              <span class="cluster-tag">Search & Array Utilities</span>
              <div class="cluster-row">
                <input type="number" id="arr-search-input" class="ds-input-box" placeholder="Target" value="25">
                <button id="btn-arr-search" class="ds-btn ds-btn-search"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Search</button>
                <button id="btn-arr-reverse" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 5h18"/><polyline points="7 23 3 19 7 15"/><path d="M21 19H3"/></svg> Reverse</button>
                <button id="btn-arr-shuffle" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg> Shuffle</button>
                <button id="btn-arr-reset" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Reset</button>
              </div>
            </div>
          </div>
          ` : `
          <!-- ==================== 2D MATRIX DECK ==================== -->
          <!-- 1. Matrix Configuration Deck -->
          <div class="ds-selection-deck">
            <div class="selection-deck-header">
              <span class="selection-title">2D Matrix Configuration</span>
              <span class="selection-sub">Standard 3 × 3 Multidimensional Matrix (9 Elements, 36 Bytes Contiguous Heap Memory)</span>
            </div>
            <div class="selection-controls-row">
              <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
                <button id="btn-mat-gen-random" class="ds-btn ds-btn-random">Randomize Matrix</button>
                <button id="btn-mat-reset" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Reset Matrix</button>
              </div>
            </div>
          </div>

          <!-- 2. Dynamic Live Metrics & Complexity Feedback Bar -->
          <div class="ds-metrics-bar">
            <div class="metrics-stat-chips">
              <span class="metric-chip">Dimension: <strong id="mat-meta-dim">3 × 3</strong></span>
              <span class="metric-chip">Total Elements: <strong id="mat-meta-cells">9</strong></span>
              <span class="metric-chip">Allocated: <strong id="mat-meta-bytes">36</strong> bytes (4B / cell)</span>
            </div>
            
            <div class="op-complexity-badges">
              <div class="complexity-badge-card badge-time" id="mat-card-time-complexity">
                <span class="badge-label">Time Complexity:</span>
                <strong id="mat-val-time-complexity">O(1) - Ready</strong>
              </div>
              <div class="complexity-badge-card badge-space" id="mat-card-space-complexity">
                <span class="badge-label">Space Complexity:</span>
                <strong id="mat-val-space-complexity">O(R × C) - Contiguous Block</strong>
              </div>
            </div>
          </div>

          <!-- 3. Operation Color Legend Bar -->
          <div class="arr-color-legend-row">
            <span class="legend-chip"><span class="legend-dot dot-current"></span> Active Cell / Access</span>
            <span class="legend-chip"><span class="legend-dot dot-found"></span> Target Found</span>
            <span class="legend-chip"><span class="legend-dot dot-move"></span> Projected Row/Col</span>
            <span class="legend-chip"><span class="legend-dot dot-insert"></span> Value Overwrite</span>
            <span class="legend-chip"><span class="legend-dot dot-indexed"></span> Traversal Trail</span>
            <span class="legend-chip"><span class="legend-dot" style="background: #a855f7;"></span> Transpose Pair</span>
          </div>

          <!-- 4. Grouped Operations Deck for 2D Matrix -->
          <div class="ds-grouped-deck">
            <!-- Group 1: Coordinate Addressing (O(1)) -->
            <div class="op-cluster">
              <span class="cluster-tag">Coordinate Addressing (O(1))</span>
              <div class="cluster-row">
                <input type="number" id="mat-row-num" class="ds-input-box" placeholder="Row (0-2)" min="0" max="2" value="1">
                <input type="number" id="mat-col-num" class="ds-input-box" placeholder="Col (0-2)" min="0" max="2" value="2">
                <button id="btn-mat-access" class="ds-btn ds-btn-access">[r, c] Access</button>
                <input type="number" id="mat-update-val" class="ds-input-box" placeholder="New Val" value="88">
                <button id="btn-mat-update" class="ds-btn ds-btn-insert">Update Cell</button>
              </div>
            </div>

            <!-- Group 2: Multidimensional Traversals -->
            <div class="op-cluster">
              <span class="cluster-tag">Traversal Algorithms</span>
              <div class="cluster-row">
                <button id="btn-mat-row-major" class="ds-btn ds-btn-push">Row-Major Scan (O(R×C))</button>
                <button id="btn-mat-col-major" class="ds-btn ds-btn-pop">Col-Major Scan (O(R×C))</button>
              </div>
            </div>

            <!-- Group 3: Matrix Transformations & Search -->
            <div class="op-cluster">
              <span class="cluster-tag">Transformations & Search</span>
              <div class="cluster-row">
                <button id="btn-mat-transpose" class="ds-btn ds-btn-ghost">Transpose Matrix (Aᵀ)</button>
                <input type="number" id="mat-search-target" class="ds-input-box" placeholder="Target" value="56">
                <button id="btn-mat-search" class="ds-btn ds-btn-search"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Search Matrix</button>
              </div>
            </div>
          </div>
          `}

          <!-- Dynamic Status Banner (Color Coded: Green/Red/Amber) -->
          <div id="arr-prompt-msg" class="ds-prompt-banner prompt-info">• Ready. Select an operation or switch architecture dimension above.</div>
        </div>
      `;
      this.bindArrayOpsEvents();

    } else if (this.algo === 'recursion-ops') {
      this.container.innerHTML = `
        <div class="ds-toolbar-card">
          <!-- Recursion Type Switcher -->
          <div class="array-mode-switcher-bar">
            <div class="mode-switch-left">
              <span class="mode-switch-title">Recursion Architecture — Call Stack & Tree:</span>
              <span class="mode-switch-desc">Visualize LIFO call frames (Factorial) or binary tree branching (Fibonacci)</span>
            </div>
          </div>

          <!-- Input Deck -->
          <div class="ds-selection-deck">
            <div class="selection-deck-header">
              <span class="selection-title">Input Configuration</span>
              <span class="selection-sub">Set depth N (1–6). Factorial builds a linear call stack; Fibonacci branches into a binary recursion tree.</span>
            </div>
            <div class="selection-controls-row">
              <div class="custom-input-group" style="width: 100%;">
                <div class="custom-input-bar" style="display: flex; flex-direction: column; gap: 0.6rem; align-items: stretch;">
                  <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <label for="rec-n-input" style="font-size: 0.82rem; color: var(--text-secondary); white-space: nowrap;">Input (N):</label>
                    <input type="number" id="rec-n-input" class="ds-input-custom" min="1" max="6" value="4" placeholder="N (1–6)" style="flex: 1;">
                    <button id="btn-rec-reset" class="ds-btn ds-btn-ghost" style="padding: 0.4rem 0.65rem;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Reset</button>
                  </div>
                  <div style="display: flex; gap: 0.5rem;">
                    <button id="btn-rec-factorial" class="ds-btn ds-btn-push" style="flex: 1; justify-content: center; background: rgba(139, 92, 246, 0.18); color: #c4b5fd; border-color: rgba(139, 92, 246, 0.4);">Factorial Stack</button>
                    <button id="btn-rec-fibonacci" class="ds-btn ds-btn-search" style="flex: 1; justify-content: center; background: rgba(236, 72, 153, 0.15); color: #f9a8d4; border-color: rgba(236, 72, 153, 0.35);">Fibonacci Tree</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Color Legend -->
          <div class="arr-color-legend-row">
            <span class="legend-chip"><span class="legend-dot" style="background:#c4b5fd;"></span> Active Frame (Executing)</span>
            <span class="legend-chip"><span class="legend-dot" style="background:#f9a8d4;"></span> Base Case (Returning)</span>
            <span class="legend-chip"><span class="legend-dot" style="background:#34d399;"></span> Returning Value (Unwinding)</span>
          </div>

          <!-- Live Metrics -->
          <div class="ds-metrics-bar">
            <div class="metrics-stat-chips">
              <span class="metric-chip">Mode: <strong id="rec-meta-mode">Factorial</strong></span>
              <span class="metric-chip">Input N: <strong id="rec-meta-n">4</strong></span>
            </div>
            <div class="op-complexity-badges">
              <div class="complexity-badge-card badge-time">
                <span class="badge-label">Time Complexity:</span>
                <strong id="rec-val-time">O(N) — Linear Stack Depth</strong>
              </div>
              <div class="complexity-badge-card badge-space">
                <span class="badge-label">Space Complexity:</span>
                <strong id="rec-val-space">O(N) — Call Stack Frames</strong>
              </div>
            </div>
          </div>

          <div id="rec-prompt-msg" class="ds-prompt-banner prompt-info">• Enter N and click Factorial Stack or Fibonacci Tree to visualize the recursion call sequence.</div>
        </div>
      `;
      this.bindRecursionEvents();

    } else if (this.algo === 'linked-list') {
      const typeLabel = this.linkedListType === 'doubly' 
        ? 'Doubly Linked List' 
        : (this.linkedListType === 'circular' ? 'Circular Linked List' : 'Singly Linked List');
      const typeSub = this.linkedListType === 'doubly'
        ? 'Bidirectional links: Each node maintains both prev and next pointers. Enables O(1) tail deletion.'
        : (this.linkedListType === 'circular'
          ? 'Ring buffer: Tail node points back to HEAD (tail.next == head). No terminal null pointer.'
          : 'One link per node, one direction forward. Follow the next pointer from head until it reaches null.');

      this.container.innerHTML = `
        <div class="ds-toolbar-card">
          <!-- 1. Header & Live Guide Bar -->
          <div class="ds-selection-deck">
            <div class="selection-deck-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
              <div style="flex: 1; min-width: 250px;">
                <span class="selection-title" id="ll-title-label">${typeLabel} Architecture</span>
                <span class="selection-sub" id="ll-sub-label">${typeSub}</span>
              </div>

              <!-- List Type Dropdown (Matching User Screenshot Image 1) -->
              <div class="ll-type-selector-card">
                <label class="ll-type-label" for="ll-type-select">List Type</label>
                <div class="ll-select-wrapper">
                  <select id="ll-type-select" class="ll-type-select">
                    <option value="singly" ${this.linkedListType === 'singly' ? 'selected' : ''}>Singly Linked List</option>
                    <option value="doubly" ${this.linkedListType === 'doubly' ? 'selected' : ''}>Doubly Linked List</option>
                    <option value="circular" ${this.linkedListType === 'circular' ? 'selected' : ''}>Circular Linked List</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="selection-controls-row">
              <div class="ds-metrics-bar" style="margin-bottom: 0; width: 100%;">
                <div class="metrics-stat-chips">
                  <span class="metric-chip">Nodes: <strong id="ll-meta-len">4</strong></span>
                  <span class="metric-chip">Head: <strong id="ll-meta-head">45</strong></span>
                  <span class="metric-chip">Tail Next: <strong id="ll-meta-tail" style="color: #94a3b8;">Ø null</strong></span>
                </div>
                
                <div class="op-complexity-badges">
                  <div class="complexity-badge-card badge-time" id="ll-card-time-complexity">
                    <span class="badge-label">Time Complexity:</span>
                    <strong id="ll-val-time-complexity">O(1) - Ready</strong>
                  </div>
                  <div class="complexity-badge-card badge-space" id="ll-card-space-complexity">
                    <span class="badge-label">Space Complexity:</span>
                    <strong id="ll-val-space-complexity">O(1) Auxiliary</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Operation Color Legend Bar -->
          <div class="arr-color-legend-row">
            <span class="legend-chip"><span class="legend-dot dot-current"></span> Traversal / Current</span>
            <span class="legend-chip"><span class="legend-dot dot-found"></span> Target Found</span>
            <span class="legend-chip"><span class="legend-dot dot-insert"></span> Node Allocated</span>
            <span class="legend-chip"><span class="legend-dot" style="background: #ef4444;"></span> Node Detached</span>
            <span class="legend-chip"><span class="legend-dot" style="background: #a855f7;"></span> Pointer Role (Prev/Next)</span>
          </div>

          <!-- 3. Clustered Operation Controls Deck -->
          <div class="ds-grouped-deck">
            <!-- Parameter Inputs -->
            <div class="op-cluster">
              <span class="cluster-tag">Node Parameters</span>
              <div class="cluster-row">
                <input type="number" id="ll-val-input" class="ds-input-box" placeholder="Value (e.g. 42)" value="42" style="width: 130px;">
                <input type="number" id="ll-idx-input" class="ds-input-box" placeholder="Index (0-based)" value="2" min="0" style="width: 120px;">
              </div>
            </div>

            <!-- Group 1: INSERT -->
            <div class="op-cluster">
              <span class="cluster-tag">Insert Operations</span>
              <div class="cluster-row">
                <button id="btn-ll-insert-head" class="ds-btn ds-btn-push" title="O(1) prepend at head">+ Prepend (Head)</button>
                <button id="btn-ll-insert-tail" class="ds-btn ds-btn-apply" title="O(N) append at tail">+ Append (Tail)</button>
                <button id="btn-ll-insert-idx" class="ds-btn ds-btn-insert" title="O(N) insert at position">+ Insert At Index</button>
              </div>
            </div>

            <!-- Group 2: REMOVE -->
            <div class="op-cluster">
              <span class="cluster-tag">Remove Operations</span>
              <div class="cluster-row">
                <button id="btn-ll-delete-head" class="ds-btn ds-btn-pop" title="O(1) remove head">− Pop Head</button>
                <button id="btn-ll-delete-idx" class="ds-btn ds-btn-pop" style="background: rgba(239, 68, 68, 0.12); color: #f87171; border-color: rgba(239, 68, 68, 0.3);" title="O(N) delete at position">− Del At Index</button>
                <button id="btn-ll-delete-val" class="ds-btn ds-btn-pop" style="background: rgba(239, 68, 68, 0.12); color: #f87171; border-color: rgba(239, 68, 68, 0.3);" title="O(N) delete by value">− Delete Val</button>
                <button id="btn-ll-clear" class="ds-btn ds-btn-ghost" title="Clear all nodes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Clear</button>
              </div>
            </div>

            <!-- Group 3: EXPLORE & GENERATE -->
            <div class="op-cluster">
              <span class="cluster-tag">Explore & Algorithms</span>
              <div class="cluster-row">
                <button id="btn-ll-search" class="ds-btn ds-btn-search" title="O(N) sequential search"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Search Val</button>
                <button id="btn-ll-traverse" class="ds-btn ds-btn-access" title="O(N) walk forward"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> Traverse</button>
                <button id="btn-ll-reverse" class="ds-btn ds-btn-ghost" style="border-color: rgba(168, 85, 247, 0.4); color: #c084fc;" title="O(N) 3-pointer in-place reverse"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 5h18"/><polyline points="7 23 3 19 7 15"/><path d="M21 19H3"/></svg> Reverse List</button>
                <button id="btn-ll-random" class="ds-btn ds-btn-random" title="Random list generator"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="16" r="1.5"/></svg> Randomize</button>
                <button id="btn-ll-reset" class="ds-btn ds-btn-ghost" title="Reset default starter list"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Reset</button>
              </div>
            </div>
          </div>

          <!-- Dynamic Status Banner -->
          <div id="ll-prompt-msg" class="ds-prompt-banner prompt-info">• Ready. Select an operation or configure node value and index above.</div>
        </div>
      `;
      this.bindLinkedListEvents();

    } else if (this.algo === 'hash-table') {
      const isProbing = this.hashMode === 'probing';
      this.container.innerHTML = `
        <div class="ds-toolbar-card">
          <!-- Collision Strategy Mode Switcher Bar -->
          <div class="array-mode-switcher-bar">
            <div class="mode-switch-left">
              <span class="mode-switch-title">Collision Resolution Strategy:</span>
              <span class="mode-switch-desc">Switch between Separate Chaining (Linked Lists per bucket) and Linear Probing (Open Addressing)</span>
            </div>
            <div class="mode-toggle-group">
              <button id="btn-hash-chaining" class="mode-pill ${!isProbing ? 'active' : ''}">Separate Chaining</button>
              <button id="btn-hash-probing" class="mode-pill ${isProbing ? 'active' : ''}">Linear Probing</button>
            </div>
          </div>

          <!-- Configuration & Key-Value Input Deck -->
          <div class="ds-selection-deck">
            <div class="selection-deck-header">
              <span class="selection-title">Key-Value Entry & Hashing</span>
              <span class="selection-sub">Computes polynomial rolling hash: h(k) = (&sum; s[i] &times; 31<sup>len-1-i</sup>) mod 8</span>
            </div>
            <div class="selection-controls-row">
              <div class="custom-input-group" style="width: 100%;">
                <div class="custom-input-bar">
                  <input type="text" id="hash-key-input" class="ds-input-custom" placeholder="Key (e.g. orange)" value="orange" style="flex: 1.2;">
                  <input type="number" id="hash-val-input" class="ds-input-custom" placeholder="Value (e.g. 500)" value="500" style="flex: 0.8;">
                  <button id="btn-hash-put" class="ds-btn ds-btn-apply">+ Put (Insert/Update)</button>
                  <button id="btn-hash-get" class="ds-btn ds-btn-search">Search (Get)</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Dynamic Live Metrics & Complexity Feedback Bar -->
          <div class="ds-metrics-bar">
            <div class="metrics-stat-chips">
              <span class="metric-chip">Buckets: <strong id="hash-meta-buckets">8</strong></span>
              <span class="metric-chip">Keys (n): <strong id="hash-meta-keys">3</strong></span>
              <span class="metric-chip">Load Factor (&lambda;): <strong id="hash-meta-load">0.38</strong></span>
              <span class="metric-chip">Status: <strong id="hash-meta-status" style="color: #10b981;">Optimal (&lambda; &le; 0.75)</strong></span>
            </div>
            <div class="op-complexity-badges">
              <div class="complexity-badge-card badge-time" id="hash-card-time">
                <span class="badge-label">Time Complexity:</span>
                <strong id="hash-val-time">O(1) Avg / O(n) Worst</strong>
              </div>
              <div class="complexity-badge-card badge-space" id="hash-card-space">
                <span class="badge-label">Space Complexity:</span>
                <strong id="hash-val-space">O(n + m) Auxiliary</strong>
              </div>
            </div>
          </div>

          <!-- Color Legend Bar -->
          <div class="arr-color-legend-row">
            <span class="legend-chip"><span class="legend-dot dot-current"></span> Active Hashing / Bucket</span>
            <span class="legend-chip"><span class="legend-dot dot-found"></span> Key Found</span>
            <span class="legend-chip"><span class="legend-dot dot-insert"></span> New Entry Inserted</span>
            <span class="legend-chip"><span class="legend-dot dot-delete"></span> Key Removed</span>
            <span class="legend-chip"><span class="legend-dot dot-move"></span> Linear Probe Hop</span>
          </div>

          <!-- Grouped Operations Deck -->
          <div class="ds-grouped-deck">
            <div class="op-cluster">
              <span class="cluster-tag">Table Actions</span>
              <div class="cluster-row">
                <button id="btn-hash-remove" class="ds-btn ds-btn-pop">− Remove Key</button>
                <button id="btn-hash-random" class="ds-btn ds-btn-random">Randomize</button>
                <button id="btn-hash-clear" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Clear</button>
                <button id="btn-hash-reset" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Reset Default</button>
              </div>
            </div>
          </div>

          <!-- Dynamic Status Banner -->
          <div id="hash-prompt-msg" class="ds-prompt-banner prompt-info">• Ready. Enter a key and value, then click Put, or select Search / Remove.</div>
        </div>
      `;
      this.bindHashTableEvents();

    } else if (this.algo === 'stack-ops') {
      this.container.innerHTML = `
        <div class="ds-toolbar-card">
          <!-- Architecture Header -->
          <div class="array-mode-switcher-bar">
            <div class="mode-switch-left">
              <span class="mode-switch-title">Stack Architecture (LIFO - Last In First Out):</span>
              <span class="mode-switch-desc">Sequential access with single point of entry/exit at the TOP pointer</span>
            </div>
            <div class="mode-toggle-group">
              <span class="mode-pill active">Vertical Chamber (Max 8)</span>
            </div>
          </div>

          <!-- Push Input Deck -->
          <div class="ds-selection-deck">
            <div class="selection-deck-header">
              <span class="selection-title">Stack Element Configuration</span>
              <span class="selection-sub">Enter an integer value to push onto the stack top</span>
            </div>
            <div class="selection-controls-row">
              <div class="custom-input-group" style="width: 100%;">
                <div class="custom-input-bar">
                  <input type="number" id="stack-val-input" class="ds-input-custom" placeholder="Value (e.g. 75)" value="75">
                  <button id="btn-stack-push" class="ds-btn ds-btn-push">+ Push TOP</button>
                  <button id="btn-stack-pop" class="ds-btn ds-btn-pop">− Pop TOP</button>
                  <button id="btn-stack-peek" class="ds-btn ds-btn-access">[T] Peek TOP</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Live Metrics & Complexity Feedback Bar -->
          <div class="ds-metrics-bar">
            <div class="metrics-stat-chips">
              <span class="metric-chip">Height: <strong id="stack-meta-height">4</strong> / 8</span>
              <span class="metric-chip">TOP Pointer: <strong id="stack-meta-top">[3]</strong></span>
              <span class="metric-chip">Is Empty: <strong id="stack-meta-empty">false</strong></span>
              <span class="metric-chip">Is Full: <strong id="stack-meta-full">false</strong></span>
            </div>
            <div class="op-complexity-badges">
              <div class="complexity-badge-card badge-time" id="stack-card-time">
                <span class="badge-label">Time Complexity:</span>
                <strong id="stack-val-time">O(1) - Constant</strong>
              </div>
              <div class="complexity-badge-card badge-space" id="stack-card-space">
                <span class="badge-label">Space Complexity:</span>
                <strong id="stack-val-space">O(N) - In-Memory</strong>
              </div>
            </div>
          </div>

          <!-- Color Legend Bar -->
          <div class="arr-color-legend-row">
            <span class="legend-chip"><span class="legend-dot dot-current"></span> TOP Element</span>
            <span class="legend-chip"><span class="legend-dot dot-insert"></span> Pushing In</span>
            <span class="legend-chip"><span class="legend-dot dot-delete"></span> Popping Out</span>
            <span class="legend-chip"><span class="legend-dot dot-indexed"></span> Peek Highlight</span>
          </div>

          <!-- Grouped Operations Deck -->
          <div class="ds-grouped-deck">
            <div class="op-cluster">
              <span class="cluster-tag">Stack Utilities</span>
              <div class="cluster-row">
                <button id="btn-stack-reverse" class="ds-btn ds-btn-insert" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border-color: rgba(168, 85, 247, 0.3);">Reverse Stack</button>
                <button id="btn-stack-random" class="ds-btn ds-btn-random">Randomize</button>
                <button id="btn-stack-clear" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Clear</button>
                <button id="btn-stack-reset" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Reset Default</button>
              </div>
            </div>
          </div>

          <!-- Dynamic Status Banner -->
          <div id="stack-prompt-msg" class="ds-prompt-banner prompt-info">• Ready. Push values to stack top or inspect with Peek.</div>
        </div>
      `;
      this.bindStackEvents();

    } else if (this.algo === 'queue-ops') {
      const isCircular = this.queueMode === 'circular';
      this.container.innerHTML = `
        <div class="ds-toolbar-card">
          <!-- Queue Mode Switcher Bar -->
          <div class="array-mode-switcher-bar">
            <div class="mode-switch-left">
              <span class="mode-switch-title">Queue Architecture (FIFO - First In First Out):</span>
              <span class="mode-switch-desc">Elements enter at REAR and depart from FRONT</span>
            </div>
            <div class="mode-toggle-group">
              <button id="btn-queue-linear" class="mode-pill ${!isCircular ? 'active' : ''}">Linear Conduit</button>
              <button id="btn-queue-circular" class="mode-pill ${isCircular ? 'active' : ''}">Circular Ring Buffer</button>
            </div>
          </div>

          <!-- Enqueue Input Deck -->
          <div class="ds-selection-deck">
            <div class="selection-deck-header">
              <span class="selection-title">Queue Element Configuration</span>
              <span class="selection-sub">Enter a value to enqueue at REAR (max capacity 8 elements)</span>
            </div>
            <div class="selection-controls-row">
              <div class="custom-input-group" style="width: 100%;">
                <div class="custom-input-bar">
                  <input type="number" id="queue-val-input" class="ds-input-custom" placeholder="Value (e.g. 50)" value="50">
                  <button id="btn-queue-enqueue" class="ds-btn ds-btn-push">+ Enqueue (Rear)</button>
                  <button id="btn-queue-dequeue" class="ds-btn ds-btn-pop">− Dequeue (Front)</button>
                  <button id="btn-queue-peek-front" class="ds-btn ds-btn-access">Peek Front</button>
                  <button id="btn-queue-peek-rear" class="ds-btn ds-btn-search">Peek Rear</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Live Metrics & Complexity Feedback Bar -->
          <div class="ds-metrics-bar">
            <div class="metrics-stat-chips">
              <span class="metric-chip">Size: <strong id="queue-meta-size">4</strong> / 8</span>
              <span class="metric-chip">FRONT: <strong id="queue-meta-front" style="color: #38bdf8;">[0]</strong></span>
              <span class="metric-chip">REAR: <strong id="queue-meta-rear" style="color: #10b981;">[3]</strong></span>
              <span class="metric-chip">Buffer: <strong>${isCircular ? 'Circular Wrap' : 'Linear Conduit'}</strong></span>
            </div>
            <div class="op-complexity-badges">
              <div class="complexity-badge-card badge-time" id="queue-card-time">
                <span class="badge-label">Time Complexity:</span>
                <strong id="queue-val-time">O(1) - Constant</strong>
              </div>
              <div class="complexity-badge-card badge-space" id="queue-card-space">
                <span class="badge-label">Space Complexity:</span>
                <strong id="queue-val-space">O(N) - Contiguous</strong>
              </div>
            </div>
          </div>

          <!-- Color Legend Bar -->
          <div class="arr-color-legend-row">
            <span class="legend-chip"><span class="legend-dot" style="background: #38bdf8;"></span> FRONT Pointer (Exit)</span>
            <span class="legend-chip"><span class="legend-dot" style="background: #10b981;"></span> REAR Pointer (Entry)</span>
            <span class="legend-chip"><span class="legend-dot dot-insert"></span> Enqueueing</span>
            <span class="legend-chip"><span class="legend-dot dot-delete"></span> Dequeueing</span>
          </div>

          <!-- Grouped Operations Deck -->
          <div class="ds-grouped-deck">
            <div class="op-cluster">
              <span class="cluster-tag">Queue Utilities</span>
              <div class="cluster-row">
                <button id="btn-queue-random" class="ds-btn ds-btn-random">Randomize</button>
                <button id="btn-queue-clear" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Clear</button>
                <button id="btn-queue-reset" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Reset Default</button>
              </div>
            </div>
          </div>

          <!-- Dynamic Status Banner -->
          <div id="queue-prompt-msg" class="ds-prompt-banner prompt-info">• Ready. Enqueue elements at REAR or Dequeue from FRONT.</div>
        </div>
      `;
      this.bindQueueEvents();

    } else if (this.algo === 'string-ops') {
      this.container.innerHTML = `
        <div class="ds-toolbar-card">
          <!-- Architecture Header -->
          <div class="array-mode-switcher-bar">
            <div class="mode-switch-left">
              <span class="mode-switch-title">String Architecture & Character Manipulation:</span>
              <span class="mode-switch-desc">UTF-16 contiguous character sequence with ASCII encoding inspect</span>
            </div>
            <div class="mode-toggle-group">
              <span class="mode-pill active">Ribbon Visualizer</span>
            </div>
          </div>

          <!-- Configuration Deck (Default: "algoverse") -->
          <div class="ds-selection-deck">
            <div class="selection-deck-header">
              <span class="selection-title">String Configuration</span>
              <span class="selection-sub">Custom string (max 16 chars) and target search substring</span>
            </div>
            <div class="selection-controls-row">
              <div class="custom-input-group" style="width: 100%;">
                <div class="custom-input-bar" style="display: flex; flex-direction: column; gap: 0.6rem; align-items: stretch;">
                  <input type="text" id="str-custom-input" class="ds-input-custom" placeholder="e.g. algoverse" value="algoverse" maxlength="16" style="width: 100%;">
                  <div style="display: flex; gap: 0.5rem;">
                    <button id="btn-str-apply" class="ds-btn ds-btn-apply" style="flex: 1; justify-content: center;">Apply String</button>
                    <button id="btn-str-random" class="ds-btn ds-btn-random" style="flex: 1; justify-content: center;">Random Word</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Substring Search Bar -->
          <div class="selection-controls-row" style="margin-top: 0.5rem;">
            <div class="custom-input-group" style="width: 100%;">
              <div class="custom-input-bar" style="display: flex; gap: 0.5rem;">
                <input type="text" id="str-search-input" class="ds-input-custom" placeholder="Search substring (e.g. verse)" value="verse" style="flex: 1;">
                <button id="btn-str-search" class="ds-btn ds-btn-search" style="flex: 1; justify-content: center;">Find Substring</button>
              </div>
            </div>
          </div>

          <!-- Live Metrics & Complexity Feedback Bar -->
          <div class="ds-metrics-bar">
            <div class="metrics-stat-chips">
              <span class="metric-chip">String: <strong id="str-meta-str">"algoverse"</strong></span>
              <span class="metric-chip">Length: <strong id="str-meta-len">9</strong> chars</span>
              <span class="metric-chip">Memory: <strong id="str-meta-bytes">18</strong> bytes (2B / char)</span>
            </div>
            <div class="op-complexity-badges">
              <div class="complexity-badge-card badge-time" id="str-card-time">
                <span class="badge-label">Time Complexity:</span>
                <strong id="str-val-time">O(n) - Linear</strong>
              </div>
              <div class="complexity-badge-card badge-space" id="str-card-space">
                <span class="badge-label">Space Complexity:</span>
                <strong id="str-val-space">O(1) - Auxiliary</strong>
              </div>
            </div>
          </div>

          <!-- Color Legend Bar -->
          <div class="arr-color-legend-row">
            <span class="legend-chip"><span class="legend-dot dot-current"></span> Active Scan / Swap</span>
            <span class="legend-chip"><span class="legend-dot" style="background: #a855f7;"></span> Two-Pointers (L / R)</span>
            <span class="legend-chip"><span class="legend-dot dot-found"></span> Substring Match</span>
            <span class="legend-chip"><span class="legend-dot dot-delete"></span> Mismatch</span>
          </div>

          <!-- Grouped Operations Deck -->
          <div class="ds-grouped-deck">
            <div class="op-cluster">
              <span class="cluster-tag">String Algorithms</span>
              <div class="cluster-row">
                <button id="btn-str-reverse" class="ds-btn ds-btn-push">Two-Pointer Reverse</button>
                <button id="btn-str-palindrome" class="ds-btn ds-btn-access">Palindrome Check</button>
                <button id="btn-str-frequency" class="ds-btn ds-btn-insert">Char Frequency</button>
                <button id="btn-str-upper" class="ds-btn ds-btn-ghost">Uppercase</button>
                <button id="btn-str-reset" class="ds-btn ds-btn-ghost"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Reset Default</button>
              </div>
            </div>
          </div>

          <!-- Dynamic Status Banner -->
          <div id="str-prompt-msg" class="ds-prompt-banner prompt-info">• Ready. Explore two-pointer reversal, palindrome test, or substring scan on "algoverse".</div>
        </div>
      `;
      this.bindStringEvents();

    } else if (this.algo === 'linear-search' || this.algo === 'binary-search') {
      const isLinear = this.algo === 'linear-search';
      this.container.innerHTML = `
        <div class="ds-toolbar-card">
          <!-- Algorithm selector -->
          <div class="array-mode-switcher-bar">
            <div class="mode-switch-left">
              <span class="mode-switch-title">Search Algorithm:</span>
              <span class="mode-switch-desc">${isLinear ? 'Sequential scan — works on any unsorted array. O(N) worst case.' : 'Divide &amp; Conquer — requires sorted array. O(log N) guaranteed.'}</span>
            </div>
            <div class="mode-toggle-group">
              <button id="btn-search-linear" class="mode-pill ${isLinear ? 'active' : ''}">Linear Search</button>
              <button id="btn-search-binary" class="mode-pill ${!isLinear ? 'active' : ''}">Binary Search</button>
            </div>
          </div>

          <!-- Array + Target Input Deck -->
          <div class="ds-selection-deck">
            <div class="selection-deck-header">
              <span class="selection-title">Dataset Configuration</span>
              <span class="selection-sub">${isLinear ? 'Array can be in any order. Target is located by scanning left to right.' : 'Array MUST be sorted (ascending). Binary search will fail on unsorted input.'}</span>
            </div>
            <div class="selection-controls-row">
              <div class="custom-input-group" style="width: 100%;">
                <div class="custom-input-bar" style="display: flex; flex-direction: column; gap: 0.6rem; align-items: stretch;">
                  <input type="text" id="custom-array-input" class="ds-input-custom" value="${isLinear ? '10, 25, 7, 42, 18, 33, 61, 9' : '5, 12, 18, 27, 34, 45, 67, 92'}" placeholder="Comma-separated values" style="width: 100%;">
                  <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <input type="number" id="search-target-input" class="ds-input-custom" value="${isLinear ? '42' : '27'}" placeholder="Target" style="width: 85px; flex-shrink: 0;">
                    <button id="btn-search-exec" class="ds-btn ds-btn-search" style="flex: 1.2; justify-content: center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> ${isLinear ? 'Linear Scan' : 'Binary Search'}</button>
                    <button id="btn-random-input" class="ds-btn ds-btn-random" style="flex: 1; justify-content: center;">Randomize</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Metrics Bar -->
          <div class="ds-metrics-bar">
            <div class="metrics-stat-chips">
              <span class="metric-chip">Algorithm: <strong style="color:${isLinear ? '#38bdf8' : '#10b981'}">${isLinear ? 'Linear Search' : 'Binary Search'}</strong></span>
              <span class="metric-chip">Prerequisite: <strong>${isLinear ? 'None (any order)' : 'Sorted Array'}</strong></span>
            </div>
            <div class="op-complexity-badges">
              <div class="complexity-badge-card badge-time">
                <span class="badge-label">Time Complexity:</span>
                <strong>${isLinear ? 'O(n) — Worst, O(1) Best' : 'O(log n) — Always'}</strong>
              </div>
              <div class="complexity-badge-card badge-space">
                <span class="badge-label">Space Complexity:</span>
                <strong>O(1) — No Extra Memory</strong>
              </div>
            </div>
          </div>

          <!-- Color Legend -->
          <div class="arr-color-legend-row">
            <span class="legend-chip"><span class="legend-dot dot-current"></span> Active Scan / Mid Pointer</span>
            <span class="legend-chip"><span class="legend-dot dot-found"></span> Target Found</span>
            <span class="legend-chip"><span class="legend-dot" style="background: #38bdf8;"></span> Search Range (low/high)</span>
          </div>

          <div id="search-prompt-msg" class="ds-prompt-banner prompt-info">• Configure your dataset and target value, then click the search button to animate.</div>
        </div>
      `;
      this.bindSearchEvents();

    } else {
      const algoTitles = {
        'bubble-sort': 'Bubble Sort',
        'selection-sort': 'Selection Sort',
        'insertion-sort': 'Insertion Sort',
        'merge-sort': 'Merge Sort',
        'quick-sort': 'Quick Sort'
      };
      const algoTime = {
        'bubble-sort': 'O(n²) Avg/Worst · O(n) Best',
        'selection-sort': 'O(n²) Always',
        'insertion-sort': 'O(n²) Avg/Worst · O(n) Best',
        'merge-sort': 'O(n log n) Always',
        'quick-sort': 'O(n log n) Avg · O(n²) Worst'
      };
      const algoSpace = {
        'bubble-sort': 'O(1) Auxiliary (In-Place)',
        'selection-sort': 'O(1) Auxiliary (In-Place)',
        'insertion-sort': 'O(1) Auxiliary (In-Place)',
        'merge-sort': 'O(n) Auxiliary Arrays',
        'quick-sort': 'O(log n) Call Stack'
      };

      const currentTitle = algoTitles[this.algo] || 'Sorting Algorithm';
      const currentTime = algoTime[this.algo] || 'O(n log n)';
      const currentSpace = algoSpace[this.algo] || 'O(1)';

      this.container.innerHTML = `
        <div class="ds-toolbar-card">
          <div class="array-mode-switcher-bar">
            <div class="mode-switch-left">
              <span class="mode-switch-title">${currentTitle} — Dataset:</span>
              <span class="mode-switch-desc">Configure input array and animate sorting steps.</span>
            </div>
          </div>

          <div class="ds-selection-deck">
            <div class="selection-deck-header">
              <span class="selection-title">Array Configuration</span>
              <span class="selection-sub">Integer values 1–100 (comma-separated, max 10 elements).</span>
            </div>
            <div class="selection-controls-row">
              <div class="custom-input-group" style="width: 100%;">
                <div class="custom-input-bar" style="display: flex; flex-direction: column; gap: 0.6rem; align-items: stretch;">
                  <input type="text" id="custom-array-input" class="ds-input-custom" value="45, 18, 85, 32, 92, 23, 67, 12" placeholder="e.g. 25, 12, 40, 8" style="width: 100%;">
                  <div style="display: flex; gap: 0.5rem;">
                    <button id="btn-apply-input" class="ds-btn ds-btn-apply" style="flex: 1; justify-content: center;">Apply Array</button>
                    <button id="btn-random-input" class="ds-btn ds-btn-random" style="flex: 1; justify-content: center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="16" r="1.5"/></svg> Randomize</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Complexity Metrics -->
          <div class="ds-metrics-bar">
            <div class="op-complexity-badges" style="width: 100%;">
              <div class="complexity-badge-card badge-time" style="flex: 1;">
                <span class="badge-label">Time Complexity:</span>
                <strong>${currentTime}</strong>
              </div>
              <div class="complexity-badge-card badge-space" style="flex: 1;">
                <span class="badge-label">Space Complexity:</span>
                <strong>${currentSpace}</strong>
              </div>
            </div>
          </div>

          <div class="arr-color-legend-row">
            <span class="legend-chip"><span class="legend-dot" style="background:#f59e0b;"></span> Comparing</span>
            <span class="legend-chip"><span class="legend-dot" style="background:#ef4444;"></span> Swapping</span>
            <span class="legend-chip"><span class="legend-dot" style="background:#3b82f6;"></span> Pivot / Key</span>
            <span class="legend-chip"><span class="legend-dot" style="background:#10b981;"></span> Sorted</span>
          </div>

          <div id="sort-prompt-msg" class="ds-prompt-banner prompt-info">• Press Play on the transport bar to animate the sort step-by-step.</div>
        </div>
      `;
      this.bindDefaultEvents();
    }
  }

  updatePrompt(text) {
    const promptEl = document.getElementById('arr-prompt-msg');
    if (!promptEl) return;

    promptEl.textContent = text;
    promptEl.classList.remove('prompt-success', 'prompt-error', 'prompt-info');

    if (text.startsWith('✓')) {
      promptEl.classList.add('prompt-success');
    } else if (text.startsWith('✗')) {
      promptEl.classList.add('prompt-error');
    } else {
      promptEl.classList.add('prompt-info');
    }
  }

  bindArrayOpsEvents() {
    // Mode Switcher Listeners
    document.getElementById('btn-mode-1d')?.addEventListener('click', () => {
      if (this.arraySubMode === '1d') return;
      this.arraySubMode = '1d';
      this.renderDeck();
      this.triggerAction('switch-submode', '1d');
    });

    document.getElementById('btn-mode-2d')?.addEventListener('click', () => {
      if (this.arraySubMode === '2d') return;
      this.arraySubMode = '2d';
      this.renderDeck();
      this.triggerAction('switch-submode', '2d');
    });

    if (this.arraySubMode === '2d') {
      const matRowInput = document.getElementById('mat-row-num');
      const matColInput = document.getElementById('mat-col-num');
      const matUpdateInput = document.getElementById('mat-update-val');
      const matSearchInput = document.getElementById('mat-search-target');

      document.getElementById('btn-mat-access')?.addEventListener('click', () => {
        const row = Number(matRowInput?.value) || 0;
        const col = Number(matColInput?.value) || 0;
        this.triggerAction('access', null, null, null, { row, col });
        this.updateMatrixComplexity('access');
      });

      document.getElementById('btn-mat-update')?.addEventListener('click', () => {
        const row = Number(matRowInput?.value) || 0;
        const col = Number(matColInput?.value) || 0;
        const val = Number(matUpdateInput?.value) || 88;
        this.triggerAction('update', null, null, null, { row, col, val });
        this.updateMatrixComplexity('update');
      });

      document.getElementById('btn-mat-row-major')?.addEventListener('click', () => {
        this.triggerAction('row-major');
        this.updateMatrixComplexity('row-major');
      });

      document.getElementById('btn-mat-col-major')?.addEventListener('click', () => {
        this.triggerAction('col-major');
        this.updateMatrixComplexity('col-major');
      });

      document.getElementById('btn-mat-transpose')?.addEventListener('click', () => {
        this.triggerAction('transpose');
        this.updateMatrixComplexity('transpose');
      });

      document.getElementById('btn-mat-search')?.addEventListener('click', () => {
        const target = Number(matSearchInput?.value) || 56;
        this.triggerAction('search', null, null, null, { target });
        this.updateMatrixComplexity('search');
      });

      document.getElementById('btn-mat-gen-random')?.addEventListener('click', () => {
        this.triggerAction('randomize');
        this.updateMatrixComplexity('randomize');
      });

      document.getElementById('btn-mat-reset')?.addEventListener('click', () => {
        this.triggerAction('reset');
        this.updateMatrixComplexity('reset');
      });

      return;
    }

    // 1D Linear Events
    const pushValInput = document.getElementById('arr-push-val');
    const idxValInput = document.getElementById('arr-idx-val');
    const idxNumInput = document.getElementById('arr-idx-num');
    const searchInput = document.getElementById('arr-search-input');
    const customInput = document.getElementById('arr-custom-input');

    document.getElementById('btn-arr-apply-custom')?.addEventListener('click', () => {
      const raw = customInput?.value || '';
      const parsed = raw.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
      if (parsed.length === 0) {
        this.updatePrompt('✗ Invalid Input: Please enter comma-separated numbers (e.g. 10, 20, 30).');
        return;
      }
      const finalArr = parsed.slice(0, 10);
      if (parsed.length > 10) {
        this.updatePrompt('• Truncated to 10 elements for optimal on-screen visualization.');
      }
      this.triggerAction('custom', null, null, finalArr);
      this.updateMetadata(finalArr.length);
      this.updateComplexity('custom');
    });

    document.getElementById('btn-arr-gen-random')?.addEventListener('click', () => {
      const count = Math.floor(Math.random() * 3) + 5; // 5 to 7 items
      const randArr = Array.from({ length: count }, () => Math.floor(Math.random() * 89) + 10);
      if (customInput) customInput.value = randArr.join(', ');
      this.triggerAction('custom', null, null, randArr);
      this.updateMetadata(randArr.length);
      this.updateComplexity('custom');
    });

    // Group 1: End Operations
    document.getElementById('btn-arr-push')?.addEventListener('click', () => {
      const val = pushValInput?.value !== '' ? Number(pushValInput.value) : 99;
      this.triggerAction('push', val);
      this.updateComplexity('push');
    });

    document.getElementById('btn-arr-pop')?.addEventListener('click', () => {
      this.triggerAction('pop');
      this.updateComplexity('pop');
    });

    // Group 2: Indexed Operations
    document.getElementById('btn-arr-insert')?.addEventListener('click', () => {
      const val = idxValInput?.value !== '' ? Number(idxValInput.value) : 45;
      const idx = idxNumInput?.value !== '' ? Number(idxNumInput.value) : 2;
      this.triggerAction('insert', val, idx);
      this.updateComplexity('insert');
    });

    document.getElementById('btn-arr-remove')?.addEventListener('click', () => {
      const idx = idxNumInput?.value !== '' ? Number(idxNumInput.value) : 0;
      this.triggerAction('remove', null, idx);
      this.updateComplexity('remove');
    });

    document.getElementById('btn-arr-access')?.addEventListener('click', () => {
      const idx = idxNumInput?.value !== '' ? Number(idxNumInput.value) : 0;
      this.triggerAction('access', null, idx);
      this.updateComplexity('access');
    });

    // Group 3: Search & Utilities
    document.getElementById('btn-arr-search')?.addEventListener('click', () => {
      const targetVal = searchInput?.value !== '' ? Number(searchInput.value) : 25;
      this.triggerAction('search', targetVal);
      this.updateComplexity('search');
    });

    document.getElementById('btn-arr-reverse')?.addEventListener('click', () => {
      this.triggerAction('reverse');
      this.updateComplexity('reverse');
    });

    document.getElementById('btn-arr-shuffle')?.addEventListener('click', () => {
      this.triggerAction('shuffle');
      this.updateComplexity('shuffle');
    });

    document.getElementById('btn-arr-reset')?.addEventListener('click', () => {
      this.triggerAction('reset');
      this.updateComplexity('reset');
      if (customInput) customInput.value = '10, 25, 7, 42, 18';
    });
  }

  updateMetadata(length = 0) {
    const lenEl = document.getElementById('arr-meta-len');
    const maxIdxEl = document.getElementById('arr-meta-max-idx');
    const bytesEl = document.getElementById('arr-meta-bytes');
    if (lenEl) lenEl.textContent = length;
    if (maxIdxEl) maxIdxEl.textContent = Math.max(0, length - 1);
    if (bytesEl) bytesEl.textContent = length * 4;
  }

  updateComplexity(actionType) {
    const timeEl = document.getElementById('val-time-complexity');
    const spaceEl = document.getElementById('val-space-complexity');
    if (!timeEl || !spaceEl) return;

    const map = {
      'push': { time: 'O(1) - Amortized append at end', space: 'O(1) - Constant extra space' },
      'pop': { time: 'O(1) - Direct removal without shifts', space: 'O(1) - Constant extra space' },
      'insert': { time: 'O(n) - Shifts subsequent elements right', space: 'O(1) - In-place shifting' },
      'remove': { time: 'O(n) - Shifts subsequent elements left', space: 'O(1) - In-place shifting' },
      'access': { time: 'O(1) - Direct base + (idx × 4) address', space: 'O(1) - Constant' },
      'search': { time: 'O(n) - Sequential element scan', space: 'O(1) - Constant' },
      'reverse': { time: 'O(n) - Two-pointer in-place traversal', space: 'O(1) - Constant' },
      'shuffle': { time: 'O(n) - Fisher-Yates random permutation', space: 'O(1) - Constant' },
      'custom': { time: 'O(n) - Contiguous allocation & copy', space: 'O(n) - Contiguous buffer' },
      'preset': { time: 'O(n) - Contiguous allocation & copy', space: 'O(n) - Contiguous buffer' },
      'reset': { time: 'O(1) - Reinitialized starter buffer', space: 'O(1) - Starter buffer' }
    };

    const info = map[actionType] || { time: 'O(1) - Ready', space: 'O(1) - Constant' };
    timeEl.textContent = info.time;
    spaceEl.textContent = info.space;
  }

  bindRecursionEvents() {
    const nInput = document.getElementById('rec-n-input');

    const updateRecMeta = (mode, n) => {
      const modeEl = document.getElementById('rec-meta-mode');
      const nEl = document.getElementById('rec-meta-n');
      const timeEl = document.getElementById('rec-val-time');
      const spaceEl = document.getElementById('rec-val-space');
      if (modeEl) modeEl.textContent = mode;
      if (nEl) nEl.textContent = n;
      if (timeEl) timeEl.textContent = mode === 'Fibonacci' ? 'O(2ⁿ) — Exponential Branching' : 'O(N) — Linear Stack Depth';
      if (spaceEl) spaceEl.textContent = mode === 'Fibonacci' ? 'O(N) — Max Recursion Depth' : 'O(N) — Call Stack Frames';
    };

    document.getElementById('btn-rec-factorial')?.addEventListener('click', () => {
      const n = nInput?.value || 4;
      updateRecMeta('Factorial', n);
      this.triggerAction('factorial', nInput?.value);
    });
    document.getElementById('btn-rec-fibonacci')?.addEventListener('click', () => {
      const n = nInput?.value || 4;
      updateRecMeta('Fibonacci', n);
      this.triggerAction('fibonacci', nInput?.value);
    });
    document.getElementById('btn-rec-reset')?.addEventListener('click', () => {
      if (nInput) nInput.value = 4;
      updateRecMeta('Factorial', 4);
      this.triggerAction('factorial', 4);
    });
  }

  bindLinkedListEvents() {
    const valInput = document.getElementById('ll-val-input');
    const idxInput = document.getElementById('ll-idx-input');

    document.getElementById('btn-ll-insert-head')?.addEventListener('click', () => {
      const val = valInput?.value !== '' ? Number(valInput.value) : 99;
      this.triggerAction('insert-head', val);
      this.updateLinkedListComplexity('insert-head');
    });

    document.getElementById('btn-ll-insert-tail')?.addEventListener('click', () => {
      const val = valInput?.value !== '' ? Number(valInput.value) : 77;
      this.triggerAction('insert-tail', val);
      this.updateLinkedListComplexity('insert-tail');
    });

    document.getElementById('btn-ll-insert-idx')?.addEventListener('click', () => {
      const val = valInput?.value !== '' ? Number(valInput.value) : 55;
      const idx = idxInput?.value !== '' ? Number(idxInput.value) : 2;
      this.triggerAction('insert-index', val, null, null, { index: idx });
      this.updateLinkedListComplexity('insert-index');
    });

    document.getElementById('btn-ll-delete-head')?.addEventListener('click', () => {
      this.triggerAction('delete-head');
      this.updateLinkedListComplexity('delete-head');
    });

    document.getElementById('btn-ll-delete-idx')?.addEventListener('click', () => {
      const idx = idxInput?.value !== '' ? Number(idxInput.value) : 1;
      this.triggerAction('delete-index', null, null, null, { index: idx });
      this.updateLinkedListComplexity('delete-index');
    });

    document.getElementById('btn-ll-delete-val')?.addEventListener('click', () => {
      const val = valInput?.value !== '' ? Number(valInput.value) : 18;
      this.triggerAction('delete-val', val);
      this.updateLinkedListComplexity('delete-val');
    });

    document.getElementById('btn-ll-clear')?.addEventListener('click', () => {
      this.triggerAction('clear');
      this.updateLinkedListComplexity('clear');
    });

    document.getElementById('btn-ll-search')?.addEventListener('click', () => {
      const target = valInput?.value !== '' ? Number(valInput.value) : 18;
      this.triggerAction('search', null, target);
      this.updateLinkedListComplexity('search');
    });

    document.getElementById('btn-ll-traverse')?.addEventListener('click', () => {
      this.triggerAction('traverse');
      this.updateLinkedListComplexity('traverse');
    });

    document.getElementById('btn-ll-reverse')?.addEventListener('click', () => {
      this.triggerAction('reverse');
      this.updateLinkedListComplexity('reverse');
    });

    document.getElementById('btn-ll-random')?.addEventListener('click', () => {
      this.triggerAction('random');
      this.updateLinkedListComplexity('random');
    });

    document.getElementById('btn-ll-reset')?.addEventListener('click', () => {
      this.triggerAction('reset');
      this.updateLinkedListComplexity('reset');
    });

    // List Type Dropdown Event Listener
    const typeSelect = document.getElementById('ll-type-select');
    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        this.linkedListType = e.target.value;
        const titleEl = document.getElementById('ll-title-label');
        const subEl = document.getElementById('ll-sub-label');
        if (titleEl) {
          titleEl.textContent = this.linkedListType === 'doubly' 
            ? 'Doubly Linked List Architecture' 
            : (this.linkedListType === 'circular' ? 'Circular Linked List Architecture' : 'Singly Linked List Architecture');
        }
        if (subEl) {
          subEl.textContent = this.linkedListType === 'doubly'
            ? 'Bidirectional links: Each node maintains both prev and next pointers. Enables O(1) tail deletion.'
            : (this.linkedListType === 'circular'
              ? 'Ring buffer: Tail node points back to HEAD (tail.next == head). No terminal null pointer.'
              : 'One link per node, one direction forward. Follow the next pointer from head until it reaches null.');
        }
        this.triggerAction('change-type', null, null, null, { listType: this.linkedListType });
      });
    }
  }

  updateLinkedListMetadata(nodes = [], listType = this.linkedListType) {
    const lenEl = document.getElementById('ll-meta-len');
    const headEl = document.getElementById('ll-meta-head');
    const tailEl = document.getElementById('ll-meta-tail');
    if (lenEl) lenEl.textContent = nodes.length;
    if (headEl) headEl.textContent = nodes.length > 0 ? `${nodes[0].data}` : 'null';
    if (tailEl) {
      if (listType === 'circular' && nodes.length > 0) {
        tailEl.textContent = `${nodes[0].address} (HEAD)`;
        tailEl.style.color = '#f59e0b';
      } else {
        tailEl.textContent = 'Ø null';
        tailEl.style.color = '#94a3b8';
      }
    }
  }

  updateLinkedListComplexity(actionType) {
    const timeEl = document.getElementById('ll-val-time-complexity');
    const spaceEl = document.getElementById('ll-val-space-complexity');
    if (!timeEl || !spaceEl) return;

    const map = {
      'insert-head': { time: 'O(1) - Prepend at head', space: 'O(1) - Single node allocation' },
      'insert-tail': { time: 'O(n) - Traverse to tail (curr.next == null)', space: 'O(1) - Single node allocation' },
      'insert-index': { time: 'O(n) - Traverse to index - 1', space: 'O(1) - In-place rewire' },
      'delete-head': { time: 'O(1) - Head pointer advance', space: 'O(1) - Garbage collected' },
      'delete-index': { time: 'O(n) - Traverse to index - 1', space: 'O(1) - In-place rewire' },
      'delete-val': { time: 'O(n) - Linear search and un-link', space: 'O(1) - In-place rewire' },
      'search': { time: 'O(n) - Sequential pointer hop', space: 'O(1) - Constant' },
      'traverse': { time: 'O(n) - Linear head-to-null walk', space: 'O(1) - Constant' },
      'reverse': { time: 'O(n) - 3-pointer in-place pointer flip', space: 'O(1) - In-place reversal' },
      'clear': { time: 'O(1) - Sever head reference', space: 'O(1) - GC sweeps heap' },
      'random': { time: 'O(n) - N heap node allocations', space: 'O(n) - Heap memory' },
      'reset': { time: 'O(1) - Starter nodes reloaded', space: 'O(1) - Constant' }
    };

    const info = map[actionType] || { time: 'O(1) - Ready', space: 'O(1) Auxiliary' };
    timeEl.textContent = info.time;
    spaceEl.textContent = info.space;
  }

  updateLinkedListPrompt(msg = '') {
    const el = document.getElementById('ll-prompt-msg');
    if (!el) return;
    el.textContent = msg;
    el.className = 'ds-prompt-banner prompt-info';
    if (msg.includes('MATCH FOUND') || msg.includes('Complete')) {
      el.className = 'ds-prompt-banner prompt-success';
    } else if (msg.includes('Underflow') || msg.includes('Warning') || msg.includes('not found')) {
      el.className = 'ds-prompt-banner prompt-warn';
    }
  }

  bindHashTableEvents() {
    const keyInput = document.getElementById('hash-key-input');
    const valInput = document.getElementById('hash-val-input');

    document.getElementById('btn-hash-chaining')?.addEventListener('click', () => {
      if (this.hashMode === 'chaining') return;
      this.hashMode = 'chaining';
      this.renderDeck();
      this.triggerAction('change-mode', null, null, null, { hashMode: 'chaining' });
    });

    document.getElementById('btn-hash-probing')?.addEventListener('click', () => {
      if (this.hashMode === 'probing') return;
      this.hashMode = 'probing';
      this.renderDeck();
      this.triggerAction('change-mode', null, null, null, { hashMode: 'probing' });
    });

    document.getElementById('btn-hash-put')?.addEventListener('click', () => {
      const k = keyInput?.value?.trim() || 'orange';
      const v = Number(valInput?.value) || 500;
      this.triggerAction('put', v, k, null, { hashMode: this.hashMode });
      this.updateHashTableComplexity('put');
    });

    document.getElementById('btn-hash-get')?.addEventListener('click', () => {
      const k = keyInput?.value?.trim() || 'apple';
      this.triggerAction('get', null, k, null, { hashMode: this.hashMode });
      this.updateHashTableComplexity('get');
    });

    document.getElementById('btn-hash-remove')?.addEventListener('click', () => {
      const k = keyInput?.value?.trim() || 'apple';
      this.triggerAction('remove', null, k, null, { hashMode: this.hashMode });
      this.updateHashTableComplexity('remove');
    });

    document.getElementById('btn-hash-random')?.addEventListener('click', () => {
      this.triggerAction('random', null, null, null, { hashMode: this.hashMode });
      this.updateHashTableComplexity('random');
    });

    document.getElementById('btn-hash-clear')?.addEventListener('click', () => {
      this.triggerAction('clear', null, null, null, { hashMode: this.hashMode });
      this.updateHashTableComplexity('clear');
    });

    document.getElementById('btn-hash-reset')?.addEventListener('click', () => {
      this.triggerAction('reset', null, null, null, { hashMode: this.hashMode });
      this.updateHashTableComplexity('reset');
      if (keyInput) keyInput.value = 'orange';
      if (valInput) valInput.value = '500';
    });
  }

  bindStackEvents() {
    const valInput = document.getElementById('stack-val-input');

    document.getElementById('btn-stack-push')?.addEventListener('click', () => {
      const val = valInput?.value !== '' ? Number(valInput.value) : 75;
      this.triggerAction('push', val);
      this.updateStackComplexity('push');
    });

    document.getElementById('btn-stack-pop')?.addEventListener('click', () => {
      this.triggerAction('pop');
      this.updateStackComplexity('pop');
    });

    document.getElementById('btn-stack-peek')?.addEventListener('click', () => {
      this.triggerAction('peek');
      this.updateStackComplexity('peek');
    });

    document.getElementById('btn-stack-reverse')?.addEventListener('click', () => {
      this.triggerAction('reverse');
      this.updateStackComplexity('reverse');
    });

    document.getElementById('btn-stack-random')?.addEventListener('click', () => {
      this.triggerAction('random');
      this.updateStackComplexity('random');
    });

    document.getElementById('btn-stack-clear')?.addEventListener('click', () => {
      this.triggerAction('clear');
      this.updateStackComplexity('clear');
    });

    document.getElementById('btn-stack-reset')?.addEventListener('click', () => {
      this.triggerAction('reset');
      this.updateStackComplexity('reset');
      if (valInput) valInput.value = '75';
    });
  }

  bindQueueEvents() {
    const valInput = document.getElementById('queue-val-input');

    document.getElementById('btn-queue-linear')?.addEventListener('click', () => {
      if (this.queueMode === 'linear') return;
      this.queueMode = 'linear';
      this.renderDeck();
      this.triggerAction('change-mode', null, null, null, { queueMode: 'linear' });
    });

    document.getElementById('btn-queue-circular')?.addEventListener('click', () => {
      if (this.queueMode === 'circular') return;
      this.queueMode = 'circular';
      this.renderDeck();
      this.triggerAction('change-mode', null, null, null, { queueMode: 'circular' });
    });

    document.getElementById('btn-queue-enqueue')?.addEventListener('click', () => {
      const val = valInput?.value !== '' ? Number(valInput.value) : 50;
      this.triggerAction('enqueue', val, null, null, { queueMode: this.queueMode });
      this.updateQueueComplexity('enqueue');
    });

    document.getElementById('btn-queue-dequeue')?.addEventListener('click', () => {
      this.triggerAction('dequeue', null, null, null, { queueMode: this.queueMode });
      this.updateQueueComplexity('dequeue');
    });

    document.getElementById('btn-queue-peek-front')?.addEventListener('click', () => {
      this.triggerAction('peek-front', null, null, null, { queueMode: this.queueMode });
      this.updateQueueComplexity('peek-front');
    });

    document.getElementById('btn-queue-peek-rear')?.addEventListener('click', () => {
      this.triggerAction('peek-rear', null, null, null, { queueMode: this.queueMode });
      this.updateQueueComplexity('peek-rear');
    });

    document.getElementById('btn-queue-random')?.addEventListener('click', () => {
      this.triggerAction('random', null, null, null, { queueMode: this.queueMode });
      this.updateQueueComplexity('random');
    });

    document.getElementById('btn-queue-clear')?.addEventListener('click', () => {
      this.triggerAction('clear', null, null, null, { queueMode: this.queueMode });
      this.updateQueueComplexity('clear');
    });

    document.getElementById('btn-queue-reset')?.addEventListener('click', () => {
      this.triggerAction('reset', null, null, null, { queueMode: this.queueMode });
      this.updateQueueComplexity('reset');
      if (valInput) valInput.value = '50';
    });
  }

  bindStringEvents() {
    const customInput = document.getElementById('str-custom-input');
    const searchInput = document.getElementById('str-search-input');

    document.getElementById('btn-str-apply')?.addEventListener('click', () => {
      const s = customInput?.value?.trim() || 'algoverse';
      this.triggerAction('custom', s);
      this.updateStringMetadata(s);
      this.updateStringComplexity('custom');
    });

    document.getElementById('btn-str-random')?.addEventListener('click', () => {
      const words = ['algoverse', 'developer', 'racecar', 'structure', 'javascript', 'matrix', 'computer'];
      const chosen = words[Math.floor(Math.random() * words.length)];
      if (customInput) customInput.value = chosen;
      this.triggerAction('custom', chosen);
      this.updateStringMetadata(chosen);
      this.updateStringComplexity('custom');
    });

    document.getElementById('btn-str-reverse')?.addEventListener('click', () => {
      this.triggerAction('reverse');
      this.updateStringComplexity('reverse');
    });

    document.getElementById('btn-str-palindrome')?.addEventListener('click', () => {
      this.triggerAction('palindrome');
      this.updateStringComplexity('palindrome');
    });

    document.getElementById('btn-str-search')?.addEventListener('click', () => {
      const pat = searchInput?.value?.trim() || 'verse';
      this.triggerAction('search', pat);
      this.updateStringComplexity('search');
    });

    document.getElementById('btn-str-frequency')?.addEventListener('click', () => {
      this.triggerAction('frequency');
      this.updateStringComplexity('frequency');
    });

    document.getElementById('btn-str-upper')?.addEventListener('click', () => {
      this.triggerAction('upper');
      this.updateStringComplexity('upper');
    });

    document.getElementById('btn-str-reset')?.addEventListener('click', () => {
      this.triggerAction('reset', 'algoverse');
      if (customInput) customInput.value = 'algoverse';
      if (searchInput) searchInput.value = 'verse';
      this.updateStringMetadata('algoverse');
      this.updateStringComplexity('reset');
    });
  }

  updateHashTableMetadata(keysCount = 0, capacity = 8, mode = this.hashMode) {
    const bucketsEl = document.getElementById('hash-meta-buckets');
    const keysEl = document.getElementById('hash-meta-keys');
    const loadEl = document.getElementById('hash-meta-load');
    const statusEl = document.getElementById('hash-meta-status');
    if (bucketsEl) bucketsEl.textContent = capacity;
    if (keysEl) keysEl.textContent = keysCount;
    if (loadEl) {
      const lf = (keysCount / capacity).toFixed(2);
      loadEl.textContent = lf;
      if (statusEl) {
        if (lf > 0.75) {
          statusEl.textContent = 'Warning: λ > 0.75 (Rehash recommended)';
          statusEl.style.color = '#ef4444';
        } else {
          statusEl.textContent = 'Optimal (λ ≤ 0.75)';
          statusEl.style.color = '#10b981';
        }
      }
    }
  }

  updateHashTableComplexity(action) {
    const timeEl = document.getElementById('hash-val-time');
    const spaceEl = document.getElementById('hash-card-space')?.querySelector('strong');
    if (!timeEl) return;
    const map = {
      'put': { time: 'O(1) Avg / O(n) Worst', space: 'O(1) Entry allocation' },
      'get': { time: 'O(1) Avg / O(n) Worst (Chain walk)', space: 'O(1) In-place' },
      'remove': { time: 'O(1) Avg / O(n) Worst', space: 'O(1) In-place' },
      'clear': { time: 'O(m) - Clear all m bucket heads', space: 'O(1) GC cleanup' },
      'random': { time: 'O(k) - Insert k random items', space: 'O(k) Entries' },
      'reset': { time: 'O(1) - Load starter entries', space: 'O(1) Constant' }
    };
    const info = map[action] || { time: 'O(1) Ready', space: 'O(n + m) Table' };
    timeEl.textContent = info.time;
    if (spaceEl) spaceEl.textContent = info.space;
  }

  updateHashTablePrompt(msg = '') {
    const el = document.getElementById('hash-prompt-msg');
    if (!el) return;
    el.textContent = msg;
    el.className = 'ds-prompt-banner prompt-info';
    if (msg.includes('✓') || msg.includes('SUCCESS') || msg.includes('Found')) {
      el.className = 'ds-prompt-banner prompt-success';
    } else if (msg.includes('✗') || msg.includes('OVERFLOW') || msg.includes('Warning') || msg.includes('not found')) {
      el.className = 'ds-prompt-banner prompt-warn';
    }
  }

  updateStackMetadata(height = 0, maxCap = 8) {
    const hEl = document.getElementById('stack-meta-height');
    const topEl = document.getElementById('stack-meta-top');
    const emptyEl = document.getElementById('stack-meta-empty');
    const fullEl = document.getElementById('stack-meta-full');
    if (hEl) hEl.textContent = height;
    if (topEl) topEl.textContent = height > 0 ? `[${height - 1}]` : 'null';
    if (emptyEl) emptyEl.textContent = height === 0 ? 'true' : 'false';
    if (fullEl) fullEl.textContent = height >= maxCap ? 'true' : 'false';
  }

  updateStackComplexity(action) {
    const timeEl = document.getElementById('stack-val-time');
    const spaceEl = document.getElementById('stack-card-space')?.querySelector('strong');
    if (!timeEl) return;
    const map = {
      'push': { time: 'O(1) - Amortized top append', space: 'O(1) In-place slot' },
      'pop': { time: 'O(1) - Direct top element removal', space: 'O(1) In-place' },
      'peek': { time: 'O(1) - Inspect top index value', space: 'O(1) Constant' },
      'reverse': { time: 'O(n) - Two-pointer or auxiliary pop/push', space: 'O(1) In-place' },
      'random': { time: 'O(n) - N element allocations', space: 'O(n) In-memory' },
      'clear': { time: 'O(1) - Top pointer reset to -1', space: 'O(1) GC cleanup' },
      'reset': { time: 'O(1) - Starter stack reloaded', space: 'O(1) Constant' }
    };
    const info = map[action] || { time: 'O(1) - Constant', space: 'O(N) - In-Memory' };
    timeEl.textContent = info.time;
    if (spaceEl) spaceEl.textContent = info.space;
  }

  updateStackPrompt(msg = '') {
    const el = document.getElementById('stack-prompt-msg');
    if (!el) return;
    el.textContent = msg;
    el.className = 'ds-prompt-banner prompt-info';
    if (msg.includes('✓') || msg.includes('SUCCESS') || msg.includes('PEEK')) {
      el.className = 'ds-prompt-banner prompt-success';
    } else if (msg.includes('✗') || msg.includes('OVERFLOW') || msg.includes('UNDERFLOW')) {
      el.className = 'ds-prompt-banner prompt-warn';
    }
  }

  updateQueueMetadata(size = 0, front = 0, rear = 0, maxCap = 8) {
    const sEl = document.getElementById('queue-meta-size');
    const fEl = document.getElementById('queue-meta-front');
    const rEl = document.getElementById('queue-meta-rear');
    if (sEl) sEl.textContent = size;
    if (fEl) fEl.textContent = size > 0 ? `[${front}]` : 'null';
    if (rEl) rEl.textContent = size > 0 ? `[${rear}]` : 'null';
  }

  updateQueueComplexity(action) {
    const timeEl = document.getElementById('queue-val-time');
    const spaceEl = document.getElementById('queue-card-space')?.querySelector('strong');
    if (!timeEl) return;
    const map = {
      'enqueue': { time: 'O(1) - Append at REAR pointer', space: 'O(1) In-place slot' },
      'dequeue': { time: 'O(1) - Advance FRONT pointer', space: 'O(1) In-place' },
      'peek-front': { time: 'O(1) - Inspect FRONT index', space: 'O(1) Constant' },
      'peek-rear': { time: 'O(1) - Inspect REAR index', space: 'O(1) Constant' },
      'random': { time: 'O(n) - N element allocations', space: 'O(n) Buffer' },
      'clear': { time: 'O(1) - FRONT & REAR reset to -1', space: 'O(1) GC cleanup' },
      'reset': { time: 'O(1) - Starter queue reloaded', space: 'O(1) Constant' }
    };
    const info = map[action] || { time: 'O(1) - Constant', space: 'O(N) - Contiguous' };
    timeEl.textContent = info.time;
    if (spaceEl) spaceEl.textContent = info.space;
  }

  updateQueuePrompt(msg = '') {
    const el = document.getElementById('queue-prompt-msg');
    if (!el) return;
    el.textContent = msg;
    el.className = 'ds-prompt-banner prompt-info';
    if (msg.includes('✓') || msg.includes('SUCCESS') || msg.includes('PEEK')) {
      el.className = 'ds-prompt-banner prompt-success';
    } else if (msg.includes('✗') || msg.includes('OVERFLOW') || msg.includes('UNDERFLOW')) {
      el.className = 'ds-prompt-banner prompt-warn';
    }
  }

  updateStringMetadata(str = 'algoverse') {
    const sEl = document.getElementById('str-meta-str');
    const lEl = document.getElementById('str-meta-len');
    const bEl = document.getElementById('str-meta-bytes');
    if (sEl) sEl.textContent = `"${str}"`;
    if (lEl) lEl.textContent = str.length;
    if (bEl) bEl.textContent = str.length * 2;
  }

  updateStringComplexity(action) {
    const timeEl = document.getElementById('str-val-time');
    const spaceEl = document.getElementById('str-card-space')?.querySelector('strong');
    if (!timeEl) return;
    const map = {
      'reverse': { time: 'O(n) - Two pointers swap [0...n-1]', space: 'O(1) In-place' },
      'palindrome': { time: 'O(n) - Symmetrical inwards scan', space: 'O(1) In-place' },
      'search': { time: 'O(n × m) - Sliding window substring match', space: 'O(1) Constant' },
      'frequency': { time: 'O(n) - Single character histogram pass', space: 'O(k) Unique chars' },
      'upper': { time: 'O(n) - Character ASCII - 32 transform', space: 'O(n) New String' },
      'custom': { time: 'O(n) - String allocation & copy', space: 'O(n) Memory' },
      'reset': { time: 'O(1) - Reset to "algoverse"', space: 'O(1) Constant' }
    };
    const info = map[action] || { time: 'O(n) - Linear', space: 'O(1) - Auxiliary' };
    timeEl.textContent = info.time;
    if (spaceEl) spaceEl.textContent = info.space;
  }

  updateStringPrompt(msg = '') {
    const el = document.getElementById('str-prompt-msg');
    if (!el) return;
    el.textContent = msg;
    el.className = 'ds-prompt-banner prompt-info';
    if (msg.includes('✓') || msg.includes('SUCCESS') || msg.includes('MATCH FOUND')) {
      el.className = 'ds-prompt-banner prompt-success';
    } else if (msg.includes('✗') || msg.includes('Mismatch') || msg.includes('not found')) {
      el.className = 'ds-prompt-banner prompt-warn';
    }
  }

  renderPresetsCrudWidget(topic) {
    return `
      <!-- Presets CRUD Storage Box -->
      <div class="presets-crud-card" id="presets-crud-box-${topic}">
        <div class="presets-crud-header">
          <div class="presets-title-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            <span class="presets-heading">Dataset Presets (CRUD Manager)</span>
            <span class="presets-storage-tier-badge">IndexedDB + Web Storage</span>
          </div>
          <span class="presets-crud-sub">Save, load, update, or delete state presets across browser sessions</span>
        </div>

        <div class="presets-crud-body">
          <div class="presets-crud-row">
            <div class="preset-field-group">
              <label for="preset-select-${topic}" class="preset-field-label">Read (Load) Preset:</label>
              <select id="preset-select-${topic}" class="ds-input-custom preset-select-dropdown">
                <option value="">-- Select Saved Preset --</option>
              </select>
            </div>

            <div class="preset-field-group">
              <label for="preset-name-${topic}" class="preset-field-label">Preset Name:</label>
              <input type="text" id="preset-name-${topic}" class="ds-input-custom" placeholder="e.g. Test Dataset" style="max-width: 170px;">
            </div>

            <div class="preset-btn-actions">
              <button id="btn-preset-save-${topic}" class="ds-btn ds-btn-apply" title="Create or Update Preset">Save (C/U)</button>
              <button id="btn-preset-load-${topic}" class="ds-btn ds-btn-access" title="Read selected preset">Load (R)</button>
              <button id="btn-preset-delete-${topic}" class="ds-btn ds-btn-pop" title="Delete selected preset">Del (D)</button>
            </div>
          </div>
          <div id="preset-feedback-${topic}" class="preset-feedback-text">Ready. Presets synchronize with IndexedDB & LocalStorage.</div>
        </div>
      </div>
    `;
  }

  async initPresetsCrud(topic) {
    const selectEl = document.getElementById(`preset-select-${topic}`);
    const nameInput = document.getElementById(`preset-name-${topic}`);
    const feedbackEl = document.getElementById(`preset-feedback-${topic}`);
    const btnSave = document.getElementById(`btn-preset-save-${topic}`);
    const btnLoad = document.getElementById(`btn-preset-load-${topic}`);
    const btnDelete = document.getElementById(`btn-preset-delete-${topic}`);

    if (!selectEl) return;

    const refreshDropdown = async () => {
      const presets = await this.presetStorage.readPresets(topic);
      selectEl.innerHTML = '<option value="">-- Select Saved Preset --</option>';
      presets.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.name} (${new Date(p.updatedAt).toLocaleTimeString()})`;
        selectEl.appendChild(opt);
      });
    };

    await refreshDropdown();

    // CREATE / UPDATE
    btnSave?.addEventListener('click', async () => {
      const name = nameInput?.value?.trim() || `Preset ${new Date().toLocaleTimeString()}`;
      this.triggerAction('get-current-state-for-save', null, null, null, {
        topic,
        name,
        callback: async (dataToSave) => {
          await this.presetStorage.createPreset(topic, name, dataToSave);
          await refreshDropdown();
          if (feedbackEl) {
            feedbackEl.textContent = `✓ Created & Persisted "${name}" into IndexedDB & LocalStorage! (Audit cookie set)`;
            feedbackEl.style.color = '#10b981';
          }
          if (nameInput) nameInput.value = '';
        }
      });
    });

    // READ / LOAD
    btnLoad?.addEventListener('click', async () => {
      const selectedId = selectEl.value;
      if (!selectedId) {
        if (feedbackEl) {
          feedbackEl.textContent = '✗ Please select a preset from the dropdown first.';
          feedbackEl.style.color = '#ef4444';
        }
        return;
      }
      const presets = await this.presetStorage.readPresets(topic);
      const target = presets.find(p => p.id === selectedId);
      if (target) {
        this.triggerAction('load-preset', null, null, target.data, { topic, presetName: target.name });
        if (feedbackEl) {
          feedbackEl.textContent = `✓ Loaded preset "${target.name}" into visualizer!`;
          feedbackEl.style.color = '#38bdf8';
        }
      }
    });

    // DELETE
    btnDelete?.addEventListener('click', async () => {
      const selectedId = selectEl.value;
      if (!selectedId) {
        if (feedbackEl) {
          feedbackEl.textContent = '✗ Select a preset to delete.';
          feedbackEl.style.color = '#ef4444';
        }
        return;
      }
      await this.presetStorage.deletePreset(selectedId);
      await refreshDropdown();
      if (feedbackEl) {
        feedbackEl.textContent = `✓ Deleted preset from IndexedDB and LocalStorage!`;
        feedbackEl.style.color = '#f59e0b';
      }
    });
  }

  bindSearchEvents() {
    // Algorithm switcher tabs
    document.getElementById('btn-search-linear')?.addEventListener('click', () => {
      if (this.algo === 'linear-search') return;
      this.algo = 'linear-search';
      this.renderDeck();
      this.triggerAction('switch-search-algo', null, null, null, { algo: 'linear-search' });
    });

    document.getElementById('btn-search-binary')?.addEventListener('click', () => {
      if (this.algo === 'binary-search') return;
      this.algo = 'binary-search';
      this.renderDeck();
      this.triggerAction('switch-search-algo', null, null, null, { algo: 'binary-search' });
    });

    document.getElementById('btn-search-exec')?.addEventListener('click', () => {
      const targetVal = Number(document.getElementById('search-target-input')?.value) || 32;
      const rawArr = document.getElementById('custom-array-input')?.value || '';
      const parsedArray = rawArr.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
      this.triggerAction('search', null, targetVal, parsedArray);
    });

    document.getElementById('btn-random-input')?.addEventListener('click', () => {
      const isBinary = this.algo === 'binary-search';
      let randArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
      if (isBinary) randArray = randArray.sort((a, b) => a - b); // Binary requires sorted
      const arrInput = document.getElementById('custom-array-input');
      if (arrInput) arrInput.value = randArray.join(', ');
      const targetVal = Number(document.getElementById('search-target-input')?.value) || randArray[3];
      this.triggerAction('search', null, targetVal, randArray);
    });
  }

  bindDefaultEvents() {
    document.getElementById('btn-apply-input')?.addEventListener('click', () => {
      const raw = document.getElementById('custom-array-input')?.value || '';
      const parsed = raw.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
      if (parsed.length > 0) this.triggerAction('dataset', null, null, parsed);
    });

    document.getElementById('btn-random-input')?.addEventListener('click', () => {
      const randArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
      document.getElementById('custom-array-input').value = randArray.join(', ');
      this.triggerAction('dataset', null, null, randArray);
    });
  }

  updateMatrixComplexity(actionType) {
    const timeEl = document.getElementById('mat-val-time-complexity');
    const spaceEl = document.getElementById('mat-card-space-complexity');
    if (!timeEl || !spaceEl) return;

    const map = {
      'access': { time: 'O(1) - Base + (r × C + c) × 4B formula', space: 'O(1) - Constant' },
      'update': { time: 'O(1) - In-place memory cell overwrite', space: 'O(1) - Constant' },
      'row-major': { time: 'O(R × C) - Cache-friendly sequential row scan', space: 'O(1) - In-place' },
      'col-major': { time: 'O(R × C) - Non-contiguous stride scan (+C elements)', space: 'O(1) - In-place' },
      'transpose': { time: 'O(R × C) - Diagonal symmetric swap A[i][j] ↔ A[j][i]', space: 'O(1) - In-place' },
      'search': { time: 'O(R × C) - Linear grid scan', space: 'O(1) - Constant' },
      'randomize': { time: 'O(R × C) - Grid regeneration', space: 'O(R × C) - Buffer' },
      'reset': { time: 'O(1) - Reset to starter 3×3 grid', space: 'O(1) - Constant' }
    };

    const info = map[actionType] || { time: 'O(1) - Ready', space: 'O(R × C) - Contiguous Block' };
    timeEl.textContent = info.time;
    const spaceStrong = spaceEl.querySelector('strong');
    if (spaceStrong) spaceStrong.textContent = info.space;
  }

  triggerAction(actionType, value = null, target = null, dataset = null, payload = {}) {
    if (typeof this.onAction === 'function') {
      this.onAction({ actionType, value, target, dataset, payload });
    }
  }
}

