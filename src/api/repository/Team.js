class Team {
  constructor() {
    this.id = ""; // primary key
    this.title = "";
    this.desc = "";
    this.info = {};
    this.adminId = ""; // fereign key
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    // members
  }
}

module.exports = Team;
