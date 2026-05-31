import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu as MenuIcon,
  X,
  UserCircle,
  FileText,
  Bell,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  Home,
  Shield,
  BookOpen,
  Calendar,
  MessageSquare,
  GraduationCap,
  Book,
  CreditCard,
} from "lucide-react";
import { ILoveGGS } from "../../../assets";

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const AdminHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const adminDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const adminButtonRef = useRef<HTMLButtonElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isMobileMenuOpen]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Main menu items (WHITE TEXT)
  const mainMenuItems: MenuItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      href: "/admin/dashboard",
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserCircle size={18} />,
      href: "/admin/profile",
    },
  ];

  // Admin dropdown items (fitur admin wajib)
  const adminDropdownItems = [
    {
      key: "students",
      label: "Data Siswa",
      icon: <GraduationCap size={16} />,
      onClick: () => {
        console.log("Navigate to students");
        setIsAdminDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/students");
      },
    },
    {
      key: "teachers",
      label: "Data Guru",
      icon: <Users size={16} />,
      onClick: () => {
        console.log("Navigate to teachers");
        setIsAdminDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/teachers");
      },
    },
    {
      key: "subjects",
      label: "Mata Pelajaran",
      icon: <Book size={16} />,
      onClick: () => {
        console.log("Navigate to subjects");
        setIsAdminDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/subjects");
      },
    },
    {
      key: "academic",
      label: "Akademik",
      icon: <BookOpen size={16} />,
      onClick: () => {
        console.log("Navigate to academic");
        setIsAdminDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/academic");
      },
    },
    {
      key: "schedule",
      label: "Jadwal",
      icon: <Calendar size={16} />,
      onClick: () => {
        console.log("Navigate to schedule");
        setIsAdminDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/schedule");
      },
    },
    {
      key: "finance",
      label: "Keuangan",
      icon: <CreditCard size={16} />,
      onClick: () => {
        console.log("Navigate to finance");
        setIsAdminDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/finance");
      },
    },
    {
      key: "messages",
      label: "Pesan",
      icon: <MessageSquare size={16} />,
      onClick: () => {
        console.log("Navigate to messages");
        setIsAdminDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/messages");
      },
    },
    {
      key: "reports",
      label: "Laporan",
      icon: <FileText size={16} />,
      onClick: () => {
        console.log("Navigate to reports");
        setIsAdminDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/reports");
      },
    },
  ];

  // More dropdown items
  const moreDropdownItems = [
    {
      key: "notifications",
      label: "Notifikasi",
      icon: <Bell size={16} />,
      count: 3,
      onClick: () => {
        console.log("Navigate to notifications");
        setIsMoreDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/notifications");
      },
    },
    {
      key: "settings",
      label: "Pengaturan",
      icon: <Settings size={16} />,
      onClick: () => {
        console.log("Navigate to settings");
        setIsMoreDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/settings");
      },
    },
    {
      key: "help",
      label: "Bantuan",
      icon: <HelpCircle size={16} />,
      onClick: () => {
        console.log("Navigate to help");
        setIsMoreDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/help");
      },
    },
    {
      key: "admin-tools",
      label: "Admin Tools",
      icon: <Shield size={16} />,
      onClick: () => {
        console.log("Navigate to admin tools");
        setIsMoreDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate("/admin/tools");
      },
    },
  ];

  // Check active menu
  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check for admin dropdown
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target as Node) &&
        adminButtonRef.current &&
        !adminButtonRef.current.contains(event.target as Node)
      ) {
        setIsAdminDropdownOpen(false);
      }

      // Check for more dropdown
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target as Node)
      ) {
        setIsMoreDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close all menus
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsAdminDropdownOpen(false);
    setIsMoreDropdownOpen(false);
  };

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(35, 48, 93, 0.95)" : "#23305d",
          borderBottom: "1px solid rgba(67, 66, 78, 0.8)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.2)"
            : "0 4px 12px rgba(0, 0, 0, 0.1)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          {/* Main Header Content */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left Section - Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2 flex-1">
              {/* Home Link */}
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
                style={{ color: "#ffffff" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#d9ab3f";
                  e.currentTarget.style.background = "rgba(217, 171, 63, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Home size={16} />
                <span className="text-sm font-medium">Home</span>
              </Link>

              {/* Divider */}
              <div
                className="h-6 w-px"
                style={{ background: "rgba(255, 255, 255, 0.2)" }}
              />

              {/* Main Menu Items - WHITE TEXT */}
              {mainMenuItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={closeAllMenus}
                  style={{ color: "#ffffff" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#d9ab3f";
                    e.currentTarget.style.background =
                      "rgba(217, 171, 63, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.background = "transparent";
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 "
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Admin Dropdown */}
              <div className="relative" ref={adminDropdownRef}>
                <button
                  ref={adminButtonRef}
                  onClick={() => {
                    setIsAdminDropdownOpen(!isAdminDropdownOpen);
                    setIsMoreDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isAdminDropdownOpen
                      ? "text-[#d9ab3f] bg-[#d9ab3f]/10"
                      : "text-white hover:text-[#d9ab3f] hover:bg-[#d9ab3f]/8"
                  }`}
                >
                  <Shield size={16} />
                  <span>Admin</span>
                  <motion.div
                    animate={{ rotate: isAdminDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isAdminDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-64 rounded-lg overflow-hidden z-50"
                      style={{
                        background: "rgba(35, 48, 93, 0.98)",
                        border: "1px solid rgba(217, 171, 63, 0.3)",
                        boxShadow:
                          "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(217, 171, 63, 0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 mb-1 border-b border-[#43424e]">
                          <p className="text-xs font-semibold text-[#d9ab3f] uppercase tracking-wider">
                            Admin Management
                          </p>
                          <p className="text-xs text-[#af9151] mt-0.5">
                            Fitur khusus administrator
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {adminDropdownItems.map((item) => (
                            <button
                              key={item.key}
                              onClick={item.onClick}
                              className="flex flex-col items-center justify-center p-3 rounded-md transition-all duration-200"
                              style={{ color: "#ffffff" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#d9ab3f";
                                e.currentTarget.style.background =
                                  "rgba(217, 171, 63, 0.1)";
                                e.currentTarget.style.border =
                                  "1px solid rgba(217, 171, 63, 0.2)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "#ffffff";
                                e.currentTarget.style.background =
                                  "transparent";
                                e.currentTarget.style.border =
                                  "1px solid transparent";
                              }}
                            >
                              <div className="mb-1">{item.icon}</div>
                              <span className="text-xs font-medium text-center">
                                {item.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Center - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/admin/dashboard"
                onClick={closeAllMenus}
                className="flex items-center gap-3 group"
              >
                {/* Logo Container */}
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <img
                    src={ILoveGGS}
                    alt="Logo Golden Gate School"
                    className="w-10 h-10"
                  />
                  {/* Decorative corner */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#d9ab3f]/30" />
                </div>

                {/* Text Container */}
                <div className="hidden lg:block">
                  <div className="flex items-baseline gap-1">
                    <h1 className="text-lg font-bold text-white leading-tight">
                      GOLDEN
                      <span className="text-[#d9ab3f] ml-1">GATE</span>
                      <span className="text-white ml-1">SCHOOL</span>
                    </h1>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#af9151" }}>
                    Admin Dashboard
                  </p>
                </div>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-end gap-3 flex-1">
              {/* Desktop Right Menu */}
              <div className="hidden lg:flex items-center gap-3">
                {/* More Dropdown */}
                <div className="relative" ref={moreDropdownRef}>
                  <button
                    ref={moreButtonRef}
                    onClick={() => {
                      setIsMoreDropdownOpen(!isMoreDropdownOpen);
                      setIsAdminDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isMoreDropdownOpen
                        ? "text-[#d9ab3f] bg-[#d9ab3f]/10"
                        : "text-white hover:text-[#d9ab3f] hover:bg-[#d9ab3f]/8"
                    }`}
                  >
                    <span>Lainnya</span>
                    <motion.div
                      animate={{ rotate: isMoreDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isMoreDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-1 w-52 rounded-lg overflow-hidden z-50"
                        style={{
                          background: "rgba(35, 48, 93, 0.98)",
                          border: "1px solid rgba(217, 171, 63, 0.3)",
                          boxShadow:
                            "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(217, 171, 63, 0.1)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <div className="p-2">
                          {moreDropdownItems.map((item) => (
                            <button
                              key={item.key}
                              onClick={item.onClick}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 relative"
                              style={{ color: "#ffffff" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#d9ab3f";
                                e.currentTarget.style.background =
                                  "rgba(217, 171, 63, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "#ffffff";
                                e.currentTarget.style.background =
                                  "transparent";
                              }}
                            >
                              {item.icon}
                              <span>{item.label}</span>
                              {item.key === "notifications" && item.count && (
                                <span className="absolute right-3 w-2 h-2 rounded-full bg-red-500" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Divider */}
                <div
                  className="h-6 w-px"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                />

                {/* User Info */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#d9ab3f]/5 transition-all duration-200 group">
                  <div className="relative">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(217, 171, 63, 0.2) 0%, rgba(175, 145, 81, 0.1) 100%)",
                        border: "2px solid rgba(217, 171, 63, 0.3)",
                      }}
                    >
                      <UserCircle size={20} className="text-[#d9ab3f]" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#23305d] bg-green-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">Admin</p>
                    <p className="text-xs" style={{ color: "#af9151" }}>
                      Super Admin
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    closeAllMenus();
                    navigate("/");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ml-1"
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
                  <motion.div
                    animate={{ x: [0, -2, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatDelay: 3,
                      duration: 1.2,
                    }}
                  >
                    <ArrowLeft size={16} />
                  </motion.div>
                  <span>Keluar</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg transition-all duration-200 relative"
                style={{
                  color: "#d9ab3f",
                  background: isMobileMenuOpen
                    ? "rgba(217, 171, 63, 0.1)"
                    : "transparent",
                }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
                {!isMobileMenuOpen && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#d9ab3f]" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden overflow-hidden fixed inset-0 top-16 bottom-0 left-0 right-0 z-40"
                style={{
                  background: "#1d2950",
                }}
              >
                <div className="h-full overflow-y-auto pb-24">
                  <div className="py-6 px-4">
                    {/* User Info Card */}
                    <div
                      className="flex items-center gap-4 p-4 rounded-xl mb-6"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(217, 171, 63, 0.1) 0%, rgba(175, 145, 81, 0.05) 100%)",
                        border: "1px solid rgba(217, 171, 63, 0.15)",
                      }}
                    >
                      <div className="relative">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(217, 171, 63, 0.2) 0%, rgba(175, 145, 81, 0.1) 100%)",
                          }}
                        >
                          <UserCircle size={28} className="text-[#d9ab3f]" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#1d2950] bg-green-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg">
                          Administrator
                        </h3>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: "#af9151" }}
                        >
                          Super Admin • Full Access
                        </p>
                      </div>
                    </div>

                    {/* Main Menu Grid */}
                    <div className="mb-6">
                      <h4
                        className="text-xs uppercase tracking-wider font-semibold mb-3 px-1"
                        style={{ color: "#ffffff" }}
                      >
                        Menu Utama
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {mainMenuItems.map((item) => (
                          <Link
                            key={item.key}
                            to={item.href}
                            onClick={closeAllMenus}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                              isActive(item.href)
                                ? "bg-[#d9ab3f]/10 border-2 border-[#d9ab3f]"
                                : "bg-[#23305d] border border-[#43424e] hover:border-[#d9ab3f] hover:bg-[#d9ab3f]/5"
                            }`}
                          >
                            <div
                              className={`mb-2 ${isActive(item.href) ? "text-[#d9ab3f]" : "text-white"}`}
                            >
                              {item.icon}
                            </div>
                            <span
                              className={`text-sm font-medium ${isActive(item.href) ? "text-[#d9ab3f]" : "text-white"}`}
                            >
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Admin Tools Section */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <h4
                          className="text-xs uppercase tracking-wider font-semibold"
                          style={{ color: "#d9ab3f" }}
                        >
                          Admin Management
                        </h4>
                        <Shield size={14} className="text-[#d9ab3f]" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {adminDropdownItems.slice(0, 4).map((item) => (
                          <button
                            key={item.key}
                            onClick={item.onClick}
                            className="flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 bg-[#23305d] border border-[#43424e] hover:border-[#d9ab3f] hover:bg-[#d9ab3f]/5"
                          >
                            <div className="mb-2 text-white">{item.icon}</div>
                            <span className="text-xs font-medium text-center text-white">
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </div>
                      {adminDropdownItems.length > 4 && (
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          {adminDropdownItems.slice(4, 8).map((item) => (
                            <button
                              key={item.key}
                              onClick={item.onClick}
                              className="flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 bg-[#23305d] border border-[#43424e] hover:border-[#d9ab3f] hover:bg-[#d9ab3f]/5"
                            >
                              <div className="mb-2 text-white">{item.icon}</div>
                              <span className="text-xs font-medium text-center text-white">
                                {item.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-8">
                      <h4
                        className="text-xs uppercase tracking-wider font-semibold mb-3 px-1"
                        style={{ color: "#ffffff" }}
                      >
                        Lainnya
                      </h4>
                      <div className="space-y-2">
                        {moreDropdownItems.map((item) => (
                          <button
                            key={item.key}
                            onClick={item.onClick}
                            className="flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200"
                            style={{
                              background: "#23305d",
                              border: "1px solid #43424e",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "#d9ab3f";
                              e.currentTarget.style.background =
                                "rgba(217, 171, 63, 0.05)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#43424e";
                              e.currentTarget.style.background = "#23305d";
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-white">{item.icon}</div>
                              <span className="text-sm font-medium text-white">
                                {item.label}
                              </span>
                            </div>
                            {item.key === "notifications" && item.count && (
                              <span className="w-2 h-2 rounded-full bg-red-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="space-y-3">
                      <Link
                        to="/"
                        onClick={closeAllMenus}
                        className="flex items-center justify-center gap-2 w-full p-3 rounded-lg transition-all duration-200"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.borderColor = "#d9ab3f";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.borderColor =
                            "rgba(255, 255, 255, 0.1)";
                        }}
                      >
                        <Home size={16} className="text-white" />
                        <span className="text-sm font-medium text-white">
                          Kembali ke Home
                        </span>
                      </Link>

                      <button
                        onClick={() => {
                          closeAllMenus();
                          navigate("/");
                        }}
                        className="flex items-center justify-center gap-2 w-full p-3.5 rounded-lg transition-all duration-200 font-semibold"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(217, 171, 63, 0.1) 0%, rgba(175, 145, 81, 0.05) 100%)",
                          border: "2px solid #d9ab3f",
                          color: "#d9ab3f",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#d9ab3f";
                          e.currentTarget.style.color = "#23305d";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, rgba(217, 171, 63, 0.1) 0%, rgba(175, 145, 81, 0.05) 100%)";
                          e.currentTarget.style.color = "#d9ab3f";
                        }}
                      >
                        <motion.div
                          animate={{ x: [0, -3, 0] }}
                          transition={{
                            repeat: Infinity,
                            repeatDelay: 2,
                            duration: 1.5,
                          }}
                        >
                          <LogOut size={18} />
                        </motion.div>
                        <span>Keluar Dashboard</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Spacer */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default AdminHeader;
