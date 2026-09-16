import React, { useState } from 'react';
import { ExternalLink, Calendar, Tag, Star, X, Info } from 'lucide-react';
import { Github } from './SocialIcons';

const Projects = ({ projects = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  // Extract unique categories
  const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="py-20 sm:py-28 border-b border-paper-border bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-classic-accent uppercase mb-2 block">
              03 / Selected Works
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink-heading font-normal">
              Featured Projects
            </h2>
            <div className="w-12 h-0.5 bg-classic-accent mt-3"></div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider rounded border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-classic-primary text-white border-classic-primary'
                    : 'bg-paper-card text-ink-muted border-paper-border hover:border-ink-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-paper-card border border-paper-border rounded italic text-ink-muted">
              No projects found in this category.
            </div>
          ) : (
            filteredProjects.map((project) => {
              const techList = project.technologies
                ? project.technologies.split(',').map((t) => t.trim())
                : [];

              return (
                <div
                  key={project.id}
                  className="group flex flex-col bg-paper-card border border-paper-border rounded shadow-classic hover:shadow-classic-md transition-all duration-300 overflow-hidden"
                >
                  {/* Image / Thumbnail */}
                  <div className="relative h-48 bg-stone-100 border-b border-paper-border overflow-hidden">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-50">
                        <Tag className="w-8 h-8 text-classic-accent/40 mb-2" />
                        <span className="font-serif text-sm font-medium text-ink-muted">
                          {project.category || 'Full Stack Project'}
                        </span>
                      </div>
                    )}

                    {/* Badges Overlay */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-mono font-medium text-amber-900 bg-amber-100/90 border border-amber-300 rounded shadow-sm">
                          <Star className="w-3 h-3 fill-amber-600 text-amber-600" />
                          Featured
                        </span>
                      )}
                    </div>

                    {project.project_date && (
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 text-[11px] font-mono text-ink-heading bg-paper-card/90 backdrop-blur-sm border border-paper-border rounded">
                        {project.project_date}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-classic-accent uppercase tracking-wider mb-1">
                        {project.category}
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-ink-heading group-hover:text-classic-accent transition-colors mb-2.5 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm text-ink-muted leading-relaxed line-clamp-3 mb-4">
                        {project.short_description || project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {techList.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[11px] font-mono bg-paper-muted text-ink-body border border-paper-border rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {techList.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[11px] font-mono text-ink-muted">
                            +{techList.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Card Footer Links */}
                      <div className="flex items-center justify-between pt-3 border-t border-paper-border text-sm">
                        <button
                          type="button"
                          onClick={() => setActiveProjectModal(project)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-classic-accent hover:underline focus:outline-none"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>

                        <div className="flex items-center gap-3">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-ink-muted hover:text-ink-heading transition-colors"
                              title="GitHub Repository"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-ink-body hover:text-classic-accent transition-colors"
                              title="Live Demo"
                            >
                              <span>Demo</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Project Details Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-paper-card border border-paper-border rounded shadow-classic-md w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-paper-border bg-paper">
              <div>
                <span className="text-xs font-mono text-classic-accent uppercase tracking-wider block mb-1">
                  {activeProjectModal.category} {activeProjectModal.project_date && `• ${activeProjectModal.project_date}`}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-ink-heading">
                  {activeProjectModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="p-1.5 text-ink-muted hover:text-ink-heading hover:bg-paper-muted rounded border border-paper-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {activeProjectModal.image_url && (
                <div className="w-full h-64 rounded border border-paper-border overflow-hidden">
                  <img
                    src={activeProjectModal.image_url}
                    alt={activeProjectModal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <h4 className="font-serif text-base font-semibold text-ink-heading mb-2">Overview</h4>
                <p className="text-sm sm:text-base text-ink-body leading-relaxed whitespace-pre-line">
                  {activeProjectModal.description || activeProjectModal.short_description}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-base font-semibold text-ink-heading mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.technologies
                    ?.split(',')
                    .map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-mono bg-paper-muted border border-paper-border rounded text-ink-heading"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-paper-border bg-paper flex items-center justify-end gap-3">
              {activeProjectModal.github_url && (
                <a
                  href={activeProjectModal.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-ink-heading bg-paper-card hover:bg-paper-muted border border-paper-border rounded"
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </a>
              )}
              {activeProjectModal.live_url && (
                <a
                  href={activeProjectModal.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-classic-primary hover:bg-classic-primary-hover rounded"
                >
                  <span>Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="px-4 py-2 text-xs text-ink-muted hover:text-ink-heading border border-paper-border rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
