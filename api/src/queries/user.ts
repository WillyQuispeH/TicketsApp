const _getAll = `SELECT id, person_id, hash FROM app."user";`;

const _create = `INSERT INTO app.user (person_id, hash)
        VALUES ($1, $2)
          ON CONFLICT (person_id) 
            DO UPDATE SET hash = EXCLUDED.hash
              RETURNING * ;`;

const _assignPassword = `UPDATE app.user SET hash = $2 WHERE person_id = $1 RETURNING *;`;

const _validate = `SELECT id, person_id, hash FROM app.user  WHERE person_id = $1`;

export { _getAll, _create, _assignPassword, _validate };
