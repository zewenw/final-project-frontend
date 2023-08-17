import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Avatar from "../assets/avatar.png";

const { Header, Sider, Content } = Layout;

const MyLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const personalOnClick = (e: any) => {
    //TODO personal Information function
    console.log(e);
  };

  const onLogout = () => {
    //TODO Logout function
    alert("logout");
  };

  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={personalOnClick}>Personal Info</a>,
    },
    {
      key: "2",
      label: <a onClick={onLogout}>Logout</a>,
    },
  ];
  return (
    <Layout
      style={{ width: "100vw", height: "100vh" }}
      id="components-layout-demo-custom-trigger"
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={Logo} alt="scaffolding" />
        </div>
        <Menu
          onClick={({ key }) => {
            navigate(key);
          }}
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "/monitor",
              icon: <VideoCameraOutlined />,
              label: "Monitor",
              children: [
                {
                  label: "Tracing",
                  key: "/monitor/tracing",
                },
                {
                  label: "Hardware",
                  key: "/monitor/hardware",
                },
                {
                  label: "Log",
                  key: "/monitor/log",
                },
                {
                  label: "Service",
                  key: "/monitor/service",
                },
                {
                  label: "API",
                  key: "/monitor/api",
                },
              ],
            },
            {
              key: "/admin",
              icon: <UserOutlined />,
              label: "Admnin Management",
              children: [
                {
                  label: "User Management",
                  key: "/admin/user",
                },
                {
                  label: "Role Management",
                  key: "/admin/role",
                },
                {
                  label: "Permission Management",
                  key: "/admin/permission",
                },
              ],
            },
            {
              key: "/photo",
              icon: <VideoCameraOutlined />,
              label: "Photo Management",
              children: [
                {
                  label: "Upload",
                  key: "/photo/upload",
                },
                {
                  label: "View All",
                  key: "/photo/view",
                },
                {
                  label: "Download",
                  key: "/photo/download",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <span className="app-title">
            Scaffolding for Java Microservice Development
          </span>
          <Dropdown menu={{ items: dropdownItems }} placement="bottom" arrow>
            <img
              src={Avatar}
              style={{
                width: "30px",
                borderRadius: "50%",
                float: "right",
                marginTop: "16px",
                marginRight: "20px",
              }}
            >
            </img>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
