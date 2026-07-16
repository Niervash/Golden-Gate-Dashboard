import React from "react";
import { AdminLayout } from "../../../layouts";
import { AdminAchievements } from "../../../components";

const AchievementsPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminAchievements />
    </AdminLayout>
  );
};

export default AchievementsPage;
