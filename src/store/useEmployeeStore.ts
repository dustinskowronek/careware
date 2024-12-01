import { create } from 'zustand';
import { collection, addDoc, updateDoc, doc, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  address?: string;
  startDate?: string;
  socialSecurityNumber?: string;
  taxId?: string;
  bankDetails?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  nationality?: string;
  maritalStatus?: string;
  workingHours?: string;
  healthInsurance?: string;
}

interface EmployeeState {
  employees: Employee[];
  selectedEmployeeIds: number[];
  addEmployee: (employee: Omit<Employee, 'id' | 'status'>) => Promise<void>;
  updateEmployee: (id: number, updates: Partial<Employee>) => Promise<void>;
  toggleEmployeeSelection: (id: number) => void;
  selectAllEmployees: () => void;
  deselectAllEmployees: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => {
  // Subscribe to Firestore updates
  const employeesRef = collection(db, 'employees');
  onSnapshot(employeesRef, (snapshot) => {
    const employees = snapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data()
    } as Employee));
    set({ employees });
  });

  return {
    employees: [],
    selectedEmployeeIds: [],
    addEmployee: async (employee) => {
      try {
        const newEmployee = {
          ...employee,
          status: 'active' as const,
          id: Date.now()
        };
        await addDoc(collection(db, 'employees'), newEmployee);
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    },
    updateEmployee: async (id, updates) => {
      try {
        const employeeRef = doc(db, 'employees', id.toString());
        await updateDoc(employeeRef, updates);
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
    toggleEmployeeSelection: (id) =>
      set((state) => ({
        selectedEmployeeIds: state.selectedEmployeeIds.includes(id)
          ? state.selectedEmployeeIds.filter((empId) => empId !== id)
          : [...state.selectedEmployeeIds, id]
      })),
    selectAllEmployees: () =>
      set((state) => ({
        selectedEmployeeIds: state.employees.map((emp) => emp.id)
      })),
    deselectAllEmployees: () =>
      set(() => ({
        selectedEmployeeIds: []
      }))
  };
});