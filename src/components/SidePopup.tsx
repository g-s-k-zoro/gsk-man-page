import React from 'react';
import { X, ExternalLink, Tag } from 'lucide-react';
import { GraphNode } from '../types';

interface SidePopupProps {
  node: GraphNode;
  onClose: () => void;
  onNavigate: () => void;
}

const SidePopup: React.FC<SidePopupProps> = ({ node, onClose, onNavigate }) => {
  return (
    <>
      {/* Full screen overlay with translucent background - pointer-events-none to allow graph interaction */}
      <div 
        className="absolute inset-0 pointer-events-none z-40"
        style={{ background: 'linear-gradient(to right, transparent 0%, transparent 50%, rgba(11, 17, 21, 0.4) 100%)' }}
      />
      
      {/* Popup - Overlaid on the right side with translucent background */}
      <div 
        className="absolute right-0 top-0 h-full w-full md:w-[450px] pointer-events-none z-50"
        onClick={(e) => {
          // Stop propagation only on the background
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="h-full flex items-center justify-end p-6">
          <div className="w-full max-w-[400px] bg-dark-panel/95 backdrop-blur-xl border border-dark-border rounded-xl p-6 pointer-events-auto animate-fade-in-right shadow-2xl">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-dark-border/50 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="space-y-4">
              {/* Node indicator */}
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full animate-pulse"
                  style={{ backgroundColor: node.color }}
                />
                <span className="text-xs text-muted uppercase tracking-wider">
                  {node.size === 'large' ? 'Major Section' : node.size === 'medium' ? 'Section' : 'Topic'}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold pr-8">{node.title}</h3>

              {/* Summary */}
              <p className="text-accent text-sm font-medium">{node.summary}</p>

              {/* Description */}
              <p className="text-muted leading-relaxed">{node.description}</p>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={onNavigate}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-accent text-dark-bg rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  <span>View Page</span>
                  <ExternalLink size={16} />
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {getNodeTags(node.id).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-dark-border/50 rounded-full text-xs text-muted"
                  >
                    <Tag size={12} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to get relevant tags for each node
function getNodeTags(nodeId: string): string[] {
  const tagMap: Record<string, string[]> = {
    career: ['Professional', 'Experience', 'Work'],
    personal: ['About Me', 'Interests', 'Life'],
    education: ['Academic', 'Learning', 'Achievements'],
    projects: ['Portfolio', 'Code', 'Open Source'],
    ongoing: ['Current', 'Active', 'WIP'],
    why_not_started: ['Humor', 'Procrastination', 'Real Talk'],
    waste_time: ['Blog', 'Puzzles', 'Fun'],
    collaboration: ['Connect', 'Ideas', 'Contact']
  };
  
  return tagMap[nodeId] || [];
}

export default SidePopup;