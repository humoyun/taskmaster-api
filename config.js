require("dotenv").config();

// createdb task_master_test -U postgres
// createdb task_master_dev -U postgres
// createdb task_master_dev -U admin_user

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres"
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres"
  }
};
