import React, { useState, useEffect } from 'react';

import { Row, Form, Button, Input, Alert } from 'antd';
import { Spin } from 'antd';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { UserInformationData } from './UserInformation.d';


const UserInformation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const user = localStorage.getItem('user');

  const { t } = useTranslation('profile');
  const message= useSelector((state: any) => state.message);

  const info = useSelector((state: any) => state.profile);
  
  if (message && message.message !== '' && visible === false) setVisible(true);

  const handleSignup = (user: UserInformationData) => {
    setLoading(true);
    setVisible(true);
    setLoading(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Row justify="center" align="middle">
      <Form
        style={{ margin: '16px 0' }}
        name="signup"
        onFinish={handleSignup}
        onFinishFailed={console.error}>
        
        { visible ? (<Alert style={{ margin: '16px 0' }} message={ message.message } type="error" closable afterClose={handleClose}/>) : null }

        <Form.Item
          label={t('username')}
          name="username">
          { info.payload ? (<Input defaultValue={info.payload.Username}/>) : null }
        </Form.Item>

        <Form.Item
          label={t('email')}
          name="email">
          { info.payload ? (<Input defaultValue={info.payload.Email}/>) : null }
        </Form.Item>

        <Form.Item
          label={t('firstname')}
          name="firstname">
          { info.payload ? (<Input defaultValue={info.payload.Firstname}/>) : null }
        </Form.Item>

        <Form.Item
          label={t('lastname')}
          name="lastname">
          { info.payload ? (<Input defaultValue={info.payload.Lastname}/>) : null }
        </Form.Item>

        <Button type="primary" htmlType="submit">
              {t('change password')}
        </Button>

        <Form.Item>
          <Spin spinning={loading} >
            <Button type="primary" htmlType="submit">
              {t('change information')}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default UserInformation;