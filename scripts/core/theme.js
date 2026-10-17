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
    const sunSvg = `<svg class="theme-toggle-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonSvg = `<svg class="theme-toggle-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    button.innerHTML = `${isDark ? sunSvg : moonSvg} <span>${isDark ? 'Light Mode' : 'Dark Mode'}</span>`;
  }
}
