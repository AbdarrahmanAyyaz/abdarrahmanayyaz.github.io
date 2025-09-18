import React from 'react';
import { motion } from 'framer-motion';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { Copy, Check } from 'lucide-react';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('py', python);

const MessageFormatter = ({ text, className = "" }) => {
  const [copiedCode, setCopiedCode] = React.useState(null);

  // Technical terms to auto-bold
  const technicalTerms = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB',
    'Tailwind', 'shadcn', 'Drizzle', 'OpenAI', 'Perplexity', 'Gemini', 'ChatGPT',
    'AI', 'ML', 'LLM', 'RAG', 'API', 'REST', 'GraphQL', 'Firebase', 'Vercel', 'Netlify',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Oracle Cloud', 'OCI',
    'Git', 'GitHub', 'CI/CD', 'DevOps', 'Microservices', 'Serverless',
    'Next.js', 'Nuxt.js', 'Vue.js', 'Angular', 'Svelte', 'Redux', 'Zustand',
    'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn'
  ];

  // Project names to highlight
  const projectNames = [
    'TriagedAI', 'Advancely', 'RealTimeSearch', 'Brain Tumor Segmentation',
    'BraTS', 'U-Net', 'FLAIR', 'Janazah Companion'
  ];

  const handleCopyCode = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(index);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  // Enhanced parsing with smart formatting
  const parseMessage = (message) => {
    const parts = [];
    let lastIndex = 0;

    // Code block pattern (```language\ncode\n```)
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    let match;

    // Process code blocks first
    while ((match = codeBlockRegex.exec(message)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: message.slice(lastIndex, match.index)
        });
      }

      // Add code block
      parts.push({
        type: 'codeblock',
        language: match[1] || 'text',
        content: match[2].trim()
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < message.length) {
      parts.push({
        type: 'text',
        content: message.slice(lastIndex)
      });
    }

    return parts;
  };

  // Smart formatting for text content
  const formatText = (text) => {
    let formatted = text;

    // Format inline code with backticks
    formatted = formatted.replace(/`([^`]+)`/g,
      '<code class="bg-gray-800/30 border border-gray-600/30 px-2 py-0.5 rounded-md text-gray-200 font-mono text-sm mx-1">$1</code>'
    );

    // Auto-bold technical terms
    technicalTerms.forEach(term => {
      const regex = new RegExp(`\\b(${term})\\b`, 'g');
      formatted = formatted.replace(regex, '<strong class="font-bold text-white bg-gray-800/20 px-1 rounded">$1</strong>');
    });

    // Highlight project names with special styling
    projectNames.forEach(project => {
      const regex = new RegExp(`\\b(${project})\\b`, 'g');
      formatted = formatted.replace(regex, '<span class="font-bold text-white relative after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:opacity-60">$1</span>');
    });

    // Format markdown-style bold **text**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>');

    // Format markdown-style italic *text*
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em class="italic text-gray-200">$1</em>');

    // Format links [text](url)
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-gray-200 hover:text-white underline underline-offset-2 decoration-gray-400/50 hover:decoration-white transition-colors">$1</a>'
    );

    // Format bullet points with custom styling
    formatted = formatted.replace(/^• (.+)$/gm,
      '<div class="flex items-start gap-3 my-2"><div class="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div><span class="text-gray-200 leading-relaxed">$1</span></div>'
    );

    // Format numbered lists
    formatted = formatted.replace(/^\d+\.\s+(.+)$/gm,
      '<div class="flex items-start gap-3 my-2"><div class="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">•</div><span class="text-gray-200 leading-relaxed">$1</span></div>'
    );

    // Convert line breaks
    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
  };

  const parsedContent = parseMessage(text);

  return (
    <div className={`message-formatter ${className}`}>
      {parsedContent.map((part, index) => {
        if (part.type === 'codeblock') {
          const language = part.language.toLowerCase();
          const isCopied = copiedCode === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="my-4 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm shadow-2xl"
            >
              {/* Enhanced code block header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-gray-800/80 to-gray-700/80 px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-500/80 rounded-full"></div>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-gray-500/10 px-2 py-1 rounded-md border border-gray-500/20 uppercase tracking-wider">
                    {language}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopyCode(part.content, index)}
                  className="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                >
                  {isCopied ? (
                    <>
                      <Check size={14} className="text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Enhanced code content with syntax highlighting */}
              <div className="relative">
                <SyntaxHighlighter
                  language={language}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'transparent',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    fontFamily: '"Fira Code", "JetBrains Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace'
                  }}
                  showLineNumbers={part.content.split('\n').length > 5}
                  lineNumberStyle={{
                    minWidth: '2.5rem',
                    paddingRight: '1rem',
                    color: 'rgba(156, 163, 175, 0.4)',
                    fontSize: '0.75rem'
                  }}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {part.content}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          );
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="leading-7 text-gray-200"
            dangerouslySetInnerHTML={{
              __html: formatText(part.content)
            }}
          />
        );
      })}
    </div>
  );
};

export default MessageFormatter;