import React from "react";
import { AdminLayout } from "../../../layouts";
import { DashboardGuru } from "../../../components";

const TeachersPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="pb-10">
        <DashboardGuru />
      </div>
    </AdminLayout>
  );
};

export default TeachersPage;
