import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { projectsData, personalInfo } from './data';
import ChessBoard from './ChessBoard';

// Map of component names to actual components
const PREVIEW_COMPONENTS = {
  ChessBoard: ChessBoard,
  // Add more preview components here as you create them
  // OtherProject: OtherProjectComponent,
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [previewKey, setPreviewKey] = useState(0); // For forcing re-render
  
  // Find project by slug
  const project = projectsData.find(p => p.slug === slug);

  // If project not found, show 404
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Project not found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const { 
    title, 
    description, 
    image, 
    dateCreated, 
    liveUrl, 
    codeUrl, 
    tags, 
    fullDescription, 
    challenges, 
    learnings,
    previewComponent,
    previewHeight = "600px"
  } = project;

  // Get the preview component
  const PreviewComponent = previewComponent ? PREVIEW_COMPONENTS[previewComponent] : null;

  // Format date
  const formatDate = (dateString) => {
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
            >
              <ArrowLeft size={20} />
              <span>Back to Portfolio</span>
            </button>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {personalInfo.initials}
            </div>
          </div>
        </div>
      </nav>

      {/* Project Content */}
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">{description}</p>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(dateCreated)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={18} />
                <span>{tags.length} technologies</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-semibold"
                >
                  <ExternalLink size={20} />
                  View Live Demo
                </a>
              )}
              {codeUrl && (
                <a
                  href={codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-semibold"
                >
                  <Github size={20} />
                  View Code
                </a>
              )}
            </div>
          </div>

          {/* Interactive Preview Window */}
          {PreviewComponent && (
            <div className="mb-12">
              <div className="bg-slate-800 border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                {/* Preview Content */}
                <div 
                  className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 flex items-center justify-center overflow-auto"
                  style={{ minHeight: previewHeight }}
                >
                  <div key={previewKey} className="w-full h-full flex items-center justify-center">
                    <PreviewComponent />
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-3 text-center">
                ✨ Try interacting with the live demo above!
              </p>
            </div>
          )}

          {/* Project Image (shown if no preview component) */}
          {!PreviewComponent && image && (
            <div className="mb-12 rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
              <img src={image} alt={title} className="w-full h-auto" />
            </div>
          )}

          {/* Tags Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-slate-700 px-4 py-2 rounded-lg text-gray-300 hover:bg-slate-600 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Full Description */}
          {fullDescription && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {fullDescription}
                </p>
              </div>
            </div>
          )}

          {/* Challenges */}
          {challenges && challenges.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Challenges Faced</h2>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <ul className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Learnings */}
          {learnings && learnings.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Key Learnings</h2>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <ul className="space-y-3">
                  {learnings.map((learning, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>{learning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg transition font-semibold"
            >
              ← Back to All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
