# 🎨 Katelyn Lydia Portfolio Website

A modern, responsive portfolio website for concept artist Katelyn Lydia, featuring automated project management,
interactive galleries, and accessibility-first design.

## 📖 Overview

This portfolio website showcases Katelyn Lydia's work as a concept artist, featuring her projects, concept art gallery,
showreels, and professional information. The site is built with vanilla HTML, CSS, and JavaScript, emphasizing
performance, accessibility, and maintainability.

A key feature is the automated project management system that dynamically generates project cards by scanning HTML files
and matching them with thumbnail images, eliminating the need for manual content updates.

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [📜 Usage](#-usage)
- [🔑 Environment Variables](#-environment-variables)
- [🧠 Code Walkthrough](#-code-walkthrough)
- [🧪 Testing](#-testing)
- [📌 Roadmap / Future Improvements](#-roadmap--future-improvements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📄 Example Project Data Structure](#-example-project-data-structure)

## 🚀 Features

- **🤖 Automated Project Management** - Auto-generates project listings from files and thumbnails
- **🎭 Interactive Concept Art Gallery** - Lightbox-enabled gallery with responsive grid layout
- **📱 Mobile-First Responsive Design** - Optimized for all devices (320px to 1440px+)
- **♿ Accessibility-First** - WCAG compliant with keyboard navigation, screen reader support, and focus management
- **🎬 Integrated Showreel Player** - Custom video player with poster frames and captions
- **📄 Professional About Page** - Contact information, skills showcase, and CV download
- **🎨 Consistent Brand Identity** - Strict 4-color palette with design tokens
- **⚡ Performance Optimized** - Lazy loading, optimized images, and minimal dependencies
- **🔍 SEO Ready** - Semantic HTML, meta tags, and structured content

## 🛠 Tech Stack

**Frontend:**

- HTML5 (Semantic markup)
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Poppins, Inter)

**Build Tools:**

- Node.js (for build scripts)
- NPM (package management)

**Design System:**

- 4-color brand palette (`--leaf-light`, `--leaf-dark`, `--berry`, `--sand`)
- Fluid typography and spacing with `clamp()` functions
- Mobile-first responsive breakpoints (320px → 1440px+)

## 📂 Project Structure

```
misslydia-designs.github.io/
├── 📄 index.html                 # Homepage with hero and portfolio overview
├── 📄 about.html                 # About page with contact info and CV download
├── 📄 projects.html              # Auto-generated projects grid
├── 📄 concept-art.html           # Interactive art gallery with lightbox
├── 📄 showreel.html              # Video showreel with custom player
├── 📦 package.json               # NPM configuration and build scripts
├── 📖 README.md                  # This documentation file
│
├── 📁 assets/
│   ├── 🎨 css/
│   │   └── style.css             # Main stylesheet with design system
│   ├── 📊 data/
│   │   ├── footer.json    # Mobile menu functionality
│   │   └── projects.json         # Auto-generated project manifest
│   ├── 🖼️ images/
│   │   ├── logo.png              # Site logo and branding
│   │   ├── showreel-poster.jpg   # Video thumbnail
│   │   ├── icon-*.svg            # Navigation icons
│   │   ├── about-me-images-and-cv/    # Profile photos and resume
│   │   ├── concept-art-images/        # Gallery artwork files (SVG placeholders)
│   │   └── project-images/
│   │       └── project-thumbnail-images/  # Auto-matched project thumbnails
│   ├── ⚡ js/
│   │   ├── footer-loader.js      # Mobile menu functionality
│   │   ├── header.js             # Mobile menu functionality
│   │   ├── lightbox.js           # Image lightbox for galleries
│   │   ├── main.js               # General site functionality
│   │   ├── projects-loader.js    # Dynamic project card generation
│   │   └── showreel.js           # Custom video player controls
│   └── 🎬 videos/
│       ├── showreel.mp4          # Main showreel video
│       └── showreel.vtt          # Video captions/subtitles
│
├── 📁 projects-collection/
│   ├── example-project.html      # Individual project pages
│   └── forest-research.html      # Additional project pages...
│
└── 📁 tools/
    └── build-projects-manifest.mjs   # Auto-generates projects.json from HTML files
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- A modern web browser
- Basic text editor or IDE (VS Code recommended)

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/misslydia-designs.github.io.git
   cd misslydia-designs.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate project manifest:**
   ```bash
   npm run build:projects
   ```

4. **Start local development server:**

   **Option A: VS Code Live Server Extension**
    - Install Live Server extension
    - Right-click `index.html` → "Open with Live Server"

   **Option B: Python HTTP Server**
   ```bash
   python -m http.server 8000
   ```

   **Option C: Node.js HTTP Server**
   ```bash
   npx http-server . -p 8000
   ```

5. **Access the site:**
    - Navigate to `http://localhost:8000` in your browser

## 📜 Usage

### Viewing the Portfolio

- **Homepage** (`index.html`): Hero section with portfolio overview and navigation
- **Projects** (`projects.html`): Auto-generated grid of project cards
- **Concept Art** (`concept-art.html`): Interactive gallery with lightbox functionality
- **About** (`about.html`): Professional information, skills, and CV download
- **Showreels** (`showreel.html`): Video content with custom player and captions

### Adding New Projects

1. **Create project HTML file:**
   ```bash
   # Add new file to projects-collection/
   touch projects-collection/my-new-project.html
   ```

2. **Add proper HTML structure with title and meta description:**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <title>My New Project - Katelyn Lydia</title>
       <meta name="description" content="Description of the project">
       <!-- ... rest of head content ... -->
   </head>
   ```

3. **Add matching thumbnail using naming convention:**
   ```
   # Thumbnail must match project filename
   assets/images/project-images/project-thumbnail-images/my-new-project-thumbnail.png
   ```

4. **Regenerate project manifest:**
   ```bash
   npm run build:projects
   ```

### Adding Concept Art

1. Add artwork files to `assets/images/concept-art-images/`
2. Update the gallery in `concept-art.html` by adding new `<article class="art-item">` blocks
3. Include proper alt text and descriptions for accessibility

### Customizing Content

- **Colors**: Modify CSS custom properties in `:root` section of `assets/css/style.css`
- **Fonts**: Update Google Fonts links in HTML `<head>` sections
- **Hero Image**: Replace `assets/images/hero.jpg` or update `--hero-bg-image` variable
- **Logo**: Replace `assets/images/logo.png`
- **Content**: Edit HTML files directly for text and structure changes

## 🔑 Environment Variables

This project uses **no environment variables** - it's a static website that runs entirely in the browser. All
configuration is done through:

- **CSS Custom Properties** (in `assets/css/style.css` `:root` section)
- **HTML Meta Tags** (for SEO and page information)
- **File-based Configuration** (image paths, content structure)
- **Build Script Settings** (in `tools/build-projects-manifest.mjs`)

## 🧠 Code Walkthrough

### Core Architecture

**HTML Structure:**

- Semantic HTML5 with proper heading hierarchy and ARIA attributes
- Consistent header/navigation across all pages with slide-out mobile menu
- Accessibility-first markup with proper roles, labels, and focus management

**CSS Design System:**

- **4-Color Brand Palette**: Strict color constraints using CSS custom properties
    - `--leaf-light` (#C6E88E): Light green for highlights
    - `--leaf-dark` (#3F6E3A): Deep green for primary elements
    - `--berry` (#7A0E2B): Maroon for hover states and focus
    - `--sand` (#EEDCA8): Pale sand for subtle backgrounds
- **Fluid Typography**: `clamp()` functions for responsive text scaling
- **Fluid Spacing**: Responsive spacing system with consistent ratios
- **Mobile-First**: Breakpoints start at 320px and scale to 1440px+

**JavaScript Modules:**

- `header.js`: Mobile menu toggle with accessibility support
- `lightbox.js`: Image gallery with keyboard navigation and focus trapping
- `projects-loader.js`: Dynamic project card generation from JSON data
- `showreel.js`: Custom video player with captions and accessibility
- `main.js`: General site functionality and utilities

### Automated Project Management Pipeline

1. **Build Script** (`tools/build-projects-manifest.mjs`):
    - Scans `projects-collection/` directory for HTML files
    - Extracts project titles from `<title>` tags
    - Extracts descriptions from `<meta name="description">` tags
    - Matches thumbnails using naming convention: `{slug}-thumbnail.{ext}`
    - Supported thumbnail formats: `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`
    - Generates sorted JSON manifest at `assets/data/projects.json`

2. **Frontend Loader** (`assets/js/projects-loader.js`):
    - Fetches project data from JSON manifest on page load
    - Creates interactive project cards dynamically
    - Handles loading states, error scenarios, and fallback content
    - Maintains accessibility with proper ARIA labels and keyboard navigation

### Accessibility Features

- **Keyboard Navigation**: Full site navigable without mouse using Tab, Enter, Escape
- **Screen Reader Support**: Semantic markup, ARIA labels, and descriptive text
- **Focus Management**: Visible focus indicators and logical tab order
- **Focus Trapping**: Lightbox and mobile menu trap focus within modal contexts
- **Reduced Motion**: Respects `prefers-reduced-motion` user preferences
- **Color Contrast**: WCAG AA compliant color combinations
- **Touch Targets**: Minimum 44px touch targets for mobile accessibility

### Performance Optimizations

- **Lazy Loading**: Images load only when needed using `loading="lazy"`
- **Font Optimization**: Google Fonts with `preconnect` for faster loading
- **Minimal Dependencies**: No external JavaScript frameworks or libraries
- **Optimized Images**: Efficient file formats and compression
- **CSS Grid/Flexbox**: Modern layout methods for better performance

## 🧪 Testing

### Manual Testing Checklist

**Responsive Design:**

- [ ] Test on mobile devices (320px - 768px)
- [ ] Test on tablets (768px - 1024px)
- [ ] Test on desktop (1024px - 1440px+)
- [ ] Verify no horizontal scroll at any breakpoint

**Accessibility:**

- [ ] Navigate entire site using only keyboard (Tab, Enter, Escape)
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Verify all images have descriptive alt text
- [ ] Check color contrast ratios meet WCAG AA standards
- [ ] Confirm focus indicators are visible and logical

**Functionality:**

- [ ] Mobile menu opens/closes correctly on all devices
- [ ] Lightbox gallery works with mouse, keyboard, and touch
- [ ] Video player controls function properly with captions
- [ ] Project cards load from JSON without errors
- [ ] All navigation links work correctly
- [ ] CV download functions properly

**Performance:**

- [ ] Images load progressively with lazy loading
- [ ] No JavaScript errors in browser console
- [ ] Site loads quickly on slow connections
- [ ] Fonts load efficiently without layout shift

**Build System:**

- [ ] `npm run build:projects` generates correct JSON
- [ ] New projects appear after running build script
- [ ] Thumbnail matching works with different file formats

## 📌 Roadmap / Future Improvements

- [ ] **Advanced Project Filters**: Category, date, and technology filtering
- [ ] **CMS Integration**: Headless CMS for easier content management
- [ ] **Contact Form**: Functional contact form with backend integration
- [ ] **Blog Section**: Article/blog functionality for design insights
- [ ] **Progressive Web App**: Service worker for offline functionality
- [ ] **Performance Analytics**: Privacy-focused performance monitoring
- [ ] **3D Gallery**: WebGL-based 3D gallery for immersive art viewing
- [ ] **Internationalization**: Multi-language support for global audience
- [ ] **Advanced Build Pipeline**: Asset optimization and minification
- [ ] **Testing Automation**: Automated accessibility and visual regression testing

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

### How to Contribute:

1. **Fork the repository** on GitHub
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with clear, well-commented code
4. **Test thoroughly** across devices, browsers, and accessibility tools
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with detailed description

### Contribution Guidelines:

- **Follow existing code style** and commenting patterns
- **Ensure accessibility compliance** - test with keyboard and screen readers
- **Test on multiple devices** and browsers (Chrome, Firefox, Safari, Edge)
- **Update documentation** if adding new features or changing workflows
- **Respect the design system** - use only the 4-color brand palette
- **Keep dependencies minimal** - avoid adding external libraries when possible

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 📄 Example Project Data Structure

The automated project system generates JSON data in the following format. Each project entry contains metadata extracted
from HTML files and matched thumbnail images:

```jsonc
// Example of how this works:
[
  {
    "title": "My Cool Project", // This will be displayed as the project title
    "description": "Brief info about what the project is about.", // This is the short summary shown under the title
    "href": "/projects-collection/my-cool-project.html", // Clicking the project card will take the user to this HTML file
    "thumbnail": "/assets/images/project-images/project-thumbnail-images/my-cool-project-thumbnail.png", // The image shown in the project card
    "slug": "my-cool-project" // Used internally for matching data or creating URLs
  }
]
```

---

**Built with ❤️ for the creative community**

For questions or collaboration opportunities, visit the [About page](about.html) for contact information.
