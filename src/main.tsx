import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, App as AntApp } from "antd";
import zhCN from "antd/locale/zh_CN";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { AuthProvider } from "@/contexts/AuthContext";
import { BRAND_COLORS } from "@/config/brand";
import "@/assets/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: BRAND_COLORS.primary,
          colorSuccess: BRAND_COLORS.secondary,
          colorWarning: "#e67e22",
          colorTextBase: "#1a1a2e",
          borderRadius: 12,
          colorBgLayout: "#f5f4ef",
        },
      }}
    >
      <AntApp>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>
);
