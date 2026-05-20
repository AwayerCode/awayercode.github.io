# awayercode.github.io

`Awayer's Blog` 的公开站点仓库。

## 约定

- 站点技术栈使用 `Astro`
- 文章内容由私有仓 `Knowledge/5-Public/` 同步而来
- 这个仓库不作为正文写作入口

## 本地开发

```bash
npm install
npm run dev
```

## 内容同步

由私有仓脚本 `.scripts/publish-public-site.sh` 负责把 `5-Public/` 同步到：

- `src/content/posts/`
- `public/posts/`
