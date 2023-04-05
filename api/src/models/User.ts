import pool from "../util/database";

import {
  _assignPassword,
  _create,
  _deleteById,
  _getAll,
  _getById,
  _validate,
} from "../queries/user";

import { hashPassword, passwordCompare } from "../util/password";

const getAll: any = async () => {
  try {
    const result = await pool.query(_getAll);
    return { sucess: true, data: result.rows, error: null };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

const create: any = async (person_id: string, password: string) => {
  try {
    const hash = await hashPassword(password);
    const result = await pool.query(_create, [person_id, hash]);
    return { sucess: true, data: result.rows[0], error: null };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(_getById, [id]);
    return { sucess: true, data: result.rows[0], error: false };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

const assignPassword: any = async (id: string, password: string) => {
  try {
    const hash = await hashPassword(password);
    const result = await pool.query(_assignPassword, [id, hash]);
    return { sucess: true, data: result.rows[0], error: false };
  } catch (e) {
    return { sucess: false, data: null, error: (e as Error).message };
  }
};

const validate: any = async (id: string, password: string) => {
  try {
    const result = await pool.query(_validate, [id]);
    const isValid = await passwordCompare(password, result.rows[0].hash);
    return { sucess: true, isValid, error: false };
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

export { getAll, create, assignPassword, validate, deleteById, getById };
