const models = {};

class User {
  constructor() {
    this.id = ""; // primary
    this.email = "";
    this.username = "";
    this.firstName = "";
    this.secondName = "";
    this.location = "USA";
    this.geolocation = { lat: 123.32, lng: 34.3 };
    this.verified = false;
    this.website = "";
    this.bio = "";
    this.role = "";
    this.company = "";
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.lastLogin = new Date().toISOString();
  }
}

/**
 * ------------------------------------------------
 */
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
    // tasks
    // teams
  }
}

/**
 *
 */
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

/**
 * ------------------------------------------------
 */
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
    this.type = ["bug", "story", "task"];
    this.unread = true;
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

class Attach {
  constructor() {
    this.id = "unique-attach-id"; // primary
    this.taskId = "task-1-id";
    this.type = ["file", "image", "video"];
    this.fileUrl = "";
  }
}

class Comment {
  constructor() {
    this.id = ""; // primary
    this.userId = ""; // foreign key
    this.parentId = ""; // task/project
    this.content = "";
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

/**
 * ------------------------------------------------
 */
class Tag {
  constructor() {
    this.id = "unique-tag-id"; // primary
    this.title = "tag-1";
    this.createdAt = new Date().toISOString();
  }
}

/**
 * ------------------------------------------------
 */

// class Address {
//   constructor() {
//     this.id = ""; // primary
//     this.country = "";
//     this.city = "";
//     this.zip = "";
//     this.address1 = "";
//     this.address2 = "";
//   }
// }

class Notification {
  constructor() {
    this.id = ""; // primary
    this.type = ["comment", "task", "user", "..."]; // primary
  }
}

models.User = User;
models.Team = Team;
models.Comment = Comment;
models.Project = Project;
models.Task = Task;
models.Attach = Attach;
models.Tag = Tag;
models.Address = Address;
models.Notification = Notification;

exports.models = models;
