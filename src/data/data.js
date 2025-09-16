// src/data/data.js
// Images
import work from '../assets/gigApp.jpg';
import portfolio from '../assets/portfolio.png';
import SocialMedia from '../assets/SocialMedia.png';
import dna from '../assets/dna.jpg';
import RealEst from '../assets/1714780311641.jpeg';
import triaged from '../assets/triagedai.png';
import advancely from '../assets/advancely.png';
import porsche from '../assets/Porsche.png';

// Project list
const projects = [
  {
    id: 1,
    name: 'Work Waves (Gig App)',
    image: work,
    summary: 'Gig-economy helper to manage multi-app shifts and track earnings.',
    tags: ['React', 'Node', 'Maps'],
    github: 'https://github.com/AbdarrahmanAyyaz/Workwaves',
    live: null,
  },
  {
    id: 2,
    name: 'Portfolio React App',
    image: portfolio,
    summary: 'This website—dark, clean, Tailwind UI with Framer Motion.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    github: 'https://github.com/AbdarrahmanAyyaz/abdarrahmanayyaz.github.io',
    live: 'https://abdarrahman.dev',
  },
  {
    id: 3,
    name: 'Experience Share (Social Media App)',
    image: SocialMedia,
    summary: 'MERN social app with auth, posts, and comments.',
    tags: ['MERN', 'Auth', 'CRUD'],
    github: 'https://github.com/AbdarrahmanAyyaz/Social-Media-App',
    live: null,
  },
  {
    id: 4,
    name: 'DNA Sequencing with CNN Models',
    image: dna,
    summary: 'CNN classifier for DNA sequencing experiments.',
    tags: ['Python', 'TensorFlow', 'CNN'],
    github: 'https://github.com/AbdarrahmanAyyaz/DNA-Sequencing',
    live: null,
  },
  {
    id: 5,
    name: 'Multi-Class Tumor Segmentation',
    image: RealEst,
    summary: 'Medical image segmentation across multiple tumor classes.',
    tags: ['PyTorch', 'Segmentation', 'ML'],
    github: 'https://github.com/AbdarrahmanAyyaz/TumorSegmentation/blob/main/README.md',
    live: null,
  },
  // New AI + personal development apps
  {
    id: 6,
    name: 'TriagedAI',
    image: triaged,
    summary: 'AI-powered technical support companion for faster debugging and guided triage.',
    tags: ['AI', 'React', 'OpenAI', 'LangChain', 'OCI'],
    github: null,                 // add repo URL if public
    live: 'https://triagedai.com',
  },
  {
    id: 7,
    name: 'Advancely',
    image: advancely,
    summary: 'Personal success dashboard: habits, goals, and AI guidance.',
    tags: ['AI', 'React', 'Tailwind'],
    github: null,                 // add repo URL if public
    live: 'https://advancely.ai',
  },
  {
    id: 8,
    name: 'Sales Professional Portfolio',
    image: porsche,
    summary: 'Sales professional portfolio for Porsches with clean UI and dashboard.',
    tags: ['React', 'Tailwind', 'Dashboard', 'UI/UX'],
    github: null,                 // add repo URL if public
    live: 'https://abdullahayyaz.com',
  },
];

// Export in multiple shapes to avoid breaking existing imports
export default projects;
export const project = projects;
export const data = projects;