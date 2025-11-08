# Portfolio Project Card System

## Overview
This portfolio now features a dynamic project card system with powerful filtering capabilities. Projects are stored in a centralized data file for easy management.

## Project Structure

### Files Created:
1. **`projectsData.js`** - Central data file containing all project information
2. **`ProjectCard.js`** - Reusable card component displaying project details
3. **`ProjectFilter.js`** - Advanced filtering component with search, tags, and date filters
4. **`Portfolio.js`** - Updated to integrate the new card system

## How to Add a New Project

Simply edit `src/projectsData.js` and add a new object to the array:

```javascript
{
  id: 2, // Unique ID (increment from last project)
  title: "Your Project Title",
  description: "A brief 2-3 sentence description of your project highlighting key features and technologies.",
  image: "/your-project-image.png", // Place image in public folder
  dateCreated: "2024-11", // Format: YYYY-MM
  liveUrl: "https://your-live-demo.com", // Optional: leave empty string if no live demo
  codeUrl: "https://github.com/yourusername/repo", // Optional: leave empty string if private
  tags: ["React", "TypeScript", "Firebase", "Machine Learning"], // Add relevant tags
  featured: true // Set to true for featured projects
}
```

## Adding Project Images

1. Place your project screenshot/preview image in the `/public` folder
2. Reference it in the `image` field as `/your-image-name.png`
3. Recommended image dimensions: 800x450px (16:9 aspect ratio)

## Features

### ProjectCard Component
- **Image Preview**: Displays project screenshot with hover zoom effect
- **Title & Date**: Shows project name and creation date
- **Description**: Brief project summary
- **Top 3 Tags**: Displays the first 3 tags from your tag array (like LinkedIn skills)
- **Action Buttons**: 
  - "Live" button (if `liveUrl` is provided)
  - "Code" button (if `codeUrl` is provided)

### ProjectFilter Component
- **Text Search**: Search by project title, description, or tags
- **Tag Filtering**: Click tags to filter projects (multiple tags supported)
- **Date Range Filter**: 
  - All Time
  - Last 3 Months
  - Last 6 Months
  - Last Year
- **Results Counter**: Shows number of filtered vs total projects
- **Clear Filters**: Easy one-click filter reset

## Chess AI Project

Update the Chess AI entry in `projectsData.js` with your actual information:

```javascript
{
  id: 1,
  title: "Chess AI",
  description: "YOUR DESCRIPTION HERE",
  image: "/chess-preview.png", // Add your chess board screenshot to public folder
  dateCreated: "2024-10", // Update with actual date
  liveUrl: "YOUR_LIVE_URL", // Add if available
  codeUrl: "YOUR_GITHUB_URL", // Add your repo URL
  tags: ["Python", "AI/ML", "Minimax Algorithm", "Game Development", "Data Structures"],
  featured: true
}
```

## Customization Tips

### Changing Card Layout
Edit `ProjectCard.js` to modify:
- Card height/width
- Image aspect ratio
- Button styling
- Tag display (currently shows top 3)

### Adding More Filters
Edit `ProjectFilter.js` to add:
- Category filters
- Difficulty level filters
- Technology-specific filters

### Styling
All components use Tailwind CSS classes. Modify colors, spacing, and effects directly in the className attributes.

## Tag Best Practices

Use tags consistently across projects:
- **Languages**: JavaScript, Python, TypeScript, Swift
- **Frameworks**: React, Node.js, Django, SwiftUI
- **Technologies**: Firebase, MongoDB, REST API, GraphQL
- **Concepts**: Machine Learning, Full Stack, Mobile Development
- **Tools**: Git, Docker, AWS

The filter will automatically collect all unique tags from your projects.

## Running the Project

```bash
npm start
```

Your portfolio will be available at `http://localhost:3000`

## Questions or Need to Update Chess AI?

Please provide:
1. Chess AI project description (2-3 sentences)
2. Date created (format: YYYY-MM)
3. Live demo URL (if available)
4. GitHub repository URL
5. Screenshot file name (if you have one ready)
