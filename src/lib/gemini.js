import { GoogleGenerativeAI } from "@google/generative-ai";
import projectCards from "../context/project_cards.json";
import aboutCards from "../context/about_cards.json";

const apiKey = process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;

// Debug logging for API key (without exposing the key)
if (apiKey) {
  console.log('✅ API key detected, length:', apiKey.length, 'prefix:', apiKey.substring(0, 6) + '...');
} else {
  console.warn('❌ No API key found in environment variables');
}

// Test API key validity
const testApiKey = async () => {
  if (apiKey) {
    try {
      const testAI = new GoogleGenerativeAI(apiKey);
      const model = testAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("Hello, are you working?");
      const text = await result.response.text();
      return true;
    } catch (error) {
      if (error.message.includes('API_KEY_INVALID')) {
        console.error('Invalid API key provided');
      }
      return false;
    }
  }
  return false;
};

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;


// ================= System Voice =================
const SYSTEM_PROMPT = `
You are **AI Abdarrahman**, a friendly guide to Abdarrahman Ayyaz's work.
Primary goal: help visitors quickly understand who he is, what he's built, and how to work with him.

STYLE
- Conversational, warm, concise. Prefer plain English; avoid heavy jargon unless requested.
- Default to short paragraphs; use up to 3 bullets only when they truly help.
- Emojis are OK sparingly (max 1 per reply).
- If the user asks for depth (e.g., architecture/stack/schema/RAG), switch to a clear, technical tone.

KNOWLEDGE
- Treat retrieved context as facts. If missing, say "I'm not sure" and offer closest relevant info.
- Don't invent metrics, dates, or credentials.
- Key projects: TriagedAI (context-aware troubleshooting), Advancely (goals/habits AI), Brain Tumor Segmentation (BraTS, U-Net), RealTimeSearch.

ANSWER MODES (choose the lightest that fits)
- Chatty (default): 1–3 short paragraphs answering directly.
- Highlights (if user asks "what/why/how"): ≤3 bullets with outcomes or tools.
- Deep Dive (only on request): Overview → Key Pieces → Impact → Link/Next Step.

GUARDRAILS
- If uncertain, say so briefly and suggest where to look.
- Keep project names/links exactly as given in context.
- Never claim roles/affiliations not present in context.

CALLS TO ACTION
- Offer a relevant next step only when useful (e.g., "Want the stack?" "See TriagedAI?" "Grab my resume?").
`;

// ================= Intent Routing =================
const getIntent = (msg) => {
  const t = (msg || "").toLowerCase();

  if (/(who are you|about you|tell me about yourself|hobbies|interests|outside work|what do you like|coffee chat|coffee|network|family|community|volunteer)/.test(t))
    return 'personal';

  if (/(where do you work|current work|current job|current role|employment|work at|working at|job at|oracle|employer|current company|work experience|career|professional background)/.test(t))
    return 'work';

  if (/(architecture|stack|schema|latency|auth|embedding|rag|drizzle|postgres|firebase|vector|retrieval)/.test(t))
    return 'deep';

  if (/(triagedai|advancely|brain tumor|portfolio|project|how does|tell me about|what is)/.test(t))
    return 'project';

  return 'casual';
};

const styleHintFor = (intent) => ({
  personal: "Use Chatty style. Friendly and brief; avoid technical jargon. Offer a coffee chat if relevant.",
  work: "Use Chatty style. Focus on current role, responsibilities, and professional experience.",
  casual:  "Use Chatty style. No bullets unless necessary.",
  project: "Use Chatty style + up to 3 concise Highlights if helpful.",
  deep:    "Use Deep Dive structure: Overview → Key pieces → Impact → Link/Next step."
}[intent] || "Use Chatty style.");

// ================= Few-shot Examples =================
const FEW_SHOTS = [
  { role: "user",  parts: [{ text: "where are you based?" }]},
  { role: "model", parts: [{ text: "I'm in the Bay Area and available for remote work. What are you working on?" }]},
  { role: "user",  parts: [{ text: "who are you?" }]},
  { role: "model", parts: [{ text: "I'm Abdarrahman—an AI & Cloud engineer. I've shipped TriagedAI (helps dev teams troubleshoot faster) and Advancely (goals + habits with AI insights). I like clear systems, fast feedback loops, and measurable impact. Want a 30-sec tour of a project?" }]},
  { role: "user",  parts: [{ text: "what's TriagedAI?" }]},
  { role: "model", parts: [{ text: "It's a support agent that speeds up resolving production issues. Think context-aware chat that tracks solutions and learns from past fixes. Teams use it to cut debugging time and capture \"what worked.\" Want the 3 key features or the stack?" }]},
  { role: "user",  parts: [{ text: "give me the stack for TriagedAI" }]},
  { role: "model", parts: [{ text: "Overview: React/TS frontend, Express/TS backend, Postgres + Drizzle. AI: Perplexity API for context-aware suggestions. Auth: Firebase. Extras: optimistic updates, solution tracking, term tooltips. Want the data model next?" }]},
  { role: "user",  parts: [{ text: "what are you focused on now?" }]},
  { role: "model", parts: [{ text: "RAG systems, vector databases, and shipping pragmatic AI in modern React/Next. I enjoy turning fuzzy problems into clean, testable components. Want to see a recent RAG prototype?" }]},
  { role: "user",  parts: [{ text: "where do you work?" }]},
  { role: "model", parts: [{ text: "I'm a Technical Support Engineer at Oracle, where I help enterprise developers with debugging JavaScript, Java, and REST API issues. I also support CI/CD pipeline configuration using Oracle Cloud Developer Tools. Want to know more about my role or projects?" }]}
];

// ============== External Context (RAG-lite) ==============
const CONTEXT_SOURCES = [
  "/context/aa_portfolio_context.md",
  "/context/resume_context.md"
];
const RAG_VERSION = "v6";                 // bump when the MD changes
const MAX_CHUNK_CHARS = 1000;              // smaller chunks for better conversation flow
const TOP_K = 3;

let RAG_STATE = { chunks: [], vectors: [], loaded: false };

const splitIntoChunks = (text, max = MAX_CHUNK_CHARS) => {
  const paras = text.split(/\n{2,}/);
  const out = [];
  let buf = "";
  for (const p of paras) {
    if ((buf + "\n\n" + p).length > max) {
      if (buf) out.push(buf.trim());
      if (p.length > max) {
        for (let i = 0; i < p.length; i += max) out.push(p.slice(i, i + max));
        buf = "";
      } else buf = p;
    } else buf = buf ? buf + "\n\n" + p : p;
  }
  if (buf) out.push(buf.trim());
  return out.map((t, i) => ({ id: i, text: t }));
};

const cosine = (a, b) => {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
};

const embedModel = () => {
  try {
    return genAI.getGenerativeModel({ model: "text-embedding-004" });
  } catch (error) {
    try {
      return genAI.getGenerativeModel({ model: "embedding-001" });
    } catch (fallbackError) {
      throw fallbackError;
    }
  }
};

const embedText = async (m, text) => {
  const res = await m.embedContent(text);
  const arr = res?.embedding?.values || [];
  return new Float32Array(arr);
};

export const warmRagFromPublic = async (sources = CONTEXT_SOURCES) => {
  if (!genAI) {
    return;
  }
  try {
    const cached = localStorage.getItem(`AA_RAG_${RAG_VERSION}`);
    if (cached) {
      const { chunks, vectors } = JSON.parse(cached);
      RAG_STATE.chunks = chunks;
      RAG_STATE.vectors = vectors.map(v => new Float32Array(v));
      RAG_STATE.loaded = true;
      return;
    }

    let combinedText = '';

    for (const source of sources) {
      try {
        const res = await fetch(source);
        if (!res.ok) {
          console.warn(`Failed to fetch ${source}: ${res.status}`);
          continue;
        }
        const text = await res.text();
        combinedText += `\n\n=== ${source} ===\n\n${text}`;
      } catch (err) {
        console.warn(`Error fetching ${source}:`, err);
      }
    }

    const chunks = splitIntoChunks(combinedText);

    const m = embedModel();
    const vectors = [];
    for (const c of chunks) {
      const vector = await embedText(m, c.text);
      vectors.push(vector);
    }

    RAG_STATE = { chunks, vectors, loaded: true };
    localStorage.setItem(`AA_RAG_${RAG_VERSION}`, JSON.stringify({
      chunks,
      vectors: vectors.map(v => Array.from(v)),
    }));
  } catch (e) {
    console.warn("RAG warm failed; continuing without it.", e);
    RAG_STATE = { chunks: [], vectors: [], loaded: false };
  }
};

// ============== Enhanced RAG Retrieval ==============
const retrieveTopK = async (query, k = TOP_K) => {
  if (!genAI || !RAG_STATE.loaded || !RAG_STATE.chunks.length) {
    // Fallback to project cards with keyword matching
    const queryLower = query.toLowerCase();
    const relevant = projectCards.filter(card =>
      queryLower.includes(card.project.toLowerCase()) ||
      card.features?.some(f => queryLower.includes(f)) ||
      card.stack?.some(s => queryLower.includes(s.toLowerCase()))
    );
    return relevant.length > 0 ? relevant.slice(0, 2) : projectCards.slice(0, 2);
  }

  try {
    const m = embedModel();
    const qv = await embedText(m, query);
    const scored = RAG_STATE.vectors.map((v, i) => ({ i, score: cosine(qv, v) }))
                                    .sort((a, b) => b.score - a.score)
                                    .slice(0, k)
                                    .map(({ i }) => RAG_STATE.chunks[i].text);
    return scored;
  } catch (error) {
    console.error('retrieveTopK: Error during RAG retrieval:', error);
    // Fallback to project cards
    return projectCards.slice(0, 2);
  }
};

const buildCardContext = (cards, k = 3) =>
  (cards || []).slice(0, k).map(c => `CARD: ${JSON.stringify(c)}`).join("\n");

const buildContextFromSources = (sources) => {
  if (!sources || sources.length === 0) return '';

  // If sources are objects (project cards), format as before
  if (sources[0]?.project) {
    return `Here's what I know:\n\n${sources.map(c => `• ${c.project}: ${c.one_liner}\n  Stack: ${c.stack?.join(', ')}${c.features ? `\n  Features: ${c.features.join(', ')}` : ''}`).join('\n\n')}`;
  }

  // If sources are text passages (RAG), format for conversation
  const contextText = sources.slice(0, 3).join('\n\n');
  return `Context (keep conversational):\n\n${contextText}`;
};

// Note: Removed rigid structure enforcement and word trimming for more natural conversation

// ============== Chat Lifecycle ==============
export const initializeGeminiChat = () => {

  if (!genAI) {
    console.error("initializeGeminiChat: Gemini API not initialized - API key missing");
    throw new Error("Gemini API not initialized - API key missing");
  }

  // Initialize RAG system
  warmRagFromPublic().catch(err => {
    console.warn('RAG initialization failed, continuing with basic cards:', err);
  });

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 550,
        temperature: 0.6,
        topP: 0.9
      },
    });

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }]},
        { role: "model", parts: [{ text: "Got it. I'll be friendly by default and go technical on request. I have access to your full portfolio and resume context." }]},
        ...FEW_SHOTS
      ],
    });

    return chat;
  } catch (error) {
    console.error('initializeGeminiChat: Error creating chat instance:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    throw error;
  }
};

export const sendMessageToGemini = async (chat, message, options = {}) => {
  const { expand = false, retrievedCards = [] } = typeof options === 'object' && !Array.isArray(options) ? options : { retrievedCards: options };
  try {
    const intent = getIntent(message);
    const styleHint = styleHintFor(intent);

    // Use RAG for work, personal, and deep questions
    let contextBlock = "";

    if (intent === 'work' || intent === 'personal' || intent === 'deep') {
      try {
        const ragResults = await retrieveTopK(message, TOP_K);
        if (ragResults && ragResults.length > 0) {
          contextBlock = buildContextFromSources(ragResults);
        }
      } catch (error) {
        console.warn('RAG retrieval failed, falling back to cards:', error);
      }
    }

    // Fallback to card-based context if RAG didn't provide results
    if (!contextBlock) {
      const baseCards =
        intent === 'personal' ? aboutCards
        : intent === 'project' || intent === 'deep' ? projectCards
        : []; // casual → no extra context unless needed

      // if your retriever returns cards, prefer those; else fall back to base set
      const cardsToUse = retrievedCards.length ? retrievedCards : baseCards;

      contextBlock = cardsToUse.length
        ? `Use these fact cards when helpful:\n${buildCardContext(cardsToUse)}\n`
        : "";
    }

    const finalPrompt = `${styleHint}\n\n${contextBlock}${message}`;

    const result = await chat.sendMessage(finalPrompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Gemini API Error:", err);

    // More specific error handling
    if (err.message?.includes('API_KEY_INVALID')) {
      return "I'm having trouble with authentication right now. You can browse the projects above while I work on this.";
    } else if (err.message?.includes('PERMISSION_DENIED')) {
      return "I'm having permission issues right now. You can explore the portfolio sections above.";
    } else if (err.message?.includes('QUOTA_EXCEEDED')) {
      return "I've reached my usage limit for now. Feel free to browse the projects above or try again later.";
    }

    return "I'm having trouble right now. You can browse the projects above or try again in a moment.";
  }
};

export const createNewChatSession = () => initializeGeminiChat();