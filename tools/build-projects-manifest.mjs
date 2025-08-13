#!/usr/bin/env node

/**
 * BUILD PROJECTS MANIFEST
 * ======================
 * This script automatically scans the /projects-collection/ folder for HTML files
 * and matches them with thumbnail images to create a JSON manifest file.
 *
 * HOW IT WORKS:
 * 1. Looks for .html files in /projects-collection/
 * 2. For each file, extracts the title and description from the HTML
 * 3. Finds matching thumbnail images using the naming convention: <slug>-thumbnail.(png|jpg|jpeg|webp|svg)
 * 4. Creates a JSON file at /assets/data/projects.json
 *
 * USAGE: npm run build:projects
 */

// Import Node.js built-in modules (no external dependencies needed)
import fs from 'fs'; // File system operations (reading/writing files)
import path from 'path'; // Path utilities for working with file paths
import {fileURLToPath} from 'url'; // Convert URL to file path

// Get the current directory (needed because ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths relative to the project root
const PROJECT_ROOT = path.join(__dirname, '..');  // Go up one level from /tools/ to project root
const PROJECTS_DIR = path.join(PROJECT_ROOT, 'projects-collection');
const THUMBNAILS_DIR = path.join(PROJECT_ROOT, 'assets', 'images', 'project-images', 'project-thumbnail-images');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'assets', 'data', 'projects.json');
const FALLBACK_THUMBNAIL = '/assets/images/project-images/project-thumbnail-images/example-project1-thumbnail.png';

/**
 * FUNCTION: Convert a file slug to Title Case
 * Takes a filename like "example-project" and converts it to "Example Project"
 */
function slugToTitle(slug) {
    return slug
        .split('-')           // Split on hyphens: ["example", "project"]
        .map(word =>          // For each word:
            word.charAt(0).toUpperCase() +  // Capitalize first letter
            word.slice(1).toLowerCase()     // Make rest lowercase
        )
        .join(' ');          // Join with spaces: "Example Project"
}

/**
 * FUNCTION: Extract title from HTML content
 * Looks for <title>...</title> tag in the HTML and returns the content
 */
function extractTitle(htmlContent, fallbackSlug) {
    // Use a regular expression to find the <title> tag
    // The ? makes it non-greedy (stops at first </title>)
    const titleMatch = htmlContent.match(/<title[^>]*>(.*?)<\/title>/i);

    if (titleMatch && titleMatch[1]) {
        // Remove any extra whitespace and return the title
        return titleMatch[1].trim();
    }

    // If no title found, create one from the filename
    return slugToTitle(fallbackSlug);
}

/**
 * FUNCTION: Extract description from HTML content
 * Looks for <meta name="description" content="..."> tag
 */
function extractDescription(htmlContent) {
    // Look for meta description tag (case insensitive)
    const descMatch = htmlContent.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["'][^>]*>/i);

    if (descMatch && descMatch[1]) {
        return descMatch[1].trim();
    }

    // Default fallback description
    return "Project details and images.";
}

/**
 * FUNCTION: Find matching thumbnail for a project
 * Looks for files matching the pattern: <slug>-thumbnail.(png|jpg|jpeg|webp|svg)
 */
function findThumbnail(slug) {
    // List of image extensions to check
    const extensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

    try {
        // Get list of all files in the thumbnails directory
        const files = fs.readdirSync(THUMBNAILS_DIR);

        // Look for a file that matches our naming pattern
        for (const ext of extensions) {
            const expectedFilename = `${slug}-thumbnail.${ext}`;

            // Check if this file exists in our list
            if (files.includes(expectedFilename)) {
                // Return the web path (not filesystem path)
                return `/assets/images/project-images/project-thumbnail-images/${expectedFilename}`;
            }
        }

        // If no matching thumbnail found, use fallback
        console.log(`⚠️  No thumbnail found for "${slug}", using fallback`);
        return FALLBACK_THUMBNAIL;

    } catch (error) {
        // If we can't read the thumbnails directory, use fallback
        console.log(`⚠️  Cannot read thumbnails directory, using fallback for "${slug}"`);
        return FALLBACK_THUMBNAIL;
    }
}

/**
 * MAIN FUNCTION: Build the projects manifest
 */
async function buildProjectsManifest() {
    console.log('🚀 Building projects manifest...');

    try {
        // Check if projects directory exists
        if (!fs.existsSync(PROJECTS_DIR)) {
            console.error(`❌ Projects directory not found: ${PROJECTS_DIR}`);
            process.exit(1);
        }

        // Read all files in the projects directory
        const files = fs.readdirSync(PROJECTS_DIR);

        // Filter to only .html files (ignore folders, .DS_Store, etc.)
        const htmlFiles = files.filter(file =>
            file.endsWith('.html') &&           // Must be HTML file
            !file.startsWith('.') &&            // Ignore hidden files
            fs.statSync(path.join(PROJECTS_DIR, file)).isFile()  // Must be a file, not folder
        );

        console.log(`📁 Found ${htmlFiles.length} HTML files in projects directory`);

        // Array to store our project data
        const projects = [];

        // Process each HTML file
        for (const file of htmlFiles) {
            console.log(`📄 Processing: ${file}`);

            // Extract the slug (filename without .html extension)
            const slug = path.basename(file, '.html');  // "example-project.html" → "example-project"

            try {
                // Read the HTML file content
                const filePath = path.join(PROJECTS_DIR, file);
                const htmlContent = fs.readFileSync(filePath, 'utf8');

                // Extract information from the HTML
                const title = extractTitle(htmlContent, slug);
                const description = extractDescription(htmlContent);
                const thumbnail = findThumbnail(slug);
                const href = `/projects-collection/${file}`;  // Web path for links

                // Create project object
                const project = {
                    title,
                    description,
                    href,
                    thumbnail,
                    slug
                };

                projects.push(project);
                console.log(`✅ Added: "${title}"`);

            } catch (error) {
                console.error(`❌ Error processing ${file}:`, error.message);
                // Continue with other files even if one fails
            }
        }

        // Sort projects alphabetically by title
        projects.sort((a, b) => a.title.localeCompare(b.title));

        // Create output directory if it doesn't exist
        const outputDir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, {recursive: true});
            console.log(`📁 Created directory: ${outputDir}`);
        }

        // Write the JSON file with pretty formatting (2-space indentation)
        const jsonContent = JSON.stringify(projects, null, 2);
        fs.writeFileSync(OUTPUT_FILE, jsonContent, 'utf8');

        console.log(`✅ Generated manifest with ${projects.length} projects`);
        console.log(`📄 Output: ${OUTPUT_FILE}`);
        console.log('🎉 Build complete!');

    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Run the build process
buildProjectsManifest();
