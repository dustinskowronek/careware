import React, { useState } from 'react';
import { ArrowLeft, FileText, Pencil } from 'lucide-react';
import { useClientStore } from '../../store/useClientStore';
import { ClientMasterDataTabs } from './ClientMasterDataTabs';
import { DocumentsList } from '../shared/DocumentsList';

interface ClientProfileProps {
  clientId: string;
  onBack: () => void;
}

export function ClientProfile({ clientId, onBack }: ClientProfileProps) {
  const [activeTab, setActiveTab] = useState<'masterData' | 'documents'>('masterData');
  const client = useClientStore(state => 
    state.clients.find(client => client.id === clientId)
  );

  if (!client) {
    return null;
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b p-4">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold">{client.name}</h1>
            <p className="text-sm text-gray-500">Pflegegrad {client.careLevel}</p>
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setActiveTab('masterData')}
            className={
              activeTab === 'masterData' 
                ? 'flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600'
                : 'flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50'
            }
          >
            <Pencil className="w-4 h-4 mr-2" />
            Stammdaten
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={
              activeTab === 'documents'
                ? 'flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600'
                : 'flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50'
            }
          >
            <FileText className="w-4 h-4 mr-2" />
            Dokumente
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'masterData' ? (
          <ClientMasterDataTabs clientId={client.id} />
        ) : (
          <DocumentsList entityId={clientId} entityType="client" />
        )}
      </div>
    </div>
  );
}