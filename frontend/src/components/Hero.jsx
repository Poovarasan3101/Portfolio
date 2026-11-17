import React, { useState } from 'react';
import {
  ArrowRight,
  Download,
  Mail,
  Database,
  Server,
  Atom,
  Terminal,
  Code2,
} from 'lucide-react';
import { SocialIcon } from './Icons';

const Hero = ({ profile, skills = [], projects = [], education = [], socialLinks = [], onOpenResume }) => {
  const [terminalTab, setTerminalTab] = useState('stack');

  const name = profile?.name || '';
  const role = profile?.role || '';
  const subheading = profile?.hero_subheading || 'Hello, World! I am';
  const headline = profile?.headline || '';
  const description = profile?.hero_description || '';
  const avatarUrl = profile?.avatar_file_url || '';

  const primaryText = profile?.hero_primary_btn_text || 'View My Projects';
  const primaryLink = profile?.hero_primary_btn_link || '#projects';
  const secondaryText = profile?.hero_secondary_btn_text || 'Download Resume';
  const secondaryLink = profile?.hero_secondary_btn_link || '#resume';
  const tertiaryText = profile?.hero_tertiary_btn_text || 'Contact Me';
  const tertiaryLink = profile?.hero_tertiary_btn_link || '#contact';

  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'DEV';

  const frontendSkills = skills.filter((s) => s.category === 'frontend').slice(0, 3).map((s) => s.name);
  const backendSkills = skills.filter((s) => s.category === 'backend').slice(0, 3).map((s) => s.name);
  const databaseSkills = skills.filter((s) => s.category === 'database').slice(0, 2).map((s) => s.name);
  const primaryEducation = education[0];
  const featuredProject = projects.find((p) => p.featured) || projects[0];

  const linksToRender =
    socialLinks.length > 0
      ? socialLinks
      : [
          ...(profile?.github_url ? [{ id: 'gh', platform: 'GitHub', url: profile.github_url, icon_name: 'Github' }] : []),
          ...(profile?.linkedin_url ? [{ id: 'li', platform: 'LinkedIn', url: profile.linkedin_url, icon_name: 'Linkedin' }] : []),
        ];

  const handleSecondaryClick = (e) => {
    if (secondaryLink === '#resume' || !secondaryLink) {
      e.preventDefault();
      if (profile?.resume_file_url) {
        onOpenResume();
      } else {
        onOpenResume();
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
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
              <span className="text-xs font-mono font-medium text-neutral-300">{role}</span>
              <span className="text-neutral-600">|</span>
              <span className="text-xs text-neutral-400">Available for Opportunities</span>
            </div>

            {/* Name and Headline */}
            <div className="space-y-3">
              {subheading && (
                <h2 className="text-sm font-mono tracking-widest text-neutral-400 uppercase">
                  {subheading}
                </h2>
              )}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                {name}
              </h1>
              {headline && (
                <p className="text-2xl sm:text-3xl font-medium text-gradient-silver tracking-tight">
                  "{headline}"
                </p>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed">
                {description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {primaryText && (
                <a
                  href={primaryLink}
                  target={primaryLink.startsWith('http') ? '_blank' : undefined}
                  rel={primaryLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-glow-md group"
                >
                  <span>{primaryText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              )}

              {secondaryText &&
                (secondaryLink === '#resume' || !secondaryLink ? (
                  <button
                    onClick={handleSecondaryClick}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 hover:border-white/30 transition-all backdrop-blur-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-neutral-300" />
                    <span>{secondaryText}</span>
                  </button>
                ) : (
                  <a
                    href={secondaryLink}
                    target={secondaryLink.startsWith('http') ? '_blank' : undefined}
                    rel={secondaryLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 hover:border-white/30 transition-all backdrop-blur-sm"
                  >
                    <Download className="w-4 h-4 text-neutral-300" />
                    <span>{secondaryText}</span>
                  </a>
                ))}

              {tertiaryText && (
                <a
                  href={tertiaryLink}
                  target={tertiaryLink.startsWith('http') ? '_blank' : undefined}
                  rel={tertiaryLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white font-medium text-sm transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>{tertiaryText}</span>
                </a>
              )}
            </div>

            {/* Social & Key Details Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-sm text-neutral-400">
              <div className="flex flex-wrap items-center gap-3">
                {linksToRender.map((social, idx) => (
                  <React.Fragment key={social.id || social.url}>
                    {idx > 0 && <span className="text-neutral-700">•</span>}
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                    >
                      <SocialIcon platform={social.platform} iconName={social.icon_name} className="w-4 h-4" />
                      <span className="text-xs font-mono">{social.platform}</span>
                    </a>
                  </React.Fragment>
                ))}
                {profile?.email && (
                  <>
                    {linksToRender.length > 0 && <span className="text-neutral-700">•</span>}
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-xs font-mono">Email</span>
                    </a>
                  </>
                )}
              </div>

              {profile?.location && (
                <div className="font-mono text-xs text-neutral-500">
                  📍 {profile.location}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: 3D Interactive Card / Terminal Widget */}
          <div className="lg:col-span-5 relative">
            {/* Floating Tech Badges around Card */}
            <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141414]/90 border border-white/15 backdrop-blur-md shadow-xl animate-float-slow">
              <Atom className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-xs font-mono text-white font-medium">React.js</span>
            </div>

            <div className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141414]/90 border border-white/15 backdrop-blur-md shadow-xl animate-float-delayed">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-white font-medium">Django REST</span>
            </div>

            <div className="absolute -bottom-4 -left-3 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141414]/90 border border-white/15 backdrop-blur-md shadow-xl animate-float-delayed">
              <Database className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-white font-medium">MySQL</span>
            </div>

            <div className="absolute -bottom-4 -right-3 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141414]/90 border border-white/15 backdrop-blur-md shadow-xl animate-float-slow">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono text-white font-medium">Python</span>
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
                  <span>{(name || 'dev').toLowerCase().replace(/\s+/g, '')}@stack:~</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setTerminalTab('stack')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                      terminalTab === 'stack' ? 'bg-white text-black font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    Tech
                  </button>
                  <button
                    onClick={() => setTerminalTab('api')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                      terminalTab === 'api' ? 'bg-white text-black font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    API
                  </button>
                </div>
              </div>

              {/* Developer Avatar & Quick Intro */}
              <div className="pt-5 pb-4 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-700 p-0.5 shadow-md flex-shrink-0">
                  <div className="w-full h-full rounded-2xl bg-[#141414] flex items-center justify-center overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold font-mono text-white">{initials}</span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#111111]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-base flex items-center gap-2 truncate">
                    <span className="truncate">{name}</span>
                  </h3>
                  {primaryEducation && (
                    <p className="text-xs text-neutral-400 mt-0.5 font-mono truncate">
                      {primaryEducation.institution} ({primaryEducation.period})
                    </p>
                  )}
                  <p className="text-xs text-neutral-300 mt-1 flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span className="truncate">{role}</span>
                  </p>
                </div>
              </div>

              {/* Terminal Code Snippet (Dynamic from Database Skills) */}
              {terminalTab === 'stack' ? (
                <div className="bg-[#080808] rounded-xl p-4 font-mono text-xs border border-white/10 space-y-2 overflow-x-auto">
                  <div className="text-neutral-500">// Live Stack Definition</div>
                  <div className="text-neutral-300">
                    <span className="text-purple-400">const</span> <span className="text-neutral-100">developer</span> = &#123;
                  </div>
                  <div className="pl-4 text-neutral-400">
                    name: <span className="text-emerald-400">"{name}"</span>,
                  </div>
                  <div className="pl-4 text-neutral-400">
                    role: <span className="text-emerald-400">"{role}"</span>,
                  </div>
                  {frontendSkills.length > 0 && (
                    <div className="pl-4 text-neutral-400">
                      frontend: [{frontendSkills.map((s, i) => (
                        <React.Fragment key={s}>
                          {i > 0 && ', '}
                          <span className="text-amber-300">"{s}"</span>
                        </React.Fragment>
                      ))}],
                    </div>
                  )}
                  {backendSkills.length > 0 && (
                    <div className="pl-4 text-neutral-400">
                      backend: [{backendSkills.map((s, i) => (
                        <React.Fragment key={s}>
                          {i > 0 && ', '}
                          <span className="text-cyan-300">"{s}"</span>
                        </React.Fragment>
                      ))}],
                    </div>
                  )}
                  {databaseSkills.length > 0 && (
                    <div className="pl-4 text-neutral-400">
                      database: [{databaseSkills.map((s, i) => (
                        <React.Fragment key={s}>
                          {i > 0 && ', '}
                          <span className="text-emerald-400">"{s}"</span>
                        </React.Fragment>
                      ))}],
                    </div>
                  )}
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
                    <div>DB Engine: <span className="text-white font-semibold">MySQL (Myportfolio)</span></div>
                    <div>Auth Protocol: <span className="text-white">JWT Protected Admin CMS</span></div>
                    <div>Dynamic Entities: <span className="text-white">{skills.length} Skills, {projects.length} Projects</span></div>
                  </div>
                  <div className="text-cyan-400 pt-1 text-[11px]">
                    Status: <span className="text-emerald-400 font-bold">DYNAMIC CMS SYNCED</span>
                  </div>
                </div>
              )}

              {/* Bottom Quick Feature Highlights */}
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-white/[0.02] border border-white/5 rounded-lg py-2 px-1">
                  <div className="text-white font-bold text-sm">{skills.length}</div>
                  <div className="text-[10px] text-neutral-400">Core Skills</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-lg py-2 px-1">
                  <div className="text-white font-bold text-sm truncate">
                    {featuredProject ? featuredProject.title.split(/[–-]/)[0].trim() : projects.length}
                  </div>
                  <div className="text-[10px] text-neutral-400">Featured App</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-lg py-2 px-1">
                  <div className="text-white font-bold text-sm">{projects.length}</div>
                  <div className="text-[10px] text-neutral-400">Projects</div>
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
