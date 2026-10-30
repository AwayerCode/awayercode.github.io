// Reading progress bar + table-of-contents highlighting for blog post pages.
let cleanup: (() => void) | undefined;

export function initPostReading() {
    cleanup?.();
    const article = document.querySelector<HTMLElement>('[data-post-article]');
    if (!article) return;
    const bar = document.querySelector<HTMLElement>('[data-reading-progress]');
    const toc = document.querySelector<HTMLElement>('[data-post-toc]');
    const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
    const targets = links
        .map((link) => ({ link, el: document.getElementById(link.dataset.tocLink ?? '') }))
        .filter((t): t is { link: HTMLAnchorElement; el: HTMLElement } => !!t.el);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frame = 0;
    const update = () => {
        frame = 0;
        const rect = article.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const ratio = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
        if (bar) bar.style.transform = `scaleX(${ratio})`;
        let current: HTMLAnchorElement | undefined;
        const line = window.innerHeight * 0.25;
        for (const t of targets) {
            if (t.el.getBoundingClientRect().top <= line) current = t.link;
            else break;
        }
        for (const link of links) {
            if (link === current) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onClick = (event: MouseEvent) => {
        const link = (event.target as Element).closest<HTMLAnchorElement>('[data-toc-link]');
        const el = link && document.getElementById(link.dataset.tocLink ?? '');
        if (!link || !el) return;
        event.preventDefault();
        el.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', `#${encodeURIComponent(link.dataset.tocLink ?? '')}`);
        };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    toc?.addEventListener('click', onClick);
    update();
    cleanup = () => {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        toc?.removeEventListener('click', onClick);
        cancelAnimationFrame(frame);
    };
}
