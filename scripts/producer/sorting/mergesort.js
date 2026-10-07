/**
 * AlgoVerse — Enhanced Merge Sort Frame Producer (Divide & Conquer Tree Sub-arrays)
 */

import { createFrame } from '../../core/frame.js';

export function generateMergeSortFrames(initialArray) {
  const arr = [...initialArray];
  const frames = [];
  let comparisons = 0;
  let swaps = 0;

  // Helper to compute all divide levels (e.g. 8 -> 4,4 -> 2,2,2,2 -> 1,1,1,1,1,1,1,1)
  function computeDivideLevels(length) {
    const levels = [];
    let currentLevel = [[0, length - 1]];
    levels.push(currentLevel);

    while (true) {
      let canSplit = false;
      const nextLevel = [];
      for (const [start, end] of currentLevel) {
        if (start < end) {
          canSplit = true;
          const mid = Math.floor((start + end) / 2);
          nextLevel.push([start, mid]);
          nextLevel.push([mid + 1, end]);
        } else {
          nextLevel.push([start, end]);
        }
      }
      if (!canSplit) break;
      levels.push(nextLevel);
      currentLevel = nextLevel;
    }
    return levels;
  }

  const divideLevels = computeDivideLevels(arr.length);

  // STEP 1: DIVIDE PHASE FRAMES (Visualizing splitting from size N down to size 1)
  divideLevels.forEach((levelSubarrays, lvlIdx) => {
    const groupCount = levelSubarrays.length;
    let narrationText = '';
    if (lvlIdx === 0) {
      narrationText = `Starting Merge Sort (Divide & Conquer). Initial array of size ${arr.length}.`;
    } else if (lvlIdx === divideLevels.length - 1) {
      narrationText = `✂️ DIVIDE COMPLETE: Array fully split into ${groupCount} base sub-arrays of size 1. Merging & sorting begins now!`;
    } else {
      narrationText = `✂️ DIVIDE PHASE: Splitting array into ${groupCount} sub-arrays.`;
    }

    frames.push(createFrame({
      op: 'compare',
      data: [...arr],
      highlights: [],
      pointers: {},
      subarrays: levelSubarrays,
      codeLine: 4,
      narration: narrationText,
      stats: { comparisons: 0, swaps: 0 }
    }));
  });

  // Track active sub-array partition state during recursive merge phase
  let activeSubarrays = divideLevels[divideLevels.length - 1].map(r => [...r]);

  function updateActiveSubarrays(start, end) {
    const nextSubarrays = [];
    let mergedAdded = false;

    for (const [s, e] of activeSubarrays) {
      if (s >= start && e <= end) {
        if (!mergedAdded) {
          nextSubarrays.push([start, end]);
          mergedAdded = true;
        }
      } else {
        nextSubarrays.push([s, e]);
      }
    }
    activeSubarrays = nextSubarrays;
  }

  // STEP 2: CONQUER & MERGE PHASE
  function merge(mainArr, start, mid, end) {
    const left = mainArr.slice(start, mid + 1);
    const right = mainArr.slice(mid + 1, end + 1);

    updateActiveSubarrays(start, end);

    frames.push(createFrame({
      op: 'compare',
      data: [...mainArr],
      highlights: Array.from({ length: end - start + 1 }, (_, idx) => start + idx),
      pointers: { start, mid, end },
      subarrays: activeSubarrays.map(r => [...r]),
      codeLine: 10,
      narration: `🔄 MERGING sub-arrays [${left.join(', ')}] and [${right.join(', ')}] into unified range [${start}..${end}].`,
      stats: { comparisons, swaps }
    }));

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      comparisons++;
      frames.push(createFrame({
        op: 'compare',
        data: [...mainArr],
        highlights: [start + i, mid + 1 + j],
        pointers: { left: start + i, right: mid + 1 + j, target: k },
        subarrays: activeSubarrays.map(r => [...r]),
        codeLine: 12,
        narration: `Comparing Left element (${left[i]}) with Right element (${right[j]}).`,
        stats: { comparisons, swaps }
      }));

      if (left[i] <= right[j]) {
        mainArr[k] = left[i];
        i++;
      } else {
        mainArr[k] = right[j];
        j++;
      }
      swaps++;

      frames.push(createFrame({
        op: 'swap',
        data: [...mainArr],
        highlights: [k],
        pointers: { merged: k },
        subarrays: activeSubarrays.map(r => [...r]),
        codeLine: 15,
        narration: `Placed smaller element into merged index ${k}.`,
        stats: { comparisons, swaps }
      }));

      k++;
    }

    while (i < left.length) {
      mainArr[k] = left[i];
      frames.push(createFrame({
        op: 'swap',
        data: [...mainArr],
        highlights: [k],
        pointers: { k },
        subarrays: activeSubarrays.map(r => [...r]),
        codeLine: 18,
        narration: `Copying remaining left element (${left[i]}) into index ${k}.`,
        stats: { comparisons, swaps }
      }));
      i++;
      k++;
    }

    while (j < right.length) {
      mainArr[k] = right[j];
      frames.push(createFrame({
        op: 'swap',
        data: [...mainArr],
        highlights: [k],
        pointers: { k },
        subarrays: activeSubarrays.map(r => [...r]),
        codeLine: 21,
        narration: `Copying remaining right element (${right[j]}) into index ${k}.`,
        stats: { comparisons, swaps }
      }));
      j++;
      k++;
    }
  }

  function mergeSortHelper(mainArr, start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);

    mergeSortHelper(mainArr, start, mid);
    mergeSortHelper(mainArr, mid + 1, end);
    merge(mainArr, start, mid, end);
  }

  mergeSortHelper(arr, 0, arr.length - 1);

  // FINAL SORTED FRAME
  frames.push(createFrame({
    op: 'sorted',
    data: [...arr],
    highlights: [],
    pointers: {},
    subarrays: [[0, arr.length - 1]],
    codeLine: 25,
    narration: `🎉 Merge Sort Complete! All sub-arrays merged and fully sorted. Total comparisons: ${comparisons}, placements: ${swaps}.`,
    stats: { comparisons, swaps }
  }));

  return frames;
}
