import React from 'react';
import { Check, X, Clock, User } from 'lucide-react';
import { useTimeTrackingStore, TimeEntry } from '../../store/useTimeTrackingStore';

export function TimeEntriesList() {
  const entries = useTimeTrackingStore((state) => state.entries);

  const getStatusBadge = (status: TimeEntry['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    const icons = {
      pending: <Clock size={16} className="mr-1" />,
      approved: <Check size={16} className="mr-1" />,
      rejected: <X size={16} className="mr-1" />
    };

    return (
      <span className={`flex items-center px-2.5 py-0.5 rounded-full text-sm ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zeit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dauer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leistung
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User size={20} className="text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {entry.clientName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString('de-DE')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {entry.startTime} - {entry.endTime}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {entry.duration} Min.
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {entry.serviceType}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getStatusBadge(entry.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}