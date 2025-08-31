import React, { useState, useEffect } from 'react';
import { Clock, GitBranch, AlertCircle, CheckCircle, Archive } from 'lucide-react';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  summary: string;
  status: 'backlog' | 'in-progress' | 'review' | 'done';
  progress: number;
  color: string;
  timeline?: string[];
}

const OngoingPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'portfolio-v2',
      title: 'Portfolio Website v2',
      summary: 'Adding blog section and improving performance',
      status: 'in-progress',
      progress: 65,
      color: '#6ee7b7',
      timeline: ['Started: Dec 2023', 'Target: Jan 2024']
    },
    {
      id: 'rust-learning',
      title: 'Learning Rust',
      summary: 'Deep dive into systems programming with Rust',
      status: 'in-progress',
      progress: 30,
      color: '#f6c85f',
      timeline: ['Started: Nov 2023', 'Ongoing']
    },
    {
      id: 'open-source',
      title: 'Open Source Contributions',
      summary: 'Contributing to various C++ and Python projects',
      status: 'review',
      progress: 80,
      color: '#60a5fa',
      timeline: ['Continuous']
    },
    {
      id: 'ml-course',
      title: 'Machine Learning Course',
      summary: 'Stanford CS229 on Coursera',
      status: 'backlog',
      progress: 0,
      color: '#c084fc',
      timeline: ['Planned: Q1 2024']
    },
    {
      id: 'blog-series',
      title: 'System Programming Blog Series',
      summary: 'Writing about ARM architecture and embedded systems',
      status: 'backlog',
      progress: 15,
      color: '#fb7185',
      timeline: ['Planning phase']
    },
    {
      id: 'side-project',
      title: 'Secret Side Project',
      summary: 'Can\'t reveal yet, but it involves WebAssembly',
      status: 'in-progress',
      progress: 40,
      color: '#34d399',
      timeline: ['Started: Oct 2023']
    }
  ]);

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns = [
    { id: 'backlog', title: 'Backlog', icon: <Archive size={18} /> },
    { id: 'in-progress', title: 'In Progress', icon: <Clock size={18} /> },
    { id: 'review', title: 'Review', icon: <GitBranch size={18} /> },
    { id: 'done', title: 'Done', icon: <CheckCircle size={18} /> }
  ];

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    if (draggedTask) {
      setTasks(tasks.map(task => 
        task.id === draggedTask.id ? { ...task, status } : task
      ));
    }
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Ongoing Projects</h1>
        <p className="text-xl text-muted mb-12">
          Work in progress — because finishing things is overrated (just kidding, I'm working on it!)
        </p>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-panel p-4 mb-8 flex items-center space-x-3"
      >
        <AlertCircle className="text-accent" size={20} />
        <p className="text-sm text-gray-300">
          <span className="font-semibold">Pro tip:</span> Drag and drop tasks between columns to update their status. 
          This data syncs with my GitHub projects (when I remember to update them).
        </p>
      </motion.div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column, index) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id as Task['status'])}
          >
            <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-dark-border">
              {column.icon}
              <h3 className="font-semibold">{column.title}</h3>
              <span className="text-xs text-muted ml-auto">
                {getTasksByStatus(column.id as Task['status']).length}
              </span>
            </div>

            <div className="space-y-3 min-h-[200px]">
              {getTasksByStatus(column.id as Task['status']).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  onDragEnd={handleDragEnd}
                  className="bg-dark-bg border border-dark-border rounded-lg p-4 cursor-move hover:border-accent/50 transition-colors"
                  style={{ borderLeftColor: task.color, borderLeftWidth: '3px' }}
                >
                  <h4 className="font-semibold text-sm mb-1">{task.title}</h4>
                  <p className="text-xs text-muted mb-3">{task.summary}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-muted mb-1">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-dark-border rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${task.progress}%`,
                          backgroundColor: task.color 
                        }}
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  {task.timeline && task.timeline.length > 0 && (
                    <div className="text-xs text-muted space-y-0.5">
                      {task.timeline.map((entry, i) => (
                        <div key={i} className="truncate">{entry}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="glass-panel p-4 text-center">
          <div className="text-3xl font-bold text-accent">{tasks.length}</div>
          <div className="text-sm text-muted">Total Projects</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-3xl font-bold text-accent-secondary">
            {getTasksByStatus('in-progress').length}
          </div>
          <div className="text-sm text-muted">In Progress</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-3xl font-bold text-blue-400">
            {Math.round(tasks.reduce((acc, t) => acc + t.progress, 0) / tasks.length)}%
          </div>
          <div className="text-sm text-muted">Average Progress</div>
        </div>
        <div className="glass-panel p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">
            {getTasksByStatus('done').length}
          </div>
          <div className="text-sm text-muted">Completed</div>
        </div>
      </motion.div>
    </div>
  );
};

export default OngoingPage;
