import pool from "../util/database";

import {
  _create,
  _deleteById,
  _getAll,
  _getByEmail,
  _update,
} from "../queries/person";


const getByEmail: any = async (email: string) => {
  try {
    const result = await pool.query(_getByEmail, [email]);
    return { sucess: true, data: result.rows[0], error: false };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

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
  name: string,
  paternallastname: string,
  maternallastname: string,
  email: string,
  phone: string,
  address: string,
  district: string
) => {
  try {
    const result = await pool.query(_create, [
      rut,
      name,
      paternallastname,
      maternallastname,
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
  name: string,
  paternallastname: string,
  maternallastname: string,
  email: string,
  phone: string,
  address: string,
  district: string
) => {
  try {
    const result = await pool.query(_update, [
      id,
      rut,
      name,
      paternallastname,
      maternallastname,
      email,
      phone,
      address,
      district,
    ]);

    return { sucess: true, data: result.rows[0], error: false };
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

export { getAll, create, update, deleteById, getByEmail };
