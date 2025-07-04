import React, { useState } from 'react';
import { Plus, UserCheck, XCircle } from 'lucide-react';
import { useProspectStore } from '../../store/useProspectStore';
import { AddProspectModal } from './AddProspectModal';

export function ProspectsPage() {
  const { prospects, convertToClient, markProspectLost } = useProspectStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleConvert = (id: string) => {
    convertToClient(id);
  };

  const handleMarkLost = (id: string) => {
    const reason = window.prompt('Grund für Verlust?') || 'Unbekannt';
    markProspectLost(id, reason);
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Interessenten</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Neuer Interessent
          </button>
        </div>

        <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {prospects.map((prospect) => (
            <div key={prospect.id} className="p-6 flex justify-between items-center hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">
                  {prospect.firstName} {prospect.lastName}
                </p>
                <p className="text-sm text-gray-500">{prospect.email || prospect.phone}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleConvert(prospect.id)}
                  className="flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                >
                  <UserCheck className="w-4 h-4 mr-1" />
                  Konvertieren
                </button>
                <button
                  onClick={() => handleMarkLost(prospect.id)}
                  className="flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Verloren
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && <AddProspectModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
