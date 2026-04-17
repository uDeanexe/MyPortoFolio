document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }

    // Scroll spy for active navbar links
    const sections = document.querySelectorAll('.section-scroll');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-indigo-400', 'font-bold', 'border-b-2', 'border-indigo-400', 'pb-1');
            link.classList.add('text-slate-400');
            
            if (link.getAttribute('data-target') === current) {
                link.classList.remove('text-slate-400');
                link.classList.add('text-indigo-400', 'font-bold', 'border-b-2', 'border-indigo-400', 'pb-1');
            }
        });
    });

    // Close mobile menu on click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });

    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-surface-variant', 'text-on-surface');
                b.classList.add('bg-surface-container-lowest', 'text-on-surface-variant');
            });
            btn.classList.add('active', 'bg-surface-variant', 'text-on-surface');
            btn.classList.remove('bg-surface-container-lowest', 'text-on-surface-variant');

            // Filter logic
            const targetFilter = btn.getAttribute('data-target');
            
            projectCards.forEach(card => {
                if (targetFilter === 'all' || card.getAttribute('data-category').includes(targetFilter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});
