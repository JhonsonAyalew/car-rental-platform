import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

const StatsCard = ({ title, value, icon: Icon, trend, color = '#D97706', bgColor = '#FEF3C7' }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card variant="info" className="relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[#A1A1AA] text-sm mb-1">{title}</p>
            <p className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{value}</p>
            
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-[#A1A1AA]">vs last month</span>
              </div>
            )}
          </div>
          
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ backgroundColor: bgColor }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
        
        {/* Animated progress bar (optional) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D97706] to-[#FEF3C7] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </Card>
    </motion.div>
  );
};

export default StatsCard;
