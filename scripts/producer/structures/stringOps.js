/**
 * AlgoVerse — String Operations Frame Producer
 * Default string: "algoverse" (as requested)
 * Operations:
 * - Two-Pointer Reversal
 * - Palindrome Verification
 * - Substring / Pattern Search
 * - Character Frequency Count
 * - Case Transformation (Upper / Lower)
 */

import { createFrame } from '../../core/frame.js';

export function generateStringOpsFrames(initialString = 'algoverse', opType = 'init', param = '') {
  let str = (typeof initialString === 'string' && initialString.length > 0) ? initialString : 'algoverse';
  const frames = [];
  let comparisons = 0;
  let swaps = 0;

  const chars = str.split('');
  const asciiData = chars.map(c => c.charCodeAt(0));

  if (opType === 'init') {
    frames.push(createFrame({
      op: 'sorted',
      data: [...asciiData],
      rawString: str,
      highlights: [],
      pointers: { START: 0, END: chars.length - 1 },
      codeLine: 1,
      narration: `• String Initialized: "${str}" (Length: ${str.length}). Each tile displays its character glyph, 0-based index, and ASCII byte code.`,
      stats: { comparisons: 0, swaps: 0 }
    }));
    return { frames, updatedString: str };
  }

  if (opType === 'reverse') {
    frames.push(createFrame({
      op: 'start',
      data: [...asciiData],
      rawString: str,
      highlights: [],
      pointers: { LEFT: 0, RIGHT: asciiData.length - 1 },
      codeLine: 1,
      narration: `1. Two-Pointer Reverse: Initializing LEFT pointer at index [0] and RIGHT pointer at index [${asciiData.length - 1}].`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    let left = 0;
    let right = asciiData.length - 1;

    while (left < right) {
      comparisons++;
      frames.push(createFrame({
        op: 'compare',
        data: [...asciiData],
        rawString: asciiData.map(c => String.fromCharCode(c)).join(''),
        highlights: [left, right],
        pointers: { LEFT: left, RIGHT: right },
        codeLine: 3,
        narration: `Comparing Left character '${String.fromCharCode(asciiData[left])}' [${left}] with Right character '${String.fromCharCode(asciiData[right])}' [${right}].`,
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
        rawString: asciiData.map(c => String.fromCharCode(c)).join(''),
        highlights: [left, right],
        pointers: { LEFT: left, RIGHT: right },
        codeLine: 5,
        narration: `Swapped characters between index [${left}] and [${right}]. Advancing LEFT++ and decrementing RIGHT--.`,
        stats: { comparisons, swaps }
      }));

      left++;
      right--;
    }

    const reversedStr = asciiData.map(c => String.fromCharCode(c)).join('');
    frames.push(createFrame({
      op: 'sorted',
      data: [...asciiData],
      rawString: reversedStr,
      highlights: [],
      pointers: {},
      codeLine: 7,
      narration: `✓ String Reversal Complete! Result: "${reversedStr}". Time: O(N/2) = O(N), Space: O(1) in-place.`,
      stats: { comparisons, swaps }
    }));

    return { frames, updatedString: reversedStr };
  }

  if (opType === 'palindrome') {
    frames.push(createFrame({
      op: 'start',
      data: [...asciiData],
      rawString: str,
      highlights: [],
      pointers: { LEFT: 0, RIGHT: asciiData.length - 1 },
      codeLine: 1,
      narration: `1. Palindrome Verification: Testing symmetry for "${str}" from both ends inward.`,
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
        rawString: str,
        highlights: [left, right],
        pointers: { LEFT: left, RIGHT: right },
        codeLine: 4,
        narration: `Checking symmetry: '${charL}' at [${left}] vs '${charR}' at [${right}].`,
        stats: { comparisons, swaps: 0 }
      }));

      if (charL !== charR) {
        isPalindrome = false;
        frames.push(createFrame({
          op: 'pivot',
          data: [...asciiData],
          rawString: str,
          highlights: [left, right],
          pointers: { MISMATCH: left },
          codeLine: 6,
          narration: `✗ Mismatch found: '${charL}' !== '${charR}'! "${str}" is NOT a Palindrome.`,
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
        rawString: str,
        highlights: [],
        pointers: {},
        codeLine: 8,
        narration: `✓ SUCCESS: "${str}" is a valid Palindrome! All character pairs matched symmetrically.`,
        stats: { comparisons, swaps: 0 }
      }));
    }

    return { frames, updatedString: str };
  }

  if (opType === 'search') {
    const pattern = (typeof param === 'string' && param.trim().length > 0) ? param.trim() : 'ver';
    frames.push(createFrame({
      op: 'start',
      data: [...asciiData],
      rawString: str,
      highlights: [],
      pointers: {},
      codeLine: 1,
      narration: `1. Substring Search: Scanning for pattern "${pattern}" in text "${str}".`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    let foundIdx = -1;
    for (let i = 0; i <= str.length - pattern.length; i++) {
      comparisons++;
      const windowStr = str.substring(i, i + pattern.length);
      const windowIndices = Array.from({ length: pattern.length }, (_, k) => i + k);

      frames.push(createFrame({
        op: 'compare',
        data: [...asciiData],
        rawString: str,
        highlights: windowIndices,
        pointers: { SCAN: i },
        codeLine: 3,
        narration: `Sliding window at [${i}...${i + pattern.length - 1}]: "${windowStr}" === "${pattern}"?`,
        stats: { comparisons, swaps: 0 }
      }));

      if (windowStr.toLowerCase() === pattern.toLowerCase()) {
        foundIdx = i;
        frames.push(createFrame({
          op: 'sorted',
          data: [...asciiData],
          rawString: str,
          highlights: windowIndices,
          pointers: { MATCH: i },
          codeLine: 5,
          narration: `✓ MATCH FOUND! Pattern "${pattern}" matches at index [${i}].`,
          stats: { comparisons, swaps: 0 }
        }));
        break;
      }
    }

    if (foundIdx === -1) {
      frames.push(createFrame({
        op: 'pivot',
        data: [...asciiData],
        rawString: str,
        highlights: [],
        pointers: {},
        codeLine: 6,
        narration: `✗ Pattern "${pattern}" not found in string "${str}". Returns -1.`,
        stats: { comparisons, swaps: 0 }
      }));
    }

    return { frames, updatedString: str };
  }

  if (opType === 'frequency') {
    const freq = {};
    for (const c of str) {
      const lower = c.toLowerCase();
      freq[lower] = (freq[lower] || 0) + 1;
    }

    frames.push(createFrame({
      op: 'sorted',
      data: [...asciiData],
      rawString: str,
      frequencyMap: freq,
      highlights: Array.from({ length: str.length }, (_, i) => i),
      pointers: {},
      codeLine: 1,
      narration: `✓ Computed Character Frequency for "${str}". Top frequencies displayed in breakdown bar.`,
      stats: { comparisons: str.length, swaps: 0 }
    }));

    return { frames, updatedString: str };
  }

  if (opType === 'uppercase' || opType === 'lowercase') {
    const transformed = opType === 'uppercase' ? str.toUpperCase() : str.toLowerCase();
    const newAscii = transformed.split('').map(c => c.charCodeAt(0));

    frames.push(createFrame({
      op: 'sorted',
      data: newAscii,
      rawString: transformed,
      highlights: Array.from({ length: transformed.length }, (_, i) => i),
      pointers: {},
      codeLine: 1,
      narration: `✓ Transformed string to ${opType.toUpperCase()}: "${transformed}".`,
      stats: { comparisons: 0, swaps: 0 }
    }));

    return { frames, updatedString: transformed };
  }

  return { frames, updatedString: str };
}
