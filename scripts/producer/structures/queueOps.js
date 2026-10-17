/**
 * AlgoVerse — Queue (FIFO) Frame Producer with User Actions
 * Supports both Linear and Circular Queue semantics with clean text (zero emojis).
 */

import { createFrame } from '../../core/frame.js';

export const QUEUE_MAX_CAPACITY = 8;

export function generateQueueOpsFrames(queueState = [10, 20, 30, 40], action = 'init', value = 50, queueType = 'linear') {
  const queue = [...queueState];
  const frames = [];

  if (action === 'enqueue') {
    const enqueueVal = Number(value) || 50;

    if (queue.length >= QUEUE_MAX_CAPACITY) {
      frames.push(createFrame({
        op: 'pivot',
        data: [...queue],
        highlights: [queue.length - 1],
        pointers: { FRONT: 0, REAR: queue.length - 1 },
        codeLine: 2,
        narration: `✗ QUEUE OVERFLOW: Maximum capacity (${QUEUE_MAX_CAPACITY} elements) reached! Cannot enqueue ${enqueueVal}.`,
        queueType,
        stats: { comparisons: 0, swaps: 0 }
      }));
      return { frames, updatedQueue: queue };
    }

    frames.push(createFrame({
      op: 'compare',
      data: [...queue],
      highlights: [],
      pointers: { ENQUEUE: enqueueVal },
      codeLine: 3,
      narration: `1. ENQUEUE: Allocating ${enqueueVal} at REAR pointer (index [${queue.length}]).`,
      queueType,
      stats: { comparisons: 0, swaps: 0 }
    }));

    queue.push(enqueueVal);
    frames.push(createFrame({
      op: 'swap',
      data: [...queue],
      highlights: [0, queue.length - 1],
      pointers: { FRONT: 0, REAR: queue.length - 1 },
      codeLine: 4,
      narration: `✓ Enqueued ${enqueueVal} at REAR. FRONT=[0], REAR=[${queue.length - 1}]. Queue size: ${queue.length} / ${QUEUE_MAX_CAPACITY}.`,
      queueType,
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
        narration: `✗ QUEUE UNDERFLOW: Cannot dequeue from an empty queue! (Queue size = 0)`,
        queueType,
        stats: { comparisons: 0, swaps: 0 }
      }));
    } else {
      const dequeuedVal = queue[0];
      frames.push(createFrame({
        op: 'compare',
        data: [...queue],
        highlights: [0],
        pointers: { FRONT: 0, DEQUEUING: dequeuedVal },
        codeLine: 5,
        narration: `1. DEQUEUE: Reading FRONT element ${dequeuedVal} at index [0].`,
        queueType,
        stats: { comparisons: 1, swaps: 0 }
      }));

      queue.shift();
      frames.push(createFrame({
        op: 'swap',
        data: queue.length > 0 ? [...queue] : [],
        highlights: queue.length > 0 ? [0, queue.length - 1] : [],
        pointers: queue.length > 0 ? { FRONT: 0, REAR: queue.length - 1 } : {},
        codeLine: 6,
        narration: `✓ Dequeued element ${dequeuedVal}. FRONT advanced to next item. Queue size: ${queue.length}.`,
        queueType,
        stats: { comparisons: 1, swaps: 1 }
      }));
    }

  } else if (action === 'peek' || action === 'peek-front') {
    if (queue.length === 0) {
      frames.push(createFrame({
        op: 'pivot',
        data: [],
        highlights: [],
        pointers: {},
        codeLine: 1,
        narration: `• QUEUE IS EMPTY: Nothing at FRONT.`,
        queueType,
        stats: { comparisons: 0, swaps: 0 }
      }));
    } else {
      frames.push(createFrame({
        op: 'pivot',
        data: [...queue],
        highlights: [0],
        pointers: { FRONT: 0 },
        codeLine: 1,
        narration: `✓ PEEK FRONT: Front element is ${queue[0]} at index [0].`,
        queueType,
        stats: { comparisons: 1, swaps: 0 }
      }));
    }

  } else if (action === 'peek-rear') {
    if (queue.length === 0) {
      frames.push(createFrame({
        op: 'pivot',
        data: [],
        highlights: [],
        pointers: {},
        codeLine: 1,
        narration: `• QUEUE IS EMPTY: Nothing at REAR.`,
        queueType,
        stats: { comparisons: 0, swaps: 0 }
      }));
    } else {
      frames.push(createFrame({
        op: 'pivot',
        data: [...queue],
        highlights: [queue.length - 1],
        pointers: { REAR: queue.length - 1 },
        codeLine: 1,
        narration: `✓ PEEK REAR: Rear element is ${queue[queue.length - 1]} at index [${queue.length - 1}].`,
        queueType,
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
      narration: `✓ Cleared all elements. Queue is now empty.`,
      queueType,
      stats: { comparisons: 0, swaps: 0 }
    }));
    return { frames, updatedQueue: [] };

  } else if (action === 'random') {
    const randomVals = [12, 24, 36, 48, 60];
    frames.push(createFrame({
      op: 'sorted',
      data: randomVals,
      highlights: [0, randomVals.length - 1],
      pointers: { FRONT: 0, REAR: randomVals.length - 1 },
      codeLine: 1,
      narration: `✓ Initialized queue with ${randomVals.length} elements.`,
      queueType,
      stats: { comparisons: 0, swaps: 0 }
    }));
    return { frames, updatedQueue: randomVals };

  } else {
    // Initial state
    frames.push(createFrame({
      op: 'sorted',
      data: [...queue],
      highlights: queue.length > 0 ? [0, queue.length - 1] : [],
      pointers: queue.length > 0 ? { FRONT: 0, REAR: queue.length - 1 } : {},
      codeLine: 1,
      narration: `• Queue Ready (FIFO - ${queueType === 'circular' ? 'Circular Ring Buffer' : 'Linear Conduit'}). Length: ${queue.length} / ${QUEUE_MAX_CAPACITY}.`,
      queueType,
      stats: { comparisons: 0, swaps: 0 }
    }));
  }

  return { frames, updatedQueue: queue };
}
