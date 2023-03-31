import createLogger from "../util/logger";

import * as PersonModel from "../models/Person";

const getByEmail = async (req: any, res: any) => {
  const { email } = req.params;
  const resultModel = await PersonModel.getByEmail(email);
  if (!resultModel.sucess) {
    createLogger.error({
      model: "person/getByEmail",
      error: resultModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultModel.error });
    return;
  }
  res.status(200).json({ sucess: true, data: resultModel.data, error: false });
};

const getAll = async (req: any, res: any) => {
  const resultModel = await PersonModel.getAll();
  if (!resultModel.sucess) {
    createLogger.error({
      model: "person/getAll",
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
  } = req.body;
  const resultModel = await PersonModel.create(
    rut,
    name,
    paternalLastName,
    maternalLastName,
    email,
    phone,
    address,
    district
  );
  if (!resultModel.sucess) {
    createLogger.error({
      model: "person/create",
      error: resultModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultModel.error });
    return;
  }

  res.status(200).json({ sucess: true, data: resultModel.data, error: false });
};

const update = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    rut,
    name,
    paternallastname,
    maternallastname,
    email,
    phone,
    address,
    district,
  } = req.body;
  const resultModel = await PersonModel.update(
    id,
    rut,
    name,
    paternallastname,
    maternallastname,
    email,
    phone,
    address,
    district
  );
  if (!resultModel.sucess) {
    createLogger.error({
      model: "person/update",
      error: resultModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultModel.error });
    return;
  }

  res.status(200).json({ sucess: true, data: resultModel.data, error: false });
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const resultModel = await PersonModel.deleteById(id);
  if (!resultModel.sucess) {
    createLogger.error({
      model: "person/deleteById",
      error: resultModel.error,
    });

    res
      .status(500)
      .json({ sucess: false, data: null, error: resultModel.error });
    return;
  }

  res.status(200).json({ sucess: true, data: resultModel.data, error: false });
};

export { getAll, create, update, deleteById, getByEmail };
