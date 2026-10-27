// Fade-in ved scroll og sticky menu.
// Blazor renderer indholdet efter load, så nye .reveal-elementer fanges med en MutationObserver.
(function () {
    // Start altid i toppen ved indlæsning: ingen gendannet scroll-position og intet #anker fra sidste klik.
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    if (location.hash) {
        history.replaceState(null, '', location.pathname + location.search);
    }
    window.scrollTo(0, 0);

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion && 'IntersectionObserver' in window) {
        document.documentElement.classList.add('reveal-ready');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        var watch = function () {
            document.querySelectorAll('.reveal:not([data-reveal])').forEach(function (el) {
                el.setAttribute('data-reveal', '');
                observer.observe(el);
            });
        };

        new MutationObserver(watch).observe(document.getElementById('app'), { childList: true, subtree: true });
        watch();
    }

    var onScroll = function () {
        document.documentElement.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();
