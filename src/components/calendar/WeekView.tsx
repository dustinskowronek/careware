import React from 'react';
import { TimeSlots } from './TimeSlots';
import { WeekHeader } from './WeekHeader';
import { Appointments } from './Appointments';

export function WeekView() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <TimeSlots />
      <div className="flex-1 overflow-auto">
        <WeekHeader />
        <div className="relative grid-background min-h-[800px]">
          <div className="absolute inset-0 grid grid-cols-7 divide-x divide-gray-200">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="relative h-full" />
            ))}
          </div>
          <Appointments />
        </div>
      </div>
    </div>
  );
}