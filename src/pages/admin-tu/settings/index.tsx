import React from "react";
import { AdminLayout } from "../../../layouts";
import { AdminSettings } from "../../../components";

const SettingsPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminSettings />
    </AdminLayout>
  );
};

export default SettingsPage;
