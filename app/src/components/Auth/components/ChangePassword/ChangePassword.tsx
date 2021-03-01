import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { push as pushState } from "connected-react-router";

import { Row, Form, Input, Spin, Button, Alert } from "antd";

import { useAuthentication } from "src/ducks/authentication/actions/authentication";
import { useNavigation } from "src/ducks/navigation/navigation";
import { useMessage, useMessageActions } from "src/ducks/message/message";

const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [visible, setVisible] = useState(false);

  const message = useMessage();
  const { clearMessage } = useMessageActions();
  const { pushState } = useNavigation();
  const { changePassword } = useAuthentication();
  const { t } = useTranslation("authentication");

  if (message?.message !== "" && visible === false) setVisible(true);

  useEffect(() => {
    const path = window.location.pathname.split("/");

    if (path.length === 4) {
      setToken(path[3]);
    } else pushState("/auth");
  }, [pushState]);

  const handleChangePassword = (info: any) => {
    setLoading(true);
    changePassword(token, info.password);
    setLoading(false);
  };

  const handleClose = () => {
    setVisible(false);
    clearMessage();
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
      pattern: new RegExp("^.*[0-9]$"), // LES REGEX ICI C'EST DE LA GROSSE MERDE (regexp prend pas le \d pour les chiffres, mais pour un char d...)
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
      pattern: new RegExp("^.*[0-9]$"), // LES REGEX ICI C'EST DE LA GROSSE MERDE (regexp prend pas le \d pour les chiffres, mais pour un char d...)
      message: t("password_contain"),
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          "The two passwords that you entered do not match!"
        );
      },
    }),
  ];

  const errorMessage = (
    <Alert
      style={{ margin: "16px 0" }}
      message={message?.message}
      type="error"
      closable
      afterClose={handleClose}
    />
  );

  return (
    <Row justify="center" align="middle">
      <Form
        style={{ margin: "16px 0" }}
        name="signup"
        onFinish={handleChangePassword}
        onFinishFailed={console.error}
      >
        {visible ? errorMessage : null}

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
          rules={confirmPasswordRules}
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

