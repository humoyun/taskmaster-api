class Task {
  constructor() {
    this.id = ""; // primary
    this.projectId = ""; // foreign key [project.id]
    this.assigneeId = ""; // foreign key [user.id]
    this.reporterId = ""; // foreign key [user.id]
    this.subject = "password not working";
    this.desc = "some desciption of the task";
    this.status = ["new", "assigned", "inprogress", "resolved", "closed"];
    this.priority = ["high", "medium", "low"];
    this.type = ["bug", "task"];
    this.flagged = true;
    this.estimatedTime = "5 units";
    this.createdAt = new Date().toISOString();
    this.dueAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    // watchers = [];
    // attachs = [];
    // tags = [];
  }
}

module.exports = Task;
