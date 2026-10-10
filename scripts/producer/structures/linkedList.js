/**
 * AlgoVerse — Singly Linked List Frame Producer
 * Generates visualization frame snapshots for Head/Tail Insertion, Head Deletion, and Node Search.
 */

import { createFrame } from '../../core/frame.js';

function createHexAddr() {
  return '0x' + Math.floor(Math.random() * 0xFFF + 0x100).toString(16).toUpperCase();
}

/**
 * Generates default starter linked list nodes
 */
export function createInitialLinkedList() {
  return [
    { id: 'node-1', data: 45, address: '0x1A4F', nextAddress: '0x2B9E' },
    { id: 'node-2', data: 18, address: '0x2B9E', nextAddress: '0x3C8D' },
    { id: 'node-3', data: 85, address: '0x3C8D', nextAddress: '0x4D7E' },
    { id: 'node-4', data: 32, address: '0x4D7E', nextAddress: null }
  ];
}

/**
 * Produces frame snapshots for Linked List operations
 */
export function generateLinkedListFrames(currentList = [], actionType = 'init', value = null, target = null) {
  const frames = [];
  let list = structuredClone(currentList.length ? currentList : createInitialLinkedList());

  if (actionType === 'init') {
    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      codeLine: 1,
      narration: `Singly Linked List initialized with ${list.length} pointer nodes.`
    }));
    return { frames, updatedList: list };
  }

  if (actionType === 'insert-head') {
    const valNum = Number(value) || 99;
    const newAddr = createHexAddr();
    const oldHeadAddr = list.length ? list[0].address : null;

    const newNode = {
      id: `node-${Date.now()}`,
      data: valNum,
      address: newAddr,
      nextAddress: oldHeadAddr,
      isNew: true
    };

    // Frame 1: Highlight creation of new isolated node
    frames.push(createFrame({
      op: 'linked-list',
      data: [newNode, ...structuredClone(list)],
      pointers: [0],
      codeLine: 2,
      narration: `Allocated new node with data=${valNum} at memory address ${newAddr}.`
    }));

    // Frame 2: Link new node to previous head
    list.unshift(newNode);
    if (list.length > 1) {
      list[0].nextAddress = list[1].address;
    }

    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      pointers: [0],
      codeLine: 3,
      narration: `Set newNode.next -> ${list[1] ? list[1].address : 'NULL'}. Updated HEAD pointer!`
    }));

    delete list[0].isNew;
    return { frames, updatedList: list };
  }

  if (actionType === 'insert-tail') {
    const valNum = Number(value) || 77;
    const newAddr = createHexAddr();
    const newNode = {
      id: `node-${Date.now()}`,
      data: valNum,
      address: newAddr,
      nextAddress: null,
      isNew: true
    };

    // Frame 1: Traverse to current tail
    for (let i = 0; i < list.length; i++) {
      frames.push(createFrame({
        op: 'linked-list',
        data: structuredClone(list),
        pointers: [i],
        codeLine: 6,
        narration: `Traversing list node #${i + 1} (Addr: ${list[i].address})...`
      }));
    }

    // Frame 2: Attach to tail
    if (list.length > 0) {
      list[list.length - 1].nextAddress = newAddr;
    }
    list.push(newNode);

    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      pointers: [list.length - 1],
      codeLine: 7,
      narration: `Appended new node data=${valNum} (Addr: ${newAddr}) at TAIL!`
    }));

    delete list[list.length - 1].isNew;
    return { frames, updatedList: list };
  }

  if (actionType === 'delete-head') {
    if (list.length === 0) {
      frames.push(createFrame({
        op: 'linked-list',
        data: [],
        codeLine: 10,
        narration: `Underflow Warning: Singly Linked List is empty!`
      }));
      return { frames, updatedList: list };
    }

    // Frame 1: Highlight head to be removed
    const removedNode = list[0];
    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      pointers: [0],
      codeLine: 11,
      narration: `Locating HEAD node to remove (Data: ${removedNode.data}, Addr: ${removedNode.address}).`
    }));

    // Frame 2: Advance head pointer
    list.shift();

    frames.push(createFrame({
      op: 'linked-list',
      data: structuredClone(list),
      pointers: [0],
      codeLine: 12,
      narration: `Advanced HEAD pointer to ${list.length ? list[0].address : 'NULL'}. Node removed!`
    }));

    return { frames, updatedList: list };
  }

  if (actionType === 'search') {
    const searchVal = target !== null ? Number(target) : 18;
    let foundIndex = -1;

    for (let i = 0; i < list.length; i++) {
      const isMatch = list[i].data === searchVal;

      frames.push(createFrame({
        op: 'linked-list',
        data: list.map((item, idx) => ({
          ...item,
          isSearching: idx === i,
          isFound: isMatch && idx === i
        })),
        pointers: [i],
        codeLine: 15,
        narration: isMatch
          ? `MATCH FOUND! Value ${searchVal} found at node #${i + 1} (Addr: ${list[i].address})!`
          : `Comparing node #${i + 1} data (${list[i].data}) with target ${searchVal}...`
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
        codeLine: 17,
        narration: `Search Completed: Value ${searchVal} not found in Linked List.`
      }));
    }

    return { frames, updatedList: list };
  }

  return { frames, updatedList: list };
}
