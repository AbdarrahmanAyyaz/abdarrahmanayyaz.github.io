const { Resend } = require('resend');

// In-memory rate limiting (simple implementation for serverless)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3;

const cleanupRateLimit = () => {
  const now = Date.now();
  for (const [key, data] of rateLimitMap.entries()) {
    if (now - data.windowStart > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key);
    }
  }
};

const checkRateLimit = (identifier) => {
  cleanupRateLimit();
  
  const now = Date.now();
  const data = rateLimitMap.get(identifier);
  
  if (!data) {
    rateLimitMap.set(identifier, {
      count: 1,
      windowStart: now
    });
    return true;
  }
  
  if (now - data.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(identifier, {
      count: 1,
      windowStart: now
    });
    return true;
  }
  
  if (data.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  data.count++;
  return true;
};

const validateForm = (data) => {
  const errors = {};
  
  const { name, email, message } = data;
  
  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!email) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
  }
  
  if (!message || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const createEmailTemplate = (data) => {
  const { name, email, subject = 'Contact Form Submission', message } = data;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>New Contact Form Submission</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          color: white; 
          padding: 30px; 
          border-radius: 8px 8px 0 0; 
          text-align: center; 
        }
        .content { 
          background: #f8f9fa; 
          padding: 30px; 
          border-radius: 0 0 8px 8px; 
        }
        .field { 
          margin-bottom: 20px; 
        }
        .label { 
          font-weight: 600; 
          color: #495057; 
          text-transform: uppercase; 
          font-size: 12px; 
          letter-spacing: 0.5px; 
          margin-bottom: 5px; 
        }
        .value { 
          background: white; 
          padding: 12px; 
          border-radius: 6px; 
          border: 1px solid #dee2e6; 
        }
        .message-box { 
          background: white; 
          padding: 20px; 
          border-radius: 6px; 
          border: 1px solid #dee2e6; 
          white-space: pre-wrap; 
        }
        .footer { 
          text-align: center; 
          margin-top: 20px; 
          padding-top: 20px; 
          border-top: 1px solid #dee2e6; 
          color: #6c757d; 
          font-size: 14px; 
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">From abdarrahman.dev</p>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="label">Name</div>
          <div class="value">${name}</div>
        </div>
        
        <div class="field">
          <div class="label">Email</div>
          <div class="value">${email}</div>
        </div>
        
        <div class="field">
          <div class="label">Subject</div>
          <div class="value">${subject}</div>
        </div>
        
        <div class="field">
          <div class="label">Message</div>
          <div class="message-box">${message}</div>
        </div>
        
        <div class="footer">
          <p>Received at ${new Date().toLocaleString()}</p>
          <p>Reply directly to this email to respond to ${name}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    subject: `[Portfolio Contact] ${subject}`,
    html: htmlContent,
    text: `
New contact form submission from ${name}

Email: ${email}
Subject: ${subject}

Message:
${message}

---
Received at ${new Date().toLocaleString()}
Reply directly to this email to respond to ${name}.
    `.trim()
  };
};

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    
    // Check for honeypot
    if (data.company) {
      // Bot detected, return fake success
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Thanks! I\'ll get back to you soon.'
        }),
      };
    }

    // Rate limiting
    const identifier = data.email || context.identity?.ip || 'anonymous';
    if (!checkRateLimit(identifier)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Too many requests. Please wait a moment before submitting again.',
          rateLimited: true
        }),
      };
    }

    // Validate form data
    const validation = validateForm(data);
    if (!validation.isValid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Please fix the form errors and try again.',
          fieldErrors: validation.errors
        }),
      };
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Server configuration error. Please try again or email me directly.'
        }),
      };
    }

    // Create email template
    const emailTemplate = createEmailTemplate(data);

    // Send email
    const result = await resend.emails.send({
      from: 'Portfolio Contact <noreply@abdarrahman.dev>',
      to: [process.env.CONTACT_EMAIL || 'abdarrahmanayyaz00@gmail.com'],
      replyTo: data.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
      headers: {
        'X-Contact-Name': data.name,
        'X-Contact-Email': data.email,
        'X-Source': 'Portfolio Contact Form'
      }
    });

    console.log('Email sent successfully:', result.data?.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you within 24 hours.',
        emailId: result.data?.id
      }),
    };

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Network error. Please try again or email me directly at abdarrahmanayyaz00@gmail.com.'
      }),
    };
  }
};