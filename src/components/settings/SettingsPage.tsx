import React from 'react';
import { Settings, User, Bell, Shield, Database, Printer } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Einstellungen</h1>

        <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="p-6">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h2 className="text-lg font-medium text-gray-900">Profil</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Verwalten Sie Ihre persönlichen Informationen
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                  value="Sarah Meyer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">E-Mail</label>
                <input
                  type="email"
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                  value="sarah.meyer@careware.de"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h2 className="text-lg font-medium text-gray-900">Benachrichtigungen</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Konfigurieren Sie Ihre Benachrichtigungseinstellungen
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">E-Mail Benachrichtigungen</h3>
                  <p className="text-sm text-gray-500">Erhalten Sie Updates per E-Mail</p>
                </div>
                <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-600">
                  <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h2 className="text-lg font-medium text-gray-900">Sicherheit</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Verwalten Sie Ihre Sicherheitseinstellungen
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Passwort ändern
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center">
              <Database className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h2 className="text-lg font-medium text-gray-900">Daten & Backup</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Verwalten Sie Ihre Daten und Backup-Einstellungen
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Database className="w-4 h-4 mr-2" />
                Backup erstellen
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center">
              <Printer className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h2 className="text-lg font-medium text-gray-900">Druckereinstellungen</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Konfigurieren Sie Ihre Druckeinstellungen
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Drucker einrichten
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}