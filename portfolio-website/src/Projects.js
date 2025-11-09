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
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>

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
    </section>
  );
}