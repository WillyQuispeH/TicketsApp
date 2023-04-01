import createLogger from "../util/logger";

import * as CustomerModel from "../models/Customer";
import * as PersonModel from "../models/Person";
import * as UserModel from "../models/User";
import * as CompanyModel from "../models/Company";

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const resultModel = await CustomerModel.getById(id);
  if (!resultModel.sucess) {
    createLogger.error({
      model: "customer/getById",
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
  const resultModel = await CustomerModel.getAll();
  if (!resultModel.sucess) {
    createLogger.error({
      model: "customer/getAll",
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
  const { type } = req.params;
  const {
    rut,
    companyName,
    name,
    paternalLastName,
    maternalLastName,
    legalRepresentative,
    line,
    email,
    phone,
    address,
    district,
    password,
  } = req.body;

  if (type == "c") {
    const resultCompanyModel = await CompanyModel.create(
      rut,
      companyName,
      legalRepresentative,
      line,
      email,
      phone,
      address,
      district
    );
    if (!resultCompanyModel.sucess) {
      createLogger.error({
        model: "company/create",
        error: resultCompanyModel.error,
      });
      res
        .status(500)
        .json({ sucess: false, data: null, error: resultCompanyModel.error });
      return;
    }

    const resultUserModel = await UserModel.create(
      resultCompanyModel.data.id,
      password
    );
    if (!resultUserModel.sucess) {
      createLogger.error({
        model: "user/create",
        error: resultUserModel.error,
      });
      res
        .status(500)
        .json({ sucess: false, data: null, error: resultUserModel.error });
      return;
    }

    const resultCustomerModel = await CustomerModel.create(
      type,
      resultCompanyModel.data.id,
      null
    );

    if (!resultCustomerModel.sucess) {
      createLogger.error({
        model: "customer/create",
        error: resultCustomerModel.error,
      });
      res
        .status(500)
        .json({ sucess: false, data: null, error: resultCustomerModel.error });
      return;
    }

    res
      .status(200)
      .json({ sucess: true, data: resultCustomerModel.data, error: false });
    return;
  }

  if (type == "p") {
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
    };

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
    };

    const resultCustomerModel = await CustomerModel.create(
      type,
      null,
      resultPersonModel.data.id
    );

    if (!resultCustomerModel.sucess) {
      createLogger.error({
        model: "customer/create",
        error: resultCustomerModel.error,
      });
      res
        .status(500)
        .json({ sucess: false, data: null, error: resultCustomerModel.error });
      return;
    };

    res
      .status(200)
      .json({ sucess: true, data: resultCustomerModel.data, error: false });
    return;
  };

  res
    .status(200)
    .json({ sucess: false, data: null, error: "type/Valor incorrecto = c/p" });
  return;
};

const update = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    rut,
    companyName,
    name,
    paternalLastName,
    maternalLastName,
    legalRepresentative,
    line,
    email,
    phone,
    address,
    district,
  } = req.body;

  const resultCustomerModel = await CustomerModel.getById(id);
  if (!resultCustomerModel.sucess) {
    createLogger.error({
      model: "customer/getById",
      error: resultCustomerModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultCustomerModel.error });
    return;
  };

  if (!resultCustomerModel.data) {
    res.status(200).json({ sucess: false, data: null, error: true });
    return;
  };

  if (resultCustomerModel.data.type == "c") {
    const resultCompanyModel = await CompanyModel.update(
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

    if (!resultCompanyModel.sucess) {
      createLogger.error({
        model: "company/update",
        error: resultCompanyModel.error,
      });
      res
        .status(500)
        .json({ sucess: false, data: null, error: resultCompanyModel.error });
      return;
    };

    res
      .status(200)
      .json({ sucess: true, data: resultCompanyModel.data, error: false });
    return;
  };

  if (resultCustomerModel.data.type == "c") {
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
    };

    res
      .status(200)
      .json({ sucess: true, data: resultPersonModel.data, error: false });
    return;
  };
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const resultCustomerModel = await CustomerModel.getById(id);
  if (!resultCustomerModel.sucess) {
    createLogger.error({
      model: "customer/getById",
      error: resultCustomerModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultCustomerModel.error });
    return;
  };

  if (!resultCustomerModel.data) {
    res.status(200).json({ sucess: false, data: null, error: true });
    return;
  };

  if (resultCustomerModel.data.type == "p") {
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
    };

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
    };

    const resultCustomer = await CustomerModel.deleteById(id);
    if (!resultCustomer.sucess) {
      createLogger.error({
        model: "customer/deleteById",
        error: resultCustomer.error,
      });

      res
        .status(500)
        .json({ sucess: false, data: null, error: resultCustomer.error });
      return;
    };

    res
      .status(200)
      .json({ sucess: true, data: resultCustomer.data, error: false });
    return;
  };

  if (resultCustomerModel.data.type == "c") {
    const resultCompanyModel = await CompanyModel.deleteById(id);
    if (!resultCompanyModel.sucess) {
      createLogger.error({
        model: "company/deleteById",
        error: resultCompanyModel.error,
      });
      res
        .status(500)
        .json({ sucess: false, data: null, error: resultCompanyModel.error });
      return;
    };

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
    };

    const resultCustomer = await CustomerModel.deleteById(id);
    if (!resultCustomer.sucess) {
      createLogger.error({
        model: "customer/deleteById",
        error: resultCustomer.error,
      });

      res
        .status(500)
        .json({ sucess: false, data: null, error: resultCustomer.error });
      return;
    };
    
    res
      .status(200)
      .json({ sucess: true, data: resultCustomer.data, error: false });
    return;
  }
};

export { getAll, create, getById, update, deleteById };
