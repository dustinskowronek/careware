import React, { useState } from 'react';
import { ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { useClientStore, Client } from '../../store/useClientStore';
import { useClientFiltersStore } from '../../store/useClientFiltersStore';
import { useNavigateToClient } from '../../hooks/useNavigateToClient';
import { filterClients, sortClients } from '../../utils/clientFilters';

type SortField = 'name' | 'email' | 'phone' | 'status' | 'city';
type SortDirection = 'asc' | 'desc';

export function ClientsTable() {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const { clients } = useClientStore();
  const { search, statusFilter, careLevelFilter, insuranceTypeFilter, visibleFields } = useClientFiltersStore();
  const navigateToClient = useNavigateToClient();

  const filteredAndSortedClients = React.useMemo(() => {
    const filtered = filterClients(clients, search, statusFilter, careLevelFilter, insuranceTypeFilter);
    return sortClients(filtered, sortField, sortDirection);
  }, [clients, search, statusFilter, careLevelFilter, insuranceTypeFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center space-x-1">
                <span>Name</span>
                <SortIcon field="name" />
              </div>
            </th>
            {visibleFields.email && (
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center space-x-1">
                  <span>E-Mail</span>
                  <SortIcon field="email" />
                </div>
              </th>
            )}
            {visibleFields.phone && (
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('phone')}
              >
                <div className="flex items-center space-x-1">
                  <span>Telefon</span>
                  <SortIcon field="phone" />
                </div>
              </th>
            )}
            {visibleFields.status && (
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <SortIcon field="status" />
                </div>
              </th>
            )}
            {(visibleFields.postalCode || visibleFields.city) && (
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('city')}
              >
                <div className="flex items-center space-x-1">
                  <span>Adresse</span>
                  <SortIcon field="city" />
                </div>
              </th>
            )}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aktionen
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAndSortedClients.map((client) => (
            <tr 
              key={client.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => navigateToClient(client.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{client.name}</div>
              </td>
              {visibleFields.email && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{client.email}</div>
                </td>
              )}
              {visibleFields.phone && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </td>
              )}
              {visibleFields.status && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    client.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : client.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.status === 'active' ? 'Aktiv' : 
                     client.status === 'inactive' ? 'Inaktiv' : 'Neu'}
                  </span>
                </td>
              )}
              {(visibleFields.postalCode || visibleFields.city) && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{client.address}</div>
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}