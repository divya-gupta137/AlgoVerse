/**
 * AlgoVerse — Enhanced Quick Sort Frame Producer (Pivot Partitioning with Sub-arrays)
 */

import { createFrame } from '../../core/frame.js';

export function generateQuickSortFrames(initialArray) {
  const arr = [...initialArray];
  const frames = [];
  let comparisons = 0;
  let swaps = 0;

  let activeSubarrays = [[0, arr.length - 1]];

  frames.push(createFrame({
    op: 'start',
    data: [...arr],
    subarrays: activeSubarrays.map(r => [...r]),
    narration: 'Starting Quick Sort. Divide-and-conquer algorithm that partitions array around selected Pivot elements.',
    stats: { comparisons: 0, swaps: 0 }
  }));

  function updatePartition(low, high, pi) {
    const next = [];
    for (const [s, e] of activeSubarrays) {
      if (s === low && e === high) {
        if (low <= pi - 1) next.push([low, pi - 1]);
        next.push([pi, pi]);
        if (pi + 1 <= high) next.push([pi + 1, high]);
      } else {
        next.push([s, e]);
      }
    }
    activeSubarrays = next;
  }

  function partition(mainArr, low, high) {
    const pivot = mainArr[high];
    let i = low - 1;

    frames.push(createFrame({
      op: 'pivot',
      data: [...mainArr],
      highlights: [high],
      pointers: { low, high, PIVOT: high },
      subarrays: activeSubarrays.map(r => [...r]),
      codeLine: 4,
      narration: `🎯 PIVOT CHOSEN: ${pivot} at index ${high}. Partitioning range [${low}..${high}]. Elements < ${pivot} move left; elements > ${pivot} move right.`,
      stats: { comparisons, swaps }
    }));

    for (let j = low; j < high; j++) {
      comparisons++;

      frames.push(createFrame({
        op: 'compare',
        data: [...mainArr],
        highlights: [j, high],
        pointers: { low, high, PIVOT: high, j, i: Math.max(0, i) },
        subarrays: activeSubarrays.map(r => [...r]),
        codeLine: 7,
        narration: `Comparing element arr[${j}] (${mainArr[j]}) with Pivot (${pivot}).`,
        stats: { comparisons, swaps }
      }));

      if (mainArr[j] < pivot) {
        i++;
        const temp = mainArr[i];
        mainArr[i] = mainArr[j];
        mainArr[j] = temp;
        swaps++;

        frames.push(createFrame({
          op: 'swap',
          data: [...mainArr],
          highlights: [i, j],
          pointers: { i, j, PIVOT: high },
          subarrays: activeSubarrays.map(r => [...r]),
          codeLine: 10,
          narration: `Element ${mainArr[i]} < Pivot (${pivot}). Swapping arr[${i}] and arr[${j}] into smaller partition.`,
          stats: { comparisons, swaps }
        }));
      }
    }

    const temp = mainArr[i + 1];
    mainArr[i + 1] = mainArr[high];
    mainArr[high] = temp;
    swaps++;
    const pivotIndex = i + 1;

    updatePartition(low, high, pivotIndex);

    frames.push(createFrame({
      op: 'swap',
      data: [...mainArr],
      highlights: [pivotIndex],
      pointers: { PIVOT: pivotIndex },
      subarrays: activeSubarrays.map(r => [...r]),
      codeLine: 14,
      narration: `🎯 Pivot ${pivot} placed into final sorted position at index ${pivotIndex}. Sub-arrays partitioned into Left [< ${pivot}] and Right [> ${pivot}].`,
      stats: { comparisons, swaps }
    }));

    return pivotIndex;
  }

  function quickSortHelper(mainArr, low, high) {
    if (low < high) {
      const pi = partition(mainArr, low, high);
      quickSortHelper(mainArr, low, pi - 1);
      quickSortHelper(mainArr, pi + 1, high);
    }
  }

  quickSortHelper(arr, 0, arr.length - 1);

  frames.push(createFrame({
    op: 'sorted',
    data: [...arr],
    highlights: [],
    pointers: {},
    subarrays: [[0, arr.length - 1]],
    codeLine: 18,
    narration: `🎉 Quick Sort Complete! Total comparisons: ${comparisons}, total swaps: ${swaps}.`,
    stats: { comparisons, swaps }
  }));

  return frames;
}
