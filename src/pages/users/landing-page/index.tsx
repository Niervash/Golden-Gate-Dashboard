import React from "react";
import {
  ArticleSection,
  CalendarEvent,
  ContactSection,
  CtaSection,
  MainHero,
  NavbarPpdb,
  TextThrough,
} from "../../../components";
import { UsersLayout } from "../../../layouts";

const LandingPage: React.FC = () => {
  return (
    <div>
      <UsersLayout>
        <MainHero />
        <ArticleSection />
        <CalendarEvent />
        <ContactSection />
        <CtaSection />
      </UsersLayout>
    </div>
  );
};

export default LandingPage;
