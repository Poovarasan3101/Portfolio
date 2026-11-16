import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Database, 
  Server, 
  Atom, 
  Clock 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Footer = ({ onOpenResume }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      };
      setCurrentTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-neutral-400 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-white/[0.015] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-mono font-bold text-base">
                P
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                POOVARASAN
              </span>
              <span className="text-[10px] font-mono bg-white/10 text-neutral-300 px-2 py-0.5 rounded border border-white/10">
                Full Stack
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Aspiring Python Full Stack Developer specializing in responsive React user interfaces, 
              scalable Django REST API backends, and relational MySQL persistence.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pt-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Salem, India:</span>
              <span className="text-white font-semibold">{currentTime || "IST"}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Explore Portfolio
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Background</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">Technical Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">Panisudar Job Portal</a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">Education & Schooling</a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-white transition-colors">Certifications & Training</a>
              </li>
              <li>
                <button onClick={onOpenResume} className="hover:text-white transition-colors text-left cursor-pointer">
                  Curriculum Vitae (PDF)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Stack Highlights */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Stack Architecture
            </h4>
            <div className="space-y-2 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <Atom className="w-4 h-4 text-cyan-400" />
                <span>Frontend: React.js & Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>Backend: Python & Django REST Framework</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <span>Database: MySQL 8.0 ('Myportfolio')</span>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <a
                href="https://github.com/poovarasan-subramani"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/poovarasan-subramani-310105sana"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:poovarasan31012005@gmail.com"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-neutral-400 flex items-center gap-1">
            <span>© {new Date().getFullYear()} Poovarasan. All rights reserved. Designed & Engineered with precision.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors font-mono cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
