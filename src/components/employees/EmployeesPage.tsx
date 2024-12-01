import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { OnboardingFunnel } from './OnboardingFunnel';
import { EmployeeProfile } from './EmployeeProfile';

export function EmployeesPage() {
  const [showOnboardingFunnel, setShowOnboardingFunnel] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const employees = useEmployeeStore((state) => state.employees);

  if (selectedEmployeeId !== null) {
    return (
      <EmployeeProfile 
        employeeId={selectedEmployeeId} 
        onBack={() => setSelectedEmployeeId(null)} 
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Mitarbeiter</h1>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowOnboardingFunnel(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Mitarbeiter hinzufügen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-hidden">
        {showOnboardingFunnel ? (
          <div className="h-full overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow">
                <OnboardingFunnel onComplete={() => setShowOnboardingFunnel(false)} />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Fixed Search Bar */}
            <div className="flex-shrink-0 bg-white border-b p-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Mitarbeiter suchen..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                    <Filter className="w-5 h-5 mr-2" />
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Employee List */}
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow">
                  <div className="divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <div 
                        key={`employee-${employee.id}`}
                        className="p-6 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedEmployeeId(employee.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
                            <div className="mt-1 text-sm text-gray-500">
                              {employee.role}
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            employee.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {employee.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}