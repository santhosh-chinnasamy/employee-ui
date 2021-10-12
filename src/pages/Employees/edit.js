import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import Base from "components/Layout";
import { useHistory } from "react-router";
import { employeeService } from "services";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditEmployee = (props) => {
  const id = props.match.params.id;

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    employeeService
      .getById(id)
      .then((data) => {
        form.setFieldsValue(data);
      })
      .catch((e) => {
        form.setFieldsValue({});
        console.error(e);
      });
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    const redirect = { pathname: "/" };
    employeeService.update(id, values);
    setLoading(false);
    history.push(redirect);
  };

  const onHandleCancel = () => {
    history.push("/");
  };
  return (
    <Base>
      <Row gutter={[16, { xs: 8, sm: 8, md: 24, lg: 24 }]}>
        <Col xs={24} sm={24} md={24} lg={17} xl={17}>
          <Form
            {...layout}
            form={form}
            name="edit_employee"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label="Name"
              requiredMark
              rules={[
                {
                  required: true,
                  message: "name required",
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              requiredMark
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
            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
              <Row gutter={[16]}>
                <Col>
                  <Button
                    type="secondary"
                    loading={loading}
                    onClick={onHandleCancel}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    submit
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Base>
  );
};

export default EditEmployee;
