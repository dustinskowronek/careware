import React from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  uploadDate: string;
  url: string;
}

interface DocumentsListProps {
  entityId: string | number;
  entityType: 'employee' | 'client';
}

export function DocumentsList({ entityId, entityType }: DocumentsListProps) {
  const documents: Document[] = []; // This will be replaced with actual documents from Firebase

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          onChange={() => {}}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600">
              Dateien hierher ziehen oder{' '}
              <span className="text-blue-600 hover:text-blue-700">durchsuchen</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              PDF, DOC, DOCX, JPG oder PNG bis zu 10MB
            </p>
          </div>
        </label>
      </div>

      {/* Documents List */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Dokumente</h3>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open(doc.url)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                  title="Herunterladen"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {}}
                  className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                  title="Löschen"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {documents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Keine Dokumente vorhanden</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}