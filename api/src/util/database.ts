import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "ajeianeg",
  host: "babar.db.elephantsql.com",
  database: "ajeianeg",
  password: "qTcutS6HtTXmt8aKIf5XbpfyqcC4GxMl",
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
