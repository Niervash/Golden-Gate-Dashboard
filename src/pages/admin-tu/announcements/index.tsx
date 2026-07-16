import React from "react";
import { AdminLayout } from "../../../layouts";
import { AdminAnnouncements } from "../../../components";

const AnnouncementsPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminAnnouncements />
    </AdminLayout>
  );
};

export default AnnouncementsPage;
