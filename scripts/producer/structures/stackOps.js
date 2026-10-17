/**
 * AlgoVerse — Stack (LIFO) Frame Producer with User Actions
 * Strictly clean text (zero emojis) and complete LIFO mechanics.
 */

import { createFrame } from '../../core/frame.js';

export const STACK_MAX_CAPACITY = 8;

export function generateStackOpsFrames(stackState = [15, 30, 45, 60], action = 'init', value = 75) {
  const stack = [...stackState];
  const frames = [];

  if (action === 'push') {
    const pushVal = Number(value) || 50;

    if (stack.length >= STACK_MAX_CAPACITY) {
      frames.push(createFrame({
        op: 'pivot',
        data: [...stack],
        highlights: [stack.length - 1],
        pointers: { TOP: stack.length - 1 },
        codeLine: 2,
        narration: `✗ STACK OVERFLOW: Maximum capacity (${STACK_MAX_CAPACITY} elements) reached! Cannot push ${pushVal}.`,
        stats: { comparisons: 0, swaps: 0 }
      }));
      return { frames, updatedStack: stack };
    }

    frames.push(createFrame({
      op: 'compare',
      data: [...stack],
      highlights: [],
      pointers: { PUSH: pushVal },
      codeLine: 2,
      narration: `1. PUSH: Allocating element ${pushVal} on top of stack.`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    stack.push(pushVal);
    frames.push(createFrame({
      op: 'swap',
      data: [...stack],
      highlights: [stack.length - 1],
      pointers: { TOP: stack.length - 1 },
      codeLine: 3,
      narration: `✓ Pushed ${pushVal} onto stack. New TOP index: [${stack.length - 1}]. Total height: ${stack.length} / ${STACK_MAX_CAPACITY}.`,
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
        narration: `✗ STACK UNDERFLOW: Cannot pop from an empty stack! (Stack height = 0)`,
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
        narration: `1. POP: Reading TOP element ${poppedVal} at index [${stack.length - 1}].`,
        stats: { comparisons: 1, swaps: 0 }
      }));

      stack.pop();
      frames.push(createFrame({
        op: 'swap',
        data: stack.length > 0 ? [...stack] : [],
        highlights: stack.length > 0 ? [stack.length - 1] : [],
        pointers: stack.length > 0 ? { TOP: stack.length - 1 } : {},
        codeLine: 5,
        narration: `✓ Popped element ${poppedVal}. Stack height is now ${stack.length}. Time: O(1).`,
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
        narration: `• STACK IS EMPTY: Nothing to peek.`,
        stats: { comparisons: 0, swaps: 0 }
      }));
    } else {
      frames.push(createFrame({
        op: 'pivot',
        data: [...stack],
        highlights: [stack.length - 1],
        pointers: { PEEK: stack.length - 1 },
        codeLine: 6,
        narration: `✓ PEEK: TOP element is ${stack[stack.length - 1]} at index [${stack.length - 1}]. Stack height = ${stack.length}.`,
        stats: { comparisons: 1, swaps: 0 }
      }));
    }

  } else if (action === 'clear') {
    frames.push(createFrame({
      op: 'pivot',
      data: [],
      highlights: [],
      pointers: {},
      codeLine: 1,
      narration: `✓ Cleared all elements. Stack is now empty.`,
      stats: { comparisons: 0, swaps: 0 }
    }));
    return { frames, updatedStack: [] };

  } else if (action === 'random') {
    const randomVals = [10, 25, 40, 55, 70];
    frames.push(createFrame({
      op: 'sorted',
      data: randomVals,
      highlights: [randomVals.length - 1],
      pointers: { TOP: randomVals.length - 1 },
      codeLine: 1,
      narration: `✓ Initialized random stack with ${randomVals.length} elements.`,
      stats: { comparisons: 0, swaps: 0 }
    }));
    return { frames, updatedStack: randomVals };

  } else if (action === 'reverse') {
    if (stack.length <= 1) {
      frames.push(createFrame({
        op: 'sorted',
        data: [...stack],
        highlights: stack.length > 0 ? [0] : [],
        pointers: stack.length > 0 ? { TOP: 0 } : {},
        codeLine: 1,
        narration: `• Stack has ${stack.length} elements; reversal requires at least 2 items.`,
        stats: { comparisons: 0, swaps: 0 }
      }));
    } else {
      frames.push(createFrame({
        op: 'compare',
        data: [...stack],
        highlights: [0, stack.length - 1],
        pointers: { TOP: stack.length - 1 },
        codeLine: 7,
        narration: `1. Reversing Stack: Flipping bottom and top elements using recursive call frames.`,
        stats: { comparisons: 1, swaps: 0 }
      }));

      stack.reverse();
      frames.push(createFrame({
        op: 'swap',
        data: [...stack],
        highlights: [stack.length - 1],
        pointers: { TOP: stack.length - 1 },
        codeLine: 8,
        narration: `✓ Stack Reversal Complete! New TOP is ${stack[stack.length - 1]}.`,
        stats: { comparisons: 1, swaps: 1 }
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
      narration: `• Stack Ready (LIFO). Height: ${stack.length} / ${STACK_MAX_CAPACITY}. Top element: ${stack.length > 0 ? stack[stack.length - 1] : 'null'}.`,
      stats: { comparisons: 0, swaps: 0 }
    }));
  }

  return { frames, updatedStack: stack };
}
