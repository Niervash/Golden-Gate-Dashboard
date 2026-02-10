import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  ClipboardCheck,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Award,
  BarChart3,
  FolderOpen,
  MessageSquare,
  Home,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  collapsed?: boolean;
  onCollapse?: () => void;
  onMobileClose?: () => void;
  isMobile?: boolean;
}

// Mock untuk useAuth
const useAuth = () => {
  return {
    user: {
      name: "Admin User",
      role: "admin",
      email: "admin@goldengate.sch.id",
    },
    logout: () => {
      console.log("Logout called");
    },
  };
};

// Role configuration
const roleLabels: Record<string, string> = {
  admin: "Administrator",
  kepsek: "Kepala Sekolah",
  guru: "Guru",
  siswa: "Siswa",
};

// Role menu configuration
const roleMenuConfig: Record<string, string[]> = {
  admin: [
    "/dashboard",
    "/dashboard/siswa",
    "/dashboard/guru",
    "/dashboard/akademik",
    "/dashboard/jadwal",
    "/dashboard/absensi",
    "/dashboard/penilaian",
    "/dashboard/bk",
    "/dashboard/prestasi",
    "/dashboard/pengumuman",
    "/dashboard/arsip",
    "/dashboard/laporan",
    "/dashboard/pengaturan",
  ],
  kepsek: [
    "/dashboard",
    "/dashboard/siswa",
    "/dashboard/guru",
    "/dashboard/akademik",
    "/dashboard/jadwal",
    "/dashboard/laporan",
    "/dashboard/pengumuman",
  ],
  guru: [
    "/dashboard",
    "/dashboard/siswa",
    "/dashboard/akademik",
    "/dashboard/jadwal",
    "/dashboard/absensi",
    "/dashboard/penilaian",
  ],
  siswa: [
    "/dashboard",
    "/dashboard/jadwal",
    "/dashboard/absensi",
    "/dashboard/penilaian",
    "/dashboard/prestasi",
    "/dashboard/pengumuman",
  ],
};

// Class name utility
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

// All menu items
const allMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Manajemen Siswa", href: "/dashboard/siswa" },
  { icon: UserCheck, label: "Manajemen Guru", href: "/dashboard/guru" },
  { icon: BookOpen, label: "Akademik", href: "/dashboard/akademik" },
  { icon: Calendar, label: "Jadwal", href: "/dashboard/jadwal" },
  { icon: ClipboardCheck, label: "Absensi", href: "/dashboard/absensi" },
  { icon: FileText, label: "Penilaian & Raport", href: "/dashboard/penilaian" },
  { icon: MessageSquare, label: "BK & Konseling", href: "/dashboard/bk" },
  { icon: Award, label: "Prestasi", href: "/dashboard/prestasi" },
  { icon: Bell, label: "Pengumuman", href: "/dashboard/pengumuman" },
  { icon: FolderOpen, label: "Arsip Dokumen", href: "/dashboard/arsip" },
  { icon: BarChart3, label: "Laporan", href: "/dashboard/laporan" },
  { icon: Settings, label: "Pengaturan", href: "/dashboard/pengaturan" },
];

const DashboardSidebar: React.FC = ({
  collapsed = false,
  onCollapse,
  onMobileClose,
  isMobile = false,
}: DashboardSidebarProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Sync dengan props external
  useEffect(() => {
    setInternalCollapsed(collapsed);
  }, [collapsed]);

  // Get menu items berdasarkan role
  const allowedPaths = user?.role ? roleMenuConfig[user.role] : [];
  const menuItems = allMenuItems.filter((item) =>
    allowedPaths.includes(item.href),
  );

  // Handle collapse toggle
  const handleCollapseToggle = () => {
    if (onCollapse) {
      onCollapse();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  // Handle mobile close
  const handleMobileClose = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  // Handle link click
  const handleLinkClick = () => {
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <motion.aside
      animate={{ width: internalCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen flex flex-col"
      style={{
        backgroundColor: "#23305d",
        borderRight: "1px solid #43424e",
        width: isMobile ? "280px" : internalCollapsed ? "80px" : "280px",
      }}
    >
      {/* Logo Section */}
      <div
        className="h-16 flex items-center justify-between px-4 relative"
        style={{ borderBottom: "1px solid #43424e" }}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={handleMobileClose}
            className="absolute right-3 p-2 rounded-lg transition-colors"
            style={{
              color: "#d9ab3f",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(217, 171, 63, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <Link
          to="/dashboard"
          className="flex items-center gap-3 no-underline"
          style={{ color: "#ffffff" }}
          onClick={handleLinkClick}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "rgba(217, 171, 63, 0.2)",
              border: "1px solid rgba(217, 171, 63, 0.3)",
            }}
          >
            <GraduationCap className="w-6 h-6" style={{ color: "#d9ab3f" }} />
          </div>
          <AnimatePresence mode="wait">
            {!internalCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1
                  className="font-bold whitespace-nowrap text-sm"
                  style={{ color: "#ffffff" }}
                >
                  GOLDEN GATE SCHOOL
                </h1>
                <p
                  className="text-xs whitespace-nowrap"
                  style={{ color: "#af9151" }}
                >
                  {user?.role ? roleLabels[user.role] : "Dashboard"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* User Info - Expanded */}
      {!internalCollapsed && user && (
        <div className="p-4" style={{ borderBottom: "1px solid #43424e" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(217, 171, 63, 0.2)",
                color: "#d9ab3f",
                border: "1px solid rgba(217, 171, 63, 0.3)",
              }}
            >
              <span className="text-lg font-bold">{user.name.charAt(0)}</span>
            </div>
            <div className="overflow-hidden">
              <h3
                className="font-semibold text-sm truncate"
                style={{ color: "#ffffff" }}
              >
                {user.name}
              </h3>
              <p className="text-xs truncate" style={{ color: "#af9151" }}>
                {user.email}
              </p>
              <div
                className="inline-block px-2 py-0.5 rounded-full text-xs mt-1"
                style={{
                  backgroundColor: "rgba(217, 171, 63, 0.2)",
                  color: "#d9ab3f",
                }}
              >
                {user?.role ? roleLabels[user.role] : "User"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Info - Collapsed (non-mobile) */}
      {internalCollapsed && user && !isMobile && (
        <div className="p-3" style={{ borderBottom: "1px solid #43424e" }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto"
            style={{
              backgroundColor: "rgba(217, 171, 63, 0.2)",
              color: "#d9ab3f",
              border: "1px solid rgba(217, 171, 63, 0.3)",
            }}
          >
            <span className="text-sm font-bold">{user.name.charAt(0)}</span>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {/* Back to Home Button */}
          <li>
            <Link
              to="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-2",
              )}
              style={{
                color: "#af9151",
                backgroundColor: "rgba(175, 145, 81, 0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(217, 171, 63, 0.2)";
                e.currentTarget.style.color = "#d9ab3f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(175, 145, 81, 0.1)";
                e.currentTarget.style.color = "#af9151";
              }}
              onClick={handleLinkClick}
            >
              <Home className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {!internalCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    Kembali ke Beranda
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </li>

          {/* Menu Items */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group no-underline",
                  )}
                  style={{
                    color: isActive ? "#d9ab3f" : "#af9151",
                    backgroundColor: isActive
                      ? "rgba(217, 171, 63, 0.15)"
                      : "transparent",
                    borderLeft: isActive
                      ? "3px solid #d9ab3f"
                      : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(217, 171, 63, 0.1)";
                      e.currentTarget.style.color = "#d9ab3f";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#af9151";
                    }
                  }}
                  onClick={handleLinkClick}
                >
                  <Icon
                    className="w-5 h-5 flex-shrink-0"
                    style={{
                      color: isActive ? "#d9ab3f" : "inherit",
                    }}
                  />
                  <AnimatePresence mode="wait">
                    {!internalCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3" style={{ borderTop: "1px solid #43424e" }}>
        {/* Collapse Button - Only show on desktop */}
        {!isMobile && (
          <button
            onClick={handleCollapseToggle}
            className="w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg transition-colors mb-2"
            style={{
              color: "#af9151",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(217, 171, 63, 0.1)";
              e.currentTarget.style.color = "#d9ab3f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#af9151";
            }}
          >
            {internalCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <AnimatePresence mode="wait">
                  {!internalCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium"
                    >
                      Kecilkan
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </button>
        )}

        {/* Copyright - Only show when expanded */}
        {!internalCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 pt-2 text-center"
            style={{ borderTop: "1px solid rgba(67, 66, 78, 0.5)" }}
          >
            <p
              className="text-xs"
              style={{ color: "rgba(255, 255, 255, 0.4)" }}
            >
              © 2024 Golden Gate School
            </p>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;
