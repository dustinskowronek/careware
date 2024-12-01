import { create } from 'zustand';
import { collection, addDoc, deleteDoc, doc, getDocs, query, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

export interface Document {
  id: string;
  employeeId: number;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  url: string;
}

interface DocumentState {
  documents: Document[];
  addDocument: (doc: Omit<Document, 'id'>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  loadDocuments: () => Promise<void>;
}

export const useDocumentStore = create<DocumentState>((set) => {
  // Subscribe to Firestore updates
  const documentsRef = collection(db, 'documents');
  onSnapshot(documentsRef, (snapshot) => {
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Document));
    set({ documents });
  });

  return {
    documents: [],
    addDocument: async (document) => {
      try {
        // Upload file to Storage
        const storageRef = ref(storage, `documents/${Date.now()}_${document.name}`);
        const response = await fetch(document.url);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        
        // Get download URL
        const url = await getDownloadURL(storageRef);
        
        // Save document metadata to Firestore
        const docRef = await addDoc(collection(db, 'documents'), {
          ...document,
          url
        });
        console.log('Document added with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding document:', error);
      }
    },
    deleteDocument: async (id) => {
      try {
        // Get document data to get storage URL
        const docRef = doc(db, 'documents', id);
        const docSnap = await getDocs(query(collection(db, 'documents')));
        const document = docSnap.docs.find(doc => doc.id === id);
        
        if (document) {
          // Delete from Storage
          const storageRef = ref(storage, document.data().url);
          await deleteObject(storageRef);
          
          // Delete from Firestore
          await deleteDoc(docRef);
          console.log('Document deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    },
    loadDocuments: async () => {
      try {
        const q = query(collection(db, 'documents'));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Document));
        set({ documents });
      } catch (error) {
        console.error('Error loading documents:', error);
      }
    }
  };
});