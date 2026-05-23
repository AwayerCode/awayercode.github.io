---
title: "把私有知识写成公开文章的第一步"
excerpt: "Awayer's Blog 的首篇试运行文章，用来验证私有仓到公开博客的发布链路。"
publishDate: 2026-05-20
tags:
  - setup
  - writing
seo:
  description: "Awayer's Blog 的首篇试运行文章，用来验证私有仓到公开博客的发布链路。"
  image:
    src: "../../assets/blog/launching-awayer-blog/cover.svg"
    alt: "Awayer Blog 的首篇公开文章封面"
  pageType: article
isFeatured: false
---

把公开写作和内部知识写作拆开之后，整个流程会清晰很多：

- 私有仓继续保存完整上下文
- `5-Public/` 只保留准备公开发布的文章
- 公开仓只负责站点呈现和部署

![文章封面](../../assets/blog/launching-awayer-blog/cover.svg)

这套链路的目标不是“把知识库全部搬上网”，而是保留一个明确的发布边界：

1. 先在私有仓完成内容整理
2. 再挑出值得公开的文章
3. 通过发布脚本同步到公开博客

后续这个博客会逐步补齐首页编排、标签页、封面图和更完整的视觉表达，但第一步先把内容和站点分层做好。
