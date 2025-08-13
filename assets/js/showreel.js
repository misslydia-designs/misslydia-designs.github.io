/*
VIDEO PLAYER INTERACTIONS:
- Custom play/pause overlay button
- Keyboard controls (Space/K for play/pause)
- Respects prefers-reduced-motion
- Pauses when tab becomes hidden
- Mobile-friendly with playsinline support
*/

(function () {
    'use strict';

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Get video and play button elements
    const video = document.getElementById('showreel');
    const playButton = document.querySelector('.video-play');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        if (video && playButton) {
            initVideoPlayer();
        }

        if (navToggle && mainNav) {
            initMobileNav();
        }
    });

    /**
     * Initialize video player functionality
     */
    function initVideoPlayer() {
        // Play button click handler
        playButton.addEventListener('click', function () {
            togglePlayPause();
        });

        // Video event listeners
        video.addEventListener('play', function () {
            hidePlayButton();
        });

        video.addEventListener('pause', function () {
            showPlayButton();
        });

        video.addEventListener('ended', function () {
            showPlayButton();
        });

        // Keyboard controls
        video.addEventListener('keydown', function (e) {
            if (e.code === 'Space' || e.code === 'KeyK') {
                e.preventDefault();
                togglePlayPause();
            }
        });

        // Pause when tab becomes hidden
        document.addEventListener('visibilitychange', function () {
            if (document.hidden && !video.paused) {
                video.pause();
            }
        });

        // Ensure play button is visible initially
        showPlayButton();
    }

    /**
     * Toggle video play/pause
     */
    function togglePlayPause() {
        if (video.paused) {
            // Respect reduced motion preference - no autoplay
            if (!prefersReducedMotion || video.currentTime > 0) {
                video.play().catch(function (error) {
                    console.log('Video play failed:', error);
                });
            }
        } else {
            video.pause();
        }
    }

    /**
     * Hide the play button overlay
     */
    function hidePlayButton() {
        playButton.style.opacity = '0';
        playButton.style.pointerEvents = 'none';
        playButton.setAttribute('aria-hidden', 'true');
    }

    /**
     * Show the play button overlay
     */
    function showPlayButton() {
        playButton.style.opacity = '1';
        playButton.style.pointerEvents = 'auto';
        playButton.setAttribute('aria-hidden', 'false');
    }

    /**
     * Initialize mobile navigation
     */
    function initMobileNav() {
        navToggle.addEventListener('click', function () {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;

            navToggle.setAttribute('aria-expanded', newState);
            mainNav.classList.toggle('nav-open', newState);

            // Update hamburger animation
            navToggle.classList.toggle('nav-toggle-active', newState);

            // Trap focus in mobile menu when open
            if (newState) {
                const firstNavLink = mainNav.querySelector('.nav-link');
                if (firstNavLink) {
                    firstNavLink.focus();
                }
            }
        });

        // Close mobile nav when clicking nav links
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('nav-open');
                navToggle.classList.remove('nav-toggle-active');
            });
        });

        // Close mobile nav on escape key
        document.addEventListener('keydown', function (e) {
            if (e.code === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                navToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('nav-open');
                navToggle.classList.remove('nav-toggle-active');
                navToggle.focus();
            }
        });
    }

})();
