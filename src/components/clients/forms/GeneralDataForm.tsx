import React from 'react';
import { useForm } from 'react-hook-form';
import { validatePostalCode } from '../../../utils/validation';

interface GeneralDataFormProps {
  data: any;
  onSubmit: (data: any) => void;
}

export function GeneralDataForm({ data, onSubmit }: GeneralDataFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Allgemeine Stammdaten</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vorname</label>
          <input
            type="text"
            {...register('firstName', { required: 'Vorname ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nachname</label>
          <input
            type="text"
            {...register('lastName', { required: 'Nachname ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Erstkontakt</label>
          <input
            type="date"
            {...register('firstContact')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ersttermin</label>
          <input
            type="date"
            {...register('firstAppointment')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Zuträger</label>
          <input
            type="text"
            {...register('referrer')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Geburtstag</label>
          <input
            type="date"
            {...register('dateOfBirth', { required: 'Geburtstag ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Straße</label>
          <input
            type="text"
            {...register('street', { required: 'Straße ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hausnummer</label>
          <input
            type="text"
            {...register('houseNumber', { required: 'Hausnummer ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.houseNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.houseNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">PLZ</label>
          <input
            type="text"
            {...register('postalCode', { 
              required: 'PLZ ist erforderlich',
              validate: validatePostalCode
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ort</label>
          <input
            type="text"
            {...register('city', { required: 'Ort ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
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