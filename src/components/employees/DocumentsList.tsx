import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2 } from 'lucide-react';
import { useDocumentStore } from '../../store/useDocumentStore';

interface DocumentsListProps {
  employeeId: number;
}

export function DocumentsList({ employeeId }: DocumentsListProps) {
  const { documents, addDocument, deleteDocument } = useDocumentStore();
  const employeeDocuments = documents.filter(doc => doc.employeeId === employeeId);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      addDocument({
        employeeId,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString(),
        url: URL.createObjectURL(file)
      });
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      addDocument({
        employeeId,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString(),
        url: URL.createObjectURL(file)
      });
    });
  };

  return (
    <div>
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
        <p className="text-sm text-gray-600">
          Dateien hierher ziehen oder{' '}
          <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
            <span>auswählen</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </p>
      </div>

      {/* Documents List */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Dokumente</h3>
        <div className="space-y-4">
          {employeeDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-white border rounded-lg"
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
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}