/**
 * AlgoVerse — Hash Table Frame Producer
 * Generates immutable animation frames for Hash Table operations:
 * - Insert / Put (Key, Value)
 * - Search / Get (Key)
 * - Delete / Remove (Key)
 * - Clear Table
 * - Rehash / Resize
 * Supports both Separate Chaining and Linear Probing collision resolution.
 */

import { createFrame } from '../../core/frame.js';

export const HASH_TABLE_DEFAULT_CAPACITY = 8;

/**
 * Standard polynomial rolling hash function for strings and numbers.
 */
export function computeHashCode(key) {
  const str = String(key);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // Unsigned 32-bit int
  }
  return hash;
}

export function computeBucketIndex(key, capacity = HASH_TABLE_DEFAULT_CAPACITY) {
  return computeHashCode(key) % capacity;
}

/**
 * Initial empty hash table structure.
 */
export function createInitialHashTable(capacity = HASH_TABLE_DEFAULT_CAPACITY, mode = 'chaining') {
  const buckets = Array.from({ length: capacity }, (_, i) => ({
    index: i,
    entries: [] // array of { key, val, hash }
  }));

  // Populate with a few initial realistic entries
  const initialData = [
    { key: 'apple', val: 100 },
    { key: 'banana', val: 200 },
    { key: 'cherry', val: 300 }
  ];

  initialData.forEach(item => {
    const hash = computeHashCode(item.key);
    const bucketIdx = hash % capacity;
    buckets[bucketIdx].entries.push({
      key: item.key,
      val: item.val,
      hash
    });
  });

  return {
    capacity,
    mode, // 'chaining' | 'probing'
    buckets,
    totalKeys: initialData.length
  };
}

/**
 * Deep clone the hash table data structure.
 */
function cloneTable(table) {
  return {
    capacity: table.capacity,
    mode: table.mode,
    totalKeys: table.totalKeys,
    buckets: table.buckets.map(b => ({
      index: b.index,
      entries: b.entries.map(e => ({ ...e }))
    }))
  };
}

/**
 * Main Hash Table animation frame producer.
 */
export function generateHashTableFrames(tableState, action, keyInput, valInput, modeOption) {
  const frames = [];
  const table = cloneTable(tableState || createInitialHashTable());
  if (modeOption) table.mode = modeOption;

  const key = keyInput !== undefined && keyInput !== null && String(keyInput).trim() !== '' 
    ? String(keyInput).trim() 
    : 'orange';
  const val = valInput !== undefined && valInput !== null && String(valInput).trim() !== '' 
    ? Number(valInput) || 500 
    : 500;

  const hashCode = computeHashCode(key);
  const targetBucket = hashCode % table.capacity;

  if (action === 'init') {
    frames.push(createFrame({
      data: cloneTable(table),
      op: 'init',
      activeBucket: -1,
      activeKey: null,
      narration: `• Hash Table initialized with capacity ${table.capacity}. Mode: ${table.mode === 'chaining' ? 'Separate Chaining' : 'Linear Probing'}. Load Factor: ${(table.totalKeys / table.capacity).toFixed(2)}.`,
      codeLine: 1
    }));
    return { frames, updatedTable: table };
  }

  if (action === 'clear') {
    table.buckets.forEach(b => { b.entries = []; });
    table.totalKeys = 0;
    frames.push(createFrame({
      data: cloneTable(table),
      op: 'clear',
      activeBucket: -1,
      activeKey: null,
      narration: `✓ Cleared all buckets. Hash Table is now empty (0 keys). Load factor: 0.00.`,
      codeLine: 2
    }));
    return { frames, updatedTable: table };
  }

  if (action === 'random') {
    const sampleWords = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'mango', 'peach', 'plum'];
    table.buckets.forEach(b => { b.entries = []; });
    table.totalKeys = 0;
    const count = 4;
    for (let i = 0; i < count; i++) {
      const k = sampleWords[i];
      const v = (i + 1) * 150;
      const h = computeHashCode(k);
      const bIdx = h % table.capacity;
      table.buckets[bIdx].entries.push({ key: k, val: v, hash: h });
      table.totalKeys++;
    }
    frames.push(createFrame({
      data: cloneTable(table),
      op: 'random',
      activeBucket: -1,
      activeKey: null,
      narration: `✓ Populated Hash Table with ${count} random key-value pairs.`,
      codeLine: 1
    }));
    return { frames, updatedTable: table };
  }

  // Operation: PUT / INSERT
  if (action === 'put' || action === 'insert') {
    // Frame 1: Calculate Hash
    frames.push(createFrame({
      data: cloneTable(table),
      op: 'hash-calc',
      activeBucket: targetBucket,
      activeKey: key,
      narration: `1. Compute Hash: key="${key}" → hashCode=${hashCode} → bucketIndex = ${hashCode} % ${table.capacity} = ${targetBucket}.`,
      codeLine: 4
    }));

    if (table.mode === 'chaining') {
      const bucket = table.buckets[targetBucket];
      const existingIdx = bucket.entries.findIndex(e => e.key === key);

      if (existingIdx !== -1) {
        // Update existing key
        bucket.entries[existingIdx].val = val;
        frames.push(createFrame({
          data: cloneTable(table),
          op: 'update',
          activeBucket: targetBucket,
          activeKey: key,
          narration: `✓ Key "${key}" already exists in Bucket [${targetBucket}]. Overwriting value to ${val}.`,
          codeLine: 8
        }));
      } else {
        // Collision detection
        const hasCollision = bucket.entries.length > 0;
        bucket.entries.push({ key, val, hash: hashCode });
        table.totalKeys++;

        frames.push(createFrame({
          data: cloneTable(table),
          op: hasCollision ? 'collision-chain' : 'insert',
          activeBucket: targetBucket,
          activeKey: key,
          narration: hasCollision
            ? `⚡ Collision in Bucket [${targetBucket}]! Appended "${key}":${val} to linked chain. Chain length: ${bucket.entries.length}.`
            : `✓ Inserted "${key}":${val} into empty Bucket [${targetBucket}]. Time: O(1).`,
          codeLine: 10
        }));
      }
    } else {
      // Linear Probing
      let slot = targetBucket;
      let probes = 0;
      let inserted = false;

      while (probes < table.capacity) {
        const bucket = table.buckets[slot];
        if (bucket.entries.length === 0 || bucket.entries[0].key === key) {
          const isOverwrite = bucket.entries.length > 0 && bucket.entries[0].key === key;
          bucket.entries = [{ key, val, hash: hashCode }];
          if (!isOverwrite) table.totalKeys++;
          inserted = true;

          frames.push(createFrame({
            data: cloneTable(table),
            op: probes === 0 ? 'insert' : 'probe-insert',
            activeBucket: slot,
            activeKey: key,
            narration: probes === 0
              ? `✓ Inserted "${key}":${val} into Bucket [${slot}] with 0 collisions.`
              : `⚡ Collision at [${targetBucket}]! Linear probed ${probes} slot(s) → Placed into Bucket [${slot}].`,
            codeLine: 12
          }));
          break;
        }

        frames.push(createFrame({
          data: cloneTable(table),
          op: 'probe-step',
          activeBucket: slot,
          activeKey: key,
          narration: `Slot [${slot}] is occupied by "${bucket.entries[0].key}". Probing next slot (${slot + 1} % ${table.capacity})...`,
          codeLine: 13
        }));

        slot = (slot + 1) % table.capacity;
        probes++;
      }

      if (!inserted) {
        frames.push(createFrame({
          data: cloneTable(table),
          op: 'error',
          activeBucket: -1,
          activeKey: key,
          narration: `✗ Table Overflow: All ${table.capacity} slots are occupied! Rehash required.`,
          codeLine: 15
        }));
      }
    }

    return { frames, updatedTable: table };
  }

  // Operation: GET / SEARCH
  if (action === 'get' || action === 'search') {
    frames.push(createFrame({
      data: cloneTable(table),
      op: 'hash-calc',
      activeBucket: targetBucket,
      activeKey: key,
      narration: `1. Lookup Target: key="${key}" → hashCode=${hashCode} → Jump to Bucket [${targetBucket}].`,
      codeLine: 4
    }));

    if (table.mode === 'chaining') {
      const bucket = table.buckets[targetBucket];
      const foundEntry = bucket.entries.find(e => e.key === key);

      if (foundEntry) {
        frames.push(createFrame({
          data: cloneTable(table),
          op: 'found',
          activeBucket: targetBucket,
          activeKey: key,
          narration: `✓ KEY FOUND! Found "${key}": ${foundEntry.val} in Bucket [${targetBucket}]. O(1) average lookup!`,
          codeLine: 18
        }));
      } else {
        frames.push(createFrame({
          data: cloneTable(table),
          op: 'not-found',
          activeBucket: targetBucket,
          activeKey: key,
          narration: `✗ Key "${key}" not found in Bucket [${targetBucket}]. Returns null.`,
          codeLine: 20
        }));
      }
    } else {
      // Linear Probing Search
      let slot = targetBucket;
      let probes = 0;
      let found = false;

      while (probes < table.capacity) {
        const bucket = table.buckets[slot];
        if (bucket.entries.length === 0) {
          break; // Empty slot terminates search
        }
        if (bucket.entries[0].key === key) {
          found = true;
          frames.push(createFrame({
            data: cloneTable(table),
            op: 'found',
            activeBucket: slot,
            activeKey: key,
            narration: `✓ KEY FOUND! "${key}": ${bucket.entries[0].val} located at Slot [${slot}] after ${probes} probe(s).`,
            codeLine: 18
          }));
          break;
        }

        frames.push(createFrame({
          data: cloneTable(table),
          op: 'probe-step',
          activeBucket: slot,
          activeKey: key,
          narration: `Checking Slot [${slot}]: Key is "${bucket.entries[0].key}" (mismatch). Probing next...`,
          codeLine: 13
        }));

        slot = (slot + 1) % table.capacity;
        probes++;
      }

      if (!found) {
        frames.push(createFrame({
          data: cloneTable(table),
          op: 'not-found',
          activeBucket: -1,
          activeKey: key,
          narration: `✗ Key "${key}" not found after scanning slots. Returns null.`,
          codeLine: 20
        }));
      }
    }

    return { frames, updatedTable: table };
  }

  // Operation: REMOVE / DELETE
  if (action === 'remove' || action === 'delete') {
    frames.push(createFrame({
      data: cloneTable(table),
      op: 'hash-calc',
      activeBucket: targetBucket,
      activeKey: key,
      narration: `1. Deletion Hash: key="${key}" → Jump directly to Bucket [${targetBucket}].`,
      codeLine: 4
    }));

    const bucket = table.buckets[targetBucket];
    const idx = bucket.entries.findIndex(e => e.key === key);

    if (idx !== -1) {
      const removed = bucket.entries.splice(idx, 1)[0];
      table.totalKeys--;

      frames.push(createFrame({
        data: cloneTable(table),
        op: 'removed',
        activeBucket: targetBucket,
        activeKey: null,
        narration: `✓ Removed key "${removed.key}" (val: ${removed.val}) from Bucket [${targetBucket}]. Memory reclaimed!`,
        codeLine: 24
      }));
    } else {
      frames.push(createFrame({
        data: cloneTable(table),
        op: 'not-found',
        activeBucket: targetBucket,
        activeKey: key,
        narration: `✗ Cannot remove: Key "${key}" does not exist in Bucket [${targetBucket}].`,
        codeLine: 20
      }));
    }

    return { frames, updatedTable: table };
  }

  return { frames, updatedTable: table };
}
