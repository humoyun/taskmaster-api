const { Client } = require("pg");
const connection = require("./connection.json");
const postgres = new Client(connection);
//const { Pool } = require("pg");
//const pool = new Pool(connection);

postgres.connect(() => {
  console.log("connected to postgres");
  postgres.query("SELECT * FROM member", (err, resp) => {
    if (err) throw new Error(err);
    console.log("rows: ", resp.rowCount);
    postgres.end();
  });
});

module.exports = postgres;
