import React, { useState } from 'react';
import { Github, ExternalLink, ChevronDown, ChevronUp, ChevronRight, Code, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume-data.json';

const ProjectsPage: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleExpand = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Projects</h1>
        <p className="text-xl text-muted mb-12">Ideas turned into code — solving real problems with technology</p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {resumeData.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="project-card group"
          >
            {/* Project Header */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-accent text-sm font-medium">{project.summary}</p>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-4">{project.description}</p>

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <div className="mb-4 flex items-center space-x-2 text-accent-secondary">
                <Trophy size={18} />
                <span className="text-sm font-medium">{project.achievements[0]}</span>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-dark-border rounded text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* How to Use Section */}
            {project.how_to_use && (
              <div className="mb-4">
                <button
                  onClick={() => toggleExpand(project.id)}
                  className="flex items-center space-x-2 text-muted hover:text-gray-100 transition-colors"
                >
                  <Code size={16} />
                  <span className="text-sm font-medium">How to use</span>
                  {expandedProject === project.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                
                {expandedProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pl-6 border-l-2 border-dark-border"
                  >
                    <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono">
                      {project.how_to_use}
                    </pre>
                  </motion.div>
                )}
              </div>
            )}

            {/* Links */}
            <div className="flex items-center space-x-4 pt-4 border-t border-dark-border">
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted hover:text-accent transition-colors"
                >
                  <Github size={18} />
                  <span className="text-sm">View Code</span>
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted hover:text-accent transition-colors"
                >
                  <ExternalLink size={18} />
                  <span className="text-sm">Try Demo</span>
                </a>
              )}
              {!project.repo_url && !project.demo_url && (
                <span className="text-sm text-muted italic">Private/Archived Project</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <div className="glass-panel p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Want to collaborate on a project?</h2>
          <p className="text-muted mb-6">
            I'm always interested in working on challenging problems with passionate people.
          </p>
          <a
            href="/collaboration"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-dark-bg rounded-lg hover:bg-accent/90 transition-colors font-medium"
          >
            <span>Let's Connect</span>
            <ChevronRight size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;
