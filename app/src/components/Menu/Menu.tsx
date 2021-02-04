import React, {useState} from 'react';
import { Menu, Modal } from 'antd';
import { HomeOutlined, MailOutlined, SettingOutlined, LogoutOutlined, UserOutlined, SearchOutlined, WechatOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { logout } from '../../ducks/authentication/actions/authentication';
import ProfileComponent from '../Profile/Profile';

const MainMenu: React.FC = () => {
    const [current, setCurrent] = useState(["1"]);
    const [logged, setLogged] = useState("Login");
    const dispatch = useDispatch();
    const user = localStorage.getItem('user');
    const valid = localStorage.getItem('valid');
    const [previewVisible, setPreviewVisible] = useState(true);
    const [userIsValid, setUserIsValid] = useState(false);

    if (valid === 'true' && !userIsValid) {
      setPreviewVisible(false);
      setUserIsValid(true);
    }

    if (user && logged === "Login") setLogged("Logout");


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
          <Menu.Item key="search" icon={<SearchOutlined />}>Search</Menu.Item>
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