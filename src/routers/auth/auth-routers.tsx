import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Preloader } from "../../components";

const AuthRouters: React.FC = () => {
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
            path="/login"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* login layout */}
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AuthRouters;
