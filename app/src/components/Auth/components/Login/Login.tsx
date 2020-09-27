import React, { useState } from 'react';

import { push as pushState } from 'connected-react-router';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { LoginData } from './Login.d';

import Input from '../../../UI/Input/Input';
import Column from '../../../UI/Column/Column';
import Row from '../../../UI/Row/Row';
import Form from '../../../UI/Form/Form';
import Button from '../../../UI/Button/Button';
import Page from '../../../UI/Page/Page';

import { login } from '../../../../ducks/authentication/actions/authentication';

/*
const LoginAntd: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation('authentication');
  const dispatch = useDispatch();

  const goToSignup = () => dispatch(pushState('/auth/signup'));

  const handleLogin = ({ username, password }: LoginData) => {
    setLoading(true);
    dispatch(login(username, password))
  };

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
*/
const Login: React.FC = () => {
  return (
    <Page>
      <Form>
        <Column>
          <Input />
          <Input />
          <Button type="submit" label="click" onClick={console.log} />
        </Column>
      </Form>

    </Page>
  )
}

export default Login; 