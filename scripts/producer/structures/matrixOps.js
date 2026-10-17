/**
 * AlgoVerse — 2D Matrix (Multidimensional Array) Frame Producer
 * Generates animation frames for 2D Grid Access, Row-Major / Column-Major Traversals,
 * Matrix Transposition, Cell Updates, and 2D Searching.
 */

export function generateMatrixOpsFrames(initialMatrix, opType = 'init', payload = {}) {
  const frames = [];
  const matrix = initialMatrix.map(row => [...row]);
  const rows = matrix.length;
  const cols = matrix[0]?.length || 3;

  function clone(mat) {
    return mat.map(row => [...row]);
  }

  if (opType === 'init') {
    frames.push({
      op: 'init',
      data: clone(matrix),
      activeCell: null,
      activeRow: null,
      activeCol: null,
      swappingCells: [],
      foundCell: null,
      traversalTrail: [],
      narration: `• Ready: 2D Matrix initialized (${rows}×${cols} Grid, ${rows * cols} contiguous memory cells).`,
      stats: { accessCount: 0, swaps: 0 }
    });
    return { frames, updatedMatrix: matrix };
  }

  if (opType === 'access') {
    const r = Math.max(0, Math.min(rows - 1, Number(payload.row) || 0));
    const c = Math.max(0, Math.min(cols - 1, Number(payload.col) || 0));
    const val = matrix[r][c];
    const linearIdx = (r * cols) + c;
    const hexOffset = '0x' + (0x1000 + (linearIdx * 4)).toString(16).toUpperCase();

    // Frame 1: Highlight row & col projected vectors
    frames.push({
      op: 'project',
      data: clone(matrix),
      activeCell: null,
      activeRow: r,
      activeCol: c,
      swappingCells: [],
      foundCell: null,
      traversalTrail: [],
      narration: `Targeting Row [${r}] and Col [${c}]. Calculating memory offset: Index = (${r} × ${cols}) + ${c} = ${linearIdx}.`,
      stats: { accessCount: 1, swaps: 0 }
    });

    // Frame 2: Pinpoint intersection cell
    frames.push({
      op: 'access',
      data: clone(matrix),
      activeCell: { r, c },
      activeRow: r,
      activeCol: c,
      swappingCells: [],
      foundCell: null,
      traversalTrail: [],
      narration: `Direct O(1) Memory Access: matrix[${r}][${c}] = ${val}. Hardware Address: ${hexOffset} (Base + ${linearIdx * 4}B).`,
      stats: { accessCount: 1, swaps: 0 }
    });

    return { frames, updatedMatrix: matrix };
  }

  if (opType === 'update') {
    const r = Math.max(0, Math.min(rows - 1, Number(payload.row) || 0));
    const c = Math.max(0, Math.min(cols - 1, Number(payload.col) || 0));
    const newVal = Number(payload.val) !== undefined && !isNaN(Number(payload.val)) ? Number(payload.val) : 99;
    const oldVal = matrix[r][c];

    frames.push({
      op: 'access',
      data: clone(matrix),
      activeCell: { r, c },
      activeRow: r,
      activeCol: c,
      swappingCells: [],
      foundCell: null,
      traversalTrail: [],
      narration: `Locating cell matrix[${r}][${c}] (Current Value: ${oldVal}) before update.`,
      stats: { accessCount: 1, swaps: 0 }
    });

    matrix[r][c] = newVal;

    frames.push({
      op: 'update',
      data: clone(matrix),
      activeCell: { r, c },
      activeRow: r,
      activeCol: c,
      swappingCells: [],
      foundCell: null,
      traversalTrail: [],
      narration: `✓ Updated matrix[${r}][${c}] = ${newVal} in O(1) time. Direct RAM overwrite.`,
      stats: { accessCount: 2, swaps: 0 }
    });

    return { frames, updatedMatrix: matrix };
  }

  if (opType === 'row-major') {
    const trail = [];
    let count = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        trail.push({ r, c });
        const val = matrix[r][c];
        const linearIdx = (r * cols) + c;
        count++;

        frames.push({
          op: 'scan',
          data: clone(matrix),
          activeCell: { r, c },
          activeRow: r,
          activeCol: c,
          swappingCells: [],
          foundCell: null,
          traversalTrail: [...trail],
          narration: `Row-Major Scan: Row [${r}], Col [${c}] ➔ Value: ${val}. [1D RAM Index: ${linearIdx} (Stride: +1 Contiguous)]`,
          stats: { accessCount: count, swaps: 0 }
        });
      }
    }

    frames.push({
      op: 'finish',
      data: clone(matrix),
      activeCell: null,
      activeRow: null,
      activeCol: null,
      swappingCells: [],
      foundCell: null,
      traversalTrail: [...trail],
      narration: `✓ Completed Row-Major Traversal in O(R × C) time. High CPU cache line utilization due to sequential RAM strides.`,
      stats: { accessCount: count, swaps: 0 }
    });

    return { frames, updatedMatrix: matrix };
  }

  if (opType === 'col-major') {
    const trail = [];
    let count = 0;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        trail.push({ r, c });
        const val = matrix[r][c];
        const linearIdx = (r * cols) + c;
        count++;

        frames.push({
          op: 'scan-col',
          data: clone(matrix),
          activeCell: { r, c },
          activeRow: r,
          activeCol: c,
          swappingCells: [],
          foundCell: null,
          traversalTrail: [...trail],
          narration: `Column-Major Scan: Col [${c}], Row [${r}] ➔ Value: ${val}. [1D RAM Index: ${linearIdx} (Non-contiguous Jump +${cols} Elements)]`,
          stats: { accessCount: count, swaps: 0 }
        });
      }
    }

    frames.push({
      op: 'finish',
      data: clone(matrix),
      activeCell: null,
      activeRow: null,
      activeCol: null,
      swappingCells: [],
      foundCell: null,
      traversalTrail: [...trail],
      narration: `✓ Completed Column-Major Traversal in O(R × C) time. Causes cache line misses in C/Java row-major languages.`,
      stats: { accessCount: count, swaps: 0 }
    });

    return { frames, updatedMatrix: matrix };
  }

  if (opType === 'transpose') {
    let swaps = 0;

    frames.push({
      op: 'init',
      data: clone(matrix),
      activeCell: null,
      activeRow: null,
      activeCol: null,
      swappingCells: [],
      foundCell: null,
      traversalTrail: [],
      narration: `Starting Matrix Transposition (A[i][j] ⟷ A[j][i]). Diagonal elements remain stationary.`,
      stats: { accessCount: 0, swaps: 0 }
    });

    for (let i = 0; i < rows; i++) {
      for (let j = i + 1; j < cols; j++) {
        frames.push({
          op: 'highlight-swap',
          data: clone(matrix),
          activeCell: null,
          activeRow: null,
          activeCol: null,
          swappingCells: [{ r: i, c: j }, { r: j, c: i }],
          foundCell: null,
          traversalTrail: [],
          narration: `Reflecting symmetric cells across diagonal: matrix[${i}][${j}] (${matrix[i][j]}) ⟷ matrix[${j}][${i}] (${matrix[j][i]}).`,
          stats: { accessCount: swaps * 2 + 2, swaps }
        });

        // Swap in place
        const temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
        swaps++;

        frames.push({
          op: 'swapped',
          data: clone(matrix),
          activeCell: null,
          activeRow: null,
          activeCol: null,
          swappingCells: [{ r: i, c: j }, { r: j, c: i }],
          foundCell: null,
          traversalTrail: [],
          narration: `Swapped! matrix[${i}][${j}] is now ${matrix[i][j]} and matrix[${j}][${i}] is now ${matrix[j][i]}.`,
          stats: { accessCount: swaps * 2, swaps }
        });
      }
    }

    frames.push({
      op: 'finish',
      data: clone(matrix),
      activeCell: null,
      activeRow: null,
      activeCol: null,
      swappingCells: [],
      foundCell: null,
      traversalTrail: [],
      narration: `✓ Matrix Transposition Complete! Rows became columns in O(R × C) time with ${swaps} swaps.`,
      stats: { accessCount: swaps * 2, swaps }
    });

    return { frames, updatedMatrix: matrix };
  }

  if (opType === 'search') {
    const target = Number(payload.target) || 56;
    let found = false;
    let steps = 0;
    const trail = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        steps++;
        trail.push({ r, c });
        const val = matrix[r][c];

        if (val === target) {
          frames.push({
            op: 'found',
            data: clone(matrix),
            activeCell: { r, c },
            activeRow: r,
            activeCol: c,
            swappingCells: [],
            foundCell: { r, c },
            traversalTrail: [...trail],
            narration: `✓ TARGET FOUND! matrix[${r}][${c}] === ${target} at 1D RAM Index ${(r * cols) + c}. Found in ${steps} checks.`,
            stats: { accessCount: steps, swaps: 0 }
          });
          found = true;
          break;
        } else {
          frames.push({
            op: 'check',
            data: clone(matrix),
            activeCell: { r, c },
            activeRow: r,
            activeCol: c,
            swappingCells: [],
            foundCell: null,
            traversalTrail: [...trail],
            narration: `Checking matrix[${r}][${c}] = ${val} ≠ ${target}. Continuing search...`,
            stats: { accessCount: steps, swaps: 0 }
          });
        }
      }
      if (found) break;
    }

    if (!found) {
      frames.push({
        op: 'not-found',
        data: clone(matrix),
        activeCell: null,
        activeRow: null,
        activeCol: null,
        swappingCells: [],
        foundCell: null,
        traversalTrail: [...trail],
        narration: `✗ Target ${target} not found after checking all ${steps} elements in O(R × C).`,
        stats: { accessCount: steps, swaps: 0 }
      });
    }

    return { frames, updatedMatrix: matrix };
  }

  // Fallback
  return { frames, updatedMatrix: matrix };
}
