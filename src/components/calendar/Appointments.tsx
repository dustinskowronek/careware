import React, { useState } from 'react';
import { AppointmentModal } from './AppointmentModal';

interface Appointment {
  id: string;
  start: string;
  end: string;
  title: string;
  color: string;
  day: number;
  type?: string;
  location?: string;
}

const appointments: Appointment[] = [
  { 
    id: '1', 
    start: '09:00', 
    end: '10:30', 
    title: 'Liese Lotte', 
    color: 'bg-blue-600', 
    day: 4,
    type: 'Hausbesuch',
    location: 'Musterstraße 123, 12345 Berlin'
  },
  { 
    id: '2', 
    start: '09:00', 
    end: '12:00', 
    title: 'Petra Müller', 
    color: 'bg-green-600', 
    day: 5,
    type: 'Pflege'
  },
  { 
    id: '3', 
    start: '09:30', 
    end: '12:30', 
    title: 'Michael Fuchs', 
    color: 'bg-purple-600', 
    day: 6,
    type: 'Therapie'
  },
  // ... more appointments
];

export function Appointments() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  return (
    <div className="absolute inset-0">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          onClick={() => setSelectedAppointment(appointment)}
          className={`absolute ${appointment.color} text-white p-2 rounded-lg mx-1 cursor-pointer 
            transition-transform hover:scale-[1.02] hover:shadow-lg`}
          style={{
            left: `${((appointment.day - 1) * 100) / 7}%`,
            width: `${95 / 7}%`,
            top: `${getTopPosition(appointment.start)}px`,
            height: `${getHeight(appointment.start, appointment.end)}px`,
            zIndex: 10
          }}
        >
          <div className="text-sm font-medium truncate">{appointment.title}</div>
          <div className="text-xs opacity-90">
            {appointment.start} - {appointment.end}
          </div>
          {appointment.type && (
            <div className="text-xs opacity-75 mt-1">{appointment.type}</div>
          )}
        </div>
      ))}

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
}

function getTopPosition(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours - 8) * 60 + minutes;
}

function getHeight(start: string, end: string): number {
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);
  
  const totalStartMinutes = startHours * 60 + startMinutes;
  const totalEndMinutes = endHours * 60 + endMinutes;
  
  return totalEndMinutes - totalStartMinutes;
}