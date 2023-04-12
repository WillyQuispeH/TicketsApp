import createLogger from "../util/logger";

import { generatePassword } from "../util/password";
import { emailSender } from "../util/email";

import * as UserModel from "../models/User";
import * as PersonModel from "../models/Person";

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const resultPersonModel = await PersonModel.getById(id);
  if (!resultPersonModel.sucess) {
    createLogger.error({
      model: "user/getAll",
      error: resultPersonModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultPersonModel.error });
    return;
  }

  res
    .status(200)
    .json({ sucess: true, data: resultPersonModel.data, error: false });
};

const getAll = async (req: any, res: any) => {
  const resultUserModel = await UserModel.getAll();

  if (!resultUserModel.sucess) {
    createLogger.error({
      model: "user/getAll",
      error: resultUserModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultUserModel.error });
    return;
  }

  res
    .status(200)
    .json({ sucess: true, data: resultUserModel.data, error: false });
};

const create = async (req: any, res: any) => {
  const {
    rut,
    name,
    paternalLastName,
    maternalLastName,
    email,
    phone,
    address,
    district,
    password,
  } = req.body;
  const resultPersonModel = await PersonModel.create(
    rut,
    name,
    paternalLastName,
    maternalLastName,
    email,
    phone,
    address,
    district
  );
  if (!resultPersonModel.sucess) {
    createLogger.error({
      model: "person/create",
      error: resultPersonModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultPersonModel.error });
    return;
  }

  const resultUserModel = await UserModel.create(
    resultPersonModel.data.id,
    password
  );

  if (!resultUserModel.sucess) {
    createLogger.error({
      model: "user/create",
      error: resultPersonModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultUserModel.error });
    return;
  }

  const data = {
    id: resultUserModel.data.id,
    person_id: resultUserModel.data.person_id,
    rut: resultPersonModel.data.rut,
    name: resultPersonModel.data.name,
    paternalLastName: resultPersonModel.data.paternallastname,
    maternalLastName: resultPersonModel.data.maternallastname,
    email: resultPersonModel.data.email,
    phone: resultPersonModel.data.phone,
    address: resultPersonModel.data.address,
    district: resultPersonModel.data.districts,
  };

  res.status(200).json({ sucess: true, data: data, error: false });
};

const update = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    rut,
    name,
    paternalLastName,
    maternalLastName,
    email,
    phone,
    address,
    district,
  } = req.body;
  const resultPersonModel = await PersonModel.update(
    id,
    rut,
    name,
    paternalLastName,
    maternalLastName,
    email,
    phone,
    address,
    district
  );

  if (!resultPersonModel.sucess) {
    createLogger.error({
      model: "person/update",
      error: resultPersonModel.error,
    });

    res
      .status(500)
      .json({ sucess: false, data: null, error: resultPersonModel.error });
    return;
  }
  const resultUserModel = await UserModel.getById(resultPersonModel.data.id);

  const data = {
    id: resultUserModel.data.id,
    person_id: resultUserModel.data.person_id,
    rut: resultPersonModel.data.rut,
    name: resultPersonModel.data.name,
    paternalLastName: resultPersonModel.data.paternallastname,
    maternalLastName: resultPersonModel.data.maternallastname,
    email: resultPersonModel.data.email,
    phone: resultPersonModel.data.phone,
    address: resultPersonModel.data.address,
    district: resultPersonModel.data.districts,
  };

  res.status(200).json({ sucess: true, data: data, error: false });
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const resultPersonModel = await PersonModel.deleteById(id);

  if (!resultPersonModel.sucess) {
    createLogger.error({
      model: "person/deleteById",
      error: resultPersonModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultPersonModel.error });
    return;
  }

  const resultUserModel = await UserModel.deleteById(id);
  if (!resultUserModel.sucess) {
    createLogger.error({
      model: "user/deleteById",
      error: resultUserModel.error,
    });

    res
      .status(500)
      .json({ sucess: false, data: null, error: resultUserModel.error });
    return;
  }

  res
    .status(200)
    .json({ sucess: true, data: resultUserModel.data, error: false });
};

const validate = async (req: any, res: any) => {
  const { email, password } = req.body;
  const resultPersonModel = await PersonModel.getByEmail(email);

  if (!resultPersonModel.sucess) {
    createLogger.error({
      model: "person/getByEmail",
      error: resultPersonModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultPersonModel.error });
    return;
  }

  if (!resultPersonModel.data) {
    res.status(200).json({ sucess: false, data: null, error: false });
    return;
  }

  const isValid = await UserModel.validate(resultPersonModel.data.id, password);
  if (!isValid.sucess) {
    createLogger.error({
      model: "user/validate",
      error: isValid.error,
    });

    res.status(500).json({ sucess: false, data: null, error: isValid.error });
    return;
  }

  if (isValid.isValid) {
    const resultUserModel = await UserModel.getById(resultPersonModel.data.id);

    const data = {
      id: resultUserModel.data.id,
      person_id: resultUserModel.data.person_id,
      rut: resultPersonModel.data.rut,
      name: resultPersonModel.data.name,
      paternalLastName: resultPersonModel.data.paternallastname,
      maternalLastName: resultPersonModel.data.maternallastname,
      email: resultPersonModel.data.email,
      phone: resultPersonModel.data.phone,
      address: resultPersonModel.data.address,
      district: resultPersonModel.data.districts,
    };

    res.status(200).json({ sucess: true, data: data, error: false });
    return;
  }

  res.status(200).json({ sucess: false, data: null, error: false });
};

const assignPassword = async (req: any, res: any) => {
  const { id } = req.params;
  const { password } = req.body;

  const result = await UserModel.assignPassword(id, password);
  if (!result.sucess) {
    createLogger.error({
      model: "user/assingPassword",
      error: result.error,
    });

    res.status(500).json({ sucess: false, data: null, error: result.error });
    return;
  }
  res.status(200).json({ sucess: true, data: result, error: false });
};

const recoveryPassword = async (req: any, res: any) => {
  const { email } = req.body;
  const resultPersonModel = await PersonModel.getByEmail(email);
  if (!resultPersonModel.sucess) {
    createLogger.error({
      model: "user/getByEmail",
      error: resultPersonModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultPersonModel.error });
    return;
  }

  if (!resultPersonModel.data) {
    res.status(200).json({ sucess: true, data: null, error: false });
    return;
  }

  const newPassword = generatePassword();

  const resulAssingPassword = await UserModel.assignPassword(
    resultPersonModel.data.id,
    newPassword
  );
  if (!resulAssingPassword.sucess) {
    createLogger.error({
      model: "user/assignPassword",
      error: resulAssingPassword.error,
    });

    res
      .status(500)
      .json({ sucess: false, data: null, error: resulAssingPassword.error });
    return;
  }
  const emailSent = await emailSender(resultPersonModel.data, newPassword);
  if (!emailSent.sucess) {
    createLogger.error({
      model: "emailSender",
      error: emailSent.error,
    });

    res.status(500).json({ sucess: false, data: null, error: emailSent.error });
    return;
  }

  const resultUserModel = await UserModel.getById(resultPersonModel.data.id);
  const data = {
    id: resultUserModel.data.id,
    person_id: resultUserModel.data.person_id,
    rut: resultPersonModel.data.rut,
    name: resultPersonModel.data.name,
    paternalLastName: resultPersonModel.data.paternallastname,
    maternalLastName: resultPersonModel.data.maternallastname,
    email: resultPersonModel.data.email,
    phone: resultPersonModel.data.phone,
    address: resultPersonModel.data.address,
    district: resultPersonModel.data.districts,
  };

  emailSent.sucess
    ? res.status(200).json({ sucess: true, data: data, error: false })
    : res.status(200).json({ sucess: false, data: null, error: true });
};

export {
  getAll,
  create,
  validate,
  recoveryPassword,
  update,
  deleteById,
  assignPassword,
  getById,
};
