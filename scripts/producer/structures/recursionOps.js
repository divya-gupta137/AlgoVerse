/**
 * AlgoVerse — Recursion Call Stack & Tree Frame Producer
 * Generates frame snapshots for Factorial (Linear Stack) and Fibonacci (Binary Recursion Tree).
 */

import { createFrame } from '../../core/frame.js';

/**
 * Generates frame snapshots for Factorial Recursion
 */
export function generateFactorialFrames(nVal = 4) {
  const frames = [];
  const n = Math.max(1, Math.min(Number(nVal) || 4, 6)); // Clamp 1 to 6 for clean visual rendering
  const stack = [];

  // Frame 0: Initializer
  frames.push(createFrame({
    op: 'recursion',
    data: { callStack: [], treeNodes: [], type: 'factorial' },
    codeLine: 1,
    narration: `Starting Factorial recursion trace for n = ${n}.`
  }));

  // Recursive Helper to record frames
  function calcFactorial(currentN) {
    const frameId = `fact-${currentN}`;
    const frameObj = {
      id: frameId,
      funcName: `factorial(${currentN})`,
      paramN: currentN,
      status: 'active',
      returnVal: null
    };

    stack.push(frameObj);

    if (currentN <= 1) {
      frameObj.status = 'base';
      frameObj.returnVal = 1;

      frames.push(createFrame({
        op: 'recursion',
        data: { callStack: structuredClone(stack), type: 'factorial' },
        pointers: [stack.length - 1],
        codeLine: 2,
        narration: `Base Case Reached! factorial(1) returns 1.`
      }));

      stack.pop();
      return 1;
    }

    // Push Call Frame
    frames.push(createFrame({
      op: 'recursion',
      data: { callStack: structuredClone(stack), type: 'factorial' },
      pointers: [stack.length - 1],
      codeLine: 3,
      narration: `Pushing call frame factorial(${currentN}) onto Call Stack. Calling factorial(${currentN - 1})...`
    }));

    const subResult = calcFactorial(currentN - 1);
    const result = currentN * subResult;

    // Pop Call Frame with Return Value
    frameObj.status = 'returning';
    frameObj.returnVal = result;

    frames.push(createFrame({
      op: 'recursion',
      data: { callStack: structuredClone(stack), type: 'factorial' },
      pointers: [stack.length - 1],
      codeLine: 4,
      narration: `Unwinding Stack: factorial(${currentN}) = ${currentN} * ${subResult} = ${result}. Popping frame!`
    }));

    stack.pop();
    return result;
  }

  calcFactorial(n);

  return frames;
}

/**
 * Generates frame snapshots for Fibonacci Binary Recursion Tree
 */
export function generateFibonacciFrames(nVal = 4) {
  const frames = [];
  const n = Math.max(1, Math.min(Number(nVal) || 4, 5)); // Clamp 1 to 5 for tree layout
  const treeNodes = [];
  const stack = [];
  let nodeIdCounter = 0;

  // Frame 0: Initializer
  frames.push(createFrame({
    op: 'recursion',
    data: { callStack: [], treeNodes: [], type: 'fibonacci' },
    codeLine: 1,
    narration: `Starting Fibonacci binary recursion tree trace for n = ${n}.`
  }));

  function calcFib(currentN, parentId = null) {
    const nodeId = `node-${++nodeIdCounter}`;
    const nodeObj = {
      id: nodeId,
      label: `fib(${currentN})`,
      n: currentN,
      parentId,
      status: 'active',
      returnVal: null
    };

    treeNodes.push(nodeObj);
    stack.push({ funcName: `fib(${currentN})`, n: currentN });

    frames.push(createFrame({
      op: 'recursion',
      data: { callStack: structuredClone(stack), treeNodes: structuredClone(treeNodes), type: 'fibonacci' },
      pointers: [treeNodes.length - 1],
      codeLine: 2,
      narration: `Invoking fib(${currentN}). Pushed frame onto Call Stack.`
    }));

    if (currentN <= 1) {
      nodeObj.status = 'base';
      nodeObj.returnVal = currentN;

      frames.push(createFrame({
        op: 'recursion',
        data: { callStack: structuredClone(stack), treeNodes: structuredClone(treeNodes), type: 'fibonacci' },
        pointers: [treeNodes.length - 1],
        codeLine: 3,
        narration: `Base Case Reached! fib(${currentN}) returns ${currentN}.`
      }));

      stack.pop();
      return currentN;
    }

    const leftVal = calcFib(currentN - 1, nodeId);
    const rightVal = calcFib(currentN - 2, nodeId);
    const total = leftVal + rightVal;

    nodeObj.status = 'returning';
    nodeObj.returnVal = total;

    frames.push(createFrame({
      op: 'recursion',
      data: { callStack: structuredClone(stack), treeNodes: structuredClone(treeNodes), type: 'fibonacci' },
      pointers: [treeNodes.length - 1],
      codeLine: 4,
      narration: `Combining sub-problems: fib(${currentN}) = fib(${currentN - 1}) + fib(${currentN - 2}) = ${leftVal} + ${rightVal} = ${total}.`
    }));

    stack.pop();
    return total;
  }

  calcFib(n);

  return frames;
}
