---
layout: post
title: "Markdown Format Test"
date: 2024-03-15 14:30:00 +0800
categories: [tutorial]
tags: [markdown, formatting, test]
description: "A test post demonstrating various Markdown formatting options and syntax highlighting."
toc: true
---

This post demonstrates various Markdown formatting options available in this blog.

## Headings

# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading

## Text Formatting

You can make text **bold**, *italic*, or ~~strikethrough~~. You can also create [links](https://example.com) and highlight `inline code`.

## Blockquotes

> This is a blockquote. It can contain multiple paragraphs and **formatted text**.
>
> > This is a nested blockquote.

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered Lists

1. First step
2. Second step
   1. Sub-step
   2. Another sub-step
3. Final step

## Code Blocks

### Python

```python
def hello_world():
    """A simple greeting function."""
    message = "Hello, World!"
    print(message)
    return message

if __name__ == "__main__":
    hello_world()
```

### JavaScript

```javascript
// A simple greeting function
function greet(name) {
  const greeting = `Hello, ${name}!`;
  console.log(greeting);
  return greeting;
}

greet('World');
```

### Bash

```bash
#!/bin/bash
# A simple shell script

echo "Setting up the project..."
npm install
echo "Done!"
```

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Dark Mode | ✅ Complete | Toggle with theme button |
| Search | ✅ Complete | Powered by Lunr.js |
| RSS Feed | ✅ Complete | Auto-generated |
| Comments | 🚧 Planned | Coming soon |

## Horizontal Rule

---

## Task Lists

- [x] Write first blog post
- [x] Set up Jekyll
- [x] Configure dark mode
- [x] Add search functionality
- [ ] Write more posts
- [ ] Add comments

## Math (if MathJax is enabled)

Inline math: $E = mc^2$

Block math:

$$
\frac{d}{dx}\left( \int_{a}^{x} f(t) \, dt \right) = f(x)
$$

## Emojis

You can use emojis: 🎉 🚀 💻 ✨ 📝

## That's It!

This covers most of the common Markdown features. Happy writing!