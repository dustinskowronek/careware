import React from 'react';
import { useForm } from 'react-hook-form';
import { validatePostalCode, validatePhoneNumber } from '../../../utils/validation';

interface EmergencyContactFormProps {
  data: any;
  onSubmit: (data: any) => void;
}

export function EmergencyContactForm({ data, onSubmit }: EmergencyContactFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Kontaktperson (Notfallkontakt)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vorname</label>
          <input
            type="text"
            {...register('emergencyContactFirstName', { required: 'Vorname ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.emergencyContactFirstName && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContactFirstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nachname</label>
          <input
            type="text"
            {...register('emergencyContactLastName', { required: 'Nachname ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.emergencyContactLastName && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContactLastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Straße</label>
          <input
            type="text"
            {...register('emergencyContactStreet', { required: 'Straße ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.emergencyContactStreet && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContactStreet.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hausnummer</label>
          <input
            type="text"
            {...register('emergencyContactHouseNumber', { required: 'Hausnummer ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.emergencyContactHouseNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContactHouseNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">PLZ</label>
          <input
            type="text"
            {...register('emergencyContactPostalCode', {
              required: 'PLZ ist erforderlich',
              validate: validatePostalCode
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.emergencyContactPostalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContactPostalCode.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ort</label>
          <input
            type="text"
            {...register('emergencyContactCity', { required: 'Ort ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.emergencyContactCity && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContactCity.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefonnummer</label>
          <input
            type="tel"
            {...register('emergencyContactPhone', {
              required: 'Telefonnummer ist erforderlich',
              validate: validatePhoneNumber
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.emergencyContactPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContactPhone.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Speichern
        </button>
      </div>
    </form>
  );
}