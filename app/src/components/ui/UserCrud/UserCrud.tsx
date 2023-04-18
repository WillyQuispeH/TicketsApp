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
import { useRouter } from "next/router";

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

  const { userList, deleteByIdUser, getAllUser, updateUser, createUser, getUserById } =
    useUser();
  const [activeModel, setActiveModel] = useState(false);
  const [create, setCreate] = useState(false);
  const [form, setForm] = useState(initialForm);
  const router = useRouter();

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

  const handleOnclickUpdate = (data: any) => {
    /*updateUser(
      form.person_id,
      form.rut,
      form.name,
      form.paternalLastName,
      form.maternalLastName,
      form.email,
      form.phone,
      form.address,
      form.district
    );*/
    router.push("/maintainers/user/" + data.person_id);
  };
  
  const prueba = (data: any) => {};

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
      <td style={{ width: "50px" }}>
        <ButtonIcon
          icon="delete"
          typeButton="circle"
          onClick={() => prueba(data)}
        />
      </td>
      <td>
        <ButtonIcon
          icon="edit"
          typeButton="circle"
          onClick={() => handleOnclickUpdate(data)}
        />
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
              <th style={{ width: "40px" }}></th>
              <th style={{ width: "40px" }}></th>
            </tr>
          </thead>
          <tbody>{dataUser}</tbody>
        </table>
        <ButtonIcon onClick={handleOnclickAdd} typeButton="circle" icon="add" />
      </div>
    </>
  );
};

export default UserCrud;
