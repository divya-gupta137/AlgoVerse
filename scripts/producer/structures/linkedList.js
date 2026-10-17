/**
 * AlgoVerse — Linked List Frame Producer (Singly, Doubly, and Circular Linked Lists)
 * Comprehensive frame snapshots for:
 * - Insert: Head (Prepend), Tail (Append), At Index
 * - Delete: Head, Tail, At Index, By Value
 * - Explore: Search, Traverse Forward, Reverse List
 * - Architectural Variations: Singly Linked, Doubly Linked, Circular Linked
 * - Management: Random Generation, Clear List
 */

import { createFrame } from '../../core/frame.js';

export function createHexAddr() {
  return '0x' + Math.floor(Math.random() * 0x8FFF + 0x1000).toString(16).toUpperCase();
}

/**
 * Synchronizes prevAddress and nextAddress across all nodes according to listType
 */
export function syncPointers(list, listType = 'singly') {
  for (let i = 0; i < list.length; i++) {
    // Previous pointer
    if (listType === 'doubly') {
      list[i].prevAddress = i > 0 ? list[i - 1].address : null;
    } else if (listType === 'circular') {
      list[i].prevAddress = i > 0 ? list[i - 1].address : (list.length > 0 ? list[list.length - 1].address : null);
    } else {
      list[i].prevAddress = i > 0 ? list[i - 1].address : null;
    }

    // Next pointer
    if (i < list.length - 1) {
      list[i].nextAddress = list[i + 1].address;
    } else {
      list[i].nextAddress = (listType === 'circular' && list.length > 0) ? list[0].address : null;
    }
  }
  return list;
}

/**
 * Generates default starter linked list nodes matching standard UI screenshots
 */
export function createInitialLinkedList(listType = 'singly') {
  if (listType === 'doubly') {
    return [
      { id: 'node-1', data: 10, address: '0x18E3E4', prevAddress: null, nextAddress: '0x18E459' },
      { id: 'node-2', data: 20, address: '0x18E459', prevAddress: '0x18E3E4', nextAddress: '0x18E4CD' },
      { id: 'node-3', data: 30, address: '0x18E4CD', prevAddress: '0x18E459', nextAddress: null }
    ];
  }

  if (listType === 'circular') {
    return [
      { id: 'node-1', data: 10, address: '0x18E3E4', prevAddress: '0x18E4CD', nextAddress: '0x18E459' },
      { id: 'node-2', data: 20, address: '0x18E459', prevAddress: '0x18E3E4', nextAddress: '0x18E4CD' },
      { id: 'node-3', data: 30, address: '0x18E4CD', prevAddress: '0x18E459', nextAddress: '0x18E3E4' }
    ];
  }

  // Default: Singly Linked
  return [
    { id: 'node-1', data: 45, address: '0x1A4F', prevAddress: null, nextAddress: '0x2B9E' },
    { id: 'node-2', data: 18, address: '0x2B9E', prevAddress: '0x1A4F', nextAddress: '0x3C8D' },
    { id: 'node-3', data: 85, address: '0x3C8D', prevAddress: '0x2B9E', nextAddress: '0x4D7E' },
    { id: 'node-4', data: 32, address: '0x4D7E', prevAddress: '0x3C8D', nextAddress: null }
  ];
}

/**
 * Generates random linked list with 3 to 5 nodes
 */
export function createRandomLinkedList(count = 4, listType = 'singly') {
  const nodes = [];
  const addrs = Array.from({ length: count }, () => createHexAddr());
  const randVals = [10, 20, 30, 42, 55, 68, 77, 89, 94];

  for (let i = 0; i < count; i++) {
    const val = randVals[Math.floor(Math.random() * randVals.length)] + (i * 3);
    nodes.push({
      id: `node-${Date.now()}-${i}`,
      data: val,
      address: addrs[i],
      prevAddress: i > 0 ? addrs[i - 1] : null,
      nextAddress: i < count - 1 ? addrs[i + 1] : null
    });
  }
  return syncPointers(nodes, listType);
}

/**
 * Produces frame snapshots for Linked List operations
 */
export function generateLinkedListFrames(currentList = [], actionType = 'init', value = null, target = null, index = null, listType = 'singly') {
  const frames = [];
  let list = structuredClone(currentList.length ? currentList : createInitialLinkedList(listType));
  syncPointers(list, listType);

  const typeLabel = listType === 'doubly' ? 'Doubly Linked List' : (listType === 'circular' ? 'Circular Linked List' : 'Singly Linked List');

  if (actionType === 'init' || actionType === 'change-type') {
    const tailNext = list.length ? (list[list.length - 1].nextAddress || 'NULL') : 'NULL';
    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      listType,
      codeLine: 1,
      narration: `${typeLabel} active with ${list.length} dynamically allocated nodes. Tail next: ${tailNext}.`,
      stats: { length: list.length, headVal: list[0]?.data ?? null, headAddr: list[0]?.address ?? null, listType }
    }));
    return { frames, updatedList: list };
  }

  if (actionType === 'clear') {
    frames.push(createFrame({
      op: 'linked-list',
      data: [],
      listType,
      codeLine: 1,
      narration: `All node references severed. Garbage Collector reclaims heap memory. ${typeLabel} is empty.`,
      stats: { length: 0, headVal: null, headAddr: null, listType }
    }));
    return { frames, updatedList: [] };
  }

  if (actionType === 'random') {
    list = createRandomLinkedList(Math.floor(Math.random() * 2) + 3, listType);
    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      listType,
      codeLine: 1,
      narration: `Generated fresh randomized ${typeLabel.toLowerCase()} with ${list.length} heap nodes.`,
      stats: { length: list.length, headVal: list[0]?.data ?? null, headAddr: list[0]?.address ?? null, listType }
    }));
    return { frames, updatedList: list };
  }

  // --- INSERT HEAD (Prepend) ---
  if (actionType === 'insert-head') {
    const valNum = Number(value) !== 0 && !isNaN(Number(value)) ? Number(value) : (listType === 'doubly' ? 5 : 99);
    const newAddr = createHexAddr();
    const oldHeadAddr = list.length ? list[0].address : null;

    const newNode = {
      id: `node-${Date.now()}`,
      data: valNum,
      address: newAddr,
      prevAddress: null,
      nextAddress: oldHeadAddr,
      isAllocating: true
    };

    // Frame 1: Heap allocation
    frames.push(createFrame({
      op: 'linked-list',
      data: [newNode, ...structuredClone(list)],
      listType,
      pointers: [0],
      codeLine: 3,
      narration: `[Step 1] Heap Allocated new Node(${valNum}) at memory address ${newAddr}.`,
      stats: { length: list.length + 1, op: 'Prepend', complexity: 'O(1)', listType }
    }));

    // Frame 2: Link next pointer and update head
    delete newNode.isAllocating;
    list.unshift(newNode);
    syncPointers(list, listType);

    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      listType,
      pointers: [0],
      codeLine: 4,
      narration: `[Step 2] Linked newNode.next -> ${list[1] ? list[1].address : 'NULL'}. Updated HEAD pointer! Completed in O(1).`,
      stats: { length: list.length, op: 'Prepend', complexity: 'O(1)', listType }
    }));

    return { frames, updatedList: list };
  }

  // --- INSERT TAIL (Append) ---
  if (actionType === 'insert-tail') {
    const valNum = Number(value) !== 0 && !isNaN(Number(value)) ? Number(value) : (listType === 'doubly' ? 40 : 77);
    const newAddr = createHexAddr();

    if (list.length === 0) {
      return generateLinkedListFrames([], 'insert-head', valNum, null, null, listType);
    }

    // Traversal frames: Walk from head to tail
    for (let i = 0; i < list.length; i++) {
      frames.push(createFrame({
        op: 'linked-list',
        data: list.map((item, idx) => ({
          ...item,
          isTraversing: idx === i,
          pointerRole: idx === i ? 'CURR' : null
        })),
        listType,
        pointers: [i],
        codeLine: 8,
        narration: `[Step 1] Traversing node #${i} (Val: ${list[i].data}, Addr: ${list[i].address}) seeking tail...`,
        stats: { length: list.length, op: 'Append', complexity: listType === 'doubly' ? 'O(1)*' : 'O(N)', listType }
      }));
    }

    // Frame: Allocate and attach
    const newNode = {
      id: `node-${Date.now()}`,
      data: valNum,
      address: newAddr,
      prevAddress: list[list.length - 1].address,
      nextAddress: listType === 'circular' ? list[0].address : null,
      isAllocating: true
    };

    list.push(newNode);
    syncPointers(list, listType);

    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      listType,
      pointers: [list.length - 1],
      codeLine: 9,
      narration: `[Step 2] Appended Node(${valNum}) at TAIL. Rewired pointers: oldTail.next -> ${newAddr}${listType === 'circular' ? ' and tail.next -> HEAD' : ''}.`,
      stats: { length: list.length, op: 'Append', complexity: 'O(N)', listType }
    }));

    delete list[list.length - 1].isAllocating;
    return { frames, updatedList: list };
  }

  // --- INSERT AT INDEX ---
  if (actionType === 'insert-index') {
    const valNum = Number(value) !== 0 && !isNaN(Number(value)) ? Number(value) : 25;
    const targetIdx = Math.max(0, Math.min(Number(index) || 0, list.length));

    if (targetIdx === 0) {
      return generateLinkedListFrames(list, 'insert-head', valNum, null, null, listType);
    }
    if (targetIdx >= list.length) {
      return generateLinkedListFrames(list, 'insert-tail', valNum, null, null, listType);
    }

    // Traverse to targetIdx - 1
    for (let i = 0; i < targetIdx; i++) {
      frames.push(createFrame({
        op: 'linked-list',
        data: list.map((item, idx) => ({
          ...item,
          isTraversing: idx === i,
          pointerRole: idx === i ? (i === targetIdx - 1 ? 'PREV' : 'CURR') : null
        })),
        listType,
        pointers: [i],
        codeLine: 13,
        narration: `[Step 1] Traversing to insertion index ${targetIdx}: At node #${i} (Addr: ${list[i].address})...`,
        stats: { length: list.length, op: 'Insert At Index', complexity: 'O(N)', listType }
      }));
    }

    const newAddr = createHexAddr();
    const newNode = {
      id: `node-${Date.now()}`,
      data: valNum,
      address: newAddr,
      prevAddress: list[targetIdx - 1].address,
      nextAddress: list[targetIdx].address,
      isAllocating: true
    };

    list.splice(targetIdx, 0, newNode);
    syncPointers(list, listType);

    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      listType,
      pointers: [targetIdx],
      codeLine: 14,
      narration: `[Step 2] Inserted Node(${valNum}) at index #${targetIdx}. Rewired links: prev.next -> ${newAddr} and newNode.next -> ${list[targetIdx + 1]?.address || 'NULL'}.`,
      stats: { length: list.length, op: 'Insert At Index', complexity: 'O(N)', listType }
    }));

    delete list[targetIdx].isAllocating;
    return { frames, updatedList: list };
  }

  // --- DELETE HEAD ---
  if (actionType === 'delete-head') {
    if (list.length === 0) {
      frames.push(createFrame({
        op: 'linked-list',
        data: [],
        listType,
        codeLine: 17,
        narration: `Underflow Exception: Cannot remove from an empty ${typeLabel}!`,
        stats: { length: 0, op: 'Delete Head', complexity: 'O(1)', listType }
      }));
      return { frames, updatedList: list };
    }

    const removed = list[0];
    frames.push(createFrame({
      op: 'linked-list',
      data: list.map((item, idx) => ({
        ...item,
        isDeleting: idx === 0,
        pointerRole: idx === 0 ? 'HEAD' : null
      })),
      listType,
      pointers: [0],
      codeLine: 18,
      narration: `[Step 1] Locating current HEAD node (${removed.data} @ ${removed.address}) to detach...`,
      stats: { length: list.length, op: 'Delete Head', complexity: 'O(1)', listType }
    }));

    list.shift();
    syncPointers(list, listType);

    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      listType,
      pointers: list.length > 0 ? [0] : [],
      codeLine: 19,
      narration: `[Step 2] Advanced HEAD = head.next (${list[0] ? list[0].address : 'NULL'}). Detached node freed in O(1).`,
      stats: { length: list.length, op: 'Delete Head', complexity: 'O(1)', listType }
    }));

    return { frames, updatedList: list };
  }

  // --- DELETE AT INDEX ---
  if (actionType === 'delete-index') {
    if (list.length === 0) {
      frames.push(createFrame({
        op: 'linked-list',
        data: [],
        listType,
        codeLine: 21,
        narration: `Underflow: Cannot delete from an empty ${typeLabel}!`,
        stats: { length: 0, op: 'Delete At Index', complexity: 'O(1)', listType }
      }));
      return { frames, updatedList: list };
    }

    const targetIdx = Math.max(0, Math.min(Number(index) || 0, list.length - 1));
    if (targetIdx === 0) {
      return generateLinkedListFrames(list, 'delete-head', null, null, null, listType);
    }

    // Traversal to targetIdx - 1
    for (let i = 0; i < targetIdx; i++) {
      frames.push(createFrame({
        op: 'linked-list',
        data: list.map((item, idx) => ({
          ...item,
          isTraversing: idx === i,
          pointerRole: idx === i ? (i === targetIdx - 1 ? 'PREV' : 'CURR') : null
        })),
        listType,
        pointers: [i],
        codeLine: 22,
        narration: `[Step 1] Traversing to index #${targetIdx}: Pointer at node #${i} (Addr: ${list[i].address})...`,
        stats: { length: list.length, op: 'Delete At Index', complexity: 'O(N)', listType }
      }));
    }

    // Highlight target
    frames.push(createFrame({
      op: 'linked-list',
      data: list.map((item, idx) => ({
        ...item,
        isDeleting: idx === targetIdx,
        pointerRole: idx === targetIdx - 1 ? 'PREV' : (idx === targetIdx ? 'TARGET' : null)
      })),
      listType,
      pointers: [targetIdx - 1, targetIdx],
      codeLine: 23,
      narration: `[Step 2] Bypassing target node #${targetIdx} (Val: ${list[targetIdx].data}). Re-linking pointers.`,
      stats: { length: list.length, op: 'Delete At Index', complexity: 'O(N)', listType }
    }));

    list.splice(targetIdx, 1);
    syncPointers(list, listType);

    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      listType,
      pointers: [Math.min(targetIdx - 1, list.length - 1)],
      codeLine: 24,
      narration: `[Step 3] Node successfully unlinked! Pointers synchronized for ${typeLabel}.`,
      stats: { length: list.length, op: 'Delete At Index', complexity: 'O(N)', listType }
    }));

    return { frames, updatedList: list };
  }

  // --- DELETE BY VALUE ---
  if (actionType === 'delete-val') {
    const searchVal = Number(value) !== 0 && !isNaN(Number(value)) ? Number(value) : (listType === 'doubly' ? 20 : 18);
    if (list.length === 0) {
      frames.push(createFrame({
        op: 'linked-list',
        data: [],
        listType,
        codeLine: 21,
        narration: `List is empty! Nothing to delete.`,
        stats: { length: 0, op: 'Delete Value', complexity: 'O(1)', listType }
      }));
      return { frames, updatedList: list };
    }

    if (list[0].data === searchVal) {
      return generateLinkedListFrames(list, 'delete-head', null, null, null, listType);
    }

    let foundIdx = -1;
    for (let i = 0; i < list.length; i++) {
      const match = list[i].data === searchVal;
      frames.push(createFrame({
        op: 'linked-list',
        data: list.map((item, idx) => ({
          ...item,
          isTraversing: idx === i,
          isFound: match && idx === i,
          pointerRole: idx === i ? 'CURR' : null
        })),
        listType,
        pointers: [i],
        codeLine: 22,
        narration: match 
          ? `MATCH FOUND! Target node #${i} has data=${searchVal}. Preparing deletion rewire...`
          : `Inspecting node #${i} (Data: ${list[i].data}) ≠ ${searchVal}...`,
        stats: { length: list.length, op: 'Delete Value', complexity: 'O(N)', listType }
      }));

      if (match) {
        foundIdx = i;
        break;
      }
    }

    if (foundIdx === -1) {
      frames.push(createFrame({
        op: 'linked-list',
        data: structuredClone(list),
        listType,
        codeLine: 25,
        narration: `Value ${searchVal} not found in ${typeLabel}. No nodes removed.`,
        stats: { length: list.length, op: 'Delete Value', complexity: 'O(N)', listType }
      }));
      return { frames, updatedList: list };
    }

    list.splice(foundIdx, 1);
    syncPointers(list, listType);

    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      listType,
      pointers: [foundIdx - 1],
      codeLine: 24,
      narration: `Detached node containing value ${searchVal}. Pointers rewired seamlessly.`,
      stats: { length: list.length, op: 'Delete Value', complexity: 'O(N)', listType }
    }));

    return { frames, updatedList: list };
  }

  // --- SEARCH VALUE ---
  if (actionType === 'search') {
    const searchVal = target !== null && !isNaN(Number(target)) ? Number(target) : (listType === 'doubly' ? 20 : 18);
    let foundIndex = -1;

    for (let i = 0; i < list.length; i++) {
      const isMatch = list[i].data === searchVal;

      frames.push(createFrame({
        op: 'linked-list',
        data: list.map((item, idx) => ({
          ...item,
          isSearching: idx === i,
          isFound: isMatch && idx === i,
          pointerRole: idx === i ? 'CURR' : null
        })),
        listType,
        pointers: [i],
        codeLine: 27,
        narration: isMatch
          ? `MATCH FOUND! Target ${searchVal} discovered at node #${i} (Addr: ${list[i].address})!`
          : `Comparing node #${i} payload (${list[i].data}) with target ${searchVal}...`,
        stats: { length: list.length, op: 'Search', complexity: 'O(N)', listType }
      }));

      if (isMatch) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex === -1) {
      frames.push(createFrame({
        op: 'linked-list',
        data: structuredClone(list),
        listType,
        codeLine: 28,
        narration: `Search Completed: Target ${searchVal} was not found in the list (reached end).`,
        stats: { length: list.length, op: 'Search', complexity: 'O(N)', listType }
      }));
    }

    return { frames, updatedList: list };
  }

  // --- TRAVERSE FORWARD ---
  if (actionType === 'traverse') {
    const visited = [];

    for (let i = 0; i < list.length; i++) {
      visited.push(list[i].data);
      frames.push(createFrame({
        op: 'linked-list',
        data: list.map((item, idx) => ({
          ...item,
          isTraversing: idx === i,
          pointerRole: idx === i ? 'CURR' : null
        })),
        listType,
        pointers: [i],
        visited: [...visited],
        codeLine: 8,
        narration: `Visiting node #${i} (Data: ${list[i].data}, Next -> ${list[i].nextAddress || 'NULL'}). Path: [${visited.join(listType === 'doubly' ? ' ↔ ' : ' → ')}]`,
        stats: { length: list.length, op: 'Traverse', complexity: 'O(N)', listType }
      }));
    }

    if (listType === 'circular' && list.length > 0) {
      frames.push(createFrame({
        op: 'linked-list',
        data: list.map((item, idx) => ({
          ...item,
          pointerRole: idx === 0 ? 'LOOP' : (idx === list.length - 1 ? 'TAIL' : null)
        })),
        listType,
        visited: [...visited],
        codeLine: 9,
        narration: `Tail next (${list[list.length - 1].nextAddress}) loops back to HEAD (${list[0].address})! Circular traversal verified.`,
        stats: { length: list.length, op: 'Traverse', complexity: 'O(N)', listType }
      }));
    } else {
      frames.push(createFrame({
        op: 'linked-list',
        data: structuredClone(list),
        listType,
        visited: [...visited],
        isAtEnd: true,
        codeLine: 9,
        narration: `Reached NULL! Traversal complete. Total visited nodes: ${visited.length} in O(N) sequential steps.`,
        stats: { length: list.length, op: 'Traverse', complexity: 'O(N)', listType }
      }));
    }

    return { frames, updatedList: list };
  }

  // --- REVERSE LIST ---
  if (actionType === 'reverse') {
    if (list.length <= 1) {
      frames.push(createFrame({
        op: 'linked-list',
        data: structuredClone(list),
        listType,
        codeLine: 31,
        narration: `List has ${list.length} element(s). Reversal is trivial (already reversed).`,
        stats: { length: list.length, op: 'Reverse', complexity: 'O(1)', listType }
      }));
      return { frames, updatedList: list };
    }

    // Step-by-step traversal reversal
    for (let i = 0; i < list.length; i++) {
      frames.push(createFrame({
        op: 'linked-list',
        data: list.map((item, idx) => ({
          ...item,
          isTraversing: idx === i,
          pointerRole: idx === i ? 'CURR' : (idx === i - 1 ? 'PREV' : (idx === i + 1 ? 'NEXT' : null))
        })),
        listType,
        pointers: [i],
        codeLine: 33,
        narration: listType === 'doubly'
          ? `[Reversing Node #${i}] Swapping prev (${list[i].prevAddress || 'NULL'}) and next (${list[i].nextAddress || 'NULL'}) pointers...`
          : `[Reversing Node #${i}] Flipping curr.next pointer from ${list[i].nextAddress || 'NULL'} to ${i === 0 ? 'NULL' : list[i - 1].address}...`,
        stats: { length: list.length, op: 'Reverse', complexity: 'O(N)', listType }
      }));
    }

    // Reverse array order and synchronize pointers
    const reversed = structuredClone(list).reverse();
    syncPointers(reversed, listType);

    frames.push(createFrame({
      op: 'linked-list',
      data: reversed,
      listType,
      pointers: [0],
      codeLine: 36,
      narration: `✓ Reversal Complete! New HEAD is ${reversed[0].data} (@ ${reversed[0].address}). Time: O(N), Space: O(1) in-place!`,
      stats: { length: reversed.length, op: 'Reverse', complexity: 'O(N)', listType }
    }));

    return { frames, updatedList: reversed };
  }

  return { frames, updatedList: list };
}
