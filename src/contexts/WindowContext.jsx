import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const WindowContext = createContext();

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowContext must be used within a WindowProvider');
  }
  return context;
};

// Apps are defined by ID: 'terminal', 'finder', 'settings', 'mail'
export const WindowProvider = ({ children }) => {
  // Apps are defined by ID: 'terminal', 'finder', 'settings', 'mail'
  const [apps, setApps] = useState({
    terminal: { id: 'terminal', title: 'About Venkatesh — Summary', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    finder: { id: 'finder', title: 'Featured Projects — Portfolio', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 2 },
    settings: { id: 'settings', title: 'Resume & Technical Skills', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 10 },
    mail: { id: 'mail', title: 'Contact Venkatesh — Message', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 3 },
  });

  const [activeApp, setActiveApp] = useState(null);
  const [highestZIndex, setHighestZIndex] = useState(10);
  
  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openApp = useCallback((id) => {
    setHighestZIndex((prev) => prev + 1);
    setApps((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: highestZIndex + 1,
      },
    }));
    setActiveApp(id);
  }, [highestZIndex]);

  const closeApp = useCallback((id) => {
    setApps((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
    // Logic to set a new active app if needed could go here
    if (activeApp === id) setActiveApp(null);
  }, [activeApp]);

  const minimizeApp = useCallback((id) => {
    setApps((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
    if (activeApp === id) setActiveApp(null);
  }, [activeApp]);

  const toggleMaximize = useCallback((id) => {
    setHighestZIndex((prev) => prev + 1);
    setApps((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
        zIndex: highestZIndex + 1,
      },
    }));
    setActiveApp(id);
  }, [highestZIndex]);

  const focusApp = useCallback((id) => {
    if (activeApp === id) return;
    setHighestZIndex((prev) => prev + 1);
    setApps((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: highestZIndex + 1,
        isMinimized: false,
      },
    }));
    setActiveApp(id);
  }, [activeApp, highestZIndex]);

  return (
    <WindowContext.Provider
      value={{
        apps,
        openApp,
        closeApp,
        minimizeApp,
        toggleMaximize,
        focusApp,
        activeApp,
        isMobile,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
