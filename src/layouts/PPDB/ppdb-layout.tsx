import React from "react";
import { FooterPpdb, MainFooter, NavbarPpdb } from "../../components";

interface props {
  children: any;
}

const PpdbLayout: React.FC<props> = ({ children }) => {
  return (
    <div>
      <NavbarPpdb />
      <section className="relative min-h-screen hero-gradient overflow-hidden ">
        {children}
      </section>
      <MainFooter />
    </div>
  );
};
export default PpdbLayout;
