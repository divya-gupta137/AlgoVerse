/**
 * AlgoVerse — Universal Visualizer Page Controller
 * Reads URL search parameters (?topic=sorting&algo=bubble-sort) and connects Producer -> Player -> Renderer.
 */

import { Player } from '../core/player.js';
import { TransportController } from '../controls/transport.js';
import { BarRenderer } from '../renderers/bars.js';
import { generateBubbleSortFrames } from '../producer/sorting/bubblesort.js';
import { generateSelectionSortFrames } from '../producer/sorting/selectionsort.js';

class VisualizerPageController {
  constructor() {
    this.player = new Player();
    this.transport = new TransportController(this.player);
    this.renderer = null;

    // Read URL Search Parameters (e.g. ?topic=sorting&algo=bubble-sort)
    const urlParams = new URLSearchParams(window.location.search);
    this.topic = urlParams.get('topic') || 'sorting';
    this.algo = urlParams.get('algo') || 'bubble-sort';

    // DOM Elements
    this.titleElement = document.getElementById('algo-title');
    this.categoryElement = document.getElementById('algo-category');
    this.viewportElement = document.getElementById('visualization-viewport');
  }

  init() {
    if (!this.viewportElement) {
      console.error('Visualization viewport element not found!');
      return;
    }

    // 1. Initialize DOM Bar Renderer
    this.renderer = new BarRenderer(this.viewportElement);

    // 2. Initialize Transport Controller
    this.transport.init();

    // 3. Connect Player frame changes to BOTH Bar Renderer AND Transport Counter!
    this.player.onFrameChange = (frame, index, total) => {
      if (frame && this.renderer) {
        this.renderer.render(frame);
      }
      if (this.transport) {
        this.transport.updateFrameUI(index, total);
      }
    };

    // 4. Load requested algorithm producer
    this.loadAlgorithm();
  }

  loadAlgorithm() {
    // Initial sample dataset
    const sampleArray = [45, 18, 85, 32, 92, 23, 67, 12];
    let frames = [];

    if (this.algo === 'selection-sort') {
      if (this.titleElement) this.titleElement.textContent = 'Selection Sort';
      if (this.categoryElement) this.categoryElement.textContent = 'Sorting';
      frames = generateSelectionSortFrames(sampleArray);
    } else {
      // Default: Bubble Sort
      if (this.titleElement) this.titleElement.textContent = 'Bubble Sort';
      if (this.categoryElement) this.categoryElement.textContent = 'Sorting';
      frames = generateBubbleSortFrames(sampleArray);
    }

    // Load frames into player and start automatic playback
    this.player.loadFrames(frames);
    this.player.play();
  }
}

// Robust Initialization Helper
function startVisualizer() {
  const visualizer = new VisualizerPageController();
  visualizer.init();
}

// Check if document has already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startVisualizer);
} else {
  startVisualizer();
}
