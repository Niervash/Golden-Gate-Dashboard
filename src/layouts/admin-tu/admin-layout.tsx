import React from "react";
import { Breadcrumb, Card, Layout, Menu, theme } from "antd";
import { AdminHeader } from "../../components";
import { AdminFooter } from "../../components/footer-dashboard";

const { Content } = Layout;

interface props {
  children: any;
}

const AdminLayout: React.FC<props> = ({ children }) => {
  return (
    <Layout>
      <AdminHeader />
      <Content style={{ padding: "0 30px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />
        {children}
      </Content>
      <AdminFooter />
    </Layout>
  );
};

export default AdminLayout;
