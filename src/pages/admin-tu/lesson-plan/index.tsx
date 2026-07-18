import React, { useState } from "react";
import { AdminLayout } from "../../../layouts";
import { FileSpreadsheet, ExternalLink, RefreshCw } from "lucide-react";
import { Button, Spin, Select } from "antd";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  white: "#ffffff",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

// Daftar Google Spreadsheet Daily Lesson Plan yang bisa dipilih
// Anda dapat mengedit label dan URL di bawah ini sesuai kebutuhan
const LESSON_PLANS = [
  {
    value: "sd",
    label: "Daily Lesson Plan - Elementary School (SD)",
    url: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKv36dx67GLTSAXOB4g1I74ABBJ60/edit?usp=sharing",
  },
  {
    value: "smp",
    label: "Daily Lesson Plan - Junior High School (SMP)",
    url: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKv36dx67GLTSAXOB4g1I74ABBJ60/edit?usp=sharing",
  },
  {
    value: "sma",
    label: "Daily Lesson Plan - Senior High School (SMA)",
    url: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKv36dx67GLTSAXOB4g1I74ABBJ60/edit?usp=sharing",
  },
  {
    value: "sma",
    label: "Daily Lesson Plan - Sasdas",
    url: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKv36dx67GLTSAXOB4g1I74ABBJ60/edit?usp=sharing",
  },
];

const LessonPlanPage: React.FC = () => {
  const [selectedPlanValue, setSelectedPlanValue] = useState(
    LESSON_PLANS[0].value,
  );
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  // Ambil data plan yang aktif berdasarkan state
  const activePlan =
    LESSON_PLANS.find((plan) => plan.value === selectedPlanValue) ||
    LESSON_PLANS[0];
  const spreadsheetUrl = activePlan.url;

  // Format URL agar rapi saat diembed di iframe
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes("docs.google.com/spreadsheets")) {
        // Ganti path /edit menjadi /preview agar tampilan clean tanpa editor menu
        return url.replace(/\/edit(\?.*)?$/, "/preview");
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleSelectChange = (value: string) => {
    setLoading(true);
    setSelectedPlanValue(value);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1
              className="text-2xl font-bold text-left"
              style={{ color: COLORS.primary }}
            >
              Daily Lesson Plan
            </h1>
            <p
              className="text-sm text-left"
              style={{ color: COLORS.secondary }}
            >
              Monitoring Rencana Pelaksanaan Pembelajaran Harian Guru.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-grow md:flex-grow-0 min-w-[250px]">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                Pilih Unit:
              </span>
              <Select
                value={selectedPlanValue}
                onChange={handleSelectChange}
                options={LESSON_PLANS}
                className="w-full"
                style={{ height: 38 }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={handleRefresh}
                style={{ height: 38 }}
              >
                Refresh
              </Button>
              <Button
                type="primary"
                icon={<ExternalLink className="w-4 h-4" />}
                href={spreadsheetUrl}
                target="_blank"
                style={{
                  backgroundColor: COLORS.accent,
                  borderColor: COLORS.accent,
                  height: 38,
                }}
              >
                Buka di Tab Baru
              </Button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div
          className="p-4 rounded-xl border flex items-start gap-3 bg-[#fdfaf2]"
          style={{ borderColor: "rgba(217, 171, 63, 0.3)" }}
        >
          <FileSpreadsheet className="w-5 h-5 text-[#d9ab3f] mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-800 text-left">
              Lembar Kerja Terintegrasi - {activePlan.label}
            </p>
            <p className="text-xs text-gray-500 text-left">
              Lembar kerja di bawah ini terhubung langsung dengan Google Sheets
              unit yang dipilih untuk memantau rencana pembelajaran harian
              secara real-time.
            </p>
          </div>
        </div>

        {/* Iframe Viewport */}
        <div
          className="relative w-full rounded-2xl border bg-white overflow-hidden shadow-sm flex flex-col"
          style={{
            borderColor: COLORS.grayMedium,
            height: "calc(100vh - 280px)",
            minHeight: "550px",
          }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div className="text-center space-y-3">
                <Spin size="large" />
                <p className="text-sm text-gray-500 font-medium">
                  Memuat Google Spreadsheet...
                </p>
              </div>
            </div>
          )}
          <iframe
            key={iframeKey}
            src={getEmbedUrl(spreadsheetUrl)}
            className="w-full h-full border-none"
            onLoad={() => setLoading(false)}
            title={activePlan.label}
            allowFullScreen
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default LessonPlanPage;
