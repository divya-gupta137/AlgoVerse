/**
 * AlgoVerse — Stats & Narration Panel Controller
 */

export class StatsPanelController {
  constructor() {
    this.compElement = document.getElementById('stat-comparisons');
    this.swapsElement = document.getElementById('stat-swaps');
    this.narrationElement = document.getElementById('narration-text');
  }

  update(frame) {
    if (!frame) return;

    const stats = frame.stats || {};

    if (this.compElement) {
      this.compElement.textContent = stats.comparisons !== undefined ? stats.comparisons : 0;
    }

    if (this.swapsElement) {
      this.swapsElement.textContent = stats.swaps !== undefined ? stats.swaps : 0;
    }

    if (this.narrationElement) {
      this.narrationElement.textContent = frame.narration || 'Executing operation...';
    }
  }
}
