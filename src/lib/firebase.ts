import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZ5VTWF_NgEjhJ2NkxSKX-Ji6llVMFmxc",
  authDomain: "careware-282de.firebaseapp.com",
  projectId: "careware-282de",
  storageBucket: "careware-282de.appspot.com",
  messagingSenderId: "844210276498",
  appId: "1:844210276498:web:c26e634761a5932bbefe4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support offline persistence.');
  }
});

// Initialize Storage
const storage = getStorage(app);
export { storage };