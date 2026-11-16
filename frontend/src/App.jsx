import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import { portfolioService, FALLBACK_DATA } from './services/api';
import { Loader2 } from 'lucide-react';

function App() {
  const [data, setData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await portfolioService.getOverview();
        if (result && result.data) {
          setData(result.data);
          setIsLive(result.isLive);
        }
      } catch (err) {
        console.warn("Using default synced portfolio dataset:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#e5e7eb] font-sans selection:bg-white selection:text-black">
      {/* Top Navbar */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)} 
        isBackendLive={isLive}
      />

      <main>
        {/* Hero Section */}
        <Hero 
          profile={data.profile} 
          onOpenResume={() => setIsResumeOpen(true)} 
        />

        {/* About Section */}
        <About 
          profile={data.profile} 
        />

        {/* Skills Section */}
        <Skills 
          skills={data.skills} 
        />

        {/* Projects Section */}
        <Projects 
          projects={data.projects} 
        />

        {/* Education Section */}
        <Education 
          education={data.education} 
        />

        {/* Certifications Section */}
        <Certifications 
          certifications={data.certifications} 
        />

        {/* Contact Section */}
        <Contact 
          profile={data.profile} 
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenResume={() => setIsResumeOpen(true)} 
      />

      {/* Interactive Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={data.profile}
        skills={data.skills}
        education={data.education}
        certifications={data.certifications}
      />
    </div>
  );
}

export default App;
