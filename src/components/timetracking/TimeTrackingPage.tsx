import React from 'react';
import { TimeTrackingHeader } from './TimeTrackingHeader';
import { TimeEntriesList } from './TimeEntriesList';
import { NewEntryModal } from './NewEntryModal';

export function TimeTrackingPage() {
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = React.useState(false);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <TimeTrackingHeader onNewEntry={() => setIsNewEntryModalOpen(true)} />
      <TimeEntriesList />
      {isNewEntryModalOpen && (
        <NewEntryModal onClose={() => setIsNewEntryModalOpen(false)} />
      )}
    </div>
  );
}