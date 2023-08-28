import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react'

function Hardware() {

  const monitorUrl = import.meta.env.VITE_MONITOR_URL;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Button
        style={{
          fontSize: "20px",
          alignContent: "center",
          padding: "36px 24px",
        }}
        type="primary"
        icon={<LogoutOutlined />}
        onClick={() => {
          window.open(
            "http://localhost:3000/dashboards",
            "_blank"
          );
        }}
      >Open Prometheus Dashboard</Button>
    </div>
  )
}

export default Hardware
