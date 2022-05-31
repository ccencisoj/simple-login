import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';

const ModalsContext = React.createContext({});

const ModalsProvider = (props)=> {
  const { children } = props;
  const [modals, updateModals] = React.useState({});

  const add = (Modal, props, _modalId)=> {
    const modalId = _modalId || nanoid();

    if(modalId in modals) return;

    const WrappedModal = ()=> {
      const [willHiddenModal, setWillHiddenModal] = React.useState(false);

      const hideModal = (timeout)=> {
        setWillHiddenModal(true);

        setTimeout(()=> {
          delete modals[modalId];
          updateModals({...modals});
        }, timeout);
      } 

      return <Modal
        {...props}
        willHiddenModal={willHiddenModal} 
        hideModal={hideModal}/>
    }

    modals[modalId] = <WrappedModal key={modalId}/>;
    updateModals({...modals});
  }

  return (
    <ModalsContext.Provider 
      value={{ add }}>
      {children}
      {Object.values(modals)}
    </ModalsContext.Provider>
  )
}

const useModals = ()=> {
  return React.useContext(ModalsContext);
}

export { ModalsProvider, useModals };