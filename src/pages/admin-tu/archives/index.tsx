import React from "react";
import { AdminLayout } from "../../../layouts";

const ArchivesPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-[#d9ab3f]/10 rounded-full flex items-center justify-center mb-6">
           <svg className="w-10 h-10 text-[#d9ab3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        </div>
        <h1 className="text-3xl font-bold text-[#23305d] mb-3">Halaman Arsip Dokumen</h1>
        <p className="text-[#43424e] text-lg text-center max-w-md">Modul ini sedang dalam tahap persiapan dan akan segera diimplementasikan dengan desain yang konsisten.</p>
      </div>
    </AdminLayout>
  );
};

export default ArchivesPage;
