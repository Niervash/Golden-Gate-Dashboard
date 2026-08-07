import React from "react";
import { AdminLayout } from "../../../layouts";
import { AcademicManagementDashboard } from "../../../components";

const MasterClassesPage: React.FC = () => <AdminLayout><AcademicManagementDashboard initialTab="kelas" /></AdminLayout>;
export default MasterClassesPage;
