/**
 * AlgoVerse — Theme Manager (Dark / Light Mode)
 */

import { storage } from './storage.js';

const THEME_STORAGE_KEY = 'algoverse_theme';
const DEFAULT_THEME = 'dark';

export class ThemeManager {
  constructor() {
    this.currentTheme = DEFAULT_THEME;
  }

  /**
   * Initialize theme system on page load.
   */
  init() {
    // 1. Read saved theme from localStorage or fallback to default 'dark'
    this.currentTheme = storage.get(THEME_STORAGE_KEY, DEFAULT_THEME);
    
    // 2. Apply theme attribute to <html> element
    this.applyTheme(this.currentTheme);

    // 3. Bind click event to theme toggle button if present
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleTheme());
      this.updateButtonText(toggleBtn);
    }
  }

  /**
   * Apply data-theme attribute to document root element.
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Switch between dark and light themes.
   */
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    storage.set(THEME_STORAGE_KEY, this.currentTheme);
    
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      this.updateButtonText(toggleBtn);
    }
  }

  /**
   * Update button text and icon dynamically.
   */
  updateButtonText(button) {
    const isDark = this.currentTheme === 'dark';
    button.innerHTML = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}
