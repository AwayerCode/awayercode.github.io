import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://awayercode.github.io',
    title: 'Awayer',
    subtitle: 'Coder, Writer, Problem Solver',
    description: '一个以中文内容为主的博客与项目展示站点。',
    headerNavLinks: [
        {
            text: '首页',
            href: '/'
        },
        {
            text: '文章',
            href: '/blog'
        },
        {
            text: '项目',
            href: '/projects'
        },
        {
            text: '标签',
            href: '/tags'
        },
        {
            text: '关于我',
            href: '/about'
        }
    ],
    footerNavLinks: [],
    socialLinks: [],
    subscribe: {
        enabled: false,
        title: '订阅更新',
        text: '有新文章时再来通知你，不打扰，不刷屏。',
        form: {
            action: '#'
        }
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
