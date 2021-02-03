import React, { useState } from 'react';

import { Row, Form, Button, Input, Alert } from 'antd';
import { Spin } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { updateProfileInfo } from '../../../../ducks/profile/actions/profile';
import { SignupData } from '../../../Auth/components/Signup/Signup.d';


const UpdateUserInformation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  const { t } = useTranslation('profile');
  const message= useSelector((state: any) => state.message);

  const info = useSelector((state: any) => state.profile);
  
  if (message && message.message !== '' && visible === false) setVisible(true);

  const handleUpdate = (usr: SignupData) => {
    setLoading(true);
    dispatch(updateProfileInfo(usr, user))
    setLoading(false);
  };

  const handleClose = () => {
    setVisible(false);
    dispatch({ type: 'CLEAR_MESSAGE' });
  };

  const errorMessage = (
    <Alert 
      style={{ margin: '16px 0' }} 
      message={ message.message } 
      type="error" 
      closable 
      afterClose={handleClose}/>
  );

  return (
    <Row>
      { info.payload ? (
      <Form
        initialValues= {{
          username: info.payload.Username,
          email: info.payload.Email
        }}
        style={{ margin: '16px 0' }}
        name="update"
        onFinish={handleUpdate}
        onFinishFailed={console.error}>
        
        { visible ? errorMessage : null }

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
      </Form>) : visible ? errorMessage : null }
    </Row>
  )
}

export default UpdateUserInformation;