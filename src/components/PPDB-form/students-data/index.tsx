import React from "react";

interface StudentsDataProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const StudentsData: React.FC<StudentsDataProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Lengkap *
          </label>
          <input
            type="text"
            id="nama"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="Sesuai akta kelahiran"
            value={formData.nama || ""}
            onChange={(e) => onChange("nama", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="nik"
            className="block text-sm font-medium text-gray-700"
          >
            NIK *
          </label>
          <input
            type="text"
            id="nik"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="16 digit NIK"
            value={formData.nik || ""}
            onChange={(e) => onChange("nik", e.target.value)}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <label
            htmlFor="ttl"
            className="block text-sm font-medium text-gray-700"
          >
            Tempat, Tanggal Lahir *
          </label>
          <input
            type="text"
            id="ttl"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="Jakarta, 01-01-2010"
            value={formData.ttl || ""}
            onChange={(e) => onChange("ttl", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="jk"
            className="block text-sm font-medium text-gray-700"
          >
            Jenis Kelamin *
          </label>
          <select
            id="jk"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            value={formData.jenisKelamin || ""}
            onChange={(e) => onChange("jenisKelamin", e.target.value)}
          >
            <option value="">Pilih jenis kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <label
          htmlFor="alamat"
          className="block text-sm font-medium text-gray-700"
        >
          Alamat Lengkap *
        </label>
        <textarea
          id="alamat"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
          placeholder="Alamat sesuai KK"
          value={formData.alamat || ""}
          onChange={(e) => onChange("alamat", e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <label
            htmlFor="agama"
            className="block text-sm font-medium text-gray-700"
          >
            Agama *
          </label>
          <select
            id="agama"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            value={formData.agama || ""}
            onChange={(e) => onChange("agama", e.target.value)}
          >
            <option value="">Pilih agama</option>
            <option value="islam">Islam</option>
            <option value="kristen">Kristen</option>
            <option value="katolik">Katolik</option>
            <option value="hindu">Hindu</option>
            <option value="buddha">Buddha</option>
            <option value="konghucu">Konghucu</option>
          </select>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="telp"
            className="block text-sm font-medium text-gray-700"
          >
            Nomor Telepon / HP *
          </label>
          <input
            type="text"
            id="telp"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="08xxxxxxxxxx"
            value={formData.telp || ""}
            onChange={(e) => onChange("telp", e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default StudentsData;
