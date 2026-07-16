import React from "react";
import { AdminLayout } from "../../../layouts";
import { GradesManagementDashboard } from "../../../components";

const GradesPage: React.FC = () => {
  return (
    <AdminLayout>
      <GradesManagementDashboard />
    </AdminLayout>
  );
};

export default GradesPage;
