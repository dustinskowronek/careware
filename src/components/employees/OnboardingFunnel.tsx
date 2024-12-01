import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { X } from 'lucide-react';

interface FormData {
  // Personal Data
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  maritalStatus: string;

  // Contact Info
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;

  // Employment Details
  position: string;
  startDate: string;
  workingHours: string;
  socialSecurityNumber: string;
  taxId: string;
  healthInsurance: string;

  // Bank Details
  bankName: string;
  iban: string;
  bic: string;
}

interface OnboardingFunnelProps {
  onComplete: () => void;
}

export function OnboardingFunnel({ onComplete }: OnboardingFunnelProps) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const addEmployee = useEmployeeStore(state => state.addEmployee);

  const onSubmit = (data: FormData) => {
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    // Create employee record
    addEmployee({
      name: `${data.firstName} ${data.lastName}`,
      role: data.position,
      status: 'active',
      email: data.email,
      phone: data.phone,
      address: `${data.street} ${data.houseNumber}, ${data.postalCode} ${data.city}`,
      startDate: data.startDate,
      socialSecurityNumber: data.socialSecurityNumber,
      taxId: data.taxId,
      bankDetails: `${data.bankName} | IBAN: ${data.iban} | BIC: ${data.bic}`
    });

    // Generate PDF with form data
    generatePersonalDataForm(data);
    
    onComplete();
  };

  const generatePersonalDataForm = (data: FormData) => {
    // Create form content
    const formContent = `
Personalfragebogen

Persönliche Daten:
Name: ${data.firstName} ${data.lastName}
Geburtsdatum: ${data.dateOfBirth}
Geburtsort: ${data.placeOfBirth}
Staatsangehörigkeit: ${data.nationality}
Familienstand: ${data.maritalStatus}

Adresse:
Straße: ${data.street}
Hausnummer: ${data.houseNumber}
PLZ: ${data.postalCode}
Stadt: ${data.city}

Kontakt:
Telefon: ${data.phone}
E-Mail: ${data.email}

Beschäftigung:
Position: ${data.position}
Eintrittsdatum: ${data.startDate}
Arbeitszeit: ${data.workingHours}

Versicherung & Steuern:
Sozialversicherungsnummer: ${data.socialSecurityNumber}
Steuer-ID: ${data.taxId}
Krankenkasse: ${data.healthInsurance}

Bankverbindung:
Bank: ${data.bankName}
IBAN: ${data.iban}
BIC: ${data.bic}
    `;

    // Create blob and download
    const blob = new Blob([formContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Personalfragebogen_${data.lastName}_${data.firstName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold">Neuen Mitarbeiter anlegen</h2>
          <div className="flex items-center mt-4 space-x-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-16 rounded-full ${
                  s === step ? 'bg-blue-600' : s < step ? 'bg-blue-200' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        <button onClick={onComplete} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Persönliche Daten</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Vorname</label>
                <input
                  {...register('firstName', { required: true })}
                  className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nachname</label>
                <input
                  {...register('lastName', { required: true })}
                  className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Geburtsdatum</label>
                <input
                  type="date"
                  {...register('dateOfBirth', { required: true })}
                  className={`form-input ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Geburtsort</label>
                <input
                  {...register('placeOfBirth', { required: true })}
                  className={`form-input ${errors.placeOfBirth ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Staatsangehörigkeit</label>
                <input
                  {...register('nationality', { required: true })}
                  className={`form-input ${errors.nationality ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Familienstand</label>
                <select
                  {...register('maritalStatus', { required: true })}
                  className={`form-select ${errors.maritalStatus ? 'border-red-500' : ''}`}
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
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Kontaktdaten</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Straße</label>
                <input
                  {...register('street', { required: true })}
                  className={`form-input ${errors.street ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hausnummer</label>
                <input
                  {...register('houseNumber', { required: true })}
                  className={`form-input ${errors.houseNumber ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">PLZ</label>
                <input
                  {...register('postalCode', { required: true })}
                  className={`form-input ${errors.postalCode ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Stadt</label>
                <input
                  {...register('city', { required: true })}
                  className={`form-input ${errors.city ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Telefon</label>
                <input
                  type="tel"
                  {...register('phone', { required: true })}
                  className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">E-Mail</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Beschäftigungsdetails</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Position</label>
                <select
                  {...register('position', { required: true })}
                  className={`form-select ${errors.position ? 'border-red-500' : ''}`}
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
                  {...register('startDate', { required: true })}
                  className={`form-input ${errors.startDate ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Arbeitszeit (Std./Woche)</label>
                <input
                  type="number"
                  {...register('workingHours', { required: true })}
                  className={`form-input ${errors.workingHours ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sozialversicherungsnummer</label>
                <input
                  {...register('socialSecurityNumber', { required: true })}
                  className={`form-input ${errors.socialSecurityNumber ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Steuer-ID</label>
                <input
                  {...register('taxId', { required: true })}
                  className={`form-input ${errors.taxId ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Krankenkasse</label>
                <input
                  {...register('healthInsurance', { required: true })}
                  className={`form-input ${errors.healthInsurance ? 'border-red-500' : ''}`}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Bankverbindung</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Bank</label>
                <input
                  {...register('bankName', { required: true })}
                  className={`form-input ${errors.bankName ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">IBAN</label>
                <input
                  {...register('iban', { required: true })}
                  className={`form-input ${errors.iban ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">BIC</label>
                <input
                  {...register('bic', { required: true })}
                  className={`form-input ${errors.bic ? 'border-red-500' : ''}`}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
            >
              Zurück
            </button>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {step === 4 ? 'Mitarbeiter anlegen' : 'Weiter'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}