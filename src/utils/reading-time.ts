// Estimate reading time for mixed Chinese/English markdown.
// ~400 CJK characters per minute plus ~200 Latin words per minute, rounded up, minimum 1.
export function readingMinutes(markdown = ''): number {
    const text = markdown
        .replace(/^---[\s\S]*?---/, ' ')
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`[^`]*`/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]+>/g, ' ');
    const cjk = (text.match(/[\u3400-\u9fff\uf900-\ufaff]/g) ?? []).length;
    const words = (text.replace(/[\u3400-\u9fff\uf900-\ufaff]/g, ' ').match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) ?? []).length;
    return Math.max(1, Math.ceil(cjk / 400 + words / 200));
}
