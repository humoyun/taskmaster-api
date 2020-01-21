const { Pool } = require("pg");
const connection = require("./connection.json");
const pool = new Pool(connection);
const { insert, select } = require("./helpers");

/**
 * The main mechanism to avoid SQL Injection is by escaping the input parameters.
 * Any good SQL library should have a way to achieve this.
 * PG library allows you to do this by placeholders `($1, $2)`
 */
module.exports = {
  /**
   *
   */
  query: (text, params, callback) => {
    const start = Date.now();

    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log("executed query", { text, duration, rows: res.rowCount });
      callback(err, res);
    });
  },

  /**
   *
   */
  getClient: callback => {
    pool.connect((err, client, done) => {
      const query = client.query;
      // monkey patch the query method to keep track of the last query executed
      client.query = (...args) => {
        client.lastQuery = args;
        return query.apply(client, args);
      };
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error("A client has been checked out for more than 5 seconds!");
        console.error(
          `The last executed query on this client was: ${client.lastQuery}`
        );
      }, 5000);
      const release = err => {
        // call the actual 'done' method, returning this client to the pool
        done(err);
        // clear our timeout
        clearTimeout(timeout);
        // set the query method back to its old un-monkey-patched version
        client.query = query;
      };
      callback(err, client, release);
    });
  },

  /**
   *
   */
  create: async (entity, data) => {
    let resp;
    try {
      const { text, values } = insert(entity, data);
      console.log("[create] >> ", text);
      console.log("[create] >> ", values);
      const rs = await pool.query(text, values);
      console.log("create user: ", rs.rows[0]);
      resp = rs.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }

    return resp;
  },

  /**
   * entity: table name, e.g, users
   * conditions: { id: "some-id", team_id: "some-team-id" }
   * fields: list of desired columns to return ['id', 'name', '...'] or ['*']
   */
  findOne: async (entity, conditions, fields) => {
    if (!entity) throw new Error("no entity table specified");
    if (!conditions) throw new Error("no conditions specified");

    let resp;

    try {
      const { text, values } = select(entity, conditions, fields);
      const rs = await pool.query(text, values);
      if (rs) resp = rs.rows[0];
    } catch (err) {
      console.error(err);
    }

    return resp;
  },

  /**
   *
   */
  updateOne: async (table, fields, conditions, cb) => {
    let resp;

    try {
    } catch (err) {
      console.error(err);
    }

    return resp;
  },

  /**
   *
   */
  deleteOne: async (table, fields, conditions, cb) => {
    let resp;

    try {
    } catch (err) {
      console.error(err);
    }

    return resp;
  },

  /**
   *
   */
  createUser: async user => {
    let resp;
    // const text1 = `INSERT INTO member (username, email, password, created_at, updated_at, last_login) values($1, $2, $3, $4, $5, $6) RETURNING *`;

    const { text, values } = insert("members", user);
    console.log(">>>> ", text);
    console.log(">>>> ", values);

    try {
      const rs = await pool.query(text, values);
      console.log("create user: ", rs.rows[0]);
      resp = rs.rows[0];
    } catch (err) {
      console.error(err);
    }

    return resp;
  },
  /**
   *
   */
  updateUser: async user => {
    let resp;
    const condition = "";
    const { text, values } = update(user, "members", condition);

    console.log(">>>> ", text);
    console.log(">>>> ", values);

    try {
      resp = await pool.query(text, values);
    } catch (err) {
      console.error(err);
    }

    return resp.rows;
  },

  /**
   *
   */
  findAll: async (entity, conditions, fields) => {
    if (!entity) throw new Error("no entity table specified");

    let resp;

    try {
      const { text, values } = select(entity, conditions, fields);
      const rs = await pool.query(text, values);
      if (rs) resp = rs.rows;
    } catch (err) {
      console.error(err);
    }

    return resp;
  }
};
