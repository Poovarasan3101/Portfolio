import React from 'react';
import { ArrowUp, Mail, Shield } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = ({ profile }) => {
  const { isAuthenticated } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-paper border-t border-paper-border py-12 text-ink-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-paper-border">
          
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-ink-heading">
              Poovarasan
            </h3>
            <p className="text-xs font-mono tracking-wider uppercase text-classic-accent mt-0.5">
              Python Full Stack Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {profile?.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ink-body hover:text-classic-accent bg-paper-card border border-paper-border rounded hover:bg-paper-muted transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile?.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ink-body hover:text-classic-accent bg-paper-card border border-paper-border rounded hover:bg-paper-muted transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2 text-ink-body hover:text-classic-accent bg-paper-card border border-paper-border rounded hover:bg-paper-muted transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={scrollToTop}
              className="p-2 text-ink-body hover:text-classic-accent bg-paper-card border border-paper-border rounded hover:bg-paper-muted transition-colors ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© 2026 Poovarasan. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with Django & React</span>
            <span>•</span>
            {isAuthenticated ? (
              <Link to="/admin/dashboard" className="hover:text-ink-heading underline">
                Admin Dashboard
              </Link>
            ) : (
              <Link to="/admin/login" className="hover:text-ink-heading">
                Admin Access
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
