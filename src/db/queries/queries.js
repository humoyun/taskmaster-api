const pool = require("../client.js.js");

console.log("queires");

// postgres.query("SELECT NOW()", (err, res) => {
//   console.log(err, res.rows);
// });

exports.getAllMembers = async () => {
  const query = "SELECT * FROM member";
  let result;
  try {
    const rs = await postgres.query(query);
    for (let row of rs.rows) {
      result += `${row.username}\n`;
    }
  } catch (err) {
    console.error(err);
  }

  return result;
};

exports.getAllMembersFromPool = () => {
  const query = "SELECT * FROM member";

  try {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }

      client.query(query, (err, res) => {
        release();
        if (err) {
          return console.error("Error executing query", err.stack);
        }
        console.log(res.rows);
        return res.rows;
      });
    });
  } catch (err) {
    console.error(err);
  }
};

// {
//   "host": "arjuna.db.elephantsql.com",
//   "port": 5432,
//   "user": "vbufewdk",
//   "database": "vbufewdk",
//   "password": "hs_1WH4iEUPUWrdY3G3i7ISI5mKk8qez"
// }
