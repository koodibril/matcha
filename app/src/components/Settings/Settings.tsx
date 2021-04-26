import React from 'react';
import { Col, Row } from 'antd';
import ChangePasswordComponent from './components/Changepassword/ChangePassword';
import ChangeUsernameComponent from './components/ChangeUsername/ChangeUsername';
import ChangeEmailComponent from './components/ChangeEmail/ChangeEmail';
import FilterComponent from './components/Filter/Filter';
import { useNavigation } from 'src/ducks/navigation/navigation';

const Settings: React.FC = () => {
    const user = localStorage.getItem('user');
    const { pushState } = useNavigation();
  
    if (!user) pushState('/auth');
    
  return (
        <Row justify="center" align="middle">
          <Col>
            <FilterComponent></FilterComponent>
            <ChangeUsernameComponent></ChangeUsernameComponent>
            <ChangeEmailComponent></ChangeEmailComponent>
            <ChangePasswordComponent></ChangePasswordComponent>
          </Col>
        </Row>
  )
}

export default Settings;