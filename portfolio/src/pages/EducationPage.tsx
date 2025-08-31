import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume-data.json';

const EducationPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Education & Achievements</h1>
        <p className="text-xl text-muted mb-12">Academic journey and recognition for excellence</p>
      </motion.div>

      {/* Education Timeline */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
          <GraduationCap className="text-accent" />
          <span>Academic Background</span>
        </h2>

        {resumeData.education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel p-6 mb-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-100">{edu.institution}</h3>
                <p className="text-lg text-accent mt-1">{edu.degree}</p>
              </div>
              {edu.cgpa && (
                <div className="text-right">
                  <div className="text-3xl font-bold text-accent-secondary">{edu.cgpa}</div>
                  <div className="text-sm text-muted">CGPA</div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 text-muted mb-4">
              <span className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{edu.period}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{edu.location}</span>
              </span>
            </div>

            {edu.achievements.length > 0 && (
              <div className="pt-4 border-t border-dark-border">
                <h4 className="text-sm font-semibold text-muted mb-2">Highlights</h4>
                <ul className="space-y-2">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start space-x-2 text-gray-300">
                      <Star size={16} className="text-accent-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Awards & Achievements */}
      <div>
        <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
          <Award className="text-accent-secondary" />
          <span>Awards & Recognition</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {resumeData.awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-panel p-6 hover-card group"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-accent-secondary/20 rounded-lg group-hover:bg-accent-secondary/30 transition-colors">
                  <Award size={24} className="text-accent-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-100 mb-1">{award.title}</h3>
                  <p className="text-sm text-accent-secondary mb-2">{award.organization} • {award.year}</p>
                  <p className="text-sm text-gray-300">{award.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent/20 to-accent-secondary/20 rounded-full border border-accent/50">
            <Star className="text-accent" size={20} />
            <span className="text-sm font-medium">
              From Mathematics Olympiad to System Software Engineering — A journey of continuous learning
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationPage;
