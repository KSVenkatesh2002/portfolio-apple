import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const DockItem = ({ icon: Icon, label, isOpen, onClick, isActive, mouseX }) => {
  const ref = useRef(null);
  
  // Calculate distance between raw mouseX and this item's center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale goes from 1 to 1.5 when cursor is directly over this item
  const widthSync = useTransform(distance, [-150, 0, 150], [50, 90, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex flex-col items-center group">
      {/* Tooltip */}
      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-3 py-1 rounded-md shadow-xl whitespace-nowrap pointer-events-none">
        {label}
        {/* Tooltip arrow */}
        <div className="absolute left-1/2 -ml-1 top-full w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-black/60"></div>
      </div>

      <motion.button
        ref={ref}
        style={{ width, height: width }}
        onClick={onClick}
        className="relative bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden shrink-0"
        whileTap={{ scale: 0.95 }}
      >
        <Icon size={32} strokeWidth={1.5} className="drop-shadow-md z-10" />
        
        {/* Subtle inner gradient to mimic app icon glass */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-0" />
      </motion.button>
      
      {/* Active Indicator Dot */}
      {isOpen && (
        <div className="absolute -bottom-2.5 w-1 h-1 bg-white/80 rounded-full" />
      )}
    </div>
  );
};

export default DockItem;
