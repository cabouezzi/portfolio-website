import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { projectsData, personalInfo } from './data';
import ReactMarkdown from 'react-markdown';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [previewKey, setPreviewKey] = useState(0); // For forcing re-render
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
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
    productUrl,
    tags, 
    fullDescription, 
    challenges, 
    learnings,
    previewComponent,
    previewHeight = "600px"
  } = project;

  // Get the preview component
  const PreviewComponent = previewComponent ? previewComponent : null;

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
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {title}
            </h1>
            {/* Date - Right under title */}
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={18} />
              <span>{formatDate(dateCreated)}</span>
            </div>
          </div>

          {/* Interactive Preview Window */}
          {PreviewComponent && (
            <div className="mb-4">
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
            </div>
          )}

          {/* Project Image (shown if no preview component) */}
          {!PreviewComponent && image && (
            <div className="mb-4 rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
              <img src={image} alt={title} className="w-full h-auto" />
            </div>
          )}

          {/* Code and Product Buttons */}
          <div className="mb-12 flex gap-4">
            {codeUrl && (
              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-semibold inline-flex"
              >
                <Github size={20} />
                View Code
              </a>
            )}
            {productUrl && (
              <a
                href={productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-semibold inline-flex"
              >
                <ExternalLink size={20} />
                View Product
              </a>
            )}
          </div>

          {/* Description Section */}
          {description && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {description}
                </p>
              </div>
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

          {/* About This Project */}
          {fullDescription && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="text-slate-300 text-base leading-relaxed mb-4">
                          {children}
                        </p>
                      ),
                      li: ({ children }) => (
                        <li className="ml-4 list-disc text-slate-300 text-base leading-relaxed mb-2">
                          {children}
                        </li>
                      ),
                      ul: ({ children }) => <ul className="mb-4 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="mb-4 ml-4 list-decimal space-y-1">{children}</ol>,
                      img: ({ src, alt }) => (
                        <img 
                          src={src} 
                          alt={alt || ''} 
                          className="w-full rounded-lg my-6 border border-slate-600"
                        />
                      ),
                    }}
                  >
                    {fullDescription}
                  </ReactMarkdown>
                </div>
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
