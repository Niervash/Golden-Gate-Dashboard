import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { Languages, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const items: MenuProps['items'] = [
    {
      key: 'id',
      label: (
        <span className="flex items-center gap-2">
          🇮🇩 {t('indonesian')}
        </span>
      ),
      onClick: () => changeLanguage('id'),
    },
    {
      key: 'en',
      label: (
        <span className="flex items-center gap-2">
          🇺🇸 {t('english')}
        </span>
      ),
      onClick: () => changeLanguage('en'),
    },
  ];

  const currentLangLabel = i18n.language.startsWith('id') ? 'ID' : 'EN';

  return (
    <Dropdown 
      menu={{ items }} 
      trigger={['click']}
      placement="bottomRight"
      overlayClassName="lang-dropdown"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all"
        style={{
          borderColor: "#d9ab3f",
          color: "#d9ab3f",
          background: "transparent",
        }}
      >
        <Languages className="w-4 h-4" />
        <span className="text-xs font-bold">{currentLangLabel}</span>
        <ChevronDown className="w-3 h-3" />
      </motion.button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
