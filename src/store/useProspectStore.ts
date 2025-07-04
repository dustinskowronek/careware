import { create } from 'zustand';
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { createFirestoreSubscription } from '../lib/store-utils';
import { useClientStore } from './useClientStore';
import type { Client } from './useClientStore';

export interface Prospect {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  firstContact: string;
  firstAppointment: string;
  status: 'interested' | 'converted' | 'lost';
  lostReason?: string;
}

interface ProspectState {
  prospects: Prospect[];
  addProspect: (prospect: Omit<Prospect, 'id'>) => Promise<void>;
  updateProspect: (id: string, updates: Partial<Prospect>) => Promise<void>;
  convertToClient: (prospectId: string) => Promise<void>;
  markProspectLost: (prospectId: string, reason: string) => Promise<void>;
}

export const useProspectStore = create<ProspectState>((set, get) => {
  createFirestoreSubscription<Prospect>('prospects', (prospects) => set({ prospects }));

  return {
    prospects: [],
    addProspect: async (prospect) => {
      try {
        await addDoc(collection(db, 'prospects'), prospect);
      } catch (error) {
        console.error('Error adding prospect:', error);
      }
    },
    updateProspect: async (id, updates) => {
      try {
        const prospectRef = doc(db, 'prospects', id);
        await updateDoc(prospectRef, updates);
      } catch (error) {
        console.error('Error updating prospect:', error);
      }
    },
    convertToClient: async (prospectId) => {
      try {
        const prospect = get().prospects.find(p => p.id === prospectId);
        if (!prospect) {
          console.error('Prospect not found:', prospectId);
          return;
        }
        const { addClient } = useClientStore.getState();
        const clientData = {
          name: `${prospect.firstName} ${prospect.lastName}`,
          firstName: prospect.firstName,
          lastName: prospect.lastName,
          firstContact: prospect.firstContact,
          firstAppointment: prospect.firstAppointment,
          referrer: '',
          street: prospect.address,
          houseNumber: '',
          postalCode: '',
          city: '',
          dateOfBirth: '',
          emergencyContactFirstName: '',
          emergencyContactLastName: '',
          emergencyContactStreet: '',
          emergencyContactHouseNumber: '',
          emergencyContactPostalCode: '',
          emergencyContactCity: '',
          emergencyContactPhone: '',
          careType: 'Privat' as const,
          estimatedHoursPerWeek: 0,
          careFrequency: { type: 'daily' as const },
          preferredDays: [],
          preferredTimeOfDay: 'any' as const,
          visitReason: '',
          physicalLimitations: '',
          pets: '',
          healthInsurance: '',
          insuranceId: '',
          hasSubsidizedCare: false,
          status: 'new' as const
        } as unknown as Omit<Client, 'id'>;

        await addClient(clientData);
        await deleteDoc(doc(db, 'prospects', prospectId));
      } catch (error) {
        console.error('Error converting prospect to client:', error);
      }
    },
    markProspectLost: async (prospectId, reason) => {
      try {
        const prospectRef = doc(db, 'prospects', prospectId);
        await updateDoc(prospectRef, { status: 'lost', lostReason: reason });
      } catch (error) {
        console.error('Error marking prospect as lost:', error);
      }
    }
  };
});
