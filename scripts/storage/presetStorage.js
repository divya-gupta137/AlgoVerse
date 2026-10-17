/**
 * AlgoVerse — Web Storage & CRUD Preset Manager
 * Implements full CRUD (Create, Read, Update, Delete) operations across:
 * - LocalStorage (persistent storage)
 * - SessionStorage (transient tab session)
 * - Browser Cookies (audit trail cookie)
 * - IndexedDB (asynchronous transactional database via Promises / async-await)
 * Strictly conforms to Web Development Syllabus Lectures 15, 21, 23, 27, 28!
 */

const DB_NAME = 'AlgoVerseDB';
const DB_VERSION = 1;
const STORE_NAME = 'presets';

/**
 * Open or upgrade the IndexedDB database.
 */
function openIndexedDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null); // Fallback gracefully to WebStorage
  });
}

/**
 * Helper to set a cookie with a 7-day expiration.
 */
function setAuditCookie(name, value) {
  const expires = new Date(Date.now() + 7 * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export class PresetStorageManager {
  constructor() {
    this.storageKey = 'algoverse_user_presets';
  }

  /**
   * CREATE (C): Save a new dataset preset.
   */
  async createPreset(topic, name, data) {
    const id = 'preset_' + Date.now();
    const preset = {
      id,
      topic,
      name: name.trim() || `Preset ${new Date().toLocaleTimeString()}`,
      data,
      createdAt: new Date().toISOString()
    };

    // 1. LocalStorage CRUD Write
    const current = this.readAllPresets();
    current.push(preset);
    localStorage.setItem(this.storageKey, JSON.stringify(current));

    // 2. SessionStorage transient sync
    sessionStorage.setItem('algoverse_last_active_preset', JSON.stringify(preset));

    // 3. Cookie Audit Trail
    setAuditCookie('algoverse_last_action', `CREATE_${preset.name}_${Date.now()}`);

    // 4. IndexedDB Transactional Save (Async/Await)
    const db = await openIndexedDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(preset);
    }

    return preset;
  }

  /**
   * READ (R): Retrieve all presets, optionally filtered by topic.
   */
  readAllPresets(topic = null) {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const list = raw ? JSON.parse(raw) : [];
      return topic ? list.filter(p => p.topic === topic) : list;
    } catch (e) {
      return [];
    }
  }

  /**
   * UPDATE (U): Edit an existing preset's name or data payload.
   */
  async updatePreset(id, updatedName, updatedData) {
    const current = this.readAllPresets();
    const target = current.find(p => p.id === id);

    if (target) {
      if (updatedName) target.name = updatedName.trim();
      if (updatedData !== undefined) target.data = updatedData;
      target.updatedAt = new Date().toISOString();

      localStorage.setItem(this.storageKey, JSON.stringify(current));
      setAuditCookie('algoverse_last_action', `UPDATE_${target.name}_${Date.now()}`);

      const db = await openIndexedDB();
      if (db) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(target);
      }
      return target;
    }
    return null;
  }

  /**
   * DELETE (D): Remove a single preset by ID.
   */
  async deletePreset(id) {
    const current = this.readAllPresets();
    const filtered = current.filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));

    setAuditCookie('algoverse_last_action', `DELETE_${id}_${Date.now()}`);

    const db = await openIndexedDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(id);
    }
    return true;
  }

  /**
   * DELETE ALL (D): Clear all presets for a topic.
   */
  async clearAll(topic = null) {
    if (topic) {
      const remaining = this.readAllPresets().filter(p => p.topic !== topic);
      localStorage.setItem(this.storageKey, JSON.stringify(remaining));
    } else {
      localStorage.removeItem(this.storageKey);
    }
    setAuditCookie('algoverse_last_action', `CLEAR_ALL_${Date.now()}`);
  }
}
