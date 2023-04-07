import { customerStore } from "../zustand";

const useCustomer = () => {
  const {
    customerCompany,
    customerPersona,
    list: listCustomer,
    isLoading: isLoadingCustomer,
    isError: isErrorCustomer,
    error: errorCustomer,
  } = customerStore((state) => ({
    customerCompany: state.customerCompany,
    customerPersona: state.customerPerson,
    list: state.list,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    getAll: getAllCustomer,
    create: createCustomer,
    update: updateCustomer,
    deleteById: deleteByIdCustomer,
  } = customerStore();

  return {
    customerCompany,
    customerPersona,
    listCustomer,
    isLoadingCustomer,
    isErrorCustomer,
    errorCustomer,
    getAllCustomer,
    createCustomer,
    updateCustomer,
    deleteByIdCustomer,
  };
};
export default useCustomer;
