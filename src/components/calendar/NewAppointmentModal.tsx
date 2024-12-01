import React, { useState } from 'react';
import { X, Clock, MapPin, User } from 'lucide-react';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useClientStore } from '../../store/useClientStore';

interface NewAppointmentModalProps {
  onClose: () => void;
}

export function NewAppointmentModal({ onClose }: NewAppointmentModalProps) {
  const addAppointment = useAppointmentStore(state => state.addAppointment);
  const employees = useEmployeeStore(state => state.employees);
  const clients = useClientStore(state => state.clients);
  
  const [formData, setFormData] = useState({
    employeeId: '',
    clientName: '',
    type: '',
    date: new Date().toISOString().split('T')[0],
    start: '',
    end: '',
    color: 'bg-blue-600'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await addAppointment({
      employeeId: parseInt(formData.employeeId),
      clientName: formData.clientName,
      type: formData.type,
      date: formData.date,
      start: formData.start,
      end: formData.end,
      color: formData.color
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Neuer Termin</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mitarbeiter</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            >
              <option value="">Bitte wählen</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Klient</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            >
              <option value="">Bitte wählen</option>
              {clients.map((client) => (
                <option key={client.id} value={client.name}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Leistungsart</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="">Bitte wählen</option>
              <option value="Grundpflege">Grundpflege</option>
              <option value="Medikamentengabe">Medikamentengabe</option>
              <option value="Mobilisation">Mobilisation</option>
              <option value="Hauswirtschaft">Hauswirtschaft</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Datum</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Von</label>
              <input
                type="time"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.start}
                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bis</label>
              <input
                type="time"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.end}
                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}