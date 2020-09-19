import React from 'react';

import { Form, Input, Button, Checkbox, Row } from 'antd';
import { push as pushState } from 'connected-react-router';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { LoginData } from './Login.d';

import { login } from '../../../../ducks/authentication/actions/authentication';

const Login: React.FC = () => {
  const { t } = useTranslation('authentication');
  const dispatch = useDispatch();

  const goToSignup = () => dispatch(pushState('/auth/signup'));
  const handleLogin = ({ username, password }: LoginData) => dispatch(login(username, password));

  return (
    <Row justify="center" align="middle">
      <Form
        name="login"
        onFinish={handleLogin}
        onFinishFailed={console.error}>
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
          <Button type="primary" htmlType="submit">
            {t('login')}
          </Button>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default Login; 