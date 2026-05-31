import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersRoute from "./routers/users/users-routers";
import AuthRouters from "./routers/auth/auth-routers";
import AdminRouters from "./routers/admin-tu/admin-routers";
import TeachersRouters from "./routers/teachers/teachers-route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UsersRoute />} />
        <Route path="/auth/*" element={<AuthRouters />} />
        <Route path="/dashboard/*" element={<AdminRouters />} />
        <Route path="/teachers/*" element={<TeachersRouters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
