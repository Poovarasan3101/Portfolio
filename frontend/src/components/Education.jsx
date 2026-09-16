import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = ({ educations = [] }) => {
  return (
    <section id="education" className="py-20 sm:py-28 border-b border-paper-border bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <span className="text-xs font-mono tracking-widest text-classic-accent uppercase mb-2">
            05 / Academics
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink-heading font-normal">
            Education
          </h2>
          <div className="w-12 h-0.5 bg-classic-accent mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educations.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-ink-muted italic bg-paper-card border border-paper-border rounded">
              No education records added yet.
            </div>
          ) : (
            educations.map((edu) => (
              <div
                key={edu.id}
                className="bg-paper-card border border-paper-border rounded shadow-classic p-6 sm:p-8 hover:shadow-classic-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-classic-accent mb-2">
                    <GraduationCap className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                      Academic Degree
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-ink-heading mb-1">
                    {edu.degree}
                  </h3>

                  <div className="text-base text-ink-body font-medium mb-3">
                    {edu.institution}
                  </div>

                  {edu.description && (
                    <p className="text-sm text-ink-muted leading-relaxed mb-6 whitespace-pre-line border-t border-paper-border pt-3">
                      {edu.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-paper-border/60 text-xs font-mono text-ink-muted">
                  <span className="inline-flex items-center gap-1 bg-paper-muted px-2.5 py-1 rounded border border-paper-border">
                    <Calendar className="w-3.5 h-3.5 text-classic-accent" />
                    {edu.start_year} – {edu.end_year}
                  </span>
                  {edu.location && (
                    <span className="inline-flex items-center gap-1 bg-paper-muted px-2.5 py-1 rounded border border-paper-border">
                      <MapPin className="w-3.5 h-3.5 text-classic-accent" />
                      {edu.location}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default Education;
