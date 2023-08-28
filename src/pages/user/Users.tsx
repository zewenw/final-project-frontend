import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
UserAddOutlined,
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
import RoleTransfer from "../../components/RoleTranfer";

function Users() {
  const [isUserShow, setIsUserShow] = useState(false);
  const [isRoleShow, setIsRoleShow] = useState(false);
  const [userForm] = Form.useForm();
  const [query, setQuery] = useState({ pageNo: 0, pageSize: 8 });
  const [currentUsername, setCurrentUsername] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getUserByPage(query).then((res) => {
      setData(res.content);
      setTotal(res.totalElements);
      setPageSize(res.size);
    });
  }, [query]);

  useEffect(() => {
    if (!isUserShow) {
      setCurrentUsername("");
    }
  }, [isUserShow]);
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
                setIsUserShow(true);
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
              if (v.username.length !== 0) {
                getUserByUsername(v.username).then((res) => {
                  if (res.length !== 0) {
                    setData(res);
                  } else {
                    setData([]);
                  }
                });
                message.success("search function");
              } else {
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
                render(v: any, r: any) {
                  return (
                    <Space>
                      <Switch
                        checked={r.enabled}
                        onChange={async () => {
                                                    r.enabled = !r.enabled;
                                                    await updateUserByUsername(r);
                          message.success("enable user succeed");
                          setQuery({ pageNo: 0, pageSize: pageSize });
                        }}
                      />
                    </Space>
                  );
                },
              },
              {
                title: "operations",
                width: 110,
                render(v: any, r: any) {
                  return (
                    <Space>
<Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={() => {
                          setIsRoleShow(true);
                          setCurrentUsername(r.username);
                          userForm.setFieldsValue(r);
                        }}
                      />
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setIsUserShow(true);
                          setCurrentUsername(r.username);
                          userForm.setFieldsValue(r);
                        }}
                      />
                      <Popconfirm
                        title="are you sure to delete this item?"
                        onConfirm={async () => {
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
        open={isUserShow}
        maskClosable={false}
        onCancel={() => setIsUserShow(false)}
        onOk={() => {
          userForm.submit();
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
            setIsUserShow(false);
            setQuery({ pageNo: 0, pageSize: pageSize });
          }}
          labelCol={{ span: 4 }}
          form={userForm}
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
<Modal
        title="Role Edit"
        open={isRoleShow}
        maskClosable={false}
        onCancel={() => setIsRoleShow(false)}
        onOk={() => {
          setIsRoleShow(false)
        }}
        destroyOnClose
      >
        <RoleTransfer username={currentUsername}/>
      </Modal>
    </>
  );
}

export default Users;
