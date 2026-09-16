import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, UserCheck } from 'lucide-react';

const Experience = ({ experiences = [] }) => {
  const hasFresherEntry = experiences.some((exp) => exp.is_fresher_notice);
  const standardExperiences = experiences.filter((exp) => !exp.is_fresher_notice);

  return (
    <section id="experience" className="py-20 sm:py-28 border-b border-paper-border bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <span className="text-xs font-mono tracking-widest text-classic-accent uppercase mb-2">
            04 / Trajectory
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink-heading font-normal">
            Experience & Work History
          </h2>
          <div className="w-12 h-0.5 bg-classic-accent mt-3"></div>
        </div>

        {/* Fresher Notice Card (if enabled by admin) */}
        {hasFresherEntry && (
          <div className="mb-10 p-6 bg-paper-card border-l-4 border-classic-accent border-y border-r border-paper-border rounded shadow-classic">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-amber-50 text-classic-accent rounded">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-classic-accent uppercase tracking-wider block mb-1">
                  Career Status
                </span>
                <h3 className="font-serif text-xl font-semibold text-ink-heading mb-2">
                  Fresher / Open to Opportunities
                </h3>
                <p className="text-sm text-ink-body leading-relaxed max-w-3xl">
                  Equipped with a solid computer science engineering degree and intensive, practical full-stack project experience building Django APIs and React interfaces. Ready to contribute proactively, learn fast, and solve meaningful challenges.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Timeline List */}
        <div className="space-y-8">
          {standardExperiences.length === 0 && !hasFresherEntry ? (
            <div className="p-8 text-center bg-paper-card border border-paper-border rounded italic text-ink-muted">
              Fresher / Open to Opportunities. Ready to take on challenging developer roles.
            </div>
          ) : (
            standardExperiences.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="relative bg-paper-card border border-paper-border rounded shadow-classic p-6 sm:p-8 hover:shadow-classic-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-classic-accent mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-xs font-mono tracking-wider uppercase font-medium">
                        {exp.company}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-ink-heading">
                      {exp.job_title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-muted">
                    <span className="inline-flex items-center gap-1 bg-paper-muted px-2.5 py-1 rounded border border-paper-border">
                      <Calendar className="w-3.5 h-3.5 text-classic-accent" />
                      {exp.start_date} – {exp.end_date}
                    </span>
                    {exp.location && (
                      <span className="inline-flex items-center gap-1 bg-paper-muted px-2.5 py-1 rounded border border-paper-border">
                        <MapPin className="w-3.5 h-3.5 text-classic-accent" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-ink-body leading-relaxed whitespace-pre-line border-t border-paper-border pt-4 mt-2">
                  {exp.description}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default Experience;
