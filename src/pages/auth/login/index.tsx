import React from "react";
import { LoginLayout } from "../../../layouts/auth";
import LoginForm from "../../../components/login-form/default";
import { LoginBranding } from "../../../components";

interface props {}

const LoginPage: React.FC<props> = () => {
  return (
    <LoginLayout>
      <LoginBranding />
      <LoginForm />
    </LoginLayout>
  );
};

export default LoginPage;
