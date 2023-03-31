import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Tickets-App",
  password: "admin",
  port: 5432,
  keepAlive: true,
});

pool.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connect Database");
  }
});

export default pool;
