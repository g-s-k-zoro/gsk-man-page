import React from 'react';
import { Calendar, MapPin, Award, ChevronRight, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume-data.json';

const CareerPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Career Journey</h1>
        <p className="text-xl text-muted mb-12">From intern to system software engineer — building secure platforms at scale</p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-dark-border" />

        {/* Career entries */}
        {resumeData.career.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative mb-12 ml-16"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[49px] top-8 timeline-dot" />

            {/* Content card */}
            <div className="glass-panel p-6 hover-card">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-100 mb-1">{entry.role}</h3>
                  <div className="flex items-center space-x-4 text-muted">
                    <span className="flex items-center space-x-1">
                      <Briefcase size={16} />
                      <span>{entry.company}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{entry.period}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{entry.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4">{entry.description}</p>

              {/* Technologies */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-muted mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark-border rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {entry.achievements.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-muted mb-2">Key Achievements</h4>
                  <ul className="space-y-2">
                    {entry.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-2 text-gray-300">
                        <Award size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-accent mb-4">Strong Areas</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.strong.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-accent/20 border border-accent/50 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-accent-secondary mb-4">Intermediate</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.intermediate.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-accent-secondary/20 border border-accent-secondary/50 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Frameworks & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.frameworks.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-400/20 border border-blue-400/50 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CareerPage;
