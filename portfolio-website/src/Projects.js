import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";

/**
 * ProjectsSection Component
 *
 * Props:
 * - projects: array of all projects data
 *
 * Handles filtering internally.
 */
export default function ProjectsSection({ projects }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
        </div>

        {/* Intro Text */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm">Try out the interactive demos below - click any project to get started!</p>
        </div>

        {/* Project Filter */}
        <ProjectFilter
          projects={projects}
          onFilterChange={setFilteredProjects}
        />

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects match your current filters.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or clearing filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}