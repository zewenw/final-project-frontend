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

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const MyTransfer = ({ username }) => {
  const [allRole, setAllRole] = useState([]);
  const [ownedRoleKeys, setOwnedRoleKeys] = useState<string[]>([]);
  const [lackedRoleKeys, setLackedRoleKeys] = useState<string[]>([]);
  const [curUsername, setCurUsername] = useState(username);

  useEffect(() => {
  getAllRole().then((res) => {
    const allRoles: RecordType[] = res.map((item: RecordType) => ({
      key: item.id,
      roleCode: item.roleCode,
      roleName: item.roleName,
      roleDescription: item.roleDescription,
    }));
    console.log('all role', allRoles)
    setAllRole(allRoles);
  });
  getLackedRolesByUsername(username).then((res) => {
    const lackedRole: RecordType[] = res.map((item: RecordType) => ({
      key: item.id,
      roleCode: item.roleCode,
      roleName: item.roleName,
      roleDescription: item.roleDescription,
    }));
    const lackedKeys = lackedRole.map(item => item.key)
    console.log('lack role keys', lackedKeys)
    setLackedRoleKeys(lackedKeys);
  });
  }, []);

  const onChange = (
    nextTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[]
  ) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys[0]);
    console.log('curUsername:', curUsername);
    setLackedRoleKeys(nextTargetKeys);
    if(direction === 'left'){
      bindUserWithRole(parseInt(moveKeys[0]), curUsername)
      message.success('bind role with user success')
    }else{
      unbindUserWithRole(parseInt(moveKeys[0]), curUsername)
      message.success('unbind role with user success')
    }
  };

  const onSelectChange = (
    ownedRoleKeys: string[],
    lackedRoleKeys: string[]
  ) => {
    // console.log("sourceSelectedKeys:", sourceSelectedKeys);
    // console.log("targetSelectedKeys:", targetSelectedKeys);
    setOwnedRoleKeys([...ownedRoleKeys, ...lackedRoleKeys]);
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
      dataSource={allRole}
      titles={["Owned Roles", "Roles"]}
      targetKeys={lackedRoleKeys}
      selectedKeys={ownedRoleKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      render={(item) => item.roleCode}
    />
  );
};

export default MyTransfer;
