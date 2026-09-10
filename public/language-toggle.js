(function () {
    let language = 'zh-CN';
    try {
        if (localStorage.getItem('language') === 'en') language = 'en';
    } catch {}

    function applyLanguage(doc = document) {
        doc.documentElement.lang = language;
        doc.querySelectorAll('[data-i18n-zh]').forEach((element) => {
            const text = element.getAttribute(language === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
            if (text === null) return;
            const attribute = element.getAttribute('data-i18n-attr');
            if (attribute) element.setAttribute(attribute, text);
            else element.textContent = text;
        });
        doc.querySelectorAll('time[data-localized-date]').forEach((element) => {
            const date = new Date(element.getAttribute('datetime'));
            if (!Number.isNaN(date.getTime())) {
                element.textContent = date.toLocaleDateString(language, {
                    timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric'
                });
            }
        });
        const button = doc.getElementById('language-toggle');
        if (button) {
            button.textContent = language === 'en' ? '中' : 'EN';
            button.lang = language === 'en' ? 'zh-CN' : 'en';
            const label = language === 'en' ? '切换为中文' : 'Switch to English';
            button.setAttribute('aria-label', label);
            button.setAttribute('title', label);
        }
    }

    function setup() {
        applyLanguage();
        const button = document.getElementById('language-toggle');
        if (button) button.onclick = () => {
            language = language === 'en' ? 'zh-CN' : 'en';
            try { localStorage.setItem('language', language); } catch {}
            applyLanguage();
            document.dispatchEvent(new Event('site:language-change'));
        };
        document.dispatchEvent(new Event('site:language-change'));
    }

    applyLanguage();
    document.addEventListener('DOMContentLoaded', setup, { once: true });
    document.addEventListener('astro:page-load', setup);
    document.addEventListener('astro:before-swap', (event) => applyLanguage(event.newDocument));
    document.addEventListener('astro:after-swap', setup);
})();
