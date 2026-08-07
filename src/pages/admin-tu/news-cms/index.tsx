import React from "react";
import { AdminLayout } from "../../../layouts";
import { AdminNewsCMS } from "../../../components";

const NewsCMSPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminNewsCMS />
    </AdminLayout>
  );
};

export default NewsCMSPage;
