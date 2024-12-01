import React from 'react';
import { FileText, Search, Filter, Plus, Calendar } from 'lucide-react';

const documents = [
  {
    id: 1,
    title: 'Pflegebericht - Maria Schmidt',
    type: 'Pflegebericht',
    date: '15.03.2024',
    author: 'Sarah Meyer',
    status: 'Abgeschlossen'
  },
  {
    id: 2,
    title: 'Medikationsplan - Hans Weber',
    type: 'Medikationsplan',
    date: '14.03.2024',
    author: 'Thomas Klein',
    status: 'In Bearbeitung'
  }
];

export function DocumentationPage() {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dokumentation</h1>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Neue Dokumentation
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Dokumentation suchen..."
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

          <div className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <div key={doc.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{doc.title}</h3>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {doc.date}
                        </div>
                        <span>•</span>
                        <span>{doc.author}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'Abgeschlossen' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}