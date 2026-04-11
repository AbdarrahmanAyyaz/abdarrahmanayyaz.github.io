# Abdarrahman Ayyaz — Portfolio Context
_Last updated: 2026-04-11_

## Snapshot
- **Title:** AI Deployment Engineer
- **Day job:** Oracle Cloud Infrastructure — Developer Tools, Santa Clara, CA
- **Founder of:** Signl (opensignl.com)
- **Education:** B.S. Computer Science, San Francisco State University (3.7 GPA, Dean's List, Genentech-PINC Scholarship, Data Science & Machine Learning Certificate)
- **Location:** Santa Clara, CA (San Francisco Bay Area)

## About Me
Day job is AI deployment engineering at Oracle Cloud Infrastructure. The title on my badge says "Cloud Support Engineer," but the work is post-sale technical partnership for Fortune 500, DOD, government (with GOV clearance), and FSI clients — building, evaluating, and shipping production AI systems.

Outside Oracle, I'm the founder of Signl (opensignl.com), a live content intelligence SaaS. Before Signl, I built Triage AI (triagedai.com), a full-stack AI triage app serving 1,000+ users.

Outside the work: martial arts (boxing), hiking, travel. Based in Santa Clara, CA. I organized a community food drive during COVID for people experiencing homelessness.

Open to coffee chats and conversations with builders and AI teams.

### CON-FO-DI Philosophy
CON-FO-DI = Consistency, Focus, Discipline. The personal philosophy that shapes how I approach building and shipping. Show up consistently. Focus on what matters. Follow through with discipline. It's how the work gets done.

## Personal FAQ
**Q: What do you do outside of work?**
A: Martial arts and boxing. Hiking. Travel.

**Q: Where are you based?**
A: Santa Clara, CA — San Francisco Bay Area. Open to remote.

**Q: Do you do coffee chats?**
A: Yes — open to coffee chats and meeting people building in AI.

**Q: What roles are you looking for next?**
A: AI Deployment Engineer, AI Solutions Engineer, Forward-Deployed Engineer, or DevRel at AI-forward companies — OpenAI, Anthropic, Scale, and similar.

**Q: What's the favorite thing you've built?**
A: Hard to pick one. The chatbot safety evaluation framework I built at Oracle is the most technically interesting — built from scratch, surfaced an 80% failure rate on safety-critical scenarios, presented to VP, and the insights drove a redesign with 90% groundedness lift. Signl is the one that means the most as a founder — it's a live SaaS I built solo.

**Q: What does "AI deployment engineer" actually mean day-to-day?**
A: I'm the post-sale technical partner for Fortune 500, DOD, government, and FSI engineering teams on Oracle Cloud Infrastructure. The work spans: building AI evaluation harnesses, deploying RAG agents to production, debugging complex JavaScript / Java / REST API issues at the customer boundary, and presenting technical findings to senior leadership.

## Projects

### Signl (opensignl.com)
Live content intelligence SaaS, founded solo. Daily agentic pipeline scans Reddit, X, LinkedIn, and news. Ranks audience signals by source strength with verbatim evidence. Generates platform-native posts for X and LinkedIn, validated by an LLM-as-judge audit layer against platform-specific publishing rules before output. Multi-model inference with graceful degradation and automatic failover. Voice profiling matches the user's actual writing patterns. Free tier (5 posts/month, 2 briefs/day) and $19/month Pro tier.
- **Stack:** Next.js, TypeScript, OpenAI API
- **Status:** Live — https://www.opensignl.com/
- **Demo:** https://www.linkedin.com/feed/update/urn:li:activity:7448471121202429953/

### AI Chatbot Safety Evaluation Framework (Oracle)
Built from scratch for a production chatbot that had no evaluation infrastructure. Reverse-engineered the API from HAR files. Recreated session flows programmatically in Postman. Wrote a custom injection framework. Scored outputs with LLM-as-judge across three axes: safety, groundedness, and relevance. Used the framework to surface an 80% failure rate on safety-critical scenarios across 3 core test categories. Presented findings and insights to VP and senior leadership. The insights drove a multi-turn chatbot redesign that improved groundedness by 90%.
- **Stack:** Postman, custom injection framework, LLM-as-judge, HAR analysis

### AI-Powered Engineering Workspace (Oracle, OpenAI Codex)
Tech-led the pod that built an internal AI engineering workspace. Integrates Oracle's support knowledge base with OpenAI GPT models via the OpenAI SDK to auto-generate issue drafts and runbooks on demand. Reduced average case resolution time across adopting engineering teams. Shipped end-to-end with OpenAI Codex.
- **Stack:** OpenAI Codex, OpenAI SDK, GPT models, Oracle support KB integration

### OCI RAG Migration Agent (Oracle)
Designed and deployed a production RAG agent on OCI Generative AI for OIC Gen 2 → Gen 3 migration. Vector embeddings, retrieval pipeline, internal-facing agent used by Oracle engineers to automate technical troubleshooting. Reduced manual resolution time for internal teams.
- **Stack:** OCI Generative AI, vector embeddings, RAG

### Production AI Agent Evaluation (Oracle, post-sale)
Evaluated production AI agents for Fortune 500 engineering teams as part of post-sale technical partnership. Implemented RAG pipelines that improved response accuracy by 35%. Surfaced critical failure patterns before customer exposure.

### Triage AI (triagedai.com)
Full-stack AI triage app serving 1,000+ users. Perplexity sonar-pro for grounded responses. PostgreSQL-backed conversation memory across sessions. Replaced AWS Comprehend with a client-side sentiment model — 95% accuracy on labeled set, $50/month infra cost eliminated, 200ms P95 latency cut. 40% relevance lift over baseline. Cut React re-renders by 60% via TanStack Query and targeted memoization.
- **Stack:** React, TypeScript, PostgreSQL, Perplexity API
- **Status:** Live — https://triagedai.com/
- **Demo:** https://www.linkedin.com/feed/update/urn:li:activity:7375974681906118657/

### Brain Tumor Segmentation (BraTS)
Medical imaging research using U-Net architecture for multi-class brain tumor segmentation. BraTS dataset across all four MRI modalities (T1, T1CE, T2, FLAIR). Systematic single- vs multi-modality experiments. Presented research findings at the SFSU-Genentech partnership symposium to hundreds of engineers and industry professionals.
- **Stack:** Python, TensorFlow, U-Net
- **Repo:** https://github.com/AbdarrahmanAyyaz/TumorSegmentation

## Skills

**AI Coding Tools (used daily):** OpenAI Codex, Claude Code, Cursor, ChatGPT — for prototyping, code review, and workflow automation.

**AI / LLM:** OpenAI API (GPT-5.4, Codex), Claude API, OCI Generative AI, RAG, Vector Databases, LLM Evaluation (LLM-as-a-Judge), Prompt Engineering, Agentic Workflows, Model Fine-tuning, MCP Tools.

**Languages:** Python, TypeScript, JavaScript, Java, SQL, C++.

**Frameworks & Libraries:** React, Next.js, Node.js, Express.js, LangChain, TensorFlow, Keras, PyTorch, Pandas, Docker, REST APIs.

**Cloud & Infra:** AWS, GCP, OCI, PostgreSQL, MySQL, Firebase, CI/CD, Git, GitHub, Linux.

## Target Roles
AI Deployment Engineer, AI Solutions Engineer, Forward-Deployed Engineer, DevRel — at AI-forward companies (OpenAI, Anthropic, Scale, similar tier).

## Links
- **Portfolio:** https://abdarrahman.dev/
- **LinkedIn:** https://www.linkedin.com/in/abdarrahman-ayyaz/
- **GitHub:** https://github.com/AbdarrahmanAyyaz
- **Email:** abdarrahmanayyaz00@gmail.com
- **Signl:** https://www.opensignl.com/
- **Triage AI:** https://triagedai.com/
