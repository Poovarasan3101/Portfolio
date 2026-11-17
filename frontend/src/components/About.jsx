import React from 'react';
import {
  Code,
  Server,
  Database,
  Terminal,
  Sparkles,
  GitBranch,
  Cpu,
  ArrowRight,
} from 'lucide-react';

const About = ({ profile, education = [] }) => {
  const pillars = [
    {
      icon: Code,
      title: 'Frontend Development',
      description:
        'Crafting fluid, interactive user interfaces using React.js, Tailwind CSS, modern JavaScript, and responsive layout architectures.',
    },
    {
      icon: Server,
      title: 'Backend & RESTful APIs',
      description:
        'Developing scalable backend systems, secure JWT authentication, and RESTful web services powered by Python and Django.',
    },
    {
      icon: Database,
      title: 'Database Engineering',
      description:
        'Designing structured relational schemas, CRUD workflows, and optimized queries utilizing MySQL and SQLite.',
    },
    {
      icon: Cpu,
      title: 'Engineering Best Practices',
      description:
        'Applying Object-Oriented Programming (OOP), modular design, version control with Git/GitHub, and focused problem solving.',
    },
  ];

  const primaryEdu = education[0];

  return (
    <section id="about" className="py-24 bg-[#0d0d0d] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
            <span>KNOW MY JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-neutral-200 to-transparent rounded-full mx-auto" />
        </div>

        {/* Top Grid: Bio Text & Architecture Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main Bio Card */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-2xl p-8 backdrop-blur-md flex flex-col justify-between shadow-glow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Background & Philosophy</h3>
                  <p className="text-xs font-mono text-neutral-400">
                    {profile?.role || 'Full Stack Developer'}
                  </p>
                </div>
              </div>

              {profile?.about_bio && (
                <blockquote className="text-neutral-200 text-base sm:text-lg leading-relaxed font-normal pl-4 border-l-2 border-white/30 italic whitespace-pre-line">
                  "{profile.about_bio}"
                </blockquote>
              )}

              {profile?.short_intro && (
                <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">
                  {profile.short_intro}
                </p>
              )}
            </div>

            {/* Quick Stats / Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-6 border-t border-white/10 font-mono text-center">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="text-base sm:text-lg font-bold text-white truncate">
                  {primaryEdu ? primaryEdu.degree.split(' ').slice(0, 2).join(' ') : 'CS Graduate'}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  {primaryEdu?.period || 'Engineering'}
                </div>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="text-base sm:text-lg font-bold text-white truncate">
                  {profile?.location?.split(',')[0] || 'India'}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Location</div>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl col-span-2 sm:col-span-1">
                <div className="text-base sm:text-lg font-bold text-emerald-400">Ready</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">To Join Industry</div>
              </div>
            </div>
          </div>

          {/* Interactive Stack Flow Architecture Card */}
          <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between shadow-glow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-neutral-300" />
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                    Full Stack Ecosystem
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-white/10 text-white px-2 py-0.5 rounded">
                  End-to-End
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#161616] border border-white/10 hover:border-white/30 transition-all">
                  <div className="flex items-center justify-between text-neutral-300 mb-1">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <Code className="w-4 h-4 text-cyan-400" /> Client Tier (React.js)
                    </span>
                    <span className="text-[10px] text-neutral-500">Presentation</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    React.js, Tailwind CSS, React Router, Axios, Framer Motion
                  </p>
                </div>

                <div className="flex justify-center text-neutral-500">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                <div className="p-3.5 rounded-xl bg-[#161616] border border-white/10 hover:border-white/30 transition-all">
                  <div className="flex items-center justify-between text-neutral-300 mb-1">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <Server className="w-4 h-4 text-emerald-400" /> API Gateway (Django REST)
                    </span>
                    <span className="text-[10px] text-neutral-500">Business Logic</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    Python, Django REST Framework, JWT Auth, CORS, Serializers
                  </p>
                </div>

                <div className="flex justify-center text-neutral-500">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                <div className="p-3.5 rounded-xl bg-[#161616] border border-white/10 hover:border-white/30 transition-all">
                  <div className="flex items-center justify-between text-neutral-300 mb-1">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-amber-400" /> Persistence (MySQL)
                    </span>
                    <span className="text-[10px] text-neutral-500">Storage</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    MySQL Relational Tables, ACID Compliance, Dynamic CMS Storage
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-neutral-400 flex items-center justify-between">
              <span>Security: JWT + .env isolated</span>
              <span className="text-emerald-400">✓ Fully Dynamic</span>
            </div>
          </div>
        </div>

        {/* Bottom 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/25 hover:bg-[#161616] transition-all duration-300 group shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-neutral-200 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  <span>Pillar 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
