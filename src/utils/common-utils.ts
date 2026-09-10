export function slugify(input?: string) {
    if (!input) return '';

    // make lower case and trim
    let slug = input.toLowerCase().trim();

    // Remove accents while preserving letters from non-Latin languages.
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // replace invalid chars with spaces
    slug = slug.replace(/[^\p{L}\p{N}\p{M}\s-]/gu, ' ').trim();

    // replace multiple spaces or hyphens with a single hyphen
    slug = slug.replace(/[\s-]+/g, '-');

    // Keep symbol-only tags addressable instead of generating an empty route.
    return slug || `tag-${Array.from(input).map((char) => char.codePointAt(0)!.toString(16)).join('-')}`;
}
