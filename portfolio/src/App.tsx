import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GraphNavigation from './components/GraphNavigation';
import Header from './components/Header';
import VisitorCounter from './components/VisitorCounter';
import SearchModal from './components/SearchModal';

// Pages
import CareerPage from './pages/CareerPage';
import PersonalPage from './pages/PersonalPage';
import EducationPage from './pages/EducationPage';
import ProjectsPage from './pages/ProjectsPage';
import OngoingPage from './pages/OngoingPage';
import WhyNotStartedPage from './pages/WhyNotStartedPage';
import WasteTimePage from './pages/WasteTimePage';
import CollaborationPage from './pages/CollaborationPage';

import siteStructure from './data/site-structure.json';
import { GraphNode } from './types';

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleNodeHover = (node: GraphNode | null) => {
    // Just for potential future use or debugging
    // The tooltip is now handled within GraphNavigation component
  };

  const handleNodeClick = (node: GraphNode) => {
    navigate(`/${node.id}`);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100">
      <Header onSearchClick={() => setShowSearch(true)} />
      
      <main className="relative">
        <Routes>
          <Route path="/" element={
            <div className="h-[calc(100vh-80px)] relative overflow-hidden">
              <GraphNavigation
                nodes={siteStructure.nodes}
                links={siteStructure.links}
                onNodeHover={handleNodeHover}
                onNodeClick={handleNodeClick}
              />
            </div>
          } />
          <Route path="/career" element={<div className="container mx-auto px-4 py-8"><CareerPage /></div>} />
          <Route path="/personal" element={<div className="container mx-auto px-4 py-8"><PersonalPage /></div>} />
          <Route path="/education" element={<div className="container mx-auto px-4 py-8"><EducationPage /></div>} />
          <Route path="/projects" element={<div className="container mx-auto px-4 py-8"><ProjectsPage /></div>} />
          <Route path="/ongoing" element={<div className="container mx-auto px-4 py-8"><OngoingPage /></div>} />
          <Route path="/why_not_started" element={<div className="container mx-auto px-4 py-8"><WhyNotStartedPage /></div>} />
          <Route path="/waste_time" element={<div className="container mx-auto px-4 py-8"><WasteTimePage /></div>} />
          <Route path="/collaboration" element={<div className="container mx-auto px-4 py-8"><CollaborationPage /></div>} />
        </Routes>
      </main>

      <VisitorCounter />
      
      {showSearch && (
        <SearchModal onClose={() => setShowSearch(false)} />
      )}
    </div>
  );
}

export default App;
