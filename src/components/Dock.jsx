import React from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { FileText, Briefcase, User, Mail, Download } from 'lucide-react';
import DockItem from './DockItem';
import { useWindowContext } from '../contexts/WindowContext';

const Dock = () => {
  const mouseX = useMotionValue(Infinity);
  const { apps, openApp, activeApp } = useWindowContext();

  const handleMouseMove = (e) => {
    mouseX.set(e.pageX);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
  };

  const dockApps = [
    { id: 'settings', icon: FileText, label: 'Resume & Skills', color: 'bg-gradient-to-tr from-blue-600 to-indigo-500' },
    { id: 'finder', icon: Briefcase, label: 'Featured Projects', color: 'bg-gradient-to-tr from-emerald-600 to-teal-500' },
    { id: 'terminal', icon: User, label: 'About Venkatesh', color: 'bg-gradient-to-tr from-gray-800 to-gray-900' },
    { id: 'mail', icon: Mail, label: 'Contact Me', color: 'bg-gradient-to-tr from-purple-600 to-pink-500' }
  ];

  const RESUME_URL = 'https://1drv.ms/b/c/62249dcca8dcf6f9/IQBeZToGz7iVTZ7tPduUXiYmAZ8zMVF_hCZrxwtV5Exki1A?e=uOnpxh';

  const handleDownloadPDF = () => {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-end gap-3 px-3.5 py-2.5 bg-black/40 border border-white/20 rounded-2xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {dockApps.map((app) => (
          <DockItem
            key={app.id}
            icon={app.icon}
            label={app.label}
            mouseX={mouseX}
            isOpen={apps[app.id].isOpen}
            isActive={activeApp === app.id}
            onClick={() => openApp(app.id)}
          />
        ))}

        {/* Separator line */}
        <div className="w-[1px] h-9 bg-white/20 my-auto mx-0.5" />

        {/* Direct Download PDF Dock Item */}
        <DockItem
          icon={Download}
          label="Download PDF Resume"
          mouseX={mouseX}
          isOpen={false}
          isActive={false}
          onClick={handleDownloadPDF}
        />
      </div>
    </div>
  );
};

export default Dock;
