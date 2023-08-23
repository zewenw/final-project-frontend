import { LogoutOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Space, message } from "antd";
import React, { useState } from "react";
import { getUserByUsername } from "../../services/upload";

function Upload() {
  const [user, setUser] = useState({});

  const onFinish = async (values: any) => {
    console.log("Success:", values.username);
    var val = await getUserByUsername(values.username);
    console.log(val)
    message.success(JSON.stringify(val))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Interact with Other Components
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </>
  );
}

export default Upload;
