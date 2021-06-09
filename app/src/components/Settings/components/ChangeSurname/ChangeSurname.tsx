import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Row, Form, Input, Spin, Button } from "antd";

import { useAuthentication } from "src/ducks/authentication/actions/authentication";

const ChangeSurname: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem('user');
  
    const { updateSurname } = useAuthentication();
    const { t } = useTranslation("authentication");
  
  const handleChangeSurname = (info: any) => {
    setLoading(true);
    updateSurname(user, info.surname);
    setLoading(false);
  };

  return (
    <Row>
      <Form
        style={{ margin: "16px", width: "100%" }}
        name="changeSurname"
        onFinish={handleChangeSurname}
      >

        <Form.Item
          label={t("Surname")}
          name="surname"
          rules={[
            {
              required: true,
              message: t("surname_missing"),
            },
          ]}
        >
          <Row justify="start" align="middle" style={{width: "100%"}}>
            <Input style={{width: "50%"}}/>
              <Spin spinning={loading}>
                <Button type="primary" htmlType="submit">
                  {t("update surname")}
                </Button>
              </Spin>
          </Row>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default ChangeSurname;
