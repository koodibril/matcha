import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Row, Form, Input, Spin, Button } from "antd";

import { useAuthentication } from "src/ducks/authentication/actions/authentication";

const ChangeUsername: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem('user');
  
    const { updateUsername } = useAuthentication();
    const { t } = useTranslation("authentication");
  
  const handleChangeUsername = (info: any) => {
    setLoading(true);
    updateUsername(user, info.username);
    setLoading(false);
  };

  return (
    <Row>
      <Form
        style={{ margin: "16px 0" }}
        name="signup"
        onFinish={handleChangeUsername}
      >

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
          <Input />
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading}>
            <Button type="primary" htmlType="submit">
              {t("update username")}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default ChangeUsername;
