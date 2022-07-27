import React, {useEffect, useMemo, useState} from 'react';
import { Menu, Modal } from 'antd';
import { HomeOutlined, MailOutlined, SettingOutlined, LogoutOutlined, UserOutlined, WechatOutlined, MailFilled } from '@ant-design/icons';
import { useAuthentication } from '../../ducks/authentication/actions/authentication';
import ProfileComponent from '../Profile/Profile';
import { useProfile, useProfileActions } from '../../ducks/profile/actions/profile';
import { useMessage, useMessageActions } from "src/ducks/message/actions/message";
import { useNavigation } from 'src/ducks/navigation/navigation';
import { useNotifications, useNotificationsActions } from 'src/ducks/notification/actions/notifications';
import { socket } from '../../hooks/useSocket';
import useToken from 'src/hooks/useToken';

const MainMenu: React.FC = () => {
    const [current, setCurrent] = useState(["1"]);
    const [notif, setNotif] = useState(0);
    const user = localStorage.getItem('user');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [userIsValid, setUserIsValid] = useState(true);
    const [displayMessage, setDisplayMessage] = useState(false);

    const message = useMessage();
    const { clearMessage } = useMessageActions();
    const { getNotifications } = useNotificationsActions();
    const notifications = useNotifications();
    const info = useProfile();
    const { getProfileInfo } = useProfileActions();
    const { logout } = useAuthentication();
    const { pushState } = useNavigation();

    useToken();

    const countDown = (text: string, error: boolean) => {
      setDisplayMessage(true);
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
        setDisplayMessage(false);
      }, secondsToGo * 1000);
    }

    const gotPicture = (pictures: string[]) => {
      let empty = 0
      pictures.forEach(el => {
        if (el === '') {
          empty++;
        }
      })
      if (empty === 5) {
        return false;
      }
      return true;
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

    if (info.payload && info.payload.Valid === true && gotPicture(info.payload.Pictures) && !userIsValid) {
      setPreviewVisible(false);
      setUserIsValid(true);
    }
    
    if (info.payload &&
      (info.payload.Valid === false || info.payload.Valid === undefined || (info.payload.Valid === true && !gotPicture(info.payload.Pictures))) &&
      userIsValid && window.location.pathname.split('/')[1] !== 'profile') {
      setPreviewVisible(true);
      setUserIsValid(false);
    }

    if (message && message.message && !displayMessage) {
      countDown(message.message, message.error);
    }
    
    useEffect(() => {
      if (user) {
        getProfileInfo(user, null);
        getNotifications(user);
        socket.on("notification", () => {
          getNotifications(user);
        });
      }
      socket.on('connection', () => {
        socket.emit("order:update", user);
      });
    }, [user, getProfileInfo, getNotifications]);

    const logged = useMemo(() => {
      if (user) {
        return "Logout";
      } else {
        return "Login";
      }
    }, [user])

    const handleClick = (key: any) => {
      if (user) {
        clearMessage();
          if (key.key === "logout") {
              socket.emit("logout", user);
              setCurrent(['auth']);
              logout();
          }
          else {
              setCurrent(key.key);
              pushState('/' + key.key);
          }
      } else if (key.key === 'logout') {
        pushState('/auth/login');
      }
    };

    // const menuItems = [
    //   {
    //     key: 'home',
    //     icon: <HomeOutlined></HomeOutlined>,
    //     label: 'Home'
    //   },
    //   {
    //     key: 'profile',
    //     icon: <UserOutlined></UserOutlined>,
    //     label: 'Profile'
    //   },
    //   {
    //     key: 'chat',
    //     icon: <WechatOutlined></WechatOutlined>,
    //     label: 'Chat'
    //   },
    //   {
    //     key: 'notifications',
    //     icon: notif === 0 ? <MailOutlined /> : <MailFilled />,
    //     label: 'Notifications ' + (notif !== 0 ? '(' + notif + ')' : '')
    //   },
    //   {
    //     key: 'settings',
    //     icon: <SettingOutlined></SettingOutlined>,
    //     label: 'Settings'
    //   },
    //   {
    //     key: 'logout',
    //     icon: <LogoutOutlined></LogoutOutlined>,
    //     label: logged
    //   },
    // ];

    return (
      <>
        <Menu
          onClick={ handleClick }
          selectedKeys={ current }
          mode="horizontal"
          style={{ display: 'flex', justifyContent: 'center' }}
          // items={menuItems}
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