import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const appointments = [
  {
    id: 1,
    client: 'Maria Schmidt',
    type: 'Grundpflege',
    time: '09:00 - 10:30',
    location: 'Musterstraße 123',
    status: 'upcoming'
  },
  {
    id: 2,
    client: 'Hans Weber',
    type: 'Medikamentengabe',
    time: '11:00 - 11:30',
    location: 'Hauptstraße 45',
    status: 'upcoming'
  },
  {
    id: 3,
    client: 'Emma Fischer',
    type: 'Mobilisation',
    time: '14:00 - 15:00',
    location: 'Parkweg 78',
    status: 'upcoming'
  }
];

export function UpcomingAppointments() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Anstehende Termine</h2>
          <Calendar className="w-5 h-5 text-gray-500" />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-6 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{appointment.client}</h3>
                <p className="text-sm text-gray-500 mt-1">{appointment.type}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Anstehend
              </span>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {appointment.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {appointment.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}