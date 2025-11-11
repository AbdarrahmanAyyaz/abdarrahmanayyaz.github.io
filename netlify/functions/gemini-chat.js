const { GoogleGenerativeAI } = require("@google/generative-ai");

// In-memory rate limiting (simple implementation for serverless)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requests per minute per user

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

// Input validation and sanitization
const validateInput = (message, history) => {
  const errors = [];

  if (!message || typeof message !== 'string') {
    errors.push('Message is required and must be a string');
  }

  if (message && message.length > 2000) {
    errors.push('Message is too long (max 2000 characters)');
  }

  if (message && message.trim().length < 1) {
    errors.push('Message cannot be empty');
  }

  if (history && !Array.isArray(history)) {
    errors.push('History must be an array');
  }

  if (history && history.length > 50) {
    errors.push('History is too long (max 50 messages)');
  }

  return {
    isValid: errors.length === 0,
    errors
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
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'AI service is not properly configured. Please try again later.'
        }),
      };
    }

    // Parse request body
    const { message, history, context: chatContext } = JSON.parse(event.body);

    // Rate limiting based on IP or session
    const identifier = context.identity?.ip || 'anonymous';
    if (!checkRateLimit(identifier)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Too many requests. Please wait a moment before sending another message.',
          rateLimited: true
        }),
      };
    }

    // Validate input
    const validation = validateInput(message, history);
    if (!validation.isValid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: validation.errors.join(', ')
        }),
      };
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
        stopSequences: ["\n\n\n"]
      }
    });

    // Start chat with history
    const chat = model.startChat({
      history: history || []
    });

    // Build the contextual message
    let fullMessage = message;
    if (chatContext) {
      fullMessage = `${chatContext}\n\nUser Question: ${message}`;
    }

    // Send message and get response
    const result = await chat.sendMessage(fullMessage);
    const response = await result.response;
    const responseText = response.text();

    // Ensure response ends with complete sentence
    const ensureCompleteSentence = (text) => {
      if (!text || text.trim().length === 0) return text;
      const trimmed = text.trim();
      const lastChar = trimmed[trimmed.length - 1];
      const isComplete = ['.', '!', '?'].includes(lastChar);

      if (isComplete) return trimmed;

      const lastSentenceEnd = Math.max(
        trimmed.lastIndexOf('.'),
        trimmed.lastIndexOf('!'),
        trimmed.lastIndexOf('?')
      );

      if (lastSentenceEnd > 0) {
        return trimmed.substring(0, lastSentenceEnd + 1);
      }

      return trimmed + '...';
    };

    const finalResponse = ensureCompleteSentence(responseText);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        response: finalResponse,
        messageCount: (history?.length || 0) + 1
      }),
    };

  } catch (error) {
    console.error('Gemini API error:', error);

    // Handle specific Gemini API errors
    if (error.message?.includes('quota')) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'AI service quota exceeded. Please try again later.'
        }),
      };
    }

    if (error.message?.includes('safety')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Message was blocked by safety filters. Please rephrase your question.'
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'AI service error. Please try again in a moment.'
      }),
    };
  }
};
