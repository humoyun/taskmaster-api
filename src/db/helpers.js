/**
 * SELECT
 */
exports.select = (fields, tableName) => {
  const len = Object.keys(data).length;
  let valuePlaceholders = "(";

  const keys = Object.keys(data).join(", ");

  for (let i = 1; i < len; i += 1) {
    valuePlaceholders += `$${i}, `;
  }
  valuePlaceholders += `$${len})`;

  const text = `INSERT INTO ${tableName} (${keys}) values${valuePlaceholders} RETURNING *`;

  const values = [];
  Object.keys(data).forEach(key => {
    values.push(data[key]);
  });
  // todo order of keys and values of data should match !??

  return { text, values };
};

/**
 * INSERT
 */
exports.insert = (data, tableName) => {
  const len = Object.keys(data).length;
  let valuePlaceholders = "(";

  const keys = Object.keys(data).join(", ");

  for (let i = 1; i < len; i += 1) {
    valuePlaceholders += `$${i}, `;
  }
  valuePlaceholders += `$${len})`;

  const text = `INSERT INTO ${tableName} (${keys}) values${valuePlaceholders} RETURNING *`;

  const values = [];
  Object.keys(data).forEach(key => {
    values.push(data[key]);
  });
  // todo order of keys and values of data should match !??

  return { text, values };
};

/**
 *  "UPDATE members SET field_1 = $1, field_2 = $2, field_3 = $3, ... ( WHERE ...) RETURNING *";
 */
exports.update = (data, tableName, cond) => {
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
exports.delete = (data, tableName, cond) => {
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
