
import React from 'react';
import MetricsCard from './MetricsCard';
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Target, Zap } from 'lucide-react';

const data = [
  { name: 'Day 1', value: 45 },
  { name: 'Day 2', value: 52 },
  { name: 'Day 3', value: 48 },
  { name: 'Day 4', value: 61 },
  { name: 'Day 5', value: 55 },
  { name: 'Day 6', value: 67 },
  { name: 'Day 7', value: 63 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard 
          title="Conversion Rate" 
          value="68%" 
          change="+12%" 
          icon={<TrendingUp size={20} />} 
        />
        <MetricsCard 
          title="User Engagement" 
          value="85" 
          change="+5" 
          icon={<Users size={20} />} 
        />
        <MetricsCard 
          title="Success Rate" 
          value="92%" 
          change="+8%" 
          icon={<Target size={20} />} 
        />
        <MetricsCard 
          title="Performance Score" 
          value="78" 
          change="+15" 
          icon={<Zap size={20} />} 
        />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Validation Metrics Over Time</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
