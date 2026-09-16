import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    // If not on home page, navigate home first
    if (location.pathname !== '/') {
      return; // Link handles redirect
    }
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-paper/95 backdrop-blur-md border-b border-paper-border py-3 shadow-classic'
          : 'bg-paper py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-ink-heading group-hover:text-classic-accent transition-colors">
            Poovarasan
          </span>
          <span className="text-[10px] tracking-widest uppercase font-mono text-ink-muted -mt-0.5">
            Python Full Stack Developer
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-ink-muted hover:text-ink-heading transition-colors font-medium tracking-wide"
            >
              {link.name}
            </a>
          ))}

          {/* Admin Link */}
          {isAuthenticated ? (
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-classic-primary hover:bg-classic-primary-hover rounded transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-ink-muted hover:text-ink-heading border border-paper-border hover:border-ink-muted rounded transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden gap-3">
          {isAuthenticated && (
            <Link
              to="/admin/dashboard"
              className="p-1.5 text-xs font-medium text-white bg-classic-primary rounded"
              aria-label="Dashboard"
            >
              <Shield className="w-4 h-4" />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-ink-heading hover:bg-paper-muted rounded border border-paper-border focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-paper-card border-b border-paper-border px-4 pt-3 pb-6 space-y-3 shadow-classic-md animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block py-2 text-base text-ink-body hover:text-classic-accent font-medium border-b border-paper-border/60"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-white bg-classic-primary rounded"
              >
                <Shield className="w-4 h-4" />
                <span>Go to Admin Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm text-ink-body border border-paper-border rounded hover:bg-paper-muted"
              >
                <Lock className="w-4 h-4" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
