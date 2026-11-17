import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import { portfolioService } from '../services/api';
import { Loader2, RefreshCw, AlertTriangle } from 'lucide-react';

const PublicPortfolio = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const loadPortfolio = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const overview = await portfolioService.getOverview();
      setData(overview);
      if (overview?.profile?.name) {
        document.title = `${overview.profile.name} | ${overview.profile.role || 'Developer Portfolio'}`;
      }
    } catch (err) {
      console.error('Failed to fetch portfolio data:', err);
      setError('Unable to reach the portfolio backend API. Please ensure the Django server is running on port 8000.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4 text-neutral-300">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center shadow-glow-sm">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-mono text-white tracking-wider uppercase">Loading Portfolio</p>
          <p className="text-xs font-mono text-neutral-500">Syncing live content from Django & MySQL...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl bg-[#111111] border border-white/15 p-8 text-center space-y-5 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white">Backend Connection Required</h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{error}</p>
          </div>
          <button
            onClick={loadPortfolio}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>
        </div>
      </div>
    );
  }

  const profile = data.profile || {};
  const skills = data.skills || [];
  const projects = data.projects || [];
  const experience = data.experience || [];
  const education = data.education || [];
  const certifications = data.certifications || [];
  const socialLinks = data.social_links || [];

  return (
    <div className="min-h-screen bg-[#080808] text-[#e5e7eb] font-sans selection:bg-white selection:text-black">
      <Navbar
        profile={profile}
        socialLinks={socialLinks}
        hasExperience={experience.length > 0}
        onOpenResume={() => setIsResumeOpen(true)}
        isBackendLive={true}
      />

      <main>
        <Hero
          profile={profile}
          skills={skills}
          projects={projects}
          education={education}
          socialLinks={socialLinks}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <About profile={profile} education={education} />

        <Skills skills={skills} />

        <Projects projects={projects} />

        <Experience experience={experience} />

        <Education education={education} />

        <Certifications certifications={certifications} profile={profile} />

        <Contact profile={profile} socialLinks={socialLinks} />
      </main>

      <Footer
        profile={profile}
        socialLinks={socialLinks}
        hasExperience={experience.length > 0}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        skills={skills}
        projects={projects}
        education={education}
        experience={experience}
        certifications={certifications}
        socialLinks={socialLinks}
      />
    </div>
  );
};

export default PublicPortfolio;
