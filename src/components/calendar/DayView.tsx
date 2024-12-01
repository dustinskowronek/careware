import React from 'react';
import { useCalendarStore } from '../../store/useStore';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { format } from 'date-fns';

const timeSlots = Array.from({ length: 32 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

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

export function DayView() {
  const currentDate = useCalendarStore((state) => state.currentDate);
  const { employees, selectedEmployeeIds } = useEmployeeStore();
  const getAppointmentsForEmployee = useAppointmentStore((state) => state.getAppointmentsForEmployee);
  
  const selectedEmployees = employees.filter(emp => selectedEmployeeIds.includes(emp.id));
  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-16 flex-shrink-0 bg-gray-50 border-r">
        {timeSlots.map((time, index) => (
          <div key={`timeslot-${index}`} className="h-8 border-b text-xs text-gray-500 px-2 relative">
            <span className="absolute -top-2 right-2">{time}</span>
          </div>
        ))}
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex">
            {selectedEmployees.map((employee) => (
              <div
                key={`header-${employee.id}`}
                className="flex-1 p-2 text-center border-r text-sm font-medium"
              >
                {employee.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative min-h-[800px]">
          <div className="absolute inset-0 grid divide-x divide-gray-200" 
               style={{ gridTemplateColumns: `repeat(${selectedEmployees.length}, minmax(0, 1fr))` }}>
            {selectedEmployees.map((employee) => (
              <div key={`column-${employee.id}`} className="relative">
                {timeSlots.map((time, index) => (
                  <div key={`grid-${employee.id}-${index}`} className="h-8 border-b" />
                ))}
                
                {getAppointmentsForEmployee(employee.id, formattedDate).map((appointment) => (
                  <div
                    key={`appointment-${appointment.id}`}
                    className={`absolute ${appointment.color} text-gray-800 p-2 rounded-lg mx-1 text-sm cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg`}
                    style={{
                      top: `${getTopPosition(appointment.start)}px`,
                      height: `${getHeight(appointment.start, appointment.end)}px`,
                      width: 'calc(100% - 8px)'
                    }}
                  >
                    <div className="font-medium">{appointment.clientName}</div>
                    <div className="text-xs">
                      {appointment.start} - {appointment.end}
                    </div>
                    <div className="text-xs mt-1">{appointment.type}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}