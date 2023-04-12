import React, { useState, useEffect } from "react";
import { useUser } from "@/store/hooks";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Overlay,
} from "@/components/ui/Modal";
import ButtonIcon from "../ButtonIcon";
import InputText from "../InputText";
import Button from "../Button";

import styles from "./UserCrud.module.scss";

const UserCrud = () => {
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

  const { userList, deleteByIdUser, getAllUser, updateUser, createUser } =
    useUser();
  const [activeModel, setActiveModel] = useState(false);
  const [create, setCreate] = useState(false);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    getAllUser();
  }, [activeModel]);

  const handleOnclickUser = (data: any) => {
    setActiveModel(true);
    setCreate(false);
    setForm({
      ...form,
      person_id: data.person_id,
      rut: data.rut,
      name: data.name,
      paternalLastName: data.paternallastname,
      maternalLastName: data.maternallastname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      district: data.district,
    });
  };

  const handleOnchange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
    setActiveModel(false);
    alert("update");
  };

  const handleOnclickDelete = () => {
    deleteByIdUser(form.person_id);
    setActiveModel(false);
    alert("delete");
  };

  const handleOnclickAdd = () => {
    setActiveModel(true);
    setCreate(true);
    setForm(initialForm);
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
    setActiveModel(false);
  };

  const dataUser = userList.map((data: any, idx: number) => (
    <tr
      key={idx}
      style={{
        background: idx % 2 === 0 ? "#d9d9d933" : "#d9d9d966",
      }}
      onClick={() => handleOnclickUser(data)}
    >
      <td>{data.email}</td>
      <td>
        {data.name + ` ` + data.paternallastname + ` ` + data.maternallastname}
      </td>
    </tr>
  ));
  return (
    <>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Correo electrónico</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>{dataUser}</tbody>
        </table>
        <ButtonIcon onClick={handleOnclickAdd} typeButton="circle" icon="add" />
      </div>
      <Overlay active={activeModel}>
        <Modal>
          <ModalTitle title={create ? "Crear usuario" : "Modificar / Eliminar"}>
            <ButtonIcon
              onClick={() => {
                setActiveModel(false);
              }}
              typeButton="circle"
              icon="close"
            />
          </ModalTitle>
          <ModalBody>
            <InputText
              onChange={handleOnchange}
              name="rut"
              type="text"
              value={form.rut}
              label="Rut"
              width="300px"
            />
            <InputText
              onChange={handleOnchange}
              name="name"
              type="text"
              value={form.name}
              label="Name"
              width="300px"
            />
            <InputText
              onChange={handleOnchange}
              name="paternalLastName"
              type="text"
              value={form.paternalLastName}
              label="Apellido paterno"
              width="300px"
            />
            <InputText
              onChange={handleOnchange}
              name="maternalLastName"
              type="text"
              value={form.maternalLastName}
              label="Apellido materno"
              width="300px"
            />
            <InputText
              onChange={handleOnchange}
              name="email"
              type="text"
              value={form.email}
              label="Correo electrónico"
              width="300px"
            />
            <InputText
              onChange={handleOnchange}
              name="phone"
              type="text"
              value={form.phone}
              label="Telefono"
              width="300px"
            />
            <InputText
              onChange={handleOnchange}
              name="address"
              type="text"
              value={form.address}
              label="Dirección"
              width="300px"
            />
            <InputText
              onChange={handleOnchange}
              name="district"
              type="text"
              value={form.district}
              label="Comuna"
              width="300px"
            />
            {create ? (
              <InputText
                onChange={handleOnchange}
                name="password"
                type="text"
                value={form.password}
                label="Contraseña"
                width="300px"
              />
            ) : (
              <></>
            )}
          </ModalBody>
          <ModalFooter>
            {create ? (
              <Button
                onClick={handleOnclickCreate}
                background="#168651"
                valor="Crear usuario"
                width="130px"
                height="40px"
              />
            ) : (
              <>
                <Button
                  onClick={handleOnclickUpdate}
                  background="#f2ad4e"
                  valor="Guardar cambios"
                  width="130px"
                  height="40px"
                />
                <Button
                  onClick={handleOnclickDelete}
                  background="#dd5450"
                  valor="Eliminar usuario"
                  width="130px"
                  height="40px"
                />
              </>
            )}
          </ModalFooter>
        </Modal>
      </Overlay>
    </>
  );
};

export default UserCrud;
