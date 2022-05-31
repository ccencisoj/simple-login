import React, { 
  createContext, 
  useContext 
} from 'react';

const AppContext = createContext();

const AppProvider = (props)=> {
  const { children, loadUser, loadProfile } = props;

  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}

const useApp = ()=> {
  return useContext(AppContext);
}

export { AppProvider, useApp };