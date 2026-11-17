import React from 'react';
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react';

const Experience = ({ experience = [] }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-[#0d0d0d] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            <Briefcase className="w-3.5 h-3.5 text-neutral-300" />
            <span>PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Experience
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Hands-on engineering roles, industrial training, and real-world software delivery.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-neutral-200 to-transparent rounded-full mx-auto" />
        </div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {experience.map((item, idx) => {
            const responsibilities =
              Array.isArray(item.responsibilities_list) && item.responsibilities_list.length > 0
                ? item.responsibilities_list
                : (item.responsibilities || '')
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean);

            return (
              <div
                key={item.id || idx}
                className="group p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/30 transition-all duration-300 shadow-sm hover:shadow-glow-card"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-white/10">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                        {item.job_role}
                      </h3>
                      {item.employment_type && (
                        <span className="px-2.5 py-0.5 rounded-full bg-white text-black font-mono text-[10px] font-bold">
                          {item.employment_type}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-300">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Building2 className="w-4 h-4 text-neutral-400" />
                        {item.company_name}
                      </span>
                      {item.location && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 self-start flex-shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>
                      {item.start_date} – {item.end_date || 'Present'}
                    </span>
                  </div>
                </div>

                {responsibilities.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {responsibilities.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
