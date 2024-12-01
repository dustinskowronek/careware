import React from 'react';
import { useForm } from 'react-hook-form';
import { validateInsuranceId } from '../../../utils/validation';

interface InsuranceFormProps {
  data: any;
  onSubmit: (data: any) => void;
}

export function InsuranceForm({ data, onSubmit }: InsuranceFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: data
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Krankenkasse</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Krankenkasse</label>
          <input
            type="text"
            {...register('healthInsurance', { required: 'Krankenkasse ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.healthInsurance && (
            <p className="mt-1 text-sm text-red-600">{errors.healthInsurance.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Versichertennummer</label>
          <input
            type="text"
            {...register('insuranceId', {
              required: 'Versichertennummer ist erforderlich',
              validate: validateInsuranceId
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.insuranceId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.insuranceId.type === 'validate' 
                ? 'Versichertennummer muss aus einem Buchstaben und 9 Ziffern bestehen'
                : errors.insuranceId.message}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('hasSubsidizedCare')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Beihilfe berechtigt</span>
          </label>
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