import { create } from 'zustand';
import { collection, addDoc, updateDoc, doc, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Route {
  id: string;
  name: string;
  employeeId: number;
  date: string;
  appointments: {
    appointmentId: string;
    order: number;
  }[];
  status: 'planned' | 'in-progress' | 'completed';
}

interface RouteState {
  routes: Route[];
  addRoute: (route: Omit<Route, 'id'>) => Promise<void>;
  updateRoute: (id: string, updates: Partial<Route>) => Promise<void>;
  loadRoutes: () => Promise<void>;
}

export const useRouteStore = create<RouteState>((set) => {
  // Subscribe to Firestore updates
  const routesRef = collection(db, 'routes');
  onSnapshot(routesRef, (snapshot) => {
    const routes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Route));
    set({ routes });
  });

  return {
    routes: [],
    addRoute: async (route) => {
      try {
        const docRef = await addDoc(collection(db, 'routes'), route);
        console.log('Route added with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding route:', error);
      }
    },
    updateRoute: async (id, updates) => {
      try {
        const routeRef = doc(db, 'routes', id);
        await updateDoc(routeRef, updates);
        console.log('Route updated successfully');
      } catch (error) {
        console.error('Error updating route:', error);
      }
    },
    loadRoutes: async () => {
      try {
        const q = query(collection(db, 'routes'));
        const querySnapshot = await getDocs(q);
        const routes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Route));
        set({ routes });
      } catch (error) {
        console.error('Error loading routes:', error);
      }
    }
  };
});