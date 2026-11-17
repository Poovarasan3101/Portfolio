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
  ExternalLink,
} from 'lucide-react';
import { SocialIcon } from './Icons';

const ResumeModal = ({
  isOpen,
  onClose,
  profile,
  skills = [],
  projects = [],
  education = [],
  experience = [],
  certifications = [],
  socialLinks = [],
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const resumeDownloadUrl = profile?.resume_file_url || '';
  const groupedSkills = {
    Frontend: skills.filter((s) => s.category === 'frontend').map((s) => s.name),
    Backend: skills.filter((s) => s.category === 'backend').map((s) => s.name),
    Database: skills.filter((s) => s.category === 'database').map((s) => s.name),
    'Tools & Soft Skills': skills
      .filter((s) => s.category === 'tools' || s.category === 'soft_skills')
      .map((s) => s.name),
  };

  const displayLinks =
    socialLinks.length > 0
      ? socialLinks
      : [
          ...(profile?.linkedin_url ? [{ id: 'li', platform: 'LinkedIn', url: profile.linkedin_url, icon_name: 'Linkedin' }] : []),
          ...(profile?.github_url ? [{ id: 'gh', platform: 'GitHub', url: profile.github_url, icon_name: 'Github' }] : []),
        ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0f0f0f] border border-white/20 shadow-2xl p-6 sm:p-10 space-y-8 my-auto">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-neutral-300" />
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold">
              Curriculum Vitae • {profile?.name || 'Developer'}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {resumeDownloadUrl && (
              <a
                href={resumeDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={profile?.resume_filename || 'Resume.pdf'}
                className="px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-glow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            )}
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-1.5 transition-colors border border-white/10 cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print View</span>
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

        {/* Printable Dynamic Resume Canvas */}
        <div id="printable-resume" className="space-y-8 font-sans text-neutral-200">
          {/* Header */}
          <div className="border-b border-white/15 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {profile?.name}
                </h1>
                <p className="text-base font-semibold text-neutral-300 mt-1 font-mono">
                  {profile?.role}
                </p>
              </div>

              <div className="text-xs font-mono text-neutral-400 space-y-1 sm:text-right">
                {profile?.email && (
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            {displayLinks.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-neutral-400">
                {displayLinks.map((link) => (
                  <a
                    key={link.id || link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white underline underline-offset-2 flex items-center gap-1.5"
                  >
                    <SocialIcon platform={link.platform} iconName={link.icon_name} className="w-3.5 h-3.5" />
                    <span>{link.url.replace(/^https?:\/\/(www\.)?/i, '')}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {(profile?.about_bio || profile?.hero_description) && (
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {profile.about_bio || profile.hero_description}
              </p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
                Technical Skillset
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(groupedSkills).map(
                  ([group, list]) =>
                    list.length > 0 && (
                      <div key={group} className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                        <span className="font-bold text-white block mb-1">{group}:</span>
                        <span className="text-neutral-300">{list.join(', ')}</span>
                      </div>
                    )
                )}
              </div>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => {
                  const bullets =
                    exp.responsibilities_list?.length > 0
                      ? exp.responsibilities_list
                      : (exp.responsibilities || '').split('\n').filter(Boolean);
                  return (
                    <div key={exp.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                        <div className="font-bold text-white text-sm">
                          {exp.job_role} — {exp.company_name}
                        </div>
                        <div className="font-mono text-neutral-400">
                          {exp.start_date} – {exp.end_date || 'Present'}
                        </div>
                      </div>
                      {bullets.length > 0 && (
                        <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                          {bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
                Key Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                      <div className="font-bold text-white text-sm">{proj.title}</div>
                      {proj.duration && <div className="font-mono text-neutral-400">{proj.duration}</div>}
                    </div>
                    {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                      <div className="text-xs font-mono text-neutral-400">
                        Tech Stack: {proj.technologies.join(', ')}
                      </div>
                    )}
                    <p className="text-xs text-neutral-300">{proj.short_description}</p>
                    {Array.isArray(proj.features) && proj.features.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                        {proj.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
                Education
              </h2>
              <div className="space-y-2 text-xs">
                {education.map((edu) => (
                  <div key={edu.id} className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <span className="font-bold text-white">{edu.degree}</span>
                      <span className="text-neutral-400 block sm:inline sm:ml-2">
                        — {edu.institution}, {edu.location}
                      </span>
                    </div>
                    <span className="font-mono text-neutral-400">{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold border-b border-white/10 pb-1">
                Certifications & Professional Courses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      {cert.title} — {cert.issuer} {cert.period_or_date ? `(${cert.period_or_date})` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 no-print">
          <div className="text-xs font-mono text-neutral-400">
            {resumeDownloadUrl
              ? `Attached File: ${profile?.resume_filename || 'Resume.pdf'}`
              : 'Live ATS-formatted portfolio resume'}
          </div>
          <div className="flex items-center gap-3">
            {resumeDownloadUrl ? (
              <a
                href={resumeDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={profile?.resume_filename || 'Resume.pdf'}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-glow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Resume PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-glow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
