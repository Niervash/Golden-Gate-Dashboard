import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

// Komponen Button Manual dengan palette baru
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
}

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    default: "text-white hover:opacity-90",
    secondary: "text-white hover:opacity-90",
    outline: "border bg-transparent hover:opacity-90",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  };

  // Style berdasarkan variant
  const getVariantStyle = () => {
    switch (variant) {
      case "default":
        return {
          backgroundColor: "#23305d",
          borderColor: "#23305d",
        };
      case "secondary":
        return {
          backgroundColor: "#d9ab3f",
          borderColor: "#d9ab3f",
          color: "#23305d",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: "#d9ab3f",
          color: "#d9ab3f",
        };
      default:
        return {
          backgroundColor: "#23305d",
          borderColor: "#23305d",
        };
    }
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={{
        ...getVariantStyle(),
        borderWidth: variant === "outline" ? "1px" : "0",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

// Komponen Input Manual
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className = "", ...props }: InputProps) => {
  const baseClasses =
    "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";

  return (
    <input
      className={`${baseClasses} ${className}`}
      style={{
        borderColor: "#43424e",
        color: "#23305d",
      }}
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

// Komponen Label Manual
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

const Label = ({ children, className = "", ...props }: LabelProps) => {
  const baseClasses =
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

  return (
    <label
      className={`${baseClasses} ${className}`}
      style={{ color: "#23305d" }}
      {...props}
    >
      {children}
    </label>
  );
};

type UserRole = "admin" | "kepsek" | "guru";

const roles: {
  value: UserRole;
  label: string;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    value: "admin",
    label: "Administrator",
    icon: Shield,
    description: "Akses penuh ke semua fitur",
  },
  {
    value: "kepsek",
    label: "Kepala Sekolah",
    icon: Users,
    description: "Monitoring & laporan sekolah",
  },
  {
    value: "guru",
    label: "Guru",
    icon: BookOpen,
    description: "Akademik, absensi & penilaian",
  },
];

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted - Logic akan dihandle oleh BE nanti");
  };

  return (
    <div
      className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 min-h-screen lg:min-h-0"
      style={{ backgroundColor: "#ffffff" }}
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 transition-colors mb-6 lg:mb-8"
          style={{ color: "#23305d" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#d9ab3f")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#23305d")}
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        {/* Mobile Logo */}
        <div className="lg:hidden mb-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center">
            <img
              src={ILoveGGS}
              alt="Logo Golden Gate School"
              className="w-20 h-20 md:w-20 md:h-20"
            />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "#23305d" }}>
            GOLDEN GATE SCHOOL
          </h1>
        </div>

        <div className="mb-6 lg:mb-8">
          <h2
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2"
            style={{ color: "#23305d" }}
          >
            Selamat Datang Kembali
          </h2>
          <p className="text-sm sm:text-base" style={{ color: "#af9151" }}>
            Masuk ke akun Anda untuk mengakses dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label>Masuk Sebagai</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                      backgroundColor: isSelected
                        ? "rgba(35, 48, 93, 0.05)"
                        : "transparent",
                      color: isSelected ? "#23305d" : "#23305d",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "#d9ab3f";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "#43424e";
                      }
                    }}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6 mb-2"
                      style={{
                        color: isSelected ? "#23305d" : "#af9151",
                      }}
                    />
                    <p className="font-medium text-sm">{role.label}</p>
                    <p
                      className="text-xs mt-1 hidden sm:block"
                      style={{ color: "#af9151" }}
                    >
                      {role.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email / NIP</Label>
            <Input
              id="email"
              type="text"
              placeholder="Masukkan email atau NIP"
              className="h-11 sm:h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                color: "#23305d",
                placeholder: "#af9151",
              }}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="h-11 sm:h-12 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  color: "#23305d",
                  placeholder: "#af9151",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "#af9151" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d9ab3f")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#af9151")}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded transition-colors"
                style={{
                  borderColor: "#43424e",
                  backgroundColor: rememberMe ? "#23305d" : "white",
                }}
              />
              <span className="text-sm" style={{ color: "#23305d" }}>
                Ingat saya
              </span>
            </label>
            <a
              href="#"
              className="text-sm transition-colors"
              style={{ color: "#af9151" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d9ab3f")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#af9151")}
            >
              Lupa password?
            </a>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-11 sm:h-12 text-base font-semibold transition-all"
            style={{
              backgroundColor: "#23305d",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1c284c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#23305d";
            }}
          >
            Masuk
          </Button>

          {/* Demo Credentials */}
          <div
            className="p-3 sm:p-4 rounded-lg"
            style={{
              backgroundColor: "rgba(175, 145, 81, 0.1)",
              border: "1px solid rgba(175, 145, 81, 0.2)",
            }}
          >
            <p className="text-xs text-center" style={{ color: "#23305d" }}>
              <span style={{ color: "#23305d", fontWeight: "bold" }}>
                Demo:
              </span>{" "}
              Pilih role, masukkan email & password apapun untuk login
            </p>
          </div>
        </form>

        <p
          className="text-center text-sm mt-6 lg:mt-8"
          style={{ color: "#23305d" }}
        >
          Butuh bantuan?{" "}
          <a
            href="#"
            className="transition-colors"
            style={{ color: "#af9151" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d9ab3f")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#af9151")}
          >
            Hubungi Admin
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
