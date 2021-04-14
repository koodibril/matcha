import React from 'react';
import { Row } from 'antd';
import ChangePasswordComponent from './components/Changepassword/ChangePassword';
import ChangeUsernameComponent from './components/ChangeUsername/ChangeUsername';
import ChangeEmailComponent from './components/ChangeEmail/ChangeEmail';
import { useNavigation } from 'src/ducks/navigation/navigation';

const Settings: React.FC = () => {
    const user = localStorage.getItem('user');
    const { pushState } = useNavigation();
  
    if (!user) pushState('/auth');
    
  return (
        <Row justify="center">
          <ChangeUsernameComponent></ChangeUsernameComponent>
          <ChangeEmailComponent></ChangeEmailComponent>
          <ChangePasswordComponent></ChangePasswordComponent>
        </Row>
  )
}

export default Settings;