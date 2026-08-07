import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LandingPage, PpdbPage, PublicNewsPage, PublicNewsDetailPage, PublicCalendarPage, VisiMisiPage } from "../../pages";
import StudentDashboardPage from "../../pages/users/student-dashboard";
import { Preloader } from "../../components";
import { GraduationPage } from "../../features";
import { ProtectedRoute } from "../protected-route";

const UsersRoute: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 detik untuk demo, bisa disesuaikan

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Preloader show={isLoading} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <LandingPage />
              </motion.div>
            }
          />
          <Route
            path="/ppdb"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <PpdbPage />
              </motion.div>
            }
          />
          <Route
            path="/graduation"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <GraduationPage />
              </motion.div>
            }
          />
          <Route
            path="/berita"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <PublicNewsPage />
              </motion.div>
            }
          />
          <Route
            path="/berita/:id"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <PublicNewsDetailPage />
              </motion.div>
            }
          />
          <Route
            path="/kalender"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <PublicCalendarPage />
              </motion.div>
            }
          />
          <Route
            path="/visi-misi"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <VisiMisiPage />
              </motion.div>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={["murid"]}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <StudentDashboardPage />
                </motion.div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};



export default UsersRoute;
