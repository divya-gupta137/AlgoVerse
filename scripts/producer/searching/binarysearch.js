/**
 * AlgoVerse — Binary Search Frame Producer
 * Divide & Conquer search on sorted arrays using low, mid, and high pointers.
 */

import { createFrame } from '../../core/frame.js';

export function generateBinarySearchFrames(initialArray, target = 32) {
  // Binary Search REQUIRES a sorted array
  const arr = [...initialArray].sort((a, b) => a - b);
  const frames = [];
  let comparisons = 0;
  let found = false;

  frames.push(createFrame({
    op: 'start',
    data: [...arr],
    highlights: [],
    pointers: { targetVal: target },
    codeLine: 1,
    narration: `Starting Binary Search for target ${target}. Array sorted first: [${arr.join(', ')}].`,
    stats: { comparisons: 0, swaps: 0 }
  }));

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;

    // MID POINT SELECTION FRAME
    frames.push(createFrame({
      op: 'pivot',
      data: [...arr],
      highlights: [mid],
      pointers: { low, mid, high },
      subarrays: [[low, high]],
      codeLine: 4,
      narration: `Calculated mid index = Math.floor((${low} + ${high}) / 2) = ${mid}. Inspecting arr[${mid}] (${arr[mid]}).`,
      stats: { comparisons, swaps: 0 }
    }));

    // COMPARE FRAME
    frames.push(createFrame({
      op: 'compare',
      data: [...arr],
      highlights: [mid],
      pointers: { low, mid, high },
      subarrays: [[low, high]],
      codeLine: 6,
      narration: `Comparing mid element arr[${mid}] (${arr[mid]}) with target (${target}).`,
      stats: { comparisons, swaps: 0 }
    }));

    if (arr[mid] === target) {
      found = true;
      frames.push(createFrame({
        op: 'sorted',
        data: [...arr],
        highlights: [mid],
        pointers: { FOUND: mid },
        subarrays: [[mid, mid]],
        codeLine: 7,
        narration: `🎉 TARGET FOUND! Value ${target} found at index ${mid} in ${comparisons} comparison(s).`,
        stats: { comparisons, swaps: 0 }
      }));
      break;
    } else if (arr[mid] < target) {
      frames.push(createFrame({
        op: 'compare',
        data: [...arr],
        highlights: [mid],
        pointers: { low, mid, high },
        subarrays: [[mid + 1, high]],
        codeLine: 9,
        narration: `Element arr[${mid}] (${arr[mid]}) < Target (${target}). Searching RIGHT half [${mid + 1}..${high}]. Setting low = ${mid + 1}.`,
        stats: { comparisons, swaps: 0 }
      }));
      low = mid + 1;
    } else {
      frames.push(createFrame({
        op: 'compare',
        data: [...arr],
        highlights: [mid],
        pointers: { low, mid, high },
        subarrays: [[low, mid - 1]],
        codeLine: 12,
        narration: `Element arr[${mid}] (${arr[mid]}) > Target (${target}). Searching LEFT half [${low}..${mid - 1}]. Setting high = ${mid - 1}.`,
        stats: { comparisons, swaps: 0 }
      }));
      high = mid - 1;
    }
  }

  if (!found) {
    frames.push(createFrame({
      op: 'start',
      data: [...arr],
      highlights: [],
      pointers: {},
      codeLine: 15,
      narration: `❌ Target value ${target} NOT found in array after ${comparisons} comparison(s). Range low (${low}) > high (${high}).`,
      stats: { comparisons, swaps: 0 }
    }));
  }

  return frames;
}
