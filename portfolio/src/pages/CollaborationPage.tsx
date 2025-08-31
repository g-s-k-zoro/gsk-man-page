import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, Lock, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume-data.json';

const CollaborationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idea: '',
    honeypot: '' // Hidden field for spam protection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot
    if (formData.honeypot) {
      return; // Likely spam
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using Formspree - Replace 'YOUR_FORM_ID' with actual Formspree form ID
      const response = await fetch('https://formspree.io/f/mldwnwqq', {  // ← REPLACE THIS
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name || 'Anonymous',
          email: formData.email,
          idea: formData.idea
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', idea: '', honeypot: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Let's Collaborate</h1>
        <p className="text-xl text-muted mb-12">
          Have an interesting idea? I'm always open to working with passionate people on challenging projects.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass-panel p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <MessageSquare className="text-accent" />
              <span>Pitch Your Idea</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field (optional) */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted mb-2">
                  Name <span className="text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-panel border border-dark-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email field (required) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-panel border border-dark-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {/* Idea field (required) */}
              <div>
                <label htmlFor="idea" className="block text-sm font-medium text-muted mb-2">
                  Your Idea <span className="text-accent">*</span>
                </label>
                <textarea
                  id="idea"
                  name="idea"
                  value={formData.idea}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-dark-panel border border-dark-border rounded-lg focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell me about your project idea, what problem it solves, and how we could work together..."
                />
              </div>

              {/* Honeypot field (hidden) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Privacy note */}
              <div className="flex items-start space-x-2 text-xs text-muted">
                <Lock size={14} className="mt-0.5" />
                <p>I will keep your idea private unless we agree otherwise.</p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-accent text-dark-bg rounded-lg hover:bg-accent/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  Failed to send message. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Direct Contact */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Connect Section */}
          <div className="glass-panel p-6">
            <h2 className="text-2xl font-bold mb-6">Direct Connect</h2>
            
            <div className="space-y-4">
              <a
                href={`mailto:${resumeData.personal.email}`}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-dark-border transition-colors group"
              >
                <Mail className="text-accent" size={20} />
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <p className="text-gray-100 group-hover:text-accent transition-colors">
                    {resumeData.personal.email}
                  </p>
                </div>
              </a>

              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-dark-border transition-colors group"
              >
                <Linkedin className="text-accent" size={20} />
                <div>
                  <p className="text-sm text-muted">LinkedIn</p>
                  <p className="text-gray-100 group-hover:text-accent transition-colors">
                    Connect on LinkedIn
                  </p>
                </div>
              </a>

              <a
                href={resumeData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-dark-border transition-colors group"
              >
                <Github className="text-accent" size={20} />
                <div>
                  <p className="text-sm text-muted">GitHub</p>
                  <p className="text-gray-100 group-hover:text-accent transition-colors">
                    Check out my code
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* What I'm Looking For */}
          <div className="glass-panel p-6">
            <h3 className="text-xl font-bold mb-4">What I'm Interested In</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-accent mt-1">•</span>
                <span>System-level programming challenges</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent mt-1">•</span>
                <span>Security and platform development</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent mt-1">•</span>
                <span>Algorithm optimization problems</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent mt-1">•</span>
                <span>Open source contributions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent mt-1">•</span>
                <span>Mentoring and knowledge sharing</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CollaborationPage;
