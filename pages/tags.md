---
layout: default
title: Tags
permalink: /tags/
---

<div class="page">
  <header class="page-header">
    <h1 class="page-title">Tags</h1>
    <p class="page-description">Browse posts by tag</p>
  </header>

  <div class="page-content">
    <div class="tag-cloud">
      {% assign sorted_tags = site.tags | sort %}
      {% for tag in sorted_tags %}
        <a href="#{{ tag[0] }}" class="tag-item">
          {{ tag[0] }}
          <span class="tag-count">({{ tag[1].size }})</span>
        </a>
      {% endfor %}
    </div>

    {% for tag in sorted_tags %}
    <section id="{{ tag[0] }}" class="tag-section">
      <h2>{{ tag[0] }}</h2>
      <ul class="post-list">
        {% for post in tag[1] %}
        <li class="post-item">
          <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </li>
        {% endfor %}
      </ul>
    </section>
    {% endfor %}
  </div>
</div>

<style>
  .tag-section {
    margin-bottom: 3rem;

    h2 {
      border-bottom: 2px solid var(--accent-color);
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }

    .post-item {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.75rem;
      align-items: baseline;
    }

    .post-date {
      color: var(--text-muted);
      font-size: 0.875rem;
      min-width: 100px;
    }

    a {
      color: var(--text-color);

      &:hover {
        color: var(--accent-color);
      }
    }
  }
</style>