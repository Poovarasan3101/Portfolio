import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  MessageSquare 
} from 'lucide-react';
import { LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { portfolioService } from '../services/api';

const Contact = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    message: ''
  });

  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (status.error) {
      setStatus({ ...status, error: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please fill out all required fields before submitting.",
        message: ''
      });
      return;
    }

    setStatus({
      submitting: true,
      success: false,
      error: null,
      message: ''
    });

    try {
      const response = await portfolioService.submitContact(formData);
      
      // Trigger festive confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setStatus({
        submitting: false,
        success: true,
        error: null,
        message: response.message || "Thank you! Your message has been saved to the MySQL database. Poovarasan will reach out soon!"
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (err) {
      console.error("Submission failed:", err);
      let errorMsg = "Something went wrong while sending your message. Please check the backend connection or email directly.";
      if (err.errors) {
        const errorKeys = Object.keys(err.errors);
        errorMsg = errorKeys.map(k => `${k}: ${err.errors[k].join(', ')}`).join(' | ');
      } else if (err.message) {
        errorMsg = err.message;
      }

      setStatus({
        submitting: false,
        success: false,
        error: errorMsg,
        message: ''
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Direct Email",
      value: profile?.email || "poovarasan31012005@gmail.com",
      href: `mailto:${profile?.email || "poovarasan31012005@gmail.com"}`,
      copyable: true,
      id: "email"
    },
    {
      icon: Phone,
      title: "Mobile Contact",
      value: profile?.phone || "+91-9629617818",
      href: `tel:${profile?.phone || "+91-9629617818"}`,
      copyable: true,
      id: "phone"
    },
    {
      icon: MapPin,
      title: "Location",
      value: profile?.location || "Salem, Tamil Nadu, India",
      href: null,
      copyable: false,
      id: "location"
    },
    {
      icon: LinkedinIcon,
      title: "LinkedIn Profile",
      value: "poovarasan-subramani-310105sana",
      href: profile?.linkedin_url || "https://www.linkedin.com/in/poovarasan-subramani-310105sana",
      copyable: false,
      id: "linkedin"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            <MessageSquare className="w-3.5 h-3.5 text-neutral-300" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Have an open role, project inquiry, or just want to talk about Python and full-stack development? 
            Send a message directly into my database.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-neutral-200 to-transparent rounded-full mx-auto" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/10 backdrop-blur-md shadow-glow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Contact Coordinates
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Feel free to reach out directly through any of these communication channels.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const isCopied = copiedField === info.id;

                  return (
                    <div 
                      key={info.id}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3.5 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                            {info.title}
                          </div>
                          {info.href ? (
                            <a 
                              href={info.href} 
                              target={info.href.startsWith('http') ? '_blank' : '_self'} 
                              rel="noopener noreferrer"
                              className="text-xs sm:text-sm font-medium text-white hover:text-neutral-300 truncate block transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <div className="text-xs sm:text-sm font-medium text-white truncate">
                              {info.value}
                            </div>
                          )}
                        </div>
                      </div>

                      {info.copyable && (
                        <button
                          onClick={() => handleCopy(info.value, info.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          title="Copy to clipboard"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs text-neutral-400 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Fast Response Guaranteed
                </div>
                <p className="text-[11px] text-neutral-400 font-sans">
                  Messages submitted here trigger real-time records in the Django backend MySQL database. 
                  I typically respond within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Functional MySQL-Backed Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#111111] border border-white/10 backdrop-blur-md shadow-glow-card">
              
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Send Me a Message
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Powered by Django REST API & MySQL Relational Storage
                  </p>
                </div>
                <span className="text-[11px] font-mono bg-white/10 text-neutral-300 px-2.5 py-1 rounded-full border border-white/10">
                  POST /api/contact/
                </span>
              </div>

              {/* Status Alert Banner */}
              {status.success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 animate-fadeIn">
                  <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs sm:text-sm text-emerald-300">
                    <span className="font-bold block text-white">Message Delivered Successfully!</span>
                    {status.message}
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs sm:text-sm text-red-300">
                    <span className="font-bold block text-white">Submission Notice</span>
                    {status.error}
                  </div>
                </div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe / Recruiter"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-sans"
                    />
                  </div>

                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer Opportunity at [Company]"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-sans"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your note, job description, or inquiry here..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#161616] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-sans resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full py-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all shadow-glow-md disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {status.submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Saving to MySQL Database...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
