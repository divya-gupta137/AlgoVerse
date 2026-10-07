/**
 * AlgoVerse — Insertion Sort Frame Producer
 * Generates step-by-step frame snapshots for Insertion Sort.
 */

import { createFrame } from '../../core/frame.js';

export function generateInsertionSortFrames(initialArray) {
  const arr = [...initialArray];
  const n = arr.length;
  const frames = [];
  let comparisons = 0;
  let swaps = 0;

  frames.push(createFrame({
    op: 'start',
    data: arr,
    narration: 'Starting Insertion Sort. Building sorted array one element at a time by inserting items into their proper place.',
    stats: { comparisons: 0, swaps: 0 }
  }));

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    frames.push(createFrame({
      op: 'compare',
      data: arr,
      highlights: [i],
      pointers: { i, keyIndex: i },
      codeLine: 4,
      narration: `Key selected: ${key} at index ${i}. Finding its position in sorted subarray [0..${i-1}].`,
      stats: { comparisons, swaps }
    }));

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      frames.push(createFrame({
        op: 'compare',
        data: arr,
        highlights: [j, j + 1],
        pointers: { i, j, key: i },
        codeLine: 6,
        narration: `Comparing element at index ${j} (${arr[j]}) with key (${key}). ${arr[j]} > ${key}, shifting right!`,
        stats: { comparisons, swaps }
      }));

      arr[j + 1] = arr[j];
      swaps++;

      frames.push(createFrame({
        op: 'swap',
        data: arr,
        highlights: [j, j + 1],
        pointers: { i, j, key: i },
        codeLine: 8,
        narration: `Shifted element ${arr[j+1]} right to index ${j + 1}.`,
        stats: { comparisons, swaps }
      }));

      j--;
    }

    if (j >= 0) comparisons++;

    arr[j + 1] = key;

    frames.push(createFrame({
      op: 'swap',
      data: arr,
      highlights: [j + 1],
      pointers: { i, inserted: j + 1 },
      codeLine: 12,
      narration: `Inserted key (${key}) into its correct position at index ${j + 1}.`,
      stats: { comparisons, swaps }
    }));
  }

  frames.push(createFrame({
    op: 'sorted',
    data: arr,
    highlights: [],
    pointers: {},
    codeLine: 15,
    narration: `Insertion Sort Complete! Total comparisons: ${comparisons}, total shifts/swaps: ${swaps}.`,
    stats: { comparisons, swaps }
  }));

  return frames;
}
