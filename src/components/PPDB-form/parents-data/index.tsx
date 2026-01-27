import React from "react";

interface ParentsDataProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const ParentsData: React.FC<ParentsDataProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="namaAyah"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Ayah *
          </label>
          <input
            type="text"
            id="namaAyah"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="Nama lengkap ayah"
            value={formData.namaAyah || ""}
            onChange={(e) => onChange("namaAyah", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="namaIbu"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Ibu *
          </label>
          <input
            type="text"
            id="namaIbu"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="Nama lengkap ibu"
            value={formData.namaIbu || ""}
            onChange={(e) => onChange("namaIbu", e.target.value)}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <label
            htmlFor="pekerjaanAyah"
            className="block text-sm font-medium text-gray-700"
          >
            Pekerjaan Ayah *
          </label>
          <input
            type="text"
            id="pekerjaanAyah"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="Pekerjaan"
            value={formData.pekerjaanAyah || ""}
            onChange={(e) => onChange("pekerjaanAyah", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="pekerjaanIbu"
            className="block text-sm font-medium text-gray-700"
          >
            Pekerjaan Ibu *
          </label>
          <input
            type="text"
            id="pekerjaanIbu"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="Pekerjaan"
            value={formData.pekerjaanIbu || ""}
            onChange={(e) => onChange("pekerjaanIbu", e.target.value)}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <label
            htmlFor="telpOrtu"
            className="block text-sm font-medium text-gray-700"
          >
            Nomor HP Orang Tua / Wali *
          </label>
          <input
            type="text"
            id="telpOrtu"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="08xxxxxxxxxx"
            value={formData.telpOrtu || ""}
            onChange={(e) => onChange("telpOrtu", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="emailOrtu"
            className="block text-sm font-medium text-gray-700"
          >
            Email Orang Tua / Wali
          </label>
          <input
            type="email"
            id="emailOrtu"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="email@example.com"
            value={formData.emailOrtu || ""}
            onChange={(e) => onChange("emailOrtu", e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ParentsData;
