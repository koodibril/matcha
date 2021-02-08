import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { changePassword } from '../../../../ducks/authentication/actions/authentication';
import { Row, Form, Input, Spin, Button, Alert } from 'antd';
import { useTranslation } from 'react-i18next';

const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.message);
  const { t } = useTranslation('authentication');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.split('/');
    if (path.length === 4) {
      setToken(path[3]);
    } else dispatch(pushState('/auth'));
  }, [dispatch]);

  const handleChangePassword = (password: string) => {
      console.log(password);
      setLoading(true);
      changePassword(token, password);
      setLoading(false);
  }

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
        <Row justify="center" align="middle">
            <Form
            style={{ margin: '16px 0' }}
            name="signup"
            onFinish={handleChangePassword}
            onFinishFailed={console.error}>
                
            { visible ? errorMessage : null }

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

                <Form.Item
                    label={t('password')}
                    name="checkPassword"
                    dependencies={['password']}
                    rules={[{
                        required: true,
                        message: t('password_missing')
                    }, {
                        min: 8,
                        message: t('password_too_short')
                    }, {
                        pattern: new RegExp("^.*[0-9]$"), // LES REGEX ICI C'EST DE LA GROSSE MERDE (regexp prend pas le \d pour les chiffres, mais pour un char d...)
                        message: t('password_contain')
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),
                    ]}>
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

export default ChangePassword;