import React from 'react';
import { MessageSquare, Search, Plus, Phone, Video, Users, User, MoreVertical } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Team Besprechung',
    lastMessage: 'Nächste Woche Dienstag 14 Uhr',
    time: '10:30',
    unread: 2,
    type: 'group'
  },
  {
    id: 2,
    name: 'Sarah Meyer',
    lastMessage: 'Dokumentation ist fertig',
    time: '09:15',
    unread: 0,
    type: 'direct'
  }
];

export function CommunicationPage() {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex h-full">
        <div className="w-80 bg-white border-r">
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold text-gray-900">Kommunikation</h1>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Suchen..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </button>
              <button className="flex-1 flex items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Video className="w-4 h-4 mr-2" />
                Video
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-4 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
              >
                <div className="flex-shrink-0">
                  {conversation.type === 'group' ? (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.name}
                    </p>
                    <p className="text-xs text-gray-500">{conversation.time}</p>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs rounded-full">
                      {conversation.unread}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-white border-b flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Team Besprechung</h2>
                <p className="text-sm text-gray-500">8 Teilnehmer</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Chat messages would go here */}
              <div className="flex justify-center">
                <span className="text-sm text-gray-500">Heute</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border-t">
            <div className="flex space-x-4">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Plus className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Nachricht schreiben..."
                className="flex-1 border rounded-lg px-4 py-2"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Senden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}