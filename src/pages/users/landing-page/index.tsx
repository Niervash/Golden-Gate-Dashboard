import React from "react";
import {
  ContactSection,
  CtaSection,
  MainHero,
  NavbarPpdb,
} from "../../../components";
import { UsersLayout } from "../../../layouts";

const LandingPage: React.FC = () => {
  return (
    <div>
      <UsersLayout>
        <MainHero />
        <ContactSection />
        <CtaSection />
      </UsersLayout>
    </div>
  );
};

export default LandingPage;
