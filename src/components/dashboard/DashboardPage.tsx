import React from 'react';
import { StatisticsGrid } from './StatisticsGrid';
import { UpcomingAppointments } from './UpcomingAppointments';
import { RecentActivities } from './RecentActivities';
import { TeamOverview } from './TeamOverview';

export function DashboardPage() {
  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <StatisticsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingAppointments />
          <RecentActivities />
        </div>
        <TeamOverview />
      </div>
    </div>
  );
}