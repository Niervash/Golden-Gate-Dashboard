import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/api";
import {
  GraduationCap,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  Users,
  BookOpen,
} from "lucide-react";
import { ILoveGGS } from "../../../assets";

// Reusing same internal components as LoginForm for consistency
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: any) => {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    default: "text-white hover:opacity-90",
    secondary: "text-white hover:opacity-90",
    outline: "border bg-transparent hover:opacity-90",
  } as any;

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  } as any;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: variant === "default" ? "#23305d" : "transparent",
        color: variant === "default" ? "#fff" : "#23305d",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }: any) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors ${className}`}
      style={{ borderColor: "#43424e", color: "#23305d" }}
      onFocus={(e) => {
        e.target.style.borderColor = "#d9ab3f";
        e.target.style.boxShadow = "0 0 0 2px rgba(217, 171, 63, 0.1)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "#43424e";
        e.target.style.boxShadow = "none";
      }}
      {...props}
    />
  );
};

const Label = ({ children, className = "", ...props }: any) => {
  return (
    <label className={`text-sm font-medium leading-none ${className}`} style={{ color: "#23305d" }} {...props}>
      {children}
    </label>
  );
};

type UserRole = "kepala-sekolah" | "admin-tu" | "subject-teacher" | "homeroom-teacher";

const roles: {
  value: UserRole;
  label: string;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    value: "kepala-sekolah",
    label: "Kepala Sekolah",
    icon: Shield,
    description: "Monitoring & laporan",
  },
  {
    value: "admin-tu",
    label: "Admin TU",
    icon: Users,
    description: "Administrasi sekolah",
  },
  {
    value: "subject-teacher",
    label: "Guru Mapel",
    icon: BookOpen,
    description: "Akademik & nilai",
  },
  {
    value: "homeroom-teacher",
    label: "Wali Kelas",
    icon: GraduationCap,
    description: "Pendampingan siswa",
  },
];

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Silakan pilih salah satu role.");
      return;
    }

    let backendRole = "admin";
    if (selectedRole === "kepala-sekolah") {
      backendRole = "kepsek";
    } else if (selectedRole === "admin-tu") {
      backendRole = "admin";
    } else if (selectedRole === "subject-teacher" || selectedRole === "homeroom-teacher") {
      backendRole = "guru";
    }

    try {
      await authApi.register({ name, email, password, role: backendRole });
      alert("Pendaftaran berhasil! Silakan login.");
      navigate("/auth/login");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Pendaftaran gagal.");
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 min-h-screen lg:min-h-0" style={{ backgroundColor: "#ffffff" }}>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 transition-colors mb-6 lg:mb-8" style={{ color: "#23305d" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#d9ab3f")} onMouseLeave={(e) => (e.currentTarget.style.color = "#23305d")}>
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <div className="lg:hidden mb-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center">
            <img src={ILoveGGS} alt="Logo" className="w-20 h-20" />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "#23305d" }}>GOLDEN GATE SCHOOL</h1>
        </div>

        <div className="mb-6 lg:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2" style={{ color: "#23305d" }}>Pendaftaran Akun Baru</h2>
          <p className="text-sm sm:text-base" style={{ color: "#af9151" }}>Lengkapi data di bawah ini untuk membuat akun</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-3">
            <Label>Daftar Sebagai</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.value;
                return (
                  <motion.button
                    key={role.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole(role.value)}
                    className="p-3 sm:p-4 rounded-xl border-2 transition-all text-left"
                    style={{
                      borderColor: isSelected ? "#23305d" : "#43424e",
                      backgroundColor: isSelected ? "rgba(35, 48, 93, 0.05)" : "transparent",
                    }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-2" style={{ color: isSelected ? "#23305d" : "#af9151" }} />
                    <p className="font-medium text-sm" style={{ color: "#23305d" }}>{role.label}</p>
                    <p className="text-xs mt-1 hidden sm:block" style={{ color: "#af9151" }}>{role.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" type="text" placeholder="Masukkan nama lengkap" className="h-11 sm:h-12" value={name} onChange={(e: any) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email / NIP</Label>
            <Input id="email" type="text" placeholder="Masukkan email atau NIP" className="h-11 sm:h-12" value={email} onChange={(e: any) => setEmail(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="Masukkan password" className="h-11 sm:h-12 pr-12" value={password} onChange={(e: any) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff className="w-5 h-5" style={{ color: "#af9151" }} /> : <Eye className="w-5 h-5" style={{ color: "#af9151" }} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-11 sm:h-12 text-base font-semibold transition-all hover:bg-[#1c284c]">
            Daftar Sekarang
          </Button>
        </form>

        <p className="text-center text-sm mt-6 lg:mt-8" style={{ color: "#23305d" }}>
          Sudah punya akun?{" "}
          <Link to="/auth/login" className="transition-colors font-semibold" style={{ color: "#af9151" }}>Masuk</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
