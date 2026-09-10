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

## 界面语言

右上角主题按钮旁的 `EN` / `中` 切换中英文界面，默认中文，选择保存在浏览器中并在刷新、站内跳转后保持。导航、页面标题、空状态、日期、分页和按钮提示随之切换；文章、项目及个人介绍正文保持作者原文，不自动翻译。静态 URL、RSS 和搜索引擎默认内容保持不变。

界面翻译集中在 `src/utils/i18n.ts`；静态文案使用 `Localized` 组件，动态文案提供中英文文本。
