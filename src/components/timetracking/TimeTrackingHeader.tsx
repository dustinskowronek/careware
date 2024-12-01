import React from 'react';
import { Plus, Download, Filter } from 'lucide-react';

interface TimeTrackingHeaderProps {
  onNewEntry: () => void;
}

export function TimeTrackingHeader({ onNewEntry }: TimeTrackingHeaderProps) {
  return (
    <div className="bg-white border-b p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Zeiterfassung</h1>
        <div className="flex space-x-3">
          <button
            onClick={onNewEntry}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Neue Zeiterfassung</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Exportieren</span>
          </button>
        </div>
      </div>
    </div>
  );
}