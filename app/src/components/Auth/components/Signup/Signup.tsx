import React, { useState } from 'react';

import { push as pushState } from 'connected-react-router';

import { Row, Form, Button, Input, Alert } from 'antd';
import { Spin } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { SignupData } from './Signup.d';

import { signup } from '../../../../ducks/authentication/actions/authentication';

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation('authentication');
  const dispatch = useDispatch();

  const goToLogin = () => dispatch(pushState('/auth/login'))
  const handleSignup = (user: SignupData) => {
    setLoading(true);
    dispatch(signup({ ...user }));
    setLoading(false);
  };

  return (
    <Row justify="center" align="middle">
      <Form
        style={{ margin: '16px 0' }}
        name="signup"
        onFinish={handleSignup}
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
          label={t('password')}
          name="password"
          rules={[{
            required: true,
            message: t('password_missing')
          }, {
            min: 8,
            message: t('password_too_short')
          }, {
            pattern: new RegExp("^.*[0-9]$"), // LES REGEX ICI C'EST DE LA GROSSE MERDE (regexp prend pas le \d pour les chiffres, mais pour un char d...)
            message: t('password_contain')
          }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="text" onClick={goToLogin}>
            {t('go_to_login')}
          </Button>
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading} >
            <Button type="primary" htmlType="submit">
              {t('signup')}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default Signup;