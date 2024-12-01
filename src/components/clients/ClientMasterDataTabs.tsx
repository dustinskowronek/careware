import React from 'react';
import { GeneralDataForm } from './forms/GeneralDataForm';
import { EmergencyContactForm } from './forms/EmergencyContactForm';
import { CareDetailsForm } from './forms/CareDetailsForm';
import { InsuranceForm } from './forms/InsuranceForm';
import { useClientStore } from '../../store/useClientStore';

interface ClientMasterDataTabsProps {
  clientId: string;
}

export function ClientMasterDataTabs({ clientId }: ClientMasterDataTabsProps) {
  const [activeTab, setActiveTab] = React.useState('general');
  const updateClient = useClientStore(state => state.updateClient);
  const client = useClientStore(state => 
    state.clients.find(c => c.id === clientId)
  );

  if (!client) return null;

  const handleSubmit = (data: any) => {
    updateClient(clientId, data);
  };

  const tabs = [
    { id: 'general', label: 'Allgemeine Daten' },
    { id: 'emergency', label: 'Notfallkontakt' },
    { id: 'care', label: 'Versorgung' },
    { id: 'insurance', label: 'Krankenkasse' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'general' && (
          <GeneralDataForm data={client} onSubmit={handleSubmit} />
        )}
        {activeTab === 'emergency' && (
          <EmergencyContactForm data={client} onSubmit={handleSubmit} />
        )}
        {activeTab === 'care' && (
          <CareDetailsForm data={client} onSubmit={handleSubmit} />
        )}
        {activeTab === 'insurance' && (
          <InsuranceForm data={client} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}