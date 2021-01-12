import React, { useState, useCallback } from 'react';

import { Form, Input, Button, Spin, Row, Alert } from 'antd';
import { push as pushState } from 'connected-react-router';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { LoginData } from './Login.d';

import { login } from '../../../../ducks/authentication/actions/authentication';


const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation('authentication');
  const dispatch = useDispatch();

  const goToSignup = () => dispatch(pushState('/auth/signup'));

  const handleLogin = ({ username, password }: LoginData) => {
    setLoading(true);
    const result = dispatch(login(username, password));
    console.log(result);
    setLoading(false); // To change when I would finally understand how to use this fucking dispatch with a promise..
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Row justify="center" align="middle" >
      <Form
        style={{ margin: '16px 0' }}
        name="login"
        onFinish={handleLogin}
        onFinishFailed={console.error}>
          { visible ? (
          <Alert 
            style={{ margin: '16px 0' }} 
            message='Wrong Username/Password' 
            type="error" 
            closable 
            afterClose={handleClose}/>) : null
          }
        <Form.Item
          label={t('username')}
          name="username"
          rules={[{
            required: true,
            message: t('username_missing')
          }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label={t('password')}
          name="password"
          rules={[{
            required: true,
            message: t('password_missing')
          }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="text" onClick={goToSignup}>
            {t('go_to_signup')}
          </Button>
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading}>
            <Button type="primary" htmlType="submit">
              {t('login')}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default Login; 