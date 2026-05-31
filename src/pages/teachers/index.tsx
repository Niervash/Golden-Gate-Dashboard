import React from "react";
import { AdminLayout } from "../../layouts";
import { DashboardGuru } from "../../components";

interface props {}

const TeachersPages: React.FC<props> = () => {
  return (
    <>
      <AdminLayout>
        <DashboardGuru />
      </AdminLayout>
    </>
  );
};

export default TeachersPages;
