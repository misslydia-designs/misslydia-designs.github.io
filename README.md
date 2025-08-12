# misslydia-designs.github.io


## 📄 Example Project Data Structure

Below is an example of how to structure your **`projects.json`** file so the grid can automatically generate project cards.  
Each property is explained with inline comments.

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

💡 **Notes:**

* `title` → Human-readable name shown in the card header.
* `description` → A short description of the project.
* `href` → The direct path to the project’s HTML page.
* `thumbnail` → Path to the project’s thumbnail image (used in the grid).
* `slug` → A lowercase, hyphen-separated identifier that should match the project filename (without `.html`).

