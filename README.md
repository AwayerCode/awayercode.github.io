# awayercode.github.io

公开博客站点，视觉基于官方 `Astronano` 模板。

## 内容来源

- 正文写作发生在私有仓 `Knowledge`
- 只有进入 `Knowledge/5-Public/` 的文章会发布到这里
- 公开仓不作为正文写作入口

## 本地开发

```bash
npm install
npm run dev
```

## 发布方式

由私有仓脚本 `Knowledge/.scripts/publish-public-site.sh` 同步文章到：

- `src/content/blog/<slug>/index.md`
- `src/content/blog/<slug>/` 下的同目录素材
