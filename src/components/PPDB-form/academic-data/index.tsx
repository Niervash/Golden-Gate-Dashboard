import React from "react";

interface AcademicDataProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const AcademicData: React.FC<AcademicDataProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="asalSekolah"
            className="block text-sm font-medium text-gray-700"
          >
            Asal Sekolah (SMP) *
          </label>
          <input
            type="text"
            id="asalSekolah"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="Nama SMP asal"
            value={formData.asalSekolah || ""}
            onChange={(e) => onChange("asalSekolah", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="nisn"
            className="block text-sm font-medium text-gray-700"
          >
            NISN *
          </label>
          <input
            type="text"
            id="nisn"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="10 digit NISN"
            value={formData.nisn || ""}
            onChange={(e) => onChange("nisn", e.target.value)}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <label
            htmlFor="jurusan"
            className="block text-sm font-medium text-gray-700"
          >
            Pilihan Jurusan *
          </label>
          <select
            id="jurusan"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            value={formData.jurusan || ""}
            onChange={(e) => onChange("jurusan", e.target.value)}
          >
            <option value="">Pilih jurusan</option>
            <option value="ipa">IPA (Matematika & IPA)</option>
            <option value="ips">IPS (Ilmu Sosial)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="nilaiUN"
            className="block text-sm font-medium text-gray-700"
          >
            Nilai Rata-rata Ijazah SMP *
          </label>
          <input
            type="number"
            id="nilaiUN"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            placeholder="Contoh: 85.5"
            value={formData.nilaiUN || ""}
            onChange={(e) => onChange("nilaiUN", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <label
          htmlFor="prestasi"
          className="block text-sm font-medium text-gray-700"
        >
          Prestasi (Opsional)
        </label>
        <textarea
          id="prestasi"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
          placeholder="Tuliskan prestasi akademik / non-akademik yang pernah diraih"
          value={formData.prestasi || ""}
          onChange={(e) => onChange("prestasi", e.target.value)}
        />
      </div>
    </>
  );
};

export default AcademicData;
