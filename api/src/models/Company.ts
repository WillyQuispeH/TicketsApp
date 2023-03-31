import pool from "../util/database";

import { _create, _deleteById, _getAll, _update } from "../queries/company";

const getAll: any = async () => {
  try {
    const result = await pool.query(_getAll);
    return { sucess: true, data: result.rows, error: null };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

const create: any = async (
  rut: string,
  companyname: string,
  legalrepresentative: string,
  line: string,
  email: string,
  phone: string,
  address: string,
  district: string
) => {
  try {
    const result = await pool.query(_create, [
      rut,
      companyname,
      legalrepresentative,
      line,
      email,
      phone,
      address,
      district,
    ]);
    return { sucess: true, data: result.rows[0], error: null };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

const update: any = async (
  id: string,
  rut: string,
  companyname: string,
  legalrepresentative: string,
  line: string,
  email: string,
  phone: string,
  address: string,
  district: string
) => {
  try {
    const result = await pool.query(_update, [
      id,
      rut,
      companyname,
      legalrepresentative,
      line,
      email,
      phone,
      address,
      district,
    ]);
    return { sucess: true, data: result.rows[0], error: null };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

const deleteById: any = async (id: string) => {
  try {
    const result = await pool.query(_deleteById, [id]);

    return { sucess: true, data: result.rowCount, error: false };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

export { getAll, create, update, deleteById };
