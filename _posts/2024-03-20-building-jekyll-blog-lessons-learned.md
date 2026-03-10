---
layout: post
title: "Building a Jekyll Blog: Lessons Learned"
date: 2024-03-20 09:00:00 +0800
categories: [development, tutorial]
tags: [jekyll, github-pages, static-site, web-development]
description: "Key lessons and tips from building a Jekyll blog from scratch and deploying to GitHub Pages."
toc: true
---

After building this Jekyll blog from scratch, I wanted to share some key lessons and tips that might help others embarking on a similar journey.

## Getting Started

Jekyll is a static site generator that transforms your plain text into static websites and blogs. It's the engine behind GitHub Pages, making it an excellent choice for personal blogs.

### Installation

Setting up Jekyll locally requires Ruby and Bundler. Here are the essential steps:

```bash
# Install Jekyll and Bundler
gem install jekyll bundler

# Create a new site
jekyll new myblog
cd myblog

# Serve locally
bundle exec jekyll serve
```

Visit `http://localhost:4000` to see your site.

## Configuration Tips

### Essential `_config.yml` Settings

```yaml
title: Your Blog Name
description: A brief description
baseurl: "" # for username.github.io repos
url: "https://yourusername.github.io"

# Permalink structure
permalink: /:year/:month/:day/:title/

# Plugins
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
```

### Collections and Defaults

Define default front matter to avoid repetition:

```yaml
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: true
      toc: true
```

## Theme Development

### Custom vs. Remote Themes

You have three options for theming:

1. **Use a remote theme** - Quick to set up, limited customization
2. **Fork an existing theme** - More control, requires maintenance
3. **Build custom theme** - Full control, more work upfront

For this blog, I chose to build a custom theme to have complete control over the design and functionality.

### Dark Mode Implementation

Here's a simple dark mode toggle implementation:

```javascript
// Check for saved preference or system preference
const theme = localStorage.getItem('theme')
  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', theme);

// Toggle function
toggleButton.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
```

Use CSS custom properties for seamless theming:

```css
:root {
  --bg-color: #fafafa;
  --text-color: #333;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #e4e4e4;
}
```

## Search Implementation

Adding search to a static site can be challenging. I used **Lunr.js** for client-side search:

1. Generate a JSON search index
2. Load it with JavaScript
3. Use Lunr.js to search the index

The search is fast, works offline, and doesn't require any external services.

## Performance Optimization

### Image Optimization

- Use WebP format when possible
- Implement lazy loading: `loading="lazy"`
- Specify image dimensions to prevent layout shift

### CSS/JS Optimization

- Minify assets (Jekyll does this automatically in production)
- Use `defer` or `async` for non-critical scripts
- Inline critical CSS for above-the-fold content

### GitHub Pages Performance

GitHub Pages serves assets with good caching headers. Enable gzip compression by using:

```yaml
# In _config.yml
compress_html:
  clippings: all
  comments: all
  endings: all
  startings: all
```

## Deployment

### GitHub Pages Setup

1. Push to `username.github.io` repository
2. Go to Settings → Pages
3. Select source: Deploy from a branch → main
4. Your site will be available at `https://username.github.io`

### Custom Domain (Optional)

1. Add your domain in the Pages settings
2. Create a `CNAME` file in your repo root with your domain
3. Configure DNS records to point to GitHub

## Conclusion

Building a blog with Jekyll and GitHub Pages is a rewarding experience. You get:

- Free hosting with excellent uptime
- Version control with Git
- Simple Markdown authoring
- Full control over your content and design

The initial setup takes some effort, but the long-term benefits are worth it. Happy blogging!