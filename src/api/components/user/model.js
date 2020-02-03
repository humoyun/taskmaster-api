// const BaseModel = require('./BaseModel.js');

class User {
  constructor() {
    this.id = null;
    this.email = null;
    this.username = null;
  }

  /**
   * by id, email, username
   */
  getOne() {}

  /**
   *
   */
  getAll() {}

  getAllTeams() {}
  getAllProjects() {}
  getAllTasks() {}

  /**
   * by team, project
   */
  getTasksBy() {}
}

module.exports = User;
