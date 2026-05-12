document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-enabled');
    
    // 1. Preloader & App Initialization
    const loader = document.getElementById('loader');
    let appStarted = false;

    function startApp() {
        if (appStarted) return;
        appStarted = true;
        
        if (loader) {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    loader.style.display = 'none';
                    initAnimations();
                    const slides = document.querySelectorAll('.slide');
                    if (slides.length > 0) showSlide(0);
                    // Refresh ScrollTrigger after a short delay
                    setTimeout(() => ScrollTrigger.refresh(), 200);
                }
            });
        } else {
            initAnimations();
            const slides = document.querySelectorAll('.slide');
            if (slides.length > 0) showSlide(0);
        }
    }

    // Initialize on window load
    window.addEventListener('load', startApp);

    // Fallback: If window load takes too long (e.g. slow images), start anyway after 2 seconds
    setTimeout(startApp, 2000);

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
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
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

        // Global Reveal (Excluding Hero Slider)
        const reveals = document.querySelectorAll('.reveal:not(.slide-content .reveal)');
        reveals.forEach(el => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
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
                duration: 1.5,
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
