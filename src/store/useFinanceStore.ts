import { create } from 'zustand';
import { collection, addDoc, updateDoc, doc, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Transaction {
  id: string;
  clientId: string;
  serviceId: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid' | 'cancelled';
  invoiceNumber?: string;
  notes?: string;
}

interface FinanceState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  loadTransactions: () => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set) => {
  // Subscribe to Firestore updates
  const transactionsRef = collection(db, 'transactions');
  onSnapshot(transactionsRef, (snapshot) => {
    const transactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Transaction));
    set({ transactions });
  });

  return {
    transactions: [],
    addTransaction: async (transaction) => {
      try {
        const docRef = await addDoc(collection(db, 'transactions'), transaction);
        console.log('Transaction added with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    },
    updateTransaction: async (id, updates) => {
      try {
        const transactionRef = doc(db, 'transactions', id);
        await updateDoc(transactionRef, updates);
        console.log('Transaction updated successfully');
      } catch (error) {
        console.error('Error updating transaction:', error);
      }
    },
    loadTransactions: async () => {
      try {
        const q = query(collection(db, 'transactions'));
        const querySnapshot = await getDocs(q);
        const transactions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Transaction));
        set({ transactions });
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }
  };
});