import createLogger from "../util/logger";

import { generatePassword } from "../util/password";
import { emailSender } from "../util/email";

import * as UserModel from "../models/User";
import * as PersonModel from "../models/Person";
import * as CompanyModel from "../models/Company"

const getAll = async (req: any, res: any) => {
  const resultModel = await UserModel.getAll();
  if (!resultModel.sucess) {
    createLogger.error({
      model: "user/getAll",
      error: resultModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultModel.error });
    return;
  }

  res.status(200).json({ sucess: true, data: resultModel.data, error: false });
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

  res
    .status(200)
    .json({ sucess: true, data: resultPersonModel.data.id, error: false });
};

const validate = async (req: any, res: any) => {
  const { email, password } = req.body;

  const resultPerson = await PersonModel.getByEmail(email);

  if (!resultPerson.sucess) {
    createLogger.error({
      model: "person/getByEmail",
      error: resultPerson.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultPerson.error });
    return;
  }


  if (!resultPerson.data) {
    res.status(200).json({ sucess: true, data: null, error: false });
    return;
  }

  const isValid = await UserModel.validate(resultPerson.data.id, password);
  if (!isValid.sucess) {
    createLogger.error({
      model: "user/validate",
      error: resultPerson.error,
    });

    res.status(500).json({ sucess: false, data: null, error: isValid.error });
    return;
  }

  res.status(200).json({ sucess: true, data: isValid.isValid, error: false });
};

const recoveryPassword = async (req: any, res: any) => {
  const { email } = req.body;
  const resultPerson = await PersonModel.getByEmail(email);
  if (!resultPerson.sucess) {
    createLogger.error({
      model: "user/getByEmail",
      error: resultPerson.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultPerson.error });
    return;
  }

  if (!resultPerson.data) {
    res.status(200).json({ sucess: true, data: null, error: false });
    return;
  }

  const newPassword = generatePassword();

  const resulAssingPassword = await UserModel.assignPassword(
    resultPerson.data.id,
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

  const emailSent = emailSender(resultPerson.data, newPassword);

  res.status(200).json({ sucess: true, data: emailSent, error: false });
};

export { getAll, create, validate, recoveryPassword };
