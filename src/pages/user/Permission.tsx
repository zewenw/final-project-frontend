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
  getPermissionByPage,
  savePermission,
  getPermissionByCode,
  updatePermissionById,
  deletePermissionById,
} from "../../services/permission";

function Permission() {
  const [isPermissionShow, setIsPermissionShow] = useState(false);
  const [isRoleShow, setIsRoleShow] = useState(false);
  const [userForm] = Form.useForm();
  const [query, setQuery] = useState({ pageNo: 0, pageSize: 8 });
  const [currentPermissionId, setCurrentPermissionId] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getPermissionByPage(query).then((res) => {
      setData(res.content);
      setTotal(res.totalElements);
      setPageSize(res.size);
    });
  }, [query]);

  useEffect(() => {
    if (!isPermissionShow) {
      setCurrentPermissionId("");
    }
  }, [isPermissionShow]);
  return (
    <>
      <Card
        title="Permission Management"
        extra={
          <>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setIsPermissionShow(true);
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
              if (v.permissionCode.length !== 0) {
                getPermissionByCode(v.permissionCode).then((res: any) => {
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
            <Form.Item label="permission code" name="permissionCode">
              <Input placeholder="please enter permission code" allowClear />
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
                title: "permissionName",
                dataIndex: "permissionName",
              },
              {
                title: "permissionCode",
                dataIndex: "permissionCode",
              },
              {
                title: "permissionType",
                dataIndex: "permissionType",
              },
              {
                title: "permissionDescription",
                dataIndex: "permissionDescription",
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
                        icon={<EditOutlined />}
                        onClick={() => {
                          setIsPermissionShow(true);
                          setCurrentPermissionId(r.id);
                          userForm.setFieldsValue(r);
                        }}
                      />
                      <Popconfirm
                        title="are you sure to delete this item?"
                        onConfirm={async () => {
                          await deletePermissionById(r.id);
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
        title="Edit Permission"
        open={isPermissionShow}
        maskClosable={false}
        onCancel={() => setIsPermissionShow(false)}
        onOk={() => {
          userForm.submit();
        }}
        destroyOnClose
      >
        <Form
          preserve={false}
          onFinish={async (v) => {
            //TODO save permission
            if (currentPermissionId) {
              v.id = currentPermissionId;
              await updatePermissionById(v);
              message.success("update permission succeed");
            } else {
              await savePermission(v);
              message.success("save permission succeed");
            }
            setIsPermissionShow(false);
            setQuery({ pageNo: 0, pageSize: pageSize });
          }}
          labelCol={{ span: 7 }}
          form={userForm}
        >
          <Form.Item
            label="permissionName"
            name="permissionName"
            rules={[
              {
                required: true,
                message: "permissionName is required",
              },
            ]}
          >
            <Input disabled={currentPermissionId.length !== 0 ? true : false} placeholder="please enter permission name" />
          </Form.Item>
          <Form.Item
            label="permissionCode"
            name="permissionCode"
            rules={[
              {
                required: true,
                message: "permissionCode is required",
              },
            ]}
          >
            <Input disabled={currentPermissionId.length !== 0 ? true : false}  placeholder="please enter permission code" />
          </Form.Item>
          <Form.Item
            label="permissionType"
            name="permissionType"
            rules={[
              {
                required: true,
                message: "permissionType is required",
              },
            ]}
          >
            <Input placeholder="please enter permission type" />
          </Form.Item>
          <Form.Item
            label="permissionDescription"
            name="permissionDescription"
            rules={[
              {
                required: true,
                message: "permissionDescription is required",
              },
            ]}
          >
            <Input placeholder="please enter permission description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Permission;
