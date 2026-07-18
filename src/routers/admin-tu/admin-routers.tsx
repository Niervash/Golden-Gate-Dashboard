import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Preloader } from "../../components";
import AdminPages from "../../pages/admin-tu";
import InventarisCode from "../../pages/admin-tu/form-sapras";

// Import all new pages
import StudentsPage from "../../pages/admin-tu/students";
import TeachersPage from "../../pages/admin-tu/teachers";
import AcademicPage from "../../pages/admin-tu/academic";
import SchedulePage from "../../pages/admin-tu/schedule";
import AttendancePage from "../../pages/admin-tu/attendance";
import GradesPage from "../../pages/admin-tu/grades";
import CounselingPage from "../../pages/admin-tu/counseling";
import AchievementsPage from "../../pages/admin-tu/achievements";
import AnnouncementsPage from "../../pages/admin-tu/announcements";
import ArchivesPage from "../../pages/admin-tu/archives";
import ReportsPage from "../../pages/admin-tu/reports";
import SettingsPage from "../../pages/admin-tu/settings";
import PrincipalPage from "../../pages/principal";
import LessonPlanPage from "../../pages/admin-tu/lesson-plan";
import { useAuth, type UserRole } from "../../context";

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

const RoleGuard: React.FC<{ children: React.ReactNode; allowedRoles: UserRole[] }> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) {
    if (user?.role === "kepsek") {
      return <Navigate to="/dashboard/principal" replace />;
    } else if (user?.role === "guru") {
      return <Navigate to="/teachers/dashboard_guru" replace />;
    } else {
      return <Navigate to="/dashboard/admin-tu" replace />;
    }
  }
  return <>{children}</>;
};

const DashboardIndex = () => {
  const { user } = useAuth();
  if (user?.role === "kepsek") {
    return <Navigate to="principal" replace />;
  }
  if (user?.role === "guru") {
    return <Navigate to="/teachers/dashboard_guru" replace />;
  }
  return <Navigate to="admin-tu" replace />;
};

const AdminRouters: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Preloader show={isLoading} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<DashboardIndex />} />
          
          <Route path="admin-tu" element={<RoleGuard allowedRoles={["admin"]}><PageWrapper><AdminPages /></PageWrapper></RoleGuard>} />
          <Route path="admin-sapras" element={<RoleGuard allowedRoles={["admin"]}><PageWrapper><InventarisCode /></PageWrapper></RoleGuard>} />
          <Route path="principal" element={<RoleGuard allowedRoles={["admin", "kepsek"]}><PageWrapper><PrincipalPage /></PageWrapper></RoleGuard>} />
          <Route path="lesson-plan" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]}><PageWrapper><LessonPlanPage /></PageWrapper></RoleGuard>} />
          
          <Route path="students" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]}><PageWrapper><StudentsPage /></PageWrapper></RoleGuard>} />
          <Route path="teachers" element={<RoleGuard allowedRoles={["admin", "kepsek"]}><PageWrapper><TeachersPage /></PageWrapper></RoleGuard>} />
          <Route path="academic" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]}><PageWrapper><AcademicPage /></PageWrapper></RoleGuard>} />
          <Route path="schedule" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]}><PageWrapper><SchedulePage /></PageWrapper></RoleGuard>} />
          <Route path="attendance" element={<RoleGuard allowedRoles={["admin", "guru"]}><PageWrapper><AttendancePage /></PageWrapper></RoleGuard>} />
          <Route path="grades" element={<RoleGuard allowedRoles={["admin", "guru"]}><PageWrapper><GradesPage /></PageWrapper></RoleGuard>} />
          <Route path="counseling" element={<RoleGuard allowedRoles={["admin"]}><PageWrapper><CounselingPage /></PageWrapper></RoleGuard>} />
          <Route path="achievements" element={<RoleGuard allowedRoles={["admin", "kepsek"]}><PageWrapper><AchievementsPage /></PageWrapper></RoleGuard>} />
          <Route path="announcements" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]}><PageWrapper><AnnouncementsPage /></PageWrapper></RoleGuard>} />
          <Route path="archives" element={<RoleGuard allowedRoles={["admin"]}><PageWrapper><ArchivesPage /></PageWrapper></RoleGuard>} />
          <Route path="reports" element={<RoleGuard allowedRoles={["admin", "kepsek"]}><PageWrapper><ReportsPage /></PageWrapper></RoleGuard>} />
          <Route path="settings" element={<RoleGuard allowedRoles={["admin"]}><PageWrapper><SettingsPage /></PageWrapper></RoleGuard>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AdminRouters;
