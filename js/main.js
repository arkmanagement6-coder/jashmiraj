document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => loader.style.display = 'none'
        });
        initAnimations();
    });

    // 2. Sticky Header
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.style.transform = 'translateX(0)';
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.style.transform = 'translateX(100%)';
    });

    // 4. Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 6000;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('bg-gold'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('bg-gold');
        
        // Restart GSAP animations for the current slide
        const content = slides[index].querySelector('.slide-content');
        const elements = content.querySelectorAll('.reveal');
        
        gsap.fromTo(elements, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" }
        );
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentSlide = idx;
            showSlide(currentSlide);
        });
    });

    setInterval(nextSlide, slideInterval);

    // 5. GSAP Animations
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Global Reveal
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        });

        // Counter Animation
        const counters = document.querySelectorAll('.counter-box h3');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            gsap.to(counter, {
                scrollTrigger: {
                    trigger: counter,
                    start: "top 90%"
                },
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out"
            });
        });
    }

    // 6. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
