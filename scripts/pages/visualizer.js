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
import { LinkedListRenderer } from '../renderers/linkedList.js';
import { RecursionRenderer } from '../renderers/recursion.js';
import { ArrayBoxRenderer } from '../renderers/arrayBoxes.js';
import { MatrixGridRenderer } from '../renderers/matrixGrid.js';
import { ConceptGuideRenderer } from '../renderers/conceptGuide.js';
import { HashTableRenderer } from '../renderers/hashTable.js';
import { StringRenderer } from '../renderers/stringRenderer.js';

import { generateBubbleSortFrames } from '../producer/sorting/bubblesort.js';
import { generateSelectionSortFrames } from '../producer/sorting/selectionsort.js';
import { generateInsertionSortFrames } from '../producer/sorting/insertionsort.js';
import { generateMergeSortFrames } from '../producer/sorting/mergesort.js';
import { generateQuickSortFrames } from '../producer/sorting/quicksort.js';

import { generateLinearSearchFrames } from '../producer/searching/linearsearch.js';
import { generateBinarySearchFrames } from '../producer/searching/binarysearch.js';

import { generateArrayOpsFrames } from '../producer/structures/arrayOps.js';
import { generateMatrixOpsFrames } from '../producer/structures/matrixOps.js';
import { generateStringOpsFrames } from '../producer/structures/stringOps.js';
import { generateStackOpsFrames } from '../producer/structures/stackOps.js';
import { generateQueueOpsFrames } from '../producer/structures/queueOps.js';
import { generateLinkedListFrames, createInitialLinkedList } from '../producer/structures/linkedList.js';
import { generateHashTableFrames, createInitialHashTable } from '../producer/structures/hashOps.js';
import { generateFactorialFrames, generateFibonacciFrames } from '../producer/structures/recursionOps.js';

class VisualizerPageController {
  constructor() {
    this.player = new Player();
    this.transport = new TransportController(this.player);
    this.inputPanel = new InputPanelController((payload) => this.handleUserAction(payload));
    this.statsPanel = new StatsPanelController();

    this.barRenderer = null;
    this.arrayBoxRenderer = null;
    this.matrixGridRenderer = null;
    this.stackQueueRenderer = null;
    this.linkedListRenderer = null;
    this.recursionRenderer = null;
    this.codePanelRenderer = null;
    this.narrationRenderer = null;
    this.conceptGuideRenderer = null;
    this.hashTableRenderer = null;
    this.stringRenderer = null;

    this.currentArray = [10, 25, 7, 42, 18]; // Clean starter numbers
    this.arraySubMode = '1d'; // '1d' | '2d'
    this.currentMatrix = [
      [12, 25, 33],
      [44, 56, 67],
      [71, 82, 95]
    ];
    this.currentStack = [15, 30, 45, 60];
    this.currentQueue = [10, 20, 30, 40];
    this.queueMode = 'linear';
    this.currentString = 'algoverse';
    this.hashMode = 'chaining';
    this.currentHashTable = createInitialHashTable(8, 'chaining');
    this.linkedListType = 'singly'; // 'singly' | 'doubly' | 'circular'
    this.currentLinkedList = createInitialLinkedList(this.linkedListType);

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
    this.arrayBoxRenderer = new ArrayBoxRenderer(this.viewportElement);
    this.matrixGridRenderer = new MatrixGridRenderer(this.viewportElement);
    this.stackQueueRenderer = new StackQueueRenderer(this.viewportElement);
    this.linkedListRenderer = new LinkedListRenderer(this.viewportElement);
    this.recursionRenderer = new RecursionRenderer(this.viewportElement);
    this.hashTableRenderer = new HashTableRenderer(this.viewportElement);
    this.stringRenderer = new StringRenderer(this.viewportElement);
    this.codePanelRenderer = new CodePanelRenderer(this.codeContainerElement);
    this.narrationRenderer = new NarrationRenderer(this.narrationTextElement);
    this.conceptGuideRenderer = new ConceptGuideRenderer(document.getElementById('concept-guide-container'));

    this.transport.init();
    this.inputPanel.setAlgorithm(this.algo);

    this.player.onFrameChange = (frame, index, total) => {
      if (frame) {
        if (this.algo === 'array-ops') {
          if (this.arraySubMode === '2d') {
            if (this.matrixGridRenderer) this.matrixGridRenderer.render(frame);
          } else {
            if (this.arrayBoxRenderer) this.arrayBoxRenderer.render(frame);
          }
          if (frame.narration) this.inputPanel.updatePrompt(frame.narration);
        } else if (this.algo === 'recursion-ops') {
          if (this.recursionRenderer) this.recursionRenderer.render(frame);
        } else if (this.algo === 'linked-list') {
          if (this.linkedListRenderer) this.linkedListRenderer.render(frame);
        } else if (this.algo === 'hash-table') {
          if (this.hashTableRenderer) this.hashTableRenderer.render(frame);
        } else if (this.algo === 'stack-ops') {
          if (this.stackQueueRenderer) this.stackQueueRenderer.render(frame, 'stack');
        } else if (this.algo === 'queue-ops') {
          if (this.stackQueueRenderer) this.stackQueueRenderer.render(frame, 'queue');
        } else if (this.algo === 'string-ops') {
          if (this.stringRenderer) this.stringRenderer.render(frame);
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

  handleUserAction({ actionType, value, target, dataset, payload }) {
    // Preset Storage CRUD Integration
    if (actionType === 'get-current-state-for-save') {
      const { topic, callback } = payload || {};
      let dataToSave = null;
      if (topic === 'array-ops') {
        dataToSave = this.arraySubMode === '2d' ? this.currentMatrix : this.currentArray;
      } else if (topic === 'stack-ops') {
        dataToSave = [...this.currentStack];
      } else if (topic === 'queue-ops') {
        dataToSave = [...this.currentQueue];
      } else if (topic === 'string-ops') {
        dataToSave = this.currentString;
      } else if (topic === 'hash-table') {
        dataToSave = this.currentHashTable;
      } else if (topic === 'linked-list') {
        dataToSave = this.currentLinkedList;
      }
      if (typeof callback === 'function') callback(dataToSave);
      return;
    }

    if (actionType === 'load-preset') {
      const { topic } = payload || {};
      if (topic === 'array-ops') {
        if (Array.isArray(dataset)) {
          this.currentArray = [...dataset];
          const { frames } = generateArrayOpsFrames(this.currentArray, 'init');
          this.player.loadFrames(frames);
          this.player.play();
          if (this.inputPanel) {
            this.inputPanel.updateMetadata(this.currentArray.length);
            this.inputPanel.updatePrompt('✓ Loaded preset dataset into array.');
          }
        }
      } else if (topic === 'stack-ops') {
        if (Array.isArray(dataset)) {
          this.currentStack = [...dataset];
          const { frames } = generateStackOpsFrames(this.currentStack, 'init');
          this.player.loadFrames(frames);
          this.player.play();
          if (this.inputPanel) {
            this.inputPanel.updateStackMetadata(this.currentStack.length);
            this.inputPanel.updateStackPrompt('✓ Loaded preset into stack.');
          }
        }
      } else if (topic === 'queue-ops') {
        if (Array.isArray(dataset)) {
          this.currentQueue = [...dataset];
          const { frames } = generateQueueOpsFrames(this.currentQueue, 'init', null, this.queueMode);
          this.player.loadFrames(frames);
          this.player.play();
          if (this.inputPanel) {
            this.inputPanel.updateQueueMetadata(this.currentQueue.length, 0, Math.max(0, this.currentQueue.length - 1));
            this.inputPanel.updateQueuePrompt('✓ Loaded preset into queue.');
          }
        }
      } else if (topic === 'string-ops') {
        if (typeof dataset === 'string') {
          this.currentString = dataset;
          const { frames } = generateStringOpsFrames(this.currentString, 'init');
          this.player.loadFrames(frames);
          this.player.play();
          if (this.inputPanel) {
            this.inputPanel.updateStringMetadata(this.currentString);
            this.inputPanel.updateStringPrompt(`✓ Loaded preset string "${this.currentString}".`);
          }
        }
      } else if (topic === 'hash-table') {
        if (dataset && dataset.buckets) {
          this.currentHashTable = dataset;
          const { frames } = generateHashTableFrames(this.currentHashTable, 'init');
          this.player.loadFrames(frames);
          this.player.play();
          if (this.inputPanel) {
            this.inputPanel.updateHashTableMetadata(this.currentHashTable.totalKeys, this.currentHashTable.capacity, this.hashMode);
            this.inputPanel.updateHashTablePrompt('✓ Loaded preset hash table.');
          }
        }
      }
      return;
    }

    if (dataset && Array.isArray(dataset)) {
      this.currentArray = [...dataset];
    }

    // Architecture Dimension Mode Switcher
    if (actionType === 'switch-submode') {
      this.arraySubMode = value; // '1d' or '2d'
      if (this.arraySubMode === '2d') {
        const { frames } = generateMatrixOpsFrames(this.currentMatrix, 'init');
        this.player.loadFrames(frames);
        this.player.play();
        if (this.inputPanel) {
          this.inputPanel.updatePrompt('• Switched to 2D Matrix (Grid) Architecture: 3×3 Grid ready.');
        }
      } else {
        const { frames } = generateArrayOpsFrames(this.currentArray, 'init');
        this.player.loadFrames(frames);
        this.player.play();
        if (this.inputPanel) {
          this.inputPanel.updateMetadata(this.currentArray.length);
          this.inputPanel.updatePrompt('• Switched to 1D Linear Array Architecture.');
        }
      }
      return;
    }

    if (this.algo === 'array-ops') {
      if (this.arraySubMode === '2d') {
        if (actionType === 'reset') {
          this.currentMatrix = [
            [12, 25, 33],
            [44, 56, 67],
            [71, 82, 95]
          ];
        } else if (actionType === 'randomize') {
          this.currentMatrix = [
            [Math.floor(Math.random() * 89) + 10, Math.floor(Math.random() * 89) + 10, Math.floor(Math.random() * 89) + 10],
            [Math.floor(Math.random() * 89) + 10, Math.floor(Math.random() * 89) + 10, Math.floor(Math.random() * 89) + 10],
            [Math.floor(Math.random() * 89) + 10, Math.floor(Math.random() * 89) + 10, Math.floor(Math.random() * 89) + 10]
          ];
        }

        const { frames, updatedMatrix } = generateMatrixOpsFrames(this.currentMatrix, actionType, payload || {});
        this.currentMatrix = updatedMatrix;
        this.player.loadFrames(frames);
        this.player.play();

        if (frames.length > 0 && frames[frames.length - 1].narration) {
          this.inputPanel.updatePrompt(frames[frames.length - 1].narration);
        }
        return;
      }

      // 1D Linear Array Operations
      if (actionType === 'reset') {
        this.currentArray = [10, 25, 7, 42, 18];
      } else if (actionType === 'shuffle') {
        this.currentArray = Array.from({ length: 5 }, () => Math.floor(Math.random() * 90) + 10);
      }

      const valNum = Number(value) || 99;
      const idxNum = target !== null ? Number(target) : 0;
      const { frames, updatedArray } = generateArrayOpsFrames(this.currentArray, actionType, valNum, idxNum);
      this.currentArray = updatedArray;
      this.player.loadFrames(frames);
      this.player.play();

      if (this.inputPanel) {
        this.inputPanel.updateMetadata(this.currentArray.length);
        this.inputPanel.updateComplexity(actionType);
      }

      if (frames.length > 0 && frames[frames.length - 1].narration) {
        this.inputPanel.updatePrompt(frames[frames.length - 1].narration);
      }

    } else if (this.algo === 'recursion-ops') {
      const nVal = Number(value) || 4;
      const frames = actionType === 'fibonacci' 
        ? generateFibonacciFrames(nVal) 
        : generateFactorialFrames(nVal);
      this.player.loadFrames(frames);
      this.player.play();

    } else if (this.algo === 'linked-list') {
      if (actionType === 'change-type') {
        this.linkedListType = payload && payload.listType ? payload.listType : 'singly';
        this.currentLinkedList = createInitialLinkedList(this.linkedListType);
        actionType = 'init';
      } else if (actionType === 'reset') {
        this.currentLinkedList = createInitialLinkedList(this.linkedListType);
      }
      const targetIndex = payload && payload.index !== undefined ? payload.index : null;
      const { frames, updatedList } = generateLinkedListFrames(
        this.currentLinkedList, 
        actionType, 
        value, 
        target, 
        targetIndex, 
        this.linkedListType
      );
      this.currentLinkedList = updatedList;
      this.player.loadFrames(frames);
      this.player.play();
      if (this.inputPanel) {
        this.inputPanel.updateLinkedListMetadata(this.currentLinkedList, this.linkedListType);
        if (frames.length > 0) {
          this.inputPanel.updateLinkedListPrompt(frames[frames.length - 1].narration);
        }
      }

    } else if (this.algo === 'hash-table') {
      if (actionType === 'change-mode') {
        this.hashMode = payload && payload.hashMode ? payload.hashMode : 'chaining';
        this.currentHashTable = createInitialHashTable(8, this.hashMode);
        actionType = 'init';
      } else if (actionType === 'reset') {
        this.currentHashTable = createInitialHashTable(8, this.hashMode);
        actionType = 'init';
      }
      const keyArg = target !== null && target !== undefined ? target : value;
      const valArg = value !== null && value !== undefined ? value : 500;
      const { frames, updatedTable } = generateHashTableFrames(this.currentHashTable, actionType, keyArg, valArg, this.hashMode);
      this.currentHashTable = updatedTable;
      this.player.loadFrames(frames);
      this.player.play();
      if (this.inputPanel) {
        this.inputPanel.updateHashTableMetadata(this.currentHashTable.totalKeys, this.currentHashTable.capacity, this.hashMode);
        if (frames.length > 0 && frames[frames.length - 1].narration) {
          this.inputPanel.updateHashTablePrompt(frames[frames.length - 1].narration);
        }
      }

    } else if (this.algo === 'stack-ops') {
      if (actionType === 'reset') {
        this.currentStack = [15, 30, 45, 60];
        actionType = 'init';
      } else if (actionType === 'clear') {
        this.currentStack = [];
      } else if (actionType === 'random') {
        this.currentStack = [10, 25, 40, 55, 70];
      }
      const { frames, updatedStack } = generateStackOpsFrames(this.currentStack, actionType, value);
      this.currentStack = updatedStack;
      this.player.loadFrames(frames);
      this.player.play();
      if (this.inputPanel) {
        this.inputPanel.updateStackMetadata(this.currentStack.length);
        if (frames.length > 0 && frames[frames.length - 1].narration) {
          this.inputPanel.updateStackPrompt(frames[frames.length - 1].narration);
        }
      }

    } else if (this.algo === 'queue-ops') {
      if (actionType === 'change-mode') {
        this.queueMode = payload && payload.queueMode ? payload.queueMode : 'linear';
        actionType = 'init';
      } else if (actionType === 'reset') {
        this.currentQueue = [10, 20, 30, 40];
        actionType = 'init';
      } else if (actionType === 'clear') {
        this.currentQueue = [];
      } else if (actionType === 'random') {
        this.currentQueue = [15, 30, 45, 60];
      }
      const { frames, updatedQueue } = generateQueueOpsFrames(this.currentQueue, actionType, value, this.queueMode);
      this.currentQueue = updatedQueue;
      this.player.loadFrames(frames);
      this.player.play();
      if (this.inputPanel) {
        this.inputPanel.updateQueueMetadata(this.currentQueue.length, 0, Math.max(0, this.currentQueue.length - 1));
        if (frames.length > 0 && frames[frames.length - 1].narration) {
          this.inputPanel.updateQueuePrompt(frames[frames.length - 1].narration);
        }
      }

    } else if (this.algo === 'string-ops') {
      if (actionType === 'custom') {
        this.currentString = (typeof value === 'string' && value.length > 0) ? value : 'algoverse';
        actionType = 'init';
      } else if (actionType === 'reset') {
        this.currentString = 'algoverse';
        actionType = 'init';
      }
      const paramArg = (actionType === 'search') ? (typeof value === 'string' ? value : 'verse') : '';
      const { frames, updatedString } = generateStringOpsFrames(this.currentString, actionType, paramArg);
      this.currentString = updatedString;
      this.player.loadFrames(frames);
      this.player.play();
      if (this.inputPanel) {
        this.inputPanel.updateStringMetadata(this.currentString);
        if (frames.length > 0 && frames[frames.length - 1].narration) {
          this.inputPanel.updateStringPrompt(frames[frames.length - 1].narration);
        }
      }

    } else if (this.algo === 'linear-search' || this.algo === 'binary-search') {
      if (actionType === 'switch-search-algo') {
        // The input panel already switched this.algo; just reload algorithm frames
        this.algo = payload.algo;
        this.loadAlgorithm();
        return;
      }
      // Dataset provided by user input
      if (Array.isArray(dataset) && dataset.length > 0) {
        this.currentArray = [...dataset];
      }
      const searchTarget = target !== null ? target : 32;
      const frames = this.algo === 'binary-search'
        ? generateBinarySearchFrames(this.currentArray, searchTarget)
        : generateLinearSearchFrames(this.currentArray, searchTarget);
      this.player.loadFrames(frames);
      this.player.play();

    } else {
      this.loadAlgorithm();
    }
  }

  loadAlgorithm() {
    let frames = [];

    const transportEl = document.querySelector('.transport-bar');
    const narrationBox = document.querySelector('.narration-box');
    const visualizerHeader = document.querySelector('.visualizer-header');
    const codeContainer = document.getElementById('code-panel-container');
    const topConceptEl = document.getElementById('top-concept-container');
    const workbench = document.getElementById('visualizer-workbench');

    // Global Header, Transport Bar, and Narration are active across ALL topics
    if (visualizerHeader) visualizerHeader.style.display = 'flex';
    if (transportEl) transportEl.style.display = 'block';
    if (narrationBox) narrationBox.style.display = 'flex';
    if (topConceptEl) topConceptEl.innerHTML = '';

    // Split Workbench Layout: active on Stack, Queue, Hash Table, Sorting, Searching, Recursion, and String
    const isSplitLayout = (
      this.algo === 'stack-ops' ||
      this.algo === 'queue-ops' ||
      this.algo === 'hash-table' ||
      this.algo === 'bubble-sort' ||
      this.algo === 'selection-sort' ||
      this.algo === 'insertion-sort' ||
      this.algo === 'merge-sort' ||
      this.algo === 'quick-sort' ||
      this.algo === 'linear-search' ||
      this.algo === 'binary-search' ||
      this.algo === 'recursion-ops' ||
      this.algo === 'string-ops'
    );

    if (workbench) {
      if (isSplitLayout) {
        workbench.classList.add('split-active');
      } else {
        workbench.classList.remove('split-active');
      }
    }

    // Interactive Data Structure Layouts (Arrays, Linked Lists, Hash Tables, Stacks, Queues, Strings)
    if (this.algo === 'array-ops') {
      if (this.titleElement) this.titleElement.textContent = 'Arrays';
      if (this.categoryElement) {
        this.categoryElement.textContent = 'Data Structures';
        this.categoryElement.className = 'badge badge-structures';
      }
      if (codeContainer) codeContainer.style.display = 'none';
      if (this.conceptGuideRenderer) {
        this.conceptGuideRenderer.renderArrayTopCard(topConceptEl);
        this.conceptGuideRenderer.renderArrayGuide();
      }
      if (this.inputPanel) {
        this.inputPanel.updateMetadata(this.currentArray.length);
        this.inputPanel.updateComplexity('init');
      }
      const { frames: arrFrames } = generateArrayOpsFrames(this.currentArray, 'init');
      frames = arrFrames;

    } else if (this.algo === 'linked-list') {
      if (this.titleElement) this.titleElement.textContent = 'Linked List (Singly, Doubly, Circular)';
      if (this.categoryElement) {
        this.categoryElement.textContent = 'Data Structures';
        this.categoryElement.className = 'badge badge-structures';
      }
      if (codeContainer) codeContainer.style.display = 'none';
      if (this.conceptGuideRenderer) this.conceptGuideRenderer.renderLinkedListGuide();
      const { frames: llFrames } = generateLinkedListFrames(this.currentLinkedList, 'init', null, null, null, this.linkedListType);
      frames = llFrames;
      if (this.inputPanel) {
        this.inputPanel.updateLinkedListMetadata(this.currentLinkedList || createInitialLinkedList(this.linkedListType), this.linkedListType);
      }

    } else if (this.algo === 'hash-table') {
      if (this.titleElement) this.titleElement.textContent = 'Hash Table (Chaining & Probing)';
      if (this.categoryElement) {
        this.categoryElement.textContent = 'Data Structures';
        this.categoryElement.className = 'badge badge-structures';
      }
      if (codeContainer) codeContainer.style.display = 'none';
      if (this.conceptGuideRenderer) {
        this.conceptGuideRenderer.renderHashTableTopCard(topConceptEl);
        this.conceptGuideRenderer.renderHashTableGuide();
      }
      const { frames: hashFrames } = generateHashTableFrames(this.currentHashTable, 'init', null, null, this.hashMode);
      frames = hashFrames;
      if (this.inputPanel) {
        this.inputPanel.updateHashTableMetadata(this.currentHashTable.totalKeys, this.currentHashTable.capacity, this.hashMode);
      }

    } else if (this.algo === 'stack-ops') {
      if (this.titleElement) this.titleElement.textContent = 'Stack (LIFO)';
      if (this.categoryElement) {
        this.categoryElement.textContent = 'Data Structures';
        this.categoryElement.className = 'badge badge-structures';
      }
      if (codeContainer) codeContainer.style.display = 'none';
      if (this.conceptGuideRenderer) {
        this.conceptGuideRenderer.renderStackTopCard(topConceptEl);
        this.conceptGuideRenderer.renderStackGuide();
      }
      const { frames: stackFrames } = generateStackOpsFrames(this.currentStack, 'init');
      frames = stackFrames;
      if (this.inputPanel) {
        this.inputPanel.updateStackMetadata(this.currentStack.length);
      }

    } else if (this.algo === 'queue-ops') {
      if (this.titleElement) this.titleElement.textContent = 'Queue (FIFO)';
      if (this.categoryElement) {
        this.categoryElement.textContent = 'Data Structures';
        this.categoryElement.className = 'badge badge-structures';
      }
      if (codeContainer) codeContainer.style.display = 'none';
      if (this.conceptGuideRenderer) {
        this.conceptGuideRenderer.renderQueueTopCard(topConceptEl);
        this.conceptGuideRenderer.renderQueueGuide();
      }
      const { frames: queueFrames } = generateQueueOpsFrames(this.currentQueue, 'init', null, this.queueMode);
      frames = queueFrames;
      if (this.inputPanel) {
        this.inputPanel.updateQueueMetadata(this.currentQueue.length, 0, Math.max(0, this.currentQueue.length - 1));
      }

    } else if (this.algo === 'string-ops') {
      if (this.titleElement) this.titleElement.textContent = 'String Operations';
      if (this.categoryElement) {
        this.categoryElement.textContent = 'Data Structures';
        this.categoryElement.className = 'badge badge-structures';
      }
      if (codeContainer) codeContainer.style.display = 'none';
      if (this.conceptGuideRenderer) this.conceptGuideRenderer.renderStringGuide();
      const { frames: strFrames } = generateStringOpsFrames(this.currentString, 'init');
      frames = strFrames;
      if (this.inputPanel) {
        this.inputPanel.updateStringMetadata(this.currentString);
      }

    } else {
      // Standard Layout for sorting/searching algorithms
      const isSearchOrRecursion = (this.algo === 'linear-search' || this.algo === 'binary-search' || this.algo === 'recursion-ops');
      if (codeContainer) {
        // Hide code panel for search/recursion — they use the concept guide instead
        codeContainer.style.display = isSearchOrRecursion ? 'none' : 'block';
        if (!isSearchOrRecursion && this.codePanelRenderer) this.codePanelRenderer.loadAlgorithmCode(this.algo);
      }
      if (this.conceptGuideRenderer) {
        this.conceptGuideRenderer.renderSortingGuide(this.algo);
      }

      if (this.algo === 'recursion-ops') {
        if (this.titleElement) this.titleElement.textContent = 'Recursion (Call Stack & Tree)';
        if (this.categoryElement) this.categoryElement.textContent = 'Data Structures';
        frames = generateFactorialFrames(4);
      } else if (this.algo === 'selection-sort') {
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
        if (this.titleElement) this.titleElement.textContent = 'Bubble Sort';
        if (this.categoryElement) this.categoryElement.textContent = 'Sorting';
        frames = generateBubbleSortFrames(this.currentArray);
      }
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
