import React from 'react';
import { X, Clock, MapPin, User } from 'lucide-react';

interface AppointmentModalProps {
  appointment: {
    title: string;
    start: string;
    end: string;
    location?: string;
    type?: string;
  };
  onClose: () => void;
}

export function AppointmentModal({ appointment, onClose }: AppointmentModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Termin Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-start space-x-3">
            <User className="text-gray-400 mt-1" size={20} />
            <div>
              <div className="font-medium">{appointment.title}</div>
              <div className="text-sm text-gray-500">{appointment.type || 'Regulärer Termin'}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="text-gray-400" size={20} />
            <div>
              <div className="text-sm text-gray-600">
                {appointment.start} - {appointment.end} Uhr
              </div>
            </div>
          </div>

          {appointment.location && (
            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-400" size={20} />
              <div className="text-sm text-gray-600">{appointment.location}</div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Schließen
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Bearbeiten
          </button>
        </div>
      </div>
    </div>
  );
}