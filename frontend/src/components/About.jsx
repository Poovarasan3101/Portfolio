import React from 'react';
import { Target, Compass, Sparkles, BookOpen, MapPin, Mail, Phone } from 'lucide-react';

const About = ({ profile }) => {
  const bio =
    profile?.bio ||
    'I am Poovarasan, an enthusiastic and disciplined Python Full Stack Developer. I build secure and responsive web applications using Django REST Framework on the backend and modern React on the frontend.';
  
  const careerObjective =
    profile?.career_objective ||
    'To leverage my technical expertise in Python full-stack engineering, API security, and modern frontend architectures to build scalable applications.';

  const developerBackground =
    profile?.developer_background ||
    'With a strong engineering foundation in Computer Science, I have specialized in building robust REST APIs and modular frontend user experiences.';

  const interests =
    profile?.interests ||
    'Clean code architecture, system performance optimization, API design, modern UI/UX patterns, and continuous learning.';

  const strengths =
    profile?.strengths ||
    'Full-Stack Development, Problem Solving, Rapid Prototyping, Attention to Detail, Database Optimization, Agile Collaboration.';

  return (
    <section id="about" className="py-20 sm:py-28 border-b border-paper-border bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <span className="text-xs font-mono tracking-widest text-classic-accent uppercase mb-2">
            01 / Background
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink-heading font-normal">
            About Me
          </h2>
          <div className="w-12 h-0.5 bg-classic-accent mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Biography Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-stone max-w-none">
              <h3 className="font-serif text-2xl text-ink-heading font-normal mb-3">
                Architecting Practical, Reliable Web Solutions
              </h3>
              <p className="text-base sm:text-lg text-ink-body leading-relaxed whitespace-pre-line">
                {bio}
              </p>
            </div>

            {/* Career Objective Highlight Card */}
            <div className="p-6 bg-paper-card border border-paper-border rounded shadow-classic">
              <div className="flex items-center gap-3 mb-2 text-classic-accent">
                <Target className="w-5 h-5" />
                <h4 className="font-serif text-lg font-semibold text-ink-heading">
                  Career Objective
                </h4>
              </div>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed italic">
                "{careerObjective}"
              </p>
            </div>

            {/* Developer Background */}
            {developerBackground && (
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2 text-ink-heading">
                  <BookOpen className="w-4 h-4 text-classic-accent" />
                  <h4 className="font-serif text-lg font-medium">Developer Journey</h4>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {developerBackground}
                </p>
              </div>
            )}
          </div>

          {/* Side Attributes Column (Strengths, Interests, Details) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Core Strengths */}
            <div className="p-6 bg-paper-card border border-paper-border rounded shadow-classic">
              <div className="flex items-center gap-2 mb-3 text-classic-accent">
                <Sparkles className="w-4 h-4" />
                <h4 className="font-serif text-base font-semibold text-ink-heading uppercase tracking-wide">
                  Core Strengths
                </h4>
              </div>
              <p className="text-sm text-ink-body leading-relaxed whitespace-pre-line">
                {strengths}
              </p>
            </div>

            {/* Interests & Focus */}
            <div className="p-6 bg-paper-card border border-paper-border rounded shadow-classic">
              <div className="flex items-center gap-2 mb-3 text-classic-accent">
                <Compass className="w-4 h-4" />
                <h4 className="font-serif text-base font-semibold text-ink-heading uppercase tracking-wide">
                  Interests & Focus
                </h4>
              </div>
              <p className="text-sm text-ink-body leading-relaxed whitespace-pre-line">
                {interests}
              </p>
            </div>

            {/* Quick Profile Overview */}
            <div className="p-6 bg-paper-muted border border-paper-border rounded space-y-3 text-xs font-mono text-ink-muted">
              {profile?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-classic-accent shrink-0" />
                  <span>Location: <strong className="font-medium text-ink-body">{profile.location}</strong></span>
                </div>
              )}
              {profile?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-classic-accent shrink-0" />
                  <span>Email: <strong className="font-medium text-ink-body">{profile.email}</strong></span>
                </div>
              )}
              {profile?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-classic-accent shrink-0" />
                  <span>Phone: <strong className="font-medium text-ink-body">{profile.phone}</strong></span>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
