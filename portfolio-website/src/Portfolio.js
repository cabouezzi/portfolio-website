import React, { useState } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import {
  projectsData,
  personalInfo,
  aboutMe,
  socialLinks,
  contactInfo,
  timelineData,
} from "./data";
import Timeline from "./Timeline";
import Projects from "./Projects";

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Sort projects by date (most recent first)
  const sortedProjects = [...projectsData].sort((a, b) => {
    return b.dateCreated.localeCompare(a.dateCreated);
  });
  const [filteredProjects, setFilteredProjects] = useState(sortedProjects);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {personalInfo.initials}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <button
                onClick={() => scrollToSection("home")}
                className="hover:text-blue-400 transition"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-blue-400 transition"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="hover:text-blue-400 transition"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="hover:text-blue-400 transition"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-blue-400 transition"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left px-4 py-2 hover:bg-slate-700 rounded"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-4 py-2 hover:bg-slate-700 rounded"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="block w-full text-left px-4 py-2 hover:bg-slate-700 rounded"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left px-4 py-2 hover:bg-slate-700 rounded"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-4 py-2 hover:bg-slate-700 rounded"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            {personalInfo.title}
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            {personalInfo.tagline}
          </p>
          <button
            onClick={() => scrollToSection("projects")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            View My Work
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>

          {/* Grid for paragraphs + personal info */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Paragraphs */}
            <div>
              {aboutMe.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Personal Info */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-8 border border-slate-700">
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="text-blue-400 font-semibold">Location:</span>{" "}
                  {personalInfo.location}
                </p>
                <p>
                  <span className="text-blue-400 font-semibold">
                    Experience:
                  </span>{" "}
                  {personalInfo.experience}
                </p>
                <p>
                  <span className="text-blue-400 font-semibold">Focus:</span>{" "}
                  {personalInfo.focus}
                </p>
                <p>
                  <span className="text-blue-400 font-semibold">
                    Availability:
                  </span>{" "}
                  {personalInfo.availability}
                </p>
              </div>
            </div>
          </div>

          {/* Skills & Technologies (full width) */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {[...new Set(aboutMe.skills)].map((skill) => (
                <span
                  key={skill}
                  className="bg-slate-700 px-4 py-2 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience and Education</h2>
          <Timeline timelineData={timelineData} />
        </div>
      </section>

      {/* Projects Section */}
      <Projects projects={sortedProjects} />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">{contactInfo.heading}</h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
            {contactInfo.description}
          </p>
          <div className="flex justify-center gap-8 mb-12">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 hover:bg-blue-500 p-4 rounded-lg transition"
            >
              <Github size={32} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 hover:bg-blue-500 p-4 rounded-lg transition"
            >
              <Linkedin size={32} />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              className="bg-slate-700 hover:bg-blue-500 p-4 rounded-lg transition"
            >
              <Mail size={32} />
            </a>
          </div>
          <p className="text-gray-400">{contactInfo.copyright}</p>
        </div>
      </section>
    </div>
  );
}
