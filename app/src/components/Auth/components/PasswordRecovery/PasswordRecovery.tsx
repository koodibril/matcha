import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Form, Input, Spin, Button, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { passwordRecovery } from '../../../../ducks/authentication/actions/authentication';

const PasswordRecovery: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation('authentication');

  const handlePasswordRecovery = (info: any) => {
      setLoading(true);
      setMessage('An email has been sent');
      dispatch(passwordRecovery(info.email));
      setLoading(false);
  }

  return (
        <Row justify="center" align="middle">
            <Form
            style={{ margin: '16px 0' }}
            name="signup"
            onFinish={handlePasswordRecovery}
            onFinishFailed={console.error}>

                { message }

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

                <Form.Item>
                    <Spin spinning={loading} >
                        <Button type="primary" htmlType="submit">
                        {t('recover password')}
                        </Button>
                    </Spin>
                </Form.Item>
            </Form>
        </Row>
  )
}

export default PasswordRecovery;