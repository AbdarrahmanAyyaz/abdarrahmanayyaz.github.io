import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceID: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id',
  templateID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key'
};

// Initialize EmailJS with public key
if (EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'your_public_key') {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

const validateForm = (formData) => {
  const errors = {};

  const name = formData.get('name')?.trim();
  const email = formData.get('email')?.trim();
  const message = formData.get('message')?.trim();

  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  if (!message || message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const submitContactForm = async (formData) => {
  // Basic client-side validation
  const validation = validateForm(formData);
  if (!validation.isValid) {
    return {
      success: false,
      error: 'Please fix the form errors and try again.',
      fieldErrors: validation.errors
    };
  }

  // Check for honeypot (bot detection)
  const company = formData.get('company');
  if (company) {
    // Bot detected, return fake success
    return {
      success: true,
      message: 'Thanks! I\'ll get back to you soon.'
    };
  }

  // Check if EmailJS is properly configured
  if (EMAILJS_CONFIG.serviceID === 'your_service_id' ||
      EMAILJS_CONFIG.templateID === 'your_template_id' ||
      EMAILJS_CONFIG.publicKey === 'your_public_key') {
    return {
      success: false,
      error: 'Contact form is not properly configured. Please email me directly at abdarrahmanayyaz00@gmail.com.'
    };
  }

  // Prepare template parameters for EmailJS
  const templateParams = {
    from_name: formData.get('name'),
    from_email: formData.get('email'),
    subject: formData.get('subject') || 'Contact Form Submission',
    message: formData.get('message')
  };

  try {
    // Send email using EmailJS
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    if (result.status === 200) {
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you within 24 hours.'
      };
    } else {
      throw new Error('EmailJS returned non-200 status');
    }

  } catch (error) {
    console.error('Contact form submission error:', error);

    // Handle specific EmailJS errors
    if (error.text) {
      return {
        success: false,
        error: 'Email service error. Please try again or email me directly at abdarrahmanayyaz00@gmail.com.'
      };
    }

    return {
      success: false,
      error: 'Network error. Please try again or email me directly at abdarrahmanayyaz00@gmail.com.'
    };
  }
};