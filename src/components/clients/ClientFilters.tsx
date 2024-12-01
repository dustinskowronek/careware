import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useClientFiltersStore, ClientStatus, CareLevel, InsuranceType } from '../../store/useClientFiltersStore';

export function ClientFilters() {
  const {
    search,
    statusFilter,
    careLevelFilter,
    insuranceTypeFilter,
    visibleFields,
    setSearch,
    setStatusFilter,
    setCareLevelFilter,
    setInsuranceTypeFilter,
    toggleField,
  } = useClientFiltersStore();

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const statusOptions: { value: ClientStatus; label: string }[] = [
    { value: 'new', label: 'Neukunde' },
    { value: 'active', label: 'Aktiv' },
    { value: 'inactive', label: 'Inaktiv' },
  ];

  const careLevelOptions: { value: CareLevel; label: string }[] = [
    { value: '1', label: 'Pflegegrad 1' },
    { value: '2', label: 'Pflegegrad 2' },
    { value: '3', label: 'Pflegegrad 3' },
    { value: '4', label: 'Pflegegrad 4' },
    { value: '5', label: 'Pflegegrad 5' },
    { value: 'pending', label: 'In Beantragung' },
    { value: 'none', label: 'Keiner' },
  ];

  const insuranceTypeOptions: { value: InsuranceType; label: string }[] = [
    { value: 'SGB XI', label: 'SGB XI' },
    { value: 'SGB V', label: 'SGB V' },
  ];

  const fieldOptions = [
    { key: 'email' as const, label: 'E-Mail' },
    { key: 'phone' as const, label: 'Telefon' },
    { key: 'insuranceStatus' as const, label: 'Versicherungsstatus' },
    { key: 'status' as const, label: 'Status' },
    { key: 'postalCode' as const, label: 'Postleitzahl' },
    { key: 'city' as const, label: 'Wohnort' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center px-4 py-2 rounded-lg border ${
            isFilterOpen ? 'bg-blue-50 border-blue-500 text-blue-600' : 'hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filter
        </button>
      </div>

      {isFilterOpen && (
        <div className="bg-white border rounded-lg p-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (statusFilter.includes(option.value)) {
                      setStatusFilter(statusFilter.filter((s) => s !== option.value));
                    } else {
                      setStatusFilter([...statusFilter, option.value]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusFilter.includes(option.value)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Pflegegrad</h3>
            <div className="flex flex-wrap gap-2">
              {careLevelOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (careLevelFilter.includes(option.value)) {
                      setCareLevelFilter(careLevelFilter.filter((c) => c !== option.value));
                    } else {
                      setCareLevelFilter([...careLevelFilter, option.value]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    careLevelFilter.includes(option.value)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Versicherungsart</h3>
            <div className="flex flex-wrap gap-2">
              {insuranceTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (insuranceTypeFilter.includes(option.value)) {
                      setInsuranceTypeFilter(insuranceTypeFilter.filter((t) => t !== option.value));
                    } else {
                      setInsuranceTypeFilter([...insuranceTypeFilter, option.value]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    insuranceTypeFilter.includes(option.value)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Angezeigte Felder</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {fieldOptions.map((field) => (
                <label
                  key={field.key}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={visibleFields[field.key]}
                    onChange={() => toggleField(field.key)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          {(statusFilter.length > 0 || careLevelFilter.length > 0 || insuranceTypeFilter.length > 0) && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setStatusFilter([]);
                  setCareLevelFilter([]);
                  setInsuranceTypeFilter([]);
                }}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4 mr-1" />
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}