/**
 * AlgoVerse — Selection Sort Frame Producer
 * Generates step-by-step frame snapshots for Selection Sort.
 */

import { createFrame } from '../../core/frame.js';

export function generateSelectionSortFrames(initialArray) {
  const arr = [...initialArray];
  const n = arr.length;
  const frames = [];
  let comparisons = 0;
  let swaps = 0;

  frames.push(createFrame({
    op: 'start',
    data: arr,
    narration: 'Starting Selection Sort. We repeatedly find the minimum element in unsorted portion and swap it to the front.',
    stats: { comparisons: 0, swaps: 0 }
  }));

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      comparisons++;

      frames.push(createFrame({
        op: 'compare',
        data: arr,
        highlights: [j, minIdx],
        pointers: { i, j, min: minIdx },
        codeLine: 5,
        narration: `Checking if ${arr[j]} (index ${j}) is smaller than current minimum ${arr[minIdx]} (index ${minIdx}).`,
        stats: { comparisons, swaps }
      }));

      if (arr[j] < arr[minIdx]) {
        minIdx = j;

        frames.push(createFrame({
          op: 'compare',
          data: arr,
          highlights: [minIdx],
          pointers: { i, j, min: minIdx },
          codeLine: 7,
          narration: `New minimum found: ${arr[minIdx]} at index ${minIdx}.`,
          stats: { comparisons, swaps }
        }));
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      swaps++;

      frames.push(createFrame({
        op: 'swap',
        data: arr,
        highlights: [i, minIdx],
        pointers: { i, min: minIdx },
        codeLine: 12,
        narration: `Swapping minimum ${arr[i]} into its correct sorted position at index ${i}.`,
        stats: { comparisons, swaps }
      }));
    }
  }

  frames.push(createFrame({
    op: 'sorted',
    data: arr,
    highlights: [],
    pointers: {},
    codeLine: 15,
    narration: `Selection Sort Complete! Total comparisons: ${comparisons}, total swaps: ${swaps}.`,
    stats: { comparisons, swaps }
  }));

  return frames;
}
