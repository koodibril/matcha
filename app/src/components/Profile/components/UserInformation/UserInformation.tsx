import React, { useState } from 'react';

import { Row, Form, Button, Input, Alert } from 'antd';
import { Spin } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { UserInformationData } from './UserInformation.d';

import { getProfileInfo } from '../../../../ducks/profile/actions/profile';


const UserInformation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const user = localStorage.getItem('user');

  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const selectMessage = (state: any) => state.message;
  const { message } = useSelector(selectMessage);

  const test = (user: any) => {
    dispatch(getProfileInfo(user));
  }

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
        
        { visible ? (<Alert style={{ margin: '16px 0' }} message={ message } type="error" closable afterClose={handleClose}/>) : null }

        <Form.Item
          label={t('username')}
          name="username">
          <Input />
        </Form.Item>

        <Form.Item
          label={t('email')}
          name="email">
          <Input />
        </Form.Item>

        <Form.Item
          label={t('firstname')}
          name="firstname">
          <Input />
        </Form.Item>

        <Form.Item
          label={t('lastname')}
          name="lastname">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
              {t('change password')}
        </Button>

        <Form.Item>
          <Spin spinning={loading} >
            <Button onClick={() => test(user)} type="primary" htmlType="submit">
              {t('change information')}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default UserInformation;