import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  step: number;
  label: string;
  icon: React.ComponentType<any>;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="w-full mb-8 md:mb-12">
      {/* Progress Bar Background */}
      <div className="relative h-2 bg-gray-200 rounded-full mb-8 md:mb-12">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute h-full bg-gradient-to-r from-[#23305d] via-[#d9ab3f] to-[#23305d] rounded-full"
        />
      </div>

      {/* Steps Container */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep >= step.step;
          const isCompleted = currentStep > step.step;
          const isCurrent = currentStep === step.step;

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  delay: index * 0.1,
                }}
                className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center 
                  border-4 transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#d9ab3f] border-[#d9ab3f] text-white shadow-lg"
                      : isActive
                        ? "bg-white border-[#23305d] text-[#23305d] shadow-lg"
                        : "bg-white border-gray-300 text-gray-400"
                  }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8" />
                ) : (
                  <step.icon
                    className={`w-6 h-6 md:w-8 md:h-8 ${
                      isCurrent ? "text-[#23305d]" : "text-gray-400"
                    }`}
                  />
                )}

                {/* Step Number Badge */}
                <div
                  className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${isActive ? "bg-[#23305d] text-white" : "bg-gray-300 text-gray-600"}`}
                >
                  {step.step}
                </div>
              </motion.div>

              {/* Step Label */}
              <div className="mt-3 md:mt-4 text-center">
                <span
                  className={`block text-sm md:text-base font-medium transition-colors duration-300 ${
                    isActive ? "text-[#23305d]" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>

                {/* Current Step Indicator */}
                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-[#d9ab3f] font-semibold"
                  >
                    ● Sedang diisi
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Text */}
      <div className="mt-6 md:mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#23305d]/10 to-[#d9ab3f]/10 px-4 py-2 rounded-full">
          <span className="text-sm md:text-base font-medium text-[#23305d]">
            {currentStep === steps.length
              ? "🎉 Siap untuk mengirimkan pendaftaran!"
              : `Langkah ${currentStep} dari ${steps.length}: ${steps[currentStep - 1].label}`}
          </span>
        </div>

        {/* Progress Percentage for mobile */}
        <div className="mt-2 md:hidden">
          <div className="flex items-center justify-center gap-2">
            <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-[#23305d] to-[#d9ab3f]"
              />
            </div>
            <span className="text-xs font-bold text-[#23305d]">
              {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
