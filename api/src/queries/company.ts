const _getAll = `SELECT u.id, person_id, rut, companyname, legalrepresentative, line, email, phone, address, district
FROM ticket."user" u
INNER JOIN ticket.company c ON c.id = u.person_id;`;

const _create = `INSERT INTO ticket.company 
( rut, companyname, legalrepresentative, line, email, phone, address, district)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT  (rut)
      DO UPDATE SET 
        companyname=EXCLUDED.companyname,
        legalrepresentative=EXCLUDED.legalrepresentative,
        line=EXCLUDED.line,
        email=EXCLUDED.email,
        phone=EXCLUDED.phone,
        address=EXCLUDED.address,
        district=EXCLUDED.district
          RETURNING *;`;

const _update = `UPDATE ticket.company 
          SET rut=$2, companyname=$3, legalrepresentative=$4, line=$5, email=$6, phone=$7, address=$8, district=$9
            WHERE id = $1
              RETURNING *;`;

const _deleteById = `DELETE FROM ticket.company WHERE id = $1;`;

const _getByEmail = `SELECT id, rut, companyname, legalrepresentative, line, email, phone, address, district
FROM ticket.company WHERE email=$1;`;

export { _getAll, _create, _update, _deleteById , _getByEmail };
