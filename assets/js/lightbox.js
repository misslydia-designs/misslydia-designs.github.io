// LIGHTBOX FUNCTIONALITY
// ======================
// This JavaScript file creates a popup (lightbox) that displays larger versions of images
// when users click on the small thumbnail images in the gallery.

// IIFE (Immediately Invoked Function Expression) - this runs the code right away
// and keeps all variables private so they don't interfere with other scripts
(function () {
  // Find the lightbox element in the HTML (the popup container)
  const lb = document.getElementById('lightbox');
  // If there's no lightbox element on the page, stop running this script
  if (!lb) return;

  // Find the different parts of the lightbox that we'll need to control
  const imgEl = lb.querySelector('.lightbox__img'); // The large image that will be displayed
  const captionEl = lb.querySelector('.lightbox__caption'); // The text description under the image
  const overlayEls = lb.querySelectorAll('[data-lightbox-close]'); // All elements that close the lightbox when clicked
  // Remember which element was focused before opening the lightbox (for accessibility)
  let lastActive = null;

  // FUNCTION: Open the lightbox with a specific image
  // This runs when someone clicks on a thumbnail image
  function openLightbox(fromImg) {
    // Remember what was focused before (so we can return focus when closing)
    lastActive = document.activeElement;

    // Get the image source - try data-full attribute first, then currentSrc, then regular src
    // data-full allows us to show a higher quality image in the lightbox than the thumbnail
    const full = fromImg.getAttribute('data-full') || fromImg.currentSrc || fromImg.src;
    // Get the alt text (description) from the clicked image
    const alt = fromImg.getAttribute('alt') || '';

    // Set the large image source and description
    imgEl.src = full;
    imgEl.alt = alt;
    captionEl.textContent = alt; // Show the description below the image

    // Make the lightbox visible by changing its aria-hidden attribute
    lb.setAttribute('aria-hidden', 'false');
    // Prevent the background page from scrolling while lightbox is open
    document.documentElement.classList.add('no-scroll');

    // Put keyboard focus on the close button (good for accessibility)
    lb.querySelector('.lightbox__close').focus();

    // Start listening for keyboard presses (like Escape key to close)
    document.addEventListener('keydown', onKeydown);
  }

  // FUNCTION: Close the lightbox and clean up
  function closeLightbox() {
    // Hide the lightbox
    lb.setAttribute('aria-hidden', 'true');

    // Clear the image and caption to free up memory
    imgEl.removeAttribute('src');
    imgEl.removeAttribute('alt');
    captionEl.textContent = '';

    // Allow the background page to scroll again
    document.documentElement.classList.remove('no-scroll');

    // Stop listening for keyboard presses
    document.removeEventListener('keydown', onKeydown);

    // Return keyboard focus to whatever was focused before opening the lightbox
    if (lastActive && typeof lastActive.focus === 'function') {
      lastActive.focus();
    }
  }

  // FUNCTION: Handle keyboard presses when lightbox is open
  function onKeydown(e) {
    // If user presses Escape key, close the lightbox
    if (e.key === 'Escape') {
      e.preventDefault(); // Stop the default action
      closeLightbox();
      return;
    }

    // Handle Tab key for keyboard navigation (accessibility feature)
    // This creates a "focus trap" - Tab only moves between elements inside the lightbox
    if (e.key === 'Tab') {
      // Define which elements can receive focus inside the lightbox
      const focusables = [lb.querySelector('.lightbox__close'), imgEl];
      // Find which element currently has focus
      const idx = focusables.indexOf(document.activeElement);

      // If Shift+Tab (reverse direction)
      if (e.shiftTab) {
        e.preventDefault();
        // Move to previous focusable element (wrapping around if needed)
        focusables[(idx - 1 + focusables.length) % focusables.length].focus();
      } else {
        e.preventDefault();
        // Move to next focusable element (wrapping around if needed)
        focusables[(idx + 1) % focusables.length].focus();
      }
    }
  }

  // EVENT LISTENER: Listen for clicks anywhere on the page
  // This uses "event delegation" - one listener handles clicks for all images
  document.addEventListener('click', function (e) {
    // Check if the clicked element is a thumbnail image inside an art-media container
    const img = e.target.closest('.art-media .art-thumb');
    if (img) {
      e.preventDefault(); // Prevent any default link behavior
      openLightbox(img); // Open the lightbox with this image
    }

    // Check if the clicked element has the data-lightbox-close attribute
    // This includes the overlay background and close button
    if (e.target.closest('[data-lightbox-close]')) {
      e.preventDefault(); // Prevent any default behavior
      closeLightbox(); // Close the lightbox
    }
  });

  // EVENT LISTENER: Close lightbox when clicking on overlay elements
  // This is a backup in case the click delegation above doesn't work
  overlayEls.forEach(el => el.addEventListener('click', closeLightbox));
})(); // End of IIFE - the parentheses here make the function run immediately
