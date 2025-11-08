# Portfolio Data Structure

## 📁 Data Organization

All portfolio content is now centralized in the `/src/data` directory for easy management and updates.

## 📂 Directory Structure

```
src/
└── data/
    ├── index.js           # Central export file (import everything from here)
    ├── personalData.js    # Personal info, about section, social links, contact
    └── projectsData.js    # All project information
```

## 🎯 How to Import Data

**All data can be imported from a single location:**

```javascript
import { 
  projectsData,      // Array of all projects
  personalInfo,      // Your name, title, location, etc.
  aboutMe,          // About section content and skills
  socialLinks,      // GitHub, LinkedIn, Email
  contactInfo       // Contact section text
} from './data';
```

## 📝 Data Files

### 1. `personalData.js`

Contains all personal information used throughout the portfolio:

#### **personalInfo** - Hero and navigation
```javascript
{
  name: "Chaniel Ezzi",
  initials: "CE",
  title: "Full Stack Developer | Problem Solver | Tech Enthusiast",
  tagline: "I build modern web applications...",
  location: "Lawrence, MA",
  experience: "2+ Years",
  focus: "Full Stack Development",
  availability: "Open to Opportunities"
}
```

#### **aboutMe** - About section
```javascript
{
  paragraphs: [
    "First paragraph about you...",
    "Second paragraph..."
  ],
  skills: ["React", "JavaScript", "TypeScript", ...]
}
```

#### **socialLinks** - Contact links
```javascript
{
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  email: "your.email@example.com"
}
```

#### **contactInfo** - Contact section
```javascript
{
  heading: "Get In Touch",
  description: "I'm always interested in...",
  copyright: "© 2025 Chaniel Ezzi. All rights reserved."
}
```

### 2. `projectsData.js`

Array of all your projects with complete details:

```javascript
[
  {
    id: 1,
    slug: "chess-ai",
    title: "Chess AI",
    description: "Brief description for card...",
    image: "/chess-preview.png",
    dateCreated: "2024-10",
    liveUrl: "https://...",
    codeUrl: "https://github.com/...",
    tags: ["Python", "AI/ML", ...],
    featured: true,
    
    // Interactive preview
    previewComponent: "ChessBoard",
    previewHeight: "600px",
    
    // Detail page content
    fullDescription: "Multi-paragraph description...",
    challenges: ["Challenge 1", "Challenge 2"],
    learnings: ["Learning 1", "Learning 2"]
  }
]
```

## ✏️ Updating Your Portfolio

### Update Personal Information

Edit `src/data/personalData.js`:

```javascript
// Change your name, title, location
export const personalInfo = {
  name: "Your Name",
  initials: "YN",
  title: "Your Title",
  // ... update other fields
};

// Update about section
export const aboutMe = {
  paragraphs: [
    "Your story here...",
    "More about you..."
  ],
  skills: ["Your", "Skills", "Here"]
};

// Update social links
export const socialLinks = {
  github: "https://github.com/YOUR_USERNAME",
  linkedin: "https://linkedin.com/in/YOUR_USERNAME",
  email: "YOUR_EMAIL@example.com"
};
```

### Add a New Project

Edit `src/data/projectsData.js`:

```javascript
{
  id: 2,  // Increment from last project
  slug: "my-new-project",  // URL-friendly name
  title: "My New Project",
  description: "Short description for the card",
  image: "/project-image.png",
  dateCreated: "2024-11",
  liveUrl: "https://live-demo.com",
  codeUrl: "https://github.com/you/project",
  tags: ["React", "Node.js", "PostgreSQL"],
  featured: false,
  
  // Optional: Interactive preview
  previewComponent: null,  // or "ComponentName"
  previewHeight: "500px",
  
  // Detail page
  fullDescription: `
    Full description with multiple paragraphs.
    Explain what the project does and why.
  `,
  challenges: [
    "Challenge you faced and solved"
  ],
  learnings: [
    "What you learned from this project"
  ]
}
```

### Update Skills

Edit `src/data/personalData.js`:

```javascript
export const aboutMe = {
  // ... paragraphs ...
  skills: [
    "React",
    "TypeScript",
    "Your New Skill",  // Add here
    // ... more skills
  ]
};
```

## 🔄 Migration from Old Structure

If you're updating from the old structure where data was scattered across components:

**Before:**
```javascript
// Data was hardcoded in Portfolio.js
<h1>Chaniel Ezzi</h1>
<p>Full Stack Developer</p>
```

**After:**
```javascript
// Import from centralized data
import { personalInfo } from './data';

<h1>{personalInfo.name}</h1>
<p>{personalInfo.title}</p>
```

## 🎨 Benefits of This Structure

1. **Centralized**: All content in one place (`/data` directory)
2. **Easy Updates**: Change text without touching component code
3. **Type Safety**: Clear structure for all data fields
4. **Consistency**: Same data used everywhere automatically
5. **Scalable**: Easy to add new projects or update info
6. **Clean Imports**: Single import line gets all data

## 📖 Usage Examples

### In a Component

```javascript
import { personalInfo, projectsData, socialLinks } from './data';

function MyComponent() {
  return (
    <div>
      <h1>{personalInfo.name}</h1>
      <p>Projects: {projectsData.length}</p>
      <a href={socialLinks.github}>GitHub</a>
    </div>
  );
}
```

### Filter Projects

```javascript
import { projectsData } from './data';

// Get featured projects
const featured = projectsData.filter(p => p.featured);

// Get projects by tag
const reactProjects = projectsData.filter(p => 
  p.tags.includes('React')
);
```

## 🚀 Quick Start Checklist

- [ ] Update `personalData.js` with your information
- [ ] Update social links in `personalData.js`
- [ ] Update skills array in `personalData.js`
- [ ] Add/update projects in `projectsData.js`
- [ ] Add project images to `/public` folder
- [ ] Update Chess AI details with your actual info
- [ ] Test all social links work correctly
- [ ] Verify all project cards display properly

## 💡 Tips

- Keep descriptions concise for cards (2-3 sentences)
- Use longer descriptions for project detail pages
- Add images to `/public` folder and reference as `/image.png`
- Use consistent tag names across projects
- Date format: `YYYY-MM` (e.g., "2024-11")
- Featured projects appear prominently (optional)

Your portfolio is now data-driven and easy to maintain! 🎉
