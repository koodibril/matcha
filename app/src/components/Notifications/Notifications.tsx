import React, { useEffect } from 'react';
import { Row } from 'antd';
import { useNotifications, useNotificationsActions } from '../../ducks/notification/actions/notifications';
import { useNavigation } from 'src/ducks/navigation/navigation';

const Notifications: React.FC = () => {
    const user = localStorage.getItem('user');
    
    const notifications = useNotifications();
    const { getNotifications } = useNotificationsActions();
    const { pushState } = useNavigation();
  
    if (!user) pushState('/auth');
    
    useEffect(() => {
      getNotifications(user);
    }, [user, getNotifications]);
    
    const handleNotifications = () => {
      const notificationList = notifications.notifications;
      return (notificationList.map((element: any, index: number) => (
        <Row key={index}>
          VIEWED : {element.viewed} DATE: {element.date} TEXT: {element.text}
        </Row>
      )));
    }

  return (
    <Row>
      {notifications ? handleNotifications() : "You don't have any notifications for now" }
    </Row>
  )
}

export default Notifications;