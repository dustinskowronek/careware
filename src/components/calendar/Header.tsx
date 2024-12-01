```typescript
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, Check } from 'lucide-react';
import { useCalendarStore } from '../../store/useStore';
import { useEmployeeStore } from '../../store/useEmployeeStore';

export function Header() {
  const { currentDate, setCurrentDate, formatDate } = useCalendarStore();
  const { employees, selectedEmployeeIds, toggleEmployeeSelection, selectAllEmployees, deselectAllEmployees } = useEmployeeStore();
  const [showEmployeeSelector, setShowEmployeeSelector] = useState(false);

  const handlePrevious = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
  };

  return (
    <div className="bg-white border-b">
      <div className="flex border-b">
        <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">
          Tagesansicht
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Mitarbeiter Ansicht
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Arbeitszeiten Ansicht
        </button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Klientenansicht
        </button>
      </div>

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrevious}
              className="p-1.5 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="p-1.5 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <h2 className="text-lg font-medium">
            {formatDate(currentDate)}
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowEmployeeSelector(!showEmployeeSelector)}
            className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Users size={20} />
            <span>Mitarbeiter auswählen</span>
          </button>

          {showEmployeeSelector && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-700">Mitarbeiter</span>
                  <div className="space-x-2">
                    <button
                      onClick={selectAllEmployees}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Alle auswählen
                    </button>
                    <button
                      onClick={deselectAllEmployees}
                      className="text-sm text-gray-600 hover:text-gray-700"
                    >
                      Keine
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {employees.map((employee) => (
                    <button
                      key={employee.id}
                      onClick={() => toggleEmployeeSelection(employee.id)}
                      className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-50"
                    >
                      <span className="text-sm">{employee.name}</span>
                      {selectedEmployeeIds.includes(employee.id) && (
                        <Check size={16} className="text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```