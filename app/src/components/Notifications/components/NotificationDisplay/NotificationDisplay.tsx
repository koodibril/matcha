import React, { useState } from 'react';
import { Button, Modal, Timeline } from 'antd';
import { useNotificationsActions } from 'src/ducks/notification/actions/notifications';
import ImageHolder from 'src/components/Profile/components/ImageHolder/ImageHolder';
import UserInfoHolderComponent from 'src/components/Profile/components/UserInfoHolder/UserInfoHolder';
import { useProfile, useProfileActions } from 'src/ducks/profile/actions/profile';

const NotificationsDisplay: React.FC<{notifications: any}> = (props) => {
    const [modal, setModal] = useState(false);
    const user = localStorage.getItem('user');

    const { updateNotification } = useNotificationsActions();
    const info = useProfile();
    const { getProfileInfo } = useProfileActions();

    const handleNotifications = () => {
      const notificationList = props.notifications.notifications;
      return (notificationList.map((element: any, index: number) => (
        <Timeline.Item key={index} label={element.date} color={element.viewed === 'true' ? 'green' : 'red'}>
          <Button onMouseEnter={() => handleView(index, element.viewed)} onClick={() => showUser(element.id)} style={element.viewed === 'false' ? {color: 'red'} : {color: 'grey'}} type='text'>{element.text}</Button>
        </Timeline.Item>
      )));
    }

    const handleView = (index: number, viewed: string) => {
        if (viewed === 'false') {
            updateNotification(user, index);
        }
    }

    const showUser = (id: string) => {
      getProfileInfo(user, id);
      setModal(true);
    }

    const handleCancel = () => {
      setModal(false);
    }

  return (
  <>
    <Timeline mode="left" style={{margin: '20px'}}>
      {props.notifications ? handleNotifications() : "You don't have any notifications for now" }
    </Timeline>
          <Modal
          closable={true}
          visible={modal}
          footer={null}
          title={null}
          onCancel={handleCancel}>
          {info.payload ? <ImageHolder reading={true} pictures={info.payload.Pictures}></ImageHolder> : null}
          {info.payload ? <UserInfoHolderComponent info={info.payload}></UserInfoHolderComponent> : null}
        </Modal>
  </>
  )
}

export default NotificationsDisplay;