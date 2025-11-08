import projectsData from "./projectsData";

// Personal Informationx
export const personalInfo = {
  name: "Chaniel Abou-Ezzi",
  initials: "CA",
  title: "Current Role: Software Engineer at Apple ",
  tagline: "Hi, I'm Chaniel! I used to code for fun and now it's my job. 🙂",
  location: "Austin, TX",
  experience: "Early Career",
  focus: "iOS Development and AI",
  availability: "Open to connect",
};

// About section content
export const aboutMe = {
  paragraphs: [
    "I'm a passionate developer with longtime experience within the macOS/iOS ecosystem, with over 8 years of development. I hold a B.S. in Computer Science from the University of Massachusetts Amherst with a 3.99 GPA. While most of my experience is with iOS development, I like to keep up with beyond SOTA research in machine learning, theoretical CS, and quantum algorithms.",
    "I love solving complex problems and continuously learning new things. If I'm not coding, you could find me drawing, DJ-ing, playing a sport, or trying some other new hobby!",
  ],
  skills: projectsData.map(project => project.tags).flat(),
};

// Social links
export const socialLinks = {
  github: "https://github.com/cabouezzi",
  linkedin: "https://linkedin.com/in/chaniel-abou-ezzi",
  email: "cabouezzi@apple.com",
};

// Contact section
export const contactInfo = {
  heading: "Get In Touch",
  description: "I'm always interested in hearing about new projects and opportunities. Feel free to reach out!",
  copyright: "© 2025 Chaniel Abou-Ezzi. All rights reserved.",
};
