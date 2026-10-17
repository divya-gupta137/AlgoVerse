/**
 * AlgoVerse — Transport Controls Controller
 * Binds UI buttons (Play, Pause, Step, Speed, Scrubber) to the Player engine.
 */

import { PLAYER_STATE } from '../core/player.js';

export class TransportController {
  constructor(player) {
    this.player = player;

    // DOM Elements
    this.btnPlayPause = document.getElementById('btn-play-pause');
    this.btnStepPrev = document.getElementById('btn-step-prev');
    this.btnStepNext = document.getElementById('btn-step-next');
    this.btnReset = document.getElementById('btn-reset');
    this.selectSpeed = document.getElementById('select-speed');
    this.scrubber = document.getElementById('timeline-scrubber');
    this.stepCounter = document.getElementById('step-counter');
  }

  /**
   * Bind DOM event listeners and register player state callbacks.
   */
  init() {
    // 1. Play / Pause Button Click
    if (this.btnPlayPause) {
      this.btnPlayPause.addEventListener('click', () => {
        this.player.togglePlayPause();
      });
    }

    // 2. Step Backward Button Click
    if (this.btnStepPrev) {
      this.btnStepPrev.addEventListener('click', () => {
        this.player.stepBackward();
      });
    }

    // 3. Step Forward Button Click
    if (this.btnStepNext) {
      this.btnStepNext.addEventListener('click', () => {
        this.player.stepForward();
      });
    }

    // 4. Reset Button Click
    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => {
        this.player.reset();
      });
    }

    // 5. Speed Select Dropdown Change
    if (this.selectSpeed) {
      this.selectSpeed.addEventListener('change', (e) => {
        this.player.setSpeed(e.target.value);
      });
    }

    // 6. Timeline Scrubber Drag / Input
    if (this.scrubber) {
      this.scrubber.addEventListener('input', (e) => {
        this.player.seek(Number(e.target.value));
      });
    }

    // 7. Subscribe to Player State Callback
    this.player.onStateChange = (state) => this.updateStateUI(state);
  }

  /**
   * Update Play/Pause button text & icon according to player state.
   */
  updateStateUI(state) {
    if (!this.btnPlayPause) return;

    if (state === PLAYER_STATE.PLAYING) {
      this.btnPlayPause.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause';
      this.btnPlayPause.classList.add('active');
    } else if (state === PLAYER_STATE.FINISHED) {
      this.btnPlayPause.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Replay';
      this.btnPlayPause.classList.remove('active');
    } else {
      this.btnPlayPause.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 4 20 12 6 20 6 4"/></svg> Play';
      this.btnPlayPause.classList.remove('active');
    }
  }

  /**
   * Update Scrubber Slider max value and current Step Counter text.
   */
  updateFrameUI(currentIndex, totalFrames) {
    const maxIndex = Math.max(0, totalFrames - 1);

    if (this.scrubber) {
      this.scrubber.max = maxIndex;
      this.scrubber.value = currentIndex;
    }

    if (this.stepCounter) {
      this.stepCounter.textContent = totalFrames > 0 
        ? `Step ${currentIndex + 1} of ${totalFrames}` 
        : 'Step 0 of 0';
    }
  }
}
