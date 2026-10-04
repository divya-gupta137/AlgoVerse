/* AlgoVerse — Reusable Visualization Player Engine Controls frame playback, timing ticks, and state transitions. */

export const PLAYER_STATE = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  FINISHED: 'finished'
};

export class Player {
  constructor() {
    this.frames = [];
    this.currentIndex = 0;
    this.state = PLAYER_STATE.IDLE;
    this.baseDelay = 800; // Default ms per frame
    this.speedMultiplier = 1;
    this.timerId = null;

    // Event Callbacks
    this.onFrameChange = null; // Called whenever current frame updates: (frame, index, total) => {}
    this.onStateChange = null; // Called whenever player state updates: (state) => {}
  }

/*Load new frames into the player and reset index.*/
  loadFrames(frames = []) {
    this.pause();
    this.frames = frames;
    this.currentIndex = 0;
    this.setState(frames.length > 0 ? PLAYER_STATE.PAUSED : PLAYER_STATE.IDLE);
    this.notifyFrameChange();
  }

/*Set player state and trigger listener callback.*/
  setState(newState) {
    this.state = newState;
    if (typeof this.onStateChange === 'function') {
      this.onStateChange(this.state);
    }
  }

/*Calculate effective delay based on speed multiplier.*/
  getIntervalDelay() {
    return Math.max(50, Math.round(this.baseDelay / this.speedMultiplier));
  }

/*Start automatic playback.*/
  play() {
    if (this.frames.length === 0) return;
    if (this.currentIndex >= this.frames.length - 1) {
      this.currentIndex = 0; // Restart if at end
    }

    this.setState(PLAYER_STATE.PLAYING);
    this.startTimer();
  }

/*Pause automatic playback.*/
  pause() {
    this.clearTimer();
    if (this.state === PLAYER_STATE.PLAYING) {
      this.setState(PLAYER_STATE.PAUSED);
    }
  }

/*Toggle between Play and Pause states.*/
  togglePlayPause() {
    if (this.state === PLAYER_STATE.PLAYING) {
      this.pause();
    } else {
      this.play();
    }
  }

/*Move 1 frame forward.*/
  stepForward() {
    this.pause();
    if (this.currentIndex < this.frames.length - 1) {
      this.currentIndex++;
      this.notifyFrameChange();
    } else if (this.currentIndex === this.frames.length - 1) {
      this.setState(PLAYER_STATE.FINISHED);
    }
  }

/*Move 1 frame backward.*/
  stepBackward() {
    this.pause();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      if (this.state === PLAYER_STATE.FINISHED) {
        this.setState(PLAYER_STATE.PAUSED);
      }
      this.notifyFrameChange();
    }
  }

  /**
   * Seek to a specific frame index (from scrubber slider).
   */
  seek(index) {
    const targetIndex = Math.max(0, Math.min(index, this.frames.length - 1));
    this.currentIndex = targetIndex;

    if (this.currentIndex === this.frames.length - 1) {
      this.setState(PLAYER_STATE.FINISHED);
    } else if (this.state === PLAYER_STATE.FINISHED) {
      this.setState(PLAYER_STATE.PAUSED);
    }

    this.notifyFrameChange();
  }

  /**
   * Change playback speed multiplier (0.5x, 1x, 2x, 4x).
   */
  setSpeed(multiplier) {
    this.speedMultiplier = Number(multiplier) || 1;
    if (this.state === PLAYER_STATE.PLAYING) {
      this.startTimer();
    }
  }

  /**
   * Internal timer tick callback.
   */
  tick() {
    if (this.currentIndex < this.frames.length - 1) {
      this.currentIndex++;
      this.notifyFrameChange();
    } else {
      this.clearTimer();
      this.setState(PLAYER_STATE.FINISHED);
    }
  }

  /**
   * Start or restart internal setInterval clock.
   */
  startTimer() {
    this.clearTimer();
    this.timerId = setInterval(() => this.tick(), this.getIntervalDelay());
  }

  /**
   * Clear active timer interval.
   */
  clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Reset player back to initial frame.
   */
  reset() {
    this.pause();
    this.currentIndex = 0;
    this.setState(this.frames.length > 0 ? PLAYER_STATE.PAUSED : PLAYER_STATE.IDLE);
    this.notifyFrameChange();
  }

  /**
   * Trigger frame change callback for renderers.
   */
  notifyFrameChange() {
    const currentFrame = this.frames[this.currentIndex] || null;
    if (typeof this.onFrameChange === 'function') {
      this.onFrameChange(currentFrame, this.currentIndex, this.frames.length);
    }
  }
}
