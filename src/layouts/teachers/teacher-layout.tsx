import { Breadcrumb, Card, Layout } from "antd";
import React from "react";
import { AdminHeader } from "../../components";
import { Content } from "@radix-ui/react-alert-dialog";
import { AdminFooter } from "../../components/footer-dashboard";

interface props {
  children: any;
}

const TeacherLayout: React.FC<props> = ({ children }) => {
  return (
    <Layout>
      <AdminHeader />
      <Content style={{ padding: "0 30px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />
        <Card>{children}</Card>
      </Content>
      <AdminFooter />
    </Layout>
  );
};
export default TeacherLayout;
