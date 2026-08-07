import React from "react";
import { AdminLayout } from "../../../layouts";
import { AdminUserManagement } from "../../../components";

const UserManagementPage: React.FC = () => (
  <AdminLayout>
    <AdminUserManagement />
  </AdminLayout>
);

export default UserManagementPage;
