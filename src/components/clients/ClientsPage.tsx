import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { useClientStore } from '../../store/useClientStore';
import { ClientOnboardingFunnel } from './ClientOnboardingFunnel';
import { ClientProfile } from './ClientProfile';
import { ClientsTable } from './ClientsTable';
import { ClientFilters } from './ClientFilters';

export function ClientsPage() {
  const [showOnboardingFunnel, setShowOnboardingFunnel] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  React.useEffect(() => {
    const handleNavigateToClient = (event: CustomEvent<string>) => {
      setSelectedClientId(event.detail);
    };

    window.addEventListener('navigateToClient', handleNavigateToClient as EventListener);
    return () => {
      window.removeEventListener('navigateToClient', handleNavigateToClient as EventListener);
    };
  }, []);

  const exportData = () => {
    // TODO: Implement CSV export
  };

  if (selectedClientId !== null) {
    return (
      <ClientProfile 
        clientId={selectedClientId} 
        onBack={() => setSelectedClientId(null)} 
      />
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">KlientInnen</h1>
          <div className="flex space-x-3">
            <button
              onClick={exportData}
              className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Download className="w-5 h-5 mr-2" />
              Exportieren
            </button>
            <button 
              onClick={() => setShowOnboardingFunnel(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              KlientIn hinzufügen
            </button>
          </div>
        </div>

        {showOnboardingFunnel ? (
          <ClientOnboardingFunnel onComplete={() => setShowOnboardingFunnel(false)} />
        ) : (
          <>
            <ClientFilters />
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ClientsTable />
            </div>
          </>
        )}
      </div>
    </div>
  );
}