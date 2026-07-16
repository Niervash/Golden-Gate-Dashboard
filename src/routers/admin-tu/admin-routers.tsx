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
          <Route index element={<Navigate to="admin-tu" replace />} />
          <Route path="admin-tu" element={<PageWrapper><AdminPages /></PageWrapper>} />
          <Route path="admin-sapras" element={<PageWrapper><InventarisCode /></PageWrapper>} />
          
          <Route path="students" element={<PageWrapper><StudentsPage /></PageWrapper>} />
          <Route path="teachers" element={<PageWrapper><TeachersPage /></PageWrapper>} />
          <Route path="academic" element={<PageWrapper><AcademicPage /></PageWrapper>} />
          <Route path="schedule" element={<PageWrapper><SchedulePage /></PageWrapper>} />
          <Route path="attendance" element={<PageWrapper><AttendancePage /></PageWrapper>} />
          <Route path="grades" element={<PageWrapper><GradesPage /></PageWrapper>} />
          <Route path="counseling" element={<PageWrapper><CounselingPage /></PageWrapper>} />
          <Route path="achievements" element={<PageWrapper><AchievementsPage /></PageWrapper>} />
          <Route path="announcements" element={<PageWrapper><AnnouncementsPage /></PageWrapper>} />
          <Route path="archives" element={<PageWrapper><ArchivesPage /></PageWrapper>} />
          <Route path="reports" element={<PageWrapper><ReportsPage /></PageWrapper>} />
          <Route path="settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AdminRouters;
