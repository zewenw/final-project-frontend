import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  Table,
  message,
} from "antd";
import React, { useState } from "react";

function Users() {
  const [isShow, setIsShow] = useState(false);
  const [myForm] = Form.useForm();

  return (
    <>
      <Card
        title="User Management"
        extra={
          <>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setIsShow(true);
              }}
            />
          </>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form
            layout="inline"
            onFinish={(v) => {
              console.log(v);
              //TODO search function
              message.success("search function");
            }}
          >
            <Form.Item label="username" name="username">
              <Input placeholder="please enter username" allowClear/>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                icon={<SearchOutlined />}
              ></Button>
            </Form.Item>
          </Form>
          <Table
            columns={[
              {
                title: "serial",
                width: 80,
              },
              {
                title: "username",
              },
              {
                title: "email",
              },
              {
                title: "createTime",
                width: 200,
              },
              {
                title: "updateTime",
                width: 200,
              },
              {
                title: "enabled",
                width: 110,
              },
              {
                title: "operations",
                width: 110,
              },
            ]}
          />
        </Space>
      </Card>
      <Modal
        title="Edit"
        open={isShow}
        maskClosable={false}
        onCancel={() => setIsShow(false)}
        onOk={() => {
          myForm.submit();
        }}
        destroyOnClose
      >
        <Form
          preserve={false}
          onFinish={(v) => {
            //TODO submit user form function, currently unable to get the switch value
            console.log(v);
            message.success("save user succeed");
          }}
          labelCol={{ span: 4 }}
          form={myForm}
        >
          <Form.Item
            label="username"
            name="username"
            rules={[
              {
                required: true,
                message: "username is required",
              },
            ]}
          >
            <Input placeholder="please enter username" />
          </Form.Item>
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: "username is required",
              },
            ]}
          >
            <Input placeholder="please enter email" />
          </Form.Item>
          <Form.Item label="enabled" name="enabled">
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              defaultChecked
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Users;
