import React, { useState, useMemo } from 'react';
import { Search, X, Filter } from 'lucide-react';

const ProjectFilter = ({ projects, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateFilter, setDateFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tagSet = new Set();
    projects.forEach(project => {
      project.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  // Filter projects based on all criteria
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Text search filter (searches title, description, and tags)
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tag filter
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(selectedTag => project.tags.includes(selectedTag));

      // Date filter
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const projectDate = new Date(project.dateCreated);
        const now = new Date();
        
        switch(dateFilter) {
          case '3months':
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(now.getMonth() - 3);
            matchesDate = projectDate >= threeMonthsAgo;
            break;
          case '6months':
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(now.getMonth() - 6);
            matchesDate = projectDate >= sixMonthsAgo;
            break;
          case 'year':
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(now.getFullYear() - 1);
            matchesDate = projectDate >= oneYearAgo;
            break;
          default:
            matchesDate = true;
        }
      }

      return matchesSearch && matchesTags && matchesDate;
    });
  }, [projects, searchQuery, selectedTags, dateFilter]);

  // Update parent component whenever filters change
  React.useEffect(() => {
    onFilterChange(filteredProjects);
  }, [filteredProjects, onFilterChange]);

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setDateFilter('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedTags.length > 0 || dateFilter !== 'all';

  return (
    <div className="mb-8">
      {/* Search Bar and Filter Toggle */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-lg flex items-center gap-2 transition ${
            showFilters || hasActiveFilters
              ? 'bg-blue-500 text-white'
              : 'bg-slate-800 text-gray-300 border border-slate-700 hover:border-slate-600'
          }`}
        >
          <Filter size={20} />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && !showFilters && (
            <span className="bg-white text-blue-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {(selectedTags.length > 0 ? 1 : 0) + (dateFilter !== 'all' ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-6">
          {/* Date Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">Date Range</label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Time' },
                { value: '3months', label: 'Last 3 Months' },
                { value: '6months', label: 'Last 6 Months' },
                { value: 'year', label: 'Last Year' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setDateFilter(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    dateFilter === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Filter by Tags {selectedTags.length > 0 && `(${selectedTags.length} selected)`}
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm transition ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-slate-700">
              <button
                onClick={clearFilters}
                className="text-red-400 hover:text-red-300 flex items-center gap-2 transition"
              >
                <X size={18} />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="mt-4 text-sm text-gray-400">
        Showing {filteredProjects.length} of {projects.length} projects
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-2 text-blue-400 hover:text-blue-300 underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectFilter;
