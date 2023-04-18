import {userStore} from "../zustand";

const useUser = () => {
  const {
    user,
    list: userList,
    isLoading: isLoadingUser,
    isError:isErrorUser,
    error:errorUser,
  } = userStore((state) => ({
    user: state.user,
    list: state.list,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    getById:getUserById,
    getAll: getAllUser,
    create: createUser,
    update: updateUser,
    deleteById: deleteByIdUser,
    assignPassword,
    validate: validateUser,
    recoveryPassword,
  } = userStore();

  return {
    user,
    userList,
    isLoadingUser,
    isErrorUser,
    errorUser,
    getUserById,
    getAllUser,
    createUser,
    updateUser,
    deleteByIdUser,
    assignPassword,
    validateUser,
    recoveryPassword,
  };
};

export default useUser;