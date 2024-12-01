import { create } from 'zustand';
import { collection, addDoc, updateDoc, doc, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  active: boolean;
}

interface ServiceState {
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (id: string, updates: Partial<Service>) => Promise<void>;
  loadServices: () => Promise<void>;
}

export const useServiceStore = create<ServiceState>((set) => {
  // Subscribe to Firestore updates
  const servicesRef = collection(db, 'services');
  onSnapshot(servicesRef, (snapshot) => {
    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Service));
    set({ services });
  });

  return {
    services: [],
    addService: async (service) => {
      try {
        const docRef = await addDoc(collection(db, 'services'), service);
        console.log('Service added with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding service:', error);
      }
    },
    updateService: async (id, updates) => {
      try {
        const serviceRef = doc(db, 'services', id);
        await updateDoc(serviceRef, updates);
        console.log('Service updated successfully');
      } catch (error) {
        console.error('Error updating service:', error);
      }
    },
    loadServices: async () => {
      try {
        const q = query(collection(db, 'services'));
        const querySnapshot = await getDocs(q);
        const services = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Service));
        set({ services });
      } catch (error) {
        console.error('Error loading services:', error);
      }
    }
  };
});