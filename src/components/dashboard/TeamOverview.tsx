import React from 'react';
import { Users } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Meyer',
    role: 'Pflegefachkraft',
    status: 'available',
    appointments: 8,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Thomas Klein',
    role: 'Pflegehelfer',
    status: 'busy',
    appointments: 6,
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Lisa Wagner',
    role: 'Pflegefachkraft',
    status: 'break',
    appointments: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const statusColors = {
  available: 'bg-green-400',
  busy: 'bg-red-400',
  break: 'bg-yellow-400'
};

const statusLabels = {
  available: 'Verfügbar',
  busy: 'Beschäftigt',
  break: 'Pause'
};

export function TeamOverview() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Team Übersicht</h2>
          <Users className="w-5 h-5 text-gray-500" />
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img
                src={member.image}
                alt={member.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {member.name}
                </p>
                <p className="text-sm text-gray-500 truncate">{member.role}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${statusColors[member.status]}`} />
                  <span className="text-xs text-gray-500">{statusLabels[member.status]}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{member.appointments} Termine heute</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}