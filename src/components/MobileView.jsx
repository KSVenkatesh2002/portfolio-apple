import React, { useState } from 'react';
import { FileText, Briefcase, User, Mail, ChevronLeft, Battery, Wifi, Signal, Download, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useWindowContext } from '../contexts/WindowContext';

import TerminalApp from './TerminalApp';
import FinderApp from './FinderApp';
import SettingsApp from './SettingsApp';
import MailApp from './MailApp';
import meImg from '../assets/me.png';

const appsData = [
  { id: 'settings', icon: FileText, label: 'Resume', color: 'bg-blue-600 text-white' },
  { id: 'finder', icon: Briefcase, label: 'Projects', color: 'bg-emerald-600 text-white' },
  { id: 'terminal', icon: User, label: 'About', color: 'bg-gray-800 text-white' },
  { id: 'mail', icon: Mail, label: 'Contact', color: 'bg-purple-600 text-white' }
];

const MobileView = () => {
  const { openApp, closeApp, apps } = useWindowContext();
  const [time, setTime] = useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const RESUME_URL = 'https://1drv.ms/b/c/62249dcca8dcf6f9/IQBeZToGz7iVTZ7tPduUXiYmAZ8zMVF_hCZrxwtV5Exki1A?e=uOnpxh';

  const handleDownloadPDF = () => {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  // Check if any app is active full-screen
  const activeAppId = Object.values(apps).find(app => app.isOpen)?.id;

  if (activeAppId) {
    const renderAppContent = () => {
      switch (activeAppId) {
        case 'terminal': return <div className="h-full w-full bg-[#1e1e1e] pt-12"><TerminalApp inMobileMode /></div>;
        case 'finder': return <div className="h-full w-full bg-macOS-bg pt-12"><FinderApp inMobileMode /></div>;
        case 'settings': return <div className="h-full w-full bg-macOS-bg pt-12"><SettingsApp inMobileMode /></div>;
        case 'mail': return <div className="h-full w-full bg-macOS-bg pt-12"><MailApp inMobileMode /></div>;
        default: return null;
      }
    };

    return (
      <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center">
        {/* iOS App Navigation Bar */}
        <div className="absolute top-0 w-full h-12 bg-black/80 backdrop-blur-md flex items-center justify-between px-3 z-50 text-white border-b border-white/10">
          <button 
            onClick={() => closeApp(activeAppId)}
            className="flex items-center text-blue-400 font-medium text-xs px-2 py-1 bg-white/10 rounded-lg cursor-pointer"
          >
            <ChevronLeft size={18} className="-ml-1" />
            Home
          </button>
          <div className="font-semibold text-xs truncate max-w-[200px]">
            {apps[activeAppId].title.split(' — ')[0]}
          </div>
          <button 
            onClick={handleDownloadPDF}
            className="p-1.5 bg-blue-600 text-white rounded-lg text-xs cursor-pointer"
          >
            <Download size={14} />
          </button>
        </div>
        
        {/* App Content wrapper */}
        <div className="w-full h-full flex-1 relative overflow-hidden">
          {renderAppContent()}
        </div>
      </div>
    );
  }

  // Render iOS Home Screen
  return (
    <div className="fixed inset-0 z-50 flex flex-col text-white">
      {/* iOS Status Bar */}
      <div className="h-10 w-full flex justify-between items-center px-5 pt-2 text-xs font-semibold select-none">
        <div>{format(time, 'h:mm')}</div>
        <div className="flex items-center space-x-1.5 opacity-90">
          <Signal size={14} className="stroke-[3]" />
          <Wifi size={14} className="stroke-[3]" />
          <Battery size={16} />
        </div>
      </div>

      {/* HR Greeting Card */}
      <div className="mx-5 mt-4 p-4 bg-black/40 border border-white/15 rounded-3xl backdrop-blur-xl shadow-lg space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/30 shrink-0">
            <img src={meImg} alt="VENKATESH K S" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-base font-bold">VENKATESH K S</h2>
            <p className="text-xs text-blue-300 font-medium">MERN Stack / React Developer</p>
            <p className="text-[10px] text-white/60 flex items-center gap-1 mt-0.5">
              <MapPin size={10} /> Tiruppur, Tamil Nadu
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => openApp('settings')}
            className="flex items-center justify-center gap-1 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            <FileText size={14} />
            <span>Resume</span>
          </button>
          <button
            onClick={() => openApp('finder')}
            className="flex items-center justify-center gap-1 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            <Briefcase size={14} />
            <span>Projects</span>
          </button>
        </div>
      </div>

      {/* App Grid */}
      <div className="flex-1 px-6 pt-6">
        <div className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-3 px-1">
          Apps & Portfolio
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-6">
          {appsData.map(app => (
            <div key={app.id} className="flex flex-col items-center group cursor-pointer" onClick={() => openApp(app.id)}>
              <div className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center mb-1.5 shadow-md active:opacity-70 transition-opacity ${app.color}`}>
                <app.icon size={28} strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-medium text-white/90 truncate max-w-full">{app.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* iOS Dock */}
      <div className="mx-4 mb-6 mt-auto px-4 py-4 bg-white/15 backdrop-blur-2xl rounded-3xl flex justify-around border border-white/10">
        {appsData.map(app => (
           <div key={`dock-${app.id}`} className="cursor-pointer active:opacity-70 transition-opacity" onClick={() => openApp(app.id)}>
             <div className={`w-[54px] h-[54px] rounded-2xl flex items-center justify-center shadow-md ${app.color}`}>
               <app.icon size={26} strokeWidth={1.5} />
             </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default MobileView;
