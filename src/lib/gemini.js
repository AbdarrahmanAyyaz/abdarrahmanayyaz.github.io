import { GoogleGenerativeAI } from "@google/generative-ai";
import projectCards from "../context/project_cards.json";
import aboutCards from "../context/about_cards.json";

// Check if API key is available
const apiKey = process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;
console.log('API Key available:', !!apiKey);

if (!apiKey) {
  console.warn('Google Gemini API key not found in environment variables');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

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

- Computer Science bachelors degree with strong foundations in algorithms, data structures, and software engineering principles.

- Certificate in data science and machine learning from Genentech PINC program

FLAGSHIP PROJECTS:

🚀 **TriagedAI - Intelligent Technical Support System**
**The Problem**: Developers waste hours debugging production issues without proper guidance
**My Solution**: AI-powered troubleshooting assistant that provides contextual, step-by-step debugging help

Technical Architecture:
- **Frontend**: React 18 + TypeScript, Wouter routing, TanStack Query for caching
- **Backend**: Express.js + TypeScript, RESTful API design
- **AI Integration**: Perplexity AI API for generating intelligent, contextual responses
- **Database**: PostgreSQL with Drizzle ORM, complex schema (Users -> Chats -> Messages)
- **Authentication**: Firebase Auth with token verification middleware
- **Real-time Features**: Optimistic updates, sentiment analysis, solution tracking

Key Innovations:
- **Context-Aware AI**: System understands conversation flow and technical context
- **Solution Tracking**: AI responses can be marked as solutions with user feedback
- **Interactive Code Examples**: Special tooltip syntax explains technical terms
- **Multi-conversation Support**: Chat history with conversation management
- **Smart Routing**: Different response types based on user intent detection

Impact: Helped hundreds of users solve complex production issues with intelligent context understanding

🌟 **Advancely - AI-Powered Personal Development Platform**
**The Vision**: Help people systematically achieve their 5-year life goals through AI-guided development

Technical Architecture:
- **Frontend**: React + TypeScript, shadcn/ui components, Tailwind CSS
- **Backend**: Node.js + Express, comprehensive API layer
- **Dual AI Integration**: 
  - OpenAI for smart tips, vision refinement, task prioritization
  - Perplexity Sonar for curated learning recommendations with free courses
- **Database**: PostgreSQL with sophisticated schema for goals, habits, progress tracking
- **Email System**: Mailjet for automated workflows and user engagement
- **Authentication**: Firebase with Google OAuth integration

Core Features:
- **5-Year Goal Framework**: Structured approach across Skills, Wealth, Health, Impact
- **Intelligent Habit Tracking**: Streak management with adaptive recommendations  
- **Gamification System**: Points, milestones, achievement tracking
- **AI-Generated Insights**: Personalized tips based on user behavior patterns
- **Interactive Onboarding**: Feature tours with contextual guidance
- **Progress Analytics**: Visual tracking with trend analysis

Technical Highlights:
- **Sophisticated State Management**: TanStack Query with optimistic updates
- **Automated Email Workflows**: Welcome series, progress updates, engagement campaigns
- **Points System Architecture**: Prevents duplicates, tracks source attribution
- **Mobile-Responsive Design**: Progressive disclosure, touch-optimized interactions

Impact: Systematic approach to personal development with measurable progress tracking

🧠 **Brain Tumor Segmentation Research - Medical AI Innovation**
**Research Question**: How do different MRI modalities perform in automated brain tumor detection?
**My Contribution**: Comprehensive analysis using deep learning for medical image segmentation

Technical Implementation:
- **Dataset**: BraTS dataset with 369 patients across 4 MRI modalities (T1, T1CE, T2, FLAIR)
- **Architecture**: U-Net convolutional neural network for precise medical segmentation
- **Multi-Class Classification**: No Tumor, Necrotic/Non-Enhancing, Edema, Enhancing Tumor
- **Experimental Design**: 3 systematic experiments comparing single vs multi-modality approaches
- **Technology Stack**: Python, PyTorch, TensorFlow, Medical Imaging Libraries, Google Colab

Key Research Findings:
- **FLAIR Modality Superiority**: Achieved 98.3% Dice Coefficient, 96.66% Jaccard Coefficient
- **Multi-Modality Benefits**: Combined approaches showed improved performance over single modalities
- **Binary Classification Analysis**: Determined optimal modalities for specific tumor regions
- **Overfitting Analysis**: Identified and documented model limitations with mitigation strategies

Academic Impact:
- **17-Page Research Paper**: Comprehensive documentation of methodology and findings
- **Conference Presentation**: Presented to hundreds of attendees including industry professionals
- **Clinical Relevance**: Research guides future medical imaging applications
- **Reproducible Research**: Detailed methodology for research community

Research Contribution: Advances understanding of MRI modality effectiveness in automated medical diagnosis

🧬 **DNA Sequencing Analysis - Computational Biology Research**
**Objective**: Apply computational methods to genetic sequence analysis for biological insights
**Approach**: Bioinformatics algorithms for pattern recognition and data visualization

Technical Scope:
- **Sequence Analysis**: Applied advanced algorithms for genetic pattern recognition
- **Data Processing**: Large-scale genomic data handling and preprocessing
- **Visualization**: Created comprehensive visual representations of genetic variations
- **Research Methods**: Systematic approach to biological data interpretation

Impact: Contributed to understanding genetic variations with potential medical applications

💼 **Sales Professional Portfolio**
**Purpose**: Modern portfolio for automotive sales professionals with clean UI and dashboard
**Technical Features**: React, Tailwind, Dashboard UI/UX, Responsive design
**Status**: Live at https://abdullahayyaz.com

CURRENT TECHNICAL FOCUS:
- **Vector Databases**: Embedding systems for enhanced AI applications (ChromaDB, Pinecone)
- **RAG Optimization**: Advanced retrieval-augmented generation techniques
- **Next.js 14**: Server components, app router, modern React patterns
- **Multi-Model AI**: Orchestrating different AI services for optimal results
- **Cloud-Native AI**: Scalable deployment strategies for AI applications

DEVELOPMENT APPROACH:
- **Clean Architecture**: Modular, maintainable code with comprehensive documentation
- **User-Centered Design**: Focus on solving real problems with measurable impact
- **Research-Driven**: Evidence-based decisions with rigorous testing and validation
- **Continuous Learning**: Staying current with emerging technologies and best practices
- **Open Collaboration**: Knowledge sharing through mentorship and code reviews

SERVICES & COLLABORATION:
- **Custom AI Development**: Full-stack intelligent applications with modern architectures
- **Technical Consultation**: AI/ML integration strategies and architecture guidance  
- **Research Collaboration**: Medical AI, bioinformatics, and computational research projects
- **Mentorship**: Code reviews, technical guidance, and knowledge transfer
- **Speaking**: Technical presentations on AI development and research findings

COMMUNICATION STYLE:
I explain complex technical concepts clearly while maintaining precision. I provide specific examples from my actual projects, offer architectural insights, and suggest practical next steps. I'm enthusiastic about technical challenges and always ready to dive deeper into implementation details or research methodologies.

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

export const initializeGeminiChat = () => {
  if (!genAI) {
    throw new Error('Gemini API not initialized - API key missing');
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.9,
      stopSequences: ["\n\n\n"] // Stop at paragraph breaks to ensure completion
    }
  });

  return model.startChat({
    history: []
  });
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
    // Extract personal info from portfolio markdown
    if (portfolioMarkdown) {
      const aboutSection = portfolioMarkdown.match(/## About Me[\s\S]*?(?=##|$)/i);
      const personalFAQ = portfolioMarkdown.match(/## Personal FAQ[\s\S]*?(?=##|$)/i);
      const philosophy = portfolioMarkdown.match(/### CON-FO-DI Philosophy[\s\S]*?(?=###|##|$)/i);

      contextBlock += 'PERSONAL INFO FROM PORTFOLIO:\n';
      if (aboutSection) contextBlock += aboutSection[0] + '\n';
      if (personalFAQ) contextBlock += personalFAQ[0] + '\n';
      if (philosophy) contextBlock += philosophy[0] + '\n';
    }

    // Supplement with aboutCards as fallback
    const personalContext = aboutCards.map(card =>
      `${card.topic}: ${card.one_liner}`
    ).join('\n');
    contextBlock += `\nSUPPLEMENTAL PERSONAL INFO:\n${personalContext}\n\n`;

  } else if (intent === 'work') {
    // Extract work info from resume markdown
    if (resumeMarkdown) {
      const currentRole = resumeMarkdown.match(/## Current Role[\s\S]*?(?=##|$)/i);
      const workExperience = resumeMarkdown.match(/## Work Experience[\s\S]*?(?=##|$)/i);

      contextBlock += 'WORK INFO FROM RESUME:\n';
      if (currentRole) contextBlock += currentRole[0] + '\n';
      if (workExperience) contextBlock += workExperience[0] + '\n';
    }

  } else if (intent === 'project') {
    // Extract projects from portfolio markdown first
    if (portfolioMarkdown) {
      const projectsSection = portfolioMarkdown.match(/## Projects[\s\S]*?(?=##|$)/i);
      if (projectsSection) {
        contextBlock += 'PROJECTS FROM PORTFOLIO:\n' + projectsSection[0] + '\n';
      }
    }

    // Supplement with projectCards for additional details
    const projectContext = projectCards.slice(0, 3).map(card =>
      `${card.project}: ${card.one_liner} (Stack: ${card.stack?.join(', ')})`
    ).join('\n');
    contextBlock += `\nSUPPLEMENTAL PROJECT INFO:\n${projectContext}\n\n`;
  }

  return contextBlock;
};

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
  'porsche sales': { url: 'https://abdullahayyaz.com', patterns: ['porsche sales', 'sales professional'] },
  'workwaves': { url: 'https://github.com/AbdarrahmanAyyaz/Workwaves', patterns: ['workwaves', 'work waves', 'gig app'] },
  'dna sequencing': { url: 'https://github.com/AbdarrahmanAyyaz/DNA-Sequencing', patterns: ['dna sequencing', 'dna binding', 'bioinformatics'] },
  'social media': { url: 'https://github.com/AbdarrahmanAyyaz/Social-Media-App', patterns: ['social media app', 'experience share'] },
  'linkedin': { url: 'https://www.linkedin.com/in/abdarrahman-ayyaz/', patterns: ['linkedin'] },
  'github': { url: 'https://github.com/AbdarrahmanAyyaz', patterns: ['github'] },
  'email': { url: 'mailto:abdarrahmanayyaz00@gmail.com', patterns: ['email'] }
};

// Function to ensure response ends with complete sentence
const ensureCompleteSentence = (text) => {
  if (!text || text.trim().length === 0) return text;

  const trimmed = text.trim();

  // Check if last character is proper sentence ending punctuation
  const lastChar = trimmed[trimmed.length - 1];
  const isComplete = ['.', '!', '?'].includes(lastChar);

  if (isComplete) return trimmed;

  // Find the last complete sentence
  const lastSentenceEnd = Math.max(
    trimmed.lastIndexOf('.'),
    trimmed.lastIndexOf('!'),
    trimmed.lastIndexOf('?')
  );

  // If we found a sentence ending, truncate to that point
  if (lastSentenceEnd > 0) {
    return trimmed.substring(0, lastSentenceEnd + 1);
  }

  // If no sentence ending found, add ellipsis to indicate continuation
  return trimmed + '...';
};

// Function to inject links into AI response
const injectProjectLinks = (text) => {
  let enrichedText = text;

  // Sort projects by pattern length (longest first) to match more specific terms first
  const sortedProjects = Object.entries(PROJECT_LINKS).sort((a, b) => {
    const maxLengthA = Math.max(...a[1].patterns.map(p => p.length));
    const maxLengthB = Math.max(...b[1].patterns.map(p => p.length));
    return maxLengthB - maxLengthA;
  });

  // For each project, find mentions and add links
  sortedProjects.forEach(([projectName, { url, patterns }]) => {
    patterns.forEach(pattern => {
      // Escape special regex characters in the pattern
      const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Create case-insensitive regex that matches whole words
      // Use negative lookbehind/lookahead to avoid matching inside markdown links
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

export const sendMessageToGemini = async (chat, message) => {
  try {
    // Detect intent and build dynamic context
    const intent = getMessageIntent(message);
    const dynamicContext = await buildDynamicContext(intent);

    // Check if user is asking for more details
    const wantsDetails = /(tell me more|more details|elaborate|explain|deep dive|how does|architecture|technical|stack)/i.test(message);

    // Build the complete context message
    let contextualMessage = `${BASE_PORTFOLIO_CONTEXT}\n\n`;
    contextualMessage += `${dynamicContext}\n\n`;
    contextualMessage += `User Question: ${message}\n\n`;

    if (wantsDetails) {
      contextualMessage += `Please provide a detailed, comprehensive answer. IMPORTANT: Always end your response with a complete sentence (., !, or ?).`;
    } else {
      contextualMessage += `Keep response brief and conversational - 2-3 complete sentences maximum. IMPORTANT: Always end with proper punctuation (., !, or ?).`;
    }

    const result = await chat.sendMessage(contextualMessage);
    const response = await result.response;
    let responseText = response.text();

    // Handle empty or very short responses
    if (!responseText || responseText.trim().length < 5) {
      console.warn('Empty or very short response from Gemini, using fallback');

      // Use intent-based fallbacks with dynamic context
      if (intent === 'personal') {
        responseText = "I'm passionate about martial arts (boxing), hiking in nature, and travel. I value family, consistency, focus, and discipline (my CON-FO-DI philosophy). I also organized a community food drive during COVID. What would you like to know more about?";
      } else if (intent === 'work') {
        responseText = "I'm a Cloud Support Engineer at Oracle, helping enterprise developers with production issues and CI/CD pipelines. I also build AI tools as passion projects. What would you like to know?";
      } else if (intent === 'project') {
        responseText = "I build AI projects like TriagedAI (technical support tool) and Advancely (personal development platform) in my personal time. Which project interests you?";
      } else {
        responseText = "I'm here to help! Ask me about my work at Oracle, my AI projects, personal interests, or anything else you'd like to know.";
      }
    }

    // Ensure response ends with complete sentence
    const completeResponse = ensureCompleteSentence(responseText);

    // Inject project links into the response
    const enrichedResponse = injectProjectLinks(completeResponse);

    return enrichedResponse;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return "I'm having trouble connecting right now. You can explore my portfolio sections above, or try asking again in a moment!";
  }
};

// Simple warmup function for compatibility
export const warmRagFromPublic = async () => {
  // This is a placeholder for compatibility with the component
  // The comprehensive context is now built into the chat initialization
  return Promise.resolve();
};

export const createNewChatSession = () => {
  return initializeGeminiChat();
};