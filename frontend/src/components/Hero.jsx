import React from 'react';
import { ArrowDown, Download, Mail, ExternalLink, Code2, Database, Layout } from 'lucide-react';

const Hero = ({ profile }) => {
  const name = profile?.name || 'Poovarasan';
  const title = profile?.title || 'Python Full Stack Developer';
  const subtitle =
    profile?.hero_subtitle ||
    'I am a passionate Python Full Stack Developer focused on building practical, responsive, and user-friendly web applications.';

  const handleDownloadResume = (e) => {
    if (profile?.resume_url) {
      window.open(profile.resume_url, '_blank');
    } else {
      e.preventDefault();
      alert('Resume file has not been uploaded yet. Please reach out via the contact form or check back shortly!');
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-paper-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-wider uppercase text-classic-accent bg-paper-muted border border-paper-border rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Available for Opportunities
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ink-heading leading-[1.15]">
              Hello, I'm <br />
              <span className="font-semibold underline decoration-classic-accent/40 decoration-wavy underline-offset-8">
                {name}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-ink-body font-serif italic text-classic-accent">
              {title}
            </p>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            {/* Core Tech Focus Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-paper-card border border-paper-border text-ink-body rounded">
                <Code2 className="w-3.5 h-3.5 text-classic-accent" /> Python & Django
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-paper-card border border-paper-border text-ink-body rounded">
                <Layout className="w-3.5 h-3.5 text-classic-accent" /> React.js & Tailwind
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-paper-card border border-paper-border text-ink-body rounded">
                <Database className="w-3.5 h-3.5 text-classic-accent" /> DRF & SQL Databases
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-3 sm:gap-4 items-center">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-classic-primary hover:bg-classic-primary-hover border border-classic-primary rounded shadow-classic transition-colors"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={profile?.resume_url || '#'}
                onClick={handleDownloadResume}
                download
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-ink-heading bg-paper-card hover:bg-paper-muted border border-paper-border rounded shadow-classic transition-colors"
              >
                <Download className="w-4 h-4 text-classic-accent" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-ink-muted hover:text-ink-heading border border-transparent hover:border-paper-border rounded transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Profile Image / Classic Portrait Area */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Elegant Classic Double Border Frame */}
              <div className="absolute -inset-2 rounded border border-paper-border/80 -rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-paper-card border border-paper-border rounded overflow-hidden shadow-classic-md flex items-center justify-center">
                {profile?.profile_image_url ? (
                  <img
                    src={profile.profile_image_url}
                    alt={name}
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-classic-accent/30 bg-paper-card flex items-center justify-center mb-3">
                      <span className="font-serif text-3xl font-bold text-classic-accent">P</span>
                    </div>
                    <span className="font-serif text-lg font-semibold text-ink-heading">{name}</span>
                    <span className="text-xs text-ink-muted uppercase tracking-wider font-mono mt-1">
                      Full Stack Engineer
                    </span>
                    <span className="text-[11px] text-ink-faint mt-3 border-t border-paper-border pt-2">
                      Clean Code • Scalable Systems
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
