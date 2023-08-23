import { DeleteOutlined, LogoutOutlined, MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function API() {
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
            "http://localhost/webjars/swagger-ui/index.html",
            "_blank"
          );
        }}
      >Open Swagger Documentation</Button>
    </div>
  );
}

export default API;
