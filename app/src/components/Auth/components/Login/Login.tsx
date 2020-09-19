import React from 'react';

import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};;

const Login: React.FC = () => {
  const { t } = useTranslation('authentication');
  const onFinish = () => console.log('On Finish');
  const onFinishFailed = () => console.log('On Finish Failed');

  return (
    <Row justify="center" align="middle">
      <Col span={8} >

        <Form
          {...layout}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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
          <Form.Item
            {...tailLayout}
            name="remember"
            valuePropName="checked">
            <Checkbox>{t('remember_user')}</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {t('submit')}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Login; 