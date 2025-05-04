// Data file describing your projects.  Each entry is used by the Work section
// to render a project card.  We import images from the assets folder.

import work from '../assets/gigApp.jpg';
import portfolio from '../assets/portfolio.png';
// social media project image
import WorkIm from '../assets/social-media-1280x800.webp';
import dna from '../assets/dna.jpg';
import RealEst from '../assets/1714780311641.jpeg';

// New project images for AI and personal development apps
import triaged from '../assets/triagedai.png';
import advancely from '../assets/advancely.png';

export const data = [
  {
    id: 1,
    name: 'Work Waves (Gig App)',
    image: work,
    github: 'https://github.com/AbdarrahmanAyyaz/Workwaves',
  },
  {
    id: 2,
    name: 'Portfolio React App',
    image: portfolio,
    github: 'https://github.com/AbdarrahmanAyyaz/abdarrahmanayyaz.github.io',
  },
  {
    id: 3,
    name: 'Experience Share (Social Media App)',
    image: WorkIm,
    github: 'https://github.com/AbdarrahmanAyyaz/Social-Media-App',
  },
  {
    id: 4,
    name: 'DNA Sequencing with CNN models',
    image: dna,
    github: 'https://github.com/AbdarrahmanAyyaz/DNA-Sequencing',
  },
  {
    id: 5,
    name: 'Multi Class Tumor Segmentation',
    image: RealEst,
    github: 'https://github.com/AbdarrahmanAyyaz/TumorSegmentation/blob/main/README.md',
  },
  // Added AI and personal development projects
  {
    id: 6,
    name: 'TriagedAI',
    image: triaged,
    github: 'https://triagedai.com',
  },
  {
    id: 7,
    name: 'Advancely',
    image: advancely,
    github: 'https://advancely.ai',
  },
];