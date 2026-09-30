/**
 * AlgoVerse — Browser LocalStorage Wrapper Helper
 * 
 * Safe getter and setter functions for browser data persistence.
 */

export const storage = {
  /**
   * Save a key-value pair to localStorage.
   */
  set(key, value) {
    try {
      const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving key "${key}" to localStorage:`, error);
    }
  },

  /**
   * Retrieve a value by key from localStorage.
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      
      try {
        return JSON.parse(item);
      } catch {
        return item; // Plain string value
      }
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return defaultValue;
    }
  },

  /**
   * Remove an item by key from localStorage.
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing key "${key}" from localStorage:`, error);
    }
  }
};
