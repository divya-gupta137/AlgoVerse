/**
 * AlgoVerse — Custom Input Panel Controller
 * Handles user custom array input parsing, random array generation, and validation error messages.
 */

export class InputPanelController {
  constructor(onNewDatasetCallback) {
    this.onNewDataset = onNewDatasetCallback;

    // DOM Elements
    this.inputElement = document.getElementById('custom-array-input');
    this.btnApply = document.getElementById('btn-apply-input');
    this.btnRandom = document.getElementById('btn-random-input');
    this.errorElement = document.getElementById('input-error-msg');
  }

  init() {
    if (this.btnApply) {
      this.btnApply.addEventListener('click', () => this.handleCustomInput());
    }

    if (this.btnRandom) {
      this.btnRandom.addEventListener('click', () => this.handleRandomInput());
    }

    if (this.inputElement) {
      this.inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleCustomInput();
        }
      });
    }
  }

  handleCustomInput() {
    this.clearError();
    if (!this.inputElement) return;

    const rawString = this.inputElement.value.trim();

    if (!rawString) {
      this.showError('Please enter numbers separated by commas.');
      return;
    }

    try {
      const parsedArray = rawString
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item => Number(item));

      if (parsedArray.some(num => isNaN(num))) {
        this.showError('Invalid input! Please enter numbers only (e.g. 25, 12, 40, 8).');
        return;
      }

      if (parsedArray.length < 2) {
        this.showError('Please enter at least 2 numbers to visualize.');
        return;
      }

      if (parsedArray.length > 20) {
        this.showError('Maximum 20 numbers allowed for optimal visual layout.');
        return;
      }

      if (parsedArray.some(num => num < 1 || num > 100)) {
        this.showError('Values should be between 1 and 100 for proper bar height scaling.');
        return;
      }

      if (typeof this.onNewDataset === 'function') {
        this.onNewDataset(parsedArray);
      }
    } catch (err) {
      this.showError('Error parsing input. Format: 45, 18, 85, 32');
    }
  }

  handleRandomInput() {
    this.clearError();
    const size = 8;
    const randomArray = [];

    for (let i = 0; i < size; i++) {
      randomArray.push(Math.floor(Math.random() * 85) + 10);
    }

    if (this.inputElement) {
      this.inputElement.value = randomArray.join(', ');
    }

    if (typeof this.onNewDataset === 'function') {
      this.onNewDataset(randomArray);
    }
  }

  showError(msg) {
    if (this.errorElement) {
      this.errorElement.textContent = msg;
      this.errorElement.style.display = 'block';
    }
  }

  clearError() {
    if (this.errorElement) {
      this.errorElement.textContent = '';
      this.errorElement.style.display = 'none';
    }
  }
}
