import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Calendar, 
  Check, 
  ArrowUpRight, 
  X, 
  Layers, 
  Sparkles, 
  Search, 
  BookmarkCheck, 
  ShieldCheck, 
  Users 
} from 'lucide-react';
import { GithubIcon } from './Icons';

const Projects = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 bg-[#0d0d0d] relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            <FolderGit2 className="w-3.5 h-3.5 text-neutral-300" />
            <span>PORTFOLIO WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Real-world full-stack web applications engineered with React.js, Django REST Framework, and MySQL.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-neutral-200 to-transparent rounded-full mx-auto" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, idx) => (
            <div
              key={project.id || project.slug || idx}
              className="group rounded-2xl bg-[#111111] border border-white/10 hover:border-white/25 overflow-hidden backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-glow-card flex flex-col justify-between"
            >
              {/* Card Image / Preview Mockup Banner */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#161616] border-b border-white/10">
                <img
                  src={project.image_url || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                />
                
                {/* Duration Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-white/15 text-[11px] font-mono text-neutral-300 backdrop-blur-md">
                  <Calendar className="w-3 h-3 text-neutral-400" />
                  <span>{project.duration}</span>
                </div>

                {/* Featured Tag */}
                {project.featured && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-black text-[10px] font-mono font-bold shadow-md">
                    Featured
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-1.5 shadow-lg hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 
                    onClick={() => setSelectedProject(project)}
                    className="text-xl sm:text-2xl font-bold text-white group-hover:text-neutral-200 cursor-pointer transition-colors"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                    {project.short_description}
                  </p>

                  {/* Key Features Bullet List */}
                  {Array.isArray(project.features) && project.features.length > 0 && (
                    <div className="mt-5 space-y-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        Highlighted Capabilities:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                        {project.features.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                      {project.features.length > 4 && (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs text-neutral-400 hover:text-white font-mono underline underline-offset-4 pt-1 cursor-pointer"
                        >
                          + {project.features.length - 4} more features
                        </button>
                      )}
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {Array.isArray(project.technologies) && project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.live_demo_url && (
                      <>
                        <span className="text-neutral-700">•</span>
                        <a
                          href={project.live_demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono font-bold text-white hover:text-neutral-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Project Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111111] border border-white/20 shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedProject.duration}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#161616]">
              <img
                src={selectedProject.image_url}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Full Description */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Overview & Purpose
              </h4>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {selectedProject.full_description || selectedProject.short_description}
              </p>
            </div>

            {/* Complete Feature Breakdown */}
            {Array.isArray(selectedProject.features) && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Complete Feature Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, fIdx) => (
                    <div 
                      key={fIdx} 
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3"
                    >
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-neutral-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Used */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Tech Stack Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(selectedProject.technologies) && selectedProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white text-xs font-mono font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
              {selectedProject.github_url && (
                <a
                  href={selectedProject.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-2 border border-white/15 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              {selectedProject.live_demo_url && (
                <a
                  href={selectedProject.live_demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-glow-sm"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
