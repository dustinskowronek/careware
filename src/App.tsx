import React from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { CalendarView } from './components/calendar/CalendarView';
import { TimeTrackingPage } from './components/timetracking/TimeTrackingPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { EmployeesPage } from './components/employees/EmployeesPage';
import { ClientsPage } from './components/clients/ClientsPage';
import { RoutePlanningPage } from './components/route-planning/RoutePlanningPage';
import { CommunicationPage } from './components/communication/CommunicationPage';
import { DocumentationPage } from './components/documentation/DocumentationPage';
import { ServicesPage } from './components/services/ServicesPage';
import { FinancesPage } from './components/finances/FinancesPage';
import { SettingsPage } from './components/settings/SettingsPage';

export type ViewType = 
  | 'dashboard' 
  | 'employees' 
  | 'clients' 
  | 'calendar' 
  | 'timetracking'
  | 'route-planning'
  | 'communication'
  | 'documentation'
  | 'services'
  | 'finances'
  | 'settings';

export default function App() {
  const [currentView, setCurrentView] = React.useState<ViewType>('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentView === 'dashboard' && <DashboardPage />}
        {currentView === 'employees' && <EmployeesPage />}
        {currentView === 'clients' && <ClientsPage />}
        {currentView === 'calendar' && <CalendarView />}
        {currentView === 'timetracking' && <TimeTrackingPage />}
        {currentView === 'route-planning' && <RoutePlanningPage />}
        {currentView === 'communication' && <CommunicationPage />}
        {currentView === 'documentation' && <DocumentationPage />}
        {currentView === 'services' && <ServicesPage />}
        {currentView === 'finances' && <FinancesPage />}
        {currentView === 'settings' && <SettingsPage />}
      </div>
    </div>
  );
}