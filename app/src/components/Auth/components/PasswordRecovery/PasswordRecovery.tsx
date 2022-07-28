import React, { useState } from "react";
import { Row, Form, Input, Spin, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useAuthentication } from "src/ducks/authentication/actions/authentication";
import { useNavigation } from "src/ducks/navigation/navigation";

const PasswordRecovery: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { passwordRecovery } = useAuthentication();
  const { t } = useTranslation("authentication");
  const { pushState } = useNavigation();

  const goToLogin = () => pushState("/auth/login");

  const handlePasswordRecovery = (info: any) => {
    setLoading(true);
    passwordRecovery(info.email);
    setLoading(false);
  };

  return (
    <Row justify="center" align="middle">
      <Form
        style={{ margin: "16px 0" }}
        name="signup"
        onFinish={handlePasswordRecovery}
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
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="text" onClick={goToLogin}>
            {t("go_to_login")}
          </Button>
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading}>
            <Button type="primary" htmlType="submit">
              {t("recover password")}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default PasswordRecovery;

