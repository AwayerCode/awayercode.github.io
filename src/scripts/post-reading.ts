// Reading progress (top bar + mobile ring), TOC highlighting, and the mobile TOC sheet for blog posts.
let cleanup: (() => void) | undefined;

const RING_LENGTH = 2 * Math.PI * 16;

export function destroyPostReading() {
    cleanup?.();
    cleanup = undefined;
}

export function initPostReading() {
    destroyPostReading();
    const article = document.querySelector<HTMLElement>('[data-post-article]');
    if (!article) return;
    const bar = document.querySelector<HTMLElement>('[data-reading-progress]');
    const ring = document.querySelector<SVGCircleElement>('[data-toc-ring]');
    const percent = document.querySelector<HTMLElement>('[data-toc-percent]');
    const fab = document.querySelector<HTMLButtonElement>('[data-toc-fab]');
    const sheet = document.querySelector<HTMLDialogElement>('[data-toc-sheet]');
    const closeButton = document.querySelector<HTMLButtonElement>('[data-toc-close]');
    const tocs = [...document.querySelectorAll<HTMLElement>('[data-post-toc], [data-toc-sheet]')];
    const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
    const seen = new Set<string>();
    const targets = links
        .map((link) => link.dataset.tocLink ?? '')
        .filter((slug) => !seen.has(slug) && seen.add(slug))
        .map((slug) => ({ slug, el: document.getElementById(slug) }))
        .filter((t): t is { slug: string; el: HTMLElement } => !!t.el);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (ring) ring.style.strokeDasharray = `${RING_LENGTH}`;

    let frame = 0;
    const update = () => {
        frame = 0;
        const rect = article.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const ratio = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
        const pct = Math.round(ratio * 100);
        if (bar) bar.style.transform = `scaleX(${ratio})`;
        if (ring) ring.style.strokeDashoffset = `${RING_LENGTH * (1 - ratio)}`;
        if (percent) percent.textContent = `${pct}%`;
        fab?.setAttribute('data-percent', String(pct));
        let current: string | undefined;
        const line = window.innerHeight * 0.25;
        for (const t of targets) {
            if (t.el.getBoundingClientRect().top <= line) current = t.slug;
            else break;
        }
        for (const link of links) {
            if (current && link.dataset.tocLink === current) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    let lastFocus: HTMLElement | null = null;
    const lockScroll = (lock: boolean) => {
        document.documentElement.classList.toggle('toc-sheet-open', lock);
    };
    const openSheet = () => {
        if (!sheet || sheet.open) return;
        lastFocus = document.activeElement as HTMLElement | null;
        update();
        sheet.showModal();
        lockScroll(true);
        fab?.setAttribute('aria-expanded', 'true');
        const active = sheet.querySelector<HTMLAnchorElement>('[aria-current="location"]');
        (active ?? closeButton)?.focus({ preventScroll: true });
        active?.scrollIntoView({ block: 'nearest' });
    };
    const closeSheet = () => {
        if (!sheet?.open) return;
        sheet.close();
    };
    const onSheetClose = () => {
        lockScroll(false);
        fab?.setAttribute('aria-expanded', 'false');
        if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
        lastFocus = null;
    };
    const onSheetClick = (event: MouseEvent) => {
        // A click on the <dialog> element itself (not its panel) is the backdrop.
        if (event.target === sheet) closeSheet();
    };

    const onTocClick = (event: MouseEvent) => {
        const link = (event.target as Element).closest<HTMLAnchorElement>('[data-toc-link]');
        const el = link && document.getElementById(link.dataset.tocLink ?? '');
        if (!link || !el) return;
        event.preventDefault();
        if (sheet?.open) {
            lastFocus = null;
            closeSheet();
        }
        el.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', `#${encodeURIComponent(link.dataset.tocLink ?? '')}`);
    };
    const onFabClick = () => openSheet();
    const onCloseClick = () => closeSheet();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    tocs.forEach((t) => t.addEventListener('click', onTocClick));
    fab?.addEventListener('click', onFabClick);
    closeButton?.addEventListener('click', onCloseClick);
    sheet?.addEventListener('click', onSheetClick);
    sheet?.addEventListener('close', onSheetClose);
    update();
    cleanup = () => {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        tocs.forEach((t) => t.removeEventListener('click', onTocClick));
        fab?.removeEventListener('click', onFabClick);
        closeButton?.removeEventListener('click', onCloseClick);
        sheet?.removeEventListener('click', onSheetClick);
        sheet?.removeEventListener('close', onSheetClose);
        if (sheet?.open) sheet.close();
        lockScroll(false);
        cancelAnimationFrame(frame);
    };
}
