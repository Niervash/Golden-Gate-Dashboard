import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type UserRole } from "../context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page and save the current location we were trying to access
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // If authenticated but role not allowed, redirect to their main dashboard or a default dashboard
    if (user.role === "kepsek") {
      return <Navigate to="/dashboard/principal" replace />;
    } else if (user.role === "guru") {
      return <Navigate to="/teachers/dashboard_guru" replace />;
    } else {
      return <Navigate to="/dashboard/admin-tu" replace />;
    }
  }

  return <>{children}</>;
};

export const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    // Redirect authenticated users to their dashboards
    if (user.role === "kepsek") {
      return <Navigate to="/dashboard/principal" replace />;
    } else if (user.role === "guru") {
      return <Navigate to="/teachers/dashboard_guru" replace />;
    } else {
      return <Navigate to="/dashboard/admin-tu" replace />;
    }
  }

  return <>{children}</>;
};
