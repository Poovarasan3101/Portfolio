import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Sparkles,
  School
} from 'lucide-react';

const Education = ({ education = [] }) => {
  return (
    <section id="education" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            <GraduationCap className="w-3.5 h-3.5 text-neutral-300" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            My formal engineering education and foundational schooling in Computer Science & Engineering.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-neutral-200 to-transparent rounded-full mx-auto" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Central Timeline Spine Line */}
          <div className="absolute top-6 bottom-6 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

          <div className="space-y-12">
            {education.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={item.id || idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#111111] border-2 border-white/40 flex items-center justify-center text-white z-20 shadow-glow-sm">
                    {idx === 0 ? (
                      <GraduationCap className="w-5 h-5 text-white" />
                    ) : (
                      <School className="w-4 h-4 text-neutral-400" />
                    )}
                  </div>

                  {/* Spacer for Alternate layout on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                    isEven ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <div className="group p-6 sm:p-7 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/30 transition-all duration-300 shadow-sm hover:shadow-glow-card">
                      
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{item.period}</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{item.location}</span>
                        </span>
                      </div>

                      {/* Degree / Certificate Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                        {item.degree}
                      </h3>

                      {/* Institution */}
                      <p className="text-sm font-medium text-neutral-300 mt-1 flex items-center gap-1.5">
                        <School className="w-4 h-4 text-neutral-400" />
                        <span>{item.institution}</span>
                      </p>

                      {/* Description */}
                      {item.description && (
                        <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {/* Highlights */}
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                        <span>Milestone 0{idx + 1}</span>
                        <span className="text-white/80">Completed with Distinction</span>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Education;
