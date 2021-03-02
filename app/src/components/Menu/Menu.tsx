import React, {useEffect, useState} from 'react';
import { Menu, Modal } from 'antd';
import { HomeOutlined, MailOutlined, SettingOutlined, LogoutOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { logout } from '../../ducks/authentication/actions/authentication';
import ProfileComponent from '../Profile/Profile';
import { getProfileInfo } from '../../ducks/profile/actions/profile';
import { useMessage, useMessageActions } from "src/ducks/message/message";

const MainMenu: React.FC = () => {
    const [current, setCurrent] = useState(["1"]);
    const [logged, setLogged] = useState("Login");
    const dispatch = useDispatch();
    const user = localStorage.getItem('user');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [userIsValid, setUserIsValid] = useState(true);
    const info = useSelector((state: any) => state.profile);

    const message = useMessage();
    const { clearMessage } = useMessageActions();

    const countDown = (text: string, error: boolean) => {
      let secondsToGo = 3;
      let modal: any;
      if (error) {
        modal = Modal.error({
          title: text,
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
      } else {
        modal = Modal.success({
          title: text,
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
      }
      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `This modal will be destroyed after ${secondsToGo} second.`,
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
      if (user)
        dispatch(getProfileInfo(user, null));
    }, [user, dispatch]);

    const handleClick = (key: any) => {
      dispatch({ type: 'CLEAR_MESSAGE' });
      dispatch({ type: 'CLEAR_PROFILE' });
        if (key.key === "logout") {
            setLogged("Login");
            setCurrent(['auth']);
            logout(dispatch);
            dispatch(pushState('/'));
        }
        else {
            setCurrent(key.key);
            dispatch(pushState('/' + key.key));
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
          <Menu.Item key="notifications" icon={<MailOutlined />}>Notifications</Menu.Item>
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