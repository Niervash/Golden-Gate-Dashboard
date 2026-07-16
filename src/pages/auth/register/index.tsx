import React from "react";
import { LoginLayout } from "../../../layouts/auth";
import RegisterForm from "../../../components/register-form/default";
import { LoginBranding } from "../../../components";

interface props {}

const RegisterPage: React.FC<props> = () => {
  return (
    <LoginLayout>
      <LoginBranding />
      <RegisterForm />
    </LoginLayout>
  );
};

export default RegisterPage;
