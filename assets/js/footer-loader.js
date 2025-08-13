/**
 * FOOTER LOADER SCRIPT
 * ====================
 * This script makes the footer content data-driven by loading information from JSON.
 * It handles contact info, social links, and developer credit dynamically.
 *
 * HOW TO EDIT:
 * 1. Update /assets/data/footer.json to change email, social links, or credit info
 * 2. This script will automatically load and display the new content
 * 3. No need to edit HTML files manually - just update the JSON!
 *
 * WHAT IT DOES:
 * - Fetches footer data from /assets/data/footer.json
 * - Populates contact email in .contact-info elements
 * - Creates social media links in .social-links elements
 * - Adds developer credit (text + icon) at the bottom of footers
 * - Handles errors gracefully if JSON file is missing
 */

document.addEventListener('DOMContentLoaded', function () {

    async function loadFooterContent() {
        try {
            const response = await fetch('/assets/data/footer.json');
            if (!response.ok) {
                throw new Error(`Failed to load footer data: ${response.status}`);
            }
            const footerData = await response.json();

            updateContactInfo(footerData.contact);
            updateSocialLinks(footerData.social);
            addDeveloperCredit(footerData.credit);

        } catch (error) {
            console.warn('Footer loader error:', error.message);
            console.warn('Footer will display with existing content only');
        }
    }

    function updateContactInfo(contact) {
        const contactElements = document.querySelectorAll('.contact-info');
        if (contactElements.length > 0 && contact && contact.email) {
            contactElements.forEach(element => {
                element.innerHTML = `Email: <a href="mailto:${contact.email}" class="contact-link">${contact.email}</a>`;
            });
        }
    }

    function updateSocialLinks(socialLinks) {
        const socialElements = document.querySelectorAll('.social-links');
        if (socialElements.length > 0 && socialLinks && socialLinks.length > 0) {
            socialElements.forEach(element => {
                element.innerHTML = '';
                socialLinks.forEach(social => {
                    const link = document.createElement('a');
                    link.href = social.href;
                    link.textContent = social.label;
                    link.className = 'social-link';
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.setAttribute('aria-label', `Visit ${social.label} (opens in new tab)`);
                    element.appendChild(link);
                });
            });
        }
    }

    function addDeveloperCredit(credit) {
        if (!credit || !credit.text || !credit.href) {
            return;
        }

        const footers = document.querySelectorAll('footer');

        footers.forEach(footer => {
            let existingCredit = footer.querySelector('.developer-credit');
            if (existingCredit) {
                existingCredit.remove();
            }

            const creditElement = document.createElement('p');
            creditElement.className = 'developer-credit';

            // Make the entire credit text + icon clickable
            const creditLink = document.createElement('a');
            creditLink.href = credit.href;
            creditLink.className = 'developer-credit-link';
            creditLink.target = '_blank';
            creditLink.rel = 'noopener noreferrer';
            creditLink.setAttribute('aria-label', `${credit.text} (opens in new tab)`);

            // Text node
            const textNode = document.createTextNode(credit.text + ' ');

            // Icon
            const iconImg = document.createElement('img');
            iconImg.src = credit.icon;
            iconImg.alt = '';
            iconImg.className = 'developer-credit-icon';

            // Append both into the link
            creditLink.appendChild(textNode);
            creditLink.appendChild(iconImg);

            // Add link into container
            creditElement.appendChild(creditLink);

            const container = footer.querySelector('.container');
            const copyright = footer.querySelector('.copyright');

            if (container) {
                if (copyright) {
                    copyright.parentNode.insertBefore(creditElement, copyright.nextSibling);
                } else {
                    container.appendChild(creditElement);
                }
            }
        });
    }

    loadFooterContent();
});
