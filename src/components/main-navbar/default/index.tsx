import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ILoveGGS } from "../../../assets/images";
import { LanguageSwitcher } from "../../ui";
import { useTranslation } from "react-i18next";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const MainNavbar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const navItems: NavItem[] = [
    { label: t("home"), href: "/home" },
    {
      label: t("Akademik"),
      children: [
        { label: t("Visi & Misi"), href: "/visi-misi" },
        { label: t("Kurikulum & Program"), href: "/home#program" },
        { label: t("PPDB Online"), href: "/ppdb" },
      ],
    },
    {
      label: t("Informasi & Berita"),
      children: [
        { label: t("Artikel Berita"), href: "/berita" },
        { label: t("Agenda Kalender"), href: "/kalender" },
        { label: t("Pengumuman Kelulusan"), href: "/graduation" },
      ],
    },
    { label: t("Kalender Event"), href: "/kalender" },
  ];

  // Handle navigation to internal sections (if any)
  const handleSectionClick = (sectionId: string) => {
    closeMenu();
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .navbar-font { font-family: 'Inter', sans-serif; }
      `}</style>

      <nav
        className={`navbar-font fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        {/* Background - no blur at start, blur when scrolled */}
        <div
          className={`absolute inset-0 transition-all duration-500 z-40 ${
            isScrolled ? "bg-white/95 backdrop-blur-md" : "bg-white"
          }`}
        ></div>

        <div
          className={`max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50 transition-all duration-300 ${
            isScrolled ? "py-2" : "py-4"
          }`}
        >
          {/* Brand / Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-900 tracking-wide relative z-[60] transition-all duration-300"
          >
            <img
              src={ILoveGGS}
              alt="Logo Golden Gate School"
              className={`transition-all duration-300 ${
                isScrolled ? "h-6 w-auto" : "h-8 w-auto"
              }`}
            />
            <span
              className={`font-extrabold transition-all duration-300 ${
                isScrolled ? "text-lg" : "text-xl"
              }`}
              style={{ color: "#23305d" }}
            >
              GOLDEN <span style={{ color: "#d9ab3f" }}>GATE</span> SCHOOL
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-1 text-sm font-semibold text-slate-800">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="group relative cursor-pointer px-4 py-3 hover:text-[#d9ab3f] transition-all duration-300 flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="p-2 flex flex-col space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="w-full text-left px-4 py-2.5 text-black hover:bg-[#d9ab3f]/10 hover:text-[#d9ab3f] rounded-lg text-sm font-medium transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.href!}
                  className="px-3.5 py-2 rounded-full hover:text-[#d9ab3f] transition-all duration-300"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right section: language switcher & buttons */}
          <div className="flex items-center gap-4 relative z-[60]">
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                to="/auth/login"
                className="px-4 py-2.5 text-slate-700 text-sm font-bold hover:text-[#d9ab3f] transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/ppdb"
                className="px-6 py-2.5 bg-[#d9ab3f] hover:bg-[#c49a2e] text-white text-sm font-bold rounded-full shadow-md shadow-[#d9ab3f]/25 transition-all duration-300"
              >
                PPDB Online
              </Link>
            </div>

            {/* Hamburger button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 -mr-2 text-black hover:text-[#d9ab3f] transition duration-300 focus:outline-none relative z-[70]"
              aria-label="Toggle menu"
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                <span
                  className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-[#f4f6f8] z-45 overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] pt-24 pb-10 ${
            isOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-full"
          }`}
        >
          <div className="w-full max-w-md mx-auto px-6 flex flex-col">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label}>
                    <div className="border-b border-gray-200 py-4 text-left font-bold text-black text-lg hover:text-[#d9ab3f] transition-colors">
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-2 mb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={closeMenu}
                          className="block py-2 text-black hover:text-[#d9ab3f] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.href!}
                  onClick={closeMenu}
                  className="border-b border-gray-200 py-4 block font-bold text-black text-lg hover:text-[#d9ab3f] transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex justify-start mb-2">
                <LanguageSwitcher />
              </div>
              <Link
                to="/auth/login"
                onClick={closeMenu}
                className="w-full text-center py-3 border border-[#d9ab3f] text-[#d9ab3f] font-bold rounded-xl hover:bg-[#d9ab3f] hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/ppdb"
                onClick={closeMenu}
                className="w-full text-center py-3 bg-[#d9ab3f] hover:bg-[#c49a2e] text-white font-bold rounded-xl shadow-md transition-colors"
              >
                PPDB Online
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavbar;
