import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Wifi, Battery, Search, Command, Download, Sparkles } from 'lucide-react';
import { useWindowContext } from '../contexts/WindowContext';

const TopMenuBar = () => {
  const { activeApp, apps } = useWindowContext();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeAppTitle = activeApp ? apps[activeApp].title.split(' — ')[0] : 'Venkatesh Portfolio';

  const RESUME_URL = 'https://1drv.ms/b/c/62249dcca8dcf6f9/IQBeZToGz7iVTZ7tPduUXiYmAZ8zMVF_hCZrxwtV5Exki1A?e=uOnpxh';

  const handleDownloadPDF = () => {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 px-3 flex items-center justify-between text-xs font-medium z-[150] text-white backdrop-blur-xl bg-black/40 border-b border-white/10 select-none">
      {/* Left side */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          <Command size={14} className="text-blue-400" />
          <span className="font-bold text-white">{activeAppTitle}</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-3 text-white/70 text-[11px]">
          <span className="hover:text-white cursor-pointer">File</span>
          <span className="hover:text-white cursor-pointer">View</span>
          <span className="hover:text-white cursor-pointer">Resume</span>
          <span className="hover:text-white cursor-pointer">Projects</span>
          <span className="hover:text-white cursor-pointer">Help</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={handleDownloadPDF}
          className="hidden sm:flex items-center gap-1 bg-blue-600/80 hover:bg-blue-600 text-white px-2 py-0.5 rounded text-[11px] font-semibold transition-all"
        >
          <Download size={12} />
          <span>Resume PDF</span>
        </button>

        <div className="hidden sm:flex items-center space-x-3 text-white/80">
          <Search size={13} className="cursor-pointer hover:text-white" />
          <Wifi size={13} className="cursor-pointer hover:text-white" />
          <Battery size={13} className="cursor-pointer hover:text-white" />
        </div>
        
        <div className="text-white/90 text-[11px] font-mono">
          {format(time, 'EEE MMM d   h:mm a')}
        </div>
      </div>
    </div>
  );
};

export default TopMenuBar;
