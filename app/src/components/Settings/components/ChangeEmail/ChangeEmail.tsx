import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Row, Form, Input, Spin, Button } from "antd";

import { useAuthentication } from "src/ducks/authentication/actions/authentication";

const ChangeEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem('user');

  const { updateEmail } = useAuthentication();
  const { t } = useTranslation("authentication");

  const handleChangeEmail = (info: any) => {
    setLoading(true);
    updateEmail(user, info.email);
    setLoading(false);
  };

  return (
    <Row>
      <Form
        style={{ margin: "16px", width: "100%" }}
        name="changeEmail"
        onFinish={handleChangeEmail}
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
            <Input style={{width: "50%"}}/>
              <Spin spinning={loading}>
                <Button type="primary" htmlType="submit">
                  {t("update email")}
                </Button>
              </Spin>
          </Row>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default ChangeEmail;
