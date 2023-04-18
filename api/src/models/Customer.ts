import pool from "../util/database";

import {
  _create,
  _deleteById,
  _getAll,
  _getById,
  _getCompanyById,
  _getPersonById,
  _update,
} from "../queries/customer";

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(_getById, [id]);
    return { sucess: true, data: result.rows[0], error: false };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

const getCompanyById: any = async (id: string) => {
  try {
    const result = await pool.query(_getCompanyById, [id]);
    return { sucess: true, data: result.rows[0], error: false };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

const getPersonById: any = async (id: string) => {
  try {
    const result = await pool.query(_getPersonById, [id]);
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
  type: string,
  company_id: string,
  person_id: string
) => {
  try {
    const result = await pool.query(_create, [type, company_id, person_id]);
    return { sucess: true, data: result.rows[0], error: false };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

const update: any = async (
  id: string,
  type: string,
  company_id: string,
  person_id: string
) => {
  try {
    const result = await pool.query(_update, [id, type, company_id, person_id]);
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

export { getAll, create, update, getById , deleteById, getCompanyById, getPersonById};
