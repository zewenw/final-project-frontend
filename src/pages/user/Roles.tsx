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
  getRoleByPage,
  saveRole,
  getRoleByRoleCode,
  updateRoleById,
  deleteUserById,
} from "../../services/role";
import RoleTransfer from "../../components/RoleTranfer";
import PermissionTransfer from "../../components/PermissionTransfer";

function Roles() {
  const [isRoleShow, setIsRoleShow] = useState(false);
  const [isPermissionShow, setIsPermissionShow] = useState(false);
  const [userForm] = Form.useForm();
  const [query, setQuery] = useState({ pageNo: 0, pageSize: 8 });
  const [currentRoleId, setCurrentRoleId] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getRoleByPage(query).then((res) => {
      setData(res.content);
      setTotal(res.totalElements);
      setPageSize(res.size);
    });
  }, [query]);

  useEffect(() => {
    if (!isRoleShow) {
      setCurrentRoleId("");
    }
  }, [isRoleShow]);
  return (
    <>
      <Card
        title="Role Management"
        extra={
          <>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setIsRoleShow(true);
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
              if (v.roleCode.length !== 0) {
                getRoleByRoleCode(v.roleCode).then((res) => {
                  if (res !== null) {
                    setData([res]);
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
            <Form.Item label="roleCode" name="roleCode">
              <Input placeholder="please enter role code" allowClear />
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
                title: "roleCode",
                dataIndex: "roleCode",
              },
              {
                title: "roleName",
                dataIndex: "roleName",
              },
              {
                title: "roleDescription",
                dataIndex: "roleDescription",
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
                title: "operations",
                width: 110,
                render(v: any, r: any) {
                  return (
                    <Space>
                      <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={() => {
                          setIsPermissionShow(true);
                          setCurrentRoleId(r.id);
                          userForm.setFieldsValue(r);
                        }}
                      />
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setIsRoleShow(true);
                          setCurrentRoleId(r.id);
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
        title="Edit Role"
        open={isRoleShow}
        maskClosable={false}
        onCancel={() => setIsRoleShow(false)}
        onOk={() => {
          userForm.submit();
        }}
        destroyOnClose
      >
        <Form
          preserve={false}
          onFinish={async (v) => {
            //TODO save role
            if (currentRoleId) {
              v.id = currentRoleId
              await updateRoleById(v);
              message.success("update role succeed");
            } else {
              await saveRole(v);
              message.success("save role succeed");
            }
            setIsRoleShow(false);
            setQuery({ pageNo: 0, pageSize: pageSize });
          }}
          labelCol={{ span: 7 }}
          form={userForm}
        >
          <Form.Item
            label="roleCode"
            name="roleCode"
            rules={[
              {
                required: true,
                message: "roleCode is required",
              },
            ]}
          >
            <Input disabled={currentRoleId.length === 0 ? false : true} placeholder="please enter role code" />
          </Form.Item>
          <Form.Item
            label="roleName"
            name="roleName"
            rules={[
              {
                required: true,
                message: "roleName is required",
              },
            ]}
          >
            <Input placeholder="please enter roleName" />
          </Form.Item>
          <Form.Item
            label="roleDescription"
            name="roleDescription"
            rules={[
              {
                required: true,
                message: "roleDescription is required",
              },
            ]}
          >
            <Input placeholder="please enter role description" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Permission Edit"
        open={isPermissionShow}
        maskClosable={false}
        onCancel={() => setIsPermissionShow(false)}
        onOk={() => {
          setIsPermissionShow(false);
        }}
        destroyOnClose
      >
        <PermissionTransfer roleId={currentRoleId} />
      </Modal>
    </>
  );
}

export default Roles;
