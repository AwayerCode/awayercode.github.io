# Content Rules

这个文件定义了本仓库的内容填充规则。后续任何 agent 在新增或更新内容时，都应以本文件和 `src/content.config.ts` 为准。

## 总原则

- 不要修改页面结构、组件结构或路由规则，除非明确要求。
- 内容只填充到既定目录，不要创建新的 collection。
- 日期使用 ISO 格式的自然日期：
  - `2026-05-23`
- 正文默认使用 Markdown；确有需要时可以使用 MDX。
- 若没有必要，不要填写可选字段。
- 图片如果出现在 content collection 的 frontmatter 里，必须放在 `src/assets/` 中，并使用相对路径引用。
- 图片资源按用途分目录存放，使用扁平结构，避免多余中间层级：
  - 文章图片：`src/assets/blog/<article-slug>/`
  - 项目图片：`src/assets/projects/<project-slug>/`
  - 站点级图片（图标、Logo 等）：`src/assets/icons/` 或直接放在 `src/assets/`

## 内容入口

- 文章：`src/content/blog/`
- 项目：`src/content/projects/`
- About Me：`src/content/pages/about.md`

## 文章规则

每篇文章对应 `src/content/blog/` 下的一个 `.md` 或 `.mdx` 文件。

### frontmatter 结构

```md
---
title: "文章标题"
excerpt: "列表页摘要，可选"
publishDate: 2026-05-23
updatedDate: 2026-05-24
isFeatured: true
tags:
  - 写作
  - 技术
seo:
  title: "自定义 SEO 标题"
  description: "自定义 SEO 描述，15 到 160 字符之间"
  image:
    src: "../../assets/blog/article-slug/cover.jpg"
    alt: "封面图说明"
  pageType: article
---
```

### 字段说明

- `title`：必填
- `excerpt`：可选，文章列表摘要
- `publishDate`：必填
- `updatedDate`：可选
- `isFeatured`：可选，默认 `false`
  - `true` 时可出现在首页“文章”区块
- `tags`：可选，默认 `[]`
  - 用于标签页
  - 建议使用简短短语
  - 避免同义词重复，如“AI / 人工智能”同时出现
- `seo`：可选
  - 仅在需要覆盖默认标题、描述、分享图时填写

### 文件与命名规则

- 一个文件就是一篇文章
- 文件名会影响路由 slug
- 建议使用英文小写和连字符命名，例如：
  - `writing-systems.md`
  - `agent-workflow.mdx`

### 图片规则

- 文章图片放在 `src/assets/blog/<article-slug>/` 下，每个文章一个目录
- 如果 frontmatter 中使用 `seo.image`，引用路径为 `../../assets/blog/<article-slug>/<filename>`
- 正文中的 Markdown 图片也使用同一目录的相对路径
- 不要在 `src/assets/blog/` 下添加多余的中间目录（如 `knowledge/`、`images/` 等）
- 如果文章不需要图片，可以完全省略

## 项目规则

每个项目对应 `src/content/projects/` 下的一个 `.md` 或 `.mdx` 文件。

### frontmatter 结构

```md
---
title: "项目名称"
description: "项目列表简述，可选"
publishDate: 2026-05-23
isFeatured: true
seo:
  title: "自定义 SEO 标题"
  description: "自定义 SEO 描述，15 到 160 字符之间"
  image:
    src: "../../assets/projects/project-slug/cover.jpg"
    alt: "项目封面图说明"
  pageType: article
---
```

### 字段说明

- `title`：必填
- `description`：可选，显示在项目列表
- `publishDate`：必填
- `isFeatured`：可选，默认 `false`
  - `true` 时可出现在首页“项目”区块
- `seo`：可选

### 文件与命名规则

- 一个文件就是一个项目
- 文件名会影响项目详情页 slug
- 建议使用英文小写和连字符命名，例如：
  - `knowledge-pipeline.md`
  - `public-writing-site.mdx`

### 图片规则

- 项目图片放在 `src/assets/projects/<project-slug>/` 下，每个项目一个目录
- 如果 frontmatter 中使用 `seo.image`，引用路径为 `../../assets/projects/<project-slug>/<filename>`
- 正文中的 Markdown 图片也使用同一目录的相对路径
- 不要在 `src/assets/projects/` 下添加多余的中间目录
- 如果项目没有图片，可完全省略

## About Me 规则

`About Me` 的内容来源是：

- `src/content/pages/about.md`

首页底部的 `About Me` 区块会读取这个文件的正文内容，而不是读取 `src/data/site-config.ts` 中的 `hero` 文案。

### frontmatter 结构

```md
---
title: "About Me"
seo:
  title: "About Me | Awayer"
  description: "关于 Awayer 的简介"
---
```

### 说明

- `title` 必填
- 正文直接写个人介绍内容
- 默认使用中文正文
- `About Me` 这个标题本身保持英文
- 如果暂时没有内容，可以保留空正文

## 空内容时的预期

- 没有文章时：
  - 首页“文章”区块显示空状态
  - `/blog` 页面显示空状态
  - 标签页不应生成无意义标签内容
- 没有项目时：
  - 首页“项目”区块显示空状态
  - `/projects` 页面显示空状态
- `about.md` 正文为空时：
  - 首页 `About Me` 区块显示空状态
  - `/about` 页面也显示空状态

## Agent 操作要求

- 新增文章时：
  - 在 `src/content/blog/` 新建一个 `.md` 或 `.mdx`
  - 按文章 schema 填 frontmatter
- 新增项目时：
  - 在 `src/content/projects/` 新建一个 `.md` 或 `.mdx`
  - 按项目 schema 填 frontmatter
- 修改个人介绍时：
  - 只改 `src/content/pages/about.md`
- 不要把正文写回 `README.md`
- 不要把个人介绍写回 `src/data/site-config.ts`

## 参考来源

- 内容 schema 权威来源：`src/content.config.ts`
- 站点级品牌与导航配置：`src/data/site-config.ts`
