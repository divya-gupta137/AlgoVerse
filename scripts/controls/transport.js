/*AlgoVerse — Transport Controls Controller Binds UI buttons (Play, Pause, Step, Speed, Scrubber) to the Player engine.*/

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

/*Bind DOM event listeners and register player callbacks.*/
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

    // 7. Subscribe to Player Callbacks
    this.player.onStateChange = (state) => this.updateStateUI(state);
    this.player.onFrameChange = (frame, index, total) => this.updateFrameUI(index, total);
  }

  /**
   * Update Play/Pause button text & icon according to player state.
   */
  updateStateUI(state) {
    if (!this.btnPlayPause) return;

    if (state === PLAYER_STATE.PLAYING) {
      this.btnPlayPause.innerHTML = '⏸️ Pause';
      this.btnPlayPause.classList.add('active');
    } else if (state === PLAYER_STATE.FINISHED) {
      this.btnPlayPause.innerHTML = '🔄 Replay';
      this.btnPlayPause.classList.remove('active');
    } else {
      this.btnPlayPause.innerHTML = '▶️ Play';
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
