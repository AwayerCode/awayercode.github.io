import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"posts">;

export function getPostSlug(post: BlogPost) {
  const explicitSlug = post.data.slug?.trim();

  if (explicitSlug) {
    return explicitSlug.replace(/^\/+|\/+$/g, "");
  }

  return post.id.replace(/\/index$/, "");
}

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((left, right) => right.data.date.getTime() - left.data.date.getTime());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "long",
  }).format(date);
}

export function resolvePostAsset(post: BlogPost, assetPath: string) {
  if (/^(https?:)?\/\//.test(assetPath) || assetPath.startsWith("/")) {
    return assetPath;
  }

  const normalized = assetPath.replace(/^\.\//, "").replace(/^\/+/, "");
  return `/posts/${getPostSlug(post)}/${normalized}`;
}

export function toTagSlug(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function collectTags(posts: BlogPost[]) {
  const bucket = new Map<string, { label: string; slug: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = toTagSlug(tag);
      const existing = bucket.get(slug);

      if (existing) {
        existing.count += 1;
      } else {
        bucket.set(slug, {
          label: tag,
          slug,
          count: 1,
        });
      }
    }
  }

  return [...bucket.values()].sort((left, right) => left.label.localeCompare(right.label, "zh-CN"));
}
