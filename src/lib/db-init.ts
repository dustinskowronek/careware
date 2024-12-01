import { collection, getDocs, addDoc, query } from 'firebase/firestore';
import { db } from './firebase';

const initialClients = [
  {
    name: 'Maria Schmidt',
    careLevel: '3',
    address: 'Musterstraße 123, 12345 Berlin',
    phone: '+49 30 12345678',
    email: 'maria.schmidt@email.de',
    dateOfBirth: '1945-05-15',
    placeOfBirth: 'Berlin',
    nationality: 'deutsch',
    familyStatus: 'verwitwet',
    emergencyContact: 'Thomas Schmidt (Sohn)',
    emergencyRelation: 'Sohn',
    emergencyPhone: '+49 176 12345678',
    mobile: '+49 170 12345678',
    insuranceStatus: 'gesetzlich',
    insuranceId: 'A123456789',
    healthInsurance: 'AOK Berlin',
    insuranceAddress: 'Versicherungsstraße 1',
    insurancePostalCode: '12345',
    insuranceCity: 'Berlin',
    careStart: '2023-01-15',
    livingAlone: 'yes',
    livingWith: '',
    canOpenDoor: 'yes',
    hasKey: 'yes',
    diagnoses: 'Diabetes Typ 2, Bluthochdruck',
    notes: 'Benötigt Unterstützung bei der Medikamenteneinnahme',
    status: 'active'
  },
  {
    name: 'Hans Weber',
    careLevel: '4',
    address: 'Hauptstraße 45, 12345 Berlin',
    phone: '+49 30 87654321',
    email: 'hans.weber@email.de',
    dateOfBirth: '1940-08-20',
    placeOfBirth: 'Hamburg',
    nationality: 'deutsch',
    familyStatus: 'verheiratet',
    emergencyContact: 'Emma Weber (Ehefrau)',
    emergencyRelation: 'Ehefrau',
    emergencyPhone: '+49 176 87654321',
    mobile: '',
    insuranceStatus: 'privat',
    insuranceId: 'P987654321',
    healthInsurance: 'DKV',
    insuranceAddress: 'Privatstraße 10',
    insurancePostalCode: '12345',
    insuranceCity: 'Berlin',
    careStart: '2023-03-01',
    livingAlone: 'no',
    livingWith: 'Ehefrau',
    canOpenDoor: 'no',
    hasKey: 'yes',
    diagnoses: 'Parkinson, Arthrose',
    notes: 'Rollstuhlpflichtig',
    status: 'active'
  }
];

const initialEmployees = [
  {
    name: 'Sarah Meyer',
    role: 'Pflegefachkraft',
    email: 'sarah.meyer@careware.de',
    phone: '+49 176 12345678',
    status: 'active',
    address: 'Musterstraße 123, 12345 Berlin',
    startDate: '2024-01-01',
    socialSecurityNumber: 'SV12345678',
    taxId: 'ST98765432',
    bankDetails: 'Sparkasse Berlin | IBAN: DE12 1234 5678 9012 3456 78 | BIC: SPBEDE12XXX',
    dateOfBirth: '1990-05-15',
    placeOfBirth: 'Berlin',
    nationality: 'deutsch',
    maritalStatus: 'ledig',
    workingHours: '40',
    healthInsurance: 'AOK Berlin'
  },
  {
    name: 'Thomas Klein',
    role: 'Pflegehelfer',
    email: 'thomas.klein@careware.de',
    phone: '+49 176 87654321',
    status: 'active',
    address: 'Hauptstraße 45, 12345 Berlin',
    startDate: '2024-01-15',
    socialSecurityNumber: 'SV87654321',
    taxId: 'ST12345678',
    bankDetails: 'Deutsche Bank | IBAN: DE98 7654 3210 9876 5432 10 | BIC: DEUTDEBBXXX',
    dateOfBirth: '1995-08-20',
    placeOfBirth: 'Hamburg',
    nationality: 'deutsch',
    maritalStatus: 'verheiratet',
    workingHours: '30',
    healthInsurance: 'TK'
  }
];

const initialAppointments = [
  {
    employeeId: 1,
    clientName: 'Maria Schmidt',
    type: 'Grundpflege',
    date: '2024-03-20',
    start: '09:00',
    end: '10:30',
    color: 'bg-blue-600',
    location: 'Musterstraße 123, 12345 Berlin'
  },
  {
    employeeId: 1,
    clientName: 'Hans Weber',
    type: 'Medikamentengabe',
    date: '2024-03-20',
    start: '11:00',
    end: '11:30',
    color: 'bg-green-600',
    location: 'Hauptstraße 45, 12345 Berlin'
  }
];

const initialServices = [
  {
    name: 'Grundpflege',
    description: 'Grundlegende pflegerische Versorgung',
    duration: 45,
    price: 35.00,
    category: 'Pflege',
    active: true
  },
  {
    name: 'Medikamentengabe',
    description: 'Verabreichung von Medikamenten',
    duration: 15,
    price: 12.50,
    category: 'Medizinisch',
    active: true
  },
  {
    name: 'Mobilisation',
    description: 'Bewegungsübungen und Mobilisation',
    duration: 30,
    price: 25.00,
    category: 'Therapie',
    active: true
  }
];

const initialDocuments = [
  {
    employeeId: 1,
    name: 'Arbeitsvertrag.pdf',
    type: 'application/pdf',
    size: 1024576,
    uploadDate: '2024-03-01T10:00:00Z',
    url: 'https://example.com/documents/arbeitsvertrag.pdf'
  }
];

const initialTransactions = [
  {
    clientId: '1',
    serviceId: '1',
    amount: 35.00,
    date: '2024-03-15',
    status: 'paid',
    invoiceNumber: 'INV-2024-001',
    notes: 'Grundpflege März 2024'
  }
];

async function ensureCollections() {
  try {
    // Check and initialize clients
    const clientsRef = collection(db, 'clients');
    const clientsSnapshot = await getDocs(query(clientsRef));
    if (clientsSnapshot.empty) {
      for (const client of initialClients) {
        await addDoc(clientsRef, client);
      }
      console.log('Initial clients added successfully');
    }

    // Check and initialize employees
    const employeesRef = collection(db, 'employees');
    const employeesSnapshot = await getDocs(query(employeesRef));
    if (employeesSnapshot.empty) {
      for (const employee of initialEmployees) {
        await addDoc(employeesRef, employee);
      }
      console.log('Initial employees added successfully');
    }

    // Check and initialize appointments
    const appointmentsRef = collection(db, 'appointments');
    const appointmentsSnapshot = await getDocs(query(appointmentsRef));
    if (appointmentsSnapshot.empty) {
      for (const appointment of initialAppointments) {
        await addDoc(appointmentsRef, appointment);
      }
      console.log('Initial appointments added successfully');
    }

    // Check and initialize services
    const servicesRef = collection(db, 'services');
    const servicesSnapshot = await getDocs(query(servicesRef));
    if (servicesSnapshot.empty) {
      for (const service of initialServices) {
        await addDoc(servicesRef, service);
      }
      console.log('Initial services added successfully');
    }

    // Check and initialize documents
    const documentsRef = collection(db, 'documents');
    const documentsSnapshot = await getDocs(query(documentsRef));
    if (documentsSnapshot.empty) {
      for (const document of initialDocuments) {
        await addDoc(documentsRef, document);
      }
      console.log('Initial documents added successfully');
    }

    // Check and initialize transactions
    const transactionsRef = collection(db, 'transactions');
    const transactionsSnapshot = await getDocs(query(transactionsRef));
    if (transactionsSnapshot.empty) {
      for (const transaction of initialTransactions) {
        await addDoc(transactionsRef, transaction);
      }
      console.log('Initial transactions added successfully');
    }

  } catch (error) {
    console.error('Error ensuring collections:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    await ensureCollections();
    console.log('Database collections initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}