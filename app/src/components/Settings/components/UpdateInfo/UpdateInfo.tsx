import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Row, Form, Input, Spin, Button } from "antd";

import { useAuthentication } from "src/ducks/authentication/actions/authentication";
import { useProfile } from "src/ducks/profile/actions/profile";

const UpdateInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem('user');

  const { updateUserInfo } = useAuthentication();
  const info = useProfile();
  const { t } = useTranslation("authentication");

  const handleUpdate = (info: any) => {
    setLoading(true);
    console.log(info);
    updateUserInfo(user, info);
    setLoading(false);
  };

  console.log(info.payload);

  return (
    <Row>
        {info.payload ? 
      <Form
        style={{ margin: "16px", width: "100%" }}
        name="changeUser"
        fields={[{
                name: ['email'],
                value: info.payload.Email
            },
            {
                name: ['firstname'],
                value: info.payload.Firstname
            },
            {
                name: ['lastname'],
                value: info.payload.Lastname
            },
            {
                name: ['username'],
                value: info.payload.Username
            },
        ]}
        onFinish={handleUpdate}
      >
        <Form.Item
          label={t("email")}
          name="email"
          rules={[
            {
              required: true,
              message: t("email_missing"),
              type: "email",
            },
          ]}
        >
          <Row justify="start" align="middle" style={{width: "100%"}}>
              <Form.Item name='email'>
                <Input />
              </Form.Item>
          </Row>
        </Form.Item>
        <Form.Item
          label={t("Firstname")}
          name="Firstname"
          rules={[
            {
              required: true,
              message: t("firstname_missing"),
            },
          ]}
        >
          <Row justify="start" align="middle" style={{width: "100%"}}>
              <Form.Item name="firstname">
                <Input/>
              </Form.Item>
          </Row>
        </Form.Item>
        <Form.Item
          label={t("Lastname")}
          name="lastname"
          rules={[
            {
              required: true,
              message: t("lastname_missing"),
            },
          ]}
        >
          <Row justify="start" align="middle" style={{width: "100%"}}>
              <Form.Item name="lastname">
            <Input/>

              </Form.Item>
          </Row>
        </Form.Item>
        <Form.Item
          label={t("username")}
          name="username"
          rules={[
            {
              required: true,
              message: t("username_missing"),
            },
          ]}
        >
          <Row justify="start" align="middle" style={{width: "100%"}}>
              <Form.Item name="username">

            <Input />
              </Form.Item>
          </Row>
        </Form.Item>
              <Spin spinning={loading}>
                <Button type="primary" htmlType="submit">
                  {t("update info")}
                </Button>
              </Spin>
      </Form>
        : null}
    </Row>
  );
};

export default UpdateInfo;
