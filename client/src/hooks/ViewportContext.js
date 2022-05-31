import React, { useState, useEffect, 
  createContext, useContext } from 'react';

const ViewportContext = createContext();

const ViewportProvider = (props)=> {
  const { children } = props;

  const [value, setValue] = useState({
    isMobile: false,
    isDesktop: false,
    isTablet: false,
  });

  const updateWindowType = ()=> {
    const isDesktop = window.innerWidth >= 1040;
    const isMobile = window.innerWidth <= 640;
    const isTablet = window.innerWidth > 640 && window.innerWidth < 1040;
    setValue({ isDesktop, isTablet, isMobile });
  }

  useEffect(()=> {
    updateWindowType();
    window.addEventListener("resize", updateWindowType);
    return ()=> window.removeEventListener("resize", updateWindowType);
  }, [props]);

  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  )
}

const useViewport = ()=> {
  return useContext(ViewportContext);
}

export { ViewportProvider, useViewport };