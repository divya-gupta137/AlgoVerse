/**
 * AlgoVerse — Universal Visualizer Page Controller (Interactive User Actions)
 */

import { Player } from '../core/player.js';
import { TransportController } from '../controls/transport.js';
import { InputPanelController } from '../controls/inputPanel.js';
import { StatsPanelController } from '../controls/statsPanel.js';
import { BarRenderer } from '../renderers/bars.js';
import { CodePanelRenderer } from '../renderers/codepanel.js';
import { NarrationRenderer } from '../renderers/narration.js';
import { StackQueueRenderer } from '../renderers/stackQueue.js';

import { generateBubbleSortFrames } from '../producer/sorting/bubblesort.js';
import { generateSelectionSortFrames } from '../producer/sorting/selectionsort.js';
import { generateInsertionSortFrames } from '../producer/sorting/insertionsort.js';
import { generateMergeSortFrames } from '../producer/sorting/mergesort.js';
import { generateQuickSortFrames } from '../producer/sorting/quicksort.js';

import { generateLinearSearchFrames } from '../producer/searching/linearsearch.js';
import { generateBinarySearchFrames } from '../producer/searching/binarysearch.js';

import { generateArrayOpsFrames } from '../producer/structures/arrayOps.js';
import { generateStringOpsFrames } from '../producer/structures/stringOps.js';
import { generateStackOpsFrames } from '../producer/structures/stackOps.js';
import { generateQueueOpsFrames } from '../producer/structures/queueOps.js';

class VisualizerPageController {
  constructor() {
    this.player = new Player();
    this.transport = new TransportController(this.player);
    this.inputPanel = new InputPanelController((payload) => this.handleUserAction(payload));
    this.statsPanel = new StatsPanelController();

    this.barRenderer = null;
    this.stackQueueRenderer = null;
    this.codePanelRenderer = null;
    this.narrationRenderer = null;

    this.currentArray = [45, 18, 85, 32, 92, 23, 67, 12];
    this.currentStack = []; // Starts EMPTY
    this.currentQueue = []; // Starts EMPTY

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

    this.barRenderer = new BarRenderer(this.viewportElement);
    this.stackQueueRenderer = new StackQueueRenderer(this.viewportElement);
    this.codePanelRenderer = new CodePanelRenderer(this.codeContainerElement);
    this.narrationRenderer = new NarrationRenderer(this.narrationTextElement);

    this.transport.init();
    this.inputPanel.setAlgorithm(this.algo);

    this.player.onFrameChange = (frame, index, total) => {
      if (frame) {
        if (this.algo === 'stack-ops') {
          if (this.stackQueueRenderer) this.stackQueueRenderer.render(frame, 'stack');
        } else if (this.algo === 'queue-ops') {
          if (this.stackQueueRenderer) this.stackQueueRenderer.render(frame, 'queue');
        } else if (this.algo === 'string-ops') {
          if (this.stackQueueRenderer) this.stackQueueRenderer.render(frame, 'string');
        } else {
          if (this.barRenderer) this.barRenderer.render(frame);
        }

        if (this.codePanelRenderer && frame.codeLine) this.codePanelRenderer.highlightLine(frame.codeLine);
        if (this.narrationRenderer) this.narrationRenderer.update(frame.narration);
        if (this.statsPanel) this.statsPanel.update(frame);
      }
      if (this.transport) {
        this.transport.updateFrameUI(index, total);
      }
    };

    this.loadAlgorithm();
  }

  handleUserAction({ actionType, value, target, dataset }) {
    if (dataset && Array.isArray(dataset)) {
      this.currentArray = [...dataset];
    }

    if (this.algo === 'stack-ops') {
      if (actionType === 'reset') this.currentStack = [];
      if (actionType === 'random') this.currentStack = [15, 30, 45, 60];
      const { frames, updatedStack } = generateStackOpsFrames(this.currentStack, actionType, value);
      this.currentStack = updatedStack;
      this.player.loadFrames(frames);
      this.player.play();

    } else if (this.algo === 'queue-ops') {
      if (actionType === 'reset') this.currentQueue = [];
      if (actionType === 'random') this.currentQueue = [10, 20, 30, 40];
      const { frames, updatedQueue } = generateQueueOpsFrames(this.currentQueue, actionType, value);
      this.currentQueue = updatedQueue;
      this.player.loadFrames(frames);
      this.player.play();

    } else if (this.algo === 'linear-search') {
      const searchTarget = target !== null ? target : 32;
      const frames = generateLinearSearchFrames(this.currentArray, searchTarget);
      this.player.loadFrames(frames);
      this.player.play();

    } else if (this.algo === 'binary-search') {
      const searchTarget = target !== null ? target : 32;
      const frames = generateBinarySearchFrames(this.currentArray, searchTarget);
      this.player.loadFrames(frames);
      this.player.play();

    } else {
      this.loadAlgorithm();
    }
  }

  loadAlgorithm() {
    let frames = [];

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
    } else if (this.algo === 'array-ops') {
      if (this.titleElement) this.titleElement.textContent = 'Array Operations';
      if (this.categoryElement) this.categoryElement.textContent = 'Data Structures';
      frames = generateArrayOpsFrames(this.currentArray, 'insert', 99, 2);
    } else if (this.algo === 'string-ops') {
      if (this.titleElement) this.titleElement.textContent = 'String Operations';
      if (this.categoryElement) this.categoryElement.textContent = 'Data Structures';
      frames = generateStringOpsFrames('ALGOVERSE', 'reverse');
    } else if (this.algo === 'stack-ops') {
      if (this.titleElement) this.titleElement.textContent = 'Stack (LIFO)';
      if (this.categoryElement) this.categoryElement.textContent = 'Data Structures';
      const { frames: stackFrames } = generateStackOpsFrames(this.currentStack, 'init');
      frames = stackFrames;
    } else if (this.algo === 'queue-ops') {
      if (this.titleElement) this.titleElement.textContent = 'Queue (FIFO)';
      if (this.categoryElement) this.categoryElement.textContent = 'Data Structures';
      const { frames: queueFrames } = generateQueueOpsFrames(this.currentQueue, 'init');
      frames = queueFrames;
    } else {
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
