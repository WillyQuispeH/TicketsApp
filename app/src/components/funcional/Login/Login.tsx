import { Column } from "@/components/layout/Generic/Generic";
import Screen from "@/components/layout/Screen";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/store/hooks";

const Login = () => {
  const inicialForm = {
    email: "",
    password: "",
  };

  const { validateUser, isLoadingUser } = useUser();
  const router = useRouter();
  const [form, setForm] = useState(inicialForm);

  const handleOnChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclickLogin = () => {
    validateUser(form.email, form.password);
    router.query.id ? router.push(router.asPath) : router.push("/welcome");
  };

  return (
    <Screen>
      <Column gap="20px">
        <Column gap="5px">
          <InputText
            value={form.email}
            name="email"
            type="text"
            label="Correo electrónico"
            width="260px"
            onChange={handleOnChange}
          />
          <InputText
            value={form.password}
            name="password"
            type="password"
            label="Contraseña"
            width="260px"
            onChange={handleOnChange}
          />
        </Column>
        <Button
          onClick={handleOnclickLogin}
          background="#0000ff"
          valor="Ingresar"
          width="200px"
          height="40px"
          isLoading={isLoadingUser}
        />
      </Column>
    </Screen>
  );
};

export default Login;
