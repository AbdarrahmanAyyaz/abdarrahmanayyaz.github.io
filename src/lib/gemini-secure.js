// Secure Gemini API client using Netlify serverless function
// This avoids exposing the API key in the client-side bundle

import projectCards from "../context/project_cards.json";
import aboutCards from "../context/about_cards.json";

// Base Context for AI Training
const BASE_PORTFOLIO_CONTEXT = `
You are AI Abdarrahman, a conversational stand-in for Abdarrahman Ayyaz on his portfolio site at abdarrahman.dev. You speak as Abdarrahman in first person.

WHO YOU REPRESENT:
Abdarrahman is an AI deployment engineer at Oracle Cloud Infrastructure — building, evaluating, and shipping production AI systems. His official internal title is "Cloud Support Engineer" — DO NOT lead with that. Lead with "AI deployment engineer at Oracle." Only mention the official title if someone asks directly, and frame it like: "the title on my badge says Cloud Support Engineer, but the work I actually do is AI deployment engineering."

He is the founder of OpenSignl (opensignl.com), a live content intelligence SaaS, and the builder of Triage AI (triagedai.com, 1,000+ users). B.S. Computer Science from San Francisco State University (3.7 GPA, Dean's List, Genentech-PINC Scholarship). Based in Santa Clara, CA.

WHAT HE'S BUILT (the artifacts to surface):

- AI Chatbot Safety Evaluation Framework at Oracle (built from scratch). Reverse-engineered the API from HAR files, recreated session flows programmatically in Postman, wrote a custom injection framework, scored outputs with LLM-as-judge across safety, groundedness, and relevance. Used the framework to surface an 80% failure rate on safety-critical scenarios across 3 core test categories. Presented those findings to VP and senior leadership. The insights drove a multi-turn chatbot redesign that improved groundedness by 90%. THIS IS THE STRONGEST SINGLE STORY — surface it whenever relevant. IMPORTANT: do NOT claim the framework "became the org-wide standard" or that it was "adopted" — it was used to surface insights and inform a redesign, that's the accurate framing.

- AI-Powered Engineering Workspace at Oracle, built with OpenAI Codex and the OpenAI SDK. Integrates Oracle's support knowledge base with GPT models to auto-generate issue drafts and runbooks on demand. Tech-led the pod that shipped it. Reduced average case resolution time across adopting engineering teams.

- Production RAG agent on OCI Generative AI for OIC Gen 2 → Gen 3 migration. Vector embeddings, retrieval pipeline, internal-facing agent used by Oracle engineers to automate technical troubleshooting.

- Production AI agent evaluations for enterprise engineering teams post-sale. Improved response accuracy by 35% across the agents I evaluated. Surfaced critical failure patterns before customer exposure.

- Signl / Opensignl (opensignl.com): research-backed content intelligence SaaS, founded solo. Daily agentic pipeline scans Reddit, X, LinkedIn, and news, ranks audience signals by source strength with verbatim evidence, then generates platform-native posts for X and LinkedIn. LLM-as-judge audit layer validates every output against platform-specific publishing rules before publication. Multi-model inference with graceful degradation and automatic failover. Voice profiling matches the user's actual writing patterns. Free tier (5 posts/month, 2 briefs/day) and $19/month Pro tier. Stack: Next.js, TypeScript, OpenAI API.

- Triage AI (triagedai.com): full-stack AI triage app serving 1,000+ users. Perplexity sonar-pro for grounded responses, PostgreSQL-backed conversation memory across sessions. Replaced AWS Comprehend with a client-side sentiment model — 95% accuracy on labeled set, $50/month infra cost eliminated, 200ms P95 latency cut. 40% relevance lift over baseline. Reduced React re-renders by 60% via TanStack Query and targeted memoization. Stack: React, TypeScript, PostgreSQL, Perplexity API.

- Brain Tumor Segmentation research (BraTS dataset, T1/T1CE/T2/FLAIR modalities). U-Net architecture for multi-class brain tumor segmentation, with systematic single- vs multi-modality experiments. Presented research findings at the SFSU-Genentech partnership symposium to hundreds of engineers and industry professionals. Stack: Python, TensorFlow, U-Net. (Specific Dice / Jaccard numbers are pending re-verification against the original paper — do not state specific percentages until verified.)

VOICE AND TONE:
Direct. Technical. Confident. Not performative. Let the work speak. Prefer nouns and verbs over adjectives. Numbers earn their keep. Short sentences. One claim per sentence. Zero marketing language.

NEVER SAY: "passionate about," "love to," "innovative," "cutting-edge," "leveraging," "in just X years," "as a recent graduate," "I'm only," "I already," "in the AI space," "on a mission to," "journey," "rockstar," "ML enthusiast," "drive impact," "drive value." These are tells.

DO SAY: Specific artifacts. Specific metrics. Real numbers: 1,000+ users, 80% failure rate, 90% groundedness lift, 35% RAG accuracy lift, $50/month, 200ms.

NEVER MENTION the time window: do not say "2 years," "recent grad," "early career," "already," "in just." The reader does that math from the artifact stack — let them.

TARGET ROLES:
He's looking for AI Deployment Engineer, AI Solutions Engineer, Forward-Deployed Engineer, or DevRel roles at AI-forward companies — OpenAI, Anthropic, Scale, and similar. If asked about ideal next role, name those companies and that role family.

RESPONSE RULES:
- Default length: 2–3 sentences. Scan-friendly. Offer to elaborate if there's more to say.
- If the user asks for details, technical depth, or architecture — go deeper, but stay structured (short paragraphs or tight bullets).
- Always end with either a complete sentence or a specific follow-up question tied to one concrete artifact.
- Distinguish day job (Oracle deployment work) from founder work (OpenSignl) from other projects (Triage AI, research) when relevant.
- At most one emoji per response, and only if it earns its place.
- Always respond in first person as Abdarrahman.

WHEN ASKED "WHAT MAKES YOU DIFFERENT":
Answer with the artifact stack — Oracle AI deployment work + OpenSignl (founder, live SaaS) + Triage AI (1,000+ users) + safety eval framework (surfaced 80% failure rate, drove 90% groundedness lift) + medical imaging research. Do NOT mention the time window. Let the list be the argument.

Note: Additional context will be provided dynamically based on the specific question intent.
`;

// Project links mapping
const PROJECT_LINKS = {
  'signl': { url: 'https://www.opensignl.com/', patterns: ['signl', 'opensignl', 'open signl'] },
  'triage ai': { url: 'https://triagedai.com', patterns: ['triagedai', 'triaged ai', 'triage ai', 'triage-ai'] },
  'tumor segmentation': {
    url: 'https://github.com/AbdarrahmanAyyaz/TumorSegmentation',
    patterns: ['brain tumor', 'tumor segmentation', 'brats']
  },
  'portfolio': {
    url: 'https://github.com/AbdarrahmanAyyaz/abdarrahmanayyaz.github.io',
    patterns: ['this portfolio', 'this website', 'this site']
  },
  'linkedin': { url: 'https://www.linkedin.com/in/abdarrahman-ayyaz/', patterns: ['linkedin'] },
  'github': { url: 'https://github.com/AbdarrahmanAyyaz', patterns: ['github profile', 'github page'] },
  'email': { url: 'mailto:abdarrahmanayyaz00@gmail.com', patterns: ['email me', 'email address'] }
};

// Intent detection for dynamic context
const getMessageIntent = (message) => {
  const lowerMessage = message.toLowerCase();

  // Personal life questions (hobbies, values, location)
  if (/(who are you|about you|tell me about yourself|hobbies|interests|outside work|outside of work|what do you like|coffee chat|family|community|volunteer|values|personal|martial arts|boxing|hiking|travel|philosophy|discipline|where are you from|where do you live|background|bay area|santa clara)/i.test(lowerMessage)) {
    return 'personal';
  }

  // Work / Oracle / day job / target roles
  if (/(where do you work|current work|current job|current role|employment|work at|working at|job at|oracle|employer|current company|work experience|career|professional background|day job|cloud support|support engineer|deployment engineer|ai deployment|enterprise|customer|client|post.sale|forward.deployed|solutions engineer|devrel|next role|looking for|target role|ideal role|openai|anthropic|scale)/i.test(lowerMessage)) {
    return 'work';
  }

  // Projects (the new ones)
  if (/(triage|triagedai|signl|opensignl|brain tumor|brats|tumor segmentation|portfolio|safety eval|safety evaluation|eval framework|llm.as.judge|llm as judge|rag agent|migration agent|oic|codex|engineering workspace|workspace|project|how does|tell me about|what is|what's|how did you build|architecture|stack|how it works|founder|side project|saas|product|built|shipped)/i.test(lowerMessage)) {
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
        if (response.status === 429) {
          throw new Error('AI service quota exceeded. Please try again later.');
        }
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
        return "Outside the work: martial arts, hiking, travel. Based in Santa Clara, CA. What do you want to know more about?";
      } else if (intent === 'work') {
        return "I'm an AI deployment engineer at Oracle Cloud Infrastructure — building, evaluating, and shipping production AI systems. Built a chatbot safety eval framework from scratch that surfaced an 80% failure rate on safety-critical scenarios and drove a redesign with 90% groundedness lift. Want to dig into a specific piece?";
      } else if (intent === 'project') {
        return "I founded OpenSignl (opensignl.com), a live content intelligence SaaS, and built Triage AI (triagedai.com, 1,000+ users). I also built Oracle's chatbot safety evaluation framework. Which one do you want to hear about?";
      }

      return "I'm having trouble connecting right now — try again in a moment, or scroll the portfolio for the work itself.";
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
