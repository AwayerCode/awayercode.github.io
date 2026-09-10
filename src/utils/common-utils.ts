// Preserve simple existing URLs. Encode every code point of other tags so punctuation
// cannot silently merge distinct labels such as C++, C# or an emoji-only tag.
export function slugify(input?: string) {
    const tag = input?.trim().normalize('NFC').toLowerCase() ?? '';
    if (!tag) return '';
    if (/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(tag)) return tag;
    return `~${Array.from(tag).map((char) => char.codePointAt(0)!.toString(16)).join('-')}`;
}
