import { Button, Form, Input, Card, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { employeeService } from "services";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (values) => {
    setLoading(true);
    employeeService
      .login(values)
      .then((data) => {
        if (data) {
          history.push("/");
        }
      })
      .catch((e) => console.error(e));
    setLoading(false);
  };

  return (
    <Row gutter={[8, 16]} type="flex" align="middle">
      <Col lg={{ offset: 8 }}>
        <Card size="small" title="Login" style={{ width: 400 }}>
          <Form form={form} name="login" onFinish={handleSubmit}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Invalid email address",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default withRouter(Login);
