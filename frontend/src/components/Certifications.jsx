import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Calendar, 
  X, 
  Maximize2, 
  Sparkles, 
  BookOpen, 
  Building2,
  FileCheck
} from 'lucide-react';

const Certifications = ({ certifications = [] }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  // Group into main intensive course vs certifications
  const intensiveCourses = certifications.filter(c => c.entry_type === 'course');
  const standardCertifications = certifications.filter(c => c.entry_type !== 'course');

  return (
    <section id="certifications" className="py-24 bg-[#0d0d0d] relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            <Award className="w-3.5 h-3.5 text-neutral-300" />
            <span>CREDENTIALS & TRAINING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Courses & Certifications
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Specialized industrial programs and recognized certifications verifying my Python, full-stack, and mobile competencies.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-neutral-200 to-transparent rounded-full mx-auto" />
        </div>

        {/* Featured Intensive Course Card */}
        {intensiveCourses.length > 0 && (
          <div className="mb-14">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Full-Stack Training Program</span>
            </div>

            {intensiveCourses.map((course) => (
              <div 
                key={course.id || course.title}
                className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#141414] to-[#101010] border border-white/15 hover:border-white/30 backdrop-blur-md transition-all shadow-glow-card flex flex-col lg:flex-row items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-white text-black font-mono text-xs font-bold shadow-md">
                      Intensive Course
                    </span>
                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {course.period_or_date}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-neutral-300 font-medium">
                    <Building2 className="w-4 h-4 text-neutral-400" />
                    <span>{course.issuer}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans max-w-3xl">
                    Comprehensive full stack curriculum focusing on end-to-end Python web development, 
                    architecting Django backend APIs, building dynamic React single-page applications, 
                    relational MySQL modeling, and production readiness.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {["Python", "Django", "React.js", "REST APIs", "MySQL", "Full-Stack Deployment"].map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex lg:flex-col items-center gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => setSelectedCert(course)}
                    className="w-full lg:w-auto px-6 py-3 rounded-xl bg-white text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all shadow-glow-sm"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Preview Credential</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificate Gallery Grid */}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6 flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Industrial Certifications Gallery</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {standardCertifications.map((cert, idx) => (
              <div
                key={cert.id || idx}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer rounded-2xl bg-[#111111] border border-white/10 hover:border-white/30 overflow-hidden backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-glow-card flex flex-col justify-between"
              >
                {/* Certificate Visual Banner */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1c1c1c] via-[#121212] to-[#0a0a0a] border-b border-white/10 p-5 flex flex-col justify-between overflow-hidden">
                  
                  {/* Subtle Certificate Watermark */}
                  <div className="absolute inset-0 bg-dots-pattern opacity-30" />
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center text-white/5 font-mono text-3xl font-extrabold select-none">
                    CERT
                  </div>

                  {/* Header inside Certificate frame */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                      {cert.period_or_date || "Verified"}
                    </span>
                  </div>

                  {/* Certificate preview emblem */}
                  <div className="relative z-10 text-center py-2">
                    <span className="text-xs font-bold text-white tracking-wide uppercase font-mono">
                      Certificate of Completion
                    </span>
                    <div className="w-8 h-0.5 bg-white/40 mx-auto mt-1" />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 backdrop-blur-xs">
                    <span className="px-3.5 py-1.5 rounded-lg bg-white text-black font-bold text-xs flex items-center gap-1.5 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-neutral-200 transition-colors">
                      {cert.title}
                    </h4>

                    <p className="text-xs font-medium text-neutral-400 mt-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{cert.issuer}</span>
                    </p>

                    {cert.skills_covered && (
                      <p className="text-[11px] text-neutral-400 mt-3 font-mono">
                        <span className="text-neutral-500">Skills: </span>
                        {cert.skills_covered}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                    <span className="text-white group-hover:underline">Click to view</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#111111] border border-white/20 shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400">
                    Issued by {selectedCert.issuer}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Document Mockup */}
            <div className="relative p-8 rounded-xl bg-gradient-to-br from-[#181818] via-[#121212] to-[#0a0a0a] border-2 border-white/20 shadow-inner text-center space-y-4">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-neutral-400">
                <span>OFFICIAL VERIFICATION</span>
                <span>STATUS: VERIFIED</span>
              </div>

              <div className="py-2">
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                  This is to certify that
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Poovarasan
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  has successfully completed the credential program for
                </p>
                <div className="text-lg sm:text-xl font-bold text-neutral-100 mt-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 inline-block">
                  {selectedCert.title}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-left">
                <div>
                  <span className="text-neutral-500 block">Issuing Authority:</span>
                  <span className="text-white font-medium">{selectedCert.issuer}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Date / Term:</span>
                  <span className="text-white font-medium">{selectedCert.period_or_date || "2026"}</span>
                </div>
                {selectedCert.skills_covered && (
                  <div className="col-span-2">
                    <span className="text-neutral-500 block">Skills Validated:</span>
                    <span className="text-neutral-300">{selectedCert.skills_covered}</span>
                  </div>
                )}
              </div>

              {/* Seal */}
              <div className="pt-2 flex justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authenticated Certificate Record</span>
                </div>
              </div>

            </div>

            {/* Modal Close Button */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all shadow-glow-sm"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
