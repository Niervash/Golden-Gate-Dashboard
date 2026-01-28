import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ILoveGGS } from "../../../assets/images";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Beranda", href: "#" },
  { label: "Profil", href: "#profil" },
  { label: "Program", href: "#program" },
  { label: "Prestasi", href: "#prestasi" },
  { label: "Artikel", href: "#artikel" },
  { label: "Berita", href: "#berita" },
  { label: "Kalender", href: "#kalender" },
  { label: "Kontak", href: "#kontak" },
];

const MainNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="fixed top-0 left-0 right-0 z-50 p-2"
      style={{
        background: "#23305d",
        borderBottom: "1px solid #43424e",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0">
              <img
                src={ILoveGGS}
                alt="Logo Golden Gate School"
                className="w-23 h-10 md:w-23 md:h-12"
              />
            </div>
            <div className="block">
              <h1
                className="text-sm md:text-lg lg:text-xl font-bold leading-tight"
                style={{ color: "#ffffff" }}
              >
                GOLDEN
                <span style={{ color: "#d9ab3f" }}> GATE </span>
                <span> SCHOOL </span>
              </h1>
              <p className="text-xs mt-0.5" style={{ color: "#af9151" }}>
                Unggul • Berkarakter • Berprestasi
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="px-4 py-2 text-sm font-medium transition-colors rounded-lg"
                style={{
                  color: "#af9151",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#d9ab3f";
                  e.currentTarget.style.background = "rgba(217, 171, 63, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#af9151";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/ppdb"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2"
              style={{
                border: "1px solid #d9ab3f",
                color: "#d9ab3f",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d9ab3f";
                e.currentTarget.style.color = "#23305d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#d9ab3f";
              }}
            >
              PPDB Online
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors ml-1"
            style={{ color: "#d9ab3f" }}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "#23305d",
              borderTop: "1px solid #43424e",
            }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-sm font-medium transition-colors rounded-lg"
                    style={{
                      color: "#af9151",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#d9ab3f";
                      e.currentTarget.style.background =
                        "rgba(217, 171, 63, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#af9151";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div
                  className="flex flex-col gap-2 pt-4 mt-2"
                  style={{ borderTop: "1px solid #43424e" }}
                >
                  <Link
                    to="/ppdb"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full"
                    style={{
                      border: "1px solid #d9ab3f",
                      color: "#d9ab3f",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#d9ab3f";
                      e.currentTarget.style.color = "#23305d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#d9ab3f";
                    }}
                  >
                    PPDB Online
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default MainNavbar;
