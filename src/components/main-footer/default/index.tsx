import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ILoveGGS } from "../../../assets";

interface SocialLink {
  icon: React.ComponentType<any>;
  href: string;
  label: string;
}

interface NavLink {
  label: string;
  href: string;
}

const quickLinks: NavLink[] = [
  { label: "Profil Sekolah", href: "#profil" },
  { label: "Program Studi", href: "#program" },
  { label: "Prestasi", href: "#prestasi" },
  { label: "Berita", href: "#berita" },
  { label: "PPDB Online", href: "/ppdb" },
];

const legalLinks: NavLink[] = [
  { label: "Kebijakan Privasi", href: "#" },
  { label: "Syarat & Ketentuan", href: "#" },
];

const socialLinks: SocialLink[] = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const MainFooter: React.FC = () => {
  return (
    <footer
      className="text-white"
      style={{ background: "#23305d" }} // dark blue
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-3 mb-6 no-underline hover:no-underline"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                {/* Logo Section */}
                <img
                  src={ILoveGGS}
                  alt="Logo Golden Gate School"
                  className="w-23 h-12 md:w-22 md:h-12"
                />
              </div>
              <div className=" sm:block">
                <h1 className="text-lg md:text-xl font-bold">
                  GOLDEN
                  <span style={{ color: "#d9ab3f" }}> GATE </span>
                  <span> SCHOOL </span>
                </h1>
                <p className="text-xs" style={{ color: "#af9151" }}>
                  Unggul • Berkarakter • Berprestasi
                </p>
              </div>
            </Link>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "#af9151" }} // gray orange2
            >
              Membangun generasi unggul dan berkarakter melalui pendidikan
              berkualitas sejak 1985.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors no-underline"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "#d9ab3f", // gray orange1
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#d9ab3f"; // gray orange1
                      e.currentTarget.style.color = "#23305d"; // dark blue
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.color = "#d9ab3f"; // gray orange1
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Tautan Cepat
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors block py-1 no-underline hover:no-underline"
                    style={{ color: "#af9151" }} // gray orange2
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#d9ab3f"; // gray orange1
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#af9151"; // gray orange2
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: "#d9ab3f" }}
                />
                <span className="text-sm" style={{ color: "#af9151" }}>
                  Jl. Pendidikan No. 123, Kota Jakarta Selatan, DKI Jakarta
                  12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#d9ab3f" }}
                />
                <span className="text-sm" style={{ color: "#af9151" }}>
                  (021) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#d9ab3f" }}
                />
                <span className="text-sm" style={{ color: "#af9151" }}>
                  info@ggschool.sch.id
                </span>
              </li>
            </ul>
          </div>

          {/* Operating Hours Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Jam Operasional
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span style={{ color: "#af9151" }}>Senin - Jumat</span>
                <span style={{ color: "#d9ab3f" }}>07:00 - 16:00</span>
              </li>
              <li className="flex justify-between">
                <span style={{ color: "#af9151" }}>Sabtu</span>
                <span style={{ color: "#d9ab3f" }}>07:00 - 12:00</span>
              </li>
              <li className="flex justify-between">
                <span style={{ color: "rgba(175, 145, 81, 0.5)" }}>Minggu</span>
                <span style={{ color: "rgba(175, 145, 81, 0.5)" }}>Tutup</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid #43424e" }}>
        {" "}
        {/* gray blue */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-sm text-center md:text-left"
              style={{ color: "rgba(175, 145, 81, 0.7)" }} // gray orange2 with opacity
            >
              © 2025 GOLDEN GATE SCHOOL. Hak Cipta Dilindungi.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm transition-colors no-underline hover:no-underline"
                  style={{ color: "rgba(175, 145, 81, 0.7)" }} // gray orange2 with opacity
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#d9ab3f"; // gray orange1
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(175, 145, 81, 0.7)"; // gray orange2 with opacity
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
