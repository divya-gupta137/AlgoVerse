/**
 * AlgoVerse — Step Narration Renderer
 * Updates the narrator explanation box for the current frame step.
 */

export class NarrationRenderer {
  constructor(textElement) {
    this.element = textElement;
  }

  update(narrationText) {
    if (!this.element) return;
    this.element.textContent = narrationText || 'Initializing visualization step...';
  }
}
