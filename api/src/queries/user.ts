const _getAll = `SELECT u.id , u.person_id, rut, name, paternallastname, maternallastname, email, phone, address, district 
                  FROM ticket.user u
                    INNER JOIN ticket.person  ON  u.person_id = person.id WHERE u."isActive"=true;`;

const _getById = `SELECT id, person_id, hash FROM ticket.user WHERE person_id=$1`;

const _create = `INSERT INTO ticket.user (person_id, hash)
        VALUES ($1, $2)
          ON CONFLICT (person_id) 
            DO UPDATE SET hash = EXCLUDED.hash
              RETURNING * ;`;

const _assignPassword = `UPDATE ticket.user SET hash = $2 WHERE person_id = $1 RETURNING *;`;

const _validate = `SELECT id, person_id, hash FROM ticket.user  WHERE person_id = $1 AND "isActive"=true;`;

const _deleteById = `UPDATE ticket."user"
                      SET "isActive"=false
                        WHERE person_id=$1;`;

export { _getAll, _create, _assignPassword, _validate, _deleteById, _getById };
