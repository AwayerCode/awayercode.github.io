import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import siteConfig from '../data/site-config.ts';
import { sortItemsByDateDesc } from '../utils/data-utils.ts';
import { hasContentFiles } from '../utils/content-files.ts';

export async function GET(context) {
    const posts = hasContentFiles('src/content/blog') ? (await getCollection('blog')).sort(sortItemsByDateDesc) : [];
    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        items: posts.map((item) => ({
            title: item.data.title,
            description: item.data.excerpt,
            link: `/blog/${item.id}/`,
            pubDate: item.data.publishDate
        }))
    });
}
