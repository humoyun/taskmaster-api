/**
 * SELECT
 */
exports.select = (tableName, data) => {
  const len = Object.keys(data).length;
  let valuePlaceholders = "(";

  const keys = Object.keys(data).join(", ");

  for (let i = 1; i < len; i += 1) {
    valuePlaceholders += `$${i}, `;
  }
  valuePlaceholders += `$${len})`;

  const text = `SELECT ${valuePlaceholders} FROM ${tableName} (${keys})`;

  const values = [];
  Object.keys(data).forEach(key => {
    values.push(data[key]);
  });
  // todo order of keys and values of data should match !??

  return { text, values };
};

/**
 * SELECT * FROM WHERE conditions;
 */
exports.selectOne = (tableName, conditions, data) => {
  console.log(tableName, conditions, data);
  let columns;

  if (!data || (Array.isArray(data) && data[0] === "*")) {
    columns = "*";
  } else {
    columns = data.join(", ");
  }

  const keys = Object.keys(conditions);
  const condTuples = keys.map((k, index) => `${k} = $${index + 1}`);
  const condPlaceholders = condTuples.join(", ");

  const text = `SELECT ${columns} FROM ${tableName} WHERE ${condPlaceholders}`;

  const values = [];
  Object.keys(conditions).forEach(key => {
    values.push(conditions[key]);
  });

  return { text, values };
};

/**
 * INSERT
 */
exports.insert = (tableName, fields) => {
  const len = Object.keys(fields).length;
  let valuePlaceholders = "(";

  const keys = Object.keys(fields).join(", ");

  for (let i = 1; i < len; i += 1) {
    valuePlaceholders += `$${i}, `;
  }
  valuePlaceholders += `$${len})`;

  const text = `INSERT INTO ${tableName} (${keys}) values${valuePlaceholders} RETURNING *`;

  const values = [];
  Object.keys(fields).forEach(key => {
    values.push(fields[key]);
  });
  // todo order of keys and values of data should match !??

  return { text, values };
};

/**
 *  "UPDATE members SET field_1 = $1, field_2 = $2, field_3 = $3, ... ( WHERE ...) RETURNING *";
 */
exports.update = (tableName, cond, data) => {
  const updates = "";
  const len = Object.keys(data).length;

  Object.keys(data).forEach((key, index) => {
    updates += ` ${key} = ${index + 1} `;
  });

  const values = [];
  Object.keys(data).forEach(key => {
    values.push(data[key]);
  });

  let text = `UPDATE ${tableName} SET ${updates}`;
  if (cond) text += `WHERE ${cond}`;
  text += " RETURNING *";

  return { text, values };
};

/**
 *  "DELETE members field_1 = $1, field_2 = $2, field_3 = $3, ... ( WHERE ...) RETURNING *";
 */
exports.delete = (tableName, cond, data) => {
  const updates = "";
  const len = Object.keys(data).length;

  Object.keys(data).forEach((key, index) => {
    updates += ` ${key} = ${index + 1} `;
  });

  const values = [];
  Object.keys(data).forEach(key => {
    values.push(data[key]);
  });

  let text = `DELETE FROM ${tableName} WHERE ${updates}`;
  if (cond) text += `WHERE ${cond}`;
  text += " RETURNING *";

  return { text, values };
};
