/*
HEADER NAVIGATION FUNCTIONALITY:
- Mobile hamburger menu toggle
- Auto-hide header on scroll down, show on scroll up
- Accessibility support with ARIA attributes
- Close menu when clicking nav links (mobile)
- Keyboard navigation support
*/

(function () {
    'use strict';

    let lastScrollY = 0;
    let ticking = false;

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initMobileNav();
        initScrollHeader();
        initSlideMenu();
    });

    /**
     * Initialize scroll-to-hide header functionality
     */
    function initScrollHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        function updateHeader() {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                // Always show header at top of page
                header.classList.remove('header-hidden');
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide header
                header.classList.add('header-hidden');
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show header
                header.classList.remove('header-hidden');
            }

            lastScrollY = currentScrollY;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, {passive: true});
    }

    /**
     * Initialize mobile navigation functionality
     */
    function initMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const mainNav = document.querySelector('.main-nav');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navToggle || !mainNav) return;

        // Toggle mobile navigation
        navToggle.addEventListener('click', function () {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;

            // Update ARIA attributes
            navToggle.setAttribute('aria-expanded', newState);

            // Toggle nav visibility
            mainNav.classList.toggle('nav-open', newState);
            navToggle.classList.toggle('nav-toggle-active', newState);

            // Focus management
            if (newState) {
                const firstNavLink = mainNav.querySelector('.nav-link');
                if (firstNavLink) {
                    setTimeout(() => firstNavLink.focus(), 100);
                }
            }
        });

        // Close mobile nav when clicking nav links
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 768) {
                    closeMobileNav();
                }
            });
        });

        // Close mobile nav on escape key
        document.addEventListener('keydown', function (e) {
            if (e.code === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                closeMobileNav();
                navToggle.focus();
            }
        });

        // Close mobile nav on window resize to desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768) {
                closeMobileNav();
            }
        });

        /**
         * Close mobile navigation
         */
        function closeMobileNav() {
            navToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('nav-open');
            navToggle.classList.remove('nav-toggle-active');
        }
    }

    /*
    SLIDE-OUT MENU FUNCTIONALITY:
    - Clean header with menu button that opens slide-out panel
    - Menu slides in from the right side
    - Header stays visible during scroll (no auto-hide)
    - Accessibility support with ARIA attributes and keyboard navigation
    */

    /**
     * Initialize slide-out menu functionality
     */
    function initSlideMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const slideMenu = document.querySelector('.slide-menu');
        const menuClose = document.querySelector('.menu-close');
        const menuOverlay = document.querySelector('.slide-menu-overlay');
        const menuLinks = document.querySelectorAll('.menu-link');

        if (!menuToggle || !slideMenu) return;

        // Open menu
        menuToggle.addEventListener('click', function () {
            openMenu();
        });

        // Close menu - close button
        if (menuClose) {
            menuClose.addEventListener('click', function () {
                closeMenu();
            });
        }

        // Close menu - overlay click
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function () {
                closeMenu();
            });
        }

        // Close menu - escape key
        document.addEventListener('keydown', function (e) {
            if (e.code === 'Escape' && slideMenu.classList.contains('menu-open')) {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Close menu when clicking menu links
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });

        // Prevent body scroll when menu is open
        function openMenu() {
            slideMenu.classList.add('menu-open');
            slideMenu.setAttribute('aria-hidden', 'false');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';

            // Focus first menu link for keyboard users
            const firstMenuLink = slideMenu.querySelector('.menu-link');
            if (firstMenuLink) {
                setTimeout(() => firstMenuLink.focus(), 300);
            }
        }

        function closeMenu() {
            slideMenu.classList.remove('menu-open');
            slideMenu.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        // Handle focus trapping in menu
        slideMenu.addEventListener('keydown', function (e) {
            if (e.code === 'Tab' && slideMenu.classList.contains('menu-open')) {
                const focusableElements = slideMenu.querySelectorAll('button, a');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

})();
