// Adds hover/focus "copy link" anchors to article h2/h3 headings.
let cleanup: (() => void) | undefined;

// Fallback when the Clipboard API is unavailable or denied: the URL hash is already
// updated, so the reader can copy the link from the address bar.
async function copyText(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}

export function destroyHeadingAnchors() {
    cleanup?.();
    cleanup = undefined;
}

export function initHeadingAnchors() {
    destroyHeadingAnchors();
    const body = document.querySelector<HTMLElement>('[data-post-article] .article-body');
    if (!body) return;
    const status = document.querySelector<HTMLElement>('[data-anchor-status]');
    const en = () => document.documentElement.lang === 'en';
    const anchors: HTMLAnchorElement[] = [];
    for (const heading of body.querySelectorAll<HTMLElement>('h2[id], h3[id]')) {
        if (heading.querySelector('.heading-anchor')) continue;
        const a = document.createElement('a');
        a.className = 'heading-anchor';
        a.href = `#${encodeURIComponent(heading.id)}`;
        a.dataset.headingAnchor = heading.id;
        const label = heading.textContent?.trim() ?? '';
        a.dataset.label = label;
        a.setAttribute('aria-label', en() ? `Copy link to “${label}”` : `复制本节链接：${label}`);
        heading.append(a);
        anchors.push(a);
    }
    const relabel = () => anchors.forEach((a) => a.setAttribute('aria-label', en() ? `Copy link to “${a.dataset.label}”` : `复制本节链接：${a.dataset.label}`));
    let timer: ReturnType<typeof setTimeout>;
    const onClick = async (event: MouseEvent) => {
        const a = (event.target as Element).closest<HTMLAnchorElement>('.heading-anchor');
        if (!a) return;
        event.preventDefault();
        const id = a.dataset.headingAnchor ?? '';
        const url = `${location.origin}${location.pathname}#${encodeURIComponent(id)}`;
        history.replaceState(null, '', `#${encodeURIComponent(id)}`);
        const ok = await copyText(url);
        a.classList.add('is-copied');
        if (status) status.textContent = ok ? (en() ? 'Link copied' : '链接已复制') : (en() ? 'Copy failed; link is in the address bar' : '复制失败，链接已在地址栏');
        clearTimeout(timer);
        timer = setTimeout(() => { a.classList.remove('is-copied'); if (status) status.textContent = ''; }, 2000);
    };
    body.addEventListener('click', onClick);
    document.addEventListener('site:language-change', relabel);
    cleanup = () => {
        body.removeEventListener('click', onClick);
        document.removeEventListener('site:language-change', relabel);
        clearTimeout(timer);
    };
}
