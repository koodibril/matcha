import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Row, Form, Input, Spin, Button } from "antd";

import { useAuthentication } from "src/ducks/authentication/actions/authentication";

const ChangeName: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem('user');
  
    const { updateName } = useAuthentication();
    const { t } = useTranslation("authentication");
  
  const handleChangeName = (info: any) => {
    setLoading(true);
    updateName(user, info.name);
    setLoading(false);
  };

  return (
    <Row>
      <Form
        style={{ margin: "16px", width: "100%" }}
        name="changeName"
        onFinish={handleChangeName}
      >

        <Form.Item
          label={t("Name")}
          name="name"
          rules={[
            {
              required: true,
              message: t("name_missing"),
            },
          ]}
        >
          <Row justify="start" align="middle" style={{width: "100%"}}>
            <Input style={{width: "50%"}}/>
              <Spin spinning={loading}>
                <Button type="primary" htmlType="submit">
                  {t("update name")}
                </Button>
              </Spin>
          </Row>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default ChangeName;
