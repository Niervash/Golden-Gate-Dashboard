import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi, settingsApi, studentsApi } from "../utils/api";

export type UserRole = "admin" | "kepsek" | "guru" | "murid";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  class?: string;
  nis?: string;
}

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  authReady: boolean;
  canAccess: (feature: string) => boolean;
  refreshPermissions: () => Promise<void>;
}

type PermissionRow = { feature: string; admin: boolean; kepsek: boolean; guru: boolean; murid: boolean };

// This is the safe fallback while the permission matrix cannot be loaded.
const DEFAULT_PERMISSIONS: PermissionRow[] = [
  { feature: "Data Siswa", admin: true, kepsek: false, guru: false, murid: false },
  { feature: "Data Guru", admin: true, kepsek: false, guru: false, murid: false },
  { feature: "Akademik & Kurikulum", admin: true, kepsek: true, guru: true, murid: false },
  { feature: "Jadwal Pelajaran", admin: true, kepsek: true, guru: true, murid: false },
  { feature: "Absensi & Presensi", admin: true, kepsek: true, guru: true, murid: false },
  { feature: "Penilaian & Raport", admin: true, kepsek: false, guru: true, murid: false },
  { feature: "BK & Konseling", admin: true, kepsek: false, guru: false, murid: false },
  { feature: "Arsip Dokumen Sekolah", admin: true, kepsek: false, guru: false, murid: false },
];

const mapApiUser = (apiUser: any): User => ({
  id: String(apiUser.id),
  name: apiUser.name,
  email: apiUser.email,
  role: apiUser.role === "kepsek" ? "kepsek" : apiUser.role === "guru" ? "guru" : apiUser.role === "siswa" ? "murid" : "admin",
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("ggs_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [authReady, setAuthReady] = useState(false);
  const [permissions, setPermissions] = useState<PermissionRow[]>(DEFAULT_PERMISSIONS);

  const clearLocalSession = () => {
    setUser(null);
    localStorage.removeItem("ggs_user");
    localStorage.removeItem("ggs_access_token");
    localStorage.removeItem("userRole");
  };

  const loadPermissions = async () => {
    try {
      const res = await settingsApi.getAll();
      const data = res.data?.data || res.data || {};
      const matrix = typeof data.permissions_matrix === "string"
        ? JSON.parse(data.permissions_matrix)
        : data.permissions_matrix;
      if (Array.isArray(matrix)) setPermissions(matrix);
    } catch {
      // Use the restrictive local defaults when this role cannot read settings.
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("ggs_access_token");
      if (!token) {
        clearLocalSession();
        setAuthReady(true);
        return;
      }
      try {
        const res = await authApi.me();
        const apiUser = res.data?.user || res.data?.data || res.data;
        if (!apiUser?.id || !apiUser?.role) throw new Error("Invalid session response");
        const restoredUser = mapApiUser(apiUser);
        setUser(restoredUser);
        localStorage.setItem("ggs_user", JSON.stringify(restoredUser));
        localStorage.setItem("userRole", restoredUser.role);
        await loadPermissions();
      } catch {
        clearLocalSession();
      } finally {
        setAuthReady(true);
      }
    };
    restoreSession();
  }, []);

  const login = async (identifier: string, password: string) => {
    const res = await authApi.login({ identifier, password });
    const { user: apiUser, accessToken } = res.data;

    // Store access token for Bearer auth
    if (accessToken) {
      localStorage.setItem("ggs_access_token", accessToken);
    }

    const userData = mapApiUser(apiUser);
    const mappedRole = userData.role;

    // Enrich murid profile with class/nis from students table (match by email)
    if (mappedRole === "murid") {
      try {
        const res = await studentsApi.getMe();
        const match = res.data?.data || res.data;
        if (match) {
          userData.class = match.kelas;
          userData.nis = match.nis;
          if (match.nama_lengkap) userData.name = match.nama_lengkap;
        }
      } catch {
        // non-blocking — student dashboard can still resolve profile later
      }
    }

    setUser(userData);
    localStorage.setItem("ggs_user", JSON.stringify(userData));
    localStorage.setItem("userRole", mappedRole);
    await loadPermissions();
    return userData;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore — clear local state regardless
    }
    clearLocalSession();
  };

  const canAccess = useMemo(() => (feature: string) => {
    if (!user) return false;
    const row = permissions.find((item) => item.feature === feature);
    return row ? Boolean(row[user.role]) : true;
  }, [permissions, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user && authReady,
        authReady,
        canAccess,
        refreshPermissions: loadPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Role-based menu configuration
export const roleMenuConfig: Record<UserRole, string[]> = {
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
    "/dashboard/akademik",
    "/dashboard/prestasi",
    "/dashboard/pengumuman",
    "/dashboard/laporan",
  ],
  guru: [
    "/dashboard",
    "/dashboard/jadwal",
    "/dashboard/absensi",
    "/dashboard/penilaian",
    "/dashboard/pengumuman",
  ],
  murid: [
    "/student/dashboard",
  ],
};

export const roleLabels: Record<UserRole, string> = {
  admin: "Administrator",
  kepsek: "Kepala Sekolah",
  guru: "Guru",
  murid: "Siswa",
};

