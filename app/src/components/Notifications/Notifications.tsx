import React, { useEffect } from 'react';
import { useNotifications, useNotificationsActions } from '../../ducks/notification/actions/notifications';
import { useNavigation } from 'src/ducks/navigation/navigation';
import NotificationsDisplayComponent from './components/NotificationDisplay/NotificationDisplay';

const Notifications: React.FC = () => {
    const user = localStorage.getItem('user');
    
    const notifications = useNotifications();
    const { getNotifications } = useNotificationsActions();
    const { pushState } = useNavigation();
  
    if (!user) pushState('/auth');
    
    useEffect(() => {
      if (user) {
        getNotifications(user);
      }
    }, [user, getNotifications]);

  return (
    <>
      {notifications.notifications ? <NotificationsDisplayComponent notifications={notifications}/> : "You don't have any notifications for now" }
    </>
  )
}

export default Notifications;