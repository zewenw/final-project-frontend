import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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
import React, { useEffect, useState } from "react";
import { getAllUser } from "../../services/users";

function Users() {
  const [isShow, setIsShow] = useState(false);
  const [myForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllUser(query).then((res) => {
      console.log(res);
      setData(res);
    });
  }, [query]);
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
              <Input placeholder="please enter username" allowClear />
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
            dataSource={data}
            rowKey="id"
            columns={[
              {
                title: "serial",
                dataIndex: "id",
                width: 80,
              },
              {
                title: "username",
                dataIndex: "username",
              },
              {
                title: "email",
                dataIndex: "email",
              },
              {
                title: "createTime",
                dataIndex: "dateCreated",
                width: 200,
              },
              {
                title: "updateTime",
                dataIndex: "lastUpdated",
                width: 200,
              },
              {
                title: "enabled",
                dataIndex: "enabled",
                width: 110,
              },
              {
                title: "operations",
                width: 110,
                render() {
                  return (
                    <Space>
                      <Button type="primary" icon={<EditOutlined />} />
                      <Button type="primary" icon={<DeleteOutlined />} danger />
                    </Space>
                  );
                },
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
