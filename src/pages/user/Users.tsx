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
  Pagination,
  Popconfirm,
  Space,
  Switch,
  Table,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  getUserByPage,
  saveUser,
  getUserByUsername,
  updateUserByUsername,
  deleteUserById,
} from "../../services/users";

function Users() {
  const [isShow, setIsShow] = useState(false);
  const [myForm] = Form.useForm();
  const [query, setQuery] = useState({ pageNo: 0, pageSize: 8 });
  const [currentUsername, setCurrentUsername] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    console.log(query);
    getUserByPage(query).then((res) => {
      setData(res.content);
      setTotal(res.totalElements);
      setPageSize(res.size);
    });
  }, [query]);

  useEffect(() => {
    if (!isShow) {
      setCurrentUsername("");
    }
  }, [isShow]);
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
              //TODO search function
              console.log(v);
              if (v.username.length !== 0) {
                console.log("query single");
                getUserByUsername(v.username).then((res) => {
                  if (res.length !== 0) {
                    setData(res);
                  } else {
                    setData([]);
                  }
                });
                message.success("search function");
              } else {
                console.log("query all");
                setQuery({ pageNo: 0, pageSize: pageSize });
              }
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
                // TODO form column switch save and update
                title: "enabled",
                dataIndex: "enabled",
                width: 110,
              },
              {
                title: "operations",
                width: 110,
                render(v: any, r: any) {
                  return (
                    <Space>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setIsShow(true);
                          setCurrentUsername(r.username);
                          myForm.setFieldsValue(r);
                        }}
                      />
                      <Popconfirm
                        title="are you sure to delete this item?"
                        onConfirm={async () => {
                          console.log(r.id);
                          await deleteUserById(r.id);
                          setQuery({ pageNo: 0, pageSize: pageSize });
                        }}
                      >
                        <Button
                          type="primary"
                          icon={<DeleteOutlined />}
                          danger
                        />
                      </Popconfirm>
                    </Space>
                  );
                },
              },
            ]}
            pagination={{
              defaultCurrent: 1,
              total: total,
              pageSize: pageSize,
              onChange(e: any) {
                console.log("onchange", e);
                setQuery({
                  pageNo: e - 1,
                  pageSize: pageSize,
                });
              },
            }}
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
          onFinish={async (v) => {
            //TODO save user
            if (currentUsername) {
              await updateUserByUsername(v);
              message.success("update user succeed");
            } else {
              await saveUser(v);
              message.success("save user succeed");
            }
            setIsShow(false);
            setQuery({ pageNo: 0, pageSize: 2 });
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
