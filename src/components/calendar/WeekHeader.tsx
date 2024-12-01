import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useCalendarStore } from '../../store/useStore';

export function WeekHeader() {
  const { getWeekDays } = useCalendarStore();
  const weekDays = getWeekDays();

  return (
    <div className="flex border-b sticky top-0 bg-white z-20">
      <div className="w-16 flex-shrink-0" />
      {weekDays.map((date) => (
        <div key={date.toString()} className="flex-1 p-2 text-center border-r">
          <div className="text-sm text-gray-600">
            {format(date, 'EEE', { locale: de })}
          </div>
          <div className="text-sm font-medium">
            {format(date, 'd', { locale: de })}
          </div>
        </div>
      ))}
    </div>
  );
}