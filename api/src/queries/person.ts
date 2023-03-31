
const _getByEmail =`SELECT id, rut, name, paternallastname, maternallastname, email, phone, address, district 
FROM app.person
  WHERE email = $1`;

const _getAll = `SELECT u.id  , person_id,rut, name, paternallastname, maternallastname,email,phone,address,district
FROM app."user" u 
  INNER JOIN app.person p  ON p.id  = u.person_id;`;

const _create = `INSERT INTO app.person
(rut, name, paternallastname, maternallastname, email, phone, address, district)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT  (rut)
      DO UPDATE SET 
        name=EXCLUDED.name,
        paternallastname=EXCLUDED.paternallastname,
        maternallastname=EXCLUDED.maternallastname,
        email=EXCLUDED.email,
        phone=EXCLUDED.phone,
        address=EXCLUDED.address,
        district=EXCLUDED.district
          RETURNING *;`;

const _update = `UPDATE app.person
          SET rut=$2, name=$3, paternallastname=$4, maternallastname=$5, email=$6, phone=$7, address=$8, district=$9
            WHERE id = $1
              RETURNING *;`;

const _deleteById = `DELETE FROM app.person WHERE id = $1;`;

export { _getAll, _create, _update, _deleteById, _getByEmail };
