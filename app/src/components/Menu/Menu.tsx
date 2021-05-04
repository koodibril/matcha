import React, {useEffect, useState} from 'react';
import { Menu, Modal } from 'antd';
import { HomeOutlined, MailOutlined, SettingOutlined, LogoutOutlined, UserOutlined, WechatOutlined, MailFilled } from '@ant-design/icons';
import { useAuthentication } from '../../ducks/authentication/actions/authentication';
import ProfileComponent from '../Profile/Profile';
import { useProfile, useProfileActions } from '../../ducks/profile/actions/profile';
import { useMessage, useMessageActions } from "src/ducks/message/actions/message";
import { useNavigation } from 'src/ducks/navigation/navigation';
import { useNotifications, useNotificationsActions } from 'src/ducks/notification/actions/notifications';
import { socket } from '../../App';

const MainMenu: React.FC = () => {
    const [current, setCurrent] = useState(["1"]);
    const [logged, setLogged] = useState("Login");
    const [notif, setNotif] = useState(0);
    const user = localStorage.getItem('user');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [userIsValid, setUserIsValid] = useState(true);

    const message = useMessage();
    const { clearMessage } = useMessageActions();
    const { getNotifications } = useNotificationsActions();
    const notifications = useNotifications();
    const info = useProfile();
    const { getProfileInfo, clearProfile } = useProfileActions();
    const { logout } = useAuthentication();
    const { pushState } = useNavigation();

    socket.on('connection', () => {
      socket.on("yolo", () => {
        console.log("it works!");
      })
      socket.on("notification", () => {
        getNotifications(user);
      });
    });

    const countDown = (text: string, error: boolean) => {
      let secondsToGo = 3;
      let modal: any;
      if (error) {
        modal = Modal.error({
          title: text,
        });
      } else {
        modal = Modal.success({
          title: text,
        });
      }
      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        clearMessage();
        modal.destroy();
      }, secondsToGo * 1000);
    }

    if (user && logged === "Login") {
      setLogged("Logout");
    }

    if (notifications && notifications.notifications) {
      const notificationList = notifications.notifications;
      let nb = 0;
      for (const element of notificationList) {
        if (element.viewed === 'false')
          nb++;
      }
      if (nb !== notif)
        setNotif(nb);
    }

    if (info.payload && info.payload.Valid === true && !userIsValid) {
      setPreviewVisible(false);
      setUserIsValid(true);
    }
    
    if (info.payload && (info.payload.Valid === false || info.payload.Valid === undefined) && userIsValid && window.location.pathname.split('/')[1] !== 'profile') {
      setPreviewVisible(true);
      setUserIsValid(false);
    }

    if (message && message.message) {
      countDown(message.message, message.error);
    }
    
    useEffect(() => {
      if (user) {
        getProfileInfo(user, null);
        getNotifications(user);
      }
    }, [user, getProfileInfo, getNotifications]);

    const handleClick = (key: any) => {
      clearMessage();
      clearProfile();
        if (key.key === "logout") {
            setLogged("Login");
            setCurrent(['auth']);
            logout();
        }
        else {
            setCurrent(key.key);
            pushState('/' + key.key);
        }
    };

    return (
      <>
        <Menu
          onClick={ handleClick }
          selectedKeys={ current }
          mode="horizontal"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>Home</Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>Profile</Menu.Item>
          <Menu.Item key="chat" icon={<WechatOutlined />}>Chat</Menu.Item>
          <Menu.Item key="notifications" icon={notif === 0 ? <MailOutlined /> : <MailFilled />}>Notifications { notif !== 0 ? '(' + notif + ')' : '' }</Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>Settings</Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}> { logged } </Menu.Item>
        </Menu>
        
        <Modal 
        closable={false}
        visible={previewVisible}
        title='You must add some information before you can use our website'
        footer={null}
      >
        <ProfileComponent></ProfileComponent>
      </Modal>
    </>
    );
  }

export default MainMenu;