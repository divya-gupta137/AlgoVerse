/**
 * AlgoVerse — Universal Visualizer Page Controller
 * Reads URL search parameters (?topic=sorting&algo=bubble-sort) and connects Producer -> Player -> Renderer.
 */

import { Player } from '../core/player.js';
import { TransportController } from '../controls/transport.js';
import { InputPanelController } from '../controls/inputPanel.js';
import { StatsPanelController } from '../controls/statsPanel.js';
import { BarRenderer } from '../renderers/bars.js';
import { generateBubbleSortFrames } from '../producer/sorting/bubblesort.js';
import { generateSelectionSortFrames } from '../producer/sorting/selectionsort.js';
import { generateInsertionSortFrames } from '../producer/sorting/insertionsort.js';
import { generateMergeSortFrames } from '../producer/sorting/mergesort.js';
import { generateQuickSortFrames } from '../producer/sorting/quicksort.js';

class VisualizerPageController {
  constructor() {
    this.player = new Player();
    this.transport = new TransportController(this.player);
    this.inputPanel = new InputPanelController((newArray) => this.handleNewDataset(newArray));
    this.statsPanel = new StatsPanelController();
    this.renderer = null;
    this.currentArray = [45, 18, 85, 32, 92, 23, 67, 12];

    const urlParams = new URLSearchParams(window.location.search);
    this.topic = urlParams.get('topic') || 'sorting';
    this.algo = urlParams.get('algo') || 'bubble-sort';

    this.titleElement = document.getElementById('algo-title');
    this.categoryElement = document.getElementById('algo-category');
    this.viewportElement = document.getElementById('visualization-viewport');
  }

  init() {
    if (!this.viewportElement) return;

    // 1. Initialize DOM Bar Renderer
    this.renderer = new BarRenderer(this.viewportElement);

    // 2. Initialize Controllers
    this.transport.init();
    this.inputPanel.init();

    // 3. Connect Player frame changes to Renderer, Transport & Stats!
    this.player.onFrameChange = (frame, index, total) => {
      if (frame && this.renderer) {
        this.renderer.render(frame);
      }
      if (this.transport) {
        this.transport.updateFrameUI(index, total);
      }
      if (frame && this.statsPanel) {
        this.statsPanel.update(frame);
      }
    };

    // 4. Initial algorithm load
    this.loadAlgorithm();
  }

  handleNewDataset(newArray) {
    this.currentArray = [...newArray];
    this.loadAlgorithm();
  }

  loadAlgorithm() {
    let frames = [];

    if (this.algo === 'selection-sort') {
      if (this.titleElement) this.titleElement.textContent = 'Selection Sort';
      frames = generateSelectionSortFrames(this.currentArray);
    } else if (this.algo === 'insertion-sort') {
      if (this.titleElement) this.titleElement.textContent = 'Insertion Sort';
      frames = generateInsertionSortFrames(this.currentArray);
    } else if (this.algo === 'merge-sort') {
      if (this.titleElement) this.titleElement.textContent = 'Merge Sort';
      frames = generateMergeSortFrames(this.currentArray);
    } else if (this.algo === 'quick-sort') {
      if (this.titleElement) this.titleElement.textContent = 'Quick Sort';
      frames = generateQuickSortFrames(this.currentArray);
    } else {
      // Default: Bubble Sort
      if (this.titleElement) this.titleElement.textContent = 'Bubble Sort';
      frames = generateBubbleSortFrames(this.currentArray);
    }

    if (this.categoryElement) this.categoryElement.textContent = 'Sorting';

    this.player.loadFrames(frames);
    this.player.play();
  }
}

function startVisualizer() {
  const visualizer = new VisualizerPageController();
  visualizer.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startVisualizer);
} else {
  startVisualizer();
}
