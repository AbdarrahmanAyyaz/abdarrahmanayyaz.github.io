// Project data types
export const PROJECT_TAGS = {
  AI: 'AI',
  REACT: 'React',
  NODE: 'Node',
  PYTHON: 'Python',
  TAILWIND: 'Tailwind',
  TYPESCRIPT: 'TypeScript',
  FULLSTACK: 'Full-Stack',
  OPENSOURCE: 'Open Source',
  LANGCHAIN: 'LangChain',
  OCI: 'OCI',
  FRAMER: 'Framer Motion',
  TENSORFLOW: 'TensorFlow',
  PYTORCH: 'PyTorch',
  MERN: 'MERN',
  CNN: 'CNN',
  BIOINFORMATICS: 'Bioinformatics'
};

// Project interface
export const createProject = ({
  id,
  title,
  subtitle,
  description,
  image,
  tags = [],
  liveUrl,
  sourceUrl,
  highlights = []
}) => ({
  id,
  title,
  subtitle,
  description,
  image,
  tags,
  liveUrl,
  sourceUrl,
  highlights
});