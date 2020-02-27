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

module.exports = Comment;
