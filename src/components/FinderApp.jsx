import React, { useState } from 'react';
import { Folder, Train, Scissors, MessageSquare, ExternalLink, Github, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import Window from './Window';

const categories = [
  { id: 'all', name: 'All Featured Projects', icon: Folder },
  { id: 'fullstack', name: 'Full-Stack MERN Apps', icon: Layers },
  { id: 'nextjs', name: 'Next.js & Cloud Apps', icon: Sparkles },
];

const projects = [
  {
    id: 1,
    title: 'Train Ticket Booking System',
    subtitle: 'Mar 2025 – Apr 2025',
    category: 'fullstack',
    description: 'A comprehensive train reservation web application with seat selection logic, PNR tracking, and simulated payment workflows.',
    highlights: [
      'Built a train booking simulation with seat reservation and expiry logic.',
      'Applied JWT-based authentication and protected backend APIs.',
      'Designed PNR tracking, booking history, and simulated payment workflows.'
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'JWT'],
    icon: Train,
    color: 'from-blue-600 to-indigo-700',
    github: 'https://github.com/KSVenkatesh2002/trainticketbooking',
    demo: 'https://trainticketbooking-q9j3.onrender.com'
  },
  {
    id: 2,
    title: 'Dyer Task Management',
    subtitle: 'May 2025 – Jun 2025',
    category: 'nextjs',
    description: 'Specialized task and payment management platform designed for handloom artisans to automate attendance and salary processing.',
    highlights: [
      'Developed a task and payment management system for handloom artisans.',
      'Automated salary calculations based on attendance and work status.',
      'Executed role-based task assignment and payment history views.'
    ],
    tags: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Axios', 'Clerk'],
    icon: Scissors,
    color: 'from-emerald-600 to-teal-700',
    github: 'https://github.com/KSVenkatesh2002/dyer',
    demo: 'https://dyer-handloom.vercel.app'
  },
  {
    id: 3,
    title: 'Realtime Chat Application',
    subtitle: 'Aug 2025 – Sep 2025',
    category: 'fullstack',
    description: 'High-performance real-time messaging application supporting instant 1-on-1 private messaging and group chat rooms.',
    highlights: [
      'Built a real-time chat application supporting private and group messaging.',
      'Enforced online user tracking and group management features.',
      'Optimized WebSocket communication and frontend state using Zustand.'
    ],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Socket.IO', 'Zustand'],
    icon: MessageSquare,
    color: 'from-purple-600 to-pink-700',
    github: 'https://github.com/KSVenkatesh2002/chat-app-socket.io',
    demo: 'https://venkatesh-realtime-chat-app.onrender.com'
  },
];

const FinderApp = ({ inMobileMode }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  if (inMobileMode) {
    return (
      <div className="flex flex-col h-full w-full bg-macOS-bg text-white overflow-hidden">
        {/* Mobile Horizontal Filter Pills */}
        <div className="flex overflow-x-auto gap-2 p-3 bg-black/40 border-b border-white/10 shrink-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer
                ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-white/70 hover:bg-white/20'}
              `}
            >
              <cat.icon size={14} />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Mobile Scrollable Projects List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-20">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                  <project.icon size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{project.title}</h3>
                  <p className="text-[11px] text-blue-300 font-medium">{project.subtitle}</p>
                </div>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-1.5">
                {project.highlights.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-white/70 leading-relaxed">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium bg-black/40 border border-white/10 text-white/80 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  <Github size={14} />
                  <span>Code</span>
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer"
                >
                  <ExternalLink size={14} />
                  <span>Live Project</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const content = (
    <div className="flex flex-col h-full w-full">
      {/* Finder Toolbar */}
      <div className="h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
             <button className="p-1 px-2 rounded-md hover:bg-white/10 opacity-50 cursor-not-allowed text-xs text-white">{'<'}</button>
             <button className="p-1 px-2 rounded-md hover:bg-white/10 opacity-50 cursor-not-allowed text-xs text-white">{'>'}</button>
          </div>
          <div className="text-xs font-mono tracking-wide text-white/80">
            KSVenkatesh2002 / Projects
          </div>
        </div>

        <div className="text-xs text-white/50 font-mono">
          {filteredProjects.length} Verified Projects
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-44 md:w-52 bg-black/25 backdrop-blur-md border-r border-white/10 p-2 flex flex-col space-y-1 overflow-y-auto shrink-0">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1 px-2 mt-2">Filter Projects</div>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2.5 w-full px-2.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer
                ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:bg-white/10 hover:text-white'}
              `}
            >
              <cat.icon size={15} className={activeCategory === cat.id ? 'text-white' : 'text-blue-400'} />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-macOS-bg/40 p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-white/20 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/10 gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                      <project.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
                      <p className="text-xs text-blue-300 font-medium">{project.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
                    >
                      <ExternalLink size={14} />
                      <span>Live Project</span>
                    </a>
                  </div>
                </div>

                <p className="text-sm text-white/80 mt-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-4 space-y-2">
                  {project.highlights.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/70">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/10">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-medium bg-black/40 border border-white/10 text-white/80 px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Window id="finder" defaultSize={{ width: 880, height: 580 }}>
      {content}
    </Window>
  );
};

export default FinderApp;
