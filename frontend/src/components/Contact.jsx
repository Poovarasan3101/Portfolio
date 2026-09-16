import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import portfolioService from '../services/api';

const Contact = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await portfolioService.submitContact(formData);
      setSuccessMessage('Message sent successfully.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setErrorMessage(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Unable to send your message right now. Please try again or reach out directly by email.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-b border-paper-border bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <span className="text-xs font-mono tracking-widest text-classic-accent uppercase mb-2">
            06 / Connect
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink-heading font-normal">
            Get in Touch
          </h2>
          <div className="w-12 h-0.5 bg-classic-accent mt-3"></div>
          <p className="text-sm sm:text-base text-ink-muted mt-3 max-w-xl">
            Whether you have a technical role, collaborative project opportunity, or question regarding my full-stack work, feel free to send a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-paper-card border border-paper-border rounded shadow-classic p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl font-semibold text-ink-heading mb-4">
                Direct Contact Information
              </h3>

              {profile?.email && (
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-paper-muted text-classic-accent rounded border border-paper-border shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block mb-0.5">
                      Email
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm sm:text-base font-medium text-ink-body hover:text-classic-accent transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}

              {profile?.phone && (
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-paper-muted text-classic-accent rounded border border-paper-border shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block mb-0.5">
                      Phone
                    </span>
                    <a
                      href={`tel:${profile.phone}`}
                      className="text-sm sm:text-base font-medium text-ink-body hover:text-classic-accent transition-colors"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {profile?.location && (
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-paper-muted text-classic-accent rounded border border-paper-border shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block mb-0.5">
                      Location
                    </span>
                    <span className="text-sm sm:text-base font-medium text-ink-body">
                      {profile.location}
                    </span>
                  </div>
                </div>
              )}

              {/* Social Channels */}
              <div className="pt-4 border-t border-paper-border">
                <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block mb-3">
                  Professional Profiles
                </span>
                <div className="flex gap-3">
                  {profile?.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-ink-body bg-paper-muted hover:bg-stone-200 border border-paper-border rounded transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {profile?.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-ink-body bg-paper-muted hover:bg-stone-200 border border-paper-border rounded transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-sky-700" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-paper-card border border-paper-border rounded shadow-classic p-6 sm:p-8">
              <h3 className="font-serif text-xl font-semibold text-ink-heading mb-6">
                Send a Message
              </h3>

              {successMessage && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded flex items-center gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-medium">{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded flex items-center gap-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span className="text-sm font-medium">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                      Your Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 py-2.5 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. eleanor@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Python Full Stack Role / Project Collaboration"
                    className="w-full px-3.5 py-2.5 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    className="w-full px-3.5 py-2.5 text-sm bg-paper border border-paper-border rounded focus:bg-white focus:border-classic-accent transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-white bg-classic-primary hover:bg-classic-primary-hover border border-classic-primary rounded shadow-classic transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
