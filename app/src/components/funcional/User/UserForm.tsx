import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import UIContext from "@/context/ui";
import { useUser } from "@/store/hooks";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Overlay,
} from "@/components/ui/Modal";
import { Body, Option, Title } from "@/components/layout/Option";
import { Column, Row } from "@/components/layout/Generic/Generic";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Text from "@/components/ui/Text";
import ButtonIcon from "@/components/ui/ButtonIcon";

const UserForm = () => {
  const initialForm = {
    person_id: "",
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState(false);
  const { user, createUser, updateUser, deleteByIdUser, isLoadingUser } =
    useUser();
  const { crud } = useContext(UIContext);
  const router = useRouter();

  useEffect(() => {
    if (!crud) {
      setForm(initialForm);
    }
  }, [crud]);

  useEffect(() => {
    if (router.query.id !== "" && router.query.id !== "new") {
      setForm({
        person_id: user.person_id,
        rut: user.rut,
        name: user.name,
        paternalLastName: user.paternalLastName,
        maternalLastName: user.maternalLastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        district: user.district,
        password: "",
      });
    }
  }, [user]);

  const handleOnChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclickCreate = () => {
    createUser(
      form.rut,
      form.name,
      form.paternalLastName,
      form.maternalLastName,
      form.email,
      form.phone,
      form.address,
      form.district,
      form.password
    );
    router.push("/maintainers/user");
  };

  const handleOnclickUpdate = () => {
    updateUser(
      form.person_id,
      form.rut,
      form.name,
      form.paternalLastName,
      form.maternalLastName,
      form.email,
      form.phone,
      form.address,
      form.district
    );
    router.push("/maintainers/user");
  };

  const handleOnclickDelete = () => {
    deleteByIdUser(form.person_id);
    router.push("/maintainers/user");
  };

  return (
    <Option>
      <Title title="Formulario" />
      <Body>
        {isLoadingUser ? (
          <Loader width="80px" height="80px" />
        ) : (
          <Column gap="10px">
            <Column gap="5px">
              <InputText
                onChange={handleOnChange}
                name="rut"
                type="text"
                value={form.rut}
                label="Rut"
                width="300px"
              />
              <InputText
                onChange={handleOnChange}
                name="name"
                type="text"
                value={form.name}
                label="Name"
                width="300px"
              />
              <InputText
                onChange={handleOnChange}
                name="paternalLastName"
                type="text"
                value={form.paternalLastName}
                label="Apellido paterno"
                width="300px"
              />
              <InputText
                onChange={handleOnChange}
                name="maternalLastName"
                type="text"
                value={form.maternalLastName}
                label="Apellido materno"
                width="300px"
              />
              <InputText
                onChange={handleOnChange}
                name="email"
                type="text"
                value={form.email}
                label="Correo electrónico"
                width="300px"
              />
              <InputText
                onChange={handleOnChange}
                name="phone"
                type="text"
                value={form.phone}
                label="Telefono"
                width="300px"
              />
              <InputText
                onChange={handleOnChange}
                name="address"
                type="text"
                value={form.address}
                label="Dirección"
                width="300px"
              />
              <InputText
                onChange={handleOnChange}
                name="district"
                type="text"
                value={form.district}
                label="Comuna"
                width="300px"
              />
              {crud ? (
                <></>
              ) : (
                <InputText
                  onChange={handleOnChange}
                  name="password"
                  type="text"
                  value={form.password}
                  label="Contraseña"
                  width="300px"
                />
              )}
            </Column>
            {!crud ? (
              <Button
                valor="Guardar"
                width="200px"
                height="40px"
                background="#15495D"
                onClick={handleOnclickCreate}
              />
            ) : (
              <Row gap="5px">
                <Button
                  background="#15495D"
                  valor="Guardar"
                  width="120px"
                  height="40px"
                  onClick={handleOnclickUpdate}
                />
                <Button
                  background="#FF5656"
                  valor="Eliminar"
                  width="120px"
                  height="40px"
                  onClick={() => setModal(true)}
                />
              </Row>
            )}
          </Column>
        )}

        <Overlay active={modal}>
          <Modal>
            <ModalTitle title="¿Está seguro?">
              <ButtonIcon
                icon="close"
                onClick={() => setModal(false)}
                typeButton="circle"
              />
            </ModalTitle>
            <ModalBody>
              <Text
                color="#666666"
                text="¿Realmente desea eliminar el registro? Este proceso no se puede deshacer."
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => setModal(false)}
                background="#15495D"
                valor="Cancelar"
                width="120px"
                height="40px"
              />
              <Button
                onClick={handleOnclickDelete}
                background="#FF5656"
                valor="Eliminar"
                width="120px"
                height="40px"
              />
            </ModalFooter>
          </Modal>
        </Overlay>
      </Body>
    </Option>
  );
};

export { UserForm };
