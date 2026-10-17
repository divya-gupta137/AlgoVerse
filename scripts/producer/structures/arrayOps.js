/**
 * AlgoVerse — Array Operations Frame Producer
 * Generates frame snapshots for Push, Pop, Insert At Index, Remove At Index, Access, Reverse, and Search.
 */

import { createFrame } from '../../core/frame.js';

export function generateArrayOpsFrames(currentArray = [10, 25, 7, 42, 18], actionType = 'init', value = 99, index = 2) {
  const frames = [];
  let arr = structuredClone(currentArray.length ? currentArray : [10, 25, 7, 42, 18]);
  const valNum = Number(value) || 99;
  const idxNum = Number(index);

  if (actionType === 'init' || actionType === 'reset' || actionType === 'custom' || actionType === 'preset') {
    const label = actionType === 'custom' ? 'Custom array applied' : (actionType === 'preset' ? 'Predefined example loaded' : 'Array initialized');
    frames.push(createFrame({
      op: 'array-ops',
      data: structuredClone(arr),
      codeLine: 1,
      narration: `✓ ${label} with ${arr.length} contiguous elements.`
    }));
    return { frames, updatedArray: arr };
  }

  // 1. Instant O(1) Access
  if (actionType === 'access') {
    if (isNaN(idxNum) || idxNum < 0 || idxNum >= arr.length) {
      frames.push(createFrame({
        op: 'array-ops',
        data: structuredClone(arr),
        codeLine: 1,
        narration: `✗ Index Out of Bounds: Index [${index}] is invalid! Valid range is 0 to ${arr.length - 1}.`
      }));
      return { frames, updatedArray: arr };
    }

    const byteOffset = idxNum * 4;
    const hexOffset = (0x1000 + byteOffset).toString(16).toUpperCase();

    frames.push(createFrame({
      op: 'access',
      data: structuredClone(arr),
      highlights: [idxNum],
      pointers: { access: idxNum },
      codeLine: 1,
      narration: `✓ RAM Offset: 0x1000 + (${idxNum} × 4 bytes) = 0x${hexOffset}. Instant O(1) access to arr[${idxNum}] = ${arr[idxNum]}!`
    }));

    return { frames, updatedArray: arr };
  }

  // 2. Push to End (O(1))
  if (actionType === 'push') {
    frames.push(createFrame({
      op: 'array-ops',
      data: [...structuredClone(arr), valNum],
      highlights: [arr.length],
      codeLine: 2,
      narration: `• Appending ${valNum} to array end at index [${arr.length}]...`
    }));

    arr.push(valNum);

    frames.push(createFrame({
      op: 'push',
      data: structuredClone(arr),
      highlights: [arr.length - 1],
      codeLine: 3,
      narration: `✓ Push complete! Added ${valNum} at index [${arr.length - 1}]. Array size is now ${arr.length}.`
    }));

    return { frames, updatedArray: arr };
  }

  // 3. Pop from End (O(1))
  if (actionType === 'pop') {
    if (arr.length === 0) {
      frames.push(createFrame({
        op: 'array-ops',
        data: [],
        codeLine: 5,
        narration: `✗ Underflow Error: Cannot pop from an empty array!`
      }));
      return { frames, updatedArray: arr };
    }

    const popped = arr[arr.length - 1];
    frames.push(createFrame({
      op: 'pop',
      data: structuredClone(arr),
      highlights: [arr.length - 1],
      codeLine: 5,
      narration: `• Truncating last element ${popped} from index [${arr.length - 1}]...`
    }));

    arr.pop();

    frames.push(createFrame({
      op: 'array-ops',
      data: structuredClone(arr),
      codeLine: 6,
      narration: `✓ Pop complete! Removed element ${popped}. Array size is now ${arr.length}.`
    }));

    return { frames, updatedArray: arr };
  }

  // 4. Insert at Index (O(N) Shift Right)
  if (actionType === 'insert') {
    if (isNaN(idxNum) || idxNum < 0 || idxNum > arr.length) {
      frames.push(createFrame({
        op: 'array-ops',
        data: structuredClone(arr),
        codeLine: 8,
        narration: `✗ Index Out of Bounds: Index [${index}] is invalid! Valid insertion range is 0 to ${arr.length}.`
      }));
      return { frames, updatedArray: arr };
    }

    // Step 1: Shift elements right
    for (let i = arr.length; i > idxNum; i--) {
      frames.push(createFrame({
        op: 'insert',
        data: structuredClone(arr),
        highlights: [i - 1],
        pointers: { shift: i - 1 },
        codeLine: 8,
        narration: `• Shifting element ${arr[i - 1]} right to make space at index [${idxNum}]...`
      }));
    }

    arr.splice(idxNum, 0, valNum);

    frames.push(createFrame({
      op: 'insert',
      data: structuredClone(arr),
      highlights: [idxNum],
      pointers: { target: idxNum },
      codeLine: 9,
      narration: `✓ Insert complete! Inserted ${valNum} at index [${idxNum}]. Elements shifted right.`
    }));

    return { frames, updatedArray: arr };
  }

  // 5. Remove at Index (O(N) Shift Left)
  if (actionType === 'remove') {
    if (isNaN(idxNum) || idxNum < 0 || idxNum >= arr.length) {
      frames.push(createFrame({
        op: 'array-ops',
        data: structuredClone(arr),
        codeLine: 11,
        narration: `✗ Index Out of Bounds: Cannot remove at index [${index}]! Valid range is 0 to ${arr.length - 1}.`
      }));
      return { frames, updatedArray: arr };
    }

    const removedVal = arr[idxNum];
    frames.push(createFrame({
      op: 'remove',
      data: structuredClone(arr),
      highlights: [idxNum],
      codeLine: 11,
      narration: `• Removing element ${removedVal} from index [${idxNum}]...`
    }));

    // Shift elements left
    for (let i = idxNum; i < arr.length - 1; i++) {
      frames.push(createFrame({
        op: 'remove',
        data: structuredClone(arr),
        highlights: [i + 1],
        pointers: { shift: i + 1 },
        codeLine: 12,
        narration: `• Shifting element ${arr[i + 1]} left to index [${i}]...`
      }));
    }

    arr.splice(idxNum, 1);

    frames.push(createFrame({
      op: 'array-ops',
      data: structuredClone(arr),
      codeLine: 13,
      narration: `✓ Remove complete! Removed ${removedVal} from index [${idxNum}]. Remaining elements shifted left.`
    }));

    return { frames, updatedArray: arr };
  }

  // 6. Linear Search (O(N))
  if (actionType === 'search') {
    const searchTarget = Number(value);
    let foundIndex = -1;

    for (let i = 0; i < arr.length; i++) {
      const isMatch = arr[i] === searchTarget;

      frames.push(createFrame({
        op: isMatch ? 'found' : 'search',
        data: structuredClone(arr),
        highlights: [i],
        pointers: { scan: i },
        codeLine: 15,
        narration: isMatch 
          ? `✓ MATCH FOUND! Value ${searchTarget} found at index [${i}]!` 
          : `• Scanning index [${i}] (value ${arr[i]})... Comparing with ${searchTarget}.`
      }));

      if (isMatch) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex === -1) {
      frames.push(createFrame({
        op: 'array-ops',
        data: structuredClone(arr),
        codeLine: 17,
        narration: `✗ Search Failed: Value ${searchTarget} was not found in the array.`
      }));
    }

    return { frames, updatedArray: arr };
  }

  // 7. In-Place Two-Pointer Reverse (O(N))
  if (actionType === 'reverse') {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      frames.push(createFrame({
        op: 'reverse',
        data: structuredClone(arr),
        highlights: [left, right],
        pointers: { left, right },
        codeLine: 18,
        narration: `• Two-Pointer Reverse: Swapping arr[${left}] (${arr[left]}) with arr[${right}] (${arr[right]})...`
      }));

      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;

      left++;
      right--;
    }

    frames.push(createFrame({
      op: 'array-ops',
      data: structuredClone(arr),
      codeLine: 19,
      narration: `✓ Array In-Place Reverse complete! Two pointers met at center.`
    }));

    return { frames, updatedArray: arr };
  }

  return { frames, updatedArray: arr };
}
