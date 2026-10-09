/**
 * AlgoVerse — Universal Visualizer Page Controller
 * Connects Producer -> Player -> Renderers (Bars, CodePanel, Narration, Stats).
 */

import { Player } from '../core/player.js';
import { TransportController } from '../controls/transport.js';
import { InputPanelController } from '../controls/inputPanel.js';
import { StatsPanelController } from '../controls/statsPanel.js';
import { BarRenderer } from '../renderers/bars.js';
import { CodePanelRenderer } from '../renderers/codepanel.js';
import { NarrationRenderer } from '../renderers/narration.js';

import { generateBubbleSortFrames } from '../producer/sorting/bubblesort.js';
import { generateSelectionSortFrames } from '../producer/sorting/selectionsort.js';
import { generateInsertionSortFrames } from '../producer/sorting/insertionsort.js';
import { generateMergeSortFrames } from '../producer/sorting/mergesort.js';
import { generateQuickSortFrames } from '../producer/sorting/quicksort.js';

import { generateLinearSearchFrames } from '../producer/searching/linearsearch.js';
import { generateBinarySearchFrames } from '../producer/searching/binarysearch.js';

class VisualizerPageController {
  constructor() {
    this.player = new Player();
    this.transport = new TransportController(this.player);
    this.inputPanel = new InputPanelController((newArray) => this.handleNewDataset(newArray));
    this.statsPanel = new StatsPanelController();
    
    this.barRenderer = null;
    this.codePanelRenderer = null;
    this.narrationRenderer = null;

    this.currentArray = [45, 18, 85, 32, 92, 23, 67, 12];

    const urlParams = new URLSearchParams(window.location.search);
    this.topic = urlParams.get('topic') || 'sorting';
    this.algo = urlParams.get('algo') || 'bubble-sort';

    this.titleElement = document.getElementById('algo-title');
    this.categoryElement = document.getElementById('algo-category');
    this.viewportElement = document.getElementById('visualization-viewport');
    this.codeContainerElement = document.getElementById('code-panel-container');
    this.narrationTextElement = document.getElementById('narration-text');
  }

  init() {
    if (!this.viewportElement) return;

    // 1. Initialize Renderers
    this.barRenderer = new BarRenderer(this.viewportElement);
    this.codePanelRenderer = new CodePanelRenderer(this.codeContainerElement);
    this.narrationRenderer = new NarrationRenderer(this.narrationTextElement);

    // 2. Initialize Controllers
    this.transport.init();
    this.inputPanel.init();

    // 3. Connect Player state changes to ALL Renderers!
    this.player.onFrameChange = (frame, index, total) => {
      if (frame) {
        if (this.barRenderer) this.barRenderer.render(frame);
        if (this.codePanelRenderer && frame.codeLine) this.codePanelRenderer.highlightLine(frame.codeLine);
        if (this.narrationRenderer) this.narrationRenderer.update(frame.narration);
        if (this.statsPanel) this.statsPanel.update(frame);
      }
      if (this.transport) {
        this.transport.updateFrameUI(index, total);
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

    // Load algorithm code snippet into Code Panel
    if (this.codePanelRenderer) {
      this.codePanelRenderer.loadAlgorithmCode(this.algo);
    }

    if (this.algo === 'selection-sort') {
      if (this.titleElement) this.titleElement.textContent = 'Selection Sort';
      if (this.categoryElement) this.categoryElement.textContent = 'Sorting';
      frames = generateSelectionSortFrames(this.currentArray);
    } else if (this.algo === 'insertion-sort') {
      if (this.titleElement) this.titleElement.textContent = 'Insertion Sort';
      if (this.categoryElement) this.categoryElement.textContent = 'Sorting';
      frames = generateInsertionSortFrames(this.currentArray);
    } else if (this.algo === 'merge-sort') {
      if (this.titleElement) this.titleElement.textContent = 'Merge Sort';
      if (this.categoryElement) this.categoryElement.textContent = 'Sorting';
      frames = generateMergeSortFrames(this.currentArray);
    } else if (this.algo === 'quick-sort') {
      if (this.titleElement) this.titleElement.textContent = 'Quick Sort';
      if (this.categoryElement) this.categoryElement.textContent = 'Sorting';
      frames = generateQuickSortFrames(this.currentArray);
    } else if (this.algo === 'linear-search') {
      if (this.titleElement) this.titleElement.textContent = 'Linear Search';
      if (this.categoryElement) this.categoryElement.textContent = 'Searching';
      frames = generateLinearSearchFrames(this.currentArray, 32);
    } else if (this.algo === 'binary-search') {
      if (this.titleElement) this.titleElement.textContent = 'Binary Search';
      if (this.categoryElement) this.categoryElement.textContent = 'Searching';
      frames = generateBinarySearchFrames(this.currentArray, 32);
    } else {
      // Default: Bubble Sort
      if (this.titleElement) this.titleElement.textContent = 'Bubble Sort';
      if (this.categoryElement) this.categoryElement.textContent = 'Sorting';
      frames = generateBubbleSortFrames(this.currentArray);
    }

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
