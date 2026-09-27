import React from 'react';
import { useWindowContext } from './contexts/WindowContext';
import TopMenuBar from './components/TopMenuBar';
import Dock from './components/Dock';
import MobileView from './components/MobileView';

import TerminalApp from './components/TerminalApp';
import FinderApp from './components/FinderApp';
import SettingsApp from './components/SettingsApp';
import MailApp from './components/MailApp';
import backgroundImg from './assets/background.jpg';
import meImg from './assets/me.png';

import { FileText, Briefcase, User, Mail, Download, MapPin } from 'lucide-react';

function App() {
  const { isMobile, openApp } = useWindowContext();

  const RESUME_URL = 'https://1drv.ms/b/c/62249dcca8dcf6f9/IQBeZToGz7iVTZ7tPduUXiYmAZ8zMVF_hCZrxwtV5Exki1A?e=uOnpxh';

  const handleDownloadPDF = (e) => {
    e.stopPropagation();
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  // Custom wallpaper with Desktop Shortcuts & HR Quick Action Widget
  const DesktopBackground = () => (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <img src={backgroundImg} alt="background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Desktop macOS Icons / Shortcuts (Top Left) */}
      <div className="absolute top-12 left-6 z-30 hidden md:flex flex-col space-y-6 pointer-events-auto">
        <button 
          onClick={() => openApp('settings')}
          className="flex flex-col items-center group w-20 cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-white/20 backdrop-blur-md flex items-center justify-center text-blue-300 shadow-xl group-hover:scale-105 transition-transform">
            <FileText size={28} />
          </div>
          <span className="mt-1.5 text-[11px] font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
            Resume.pdf
          </span>
        </button>

        <button 
          onClick={() => openApp('finder')}
          className="flex flex-col items-center group w-20 cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-600/30 border border-white/20 backdrop-blur-md flex items-center justify-center text-emerald-300 shadow-xl group-hover:scale-105 transition-transform">
            <Briefcase size={28} />
          </div>
          <span className="mt-1.5 text-[11px] font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
            Projects/
          </span>
        </button>

        <button 
          onClick={() => openApp('terminal')}
          className="flex flex-col items-center group w-20 cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-gray-900/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-green-400 shadow-xl group-hover:scale-105 transition-transform">
            <User size={28} />
          </div>
          <span className="mt-1.5 text-[11px] font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
            About_Me.txt
          </span>
        </button>

        <button 
          onClick={() => openApp('mail')}
          className="flex flex-col items-center group w-20 cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-white/20 backdrop-blur-md flex items-center justify-center text-purple-300 shadow-xl group-hover:scale-105 transition-transform">
            <Mail size={28} />
          </div>
          <span className="mt-1.5 text-[11px] font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
            Contact.eml
          </span>
        </button>
      </div>

      {/* HR Recruiter Quick Action Widget (Bottom Right Desktop) */}
      <div className="absolute bottom-20 right-8 hidden lg:flex flex-col items-end z-30 pointer-events-auto">
        <div className="bg-black/40 border border-white/20 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] w-80 text-white flex flex-col">
          {/* Big Profile Photo on Top */}
          <div className="relative w-full h-96 overflow-hidden group">
            <img src={meImg} alt="Venkatesh K S" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="text-lg font-bold tracking-tight text-white drop-shadow-md">Venkatesh K S</h3>
              <p className="text-xs text-blue-300 font-medium">MERN Stack / React Developer</p>
              <p className="text-[11px] text-white/70 flex items-center gap-1 mt-0.5">
                <MapPin size={11} className="text-purple-400" /> Tiruppur, Tamil Nadu
              </p>
            </div>
          </div>

          {/* Remaining Details & Action Buttons Below */}
          <div className="p-4 space-y-3">
            <div className="text-xs text-white/80 bg-white/5 p-2.5 rounded-xl border border-white/10 leading-relaxed">
              👋 Welcome HR & Recruiters! Click below for instant resume navigation.
            </div>

            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                onClick={() => openApp('settings')}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <FileText size={14} />
                <span>View Resume</span>
              </button>
              <button
                onClick={() => openApp('finder')}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Briefcase size={14} />
                <span>Projects</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                <Download size={14} />
                <span>Save PDF</span>
              </button>
              <button
                onClick={() => openApp('mail')}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Mail size={14} />
                <span>Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white font-sans selection:bg-blue-500/30">
      <DesktopBackground />
      
      {isMobile ? (
        <MobileView />
      ) : (
        <>
          <TopMenuBar />
          
          {/* Window Manager Area - pointer-events-none allows clicks to pass through to desktop widgets when not clicking a window */}
          <div className="absolute inset-0 pt-7 pb-20 pointer-events-none z-10">
            <div className="w-full h-full relative pointer-events-none">
              <TerminalApp />
              <FinderApp />
              <SettingsApp />
              <MailApp />
            </div>
          </div>

          <Dock />
        </>
      )}
    </div>
  );
}

export default App;
