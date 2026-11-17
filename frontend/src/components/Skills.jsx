import React, { useState } from 'react';
import {
  FileCode,
  Palette,
  Code2,
  Atom,
  Wind,
  Smartphone,
  Layers,
  Binary,
  Server,
  Cpu,
  Boxes,
  DatabaseBackup,
  Database,
  HardDrive,
  TerminalSquare,
  Sparkles,
  GitBranch,
  Bot,
  Brain,
  SearchCode,
  MessageSquare,
  Users,
  RefreshCw,
  Bug,
  Clock,
  CheckCircle,
  Wrench,
  Cloud,
  Globe,
  Shield,
  Zap,
  Terminal,
} from 'lucide-react';
import { GithubIcon } from './Icons';

export const SKILL_ICON_MAP = {
  FileCode,
  Palette,
  Code2,
  Atom,
  Wind,
  Smartphone,
  Layers,
  Binary,
  Server,
  Cpu,
  Boxes,
  DatabaseBackup,
  Database,
  HardDrive,
  TerminalSquare,
  Sparkles,
  GitBranch,
  Github: GithubIcon,
  Bot,
  Brain,
  SearchCode,
  MessageSquare,
  Users,
  RefreshCw,
  Bug,
  Clock,
  Wrench,
  Cloud,
  Globe,
  Shield,
  Zap,
  Terminal,
};

const Skills = ({ skills = [] }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'tools', label: 'Tools' },
    { id: 'soft_skills', label: 'Soft Skills' },
  ];

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const softSkills = skills.filter((s) => s.category === 'soft_skills');

  const getCategoryTitle = (cat) => {
    switch (cat) {
      case 'frontend':
        return 'Frontend Engineering';
      case 'backend':
        return 'Backend Architecture';
      case 'database':
        return 'Database Systems';
      case 'tools':
        return 'Tools & Platforms';
      case 'soft_skills':
        return 'Professional & Soft Skills';
      default:
        return 'Core Competencies';
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            <Cpu className="w-3.5 h-3.5 text-neutral-300" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Skills & Competencies
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            A comprehensive overview of my full stack toolset across client, server, database, and developer productivity workflows.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-neutral-200 to-transparent rounded-full mx-auto" />
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? skills.length
                : skills.filter((s) => s.category === cat.id).length;

            if (cat.id !== 'all' && count === 0) return null;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-black font-bold shadow-glow-sm scale-105'
                    : 'bg-[#111111] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    activeCategory === cat.id
                      ? 'bg-black/20 text-black font-semibold'
                      : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 text-sm text-neutral-500 font-mono">
            No skills added in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredSkills.map((skill) => {
              const IconComponent = SKILL_ICON_MAP[skill.icon_name] || Code2;

              return (
                <div
                  key={skill.id || skill.name}
                  className="group relative p-5 rounded-2xl bg-[#111111]/80 hover:bg-[#161616] border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-glow-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                        {skill.badge_label || skill.category_display || skill.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-neutral-100 transition-colors">
                      {skill.name}
                    </h3>

                    <p className="text-xs text-neutral-400 mt-1 font-sans leading-relaxed">
                      {skill.description || getCategoryTitle(skill.category)}
                    </p>
                  </div>

                  {/* Card Footer Indicator */}
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-neutral-400 group-hover:text-white transition-colors">
                      <CheckCircle className="w-3.5 h-3.5 text-neutral-300" />
                      <span className="text-[11px]">{getCategoryTitle(skill.category).split(' ')[0]}</span>
                    </div>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      #{String(skill.order || 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Soft Skills Summary */}
        {softSkills.length > 0 && (
          <div className="mt-16 p-8 rounded-2xl bg-[#111111] border border-white/10 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-neutral-300" />
                  Engineering Mindset & Collaborative Strengths
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Beyond syntax and frameworks: how I deliver value in modern software engineering teams.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <span>Delivery Focus:</span>
                <span className="text-white font-semibold">Agile & Sprint Ready</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
              {softSkills.map((soft) => (
                <div
                  key={soft.id || soft.name}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all text-center"
                >
                  <div className="font-bold text-xs text-white">{soft.name}</div>
                  <div className="text-[10px] text-neutral-400 mt-1">
                    {soft.badge_label || 'Core Strength'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
