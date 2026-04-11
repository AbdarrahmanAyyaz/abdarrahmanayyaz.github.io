// Project data for Work section + ProjectGrid + FeaturedProject
//
// Order intentional: Signl first (founder, will get a dedicated SignlFeature.jsx
// component in Phase 3 above Work). Triage AI keeps id 'triagedai' so the Work.jsx
// `featuredId = "triagedai"` hardcode keeps showing it in the featured slot until
// Phase 3 refactors that.
//
// Brain Tumor Segmentation entry intentionally omitted — pending re-verification
// of Dice/Jaccard metrics against the original paper. See memory:
// feedback_brain_tumor_metrics_pending.md

import triaged from '../assets/triagedai.png';
import oic from '../assets/OIC.png';

export const projects = [
  {
    id: 'signl',
    title: 'Signl',
    subtitle: 'Founder · Live content intelligence SaaS',
    description: 'Research-backed content platform. A daily agentic pipeline scans Reddit, X, LinkedIn, and news, ranks audience signals by source strength with verbatim evidence, and generates platform-native posts validated by an LLM-as-judge audit layer before publication. Multi-model inference with graceful degradation and automatic failover.',
    raw: 'Founder of Signl, a live content intelligence SaaS. Agentic research pipeline with LLM-as-judge audit layer and multi-model failover.',
    // No image yet — Signl gets a dedicated SignlFeature.jsx full-bleed treatment in Phase 3.
    tags: ['Founder', 'AI', 'Next.js', 'TypeScript', 'OpenAI'],
    liveUrl: 'https://www.opensignl.com/',
    sourceUrl: '',
    highlights: ['Live SaaS', 'Free + $19/mo Pro', 'Multi-model failover'],
  },
  {
    id: 'safety-eval',
    title: 'AI Chatbot Safety Eval Framework',
    subtitle: 'Oracle · Built from scratch',
    description: "Built an end-to-end evaluation harness for a production chatbot that had no testing infrastructure. Reverse-engineered the API from HAR files, recreated session flows in Postman, wrote a custom injection framework, and scored outputs with LLM-as-judge across safety, groundedness, and relevance. Used the framework to surface an 80% failure rate on safety-critical scenarios. The insights drove a multi-turn redesign that improved groundedness by 90%.",
    raw: 'Custom eval framework for a production chatbot at Oracle. Surfaced an 80% failure rate on safety-critical scenarios; insights drove a redesign with 90% groundedness lift.',
    // No image yet — gets a dedicated SafetyEvalCaseStudy.jsx editorial block in Phase 3.
    tags: ['AI', 'LLM Eval', 'Safety', 'Postman', 'LLM-as-Judge'],
    liveUrl: '',
    sourceUrl: '',
    highlights: ['80% failure rate surfaced', '90% groundedness lift', 'Presented to VP'],
  },
  {
    id: 'codex-workspace',
    title: 'AI Engineering Workspace',
    subtitle: 'Oracle · OpenAI Codex + OpenAI SDK',
    description: "Tech-led the pod that built an internal AI engineering workspace at Oracle. Integrates the support knowledge base with OpenAI GPT models via the OpenAI SDK to auto-generate issue drafts and runbooks on demand. Shipped end-to-end with OpenAI Codex. Reduced average case resolution time across adopting engineering teams.",
    raw: 'Internal AI engineering workspace at Oracle integrating the support KB with OpenAI GPT models for auto-generated issue drafts and runbooks.',
    // No image yet.
    tags: ['AI', 'OpenAI', 'OpenAI SDK', 'OpenAI Codex'],
    liveUrl: '',
    sourceUrl: '',
    highlights: ['Reduced case resolution time', 'Tech-led the pod', 'Shipped end-to-end'],
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
    sourceUrl: '',
    highlights: ['1,000+ users', '40% relevance lift', 'Replaced AWS Comprehend'],
  },
];

export default projects;
