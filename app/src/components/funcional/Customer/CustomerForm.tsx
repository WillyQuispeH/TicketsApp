import React, { useContext, useEffect, useState } from "react";

import { useCustomer } from "@/store/hooks";
import UIContext from "@/context/ui";

import { Column, Row } from "@/components/layout/Generic/Generic";
import { Option, Body, Title } from "@/components/layout/Option";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Overlay,
} from "@/components/ui/Modal";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { useRouter } from "next/router";
import Loader from "@/components/ui/Loader";

const CustomerForm = () => {
  const initialForm = {
    type: "",
    rut: "",
    person_id: "",
    company_id: "",
    companyName: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    legalRepresentative: "",
    line: "",
    email: "",
    phone: "",
    address: "",
    district: "",
  };

  const router = useRouter();
  const { crud } = useContext(UIContext);
  const {
    isLoadingCustomer,
    customerCompany,
    customerPerson,
    createCustomer,
    deleteByIdCustomer,
    updateCustomer,
    getCustomerById,
  } = useCustomer();

  const [type, setType] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (router.query.id !== "" && router.query.id !== "new") {
      setForm({
        type: customerCompany.type || customerPerson.type,
        rut: customerCompany.rut || customerPerson.rut,
        person_id: customerPerson.person_id,
        company_id: customerCompany.company_id,
        name: customerPerson.name,
        companyName: customerCompany.companyName,
        legalRepresentative: customerCompany.legalRepresentative,
        line: customerCompany.line,
        paternalLastName: customerPerson.paternalLastName,
        maternalLastName: customerPerson.maternalLastName,
        email: customerCompany.email || customerPerson.email,
        phone: customerCompany.phone || customerPerson.phone,
        address: customerCompany.address || customerPerson.address,
        district: customerCompany.district || customerPerson.district,
      });
    }
    if (customerCompany.type !== "") {
      setType(true);
    }
    if (customerPerson.type !== "") {
      setType(false);
    }
  }, [customerCompany || customerPerson]);

  useEffect(() => {
    if (!crud) {
      setForm(initialForm);
    }
  }, [crud]);

  const handleOnChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnclickCreate = () => {
    createCustomer(
      type ? "c" : "p",
      form.rut,
      form.companyName,
      form.name,
      form.paternalLastName,
      form.maternalLastName,
      form.legalRepresentative,
      form.line,
      form.email,
      form.phone,
      form.address,
      form.district
    );
    router.push("/maintainers/customer");
  };

  const handleOnclickUpdate = () => {
    updateCustomer(
      type ? form.company_id : form.person_id,
      form.rut,
      form.companyName,
      form.name,
      form.paternalLastName,
      form.maternalLastName,
      form.legalRepresentative,
      form.line,
      form.email,
      form.phone,
      form.address,
      form.district
    );
    router.push("/maintainers/customer");
  };

  const handleOnclickDelete = () => {
    deleteByIdCustomer(form.company_id || form.person_id);
    router.push("/maintainers/customer");
  };

  return (
    <Option>
      <Title title="Formulario" />
      <Body>
        {isLoadingCustomer ? (
          <Loader width="80px" height="80px" />
        ) : (
          <Column gap="10px">
            {!crud ? (
              <Row gap="10px">
                <Button
                  valor="Compania"
                  onClick={() => {
                    setType(true);
                    setDisabled(true);
                  }}
                  width="120px"
                  height="40px"
                  disabled={disabled}
                />
                <Button
                  valor="Persona"
                  onClick={() => {
                    setType(false);
                    setDisabled(false);
                  }}
                  width="120px"
                  height="40px"
                  disabled={!disabled}
                />
              </Row>
            ) : (
              <></>
            )}
            <Column gap="5px">
              <InputText
                type="text"
                name="rut"
                label="Rut"
                value={form.rut}
                width="300px"
                onChange={handleOnChange}
              />
              {type ? (
                <>
                  <InputText
                    type="text"
                    name="companyName"
                    label="Nombre de compania"
                    value={form.companyName}
                    width="300px"
                    onChange={handleOnChange}
                  />
                  <InputText
                    type="text"
                    name="legalRepresentative"
                    label="Representante legal"
                    value={form.legalRepresentative}
                    width="300px"
                    onChange={handleOnChange}
                  />
                  <InputText
                    type="text"
                    name="line"
                    label="Giro"
                    value={form.line}
                    width="300px"
                    onChange={handleOnChange}
                  />
                </>
              ) : (
                <>
                  <InputText
                    type="text"
                    name="name"
                    label="Nombre"
                    value={form.name}
                    width="300px"
                    onChange={handleOnChange}
                  />
                  <InputText
                    type="text"
                    name="paternalLastName"
                    label="Apellido paterno"
                    value={form.paternalLastName}
                    width="300px"
                    onChange={handleOnChange}
                  />
                  <InputText
                    type="text"
                    name="maternalLastName"
                    label="Apellido materno"
                    value={form.maternalLastName}
                    width="300px"
                    onChange={handleOnChange}
                  />
                </>
              )}
              <InputText
                type="text"
                name="email"
                label="Email"
                value={form.email}
                width="300px"
                onChange={handleOnChange}
              />
              <InputText
                type="text"
                name="phone"
                label="Phone"
                value={form.phone}
                width="300px"
                onChange={handleOnChange}
              />
              <InputText
                type="text"
                name="address"
                label="Ciudad"
                value={form.address}
                width="300px"
                onChange={handleOnChange}
              />
              <InputText
                type="text"
                name="district"
                label="Comuna"
                value={form.district}
                width="300px"
                onChange={handleOnChange}
              />
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

export { CustomerForm };
