import { create } from "zustand";
import apiInstance from "@/util/api";
import { IPerson, ICompany } from "@/interfaces/Customer";

type customerState = {
  customerCompany: ICompany;
  customerPerson: IPerson;
  list: [];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
  create: (
    type: string,
    rut: string,
    companyName: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    legalRepresentative: string,
    line: string,
    email: string,
    phone: string,
    address: string,
    district: string
  ) => void;
  update: (
    id: string,
    rut: string,
    companyName: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    legalRepresentative: string,
    line: string,
    email: string,
    phone: string,
    address: string,
    district: string
  ) => void;
  deleteById: (id: string) => void;
};
const initDataCompany = {
  id: "",
  type: "",
  company_id: "",
  rut: "",
  companyName: "",
  legalRepresentative: "",
  line: "",
  email: "",
  phone: "",
  address: "",
  district: "",
};
const initDataPerson = {
  id: "",
  type: "",
  person_id: "",
  rut: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  email: "",
  phone: "",
  address: "",
  district: "",
};
export const customerStore = create<customerState>((set, get) => ({
  customerCompany: initDataCompany,
  customerPerson: initDataPerson,
  list: [],
  isLoading: false,
  isError: false,
  error: "",
  
  getAll: async () => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get("/customer/getAll");
      set((state) => ({
        ...state,
        list: data.data,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  create: async (
    type: string,
    rut: string,
    companyName: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    legalRepresentative: string,
    line: string,
    email: string,
    phone: string,
    address: string,
    district: string
  ) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.post("/customer/create/:type", {
        type,
        rut,
        companyName,
        name,
        paternalLastName,
        maternalLastName,
        legalRepresentative,
        line,
        email,
        phone,
        address,
        district,
      });
      set((state) => ({
        ...state,
        customerCompany: (type = "c" ? data.data : initDataCompany),
        customerPerson: (type = "p" ? data.data : initDataPerson),
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  update: async (
    id: string,
    rut: string,
    companyName: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    legalRepresentative: string,
    line: string,
    email: string,
    phone: string,
    address: string,
    district: string
  ) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.put("/customer/update", {
        id,
        rut,
        companyName,
        name,
        paternalLastName,
        maternalLastName,
        legalRepresentative,
        line,
        email,
        phone,
        address,
        district,
      });
      set((state) => ({
        ...state,
        customerCompany: (data.data.type = "c" ? data.data : initDataCompany),
        customerPerson: (data.data.type = "p" ? data.data : initDataPerson),
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  deleteById: async (id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.delete("/customer/deleteById/:id", {
        params: id,
      });
      set((state) => ({
        ...state,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
}));
