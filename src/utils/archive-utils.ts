import { getCollection, type CollectionEntry } from 'astro:content';
import siteConfig from '../data/site-config';
import { sortItemsByDateDesc } from './data-utils';
import { hasContentFiles } from './content-files';

export type ArchivePage<T> = {
    data: T[];
    currentPage: number;
    lastPage: number;
    url: { prev?: string; next?: string };
};

// /page/ is reserved for archive pagination; numeric and nested content IDs are valid.
export function validateContentId(id: string) {
    if (id === 'page' || id.startsWith('page/')) {
        throw new Error(`Content ID "${id}" uses the reserved pagination path "page".`);
    }
}

export async function getArchivePages<C extends 'blog' | 'projects'>(collection: C): Promise<ArchivePage<CollectionEntry<C>>[]> {
    const items = hasContentFiles(`src/content/${collection}`)
        ? (await getCollection(collection)).sort(sortItemsByDateDesc)
        : [];
    const size = (collection === 'blog' ? siteConfig.postsPerPage : siteConfig.projectsPerPage) ?? 8;
    if (!Number.isInteger(size) || size < 1) throw new Error('Archive page size must be a positive integer.');
    const lastPage = Math.max(1, Math.ceil(items.length / size));
    const url = (page: number) => page === 1 ? `/${collection}/` : `/${collection}/page/${page}/`;
    return Array.from({ length: lastPage }, (_, index) => ({
        data: items.slice(index * size, (index + 1) * size),
        currentPage: index + 1,
        lastPage,
        url: {
            prev: index > 0 ? url(index) : undefined,
            next: index + 1 < lastPage ? url(index + 2) : undefined
        }
    }));
}
