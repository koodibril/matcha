import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Row, Form, Input, Spin, Button } from "antd";

import { useAuthentication } from "src/ducks/authentication/actions/authentication";

const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem('user');

  const { updatePassword } = useAuthentication();
  const { t } = useTranslation("authentication");

  const handleChangePassword = (info: any) => {
    setLoading(true);
    updatePassword(user, info.password);
    setLoading(false);
  };

  const newPasswordRules = [
    {
      required: true,
      message: t("password_missing"),
    },
    {
      min: 8,
      message: t("password_too_short"),
    },
    {
      pattern:/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-._=+<>])([a-zA-Z0-9!#$%\-._=+<>]+)$/, 
      message: t("password_contain"),
    },
  ];

  const confirmPasswordRules = [
    {
      required: true,
      message: t("password_missing"),
    },
    {
      min: 8,
      message: t("password_too_short"),
    },
    {
      pattern:/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-._=+<>])([a-zA-Z0-9!#$%\-._=+<>]+)$/, 
      message: t("password_contain"),
    }
  ];

  return (
    <Row>
      <Form
        style={{ margin: "16px" }}
        name="changePassword"
        onFinish={handleChangePassword}
      >

        <Form.Item
          label={t("new password")}
          name="password"
          rules={newPasswordRules}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={t("confirm new password")}
          name="checkPassword"
          dependencies={["password"]}
          rules={confirmPasswordRules && 
            [({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading}>
            <Button type="primary" htmlType="submit">
              {t("update password")}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default ChangePassword;
