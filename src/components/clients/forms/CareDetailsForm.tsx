import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface CareDetailsFormProps {
  data: any;
  onSubmit: (data: any) => void;
}

export function CareDetailsForm({ data, onSubmit }: CareDetailsFormProps) {
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
    defaultValues: data
  });

  const careType = watch('careType');
  const careAllowanceType = watch('careAllowanceType');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Benötigte Versorgung</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Art der Versorgung</label>
          <select
            {...register('careType', { required: 'Art der Versorgung ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Bitte wählen</option>
            <option value="SGB V">SGB V</option>
            <option value="SGB XI">SGB XI</option>
            <option value="Privat">Privat</option>
          </select>
          {errors.careType && (
            <p className="mt-1 text-sm text-red-600">{errors.careType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Geschätzte benötigte Stunden (wöchentlich)
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            {...register('estimatedHoursPerWeek', { required: 'Stundenzahl ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.estimatedHoursPerWeek && (
            <p className="mt-1 text-sm text-red-600">{errors.estimatedHoursPerWeek.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rhythmus</label>
          <select
            {...register('careFrequency.type', { required: 'Rhythmus ist erforderlich' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Bitte wählen</option>
            <option value="daily">Täglich</option>
            <option value="weekly">Wöchentlich</option>
            <option value="custom">Benutzerdefiniert</option>
          </select>
          {errors.careFrequency?.type && (
            <p className="mt-1 text-sm text-red-600">{errors.careFrequency.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bevorzugter Zeitraum</label>
          <select
            {...register('preferredTimeOfDay')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="morning">Vormittag</option>
            <option value="afternoon">Nachmittag</option>
            <option value="any">Immer</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Bevorzugte Tage</label>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'].map((day) => (
              <label key={day} className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register('preferredDays')}
                  value={day}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Grund des Besuchs</label>
          <textarea
            {...register('visitReason')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Körperliche Einschränkungen</label>
          <textarea
            {...register('physicalLimitations')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Haustiere</label>
          <input
            type="text"
            {...register('pets')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Dynamic fields based on care type */}
      {careType === 'SGB V' && (
        <div className="space-y-6 border-t pt-6">
          <h4 className="text-lg font-medium text-gray-900">SGB V Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status der Genehmigung</label>
              <select
                {...register('approvalStatus')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="existing">Bereits vorhanden</option>
                <option value="pending">Beantragt</option>
                <option value="to-be-submitted">Wird noch beantragt</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name des Arztes</label>
              <input
                type="text"
                {...register('doctorName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Anschrift des Arztes</label>
              <input
                type="text"
                {...register('doctorAddress')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fachrichtung des Arztes</label>
              <input
                type="text"
                {...register('doctorSpecialty')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Genehmigung gültig von</label>
              <input
                type="date"
                {...register('approvalValidFrom')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Genehmigung gültig bis</label>
              <input
                type="date"
                {...register('approvalValidUntil')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {careType === 'SGB XI' && (
        <div className="space-y-6 border-t pt-6">
          <h4 className="text-lg font-medium text-gray-900">SGB XI Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pflegegrad</label>
              <select
                {...register('careLevel')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Bitte wählen</option>
                <option value="1">Pflegegrad 1</option>
                <option value="2">Pflegegrad 2</option>
                <option value="3">Pflegegrad 3</option>
                <option value="4">Pflegegrad 4</option>
                <option value="5">Pflegegrad 5</option>
                <option value="pending">In Beantragung</option>
                <option value="none">Keiner</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Pflegegrad seit</label>
              <input
                type="date"
                {...register('careLevelSince')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Art der Leistung</label>
              <select
                {...register('careAllowanceType')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="cash">Pflegegeld</option>
                <option value="service">Sachleistung</option>
                <option value="combined">Kombileistung</option>
              </select>
            </div>

            {careAllowanceType === 'service' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Höhe der Sachleistung</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">€</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    {...register('serviceAllowanceAmount')}
                    className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="col-span-2 space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('relief45b.used')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    §45b (Entlastungsbetrag) wurde genutzt
                  </span>
                </label>
                {watch('relief45b.used') && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Aktuelles Budget</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">€</span>
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        {...register('relief45b.currentBudget')}
                        className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('relief39.used')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    §39 (Verhinderungspflege) wurde genutzt
                  </span>
                </label>
                {watch('relief39.used') && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Aktuelles Budget</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">€</span>
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        {...register('relief39.currentBudget')}
                        className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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