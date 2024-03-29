import createLogger from "../util/logger";

import * as CustomerModel from "../models/Customer";
import * as PersonModel from "../models/Person";
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

  if (resultModel.data.type == "c") {
    const resultCustomerModel = await CustomerModel.getCompanyById(
      resultModel.data.company_id
    );

    if (!resultCustomerModel.sucess) {
      createLogger.error({
        model: "customer/getCompanyById",
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

  if (resultModel.data.type == "p") {
    const resultCustomerModel = await CustomerModel.getPersonById(
      resultModel.data.person_id
    );

    if (!resultCustomerModel.sucess) {
      createLogger.error({
        model: "customer/getPersonById",
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
};

const getAll = async (req: any, res: any) => {
  const resultPersonModel = await PersonModel.getAll();
  if (!resultPersonModel.sucess) {
    createLogger.error({
      model: "person/getAll",
      error: resultPersonModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultPersonModel.error });
    return;
  }

  const resultCompanyModel = await CompanyModel.getAll();
  if (!resultCompanyModel.sucess) {
    createLogger.error({
      model: "company/getAll",
      error: resultCompanyModel.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultPersonModel.error });
    return;
  }

  const data = {
    person: resultPersonModel.data,
    company: resultCompanyModel.data,
  };

  res.status(200).json({ sucess: true, data: data, error: false });
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

    const data = {
      id: resultCustomerModel.data.id,
      type: resultCustomerModel.data.type,
      company_id: resultCustomerModel.data.company_id,
      rut: resultCompanyModel.data.rut,
      companyName: resultCompanyModel.data.companyname,
      legalRepresentative: resultCompanyModel.data.legalrepresentative,
      line: resultCompanyModel.data.line,
      email: resultCompanyModel.data.email,
      phone: resultCompanyModel.data.phone,
      address: resultCompanyModel.data.address,
      district: resultCompanyModel.data.district,
    };

    res.status(200).json({ sucess: true, data: data, error: false });
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
    }

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
    }

    const data = {
      id: resultCustomerModel.data.id,
      type: resultCustomerModel.data.type,
      person_id: resultCustomerModel.data.person_id,
      rut: resultPersonModel.data.rut,
      name: resultPersonModel.data.name,
      paternalLastName: resultPersonModel.paternallastname,
      maternalLastName: resultPersonModel.maternallastname,
      email: resultPersonModel.data.email,
      phone: resultPersonModel.data.phone,
      address: resultPersonModel.data.address,
      district: resultPersonModel.data.district,
    };

    res.status(200).json({ sucess: true, data: data, error: false });
    return;
  }

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
  }

  if (!resultCustomerModel.data) {
    res.status(200).json({ sucess: false, data: null, error: true });
    return;
  }

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
    }

    const data = {
      id: resultCustomerModel.data.id,
      type: resultCustomerModel.data.type,
      company_id: resultCustomerModel.data.company_id,
      rut: resultCompanyModel.data.rut,
      companyName: resultCompanyModel.data.companyname,
      legalRepresentative: resultCompanyModel.data.legalrepresentative,
      line: resultCompanyModel.data.line,
      email: resultCompanyModel.data.email,
      phone: resultCompanyModel.data.phone,
      address: resultCompanyModel.data.address,
      district: resultCompanyModel.data.district,
    };

    res.status(200).json({ sucess: true, data: data, error: false });
    return;
  }

  if (resultCustomerModel.data.type == "p") {
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

    const data = {
      id: resultCustomerModel.data.id,
      type: resultCustomerModel.data.type,
      person_id: resultCustomerModel.data.person_id,
      rut: resultPersonModel.data.rut,
      name: resultPersonModel.data.name,
      paternalLastName: resultPersonModel.paternallastname,
      maternalLastName: resultPersonModel.maternallastname,
      email: resultPersonModel.data.email,
      phone: resultPersonModel.data.phone,
      address: resultPersonModel.data.address,
      district: resultPersonModel.data.district,
    };

    res.status(200).json({ sucess: true, data: data, error: false });
    return;
  }
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const resultCustomer = await CustomerModel.deleteById(id);
  if (!resultCustomer.sucess) {
    createLogger.error({
      model: "customer/getById",
      error: resultCustomer.error,
    });
    res
      .status(500)
      .json({ sucess: false, data: null, error: resultCustomer.error });
    return;
  }
  res
    .status(200)
    .json({ sucess: true, data: resultCustomer.data, error: false });
  return;
};

export { getAll, create, getById, update, deleteById };
