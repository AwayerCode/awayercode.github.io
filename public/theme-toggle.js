(function () {
    const root = document.documentElement;

    function getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch {
            return null;
        }
    }

    function storeTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch {}
    }

    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function getActiveTheme() {
        const stored = getStoredTheme();
        return stored || getSystemTheme();
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        root.classList.toggle('dark', isDark);
        updateToggleLabel();
    }

    function updateToggleLabel() {
        const button = document.getElementById('theme-toggle');
        if (!button) return;
        const label = root.classList.contains('dark') ? '切换为浅色模式' : '切换为深色模式';
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
    }

    function setupThemeToggle() {
        const button = document.getElementById('theme-toggle');
        if (!button) return;
        updateToggleLabel();

        button.onclick = () => {
            const theme = root.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(theme);
            storeTheme(theme);
        };
    }

    // Set initial theme
    applyTheme(getActiveTheme());

    // Attach toggle listener on first load
    document.addEventListener('astro:page-load', setupThemeToggle);

    // Re-apply theme after navigation
    document.addEventListener('astro:after-swap', () => {
        applyTheme(getActiveTheme());
        setupThemeToggle();
    });
})();
