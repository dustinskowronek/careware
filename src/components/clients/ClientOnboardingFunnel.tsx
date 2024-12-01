import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useClientStore } from '../../store/useClientStore';
import { X } from 'lucide-react';

interface FormData {
  // Personal Data
  firstName: string;
  middleName?: string;
  lastName: string;
  birthName?: string;
  nationality: string;
  dateOfBirth: string;
  familyStatus: string;
  emergencyContact: string;
  emergencyRelation: string;
  emergencyPhone: string;

  // Address
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  mobile?: string;
  email?: string;

  // Insurance
  insuranceStatus: string;
  insuranceId: string;
  insuranceCompany: string;
  insuranceAddress1: string;
  insuranceAddress2?: string;
  insuranceAddress3?: string;
  insurancePostalCode: string;
  insuranceCity: string;

  // Care Details
  careLevel: string;
  careStart: string;
  livingAlone: string;
  livingWith?: string;
  canOpenDoor: string;
  hasKey: string;
  diagnoses?: string;
  notes?: string;
}

interface ClientOnboardingFunnelProps {
  onComplete: () => void;
}

export function ClientOnboardingFunnel({ onComplete }: ClientOnboardingFunnelProps) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const addClient = useClientStore(state => state.addClient);

  const onSubmit = (data: FormData) => {
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    // Create client record
    addClient({
      name: `${data.firstName} ${data.lastName}`,
      careLevel: data.careLevel,
      address: `${data.street} ${data.houseNumber}, ${data.postalCode} ${data.city}`,
      phone: data.phone,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      healthInsurance: data.insuranceCompany,
      emergencyContact: `${data.emergencyContact} (${data.emergencyRelation}) - ${data.emergencyPhone}`,
      notes: data.diagnoses,
      status: 'active'
    });

    // Generate PDF with form data
    generateClientDataForm(data);
    
    onComplete();
  };

  const generateClientDataForm = (data: FormData) => {
    // Create form content
    const formContent = `
Klientendaten

Persönliche Daten:
Vorname: ${data.firstName}
Nachname: ${data.lastName}
Geburtsdatum: ${data.dateOfBirth}
Nationalität: ${data.nationality}
Familienstand: ${data.familyStatus}

Notfallkontakt:
Name: ${data.emergencyContact}
Beziehung: ${data.emergencyRelation}
Telefon: ${data.emergencyPhone}

Adresse:
Straße: ${data.street}
Hausnummer: ${data.houseNumber}
PLZ: ${data.postalCode}
Stadt: ${data.city}
Land: ${data.country}

Kontakt:
Telefon: ${data.phone}
Mobil: ${data.mobile || '-'}
E-Mail: ${data.email || '-'}

Versicherung:
Status: ${data.insuranceStatus}
Versicherungsnummer: ${data.insuranceId}
Versicherung: ${data.insuranceCompany}
Adresse: ${data.insuranceAddress1}
         ${data.insuranceAddress2 || ''}
         ${data.insuranceAddress3 || ''}
PLZ/Ort: ${data.insurancePostalCode} ${data.insuranceCity}

Pflegedaten:
Pflegegrad: ${data.careLevel}
Pflegebeginn: ${data.careStart}
Lebt allein: ${data.livingAlone}
Lebt mit: ${data.livingWith || '-'}
Kann Tür öffnen: ${data.canOpenDoor}
Schlüssel vorhanden: ${data.hasKey}

Diagnosen:
${data.diagnoses || '-'}

Bemerkungen:
${data.notes || '-'}
    `;

    // Create blob and download
    const blob = new Blob([formContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Klientendaten_${data.lastName}_${data.firstName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h2 className="text-xl font-semibold">Neuen Klienten anlegen</h2>
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
                <label className="form-label">Vorname *</label>
                <input
                  {...register('firstName', { required: true })}
                  className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Zweiter Vorname</label>
                <input
                  {...register('middleName')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nachname *</label>
                <input
                  {...register('lastName', { required: true })}
                  className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Geburtsname</label>
                <input
                  {...register('birthName')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nationalität</label>
                <input
                  {...register('nationality')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Geburtsdatum *</label>
                <input
                  type="date"
                  {...register('dateOfBirth', { required: true })}
                  className={`form-input ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Familienstand</label>
                <select
                  {...register('familyStatus')}
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

            <div className="space-y-4">
              <h4 className="text-md font-medium">Notfallkontakt</h4>
              <div className="grid grid-cols-3 gap-6">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input
                    {...register('emergencyContact', { required: true })}
                    className={`form-input ${errors.emergencyContact ? 'border-red-500' : ''}`}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Beziehung</label>
                  <input
                    {...register('emergencyRelation')}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Telefon *</label>
                  <input
                    {...register('emergencyPhone', { required: true })}
                    className={`form-input ${errors.emergencyPhone ? 'border-red-500' : ''}`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Adresse & Kontakt</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Straße *</label>
                <input
                  {...register('street', { required: true })}
                  className={`form-input ${errors.street ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hausnummer *</label>
                <input
                  {...register('houseNumber', { required: true })}
                  className={`form-input ${errors.houseNumber ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">PLZ *</label>
                <input
                  {...register('postalCode', { required: true })}
                  className={`form-input ${errors.postalCode ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Stadt *</label>
                <input
                  {...register('city', { required: true })}
                  className={`form-input ${errors.city ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Land *</label>
                <input
                  {...register('country', { required: true })}
                  className={`form-input ${errors.country ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Telefon *</label>
                <input
                  {...register('phone', { required: true })}
                  className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobil</label>
                <input
                  {...register('mobile')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">E-Mail</label>
                <input
                  type="email"
                  {...register('email')}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Versicherungsdaten</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Versicherungsstatus *</label>
                <select
                  {...register('insuranceStatus', { required: true })}
                  className={`form-select ${errors.insuranceStatus ? 'border-red-500' : ''}`}
                >
                  <option value="">Bitte wählen</option>
                  <option value="gesetzlich">Gesetzlich versichert</option>
                  <option value="privat">Privat versichert</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Versicherungsnummer *</label>
                <input
                  {...register('insuranceId', { required: true })}
                  className={`form-input ${errors.insuranceId ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Versicherung *</label>
                <input
                  {...register('insuranceCompany', { required: true })}
                  className={`form-input ${errors.insuranceCompany ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="col-span-2">
                <label className="form-label">Adresse der Versicherung</label>
                <div className="space-y-4">
                  <input
                    {...register('insuranceAddress1')}
                    placeholder="Zeile 1"
                    className="form-input"
                  />
                  <input
                    {...register('insuranceAddress2')}
                    placeholder="Zeile 2"
                    className="form-input"
                  />
                  <input
                    {...register('insuranceAddress3')}
                    placeholder="Zeile 3"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">PLZ</label>
                <input
                  {...register('insurancePostalCode')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Stadt</label>
                <input
                  {...register('insuranceCity')}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Pflegedaten</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Pflegegrad *</label>
                <select
                  {...register('careLevel', { required: true })}
                  className={`form-select ${errors.careLevel ? 'border-red-500' : ''}`}
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
                <label className="form-label">Pflegebeginn *</label>
                <input
                  type="date"
                  {...register('careStart', { required: true })}
                  className={`form-input ${errors.careStart ? 'border-red-500' : ''}`}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Lebt allein *</label>
                <select
                  {...register('livingAlone', { required: true })}
                  className={`form-select ${errors.livingAlone ? 'border-red-500' : ''}`}
                >
                  <option value="">Bitte wählen</option>
                  <option value="yes">Ja</option>
                  <option value="no">Nein</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Lebt mit</label>
                <input
                  {...register('livingWith')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kann Tür öffnen *</label>
                <select
                  {...register('canOpenDoor', { required: true })}
                  className={`form-select ${errors.canOpenDoor ? 'border-red-500' : ''}`}
                >
                  <option value="">Bitte wählen</option>
                  <option value="yes">Ja</option>
                  <option value="no">Nein</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Schlüssel vorhanden</label>
                <select
                  {...register('hasKey')}
                  className="form-select"
                >
                  <option value="">Bitte wählen</option>
                  <option value="yes">Ja</option>
                  <option value="no">Nein</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="form-label">Diagnosen</label>
                <textarea
                  {...register('diagnoses')}
                  rows={4}
                  className="form-input"
                />
              </div>

              <div className="col-span-2">
                <label className="form-label">Bemerkungen</label>
                <textarea
                  {...register('notes')}
                  rows={4}
                  className="form-input"
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
              {step === 4 ? 'Klient anlegen' : 'Weiter'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}