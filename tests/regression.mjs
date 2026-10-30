import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const temp = mkdtempSync(join(tmpdir(), 'blog-regression-'));
const read = (path) => readFileSync(join(temp, 'dist', path), 'utf8');
const build = (success = true) => {
    const run = spawnSync(process.execPath, ['node_modules/astro/astro.js', 'build'], {
        cwd: temp, encoding: 'utf8', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }
    });
    const output = run.stdout + run.stderr;
    assert.equal(run.status === 0, success, output);
    return output;
};
const entry = (collection, id, title, tags = []) => {
    const file = join(temp, 'src/content', collection, `${id}.md`);
    mkdirSync(resolve(file, '..'), { recursive: true });
    writeFileSync(file, `---\ntitle: "${title}"\npublishDate: 2026-05-23\ntags: ${JSON.stringify(tags)}\n---\n\nBody of ${title}.\n`);
};
const nav = (html, href) => [...html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag).find((tag) => tag.includes(`href="${href}"`));
try {
    // Copy dependencies too: symlinking Astro across project roots breaks its compiler cache.
    for (const path of ['src', 'public', 'node_modules', 'astro.config.mjs', 'tsconfig.json', 'package.json']) {
        cpSync(join(root, path), join(temp, path), { recursive: true });
    }
    for (const collection of ['blog', 'projects', 'pages']) {
        rmSync(join(temp, 'src/content', collection), { recursive: true, force: true });
        mkdirSync(join(temp, 'src/content', collection));
    }
    writeFileSync(join(temp, 'src/content/pages/about.md'), '---\ntitle: About Me\n---\n');
    build();
    assert.match(read('index.html'), /暂无文章/);
    assert.match(read('projects/index.html'), /暂无项目/);
    assert.match(read('tags/index.html'), /url=\/blog\//);
    assert.match(read('blog/index.html'), /暂无文章/);
    for (const page of ['index.html', 'blog/index.html', 'projects/index.html', 'about/index.html']) {
        const html = read(page);
        assert.match(html, /lang="zh-CN"/);
        assert.match(html, /<html[^>]*class="dark /);
        assert.match(html, /id="language-toggle"/);
        assert.match(html, /data-i18n-en="(?:Posts|Projects|Tags)"/);
        assert.doesNotMatch(html, /RULE\.md|src\/content\/|dante-preview|example\.com/);
    }
    for (const collection of ['blog', 'projects']) {
        for (let i = 1; i <= 9; i++) entry(collection, `entry-${i}`, `${collection} item ${i}`);
        entry(collection, '2', `${collection} numeric`);
        entry(collection, 'topic/nested', `${collection} nested`);
    }
    const labels = ['C++', 'C#', '写作', '技术', 'AI 技术', 'AI 产品', '🔥', '~63-2b-2b'];
    labels.forEach((label, i) => entry('blog', `tag-${i}`, `UniqueTag${i}End`, [label]));
    build();
    for (const collection of ['blog', 'projects']) {
        assert.match(read(`${collection}/2/index.html`), new RegExp(`Body of ${collection} numeric`));
        assert.match(read(`${collection}/topic/nested/index.html`), new RegExp(`Body of ${collection} nested`));
        const pageTwo = read(`${collection}/page/2/index.html`);
        if (collection === 'blog') {
            assert.match(pageTwo, /aria-label="文章分页"/);
            assert.match(pageTwo, /data-page="2"/);
            assert.match(pageTwo, /data-prev/);
            assert.match(pageTwo, /data-next/);
            assert.equal([...pageTwo.matchAll(/data-post(?:\s|>)/g)].length, 19);
        } else {
            assert.match(pageTwo, /aria-label="分页"/);
            assert.match(pageTwo, /data-i18n-en="Page 2 of/);
            assert.match(pageTwo, new RegExp(`href="/${collection}/"`));
        }
        assert.match(nav(pageTwo, `/${collection}`), /aria-current="location"/);
        assert.match(nav(read(`${collection}/topic/nested/index.html`), `/${collection}`), /aria-current="location"/);
        assert.match(nav(read(`${collection}/index.html`), `/${collection}`), /aria-current="page"/);
    }
    const tocFile = join(temp, 'src/content/blog/toc-fixture.md');
    writeFileSync(tocFile, '---\ntitle: "TOC fixture"\npublishDate: 2026-05-23\n---\n\n## 第一部分\n\nA\n\n### 子节 Detail\n\nB\n\n#### Too deep\n\nC\n');
    build();
    const tocHtml = read('blog/toc-fixture/index.html');
    assert.match(tocHtml, /data-reading-progress/);
    assert.match(tocHtml, /<nav[^>]*aria-label="[^"]*"/);
    assert.match(tocHtml, /href="#第一部分"[^>]*data-toc-link="第一部分"/);
    assert.match(tocHtml, /<h2 id="第一部分"/);
    assert.match(tocHtml, /href="#子节-detail"/);
    assert.doesNotMatch(tocHtml, /href="#too-deep"/);
    assert.match(tocHtml, /<aside class="post-toc-rail[^"]*"[^>]*>\s*<div class="post-toc[^"]*" data-post-toc/);
    assert.doesNotMatch(tocHtml, /<details|<summary/);
    assert.doesNotMatch(read('blog/entry-1/index.html'), /class="post-toc-rail/);
    assert.doesNotMatch(read('blog/entry-1/index.html'), /<button[^>]*data-toc-fab|<dialog[^>]*data-toc-sheet/);
    assert.match(tocHtml, /<button[^>]*data-toc-fab[^>]*aria-label="打开目录"/);
    assert.match(tocHtml, /<dialog[^>]*data-toc-sheet[^>]*role="dialog"[^>]*aria-modal="true"/);
    assert.match(tocHtml, /data-toc-close[^>]*aria-label="关闭目录"/);
    const sheetHtml = tocHtml.slice(tocHtml.indexOf('<dialog'), tocHtml.indexOf('</dialog>'));
    assert.match(sheetHtml, /href="#第一部分"[^>]*data-toc-link="第一部分"/);
    assert.match(sheetHtml, /href="#子节-detail"/);
    assert.doesNotMatch(sheetHtml, /href="#too-deep"/);
    const tocCss = readdirSync(join(temp, 'dist/_astro')).filter((f) => f.endsWith('.css')).map((f) => read(`_astro/${f}`)).join('\n');
    assert.match(tocCss, /\.post-toc-rail\[[^\]]+\]\{display:none\}/, 'TOC must be hidden on narrow screens');
    assert.match(tocCss, /@media\s*\(min-width:\s*1280px\)\{\.post-toc-rail\[[^\]]+\]\{display:block/, 'TOC shown only at >=1280px');
    assert.match(tocCss, /@media\s*\(min-width:\s*1280px\)\{\.toc-mobile\[[^\]]+\]\{display:none\}/, 'Mobile TOC button hidden at >=1280px');
    assert.match(tocCss, /safe-area-inset-bottom/);
    assert.match(tocCss, /prefers-reduced-motion/);
    rmSync(tocFile);
    assert.doesNotMatch(read('index.html'), /查看全部文章/);
    assert.match(read('index.html'), /查看全部项目/);
    const tagDirs = readdirSync(join(temp, 'dist/tags'), { withFileTypes: true }).filter((entry) => entry.isDirectory());
    assert.equal(tagDirs.length, labels.length);
    for (const dir of tagDirs) {
        const redirect = read(`tags/${dir.name}/index.html`);
        assert.ok(redirect.includes(`/blog/?tag=${encodeURIComponent(dir.name)}`), `Wrong tag redirect: ${dir.name}`);
        assert.ok(read('blog/index.html').includes(`data-tag="${dir.name}"`), `Missing filter: ${dir.name}`);
        assert.doesNotMatch(redirect, /UniqueTag\d+End/);
    }
    assert.match(read('rss.xml'), /https:\/\/awayercode.github.io\/blog\/topic\/nested\//);
    assert.doesNotMatch(read('sitemap-0.xml'), /example\.com/);
    for (const collection of ['blog', 'projects']) {
        entry(collection, 'page/reserved', 'Reserved fixture');
        assert.match(build(false), /reserved pagination path/);
        rmSync(join(temp, `src/content/${collection}/page`), { recursive: true });
    }
    console.log('PASS: empty states, post TOC/progress, metadata, nested/numeric routes, pagination, navigation, distinct tags and reserved paths');
} finally {
    rmSync(temp, { recursive: true, force: true });
}
