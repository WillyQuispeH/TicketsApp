import { useEffect } from "react";
import { useRouter } from "next/router";

import { useUser } from "@/store/hooks";

import { User, UserForm } from "@/components/funcional/User";

const user = () => {
  const router = useRouter();
  const { getUserById, getAllUser } = useUser();

  useEffect(() => {
    if (router.query?.id) {
      if (router.query.id !== "" && router.query.id !== "new") {
        getUserById(router.query.id?.toString());
      }
    }
      getAllUser();
    
  }, [router]);

  return router.isReady && router.query.id ? <UserForm /> : <User />;
};

export default user;
