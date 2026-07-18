import React, { useState, useEffect } from "react";
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

// Daftar Google Spreadsheet Daily Lesson Plan SMP per Guru Bidang Studi
const LESSON_PLANS = [
  {
    value: "sir-sem",
    label: "SIR SEM (PKN)",
    url: "https://docs.google.com/spreadsheets/d/1egmf77SxC2f0Og3Up7h4KDQtuXJoxqwt/edit?gid=1871866019#gid=1871866019",
  },
  {
    value: "ms-sophie",
    label: "MS SOPHIE",
    url: "https://docs.google.com/spreadsheets/d/1nq9wU_U9LlSJ_hLfzZCJ5hXiIdKCLeiw/edit?gid=1708151715#gid=1708151715",
  },
  {
    value: "ms-ririn",
    label: "MS RIRIN",
    url: "https://docs.google.com/spreadsheets/d/1sxfVT8pSz2qRUuYQNuzrO-wYsEBUUFv2/edit?gid=172235708#gid=172235708",
  },
  {
    value: "ms-masyita",
    label: "MS MASYITA",
    url: "https://docs.google.com/spreadsheets/d/1nnBZJl2bvHdxBW3uJEy9-gywW3q2jn1N/edit?gid=2146208352#gid=2146208352",
  },
  {
    value: "sir-maul-g1",
    label: "SIR MAUL - GRADE 1",
    url: "https://docs.google.com/spreadsheets/d/13QVDOyjwfv1hqC4qDdJciZDEUix3c5mM/edit?gid=464424798#gid=464424798",
  },
  {
    value: "sir-maul-g2",
    label: "SIR MAUL - GRADE 2",
    url: "https://docs.google.com/spreadsheets/d/1vgeSBGMB1kTBTm0JsLdNDvudzL7_mqgt/edit?gid=1237535744#gid=1237535744",
  },
  {
    value: "sir-maul-g3",
    label: "SIR MAUL - GRADE 3",
    url: "https://docs.google.com/spreadsheets/d/10sS2sDaZI4vocPh3mjLlrYYW7A8D56Mg/edit?gid=1891566894#gid=1891566894",
  },
  {
    value: "sir-julian-g1",
    label: "SIR JULIAN - GRADE 1",
    url: "https://docs.google.com/spreadsheets/d/1DvQ-RK09ea4_2HcyCFxvMacS4ZUdg-Ia/edit?gid=618072638#gid=618072638",
  },
  {
    value: "sir-julian-g2",
    label: "SIR JULIAN - GRADE 2",
    url: "https://docs.google.com/spreadsheets/d/1YHP6xl44jrWw7LCz33kJdhJEJtmacBNL/edit?gid=47815657#gid=47815657",
  },
  {
    value: "sir-julian-g3",
    label: "SIR JULIAN - GRADE 3",
    url: "https://docs.google.com/spreadsheets/d/1sWKcHJ17XfI5omf8EuQTlfHFSacgTYio/edit?gid=1969637497#gid=1969637497",
  },
  {
    value: "sir-julian-g3",
    label: "SIR JULIAN - GRADE 3",
    url: "https://docs.google.com/spreadsheets/d/1sWKcHJ17XfI5omf8EuQTlfHFSacgTYio/edit?gid=1969637497#gid=1969637497",
  },
];

const LessonPlanPage: React.FC = () => {
  const [selectedPlanValue, setSelectedPlanValue] = useState(
    LESSON_PLANS[0].value,
  );
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  // Memicu refresh otomatis & tampilkan loading spinner ketika opsi dropdown dipilih
  useEffect(() => {
    setLoading(true);
    setIframeKey((prev) => prev + 1);
  }, [selectedPlanValue]);

  // Ambil data plan yang aktif berdasarkan state
  const activePlan =
    LESSON_PLANS.find((plan) => plan.value === selectedPlanValue) ||
    LESSON_PLANS[0];
  const spreadsheetUrl = activePlan.url;

  // Format URL agar menu ribbon Google Sheets tetap tampil
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes("docs.google.com/spreadsheets")) {
        // Ganti path /preview menjadi /edit agar ribbon/toolbar editor lengkap tetap muncul
        if (url.includes("/preview")) {
          return url.replace(/\/preview(\?.*)?$/, "/edit");
        }
        return url;
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
    setSelectedPlanValue(value);
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
              Monitoring Rencana Pelaksanaan Pembelajaran Harian Guru dengan
              Menu Lengkap.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-grow md:flex-grow-0 min-w-[250px]">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                Pilih Guru:
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
              Gunakan bilah menu Google Sheets di bawah ini untuk berpindah
              lembar (sheets), mencari data, atau melakukan navigasi penuh.
            </p>
          </div>
        </div>

        {/* Iframe Viewport - Dioptimalkan tingginya untuk desktop */}
        <div
          className="relative w-full rounded-2xl border bg-white overflow-hidden shadow-sm flex flex-col"
          style={{
            borderColor: COLORS.grayMedium,
            height: "calc(100vh - 210px)",
            minHeight: "680px",
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
