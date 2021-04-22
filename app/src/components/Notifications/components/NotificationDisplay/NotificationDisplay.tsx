import React from 'react';
import { Button, Timeline } from 'antd';
import { useNotificationsActions } from 'src/ducks/notification/actions/notifications';

const NotificationsDisplay: React.FC<{notifications: any}> = (props) => {
    const user = localStorage.getItem('user');

    const { updateNotification } = useNotificationsActions();

    const handleNotifications = () => {
      const notificationList = props.notifications.notifications.reverse();
      return (notificationList.map((element: any, index: number) => (
        <Timeline.Item key={index} label={element.date} color={element.viewed === 'true' ? 'green' : 'red'}>
          <Button onMouseEnter={() => handleView(index, element.viewed)} style={element.viewed === 'false' ? {color: 'red'} : {color: 'grey'}} type='text'>{element.text}</Button>
        </Timeline.Item>
      )));
    }

    const handleView = (index: number, viewed: string) => {
        if (viewed === 'false') {
            updateNotification(user, index);
        }
    }

  return (
    <Timeline mode="left" style={{margin: '20px'}}>
      {props.notifications ? handleNotifications() : "You don't have any notifications for now" }
    </Timeline>
  )
}

export default NotificationsDisplay;