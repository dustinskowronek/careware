import React, { useState } from 'react';
import { useClientStore, Client } from '../../store/useClientStore';

interface ClientMasterDataFormProps {
  client: Client;
}

export function ClientMasterDataForm({ client }: ClientMasterDataFormProps) {
  const updateClient = useClientStore(state => state.updateClient);
  const [formData, setFormData] = useState({
    firstName: client.name.split(' ')[0] || '',
    lastName: client.name.split(' ')[1] || '',
    dateOfBirth: client.dateOfBirth || '',
    placeOfBirth: client.placeOfBirth || '',
    nationality: client.nationality || '',
    familyStatus: client.familyStatus || '',
    
    street: client.address?.split(',')[0]?.split(' ').slice(0, -1).join(' ') || '',
    houseNumber: client.address?.split(',')[0]?.split(' ').slice(-1)[0] || '',
    postalCode: client.address?.split(',')[1]?.trim().split(' ')[0] || '',
    city: client.address?.split(',')[1]?.trim().split(' ')[1] || '',
    phone: client.phone || '',
    mobile: client.mobile || '',
    email: client.email || '',

    emergencyContact: client.emergencyContact || '',
    emergencyRelation: client.emergencyRelation || '',
    emergencyPhone: client.emergencyPhone || '',

    insuranceStatus: client.insuranceStatus || '',
    insuranceId: client.insuranceId || '',
    healthInsurance: client.healthInsurance || '',
    insuranceAddress: client.insuranceAddress || '',
    insurancePostalCode: client.insurancePostalCode || '',
    insuranceCity: client.insuranceCity || '',

    careLevel: client.careLevel || '',
    careStart: client.careStart || '',
    livingAlone: client.livingAlone || '',
    livingWith: client.livingWith || '',
    canOpenDoor: client.canOpenDoor || '',
    hasKey: client.hasKey || '',
    diagnoses: client.diagnoses || '',
    notes: client.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClient(client.id, {
      name: `${formData.firstName} ${formData.lastName}`,
      dateOfBirth: formData.dateOfBirth,
      placeOfBirth: formData.placeOfBirth,
      nationality: formData.nationality,
      familyStatus: formData.familyStatus,
      address: `${formData.street} ${formData.houseNumber}, ${formData.postalCode} ${formData.city}`,
      phone: formData.phone,
      mobile: formData.mobile,
      email: formData.email,
      emergencyContact: formData.emergencyContact,
      emergencyRelation: formData.emergencyRelation,
      emergencyPhone: formData.emergencyPhone,
      insuranceStatus: formData.insuranceStatus,
      insuranceId: formData.insuranceId,
      healthInsurance: formData.healthInsurance,
      insuranceAddress: formData.insuranceAddress,
      insurancePostalCode: formData.insurancePostalCode,
      insuranceCity: formData.insuranceCity,
      careLevel: formData.careLevel,
      careStart: formData.careStart,
      livingAlone: formData.livingAlone,
      livingWith: formData.livingWith,
      canOpenDoor: formData.canOpenDoor,
      hasKey: formData.hasKey,
      diagnoses: formData.diagnoses,
      notes: formData.notes
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
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
            <label className="form-label">Nationalität</label>
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
              value={formData.familyStatus}
              onChange={e => setFormData({ ...formData, familyStatus: e.target.value })}
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
            <label className="form-label">Mobil</label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
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

      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Notfallkontakt</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={formData.emergencyContact}
              onChange={e => setFormData({ ...formData, emergencyContact: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Beziehung</label>
            <input
              type="text"
              value={formData.emergencyRelation}
              onChange={e => setFormData({ ...formData, emergencyRelation: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Telefon</label>
            <input
              type="tel"
              value={formData.emergencyPhone}
              onChange={e => setFormData({ ...formData, emergencyPhone: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Versicherung</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Versicherungsstatus</label>
            <select
              value={formData.insuranceStatus}
              onChange={e => setFormData({ ...formData, insuranceStatus: e.target.value })}
              className="form-select"
            >
              <option value="">Bitte wählen</option>
              <option value="gesetzlich">Gesetzlich versichert</option>
              <option value="privat">Privat versichert</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Versicherungsnummer</label>
            <input
              type="text"
              value={formData.insuranceId}
              onChange={e => setFormData({ ...formData, insuranceId: e.target.value })}
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

          <div className="form-group">
            <label className="form-label">Adresse</label>
            <input
              type="text"
              value={formData.insuranceAddress}
              onChange={e => setFormData({ ...formData, insuranceAddress: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">PLZ</label>
            <input
              type="text"
              value={formData.insurancePostalCode}
              onChange={e => setFormData({ ...formData, insurancePostalCode: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Stadt</label>
            <input
              type="text"
              value={formData.insuranceCity}
              onChange={e => setFormData({ ...formData, insuranceCity: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Pflegedaten</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Pflegegrad</label>
            <select
              value={formData.careLevel}
              onChange={e => setFormData({ ...formData, careLevel: e.target.value })}
              className="form-select"
            >
              <option value="">Bitte wählen</option>
              <option value="1">Pflegegrad 1</option>
              <option value="2">Pflegegrad 2</option>
              <option value="3">Pflegegrad 3</option>
              <option value="4">Pflegegrad 4</option>
              <option value="5">Pflegegrad 5</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Pflegebeginn</label>
            <input
              type="date"
              value={formData.careStart}
              onChange={e => setFormData({ ...formData, careStart: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lebt allein</label>
            <select
              value={formData.livingAlone}
              onChange={e => setFormData({ ...formData, livingAlone: e.target.value })}
              className="form-select"
            >
              <option value="">Bitte wählen</option>
              <option value="yes">Ja</option>
              <option value="no">Nein</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Lebt mit</label>
            <input
              type="text"
              value={formData.livingWith}
              onChange={e => setFormData({ ...formData, livingWith: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kann Tür öffnen</label>
            <select
              value={formData.canOpenDoor}
              onChange={e => setFormData({ ...formData, canOpenDoor: e.target.value })}
              className="form-select"
            >
              <option value="">Bitte wählen</option>
              <option value="yes">Ja</option>
              <option value="no">Nein</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Schlüssel vorhanden</label>
            <select
              value={formData.hasKey}
              onChange={e => setFormData({ ...formData, hasKey: e.target.value })}
              className="form-select"
            >
              <option value="">Bitte wählen</option>
              <option value="yes">Ja</option>
              <option value="no">Nein</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Diagnosen & Bemerkungen</h3>
        <div className="space-y-4">
          <div className="form-group">
            <label className="form-label">Diagnosen</label>
            <textarea
              value={formData.diagnoses}
              onChange={e => setFormData({ ...formData, diagnoses: e.target.value })}
              rows={4}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Bemerkungen</label>
            <textarea
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
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