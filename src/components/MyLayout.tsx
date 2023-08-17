import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  MenuProps,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoImg as Logo, AvatarImg as Avatar } from "../pages/utils/Tool";

const { Header, Sider, Content } = Layout;

const findOpenKeys = (key: string, menus: any) => {
  const result: string[] = [];
  const findInfo = (arr: any) => {
    arr.forEach((item: any) => {
      if (key.includes(item.key)) {
        result.push(item.key);
        if (item.children) {
          findInfo(item.children);
        }
      }
    });
  };
  findInfo(menus);
  return result;
};

const personalOnClick = (e: any) => {
  //TODO personal Information function
  console.log(e);
};

const onLogout = () => {
  //TODO Logout function
  alert("logout");
};

const findDeepPath = (key: string, menus: any) => {
  const result: any = [];
  const findInfo = (arr: any) => {
    arr.forEach((item: any) => {
      const { children, ...info } = item;
      result.push(info);
      if (children) {
        findInfo(children);
      }
    });
  };
  findInfo(menus);
  const tmpData = result.filter((item: any) => key.includes(item.key));
  if (tmpData.length > 0) {
    return [{ label: "Home", key: "/admin/user" }, ...tmpData];
  }
  return [];
};

const MyLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<any>([]);
  const sideMenuItems: MenuProps["items"] = [
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
      label: "Admin",
      children: [
        {
          label: "User",
          key: "/admin/user",
        },
        {
          label: "Role",
          key: "/admin/role",
        },
        {
          label: "Permission",
          key: "/admin/permission",
        },
      ],
    },
    {
      key: "/photo",
      icon: <VideoCameraOutlined />,
      label: "Photo",
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
  ];

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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const tmpOpenKeys = findOpenKeys(pathname, sideMenuItems);

  useEffect(() => {
    setBreadcrumbs(findDeepPath(pathname, sideMenuItems));
  }, [pathname]);
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
          defaultOpenKeys={tmpOpenKeys}
          defaultSelectedKeys={tmpOpenKeys}
          items={sideMenuItems}
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
            Java-Based Microservice Development Scaffolding
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
            />
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
          <Breadcrumb>
            {breadcrumbs.map((item: any) => (
              <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
         
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
