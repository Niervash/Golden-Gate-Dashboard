import React from "react";
import { motion } from "framer-motion";

export type Role = {
  value: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface CardLoginProps {
  roles: Role[];
  selectedRole?: string;
  onRoleSelect?: (role: string) => void;
}

const CardLogin: React.FC<CardLoginProps> = ({
  roles,
  selectedRole = "",
  onRoleSelect = () => {},
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.value;

        return (
          <motion.button
            key={role.value}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRoleSelect(role.value)}
            className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Icon
              className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${
                isSelected ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <p
              className={`font-medium text-sm ${
                isSelected ? "text-primary" : "text-foreground"
              }`}
            >
              {role.label}
            </p>
            <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
              {role.description}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CardLogin;
