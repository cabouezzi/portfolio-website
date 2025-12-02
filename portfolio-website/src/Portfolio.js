import React, { useState } from "react";
import { Menu, X, Github, Linkedin, Mail, User, Briefcase, GraduationCap } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("projects"); // "profile", "experience", or "projects"
  
  // Sort projects by date (most recent first)
  const sortedProjects = [...projectsData].sort((a, b) => {
    return b.dateCreated.localeCompare(a.dateCreated);
  });

  const handleNavigation = (view) => {
    setCurrentView(view);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-700 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-gray-300">Menu</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <button
            onClick={() => handleNavigation("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition mb-2 ${
              currentView === "profile"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-slate-800"
            }`}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
          <button
            onClick={() => handleNavigation("experience")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition mb-2 ${
              currentView === "experience"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-slate-800"
            }`}
          >
            <GraduationCap size={20} />
            <span>Experience</span>
          </button>
          <button
            onClick={() => handleNavigation("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              currentView === "projects"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-slate-800"
            }`}
          >
            <Briefcase size={20} />
            <span>Projects</span>
          </button>
        </nav>

        {/* Contact Info */}
        <div className="p-4 border-t border-slate-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Connect</h3>
          <div className="flex gap-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-blue-500 p-2 rounded-lg transition"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-blue-500 p-2 rounded-lg transition"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              className="bg-slate-800 hover:bg-blue-500 p-2 rounded-lg transition"
              title="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {personalInfo.name}
          </h1>
          <div className="ml-auto">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-10 w-10 object-cover rounded-full"
            />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {currentView === "profile" ? (
            <ProfileView />
          ) : currentView === "experience" ? (
            <ExperienceView />
          ) : (
            <ProjectsView projects={sortedProjects} />
          )}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Profile View Component
function ProfileView() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Page Title */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Profile</h1>
      </div>

      {/* About Section */}
      <section>
        <h2 className="text-3xl font-bold mb-2">About Me</h2>
        <p className="text-gray-400 mb-6">{personalInfo.title}</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Paragraphs */}
          <div className="space-y-4">
            {aboutMe.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Personal Info */}
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-slate-700 h-fit">
            <div className="space-y-3 text-gray-300">
              <p>
                <span className="text-blue-400 font-semibold">Location:</span>{" "}
                {personalInfo.location}
              </p>
              <p>
                <span className="text-blue-400 font-semibold">Experience:</span>{" "}
                {personalInfo.experience}
              </p>
              <p>
                <span className="text-blue-400 font-semibold">Focus:</span>{" "}
                {personalInfo.focus}
              </p>
              <p>
                <span className="text-blue-400 font-semibold">Availability:</span>{" "}
                {personalInfo.availability}
              </p>
            </div>
          </div>
        </div>

        {/* Skills & Technologies */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {[...new Set(aboutMe.skills)].map((skill) => (
              <span
                key={skill}
                className="bg-slate-700 px-3 py-2 rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-slate-800/50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">{contactInfo.heading}</h2>
        <p className="text-gray-300 mb-8 text-center max-w-2xl mx-auto">
          {contactInfo.description}
        </p>
        <div className="flex justify-center gap-6 mb-6">
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
        <p className="text-gray-400 text-center text-sm">{contactInfo.copyright}</p>
      </section>
    </div>
  );
}

// Experience View Component
function ExperienceView() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Experience</h1>
      </div>

      <section>
        <h2 className="text-3xl font-bold mb-6">Experience & Education</h2>
        <Timeline timelineData={timelineData} />
      </section>
    </div>
  );
}

// Projects View Component
function ProjectsView({ projects }) {
  return (
    <div className="h-full">
      <Projects projects={projects} />
    </div>
  );
}
