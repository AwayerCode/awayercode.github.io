const english: Record<string, string> = {
    '首页': 'Home', '项目': 'Projects', '文章': 'Posts', '标签': 'Tags',
    'About Me': 'About Me', '关于我': 'About Me',
    '暂无文章，敬请期待。': 'No posts yet. Stay tuned.',
    '暂无项目，敬请期待。': 'No projects yet. Stay tuned.',
    '个人介绍即将更新。': 'A little about me, coming soon.',
    '内容即将更新。': 'Content coming soon.',
    '暂无标签，发布文章后将在这里展示。': 'Tags will appear here when posts are published.',
    '查看全部文章': 'View all posts', '查看全部项目': 'View all projects',
    '阅读文章': 'Read post', '查看项目': 'View project', '继续阅读': 'Keep reading',
    '查看标签归档': 'View tag archive', '浏览全部博客文章。': 'Browse all blog posts.',
    '查看项目归档与相关展示内容。': 'Explore projects and their stories.',
    '按标签浏览文章内容。': 'Browse posts by tag.',
    '一个以中文内容为主的博客与项目展示站点。': 'A personal blog and project showcase.',
    '分享': 'Share', '复制链接': 'Copy link', '已复制': 'Copied',
    '复制失败，请重试': 'Copy failed. Try again.', '主导航': 'Main navigation', '分页': 'Pagination'
};
export const translate = (text: string) => english[text] ?? text;
export const i18n = (zh: string, en = translate(zh), attribute?: string) => ({
    'data-i18n-zh': zh,
    'data-i18n-en': en,
    ...(attribute ? { 'data-i18n-attr': attribute } : {})
});
