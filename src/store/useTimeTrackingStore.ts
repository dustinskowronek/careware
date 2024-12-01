import { create } from 'zustand';

export interface TimeEntry {
  id: string;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  serviceType: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

interface TimeTrackingState {
  entries: TimeEntry[];
  addEntry: (entry: Omit<TimeEntry, 'id'>) => void;
  updateEntry: (id: string, entry: Partial<TimeEntry>) => void;
  deleteEntry: (id: string) => void;
}

export const useTimeTrackingStore = create<TimeTrackingState>((set) => ({
  entries: [
    {
      id: '1',
      clientName: 'Maria Schmidt',
      date: '2024-03-18',
      startTime: '08:00',
      endTime: '09:30',
      duration: 90,
      serviceType: 'Grundpflege',
      status: 'approved',
      notes: 'Reguläre Morgenpflege durchgeführt'
    },
    {
      id: '2',
      clientName: 'Hans Weber',
      date: '2024-03-18',
      startTime: '10:00',
      endTime: '11:00',
      duration: 60,
      serviceType: 'Medikamentengabe',
      status: 'pending'
    }
  ],
  addEntry: (entry) =>
    set((state) => ({
      entries: [...state.entries, { ...entry, id: Math.random().toString(36).substr(2, 9) }]
    })),
  updateEntry: (id, updatedEntry) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    })),
  deleteEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id)
    }))
}));