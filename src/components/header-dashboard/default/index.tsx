import {
  Bell,
  Search,
  Menu,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";

// Hook auth custom
const useAuth = () => {
  // Ini adalah mock, gantilah dengan implementasi sebenarnya
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

// Mapping role ke label
const roleLabels: Record<string, string> = {
  admin: "Administrator",
  kepsek: "Kepala Sekolah",
  guru: "Guru",
  siswa: "Siswa",
};

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const [isDark, setIsDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Refs untuk deteksi klik di luar dropdown
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    logout();
    toast.success("Berhasil keluar");
    navigate("/");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Avatar component
  const Avatar = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={`relative ${className}`}>{children}</div>;

  const AvatarFallback = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>;

  // Badge component
  const Badge = ({
    children,
    variant = "default",
    className = "",
  }: {
    children: React.ReactNode;
    variant?: string;
    className?: string;
  }) => {
    const variantStyles = {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input bg-transparent",
    };

    return (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variantStyles[variant as keyof typeof variantStyles] || variantStyles.default} ${className}`}
      >
        {children}
      </span>
    );
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30"
      style={{
        backgroundColor: "#23305d",
        borderBottom: "1px solid #43424e",
      }}
    >
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg transition-colors"
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
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input */}
        <div className="hidden md:flex items-center relative">
          <Search
            className="absolute left-3 w-4 h-4"
            style={{ color: "#af9151" }}
          />
          <input
            type="text"
            placeholder="Cari..."
            className="w-64 lg:w-80 pl-10 h-10 rounded-md text-sm outline-none transition-all"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid #43424e",
              color: "#ffffff",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#d9ab3f";
              e.target.style.boxShadow = "0 0 0 2px rgba(217, 171, 63, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#43424e";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors relative"
          style={{
            color: "#af9151",
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
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="p-2 rounded-lg transition-colors relative"
            style={{
              color: "#af9151",
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
            <Bell className="w-5 h-5" />
            <span
              className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full flex items-center justify-center font-bold"
              style={{
                backgroundColor: "#ef4444",
                color: "#ffffff",
              }}
            >
              3
            </span>
          </button>

          {/* Notifications Dropdown Content */}
          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-50"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
              }}
            >
              <div className="p-4">
                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ color: "#23305d" }}
                >
                  Notifikasi
                </h3>
                <div className="border-t" style={{ borderColor: "#e5e7eb" }} />

                <div className="py-3 cursor-pointer hover:bg-gray-50 transition-colors px-2 rounded">
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#23305d" }}
                    >
                      Data absensi baru
                    </span>
                    <span className="text-xs" style={{ color: "#6b7280" }}>
                      5 menit lalu
                    </span>
                  </div>
                </div>

                <div className="py-3 cursor-pointer hover:bg-gray-50 transition-colors px-2 rounded">
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#23305d" }}
                    >
                      Tugas baru ditambahkan
                    </span>
                    <span className="text-xs" style={{ color: "#6b7280" }}>
                      1 jam lalu
                    </span>
                  </div>
                </div>

                <div className="py-3 cursor-pointer hover:bg-gray-50 transition-colors px-2 rounded">
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#23305d" }}
                    >
                      Rapat besok pukul 10:00
                    </span>
                    <span className="text-xs" style={{ color: "#6b7280" }}>
                      Kemarin
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 h-10 px-3 rounded-lg transition-colors"
            style={{
              color: "#af9151",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(217, 171, 63, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {/* Avatar */}
            <Avatar>
              <AvatarFallback
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{
                  backgroundColor: "#d9ab3f",
                  color: "#23305d",
                }}
              >
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            {/* User Info - Desktop Only */}
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium" style={{ color: "#ffffff" }}>
                {user?.name || "User"}
              </p>
              <p className="text-xs" style={{ color: "#af9151" }}>
                {user?.role ? roleLabels[user.role] : "Guest"}
              </p>
            </div>
          </button>

          {/* Profile Dropdown Content */}
          {showProfile && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-50"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
              }}
            >
              <div className="p-4">
                {/* User Info */}
                <div className="mb-3">
                  <p
                    className="font-medium text-sm"
                    style={{ color: "#23305d" }}
                  >
                    {user?.name}
                  </p>
                  <Badge
                    variant="secondary"
                    className="mt-1 text-xs"
                    style={{
                      backgroundColor: "rgba(217, 171, 63, 0.1)",
                      color: "#23305d",
                    }}
                  >
                    {user?.role ? roleLabels[user.role] : "Guest"}
                  </Badge>
                </div>

                <div className="border-t" style={{ borderColor: "#e5e7eb" }} />

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors"
                    style={{ color: "#23305d" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(217, 171, 63, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profil
                  </button>

                  <button
                    className="flex items-center w-full px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors"
                    style={{ color: "#23305d" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(217, 171, 63, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Pengaturan
                  </button>
                </div>

                <div className="border-t" style={{ borderColor: "#e5e7eb" }} />

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors mt-1"
                  style={{ color: "#ef4444" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(239, 68, 68, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
