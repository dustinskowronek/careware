import { create } from 'zustand';
import { collection, addDoc, updateDoc, doc, getDocs, query, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Appointment {
  id: string;
  employeeId: number;
  clientName: string;
  type: string;
  start: string;
  end: string;
  date: string;
  color: string;
}

interface AppointmentState {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => Promise<void>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  getAppointmentsForEmployee: (employeeId: number, date: string) => Appointment[];
  loadAppointments: () => Promise<void>;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => {
  // Subscribe to Firestore updates
  const appointmentsRef = collection(db, 'appointments');
  onSnapshot(appointmentsRef, (snapshot) => {
    const appointments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Appointment));
    set({ appointments });
  });

  return {
    appointments: [],
    addAppointment: async (appointment) => {
      try {
        const docRef = await addDoc(collection(db, 'appointments'), appointment);
        console.log('Appointment added with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding appointment:', error);
      }
    },
    updateAppointment: async (id, updates) => {
      try {
        const appointmentRef = doc(db, 'appointments', id);
        await updateDoc(appointmentRef, updates);
        console.log('Appointment updated successfully');
      } catch (error) {
        console.error('Error updating appointment:', error);
      }
    },
    deleteAppointment: async (id) => {
      try {
        await deleteDoc(doc(db, 'appointments', id));
        console.log('Appointment deleted successfully');
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    },
    getAppointmentsForEmployee: (employeeId, date) => {
      const { appointments } = get();
      return appointments.filter(
        (app) => app.employeeId === employeeId && app.date === date
      );
    },
    loadAppointments: async () => {
      try {
        const q = query(collection(db, 'appointments'));
        const querySnapshot = await getDocs(q);
        const appointments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Appointment));
        set({ appointments });
      } catch (error) {
        console.error('Error loading appointments:', error);
      }
    }
  };
});