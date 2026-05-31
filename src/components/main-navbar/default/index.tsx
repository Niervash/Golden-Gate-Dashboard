import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ILoveGGS } from "../../../assets/images";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Beranda", href: "#" },
  {
    label: "Akademik",
    children: [
      { label: "Kurikulum", href: "#kurikulum" },
      { label: "Visi & Misi", href: "#visi-misi" },
      { label: "Program", href: "#program" },
    ],
  },
  {
    label: "Profile",
    children: [
      { label: "Guru", href: "#guru" },
      { label: "Tenaga Kependidikan dan Staff", href: "#staff" },
      { label: "Fasilitas", href: "#fasilitas" },
      { label: "Cabang", href: "#cabang" },
    ],
  },
  {
    label: "News",
    children: [
      { label: "Prestasi", href: "#prestasi" },
      { label: "Article", href: "#article" },
    ],
  },
  { label: "Calender", href: "#calender" },
];

const MainNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );

  const handleDesktopHover = (label: string | null) => {
    setActiveDropdown(label);
  };

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 p-2"
      style={{ background: "#23305d", borderBottom: "1px solid #43424e" }}
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
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleDesktopHover(item.label)}
                    onMouseLeave={() => handleDesktopHover(null)}
                  >
                    <button
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg"
                      style={{
                        color:
                          activeDropdown === item.label ? "#d9ab3f" : "#af9151",
                        background:
                          activeDropdown === item.label
                            ? "rgba(217, 171, 63, 0.1)"
                            : "transparent",
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-1 w-56 py-2 rounded-lg shadow-lg"
                          style={{
                            background: "#23305d",
                            border: "1px solid #43424e",
                          }}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="block px-4 py-2 text-sm transition-colors"
                              style={{ color: "#af9151" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#d9ab3f";
                                e.currentTarget.style.background =
                                  "rgba(217, 171, 63, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "#af9151";
                                e.currentTarget.style.background =
                                  "transparent";
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href!}
                  className="px-4 py-2 text-sm font-medium transition-colors rounded-lg"
                  style={{ color: "#af9151" }}
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
              );
            })}
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
                {navItems.map((item) => {
                  if (item.children) {
                    const isOpenDropdown = openMobileDropdown === item.label;
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() => toggleMobileDropdown(item.label)}
                          className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors rounded-lg"
                          style={{ color: "#af9151" }}
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isOpenDropdown ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpenDropdown && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden pl-4"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  to={child.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block px-4 py-2 text-sm transition-colors rounded-lg"
                                  style={{ color: "#af9151" }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "#d9ab3f";
                                    e.currentTarget.style.background =
                                      "rgba(217, 171, 63, 0.1)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "#af9151";
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      to={item.href!}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-sm font-medium transition-colors rounded-lg"
                      style={{ color: "#af9151" }}
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
                  );
                })}

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
