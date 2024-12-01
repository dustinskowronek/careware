import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from './firebase';

// Generische Funktion für Realtime Updates
export const createFirestoreSubscription = <T>(
  collectionName: string,
  setState: (data: T[]) => void,
  transform?: (doc: DocumentData) => T
) => {
  return onSnapshot(
    collection(db, collectionName),
    (snapshot: QuerySnapshot<DocumentData>) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(transform ? transform(doc.data()) : doc.data())
      })) as T[];
      setState(items);
    },
    (error) => {
      console.error(`Error in ${collectionName} subscription:`, error);
    }
  );
};