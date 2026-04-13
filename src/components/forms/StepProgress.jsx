import React from 'react';
import { motion } from 'framer-motion';
import { Check, Car, FileText, Camera, DollarSign, ClipboardList } from 'lucide-react';

const StepProgress = ({ currentStep, steps }) => {
  const getStepIcon = (step) => {
    const icons = {
      'Basic Info': <Car className="w-5 h-5" />,
      'Car Details': <FileText className="w-5 h-5" />,
      'Photos': <Camera className="w-5 h-5" />,
      'Pricing': <DollarSign className="w-5 h-5" />,
      'Review': <ClipboardList className="w-5 h-5" />
    };
    return icons[step] || <Car className="w-5 h-5" />;
  };

  return (
    <div className="mb-12">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-[#F3F2EE] rounded-full" />
        
        {/* Progress Bar Fill */}
        <motion.div 
          className="absolute top-5 left-0 h-1 bg-[#D97706] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <motion.div 
                  className={`
                    relative z-10 w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isCompleted 
                      ? 'bg-[#D97706] text-white shadow-lg' 
                      : isCurrent 
                        ? 'bg-[#D97706] text-white ring-4 ring-[#FEF3C7] shadow-lg' 
                        : 'bg-white border-2 border-[#E4E4E7] text-[#A1A1AA]'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    getStepIcon(step)
                  )}
                </motion.div>
                
                <div className="mt-3 text-center">
                  <p className={`
                    text-sm font-medium hidden md:block
                    ${isCurrent ? 'text-[#D97706]' : isCompleted ? 'text-[#1A1A1A]' : 'text-[#A1A1AA]'}
                  `}>
                    {step}
                  </p>
                  <p className="text-xs text-[#A1A1AA] mt-1 md:hidden">
                    Step {stepNumber}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
