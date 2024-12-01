import React from 'react';

export function TimeSlots() {
  const hours = Array.from({ length: 32 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  return (
    <div className="w-16 border-r bg-gray-50 flex-shrink-0">
      {hours.map((time) => (
        <div key={time} className="h-8 border-b text-xs text-gray-500 px-2 relative">
          <span className="absolute -top-2 right-2">{time}</span>
        </div>
      ))}
    </div>
  );
}