'use client';

import {createContext, useContext, useState, useEffect} from 'react';
import { usePathname } from 'next/navigation';

const Context = createContext({});

export function DashboardProvider({ children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // set the html tag overflow to hidden
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
  }, []);

  // close Sidebar on route changes
  useEffect(() => {
    return () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
  }, [isOpen, pathname]);

  return (
    <Context.Provider value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}>
      {children}
    </Context.Provider>
  );
}

// custom hook to consume all context values { isOpen, openSidebar, closeSidebar, toggleSidebar }
export function useDashboardContext() {
  return useContext(Context);
}
