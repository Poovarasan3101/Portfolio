import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const ResumeModal = ({ isOpen, onClose, profile, skills = [], education = [], certifications = [] }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0f0f0f] border border-white/20 shadow-2xl p-6 sm:p-10 space-y-8 my-auto">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-neutral-300" />
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold">
              Curriculum Vitae • Poovarasan
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-1.5 transition-colors border border-white/10 cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div id="printable-resume" className="space-y-8 font-sans text-neutral-200">
          
          {/* Header */}
          <div className="border-b border-white/15 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Poovarasan S
                </h1>
                <p className="text-base font-semibold text-neutral-300 mt-1 font-mono">
                  Python Full Stack Developer
                </p>
              </div>

              <div className="text-xs font-mono text-neutral-400 space-y-1 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>poovarasan31012005@gmail.com</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  <span>+91-9629617818</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Salem, Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-neutral-400">
              <a 
                href="https://www.linkedin.com/in/poovarasan-subramani-310105sana" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white underline underline-offset-2 flex items-center gap-1"
              >
                <LinkedinIcon className="w-3.5 h-3.5" /> linkedin.com/in/poovarasan-subramani-310105sana
              </a>
              <a 
                href="https://github.com/poovarasan-subramani" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white underline underline-offset-2 flex items-center gap-1"
              >
                <GithubIcon className="w-3.5 h-3.5" /> github.com/poovarasan-subramani
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Aspiring Python Full Stack Developer and Computer Science & Engineering graduate passionate about 
              building responsive, scalable, and user-friendly web applications using React.js, Python, Django, 
              and MySQL. Strong foundation in object-oriented programming, relational schema modeling, 
              RESTful API design, and modern front-end engineering. Eager to contribute to high-impact engineering teams.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
              Technical Skillset
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                <span className="font-bold text-white block mb-1">Frontend Engineering:</span>
                <span className="text-neutral-300">HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Responsive Web Design, DOM Manipulation</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                <span className="font-bold text-white block mb-1">Backend & API:</span>
                <span className="text-neutral-300">Python, Django, Django REST Framework, RESTful APIs, OOP, CRUD Operations, JWT Authentication</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                <span className="font-bold text-white block mb-1">Databases:</span>
                <span className="text-neutral-300">MySQL, SQLite, Relational Modeling, Indexing & Query Optimization</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                <span className="font-bold text-white block mb-1">Developer Tools & Soft Skills:</span>
                <span className="text-neutral-300">VS Code, Cursor, Git, GitHub, GitHub Copilot | Problem-Solving, Analytical Thinking, Communication</span>
              </div>
            </div>
          </div>

          {/* Featured Project Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
              Key Projects
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div className="font-bold text-white text-sm">
                    Panisudar – Job Portal Web Application
                  </div>
                  <div className="font-mono text-neutral-400">
                    September 2026 – October 2026
                  </div>
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  Tech Stack: React.js, Vite, Tailwind CSS, React Router DOM, Axios, Django REST Framework, MySQL
                </div>
                <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                  <li>Developed a responsive job portal for job seekers and recruiters with dedicated, personalized dashboards.</li>
                  <li>Implemented dynamic multi-criteria job search and filtering engine with bookmarking capability.</li>
                  <li>Engineered applicant status tracking lifecycle and recruiter pipeline candidate management.</li>
                  <li>Integrated company profile directory and real-time candidate notification features.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <span className="font-bold text-white">B.E. Computer Science and Engineering</span>
                  <span className="text-neutral-400 block sm:inline sm:ml-2">— Ganesh College of Engineering, Salem</span>
                </div>
                <span className="font-mono text-neutral-400">2022 – 2026</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <span className="font-bold text-white">HSC (Higher Secondary Certificate)</span>
                  <span className="text-neutral-400 block sm:inline sm:ml-2">— Govt Higher Secondary School, Aragalur, Salem</span>
                </div>
                <span className="font-mono text-neutral-400">2022</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <span className="font-bold text-white">SSLC (Secondary School Leaving Certificate)</span>
                  <span className="text-neutral-400 block sm:inline sm:ml-2">— Govt Higher Secondary School, Aragalur, Salem</span>
                </div>
                <span className="font-mono text-neutral-400">2020</span>
              </div>
            </div>
          </div>

          {/* Courses & Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
              Certifications & Professional Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Python Full Stack Development — Login360, Coimbatore (2026)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Python Programming — YARD STICK, Salem (2026)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Android App Development — Wings Technology, Salem (2025)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>AI and Green Skills — Naan Mudhalvan (2025)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 no-print">
          <div className="text-xs font-mono text-neutral-400">
            Available immediately for full-time frontend, backend, or full-stack software roles.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-glow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download / Save as PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeModal;
