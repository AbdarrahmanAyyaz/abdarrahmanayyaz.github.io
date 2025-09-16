// Frontend contact form submission via serverless function
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

  // Convert FormData to regular object
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    company: formData.get('company') // honeypot
  };

  try {
    // Call our serverless function
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Something went wrong. Please try again.',
        fieldErrors: result.fieldErrors,
        rateLimited: result.rateLimited
      };
    }

    return result;

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Unable to connect. Please check your internet connection or email me directly at abdarrahmanayyaz00@gmail.com.'
      };
    }
    
    return {
      success: false,
      error: 'Network error. Please try again or email me directly at abdarrahmanayyaz00@gmail.com.'
    };
  }
};