import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context";
import { StudentProvider } from "./context/student-context";
import { ProtectedRoute, GuestRoute } from "./routers/protected-route";
import UsersRoute from "./routers/users/users-routers";
import AuthRouters from "./routers/auth/auth-routers";
import AdminRouters from "./routers/admin-tu/admin-routers";
import TeachersRouters from "./routers/teachers/teachers-route";

function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/*" element={<UsersRoute />} />
            
            {/* Auth Routes (restricted to guest users) */}
            <Route 
              path="/auth/*" 
              element={
                <GuestRoute>
                  <AuthRouters />
                </GuestRoute>
              } 
            />
            
            {/* Admin & Principal Dashboard Routes */}
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute allowedRoles={["admin", "kepsek", "guru"]}>
                  <AdminRouters />
                </ProtectedRoute>
              } 
            />
            
            {/* Teacher Dashboard Routes */}
            <Route 
              path="/teachers/*" 
              element={
                <ProtectedRoute allowedRoles={["admin", "guru"]}>
                  <TeachersRouters />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;
