import React from "react";
import {
  FloatingButton,
  MainFooter,
  MainNavbar,
  TextThrough,
} from "../../components";

interface Props {
  children: any;
}

const UsersLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {/* Banner di atas, ikut scroll */}
      <TextThrough />

      {/* Navbar menjadi sticky, akan berhenti di atas saat scroll */}
      <MainNavbar />

      {/* Konten langsung di bawah navbar */}
      <section className="relative min-h-screen hero-gradient overflow-hidden">
        {children}
      </section>

      <FloatingButton />
      <MainFooter />
    </div>
  );
};

export default UsersLayout;
