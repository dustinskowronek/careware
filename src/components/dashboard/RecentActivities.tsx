import React from 'react';
import { Activity } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Sarah Meyer',
    action: 'hat einen Pflegebericht erstellt für',
    subject: 'Maria Schmidt',
    time: 'vor 5 Minuten'
  },
  {
    id: 2,
    user: 'Thomas Klein',
    action: 'hat einen Termin verschoben für',
    subject: 'Hans Weber',
    time: 'vor 15 Minuten'
  },
  {
    id: 3,
    user: 'Lisa Wagner',
    action: 'hat die Medikation aktualisiert für',
    subject: 'Emma Fischer',
    time: 'vor 1 Stunde'
  },
  {
    id: 4,
    user: 'Michael Bauer',
    action: 'hat eine Tourenplanung erstellt für',
    subject: 'Nächste Woche',
    time: 'vor 2 Stunden'
  }
];

export function RecentActivities() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Letzte Aktivitäten</h2>
          <Activity className="w-5 h-5 text-gray-500" />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-gray-50">
            <div className="flex space-x-3">
              <div className="flex-1">
                <div className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium">{activity.subject}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}