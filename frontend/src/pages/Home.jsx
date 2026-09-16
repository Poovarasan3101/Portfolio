import React, { useState, useEffect } from 'react';
import portfolioService from '../services/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import ExtraSections from '../components/ExtraSections';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [extraSections, setExtraSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [
        profileRes,
        projectsRes,
        skillsRes,
        experienceRes,
        educationRes,
        extraSectionsRes,
      ] = await Promise.allSettled([
        portfolioService.getProfile(),
        portfolioService.getProjects(),
        portfolioService.getSkills(),
        portfolioService.getExperience(),
        portfolioService.getEducation(),
        portfolioService.getExtraSections(),
      ]);

      if (profileRes.status === 'fulfilled') setProfile(profileRes.value.data);
      if (projectsRes.status === 'fulfilled') setProjects(projectsRes.value.data);
      if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value.data);
      if (experienceRes.status === 'fulfilled') setExperience(experienceRes.value.data);
      if (educationRes.status === 'fulfilled') setEducation(educationRes.value.data);
      if (extraSectionsRes.status === 'fulfilled') setExtraSections(extraSectionsRes.value.data);

    } catch (err) {
      console.error('Failed to load portfolio data:', err);
      setError('Unable to load some portfolio information. Please verify your backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-classic-accent animate-spin mb-3" />
        <span className="font-serif text-lg text-ink-heading">Loading Portfolio...</span>
        <span className="text-xs font-mono text-ink-muted mt-1">Fetching live records from Django API</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col selection:bg-classic-accent/20 selection:text-ink-heading">
      <Navbar />

      {error && (
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-amber-50 border border-amber-300 text-amber-900 rounded shadow-classic text-xs font-mono max-w-sm">
          {error}
        </div>
      )}

      <main className="flex-1">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experiences={experience} />
        <Education educations={education} />
        <ExtraSections extraSections={extraSections} />
        <Contact profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
};

export default Home;
