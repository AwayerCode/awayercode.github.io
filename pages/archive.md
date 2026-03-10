---
layout: default
title: Archive
permalink: /archive/
---

<div class="page">
  <header class="page-header">
    <h1 class="page-title">Archive</h1>
    <p class="page-description">All posts organized by year</p>
  </header>

  <div class="page-content">
    <ul class="archive-list">
      {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
      {% for year in posts_by_year %}
        <li>
          <h2 class="archive-year">{{ year.name }}</h2>
          <ul class="year-posts">
            {% for post in year.items %}
            <li class="archive-item">
              <span class="archive-date">{{ post.date | date: "%b %d" }}</span>
              <a class="archive-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </li>
            {% endfor %}
          </ul>
        </li>
      {% endfor %}
    </ul>
  </div>
</div>