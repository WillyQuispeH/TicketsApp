import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Overlay,
} from "@/components/ui/Modal";
import ButtonIcon from "../ButtonIcon";
import { useCustomer } from "@/store/hooks";
import styles from "./CustomerCrud.module.scss";
import InputText from "../InputText";
import Button from "../Button";

const CustomerCrud = () => {
  const initialForm = {
    person_id: "",
    rut: "",
    companyName: "",
    legalRepresentative: "",
    line: "",
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
  const [activeModel, setActiveModel] = useState(false);
  const [create, setCreate] = useState(false);
  const [type, setType] = useState(true);
  const { customerList } = useCustomer();

  const handleOnclickCustomer = (data: any) => {
    data.type == "c" ? setType(true) : setType(false);

    setForm({
      ...form,
      rut: data.rut,
      companyName: data.companyName,
      legalRepresentative: data.legalRepresentative,
      line: data.line,
      name: data.name,
      paternalLastName: data.paternalLastName,
      maternalLastName: data.maternalLastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      district: data.district,
    });
    setActiveModel(true);
    setCreate(false);
  };
  const handleOnchange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnclickAdd = () => {
    setActiveModel(true);
    setCreate(true);
    setForm(initialForm);
  };
  const handleOnclickCreate = () => {};
  const handleOnclickUpdate = () => {};
  const handleOnclickDelete = () => {};

  const data: any = [];
  Object.values(customerList).map((row: any, idx: number) =>
    row.map((row: any, idx: number) =>
      data.push({
        type: row.type,
        rut: row.rut,
        companyName: row.companyname,
        legalRepresentative: row.legalrepresentative,
        line: row.line,
        name: row.name,
        paternalLastName: row.paternallastname,
        maternalLastName: row.maternallastname,
        email: row.email,
        phone: row.phone,
        address: row.address,
        district: row.district,
      })
    )
  );
  const dataCustomer = data.map((data: any, idx: number) => (
    <tr
      key={idx}
      style={{
        background: idx % 2 === 0 ? "#d9d9d933" : "#d9d9d966",
      }}
      onClick={() => handleOnclickCustomer(data)}
    >
      <td>{data.rut}</td>
      <td>{data.name || data.companyName}</td>
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
          <tbody>{dataCustomer}</tbody>
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
            />{" "}
            {type ? (
              <>
                <InputText
                  onChange={handleOnchange}
                  name="companyName"
                  type="text"
                  value={form.companyName}
                  label="Nombre de empresa"
                  width="300px"
                />
                <InputText
                  onChange={handleOnchange}
                  name="legalRepresentative"
                  type="text"
                  value={form.legalRepresentative}
                  label="Representante legal"
                  width="300px"
                />
                <InputText
                  onChange={handleOnchange}
                  name="line"
                  type="text"
                  value={form.line}
                  label="Giro"
                  width="300px"
                />
              </>
            ) : (
              <>
                <InputText
                  onChange={handleOnchange}
                  name="name"
                  type="text"
                  value={form.name}
                  label="Nombre"
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
              </>
            )}
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

export default CustomerCrud;
