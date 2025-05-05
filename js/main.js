// Hide preloader when page is loaded
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    
    if (menuToggle) {
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'mobile-menu-close';
        closeButton.innerHTML = '&times;';
        mobileMenu.appendChild(closeButton);
        
        // Clone navigation items
        const navList = document.querySelector('.nav-list').cloneNode(true);
        mobileMenu.appendChild(navList);
        
        // Add login button
        const loginBtn = document.querySelector('.btn-primary').cloneNode(true);
        mobileMenu.appendChild(loginBtn);
        
        // Add to body
        body.appendChild(mobileMenu);
        
        // Toggle menu
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
        });
        
        // Close menu
        closeButton.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Remove any Lucide icons from feature cards to prevent duplicates
    document.querySelectorAll('.feature-icon svg').forEach(svg => {
        if (svg.parentNode.classList.contains('feature-icon')) {
            svg.remove();
        }
    });
    
    // Smooth scrolling for anchor links (only for links that start with # and point to an element on the page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // (Removido: não adicionar eventos extras para .btn-cta)
    
    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .step-final');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
            observer.observe(element);
        });
    }
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Initialize highlight on page load
    highlightNavigation();
});
