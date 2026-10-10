/**
 * AlgoVerse — Stack (LIFO) Frame Producer with User Actions
 */

import { createFrame } from '../../core/frame.js';

export function generateStackOpsFrames(stackState = [15, 30, 45, 60], action = 'init', value = 75) {
  const stack = [...stackState];
  const frames = [];

  if (action === 'push') {
    const pushVal = Number(value) || 50;
    frames.push(createFrame({
      op: 'compare',
      data: [...stack],
      highlights: [],
      pointers: { PUSH: pushVal },
      codeLine: 2,
      narration: `PUSH Operation: Preparing to push value ${pushVal} onto top of the stack.`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    stack.push(pushVal);
    frames.push(createFrame({
      op: 'swap',
      data: [...stack],
      highlights: [stack.length - 1],
      pointers: { TOP: stack.length - 1 },
      codeLine: 3,
      narration: `🎉 Pushed ${pushVal} onto top of stack! New TOP index is ${stack.length - 1}. Stack height = ${stack.length}.`,
      stats: { comparisons: 0, swaps: 1 }
    }));
  } else if (action === 'pop') {
    if (stack.length === 0) {
      frames.push(createFrame({
        op: 'pivot',
        data: [],
        highlights: [],
        pointers: {},
        codeLine: 5,
        narration: `⚠️ STACK UNDERFLOW: Cannot pop from an empty stack!`,
        stats: { comparisons: 0, swaps: 0 }
      }));
    } else {
      const poppedVal = stack[stack.length - 1];
      frames.push(createFrame({
        op: 'compare',
        data: [...stack],
        highlights: [stack.length - 1],
        pointers: { TOP: stack.length - 1, POPPING: poppedVal },
        codeLine: 4,
        narration: `POP Operation: Popping top element (${poppedVal}) from index ${stack.length - 1}.`,
        stats: { comparisons: 1, swaps: 0 }
      }));

      stack.pop();
      frames.push(createFrame({
        op: 'swap',
        data: stack.length > 0 ? [...stack] : [],
        highlights: stack.length > 0 ? [stack.length - 1] : [],
        pointers: stack.length > 0 ? { TOP: stack.length - 1 } : {},
        codeLine: 5,
        narration: `🎉 Popped element ${poppedVal}! Stack height reduced to ${stack.length}.`,
        stats: { comparisons: 1, swaps: 1 }
      }));
    }
  } else if (action === 'peek') {
    if (stack.length === 0) {
      frames.push(createFrame({
        op: 'pivot',
        data: [],
        highlights: [],
        pointers: {},
        codeLine: 6,
        narration: `⚠️ STACK IS EMPTY: Nothing to peek.`,
        stats: { comparisons: 0, swaps: 0 }
      }));
    } else {
      frames.push(createFrame({
        op: 'pivot',
        data: [...stack],
        highlights: [stack.length - 1],
        pointers: { PEEK: stack.length - 1 },
        codeLine: 6,
        narration: `👁️ PEEK Operation: Top element is ${stack[stack.length - 1]} at index ${stack.length - 1}. Stack height = ${stack.length}.`,
        stats: { comparisons: 1, swaps: 0 }
      }));
    }
  } else {
    // Initial state
    frames.push(createFrame({
      op: 'sorted',
      data: [...stack],
      highlights: stack.length > 0 ? [stack.length - 1] : [],
      pointers: stack.length > 0 ? { TOP: stack.length - 1 } : {},
      codeLine: 1,
      narration: `Stack Ready. Height = ${stack.length}. Click Push, Pop, or Peek to interactively test stack operations!`,
      stats: { comparisons: 0, swaps: 0 }
    }));
  }

  return { frames, updatedStack: stack };
}
