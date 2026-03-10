---
layout: default
title: About
permalink: /about/
---

<div class="page">
  <header class="page-header">
    <h1 class="page-title">About</h1>
  </header>

  <div class="page-content">
    <p>Welcome to my blog! This is a personal space where I share my thoughts on technology, programming, and life.</p>

    <h2>About Me</h2>
    <p>I'm a software developer passionate about building great products and sharing knowledge with the community.</p>

    <h2>Contact</h2>
    <ul>
      <li>GitHub: <a href="https://github.com/{{ site.github_username }}">@{{ site.github_username }}</a></li>
      {% if site.twitter_username %}
      <li>Twitter: <a href="https://twitter.com/{{ site.twitter_username }}">@{{ site.twitter_username }}</a></li>
      {% endif %}
    </ul>

    <h2>About This Blog</h2>
    <p>This blog is built with <a href="https://jekyllrb.com">Jekyll</a> and hosted on <a href="https://pages.github.com">GitHub Pages</a>. It features:</p>
    <ul>
      <li>Clean, minimal design</li>
      <li>Dark mode support</li>
      <li>Full-text search</li>
      <li>RSS feed</li>
      <li>Responsive layout</li>
    </ul>
  </div>
</div>