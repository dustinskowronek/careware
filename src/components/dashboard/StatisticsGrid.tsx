import React from 'react';
import { Users, Calendar, Clock, FileText } from 'lucide-react';

const statistics = [
  {
    label: 'Aktive Klienten',
    value: '124',
    change: '+4.75%',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    label: 'Termine heute',
    value: '48',
    change: '+12.5%',
    icon: Calendar,
    color: 'bg-green-500'
  },
  {
    label: 'Arbeitsstunden',
    value: '284',
    change: '+2.3%',
    icon: Clock,
    color: 'bg-purple-500'
  },
  {
    label: 'Offene Berichte',
    value: '12',
    change: '-8.4%',
    icon: FileText,
    color: 'bg-orange-500'
  }
];

export function StatisticsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statistics.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className={`text-sm font-medium ${
              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}