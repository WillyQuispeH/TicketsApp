import { useEffect } from "react";
import { useRouter } from "next/router";

import { useCustomer, useUser } from "@/store/hooks";
import { Customer, CustomerForm } from "@/components/funcional/Customer";

const customer = () => {
  const router = useRouter();
  const { getAllCustomer, getCustomerById } = useCustomer();
  useEffect(() => {
    if (router.query?.id) {
      if (router.query.id !== "" && router.query.id !== "new") {
        getCustomerById(router.query.id?.toString());
      }
    }
    getAllCustomer();
  }, [router]);

  return router.isReady && router.query.id ? <CustomerForm /> : <Customer />;
};

export default customer;
