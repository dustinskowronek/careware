import React from 'react';
import { 
  Calendar, 
  Users, 
  User, 
  Euro, 
  Settings, 
  LayoutGrid, 
  FileText,
  Clock,
  Map,
  MessageSquare,
  FileSpreadsheet
} from 'lucide-react';
import { NavLink } from './NavLink';
import { ViewType } from '../../App';

interface SidebarProps {
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

export function Sidebar({ onNavigate, currentView }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-700">Careware</h1>
        <p className="text-sm text-gray-500 mt-1">Pflegemanagement</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <NavLink 
          icon={<LayoutGrid size={20} />} 
          href="#" 
          active={currentView === 'dashboard'}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </NavLink>
        <NavLink 
          icon={<Users size={20} />} 
          href="#" 
          active={currentView === 'employees'}
          onClick={() => onNavigate('employees')}
        >
          Mitarbeiter
        </NavLink>
        <NavLink 
          icon={<User size={20} />} 
          href="#" 
          active={currentView === 'clients'}
          onClick={() => onNavigate('clients')}
        >
          KlientInnen
        </NavLink>
        <NavLink 
          icon={<Calendar size={20} />} 
          href="#" 
          active={currentView === 'calendar'}
          onClick={() => onNavigate('calendar')}
        >
          Kalender
        </NavLink>
        <NavLink 
          icon={<Clock size={20} />} 
          href="#" 
          active={currentView === 'timetracking'}
          onClick={() => onNavigate('timetracking')}
        >
          Zeiterfassung
        </NavLink>
        <NavLink 
          icon={<Map size={20} />} 
          href="#" 
          active={currentView === 'route-planning'}
          onClick={() => onNavigate('route-planning')}
        >
          Tourenplanung
        </NavLink>
        <NavLink 
          icon={<MessageSquare size={20} />} 
          href="#" 
          active={currentView === 'communication'}
          onClick={() => onNavigate('communication')}
        >
          Kommunikation
        </NavLink>
        <NavLink 
          icon={<FileText size={20} />} 
          href="#" 
          active={currentView === 'documentation'}
          onClick={() => onNavigate('documentation')}
        >
          Dokumentation
        </NavLink>
        <NavLink 
          icon={<FileSpreadsheet size={20} />} 
          href="#" 
          active={currentView === 'services'}
          onClick={() => onNavigate('services')}
        >
          Leistungen
        </NavLink>
        <NavLink 
          icon={<Euro size={20} />} 
          href="#" 
          active={currentView === 'finances'}
          onClick={() => onNavigate('finances')}
        >
          Finanzen
        </NavLink>
      </nav>

      <div className="p-4 border-t">
        <NavLink 
          icon={<Settings size={20} />} 
          href="#" 
          active={currentView === 'settings'}
          onClick={() => onNavigate('settings')}
        >
          Einstellungen
        </NavLink>
      </div>
    </div>
  );
}