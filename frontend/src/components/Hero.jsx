import React, { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Database, 
  Server, 
  Atom, 
  Cpu, 
  Terminal, 
  Sparkles, 
  ExternalLink, 
  Code2 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Hero = ({ profile, onOpenResume }) => {
  const [terminalTab, setTerminalTab] = useState('stack');

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Silver & Charcoal Subtle Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-b from-white/[0.07] to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span className="text-xs font-mono font-medium text-neutral-300">
                {profile?.role || "Python Full Stack Developer"}
              </span>
              <span className="text-neutral-600">|</span>
              <span className="text-xs text-neutral-400">Available for Opportunities</span>
            </div>

            {/* Name and Headline */}
            <div className="space-y-3">
              <h2 className="text-sm font-mono tracking-widest text-neutral-400 uppercase">
                Hello, World! I am
              </h2>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                {profile?.name || "Poovarasan"}
              </h1>
              <p className="text-2xl sm:text-3xl font-medium text-gradient-silver tracking-tight">
                "{profile?.headline || "Building Modern Web Experiences with Code & Creativity."}"
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed">
              {profile?.hero_description || (
                "I'm an aspiring Python Full Stack Developer passionate about building responsive, " +
                "scalable, and user-friendly web applications using React.js, Python, Django, and MySQL."
              )}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-glow-md group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 hover:border-white/30 transition-all backdrop-blur-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-neutral-300" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white font-medium text-sm transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social & Key Details Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-sm text-neutral-400">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/poovarasan-subramani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span className="text-xs font-mono">GitHub</span>
                </a>
                <span className="text-neutral-700">•</span>
                <a
                  href="https://www.linkedin.com/in/poovarasan-subramani-310105sana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono">LinkedIn</span>
                </a>
                <span className="text-neutral-700">•</span>
                <a
                  href="mailto:poovarasan31012005@gmail.com"
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-mono">Email</span>
                </a>
              </div>

              <div className="font-mono text-xs text-neutral-500">
                📍 Salem, Tamil Nadu, India
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Card / Terminal Widget */}
          <div className="lg:col-span-5 relative">
            
            {/* Floating Tech Badges around Card */}
            <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141414]/90 border border-white/15 backdrop-blur-md shadow-xl animate-float-slow">
              <Atom className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-xs font-mono text-white font-medium">React 19</span>
            </div>

            <div className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141414]/90 border border-white/15 backdrop-blur-md shadow-xl animate-float-delayed">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-white font-medium">Django REST</span>
            </div>

            <div className="absolute -bottom-4 -left-3 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141414]/90 border border-white/15 backdrop-blur-md shadow-xl animate-float-delayed">
              <Database className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-white font-medium">MySQL 8.0</span>
            </div>

            <div className="absolute -bottom-4 -right-3 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141414]/90 border border-white/15 backdrop-blur-md shadow-xl animate-float-slow">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono text-white font-medium">Python 3.14</span>
            </div>

            {/* Main Interactive Developer Glass Card */}
            <div className="relative rounded-2xl bg-[#111111]/90 border border-white/15 p-6 backdrop-blur-xl shadow-glow-card overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>poovarasan@stack:~</span>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setTerminalTab('stack')} 
                    className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${terminalTab === 'stack' ? 'bg-white text-black font-semibold' : 'text-neutral-400'}`}
                  >
                    Tech
                  </button>
                  <button 
                    onClick={() => setTerminalTab('api')} 
                    className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${terminalTab === 'api' ? 'bg-white text-black font-semibold' : 'text-neutral-400'}`}
                  >
                    API
                  </button>
                </div>
              </div>

              {/* Developer Avatar & Quick Intro */}
              <div className="pt-5 pb-4 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-700 p-0.5 shadow-md">
                  <div className="w-full h-full rounded-2xl bg-[#141414] flex items-center justify-center overflow-hidden">
                    <span className="text-2xl font-bold font-mono text-white">PS</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#111111]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base flex items-center gap-2">
                    Poovarasan S
                    <span className="text-[10px] font-mono bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full border border-white/10">
                      B.E. CSE
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5 font-mono">
                    Ganesh College of Engineering (2022–2026)
                  </p>
                  <p className="text-xs text-neutral-300 mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Specializing in Python Full-Stack & REST APIs
                  </p>
                </div>
              </div>

              {/* Terminal Code Snippet */}
              {terminalTab === 'stack' ? (
                <div className="bg-[#080808] rounded-xl p-4 font-mono text-xs border border-white/10 space-y-2">
                  <div className="text-neutral-500">// Full-Stack Architecture Definition</div>
                  <div className="text-neutral-300">
                    <span className="text-purple-400">const</span> <span className="text-neutral-100">developer</span> = &#123;
                  </div>
                  <div className="pl-4 text-neutral-400">
                    name: <span className="text-emerald-400">"Poovarasan"</span>,
                  </div>
                  <div className="pl-4 text-neutral-400">
                    role: <span className="text-emerald-400">"Python Full Stack Developer"</span>,
                  </div>
                  <div className="pl-4 text-neutral-400">
                    frontend: [<span className="text-amber-300">"React.js"</span>, <span className="text-amber-300">"Tailwind"</span>, <span className="text-amber-300">"ES6"</span>],
                  </div>
                  <div className="pl-4 text-neutral-400">
                    backend: [<span className="text-cyan-300">"Python"</span>, <span className="text-cyan-300">"Django"</span>, <span className="text-cyan-300">"REST API"</span>],
                  </div>
                  <div className="pl-4 text-neutral-400">
                    database: <span className="text-emerald-400">"MySQL 8.0"</span>,
                  </div>
                  <div className="pl-4 text-neutral-400">
                    seeking: <span className="text-white">"Full-Time Developer Roles"</span>
                  </div>
                  <div className="text-neutral-300">&#125;;</div>
                </div>
              ) : (
                <div className="bg-[#080808] rounded-xl p-4 font-mono text-xs border border-white/10 space-y-2">
                  <div className="text-neutral-500">// Live REST API Handshake</div>
                  <div className="text-emerald-400 flex items-center justify-between">
                    <span>GET /api/overview/</span>
                    <span className="text-emerald-300">200 OK</span>
                  </div>
                  <div className="text-neutral-400 text-[11px] pl-2 border-l border-white/10 space-y-1">
                    <div>DB Connection: <span className="text-white font-semibold">MySQL (Myportfolio)</span></div>
                    <div>Port: <span className="text-white">3306</span> | Host: <span className="text-white">127.0.0.1</span></div>
                    <div>Auth Protocol: <span className="text-white">JSON Web Tokens (JWT)</span></div>
                    <div>Active Endpoints: <span className="text-white">Profile, Skills, Projects, Contact</span></div>
                  </div>
                  <div className="text-cyan-400 pt-1 text-[11px]">
                    Status: <span className="text-emerald-400 font-bold">READY FOR RECRUITERS</span>
                  </div>
                </div>
              )}

              {/* Bottom Quick Feature Highlights */}
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-white/[0.02] border border-white/5 rounded-lg py-2">
                  <div className="text-white font-bold text-sm">26+</div>
                  <div className="text-[10px] text-neutral-400">Core Skills</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-lg py-2">
                  <div className="text-white font-bold text-sm">Panisudar</div>
                  <div className="text-[10px] text-neutral-400">Featured App</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-lg py-2">
                  <div className="text-white font-bold text-sm">100%</div>
                  <div className="text-[10px] text-neutral-400">Clean Code</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
