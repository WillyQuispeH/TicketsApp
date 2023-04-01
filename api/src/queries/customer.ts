const _getAll = `SELECT id, "type", company_id, person_id FROM ticket.customer;`;

const _create = `INSERT INTO ticket.customer ("type", company_id, person_id) VALUES($1, $2, $3) RETURNING *;`;

const _update = `UPDATE ticket.customer SET "type"=$2, company_id=$3, person_id=$4 WHERE id=$1 RETURNING *;`;

const _getById = `SELECT id, "type", company_id, person_id FROM ticket.customer where person_id = $1 or company_id = $1 ;`;

const _deleteById = `DELETE FROM ticket.customer WHERE person_id = $1 or company_id = $1 ;`;

export { _getAll, _create, _update, _getById, _deleteById}