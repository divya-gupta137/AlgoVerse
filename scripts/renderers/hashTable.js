/**
 * AlgoVerse — Hash Table Visualizer Renderer
 * Renders bucket arrays, separate chaining linked lists, linear probing slots,
 * hash function computation badges, and load factor indicators.
 */

export class HashTableRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render(frame) {
    if (!this.container || !frame || !frame.data) return;

    const table = frame.data;
    const activeBucket = frame.activeBucket !== undefined ? frame.activeBucket : -1;
    const activeKey = frame.activeKey || null;
    const loadFactor = (table.totalKeys / table.capacity).toFixed(2);
    const loadFactorPercent = Math.min(100, Math.round((table.totalKeys / table.capacity) * 100));
    const isOverloaded = loadFactor > 0.75;

    // Count collisions (chains with length > 1)
    let collisionCount = 0;
    table.buckets.forEach(b => {
      if (b.entries.length > 1) collisionCount += (b.entries.length - 1);
    });

    this.container.innerHTML = `
      <div class="hash-table-viewport">
        <!-- Hash Table Top Metric HUD -->
        <div class="hash-metrics-banner">
          <div class="hash-metric-chips">
            <span class="metric-chip">Buckets: <strong>${table.capacity}</strong></span>
            <span class="metric-chip">Total Keys: <strong>${table.totalKeys}</strong></span>
            <span class="metric-chip">Collisions: <strong style="color: ${collisionCount > 0 ? '#f59e0b' : '#10b981'};">${collisionCount}</strong></span>
            <span class="metric-chip">
              Load Factor (&lambda;): 
              <strong style="color: ${isOverloaded ? '#ef4444' : '#10b981'};">${loadFactor}</strong> 
              (${loadFactorPercent}%)
            </span>
            <span class="metric-chip">Mode: <strong>${table.mode === 'chaining' ? 'Separate Chaining' : 'Linear Probing'}</strong></span>
          </div>
          
          <div class="hash-load-bar-wrap" title="Rehash threshold is 0.75">
            <div class="hash-load-bar-fill ${isOverloaded ? 'load-warning' : ''}" style="width: ${loadFactorPercent}%;"></div>
          </div>
        </div>

        <!-- Bucket Array Grid -->
        <div class="hash-buckets-container ${table.mode === 'probing' ? 'probing-layout' : 'chaining-layout'}">
          ${table.buckets.map(bucket => {
            const isActive = bucket.index === activeBucket;
            const entries = bucket.entries || [];

            return `
              <div class="hash-bucket-row ${isActive ? 'bucket-active' : ''}">
                <div class="bucket-header-cell">
                  <span class="bucket-idx-tag">[${bucket.index}]</span>
                  <span class="bucket-count-badge">${entries.length} ${entries.length === 1 ? 'item' : 'items'}</span>
                </div>

                <div class="bucket-chain-track">
                  ${entries.length === 0 ? `
                    <div class="bucket-empty-slot">
                      <span class="empty-dot"></span>
                      <span class="empty-txt">empty slot (null)</span>
                    </div>
                  ` : `
                    <div class="bucket-entries-chain">
                      ${entries.map((entry, eIdx) => {
                        const isKeyMatch = activeKey && entry.key.toLowerCase() === activeKey.toLowerCase();
                        return `
                          <div class="hash-entry-pill ${isKeyMatch ? 'entry-active-key' : ''}">
                            <span class="entry-key">${entry.key}</span>
                            <span style="color: var(--text-muted); font-size: 0.75rem;">:</span>
                            <span class="entry-val">${entry.val}</span>
                            <span class="entry-hash">#${Math.abs(entry.hash) % 1000}</span>
                          </div>
                          ${table.mode === 'chaining' && eIdx < entries.length - 1 ? `
                            <span class="chain-arrow-icon" style="color: #38bdf8; font-weight: 700; margin: 0 0.15rem;">&rarr;</span>
                          ` : ''}
                        `;
                      }).join('')}
                    </div>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}
