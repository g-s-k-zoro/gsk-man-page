import React, { useState } from 'react';
import { BookOpen, Puzzle, Calendar, Clock, Eye, ChevronRight, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: number;
  tags: string[];
  views: number;
}

interface PuzzleItem {
  id: string;
  title: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  hints: string[];
}

const WasteTimePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'puzzles'>('blogs');
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState<Record<string, number>>({});

  // Sample blog posts
  const blogPosts: BlogPost[] = [
    {
      id: 'arm-security',
      title: 'Understanding ARM TrustZone: A Deep Dive',
      summary: 'Exploring the security architecture of ARM processors and how TrustZone creates isolated execution environments.',
      date: '2024-01-15',
      readTime: 8,
      tags: ['ARM', 'Security', 'Embedded'],
      views: 342
    },
    {
      id: 'cpp-templates',
      title: 'C++ Template Metaprogramming: The Good, Bad, and Ugly',
      summary: 'My journey through the maze of template metaprogramming and why it\'s both amazing and terrifying.',
      date: '2024-01-10',
      readTime: 12,
      tags: ['C++', 'Programming', 'Templates'],
      views: 567
    },
    {
      id: 'procrastination',
      title: 'The Art of Productive Procrastination',
      summary: 'How I turned my procrastination habit into a somewhat productive endeavor (spoiler: I\'m still working on it).',
      date: '2024-01-05',
      readTime: 5,
      tags: ['Productivity', 'Humor', 'Personal'],
      views: 892
    },
    {
      id: 'algorithm-beauty',
      title: 'The Beauty of Dijkstra\'s Algorithm',
      summary: 'Why this classic algorithm is still relevant and beautiful in its simplicity and efficiency.',
      date: '2023-12-28',
      readTime: 10,
      tags: ['Algorithms', 'Graph Theory', 'Computer Science'],
      views: 423
    }
  ];

  // Sample puzzles
  const puzzles: PuzzleItem[] = [
    {
      id: 'binary-magic',
      title: 'The Binary Magic',
      question: 'You have 1000 bottles of wine, and exactly one bottle is poisoned. You have 10 test strips which can be used to detect poison. A test strip will turn positive if any amount of poison is poured on it. You can test multiple bottles on a strip simultaneously. What is the minimum number of test strips you need to find the poisoned bottle, and how?',
      answer: 'You need all 10 strips. Number each bottle in binary (0-999 needs 10 bits). Pour bottle i on strip j if bit j is 1 in the binary representation of i. The strips that turn positive give you the binary number of the poisoned bottle.',
      difficulty: 'hard',
      category: 'Logic',
      hints: [
        'Think about binary representation',
        'Each strip can represent a binary digit',
        'How many numbers can you represent with 10 binary digits?'
      ]
    },
    {
      id: 'prisoners-hats',
      title: 'Prisoners and Hats',
      question: '100 prisoners are lined up in a row, each wearing either a red or blue hat. Each prisoner can see all the hats in front of them but not their own or any behind them. Starting from the back, each prisoner must guess their hat color. If they guess correctly, they survive. The prisoners can strategize beforehand. What strategy maximizes the number of guaranteed survivors?',
      answer: 'The first prisoner counts the number of red hats they see and says "red" if it\'s even, "blue" if odd. This prisoner has a 50% chance. Every other prisoner can deduce their hat color based on what they hear and see, guaranteeing 99 survivors.',
      difficulty: 'medium',
      category: 'Strategy',
      hints: [
        'The first prisoner can convey information',
        'Think about parity (odd/even)',
        'Each prisoner can use information from previous guesses'
      ]
    },
    {
      id: 'sum-swap',
      title: 'The Sum Swap',
      question: 'You have two variables, A and B, containing integer values. Write code to swap their values without using a temporary variable, arithmetic operations only.',
      answer: 'A = A + B; B = A - B; A = A - B; Or using XOR: A = A ^ B; B = A ^ B; A = A ^ B;',
      difficulty: 'easy',
      category: 'Programming',
      hints: [
        'Think about what A + B represents',
        'How can you extract the original values from their sum?'
      ]
    }
  ];

  const toggleAnswer = (puzzleId: string) => {
    setRevealedAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(puzzleId)) {
        newSet.delete(puzzleId);
      } else {
        newSet.add(puzzleId);
      }
      return newSet;
    });
  };

  const showNextHint = (puzzleId: string) => {
    setShowHint(prev => ({
      ...prev,
      [puzzleId]: (prev[puzzleId] || 0) + 1
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 border-green-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'hard': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          It's Better to Waste Time This Way
        </h1>
        <p className="text-xl text-muted mb-12">
          Blogs for the curious, puzzles for the persistent
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 glass-panel p-1 max-w-md">
        <button
          onClick={() => setActiveTab('blogs')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'blogs' 
              ? 'bg-accent text-dark-bg' 
              : 'text-muted hover:text-gray-100'
          }`}
        >
          <BookOpen size={18} />
          <span>Blogs</span>
        </button>
        <button
          onClick={() => setActiveTab('puzzles')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'puzzles' 
              ? 'bg-accent text-dark-bg' 
              : 'text-muted hover:text-gray-100'
          }`}
        >
          <Puzzle size={18} />
          <span>Puzzles</span>
        </button>
      </div>

      {/* Blogs Section */}
      {activeTab === 'blogs' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 hover-card group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{post.summary}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-4">
                      <span className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{post.readTime} min read</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye size={14} />
                        <span>{post.views} views</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-dark-border rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="flex items-center space-x-1 text-accent hover:text-accent/80 transition-colors">
                        <span className="text-sm font-medium">Read More</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      )}

      {/* Puzzles Section */}
      {activeTab === 'puzzles' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            {puzzles.map((puzzle, index) => (
              <motion.div
                key={puzzle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold">{puzzle.title}</h3>
                  <span className={`px-2 py-1 border rounded text-xs font-medium ${getDifficultyColor(puzzle.difficulty)}`}>
                    {puzzle.difficulty}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="inline-block px-2 py-1 bg-dark-border rounded text-xs text-muted mb-3">
                    {puzzle.category}
                  </span>
                  <p className="text-gray-300">{puzzle.question}</p>
                </div>

                {/* Hints */}
                {puzzle.hints.length > 0 && (
                  <div className="mb-4">
                    {(showHint[puzzle.id] || 0) > 0 && (
                      <div className="space-y-2 mb-3">
                        {puzzle.hints.slice(0, showHint[puzzle.id] || 0).map((hint, i) => (
                          <div key={i} className="p-3 bg-dark-border/50 rounded-lg">
                            <p className="text-sm text-gray-300">
                              <span className="text-accent mr-2">Hint {i + 1}:</span>
                              {hint}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {(showHint[puzzle.id] || 0) < puzzle.hints.length && (
                      <button
                        onClick={() => showNextHint(puzzle.id)}
                        className="flex items-center space-x-2 text-accent-secondary hover:text-accent-secondary/80 text-sm transition-colors"
                      >
                        <Lightbulb size={16} />
                        <span>
                          {showHint[puzzle.id] ? 'Next Hint' : 'Need a Hint?'}
                          ({(showHint[puzzle.id] || 0)}/{puzzle.hints.length})
                        </span>
                      </button>
                    )}
                  </div>
                )}

                {/* Answer */}
                <div className="pt-4 border-t border-dark-border">
                  <button
                    onClick={() => toggleAnswer(puzzle.id)}
                    className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    <span>{revealedAnswers.has(puzzle.id) ? 'Hide' : 'Reveal'} Answer</span>
                  </button>
                  
                  {revealedAnswers.has(puzzle.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-4 bg-accent/10 border border-accent/30 rounded-lg"
                    >
                      <p className="text-sm text-gray-300">{puzzle.answer}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WasteTimePage;
