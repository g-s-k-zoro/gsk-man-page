import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, Github, Linkedin } from 'lucide-react';
import resumeData from '../data/resume-data.json';

interface HeaderProps {
  onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-dark-bg/80 border-b border-dark-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-dark-bg font-bold text-lg">
                GSK
              </div>
              <div>
                <h1 className="text-lg font-semibold">{resumeData.personal.name}</h1>
                <p className="text-xs text-muted">{resumeData.personal.title} @ {resumeData.personal.company}</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate('/')}
              className="text-muted hover:text-gray-100 transition-colors flex items-center space-x-2"
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            
            <a
              href={resumeData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-gray-100 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            
            <a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-gray-100 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>

            <button
              onClick={onSearchClick}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-dark-panel hover:bg-dark-border transition-colors"
            >
              <Search size={18} />
              <span className="text-sm">Search</span>
              <kbd className="text-xs bg-dark-border px-1.5 py-0.5 rounded">Ctrl+K</kbd>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={onSearchClick}
            className="md:hidden p-2 rounded-lg bg-dark-panel hover:bg-dark-border transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
