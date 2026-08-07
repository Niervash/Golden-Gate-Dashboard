import React from "react";
import {
  MainHero,
  SchoolFeaturesSection,
  AcademicProgramsSection,
  CampusFacilitiesSection,
  StatsSection,
  ArticleSection,
  CalendarEvent,
  TestimonialsSection,
  FaqSection,
  ContactSection,
  CtaSection,
} from "../../../components";
import { UsersLayout } from "../../../layouts";

const LandingPage: React.FC = () => {
  return (
    <div>
      <UsersLayout>
        {/* 1. Hero Section */}
        <MainHero />

        {/* 2. Keunggulan Sekolah */}
        <SchoolFeaturesSection />

        {/* 3. Program Akademik / Jenjang */}
        <AcademicProgramsSection />

        {/* 4. Statistik Sekolah */}
        <StatsSection />

        {/* 5. Fasilitas Kampus */}
        <CampusFacilitiesSection />

        {/* 6. Berita & Artikel Terkini */}
        <ArticleSection />

        {/* 7. Kalender Kegiatan / Events */}
        <CalendarEvent />

        {/* 8. Testimoni Orang Tua & Alumni */}
        <TestimonialsSection />

        {/* 9. FAQ / Pertanyaan Umum */}
        <FaqSection />

        {/* 10. Kontak & Lokasi */}
        <ContactSection />

        {/* 11. Call to Action (PPDB) */}
        <CtaSection />
      </UsersLayout>
    </div>
  );
};

export default LandingPage;

