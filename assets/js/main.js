/*
INTERACTION FEATURES:
- Scroll-triggered animations for portfolio cards
- Smooth scrolling for contact link
- Respects user's motion preferences
- Lightweight performance-focused code
*/

(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSmoothScroll();
  });

  /**
   * Initialize scroll-triggered animations for portfolio cards
   */
  function initScrollAnimations() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.circle-card');

    // Add fade-up class to cards for animation
    cards.forEach(card => {
      card.classList.add('fade-up');
    });

    // Create intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add delay for staggered animation
          const index = Array.from(cards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150);

          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Start observing cards
    cards.forEach(card => {
      observer.observe(card);
    });
  }

  /**
   * Initialize smooth scrolling for contact link
   */
  function initSmoothScroll() {
    const contactLink = document.querySelector('a[href="#contact"]');

    if (contactLink) {
      contactLink.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector('#contact');
        if (target) {
          const headerHeight = document.querySelector('.nav-header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;

          if (prefersReducedMotion) {
            // Instant scroll for reduced motion users
            window.scrollTo(0, targetPosition);
          } else {
            // Smooth scroll animation
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    }
  }

  /**
   * Optional: Add loading state for hero image
   */
  function initHeroImageLoading() {
    const hero = document.querySelector('.hero');
    if (hero) {
      // Create a temporary image to preload hero background
      const heroImage = new Image();
      heroImage.onload = function() {
        hero.classList.add('loaded');
      };

      // Extract background image URL from CSS
      const computedStyle = window.getComputedStyle(hero);
      const backgroundImage = computedStyle.getPropertyValue('background-image');
      const imageUrl = backgroundImage.slice(4, -1).replace(/"/g, '');

      if (imageUrl && imageUrl !== 'none') {
        heroImage.src = imageUrl;
      }
    }
  }

  // Initialize hero image loading
  initHeroImageLoading();

})();
