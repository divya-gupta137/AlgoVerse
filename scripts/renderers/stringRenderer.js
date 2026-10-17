/**
 * AlgoVerse — String Visualizer Renderer
 * Renders individual character tiles with 0-based indices, character glyphs,
 * ASCII byte values, two-pointer badges, and frequency distribution bars.
 */

export class StringRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  render(frame) {
    if (!this.container || !frame) return;

    const asciiData = frame.data || [];
    const pointers = frame.pointers || {};
    const highlights = frame.highlights || [];
    const rawString = frame.rawString || asciiData.map(c => String.fromCharCode(c)).join('');
    const freqMap = frame.frequencyMap || null;

    this.container.innerHTML = `
      <div class="string-viewport-card">
        <!-- String Metadata HUD -->
        <div class="string-hud-bar">
          <div class="string-meta-chips">
            <span class="metric-chip">String: <strong style="color: #fbbf24;">"${rawString}"</strong></span>
            <span class="metric-chip">Length: <strong>${asciiData.length}</strong> chars</span>
            <span class="metric-chip">Byte Size: <strong>${asciiData.length * 2}</strong> bytes (UTF-16)</span>
          </div>
          
          <div class="string-legend-chips">
            <span class="legend-chip"><span class="legend-dot dot-current"></span> Active Scan / Swap</span>
            <span class="legend-chip"><span class="legend-dot" style="background: #a855f7;"></span> Two Pointers</span>
          </div>
        </div>

        <!-- Character Ribbon Grid with Glowing Tile Cards -->
        <div class="string-ribbon-container">
          ${asciiData.map((asciiCode, idx) => {
            const char = String.fromCharCode(asciiCode);
            const isHighlight = highlights.includes(idx);
            
            // Pointers at this index
            const activePtrs = Object.entries(pointers)
              .filter(([_, ptrIdx]) => ptrIdx === idx)
              .map(([name]) => name);

            return `
              <div class="string-char-tile ${isHighlight ? 'char-tile-active' : ''}">
                <!-- Pointer Marker Badge -->
                <div class="char-ptr-slot">
                  ${activePtrs.map(p => `
                    <span class="char-ptr-badge ptr-${p.toLowerCase()}">${p}</span>
                  `).join('')}
                </div>

                <!-- Index -->
                <span class="char-idx">[${idx}]</span>

                <!-- Character Glyph -->
                <div class="char-glyph">${char === ' ' ? '␣' : char}</div>

                <!-- ASCII Byte Code -->
                <span class="char-ascii-byte">${asciiCode} (0x${asciiCode.toString(16).toUpperCase()})</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Optional Character Frequency Breakdown -->
        ${freqMap ? `
          <div class="string-freq-container">
            <h4 style="font-size: 0.88rem; font-weight: 700; color: #fbbf24; margin-bottom: 0.75rem; font-family: 'Space Grotesk', sans-serif;">
              Character Frequency Distribution Histogram:
            </h4>
            <div class="freq-bars-grid">
              ${Object.entries(freqMap).map(([char, count]) => {
                const heightPct = Math.max(15, Math.round((count / asciiData.length) * 100));
                return `
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
                    <span style="font-size: 0.7rem; color: #38bdf8; font-weight: 700;">${count}x</span>
                    <div style="width: 32px; height: ${heightPct}px; background: linear-gradient(180deg, #f59e0b, #d97706); border-radius: 4px; box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);"></div>
                    <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #ffffff;">'${char}'</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}
