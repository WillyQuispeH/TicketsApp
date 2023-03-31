import createLogger from "../util/logger";

import * as CompanyModel from "../models/Company";

const getAll = async (req: any, res: any) => {
  const resultModel = await CompanyModel.getAll();
  if (!resultModel.sucess) {
    createLogger.error({
      model: "company/getAll",
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
    companyName,
    legalRepresentative,
    line,
    email,
    phone,
    address,
    district,
  } = req.body;
  const resultModel = await CompanyModel.create(
    rut,
    companyName,
    legalRepresentative,
    line,
    email,
    phone,
    address,
    district
  );
  if (!resultModel.sucess) {
    createLogger.error({
      model: "company/create",
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
    companyName,
    legalRepresentative,
    line,
    email,
    phone,
    address,
    district,
  } = req.body;
  const resultModel = await CompanyModel.update(
    id,
    rut,
    companyName,
    legalRepresentative,
    line,
    email,
    phone,
    address,
    district
  );
  if (!resultModel.sucess) {
    createLogger.error({
      model: "company/update",
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
  const resultModel = await CompanyModel.deleteById(id);
  if (!resultModel.sucess) {
    createLogger.error({
      model: "company/deleteById",
      error: resultModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultModel.error });
    return;
  }
  res.status(200).json({ sucess: true, data: resultModel.data, error: false });
};

export { getAll, create, update, deleteById };
