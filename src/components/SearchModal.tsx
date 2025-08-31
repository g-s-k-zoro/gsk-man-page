import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ExternalLink, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FlexSearch from 'flexsearch';
import { SearchResult } from '../types';
import resumeData from '../data/resume-data.json';

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Initialize FlexSearch index
  const indexRef = useRef<any>(null);

  useEffect(() => {
    // Focus input when modal opens
    inputRef.current?.focus();

    // Initialize FlexSearch
    const index = new FlexSearch.Index({
      tokenize: 'forward',
      cache: true,
      resolution: 9
    });

    // Index content from resume data
    const contentToIndex = [
      // Career entries
      ...resumeData.career.map(c => ({
        id: `career-${c.id}`,
        title: `${c.role} at ${c.company}`,
        text: `${c.role} ${c.company} ${c.description} ${c.technologies.join(' ')} ${c.achievements.join(' ')}`,
        url: '/career',
        section: 'Career'
      })),
      // Projects
      ...resumeData.projects.map(p => ({
        id: `project-${p.id}`,
        title: p.title,
        text: `${p.title} ${p.summary} ${p.description} ${p.technologies.join(' ')}`,
        url: '/projects',
        section: 'Projects'
      })),
      // Education
      ...resumeData.education.map(e => ({
        id: `education-${e.id}`,
        title: `${e.degree} - ${e.institution}`,
        text: `${e.degree} ${e.institution} ${e.achievements.join(' ')}`,
        url: '/education',
        section: 'Education'
      })),
      // Awards
      ...resumeData.awards.map((a, i) => ({
        id: `award-${i}`,
        title: a.title,
        text: `${a.title} ${a.organization} ${a.description}`,
        url: '/education',
        section: 'Awards'
      })),
      // Skills
      {
        id: 'skills',
        title: 'Technical Skills',
        text: `${resumeData.skills.strong.join(' ')} ${resumeData.skills.intermediate.join(' ')} ${resumeData.skills.frameworks.join(' ')}`,
        url: '/career',
        section: 'Skills'
      },
      // Static pages
      {
        id: 'personal',
        title: 'Personal',
        text: 'About me interests hobbies personal life beyond code',
        url: '/personal',
        section: 'Personal'
      },
      {
        id: 'collaboration',
        title: 'Collaboration',
        text: 'Contact connect ideas projects work together collaborate pitch',
        url: '/collaboration',
        section: 'Collaboration'
      },
      {
        id: 'why-not-started',
        title: "Why haven't I started yet?",
        text: 'Procrastination obstacles challenges humor honest',
        url: '/why_not_started',
        section: 'Personal'
      },
      {
        id: 'blogs-puzzles',
        title: 'Blogs & Puzzles',
        text: 'Blog posts puzzles waste time fun interesting technical articles',
        url: '/waste_time',
        section: 'Content'
      },
      {
        id: 'ongoing',
        title: 'Ongoing Projects',
        text: 'Current work in progress active projects kanban board',
        url: '/ongoing',
        section: 'Projects'
      }
    ];

    // Index all content
    contentToIndex.forEach((item, i) => {
      index.add(i, item.text);
    });

    indexRef.current = { index, content: contentToIndex };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    // Search using FlexSearch
    const searchResults = indexRef.current?.index.search(query, { limit: 5 });
    
    if (searchResults && indexRef.current?.content) {
      const mappedResults: SearchResult[] = searchResults.map((idx: number) => {
        const item = indexRef.current.content[idx];
        const snippet = getSnippet(item.text, query);
        
        return {
          id: item.id,
          title: item.title,
          snippet,
          url: item.url,
          score: 1, // FlexSearch doesn't provide scores
          section: item.section
        };
      });
      
      setResults(mappedResults);
    }
    
    setLoading(false);
    setSelectedIndex(0);
  }, [query]);

  const getSnippet = (text: string, query: string): string => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);
    
    if (index === -1) {
      return text.slice(0, 100) + '...';
    }
    
    const start = Math.max(0, index - 40);
    const end = Math.min(text.length, index + query.length + 60);
    let snippet = text.slice(start, end);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    
    return snippet;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      handleResultClick(results[selectedIndex]);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl glass-panel animate-slide-in-top">
        {/* Search Input */}
        <div className="flex items-center border-b border-dark-border p-4">
          <Search size={20} className="text-muted mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for projects, skills, experience..."
            className="flex-1 bg-transparent outline-none text-gray-100 placeholder-muted"
          />
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-dark-border transition-colors ml-2"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {loading && (
            <div className="p-4 text-center text-muted">
              <div className="loading-spinner mx-auto" />
            </div>
          )}
          
          {!loading && query && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted mb-4">No results found for "{query}"</p>
              <a
                href={`mailto:${resumeData.personal.email}?subject=Portfolio Search Query: ${query}`}
                className="inline-flex items-center space-x-2 text-accent hover:underline"
              >
                <Mail size={16} />
                <span>Couldn't find? Email me</span>
              </a>
            </div>
          )}
          
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className={`w-full text-left p-4 border-b border-dark-border hover:bg-dark-border/50 transition-colors ${
                index === selectedIndex ? 'bg-dark-border/50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-100">{result.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-dark-border text-muted">
                      {result.section}
                    </span>
                  </div>
                  <p className="text-sm text-muted line-clamp-2">{result.snippet}</p>
                </div>
                <ExternalLink size={16} className="text-muted ml-2 mt-1" />
              </div>
            </button>
          ))}
        </div>

        {/* Instructions */}
        {query === '' && (
          <div className="p-4 border-t border-dark-border">
            <div className="flex items-center justify-between text-xs text-muted">
              <div className="flex items-center space-x-4">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-dark-border rounded">↑↓</kbd> Navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-dark-border rounded">Enter</kbd> Select
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-dark-border rounded">Esc</kbd> Close
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
