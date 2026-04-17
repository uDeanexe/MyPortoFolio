document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Spy for Desktop and Mobile Navigation
    const sections = document.querySelectorAll('.section-scroll');
    const desktopLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        // Update Desktop Links
        desktopLinks.forEach(link => {
            link.classList.remove('text-primary', 'font-bold', 'scale-105');
            link.classList.add('text-slate-400');
            
            if (link.getAttribute('data-target') === current) {
                link.classList.remove('text-slate-400');
                link.classList.add('text-primary', 'font-bold', 'scale-105');
            }
        });

        // Update Mobile Links
        mobileLinks.forEach(link => {
            link.classList.remove('text-primary', 'active');
            link.classList.add('text-slate-400');
            link.querySelector('.material-symbols-outlined').style.fontVariationSettings = "'FILL' 0";

            if (link.getAttribute('data-target') === current) {
                link.classList.remove('text-slate-400');
                link.classList.add('text-primary', 'active');
                link.querySelector('.material-symbols-outlined').style.fontVariationSettings = "'FILL' 1";
            }
        });
    });

    // 2. Animate On Scroll (AOS) Logic
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 3. Gallery Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state class names for the new redesign
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-white/10', 'text-white', 'border-white/20');
                b.classList.add('bg-transparent', 'text-slate-400', 'border-transparent');
            });
            btn.classList.add('active', 'bg-white/10', 'text-white', 'border-white/20');
            btn.classList.remove('bg-transparent', 'text-slate-400', 'border-transparent');

            // Filter logic
            const targetFilter = btn.getAttribute('data-target');
            
            projectCards.forEach(card => {
                if (targetFilter === 'all' || card.getAttribute('data-category').includes(targetFilter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        // Keep transform logic clean so AOS transform isn't completely blown out
                        // But since cards might be revealed already, we can set scale to 1.
                        card.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

});
