import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

// Import Leaflet dan React-Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import gambar Leaflet
import leafletMarkerIcon from "leaflet/dist/images/marker-icon.png";
import leafletMarkerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import leafletMarkerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix untuk ikon marker di Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: leafletMarkerIcon2x,
  iconUrl: leafletMarkerIcon,
  shadowUrl: leafletMarkerShadow,
});

interface ContactItem {
  icon: React.ComponentType<any>;
  title: string;
  content: string | React.ReactNode;
  secondContent?: string;
}

// Koordinat sekolah (contoh: Jakarta Selatan)
const schoolCoordinates = {
  lat: -6.2088,
  lng: 106.8456,
  address: "Jl. Pendidikan No. 123, Kota Jakarta Selatan, DKI Jakarta 12345",
};

const contactItems: ContactItem[] = [
  {
    icon: MapPin,
    title: "Alamat",
    content: schoolCoordinates.address,
  },
  {
    icon: Phone,
    title: "Telepon",
    content: "(021) 123-4567",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@ggschool.sch.id",
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    content: "Senin - Jumat: 07:00 - 16:00 WIB",
    secondContent: "Sabtu: 07:00 - 12:00 WIB",
  },
];

// Custom Icon untuk marker
const createCustomIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        background-color: #d9ab3f;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `,
    className: "custom-marker",
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });
};

const ContactSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulasi loading peta
    setTimeout(() => setMapLoaded(true), 300);
  }, []);

  // Nomor WhatsApp sekolah
  const whatsappNumber = "6281234567890";
  const whatsappMessage = encodeURIComponent(
    "Halo GOLDEN GATE SCHOOL, saya ingin bertanya tentang informasi sekolah...",
  );

  return (
    <section id="kontak" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "rgba(217, 171, 63, 0.15)",
              color: "#d9ab3f",
            }}
            whileHover={{ scale: 1.05 }}
          >
            Hubungi Kami
          </motion.span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "#23305d" }}
          >
            Kontak &{" "}
            <span style={{ color: "#d9ab3f" }} className="font-bold">
              Lokasi
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#43424e" }}>
            Kunjungi lokasi kami atau hubungi melalui kontak di bawah untuk
            informasi lebih lanjut tentang program pendidikan.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Map Section dengan Leaflet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-xl h-[400px] relative z-0"
          >
            {isClient ? (
              <>
                <MapContainer
                  center={[schoolCoordinates.lat, schoolCoordinates.lng]}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                  className="rounded-2xl"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[schoolCoordinates.lat, schoolCoordinates.lng]}
                    icon={createCustomIcon()}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3
                          className="font-bold text-lg mb-2"
                          style={{ color: "#23305d" }}
                        >
                          GOLDEN GATE SCHOOL
                        </h3>
                        <p
                          className="text-sm mb-2"
                          style={{ color: "#43424e" }}
                        >
                          {schoolCoordinates.address}
                        </p>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${schoolCoordinates.lat},${schoolCoordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm px-3 py-1 rounded"
                          style={{
                            background: "#d9ab3f",
                            color: "#23305d",
                          }}
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          Petunjuk Arah
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>

                {/* Loading Overlay */}
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-2xl">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-t-transparent border-d9ab3f rounded-full animate-spin mx-auto mb-4"></div>
                      <p style={{ color: "#43424e" }}>Memuat peta...</p>
                    </div>
                  </div>
                )}

                {/* Map Controls Info */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs shadow-md">
                  <p
                    className="flex items-center gap-1"
                    style={{ color: "#43424e" }}
                  >
                    <span>Gunakan scroll untuk zoom</span>
                  </p>
                </div>
              </>
            ) : (
              // Fallback jika belum di client side
              <div
                className="w-full h-full flex flex-col items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #23305d 0%, #1a2447 100%)",
                  color: "#af9151",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center"
                  style={{ background: "rgba(217, 171, 63, 0.2)" }}
                >
                  <MapPin className="w-10 h-10" style={{ color: "#d9ab3f" }} />
                </motion.div>
                <div className="text-center px-4">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "#ffffff" }}
                  >
                    Lokasi Sekolah
                  </h3>
                  <p className="mb-1" style={{ color: "#af9151" }}>
                    {schoolCoordinates.address}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Info Section */}
          <div className="space-y-4 md:space-y-6">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              const isWhatsApp = item.title === "WhatsApp";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${isWhatsApp ? "#25D366" : "#e5e7eb"}`,
                  }}
                  whileHover={{
                    y: -5,
                    borderColor: isWhatsApp ? "#128C7E" : "#d9ab3f",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <motion.div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isWhatsApp
                          ? "rgba(37, 211, 102, 0.1)"
                          : "rgba(217, 171, 63, 0.1)",
                      }}
                      whileHover={{
                        rotate: isWhatsApp ? [0, 10, -10, 10, 0] : 360,
                        transition: { duration: 0.6 },
                      }}
                    >
                      <Icon
                        className="w-6 h-6 md:w-7 md:h-7"
                        style={{
                          color: isWhatsApp ? "#25D366" : "#d9ab3f",
                        }}
                      />
                    </motion.div>
                    <div className="flex-1">
                      <h3
                        className="font-bold text-lg mb-2 flex items-center gap-2"
                        style={{
                          color: isWhatsApp ? "#25D366" : "#23305d",
                        }}
                      >
                        {item.title}
                        {isWhatsApp && (
                          <span
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              background: "rgba(37, 211, 102, 0.1)",
                              color: "#25D366",
                            }}
                          >
                            Rekomendasi
                          </span>
                        )}
                      </h3>
                      <p
                        className="text-base"
                        style={{
                          color: isWhatsApp ? "#25D366" : "#43424e",
                          fontWeight: isWhatsApp ? "bold" : "normal",
                        }}
                      >
                        {item.content}
                      </p>
                      {item.secondContent && (
                        <p
                          className="text-sm mt-2"
                          style={{ color: "#76674f" }}
                        >
                          {item.secondContent}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Additional Contact Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(217, 171, 63, 0.05)",
                border: "1px dashed #d9ab3f",
              }}
            >
              <p className="text-center" style={{ color: "#43424e" }}>
                <span style={{ color: "#23305d", fontWeight: "bold" }}>
                  Butuh bantuan cepat?
                </span>{" "}
                Gunakan WhatsApp untuk respon lebih cepat dalam 1-2 jam kerja.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3
            className="text-2xl md:text-3xl font-bold mb-6"
            style={{ color: "#23305d" }}
          >
            Ingin Bertanya Langsung?
          </h3>
          <p
            className="text-lg max-w-2xl mx-auto mb-8"
            style={{ color: "#43424e" }}
          >
            Kami dengan senang hati akan menjawab semua pertanyaan Anda mengenai
            program pendidikan, fasilitas, dan proses pendaftaran.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+62211234567"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-lg font-medium transition-colors"
              style={{
                background: "#d9ab3f",
                color: "#23305d",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#af9151";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#d9ab3f";
              }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Hubungi Sekarang
            </motion.a>
            <motion.a
              href="mailto:info@ggschool.sch.id"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-lg font-medium transition-colors"
              style={{
                border: "2px solid #d9ab3f",
                color: "#d9ab3f",
                background: "transparent",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(217, 171, 63, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Kirim Email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
