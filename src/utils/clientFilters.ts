import { Client } from '../store/useClientStore';
import { ClientStatus, CareLevel, InsuranceType } from '../store/useClientFiltersStore';

export const filterClients = (
  clients: Client[],
  search: string,
  statusFilter: ClientStatus[],
  careLevelFilter: CareLevel[],
  insuranceTypeFilter: InsuranceType[]
) => {
  return clients.filter((client) => {
    const searchMatch = search.toLowerCase() === '' || 
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.address?.toLowerCase().includes(search.toLowerCase()) ||
      client.insuranceId?.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter.length === 0 || 
      statusFilter.includes(client.status);

    const careLevelMatch = careLevelFilter.length === 0 || 
      careLevelFilter.includes(client.careLevel as CareLevel);

    const insuranceMatch = insuranceTypeFilter.length === 0 || 
      insuranceTypeFilter.includes(client.insuranceType as InsuranceType);

    return searchMatch && statusMatch && careLevelMatch && insuranceMatch;
  });
};

export const sortClients = (
  clients: Client[],
  sortField: 'name' | 'email' | 'phone' | 'status' | 'city',
  sortDirection: 'asc' | 'desc'
) => {
  return [...clients].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'email':
        comparison = (a.email || '').localeCompare(b.email || '');
        break;
      case 'phone':
        comparison = (a.phone || '').localeCompare(b.phone || '');
        break;
      case 'status':
        comparison = (a.status || '').localeCompare(b.status || '');
        break;
      case 'city':
        comparison = (a.city || '').localeCompare(b.city || '');
        break;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });
};