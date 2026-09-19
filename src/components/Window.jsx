import React, { useRef, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useWindowContext } from '../contexts/WindowContext';

const Window = ({ id, children, defaultSize = { width: 600, height: 400 }, minSize = { width: 300, height: 200 } }) => {
  const { apps, closeApp, minimizeApp, toggleMaximize, focusApp, activeApp } = useWindowContext();
  const app = apps[id];
  const windowRef = useRef(null);
  const dragControls = useDragControls();
  const [size, setSize] = useState(defaultSize);

  if (!app.isOpen) return null;

  const isActive = activeApp === id;
  const isMaximized = app.isMaximized;
  const isMinimized = app.isMinimized;

  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    focusApp(id);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (moveEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes('e')) {
        newWidth = startWidth + (moveEvent.clientX - startX);
      }
      if (direction.includes('s')) {
        newHeight = startHeight + (moveEvent.clientY - startY);
      }

      setSize({
        width: Math.max(minSize.width, newWidth),
        height: Math.max(minSize.height, newHeight)
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Variants for window animations
  const variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', bounce: 0, duration: 0.3 } },
    minimized: { opacity: 0, scale: 0.5, y: '50vh', x: 0, transition: { duration: 0.3 } },
    maximized: { 
      opacity: 1,
      scale: 1,
      x: 0, 
      y: 0,
      borderRadius: '0px',
      transition: { type: 'spring', bounce: 0, duration: 0.3 } 
    }
  };

  return (
    <motion.div
      layout
      ref={windowRef}
      initial="hidden"
      animate={isMinimized ? 'minimized' : isMaximized ? 'maximized' : 'visible'}
      variants={variants}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false} // Disable dragging on the whole window, only on header
      dragMomentum={false}
      onPointerDown={() => focusApp(id)}
      style={{
        zIndex: app.zIndex,
        width: isMaximized ? '100vw' : `${size.width}px`,
        height: isMaximized ? 'calc(100vh - 28px)' : `${size.height}px`,
        maxWidth: '100%',
        maxHeight: '100%',
        position: isMaximized ? 'fixed' : 'absolute',
        top: isMaximized ? 28 : `max(0px, calc(50% - ${defaultSize.height / 2}px))`,
        left: isMaximized ? 0 : `max(0px, calc(50% - ${defaultSize.width / 2}px))`,
      }}
      className={`
        flex flex-col overflow-hidden bg-macOS-bg/95 backdrop-blur-3xl border border-white/20 shadow-mac-window pointer-events-auto
        ${isMaximized ? 'rounded-none' : 'rounded-xl'}
        ${isActive ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]' : 'opacity-90'}
      `}
    >
      {/* Window Header (Draggable Area) */}
      <div 
        className="h-10 flex items-center justify-between px-4 select-none cursor-default bg-gradient-to-b from-white/10 to-transparent border-b border-white/5 shrink-0"
        onPointerDown={(e) => {
          focusApp(id);
          dragControls.start(e);
        }}
        onDoubleClick={() => toggleMaximize(id)}
      >
        {/* Traffic Lights - stopPropagation onPointerDown prevents dragControls from capturing pointer */}
        <div 
          className="flex space-x-2 items-center w-16 group z-20"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); closeApp(id); }}
            className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border-[0.5px] border-black/20 flex items-center justify-center relative overflow-hidden focus:outline-none cursor-pointer hover:brightness-110 active:scale-95"
            title="Close"
          >
            <span className="opacity-0 group-hover:opacity-100 text-black/80 font-bold text-[9px] leading-none z-10">✕</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
            className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border-[0.5px] border-black/20 flex items-center justify-center relative overflow-hidden focus:outline-none cursor-pointer hover:brightness-110 active:scale-95"
            title="Minimize"
          >
             <span className="opacity-0 group-hover:opacity-100 text-black/80 font-bold text-[11px] leading-none mb-0.5 z-10">-</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
            className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border-[0.5px] border-black/20 flex items-center justify-center relative overflow-hidden focus:outline-none cursor-pointer hover:brightness-110 active:scale-95"
            title="Maximize"
          >
             <span className="opacity-0 group-hover:opacity-100 text-black/80 font-bold text-[9px] leading-none z-10 flex space-x-0.5 max-w-full">
               <span className="rotate-45">⤢</span>
             </span>
          </button>
        </div>

        {/* Title */}
        <div className="text-xs font-semibold text-white/80 absolute left-1/2 -translate-x-1/2 tracking-wide pointer-events-none">
          {app.title}
        </div>
        
        {/* Spacer for right side balance */}
        <div className="w-16"></div>
      </div>

      {/* Window Content Area */}
      <div className="flex-1 w-full h-full min-h-0 text-sm">
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div 
            className="absolute top-0 right-0 w-2 h-full cursor-e-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, 'e')}
          />
          <div 
            className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, 's')}
          />
          <div 
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, 'se')}
          />
        </>
      )}
    </motion.div>
  );
};

export default Window;
