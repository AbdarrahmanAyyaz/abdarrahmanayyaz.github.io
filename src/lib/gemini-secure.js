// Secure Gemini API client using Netlify serverless function
// This avoids exposing the API key in the client-side bundle

import projectCards from "../context/project_cards.json";
import aboutCards from "../context/about_cards.json";

// Base Context for AI Training
const BASE_PORTFOLIO_CONTEXT = `
You are AI Abdarrahman, an AI version of Abdarrahman Ayyaz.

OVERVIEW:
- Cloud Support Engineer at Oracle (professional role)
- AI enthusiast who builds solutions in personal time
- Creates internal tools for developer productivity
- Builds passion projects like TriagedAI and Advancely

Note: Additional context will be provided dynamically based on the specific question asked.

PERSONAL PHILOSOPHY:
CONsistency, FOcus, Discipline - These three pillars guide my approach to development, learning, and problem-solving. I believe in building reliable systems, maintaining focused execution, and applying disciplined engineering practices.

TECHNICAL EXPERTISE SUMMARY:
- 4+ years: React, TypeScript, Modern Frontend Development
- 2+ years: AI/ML, LLM Integration, Intelligent System Design
- 2+ years: Cloud Engineering, Scalable Architecture, DevOps

RESPONSE GUIDELINES:
- ALWAYS keep responses short and conversational (2-3 sentences max)
- CLEARLY DISTINGUISH between professional work at Oracle vs personal AI projects
- When asked about work/job: focus on Oracle Cloud Support Engineer role
- When asked about projects/AI: focus on personal passion projects like TriagedAI and Advancely
- Only elaborate when specifically asked for "details", "more info", "tell me more", etc.
- Answer directly and concisely - avoid long explanations unless requested
- Use simple, clear language - no technical jargon unless asked
- Always respond as Abdarrahman in first person
- End with a brief follow-up question if appropriate
- Use emojis sparingly (max 1 per response)
`;

// Project links mapping
const PROJECT_LINKS = {
  'triagedai': { url: 'https://triagedai.com', patterns: ['triagedai', 'triaged ai', 'triage ai'] },
  'advancely': { url: 'https://advancely.ai', patterns: ['advancely'] },
  'excel to rag': { url: 'https://excel-to-rag-converter.streamlit.app/', patterns: ['excel to rag', 'excel-to-rag', 'rag converter'] },
  'portfolio': {
    url: 'https://github.com/AbdarrahmanAyyaz/abdarrahmanayyaz.github.io',
    patterns: ['portfolio react app', 'this portfolio', 'this website']
  },
  'tumor segmentation': {
    url: 'https://github.com/AbdarrahmanAyyaz/TumorSegmentation/blob/main/README.md',
    patterns: ['brain tumor', 'tumor segmentation', 'medical ai', 'brats']
  },
  'linkedin': { url: 'https://www.linkedin.com/in/abdarrahman-ayyaz/', patterns: ['linkedin'] },
  'github': { url: 'https://github.com/AbdarrahmanAyyaz', patterns: ['github'] },
  'email': { url: 'mailto:abdarrahmanayyaz00@gmail.com', patterns: ['email'] }
};

// Intent detection for dynamic context
const getMessageIntent = (message) => {
  const lowerMessage = message.toLowerCase();

  if (/(who are you|about you|tell me about yourself|about me|hobbies|interests|outside work|what do you like|coffee chat|coffee|network|family|community|volunteer|values|personal|martial arts|boxing|hiking|travel|con-fo-di|philosophy|discipline|consistency|focus)/i.test(lowerMessage)) {
    return 'personal';
  }

  if (/(where do you work|current work|current job|current role|employment|work at|working at|job at|oracle|employer|current company|work experience|career|professional background|cloud support|support engineer)/i.test(lowerMessage)) {
    return 'work';
  }

  if (/(triagedai|advancely|brain tumor|portfolio|project|how does|tell me about|what is|realtimesearch|brats)/i.test(lowerMessage)) {
    return 'project';
  }

  return 'general';
};

// Cached markdown content
let portfolioMarkdown = null;
let resumeMarkdown = null;

// Fetch markdown files dynamically
const fetchMarkdownContent = async () => {
  if (!portfolioMarkdown || !resumeMarkdown) {
    try {
      const [portfolioResponse, resumeResponse] = await Promise.all([
        fetch('/context/aa_portfolio_context.md'),
        fetch('/context/resume_context.md')
      ]);

      if (portfolioResponse.ok) {
        portfolioMarkdown = await portfolioResponse.text();
      }
      if (resumeResponse.ok) {
        resumeMarkdown = await resumeResponse.text();
      }
    } catch (error) {
      console.warn('Failed to fetch markdown files:', error);
    }
  }
};

// Build context based on intent using markdown files + JSON fallback
const buildDynamicContext = async (intent) => {
  await fetchMarkdownContent();
  let contextBlock = '';

  if (intent === 'personal') {
    if (portfolioMarkdown) {
      const aboutSection = portfolioMarkdown.match(/## About Me[\s\S]*?(?=##|$)/i);
      const personalFAQ = portfolioMarkdown.match(/## Personal FAQ[\s\S]*?(?=##|$)/i);
      const philosophy = portfolioMarkdown.match(/### CON-FO-DI Philosophy[\s\S]*?(?=###|##|$)/i);

      contextBlock += 'PERSONAL INFO FROM PORTFOLIO:\n';
      if (aboutSection) contextBlock += aboutSection[0] + '\n';
      if (personalFAQ) contextBlock += personalFAQ[0] + '\n';
      if (philosophy) contextBlock += philosophy[0] + '\n';
    }

    const personalContext = aboutCards.map(card =>
      `${card.topic}: ${card.one_liner}`
    ).join('\n');
    contextBlock += `\nSUPPLEMENTAL PERSONAL INFO:\n${personalContext}\n\n`;

  } else if (intent === 'work') {
    if (resumeMarkdown) {
      const currentRole = resumeMarkdown.match(/## Current Role[\s\S]*?(?=##|$)/i);
      const workExperience = resumeMarkdown.match(/## Work Experience[\s\S]*?(?=##|$)/i);

      contextBlock += 'WORK INFO FROM RESUME:\n';
      if (currentRole) contextBlock += currentRole[0] + '\n';
      if (workExperience) contextBlock += workExperience[0] + '\n';
    }

  } else if (intent === 'project') {
    if (portfolioMarkdown) {
      const projectsSection = portfolioMarkdown.match(/## Projects[\s\S]*?(?=##|$)/i);
      if (projectsSection) {
        contextBlock += 'PROJECTS FROM PORTFOLIO:\n' + projectsSection[0] + '\n';
      }
    }

    const projectContext = projectCards.slice(0, 3).map(card =>
      `${card.project}: ${card.one_liner} (Stack: ${card.stack?.join(', ')})`
    ).join('\n');
    contextBlock += `\nSUPPLEMENTAL PROJECT INFO:\n${projectContext}\n\n`;
  }

  return contextBlock;
};

// Function to inject links into AI response
const injectProjectLinks = (text) => {
  let enrichedText = text;

  const sortedProjects = Object.entries(PROJECT_LINKS).sort((a, b) => {
    const maxLengthA = Math.max(...a[1].patterns.map(p => p.length));
    const maxLengthB = Math.max(...b[1].patterns.map(p => p.length));
    return maxLengthB - maxLengthA;
  });

  sortedProjects.forEach(([projectName, { url, patterns }]) => {
    patterns.forEach(pattern => {
      const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(
        `(?<!\\[)\\b(${escapedPattern})\\b(?!\\]|\\))(?![^\\[]*\\])`,
        'gi'
      );

      enrichedText = enrichedText.replace(regex, (match) => {
        return `[${match}](${url})`;
      });
    });
  });

  return enrichedText;
};

// Secure API endpoint
const GEMINI_API_ENDPOINT = '/.netlify/functions/gemini-chat';

// Chat session management
class SecureChatSession {
  constructor() {
    this.history = [];
  }

  async sendMessage(message) {
    try {
      // Detect intent and build dynamic context
      const intent = getMessageIntent(message);
      const dynamicContext = await buildDynamicContext(intent);

      // Check if user is asking for more details
      const wantsDetails = /(tell me more|more details|elaborate|explain|deep dive|how does|architecture|technical|stack)/i.test(message);

      // Build the complete context message
      let contextualMessage = `${BASE_PORTFOLIO_CONTEXT}\n\n`;
      contextualMessage += `${dynamicContext}\n\n`;

      if (wantsDetails) {
        contextualMessage += `Please provide a detailed, comprehensive answer. IMPORTANT: Always end your response with a complete sentence (., !, or ?).`;
      } else {
        contextualMessage += `Keep response brief and conversational - 2-3 complete sentences maximum. IMPORTANT: Always end with proper punctuation (., !, or ?).`;
      }

      // Call the secure serverless function
      const response = await fetch(GEMINI_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: this.history,
          context: contextualMessage
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.rateLimited) {
          throw new Error('Rate limit exceeded. Please wait a moment before sending another message.');
        }
        throw new Error(data.error || 'Failed to get response from AI');
      }

      if (!data.success) {
        throw new Error(data.error || 'AI service error');
      }

      // Update history
      this.history.push(
        { role: 'user', parts: [{ text: message }] },
        { role: 'model', parts: [{ text: data.response }] }
      );

      // Inject project links into the response
      const enrichedResponse = injectProjectLinks(data.response);

      return enrichedResponse;

    } catch (error) {
      console.error('Secure Gemini API Error:', error);

      // Provide fallback responses based on intent
      const intent = getMessageIntent(message);
      if (intent === 'personal') {
        return "I'm passionate about martial arts (boxing), hiking in nature, and travel. I value family, consistency, focus, and discipline (my CON-FO-DI philosophy). What would you like to know more about?";
      } else if (intent === 'work') {
        return "I'm a Cloud Support Engineer at Oracle, helping enterprise developers with production issues and CI/CD pipelines. I also build AI tools as passion projects. What would you like to know?";
      } else if (intent === 'project') {
        return "I build AI projects like TriagedAI (technical support tool) and Advancely (personal development platform) in my personal time. Which project interests you?";
      }

      return "I'm having trouble connecting right now. You can explore my portfolio sections above, or try asking again in a moment!";
    }
  }
}

export const initializeGeminiChat = () => {
  return new SecureChatSession();
};

export const sendMessageToGemini = async (chat, message) => {
  return await chat.sendMessage(message);
};

export const warmRagFromPublic = async () => {
  return Promise.resolve();
};

export const createNewChatSession = () => {
  return initializeGeminiChat();
};
