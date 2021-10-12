import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Result
      status="404"
      style={{
        height: "100%",
        background: "#fff",
      }}
      title="Page Not found"
      extra={
        <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  );
}
