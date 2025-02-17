
import React from 'react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
}

const MetricsCard = ({ title, value, change, icon }: MetricsCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-accent/20 transition-all animate-slideUp">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {change && (
          <span className={`ml-2 text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
