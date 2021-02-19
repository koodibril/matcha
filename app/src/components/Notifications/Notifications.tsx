import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { Row } from 'antd';
import { getNotifications } from '../../ducks/notification/actions/notifications';

const Notifications: React.FC = () => {
    const user = localStorage.getItem('user');
    const dispatch = useDispatch();
    const notifications = useSelector((state: any) => state.notification);
  
    if (!user) dispatch(pushState('/auth'));
    
    useEffect(() => {
      dispatch(getNotifications(user));
    }, [user, dispatch]);
    
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