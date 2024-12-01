import React, { useState } from 'react';
import { ArrowLeft, FileText, Upload, Pencil } from 'lucide-react';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { MasterDataForm } from './MasterDataForm';
import { DocumentsList } from './DocumentsList';

interface EmployeeProfileProps {
  employeeId: number;
  onBack: () => void;
}

export function EmployeeProfile({ employeeId, onBack }: EmployeeProfileProps) {
  const [activeTab, setActiveTab] = useState<'masterData' | 'documents'>('masterData');
  const employee = useEmployeeStore(state => 
    state.employees.find(emp => emp.id === employeeId)
  );

  if (!employee) {
    return null;
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold">{employee.name}</h1>
            <p className="text-sm text-gray-500">{employee.role}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setActiveTab('masterData')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'masterData' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Stammdaten
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'documents' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Dokumente
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'masterData' ? (
          <MasterDataForm employee={employee} />
        ) : (
          <DocumentsList employeeId={employeeId} />
        )}
      </div>
    </div>
  );
}