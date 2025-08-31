import React from 'react';
import { Heart, Coffee, Book, Code, Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume-data.json';

const PersonalPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Beyond the Code</h1>
        <p className="text-xl text-muted mb-12">The person behind the keyboard</p>
      </motion.div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-panel p-8 mb-8"
      >
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-accent/20 rounded-lg">
            <User size={24} className="text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Hi, I'm Ghanashyam!</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              {resumeData.personal.about}
            </p>
            <p className="text-gray-300 leading-relaxed">
              Currently working as a {resumeData.personal.title} at {resumeData.personal.company}, 
              I spend my days building secure platforms for tomorrow's computing. But there's more to me 
              than just code and circuits.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Interests Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Code className="text-accent" size={24} />
            <h3 className="text-xl font-bold">What I Love About Tech</h3>
          </div>
          <ul className="space-y-2 text-gray-300">
            <li>• The elegance of well-designed algorithms</li>
            <li>• System-level programming challenges</li>
            <li>• Building things that scale</li>
            <li>• Open source collaboration</li>
            <li>• Learning new technologies (when I finally start)</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="text-accent-secondary" size={24} />
            <h3 className="text-xl font-bold">Outside of Work</h3>
          </div>
          <ul className="space-y-2 text-gray-300">
            <li>• Mathematics puzzles and recreational math</li>
            <li>• Reading technical blogs (and bookmarking them forever)</li>
            <li>• Contributing to open source (eventually)</li>
            <li>• Contemplating starting new projects</li>
            <li>• Finding creative ways to procrastinate productively</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Book className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold">Learning Philosophy</h3>
          </div>
          <p className="text-gray-300">
            I believe in learning by doing (when I actually do). My approach is to understand 
            the fundamentals deeply rather than just scratching the surface. Though I must admit, 
            my "to-learn" list grows faster than my "learned" list!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="text-purple-400" size={24} />
            <h3 className="text-xl font-bold">Fun Facts</h3>
          </div>
          <ul className="space-y-2 text-gray-300">
            <li>• Gold medalist at National Science Congress</li>
            <li>• Selected for INMO camp (Math Olympiad)</li>
            <li>• Can solve a Rubik's cube (given enough time)</li>
            <li>• Expert at starting projects at 2 AM</li>
            <li>• Professional deadline approacher</li>
          </ul>
        </motion.div>
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center"
      >
        <div className="glass-panel p-8 relative">
          <Coffee className="absolute top-4 left-4 text-accent/20" size={40} />
          <Coffee className="absolute bottom-4 right-4 text-accent-secondary/20 rotate-12" size={40} />
          <blockquote className="text-xl italic text-gray-300 relative z-10">
            "I'm most productive when working with passionate people on interesting problems. 
            The energy of collaboration defeats even my strongest procrastination tendencies."
          </blockquote>
          <p className="text-muted mt-4">— Me, in a moment of clarity</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalPage;
