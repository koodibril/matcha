import React from 'react';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { Col, Row } from 'antd';
import ChangePasswordComponent from './components/Changepassword/ChangePassword';
import ChangeUsernameComponent from './components/ChangeUsername/ChangeUsername';
import ChangeEmailComponent from './components/ChangeEmail/ChangeEmail';
import FilterComponent from './components/Filter/Filter';

const Settings: React.FC = () => {
    const user = localStorage.getItem('user');
    const dispatch = useDispatch();
  
    if (!user) dispatch(pushState('/auth'));
    
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