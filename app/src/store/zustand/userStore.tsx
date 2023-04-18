import { create } from "zustand";
import { IUser } from "@/interfaces/User";
import apiInstance from "@/util/api";

type userState = {
  user: IUser;
  list: IUser[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
  create: (
    rut: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    email: string,
    phone: string,
    address: string,
    district: string,
    password: string
  ) => void;
  update: (
    id: string,
    rut: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    email: string,
    phone: string,
    address: string,
    district: string
  ) => void;
  deleteById: (id: string) => void;
  assignPassword: (id: string, password: string) => void;
  validate: (email: string, password: string) => void;
  recoveryPassword: (email: string) => void;
  getById:(id:string) =>void;
};

const initData = {
  id: "",
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

export const userStore = create<userState>((set, get) => ({
  user: initData,
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

      const { data } = await apiInstance.get("user/getAll");

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
    rut: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    email: string,
    phone: string,
    address: string,
    district: string,
    password: string
  ) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/user/create", {
        rut,
        name,
        paternalLastName,
        maternalLastName,
        email,
        phone,
        address,
        district,
        password,
      });

      set((state) => ({
        ...state,
        user: data.data,
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
    name: string,
    paternalLastName: string,
    maternalLastName: string,
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
      const { data } = await apiInstance.put("/user/update/"+id, {
        rut,
        name,
        paternalLastName,
        maternalLastName,
        email,
        phone,
        address,
        district,
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
  deleteById: async (id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.delete("/user/deleteById/"+id);

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

  assignPassword: async (id: string, password: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.put("/user/assignPassword", {
        id,
        password,
      });

      set((state) => ({
        ...state,
        user: data,
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

  validate: async (email: string, password: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.post("/user/validate", {
        email,
        password,
      });

      data.sucess
        ? set((state) => ({
            ...state,
            user: data.data,
            isLoading: false,
            isError: false,
            error: "",
          }))
        : set((state) => ({
            ...state,
            user: initData,
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

  recoveryPassword: async (email: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/user/recoveryPassword", {
        email,
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
  getById : async (id:string)=>{
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.get("/user/getById/"+id);
      const dataUser ={
        id: data.data.id,
        person_id: data.data.person_id,
        rut: data.data.rut,
        name: data.data.name,
        paternalLastName:data.data.paternallastname,
        maternalLastName: data.data.maternallastname,
        email: data.data.email,
        phone: data.data.phone,
        address: data.data.address,
        district: data.data.district,
      }
      set((state) => ({
        ...state,
        user:dataUser,
        isLoading: false,
        isError: false,
        error: "",
      }));
      return data.data;
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  }
}));
