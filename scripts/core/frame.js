/**
 * AlgoVerse — Frame Generator Helper
 * Creates isolated state snapshots for algorithm steps.
 * 
 * @param {Object} options
 * @param {string} [options.op='step'] - Operation type ('compare', 'swap', 'insert', 'delete', 'visit', etc.)
 * @param {Array|Object} [options.data=[]] - Current state data (array, stack, queue, list)
 * @param {Array<number>} [options.highlights=[]] - Array of indices/node IDs to highlight
 * @param {Object} [options.pointers={}] - Key-value map of pointers (e.g. { i: 0, j: 1, low: 0, high: 9 })
 * @param {Array<Array<number>>|null} [options.subarrays=null] - Divide & Conquer partition ranges (e.g. [[0, 3], [4, 7]])
 * @param {number|null} [options.codeLine=null] - Active line number in snippet
 * @param {string} [options.narration=''] - Plain-English explanation of current step
 * @param {Object} [options.stats={}] - Operation counters (e.g. { comparisons: 4, swaps: 2 })
 * @returns {Object} Immutable Frame snapshot
 */
export function createFrame({
  op = 'step',
  data = [],
  highlights = [],
  pointers = {},
  subarrays = null,
  codeLine = null,
  narration = '',
  stats = {}
}) {
  return {
    op,
    // Deep clone mutable array/object state so future mutations don't alter this snapshot!
    data: typeof data === 'object' && data !== null ? structuredClone(data) : data,
    highlights: [...highlights],
    pointers: { ...pointers },
    subarrays: subarrays ? structuredClone(subarrays) : null,
    codeLine,
    narration,
    stats: { ...stats }
  };
}
