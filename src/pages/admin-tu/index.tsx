import React from "react";
import { AdminLayout } from "../../layouts";
import { PPDBAdminDashboard } from "../../components";

interface props {}

const AdminPages: React.FC<props> = () => {
  return (
    <>
      {/* <AdminLayout>
        <PPDBAdminDashboard />
      </AdminLayout> */}
      <AdminLayout>
        <PPDBAdminDashboard />
      </AdminLayout>
    </>
  );
};

export default AdminPages;
