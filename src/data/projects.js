// Project data for Work section + ProjectGrid + FeaturedProject
//
// The Safety Eval Framework has its own dedicated editorial section
// (SafetyEvalCaseStudy.jsx) above Work, so it is intentionally absent here.
// Triage AI keeps id 'triagedai' because Work.jsx hardcodes it as the featured slot.
//
// Brain Tumor Segmentation entry: specific Dice/Jaccard/accuracy metrics
// intentionally omitted — pending re-verification against the original paper.
// See memory: feedback_brain_tumor_metrics_pending.md

import triaged from '../assets/triagedai.png';
import oic from '../assets/OIC.png';
import opensignlImg from '../assets/opensignl.png';
import aiPortfolioHome from '../assets/ai-portfolio-home.png';

export const projects = [
  {
    id: 'opensignl',
    title: 'OpenSignl',
    subtitle: 'Founder · Live content intelligence SaaS',
    description: "Founded and built a live content intelligence SaaS. Daily agentic pipeline scans Reddit, X, LinkedIn, and news; ranks audience signals by source strength with verbatim evidence. Generates platform-native posts validated by an LLM-as-judge audit layer against platform-specific publishing rules. Multi-model inference with graceful degradation and automatic failover. Voice profiling matches the user's actual writing patterns. Free + $19/mo Pro tier.",
    raw: 'Live content intelligence SaaS founded solo. Agentic research pipeline with LLM-as-judge audit layer, multi-model inference, voice profiling.',
    image: opensignlImg,
    tags: ['AI', 'Next.js', 'TypeScript', 'OpenAI', 'LLM-as-Judge', 'Agentic'],
    liveUrl: 'https://www.opensignl.com',
    demoUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7448471121202429953/',
    sourceUrl: '',
    highlights: ['Solo founder', 'LLM-as-judge audit layer', 'Multi-model failover'],
    impactPills: ['Solo Founder', 'LLM-as-Judge Audit', 'Multi-Model Failover'],
    challenge: "Creators burn hours surfacing cross-platform signal and end up posting generic takes that don't ship what they actually know.",
    build: "Daily agentic pipeline ranks signals from Reddit, X, LinkedIn, and news, generates platform-native posts, and validates them with an LLM-as-judge before publish.",
  },
  {
    id: 'codex-workspace',
    title: 'AI Engineering Workspace',
    subtitle: 'Oracle · OpenAI Codex + OpenAI SDK',
    description: "Tech-led the pod that built an internal AI engineering workspace at Oracle. Integrates the support knowledge base with OpenAI GPT models via the OpenAI SDK to auto-generate issue drafts and runbooks on demand. Shipped end-to-end with OpenAI Codex. Reduced average case resolution time across adopting engineering teams.",
    raw: 'Internal AI engineering workspace at Oracle integrating the support KB with OpenAI GPT models for auto-generated issue drafts and runbooks.',
    // No product screenshot — uses designed cover fallback below.
    coverCode: 'CDX',
    coverCategory: 'Oracle · Internal',
    tags: ['AI', 'OpenAI', 'OpenAI SDK', 'OpenAI Codex'],
    liveUrl: '',
    sourceUrl: '',
    highlights: ['Reduced case resolution time', 'Tech-led the pod', 'Shipped end-to-end'],
    impactPills: ['Tech-Led Pod', 'OpenAI Codex + SDK', 'Support KB Integration'],
    challenge: "Oracle support engineers rewrote the same runbooks and issue drafts across repetitive cases with no leverage from the internal knowledge base.",
    build: "Internal workspace integrating the support KB with GPT via the OpenAI SDK to auto-generate issue drafts and runbooks. Shipped end-to-end with OpenAI Codex.",
  },
  {
    id: 'oci-rag-migration',
    title: 'OCI RAG Migration Agent',
    subtitle: 'Oracle · Production RAG on OCI Generative AI',
    description: "Designed and deployed a production RAG agent on OCI Generative AI for OIC Gen 2 → Gen 3 migration. Vector embeddings over the Oracle migration corpus, retrieval pipeline, internal-facing agent used by Oracle engineers to automate technical troubleshooting. Reduced manual resolution time for internal teams.",
    raw: 'Production RAG agent on OCI Generative AI automating Oracle Integration Cloud Gen 2 → Gen 3 migration troubleshooting.',
    image: oic,
    tags: ['AI', 'RAG', 'OCI', 'Vector Embeddings'],
    liveUrl: '',
    sourceUrl: '',
    highlights: ['Production RAG', 'Reduced manual resolution time', 'Internal Oracle tool'],
    impactPills: ['Production RAG', 'OCI Generative AI', 'Internal Oracle Tool'],
    challenge: "OIC Gen 2 to Gen 3 migrations forced engineers to hand-traverse a sprawling corpus of migration docs, slowing resolution.",
    build: "RAG agent on OCI Generative AI with vector embeddings over the migration corpus and a retrieval pipeline that automates internal troubleshooting.",
  },
  {
    id: 'triagedai',
    title: 'Triage AI',
    subtitle: 'Founder · Full-stack AI triage · 1,000+ users',
    description: "Full-stack AI triage app with Perplexity sonar-pro and PostgreSQL-backed conversation memory across sessions. Replaced AWS Comprehend with a client-side sentiment model — 95% accuracy on labeled set, $50/month infra cost eliminated, 200ms P95 latency cut. Cut React re-renders by 60% via TanStack Query and memoization. 40% relevance lift over baseline.",
    raw: 'Full-stack AI triage app serving 1,000+ users. Perplexity sonar-pro, PostgreSQL conversation memory, custom client-side sentiment model that replaced AWS Comprehend.',
    image: triaged,
    tags: ['AI', 'React', 'TypeScript', 'PostgreSQL', 'Perplexity'],
    liveUrl: 'https://triagedai.com',
    demoUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7375974681906118657/',
    sourceUrl: '',
    highlights: ['1,000+ users', '40% relevance lift', 'Replaced AWS Comprehend'],
    impactPills: ['1,000+ Users', '40% Relevance Lift', '-$50/mo · -200ms P95'],
    challenge: "AWS Comprehend added $50/month of infra cost and 200ms P95 latency per classification, and baseline retrieval was noisy.",
    build: "Swapped Comprehend for a 95%-accurate client-side sentiment model. Perplexity sonar-pro with PostgreSQL-backed conversation memory; TanStack Query cut re-renders 60%.",
  },
  {
    id: 'ai-portfolio',
    title: 'AI-Powered Portfolio',
    subtitle: 'This site · Conversational AI stand-in with runtime RAG',
    description: "This portfolio site itself. A conversational AI stand-in runs on a Gemini-backed Netlify function with a three-layer context system — hardcoded system prompt, runtime-fetched markdown context, and JSON fallback cards. Intent detection routes questions to the right context slice. Built with React, Tailwind, Framer Motion, and a custom chat UI.",
    raw: 'Portfolio site with a conversational AI stand-in that uses runtime RAG-style context loading, intent detection, and a secure Gemini-backed Netlify function.',
    image: aiPortfolioHome,
    tags: ['AI', 'React', 'Tailwind', 'Gemini', 'Netlify Functions'],
    liveUrl: 'https://abdarrahman.dev',
    sourceUrl: 'https://github.com/AbdarrahmanAyyaz',
    highlights: ['Conversational stand-in', 'Runtime context loading', 'Intent-based routing'],
    impactPills: ['Conversational Stand-in', 'Runtime RAG', 'Intent Routing'],
    challenge: "Static portfolios force visitors to hunt through sections for specific proof; most leave before they find it.",
    build: "Gemini-backed Netlify function with three-layer context (system prompt + runtime markdown + JSON fallback) and intent detection that routes each question to the right slice.",
  },
  {
    id: 'brain-tumor-segmentation',
    title: 'Brain Tumor Segmentation',
    subtitle: 'Research · U-Net · BraTS · SFSU-Genentech symposium',
    description: "Medical imaging research using a U-Net architecture for multi-class brain tumor segmentation on the BraTS dataset. Systematic single- vs multi-modality experiments across all four MRI modalities (T1, T1CE, T2, FLAIR). Presented research findings at the SFSU-Genentech partnership symposium to hundreds of engineers and industry professionals.",
    raw: 'U-Net medical imaging research for multi-class brain tumor segmentation across T1/T1CE/T2/FLAIR MRI modalities. Presented at SFSU-Genentech symposium.',
    // No product screenshot — uses designed cover fallback below.
    coverCode: 'U-NET',
    coverCategory: 'Research',
    tags: ['AI', 'Python', 'TensorFlow', 'U-Net', 'Research'],
    liveUrl: '',
    sourceUrl: 'https://github.com/AbdarrahmanAyyaz/TumorSegmentation',
    highlights: ['U-Net architecture', 'BraTS multi-modality', 'Symposium presentation'],
    impactPills: ['U-Net Architecture', 'BraTS Multi-Modality', 'Symposium Presentation'],
    challenge: "Multi-class tumor segmentation needs to generalize across all four MRI modalities (T1, T1CE, T2, FLAIR) without overfitting to a single signal.",
    build: "U-Net with systematic single- vs multi-modality experiments across the BraTS dataset; findings presented at the SFSU-Genentech partnership symposium.",
  },
];

export default projects;
