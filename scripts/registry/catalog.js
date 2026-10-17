/*AlgoVerse — Catalog Registry
Central metadata repository for all DSA topics, algorithms, and data structures.*/

export const CATALOG_ITEMS = [
  // Sorting Algorithms
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    category: 'sorting',
    description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    url: 'visualizer.html?topic=sorting&algo=bubble-sort'
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    category: 'sorting',
    description: 'Divides array into sorted and unsorted parts, repeatedly selecting the smallest element from unsorted part.',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    url: 'visualizer.html?topic=sorting&algo=selection-sort'
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    category: 'sorting',
    description: 'Builds final sorted array one item at a time by inserting unsorted elements into their correct position.',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    url: 'visualizer.html?topic=sorting&algo=insertion-sort'
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    category: 'sorting',
    description: 'Divide-and-conquer algorithm that recursively splits array in half, sorts halves, and merges them together.',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    url: 'visualizer.html?topic=sorting&algo=merge-sort'
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    category: 'sorting',
    description: 'Efficient divide-and-conquer algorithm using a pivot element to partition the array into smaller sub-arrays.',
    complexity: { time: 'O(n log n)', space: 'O(log n)' },
    url: 'visualizer.html?topic=sorting&algo=quick-sort'
  },

  {
    id: 'linear-search',
    title: 'Searching Algorithms',
    category: 'searching',
    description: 'Linear Search (O(n) sequential scan) and Binary Search (O(log n) divide & conquer) — switch between both with the algorithm tabs.',
    complexity: { time: 'O(n) / O(log n)', space: 'O(1)' },
    url: 'visualizer.html?topic=searching&algo=linear-search'
  },

  // Data Structures
  {
    id: 'array-ops',
    title: 'Array Operations',
    category: 'structures',
    description: 'Contiguous memory layout structure supporting Insert, Delete, Search, and Traversal operations.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    url: 'visualizer.html?topic=structures&algo=array-ops'
  },
  {
    id: 'string-ops',
    title: 'String Operations',
    category: 'structures',
    description: 'Sequence of characters demonstrating Reverse, Palindrome verification, and Character frequency count.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    url: 'visualizer.html?topic=structures&algo=string-ops'
  },
  {
    id: 'stack-ops',
    title: 'Stack (LIFO)',
    category: 'structures',
    description: 'Last-In-First-Out linear structure supporting Push, Pop, Peek, and isEmpty operations.',
    complexity: { time: 'O(1)', space: 'O(n)' },
    url: 'visualizer.html?topic=structures&algo=stack-ops'
  },
  {
    id: 'queue-ops',
    title: 'Queue (FIFO)',
    category: 'structures',
    description: 'First-In-First-Out linear structure supporting Enqueue, Dequeue, Front, and Rear operations.',
    complexity: { time: 'O(1)', space: 'O(n)' },
    url: 'visualizer.html?topic=structures&algo=queue-ops'
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    category: 'structures',
    description: 'Sequence of node elements where each node stores data and a pointer reference to the next node.',
    complexity: { time: 'O(n)', space: 'O(n)' },
    url: 'visualizer.html?topic=structures&algo=linked-list'
  },
  {
    id: 'hash-table',
    title: 'Hash Table',
    category: 'structures',
    description: 'Associative key-value store with polynomial rolling hash code, modulo indexing, and collision resolution (Separate Chaining & Linear Probing).',
    complexity: { time: 'O(1) Avg', space: 'O(n)' },
    url: 'visualizer.html?topic=structures&algo=hash-table'
  },
  {
    id: 'recursion-ops',
    title: 'Recursion (Call Stack & Tree)',
    category: 'structures',
    description: 'Self-referential algorithm execution trace visualizing LIFO Call Stack memory frames and binary recursion tree hierarchy.',
    complexity: { time: 'O(2ⁿ)', space: 'O(n)' },
    url: 'visualizer.html?topic=structures&algo=recursion-ops'
  }
];
