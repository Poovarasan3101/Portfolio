import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';

const ExtraSections = ({ extraSections = [] }) => {
  if (!extraSections || extraSections.length === 0) {
    return null;
  }

  return (
    <>
      {extraSections.map((section, idx) => (
        <section
          key={section.id}
          className="py-20 sm:py-24 border-b border-paper-border bg-paper"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-paper-card border border-paper-border rounded shadow-classic p-8 sm:p-12 hover:shadow-classic-md transition-shadow">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className={section.image_url ? 'lg:col-span-8' : 'lg:col-span-12'}>
                  <div className="flex items-center gap-2 text-classic-accent mb-2">
                    <Bookmark className="w-4 h-4" />
                    <span className="text-xs font-mono tracking-widest uppercase font-semibold">
                      Featured Section
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-ink-heading font-normal mb-2">
                    {section.title}
                  </h2>

                  {section.subtitle && (
                    <p className="text-base sm:text-lg text-classic-accent font-serif italic mb-4">
                      {section.subtitle}
                    </p>
                  )}

                  <div className="w-12 h-0.5 bg-classic-accent mb-6"></div>

                  <p className="text-sm sm:text-base text-ink-body leading-relaxed whitespace-pre-line mb-6">
                    {section.description}
                  </p>

                  {section.button_text && section.button_url && (
                    <a
                      href={section.button_url}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-classic-primary hover:bg-classic-primary-hover rounded transition-colors"
                    >
                      <span>{section.button_text}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {section.image_url && (
                  <div className="lg:col-span-4">
                    <div className="rounded border border-paper-border overflow-hidden shadow-classic">
                      <img
                        src={section.image_url}
                        alt={section.title}
                        className="w-full h-auto object-cover max-h-80"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default ExtraSections;
