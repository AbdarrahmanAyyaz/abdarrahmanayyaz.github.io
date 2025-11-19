import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMail, HiClipboardCopy, HiExternalLink, HiCheckCircle, HiSparkles } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import Section from "./Section";
import SectionHeader from "./ui/SectionHeader";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui";
import { useToast } from "./ui/Toast";
import { submitContactForm } from "../utils/contactApi";

const PURPOSE_OPTIONS = [
  {
    id: 'freelance',
    label: 'Freelance',
    icon: '💼',
    subject: 'Freelance Project Inquiry',
    messageStart: 'Hi Abdarrahman,\n\nI have a freelance project that might be a good fit for your skills. '
  },
  {
    id: 'collab',
    label: 'Collab',
    icon: '🤝',
    subject: 'Collaboration Opportunity',
    messageStart: 'Hi Abdarrahman,\n\nI\'d like to explore a potential collaboration opportunity. '
  },
  {
    id: 'mentorship',
    label: 'Mentorship',
    icon: '🎓',
    subject: 'Mentorship Request',
    messageStart: 'Hi Abdarrahman,\n\nI\'m interested in learning more about AI development and cloud infrastructure. '
  },
  {
    id: 'question',
    label: 'Question',
    icon: '❓',
    subject: 'Quick Question',
    messageStart: 'Hi Abdarrahman,\n\nI have a question about '
  }
];

// ContactCard component - currently unused but kept for future use
// eslint-disable-next-line no-unused-vars
const ContactCard = ({ title, subtitle, icon: Icon, href, onCopy, copyText }) => {
  const { toast } = useToast();

  const handleCopy = useCallback(() => {
    if (copyText) {
      navigator.clipboard.writeText(copyText).then(() => {
        toast.success(`${title} copied to clipboard`);
        onCopy && onCopy();
      }).catch(() => {
        toast.error('Failed to copy to clipboard');
      });
    }
  }, [copyText, title, toast, onCopy]);

  return (
    <motion.div
      className="bg-surface border border-border shadow-soft rounded-2xl p-4 sm:p-6"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-text">{title}</div>
            <div className="text-sm text-muted truncate">{subtitle}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {copyText && (
            <Button
              variant="secondary"
              size="icon-lg"
              onClick={handleCopy}
              className="shrink-0 hover:bg-accent hover:text-white"
              aria-label={`Copy ${title}`}
            >
              <HiClipboardCopy className="w-5 h-5" />
            </Button>
          )}
          {href && (
            <Button
              asChild
              variant="secondary"
              size="icon-lg"
              className="shrink-0 hover:bg-accent hover:text-white"
            >
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={`Open ${title}`}
              >
                <HiExternalLink className="w-5 h-5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FormField = ({ 
  id, 
  name, 
  label, 
  required = false, 
  type = 'text', 
  placeholder, 
  rows,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  hint,
  ...props 
}) => {
  const fieldId = `field-${id || name}`;
  const errorId = error ? `${fieldId}-error` : undefined;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  
  const Component = rows ? 'textarea' : 'input';
  
  const fieldClasses = `
    w-full bg-transparent border border-border rounded-lg px-4 py-3 text-text placeholder-muted
    transition-all duration-200 
    focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-accent
    hover:border-accent/50 focus:shadow-inner-soft
    ${error ? 'border-danger focus-visible:ring-danger' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `.trim();

  return (
    <div>
      <label 
        htmlFor={fieldId} 
        className="block text-sm font-medium text-text mb-2"
      >
        {label}
        {required && <span className="text-danger ml-1" aria-label="required">*</span>}
      </label>
      
      <Component
        id={fieldId}
        name={name}
        type={type}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={fieldClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
        {...props}
      />
      
      {hint && (
        <p id={hintId} className="mt-2 text-xs text-muted">
          {hint}
        </p>
      )}
      
      {error && (
        <motion.p
          id={errorId}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-danger flex items-center gap-1"
          role="alert"
        >
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default function Contacts() {
  const { toast } = useToast();
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const successRef = useRef(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [fieldErrors]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    
    // Basic inline validation
    let error = '';
    if (name === 'name' && value && value.trim().length < 2) {
      error = 'Name must be at least 2 characters';
    } else if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Please enter a valid email address';
      }
    } else if (name === 'message' && value && value.trim().length < 10) {
      error = 'Message must be at least 10 characters';
    }
    
    if (error) {
      setFieldErrors(prev => ({ ...prev, [name]: error }));
    }
  }, []);

  const handlePurposeSelect = useCallback((purpose) => {
    setSelectedPurpose(purpose);
    setFormData(prev => ({
      ...prev,
      subject: purpose.subject,
      message: purpose.messageStart
    }));
  }, []);

  const isFormValid = () => {
    const { name, email, message } = formData;
    return (
      name.trim().length >= 2 && 
      email.trim().length > 0 && 
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
      message.trim().length >= 10 &&
      Object.keys(fieldErrors).length === 0
    );
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (status === 'loading') return;
    
    setStatus('loading');
    setFieldErrors({});
    
    const formDataObj = new FormData(e.target);
    
    try {
      const result = await submitContactForm(formDataObj);
      
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSelectedPurpose(null);
        
        // Focus success message for screen readers
        setTimeout(() => {
          successRef.current?.focus();
        }, 100);
        
        toast.success('Message sent successfully!');
      } else {
        setStatus('error');
        
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
          // Focus first invalid field
          const firstErrorField = Object.keys(result.fieldErrors)[0];
          const element = document.getElementById(`field-${firstErrorField}`);
          element?.focus();
        }
        
        toast.error(result.error);
      }
    } catch (error) {
      setStatus('error');
      toast.error('Network error. Please try again.');
    }
  }, [status, toast]);

  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Get in Touch"
        title="Contact"
        description="Ready to collaborate on AI projects or need cloud support? I'd love to hear from you."
        center
      />

      <div className="mt-12 max-w-2xl mx-auto">
          {/* Contact Form - Single Centered Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-surface border border-border shadow-soft rounded-2xl overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {/* Success Message */}
                {status === "success" && (
                  <motion.div
                    ref={successRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl border border-success/30 bg-success/10 text-success focus:outline-none"
                    tabIndex={-1}
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex items-center gap-3">
                      <HiCheckCircle className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="font-medium">Message sent successfully!</div>
                        <div className="text-sm mt-1">I'll get back to you within 24 hours.</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Purpose Selector */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <HiSparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-text">What's this about?</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {PURPOSE_OPTIONS.map((purpose) => (
                    <button
                      key={purpose.id}
                      type="button"
                      onClick={() => handlePurposeSelect(purpose)}
                      className={`
                        inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                        transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                        ${selectedPurpose?.id === purpose.id
                          ? 'bg-accent text-white shadow-soft'
                          : 'bg-surface/50 border border-border text-muted hover:text-text hover:border-accent/50'
                        }
                      `}
                    >
                      <span>{purpose.icon}</span>
                      {purpose.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex="-1"
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    name="name"
                    label="Name"
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={fieldErrors.name}
                    disabled={status === 'loading'}
                  />

                  <FormField
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={fieldErrors.email}
                    disabled={status === 'loading'}
                  />
                </div>

                <FormField
                  name="subject"
                  label="Subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={fieldErrors.subject}
                  disabled={status === 'loading'}
                />

                <FormField
                  name="message"
                  label="Message"
                  placeholder="Tell me about your project or how I can help..."
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={fieldErrors.message}
                  disabled={status === 'loading'}
                  hint="Please provide as much detail as possible to help me understand your needs."
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted">
                    Your information is secure and will only be used to respond to your inquiry.
                  </p>
                  
                  <Button
                    type="submit"
                    disabled={status === 'loading' || !isFormValid()}
                    size="lg"
                    className="w-full sm:w-auto min-w-[160px] focus-visible:ring-2 focus-visible:ring-ring"
                    loading={status === 'loading'}
                    animate
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>

              {/* Contact Info Footer */}
              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted mb-4">
                  <HiMail className="inline w-4 h-4 mr-2" />
                  abdarrahmanayyaz00@gmail.com
                </p>
                <div className="flex justify-center items-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/abdarrahman-ayyaz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
                    title="LinkedIn"
                  >
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/AbdarrahmanAyyaz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
                    title="GitHub"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
      </div>
    </Section>
  );
}
