import React from 'react';
import { Code, Server, Database, Wrench, Layers } from 'lucide-react';

const Skills = ({ skills = [] }) => {
  // Group skills by category
  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Other'];

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Code className="w-4 h-4 text-classic-accent" />;
      case 'backend':
        return <Server className="w-4 h-4 text-classic-accent" />;
      case 'database':
        return <Database className="w-4 h-4 text-classic-accent" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-classic-accent" />;
      default:
        return <Layers className="w-4 h-4 text-classic-accent" />;
    }
  };

  // Grouping
  const groupedSkills = categories.reduce((acc, cat) => {
    const matching = skills.filter(
      (s) => s.category.toLowerCase() === cat.toLowerCase()
    );
    if (matching.length > 0) {
      acc[cat] = matching;
    }
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 sm:py-28 border-b border-paper-border bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <span className="text-xs font-mono tracking-widest text-classic-accent uppercase mb-2">
            02 / Expertise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink-heading font-normal">
            Technical Skills
          </h2>
          <div className="w-12 h-0.5 bg-classic-accent mt-3"></div>
          <p className="text-sm sm:text-base text-ink-muted mt-3 max-w-xl">
            A comprehensive toolset developed through dedicated software engineering, end-to-end full-stack architectures, and modern web standards.
          </p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.keys(groupedSkills).length === 0 ? (
            <div className="col-span-2 text-center py-12 text-ink-muted italic bg-paper-card border border-paper-border rounded">
              No skills added yet. Add them in the Admin Panel.
            </div>
          ) : (
            Object.entries(groupedSkills).map(([category, items]) => (
              <div
                key={category}
                className="bg-paper-card border border-paper-border rounded shadow-classic p-6 hover:shadow-classic-md transition-shadow"
              >
                <div className="flex items-center gap-2 pb-4 mb-5 border-b border-paper-border">
                  {getCategoryIcon(category)}
                  <h3 className="font-serif text-lg font-semibold text-ink-heading tracking-wide">
                    {category}
                  </h3>
                  <span className="ml-auto text-xs font-mono text-ink-muted">
                    {items.length} {items.length === 1 ? 'skill' : 'skills'}
                  </span>
                </div>

                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.id} className="group">
                      <div className="flex justify-between items-center text-sm mb-1.5">
                        <span className="font-medium text-ink-body group-hover:text-classic-accent transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs font-mono text-ink-muted">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-paper-muted rounded-full overflow-hidden border border-paper-border/60">
                        <div
                          className="h-full bg-classic-primary rounded-full transition-all duration-700 ease-out group-hover:bg-classic-accent"
                          style={{ width: `${Math.min(Math.max(skill.level, 10), 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default Skills;
