/**
 * AlgoVerse — Bubble Sort Frame Producer
 * Generates step-by-step frame snapshots for Bubble Sort.
 */

import { createFrame } from '../../core/frame.js';

export function generateBubbleSortFrames(initialArray) {
  const arr = [...initialArray];
  const n = arr.length;
  const frames = [];
  let comparisons = 0;
  let swaps = 0;

  // Frame 0: Initial State
  frames.push(createFrame({
    op: 'start',
    data: arr,
    narration: 'Starting Bubble Sort. We compare adjacent elements and swap them if they are out of order.',
    stats: { comparisons: 0, swaps: 0 }
  }));

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;

      // Compare Frame
      frames.push(createFrame({
        op: 'compare',
        data: arr,
        highlights: [j, j + 1],
        pointers: { i, j, 'j+1': j + 1 },
        codeLine: 4,
        narration: `Comparing element at index ${j} (${arr[j]}) with index ${j + 1} (${arr[j + 1]}).`,
        stats: { comparisons, swaps }
      }));

      if (arr[j] > arr[j + 1]) {
        // Swap values
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swaps++;

        // Swap Frame
        frames.push(createFrame({
          op: 'swap',
          data: arr,
          highlights: [j, j + 1],
          pointers: { i, j, 'j+1': j + 1 },
          codeLine: 6,
          narration: `${temp} > ${arr[j]} — Swapping adjacent elements!`,
          stats: { comparisons, swaps }
        }));
      }
    }
  }

  // Completion Frame
  frames.push(createFrame({
    op: 'sorted',
    data: arr,
    highlights: [],
    pointers: {},
    codeLine: 10,
    narration: `Bubble Sort Complete! Total comparisons: ${comparisons}, total swaps: ${swaps}.`,
    stats: { comparisons, swaps }
  }));

  return frames;
}
