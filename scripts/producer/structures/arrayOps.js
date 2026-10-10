/**
 * AlgoVerse — Array Operations Frame Producer
 * Generates frames for Array Insert, Delete, Search, and Traversal operations.
 */

import { createFrame } from '../../core/frame.js';

export function generateArrayOpsFrames(initialArray, opType = 'insert', val = 99, index = 2) {
  const arr = [...initialArray];
  const frames = [];

  if (opType === 'insert') {
    const targetIdx = Math.min(Math.max(0, index), arr.length);
    frames.push(createFrame({
      op: 'start',
      data: [...arr],
      highlights: [],
      pointers: { insertVal: val, index: targetIdx },
      codeLine: 1,
      narration: `Starting Array Insertion: Inserting value ${val} at index ${targetIdx}.`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    // Shift elements right from end to targetIdx
    for (let i = arr.length - 1; i >= targetIdx; i--) {
      arr[i + 1] = arr[i];
      frames.push(createFrame({
        op: 'swap',
        data: [...arr],
        highlights: [i, i + 1],
        pointers: { shifting: i, target: i + 1 },
        codeLine: 3,
        narration: `Shifting element ${arr[i]} right from index ${i} to index ${i + 1}.`,
        stats: { comparisons: 0, swaps: arr.length - i }
      }));
    }

    arr[targetIdx] = val;
    frames.push(createFrame({
      op: 'sorted',
      data: [...arr],
      highlights: [targetIdx],
      pointers: { INSERTED: targetIdx },
      codeLine: 5,
      narration: `🎉 Value ${val} successfully inserted at index ${targetIdx}! Array size increased to ${arr.length}.`,
      stats: { comparisons: 0, swaps: 0 }
    }));

  } else if (opType === 'delete') {
    const deleteIdx = Math.min(Math.max(0, index), arr.length - 1);
    const deletedValue = arr[deleteIdx];

    frames.push(createFrame({
      op: 'pivot',
      data: [...arr],
      highlights: [deleteIdx],
      pointers: { DELETE: deleteIdx },
      codeLine: 1,
      narration: `Starting Array Deletion: Deleting element ${deletedValue} at index ${deleteIdx}.`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    // Shift elements left from deleteIdx + 1 to end
    for (let i = deleteIdx; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1];
      frames.push(createFrame({
        op: 'swap',
        data: [...arr],
        highlights: [i, i + 1],
        pointers: { shifting: i + 1, target: i },
        codeLine: 4,
        narration: `Shifting element ${arr[i]} left from index ${i + 1} to index ${i}.`,
        stats: { comparisons: 0, swaps: i - deleteIdx + 1 }
      }));
    }

    arr.pop(); // Reduce size by 1
    frames.push(createFrame({
      op: 'sorted',
      data: [...arr],
      highlights: [],
      pointers: {},
      codeLine: 6,
      narration: `🎉 Element ${deletedValue} successfully removed! Array size reduced to ${arr.length}.`,
      stats: { comparisons: 0, swaps: 0 }
    }));

  } else {
    // Traversal
    frames.push(createFrame({
      op: 'start',
      data: [...arr],
      highlights: [],
      pointers: {},
      codeLine: 1,
      narration: `Starting Array Traversal across ${arr.length} elements.`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    for (let i = 0; i < arr.length; i++) {
      frames.push(createFrame({
        op: 'compare',
        data: [...arr],
        highlights: [i],
        pointers: { i },
        codeLine: 3,
        narration: `Visiting array element at index ${i}: value ${arr[i]}.`,
        stats: { comparisons: i + 1, swaps: 0 }
      }));
    }

    frames.push(createFrame({
      op: 'sorted',
      data: [...arr],
      highlights: [],
      pointers: {},
      codeLine: 5,
      narration: `🎉 Array Traversal Complete! All ${arr.length} elements visited.`,
      stats: { comparisons: arr.length, swaps: 0 }
    }));
  }

  return frames;
}
