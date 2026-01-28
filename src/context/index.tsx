import { createContext, useContext, useState } from "react";

export type UserRole = "admin" | "kepsek" | "guru";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const roleUsers: Record<UserRole, User> = {
  admin: {
    id: "1",
    name: "Administrator",
    email: "admin@smanusantara.sch.id",
    role: "admin",
  },
  kepsek: {
    id: "2",
    name: "Dr. Ahmad Suryadi, M.Pd",
    email: "kepsek@smanusantara.sch.id",
    role: "kepsek",
  },
  guru: {
    id: "3",
    name: "Budi Santoso, S.Pd",
    email: "budi@smanusantara.sch.id",
    role: "guru",
  },
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole | null;
    return savedRole ? roleUsers[savedRole] : null;
  });

  const login = (role: UserRole) => {
    const userData = roleUsers[role];
    setUser(userData);
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
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
    "/dashboard/siswa",
    "/dashboard/guru",
    "/dashboard/akademik",
    "/dashboard/prestasi",
    "/dashboard/pengumuman",
    "/dashboard/laporan",
  ],
  guru: [
    "/dashboard",
    "/dashboard/siswa",
    "/dashboard/jadwal",
    "/dashboard/absensi",
    "/dashboard/penilaian",
    "/dashboard/pengumuman",
  ],
};

export const roleLabels: Record<UserRole, string> = {
  admin: "Administrator",
  kepsek: "Kepala Sekolah",
  guru: "Guru",
};
