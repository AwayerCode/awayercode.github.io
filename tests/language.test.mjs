import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const languageScript = readFileSync(new URL('../public/language-toggle.js', import.meta.url), 'utf8');
const themeScript = readFileSync(new URL('../public/theme-toggle.js', import.meta.url), 'utf8');
class Element {
    constructor(attributes = {}) { this.attributes = attributes; this.textContent = ''; }
    getAttribute(key) { return this.attributes[key] ?? null; }
    setAttribute(key, value) { this.attributes[key] = value; }
}
function page() {
    const translated = [new Element({'data-i18n-zh':'文章', 'data-i18n-en':'Posts'}),
        new Element({'data-i18n-zh':'浏览文章', 'data-i18n-en':'Browse posts', 'data-i18n-attr':'content'})];
    const date = new Element({datetime: '2026-05-23T00:00:00.000Z'});
    const languageButton = new Element(); const themeButton = new Element();
    const classes = new Set();
    return {
        translated, date, languageButton, themeButton,
        documentElement: {lang: 'zh-CN', classList: {
            contains: (key) => classes.has(key),
            toggle: (key, on) => { if (on) classes.add(key); else classes.delete(key); }
        }},
        querySelectorAll: (selector) => selector === '[data-i18n-zh]' ? translated : [date],
        getElementById: (id) => id === 'language-toggle' ? languageButton : themeButton
    };
}
function start(stored, blocked = false) {
    const storage = new Map([['language', stored], ['theme', 'dark']]);
    const events = new EventTarget(); const doc = page();
    doc.addEventListener = events.addEventListener.bind(events);
    doc.dispatchEvent = events.dispatchEvent.bind(events);
    vm.runInNewContext(languageScript + '\n' + themeScript, {
        document: doc, Event, window: {matchMedia: () => ({matches: false})},
        localStorage: {
            getItem: (key) => { if (blocked) throw new Error('Storage blocked'); return storage.get(key); },
            setItem: (key, value) => { if (blocked) throw new Error('Storage blocked'); storage.set(key, value); }
        }
    });
    doc.dispatchEvent(new Event('astro:page-load'));
    return {doc, storage};
}
test('English preference updates labels, metadata, dates and theme actions', () => {
    const {doc, storage} = start('en');
    assert.equal(doc.documentElement.lang, 'en');
    assert.equal(doc.translated[0].textContent, 'Posts');
    assert.equal(doc.translated[1].getAttribute('content'), 'Browse posts');
    assert.equal(doc.date.textContent, 'May 23, 2026');
    assert.equal(doc.languageButton.textContent, '中');
    assert.equal(doc.themeButton.getAttribute('title'), 'Switch to light mode');
    doc.themeButton.onclick();
    assert.equal(storage.get('theme'), 'light');
    assert.equal(doc.themeButton.getAttribute('title'), 'Switch to dark mode');
    doc.languageButton.onclick();
    assert.equal(storage.get('language'), 'zh-CN');
    assert.equal(doc.translated[0].textContent, '文章');
    assert.equal(doc.themeButton.getAttribute('title'), '切换为深色模式');
});
test('language is prepared before navigation and restored on reload', () => {
    const {doc, storage} = start();
    doc.languageButton.onclick();
    const next = page(); const swap = new Event('astro:before-swap'); swap.newDocument = next;
    doc.dispatchEvent(swap);
    assert.equal(next.documentElement.lang, 'en');
    assert.equal(next.translated[0].textContent, 'Posts');
    assert.equal(start(storage.get('language')).doc.documentElement.lang, 'en');
    doc.dispatchEvent(new Event('astro:after-swap'));
    doc.dispatchEvent(new Event('astro:page-load'));
    doc.languageButton.onclick();
    assert.equal(doc.documentElement.lang, 'zh-CN');
});
test('blocked storage and unknown preferences safely fall back to Chinese', () => {
    assert.equal(start('invalid').doc.documentElement.lang, 'zh-CN');
    const {doc} = start('en', true);
    assert.equal(doc.documentElement.lang, 'zh-CN');
    doc.languageButton.onclick();
    doc.dispatchEvent(new Event('astro:after-swap'));
    assert.equal(doc.documentElement.lang, 'en');
});
