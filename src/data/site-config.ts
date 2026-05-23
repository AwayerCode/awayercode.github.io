import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://example.com',
    avatar: {
        src: avatar,
        alt: 'Awayer'
    },
    title: 'Awayer',
    subtitle: '中文写作为主的个人博客',
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
    hero: {
        title: '你好，欢迎来到我的公开写作空间。',
        text: '这里主要整理适合公开阅读的中文内容，包括技术记录、长期思考，以及一些仍在发展中的项目线索。\n我希望把这里做成一个轻量、安静、可以长期更新的个人站点。',
        image: {
            src: hero,
            alt: '坐在桌前工作的人'
        },
        actions: [
            {
                text: '查看文章',
                href: '/blog'
            }
        ]
    },
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
