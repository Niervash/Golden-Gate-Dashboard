import React from "react";
import AdminLayout from "../admin-tu/admin-layout";

interface props {
  children: any;
}

const TeacherLayout: React.FC<props> = ({ children }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default TeacherLayout;

