import React from "react";
import { AdminLayout } from "../../../layouts";
import { StudentManagementDashboard } from "../../../components";

const StudentsPage: React.FC = () => {
  return (
    <AdminLayout>
      <StudentManagementDashboard />
    </AdminLayout>
  );
};

export default StudentsPage;
