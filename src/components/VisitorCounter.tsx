import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // Using CountAPI - replace 'your-namespace' and 'your-key' with actual values
        // For production, you'll need to create your own namespace/key at https://countapi.xyz
        const namespace = 'gsk-portfolio';
        const key = 'visitor-count';
        
        // Check if we have a cached value (cache for 5 minutes)
        const cached = localStorage.getItem('visitor_count');
        const cacheTime = localStorage.getItem('visitor_count_time');
        
        if (cached && cacheTime) {
          const timeDiff = Date.now() - parseInt(cacheTime);
          if (timeDiff < 5 * 60 * 1000) { // 5 minutes
            setCount(parseInt(cached));
            setLoading(false);
            return;
          }
        }

        // Fetch from CountAPI
        const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
        
        if (response.ok) {
          const data = await response.json();
          setCount(data.value);
          
          // Cache the value
          localStorage.setItem('visitor_count', data.value.toString());
          localStorage.setItem('visitor_count_time', Date.now().toString());
        } else {
          throw new Error('Failed to fetch visitor count');
        }
      } catch (err) {
        console.error('Error fetching visitor count:', err);
        setError(true);
        
        // Use cached value if available
        const cached = localStorage.getItem('visitor_count');
        if (cached) {
          setCount(parseInt(cached));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 glass-panel px-4 py-3 flex items-center space-x-3 group hover:scale-105 transition-transform">
      <div className="flex items-center space-x-2">
        <Users size={18} className="text-accent" />
        <div className="text-sm">
          {loading ? (
            <span className="text-muted">Loading...</span>
          ) : error && !count ? (
            <span className="text-muted">Welcome!</span>
          ) : (
            <>
              <span className="font-semibold text-gray-100">{count?.toLocaleString()}</span>
              <span className="text-muted ml-1">visitors</span>
            </>
          )}
        </div>
      </div>
      
      <div className="hidden group-hover:block text-xs text-muted max-w-[200px] pl-3 border-l border-dark-border">
        Need for validation plagues everyone, still, better than Instagram!
      </div>
    </div>
  );
};

export default VisitorCounter;
