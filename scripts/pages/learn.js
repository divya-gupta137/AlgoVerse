/* AlgoVerse — Learn Page Dynamic Catalog Controller */

import { CATALOG_ITEMS } from '../registry/catalog.js';

class CatalogController {
  constructor() {
    this.items = CATALOG_ITEMS;
    this.activeCategory = 'all';
    this.searchQuery = '';

    // DOM Elements
    this.gridElement = document.getElementById('catalog-grid');
    this.searchInput = document.getElementById('catalog-search');
    this.pillButtons = document.querySelectorAll('.pill-btn');
    this.counterElement = document.getElementById('results-count');
  }

  init() {
    if (!this.gridElement) return;

    // 1. Initial render
    this.render();

    // 2. Event Listener: Search input typing
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // 3. Event Listener: Category filter pills
    this.pillButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.pillButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        this.activeCategory = e.target.dataset.category || 'all';
        this.render();
      });
    });
  }

  /**
   * Filter catalog items based on active category and search query string.
   */
  getFilteredItems() {
    return this.items.filter(item => {
      const matchesCategory = this.activeCategory === 'all' || item.category === this.activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(this.searchQuery) ||
                            item.description.toLowerCase().includes(this.searchQuery) ||
                            item.category.toLowerCase().includes(this.searchQuery);

      return matchesCategory && matchesSearch;
    });
  }

  /**
   * Render filtered cards into the DOM.
   */
  render() {
    const filteredItems = this.getFilteredItems();

    if (this.counterElement) {
      this.counterElement.textContent = `${filteredItems.length} Topics Available`;
    }

    if (filteredItems.length === 0) {
      this.gridElement.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <h3>No matching algorithms found</h3>
          <p style="margin-top: 0.5rem;">Try searching for "Sorting", "Stack", or "Binary Search".</p>
        </div>
      `;
      return;
    }

    this.gridElement.innerHTML = filteredItems.map(item => `
      <div class="card">
        <div>
          <div class="card-header">
            <h3 class="card-title">${item.title}</h3>
            <span class="badge badge-${item.category}">${item.category}</span>
          </div>
          <p class="card-desc">${item.description}</p>
        </div>
        
        <div class="card-footer">
          <span class="badge badge-complexity">${item.complexity.time}</span>
          <a href="${item.url}" class="btn btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.85rem;">
            Visualize ⚡
          </a>
        </div>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const catalog = new CatalogController();
  catalog.init();
});
