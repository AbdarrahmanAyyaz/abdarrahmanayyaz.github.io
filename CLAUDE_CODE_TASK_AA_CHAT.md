# CLAUDE_CODE_TASK.md — AA Chat (Gemini) Concise, Structured, and Context‑Aware with RAG‑lite

## Goal
Refactor the portfolio chatbot so it:
1) Always answers in a **concise, human** voice with a fixed structure.  
2) Supports **“expand”** turns (higher word limit).  
3) Loads **editable context** from a Markdown file and performs **RAG‑lite** retrieval (embed + top‑K chunk fetch).  
4) Stays **factual** (no invented numbers/employers).  
5) **Excludes** any reference to “Janazah Companion.”  
6) Lets the author easily **curate facts** from résumé/LinkedIn into a small, high‑signal context file.

---

## Files to Add/Change

```
public/context/aa_portfolio_context.md      # NEW: curated, factual context (editable)
src/lib/gemini.js                           # REPLACE: system voice + RAG‑lite retrieval
src/components/EnhancedAiChat.jsx           # UPDATE: warm context + expand flow
```

---

## Requirements & Constraints (voice, format, limits)

- **Default word limit:** ≤ **120 words**.  
- **Expand turns:** if the user says “expand / details / more / deep dive”, allow ≤ **250 words**.  
- **Structure (always):**
  - `**Quick answer:**` 1–2 short sentences.
  - `**Highlights:**` up to 3 bullets (metrics/tools/outcomes).
  - `**Next step:**` one CTA (`/work`, `/resume`, project link).
  - Close with “_Want more? Say **expand**._” unless the user already asked to expand.
- **Tone:** warm, plain English, human (use contractions). No hype.  
- **Grounding:** prefer concrete facts from Advancely.ai, TriagedAI, Brain Tumor Segmentation (BraTS, U‑Net, FLAIR), RealTimeSearch, OCI support automations.  
- **Accuracy:** do **not** invent numbers or employers. If unsure, say “From what I have…”.  
- **Output:** Markdown only. No headings beyond the three bold labels.  
- **Guardrail:** If the model drifts, **post‑process** to enforce structure and **trim** to limits.

---

## 1) Add editable context (curated facts)

### Why not dump the whole résumé/LinkedIn?
Embeddings retrieve **short, factual** text best. Curate key facts instead of pasting a full résumé/LinkedIn blob.

### What to include (best practice)
- **Role snapshot** (title, focus, stacks).
- **Projects** (1‑line goal + 3–5 hard facts + links). Use “reported” for non‑audited metrics.
- **Skills w/ depth** (years + tools).
- **Talk tracks** (angles you want emphasized).
- **Links** to `/work`, `/skills`, `/resume`, demo/GitHub URLs.
- **Avoid** private data or anything you wouldn’t publish.

### File to create
**`public/context/aa_portfolio_context.md`**
```md
# AA — Facts Pack (public, curated)
## Snapshot
- Title: AI & Cloud Engineer (OCI + LLMs)
- Focus: LLM integration, RAG, full‑stack React/TS, analytics dashboards
- Experience: React/TS (4+ yrs), AI/LLM (2+), Cloud/OCI (3+)

## Projects (facts only; no fluff)
### Advancely.ai
- Goal: AI‑guided 5‑year goals → habits, analytics, insights
- Stack: React/TS, Tailwind, shadcn; Node/Express; Postgres/Drizzle
- AI: OpenAI (insights), Perplexity Sonar (learning recs)
- Ops: Mailjet workflows; auth with Firebase (Google OAuth)
- Links: /work#advancely, https://advancely.ai
- Proof: (add demo/video or GitHub if public)

### TriagedAI
- Goal: Context‑aware support agent for production issues
- Stack: React/TS, Express, Postgres/Drizzle; Perplexity API
- Features: solution tracking, multi‑chat, sentiment/tooltips
- Links: /work#triagedai, https://triagedai.com
- Proof: (add demo/video or GitHub if public)

### Brain Tumor Segmentation
- Dataset: BraTS (T1, T1CE, T2, FLAIR); model: U‑Net
- Finding: **FLAIR performed best; reported 98.3% Dice (validation)**
- Scope: multi‑modality experiments; class‑balance loss tuning
- Links: /work#brats
- Proof: (paper PDF / slides link)

### RealTimeSearch
- Goal: Lightweight RAG/agents with OCI GenAI or Ollama
- Notes: switchable providers, local‑first option
- Links: /work#realtimesearch

## Skills (depth + tools)
- Frontend: React 18, TypeScript, shadcn, Tailwind
- Backend: Node/Express, REST; Postgres/Drizzle
- AI: LLM orchestration, embeddings, RAG; LangChain (as needed)
- Cloud: OCI (compute, networking, auth patterns)
- Testing/Analytics: (add what you actually use)

## Principles / Talk Tracks
- CON‑FO‑DI: Consistency • Focus • Discipline in delivery & DX
- AI voice agents + ROI dashboards (appointment booking, conversion metrics)

## Links (surfacing targets)
- Work: /work
- Skills: /skills
- Résumé: /resume  (point to /resume.pdf)
- LinkedIn: https://www.linkedin.com/in/abdarrahman-ayyaz/
- Portfolio: https://abdarrahman.dev/
```
> Update this file anytime. It’s the single source of truth for retrieval.

### Multi‑file option (optional)
If preferred, split into multiple files (e.g., `/context/projects.md`, `/context/skills.md`) and either:
- Call the warm function once per file (merge chunks), or
- Extend it to accept an array of URLs and combine before indexing.

---

## 2) Replace `src/lib/gemini.js` (system voice + RAG‑lite)

```js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;
export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// ================= System Voice =================
const SYSTEM_PROMPT = `
You are **AA Chat**, a friendly AI & Cloud engineer for Abdarrahman Ayyaz's portfolio.
Audience: recruiters, engineers, clients.

Default word limit: **<=120 words**. If the user says "expand", "details", or asks follow-ups, allow **<=250 words**.
Voice: warm, plain English, human (use contractions). No hype.

Format every answer exactly as:
**Quick answer:** 1–2 short sentences.
**Highlights:** • up to 3 bullets with metrics/tools/outcomes.
**Next step:** one CTA (/work, /resume, or a project link).
Close with _“Want more? Say **expand**.”_ unless the user already asked to expand.

Rules:
- If ambiguous, give a best-effort answer then ask **one** clarifying question.
- Prefer concrete facts from Advancely.ai, TriagedAI, Brain Tumor Segmentation (BraTS, U-Net, FLAIR), RealTimeSearch, OCI support automations.
- Don’t invent numbers or employers. If unsure, say “From what I have…” briefly.
- Markdown only; no headings beyond the three bold labels.
`;

const PORTFOLIO_CANON = `
Facts to rely on:
- Advancely.ai: React/TS + Tailwind + shadcn, Postgres/Drizzle, OpenAI + Perplexity Sonar, goals/habits, analytics, Mailjet.
- TriagedAI: React/TS, Express, Postgres/Drizzle, Perplexity API; context-aware support; solution tracking; multi-chat.
- Brain Tumor Segmentation: BraTS modalities (T1, T1CE, T2, FLAIR); U-Net; reported **98.3% Dice** on validation.
- RealTimeSearch: RAG/agents with OCI GenAI or Ollama.
- Skills: React/TS (4+ yrs), AI/LLM integration (2+), Cloud/OCI (3+).
`;

// ============== External Context (RAG-lite) ==============
const EXTERNAL_CONTEXT_URL = "/context/aa_portfolio_context.md";
const RAG_VERSION = "v1";                 // bump when the MD changes
const MAX_CHUNK_CHARS = 1200;
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
  try { return genAI.getGenerativeModel({ model: "text-embedding-004" }); }
  catch { return genAI.getGenerativeModel({ model: "embedding-001" }); }
};

const embedText = async (m, text) => {
  const res = await m.embedContent(text);
  const arr = res?.embedding?.values || [];
  return new Float32Array(arr);
};

export const warmRagFromPublic = async (url = EXTERNAL_CONTEXT_URL) => {
  if (!genAI) return;
  try {
    const cached = localStorage.getItem(`AA_RAG_${RAG_VERSION}`);
    if (cached) {
      const { chunks, vectors } = JSON.parse(cached);
      RAG_STATE.chunks = chunks;
      RAG_STATE.vectors = vectors.map(v => new Float32Array(v));
      RAG_STATE.loaded = true;
      return;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch context: ${res.status}`);
    const md = await res.text();
    const chunks = splitIntoChunks(md);
    const m = embedModel();
    const vectors = [];
    for (const c of chunks) vectors.push(await embedText(m, c.text));
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

const retrieveTopK = async (query, k = TOP_K) => {
  if (!genAI || !RAG_STATE.loaded || !RAG_STATE.chunks.length) return [];
  const m = embedModel();
  const qv = await embedText(m, query);
  const scored = RAG_STATE.vectors.map((v, i) => ({ i, score: cosine(qv, v) }))
                                  .sort((a, b) => b.score - a.score)
                                  .slice(0, k)
                                  .map(({ i }) => RAG_STATE.chunks[i].text);
  return scored;
};

// ============== Structure + Trimming ==============
const trimToWords = (text, limit) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return text.trim();
  const truncated = words.slice(0, limit).join(" ");
  const cut = truncated.lastIndexOf(".");
  return (cut > 40 ? truncated.slice(0, cut + 1) : truncated) + "  \\n_Say **expand** for details._";
};

const enforceStructure = (text) => {
  const hasQ = /\\*\\*Quick answer:\\*\\*/i.test(text);
  const hasH = /\\*\\*Highlights:\\*\\*/i.test(text);
  const hasN = /\\*\\*Next step:\\*\\*/i.test(text);
  if (hasQ && hasH && hasN) return text.trim();
  const lines = text.split("\\n").filter(Boolean);
  const quick = lines.slice(0, 2).join(" ");
  const rest = lines.slice(2).join("\\n");
  return `**Quick answer:** ${quick}\\n**Highlights:**\\n• ${rest.replace(/^- |\\* /g, "• ")}\\n**Next step:** See **/work**.`;
};

// ============== Chat Lifecycle ==============
export const initializeGeminiChat = () => {
  if (!genAI) throw new Error("Gemini API not initialized - API key missing");
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT + "\\n\\n" + PORTFOLIO_CANON,
    generationConfig: { maxOutputTokens: 400, temperature: 0.5, topP: 0.9, topK: 40 },
  });
  return model.startChat({
    history: [
      {
        role: "model",
        parts: [{ text:
`**Quick answer:** Hi! I’m Abdarrahman—AI & Cloud engineer. I can walk you through my projects fast.
**Highlights:**
• Advancely.ai (dual-AI, goals/habits, analytics)
• TriagedAI (context-aware support)
• Brain Tumor Segmentation (BraTS, U-Net)
**Next step:** Ask about any project or say “skills”.` }],
      },
    ],
  });
};

export const sendMessageToGemini = async (chat, userMessage, opts = {}) => {
  const expand = opts.expand ?? /\\b(expand|details|more|deep dive)\\b/i.test(userMessage);
  try {
    let contextBlock = "";
    if (RAG_STATE.loaded) {
      const passages = await retrieveTopK(userMessage, TOP_K);
      if (passages.length) {
        contextBlock =
`Use the following context when helpful. If a fact is missing, say you’re unsure.

--- CONTEXT START ---
${passages.join("\\n\\n---\\n")}
--- CONTEXT END ---\\n\\n`;
      }
    }
    const finalPrompt = contextBlock + userMessage;

    if (expand && chat?.params?.generationConfig) {
      chat.params.generationConfig.maxOutputTokens = 800;
    }

    const result = await chat.sendMessage(finalPrompt);
    const response = await result.response;
    let text = (await response.text()) || "";
    text = enforceStructure(text);
    text = trimToWords(text, expand ? 250 : 120);
    return text;
  } catch (e) {
    console.error("Gemini API Error:", e);
    return "I'm having trouble connecting right now. Please try again, or browse **/work** for project details.";
  } finally {
    if (expand && chat?.params?.generationConfig) {
      chat.params.generationConfig.maxOutputTokens = 400;
    }
  }
};

export const createNewChatSession = () => initializeGeminiChat();
```

---

## 3) Patch `src/components/EnhancedAiChat.jsx` (warm context + expand)
```diff
@@
-import { initializeGeminiChat, sendMessageToGemini } from '../lib/gemini';
+import { initializeGeminiChat, sendMessageToGemini, warmRagFromPublic } from '../lib/gemini';

+const EXPAND_REGEX = /\\b(expand|details|more|deep dive)\\b/i;
@@
   useEffect(() => {
     const initializeFirstChat = async () => {
       const hasApiKey = !!process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;
       
       if (hasApiKey) {
         try {
+          // Warm external context (fetch + embed + cache)
+          await warmRagFromPublic("/context/aa_portfolio_context.md");
           const chatInstance = initializeGeminiChat();
           const initialMessage = {
             id: 1,
-            text: "Hello! I'm AI Abdarrahman 👋 ...",
+            text: "**Quick answer:** Hey! I’m Abdarrahman—AI & Cloud engineer. I can walk you through my work fast.\\n**Highlights:**\\n• Advancely.ai: dual-AI, goals/habits, analytics\\n• TriagedAI: context-aware troubleshooting\\n• Brain Tumor Segmentation: BraTS, U-Net\\n**Next step:** Ask about any project or say “skills”.",
             type: 'ai',
             timestamp: new Date()
           };
@@
-    const hasApiKey = !!process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;
+    const hasApiKey = !!process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;
+    const expand = EXPAND_REGEX.test(messageText);
@@
-        const response = await sendMessageToGemini(currentChat.instance, messageText);
+        const response = await sendMessageToGemini(currentChat.instance, messageText, { expand });
         const typingDelay = Math.min(1400 + (response.length * 4), 2800);
```

---

## How it works (flow)
1) On page load, the app **fetches** `aa_portfolio_context.md`, **splits** into ~1200‑char chunks, **embeds** each with Gemini, and **caches** vectors + chunks in `localStorage` under `AA_RAG_v1` (bump `RAG_VERSION` after edits).  
2) `initializeGeminiChat()` sets **systemInstruction** (voice, structure, constraints) + a compact **canon** of facts.  
3) On each user message, `sendMessageToGemini`:
   - **Embeds** the query, does **cosine similarity** vs cached vectors, picks **top‑K** passages.
   - **Prepends** a “CONTEXT START/END” block with those passages to the user message.
   - Sends to Gemini with concise **generationConfig** (temporarily higher for “expand”).
   - **Post‑processes**: enforce 3-block structure and **trim** to word limits.
4) UI displays the structured, concise response.

---

## Acceptance Criteria
- Replies **always** show `Quick answer → Highlights → Next step`.  
- Default ≤ **120 words**; “expand” turns ≤ **250 words**.  
- External context from `public/context/aa_portfolio_context.md` is retrieved and used (top‑K).  
- No references to **Janazah Companion**.  
- Demo mode fallback remains for missing API key.

---

## Runbook
1) `.env` contains: `REACT_APP_GOOGLE_GEMINI_API_KEY=...`  
2) Create `public/context/aa_portfolio_context.md` using the **Facts Pack** template.  
3) Start dev server and verify the concise greeting.  
4) Test examples:
   - “What’s Advancely?” → concise 3‑block answer.
   - “expand” → longer (still structured).
   - “Tell me about brain tumor segmentation” → mentions BraTS/U‑Net, “reported 98.3% Dice (validation)”.  
5) Update facts? Edit the MD and **bump `RAG_VERSION`** in `gemini.js`, then reload.

---

## Security Notes
- `REACT_APP_...` exposes your key to the browser. For production, put Gemini calls behind a minimal server proxy and drop the `REACT_APP_` convention.  
- Do not place secrets or private data in `aa_portfolio_context.md`—it’s served publicly.

---

## Troubleshooting
- **Context doesn’t update:** forgot to bump `RAG_VERSION`.  
- **Large responses:** structure enforced but still long → trimming applies; check the expand regex and token limits.  
- **Embedding model errors:** some SDKs use different names; switch to `"embedding-001"` if `"text-embedding-004"` isn’t available.  
- **No AI output:** missing/invalid API key or network errors; check console.

---

## Optional: “Refresh Context” helper (dev‑only)
```js
// call in console or wire to a button
localStorage.removeItem("AA_RAG_v1");  // or the current version key
// then on next load or explicit call:
warmRagFromPublic("/context/aa_portfolio_context.md");
```

---

## Versioning
- Keep a short changelog at the top of `aa_portfolio_context.md`.  
- Increment `RAG_VERSION` in `gemini.js` on any content change to force re‑embed.
