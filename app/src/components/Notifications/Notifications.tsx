import React, { useEffect } from 'react';
import { useNotifications, useNotificationsActions } from '../../ducks/notification/actions/notifications';
import { useNavigation } from 'src/ducks/navigation/navigation';
import NotificationsDisplayComponent from './components/NotificationDisplay/NotificationDisplay';
import { Button, Row } from 'antd';

const Notifications: React.FC = () => {
    const user = localStorage.getItem('user');
    
    const notifications = useNotifications();
    const { getNotifications, clearNotifications } = useNotificationsActions();
    const { pushState } = useNavigation();
  
    if (!user) pushState('/auth');
    
    useEffect(() => {
      if (user) {
        getNotifications(user);
      }
    }, [user, getNotifications]);

    const handleClick = () => {
      clearNotifications(user);
    }

  return (
    <>
    <Row justify='center'>
      <Button onClick={handleClick}> Clear Notifications </Button>
    </Row>
      {notifications.notifications ? <NotificationsDisplayComponent notifications={notifications}/> : "You don't have any notifications for now" }
    </>
  )
}

export default Notifications;