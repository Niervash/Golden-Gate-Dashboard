import React from "react";
import { AdminLayout } from "../../../layouts";
import { ScheduleManagementDashboard } from "../../../components";

const SchedulePage: React.FC = () => {
  return (
    <AdminLayout>
      <ScheduleManagementDashboard />
    </AdminLayout>
  );
};

export default SchedulePage;
