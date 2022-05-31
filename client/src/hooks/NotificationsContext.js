import React, { cloneElement, createContext, 
  useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { NotificationsContainer1 } from 'components/notificationsContainer';

const NotificationsContext = createContext({});

const NotificationsProvider = (props)=> {
  const { children } = props;
  const [notifications, updateNotifications] = useState({});

  const add = (Notification, notificationProps, _notificationId)=> {
    const notificationId = _notificationId || nanoid();
    const notificationsQuantity = Object.values(notifications).length;
    const lastNotificationId = Object.keys(notifications)[notificationsQuantity - 1];

    if(notificationsQuantity === 3) {
      delete notifications[lastNotificationId];
      updateNotifications({...notifications});
    }

    const WrappedNotification = ({ notifications })=> {
      const [willHiddenNotification, setWillHiddenNotification] = useState(false);
      const firstNotificationId = Object.keys(notifications)[0];
      const notificationsQuantity = Object.values(notifications).length;

      const hideNotification = (timeout)=> { 
        setWillHiddenNotification(true);

        setTimeout(()=> { 
          delete notifications[notificationId];
          updateNotifications({...notifications});
        }, timeout);
      }

      if(firstNotificationId === notificationId && 
        notificationsQuantity >= 3 &&
        !willHiddenNotification)
        hideNotification(500);

      return <Notification {...notificationProps} 
        willHiddenNotification={willHiddenNotification}
        hideNotification={hideNotification}/>
    }

    notifications[notificationId] = <WrappedNotification 
      key={notificationId}/>;

    updateNotifications({...notifications});
  }

  return (
    <NotificationsContext.Provider value={{add}}>
      {children}
      <NotificationsContainer1>
        {Object.values(notifications).map((notification)=> 
          cloneElement(notification, {notifications}))}
      </NotificationsContainer1>
    </NotificationsContext.Provider>
  )
}

const useNotifications = ()=> {
  return useContext(NotificationsContext);
}

export { NotificationsProvider, useNotifications };