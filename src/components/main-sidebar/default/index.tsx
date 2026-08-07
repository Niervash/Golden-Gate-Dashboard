import React, { useState, useEffect } from "react";
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
  FileSpreadsheet,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Shield,
  BookOpen,
  Calendar,
  HeartHandshake,
  GraduationCap,
  UserCheck,
  Award,
  Megaphone,
  Archive,
  TrendingUp,
  Package,
  HelpCircle,
  MoreHorizontal,
  QrCode,
} from "lucide-react";
import { ILoveGGS } from "../../../assets/images";
import { useAuth, roleLabels } from "../../../context";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface SidebarItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface SidebarSection {
  title: string;
  icon?: React.ReactNode;
  items: SidebarItem[];
}

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */
const COLORS = {
  sidebarBg: "#ffffff",
  sidebarBgGlass: "rgba(255, 255, 255, 0.98)",
  accent: "#d9ab3f",
  accentHover: "rgba(217, 171, 63, 0.1)",
  accentActive: "rgba(35, 48, 93, 0.08)",
  textPrimary: "#23305d",
  textSecondary: "#64748b",
  textMuted: "#94a3b8",
  border: "#e2e8f0",
  overlayBg: "rgba(15, 23, 42, 0.4)",
  cardBg: "#f8fafc",
};

const SIDEBAR_EXPANDED = 264;
const SIDEBAR_COLLAPSED = 76;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const MainSidebar: React.FC = () => {
  const { user, logout, canAccess } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    admin: true,
    more: false,
  });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  /* ---- helpers ---- */
  const getDashboardHref = () => {
    if (user?.role === "kepsek") return "/dashboard/principal";
    if (user?.role === "guru") return "/teachers/dashboard_guru";
    return "/dashboard/admin-tu";
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const toggleSection = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  /* ---- menu data ---- */
  const mainItems: SidebarItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: getDashboardHref(),
    },
    {
      key: "lesson-plan-main",
      label: "Daily Lesson Plan",
      icon: <FileSpreadsheet size={20} />,
      href: "/dashboard/lesson-plan",
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserCircle size={20} />,
      href: "/dashboard/profile",
    },
  ];

  const adminItems: SidebarItem[] = [
    { key: "students", label: "Data Siswa", icon: <GraduationCap size={20} />, href: "/dashboard/students" },
    { key: "teachers", label: "Data Guru", icon: <Users size={20} />, href: "/dashboard/teachers" },
    { key: "academic", label: "Akademik", icon: <BookOpen size={20} />, href: "/dashboard/academic" },
    { key: "master-classes", label: "Master Kelas", icon: <GraduationCap size={20} />, href: "/dashboard/master-classes" },
    { key: "master-subjects", label: "Master Mata Pelajaran", icon: <BookOpen size={20} />, href: "/dashboard/master-subjects" },
    { key: "schedule", label: "Jadwal", icon: <Calendar size={20} />, href: "/dashboard/schedule" },
    { key: "attendance", label: "Absensi", icon: <UserCheck size={20} />, href: "/dashboard/attendance" },
    { key: "grades", label: "Penilaian", icon: <Award size={20} />, href: "/dashboard/grades" },
    { key: "counseling", label: "BK & Konseling", icon: <HeartHandshake size={20} />, href: "/dashboard/counseling" },
    { key: "achievements", label: "Prestasi", icon: <Award size={20} />, href: "/dashboard/achievements" },
    { key: "extracurricular", label: "Ekstrakurikuler", icon: <Users size={20} />, href: "/dashboard/extracurricular" },
    { key: "calendar-events", label: "Agenda Kalender", icon: <Calendar size={20} />, href: "/dashboard/calendar-events" },
    { key: "news-cms", label: "CMS Berita", icon: <Megaphone size={20} />, href: "/dashboard/news-cms" },
    { key: "library", label: "Drive Library & Summary", icon: <BookOpen size={20} />, href: "/dashboard/library" },
    { key: "reports", label: "Laporan", icon: <TrendingUp size={20} />, href: "/dashboard/reports" },
    { key: "lesson-plan", label: "Daily Lesson Plan", icon: <FileSpreadsheet size={20} />, href: "/dashboard/lesson-plan" },
    { key: "sapras", label: "Data Sapras", icon: <Package size={20} />, href: "/dashboard/admin-sapras" },
    { key: "student-cards", label: "Kartu & QR Siswa", icon: <QrCode size={20} />, href: "/dashboard/student-cards" },
    { key: "user-management", label: "Manajemen Pengguna", icon: <UserCircle size={20} />, href: "/dashboard/user-management" },
  ];

  const moreItems: SidebarItem[] = [
    { key: "announcements", label: "Pengumuman", icon: <Megaphone size={20} />, href: "/dashboard/announcements" },
    { key: "archives", label: "Arsip Dokumen", icon: <Archive size={20} />, href: "/dashboard/archives" },
    { key: "settings", label: "Pengaturan", icon: <Settings size={20} />, href: "/dashboard/settings" },
    { key: "help", label: "Bantuan", icon: <HelpCircle size={20} />, href: "/dashboard/help" },
  ];

  /* ---- role filter ---- */
  const allowedAdmin: Record<string, string[]> = {
    admin: ["students", "teachers", "academic", "master-classes", "master-subjects", "sapras", "schedule", "attendance", "grades", "counseling", "achievements", "reports", "lesson-plan", "student-cards", "user-management", "extracurricular", "calendar-events", "news-cms", "library"],
    kepsek: ["academic", "sapras", "schedule", "attendance", "achievements", "reports", "lesson-plan", "extracurricular", "calendar-events", "news-cms", "library"],
    guru: ["academic", "schedule", "attendance", "grades", "lesson-plan", "calendar-events", "library"],
  };
  const allowedMore: Record<string, string[]> = {
    admin: ["announcements", "archives", "settings", "help"],
    kepsek: ["announcements", "help"],
    guru: ["announcements", "help"],
  };

  const matrixFeatureByMenuKey: Record<string, string> = {
    students: "Data Siswa",
    teachers: "Data Guru",
    academic: "Akademik & Kurikulum",
    "master-classes": "Akademik & Kurikulum",
    "master-subjects": "Akademik & Kurikulum",
    schedule: "Jadwal Pelajaran",
    attendance: "Absensi & Presensi",
    grades: "Penilaian & Raport",
    counseling: "BK & Konseling",
    archives: "Arsip Dokumen Sekolah",
  };
  const isAllowedByMatrix = (key: string) =>
    !matrixFeatureByMenuKey[key] || canAccess(matrixFeatureByMenuKey[key]);

  const filteredAdmin = adminItems.filter((i) =>
    user?.role ? (allowedAdmin[user.role] || []).includes(i.key) && isAllowedByMatrix(i.key) : false,
  );
  const filteredMore = moreItems.filter((i) =>
    user?.role ? (allowedMore[user.role] || []).includes(i.key) && isAllowedByMatrix(i.key) : false,
  );

  /* ================================================================ */
  /*  Render helpers                                                    */
  /* ================================================================ */

  /** Single menu item */
  const renderItem = (item: SidebarItem, collapsed: boolean) => {
    const active = isActive(item.href);
    const hovered = hoveredItem === item.key;

    return (
      <Link
        key={item.key}
        to={item.href}
        onMouseEnter={() => setHoveredItem(item.key)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setIsMobileOpen(false)}
        className="relative flex items-center gap-3 rounded-xl transition-all duration-200"
        style={{
          padding: collapsed ? "10px 0" : "10px 14px",
          justifyContent: collapsed ? "center" : "flex-start",
          color: active ? "#23305d" : hovered ? COLORS.textPrimary : COLORS.textSecondary,
          background: active
            ? "rgba(35, 48, 93, 0.08)"
            : hovered
              ? COLORS.accentHover
              : "transparent",
        }}
        title={collapsed ? item.label : undefined}
      >
        {/* Active indicator bar */}
        {active && (
          <motion.div
            layoutId="sidebar-active-indicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3.5px] rounded-r-full"
            style={{ height: 24, background: "#d9ab3f" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}

        <span className="flex-shrink-0" style={{ width: 20, height: 20 }}>
          {item.icon}
        </span>

        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {item.label}
          </motion.span>
        )}

        {/* Tooltip when collapsed */}
        {collapsed && hovered && !isMobile && (
          <div
            className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap z-[100] pointer-events-none"
            style={{
              background: COLORS.sidebarBg,
              color: COLORS.accent,
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            {item.label}
          </div>
        )}
      </Link>
    );
  };

  /** Collapsible section */
  const renderSection = (
    section: { title: string; key: string; icon: React.ReactNode; items: SidebarItem[] },
    collapsed: boolean,
  ) => {
    if (section.items.length === 0) return null;
    const isOpen = openSections[section.key];

    if (collapsed) {
      // When collapsed, just show the items as a flat list of icons
      return (
        <div key={section.key} className="space-y-1">
          <div
            className="flex justify-center py-2"
            style={{ borderTop: `1px solid ${COLORS.border}` }}
          >
            <span style={{ color: COLORS.textMuted }}>{section.icon}</span>
          </div>
          {section.items.slice(0, 4).map((item) => renderItem(item, true))}
        </div>
      );
    }

    return (
      <div key={section.key}>
        {/* Section header */}
        <button
          onClick={() => toggleSection(section.key)}
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all duration-200"
          style={{ color: COLORS.accent }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.accentHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <div className="flex items-center gap-2">
            {section.icon}
            <span className="text-xs font-bold uppercase tracking-wider">
              {section.title}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </button>

        {/* Section items */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-0.5 mt-1">
                {section.items.map((item) => renderItem(item, false))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  /* ================================================================ */
  /*  Sidebar content (shared between desktop & mobile)                */
  /* ================================================================ */
  const sidebarContent = (collapsed: boolean) => (
    <div
      className="flex flex-col h-full"
      style={{
        width: isMobile ? 280 : collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED,
      }}
    >
      {/* ---- Logo ---- */}
      <div
        className="flex items-center gap-3 px-4 shrink-0"
        style={{
          height: 72,
          borderBottom: `1px solid ${COLORS.border}`,
          justifyContent: collapsed && !isMobile ? "center" : "flex-start",
        }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img src={ILoveGGS} alt="Logo" className="w-full h-full object-contain" />
        </div>
        {(!collapsed || isMobile) && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="min-w-0"
          >
            <h1 className="text-sm font-bold leading-tight" style={{ color: COLORS.textPrimary }}>
              GOLDEN<span style={{ color: COLORS.accent }}> GATE</span> SCHOOL
            </h1>
            <p className="text-[10px] mt-0.5" style={{ color: COLORS.textSecondary }}>
              Dashboard
            </p>
          </motion.div>
        )}
      </div>

      {/* ---- Scrollable menu area ---- */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-1"
        style={{
          paddingLeft: collapsed && !isMobile ? 12 : 16,
          paddingRight: collapsed && !isMobile ? 12 : 16,
          scrollbarWidth: "thin",
          scrollbarColor: `${COLORS.border} transparent`,
        }}
      >
        {/* Home link */}
        {renderItem(
          { key: "home", label: "Home", icon: <Home size={20} />, href: "/" },
          collapsed && !isMobile,
        )}

        {/* Divider */}
        <div className="py-2">
          <div style={{ height: 1, background: COLORS.border }} />
        </div>

        {/* Main items */}
        {(!collapsed || isMobile) && (
          <p
            className="text-[10px] font-bold uppercase tracking-widest px-3 pb-1"
            style={{ color: COLORS.textMuted }}
          >
            Menu Utama
          </p>
        )}
        {mainItems.map((item) => renderItem(item, collapsed && !isMobile))}

        {/* Divider */}
        <div className="py-2">
          <div style={{ height: 1, background: COLORS.border }} />
        </div>

        {/* Admin / Role section */}
        {renderSection(
          {
            title: user?.role ? `Menu ${roleLabels[user.role]}` : "Menu",
            key: "admin",
            icon: <Shield size={16} />,
            items: filteredAdmin,
          },
          collapsed && !isMobile,
        )}

        {/* More section */}
        {filteredMore.length > 0 && (
          <>
            <div className="py-1">
              <div style={{ height: 1, background: COLORS.border }} />
            </div>
            {renderSection(
              {
                title: "Lainnya",
                key: "more",
                icon: <MoreHorizontal size={16} />,
                items: filteredMore,
              },
              collapsed && !isMobile,
            )}
          </>
        )}
      </div>

      {/* ---- User profile + Logout ---- */}
      <div
        className="shrink-0 p-3"
        style={{ borderTop: `1px solid ${COLORS.border}` }}
      >
        {/* User info */}
        <div
          className="flex items-center gap-3 p-2.5 rounded-xl mb-2"
          style={{
            background: COLORS.cardBg,
            justifyContent: collapsed && !isMobile ? "center" : "flex-start",
          }}
        >
          <div className="relative flex-shrink-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(217,171,63,0.25), rgba(175,145,81,0.1))",
                border: "2px solid rgba(217,171,63,0.35)",
              }}
            >
              <UserCircle size={20} style={{ color: COLORS.accent }} />
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
              style={{ background: "#22c55e", border: `2px solid ${COLORS.sidebarBg}` }}
            />
          </div>
          {(!collapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-w-0 flex-1"
            >
              <p className="text-sm font-semibold truncate" style={{ color: COLORS.textPrimary }}>
                {user?.name || "User"}
              </p>
              <p className="text-[11px]" style={{ color: COLORS.textSecondary }}>
                {user?.role ? roleLabels[user.role] : "Guest"}
              </p>
            </motion.div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            setIsMobileOpen(false);
            logout();
            navigate("/");
          }}
          className="flex items-center gap-2 w-full rounded-xl transition-all duration-200"
          style={{
            padding: collapsed && !isMobile ? "10px 0" : "10px 14px",
            justifyContent: collapsed && !isMobile ? "center" : "flex-start",
            color: COLORS.accent,
            border: `1px solid rgba(217,171,63,0.3)`,
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.accent;
            e.currentTarget.style.color = COLORS.sidebarBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = COLORS.accent;
          }}
          title={collapsed && !isMobile ? "Keluar" : undefined}
        >
          <motion.div
            animate={{ x: [0, -2, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 3, duration: 1.2 }}
          >
            <LogOut size={18} />
          </motion.div>
          {(!collapsed || isMobile) && (
            <span className="text-sm font-semibold">Keluar</span>
          )}
        </button>
      </div>
    </div>
  );

  /* ================================================================ */
  /*  Render                                                            */
  /* ================================================================ */
  return (
    <>
      {/* ===== DESKTOP SIDEBAR ===== */}
      {!isMobile && (
        <motion.aside
          initial={false}
          animate={{ width: isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 h-screen z-40 flex-shrink-0"
          style={{
            background: COLORS.sidebarBgGlass,
            borderRight: `1px solid ${COLORS.border}`,
            backdropFilter: "blur(20px)",
            boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
          }}
        >
          {sidebarContent(isCollapsed)}

          {/* Collapse toggle button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-[82px] w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 z-50"
            style={{
              background: COLORS.sidebarBg,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.accent,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.accent;
              e.currentTarget.style.color = COLORS.sidebarBg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.sidebarBg;
              e.currentTarget.style.color = COLORS.accent;
            }}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </motion.aside>
      )}

      {/* Desktop spacer - pushes content to the right */}
      {!isMobile && (
        <motion.div
          initial={false}
          animate={{ width: isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex-shrink-0"
        />
      )}

      {/* ===== MOBILE HAMBURGER BUTTON ===== */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-2.5 rounded-xl transition-all duration-200"
          style={{
            background: COLORS.sidebarBgGlass,
            border: `1px solid ${COLORS.border}`,
            color: COLORS.accent,
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            backdropFilter: "blur(10px)",
            display: isMobileOpen ? "none" : "flex",
          }}
          aria-label="Open menu"
        >
          <MenuIcon size={22} />
        </button>
      )}

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50"
              style={{ background: COLORS.overlayBg, backdropFilter: "blur(4px)" }}
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-screen z-50"
              style={{
                background: COLORS.sidebarBgGlass,
                borderRight: `1px solid ${COLORS.border}`,
                backdropFilter: "blur(20px)",
                boxShadow: "8px 0 32px rgba(0,0,0,0.3)",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-5 right-4 p-1.5 rounded-lg transition-all duration-200 z-50"
                style={{ color: COLORS.textSecondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = COLORS.accent;
                  e.currentTarget.style.background = COLORS.accentHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = COLORS.textSecondary;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <X size={20} />
              </button>

              {sidebarContent(false)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainSidebar;
