import { create } from 'zustand';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { createFirestoreSubscription } from '../lib/store-utils';

export interface Client {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  firstContact: string;
  firstAppointment: string;
  referrer: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  dateOfBirth: string;
  
  // Emergency Contact
  emergencyContactFirstName: string;
  emergencyContactLastName: string;
  emergencyContactStreet: string;
  emergencyContactHouseNumber: string;
  emergencyContactPostalCode: string;
  emergencyContactCity: string;
  emergencyContactPhone: string;
  
  // Care Details
  careType: 'SGB V' | 'SGB XI' | 'Privat';
  estimatedHoursPerWeek: number;
  careFrequency: {
    type: 'daily' | 'weekly' | 'custom';
    interval?: number;
  };
  preferredDays: string[];
  preferredTimeOfDay: 'morning' | 'afternoon' | 'any';
  visitReason: string;
  physicalLimitations: string;
  pets: string;
  
  // Insurance
  healthInsurance: string;
  insuranceId: string;
  insuranceStatus?: string;
  hasSubsidizedCare: boolean;
  
  // SGB V Specific
  approvalStatus?: 'existing' | 'pending' | 'to-be-submitted';
  doctorName?: string;
  doctorAddress?: string;
  doctorSpecialty?: string;
  approvalValidFrom?: string;
  approvalValidUntil?: string;
  
  // SGB XI Specific
  careLevel?: string;
  careLevelSince?: string;
  careAllowanceType?: 'cash' | 'service' | 'combined';
  serviceAllowanceAmount?: number;
  relief45b?: {
    used: boolean;
    currentBudget: number;
  };
  relief39?: {
    used: boolean;
    currentBudget: number;
  };
  
  status: 'new' | 'active' | 'inactive';
}

interface ClientState {
  clients: Client[];
  filteredClients: Client[];
  addClient: (client: Omit<Client, 'id'>) => Promise<void>;
  updateClient: (id: string, updates: Partial<Client>) => Promise<void>;
  setFilteredClients: (clients: Client[]) => void;
}

export const useClientStore = create<ClientState>((set) => {
  createFirestoreSubscription<Client>('clients', (clients) => set({ clients }));

  return {
    clients: [],
    filteredClients: [],
    addClient: async (client) => {
      try {
        await addDoc(collection(db, 'clients'), client);
      } catch (error) {
        console.error('Error adding client:', error);
      }
    },
    updateClient: async (id, updates) => {
      try {
        const clientRef = doc(db, 'clients', id);
        await updateDoc(clientRef, updates);
      } catch (error) {
        console.error('Error updating client:', error);
      }
    },
    setFilteredClients: (filteredClients) => set({ filteredClients })
  };
});