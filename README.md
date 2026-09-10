# Awayer Site

这是 Awayer 的公开站点仓库，基于 Astro 构建。

## 内容规则

所有内容填充规则都写在项目根目录的 `RULE.md` 中。

- 新增文章前先读 `RULE.md`
- 新增项目前先读 `RULE.md`
- 修改首页 `About Me` 前先读 `RULE.md`

## 本地开发

所有命令都在项目根目录运行。

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 质量检查与部署

- `npm run check`：检查 Astro 和 TypeScript 类型。
- `npm test`：在临时目录构建测试内容，检查空内容、分页、嵌套路径、数字文件名和标签隔离。
- `npm run build`：构建正式静态站点。
- GitHub Pages 的 Source 使用 **GitHub Actions**，由 `.github/workflows/deploy.yml` 检查、构建并发布，避免分支发布额外触发 Jekyll。
