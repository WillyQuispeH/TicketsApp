import { customerStore } from "../zustand";

const useCustomer = () => {
  const {
    customerCompany,
    customerPerson,
    list: customerList,
    isLoading: isLoadingCustomer,
    isError: isErrorCustomer,
    error: errorCustomer,
  } = customerStore((state) => ({
    customerCompany: state.customerCompany,
    customerPerson: state.customerPerson,
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
    getById:getCustomerById
  } = customerStore();

  return {
    customerCompany,
    customerPerson,
    customerList,
    isLoadingCustomer,
    isErrorCustomer,
    errorCustomer,
    getAllCustomer,
    createCustomer,
    updateCustomer,
    deleteByIdCustomer,
    getCustomerById,
  };
};
export default useCustomer;
