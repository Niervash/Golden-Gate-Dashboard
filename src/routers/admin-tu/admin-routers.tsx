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
import ArchivesPage from "../../pages/admin-tu/archive";
import ReportsPage from "../../pages/admin-tu/reports";
import SettingsPage from "../../pages/admin-tu/settings";
import PrincipalPage from "../../pages/principal";
import LessonPlanPage from "../../pages/admin-tu/lesson-plan";
import StudentCardsPage from "../../pages/admin-tu/student-cards";
import ExtracurricularPage from "../../pages/admin-tu/extracurricular";
import CalendarEventPage from "../../pages/admin-tu/calendar-events";
import NewsCMSPage from "../../pages/admin-tu/news-cms";
import AdminLibraryPage from "../../pages/admin-tu/library";
import UserManagementPage from "../../pages/admin-tu/user-management";
import MasterClassesPage from "../../pages/admin-tu/master-classes";
import MasterSubjectsPage from "../../pages/admin-tu/master-subjects";
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

const RoleGuard: React.FC<{ children: React.ReactNode; allowedRoles: UserRole[]; requiredFeature?: string }> = ({ children, allowedRoles, requiredFeature }) => {
  const { user, canAccess } = useAuth();
  if (!user || !allowedRoles.includes(user.role) || (requiredFeature && !canAccess(requiredFeature))) {
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
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<DashboardIndex />} />
          
          <Route path="admin-tu" element={<RoleGuard allowedRoles={["admin"]}><PageWrapper><AdminPages /></PageWrapper></RoleGuard>} />
          <Route path="admin-sapras" element={<RoleGuard allowedRoles={["admin"]}><PageWrapper><InventarisCode /></PageWrapper></RoleGuard>} />
          <Route path="principal" element={<RoleGuard allowedRoles={["admin", "kepsek"]}><PageWrapper><PrincipalPage /></PageWrapper></RoleGuard>} />
          <Route path="lesson-plan" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]}><PageWrapper><LessonPlanPage /></PageWrapper></RoleGuard>} />
          <Route path="library" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]}><PageWrapper><AdminLibraryPage /></PageWrapper></RoleGuard>} />
          
          <Route path="students" element={<RoleGuard allowedRoles={["admin"]} requiredFeature="Data Siswa"><PageWrapper><StudentsPage /></PageWrapper></RoleGuard>} />
          <Route path="student-cards" element={<RoleGuard allowedRoles={["admin"]}><PageWrapper><StudentCardsPage /></PageWrapper></RoleGuard>} />
          <Route path="teachers" element={<RoleGuard allowedRoles={["admin"]} requiredFeature="Data Guru"><PageWrapper><TeachersPage /></PageWrapper></RoleGuard>} />
          <Route path="academic" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]} requiredFeature="Akademik & Kurikulum"><PageWrapper><AcademicPage /></PageWrapper></RoleGuard>} />
          <Route path="master-classes" element={<RoleGuard allowedRoles={["admin"]} requiredFeature="Akademik & Kurikulum"><PageWrapper><MasterClassesPage /></PageWrapper></RoleGuard>} />
          <Route path="master-subjects" element={<RoleGuard allowedRoles={["admin"]} requiredFeature="Akademik & Kurikulum"><PageWrapper><MasterSubjectsPage /></PageWrapper></RoleGuard>} />
          <Route path="schedule" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]} requiredFeature="Jadwal Pelajaran"><PageWrapper><SchedulePage /></PageWrapper></RoleGuard>} />
          <Route path="attendance" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]} requiredFeature="Absensi & Presensi"><PageWrapper><AttendancePage /></PageWrapper></RoleGuard>} />
          <Route path="grades" element={<RoleGuard allowedRoles={["admin", "guru"]} requiredFeature="Penilaian & Raport"><PageWrapper><GradesPage /></PageWrapper></RoleGuard>} />
          <Route path="counseling" element={<RoleGuard allowedRoles={["admin"]} requiredFeature="BK & Konseling"><PageWrapper><CounselingPage /></PageWrapper></RoleGuard>} />
          <Route path="achievements" element={<RoleGuard allowedRoles={["admin", "kepsek"]}><PageWrapper><AchievementsPage /></PageWrapper></RoleGuard>} />
          <Route path="announcements" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]}><PageWrapper><AnnouncementsPage /></PageWrapper></RoleGuard>} />
          <Route path="archives" element={<RoleGuard allowedRoles={["admin"]} requiredFeature="Arsip Dokumen Sekolah"><PageWrapper><ArchivesPage /></PageWrapper></RoleGuard>} />
          <Route path="reports" element={<RoleGuard allowedRoles={["admin", "kepsek"]}><PageWrapper><ReportsPage /></PageWrapper></RoleGuard>} />
          <Route path="settings" element={<RoleGuard allowedRoles={["admin"]}><PageWrapper><SettingsPage /></PageWrapper></RoleGuard>} />
          <Route path="user-management" element={<RoleGuard allowedRoles={["admin"]}><PageWrapper><UserManagementPage /></PageWrapper></RoleGuard>} />
          <Route path="extracurricular" element={<RoleGuard allowedRoles={["admin", "kepsek"]}><PageWrapper><ExtracurricularPage /></PageWrapper></RoleGuard>} />
          <Route path="calendar-events" element={<RoleGuard allowedRoles={["admin", "kepsek", "guru"]}><PageWrapper><CalendarEventPage /></PageWrapper></RoleGuard>} />
          <Route path="news-cms" element={<RoleGuard allowedRoles={["admin", "kepsek"]}><PageWrapper><NewsCMSPage /></PageWrapper></RoleGuard>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AdminRouters;
