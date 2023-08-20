import React, { useEffect, useState } from "react";
import { Transfer, message } from "antd";
import type { TransferDirection } from "antd/es/transfer";
import { bindUserWithRole, getAllRole } from "../services/role";

interface RecordType {
  id: number;
  roleCode: string;
  roleName: string;
  roleDescription: string;
}

const MyTransfer = ({ object }) => {
  const [role, setRole] = useState([]);
  const [curUsername, setCurUsername] = useState(object);

  useEffect(() => {
    getAllRole().then((res) => {
      setRole(res);
    });
  }, []);

  const allRoles: RecordType[] = role.map((item: RecordType) => ({
    key: item.id,
    roleCode: item.roleCode,
    roleName: item.roleName,
    roleDescription: item.roleDescription,
  }));

  const initialTargetKeys = allRoles.map((item) => item.roleCode);

  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onChange = (
    nextTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[]
  ) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys[0]);
    console.log('curUsername:', curUsername);
    setTargetKeys(nextTargetKeys);
    bindUserWithRole(parseInt(moveKeys[0]), curUsername)
    //TODO bind user with role

  };

  const onSelectChange = (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => {
    // console.log("sourceSelectedKeys:", sourceSelectedKeys);
    // console.log("targetSelectedKeys:", targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
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
      dataSource={allRoles}
      titles={["Roles", "Assigned Roles"]}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      render={(item) => item.roleName}
    />
  );
};

export default MyTransfer;
