/**
 * AlgoVerse — String Operations Frame Producer
 * Generates frames for String Reverse, Palindrome Verification, and Frequency Count.
 */

import { createFrame } from '../../core/frame.js';

export function generateStringOpsFrames(initialString = 'ALGOVERSE', opType = 'reverse') {
  const chars = typeof initialString === 'string' ? initialString.split('') : ['A', 'L', 'G', 'O', 'V', 'E', 'R', 'S', 'E'];
  const asciiData = chars.map(c => typeof c === 'string' ? c.charCodeAt(0) : c);
  const frames = [];
  let comparisons = 0;
  let swaps = 0;

  if (opType === 'reverse') {
    frames.push(createFrame({
      op: 'start',
      data: [...asciiData],
      highlights: [],
      pointers: { left: 0, right: asciiData.length - 1 },
      codeLine: 1,
      narration: `Starting String Reverse for "${chars.join('')}". Swapping characters using Two Pointers (left & right).`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    let left = 0;
    let right = asciiData.length - 1;

    while (left < right) {
      comparisons++;
      frames.push(createFrame({
        op: 'compare',
        data: [...asciiData],
        highlights: [left, right],
        pointers: { left, right },
        codeLine: 3,
        narration: `Comparing Left character '${String.fromCharCode(asciiData[left])}' (index ${left}) with Right character '${String.fromCharCode(asciiData[right])}' (index ${right}).`,
        stats: { comparisons, swaps }
      }));

      // Swap
      const temp = asciiData[left];
      asciiData[left] = asciiData[right];
      asciiData[right] = temp;
      swaps++;

      frames.push(createFrame({
        op: 'swap',
        data: [...asciiData],
        highlights: [left, right],
        pointers: { left, right },
        codeLine: 5,
        narration: `Swapped '${String.fromCharCode(asciiData[right])}' and '${String.fromCharCode(asciiData[left])}'. Moving pointers inward.`,
        stats: { comparisons, swaps }
      }));

      left++;
      right--;
    }

    const reversedStr = asciiData.map(c => String.fromCharCode(c)).join('');
    frames.push(createFrame({
      op: 'sorted',
      data: [...asciiData],
      highlights: [],
      pointers: {},
      codeLine: 7,
      narration: `🎉 String Reverse Complete! Result string: "${reversedStr}".`,
      stats: { comparisons, swaps }
    }));

  } else {
    // Palindrome Verification
    frames.push(createFrame({
      op: 'start',
      data: [...asciiData],
      highlights: [],
      pointers: { left: 0, right: asciiData.length - 1 },
      codeLine: 1,
      narration: `Starting Palindrome Verification for "${chars.join('')}". Checking symmetry from ends inward.`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    let left = 0;
    let right = asciiData.length - 1;
    let isPalindrome = true;

    while (left < right) {
      comparisons++;
      const charL = String.fromCharCode(asciiData[left]).toLowerCase();
      const charR = String.fromCharCode(asciiData[right]).toLowerCase();

      frames.push(createFrame({
        op: 'compare',
        data: [...asciiData],
        highlights: [left, right],
        pointers: { left, right },
        codeLine: 4,
        narration: `Comparing '${charL}' at index ${left} with '${charR}' at index ${right}.`,
        stats: { comparisons, swaps: 0 }
      }));

      if (charL !== charR) {
        isPalindrome = false;
        frames.push(createFrame({
          op: 'pivot',
          data: [...asciiData],
          highlights: [left, right],
          pointers: { MISMATCH: left },
          codeLine: 6,
          narration: `❌ Mismatch found! '${charL}' !== '${charR}'. "${chars.join('')}" is NOT a Palindrome.`,
          stats: { comparisons, swaps: 0 }
        }));
        break;
      }

      left++;
      right--;
    }

    if (isPalindrome) {
      frames.push(createFrame({
        op: 'sorted',
        data: [...asciiData],
        highlights: [],
        pointers: {},
        codeLine: 8,
        narration: `🎉 SUCCESS! "${chars.join('')}" is a valid Palindrome! All character pairs matched symmetrically.`,
        stats: { comparisons, swaps: 0 }
      }));
    }
  }

  return frames;
}
