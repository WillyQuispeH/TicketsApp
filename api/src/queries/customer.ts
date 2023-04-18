const _getAll = `SELECT id, "type", company_id, person_id FROM ticket.customer WHERE "isActive"=true;`;

const _create = `INSERT INTO ticket.customer ("type", company_id, person_id) VALUES($1, $2, $3) RETURNING *;`;

const _update = `UPDATE ticket.customer SET "type"=$2, company_id=$3, person_id=$4 WHERE id=$1 RETURNING *;`;

const _getById = `SELECT id, "type", company_id, person_id FROM ticket.customer where person_id = $1 or company_id = $1 ;`;

const _deleteById = `UPDATE ticket.customer
                      SET "isActive"=false
                        WHERE company_id =$1
                          or person_id=$1;`;

const _getCompanyById =`SELECT c.id ,c.type, c.company_id, rut, companyname, legalrepresentative, line, email, phone, address, district 
                          FROM ticket.company p 
                            INNER JOIN ticket.customer c ON  p.id =$1
                              WHERE c.company_id=$1`;

const _getPersonById = `SELECT c.id ,c.type, c.person_id, rut, name, paternallastname, maternallastname, email, phone, address, district 
                          FROM ticket.person p 
                            INNER JOIN ticket.customer c ON  p.id =$1
                              WHERE c.person_id=$1`;

export { _getAll, _create, _update, _getById, _deleteById, _getCompanyById, _getPersonById}