---
layout: default
title: Search
permalink: /search/
---

<div class="page">
  <header class="page-header">
    <h1 class="page-title">Search</h1>
    <p class="page-description">Search through all blog posts</p>
  </header>

  <div class="page-content">
    <div class="search-container">
      <input
        type="text"
        id="search-input"
        class="search-input"
        placeholder="Type to search..."
        autocomplete="off"
        aria-label="Search"
      />
    </div>

    <div id="search-results" class="search-results"></div>
  </div>
</div>

<style>
  .search-container {
    margin-bottom: 2rem;
  }

  .search-input {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1.125rem;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    background-color: var(--bg-secondary);
    color: var(--text-color);
    transition: border-color 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--accent-color);
  }

  .search-input::placeholder {
    color: var(--text-muted);
  }

  .search-summary {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    font-size: 0.9375rem;
  }

  .search-result {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-light);

    h3 {
      margin-bottom: 0.5rem;
    }

    h3 a {
      color: var(--text-color);

      &:hover {
        color: var(--accent-color);
      }
    }
  }

  .search-excerpt {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    margin-bottom: 0.5rem;
  }

  .search-meta {
    display: flex;
    gap: 0.75rem;
    align-items: center;

    time {
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .category {
      background-color: var(--border-light);
      padding: 0.125rem 0.5rem;
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
    }
  }
</style>