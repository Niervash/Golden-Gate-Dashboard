import React from "react";
import { AdminLayout } from "../../../layouts";
import { CounselingManagementDashboard } from "../../../components";

const CounselingPage: React.FC = () => {
  return (
    <AdminLayout>
      <CounselingManagementDashboard />
    </AdminLayout>
  );
};

export default CounselingPage;
