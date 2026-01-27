import React from "react";

interface DocumentsDataProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const DocumentsData: React.FC<DocumentsDataProps> = ({
  formData,
  onChange,
}) => {
  const handleFileChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(field, file);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Akta Kelahiran *
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange("aktaKelahiran", e)}
          />
          <p className="text-xs text-gray-500">
            Format: PDF, JPG, PNG (maks. 2MB)
          </p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Kartu Keluarga *
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange("kartuKeluarga", e)}
          />
          <p className="text-xs text-gray-500">
            Format: PDF, JPG, PNG (maks. 2MB)
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Ijazah SMP *
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange("ijazahSMP", e)}
          />
          <p className="text-xs text-gray-500">
            Format: PDF, JPG, PNG (maks. 2MB)
          </p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Pas Foto 3x4 *
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9ab3f] focus:border-transparent"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileChange("pasFoto", e)}
          />
          <p className="text-xs text-gray-500">Format: JPG, PNG (maks. 1MB)</p>
        </div>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg mt-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 text-[#d9ab3f] border-gray-300 rounded focus:ring-[#d9ab3f]"
            checked={formData.persetujuan || false}
            onChange={(e) => onChange("persetujuan", e.target.checked)}
          />
          <span className="text-sm text-gray-600">
            Saya menyatakan bahwa data yang saya isi adalah benar dan dapat
            dipertanggungjawabkan. Saya bersedia menerima sanksi jika data yang
            saya berikan tidak benar.
          </span>
        </label>
      </div>
    </>
  );
};

export default DocumentsData;
