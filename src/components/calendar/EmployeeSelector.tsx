import React from 'react';
import { X, Check } from 'lucide-react';
import { useEmployeeStore } from '../../store/useEmployeeStore';

interface EmployeeSelectorProps {
  onClose: () => void;
}

export function EmployeeSelector({ onClose }: EmployeeSelectorProps) {
  const { employees, selectedEmployeeIds, toggleEmployeeSelection, selectAllEmployees, deselectAllEmployees } = useEmployeeStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Mitarbeiter auswählen</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-between mb-4">
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
              Keine auswählen
            </button>
          </div>

          <div className="space-y-2">
            {employees.map((employee) => (
              <button
                key={`employee-selector-${employee.id}`}
                onClick={() => toggleEmployeeSelection(employee.id)}
                className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${
                    selectedEmployeeIds.includes(employee.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedEmployeeIds.includes(employee.id) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span className="text-sm">{employee.name}</span>
                </div>
                <span className="text-xs text-gray-500">{employee.role}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Fertig
          </button>
        </div>
      </div>
    </div>
  );
}