class Project {
  constructor() {
    this.id = ""; // primary
    this.title = "";
    this.status = "";
    this.desc = "";
    this.photos = ["imahe-url-1", "imahe-url-2"];
    this.info = { key: "value" };
    this.dueAt = new Date().toISOString();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Project;
