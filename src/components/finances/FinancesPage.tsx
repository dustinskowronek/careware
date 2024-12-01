import React from 'react';
import { Euro, TrendingUp, Download, Filter } from 'lucide-react';

const transactions = [
  {
    id: 1,
    client: 'Maria Schmidt',
    service: 'Grundpflege',
    amount: '35,00 €',
    date: '15.03.2024',
    status: 'Bezahlt'
  },
  {
    id: 2,
    client: 'Hans Weber',
    service: 'Medikamentengabe',
    amount: '12,50 €',
    date: '14.03.2024',
    status: 'Offen'
  }
];

export function FinancesPage() {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Finanzen</h1>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Umsatz (Monat)</h3>
              <Euro className="w-5 h-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold">4.250,00 €</p>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12.5% zum Vormonat</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Offene Forderungen</h3>
              <Euro className="w-5 h-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold">850,00 €</p>
            <p className="mt-2 text-sm text-gray-500">12 offene Rechnungen</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Durchschn. Umsatz/Kunde</h3>
              <Euro className="w-5 h-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold">125,00 €</p>
            <p className="mt-2 text-sm text-gray-500">Basis: letzte 30 Tage</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Transaktionen</h2>
              <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{transaction.client}</h3>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{transaction.service}</span>
                      <span>•</span>
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-medium">{transaction.amount}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'Bezahlt'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}