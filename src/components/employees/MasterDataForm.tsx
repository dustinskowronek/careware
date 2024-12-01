import React, { useState } from 'react';
import { useEmployeeStore, Employee } from '../../store/useEmployeeStore';

interface MasterDataFormProps {
  employee: Employee;
}

export function MasterDataForm({ employee }: MasterDataFormProps) {
  const updateEmployee = useEmployeeStore(state => state.updateEmployee);
  const [formData, setFormData] = useState({
    // Personal Data
    firstName: employee.name.split(' ')[0] || '',
    lastName: employee.name.split(' ')[1] || '',
    dateOfBirth: employee.dateOfBirth || '',
    placeOfBirth: employee.placeOfBirth || '',
    nationality: employee.nationality || '',
    maritalStatus: employee.maritalStatus || '',

    // Contact Info
    street: employee.address?.split(',')[0]?.split(' ').slice(0, -1).join(' ') || '',
    houseNumber: employee.address?.split(',')[0]?.split(' ').slice(-1)[0] || '',
    postalCode: employee.address?.split(',')[1]?.trim().split(' ')[0] || '',
    city: employee.address?.split(',')[1]?.trim().split(' ')[1] || '',
    phone: employee.phone || '',
    email: employee.email || '',

    // Employment Details
    position: employee.role || '',
    startDate: employee.startDate || '',
    workingHours: employee.workingHours || '',
    socialSecurityNumber: employee.socialSecurityNumber || '',
    taxId: employee.taxId || '',
    healthInsurance: employee.healthInsurance || '',

    // Bank Details
    bankName: employee.bankDetails?.split('|')[0]?.trim() || '',
    iban: employee.bankDetails?.split('|')[1]?.split(':')[1]?.trim() || '',
    bic: employee.bankDetails?.split('|')[2]?.split(':')[1]?.trim() || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployee(employee.id, {
      name: `${formData.firstName} ${formData.lastName}`,
      role: formData.position,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.street} ${formData.houseNumber}, ${formData.postalCode} ${formData.city}`,
      startDate: formData.startDate,
      socialSecurityNumber: formData.socialSecurityNumber,
      taxId: formData.taxId,
      bankDetails: `${formData.bankName} | IBAN: ${formData.iban} | BIC: ${formData.bic}`,
      dateOfBirth: formData.dateOfBirth,
      placeOfBirth: formData.placeOfBirth,
      nationality: formData.nationality,
      maritalStatus: formData.maritalStatus,
      workingHours: formData.workingHours,
      healthInsurance: formData.healthInsurance
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
      {/* Personal Data */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Persönliche Daten</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Vorname</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nachname</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Geburtsdatum</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Geburtsort</label>
            <input
              type="text"
              value={formData.placeOfBirth}
              onChange={e => setFormData({ ...formData, placeOfBirth: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Staatsangehörigkeit</label>
            <input
              type="text"
              value={formData.nationality}
              onChange={e => setFormData({ ...formData, nationality: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Familienstand</label>
            <select
              value={formData.maritalStatus}
              onChange={e => setFormData({ ...formData, maritalStatus: e.target.value })}
              className="form-select"
            >
              <option value="">Bitte wählen</option>
              <option value="ledig">Ledig</option>
              <option value="verheiratet">Verheiratet</option>
              <option value="geschieden">Geschieden</option>
              <option value="verwitwet">Verwitwet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Kontaktdaten</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Straße</label>
            <input
              type="text"
              value={formData.street}
              onChange={e => setFormData({ ...formData, street: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hausnummer</label>
            <input
              type="text"
              value={formData.houseNumber}
              onChange={e => setFormData({ ...formData, houseNumber: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">PLZ</label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Stadt</label>
            <input
              type="text"
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Telefon</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">E-Mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Employment Details */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Beschäftigungsdetails</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Position</label>
            <select
              value={formData.position}
              onChange={e => setFormData({ ...formData, position: e.target.value })}
              className="form-select"
            >
              <option value="">Bitte wählen</option>
              <option value="Pflegefachkraft">Pflegefachkraft</option>
              <option value="Pflegehelfer">Pflegehelfer</option>
              <option value="Auszubildende">Auszubildende</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Eintrittsdatum</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={e => setFormData({ ...formData, startDate: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Arbeitszeit (Std./Woche)</label>
            <input
              type="number"
              value={formData.workingHours}
              onChange={e => setFormData({ ...formData, workingHours: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sozialversicherungsnummer</label>
            <input
              type="text"
              value={formData.socialSecurityNumber}
              onChange={e => setFormData({ ...formData, socialSecurityNumber: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Steuer-ID</label>
            <input
              type="text"
              value={formData.taxId}
              onChange={e => setFormData({ ...formData, taxId: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Krankenkasse</label>
            <input
              type="text"
              value={formData.healthInsurance}
              onChange={e => setFormData({ ...formData, healthInsurance: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Bankverbindung</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Bank</label>
            <input
              type="text"
              value={formData.bankName}
              onChange={e => setFormData({ ...formData, bankName: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">IBAN</label>
            <input
              type="text"
              value={formData.iban}
              onChange={e => setFormData({ ...formData, iban: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">BIC</label>
            <input
              type="text"
              value={formData.bic}
              onChange={e => setFormData({ ...formData, bic: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   shadow-sm hover:shadow-md transition-all font-medium"
        >
          Änderungen speichern
        </button>
      </div>
    </form>
  );
}