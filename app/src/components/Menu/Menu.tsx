import React, {useState} from 'react';
import { Menu } from 'antd';
import { HomeOutlined, MailOutlined, SettingOutlined, LogoutOutlined, UserOutlined, SearchOutlined, WechatOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { push as pushState } from 'connected-react-router';

const { SubMenu } = Menu;

const MainMenu: React.FC = () => {
    const [current, setCurrent] = useState(["1"]);
    const [logged, setLogged] = useState("Login");
    const dispatch = useDispatch();
    const user = localStorage.getItem('user');

    if (user && logged === "Login") setLogged("Logout");


    const handleClick = (key: any) => {
        if (key.key === "logout") {
            localStorage.removeItem('user');
            setLogged("Login");
            setCurrent(['auth']);
            dispatch(pushState('/'));
        }
        else {
            setCurrent(key.key);
            dispatch(pushState('/' + key.key));
        }
    };

    return (
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
    );
  }

export default MainMenu;