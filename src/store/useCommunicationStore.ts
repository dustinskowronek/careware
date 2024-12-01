import { create } from 'zustand';
import { collection, addDoc, updateDoc, doc, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Message {
  id: string;
  senderId: number;
  recipientId: number | null;
  groupId: string | null;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ChatGroup {
  id: string;
  name: string;
  members: number[];
  lastMessage?: string;
  lastMessageTime?: string;
}

interface CommunicationState {
  messages: Message[];
  groups: ChatGroup[];
  addMessage: (message: Omit<Message, 'id'>) => Promise<void>;
  addGroup: (group: Omit<ChatGroup, 'id'>) => Promise<void>;
  updateGroup: (id: string, updates: Partial<ChatGroup>) => Promise<void>;
  loadMessages: () => Promise<void>;
  loadGroups: () => Promise<void>;
}

export const useCommunicationStore = create<CommunicationState>((set) => {
  // Subscribe to Firestore updates
  const messagesRef = collection(db, 'messages');
  const groupsRef = collection(db, 'chatGroups');

  onSnapshot(messagesRef, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
    set((state) => ({ ...state, messages }));
  });

  onSnapshot(groupsRef, (snapshot) => {
    const groups = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ChatGroup));
    set((state) => ({ ...state, groups }));
  });

  return {
    messages: [],
    groups: [],
    addMessage: async (message) => {
      try {
        const docRef = await addDoc(collection(db, 'messages'), {
          ...message,
          timestamp: new Date().toISOString()
        });
        console.log('Message added with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding message:', error);
      }
    },
    addGroup: async (group) => {
      try {
        const docRef = await addDoc(collection(db, 'chatGroups'), group);
        console.log('Group added with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding group:', error);
      }
    },
    updateGroup: async (id, updates) => {
      try {
        const groupRef = doc(db, 'chatGroups', id);
        await updateDoc(groupRef, updates);
        console.log('Group updated successfully');
      } catch (error) {
        console.error('Error updating group:', error);
      }
    },
    loadMessages: async () => {
      try {
        const q = query(collection(db, 'messages'));
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Message));
        set((state) => ({ ...state, messages }));
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    },
    loadGroups: async () => {
      try {
        const q = query(collection(db, 'chatGroups'));
        const querySnapshot = await getDocs(q);
        const groups = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as ChatGroup));
        set((state) => ({ ...state, groups }));
      } catch (error) {
        console.error('Error loading groups:', error);
      }
    }
  };
});