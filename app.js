const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

function closeMenu() {
    if (!menuToggle || !mainNav) return;
    menuToggle.classList.remove('is-open');
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.classList.toggle('is-open');
        mainNav.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        if (window.innerWidth > 768) return;
        const target = event.target;
        if (!(target instanceof Node)) return;
        if (!mainNav.contains(target) && !menuToggle.contains(target)) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

const animatedOnLoad = document.querySelectorAll('[data-animate="load"]');
animatedOnLoad.forEach((element) => {
    requestAnimationFrame(() => {
        element.classList.add('is-visible');
    });
});

const revealItems = document.querySelectorAll('.reveal:not([data-animate="load"])');

if ('IntersectionObserver' in window && revealItems.length > 0) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.18,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}
