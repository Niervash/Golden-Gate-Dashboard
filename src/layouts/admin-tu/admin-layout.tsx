import React from "react";
import { Layout } from "antd";
import { MainSidebar } from "../../components";
import { AdminFooter } from "../../components/footer-dashboard";

const { Content } = Layout;

interface props {
  children: any;
}

const AdminLayout: React.FC<props> = ({ children }) => {
  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}
    >
      {/* Responsive Sidebar component */}
      <MainSidebar />

      {/* Main content container */}
      <Layout
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          background: "transparent",
          width: "100%",
        }}
      >
        <Content
          className="p-4 md:p-6 lg:p-8"
          style={{
            minHeight: "280px",
            paddingTop: "72px", // Ensure space for mobile hamburger button
          }}
        >
          {children}
        </Content>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
