import React from "react";
import { AdminLayout } from "../../../layouts";
import { AcademicManagementDashboard } from "../../../components";

const AcademicPage: React.FC = () => {
  return (
    <AdminLayout>
      <AcademicManagementDashboard />
    </AdminLayout>
  );
};

export default AcademicPage;
