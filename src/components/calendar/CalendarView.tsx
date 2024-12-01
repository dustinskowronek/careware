import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Users, Plus } from 'lucide-react';
import { useCalendarStore } from '../../store/useStore';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { NewAppointmentModal } from './NewAppointmentModal';
import { EmployeeSelector } from './EmployeeSelector';

type ViewMode = 'day' | 'week' | 'employee' | 'worktime' | 'client';

export function CalendarView() {
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const { currentDate, setCurrentDate, formatDate } = useCalendarStore();
  const [showEmployeeSelector, setShowEmployeeSelector] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="bg-white border-b">
        {/* Top Actions */}
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Kalender</h1>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowNewAppointmentModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Abwesenheit hinzufügen
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Drucken
            </button>
          </div>
        </div>

        {/* View Selector */}
        <div className="flex border-b">
          <button 
            onClick={() => setViewMode('day')}
            className={`px-4 py-2 ${
              viewMode === 'day' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tagesansicht
          </button>
          <button 
            onClick={() => setViewMode('employee')}
            className={`px-4 py-2 ${
              viewMode === 'employee' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mitarbeiter Ansicht
          </button>
          <button 
            onClick={() => setViewMode('worktime')}
            className={`px-4 py-2 ${
              viewMode === 'worktime' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Arbeitszeiten Ansicht
          </button>
          <button 
            onClick={() => setViewMode('client')}
            className={`px-4 py-2 ${
              viewMode === 'client' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Klientenansicht
          </button>
        </div>

        {/* Calendar Controls */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrevious}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <h2 className="text-lg font-medium">
              {formatDate(currentDate)}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowEmployeeSelector(!showEmployeeSelector)}
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Users size={20} />
              <span>Mitarbeiter auswählen</span>
            </button>
            <button 
              onClick={() => setShowNewAppointmentModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <CalendarIcon size={20} />
              <span>Zusätzliche Veranstaltung hinzufügen</span>
            </button>
          </div>
        </div>

        {/* View Controls */}
        <div className="px-4 py-2 border-t flex items-center space-x-4">
          <div className="flex space-x-2">
            <button className="px-4 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
              Heute
            </button>
            <button className="px-4 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
              Monat
            </button>
            <button className="px-4 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
              Wochen
            </button>
            <button className="px-4 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
              Tag
            </button>
            <button className="px-4 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
              Liste
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'day' && <DayView />}
        {viewMode === 'week' && <WeekView />}
      </div>

      {/* Modals */}
      {showEmployeeSelector && (
        <EmployeeSelector onClose={() => setShowEmployeeSelector(false)} />
      )}
      
      {showNewAppointmentModal && (
        <NewAppointmentModal onClose={() => setShowNewAppointmentModal(false)} />
      )}
    </div>
  );
}