import React from "react";
import { AdminLayout } from "../../../layouts";
import { AttendanceManagementDashboard } from "../../../components";

const AttendancePage: React.FC = () => {
  return (
    <AdminLayout>
      <AttendanceManagementDashboard />
    </AdminLayout>
  );
};

export default AttendancePage;
