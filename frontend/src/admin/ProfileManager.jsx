import React, { useState, useEffect } from 'react';
import { Save, Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import portfolioService from '../services/api';

const ProfileManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    hero_subtitle: '',
    bio: '',
    career_objective: '',
    developer_background: '',
    interests: '',
    strengths: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [currentImagePreview, setCurrentImagePreview] = useState(null);
  const [currentResumeUrl, setCurrentResumeUrl] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await portfolioService.getProfile();
        const data = res.data;
        setFormData({
          name: data.name || '',
          title: data.title || '',
          hero_subtitle: data.hero_subtitle || '',
          bio: data.bio || '',
          career_objective: data.career_objective || '',
          developer_background: data.developer_background || '',
          interests: data.interests || '',
          strengths: data.strengths || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
        });
        if (data.profile_image_url) {
          setCurrentImagePreview(data.profile_image_url);
        }
        if (data.resume_url) {
          setCurrentResumeUrl(data.resume_url);
        }
      } catch (err) {
        setFeedback({ type: 'error', text: 'Failed to load profile data.' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setCurrentImagePreview(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: '', text: '' });

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });

      if (profileImageFile) {
        data.append('profile_image', profileImageFile);
      }
      if (resumeFile) {
        data.append('resume', resumeFile);
      }

      const res = await portfolioService.updateProfile(data);
      if (res.data.profile_image_url) setCurrentImagePreview(res.data.profile_image_url);
      if (res.data.resume_url) setCurrentResumeUrl(res.data.resume_url);

      setFeedback({
        type: 'success',
        text: 'Profile and About settings updated successfully. Changes are now live!',
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err.response?.data?.detail || 'Failed to update profile. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-classic-accent animate-spin mb-3" />
        <span className="font-serif text-ink-heading">Loading Profile Data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      <div>
        <h1 className="font-serif text-3xl font-bold text-ink-heading">
          Profile & About Management
        </h1>
        <p className="text-sm font-mono text-ink-muted mt-1">
          Edit your headline, career objectives, strengths, profile photo, and downloadable resume.
        </p>
      </div>

      {feedback.text && (
        <div
          className={`p-4 rounded border flex items-center gap-3 text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Core Identity */}
        <div className="bg-paper-card border border-paper-border rounded shadow-classic p-6 space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink-heading border-b border-paper-border pb-3">
            Core Headline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                Professional Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
              Hero Introduction Tagline
            </label>
            <textarea
              name="hero_subtitle"
              rows={2}
              value={formData.hero_subtitle}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent resize-none"
            ></textarea>
          </div>
        </div>

        {/* Media & Resume Files */}
        <div className="bg-paper-card border border-paper-border rounded shadow-classic p-6 space-y-6">
          <h2 className="font-serif text-xl font-semibold text-ink-heading border-b border-paper-border pb-3">
            Profile Portrait & Resume
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Profile Photo */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded border border-paper-border overflow-hidden bg-paper-muted shrink-0 flex items-center justify-center">
                  {currentImagePreview ? (
                    <img
                      src={currentImagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-serif text-2xl font-bold text-classic-accent">P</span>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-paper-border file:text-xs file:font-mono file:bg-paper-muted file:text-ink-body hover:file:bg-stone-200"
                  />
                  <span className="block text-[11px] font-mono text-ink-faint mt-1">
                    PNG, JPG, or WEBP up to 5MB
                  </span>
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-2">
                Curriculum Vitae / Resume
              </label>
              <div className="space-y-2">
                {currentResumeUrl && (
                  <div className="flex items-center gap-2 text-xs font-mono text-ink-body">
                    <FileText className="w-4 h-4 text-classic-accent" />
                    <a
                      href={currentResumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-classic-accent"
                    >
                      View Current Resume
                    </a>
                  </div>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-paper-border file:text-xs file:font-mono file:bg-paper-muted file:text-ink-body hover:file:bg-stone-200"
                />
                <span className="block text-[11px] font-mono text-ink-faint">
                  PDF or Word document (replaces current file on save)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed About Content */}
        <div className="bg-paper-card border border-paper-border rounded shadow-classic p-6 space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink-heading border-b border-paper-border pb-3">
            About Section Details
          </h2>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
              Full Profile Introduction (Bio)
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
              Career Objective
            </label>
            <textarea
              name="career_objective"
              rows={3}
              value={formData.career_objective}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
              Developer Background & Technical Journey
            </label>
            <textarea
              name="developer_background"
              rows={3}
              value={formData.developer_background}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                Core Strengths (Comma or newline separated)
              </label>
              <textarea
                name="strengths"
                rows={3}
                value={formData.strengths}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                Interests & Focus
              </label>
              <textarea
                name="interests"
                rows={3}
                value={formData.interests}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Contact & Social Channels */}
        <div className="bg-paper-card border border-paper-border rounded shadow-classic p-6 space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink-heading border-b border-paper-border pb-3">
            Contact & Social Profiles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                GitHub Profile URL
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-white bg-classic-primary hover:bg-classic-primary-hover border border-classic-primary rounded shadow-classic transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProfileManager;
