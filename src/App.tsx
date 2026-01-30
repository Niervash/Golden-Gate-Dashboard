import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersRoute from "./routers/users/users-routers";
import AuthRouters from "./routers/auth/auth-routers";
import AdminRouters from "./routers/admin-tu/admin-routers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UsersRoute />} />
        <Route path="/auth/*" element={<AuthRouters />} />
        <Route path="/dashboard/*" element={<AdminRouters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
