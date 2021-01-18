import React, { useState } from 'react';

import { push as pushState } from 'connected-react-router';

import { Row, Form, Button, Input, Alert } from 'antd';
import { Spin } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { UserInformationData } from './UserInformation.d';

import { getProfileInfo } from '../../../../ducks/profile/actions/profile';


const UserInformation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const selectMessage = (state: any) => state.message;
  const { message } = useSelector(selectMessage);

  const handleSignup = (user: UserInformationData) => {
    setLoading(true);
    dispatch(getProfileInfo('asd'));
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
          label={t('firstname')}
          name="firstname"
          rules={[{
            required: true,
            message: t('firstname_missing')
          }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label={t('lastname')}
          name="lastname"
          rules={[{
            required: true,
            message: t('lastname_missing')
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
            pattern: new RegExp("^.*[0-9]$"), 
            message: t('password_contain')
          }]}>
          <Input.Password />
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

export default UserInformation;