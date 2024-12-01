import React from 'react';
import { Map as MapIcon, Calendar, Clock, User } from 'lucide-react';

const routes = [
  {
    id: 1,
    name: 'Tour 1 - Vormittag',
    caregiver: 'Sarah Meyer',
    appointments: [
      {
        time: '08:00 - 09:00',
        client: 'Maria Schmidt',
        address: 'Musterstraße 123, 12345 Berlin',
        service: 'Grundpflege'
      },
      // Add more appointments...
    ]
  },
  // Add more routes...
];

export function RoutePlanningPage() {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex h-full">
        <div className="w-1/3 border-r bg-white overflow-auto">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-semibold text-gray-900">Tourenplanung</h1>
            <div className="mt-4 flex space-x-4">
              <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Calendar className="w-5 h-5 mr-2" />
                Neue Tour
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {routes.map((route) => (
              <div key={route.id} className="p-6 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{route.name}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {route.caregiver}
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Aktiv
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {route.appointments.map((appointment, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-900">{appointment.time}</p>
                        <p className="text-gray-500">{appointment.client}</p>
                        <p className="text-gray-500">{appointment.service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 bg-gray-100 p-4">
          <div className="bg-white rounded-lg shadow h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapIcon className="w-12 h-12 mx-auto mb-4" />
              <p>Kartenansicht wird geladen...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}