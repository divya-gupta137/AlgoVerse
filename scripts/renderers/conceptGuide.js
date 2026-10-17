/**
 * AlgoVerse — Educational Concept Guide Renderer
 * Renders structured DSA mental models, time/space complexity matrices, 
 * Core Java DSA code implementations in an interactive IDE studio,
 * real-world applications, and system tradeoffs matching the Jet Black theme.
 * Topics: Array, Linked List, Hash Table, Stack, Queue, String.
 * Strictly Java (Core DSA / LeetCode standard) with realistic SVG icons — zero emojis.
 */

// Java-Only Array Operations
const JAVA_ARRAY_OPERATIONS = [
  {
    name: 'Sequential Traversal',
    code: 'public static void traverse(int[] arr) {\n    for (int i = 0; i < arr.length; i++) {\n        System.out.println("Index " + i + ": " + arr[i]);\n    }\n}',
    complexity: 'O(N) Time',
    note: 'Unit stride (+1) sequential memory iteration maximizing L1 CPU cache lines'
  },
  {
    name: 'Binary Search (Sorted)',
    code: 'public static int binarySearch(int[] arr, int target) {\n    int left = 0, right = arr.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1; // O(log N) Time\n}',
    complexity: 'O(log N) Time',
    note: 'Divide-and-conquer on contiguous memory avoiding integer overflow'
  },
  {
    name: 'Two-Pointer Reversal',
    code: 'public static void reverse(int[] arr) {\n    int l = 0, r = arr.length - 1;\n    while (l < r) {\n        int temp = arr[l];\n        arr[l] = arr[r];\n        arr[r] = temp;\n        l++; r--;\n    }\n}',
    complexity: 'O(N) Time',
    note: 'In-place two-pointer memory swap in O(1) auxiliary space'
  },
  {
    name: 'Insert at Index k',
    code: 'public static int[] insertAt(int[] arr, int n, int idx, int val) {\n    int[] result = new int[n + 1];\n    for (int i = 0; i < idx; i++) result[i] = arr[i];\n    result[idx] = val;\n    for (int i = idx; i < n; i++) result[i + 1] = arr[i];\n    return result;\n}',
    complexity: 'O(N) Time',
    note: 'Requires shifting subsequent elements right by 1 index'
  },
  {
    name: 'Delete at Index k',
    code: 'public static void deleteAt(int[] arr, int n, int idx) {\n    for (int i = idx; i < n - 1; i++) {\n        arr[i] = arr[i + 1]; // Shift left\n    }\n    arr[n - 1] = 0; // Clear trailing element\n}',
    complexity: 'O(N) Time',
    note: 'Requires shifting subsequent elements left to maintain contiguous order'
  },
  {
    name: 'Primitive Dual-Pivot Sort',
    code: 'public static void sortArray(int[] arr) {\n    // Dual-Pivot Quicksort via Java Standard Library\n    java.util.Arrays.sort(arr);\n}',
    complexity: 'O(N log N)',
    note: 'JVM highly optimized dual-pivot quicksort with O(log N) recursion depth'
  }
];

// Java-Only Linked List Implementations for the IDE Studio Window
const JAVA_LL_IDE_FILES = [
  {
    id: 'listnode',
    name: 'ListNode.java',
    title: 'ListNode Class Definition',
    complexity: 'O(1) Space',
    space: 'O(1) Heap Node',
    note: 'Standard LeetCode / Java Node Definition with data and pointer references allocated in JVM heap',
    code: `// Standard LeetCode / Java Singly Linked List Node Definition
public class ListNode {
    public int val;
    public ListNode next;

    // Default constructor
    public ListNode() {}

    // Single value constructor
    public ListNode(int val) {
        this.val = val;
        this.next = null;
    }

    // Value and next pointer constructor
    public ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}`
  },
  {
    id: 'insert-head',
    name: 'InsertHead.java',
    title: 'Prepend (Insert Head)',
    complexity: 'O(1) Time',
    space: 'O(1) Auxiliary',
    note: 'Instant O(1) allocation: newNode.next = head, then head points to newNode. No shifts.',
    code: `// Prepend: Insert at Head in O(1) Time
public class InsertHead {
    public static ListNode prepend(ListNode head, int val) {
        // Step 1: Allocate new node on JVM heap
        ListNode newNode = new ListNode(val);

        // Step 2: Point new node's next to current head
        newNode.next = head;

        // Step 3: New node becomes new head of list
        return newNode; // O(1) Time, O(1) Auxiliary Space
    }
}`
  },
  {
    id: 'insert-tail',
    name: 'InsertTail.java',
    title: 'Append (Insert Tail)',
    complexity: 'O(N) Time',
    space: 'O(1) Auxiliary',
    note: 'Traverse to tail node (curr.next == null), then point curr.next = newNode. (O(1) if tail cached).',
    code: `// Append: Insert at Tail in O(N) Time
public class InsertTail {
    public static ListNode append(ListNode head, int val) {
        ListNode newNode = new ListNode(val);

        // Edge Case: Empty list
        if (head == null) return newNode;

        // Traverse to the last non-null node
        ListNode curr = head;
        while (curr.next != null) {
            curr = curr.next; // Sequential pointer walk
        }

        // Rewire tail link to point to new node
        curr.next = newNode;
        return head; // O(N) Time, O(1) Auxiliary Space
    }
}`
  },
  {
    id: 'insert-idx',
    name: 'InsertAtIndex.java',
    title: 'Insert at Index k',
    complexity: 'O(N) Time',
    space: 'O(1) Auxiliary',
    note: 'Traverse k - 1 steps to predecessor, splice newNode.next = curr.next; curr.next = newNode.',
    code: `// Insert at Index k in O(N) Time
public class InsertAtIndex {
    public static ListNode insertAt(ListNode head, int index, int val) {
        if (index == 0) {
            return new ListNode(val, head);
        }

        ListNode curr = head;
        // Walk to (index - 1)-th predecessor node
        for (int i = 0; i < index - 1 && curr != null; i++) {
            curr = curr.next;
        }

        if (curr == null) return head; // Index exceeds bounds

        // Splice new node between curr and curr.next
        ListNode newNode = new ListNode(val);
        newNode.next = curr.next;
        curr.next = newNode;

        return head; // O(N) Time, O(1) Auxiliary Space
    }
}`
  },
  {
    id: 'delete-head',
    name: 'DeleteHead.java',
    title: 'Delete Head (Pop Head)',
    complexity: 'O(1) Time',
    space: 'O(1) Auxiliary',
    note: 'Advance head = head.next. The unlinked previous head is safely swept by Java GC.',
    code: `// Remove Head Node in O(1) Time
public class DeleteHead {
    public static ListNode removeHead(ListNode head) {
        if (head == null) return null; // Empty list guard

        // Advance head reference forward
        ListNode newHead = head.next;

        // Unlinked old head is collected by Java Garbage Collector
        head.next = null; 
        return newHead; // O(1) Time, O(1) Auxiliary Space
    }
}`
  },
  {
    id: 'delete-idx',
    name: 'DeleteAtIndex.java',
    title: 'Delete at Index k',
    complexity: 'O(N) Time',
    space: 'O(1) Auxiliary',
    note: 'Traverse to index - 1, bypass target node: curr.next = curr.next.next.',
    code: `// Delete Node at Index k in O(N) Time
public class DeleteAtIndex {
    public static ListNode removeAt(ListNode head, int index) {
        if (head == null) return null;
        if (index == 0) return head.next; // Pop head

        ListNode curr = head;
        // Walk to predecessor node (index - 1)
        for (int i = 0; i < index - 1 && curr.next != null; i++) {
            curr = curr.next;
        }

        if (curr.next == null) return head; // Target not found

        // Bypass target node: rewire next pointer
        ListNode target = curr.next;
        curr.next = target.next;
        target.next = null; // Clean dereference for GC

        return head; // O(N) Time, O(1) Auxiliary Space
    }
}`
  },
  {
    id: 'reverse',
    name: 'ReverseList.java',
    title: 'Reverse List (In-Place)',
    complexity: 'O(N) Time',
    space: 'O(1) Auxiliary',
    note: 'LeetCode 206: Iterative 3-pointer reversal (prev, curr, nextTemp) in O(1) auxiliary space.',
    code: `// LeetCode 206: Reverse Linked List in O(N) Time
public class ReverseList {
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        // 3-Pointer Iterative In-Place Reversal
        while (curr != null) {
            ListNode nextTemp = curr.next; // Cache upcoming link
            curr.next = prev;              // Flip pointer backwards
            prev = curr;                   // Advance prev pointer
            curr = nextTemp;               // Advance curr pointer
        }

        return prev; // prev is the new head of reversed list
    }
}`
  },
  {
    id: 'complete-class',
    name: 'SinglyLinkedList.java',
    title: 'Production LinkedList Class',
    complexity: 'Production Ready',
    space: 'O(N) Total',
    note: 'Fully encapsulated Java class with head reference, helper methods, and executable main() method.',
    code: `// Production Ready Singly Linked List with Executable Main
public class SinglyLinkedList {
    private ListNode head;
    private int size;

    public SinglyLinkedList() {
        this.head = null;
        this.size = 0;
    }

    public void addFirst(int val) {
        head = new ListNode(val, head);
        size++;
    }

    public void addLast(int val) {
        if (head == null) { addFirst(val); return; }
        ListNode curr = head;
        while (curr.next != null) curr = curr.next;
        curr.next = new ListNode(val);
        size++;
    }

    public void printList() {
        ListNode curr = head;
        while (curr != null) {
            System.out.print(curr.val + " -> ");
            curr = curr.next;
        }
        System.out.println("null");
    }

    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();
        list.addLast(10);
        list.addLast(25);
        list.addFirst(5);
        list.printList(); // 5 -> 10 -> 25 -> null
    }
}`
  }
];

// Java-Only Hash Table Implementations for IDE Studio
const JAVA_HASH_IDE_FILES = [
  {
    id: 'my-hashmap',
    name: 'MyHashMap.java',
    title: 'Custom HashMap with Chaining',
    complexity: 'O(1) Avg Put/Get',
    space: 'O(N + K) Total',
    note: 'Production-ready separate chaining hash table with dynamic rehash doubling at load factor 0.75.',
    code: `// Custom HashMap Implementation (Separate Chaining)
public class MyHashMap<K, V> {
    static class Entry<K, V> {
        final K key;
        V val;
        Entry<K, V> next;
        Entry(K key, V val) { this.key = key; this.val = val; }
    }

    private Entry<K, V>[] buckets;
    private int capacity = 8;
    private int size = 0;
    private static final double LOAD_FACTOR_THRESHOLD = 0.75;

    @SuppressWarnings("unchecked")
    public MyHashMap() {
        buckets = new Entry[capacity];
    }

    private int getIndex(K key) {
        if (key == null) return 0;
        int hash = key.hashCode();
        return (hash & 0x7fffffff) % capacity;
    }

    public void put(K key, V val) {
        int idx = getIndex(key);
        Entry<K, V> curr = buckets[idx];
        while (curr != null) {
            if (curr.key.equals(key)) {
                curr.val = val; // Overwrite
                return;
            }
            curr = curr.next;
        }
        Entry<K, V> newEntry = new Entry<>(key, val);
        newEntry.next = buckets[idx];
        buckets[idx] = newEntry;
        size++;

        if ((double) size / capacity > LOAD_FACTOR_THRESHOLD) rehash();
    }

    public V get(K key) {
        int idx = getIndex(key);
        Entry<K, V> curr = buckets[idx];
        while (curr != null) {
            if (curr.key.equals(key)) return curr.val;
            curr = curr.next;
        }
        return null;
    }
}`
  },
  {
    id: 'hash-put',
    name: 'Put.java',
    title: 'Put Operation (O(1) Avg)',
    complexity: 'O(1) Average',
    space: 'O(1) Entry Node',
    note: 'Computes bucket index via hash % capacity, scans chain for key update or prepends new entry in O(1).',
    code: `// Hash Table Put (Insert / Update) in O(1) Average Time
public class PutOperation {
    public static <K, V> void put(Entry<K, V>[] buckets, int capacity, K key, V val) {
        int index = Math.abs(key.hashCode()) % capacity;
        Entry<K, V> head = buckets[index];

        // 1. Check if key already exists in bucket chain
        Entry<K, V> curr = head;
        while (curr != null) {
            if (curr.key.equals(key)) {
                curr.val = val; // Direct overwrite
                return;
            }
            curr = curr.next;
        }

        // 2. Prepend new Entry to linked list chain
        Entry<K, V> newEntry = new Entry<>(key, val);
        newEntry.next = head;
        buckets[index] = newEntry; // O(1) Prepend
    }
}`
  },
  {
    id: 'hash-get',
    name: 'Get.java',
    title: 'Get Operation (O(1) Avg)',
    complexity: 'O(1) Average',
    space: 'O(1) Auxiliary',
    note: 'Direct arithmetic jump to bucket index, then traverses small linked list chain to find key.',
    code: `// Hash Table Get (Search) in O(1) Average Time
public class GetOperation {
    public static <K, V> V get(Entry<K, V>[] buckets, int capacity, K key) {
        int index = Math.abs(key.hashCode()) % capacity;
        Entry<K, V> curr = buckets[index];

        // Traverse collision chain in bucket
        while (curr != null) {
            if (curr.key.equals(key)) {
                return curr.val; // Key match found!
            }
            curr = curr.next;
        }
        return null; // Key does not exist
    }
}`
  },
  {
    id: 'hash-remove',
    name: 'Remove.java',
    title: 'Remove Operation (O(1) Avg)',
    complexity: 'O(1) Average',
    space: 'O(1) Auxiliary',
    note: 'Finds key in bucket chain, unlinks entry node, and leaves it for Java GC.',
    code: `// Hash Table Remove (Delete) in O(1) Average Time
public class RemoveOperation {
    public static <K, V> V remove(Entry<K, V>[] buckets, int capacity, K key) {
        int index = Math.abs(key.hashCode()) % capacity;
        Entry<K, V> curr = buckets[index];
        Entry<K, V> prev = null;

        while (curr != null) {
            if (curr.key.equals(key)) {
                if (prev == null) buckets[index] = curr.next;
                else prev.next = curr.next;
                return curr.val; // Successfully unlinked
            }
            prev = curr;
            curr = curr.next;
        }
        return null;
    }
}`
  },
  {
    id: 'hash-rehash',
    name: 'Rehash.java',
    title: 'Dynamic Rehashing (2x Expansion)',
    complexity: 'O(N) Amortized',
    space: 'O(N) New Table',
    note: 'When load factor n / k > 0.75, allocates 2x bucket array and redistributes all keys to preserve O(1).',
    code: `// Dynamic Rehashing to Preserve O(1) Performance
public class Rehashing {
    @SuppressWarnings("unchecked")
    private void rehash() {
        Entry<K, V>[] oldBuckets = buckets;
        capacity *= 2; // Double capacity
        buckets = new Entry[capacity];
        size = 0;

        // Re-insert all entries into new bucket array
        for (Entry<K, V> head : oldBuckets) {
            while (head != null) {
                put(head.key, head.val);
                head = head.next;
            }
        }
    }
}`
  }
];

// Java-Only Stack Implementations for IDE Studio
const JAVA_STACK_IDE_FILES = [
  {
    id: 'my-stack',
    name: 'MyStack.java',
    title: 'Array-Based Stack (LIFO)',
    complexity: 'O(1) Push/Pop',
    space: 'O(N) Array',
    note: 'Clean LIFO stack backed by fixed array with top index pointer, overflow, and underflow guards.',
    code: `// Array-Based LIFO Stack Implementation
public class MyStack {
    private int[] data;
    private int top;
    private int capacity;

    public MyStack(int capacity) {
        this.capacity = capacity;
        this.data = new int[capacity];
        this.top = -1; // Empty stack
    }

    public void push(int val) {
        if (top == capacity - 1) {
            throw new RuntimeException("Stack Overflow");
        }
        data[++top] = val; // O(1) Time
    }

    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack Underflow");
        }
        return data[top--]; // O(1) Time
    }

    public int peek() {
        if (isEmpty()) throw new RuntimeException("Stack is Empty");
        return data[top]; // O(1) Time
    }

    public boolean isEmpty() { return top == -1; }
    public int size() { return top + 1; }
}`
  },
  {
    id: 'min-stack',
    name: 'MinStack.java',
    title: 'LeetCode 155: Min Stack',
    complexity: 'O(1) getMin()',
    space: 'O(N) Dual Stack',
    note: 'Maintains companion auxiliary stack tracking running minimum in O(1) instant retrieval.',
    code: `// LeetCode 155: Constant Time Minimum Stack
public class MinStack {
    private java.util.Stack<Integer> stack = new java.util.Stack<>();
    private java.util.Stack<Integer> minStack = new java.util.Stack<>();

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }

    public void pop() {
        if (stack.peek().equals(minStack.peek())) {
            minStack.pop();
        }
        stack.pop();
    }

    public int top() { return stack.peek(); }
    public int getMin() { return minStack.peek(); } // O(1) Guarantee
}`
  }
];

// Java-Only Queue Implementations for IDE Studio
const JAVA_QUEUE_IDE_FILES = [
  {
    id: 'circular-queue',
    name: 'CircularQueue.java',
    title: 'LeetCode 622: Circular Queue',
    complexity: 'O(1) Enqueue/Dequeue',
    space: 'O(K) Fixed Array',
    note: 'Ring buffer wrapping indices using modulo arithmetic: (rear + 1) % capacity. Eliminates false overflow.',
    code: `// LeetCode 622: Design Circular Queue (Ring Buffer)
public class CircularQueue {
    private int[] data;
    private int front;
    private int rear;
    private int count;
    private int capacity;

    public CircularQueue(int k) {
        this.capacity = k;
        this.data = new int[k];
        this.front = 0;
        this.rear = -1;
        this.count = 0;
    }

    public boolean enQueue(int value) {
        if (isFull()) return false;
        rear = (rear + 1) % capacity; // Modulo index wrap
        data[rear] = value;
        count++;
        return true; // O(1)
    }

    public boolean deQueue() {
        if (isEmpty()) return false;
        front = (front + 1) % capacity; // Advance front
        count--;
        return true; // O(1)
    }

    public int Front() { return isEmpty() ? -1 : data[front]; }
    public int Rear() { return isEmpty() ? -1 : data[rear]; }
    public boolean isEmpty() { return count == 0; }
    public boolean isFull() { return count == capacity; }
}`
  }
];

// Java-Only String Implementations for IDE Studio
const JAVA_STRING_IDE_FILES = [
  {
    id: 'string-algorithms',
    name: 'StringOps.java',
    title: 'String Algorithms Suite',
    complexity: 'O(N) Time',
    space: 'O(1) In-Place',
    note: 'Two-pointer reversal, palindrome validation, sliding window pattern match, and frequency counting.',
    code: `// Core String Algorithms in Java
public class StringAlgorithms {
    // LeetCode 344: Reverse String In-Place
    public static void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left++] = s[right];
            s[right--] = temp; // Two-pointer swap
        }
    }

    // LeetCode 125: Valid Palindrome (Case Insensitive)
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++; right--;
        }
        return true;
    }

    // Character Frequency Counter (Array Bucket)
    public static int[] getFrequency(String s) {
        int[] freq = new int[256]; // ASCII direct indexing
        for (char c : s.toCharArray()) freq[c]++;
        return freq;
    }
}`
  }
];

// Helper: Lightweight Java Syntax Highlighting
function highlightJavaCode(code) {
  const esc = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const lines = esc.split('\n');
  return lines.map(line => {
    const commentIdx = line.indexOf('//');
    let codePart = commentIdx !== -1 ? line.substring(0, commentIdx) : line;
    const commentPart = commentIdx !== -1 ? `<span class="tok-cm">${line.substring(commentIdx)}</span>` : '';

    // Keywords
    codePart = codePart.replace(/\b(public|private|protected|class|static|void|return|new|if|else|while|for|null|this|final|boolean|int|double|char)\b/g, '<span class="tok-kw">$1</span>');
    // Types
    codePart = codePart.replace(/\b(ListNode|Node|Entry|MyHashMap|PutOperation|GetOperation|RemoveOperation|Rehashing|MyStack|MinStack|CircularQueue|StringAlgorithms|String|RuntimeException|Math|Character|Stack)\b/g, '<span class="tok-type">$1</span>');
    // Pointer accesses
    codePart = codePart.replace(/\.(next|prev|val|data|key|top|front|rear)\b/g, '.<span class="tok-ptr">$1</span>');
    // Digits
    codePart = codePart.replace(/\b(\d+)\b/g, '<span class="tok-num">$1</span>');

    return codePart + commentPart;
  }).join('\n');
}

function generateLineNumbersHtml(code) {
  const count = code.split('\n').length;
  let html = '';
  for (let i = 1; i <= count; i++) {
    html += `<div>${i}</div>`;
  }
  return html;
}

export class ConceptGuideRenderer {
  constructor(containerElement) {
    this.container = containerElement;
    this.activeTopic = 'array';
    this.activeIdeFileId = 'listnode';
  }

  renderArrayTopCard(targetElement) {
    if (!targetElement) return;
    targetElement.innerHTML = `
      <div class="concept-header-card" style="margin-bottom: 0.85rem;">
        <div class="concept-tag-row">
          <span class="concept-pill-badge">CONCEPT GUIDE</span>
          <span class="concept-meta-note">Review the mental model, memory tradeoffs, and practical engineering use cases.</span>
        </div>
        <h2 class="concept-main-title">What is an Array?</h2>
        <div class="concept-badge-chips">
          <span class="chip-badge chip-amber">Contiguous Memory</span>
          <span class="chip-badge chip-green">Random Access O(1)</span>
          <span class="chip-badge chip-purple">Linear Data Structure</span>
        </div>
        <p class="concept-lead-text">
          An <strong>Array</strong> is a linear data structure that collects elements of the same data type and stores them in <strong>contiguous and adjacent memory locations</strong>. It enables instant <code>O(1)</code> index-based direct memory calculation via the hardware formula <code>Address = Base + (Index × Size)</code>, but requires <code>O(N)</code> element shifts for insertions and deletions in the middle.
        </p>
      </div>
    `;
  }

  renderArrayGuide() {
    if (!this.container) return;
    this.activeTopic = 'array';

    this.container.innerHTML = `
      <section class="concept-guide-wrapper">
        <div class="concept-two-col-grid">
          <div class="concept-card">
            <h3 class="concept-card-title text-emerald">[Time Complexity Matrix]</h3>
            <p class="concept-card-sub">Core operations and their asymptotic runtime bounds:</p>
            <div class="complexity-table-list">
              <div class="complexity-row"><span class="comp-op">Access by Index (<code>arr[i]</code>)</span><span class="comp-desc">Direct memory addressing</span><span class="comp-val val-o1">O(1)</span></div>
              <div class="complexity-row"><span class="comp-op">Search (Unsorted / Linear)</span><span class="comp-desc">Linear scan required</span><span class="comp-val val-on">O(n)</span></div>
              <div class="complexity-row"><span class="comp-op">Search (Sorted / Binary)</span><span class="comp-desc">Binary search divide & conquer</span><span class="comp-val val-ologn">O(log n)</span></div>
              <div class="complexity-row"><span class="comp-op">Insertion at End (Dynamic)</span><span class="comp-desc">Amortized constant time</span><span class="comp-val val-o1">O(1)*</span></div>
              <div class="complexity-row"><span class="comp-op">Insertion at Start / Index</span><span class="comp-desc">Requires shifting elements right</span><span class="comp-val val-on">O(n)</span></div>
              <div class="complexity-row"><span class="comp-op">Deletion at End</span><span class="comp-desc">No shifting needed</span><span class="comp-val val-o1">O(1)</span></div>
              <div class="complexity-row"><span class="comp-op">Deletion at Start / Index</span><span class="comp-desc">Requires shifting elements left</span><span class="comp-val val-on">O(n)</span></div>
            </div>
            <p class="complexity-footnote">* Amortized time complexity for dynamic arrays with growth factor doubling.</p>
          </div>

          <div class="concept-card">
            <h3 class="concept-card-title text-purple">[Static vs. Dynamic Allocation]</h3>
            <p class="concept-card-sub">Comparison between low-level hardware memory allocation models:</p>
            <div class="concept-detail-block">
              <div class="concept-topic-group">
                <h4 class="topic-heading topic-amber">Static Arrays</h4>
                <p class="topic-desc">Fixed size allocated upfront on the stack or heap. Zero memory overhead, predictable runtime, but cannot be resized once created.</p>
                <div class="code-mini-chip">Java: <code>int[] scores = new int[5]; // Fixed 20B on Heap</code></div>
              </div>
              <div class="concept-topic-group" style="margin-top: 1rem;">
                <h4 class="topic-heading topic-cyan">Dynamic Arrays</h4>
                <p class="topic-desc">Automatically resizes when capacity is reached (allocating a 2x larger buffer and copying elements).</p>
                <div class="code-mini-chip">Java: <code>ArrayList&lt;Integer&gt; list = new ArrayList&lt;&gt;();</code></div>
              </div>
            </div>
          </div>
        </div>

        <div class="concept-card" style="margin-top: 1.25rem;">
          <div class="op-deck-header-row">
            <div>
              <h3 class="concept-card-title text-amber">[Standard Array Operations in Java]</h3>
              <p class="concept-card-sub">Core LeetCode algorithms with JVM memory mechanics and asymptotic bounds:</p>
            </div>
            <div class="lang-switcher-deck">
              <span class="chip-badge chip-green" style="font-size: 0.75rem; font-family: var(--font-mono);">Java 21 (Core DSA)</span>
            </div>
          </div>
          <div id="operations-cards-container" class="operations-grid-cards">
            ${this.renderArrayJavaCards()}
          </div>
        </div>

        <!-- 2D Memory Layout & Stride Calculation -->
        <div class="concept-card" style="margin-top: 1.25rem;">
          <h3 class="concept-card-title text-cyan">[2D Matrix Memory Layout & Stride Calculation]</h3>
          <p class="concept-card-sub">Physical memory in RAM is strictly 1-dimensional. 2D arrays are flattened into contiguous memory addresses:</p>
          <div class="concept-detail-block" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 0.75rem;">
            <div class="concept-topic-group">
              <h4 class="topic-heading topic-amber">Row-Major Order (C, C++, Java)</h4>
              <p class="topic-desc">Rows stored contiguously one after another in RAM:</p>
              <div class="code-mini-chip"><code>Address(i, j) = Base + (i &times; Cols + j) &times; ElementSize</code></div>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.35rem;">Row Stride = 1 element (contiguous L1 cache hit). Col Stride = Cols elements (incurs cache misses if row is wide).</p>
            </div>
            <div class="concept-topic-group">
              <h4 class="topic-heading topic-cyan">Column-Major Order (Fortran, MATLAB, WebGL)</h4>
              <p class="topic-desc">Columns stored contiguously in RAM:</p>
              <div class="code-mini-chip"><code>Address(i, j) = Base + (j &times; Rows + i) &times; ElementSize</code></div>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.35rem;">Col Stride = 1 element. Used in GPU vertex shaders and linear algebra BLAS routines.</p>
            </div>
          </div>
        </div>

        <!-- SDE Candidate Master Knowledge Section -->
        <div class="concept-card" style="margin-top: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <h3 class="concept-card-title text-emerald" style="display: flex; align-items: center; gap: 0.5rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              [SDE Candidate Master Knowledge: Dynamic Amortization & CPU Caches]
            </h3>
            <span class="chip-badge chip-green" style="font-size: 0.72rem;">FAANG / Tier-1 Interview Essentials</span>
          </div>
          <p class="concept-card-sub">Critical systems-level fundamentals expected during senior technical rounds:</p>

          <div class="concept-detail-block" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin-top: 0.85rem;">
            <div class="concept-topic-group">
              <h4 class="topic-heading topic-amber">1. Amortized Analysis & Growth Factor Math</h4>
              <p class="topic-desc">
                When a dynamic array (like <code>ArrayList</code>) fills up, appending an element triggers an <code>O(N)</code> memory reallocation. Yet, its insertion runtime is stated as <strong>Amortized O(1)</strong>.
              </p>
              <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.06); padding: 0.75rem; border-radius: 6px; margin: 0.5rem 0; font-size: 0.78rem; line-height: 1.5; color: var(--text-secondary);">
                <strong>Aggregate Method Proof:</strong><br>
                For inserting $N = 2^k$ elements starting from capacity 1:<br>
                Total operations = $N \text{ (regular inserts)} + (1 + 2 + 4 + ... + N) \text{ (copying)} = N + 2N = 3N$.<br>
                $\text{Amortized Cost per element} = \frac{3N}{N} = 3 = \mathcal{O}(1)$.
              </div>
              <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">
                <strong style="color: #f59e0b;">Why Java uses 1.5x vs C++ 2.0x?</strong> Java’s <code>ArrayList</code> grows by $1.5\times$ (<code>newCapacity = oldCapacity + (oldCapacity >> 1)</code>). At $2.0\times$, the newly requested block is strictly larger than the sum of all previously deallocated blocks, preventing heap chunk reuse. At $1.5\times$, memory allocators can reuse deallocated memory chunks!
              </p>
            </div>

            <div class="concept-topic-group">
              <h4 class="topic-heading topic-cyan">2. Hardware L1/L2 Cache Lines & Spatial Locality</h4>
              <p class="topic-desc">
                CPUs do not read RAM one variable at a time; memory controllers fetch data into L1/L2 caches in contiguous <strong>64-Byte Cache Lines</strong>.
              </p>
              <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.06); padding: 0.75rem; border-radius: 6px; margin: 0.5rem 0; font-size: 0.78rem; line-height: 1.5; color: var(--text-secondary);">
                <strong>Array vs Linked List in Hardware:</strong><br>
                • <strong>Array:</strong> A single 64B cache line holds 16 consecutive 4-byte integers. 1 Cache Miss $\to$ 15 consecutive L1 Cache Hits (~1 ns).<br>
                • <strong>Linked List:</strong> Nodes scattered across heap memory. Almost every pointer traversal triggers a full RAM Cache Miss (~100–200 ns latency!).
              </div>
              <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">
                <strong style="color: #06b6d4;">False Sharing Trap:</strong> In multithreaded systems, if two CPU cores write to adjacent array indices in the same 64B cache line, they invalidate each other's cache lines repeatedly, severely degrading parallel performance.
              </p>
            </div>
          </div>
        </div>

        <!-- Real-World Engineering Applications -->
        <div class="concept-card" style="margin-top: 1.25rem;">
          <h3 class="concept-card-title text-purple">[Real-World Systems Engineering Applications]</h3>
          <p class="concept-card-sub">Where arrays and contiguous memory power modern production software:</p>
          <div class="real-life-apps-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.85rem; margin-top: 0.75rem;">
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #fbbf24; font-size: 0.85rem;">CPU Cache Line Prefetching</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">CPUs fetch 64-byte chunks into L1 cache. Array contiguous layout guarantees 100% spatial locality.</p>
            </div>
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #38bdf8; font-size: 0.85rem;">GPU Frame Buffers (Pixels)</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">Screen pixel matrices (RGBA) are flattened 1D byte arrays blasted directly to the display controller.</p>
            </div>
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #34d399; font-size: 0.85rem;">Database Buffer Pools</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">Postgres and MySQL cache disk pages as contiguous 8KB/16KB memory arrays for fast index scans.</p>
            </div>
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #c084fc; font-size: 0.85rem;">Audio PCM Samples</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">Digital sound represents 44.1kHz audio waveforms as linear 16-bit integer sample arrays.</p>
            </div>
          </div>
        </div>
      </section>
    `;
    this.container.style.display = 'block';
  }

  renderArrayJavaCards() {
    return JAVA_ARRAY_OPERATIONS.map(item => `
      <div class="op-code-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
          <span class="op-card-label">${item.name}</span>
          <span class="chip-badge chip-amber" style="font-size: 0.7rem; font-family: var(--font-mono);">${item.complexity}</span>
        </div>
        <pre><code class="code-snippet-box">${item.code}</code></pre>
        <span class="op-card-note">${item.note}</span>
      </div>
    `).join('');
  }

  renderLinkedListGuide() {
    if (!this.container) return;
    this.activeTopic = 'linked-list';
    this.activeIdeFileId = 'listnode';

    this.container.innerHTML = `
      <section class="concept-guide-wrapper">
        <div class="concept-header-card">
          <div class="concept-tag-row">
            <span class="concept-pill-badge">INTERACTIVE CONCEPT GUIDE</span>
            <span class="concept-meta-note">Explore the mental model, memory pointers, and runtime tradeoffs.</span>
          </div>
          <h2 class="concept-main-title">Linked List Architecture (Singly, Doubly, Circular)</h2>
          <div class="concept-badge-chips">
            <span class="chip-badge chip-amber">Dynamic Heap Nodes</span>
            <span class="chip-badge chip-green">Non-Contiguous RAM</span>
            <span class="chip-badge chip-purple">Sequential Pointer Chasing O(N)</span>
            <span class="chip-badge" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">O(1) Head Operations</span>
          </div>
          <p class="concept-lead-text">
            A <strong>Linked List</strong> is a linear data structure of discrete heap nodes linked via memory references. Nodes do not require contiguous memory blocks, granting instant <code>O(1)</code> insertions/deletions at endpoints without buffer reallocations, but requiring <code>O(N)</code> sequential traversal for index access.
          </p>

          <div class="concept-tab-navigation" style="margin-top: 1.25rem; margin-bottom: 0;">
            <button class="concept-nav-tab active" data-target="ll-pane-overview">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
              Complexity & Overview
            </button>
            <button class="concept-nav-tab" data-target="ll-pane-variations">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Architectural Variations
            </button>
            <button class="concept-nav-tab" data-target="ll-pane-code">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              Core Java DSA Studio (IDE)
            </button>
          </div>
        </div>

        <div id="ll-pane-overview" class="concept-pane active">
          <div class="concept-two-col-grid" style="margin-top: 1.25rem;">
            <div class="concept-card">
              <h3 class="concept-card-title text-emerald">[Time & Space Complexity Matrix]</h3>
              <div class="complexity-table-list">
                <div class="complexity-row"><span class="comp-op">Access by Index (<code>get(k)</code>)</span><span class="comp-desc">Traverse k pointers from head</span><span class="comp-val val-on">O(n)</span></div>
                <div class="complexity-row"><span class="comp-op">Insert at Head (Prepend)</span><span class="comp-desc">newNode.next = head; head = newNode</span><span class="comp-val val-o1">O(1)</span></div>
                <div class="complexity-row"><span class="comp-op">Insert at Tail (Append)</span><span class="comp-desc">Traverse to tail (O(1) if cached)</span><span class="comp-val val-on">O(n)</span></div>
                <div class="complexity-row"><span class="comp-op">Delete at Head (Pop)</span><span class="comp-desc">Advance head = head.next</span><span class="comp-val val-o1">O(1)</span></div>
                <div class="complexity-row"><span class="comp-op">Delete at Tail</span><span class="comp-desc">Singly: O(N) | Doubly: O(1)</span><span class="comp-val val-on">O(n)</span></div>
              </div>
            </div>
            <div class="concept-card">
              <h3 class="concept-card-title text-cyan">[Advantages vs. Tradeoffs]</h3>
              <ul class="concept-bullets">
                <li><strong>Dynamic Allocation</strong>: Grows element by element; zero capacity limits upfront.</li>
                <li><strong>O(1) Prepend</strong>: Instant head insert without shifting elements.</li>
                <li><strong>Pointer Overhead</strong>: Consumes 8 bytes reference overhead per node on 64-bit JVM.</li>
                <li><strong>Cache Misses</strong>: Scattered heap allocations cause CPU pipeline stalls.</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="ll-pane-variations" class="concept-pane">
          <div class="real-life-apps-grid" style="margin-top: 1.25rem;">
            <div class="app-card"><span class="app-card-tag">UNIDIRECTIONAL</span><h4 class="app-title">1. Singly Linked List</h4><p class="app-desc">Single forward pointer (<code>next</code>). Lowest memory overhead.</p></div>
            <div class="app-card"><span class="app-card-tag">BIDIRECTIONAL</span><h4 class="app-title">2. Doubly Linked List</h4><p class="app-desc">Dual pointers (<code>prev</code> and <code>next</code>). True O(1) tail deletion.</p></div>
            <div class="app-card"><span class="app-card-tag">RING BUFFER</span><h4 class="app-title">3. Circular Linked List</h4><p class="app-desc">Tail node points back to head. Never reaches null.</p></div>
          </div>
        </div>

        <div id="ll-pane-code" class="concept-pane">
          <div class="concept-card" style="margin-top: 1.25rem;">
            <div class="card-header-with-action">
              <h3 class="concept-card-title text-amber">[Core Java DSA Studio: LeetCode & Interview Standard]</h3>
              <span class="chip-badge chip-green" style="font-size: 0.75rem; font-family: var(--font-mono);">Java 21 (Core DSA)</span>
            </div>
            ${this.renderJavaIdeWindow(JAVA_LL_IDE_FILES, this.activeIdeFileId)}
          </div>
        </div>
      </section>
    `;
    this.container.style.display = 'block';
    this.bindConceptGuideTabEvents();
    this.bindJavaIdeEvents(JAVA_LL_IDE_FILES);
  }

  renderHashTableTopCard(targetElement) {
    if (!targetElement) return;
    targetElement.innerHTML = `
      <div class="concept-header-card" style="margin-bottom: 0.85rem;">
        <div class="concept-tag-row">
          <span class="concept-pill-badge">CONCEPT GUIDE</span>
          <span class="concept-meta-note">Review the mental model, hash function modulo wrap, and load factor mechanics.</span>
        </div>
        <h2 class="concept-main-title">Hash Table Architecture (Chaining & Probing)</h2>
        <div class="concept-badge-chips">
          <span class="chip-badge chip-green">O(1) Average Lookup</span>
          <span class="chip-badge chip-amber">Key-Value Mapping</span>
          <span class="chip-badge chip-purple">Polynomial Hash Code</span>
          <span class="chip-badge" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">Dynamic Rehashing (&lambda; &gt; 0.75)</span>
        </div>
        <p class="concept-lead-text">
          A <strong>Hash Table</strong> maps keys to values by calculating an integer <strong>Hash Code</strong> and mapping it to an array bucket via <code>index = hash(key) % capacity</code>. It achieves <strong>O(1) average-case time complexity</strong> for insertions, lookups, and deletions, backed by collision resolution strategies like Separate Chaining (linked buckets) and Linear Probing (open addressing).
        </p>
      </div>
    `;
  }

  renderHashTableGuide() {
    if (!this.container) return;
    this.activeTopic = 'hash-table';
    this.activeIdeFileId = 'my-hashmap';

    this.container.innerHTML = `
      <section class="concept-guide-wrapper">
        <div class="concept-header-card">
          <div class="concept-tag-row">
            <span class="concept-pill-badge">INTERACTIVE CONCEPT GUIDE</span>
            <span class="concept-meta-note">Deep dive into hash functions, collision resolution, and load factor mechanics.</span>
          </div>
          <h2 class="concept-main-title">Hash Table & Hashing Architecture</h2>
          <div class="concept-badge-chips">
            <span class="chip-badge chip-green">O(1) Average Lookup</span>
            <span class="chip-badge chip-amber">Key-Value Mapping</span>
            <span class="chip-badge chip-purple">Polynomial Hash Code</span>
            <span class="chip-badge" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">Dynamic Rehashing</span>
          </div>
          <p class="concept-lead-text">
            A <strong>Hash Table</strong> maps keys to values by calculating an integer <strong>Hash Code</strong> and mapping it to an array index via <code>index = hash(key) % capacity</code>. It achieves <strong>O(1) average-case time complexity</strong> for insertions, lookups, and deletions, backed by collision resolution strategies like Separate Chaining and Linear Probing.
          </p>

          <div class="concept-tab-navigation" style="margin-top: 1.25rem; margin-bottom: 0;">
            <button class="concept-nav-tab active" data-target="hash-pane-overview">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
              Complexity & Load Factor
            </button>
            <button class="concept-nav-tab" data-target="hash-pane-collisions">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Collision Strategies
            </button>
            <button class="concept-nav-tab" data-target="hash-pane-code">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              Core Java HashMap Studio (IDE)
            </button>
            <button class="concept-nav-tab" data-target="hash-pane-systems">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              Real-World Systems
            </button>
          </div>
        </div>

        <div id="hash-pane-overview" class="concept-pane active">
          <div class="concept-two-col-grid" style="margin-top: 1.25rem;">
            <div class="concept-card">
              <h3 class="concept-card-title text-emerald">[Time Complexity & Asymptotics]</h3>
              <div class="complexity-table-list">
                <div class="complexity-row"><span class="comp-op">Search (Get)</span><span class="comp-desc">Direct bucket jump</span><span class="comp-val val-o1">O(1) avg / O(N) worst</span></div>
                <div class="complexity-row"><span class="comp-op">Insert (Put)</span><span class="comp-desc">Prepend to bucket</span><span class="comp-val val-o1">O(1) avg / O(N) worst</span></div>
                <div class="complexity-row"><span class="comp-op">Delete (Remove)</span><span class="comp-desc">Unlink from chain</span><span class="comp-val val-o1">O(1) avg / O(N) worst</span></div>
                <div class="complexity-row"><span class="comp-op">Rehash</span><span class="comp-desc">2x expansion</span><span class="comp-val val-on">O(N) Amortized</span></div>
              </div>
            </div>
            <div class="concept-card">
              <h3 class="concept-card-title text-amber">[Load Factor (&lambda;) & Rehashing]</h3>
              <p class="concept-card-sub">The mathematical health metric of a Hash Table:</p>
              <div class="layout-formula-box" style="margin-bottom: 0.75rem;">
                <code>Load Factor (&lambda;) = Total Keys (n) / Total Buckets (k)</code>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
                When &lambda; exceeds <strong>0.75</strong>, collision frequency spikes exponentially. Java's <code>HashMap</code> automatically doubles table capacity (<code>k = k × 2</code>) and re-hashes every element to maintain true <code>O(1)</code> performance.
              </p>
            </div>
          </div>
        </div>

        <div id="hash-pane-collisions" class="concept-pane">
          <div class="real-life-apps-grid" style="margin-top: 1.25rem;">
            <div class="app-card">
              <span class="app-card-tag">SEPARATE CHAINING</span>
              <h4 class="app-title">Linked List Chains (Java HashMap)</h4>
              <p class="app-desc">Each bucket is a linked list head. Collisions simply append to the chain. In Java 8+, chains exceeding 8 items convert to Red-Black Trees (O(log N)).</p>
            </div>
            <div class="app-card">
              <span class="app-card-tag">OPEN ADDRESSING</span>
              <h4 class="app-title">Linear Probing (h + i % k)</h4>
              <p class="app-desc">If slot is occupied, checks consecutive slots sequentially. High CPU cache locality, but prone to primary clustering.</p>
            </div>
            <div class="app-card">
              <span class="app-card-tag">QUADRATIC PROBING</span>
              <h4 class="app-title">Quadratic Steps (h + i² % k)</h4>
              <p class="app-desc">Probes slots with squared jumps (1, 4, 9, 16) to avoid primary clustering chains.</p>
            </div>
          </div>
        </div>

        <div id="hash-pane-code" class="concept-pane">
          <div class="concept-card" style="margin-top: 1.25rem;">
            <div class="card-header-with-action">
              <h3 class="concept-card-title text-amber">[Core Java HashMap Studio (IDE)]</h3>
              <span class="chip-badge chip-green" style="font-size: 0.75rem; font-family: var(--font-mono);">Java 21 (Core DSA)</span>
            </div>
            ${this.renderJavaIdeWindow(JAVA_HASH_IDE_FILES, this.activeIdeFileId)}
          </div>
        </div>

        <div id="hash-pane-systems" class="concept-pane">
          <div class="real-life-apps-grid" style="margin-top: 1.25rem;">
            <div class="app-card"><span class="app-card-tag">CACHING</span><h4 class="app-title">Redis In-Memory Key-Value Store</h4><p class="app-desc">High-speed distributed cache caching database queries in memory using hash tables.</p></div>
            <div class="app-card"><span class="app-card-tag">COMPILERS</span><h4 class="app-title">Compiler Symbol Tables</h4><p class="app-desc">Lexers and compilers store variable names, types, and scopes in hash tables for instant O(1) resolution.</p></div>
            <div class="app-card"><span class="app-card-tag">DATABASES</span><h4 class="app-title">PostgreSQL Hash Indexes</h4><p class="app-desc">Direct equality searches (WHERE user_id = 42) optimized via persistent B-tree and Hash indexes.</p></div>
          </div>
        </div>
      </section>
    `;
    this.container.style.display = 'block';
    this.bindConceptGuideTabEvents();
    this.bindJavaIdeEvents(JAVA_HASH_IDE_FILES);
  }

  renderStackTopCard(targetElement) {
    if (!targetElement) return;
    targetElement.innerHTML = `
      <div class="concept-header-card" style="margin-bottom: 0.85rem;">
        <div class="concept-tag-row">
          <span class="concept-pill-badge">CONCEPT GUIDE</span>
          <span class="concept-meta-note">Review the mental model, LIFO discipline, and call stack memory architecture.</span>
        </div>
        <h2 class="concept-main-title">Stack Architecture (LIFO — Last-In, First-Out)</h2>
        <div class="concept-badge-chips">
          <span class="chip-badge chip-amber">LIFO Discipline</span>
          <span class="chip-badge chip-green">O(1) Push / Pop / Peek</span>
          <span class="chip-badge chip-purple">Call Stack Frames</span>
          <span class="chip-badge" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">Linear Chamber</span>
        </div>
        <p class="concept-lead-text">
          A <strong>Stack</strong> is a linear data structure following the <strong>Last-In, First-Out (LIFO)</strong> discipline. All insertions (Push) and deletions (Pop) take place strictly at a single endpoint called the <strong>TOP</strong> pointer. Stacks power execution call frames, backtracking, and undo/redo histories.
        </p>
      </div>
    `;
  }

  renderStackGuide() {
    if (!this.container) return;
    this.activeTopic = 'stack-ops';
    this.activeIdeFileId = 'my-stack';

    this.container.innerHTML = `
      <section class="concept-guide-wrapper">
        <div class="concept-two-col-grid">
          <div class="concept-card">
            <h3 class="concept-card-title text-emerald">[Time & Space Complexity Bounds]</h3>
            <p class="concept-card-sub">LIFO operations executed strictly at the TOP pointer:</p>
            <div class="complexity-table-list">
              <div class="complexity-row"><span class="comp-op">Push (<code>stack.push(val)</code>)</span><span class="comp-desc">Insert at TOP pointer</span><span class="comp-val val-o1">O(1)</span></div>
              <div class="complexity-row"><span class="comp-op">Pop (<code>stack.pop()</code>)</span><span class="comp-desc">Remove from TOP pointer</span><span class="comp-val val-o1">O(1)</span></div>
              <div class="complexity-row"><span class="comp-op">Peek (<code>stack.peek()</code>)</span><span class="comp-desc">Inspect TOP value</span><span class="comp-val val-o1">O(1)</span></div>
              <div class="complexity-row"><span class="comp-op">Search (<code>contains(val)</code>)</span><span class="comp-desc">Linear traversal from TOP to bottom</span><span class="comp-val val-on">O(N)</span></div>
              <div class="complexity-row"><span class="comp-op">Space Complexity</span><span class="comp-desc">Proportional to elements stored</span><span class="comp-val val-on">O(N)</span></div>
            </div>
          </div>

          <div class="concept-card">
            <h3 class="concept-card-title text-purple">[Array-Backed vs Linked-List Stack]</h3>
            <p class="concept-card-sub">Low-level memory tradeoffs for stack implementation:</p>
            <div class="concept-detail-block">
              <div class="concept-topic-group">
                <h4 class="topic-heading topic-amber">Array-Backed Stack (e.g. <code>int[]</code>)</h4>
                <p class="topic-desc">Contiguous memory, maximum CPU cache locality. Amortized O(1) push, but incurs reallocation overhead when buffer is full.</p>
                <div class="code-mini-chip">Java: <code>int[] arr = new int[capacity]; int top = -1;</code></div>
              </div>
              <div class="concept-topic-group" style="margin-top: 1rem;">
                <h4 class="topic-heading topic-cyan">Linked-List Stack (e.g. <code>Node head</code>)</h4>
                <p class="topic-desc">True O(1) worst-case push with dynamic heap nodes, but incurs 24–32 byte reference overhead per node.</p>
                <div class="code-mini-chip">Java: <code>class Node { int val; Node next; }</code></div>
              </div>
            </div>
          </div>
        </div>

        <div class="concept-card" style="margin-top: 1.25rem;">
          <div class="card-header-with-action">
            <h3 class="concept-card-title text-amber">[Core Java Stack Studio (IDE)]</h3>
            <span class="chip-badge chip-green" style="font-size: 0.75rem; font-family: var(--font-mono);">Java 21 (Core DSA)</span>
          </div>
          ${this.renderJavaIdeWindow(JAVA_STACK_IDE_FILES, this.activeIdeFileId)}
        </div>

        <!-- SDE Candidate Master Knowledge: Monotonic Stack -->
        <div class="concept-card" style="margin-top: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <h3 class="concept-card-title text-emerald" style="display: flex; align-items: center; gap: 0.5rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              [SDE Master Knowledge: Monotonic Stack & Expression Parsing]
            </h3>
            <span class="chip-badge chip-green" style="font-size: 0.72rem;">Senior SDE Interview Pattern</span>
          </div>
          <div class="concept-detail-block" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin-top: 0.75rem;">
            <div class="concept-topic-group">
              <h4 class="topic-heading topic-amber">1. Monotonic Stack Pattern (O(N) Linear Time)</h4>
              <p class="topic-desc">
                A stack whose elements are strictly monotonically increasing or decreasing. Used to solve <em>Next Greater Element</em>, <em>Daily Temperatures</em>, and <em>Largest Rectangle in Histogram</em> in <strong>O(N)</strong> time instead of naive O(N²).
              </p>
              <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.06); padding: 0.75rem; border-radius: 6px; margin: 0.5rem 0; font-size: 0.78rem; line-height: 1.5; color: var(--text-secondary);">
                <strong>Why is it O(N)?</strong> Every element is pushed onto the stack exactly once and popped at most once throughout the entire algorithm run.
              </div>
            </div>
            <div class="concept-topic-group">
              <h4 class="topic-heading topic-cyan">2. Dijkstra’s Shunting-Yard & Balanced Parentheses</h4>
              <p class="topic-desc">
                Converts human-readable infix arithmetic <code>(3 + 4) * 2</code> into machine-executable postfix (RPN) using an operator stack. Compilers and AST parsers rely on this exact stack automation.
              </p>
            </div>
          </div>
        </div>

        <!-- Real-World Engineering Applications -->
        <div class="concept-card" style="margin-top: 1.25rem;">
          <h3 class="concept-card-title text-purple">[Real-World Systems Engineering Applications]</h3>
          <p class="concept-card-sub">Where Stack architecture powers critical software infrastructure:</p>
          <div class="real-life-apps-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.85rem; margin-top: 0.75rem;">
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #fbbf24; font-size: 0.85rem;">JVM Execution Call Stack</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">Every thread manages a stack of activation frames allocating local primitive variables and method return addresses.</p>
            </div>
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #38bdf8; font-size: 0.85rem;">Browser Navigation History</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">Two stacks (Back stack and Forward stack) manage page transitions on clicking the browser's Back and Forward buttons.</p>
            </div>
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #34d399; font-size: 0.85rem;">Undo / Redo Buffers</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">IDEs and graphics tools maintain a stack of command action objects to support Ctrl+Z and Ctrl+Y reversal.</p>
            </div>
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #c084fc; font-size: 0.85rem;">Syntax & Tag Matching</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">HTML/XML validators verify matching open and closing tags (&lt;div&gt;...&lt;/div&gt;) using a push/pop tag stack.</p>
            </div>
          </div>
        </div>
      </section>
    `;
    this.container.style.display = 'block';
    this.bindJavaIdeEvents(JAVA_STACK_IDE_FILES);
  }

  renderQueueTopCard(targetElement) {
    if (!targetElement) return;
    targetElement.innerHTML = `
      <div class="concept-header-card" style="margin-bottom: 0.85rem;">
        <div class="concept-tag-row">
          <span class="concept-pill-badge">CONCEPT GUIDE</span>
          <span class="concept-meta-note">Review the mental model, FIFO discipline, and circular ring buffer wrap.</span>
        </div>
        <h2 class="concept-main-title">Queue Architecture (FIFO — First-In, First-Out)</h2>
        <div class="concept-badge-chips">
          <span class="chip-badge chip-green">FIFO Discipline</span>
          <span class="chip-badge chip-amber">O(1) Enqueue / Dequeue</span>
          <span class="chip-badge chip-purple">Circular Ring Buffer</span>
          <span class="chip-badge" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">Linear Conduit</span>
        </div>
        <p class="concept-lead-text">
          A <strong>Queue</strong> is a linear data structure following the <strong>First-In, First-Out (FIFO)</strong> discipline. Elements enter at the <strong>REAR</strong> pointer and exit from the <strong>FRONT</strong> pointer. Circular queues recycle memory slots via modulo indexing <code>(rear + 1) % capacity</code> to eliminate linear conduit shifting.
        </p>
      </div>
    `;
  }

  renderQueueGuide() {
    if (!this.container) return;
    this.activeTopic = 'queue-ops';
    this.activeIdeFileId = 'circular-queue';

    this.container.innerHTML = `
      <section class="concept-guide-wrapper">
        <div class="concept-two-col-grid">
          <div class="concept-card">
            <h3 class="concept-card-title text-emerald">[Time & Space Complexity Bounds]</h3>
            <p class="concept-card-sub">FIFO operations at FRONT and REAR endpoints:</p>
            <div class="complexity-table-list">
              <div class="complexity-row"><span class="comp-op">Enqueue (<code>queue.enqueue(val)</code>)</span><span class="comp-desc">Insert at REAR pointer</span><span class="comp-val val-o1">O(1)</span></div>
              <div class="complexity-row"><span class="comp-op">Dequeue (<code>queue.dequeue()</code>)</span><span class="comp-desc">Remove from FRONT pointer</span><span class="comp-val val-o1">O(1)</span></div>
              <div class="complexity-row"><span class="comp-op">Peek Front (<code>queue.peek()</code>)</span><span class="comp-desc">Inspect head element</span><span class="comp-val val-o1">O(1)</span></div>
              <div class="complexity-row"><span class="comp-op">Search (<code>contains(val)</code>)</span><span class="comp-desc">Linear scan from front to rear</span><span class="comp-val val-on">O(N)</span></div>
              <div class="complexity-row"><span class="comp-op">Space Complexity</span><span class="comp-desc">Proportional to elements stored</span><span class="comp-val val-on">O(N)</span></div>
            </div>
          </div>

          <div class="concept-card">
            <h3 class="concept-card-title text-purple">[Linear Conduit vs Circular Ring Buffer]</h3>
            <p class="concept-card-sub">Addressing the "false overflow" issue in array queues:</p>
            <div class="concept-detail-block">
              <div class="concept-topic-group">
                <h4 class="topic-heading topic-amber">Linear Conduit Flaw</h4>
                <p class="topic-desc">When elements are dequeued, memory slots at the front are abandoned. Once REAR reaches capacity, no new elements can be added even if front slots are empty!</p>
              </div>
              <div class="concept-topic-group" style="margin-top: 1rem;">
                <h4 class="topic-heading topic-cyan">Circular Ring Buffer Fix</h4>
                <p class="topic-desc">Uses modular arithmetic to wrap pointers back to index 0: <code>rear = (rear + 1) % capacity</code>. Reuses deallocated slots seamlessly!</p>
                <div class="code-mini-chip">Formula: <code>nextIndex = (currentIndex + 1) % MAX_SIZE</code></div>
              </div>
            </div>
          </div>
        </div>

        <div class="concept-card" style="margin-top: 1.25rem;">
          <div class="card-header-with-action">
            <h3 class="concept-card-title text-amber">[Core Java Queue Studio (IDE)]</h3>
            <span class="chip-badge chip-green" style="font-size: 0.75rem; font-family: var(--font-mono);">Java 21 (Core DSA)</span>
          </div>
          ${this.renderJavaIdeWindow(JAVA_QUEUE_IDE_FILES, this.activeIdeFileId)}
        </div>

        <!-- SDE Candidate Master Knowledge: Lock-Free Ring Buffers -->
        <div class="concept-card" style="margin-top: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <h3 class="concept-card-title text-emerald" style="display: flex; align-items: center; gap: 0.5rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              [SDE Master Knowledge: Lock-Free SPSC Ring Buffers & Producer-Consumer]
            </h3>
            <span class="chip-badge chip-green" style="font-size: 0.72rem;">Senior Systems / High-Throughput Engineering</span>
          </div>
          <div class="concept-detail-block" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin-top: 0.75rem;">
            <div class="concept-topic-group">
              <h4 class="topic-heading topic-amber">1. Single-Producer Single-Consumer (SPSC)</h4>
              <p class="topic-desc">
                In high-frequency trading (HFT) and audio DSP engines (like the LMAX Disruptor), locks (mutexes) destroy latency. A circular queue where one thread exclusively writes to <code>rear</code> and another exclusively reads from <code>front</code> requires <strong>zero synchronization locks</strong>!
              </p>
              <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.06); padding: 0.75rem; border-radius: 6px; margin: 0.5rem 0; font-size: 0.78rem; line-height: 1.5; color: var(--text-secondary);">
                <strong>Cache Padding:</strong> <code>front</code> and <code>rear</code> indices must be padded with 64 bytes of unused space to avoid false sharing across CPU cores!
              </div>
            </div>
            <div class="concept-topic-group">
              <h4 class="topic-heading topic-cyan">2. Breadth-First Search (BFS) & Shortest Path</h4>
              <p class="topic-desc">
                Dijkstra and Unweighted Shortest Path algorithms strictly depend on FIFO queues. Processing graph vertices in layer-by-layer order guarantees that when a target node is visited, it is reached via the minimal number of edge hops.
              </p>
            </div>
          </div>
        </div>

        <!-- Real-World Engineering Applications -->
        <div class="concept-card" style="margin-top: 1.25rem;">
          <h3 class="concept-card-title text-purple">[Real-World Systems Engineering Applications]</h3>
          <p class="concept-card-sub">Where Queue architectures drive large-scale distributed systems:</p>
          <div class="real-life-apps-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.85rem; margin-top: 0.75rem;">
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #fbbf24; font-size: 0.85rem;">OS CPU Process Scheduling</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">Operating system runqueues schedule threads across CPU cores using multi-level feedback FIFO queues.</p>
            </div>
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #38bdf8; font-size: 0.85rem;">Distributed Message Brokers</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">Apache Kafka and RabbitMQ decouple microservices via persistent append-only FIFO partition logs.</p>
            </div>
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #34d399; font-size: 0.85rem;">Web Server Request Buffering</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">Nginx and Netty place inbound TCP socket connections into worker queues to absorb traffic spikes without crashing.</p>
            </div>
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.85rem; border-radius: 8px;">
              <strong style="color: #c084fc; font-size: 0.85rem;">Print & Render Spoolers</strong>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">Printers buffer document print jobs in FIFO order, ensuring print tasks finish in sequence.</p>
            </div>
          </div>
        </div>
      </section>
    `;
    this.container.style.display = 'block';
    this.bindJavaIdeEvents(JAVA_QUEUE_IDE_FILES);
  }

  renderStringGuide() {
    if (!this.container) return;
    this.activeTopic = 'string-ops';
    this.activeIdeFileId = 'string-algorithms';

    this.container.innerHTML = `
      <section class="concept-guide-wrapper">
        <div class="concept-header-card">
          <div class="concept-tag-row">
            <span class="concept-pill-badge">INTERACTIVE CONCEPT GUIDE</span>
            <span class="concept-meta-note">Explore UTF-16 character arrays, String Pool immutability, and two-pointer algorithms.</span>
          </div>
          <h2 class="concept-main-title">String Algorithms & Memory Architecture</h2>
          <div class="concept-badge-chips">
            <span class="chip-badge chip-amber">UTF-16 Char Vector</span>
            <span class="chip-badge chip-green">String Pool Immutability</span>
            <span class="chip-badge chip-purple">Two-Pointer O(N)</span>
          </div>
          <p class="concept-lead-text">
            In Java and modern runtimes, <strong>Strings</strong> are immutable sequences of 16-bit Unicode characters. String manipulation relies on the <strong>Two-Pointer technique</strong> for in-place reversals and palindrome symmetry, and sliding windows for substring pattern matching.
          </p>
        </div>

        <div class="concept-card" style="margin-top: 1.25rem;">
          <div class="card-header-with-action">
            <h3 class="concept-card-title text-amber">[Core Java String Studio (IDE)]</h3>
            <span class="chip-badge chip-green" style="font-size: 0.75rem; font-family: var(--font-mono);">Java 21 (Core DSA)</span>
          </div>
          ${this.renderJavaIdeWindow(JAVA_STRING_IDE_FILES, this.activeIdeFileId)}
        </div>
      </section>
    `;
    this.container.style.display = 'block';
    this.bindJavaIdeEvents(JAVA_STRING_IDE_FILES);
  }

  renderJavaIdeWindow(filesList = JAVA_LL_IDE_FILES, activeFileId = null) {
    const file = filesList.find(f => f.id === activeFileId) || filesList[0];
    const lineNumbers = generateLineNumbersHtml(file.code);
    const highlightedCode = highlightJavaCode(file.code);
    const lineCount = file.code.split('\n').length;

    return `
      <div class="ide-window" id="java-dsa-ide">
        <div class="ide-topbar">
          <div class="ide-controls-group">
            <div class="ide-window-dots">
              <span class="ide-dot dot-red"></span>
              <span class="ide-dot dot-yellow"></span>
              <span class="ide-dot dot-green"></span>
            </div>
            
            <div class="ide-file-tabs" id="ide-file-tabs">
              ${filesList.map(f => `
                <button class="ide-tab-btn ${f.id === file.id ? 'active' : ''}" data-file-id="${f.id}" title="${f.title}">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  ${f.name}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="ide-meta-actions">
            <span class="ide-complexity-badge" id="ide-badge-complexity">${file.complexity}</span>
            <button class="ide-copy-btn" id="ide-btn-copy" title="Copy Java source to clipboard">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span id="ide-copy-label">Copy Code</span>
            </button>
          </div>
        </div>

        <div class="ide-editor-container">
          <div class="ide-line-numbers" id="ide-line-numbers">${lineNumbers}</div>
          <pre class="ide-code-viewport" id="ide-code-viewport"><code>${highlightedCode}</code></pre>
        </div>

        <div class="ide-footer-bar">
          <div class="ide-footer-left">
            <span style="color: #38bdf8; font-weight: 700;">Java 21</span>
            <span>•</span>
            <span id="ide-footer-note" class="ide-footer-note">${file.note}</span>
          </div>
          <div class="ide-footer-right">
            <span id="ide-footer-lines">Lines: ${lineCount}</span>
            <span id="ide-footer-space" style="color: #a855f7;">Space: ${file.space}</span>
            <span>UTF-8</span>
          </div>
        </div>
      </div>
    `;
  }

  bindConceptGuideTabEvents() {
    if (!this.container) return;
    const tabs = this.container.querySelectorAll('.concept-nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');
        if (!targetId) return;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const panes = this.container.querySelectorAll('.concept-pane');
        panes.forEach(pane => {
          pane.classList.remove('active');
          if (pane.id === targetId) {
            pane.classList.add('active');
          }
        });
      });
    });
  }

  bindJavaIdeEvents(filesList = JAVA_LL_IDE_FILES) {
    const tabsContainer = document.getElementById('ide-file-tabs');
    const viewport = document.getElementById('ide-code-viewport');
    const lineNumbers = document.getElementById('ide-line-numbers');
    const badgeComplexity = document.getElementById('ide-badge-complexity');
    const footerNote = document.getElementById('ide-footer-note');
    const footerLines = document.getElementById('ide-footer-lines');
    const footerSpace = document.getElementById('ide-footer-space');
    const btnCopy = document.getElementById('ide-btn-copy');
    const copyLabel = document.getElementById('ide-copy-label');

    if (!tabsContainer) return;

    tabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.ide-tab-btn');
      if (!btn) return;

      const fileId = btn.getAttribute('data-file-id');
      const file = filesList.find(f => f.id === fileId);
      if (!file) return;

      this.activeIdeFileId = fileId;

      tabsContainer.querySelectorAll('.ide-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (viewport) viewport.innerHTML = `<code>${highlightJavaCode(file.code)}</code>`;
      if (lineNumbers) lineNumbers.innerHTML = generateLineNumbersHtml(file.code);
      if (badgeComplexity) badgeComplexity.textContent = file.complexity;
      if (footerNote) footerNote.textContent = file.note;
      if (footerLines) footerLines.textContent = `Lines: ${file.code.split('\n').length}`;
      if (footerSpace) footerSpace.textContent = `Space: ${file.space}`;
    });

    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        const file = filesList.find(f => f.id === this.activeIdeFileId) || filesList[0];
        navigator.clipboard.writeText(file.code).then(() => {
          if (copyLabel) copyLabel.textContent = 'Copied!';
          setTimeout(() => { if (copyLabel) copyLabel.textContent = 'Copy Code'; }, 2000);
        }).catch(() => {
          if (copyLabel) copyLabel.textContent = 'Failed';
        });
      });
    }
  }

  renderSortingGuide(algo = 'bubble-sort') {
    if (!this.container) return;
    this.activeTopic = algo;

    const ALGO_METADATA = {
      'bubble-sort': {
        name: 'Bubble Sort (Sinking Sort)',
        category: 'Comparison Sorting',
        badgeColor: 'chip-amber',
        lead: 'Bubble Sort repeatedly steps through the list, compares adjacent element pairs, and swaps them if they are in the wrong order. After pass k, the k-th largest element is guaranteed to have "bubbled up" to its final sorted index at the end.',
        bestTime: 'O(N)',
        avgTime: 'O(N²)',
        worstTime: 'O(N²)',
        space: 'O(1) Auxiliary',
        stable: 'Yes (Stable)',
        adaptive: 'Yes (with boolean swapped flag)',
        javaCode: `// Bubble Sort with O(N) Early-Termination Optimization
public class BubbleSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap adjacent elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no swaps occurred in pass, array is already sorted
            if (!swapped) break; // O(N) Best Case
        }
    }
}`
      },
      'selection-sort': {
        name: 'Selection Sort',
        category: 'In-Place Comparison Sorting',
        badgeColor: 'chip-purple',
        lead: 'Selection Sort divides the array into a sorted prefix on the left and an unsorted suffix on the right. In each pass i, it scans the entire remaining unsorted range to find the absolute minimum value and performs a single swap to place it at index i.',
        bestTime: 'O(N²)',
        avgTime: 'O(N²)',
        worstTime: 'O(N²)',
        space: 'O(1) Auxiliary',
        stable: 'No (Unstable)',
        adaptive: 'No (Always scans remaining elements)',
        javaCode: `// Selection Sort: Minimum Element Selection Per Pass
public class SelectionSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j; // Track index of minimum element
                }
            }
            // Perform single swap per pass
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`
      },
      'insertion-sort': {
        name: 'Insertion Sort',
        category: 'Incremental Insertion Sorting',
        badgeColor: 'chip-green',
        lead: 'Insertion Sort builds the final sorted array one element at a time, identical to how people sort playing cards in hand. For each element at index i, it shifts all greater elements in the sorted prefix right by 1 index and inserts the element into its exact position.',
        bestTime: 'O(N)',
        avgTime: 'O(N²)',
        worstTime: 'O(N²)',
        space: 'O(1) Auxiliary',
        stable: 'Yes (Stable)',
        adaptive: 'Yes (Optimal for nearly sorted data)',
        javaCode: `// Insertion Sort: Prefix Right-Shift & Key Insertion
public class InsertionSort {
    public static void sort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            // Shift elements of arr[0..i-1] that are greater than key
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j]; // Shift right
                j--;
            }
            arr[j + 1] = key; // Insert into correct slot
        }
    }
}`
      },
      'merge-sort': {
        name: 'Merge Sort (Divide & Conquer)',
        category: 'Divide & Conquer Sorting',
        badgeColor: 'chip-cyan',
        lead: 'Merge Sort recursively splits the array into two equal halves until reaching single-element subarrays (Divide phase), then merges adjacent sorted halves using a two-pointer scan (Conquer & Combine phase). It guarantees strict O(N log N) runtime in all cases.',
        bestTime: 'O(N log N)',
        avgTime: 'O(N log N)',
        worstTime: 'O(N log N)',
        space: 'O(N) Auxiliary Buffer',
        stable: 'Yes (Stable)',
        adaptive: 'No (Always executes log N levels)',
        javaCode: `// Merge Sort: Divide & Conquer with O(N log N) Guarantee
public class MergeSort {
    public static void sort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2; // Midpoint without overflow
            sort(arr, l, m);        // Divide Left
            sort(arr, m + 1, r);    // Divide Right
            merge(arr, l, m, r);    // Combine & Sort
        }
    }

    private static void merge(int[] arr, int l, int m, int r) {
        int[] left = java.util.Arrays.copyOfRange(arr, l, m + 1);
        int[] right = java.util.Arrays.copyOfRange(arr, m + 1, r + 1);
        int i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
            arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
        }
        while (i < left.length) arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
    }
}`
      },
      'quick-sort': {
        name: 'Quick Sort (Partitioning & Pivot)',
        category: 'Divide & Conquer In-Place Sorting',
        badgeColor: 'chip-amber',
        lead: 'Quick Sort picks an element as a pivot (e.g. Lomuto partition uses last element) and rearranges the array so all elements smaller than pivot precede it and larger follow it. It then recursively partitions the sub-arrays on both sides in-place without auxiliary arrays.',
        bestTime: 'O(N log N)',
        avgTime: 'O(N log N)',
        worstTime: 'O(N²)',
        space: 'O(log N) Call Stack',
        stable: 'No (Unstable)',
        adaptive: 'No (Worst case on pre-sorted arrays without random pivot)',
        javaCode: `// Quick Sort: Lomuto In-Place Partitioning Scheme
public class QuickSort {
    public static void sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            sort(arr, low, pi - 1);  // Recurse Left
            sort(arr, pi + 1, high); // Recurse Right
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Lomuto Pivot
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }
}`
      },
      'linear-search': {
        name: 'Linear Search (Sequential Scan)',
        category: 'Searching Algorithm',
        badgeColor: 'chip-green',
        lead: 'Linear Search sequentially checks each element in the collection from index 0 to n - 1 until a match is found or the end is reached. It requires zero preprocessing and works on both unsorted and sorted datasets.',
        bestTime: 'O(1) (Found at index 0)',
        avgTime: 'O(N)',
        worstTime: 'O(N) (Not found / at tail)',
        space: 'O(1) Auxiliary',
        stable: 'N/A',
        adaptive: 'No',
        javaCode: `// Linear Search: Unsorted Sequential Scan
public class LinearSearch {
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Match found at index i
            }
        }
        return -1; // Target does not exist
    }
}`
      },
      'binary-search': {
        name: 'Binary Search (Logarithmic Halving)',
        category: 'Divide & Conquer Searching',
        badgeColor: 'chip-cyan',
        lead: 'Binary Search operates on a pre-sorted array by repeatedly halving the search range. It computes mid = left + (right - left) / 2 and discards the half that cannot contain the target, achieving lightning-fast O(log N) lookups.',
        bestTime: 'O(1) (Found at midpoint)',
        avgTime: 'O(log N)',
        worstTime: 'O(log N)',
        space: 'O(1) Iterative Auxiliary',
        stable: 'N/A',
        adaptive: 'Requires Pre-Sorted Array',
        javaCode: `// Binary Search: O(log N) Search on Sorted Array
public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            // Safe midpoint calculation preventing 32-bit integer overflow
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1; // Target not found
    }
}`
      },
      'recursion-ops': {
        name: 'Recursion — Call Stack & Tree Decomposition',
        category: 'Core Programming Paradigm',
        badgeColor: 'chip-purple',
        lead: 'Recursion is a programming technique where a function calls itself with a smaller sub-problem until it reaches a base case. Every recursive call creates a new activation frame on the OS call stack. Linear recursion (Factorial) builds a single chain; tree recursion (Fibonacci) branches into exponentially growing sub-trees.',
        bestTime: 'O(N) — Linear (Factorial)',
        avgTime: 'O(N) — O(2ⁿ) for Fibonacci',
        worstTime: 'O(2ⁿ) — Exponential without memoization',
        space: 'O(N) — Call Stack Depth',
        stable: 'N/A',
        adaptive: 'Optimizable with Memoization (Dynamic Programming)',
        javaCode: `// Factorial: Linear Recursion — O(N) Time, O(N) Space
public class Recursion {
    // Base case: 0! = 1, Recursive case: n! = n * (n-1)!
    public static long factorial(int n) {
        if (n <= 1) return 1;       // Base Case (unwind starts here)
        return n * factorial(n - 1); // Recursive call — new stack frame
    }

    // Fibonacci: Tree Recursion — O(2^n) Time, O(N) Space
    public static int fibonacci(int n) {
        if (n <= 1) return n;          // Base Case: fib(0)=0, fib(1)=1
        return fibonacci(n - 1)        // Left subtree branch
             + fibonacci(n - 2);       // Right subtree branch
    }

    public static void main(String[] args) {
        System.out.println(factorial(5));  // 120
        System.out.println(fibonacci(6));  // 8
    }
}`
      }
    };

    const info = ALGO_METADATA[algo] || ALGO_METADATA['bubble-sort'];

    this.container.innerHTML = `
      <section class="concept-guide-wrapper" style="margin-top: 2rem;">
        <div class="concept-header-card">
          <div class="concept-tag-row">
            <span class="concept-pill-badge">${info.category.toUpperCase()}</span>
            <span class="concept-meta-note">Theoretical bounds, stability properties, and LeetCode standard Java implementation.</span>
          </div>
          <h2 class="concept-main-title">${info.name}</h2>
          <div class="concept-badge-chips">
            <span class="chip-badge ${info.badgeColor}">Time: ${info.avgTime}</span>
            <span class="chip-badge chip-purple">Space: ${info.space}</span>
            <span class="chip-badge chip-green">Stability: ${info.stable}</span>
          </div>
          <p class="concept-lead-text">
            ${info.lead}
          </p>
        </div>

        <div class="concept-two-col-grid" style="margin-top: 1.25rem;">
          <!-- Asymptotic Bounds Card -->
          <div class="concept-card">
            <h3 class="concept-card-title text-emerald">[Asymptotic Complexity Matrix]</h3>
            <div class="complexity-table-list">
              <div class="complexity-row"><span class="comp-op">Best-Case Time</span><span class="comp-desc">Ideal input configuration</span><span class="comp-val val-o1">${info.bestTime}</span></div>
              <div class="complexity-row"><span class="comp-op">Average-Case Time</span><span class="comp-desc">Random permutation average</span><span class="comp-val val-on">${info.avgTime}</span></div>
              <div class="complexity-row"><span class="comp-op">Worst-Case Time</span><span class="comp-desc">Adversarial input configuration</span><span class="comp-val val-on">${info.worstTime}</span></div>
              <div class="complexity-row"><span class="comp-op">Auxiliary Space</span><span class="comp-desc">Extra memory beyond input</span><span class="comp-val val-o1">${info.space}</span></div>
              <div class="complexity-row"><span class="comp-op">Algorithm Stability</span><span class="comp-desc">Preserves equal key relative order</span><span class="comp-val val-o1">${info.stable}</span></div>
            </div>
          </div>

          <!-- Java Code Card -->
          <div class="concept-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <h3 class="concept-card-title text-amber">[Java 21 Implementation]</h3>
              <span class="chip-badge chip-green" style="font-size: 0.72rem; font-family: var(--font-mono);">JDK 21</span>
            </div>
            <pre style="background: rgba(10, 10, 15, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 0;"><code class="code-snippet-box" style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.5; color: #e2e8f0;">${highlightJavaCode(info.javaCode)}</code></pre>
          </div>
        </div>
      </section>
    `;
    this.container.style.display = 'block';
  }

  hide() {
    if (this.container) {
      this.container.style.display = 'none';
      this.container.innerHTML = '';
    }
  }
}
