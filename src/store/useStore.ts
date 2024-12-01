import { create } from 'zustand';
import { addDays, startOfWeek, format } from 'date-fns';
import { de } from 'date-fns/locale';

interface CalendarState {
  currentDate: Date;
  view: 'day' | 'week' | 'month' | 'list';
  setCurrentDate: (date: Date) => void;
  setView: (view: 'day' | 'week' | 'month' | 'list') => void;
  getWeekDays: () => Date[];
  formatDate: (date: Date) => string;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),
  view: 'week',
  setCurrentDate: (date) => set({ currentDate: date }),
  setView: (view) => set({ view }),
  getWeekDays: () => {
    const { currentDate } = get();
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  },
  formatDate: (date) => format(date, 'EEEE, d. MMMM yyyy', { locale: de })
}));