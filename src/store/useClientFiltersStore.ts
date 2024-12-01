import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ClientStatus = 'new' | 'active' | 'inactive';
export type CareLevel = '1' | '2' | '3' | '4' | '5' | 'pending' | 'none';
export type InsuranceType = 'SGB XI' | 'SGB V';

interface VisibleFields {
  email: boolean;
  phone: boolean;
  insuranceStatus: boolean;
  status: boolean;
  postalCode: boolean;
  city: boolean;
}

interface ClientFiltersState {
  search: string;
  statusFilter: ClientStatus[];
  careLevelFilter: CareLevel[];
  insuranceTypeFilter: InsuranceType[];
  visibleFields: VisibleFields;
  setSearch: (search: string) => void;
  setStatusFilter: (status: ClientStatus[]) => void;
  setCareLevelFilter: (careLevel: CareLevel[]) => void;
  setInsuranceTypeFilter: (type: InsuranceType[]) => void;
  toggleField: (field: keyof VisibleFields) => void;
}

export const useClientFiltersStore = create<ClientFiltersState>()(
  persist(
    (set) => ({
      search: '',
      statusFilter: [],
      careLevelFilter: [],
      insuranceTypeFilter: [],
      visibleFields: {
        email: true,
        phone: true,
        insuranceStatus: true,
        status: true,
        postalCode: false,
        city: true,
      },
      setSearch: (search) => set({ search }),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      setCareLevelFilter: (careLevelFilter) => set({ careLevelFilter }),
      setInsuranceTypeFilter: (insuranceTypeFilter) => set({ insuranceTypeFilter }),
      toggleField: (field) =>
        set((state) => ({
          visibleFields: {
            ...state.visibleFields,
            [field]: !state.visibleFields[field],
          },
        })),
    }),
    {
      name: 'client-filters',
      storage: createJSONStorage(() => localStorage)
    }
  )
);