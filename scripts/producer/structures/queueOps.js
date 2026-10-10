/**
 * AlgoVerse — Queue (FIFO) Frame Producer with User Actions
 */

import { createFrame } from '../../core/frame.js';

export function generateQueueOpsFrames(queueState = [10, 20, 30, 40], action = 'init', value = 50) {
  const queue = [...queueState];
  const frames = [];

  if (action === 'enqueue') {
    const enqueueVal = Number(value) || 50;
    frames.push(createFrame({
      op: 'compare',
      data: [...queue],
      highlights: [],
      pointers: { ENQUEUE: enqueueVal },
      codeLine: 3,
      narration: `ENQUEUE Operation: Adding value ${enqueueVal} at the REAR of the queue.`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    queue.push(enqueueVal);
    frames.push(createFrame({
      op: 'swap',
      data: [...queue],
      highlights: [0, queue.length - 1],
      pointers: { FRONT: 0, REAR: queue.length - 1 },
      codeLine: 4,
      narration: `🎉 Enqueued ${enqueueVal} at REAR (index ${queue.length - 1}). Queue size = ${queue.length}.`,
      stats: { comparisons: 0, swaps: 1 }
    }));
  } else if (action === 'dequeue') {
    if (queue.length === 0) {
      frames.push(createFrame({
        op: 'pivot',
        data: [],
        highlights: [],
        pointers: {},
        codeLine: 6,
        narration: `⚠️ QUEUE UNDERFLOW: Cannot dequeue from an empty queue!`,
        stats: { comparisons: 0, swaps: 0 }
      }));
    } else {
      const dequeuedVal = queue[0];
      frames.push(createFrame({
        op: 'compare',
        data: [...queue],
        highlights: [0],
        pointers: { FRONT: 0, DEQUEUING: dequeuedVal },
        codeLine: 6,
        narration: `DEQUEUE Operation: Removing front element (${dequeuedVal}) from index 0.`,
        stats: { comparisons: 1, swaps: 0 }
      }));

      queue.shift();
      frames.push(createFrame({
        op: 'swap',
        data: queue.length > 0 ? [...queue] : [],
        highlights: queue.length > 0 ? [0, queue.length - 1] : [],
        pointers: queue.length > 0 ? { FRONT: 0, REAR: queue.length - 1 } : {},
        codeLine: 6,
        narration: `🎉 Dequeued element ${dequeuedVal}! Queue size reduced to ${queue.length}.`,
        stats: { comparisons: 1, swaps: 1 }
      }));
    }
  } else if (action === 'peek') {
    if (queue.length === 0) {
      frames.push(createFrame({
        op: 'pivot',
        data: [],
        highlights: [],
        pointers: {},
        codeLine: 1,
        narration: `⚠️ QUEUE IS EMPTY: Nothing to peek.`,
        stats: { comparisons: 0, swaps: 0 }
      }));
    } else {
      frames.push(createFrame({
        op: 'pivot',
        data: [...queue],
        highlights: [0],
        pointers: { FRONT: 0 },
        codeLine: 1,
        narration: `👁️ PEEK FRONT: Front element is ${queue[0]} at index 0. Queue size = ${queue.length}.`,
        stats: { comparisons: 1, swaps: 0 }
      }));
    }
  } else {
    // Initial state
    frames.push(createFrame({
      op: 'sorted',
      data: [...queue],
      highlights: queue.length > 0 ? [0, queue.length - 1] : [],
      pointers: queue.length > 0 ? { FRONT: 0, REAR: queue.length - 1 } : {},
      codeLine: 1,
      narration: `Queue Ready. Length = ${queue.length}. Click Enqueue, Dequeue, or Peek to test queue operations!`,
      stats: { comparisons: 0, swaps: 0 }
    }));
  }

  return { frames, updatedQueue: queue };
}
