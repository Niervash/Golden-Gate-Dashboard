import React from "react";
import { FloatingButton, MainFooter, MainNavbar } from "../../components";

interface props {
  children: any;
}

const UsersLayout: React.FC<props> = ({ children }) => {
  return (
    <div>
      <MainNavbar />
      <section className="relative min-h-screen hero-gradient overflow-hidden ">
        {children}
      </section>
      <FloatingButton />
      <MainFooter />
    </div>
  );
};
export default UsersLayout;
