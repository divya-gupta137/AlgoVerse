/**
 * AlgoVerse — Linear Search Frame Producer
 * Sequential search algorithm comparing target against elements from index 0 to N-1.
 */

import { createFrame } from '../../core/frame.js';

export function generateLinearSearchFrames(initialArray, target = 32) {
  const arr = [...initialArray];
  const frames = [];
  let comparisons = 0;
  let found = false;
  let foundIndex = -1;

  // STEP 0: START FRAME
  frames.push(createFrame({
    op: 'start',
    data: [...arr],
    highlights: [],
    pointers: { targetVal: target },
    codeLine: 1,
    narration: `Starting Linear Search for target value ${target}. Checking elements sequentially from index 0 to ${arr.length - 1}.`,
    stats: { comparisons: 0, swaps: 0 }
  }));

  for (let i = 0; i < arr.length; i++) {
    comparisons++;

    // COMPARE FRAME
    frames.push(createFrame({
      op: 'compare',
      data: [...arr],
      highlights: [i],
      pointers: { i, targetVal: target },
      codeLine: 3,
      narration: `Comparing element arr[${i}] (${arr[i]}) with target (${target}).`,
      stats: { comparisons, swaps: 0 }
    }));

    if (arr[i] === target) {
      found = true;
      foundIndex = i;

      // FOUND FRAME
      frames.push(createFrame({
        op: 'sorted', // Highlights in green
        data: [...arr],
        highlights: [i],
        pointers: { FOUND: i },
        codeLine: 5,
        narration: `🎉 TARGET FOUND! Value ${target} found at index ${i} after ${comparisons} comparison(s).`,
        stats: { comparisons, swaps: 0 }
      }));
      break;
    }
  }

  if (!found) {
    frames.push(createFrame({
      op: 'start',
      data: [...arr],
      highlights: [],
      pointers: {},
      codeLine: 8,
      narration: `❌ Target value ${target} NOT found in array after ${comparisons} comparison(s).`,
      stats: { comparisons, swaps: 0 }
    }));
  }

  return frames;
}
