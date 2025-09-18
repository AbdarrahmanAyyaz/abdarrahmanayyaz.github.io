// Project data for RadialProjectCarousel

// Import images
import work from '../assets/gigApp.jpg';
import portfolio from '../assets/portfolio.png';
import SocialMedia from '../assets/SocialMedia.png';
import dna from '../assets/dna.jpg';
import RealEst from '../assets/1714780311641.jpeg';
import triaged from '../assets/triagedai.png';
import advancely from '../assets/advancely.png';
import porsche from '../assets/Porsche.png';

export const projects = [
  {
    id: 'triagedai',
    title: 'TriagedAI',
    subtitle: 'AI-Powered Technical Support',
    description: 'AI-powered technical support copilot. Auto-summaries from logs • guided triage • one-click runbooks.',
    raw: 'AI-powered technical support companion for faster debugging and guided triage. Features intelligent context-aware troubleshooting and automated issue resolution.',
    image: triaged,
    tags: ['AI', 'React', 'OpenAI', 'LangChain', 'OCI'],
    liveUrl: 'https://triagedai.com',
    sourceUrl: '', // Private repo
    highlights: ['–38% time-to-resolution']
  },
  {
    id: 'advancely',
    title: 'Advancely',
    subtitle: 'Personal Success Dashboard',
    description: 'Personal success dashboard for habits, goals, and AI guidance. Weekly insights • streak tracking • review planner.',
    raw: 'Personal success dashboard: habits, goals, and AI guidance. Dual-AI approach combining goal tracking with intelligent habit recommendations.',
    image: advancely,
    tags: ['AI', 'React', 'Tailwind', 'Goals', 'Habits'],
    liveUrl: 'https://advancely.ai',
    sourceUrl: '', // Private repo
    highlights: ['Weekly insights']
  },
  {
    id: 'portfolio',
    title: 'Portfolio React App',
    subtitle: 'Personal Portfolio Website',
    description: 'Fast, dark UI with Framer Motion. Mobile-first layout • interactive AI chat • Lighthouse 95+ mobile.',
    raw: 'This website—dark, clean, Tailwind UI with Framer Motion. Features responsive design, smooth animations, and interactive AI chat.',
    image: portfolio,
    tags: ['React', 'Tailwind', 'Framer Motion', 'TypeScript'],
    liveUrl: 'https://abdarrahman.dev',
    sourceUrl: 'https://github.com/AbdarrahmanAyyaz/abdarrahmanayyaz.github.io',
    highlights: ['Lighthouse 95+ mobile']
  },
  {
    id: 'tumor-segmentation',
    title: 'Multi-Class Tumor Segmentation',
    subtitle: 'Medical AI Research',
    description: 'Medical image segmentation using U-Net/ResNet. Class-balanced training.',
    raw: 'Medical image segmentation across multiple tumor classes using advanced deep learning. Achieved 98.3% accuracy on BraTS dataset with U-Net architecture.',
    image: RealEst,
    tags: ['PyTorch', 'Segmentation', 'ML', 'Medical AI', 'U-Net'],
    liveUrl: '',
    sourceUrl: 'https://github.com/AbdarrahmanAyyaz/TumorSegmentation/blob/main/README.md',
    highlights: ['98.3% accuracy on BRATS']
  },
  {
    id: 'porsche-sales',
    title: 'Sales Professional Portfolio',
    subtitle: 'Automotive Sales Platform',
    description: 'Porsche sales platform with CRM-lite dashboard. Inventory manager • lead capture • WhatsApp handoff.',
    raw: 'Sales professional portfolio for Porsches with clean UI and dashboard. Features inventory management and client tracking.',
    image: porsche,
    tags: ['React', 'Tailwind', 'Dashboard', 'UI/UX'],
    liveUrl: 'https://abdullahayyaz.com',
    sourceUrl: '', // Private repo
    highlights: ['CRM-lite dashboard']
  },
  {
    id: 'workwaves',
    title: 'Work Waves (Gig App)',
    subtitle: 'Gig Economy Helper',
    description: 'Earnings & route companion for gig workers. Real-time map overlays • multi-app aggregation • local-first sync.',
    raw: 'Gig-economy helper to manage multi-app shifts and track earnings. Features real-time location tracking and earnings analytics.',
    image: work,
    tags: ['React', 'Node', 'Maps', 'Analytics'],
    liveUrl: '',
    sourceUrl: 'https://github.com/AbdarrahmanAyyaz/Workwaves',
    highlights: ['Real-time map overlays']
  },
  {
    id: 'dna-sequencing',
    title: 'DNA Sequencing with CNN Models',
    subtitle: 'Bioinformatics Research',
    description: 'CNN classifier for sequence motifs. TensorFlow pipeline.',
    raw: 'CNN classifier for DNA sequencing experiments. Advanced machine learning approach to genetic sequence analysis.',
    image: dna,
    tags: ['Python', 'TensorFlow', 'CNN', 'Bioinformatics', 'ML'],
    liveUrl: '',
    sourceUrl: 'https://github.com/AbdarrahmanAyyaz/DNA-Sequencing',
    highlights: ['+X% F1 vs baseline']
  },
  {
    id: 'social-media',
    title: 'Experience Share (Social Media App)',
    subtitle: 'Social Platform',
    description: 'MERN social app with auth, posts, and comments. Full-featured social media platform with real-time interactions.',
    raw: 'MERN social app with auth, posts, and comments. Full-featured social media platform with real-time interactions.',
    image: SocialMedia,
    tags: ['MERN', 'Auth', 'CRUD', 'Real-time'],
    liveUrl: '',
    sourceUrl: 'https://github.com/AbdarrahmanAyyaz/Social-Media-App',
    highlights: ['Full-stack MERN']
  },
];

export default projects;