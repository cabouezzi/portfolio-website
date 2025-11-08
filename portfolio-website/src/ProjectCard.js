import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Github, Calendar } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const { slug, title, description, image, dateCreated, liveUrl, codeUrl, tags } = project;
  
  // Show only top 3 tags
  const displayTags = tags.slice(0, 3);
  
  // Format date
  const formatDate = (dateString) => {
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Navigate to project detail page
  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons or links
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    navigate(`/project/${slug}`);
  };

  // Prevent navigation when clicking external links
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 flex flex-col h-full cursor-pointer"
    >
      {/* Image Preview */}
      <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden relative">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-6xl text-slate-600">{"<>"}</div>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/10 transition-colors duration-300 flex items-center justify-center">
          <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 font-semibold">
            View Details →
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title and Date */}
        <div className="mb-3">
          <h3 className="text-xl font-semibold mb-2 text-gray-100 hover:text-blue-400 transition">
            {title}
          </h3>
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(dateCreated)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 mb-4 leading-relaxed text-sm flex-grow">
          {description}
        </p>

        {/* Tags (Top 3) */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {displayTags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs bg-slate-700 px-3 py-1 rounded-full text-gray-300 hover:bg-slate-600 transition"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-auto">
          {liveUrl && (
            <a 
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition font-medium z-10"
            >
              <ExternalLink size={18} /> Live
            </a>
          )}
          {codeUrl && (
            <a 
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition font-medium z-10"
            >
              <Github size={18} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
