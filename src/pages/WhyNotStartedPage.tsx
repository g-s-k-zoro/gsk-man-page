import React, { useState } from 'react';
import { Clock, Coffee, Brain, Zap, Target, AlertCircle, CheckSquare, Square } from 'lucide-react';
import { motion } from 'framer-motion';

interface Obstacle {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  anecdote: string;
  plan?: string;
  checked?: boolean;
}

const WhyNotStartedPage: React.FC = () => {
  const [obstacles, setObstacles] = useState<Obstacle[]>([
    {
      id: 'procrastination',
      title: 'The Procrastination Monster',
      icon: <Clock className="text-accent" size={32} />,
      description: 'Why do today what you can put off until tomorrow?',
      anecdote: 'I once spent 3 hours researching the perfect todo app instead of doing the actual todos. The research is ongoing.',
      plan: 'Start with just 5 minutes. But first, let me find the perfect timer app...',
      checked: false
    },
    {
      id: 'perfectionism',
      title: 'Perfectionist Paralysis',
      icon: <Target className="text-accent-secondary" size={32} />,
      description: 'If it\'s not perfect, why even start?',
      anecdote: 'I have 47 drafts of a "Hello World" program because none of them felt quite right.',
      plan: 'Embrace "good enough" as a starting point. Version 1.0 doesn\'t need to be perfect!',
      checked: false
    },
    {
      id: 'analysis',
      title: 'Analysis Paralysis',
      icon: <Brain className="text-purple-400" size={32} />,
      description: 'But what if there\'s a better way?',
      anecdote: 'Spent 2 weeks comparing frameworks for a project that would take 2 days to build. Still comparing.',
      plan: 'Set a decision deadline. Flip a coin if needed. The coin is usually right.',
      checked: false
    },
    {
      id: 'energy',
      title: 'The 2 AM Inspiration Curse',
      icon: <Zap className="text-yellow-400" size={32} />,
      description: 'Why do all great ideas come when I should be sleeping?',
      anecdote: 'My GitHub commit history looks like I live in a timezone that doesn\'t exist on Earth.',
      plan: 'Keep a notebook by the bed. Or accept my destiny as a nocturnal coder.',
      checked: false
    },
    {
      id: 'coffee',
      title: 'Coffee Dependency Disorder',
      icon: <Coffee className="text-orange-400" size={32} />,
      description: 'No coffee, no code. Too much coffee, no focus.',
      anecdote: 'I have a coffee maker on my desk. It has its own UPS backup.',
      plan: 'Find the optimal coffee-to-code ratio. Current hypothesis: 1.618 cups per function.',
      checked: false
    },
    {
      id: 'scope',
      title: 'Scope Creep Syndrome',
      icon: <AlertCircle className="text-red-400" size={32} />,
      description: 'Started with a todo app, now building an OS.',
      anecdote: 'My "simple portfolio site" roadmap now includes AI, blockchain, and possibly time travel.',
      plan: 'Write requirements. Stick to them. Hide the requirements when tempted to add features.',
      checked: false
    }
  ]);

  const [expandedObstacle, setExpandedObstacle] = useState<string | null>(null);

  const toggleObstacle = (id: string) => {
    setExpandedObstacle(expandedObstacle === id ? null : id);
  };

  const toggleCheck = (id: string) => {
    setObstacles(obstacles.map(obs => 
      obs.id === id ? { ...obs, checked: !obs.checked } : obs
    ));
  };

  const checkedCount = obstacles.filter(o => o.checked).length;
  const progress = (checkedCount / obstacles.length) * 100;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Why Haven't I Started Yet?</h1>
        <p className="text-xl text-muted mb-8">
          An honest (and slightly embarrassing) exploration of my productivity obstacles
        </p>
        
        {/* Progress Bar */}
        <div className="glass-panel p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">Obstacles Acknowledged</span>
            <span className="text-sm font-bold text-accent">{checkedCount}/{obstacles.length}</span>
          </div>
          <div className="w-full bg-dark-border rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-accent to-accent-secondary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {progress === 100 && (
            <p className="text-center text-accent-secondary mt-4 font-medium">
              All obstacles acknowledged! Now I just need to actually do something about them... 🎉
            </p>
          )}
        </div>
      </motion.div>

      {/* Obstacles Grid */}
      <div className="grid gap-6">
        {obstacles.map((obstacle, index) => (
          <motion.div
            key={obstacle.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel p-6 hover-card"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="p-3 bg-dark-border rounded-lg">
                  {obstacle.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{obstacle.title}</h3>
                  <p className="text-muted mb-3">{obstacle.description}</p>
                  
                  <button
                    onClick={() => toggleObstacle(obstacle.id)}
                    className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                  >
                    {expandedObstacle === obstacle.id ? 'Hide Story' : 'Read My Confession →'}
                  </button>

                  {expandedObstacle === obstacle.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3"
                    >
                      <div className="p-3 bg-dark-border/50 rounded-lg">
                        <p className="text-sm text-gray-300 italic">"{obstacle.anecdote}"</p>
                      </div>
                      
                      {obstacle.plan && (
                        <div className="p-3 border border-accent/30 rounded-lg">
                          <p className="text-xs text-accent mb-1 font-semibold">MY PLAN:</p>
                          <p className="text-sm text-gray-300">{obstacle.plan}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => toggleCheck(obstacle.id)}
                className="ml-4 p-2 hover:bg-dark-border rounded-lg transition-colors"
                aria-label={obstacle.checked ? 'Uncheck' : 'Check'}
              >
                {obstacle.checked ? (
                  <CheckSquare className="text-accent" size={24} />
                ) : (
                  <Square className="text-muted" size={24} />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold mb-4">The Silver Lining</h2>
          <p className="text-gray-300 mb-4">
            Despite all these obstacles (or maybe because of them?), I've still managed to build 
            some cool stuff. Imagine what I could do if I actually got my act together! 🚀
          </p>
          <p className="text-sm text-muted italic">
            Update: Still working on getting my act together. Check back in a few... years?
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WhyNotStartedPage;
