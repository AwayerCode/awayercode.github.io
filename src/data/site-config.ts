import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://example.com',
    title: 'Awayer',
    subtitle: 'Coder, Writer, Problem Solver',
    description: '一个以中文内容为主的博客与项目展示站点。',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Awayer 站点预览图'
    },
    headerNavLinks: [
        {
            text: '首页',
            href: '/'
        },
        {
            text: '项目',
            href: '/projects'
        },
        {
            text: '文章',
            href: '/blog'
        },
        {
            text: '标签',
            href: '/tags'
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
