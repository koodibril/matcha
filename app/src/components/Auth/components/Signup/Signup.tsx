import React from 'react';

import { push as pushState } from 'connected-react-router';

import { Row, Form, Button, Input } from 'antd';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { SignupData } from './Signup.d';

import { signup } from '../../../../ducks/authentication/actions/authentication';

const Signup: React.FC = () => {
  const { t } = useTranslation('authentication');
  const dispatch = useDispatch();

  const goToLogin = () => dispatch(pushState('/auth/login'))
  const handleSignup = ({ email, username, password }: SignupData) => dispatch(signup(email, username, password));

  return (
    <Row justify="center" align="middle">
      <Form
        name="signup"
        onFinish={handleSignup}
        onFinishFailed={console.error}>
        <Form.Item
          label={t('email')}
          name="email"
          rules={[{
            required: true,
            message: t('email_missing'),
            type: 'email'
          }]}>
          <Input />
        </Form.Item>
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
            message: t('password_missing'),
          }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="text" onClick={goToLogin}>
            {t('go_to_signup')}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('signup')}
          </Button>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default Signup;