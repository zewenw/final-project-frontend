import React, { useEffect, useState } from "react";
import { Transfer, message } from "antd";
import type { TransferDirection } from "antd/es/transfer";
import {
  bindUserWithRole,
  getAllRole,
  getLackedRolesByUsername,
  getOwnedRolesByUsername,
  unbindUserWithRole,
} from "../services/role";
import {
  bindPermissionWithRole,
  getAllPermission,
  getOwnedPermissions,
  unbindPermissionWithRole,
} from "../services/permission";

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const PermissionTransfer = ({ roleId }) => {
  const [allPermission, setAllPermission] = useState([]);
  const [ownedPermissionKeys, setOwnedPermissionKeys] = useState<string[]>([]);
  const [lackedPermissionKeys, setLackedPermissionKeys] = useState<string[]>(
    []
  );

  useEffect(() => {
    getAllPermission().then((res) => {
      const allPermissions: RecordType[] = res.map((item: RecordType) => ({
        key: item.id,
        permissionName: item.permissionName,
        permissionCode: item.permissionCode,
        permissionType: item.permissionType,
        permissionDescription: item.permissionDescription,
      }));
      console.log("all permission", allPermissions);
      setAllPermission(allPermissions);
    });
    getOwnedPermissions(roleId).then((res) => {
      const lackedRole: RecordType[] = res.map((item: RecordType) => ({
        key: item.id,
        permissionName: item.permissionName,
        permissionCode: item.permissionCode,
        permissionType: item.permissionType,
        permissionDescription: item.permissionDescription,
      }));
      const lackedKeys = lackedRole.map((item) => item.key);
      console.log("role id", roleId);
      console.log("owned permission keys", lackedKeys);
      setOwnedPermissionKeys(lackedKeys);
    });
  }, []);

  const onChange = (
    nextTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[]
  ) => {
    console.log("targetKeys:", nextTargetKeys);
    console.log("direction:", direction);
    console.log("moveKeys:", moveKeys[0]);
    setOwnedPermissionKeys(nextTargetKeys);
    if (direction === "left") {
      unbindPermissionWithRole(roleId, moveKeys[0]);
      message.success("unbind permission with role success");
    } else {
      bindPermissionWithRole(roleId, moveKeys[0]);
      message.success("bind permission with role success");
    }
  };

  const onSelectChange = (
    ownedRoleKeys: string[],
    lackedRoleKeys: string[]
  ) => {
    // console.log("sourceSelectedKeys:", sourceSelectedKeys);
    // console.log("targetSelectedKeys:", targetSelectedKeys);
    setLackedPermissionKeys([...ownedRoleKeys, ...lackedRoleKeys]);
  };

  const onScroll = (
    direction: TransferDirection,
    e: React.SyntheticEvent<HTMLUListElement>
  ) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  return (
    <Transfer
      dataSource={allPermission}
      titles={["Permissions", "Owned Permissions"]}
      targetKeys={ownedPermissionKeys}
      selectedKeys={lackedPermissionKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      render={(item) => item.permissionCode}
      listStyle={{
        width: 800,
        height: 400,
      }}
    />
  );
};

export default PermissionTransfer;
