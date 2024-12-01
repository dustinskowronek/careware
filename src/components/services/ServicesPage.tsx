import React from 'react';
import { FileSpreadsheet, Plus, Search, Filter, Clock, Euro } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Grundpflege',
    duration: '45 min',
    price: '35,00 €',
    description: 'Grundlegende pflegerische Versorgung',
    category: 'Pflege'
  },
  {
    id: 2,
    name: 'Medikamentengabe',
    duration: '15 min',
    price: '12,50 €',
    description: 'Verabreichung von Medikamenten',
    category: 'Medizinisch'
  }
];

export function ServicesPage() {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Leistungen</h1>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Neue Leistung
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
                    placeholder="Leistungen suchen..."
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
            {services.map((service) => (
              <div key={service.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{service.description}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Euro className="w-4 h-4 mr-1" />
                        {service.price}
                      </div>
                      <span>•</span>
                      <span>{service.category}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <FileSpreadsheet className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}